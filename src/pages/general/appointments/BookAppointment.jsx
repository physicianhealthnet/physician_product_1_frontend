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
    title: "Search Patient",
    description: "Search for an existing patient record or skip to manual entry.",
    icon: "tabler:user-search",
  },
  {
    id: 2,
    title: "Verify Patient Details",
    description: "Confirm or fill patient full name, phone number, and ID info.",
    icon: "tabler:id",
  },
  {
    id: 3,
    title: "Select Doctor",
    description: "Choose the attending doctor or healthcare practitioner.",
    icon: "tabler:stethoscope",
  },
  {
    id: 4,
    title: "Appointment Reason",
    description: "Select the primary reason or department for the clinical visit.",
    icon: "tabler:notes",
  },
  {
    id: 5,
    title: "Appointment Date",
    description: "Pick the scheduled calendar date for the visit.",
    icon: "tabler:calendar",
  },
  {
    id: 6,
    title: "Appointment Time",
    description: "Choose the start time for the visit and review all details.",
    icon: "tabler:clock",
  },
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
    if (currentStep === 2) {
      if (!formData.patientName?.trim()) {
        message.error("Please enter Patient Name");
        return;
      }
      if (!formData.phoneNumber?.trim()) {
        message.error("Please enter Phone Number");
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.doctor) {
        message.error("Please select a Doctor");
        return;
      }
    } else if (currentStep === 4) {
      if (!formData.category) {
        message.error("Please select or specify a reason");
        return;
      }
    } else if (currentStep === 5) {
      if (!formData.date) {
        message.error("Please select an Appointment Date");
        return;
      }
    }

    if (currentStep < 6) {
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
        // Slide 1: Search Patient
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 p-5 rounded-2xl border border-blue-100 shadow-sm">
              <label className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-2">
                <SearchOutlined className="text-blue-600 text-lg" />
                Find Patient Record
              </label>
              <AutoComplete
                style={{ width: "100%" }}
                options={searchResults}
                onSearch={handleSearch}
                onSelect={(value, option) => handleSelectPatient(value, option)}
                placeholder="Type Patient Name, Phone, Email, or Patient ID..."
                allowClear
                loading={searchLoading}
                className="w-full h-12 text-base rounded-xl"
                popupClassName="rounded-xl shadow-xl"
              />
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <Icon icon="tabler:info-circle" className="text-blue-500 text-sm" />
                Type to view instant matching patient profiles.
              </p>
            </div>

            {selectedPatientObj ? (
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 shadow-sm transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-emerald-500/20">
                      {selectedPatientObj.patientName?.charAt(0)?.toUpperCase() || "P"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-800 m-0">
                          {selectedPatientObj.patientName}
                        </h4>
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircleOutlined /> Selected
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 m-0 mt-1 flex items-center gap-3">
                        <span>📞 {selectedPatientObj.patientPhone}</span>
                        {selectedPatientObj.patientId && (
                          <span>🆔 ID: {selectedPatientObj.patientId}</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearSelectedPatient}
                    className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-200 transition-colors bg-white font-medium cursor-pointer"
                  >
                    Clear Choice
                  </button>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50/50">
                <Icon icon="tabler:user-plus" className="text-4xl text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700 m-0">
                  New or Unregistered Patient?
                </p>
                <p className="text-xs text-slate-500 m-0 mt-1">
                  You can click <span className="font-semibold text-blue-600">Next</span> to manually fill in the patient details in the next slide.
                </p>
              </div>
            )}
          </div>
        );

      case 2:
        // Slide 2: Verify Details
        return (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            {selectedPatientObj && (
              <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 flex items-center gap-3 text-xs text-blue-800">
                <Icon icon="tabler:circle-check-filled" className="text-lg text-blue-600 shrink-0" />
                <span>
                  Autofilled from selected patient record (ID: <strong>{formData.patientId || "N/A"}</strong>). You can update any fields below if needed.
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Input
                  label="Patient Full Name *"
                  placeholder="Enter patient full name"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Input
                  label="Phone Number *"
                  placeholder="Enter 10-digit mobile number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <Input
                  type="text"
                  label="Aadhaar Number (Optional)"
                  placeholder="1234 5678 9012"
                  name="patientAadhar"
                  value={formatAadhaar(formData.patientAadhar)}
                  onChange={(e) => {
                    const formatted = formatAadhaar(e.target.value);
                    setFormData((prev) => ({ ...prev, patientAadhar: formatted }));
                  }}
                  maxLength={14}
                  autoComplete="off"
                  className="font-mono tracking-widest text-base"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        // Slide 3: Select Doctor
        return (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Choose Doctor from List
              </label>
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
                className="w-full h-11 rounded-xl"
                popupClassName="rounded-xl"
                size="large"
              >
                {allDoctors.map((d) => (
                  <Option key={d._id} value={d.userName}>
                    <div className="flex items-center gap-2 py-1">
                      <Icon icon="tabler:user-doctor" className="text-blue-500 text-lg" />
                      <span className="font-semibold text-slate-800">{d.userName}</span>
                      {d.email && <span className="text-xs text-slate-400">({d.email})</span>}
                    </div>
                  </Option>
                ))}
              </Select>
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Available Doctors ({allDoctors.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-72 sm:max-h-96 overflow-y-auto custom-scrollbar p-1">
                {allDoctors.length === 0 ? (
                  <p className="text-sm text-slate-400 col-span-full italic text-center py-4">
                    No doctor records found for this clinic.
                  </p>
                ) : (
                  allDoctors.map((d) => {
                    const isSelected = formData.doctor === d.userName;
                    return (
                      <div
                        key={d._id}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            doctor: d.userName,
                            doctorId: d._id,
                          }))
                        }
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "border-blue-500 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base ${
                              isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {d.userName?.charAt(0)?.toUpperCase() || "D"}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 m-0 leading-tight">
                              Dr. {d.userName}
                            </p>
                            <p className="text-xs text-slate-500 m-0 mt-0.5">
                              {d.role || "Practitioner"}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <Icon icon="tabler:circle-check-filled" className="text-xl text-blue-600" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        // Slide 4: Reason / Category
        return (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">
                Quick Select Visit Reason
              </label>
              <div className="flex flex-wrap gap-2">
                {reasons.map((res) => {
                  const isSelected = formData.category === res;
                  return (
                    <button
                      type="button"
                      key={res}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, category: res }))
                      }
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-105"
                          : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50"
                      }`}
                    >
                      {res}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">
                Or Type / Search Custom Reason
              </label>
              <Select
                showSearch
                placeholder="Type custom reason or choose..."
                value={formData.category || undefined}
                onChange={(val) => {
                  if (val && !reasons.includes(val)) {
                    setReasons((prev) => [...prev, val]);
                  }
                  setFormData((prev) => ({ ...prev, category: val }));
                }}
                onSearch={(val) => setSearchValue(val)}
                className="w-full h-11 rounded-xl"
                popupClassName="rounded-xl"
                filterOption={(input, option) =>
                  (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
                }
              >
                {reasons.map((res) => (
                  <Option key={res} value={res}>
                    {res}
                  </Option>
                ))}
                {searchValue && !reasons.includes(searchValue) && (
                  <Option key={searchValue} value={searchValue}>
                    + Create "{searchValue}"
                  </Option>
                )}
              </Select>
            </div>
          </div>
        );

      case 5: {
        // Slide 5: Appointment Date
        const todayStr = dayjs().format("YYYY-MM-DD");
        const tomorrowStr = dayjs().add(1, "day").format("YYYY-MM-DD");
        const inTwoDaysStr = dayjs().add(2, "day").format("YYYY-MM-DD");

        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">
                Quick Shortcuts
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, date: todayStr }))
                  }
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    formData.date === todayStr
                      ? "border-blue-500 bg-blue-50 text-blue-700 font-bold"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <p className="text-xs font-semibold m-0 uppercase">Today</p>
                  <p className="text-sm font-bold m-0 mt-0.5">
                    {dayjs().format("MMM DD")}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, date: tomorrowStr }))
                  }
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    formData.date === tomorrowStr
                      ? "border-blue-500 bg-blue-50 text-blue-700 font-bold"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <p className="text-xs font-semibold m-0 uppercase">Tomorrow</p>
                  <p className="text-sm font-bold m-0 mt-0.5">
                    {dayjs().add(1, "day").format("MMM DD")}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, date: inTwoDaysStr }))
                  }
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    formData.date === inTwoDaysStr
                      ? "border-blue-500 bg-blue-50 text-blue-700 font-bold"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <p className="text-xs font-semibold m-0 uppercase">In 2 Days</p>
                  <p className="text-sm font-bold m-0 mt-0.5">
                    {dayjs().add(2, "day").format("MMM DD")}
                  </p>
                </button>
              </div>
            </div>

            <div>
              <Input
                type="date"
                label="Pick Specific Date *"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="h-11 rounded-xl text-base"
              />
            </div>

            {formData.date && (
              <div className="bg-slate-100/80 p-3.5 rounded-xl border border-slate-200 text-center">
                <p className="text-xs text-slate-500 uppercase font-semibold m-0">
                  Selected Date
                </p>
                <p className="text-base font-bold text-slate-800 m-0 mt-0.5">
                  {dayjs(formData.date).format("dddd, MMMM D, YYYY")}
                </p>
              </div>
            )}
          </div>
        );
      }

      case 6: {
        // Slide 6: Appointment Time & Summary
        const quickTimes = [
          "09:00 AM",
          "10:00 AM",
          "11:30 AM",
          "02:00 PM",
          "04:00 PM",
          "05:30 PM",
        ];

        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">
                Quick Select Slot Time
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {quickTimes.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, startTime: t }))
                    }
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      formData.startTime === t
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                        : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                Or Pick Custom Start Time *
              </label>
              <TimePicker
                format="hh:mm A"
                use12Hours
                value={
                  formData.startTime ? dayjs(formData.startTime, "hh:mm A") : null
                }
                onChange={(time, timeString) =>
                  handleTimeChange(time, timeString, "startTime")
                }
                className="w-full h-11 border border-slate-300 rounded-xl bg-white text-slate-900 focus:border-emerald-500 transition-all font-medium text-base"
              />
            </div>

            {/* Booking Summary Box */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Icon icon="tabler:shield-check" className="text-emerald-400 text-base" />
                  Appointment Overview
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                  Ready to Book
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-slate-400 m-0">Patient Name</p>
                  <p className="font-bold text-slate-100 text-sm m-0 truncate">
                    {formData.patientName || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 m-0">Contact Phone</p>
                  <p className="font-bold text-slate-100 text-sm m-0 truncate">
                    {formData.phoneNumber || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 m-0">Attending Doctor</p>
                  <p className="font-bold text-emerald-400 text-sm m-0 truncate">
                    Dr. {formData.doctor || "Not selected"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 m-0">Visit Reason</p>
                  <p className="font-bold text-slate-100 text-sm m-0 truncate">
                    {formData.category || "Not selected"}
                  </p>
                </div>
                <div className="col-span-2 bg-slate-800/80 p-2.5 rounded-xl flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2">
                    <Icon icon="tabler:calendar-event" className="text-blue-400 text-lg" />
                    <span className="font-semibold text-slate-200">
                      {formData.date
                        ? dayjs(formData.date).format("ddd, MMM D, YYYY")
                        : "No Date"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="tabler:clock" className="text-amber-400 text-lg" />
                    <span className="font-bold text-amber-300">
                      {formData.startTime || "No Time"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  const renderStepperNav = () => (
    <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
      {STEPS.map((step) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        return (
          <button
            type="button"
            key={step.id}
            onClick={() => {
              if (step.id < currentStep) {
                setCurrentStep(step.id);
              }
            }}
            disabled={step.id > currentStep}
            className={`flex-1 min-w-[100px] sm:min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-semibold transition-all border flex items-center justify-center gap-2 ${
              isActive
                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]"
                : isCompleted
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 cursor-pointer"
                : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
            }`}
          >
            <span className="font-bold">{step.id}.</span>
            <span className="truncate">{step.title}</span>
            {isCompleted && (
              <Icon icon="tabler:check" className="text-sm shrink-0 text-emerald-600" />
            )}
          </button>
        );
      })}
    </div>
  );

  const renderFooterNav = () => (
    <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-slate-100 bg-slate-50/50">
      <div>
        {currentStep > 1 ? (
          <Button
            onClick={handlePrevStep}
            variant="secondary"
            className="rounded-xl px-5 py-2.5 flex items-center gap-2 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer shadow-sm font-semibold"
          >
            <Icon icon="tabler:arrow-left" className="text-base" />
            Previous Step
          </Button>
        ) : (
          <Button
            onClick={handleClose}
            variant="secondary"
            className="rounded-xl px-5 py-2.5 border border-slate-200 text-slate-500 bg-white hover:bg-slate-50 cursor-pointer font-medium"
          >
            Cancel
          </Button>
        )}
      </div>

      <div>
        {currentStep < STEPS.length ? (
          <Button
            onClick={handleNextStep}
            variant="primary"
            className="rounded-xl px-6 py-2.5 flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20 font-semibold"
          >
            Next Step
            <Icon icon="tabler:arrow-right" className="text-base" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            loading={submitting}
            variant="primary"
            className="rounded-xl px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer border-0 font-bold"
          >
            <Icon icon="tabler:circle-check" className="text-lg" />
            Book Appointment
          </Button>
        )}
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
        width={800}
        centered
        className="rounded-[32px] overflow-hidden shadow-2xl"
        styles={{
          mask: { backdropFilter: "blur(4px)" },
          content: { padding: "0px", borderRadius: "32px" },
        }}
      >
        <div className="flex flex-col h-full w-full">
          {/* Modal Header */}
          <div className="px-6 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/70 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 shadow-sm flex items-center justify-center">
                  <Icon icon={activeStepMeta.icon} className="text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Slide {activeStepMeta.id} of {STEPS.length}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-slate-800 m-0 mt-0.5 leading-tight">
                    {activeStepMeta.title}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium m-0 mt-0.5">
                    {activeStepMeta.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-all cursor-pointer border-0 bg-transparent flex items-center justify-center"
              >
                <Icon icon="tabler:x" className="text-xl" />
              </button>
            </div>
            <div className="mt-5">{renderStepperNav()}</div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-1 shrink-0">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            />
          </div>

          {/* Slide Content Body */}
          <div className="p-6 sm:p-8 flex-1 min-h-[340px] max-h-[65vh] overflow-y-auto custom-scrollbar">
            {renderSlideContent()}
          </div>

          {/* Footer Navigation */}
          {renderFooterNav()}
        </div>
      </Modal>
    );
  }

  // Standalone Page Layout
  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      {/* Top Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors w-fit cursor-pointer border-0 bg-transparent p-0"
            >
              <Icon icon="tabler:arrow-left" className="text-base" />
              Back to Appointments
            </button>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight m-0">
              Book New Appointment
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium m-0">
              Schedule patient consultations, diagnostic scans, or follow-up visits.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-blue-50/80 border border-blue-100 p-3.5 rounded-2xl self-start sm:self-center">
            <div className="p-3 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Icon icon={activeStepMeta.icon} className="text-2xl" />
            </div>
            <div>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Step {activeStepMeta.id} of {STEPS.length}
              </span>
              <p className="text-sm font-bold text-slate-800 m-0 mt-0.5">
                {activeStepMeta.title}
              </p>
            </div>
          </div>
        </div>

        {/* Stepper Navigation */}
        {renderStepperNav()}
      </div>

      {/* Main Step Body Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 flex-1 flex flex-col justify-between overflow-hidden">
        {/* Step Title Header & Progress Bar */}
        <div>
          <div className="p-6 sm:p-8 pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-800 m-0">
                {activeStepMeta.title}
              </h3>
              <p className="text-xs text-slate-500 m-0 mt-0.5">
                {activeStepMeta.description}
              </p>
            </div>
            <div className="w-full sm:w-48 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {renderSlideContent()}
          </div>
        </div>

        {/* Page Footer Navigation */}
        {renderFooterNav()}
      </div>
    </div>
  );
};

export default BookAppointment;


