import React, { useEffect, useState, useMemo } from "react";
import { Modal, message } from "antd";
import "./Table.css";
import { AxiosInstance } from "../../utilities/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { Icon } from "@iconify/react/dist/iconify.js";
import CustomMessageWindow from "../whatsApp/CustomMessageWindow";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { TableSkeleton } from "../ui/Skeleton";
import PatientClinicalDataModal from "../dashboard/PatientClinicalDataModal";
import dayjs from "dayjs";
import PatientDetails from "../../pages/general/patientDetails/PatientDetails";

const PAGE_SIZE = 5;

const PatientInfoTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [whatsAppModalVisible, setWhatsAppModalVisible] = useState(false);
  const [targetedPatient, setTargetedPatient] = useState(null);

  const [search, setSearch] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [locationIdSearch, setLocationIdSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const [patientDetails, setPatientDetails] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: null, // 'prescription', 'lab', 'scan'
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

  const user = JSON.parse(sessionStorage.getItem("user"));
  const clinicId = user?.clinicId;

  const handleMessage = (patient) => {
    setTargetedPatient(patient);
    setWhatsAppModalVisible((prev) => !prev);
  };

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http") || url.startsWith("data:")) return url;
    // Extract base URL dynamically from AxiosInstance (e.g., http://localhost:3026/api -> http://localhost:3026)
    const rawBaseUrl = AxiosInstance.defaults.baseURL || "http://localhost:3026";
    const baseUrl = rawBaseUrl.replace(/\/api\/?$/, "");
    return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  // Fetch basic patient data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Reset page if filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, phoneSearch, nameSearch, locationIdSearch, genderFilter]);

  const fetchData = async () => {
    setLoading(true);
    const route1 = `/patient/get-all-by-clinic/${clinicId}`;
    const route2 = "/patient/get-all";
    try {
      const response = await AxiosInstance.get(clinicId ? route1 : route2);
      setData(response.data.patients || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // Local filtering for search and gender
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = search
        ? Object.values(item).some((value) =>
            String(value).toLowerCase().includes(search.toLowerCase()),
          )
        : true;

      const matchesPhone = phoneSearch
        ? String(item.patientPhone || "")
            .toLowerCase()
            .includes(phoneSearch.toLowerCase())
        : true;

      const matchesName = nameSearch
        ? String(item.patientName || "")
            .toLowerCase()
            .includes(nameSearch.toLowerCase())
        : true;

      const matchesLocationId = locationIdSearch
        ? String(item.location || "")
            .toLowerCase()
            .includes(locationIdSearch.toLowerCase()) ||
          String(item.patientId || "")
            .toLowerCase()
            .includes(locationIdSearch.toLowerCase())
        : true;

      const matchesGender = genderFilter
        ? item.patientGender === genderFilter
        : true;

      return (
        matchesSearch &&
        matchesPhone &&
        matchesName &&
        matchesLocationId &&
        matchesGender
      );
    });
  }, [data, search, phoneSearch, nameSearch, locationIdSearch, genderFilter]);

  // Pagination calculations (disabled/full scroll)
  const total = filteredData.length;
  const startIdx = 0;
  const currentRows = filteredData;

  const currentIdsList = useMemo(() => {
    return currentRows.map((p) => p.patientId).join(",");
  }, [currentRows]);

  // Fetch detailed info for current page patients
  useEffect(() => {
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
  }, [currentIdsList]);

  return (
    <Card className="border-none shadow-none bg-transparent p-0 flex flex-col h-auto w-full">
      {/* Filter/Search Bar */}
      <div className="flex justify-between items-center mb-4 shrink-0 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:items-center gap-4 w-full">
          <div className="relative w-full lg:w-64">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-700 placeholder:text-slate-400"
              placeholder="Enter phone no"
              value={phoneSearch}
              onChange={(e) => setPhoneSearch(e.target.value)}
            />
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          </div>

          <div className="relative w-full lg:w-64">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-700 placeholder:text-slate-400"
              placeholder="Name"
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
            />
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          </div>

          <div className="relative w-full lg:w-64">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-700 placeholder:text-slate-400"
              placeholder="Location or Patient ID"
              value={locationIdSearch}
              onChange={(e) => setLocationIdSearch(e.target.value)}
            />
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          </div>

          <div className="relative w-full lg:w-64">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-700 placeholder:text-slate-400"
              placeholder="Search by keyword (Search all)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          </div>

          <select
            className="w-full lg:w-48 px-4 py-2.5 bg-white border border-slate-200 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-slate-700"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Others</option>
          </select>

          {loadingDetails && (
            <div className="flex items-center gap-2 text-blue-500 ml-2">
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
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-sm border border-slate-200 shadow-sm flex-1 custom-scrollbar max-h-[500px]">
        <table className="w-full text-sm text-left whitespace-nowrap min-w-max border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium uppercase tracking-wider sticky top-0 z-20">
            <tr>
              <th className="py-4 px-6 text-center w-16">#</th>
              <th className="py-4 px-6 text-center">ID</th>
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6 text-center">Gender</th>
              <th className="py-4 px-6 text-center">Age</th>
              <th className="py-4 px-6 text-center">Mobile</th>
              <th className="py-4 px-6">Location</th>
              <th className="py-4 px-6 text-center">Primary Doctor</th>
              <th className="py-4 px-6">Complaint</th>
              <th className="py-4 px-6">Appointment Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {loading ? (
              <tr>
                <td colSpan={10} className="p-0">
                  <TableSkeleton rows={5} />
                </td>
              </tr>
            ) : currentRows.length ? (
              currentRows.map((patient, index) => {
                const detailsObj = patientDetails[patient.patientId] || {};
                const isOldPatient = detailsObj.isOldPatient || false;
                const detail = detailsObj.patientDetails || {};

                return (
                  <React.Fragment key={patient.patientId}>
                    <tr
                      className={`hover:bg-slate-50 transition-colors cursor-pointer ${expandedRow === patient.patientId ? "bg-slate-50" : ""}`}
                      onClick={() => setExpandedRow(expandedRow === patient.patientId ? null : patient.patientId)}
                    >
                      <td className="py-4 px-6 text-center text-slate-500 font-medium relative">
                        <div className="flex items-center justify-center gap-2">
                          <Icon 
                            icon={expandedRow === patient.patientId ? "solar:alt-arrow-down-linear" : "solar:alt-arrow-right-linear"} 
                            className="text-primary-500 transition-transform"
                          />
                          <span>{startIdx + index + 1}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center font-medium text-slate-700">
                        <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold">
                          {patient.patientId}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-800">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                            {patient.profileImg || patient.photo ? (
                              <img
                                src={getImageUrl(patient.profileImg || patient.photo)}
                                alt={patient.patientName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Icon
                                icon="solar:user-linear"
                                className="text-slate-300 text-xs"
                              />
                            )}
                          </div>
                          <span className="font-extrabold text-slate-800 text-sm tracking-tight">
                            {patient.patientName}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center capitalize text-slate-600 font-medium">
                        {patient.patientGender || "-"}
                      </td>
                      <td className="py-4 px-6 text-center text-slate-600 font-medium">
                        {patient.patientAge || "-"}
                      </td>
                      <td 
                        className="py-4 px-6 text-center text-slate-600 font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span>{patient.patientPhone || "-"}</span>
                          {patient.patientPhone && (
                            <div className="flex items-center gap-1">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`https://wa.me/${String(patient.patientPhone).replace(/\D/g, '')}`, "_blank");
                                }}
                                className="p-1.5 hover:bg-green-50 rounded-full text-green-600 transition-colors flex items-center justify-center shadow-sm border border-transparent hover:border-green-200"
                                title="WhatsApp Chat"
                              >
                                <Icon icon="ic:baseline-whatsapp" className="text-[16px]" />
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate('/patient-chat', { state: { patientId: patient.patientId } });
                                }}
                                className="p-1.5 hover:bg-blue-50 rounded-full text-blue-600 transition-colors flex items-center justify-center shadow-sm border border-transparent hover:border-blue-200"
                                title="Web Chat"
                              >
                                <Icon icon="solar:chat-round-dots-linear" className="text-[16px]" />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600 font-medium">
                        {patient.location || "-"}
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-blue-600">
                        {patient.docName || patient.doctor || "—"}
                      </td>
                      <td
                        className="py-4 px-6 text-slate-600 font-medium max-w-[150px] truncate"
                        title={detail.primaryComplaint}
                      >
                        {detail.primaryComplaint || "-"}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Icon
                            icon="solar:calendar-mark-linear"
                            className="text-purple-500"
                          />
                          <span className="font-bold text-slate-800">
                            {patient.appointmentDate
                              ? dayjs(patient.appointmentDate).format(
                                  "DD MMM YYYY",
                                )
                              : dayjs(patient.date || patient.createdAt).format(
                                  "DD MMM YYYY",
                                )}
                          </span>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Colab Content */}
                    {expandedRow === patient.patientId && (
                      <tr className="bg-slate-50/50 border-b border-slate-200 shadow-inner">
                        <td colSpan={10} className="p-6 whitespace-normal max-w-0">
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
                                <Icon icon="solar:pen-linear" width="16" height="16" />
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
                                <Icon icon="solar:document-linear" width="16" height="16" />
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
                                <Icon icon="solar:heart-pulse-linear" width="16" height="16" />
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
                                <Icon icon="solar:magic-stick-3-linear" width="16" height="16" />
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
                <td colSpan={10} className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Icon
                      icon="solar:box-minimalistic-linear"
                      width="40"
                      height="40"
                      className="opacity-50"
                    />
                    <p>No patients found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>



      {whatsAppModalVisible && (
        <CustomMessageWindow
          targetedPatient={targetedPatient}
          whatsAppModalVisible={whatsAppModalVisible}
          setWhatsAppModalVisible={setWhatsAppModalVisible}
        />
      )}

      <PatientClinicalDataModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        type={modalConfig.type}
        patientId={modalConfig.patientId}
        filterDate={modalConfig.filterDate}
      />

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
    </Card>
  );
};
export default PatientInfoTable;
