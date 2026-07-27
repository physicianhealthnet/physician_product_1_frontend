import React, { useEffect, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../redux/slices/themeSlice';
import { toggleSidebar } from '../../redux/slices/toggleSlice';
import { PageSkeleton } from '../ui/Skeleton';
import chatSocketService from '../../utilities/chatSocketService';
import { notification } from 'antd';

const MainLayout = () => {
    const isOpen = useSelector((state) => state.toggle.isOpen);
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();

    // Always ensure light theme (no dark class) and establish persistent socket connection
    useEffect(() => {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');

        const rawUser = sessionStorage.getItem("user") || sessionStorage.getItem("master");
        let cleanupSocket = () => {};

        if (rawUser) {
            try {
                const user = JSON.parse(rawUser);
                if (user.clinicId || user.cid) {
                    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
                    const socketUrl = import.meta.env.VITE_SOCKET_URL || (isLocal ? "http://localhost:3028" : "https://admin.physicianhealthnet.com");
                    console.log("[MainLayout] Connecting global socket client to:", socketUrl);
                    chatSocketService.connect(socketUrl, user);

                    // Add global real-time notifications for doctors and staff
                    const handleVitalsUpdateGlobal = (data) => {
                        console.log("[MainLayout] Real-time vitals update notification:", data);
                        notification.info({
                            message: 'Patient Vitals Updated',
                            description: `Vitals for patient ${data.patientName || data.patientId} have been updated in real-time.`,
                            placement: 'topRight',
                            duration: 4.5,
                        });
                    };

                    chatSocketService.on("vitals:updated", handleVitalsUpdateGlobal);

                    // Add global real-time notifications for general data updates (appointments, billing, etc.)
                    const handleDataUpdateGlobal = (payload) => {
                        console.log("[MainLayout] Real-time global update notification:", payload);
                        
                        let message = "Data Updated";
                        let description = `A change occurred on the server for ${payload.entity}.`;
                        
                        const actionName = payload.action === "create" ? "added" : payload.action === "update" ? "updated" : "deleted";
                        const formattedEntity = payload.entity.charAt(0).toUpperCase() + payload.entity.slice(1);
                        
                        message = `${formattedEntity} ${formattedEntity.endsWith('s') ? 'were' : 'was'} ${actionName}`;
                        
                        if (payload.entity === "appointment") {
                            description = `An appointment was ${actionName} for patient ${payload.data?.ptrName || payload.data?.patientName || "Unknown"}.`;
                        } else if (payload.entity === "bill") {
                            description = `A bill of amount ${payload.data?.grandTotal || payload.data?.totalAmount || ""} was ${actionName} for patient ${payload.data?.patientName || "Unknown"}.`;
                        } else if (payload.entity === "prescription" || payload.entity === "lab" || payload.entity === "scan") {
                            description = `A ${payload.entity} order was ${actionName} for patient ${payload.data?.ptrName || payload.data?.patientName || "Unknown"}.`;
                        } else if (payload.entity === "inventory") {
                            description = `Inventory item "${payload.data?.productName || "Unknown"}" count was updated.`;
                        }

                        notification.info({
                            message,
                            description,
                            placement: 'topRight',
                            duration: 4.0,
                        });
                    };

                    chatSocketService.on("data:updated", handleDataUpdateGlobal);

                    cleanupSocket = () => {
                        chatSocketService.off("vitals:updated", handleVitalsUpdateGlobal);
                        chatSocketService.off("data:updated", handleDataUpdateGlobal);
                    };
                }
            } catch (err) {
                console.error("[MainLayout] Socket initialization error:", err);
            }
        }

        return () => {
            cleanupSocket();
        };
    }, []);

    return (
        <div className="flex h-screen w-full bg-slate-50  overflow-hidden font-sans text-slate-900  transition-colors duration-300">
            {/* Sidebar - self-managed width based on Redux state */}
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => dispatch(toggleSidebar())} // Close on click
                />
            )}

            <Sidebar />

            {/* Main Content Wrapper */}
            <div className={`flex flex-col flex-1 h-full min-w-0 overflow-hidden relative bg-slate-50  transition-colors duration-300`}>
                <Navbar />

                {/* Scrollable Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth relative z-10 w-full">
                    {/* Max width container for large screens to prevent stretching */}
                    <div className="mx-auto w-full max-w-[1600px] pb-10">
                        <Suspense fallback={<PageSkeleton />}>
                            <Outlet />
                        </Suspense>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
