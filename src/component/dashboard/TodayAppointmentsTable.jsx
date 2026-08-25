import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { AxiosInstance } from "../../utilities/AxiosInstance";
import PatientClinicalDataModal from "./PatientClinicalDataModal";
import { message } from "antd";
import PatientDetails from "../../pages/general/patientDetails/PatientDetails";

const PAGE_SIZE = 5;

const TodayAppointmentsTable = ({
  morningAppointments = [],
  afternoonAppointments = [],
  eveningAppointments = [],
  isDemoMode = false,
  demoPatients = [],
  demoPatientDetails = {},
  activeTab: externalActiveTab,
  setActiveTab: externalSetActiveTab
}) => {
  const navigate = useNavigate();
  const [localActiveTab, localSetActiveTab] = useState("all");
  const activeTab = externalActiveTab !== undefined ? externalActiveTab : localActiveTab;
  const setActiveTab = externalSetActiveTab !== undefined ? externalSetActiveTab : localSetActiveTab;

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [patientDetails, setPatientDetails] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, patientId: null });

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiReportContent, setAiReportContent] = useState("");
  const [loadingAIReport, setLoadingAIReport] = useState(false);
  const [aiReportPatientName, setAiReportPatientName] = useState("");

  const handleOverallAIReport = async (patientId, patientName) => {
    setIsAIModalOpen(true);
    setLoadingAIReport(true);
    setAiReportPatientName(patientName);
    setAiReportContent("");
    try {
      const res = await AxiosInstance.get(`/patient/ai-report/${patientId}`);
      if (res.data?.success) {
        setAiReportContent(res.data.report);
      } else {
        message.error("Failed to generate AI report");
        setIsAIModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Error generating AI report");
      setIsAIModalOpen(false);
    } finally {
      setLoadingAIReport(false);
    }
  };

  const user = JSON.parse(sessionStorage.getItem("user") || sessionStorage.getItem("master") || "{}");

  // Merge today's appointments into a unified list
  const allTodayAppointments = useMemo(() => {
    const morning = morningAppointments.map(a => ({ ...a, slot: "Morning" }));
    const afternoon = afternoonAppointments.map(a => ({ ...a, slot: "Afternoon" }));
    const evening = eveningAppointments.map(a => ({ ...a, slot: "Evening" }));
    
    // Sort by slot time if possible, or keep the order
    return [...morning, ...afternoon, ...evening];
  }, [morningAppointments, afternoonAppointments, eveningAppointments]);

  // Unique patient IDs for today's appointments to fetch details
  const todayPatientIdsList = useMemo(() => {
    const ids = allTodayAppointments.map(a => a.patientId).filter(Boolean);
    return [...new Set(ids)].join(",");
  }, [allTodayAppointments]);

  // Fetch detailed info for today's appointments (non-demo mode)
  useEffect(() => {
    if (isDemoMode) {
      setPatientDetails(demoPatientDetails);
      return;
    }
    const fetchDetails = async () => {
      if (!todayPatientIdsList) return;
      setLoadingDetails(true);
      try {
        const res = await AxiosInstance.get(`/business-tool/dashboard-patient-list?patientIds=${todayPatientIdsList}`);
        if (res.data && res.data.data) {
          setPatientDetails(prev => ({ ...prev, ...res.data.data }));
        }
      } catch (err) {
        console.error("Failed to fetch patient details for today's appointments", err);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchDetails();
  }, [todayPatientIdsList, isDemoMode, demoPatientDetails]);

  // Helper to retrieve detailed information dynamically
  const getPatientInfo = (patientId, apt) => {
    if (isDemoMode) {
      const demoPatient = demoPatients.find(p => p.patientId === patientId) || {};
      const demoDetail = demoPatientDetails[patientId]?.patientDetails || {};
      return {
        name: demoPatient.patientName || apt.name,
        gender: demoPatient.patientGender,
        age: demoPatient.patientAge,
        phone: demoPatient.patientPhone,
        location: demoPatient.location,
        primaryComplaint: demoDetail.primaryComplaint || "General Consultation",
        attenderName: demoDetail.attenderName || "N/A",
        attenderPhone: demoDetail.attenderPhone || "N/A",
        attenderRelationship: demoDetail.attenderRelationship || "N/A",
        prescriptionsCount: demoDetail.prescriptionsCount || 0,
        labReportsCount: demoDetail.labReportsCount || 0,
        scanReportsCount: demoDetail.scanReportsCount || 0,
        visitedDate: demoDetail.visitedDate,
        photo: demoPatient.photo
      };
    } else {
      const detail = patientDetails[patientId]?.patientDetails || {};
      const pObj = apt?.patientObj || {};
      return {
        name: detail.name || pObj.patientName || apt.name,
        gender: detail.gender || pObj.patientGender || "N/A",
        age: detail.age || pObj.patientAge || "N/A",
        phone: detail.mobile || pObj.patientPhone || apt.phone || "-",
        location: detail.location || pObj.location || "N/A",
        primaryComplaint: detail.primaryComplaint || pObj.patientHistory || apt.diagnosis || "General Consultation",
        attenderName: detail.attenderName || "N/A",
        attenderPhone: detail.attenderPhone || "N/A",
        attenderRelationship: detail.attenderRelationship || "N/A",
        prescriptionsCount: detail.prescriptionsCount || 0,
        labReportsCount: detail.labReportsCount || 0,
        scanReportsCount: detail.scanReportsCount || 0,
        visitedDate: detail.visitedDate,
        photo: apt.photo || pObj.photo
      };
    }
  };

  // Filter based on tab selection & search query
  const filteredAppointments = useMemo(() => {
    return allTodayAppointments.filter(apt => {
      // Tab filter
      if (activeTab !== "all" && apt.slot.toLowerCase() !== activeTab) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const pInfo = getPatientInfo(apt.patientId, apt);
        const nameMatch = pInfo.name?.toLowerCase().includes(query);
        const idMatch = apt.patientId?.toLowerCase().includes(query);
        const phoneMatch = pInfo.phone?.toLowerCase().includes(query);
        return nameMatch || idMatch || phoneMatch;
      }

      return true;
    });
  }, [allTodayAppointments, activeTab, searchQuery, patientDetails, isDemoMode, demoPatients, demoPatientDetails]);

  // Reset pagination when active tab or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  // Pagination calculation
  const totalItems = filteredAppointments.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedAppointments = useMemo(() => {
    return filteredAppointments.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredAppointments, startIndex]);

  // Slot styling mappings
  const slotStyles = {
    Morning: {
      bg: "bg-amber-50/80 text-amber-700 border-amber-200/50",
      icon: "solar:sun-2-linear",
      iconColor: "text-amber-500"
    },
    Afternoon: {
      bg: "bg-sky-50/80 text-sky-700 border-sky-200/50",
      icon: "solar:clouds-linear",
      iconColor: "text-sky-500"
    },
    Evening: {
      bg: "bg-indigo-50/80 text-indigo-700 border-indigo-200/50",
      icon: "solar:moon-linear",
      iconColor: "text-indigo-600"
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/60 backdrop-blur-sm rounded-3xl p-4 xl:p-5 border-gray-200 border shadow-sm hover:shadow-md transition-shadow">
      {/* Table Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 xl:mb-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
            <Icon icon="solar:calendar-date-linear" width={18} />
          </div>
          <div>
            <h3 className="text-slate-800 font-black text-base leading-tight">Today's Appointments</h3>
            <p className="text-slate-400 text-[10px] font-bold">Morning, Afternoon & Evening Schedule</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-56 shrink-0">
          <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search patient, ID, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-4 py-1.5 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <Icon icon="solar:close-circle-bold" className="text-base" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-nowrap items-center overflow-x-auto whitespace-nowrap gap-1.5 mb-4 xl:mb-5 border-b border-slate-100 pb-3 custom-scrollbar shrink-0">
        {[
          { id: "all", label: "All Today", count: allTodayAppointments.length, icon: "solar:users-group-two-rounded-linear", activeBg: "bg-blue-600 text-white" },
          { id: "morning", label: "Morning", count: morningAppointments.length, icon: "solar:sun-2-linear", activeBg: "bg-amber-500 text-white" },
          { id: "afternoon", label: "Afternoon", count: afternoonAppointments.length, icon: "solar:clouds-linear", activeBg: "bg-sky-500 text-white" },
          { id: "evening", label: "Evening", count: eveningAppointments.length, icon: "solar:moon-linear", activeBg: "bg-indigo-600 text-white" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all shrink-0 ${
              activeTab === tab.id
                ? `${tab.activeBg} shadow-sm shadow-slate-200 scale-[1.02]`
                : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Icon icon={tab.icon} className="text-xs" />
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
              {tab.count}
            </span>
          </button>
        ))}
        {loadingDetails && (
          <div className="flex items-center gap-1.5 ml-auto text-blue-500 text-[11px] font-bold animate-pulse shrink-0">
            <Icon icon="solar:spinner-linear" className="animate-spin text-xs" />
            <span>Updating Details...</span>
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-x-auto custom-scrollbar -mx-6 px-6">
        <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
          <thead>
            <tr className="bg-slate-50/50 text-[10px] uppercase font-black text-slate-500 tracking-widest border-b border-slate-100">
              <th className="p-2.5 xl:p-3 pl-4 xl:pl-5 w-16 text-center">#</th>
              <th className="p-2.5 xl:p-3">Patient</th>
              <th className="p-2.5 xl:p-3">Gender & Age</th>
              <th className="p-2.5 xl:p-3">Slot & Time</th>
              <th className="p-2.5 xl:p-3">Primary Complaint</th>
              <th className="p-2.5 xl:p-3">Mobile</th>
              <th className="p-2.5 xl:p-3">Status</th>
              <th className="p-2.5 xl:p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAppointments.length > 0 ? (
              paginatedAppointments.map((apt, index) => {
                const pId = apt.patientId;
                const pInfo = getPatientInfo(pId, apt);
                const isExpanded = expandedRow === pId;
                const style = slotStyles[apt.slot] || slotStyles.Morning;

                return (
                  <React.Fragment key={pId || index}>
                    <tr
                      onClick={() => setExpandedRow(isExpanded ? null : pId)}
                      className={`hover:bg-slate-50/80 border-b border-slate-100/50 transition-colors duration-200 cursor-pointer ${
                        isExpanded ? "bg-slate-50/85" : ""
                      }`}
                    >
                      <td className="p-2.5 xl:p-3 pl-4 xl:pl-5 text-center text-slate-500 font-medium relative">
                        <div className="flex items-center justify-center gap-2">
                          <Icon
                            icon={isExpanded ? "solar:alt-arrow-down-bold" : "solar:alt-arrow-right-bold"}
                            className="text-blue-500 transition-transform"
                          />
                          <span>{startIndex + index + 1}</span>
                        </div>
                      </td>
                      <td className="p-2.5 xl:p-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center border border-white shadow-sm">
                            {pInfo.photo ? (
                              <img src={pInfo.photo} alt={pInfo.name} className="w-full h-full object-cover" />
                            ) : (
                              <Icon icon="solar:user-bold" className="text-slate-300 text-xs" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800 text-xs leading-snug">{pInfo.name}</span>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">#{pId?.slice(-6) || "ID"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-2.5 xl:p-3 text-xs font-semibold text-slate-600 capitalize">
                        {pInfo.gender ? `${pInfo.gender}, ${pInfo.age} yrs` : "-"}
                      </td>
                      <td className="p-2.5 xl:p-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider border ${style.bg}`}>
                            <Icon icon={style.icon} className="text-xs" />
                            {apt.slot}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold">{apt.time}</span>
                        </div>
                      </td>
                      <td className="p-2.5 xl:p-3 text-xs font-semibold text-slate-600 max-w-[150px] truncate" title={pInfo.primaryComplaint}>
                        {pInfo.primaryComplaint}
                      </td>
                      <td className="p-2.5 xl:p-3 text-xs font-semibold text-slate-600">{pInfo.phone}</td>
                      <td className="p-2.5 xl:p-3">
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              ["Completed", "Checked-out"].includes(apt.status)
                                ? "bg-emerald-500"
                                : ["Checked-in"].includes(apt.status)
                                ? "bg-amber-500"
                                : "bg-blue-500"
                            }`}
                          ></div>
                          <span className="text-[11px] font-bold text-slate-700 capitalize">{apt.status}</span>
                        </div>
                      </td>
                      <td className="p-2.5 xl:p-3 text-center">
                        <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => navigate(`/assessment/${pId}`)}
                            className="bg-blue-600 text-white px-2.5 py-1 rounded-lg text-[9px] uppercase font-black tracking-widest hover:bg-blue-700 transition-colors shadow-sm active:scale-95 whitespace-nowrap flex items-center justify-center gap-1"
                          >
                            <span>Ongoing Treatment</span>
                            <Icon icon="solar:alt-arrow-right-bold" />
                          </button>
                          <button
                            onClick={() => window.open(`https://wa.me/${pInfo.phone}`, "_blank")}
                            className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 hover:bg-emerald-600 hover:text-white text-emerald-600 flex items-center justify-center transition-all active:scale-95 shrink-0"
                            title="Chat on WhatsApp"
                          >
                            <Icon icon="ic:baseline-whatsapp" width={14} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable detailed rows */}
                    {isExpanded && (
                      <tr className="bg-slate-50/50 border-b border-slate-200 shadow-inner">
                        <td colSpan={8} className="p-6 whitespace-normal">
                          {/* Quick Actions Bar */}
                          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6 bg-slate-100/50 backdrop-blur-xl p-3.5 rounded-2xl border border-slate-200/50 animate-fade-in">
                            <span className="text-slate-600 font-extrabold text-xs uppercase tracking-widest pl-2">Patient Quick Actions</span>
                            <div className="flex flex-wrap bg-slate-200/60 rounded-xl p-1 gap-1 items-center shadow-inner">
                              <button
                                title="Edit"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (
                                    user?.userType === "generalManager" ||
                                    user?.userType === "receptionist"
                                  ) {
                                    message.warning("Permission denied");
                                    return;
                                  }
                                  navigate(`/enquiry-registration/${pId}`);
                                }}
                                className="px-4 py-2 hover:bg-white rounded-lg text-slate-500 hover:text-primary-600 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider duration-300"
                              >
                                <Icon icon="solar:pen-linear" width="16" height="16" />
                                <span>Edit</span>
                              </button>

                              <button
                                title="View Details"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/patient-details/${pId}`);
                                }}
                                className="px-4 py-2 hover:bg-white rounded-lg text-slate-500 hover:text-blue-500 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider duration-300"
                              >
                                <Icon icon="solar:document-linear" width="16" height="16" />
                                <span>Fullscreen</span>
                              </button>

                              <button
                                title="Health Monitor"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/health-dashboard/${pId}`);
                                }}
                                className="px-4 py-2 hover:bg-white rounded-lg text-slate-500 hover:text-rose-500 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider duration-300"
                              >
                                <Icon icon="solar:heart-pulse-linear" width="16" height="16" />
                                <span>Monitor</span>
                              </button>

                              <button
                                title="AI Report"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOverallAIReport(pId, pInfo.name);
                                }}
                                className="px-4 py-2 hover:bg-white rounded-lg text-slate-500 hover:text-emerald-600 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider duration-300"
                              >
                                <Icon icon="solar:magic-stick-3-linear" width="16" height="16" />
                                <span>AI Report</span>
                              </button>
                            </div>
                          </div>
                          <PatientDetails patientId={pId} isNested={true} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-12 text-slate-300">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Icon icon="solar:calendar-minimalistic-linear" width={40} />
                    <span className="text-sm font-semibold">No appointments found matching filters</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Row */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4 shrink-0">
          <span className="text-slate-500 text-xs font-semibold">
            Showing {startIndex + 1} to {Math.min(startIndex + PAGE_SIZE, totalItems)} of {totalItems} patients
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-xl border border-slate-200 text-slate-600 flex items-center justify-center bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Icon icon="solar:alt-arrow-left-outline" />
            </button>
            <span className="text-slate-800 text-xs font-bold px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-xl border border-slate-200 text-slate-600 flex items-center justify-center bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Icon icon="solar:alt-arrow-right-outline" />
            </button>
          </div>
        </div>
      )}

      {/* Clinical data modal wrapper */}
      {modalConfig.isOpen && (
        <PatientClinicalDataModal
          isOpen={modalConfig.isOpen}
          onClose={() => setModalConfig({ isOpen: false, type: null, patientId: null })}
          type={modalConfig.type}
          patientId={modalConfig.patientId}
          isDemoMode={isDemoMode}
        />
      )}

      {/* Overall AI Health Summary Modal */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-300 no-print">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Icon icon="solar:magic-stick-3-linear" className="text-xl" />
                </div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">AI Health Summary for <span className="text-emerald-600">{aiReportPatientName}</span></h2>
              </div>
              <button onClick={() => setIsAIModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-xl hover:bg-red-50">
                <Icon icon="solar:close-circle-linear" className="text-2xl" />
              </button>
            </div>
            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar bg-white">
              {loadingAIReport ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Icon icon="line-md:loading-twotone-loop" className="text-5xl text-emerald-600 animate-spin" />
                  <span className="font-extrabold text-slate-600 text-sm uppercase tracking-widest">Aggregating records & generating AI summary...</span>
                </div>
              ) : (
                <>
                  <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm">
                    <div className="whitespace-pre-wrap font-sans bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-inner">
                      {aiReportContent}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end bg-slate-50/30">
              <button onClick={() => setIsAIModalOpen(false)} className="px-8 py-3 bg-slate-800 text-white rounded-xl text-sm font-black hover:bg-slate-900 transition-all shadow-lg shadow-slate-200 uppercase tracking-widest">
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayAppointmentsTable;
