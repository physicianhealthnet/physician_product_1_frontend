import React, { useEffect, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../redux/slices/themeSlice';
import { toggleSidebar } from '../../redux/slices/toggleSlice';
import { PageSkeleton } from '../ui/Skeleton';
import chatSocketService from '../../utilities/chatSocketService';
import { notification } from 'antd';

// Import specific banner images requested by the user
import imgPatient from '../../assets/imgs/pexels-pavel-danilyuk-7108326.jpg';
import imgScan from '../../assets/imgs/pexels-charlss-gonzhu-433318654-15277954.jpg';
import imgLab from '../../assets/imgs/pexels-karola-g-6627667.jpg';
import imgPharmacy from '../../assets/imgs/pexels-gustavo-fring-4173251.jpg';
import imgAssessment from '../../assets/imgs/pexels-cottonbro-7578799.jpg';
import imgVideo from '../../assets/imgs/pexels-silverkblack-36763595.jpg';
import imgBill from '../../assets/imgs/pexels-pavel-danilyuk-7108318.jpg';
import imgAdmin from '../../assets/imgs/pexels-silverkblack-36763595.jpg';
import imgDashboard from '../../assets/imgs/pexels-gustavo-fring-4173251.jpg';
import imgAppointment from '../../assets/imgs/pexels-gustavo-fring-6285399.jpg';

// Helper to deterministically pick an image based on path keywords
const getBgImageForPath = (pathname) => {
    const p = pathname.toLowerCase();
    console.log(p);
    
    
    if (p.includes('appointment') || p.includes('apt') || p.includes('book')) return imgAppointment;
    if (p.includes('enquiry')) return imgPatient;
    if (p.includes('scan')) return imgScan;
    if (p.includes('lab')) return imgLab;
    if (p.includes('pharmacy') || p.includes('prescription')) return imgPharmacy;
    if (p.includes('assessment') || p.includes('treatment') || p.includes('plan')) return imgAssessment;
    if (p.includes('/whatsapp-chat') || p.includes('/patient-chat')) return imgVideo;
    if (p.includes('bill') || p.includes('invoice') || p.includes('finance')) return imgBill;
    if (p.includes('admin') || p.includes('form') || p.includes('consultation')) return imgAdmin;
    
    // Default image if no match (dashboard/home)
    return imgDashboard;
};

const MainLayout = () => {
    const isOpen = useSelector((state) => state.toggle.isOpen);
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();
    const location = useLocation();

    // Select the background image based on the current URL
    const currentBannerImg = getBgImageForPath(location.pathname);

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
        <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-slate-900 transition-colors duration-300 relative">

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
            <div className={`flex flex-col flex-1 h-full min-w-0 overflow-hidden relative bg-slate-50 transition-colors duration-300`}>
                <Navbar />

                {/* FIXED GLOBAL TOP BANNER */}
                <div className="absolute top-[65px] left-0 right-0 h-64 sm:h-72 md:h-80 overflow-hidden z-0 pointer-events-none">
                    <img src={currentBannerImg} alt="Header Banner" className="w-full h-full object-cover opacity-100 object-center" />
                    {/* Very subtle gradient just to ensure top navbar contrast, completely transparent at the bottom */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-transparent to-transparent"></div>
                </div>

                {/* Scrollable Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto scroll-smooth relative z-10 w-full">
                    {/* Max width container for large screens to prevent stretching */}
                    <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8 pb-10 pt-32 sm:pt-40 md:pt-48 relative z-10">
                        {/* GLOBAL GLASS CONTAINER */}
                        <div className="bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-250px)]">
                            <Suspense fallback={<PageSkeleton />}>
                                <Outlet />
                            </Suspense>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
