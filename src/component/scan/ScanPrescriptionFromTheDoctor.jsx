import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { AxiosInstance } from "../../utilities/AxiosInstance";
import dayjs from "dayjs";
import FileViewerModal from "./FileViewerModal";
import { jsPDF } from "jspdf";
import { message, Modal } from "antd";
import QuickLinks from "../ui/QuickLinks";

const SCAN_FIELD_SLIDES = [
  {
    id: 1,
    key: "patient",
    title: "Select Patient",
    description: "Search and select registered patient record.",
    icon: "tabler:user",
    required: true,
  },
  {
    id: 2,
    key: "doctor",
    title: "Requesting Doctor",
    description: "Select authorizing specialist doctor.",
    icon: "tabler:stethoscope",
    required: true,
  },
  {
    id: 3,
    key: "scan_type",
    title: "Scan Modality & Type",
    description: "Choose diagnostic scan type (MRI, CT, X-Ray, etc.).",
    icon: "tabler:activity",
    required: true,
  },
  {
    id: 4,
    key: "priority",
    title: "Priority Level",
    description: "Specify order priority urgency for diagnostic center.",
    icon: "tabler:alert-circle",
    required: false,
  },
  {
    id: 5,
    key: "schedule",
    title: "Schedule Date & Time",
    description: "Set optional appointment date and time.",
    icon: "tabler:calendar-time",
    required: false,
  },
  {
    id: 6,
    key: "review",
    title: "Review & Confirm Request",
    description: "Review complete scan request summary and submit order.",
    icon: "tabler:file-check",
    required: false,
  },
];

const SCAN_TYPES = [
  { label: "MRI Brain", icon: "tabler:brain" },
  { label: "MRI Spine", icon: "tabler:spine" },
  { label: "CT Scan", icon: "tabler:scan" },
  { label: "CT Abdomen", icon: "tabler:body-scan" },
  { label: "X-Ray Chest", icon: "tabler:report-medical" },
  { label: "Ultrasound", icon: "tabler:wave-sine" },
  { label: "ECG", icon: "tabler:heart-rate-monitor" },
  { label: "ECHO", icon: "tabler:heart" },
  { label: "Mammography", icon: "tabler:user-heart" },
];

