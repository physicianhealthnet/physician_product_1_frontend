import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { AxiosInstance } from "../../utilities/AxiosInstance";
import PatientClinicalDataModal from "./PatientClinicalDataModal";
import { message } from "antd";
import PatientDetails from "../../pages/general/patientDetails/PatientDetails";

const PAGE_SIZE = 5;

const PatientDetailsTable = ({
  todayAppointments = [],
  futureAppointments = [],
  isDemoMode = false,
  demoPatients = [],
  demoPatientDetails = {},
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [patientDetails, setPatientDetails] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: null,
    patientId: null,
  });
  const [expandedRow, setExpandedRow] = useState(null);

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

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const clinicId = user?.clinicId;

  // Handle demo mode vs real data fetching
  useEffect(() => {
    if (isDemoMode) {
      setData(demoPatients);
      setPatientDetails(demoPatientDetails);
    } else {
      const fetchAllPatients = async () => {
        setLoading(true);
        const route1 = `/patient/get-all-by-clinic/${clinicId}`;
        const route2 = "/patient/get-all";
        try {
          const response = await AxiosInstance.get(clinicId ? route1 : route2);
          setData(response.data.patients || []);
        } catch (error) {
          console.error("Error fetching all patients:", error);
        }
        setLoading(false);
      };

      fetchAllPatients();
    }
  }, [isDemoMode, clinicId, demoPatients, demoPatientDetails]);

  // Sort data so today's and future appointments appear first
  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const priorityAptMap = new Map();
    todayAppointments.forEach((a) => {
      priorityAptMap.set(a.patientId, { ...a, priority: 1 }); // Priority 1 for today
    });
    futureAppointments.forEach((a) => {
      if (!priorityAptMap.has(a.patientId)) {
        priorityAptMap.set(a.patientId, { ...a, priority: 2 }); // Priority 2 for future
      }
    });

    return [...data].sort((a, b) => {
      const aPriority = priorityAptMap.has(a.patientId)
        ? priorityAptMap.get(a.patientId).priority
        : 99;
      const bPriority = priorityAptMap.has(b.patientId)
        ? priorityAptMap.get(b.patientId).priority
        : 99;

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA; // Newest registrations first
    });
  }, [data, todayAppointments, futureAppointments]);

  // Pagination calculations
  const total = sortedData.length;
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const currentRows = useMemo(() => {
    return sortedData.slice(startIdx, startIdx + PAGE_SIZE);
  }, [sortedData, startIdx]);

  const currentIdsList = useMemo(() => {
    return currentRows.map((p) => p.patientId).join(",");
  }, [currentRows]);

  // Fetch detailed info for current page patients
  useEffect(() => {
    if (isDemoMode) return;
    const fetchDetails = async () => {
      if (!currentIdsList) return;
      setLoadingDetails(true);
      try {
        const res = await AxiosInstance.get(
          `/business-tool/dashboard-patient-list?patientIds=${currentIdsList}`,
        );
        if (res.data && res.data.data) {
          setPatientDetails((prev) => ({ ...prev, ...res.data.data }));
        }
      } catch (err) {
        console.error("Failed to fetch patient detailed list", err);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchDetails();
  }, [currentIdsList, isDemoMode]);

  if (loading && data.length === 0) {
    return (
      <div className="mt-8 bg-white/70 backdrop-blur-3xl border border-slate-200 shadow-sm rounded-2xl p-12 flex flex-col items-center justify-center">
        <Icon
          icon="solar:spinner-linear"
          className="animate-spin text-blue-500 text-3xl mb-4"
        />
        <span className="text-sm font-bold text-slate-500">
          Loading all patients...
        </span>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white/70 backdrop-blur-3xl border border-slate-200 shadow-sm rounded-2xl overflow-hidden flex flex-col">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50 shrink-0">
        <h2 className="text-xl font-black text-slate-800">
          Patient Details <span className="text-blue-500">List</span>
        </h2>
        {loadingDetails && (
          <div className="flex items-center gap-2 text-blue-500">
            <Icon
              icon="solar:spinner-linear"
              className="animate-spin text-xl"
            />
            <span className="text-xs font-bold uppercase tracking-widest">
              Loading details...
            </span>
          </div>
        )}
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
          <thead>
            <tr className="bg-slate-50/50 text-[10px] uppercase font-black text-slate-500 tracking-widest border-b border-slate-100">
              <th className="p-4 pl-6 w-16 text-center">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Gender</th>
              <th className="p-4">Age</th>
              <th className="p-4">Mobile</th>
              <th className="p-4">Primary Doctor</th>
              <th className="p-4">Primary Complaint</th>
              <th className="p-4 text-center">Ongoing Treatment</th>
              <th className="p-4">Appointment Date</th>
              <th className="p-4">Last Visit Date</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((patient, index) => {
                const detailsObj = patientDetails[patient.patientId] || {};
                const detail = detailsObj.patientDetails || {};
                const todayApt = todayAppointments.find(
                  (a) => a.patientId === patient.patientId,
                );
                const futureApt = futureAppointments.find(
                  (a) => a.patientId === patient.patientId,
                );
                const priorityApt = todayApt || futureApt;

                return (
                  <React.Fragment key={patient.patientId || index}>
                    <tr
                      onClick={() =>
                        setExpandedRow(
                          expandedRow === patient.patientId
                            ? null
                            : patient.patientId,
                        )
                      }
                      className={`hover:bg-slate-50/80 border-b border-slate-100/50 transition-colors duration-200 cursor-pointer ${expandedRow === patient.patientId ? "bg-slate-50/80" : ""}`}
                    >
                      <td className="p-4 pl-6 text-center text-slate-500 font-medium relative">
                        <div className="flex items-center justify-center gap-2">
                          <Icon
                            icon={
                              expandedRow === patient.patientId
                                ? "solar:alt-arrow-down-bold"
                                : "solar:alt-arrow-right-bold"
                            }
                            className="text-primary-500 transition-transform"
                          />
                          <span>{startIdx + index + 1}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                            {patient.photo ? (
                              <img
                                src={patient.photo}
                                alt={patient.patientName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Icon
                                icon="solar:user-bold"
                                className="text-slate-300 text-xs"
                              />
                            )}
                          </div>
                          <span className="font-bold text-slate-800 text-sm">
                            {patient.patientName}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-600 capitalize">
                        {patient.patientGender || "-"}
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-600">
                        {patient.patientAge || "-"}
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-600">
                        {patient.patientPhone || "-"}
                      </td>
                      <td className="p-4 text-sm font-bold text-blue-600">-</td>
                      <td
                        className="p-4 text-sm font-medium text-slate-600 max-w-[150px] truncate"
                        title={detail.primaryComplaint}
                      >
                        {detail.primaryComplaint || "-"}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/assessment/${patient.patientId}`);
                          }}
                          className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-widest hover:bg-blue-700 transition-colors shadow-sm active:scale-95 whitespace-nowrap flex items-center justify-center gap-1.5 mx-auto"
                        >
                          <span>Ongoing Treatment</span>
                          <Icon icon="solar:alt-arrow-right-bold" />
                        </button>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Icon
                            icon="solar:calendar-mark-bold-duotone"
                            className={
                              priorityApt
                                ? todayApt
                                  ? "text-primary-500"
                                  : "text-purple-500"
                                : "text-slate-400"
                            }
                          />
                          {priorityApt ? (
                            <span className="font-bold text-slate-800">
                              {priorityApt.date
                                ? new Date(
                                    priorityApt.date,
                                  ).toLocaleDateString()
                                : todayApt
                                  ? new Date().toLocaleDateString()
                                  : ""}{" "}
                              {priorityApt.time ? `| ${priorityApt.time}` : ""}
                            </span>
                          ) : (
                            "-"
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-600">
                        {detail.visitedDate
                          ? new Date(detail.visitedDate).toLocaleDateString()
                          : patient.createdAt
                            ? new Date(patient.createdAt).toLocaleDateString()
                            : "-"}
                      </td>
                    </tr>

                    {/* Expanded Colab Content */}
                    {expandedRow === patient.patientId && (
                      <tr className="bg-slate-50/50 border-b border-slate-200 shadow-inner">
                        <td
                          colSpan={10}
                          className="p-6 whitespace-normal"
                        >
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
                                  navigate(`/enquiry-registration/${patient.patientId}`);
                                }}
                                className="px-4 py-2 hover:bg-white rounded-lg text-slate-500 hover:text-primary-600 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider duration-300"
                              >
                                <Icon icon="solar:pen-bold-duotone" width="16" height="16" />
                                <span>Edit</span>
                              </button>

                              <button
                                title="View Details"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/patient-details/${patient.patientId}`);
                                }}
                                className="px-4 py-2 hover:bg-white rounded-lg text-slate-500 hover:text-blue-500 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider duration-300"
                              >
                                <Icon icon="solar:document-bold-duotone" width="16" height="16" />
                                <span>Fullscreen</span>
                              </button>

                              <button
                                title="Health Monitor"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/health-dashboard/${patient.patientId}`);
                                }}
                                className="px-4 py-2 hover:bg-white rounded-lg text-slate-500 hover:text-rose-500 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider duration-300"
                              >
                                <Icon icon="solar:heart-pulse-bold-duotone" width="16" height="16" />
                                <span>Monitor</span>
                              </button>

                              <button
                                title="AI Report"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOverallAIReport(patient.patientId, patient.patientName);
                                }}
                                className="px-4 py-2 hover:bg-white rounded-lg text-slate-500 hover:text-emerald-600 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider duration-300"
                              >
                                <Icon icon="solar:magic-stick-3-bold-duotone" width="16" height="16" />
                                <span>AI Report</span>
                              </button>
                            </div>
                          </div>
                          <PatientDetails patientId={patient.patientId} isNested={true} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={10} className="p-8 text-center text-slate-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > 0 && (
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Showing {startIdx + 1}-{Math.min(startIdx + PAGE_SIZE, total)} of{" "}
            {total}
          </span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="w-8 h-8 flex items-center justify-center rounded bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Icon icon="solar:alt-arrow-left-bold" />
            </button>
            <span className="w-8 h-8 flex items-center justify-center rounded bg-blue-500 text-white font-bold text-sm">
              {currentPage}
            </span>
            <button
              disabled={currentPage >= Math.ceil(total / PAGE_SIZE)}
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(Math.ceil(total / PAGE_SIZE), prev + 1),
                )
              }
              className="w-8 h-8 flex items-center justify-center rounded bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Icon icon="solar:alt-arrow-right-outline" className="text-xl" />
            </button>
          </div>
        </div>
      )}

      <PatientClinicalDataModal
        isOpen={modalConfig.isOpen}
        onClose={() =>
          setModalConfig({ isOpen: false, type: null, patientId: null })
        }
        patientId={modalConfig.patientId}
        dataType={modalConfig.type}
      />

      {/* Overall AI Health Summary Modal */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-300 no-print">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Icon icon="solar:magic-stick-3-bold-duotone" className="text-xl" />
                </div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">AI Health Summary for <span className="text-emerald-600">{aiReportPatientName}</span></h2>
              </div>
              <button onClick={() => setIsAIModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-xl hover:bg-red-50">
                <Icon icon="solar:close-circle-bold-duotone" className="text-2xl" />
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

export default PatientDetailsTable;
