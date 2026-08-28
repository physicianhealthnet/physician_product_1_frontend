import React, { useEffect, useState } from "react";
import { Modal, TimePicker, message, Select, AutoComplete } from "antd";
import dayjs from "dayjs";
import { AxiosInstance } from "../../../utilities/AxiosInstance";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  IdcardOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  MedicineBoxOutlined,
  SearchOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Icon } from "@iconify/react";
import Input from "../../../component/ui/Input";
import Button from "../../../component/ui/Button";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const STEPS = [
  {
    id: 1,
    title: "Patient Details",
    description: "Search for an existing patient or enter details manually.",
    icon: "tabler:user",
  },
  {
    id: 2,
    title: "Appointment Details",
    description: "Select doctor, reason, date, and time.",
    icon: "tabler:calendar-event",
  }
];

const BookAppointment = ({
  visible,
  setVisible,
  onBooked,
  clinicId,
  setStateChange,
  selectedDoctor,
}) => {
  const navigate = useNavigate();
  const isModalMode = visible !== undefined;

  const initialData = {
    patientName: "",
    patient: "", // holds the _id of patient
    patientId: "",
    patientAadhar: "",
    phoneNumber: "",
    doctor: "",
    category: "",
    date: "",
    startTime: "",
    clinicId: "",
    doctorId: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedPatientObj, setSelectedPatientObj] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);
  const [reasons, setReasons] = useState([
    "Consultation",
    "Treatment",
    "Rehab Training",
    "Follow-up Visit",
    "Routine Check-up",
    "Diagnostic Scan",
    "Lab Test / Blood Work",
    "Prescription Refill",
    "Vaccination / Immunization",
    "Emergency / Urgent Care",
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const user = (() => {
    try {
      const str =
        sessionStorage.getItem("user") || sessionStorage.getItem("master");
      return str ? JSON.parse(str) : null;
    } catch {
      return null;
    }
  })();

  const getDoctors = async () => {
    try {
      const targetClinicId = clinicId || user?.clinicId;
      const response = await AxiosInstance.get(
        `/user/get-doctor?clinicId=${targetClinicId || ""}`
      );
      setAllDoctors(response.data.users || []);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, [clinicId]);

  // Search patients
  const handleSearch = async (value) => {
    if (!value) return;
    try {
      setSearchLoading(true);
      const res = await AxiosInstance.get(
        `/appointments/search?query=${value}`
      );

      if (res.data?.patients) {
        setSearchResults(
          res.data.patients.map((p) => ({
            value: p.patientId || p.patientName,
            label: (
              <div className="flex flex-col p-1.5 border-b border-slate-100 last:border-0 hover:bg-blue-50/60 transition-colors rounded-lg">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <UserOutlined className="text-blue-500" />
                  {p.patientName}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <PhoneOutlined className="text-emerald-500" />
                    {p.patientPhone}
                  </span>
                  {p.patientId && (
                    <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[11px] font-mono">
                      ID: {p.patientId}
                    </span>
                  )}
                </div>
              </div>
            ),
            data: p,
          }))
        );
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setSearchLoading(false);
    }
  };

  // Autofill patient details
  const handleSelectPatient = (value, option) => {
    const p = option.data;
    setSelectedPatientObj(p);

    setFormData((prev) => ({
      ...prev,
      patientName: p.patientName,
      patient: p._id, // store patient ObjectId
      patientAadhar: p.patientAadhar || "",
      phoneNumber: p.patientPhone,
      patientId: p.patientId || "",
      fcmToken: p?.fcmToken?.[0],
    }));

    message.success(`Selected patient: ${p.patientName}`);
  };

  const handleClearSelectedPatient = () => {
    setSelectedPatientObj(null);
    setFormData((prev) => ({
      ...prev,
      patientName: "",
      patient: "",
      patientId: "",
      patientAadhar: "",
      phoneNumber: "",
      fcmToken: undefined,
    }));
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      clinicId: clinicId || user?.clinicId || "",
      doctorId: selectedDoctor ? selectedDoctor._id : prev.doctorId || user?._id || "",
      doctor: selectedDoctor ? selectedDoctor.userName : prev.doctor || user?.userName || "",
    }));
  }, [visible, selectedDoctor, clinicId]);

  // Reset to step 1 when modal/page opens
  useEffect(() => {
    if (visible || !isModalMode) {
      setCurrentStep(1);
    }
  }, [visible]);

  const formatAadhaar = (val) => {
    if (!val) return "";
    const rawDigits = val.toString().replace(/\D/g, "").slice(0, 12);
    return rawDigits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleChange = (e) => {
    const { name, value } = e.target || e;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (time, timeString, name) => {
    setFormData((prev) => ({ ...prev, [name]: timeString }));
  };

  const handleClose = () => {
    if (isModalMode && setVisible) {
      setVisible(false);
    } else {
      navigate(-1);
    }
  };

    const handleNextStep = () => {
    // Validate based on current step
    if (currentStep === 1) {
      if (!formData.patientName?.trim()) {
        message.error("Please enter Patient Name");
        return;
      }
      if (!formData.phoneNumber?.trim()) {
        message.error("Please enter Phone Number");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.doctor) {
        message.error("Please select a Doctor");
        return;
      }
      if (!formData.category) {
        message.error("Please select or specify a reason");
        return;
      }
      if (!formData.date) {
        message.error("Please select an Appointment Date");
        return;
      }
      if (!formData.startTime) {
        message.error("Please select an Appointment Time");
        return;
      }
    }

    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "patientName",
      "phoneNumber",
      "doctor",
      "category",
      "date",
      "startTime",
      "clinicId",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        message.error(`Please fill out required field: ${field}`);
        return;
      }
    }

    try {
      setSubmitting(true);
      await AxiosInstance.post("/appointments/", formData);

      message.success("Appointment booked successfully!");
      setFormData(initialData);
      setSelectedPatientObj(null);
      setCurrentStep(1);

      if (isModalMode && setVisible) {
        setVisible(false);
      }
      if (onBooked) onBooked();
      if (setStateChange) setStateChange((prev) => (prev === null ? true : !prev));
      if (!isModalMode) {
        navigate(-1);
      }
    } catch (err) {
      console.error("Booking error:", err);
      message.error(err.response?.data?.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  const activeStepMeta = STEPS[currentStep - 1];

  const renderSlideContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
            <div className="relative">
              <Input
                type="text"
                label={<>Patient Name / Search <span className="text-red-500">*</span></>}
                name="patientName"
                value={formData.patientName || ""}
                onChange={handleChange}
                onFocus={() => {
                  if (formData.patientName?.length >= 3) {
                    handleSearch(formData.patientName);
                  }
                }}
                placeholder="Enter patient full name or ID..."
                autoComplete="off"
                className="h-14 text-base rounded-2xl"
              />
              {/* Search results popup could go here if we wanted to fully replicate AutoComplete,
                  but for simplicity, we can use the existing AutoComplete from antd or custom list.
                  Let's use the custom AutoComplete styling below if needed, or stick to antd AutoComplete */}
               <div className="mt-2">
                 <AutoComplete
                    style={{ width: "100%" }}
                    options={searchResults}
                    onSearch={handleSearch}
                    onSelect={(value, option) => handleSelectPatient(value, option)}
                    placeholder="Type to search existing patients..."
                    allowClear
                    loading={searchLoading}
                    className="w-full h-12 text-base rounded-xl"
                    popupClassName="rounded-xl shadow-xl"
                  />
               </div>
            </div>

            <Input
              type="tel"
              label={<>Phone Number <span className="text-red-500">*</span></>}
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              autoComplete="off"
              className="h-14 text-base rounded-2xl"
            />
            
            <Input
              type="text"
              label="Aadhaar Number (Optional)"
              placeholder="1234 5678 9012"
              name="patientAadhar"
              value={formatAadhaar(formData.patientAadhar || "")}
              onChange={(e) => {
                const formatted = formatAadhaar(e.target.value);
                setFormData((prev) => ({ ...prev, patientAadhar: formatted }));
              }}
              maxLength={14}
              autoComplete="off"
              className="font-mono tracking-widest text-base h-14 rounded-2xl"
            />
          </div>
        );

      case 2:
        const todayStr = dayjs().format("YYYY-MM-DD");
        const tomorrowStr = dayjs().add(1, "day").format("YYYY-MM-DD");
        const inTwoDaysStr = dayjs().add(2, "day").format("YYYY-MM-DD");
        const quickTimes = ["09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "04:00 PM", "05:30 PM"];

        return (
          <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
            {/* Doctor Selection */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">Select Doctor *</label>
              <Select
                placeholder="Search or Select Doctor..."
                value={formData.doctor || undefined}
                onChange={(val) => {
                  const selected = allDoctors.find((d) => d.userName === val);
                  setFormData((prev) => ({
                    ...prev,
                    doctor: val,
                    doctorId: selected ? selected._id : "",
                  }));
                }}
                className="w-full h-14 rounded-2xl text-base"
                popupClassName="rounded-2xl"
                size="large"
              >
                {allDoctors.map((d) => (
                  <Option key={d._id} value={d.userName}>
                    Dr. {d.userName} {d.role ? `(${d.role})` : ""}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Reason Selection */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">Reason for Visit *</label>
              <Select
                showSearch
                placeholder="Type custom reason or choose..."
                value={formData.category || undefined}
                onChange={(val) => {
                  if (val && !reasons.includes(val)) setReasons((prev) => [...prev, val]);
                  setFormData((prev) => ({ ...prev, category: val }));
                }}
                onSearch={(val) => setSearchValue(val)}
                className="w-full h-14 rounded-2xl text-base"
                popupClassName="rounded-2xl"
                size="large"
              >
                {reasons.map((res) => (
                  <Option key={res} value={res}>{res}</Option>
                ))}
              </Select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                type="date"
                label={<>Appointment Date <span className="text-red-500">*</span></>}
                name="date"
                value={formData.date || ""}
                onChange={handleChange}
                required
                className="h-14 rounded-2xl text-base"
              />
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Time *
                </label>
                <TimePicker
                  format="hh:mm A"
                  use12Hours
                  value={formData.startTime ? dayjs(formData.startTime, "hh:mm A") : null}
                  onChange={(time, timeString) => handleTimeChange(time, timeString, "startTime")}
                  className="w-full h-14 border border-slate-300 rounded-2xl bg-white text-slate-900 focus:border-blue-500 transition-all font-medium text-base"
                />
              </div>
            </div>
            
            {/* Quick selectors for convenience */}
             <div className="grid grid-cols-2 gap-5">
               <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Quick Date</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setFormData(p => ({...p, date: todayStr}))} className="px-3 py-1 text-xs border rounded hover:bg-slate-50">Today</button>
                    <button type="button" onClick={() => setFormData(p => ({...p, date: tomorrowStr}))} className="px-3 py-1 text-xs border rounded hover:bg-slate-50">Tmrw</button>
                  </div>
               </div>
               <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Quick Time</label>
                  <div className="flex gap-1 flex-wrap">
                    {quickTimes.map(t => (
                      <button key={t} type="button" onClick={() => setFormData(p => ({...p, startTime: t}))} className="px-2 py-1 text-[10px] border rounded hover:bg-slate-50">{t}</button>
                    ))}
                  </div>
               </div>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderLeftColumn = () => (
    <div className="flex-1 flex flex-col justify-between p-2 md:pr-8 py-4">
      <div>
        <div className="flex items-center justify-between mb-8">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {currentStep} OF 2
          </span>
          {isModalMode && (
             <button
                type="button"
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer"
             >
               <Icon icon="tabler:x" className="text-xl" />
             </button>
          )}
        </div>

        <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">
          {currentStep === 1 ? "Patient Information" : "Appointment Details"}
        </h2>
        <p className="text-sm text-slate-500 mb-10 font-medium">
          {currentStep === 1
            ? "Please enter the mandatory patient details below."
            : "Select the attending doctor, reason, and schedule for the visit."}
        </p>

        {renderSlideContent()}
      </div>

      <div className="mt-12 flex items-center gap-4">
        {currentStep === 1 ? (
          <Button
            onClick={handleNextStep}
            className="bg-black hover:bg-slate-800 text-white rounded-full px-8 py-3.5 text-sm font-bold transition-all shadow-md"
          >
            Next
          </Button>
        ) : (
          <>
            <Button
              onClick={handlePrevStep}
              variant="secondary"
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full px-8 py-3.5 text-sm font-bold transition-all"
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              loading={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3.5 text-sm font-bold transition-all shadow-md shadow-blue-500/20 flex-1 sm:flex-none justify-center"
            >
              Book Appointment
            </Button>
          </>
        )}
      </div>
    </div>
  );

  const renderRightColumn = () => (
    <div className="hidden md:flex flex-1 bg-slate-50 rounded-[32px] p-8 relative overflow-hidden items-center justify-center border border-slate-100">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-sm aspect-square bg-white rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100 p-10 flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-transform duration-500">
        <div className="w-28 h-28 rounded-full bg-blue-50 flex items-center justify-center mb-8 shadow-inner shadow-blue-200">
          <Icon 
            icon={currentStep === 1 ? "solar:user-heart-bold-duotone" : "solar:calendar-date-bold-duotone"} 
            className="text-6xl text-blue-500 group-hover:scale-110 transition-transform duration-500" 
          />
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-3">
          {currentStep === 1 ? "Patient Records" : "Schedule Visit"}
        </h3>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">
          {currentStep === 1 
            ? "Keep patient information organized, secure, and easily accessible across the clinic workflow."
            : "Effortlessly book, track, and manage patient consultations and clinical appointments."
          }
        </p>
      </div>
    </div>
  );

  if (isModalMode) {
    return (
      <Modal
        open={visible}
        onCancel={handleClose}
        footer={null}
        title={null}
        closeIcon={null}
        width={1000}
        centered
        className="rounded-[40px] overflow-hidden shadow-2xl"
        styles={{
          mask: { backdropFilter: "blur(4px)" },
          content: { padding: "0px", borderRadius: "40px", backgroundColor: "transparent" },
        }}
      >
        <div className="flex flex-col md:flex-row gap-8 items-stretch w-full min-h-[600px] animate-in fade-in bg-white rounded-[40px] p-2">
          {renderLeftColumn()}
          {renderRightColumn()}
        </div>
      </Modal>
    );
  }

  // Standalone Page Layout
  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
       <div className="max-w-6xl w-full bg-white rounded-[40px] shadow-sm border border-slate-200/80 p-2 sm:p-4">
          <div className="flex flex-col md:flex-row gap-8 items-stretch w-full min-h-[650px] animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderLeftColumn()}
            {renderRightColumn()}
          </div>
       </div>
    </div>
  );
};

export default BookAppointment;
