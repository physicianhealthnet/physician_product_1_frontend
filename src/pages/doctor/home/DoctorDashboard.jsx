import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../../utilities/AxiosInstance";
import { Icon } from "@iconify/react";
import {
  StaggerContainer,
  StaggerItem,
} from "../../../component/ui/Transitions";
import PatientDetailsTable from "../../../component/dashboard/PatientDetailsTable";
import TodayAppointmentsTable from "../../../component/dashboard/TodayAppointmentsTable";
import {
  mockDashboardData,
  mockPatientsList,
  mockPatientDetails,
} from "./mockDashboardData";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(() => {
    return localStorage.getItem("isDemoMode") === "true";
  });
  const [activeAptTab, setActiveAptTab] = useState("all");
  const todayAptsRef = useRef(null);

  const handleCardClick = (slot) => {
    setActiveAptTab(slot);
    setTimeout(() => {
      todayAptsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const toggleDemoMode = () => {
    const newVal = !isDemoMode;
    setIsDemoMode(newVal);
    localStorage.setItem("isDemoMode", newVal ? "true" : "false");
    window.location.reload();
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(sessionStorage.getItem("user") || "{}");
        const clinicId = user?.clinicId || "";
        const doctorId = user?._id || "";
        const doctorName = user?.userName || "";
        const res = await AxiosInstance.get(
          `/business-tool/dashboard-v2?clinicId=${clinicId}&doctorId=${doctorId}&doctorName=${doctorName}`,
        );
        if (res.data) {
          setDashboardData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const currentDate = new Date()
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, " ");

  const activeData = isDemoMode ? mockDashboardData : dashboardData;

  const patientStats = activeData?.patientStats || null;
  const nextPatient = activeData?.nextPatient || null;
  const morningAppointments = activeData?.morningAppointments || [];
  const afternoonAppointments = activeData?.afternoonAppointments || [];
  const eveningAppointments = activeData?.eveningAppointments || [];

  if (loading && !isDemoMode) {
    return (
      <div className="flex items-center justify-center p-12 min-h-screen bg-[#F4F7FF]">
        <div className="flex flex-col items-center gap-4">
          <Icon
            icon="solar:spinner-linear"
            className="animate-spin text-[#2952E3] text-5xl"
          />
          <span className="text-slate-500 text-lg font-medium animate-pulse">
            Curating your dashboard...
          </span>
        </div>
      </div>
    );
  }

  const StatCard = ({
    title,
    subValue,
    total,
    icon,
    color,
    bgGradient,
    iconBg,
    iconColor,
    onClick,
  }) => (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden bg-linear-to-br ${bgGradient} backdrop-blur-xl border border-slate-200/60 rounded-2xl hover:scale-[1.02] transition-all duration-300 ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div
        className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-10 transition-opacity group-hover:opacity-20 ${color}`}
      />

      <div className="p-4 sm:p-6 flex items-center justify-between gap-2 sm:gap-4 z-10 relative">
        <div
          className={`w-14 h-14 sm:w-18 sm:h-18 shrink-0 rounded-2xl shadow-gray-100 shadow ${iconBg} flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform`}
        >
          <Icon icon={icon} className="text-2xl sm:text-3xl" />
        </div>
        <div className="flex flex-col gap-1 sm:gap-2 flex-1 min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 leading-none">
              {subValue}
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-600">
              / {total}
            </span>
          </div>
          <span
            className="text-[9px] sm:text-[10px] font-black text-slate-600 uppercase tracking-widest truncate"
            title={title}
          >
            {title}
          </span>

          <div className="w-full bg-slate-200/50 h-1.5 rounded-full mt-1 overflow-hidden shadow-inner">
            <div
              className={`h-full ${color} bg-opacity-80 rounded-full transition-all duration-1000`}
              style={{ width: `${total > 0 ? (subValue / total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <StaggerContainer>
      <div className="flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8 bg-white/70 rounded backdrop-blur-3xl border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] min-h-[500px] w-full max-w-full min-w-0 overflow-hidden">
        {/* HEADER SECTION */}
        <StaggerItem>
          <div className="flex flex-col lg:flex-row justify-between rounded items-start lg:items-center gap-8">
            <div className="flex flex-col">
              <h1 className="font-black text-slate-800 text-2xl sm:text-3xl md:text-4xl tracking-tight">
                Appointment <span className="text-blue-500">Dashboard</span>
              </h1>
              <p className="text-slate-500 font-medium mt-2 tracking-wide uppercase text-[10px]">
                Welcome back! Here's what's happening today,{" "}
                <span className="text-[#2040B0] font-bold">{currentDate}</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 rounded w-full sm:w-auto">
              <h1 className="text-slate-500 text-[15px] uppercase font-black tracking-widest pl-2 pr-1 w-full sm:w-auto text-center sm:text-left">
                Quick Links:
              </h1>
              <button
                onClick={() => navigate("/book-appointment")}
                className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-2.5 text-[10px] uppercase font-black tracking-widest rounded transition-all duration-300  shadow-sm border border-slate-200 hover:text-indigo-600 hover:border-indigo-200 group"
              >
                <Icon icon="solar:calendar-add-bold-duotone" className="text-white bg-indigo-500 rounded-full group-hover:bg-indigo-600 transition-colors p-1" width={30} height={30} />
                Internal Appointment
              </button>
              <button
                onClick={() => navigate("/PHNAppointments")}
                className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-2.5 text-[10px] uppercase font-black tracking-widest rounded transition-all duration-300 bg-white shadow-sm text-slate-800 border border-slate-200 hover:text-emerald-600 hover:border-emerald-200 group"
              >
                <Icon icon="solar:globus-bold-duotone" className="text-white bg-emerald-500 rounded-full group-hover:bg-emerald-600 transition-colors p-1" width={30} height={30} />
                Web Appointment
              </button>
              <button
                onClick={() => navigate("/next-review")}
                className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-2.5 text-[10px] uppercase font-black tracking-widest rounded transition-all duration-300 bg-white shadow-sm text-slate-800 border border-slate-200 hover:text-amber-600 hover:border-amber-200 group"
              >
                <Icon icon="solar:chat-square-arrow-bold-duotone" className="text-white bg-amber-500 rounded-full group-hover:bg-amber-600 transition-colors p-1" width={30} height={30} />
                Next Review & Apt
              </button>
              <button
                onClick={() => navigate("/video-consult")}
                className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-2.5 text-[10px] uppercase font-black tracking-widest rounded transition-all duration-300 bg-white shadow-sm text-slate-800 border border-slate-200 hover:text-rose-600 hover:border-rose-200 group"
              >
                <Icon icon="solar:videocamera-record-bold-duotone" className="text-white bg-rose-500 rounded-full group-hover:bg-rose-600 transition-colors p-1" width={30} height={30} />
                Video Chat
              </button>
            </div>
          </div>
        </StaggerItem>

        {/* ROW 1: PERFORMANCE CARDS */}
        <StaggerItem>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            <StatCard
              title="Today's Appointment Total"
              subValue={patientStats?.todayCompletedAppointments || 0}
              total={patientStats?.todayTotalAppointments || 0}
              icon="solar:clipboard-list-linear"
              color="bg-blue-500"
              bgGradient="from-blue-500/10 to-indigo-500/10"
              iconBg="bg-blue-500/10"
              iconColor="text-blue-600"
              onClick={() => handleCardClick("all")}
            />
            <StatCard
              title="Morning Appointments"
              subValue={patientStats?.morning?.completed || 0}
              total={patientStats?.morning?.total || 0}
              icon="fluent:weather-partly-cloudy-day-16-filled"
              color="bg-sky-500"
              bgGradient="from-sky-500/10 to-cyan-500/10"
              iconBg="bg-sky-500/10"
              iconColor="text-sky-600"
              onClick={() => handleCardClick("morning")}
            />
            <StatCard
              title="Afternoon Appointments"
              subValue={patientStats?.afternoon?.completed || 0}
              total={patientStats?.afternoon?.total || 0}
              icon="fluent:weather-sunny-16-filled"
              bgGradient="from-amber-500/10 to-orange-500/10"
              color="bg-amber-500"
              iconBg="bg-amber-500/10"
              iconColor="text-amber-600"
              onClick={() => handleCardClick("afternoon")}
            />
            <StatCard
              title="Evening Appointments"
              subValue={patientStats?.evening?.completed || 0}
              total={patientStats?.evening?.total || 0}
              icon="fluent:weather-partly-cloudy-night-20-filled"
              color="bg-indigo-500"
              bgGradient="from-indigo-500/10 to-violet-500/10"
              iconBg="bg-indigo-500/10"
              iconColor="text-indigo-600"
              onClick={() => handleCardClick("evening")}
            />
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-4">
            {[
              {
                label: "Tomorrow",
                count: patientStats?.tomorrowCount || 0,
                icon: "solar:calendar-mark-linear",
                color: "bg-blue-500",
                bgGradient: "from-blue-500/10 to-indigo-500/10",
                iconBg: "bg-blue-500/10",
                iconColor: "text-blue-600",
              },
              {
                label: "This Week",
                count: patientStats?.thisWeekCount || 0,
                icon: "solar:calendar-linear",
                color: "bg-sky-500",
                bgGradient: "from-sky-500/10 to-cyan-500/10",
                iconBg: "bg-sky-500/10",
                iconColor: "text-sky-600",
              },
              {
                label: "Next Week",
                count: patientStats?.nextWeekCount || 0,
                icon: "solar:calendar-linear",
                color: "bg-amber-500",
                bgGradient: "from-amber-500/10 to-orange-500/10",
                iconBg: "bg-amber-500/10",
                iconColor: "text-amber-600",
              },
              {
                label: "This Month",
                count: patientStats?.thisMonthCount || 0,
                icon: "solar:chart-square-linear",
                color: "bg-indigo-500",
                bgGradient: "from-indigo-500/10 to-violet-500/10",
                iconBg: "bg-indigo-500/10",
                iconColor: "text-indigo-600",
              },
            ].map((c, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden bg-linear-to-br ${c.bgGradient} backdrop-blur-xl border border-slate-200/60 rounded-xl hover:scale-[1.02] transition-all duration-300`}
              >
                <div
                  className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-10 transition-opacity group-hover:opacity-20 ${c.color}`}
                />
                <div className="p-5 flex items-center gap-3 z-10 relative">
                  <div
                    className={`w-12 h-12 rounded-xl ${c.iconBg} flex items-center justify-center ${c.iconColor} group-hover:scale-110 transition-transform`}
                  >
                    <Icon icon={c.icon} className="text-2xl" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl font-black text-slate-800">
                      {c.count}
                    </span>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                      {c.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </StaggerItem>
        {/* ROW 3: MAIN WORKSPACE */}
        <StaggerItem>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 flex flex-col gap-6 min-w-0">
              <div className="bg-white rounded p-8 text-slate-800 border border-slate-200 shadow shadow-gray-300 relative overflow-hidden h-full min-h-112.5">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-50/50 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-50/50 rounded-full blur-2xl"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                    <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                      Next Patient
                    </span>
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      #{nextPatient?.patientId?.slice(-6) || "ID"}
                    </span>
                  </div>

                  {nextPatient ? (
                    <>
                      <div className="flex items-center gap-5 mb-8">
                        <div className="w-20 h-20 rounded-3xl bg-slate-50 p-1 shadow-sm overflow-hidden shrink-0 flex items-center justify-center border border-slate-100">
                          {nextPatient.photo ? (
                            <img
                              src={nextPatient.photo}
                              className="w-full h-full object-cover rounded-[20px]"
                              alt=""
                            />
                          ) : (
                            <Icon
                              icon="solar:user-circle-linear"
                              className="text-slate-300 text-6xl"
                            />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-2xl font-black text-slate-800 leading-tight tracking-tight">
                            {nextPatient.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-blue-600 font-bold text-sm">
                              {nextPatient.time}
                            </span>
                            <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                            <span className="text-slate-500 font-medium text-sm truncate max-w-37.5">
                              {nextPatient.diagnosis}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 bg-slate-50/50 rounded-4xl p-6 mb-8 border border-slate-100">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            Gender
                          </span>
                          <span className="font-bold text-slate-700 text-sm">
                            {nextPatient.profile?.sex || "N/A"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            Status
                          </span>
                          <span className="font-bold text-emerald-600 text-sm flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            {nextPatient.status}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1.5 col-span-2">
                          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            History
                          </span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {nextPatient.profile?.historyTags?.length > 0 ? (
                              nextPatient.profile.historyTags
                                .slice(0, 3)
                                .map((tag, i) => (
                                  <span
                                    key={i}
                                    className="bg-white text-slate-600 text-[10px] font-bold px-3 py-1 rounded-lg border border-slate-200 shadow-sm"
                                  >
                                    {tag}
                                  </span>
                                ))
                            ) : (
                              <span className="text-slate-400 text-xs font-medium">
                                No history recorded
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto grid grid-cols-2 gap-4">
                        <button
                          onClick={() =>
                            navigate(
                              `/patient-details/${nextPatient?.patientId}`,
                            )
                          }
                          className="bg-white text-slate-700 border border-slate-200 py-4 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() =>
                            window.open(
                              `https://wa.me/${nextPatient.profile?.phone}`,
                              "_blank",
                            )
                          }
                          className="bg-[#25D366] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#20bd5c] transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2 active:scale-95"
                        >
                          <Icon icon="ic:baseline-whatsapp" width={20} />
                          WhatsApp
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-blue-200/50 gap-4 mt-10">
                      <Icon
                        icon="solar:user-block-linear"
                        width={64}
                        className="opacity-20"
                      />
                      <span className="font-medium">
                        No more patients scheduled
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 min-w-0" ref={todayAptsRef}>
              <TodayAppointmentsTable
                morningAppointments={morningAppointments}
                afternoonAppointments={afternoonAppointments}
                eveningAppointments={eveningAppointments}
                isDemoMode={isDemoMode}
                demoPatients={mockPatientsList}
                demoPatientDetails={mockPatientDetails}
                activeTab={activeAptTab}
                setActiveTab={setActiveAptTab}
              />
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-8">
            <h2 className="text-xl font-black text-slate-800 mb-4">
              Web Appointments
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              {[
                {
                  label: "Today",
                  count: patientStats?.webTodayCount || 0,
                  icon: "solar:calendar-date-linear",
                  color: "bg-purple-500",
                  bgGradient: "from-purple-500/10 to-fuchsia-500/10",
                  iconBg: "bg-purple-500/10",
                  iconColor: "text-purple-600",
                },
                {
                  label: "Tomorrow",
                  count: patientStats?.webTomorrowCount || 0,
                  icon: "solar:calendar-mark-linear",
                  color: "bg-blue-500",
                  bgGradient: "from-blue-500/10 to-indigo-500/10",
                  iconBg: "bg-blue-500/10",
                  iconColor: "text-blue-600",
                },
                {
                  label: "This Week",
                  count: patientStats?.webThisWeekCount || 0,
                  icon: "solar:calendar-linear",
                  color: "bg-emerald-500",
                  bgGradient: "from-emerald-500/10 to-teal-500/10",
                  iconBg: "bg-emerald-500/10",
                  iconColor: "text-emerald-600",
                },
                {
                  label: "Next Week",
                  count: patientStats?.webNextWeekCount || 0,
                  icon: "solar:calendar-linear",
                  color: "bg-orange-500",
                  bgGradient: "from-orange-500/10 to-amber-500/10",
                  iconBg: "bg-orange-500/10",
                  iconColor: "text-orange-600",
                },
                {
                  label: "This Month",
                  count: patientStats?.webThisMonthCount || 0,
                  icon: "solar:chart-square-linear",
                  color: "bg-rose-500",
                  bgGradient: "from-rose-500/10 to-pink-500/10",
                  iconBg: "bg-rose-500/10",
                  iconColor: "text-rose-600",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className={`group relative overflow-hidden bg-linear-to-br ${c.bgGradient} backdrop-blur-xl border border-slate-200/60 rounded-xl hover:scale-[1.02] transition-all duration-300`}
                >
                  <div
                    className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-10 transition-opacity group-hover:opacity-20 ${c.color}`}
                  />
                  <div className="p-4 flex items-center gap-3 z-10 relative">
                    <div
                      className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center ${c.iconColor} group-hover:scale-110 transition-transform`}
                    >
                      <Icon icon={c.icon} className="text-xl" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-2xl font-black text-slate-800">
                        {c.count}
                      </span>
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                        {c.label}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </StaggerItem>

        {/* ROW 4: PATIENT DETAILS TABLE */}
        <StaggerItem>
          <PatientDetailsTable
            todayAppointments={activeData?.todayAppointments || []}
            futureAppointments={activeData?.futureAppointments || []}
            isDemoMode={isDemoMode}
            demoPatients={mockPatientsList}
            demoPatientDetails={mockPatientDetails}
          />
        </StaggerItem>
      </div>
    </StaggerContainer>
  );
};

export default DoctorDashboard;