const PRIORITY_OPTIONS = [
  { value: "High", label: "High Priority (Urgent)", bg: "bg-rose-50 text-rose-700 border-rose-200" },
  { value: "Medium", label: "Medium Priority (Standard)", bg: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: "Low", label: "Low Priority (Routine)", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
];

const SearchPicker = ({ label, options, value, onChange, placeholder }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );
  const selectedObj = options.find((o) => o.value === value);

  return (
    <div className="flex flex-col gap-2 relative text-left w-full">
      <label className="text-xs font-black tracking-wider uppercase text-slate-500 pl-1">
        {label}
      </label>
      <div
        onClick={() => setIsOpen(true)}
        className="px-5 py-3.5 rounded-2xl border border-slate-300 bg-white cursor-text flex justify-between items-center text-base font-semibold text-slate-800 shadow-xs h-14"
      >
        {isOpen ? (
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none w-full placeholder:text-slate-400 font-medium"
            placeholder="Type to search..."
            onBlur={() => setTimeout(() => setIsOpen(false), 250)}
          />
        ) : (
          <span
            className={
              selectedObj ? "text-slate-800 font-bold" : "text-slate-400 font-normal"
            }
          >
            {selectedObj ? selectedObj.label : placeholder}
          </span>
        )}
        <Icon
          icon="solar:alt-arrow-down-linear"
          className={`text-slate-400 transition-transform ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="absolute top-full mt-1 w-full max-h-56 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl z-50 py-1 hide-scrollbar">
          {filtered.length > 0 ? (
            filtered.map((opt) => (
              <div
                key={opt.value}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onChange(opt);
                  setQuery("");
                  setIsOpen(false);
                }}
                className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-sm font-bold text-slate-700 transition-colors"
              >
                {opt.label}
              </div>
            ))
          ) : (
            <div className="px-5 py-3 text-sm text-slate-400 font-medium text-center">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function ScanPrescriptionFromTheDoctor() {
  const [activeTab, setActiveTab] = useState("NOT SCHEDULED");
  const [metrics, setMetrics] = useState({
    todayTotal: 0,
    morning: 0,
    afternoon: 0,
    evening: 0,
    createdToday: 0,
    yesterday: 0,
    thisWeek: 0,
    thisMonth: 18,
    last3Months: 18,
  });
  const [pendingScans, setPendingScans] = useState([]);

  // Full Area Field Slider Wizard Hooks
  const [isWizardMode, setIsWizardMode] = useState(false);
  const [fieldStep, setFieldStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [previewUrl, setPreviewUrl] = useState(null);
  
  // File Upload State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedRowForUpload, setSelectedRowForUpload] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Schedule Modal State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedRowForSchedule, setSelectedRowForSchedule] = useState(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    PHN_ID: "",
    ptrName: "",
    ptNo: "",
    drName: "",
    doctorId: "",
    scanType: "MRI Brain",
    scanCenter: "INTERNAL",
    priority: "Medium",
    status: "Not Scheduled",
    prescriptionId: "PR-" + Math.floor(Math.random() * 10000),
    patientId: "",
    clinicId: "C-1",
    date: "",
    time: "",
  });

  const fetchDropdownData = async () => {
    try {
      const userStr = sessionStorage.getItem("user") || sessionStorage.getItem("master");
      const userObj = userStr ? JSON.parse(userStr) : {};
      const clinicId = userObj?.clinicId || userObj?.cid || "C-1";

      const [patRes, docRes] = await Promise.all([
        AxiosInstance.get(`/patient/get-all-by-clinic/${clinicId}`).catch(
          () => ({ data: [] })
        ),
        AxiosInstance.get(`/user/get-doctor?clinicId=${clinicId}`).catch(
          () => ({ data: [] })
        ),
      ]);

      let patArray =
        patRes.data?.patients ||
        patRes.data?.data ||
        (Array.isArray(patRes.data) ? patRes.data : []);
      setPatients(
        patArray.map((p) => {
          const pb = p.patientBasic || p;
          const name =
            `${pb.firstName || ""} ${pb.lastName || ""}`.trim() ||
            p.patientName ||
            "Patient";
          const pid = pb.patientId || pb._id || p.patientId;
          const PHN_ID = pb.PHN_ID;
          return {
            label: `${name} (${pid})`,
            value: pid,
            name: name,
            ptNo: pid,
            PHN_ID: PHN_ID,
            phone: pb.patientPhone || p.patientPhone,
          };
        })
      );

      let docArray =
        docRes.data?.users ||
        docRes.data?.data ||
        docRes.data?.doctors ||
        (Array.isArray(docRes.data)
          ? docRes.data
          : [docRes.data].filter(Boolean));
      setDoctors(
        docArray.map((d) => ({
          label: d.userName || d.name || "Unknown Doctor",
          value: d._id,
          name: d.userName || d.name,
        }))
      );
      setFormData((prev) => ({ ...prev, clinicId }));
    } catch (err) {
      console.error("Failed to load select targets", err);
    }
  };

  useEffect(() => {
    if (isWizardMode) fetchDropdownData();
  }, [isWizardMode]);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const generatePrescriptionPDF = (data, download = true) => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("SCAN PRESCRIPTION ORDER", 14, 20);
      doc.setFontSize(12);
      doc.text(`Prescription ID: ${data.prescriptionId || "N/A"}`, 14, 30);
      doc.text(`Patient Name: ${data.ptrName || "N/A"}`, 14, 40);
      doc.text(`Patient ID: ${data.ptNo || "N/A"}`, 14, 50);
      doc.text(`Doctor: ${data.drName || "N/A"}`, 14, 60);
      doc.text(`Scan Type: ${data.scanType || "N/A"}`, 14, 70);
      doc.text(`Priority: ${data.priority || "N/A"}`, 14, 80);
      doc.text(`Date: ${dayjs().format("DD MMM YYYY")}`, 14, 90);

      if (download) {
        doc.save(`Scan_Order_${data.prescriptionId || "PDF"}.pdf`);
        message.success("Prescription PDF downloaded!");
      }
      return doc.output("datauristring");
    } catch (err) {
      console.error("PDF generation failed", err);
      return "";
    }
  };

  const handleCreatePrescription = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.patientId || !formData.doctorId) {
      message.error("Please select a Patient and Requesting Doctor");
      return;
    }

    setIsSubmitting(true);
    try {
      const pdfBase64 = generatePrescriptionPDF(formData, false);
      const payload = { ...formData, pdfBase64 };

      if (formData.date && formData.time) {
        payload.appointmentDateTime = dayjs(
          `${formData.date}T${formData.time}`
        ).toISOString();
      }

      await AxiosInstance.post("/scan-prescription/create", payload).catch(() =>
        AxiosInstance.post("/scan-prescription", payload)
      );
      message.success("Scan Prescription Order created successfully!");
      setIsWizardMode(false);
      setFieldStep(1);
      fetchPendingScans();
    } catch (err) {
      console.error("Failed to create scan order:", err);
      message.error("Failed to submit scan request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchPendingScans = async () => {
    try {
      const res = await AxiosInstance.get("/scan-prescription/get-all");
      const list = res.data?.data || (Array.isArray(res.data) ? res.data : []);
      setPendingScans(list);

      const todayStr = dayjs().format("YYYY-MM-DD");
      const todayTotal = list.filter(
        (s) => dayjs(s.createdAt).format("YYYY-MM-DD") === todayStr
      ).length;
      setMetrics({
        todayTotal,
        morning: list.filter((s) => s.priority === "High").length,
        afternoon: list.filter((s) => s.priority === "Medium").length,
        evening: list.filter((s) => s.priority === "Low").length,
        createdToday: todayTotal,
        yesterday: list.length,
        thisWeek: list.length,
        thisMonth: list.length,
        last3Months: list.length,
      });
    } catch (err) {
      console.error("Failed to fetch pending scans", err);
    }
  };

  useEffect(() => {
    fetchPendingScans();
  }, []);

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Delete Scan Request",
      content: "Are you sure you want to delete this scan order?",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await AxiosInstance.delete(`/scan-prescription/delete/${id}`);
          message.success("Scan request deleted!");
          fetchPendingScans();
        } catch (err) {
          console.error("Failed to delete scan", err);
          message.error("Error deleting scan request");
        }
      },
    });
  };

  const handleScheduleSubmit = async () => {
    if (!scheduleDate || !scheduleTime) {
      message.error("Please select a valid date and time.");
      return;
    }
    
    setIsScheduling(true);
    try {
      const appointmentDateTime = dayjs(`${scheduleDate}T${scheduleTime}`).toISOString();
      await AxiosInstance.put(`/scan-prescription/${selectedRowForSchedule}/status`, { 
        status: "REPORT UPLOAD",
        appointmentDateTime 
      });
      message.success("Scan scheduled successfully!");
      setIsScheduleModalOpen(false);
      setSelectedRowForSchedule(null);
      setScheduleDate("");
      setScheduleTime("");
      fetchPendingScans();
    } catch (err) {
      console.error("Failed to schedule", err);
      message.error("Error scheduling appointment");
    } finally {
      setIsScheduling(false);
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadFile || !selectedRowForUpload) {
      message.error("Please select a file to upload");
      return;
    }
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append("scanReportFiles", uploadFile);
    
    try {
      await AxiosInstance.put(`/scan-prescription/${selectedRowForUpload}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      await AxiosInstance.put(`/scan-prescription/${selectedRowForUpload}/status`, { status: "COMPLETED" });
      message.success("Report uploaded and scan completed successfully!");
      setIsUploadModalOpen(false);
      setUploadFile(null);
      setSelectedRowForUpload(null);
      fetchPendingScans();
    } catch (err) {
      console.error("Upload error", err);
      message.error("Failed to upload report");
    } finally {
      setIsUploading(false);
    }
  };

  const activeSlideMeta = SCAN_FIELD_SLIDES[fieldStep - 1];

  const handleNextStep = () => {
    if (fieldStep === 1) {
      if (!formData.patientId) {
        message.error("Please select a Patient before proceeding");
        return;
      }
    } else if (fieldStep === 2) {
      if (!formData.doctorId) {
        message.error("Please select a Requesting Doctor before proceeding");
        return;
      }
    } else if (fieldStep === 3) {
      if (!formData.scanType) {
        message.error("Please select a Scan Modality / Type before proceeding");
        return;
      }
    }

    if (fieldStep < SCAN_FIELD_SLIDES.length) {
      setFieldStep((prev) => prev + 1);
    } else {
      handleCreatePrescription();
    }
  };

  const handlePrevStep = () => {
    if (fieldStep > 1) {
      setFieldStep((prev) => prev - 1);
    }
  };

  const handleSkipStep = () => {
    if (fieldStep < SCAN_FIELD_SLIDES.length) {
      setFieldStep((prev) => prev + 1);
    } else {
      handleCreatePrescription();
    }
  };

  const filteredScans = pendingScans.filter((s) => {
    if (activeTab === "NOT SCHEDULED") return s.status !== "COMPLETED" && s.status !== "Completed" && s.status !== "REPORT UPLOAD" && s.status !== "MISSED" && s.status !== "Missed";
    if (activeTab === "MISSED") return s.status === "MISSED" || s.status === "Missed";
    if (activeTab === "REPORT UPLOAD") return s.status === "REPORT UPLOAD";
    if (activeTab === "COMPLETED") return s.status === "COMPLETED" || s.status === "Completed";
    return true;
  });

  return (
    <div className="p-4 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight m-0">
            Scan Prescriptions <span className="text-blue-600">from Doctor</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-xl text-xs m-0">
            Manage and track X-Ray, CT, MRI, and diagnostic scan orders in real-time
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (isWizardMode) {
                setIsWizardMode(false);
              } else {
                setFieldStep(1);
                setIsWizardMode(true);
              }
            }}
            className="rounded-2xl px-6 h-11 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer border-none uppercase tracking-wider"
          >
            <Icon
              icon={isWizardMode ? "tabler:arrow-left" : "solar:add-circle-linear"}
              className="text-lg"
            />
            <span>{isWizardMode ? "Back to Dashboard" : "+ CREATE PRESCRIPTION"}</span>
          </button>

          {!isWizardMode && (
            <button
              type="button"
              className="rounded-2xl px-5 h-11 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Icon icon="solar:export-linear" className="text-base text-slate-500" />
              <span>EXPORT LISTS</span>
            </button>
          )}
        </div>
      </div>

      {!isWizardMode && (
        <QuickLinks links={[
          { label: "Lab Prescriptions", icon: "solar:test-tube-linear", route: "/lab-prescription-from-the-doctor", color: "amber" },
          { label: "Patients", icon: "solar:users-group-two-rounded-linear", route: "/home", color: "blue" },
        ]} />
      )}

      {/* FULL PAGE SLIDER WIZARD VIEW */}
      {isWizardMode ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 animate-in fade-in duration-300">
          {/* Stepper Nav Pills */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
            {SCAN_FIELD_SLIDES.map((step) => {
              const isActive = step.id === fieldStep;
              const isCompleted = step.id < fieldStep;

              return (
                <button
                  type="button"
                  key={step.id}
                  onClick={() => {
                    if (step.id <= fieldStep || isCompleted) {
                      setFieldStep(step.id);
                    }
                  }}
                  className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-2xl text-xs font-bold transition-all border flex items-center justify-between gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                      : isCompleted
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                      : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span
                      className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black ${
                        isActive
                          ? "bg-white text-blue-600"
                          : isCompleted
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {step.id}
                    </span>
                    <span className="truncate">{step.title}</span>
                  </div>
                  {isCompleted && (
                    <Icon icon="tabler:check" className="text-xs shrink-0 text-emerald-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500 rounded-full"
              style={{ width: `${(fieldStep / SCAN_FIELD_SLIDES.length) * 100}%` }}
            />
          </div>

          {/* Active Sub-slide Header Bar */}
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-50/80 to-slate-50 p-5 rounded-2xl border border-blue-100/80">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20 flex items-center justify-center">
                <Icon icon={activeSlideMeta.icon} className="text-xl" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">
                    Field {fieldStep} of {SCAN_FIELD_SLIDES.length}
                  </span>
                  {activeSlideMeta.required ? (
                    <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Mandatory *
                    </span>
                  ) : (
                    <span className="bg-slate-200 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                      Optional (Can Skip)
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-black text-slate-800 m-0 mt-0.5">
                  {activeSlideMeta.title}
                </h3>
              </div>
            </div>

            {!activeSlideMeta.required && (
              <button
                type="button"
                onClick={handleSkipStep}
                className="text-xs text-slate-500 hover:text-blue-600 font-bold px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-blue-300 bg-white transition-all cursor-pointer flex items-center gap-1"
              >
                <span>Skip Field</span>
                <Icon icon="tabler:player-skip-forward" className="text-sm" />
              </button>
            )}
          </div>

          {/* Sub-slide Body */}
          <div className="min-h-[260px] flex items-center justify-center">
            {/* SUB-SLIDE 1: SELECT PATIENT */}
            {fieldStep === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-2xl py-4">
                <SearchPicker
                  label="Select Patient Record *"
                  options={patients}
                  value={formData.patientId}
                  placeholder="Search patient by name or ID..."
                  onChange={(opt) =>
                    setFormData({
                      ...formData,
                      patientId: opt.value,
                      ptrName: opt.name,
                      ptNo: opt.ptNo,
                      PHN_ID: opt.PHN_ID,
                    })
                  }
                />
                <p className="text-xs text-slate-500 m-0 flex items-center gap-1.5 pl-1">
                  <Icon icon="tabler:info-circle" className="text-blue-600 text-sm" />
                  Type patient name or registration ID to select from clinic records.
                </p>
              </div>
            )}

            {/* SUB-SLIDE 2: REQUESTING DOCTOR */}
            {fieldStep === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-2xl py-4">
                <SearchPicker
                  label="Select Requesting Specialist Doctor *"
                  options={doctors}
                  value={formData.doctorId}
                  placeholder="Search specialist doctor..."
                  onChange={(opt) =>
                    setFormData({
                      ...formData,
                      doctorId: opt.value,
                      drName: opt.name,
                    })
                  }
                />
                <p className="text-xs text-slate-500 m-0 flex items-center gap-1.5 pl-1">
                  <Icon icon="tabler:info-circle" className="text-blue-600 text-sm" />
                  Select physician authorizing and requesting this scan order.
                </p>
              </div>
            )}

            {/* SUB-SLIDE 3: SCAN MODALITY / TYPE */}
            {fieldStep === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-4xl py-2">
                <label className="text-xs font-black tracking-wider uppercase text-slate-600 block text-center mb-2">
                  Select Scan Modality & Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
                  {SCAN_TYPES.map((type) => {
                    const isSelected = formData.scanType === type.label;
                    return (
                      <button
                        type="button"
                        key={type.label}
                        onClick={() => setFormData((prev) => ({ ...prev, scanType: type.label }))}
                        className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-105 font-bold"
                            : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50 font-medium"
                        }`}
                      >
                        <Icon icon={type.icon} className="text-2xl" />
                        <span className="text-sm leading-tight">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SUB-SLIDE 4: PRIORITY LEVEL */}
            {fieldStep === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-3xl py-2">
                <label className="text-xs font-black tracking-wider uppercase text-slate-600 block text-center mb-2">
                  Select Scan Order Priority Urgency Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {PRIORITY_OPTIONS.map((opt) => {
                    const isSelected = formData.priority === opt.value;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => setFormData((prev) => ({ ...prev, priority: opt.value }))}
                        className={`p-5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-105 font-bold"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 font-semibold"
                        }`}
                      >
                        <span className={`text-xs px-2.5 py-1 rounded-full font-black uppercase ${opt.bg}`}>
                          {opt.value} Priority
                        </span>
                        <span className="text-sm mt-1">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SUB-SLIDE 5: SCHEDULE DATE & TIME */}
            {fieldStep === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-2xl py-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black tracking-wider uppercase text-slate-600">
                      Schedule Date (Optional)
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="px-4 py-3.5 rounded-2xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-base font-semibold text-slate-800 h-14"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black tracking-wider uppercase text-slate-600">
                      Schedule Time (Optional)
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="px-4 py-3.5 rounded-2xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-base font-semibold text-slate-800 h-14"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SUB-SLIDE 6: ORDER REVIEW & CONFIRMATION */}
            {fieldStep === 6 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-4xl py-2">
                <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Icon icon="tabler:file-check" className="text-emerald-400 text-xl" />
                      <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                        Scan Request Summary Overview
                      </span>
                    </div>
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                      Ready to Submit
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div>
                      <p className="text-slate-400 m-0">Patient Name</p>
                      <p className="font-bold text-slate-100 text-sm m-0 truncate">
                        {formData.ptrName || "Not selected"}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400 m-0">Requesting Doctor</p>
                      <p className="font-bold text-slate-100 text-sm m-0 truncate">
                        {formData.drName || "Not selected"}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400 m-0">Scan Type</p>
                      <p className="font-bold text-blue-400 text-sm m-0 truncate">
                        {formData.scanType}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400 m-0">Priority</p>
                      <p className="font-bold text-rose-400 text-sm m-0 truncate">
                        {formData.priority}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Controls Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div>
              {fieldStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Icon icon="tabler:arrow-left" className="text-sm" />
                  Previous Field
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!activeSlideMeta.required && (
                <button
                  type="button"
                  onClick={handleSkipStep}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 border border-slate-200 cursor-pointer flex items-center gap-1"
                >
                  Skip Field
                  <Icon icon="tabler:player-skip-forward" className="text-sm" />
                </button>
              )}

              {fieldStep < SCAN_FIELD_SLIDES.length ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-1.5 cursor-pointer border-none shadow-md shadow-blue-500/20"
                >
                  Next Field
                  <Icon icon="tabler:arrow-right" className="text-sm" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCreatePrescription}
                  disabled={isSubmitting}
                  className="px-7 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer border-none disabled:opacity-50"
                >
                  <Icon icon="tabler:circle-check" className="text-base" />
                  {isSubmitting ? "Submitting Order..." : "Confirm & Submit Scan Request"}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* REGULAR SCAN DASHBOARD VIEW WITH EXACT ORIGINAL LAYOUT & METRICS */
        <>
          {/* Metrics Row 1 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-blue-500 block">TODAY'S TOTAL</span>
                <span className="text-2xl font-black text-slate-800 mt-1 block">{metrics.todayTotal}</span>
              </div>
              <div className="p-3 bg-blue-500 text-white rounded-xl shadow-md shadow-blue-500/20">
                <Icon icon="solar:trash-bin-trash-linear" className="text-xl" />
              </div>
            </div>
            <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-100 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-amber-500 block">MORNING (M)</span>
                <span className="text-2xl font-black text-slate-800 mt-1 block">{metrics.morning}</span>
              </div>
              <div className="p-3 bg-amber-500 text-white rounded-xl shadow-md shadow-amber-500/20">
                <Icon icon="solar:sun-2-linear" className="text-xl" />
              </div>
            </div>
            <div className="bg-teal-50/60 p-5 rounded-2xl border border-teal-100 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-teal-500 block">AFTERNOON (A)</span>
                <span className="text-2xl font-black text-slate-800 mt-1 block">{metrics.afternoon}</span>
              </div>
              <div className="p-3 bg-teal-500 text-white rounded-xl shadow-md shadow-teal-500/20">
                <Icon icon="solar:clouds-linear" className="text-xl" />
              </div>
            </div>
            <div className="bg-indigo-50/60 p-5 rounded-2xl border border-indigo-100 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-indigo-500 block">EVENING (E)</span>
                <span className="text-2xl font-black text-slate-800 mt-1 block">{metrics.evening}</span>
              </div>
              <div className="p-3 bg-indigo-500 text-white rounded-xl shadow-md shadow-indigo-500/20">
                <Icon icon="solar:moon-linear" className="text-xl" />
              </div>
            </div>
          </div>

          {/* Historic & Pipeline Tracking */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-black text-slate-700 tracking-wider uppercase m-0">
              Historic & Pipeline Tracking
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">YESTERDAY</span>
                  <span className="text-xl font-black text-slate-800 mt-1 block">{metrics.yesterday}</span>
                </div>
                <Icon icon="solar:calendar-minimalistic-linear" className="text-slate-400 text-xl" />
              </div>
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">THIS WEEK</span>
                  <span className="text-xl font-black text-slate-800 mt-1 block">{metrics.thisWeek}</span>
                </div>
                <Icon icon="solar:case-linear" className="text-emerald-500 text-xl" />
              </div>
              <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest block">THIS MONTH</span>
                  <span className="text-xl font-black text-slate-800 mt-1 block">{metrics.thisMonth}</span>
                </div>
                <Icon icon="solar:box-linear" className="text-purple-500 text-xl" />
              </div>
              <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-100 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest block">LAST 3 MONTHS</span>
                  <span className="text-xl font-black text-slate-800 mt-1 block">{metrics.last3Months}</span>
                </div>
                <Icon icon="solar:chart-2-linear" className="text-rose-500 text-xl" />
              </div>
            </div>
          </div>

          {/* Filter Status Tabs */}
          <div className="flex items-center gap-2">
            {["NOT SCHEDULED", "MISSED", "REPORT UPLOAD", "COMPLETED"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all border-none cursor-pointer ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Pending Scans Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
              <table className="w-full text-left text-xs relative border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-50 shadow-xs">
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                    <th className="px-6 py-4">PRESCRIPTION ID</th>
                    <th className="px-6 py-4">PATIENT NAME</th>
                    <th className="px-6 py-4">DOCTOR</th>
                    <th className="px-6 py-4">SCAN TYPE</th>
                    <th className="px-6 py-4 text-center">PRIORITY</th>
                    <th className="px-6 py-4 text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredScans.map((row) => (
                    <tr key={row._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-blue-600">
                        {row.prescriptionId}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800">{row.ptrName}</td>
                      <td className="px-6 py-4 text-slate-600">{row.drName}</td>
                      <td className="px-6 py-4 font-bold text-slate-700">{row.scanType}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            row.priority === "High"
                              ? "bg-rose-50 text-rose-600 border border-rose-200"
                              : row.priority === "Medium"
                              ? "bg-amber-50 text-amber-600 border border-amber-200"
                              : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          }`}
                        >
                          {row.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {(activeTab === "NOT SCHEDULED" || activeTab === "MISSED") && (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedRowForSchedule(row._id);
                                  setIsScheduleModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border-none cursor-pointer transition-all"
                                title="Schedule Scan"
                              >
                                <Icon icon="solar:calendar-date-linear" className="text-sm" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(row._id)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-none cursor-pointer transition-all"
                                title="Delete"
                              >
                                <Icon icon="solar:trash-bin-trash-linear" className="text-sm" />
                              </button>
                              <button
                                type="button"
                                onClick={() => generatePrescriptionPDF(row)}
                                className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 border-none cursor-pointer transition-all"
                                title="Print PDF"
                              >
                                <Icon icon="solar:printer-linear" className="text-sm" />
                              </button>
                            </>
                          )}
                          {activeTab === "REPORT UPLOAD" && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedRowForUpload(row._id);
                                setIsUploadModalOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border-none cursor-pointer transition-all font-bold text-[10px] uppercase flex items-center gap-1"
                              title="Upload Report"
                            >
                              <Icon icon="solar:upload-minimalistic-linear" className="text-sm" />
                              Upload
                            </button>
                          )}
                          {activeTab === "COMPLETED" && row.finalReportFileUrl && (
                            <button
                              type="button"
                              onClick={() => setPreviewUrl(row.finalReportFileUrl)}
                              className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white border-none cursor-pointer transition-all font-bold text-[10px] uppercase flex items-center gap-1"
                              title="View Report"
                            >
                              <Icon icon="solar:document-text-linear" className="text-sm" />
                              View Report
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredScans.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                        No scan requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {previewUrl && (
        <FileViewerModal
          fileUrl={previewUrl}
          onClose={() => setPreviewUrl(null)}
        />
      )}

      {/* Schedule Modal */}
      <Modal
        title="Schedule Scan Appointment"
        open={isScheduleModalOpen}
        onCancel={() => {
          setIsScheduleModalOpen(false);
          setSelectedRowForSchedule(null);
          setScheduleDate("");
          setScheduleTime("");
        }}
        footer={null}
        destroyOnClose
      >
        <div className="flex flex-col gap-4 py-4">
          <p className="text-sm text-slate-500 m-0">
            Select a date and time to schedule this scan order. It will automatically move to the <strong>Report Upload</strong> tab so you can upload the results after the appointment.
          </p>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700">Date</label>
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700">Time</label>
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => {
                setIsScheduleModalOpen(false);
                setSelectedRowForSchedule(null);
                setScheduleDate("");
                setScheduleTime("");
              }}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-all border border-slate-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleScheduleSubmit}
              disabled={isScheduling || !scheduleDate || !scheduleTime}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all border-none cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              {isScheduling ? (
                <>
                  <Icon icon="eos-icons:loading" className="text-sm" />
                  Scheduling...
                </>
              ) : (
                "Schedule Scan"
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Upload Modal */}
      <Modal
        title="Upload Scan Report"
        open={isUploadModalOpen}
        onCancel={() => {
          setIsUploadModalOpen(false);
          setUploadFile(null);
          setSelectedRowForUpload(null);
        }}
        footer={null}
        destroyOnClose
      >
        <div className="flex flex-col gap-4 py-4">
          <p className="text-sm text-slate-500 m-0">
            Please attach the scan report document (PDF, JPG, PNG, DICOM). 
            Uploading a report will automatically mark it as ready for AI analysis.
          </p>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700">Select File</label>
            <input
              type="file"
              onChange={(e) => setUploadFile(e.target.files[0])}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.dcm"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => {
                setIsUploadModalOpen(false);
                setUploadFile(null);
                setSelectedRowForUpload(null);
              }}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-all border border-slate-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleUploadSubmit}
              disabled={isUploading || !uploadFile}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all border-none cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Icon icon="eos-icons:loading" className="text-sm" />
                  Uploading...
                </>
              ) : (
                "Upload Report"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ScanPrescriptionFromTheDoctor;
