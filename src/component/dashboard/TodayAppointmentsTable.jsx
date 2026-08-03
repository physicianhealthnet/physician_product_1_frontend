import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { AxiosInstance } from "../../utilities/AxiosInstance";
import PatientClinicalDataModal from "./PatientClinicalDataModal";

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
      icon: "solar:sun-2-bold-duotone",
      iconColor: "text-amber-500"
    },
    Afternoon: {
      bg: "bg-sky-50/80 text-sky-700 border-sky-200/50",
      icon: "solar:clouds-bold-duotone",
      iconColor: "text-sky-500"
    },
    Evening: {
      bg: "bg-indigo-50/80 text-indigo-700 border-indigo-200/50",
      icon: "solar:moon-bold-duotone",
      iconColor: "text-indigo-600"
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/60 backdrop-blur-sm rounded-3xl p-6 border-gray-200 border shadow-sm hover:shadow-md transition-shadow">
      {/* Table Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Icon icon="solar:calendar-date-bold-duotone" width={22} />
          </div>
          <div>
            <h3 className="text-slate-800 font-black text-lg leading-tight">Today's Appointments</h3>
            <p className="text-slate-400 text-xs font-semibold">Morning, Afternoon & Evening Schedule</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Icon icon="solar:magnifer-linear" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          <input
            type="text"
            placeholder="Search patient, ID, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <Icon icon="solar:close-circle-bold" className="text-lg" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-100 pb-4">
        {[
          { id: "all", label: "All Today", count: allTodayAppointments.length, icon: "solar:users-group-two-rounded-bold-duotone", activeBg: "bg-blue-600 text-white" },
          { id: "morning", label: "Morning", count: morningAppointments.length, icon: "solar:sun-2-bold-duotone", activeBg: "bg-amber-500 text-white" },
          { id: "afternoon", label: "Afternoon", count: afternoonAppointments.length, icon: "solar:clouds-bold-duotone", activeBg: "bg-sky-500 text-white" },
          { id: "evening", label: "Evening", count: eveningAppointments.length, icon: "solar:moon-bold-duotone", activeBg: "bg-indigo-600 text-white" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? `${tab.activeBg} shadow-sm shadow-slate-200 scale-[1.02]`
                : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Icon icon={tab.icon} className="text-sm" />
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
              {tab.count}
            </span>
          </button>
        ))}
        {loadingDetails && (
          <div className="flex items-center gap-1.5 ml-auto text-blue-500 text-xs font-bold animate-pulse">
            <Icon icon="solar:spinner-linear" className="animate-spin text-sm" />
            <span>Updating Details...</span>
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-x-auto custom-scrollbar -mx-6 px-6">
        <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
          <thead>
            <tr className="bg-slate-50/50 text-[10px] uppercase font-black text-slate-500 tracking-widest border-b border-slate-100">
              <th className="p-4 pl-6 w-16 text-center">#</th>
              <th className="p-4">Patient</th>
              <th className="p-4">Gender & Age</th>
              <th className="p-4">Slot & Time</th>
              <th className="p-4">Primary Complaint</th>
              <th className="p-4">Mobile</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
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
                      <td className="p-4 pl-6 text-center text-slate-500 font-medium relative">
                        <div className="flex items-center justify-center gap-2">
                          <Icon
                            icon={isExpanded ? "solar:alt-arrow-down-bold" : "solar:alt-arrow-right-bold"}
                            className="text-blue-500 transition-transform"
                          />
                          <span>{startIndex + index + 1}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center border border-white shadow-sm">
                            {pInfo.photo ? (
                              <img src={pInfo.photo} alt={pInfo.name} className="w-full h-full object-cover" />
                            ) : (
                              <Icon icon="solar:user-bold" className="text-slate-300 text-sm" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800 text-sm leading-snug">{pInfo.name}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">#{pId?.slice(-6) || "ID"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-semibold text-slate-600 capitalize">
                        {pInfo.gender ? `${pInfo.gender}, ${pInfo.age} yrs` : "-"}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${style.bg}`}>
                            <Icon icon={style.icon} className="text-xs" />
                            {apt.slot}
                          </span>
                          <span className="text-xs text-slate-400 font-bold">{apt.time}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-semibold text-slate-600 max-w-[180px] truncate" title={pInfo.primaryComplaint}>
                        {pInfo.primaryComplaint}
                      </td>
                      <td className="p-4 text-sm font-semibold text-slate-600">{pInfo.phone}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              ["Completed", "Checked-out"].includes(apt.status)
                                ? "bg-emerald-500"
                                : ["Checked-in"].includes(apt.status)
                                ? "bg-amber-500"
                                : "bg-blue-500"
                            }`}
                          ></div>
                          <span className="text-xs font-bold text-slate-700 capitalize">{apt.status}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => navigate(`/assessment/${pId}`)}
                            className="bg-blue-600 text-white px-3.5 py-1.5 rounded-xl text-[10px] uppercase font-black tracking-widest hover:bg-blue-700 transition-colors shadow-sm active:scale-95 whitespace-nowrap flex items-center justify-center gap-1.5"
                          >
                            <span>Ongoing Treatment</span>
                            <Icon icon="solar:alt-arrow-right-bold" />
                          </button>
                          <button
                            onClick={() => window.open(`https://wa.me/${pInfo.phone}`, "_blank")}
                            className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-600 hover:text-white text-emerald-600 flex items-center justify-center transition-all active:scale-95"
                            title="Chat on WhatsApp"
                          >
                            <Icon icon="ic:baseline-whatsapp" width={18} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable detailed rows */}
                    {isExpanded && (
                      <tr className="bg-slate-50/50 border-b border-slate-200 shadow-inner">
                        <td colSpan={8} className="p-0 whitespace-normal max-w-0">
                          <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {/* General / Location info */}
                              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-4 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Additional Info</h4>
                                <div className="flex flex-col gap-3 mt-auto">
                                  <div className="flex items-center gap-2 text-sm bg-slate-50 p-2.5 rounded-xl">
                                    <Icon icon="solar:hashtag-bold-duotone" className="text-blue-500 text-lg shrink-0" />
                                    <span className="text-slate-500 text-xs font-semibold">Patient ID:</span>
                                    <span className="font-bold text-slate-800 ml-auto bg-slate-200 px-2.5 py-0.5 rounded-lg text-xs">{pId}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm bg-slate-50 p-2.5 rounded-xl">
                                    <Icon icon="solar:map-point-bold-duotone" className="text-blue-500 text-lg shrink-0" />
                                    <span className="text-slate-500 text-xs font-semibold">Location:</span>
                                    <span className="font-bold text-slate-800 ml-auto text-xs truncate max-w-[200px]" title={pInfo.location}>{pInfo.location}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Attender details */}
                              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-4 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Attender Details</h4>
                                <div className="flex flex-col gap-3 text-sm mt-auto">
                                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl">
                                    <Icon icon="solar:user-rounded-bold-duotone" className="text-amber-500 text-lg shrink-0" />
                                    <span className="text-slate-500 text-xs font-semibold">Name:</span>
                                    <span className="font-bold text-slate-800 ml-auto text-xs truncate max-w-[180px]">{pInfo.attenderName}</span>
                                  </div>
                                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl">
                                    <Icon icon="solar:phone-bold-duotone" className="text-amber-500 text-lg shrink-0" />
                                    <span className="text-slate-500 text-xs font-semibold">Phone:</span>
                                    <span className="font-bold text-slate-800 ml-auto text-xs">{pInfo.attenderPhone}</span>
                                  </div>
                                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl">
                                    <Icon icon="solar:users-group-two-rounded-bold-duotone" className="text-amber-500 text-lg shrink-0" />
                                    <span className="text-slate-500 text-xs font-semibold">Relation:</span>
                                    <span className="font-bold text-slate-800 ml-auto text-xs capitalize">{pInfo.attenderRelationship}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Clinical reports status */}
                              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-4 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Clinical Reports</h4>
                                <div className="flex flex-col gap-3 mt-auto">
                                  <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
                                    <Icon icon="solar:document-medicine-bold-duotone" className="text-blue-500 text-lg shrink-0" />
                                    <span className="text-slate-500 text-xs font-bold">Prescriptions:</span>
                                    <button
                                      onClick={() => setModalConfig({ isOpen: true, type: 'prescription', patientId: pId })}
                                      className="bg-white border border-blue-200 text-blue-600 px-3 py-1.5 rounded-xl text-[10px] hover:bg-blue-600 hover:text-white transition-colors shadow-sm active:scale-95 ml-auto font-black uppercase tracking-wider"
                                    >
                                      {pInfo.prescriptionsCount > 0 ? `View (${pInfo.prescriptionsCount})` : "View"}
                                    </button>
                                  </div>
                                  <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
                                    <Icon icon="solar:test-tube-bold-duotone" className="text-rose-500 text-lg shrink-0" />
                                    <span className="text-slate-500 text-xs font-bold">Lab Reports:</span>
                                    <button
                                      onClick={() => setModalConfig({ isOpen: true, type: 'lab', patientId: pId })}
                                      className="bg-white border border-rose-200 text-rose-600 px-3 py-1.5 rounded-xl text-[10px] hover:bg-rose-600 hover:text-white transition-colors shadow-sm active:scale-95 ml-auto font-black uppercase tracking-wider"
                                    >
                                      {pInfo.labReportsCount > 0 ? `View (${pInfo.labReportsCount})` : "View"}
                                    </button>
                                  </div>
                                  <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
                                    <Icon icon="solar:scanner-bold-duotone" className="text-purple-500 text-lg shrink-0" />
                                    <span className="text-slate-500 text-xs font-bold">Scan Reports:</span>
                                    <button
                                      onClick={() => setModalConfig({ isOpen: true, type: 'scan', patientId: pId })}
                                      className="bg-white border border-purple-200 text-purple-600 px-3 py-1.5 rounded-xl text-[10px] hover:bg-purple-600 hover:text-white transition-colors shadow-sm active:scale-95 ml-auto font-black uppercase tracking-wider"
                                    >
                                      {pInfo.scanReportsCount > 0 ? `View (${pInfo.scanReportsCount})` : "View"}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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
    </div>
  );
};

export default TodayAppointmentsTable;
