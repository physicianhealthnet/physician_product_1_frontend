import React, { useEffect, useState, useRef } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { AxiosInstance, AxiosInstanceSecondryServer } from "../../../utilities/AxiosInstance";
import { Icon } from "@iconify/react";
import { message } from "antd";
import dayjs from "dayjs";

const BASIC_SLIDES = [
  {
    id: 1,
    key: "name",
    title: "Patient Name",
    description: "Enter the patient's full legal name.",
    icon: "tabler:user",
    required: true,
  },
  {
    id: 2,
    key: "phone",
    title: "Phone Number",
    description: "Enter primary 10-digit mobile contact number.",
    icon: "tabler:phone",
    required: true,
  },
  {
    id: 3,
    key: "address",
    title: "Patient Address",
    description: "Enter residential or permanent address details.",
    icon: "tabler:map-pin",
    required: false,
  },
  {
    id: 4,
    key: "email",
    title: "Email Address",
    description: "Enter email address for digital records & notifications.",
    icon: "tabler:mail",
    required: false,
  },
  {
    id: 5,
    key: "dob_age",
    title: "Date of Birth & Age",
    description: "Select date of birth (auto-calculates patient age).",
    icon: "tabler:calendar",
    required: false,
  },
  {
    id: 6,
    key: "gender",
    title: "Patient Gender",
    description: "Select patient gender identity.",
    icon: "tabler:gender-male",
    required: false,
  },
  {
    id: 7,
    key: "aadhar",
    title: "Aadhaar Number",
    description: "Enter 12-digit government Aadhaar identification number.",
    icon: "tabler:id",
    required: false,
  },
  {
    id: 8,
    key: "attender_name",
    title: "Patient Attender Name",
    description: "Enter guardian or emergency attender full name.",
    icon: "tabler:user-plus",
    required: false,
  },
  {
    id: 9,
    key: "attender_phone",
    title: "Attender Phone Number",
    description: "Enter contact phone number for emergency attender.",
    icon: "tabler:phone-call",
    required: false,
  },
  {
    id: 10,
    key: "attender_relationship",
    title: "Attender Relationship",
    description: "Select relationship of attender to patient.",
    icon: "tabler:heart-handshake",
    required: false,
  },
  {
    id: 11,
    key: "location",
    title: "Location / Area",
    description: "Enter patient residence location or area name.",
    icon: "tabler:building-community",
    required: false,
  },
  {
    id: 12,
    key: "referred_doctor",
    title: "Referred Doctor",
    description: "Select primary attending or referring doctor.",
    icon: "tabler:stethoscope",
    required: false,
  },
];

function PatientBasicDetails({
  patientSSDetails,
  setPatientFormData,
  patientFormData,
  onSaveAndNext,
  loading,
}) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const suggestionRef = useRef(null);

  const userInfo = JSON.parse(
    sessionStorage.getItem("user") || sessionStorage.getItem("master")
  );
  const clinicId = userInfo?.cid || userInfo?.clinicId;
  const searchTimeout = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!clinicId) return;
      try {
        const res = await AxiosInstance.get(`/user/get-doctor?clinicId=${clinicId}`);
        setDoctors(res.data.users || []);
      } catch (err) {
        console.error("Failed to fetch doctors", err);
      }
    };
    fetchDoctors();
  }, [clinicId]);

  const performSearch = async (value) => {
    if (value.length < 3 || !clinicId) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setSearching(true);
    try {
      const response = await AxiosInstanceSecondryServer.post("/patientregistration/list", {
        clinicId,
        search: value,
      });
      setSuggestions(response.data.patients || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error searching patients:", error);
    } finally {
      setSearching(false);
    }
  };

  const formatAadhaar = (val) => {
    if (!val) return "";
    const rawDigits = val.toString().replace(/\D/g, "").slice(0, 12);
    return rawDigits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleAadhaarChange = (e) => {
    const rawVal = e.target.value;
    const formatted = formatAadhaar(rawVal);
    setPatientFormData((prev) => ({
      ...prev,
      patientAadhar: formatted,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "patientName") {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        performSearch(value);
      }, 400);
    }
  };

  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    setPatientFormData((prev) => {
      let calculatedAge = prev.patientAge || "";
      if (dobValue) {
        const birthDate = dayjs(dobValue);
        if (birthDate.isValid()) {
          const ageDiff = dayjs().diff(birthDate, "year");
          if (ageDiff >= 0 && ageDiff < 150) {
            calculatedAge = ageDiff.toString();
          }
        }
      }
      return {
        ...prev,
        patientDOB: dobValue,
        patientAge: calculatedAge,
      };
    });
  };

  const handleSuggestionClick = (patient) => {
    setPatientFormData(patient);
    setShowSuggestions(false);
    message.success(`Selected patient: ${patient.patientName}`);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Image size should be less than 10MB");
        return;
      }
      setPatientFormData((prev) => ({
        ...prev,
        profileImgFile: file,
        profileImgPreview: URL.createObjectURL(file),
      }));
    }
  };

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http") || url.startsWith("data:")) return url;
    const rawBaseUrl = AxiosInstance.defaults.baseURL || "http://localhost:3026";
    const baseUrl = rawBaseUrl.replace(/\/api\/?$/, "");
    return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const activeSlideMeta = BASIC_SLIDES[currentSlide - 1];

  const handleNextSlide = () => {
    // Validate mandatory slides
    if (currentSlide === 1) {
      if (!patientFormData?.patientName?.trim()) {
        message.error("Please enter Patient Name before proceeding");
        return;
      }
    } else if (currentSlide === 2) {
      if (!patientFormData?.patientPhone?.trim()) {
        message.error("Please enter Patient Phone Number before proceeding");
        return;
      }
    }

    if (currentSlide < BASIC_SLIDES.length) {
      setCurrentSlide((prev) => prev + 1);
    } else if (onSaveAndNext) {
      onSaveAndNext();
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleSkipSlide = () => {
    if (currentSlide < BASIC_SLIDES.length) {
      setCurrentSlide((prev) => prev + 1);
    } else if (onSaveAndNext) {
      onSaveAndNext();
    }
  };

  const renderSlideBody = () => {
    switch (currentSlide) {
      case 1:
        // Slide 1: Patient Name
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Profile Avatar Card */}
            <div className="flex items-center gap-5 p-4 bg-slate-50/80 border border-slate-200 rounded-2xl">
              <div className="relative group w-20 h-20 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-200 flex items-center justify-center shrink-0">
                {patientFormData.profileImgPreview || patientFormData.profileImg ? (
                  <img
                    src={patientFormData.profileImgPreview || getImageUrl(patientFormData.profileImg)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon icon="solar:user-linear" className="text-3xl text-slate-400" />
                )}
                <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Icon icon="solar:camera-add-linear" className="text-white text-xl mb-0.5" />
                  <span className="text-white text-[9px] font-bold tracking-wider">UPLOAD</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 m-0">Patient Photo</h4>
                <p className="text-xs text-slate-500 m-0 mt-0.5">
                  Upload patient photo or avatar will be generated automatically.
                </p>
              </div>
            </div>

            <div className="relative">
              <Input
                type="text"
                label={<>Patient Full Name <span className="text-red-500">*</span></>}
                name="patientName"
                value={patientFormData?.patientName || ""}
                onChange={handleInputChange}
                onFocus={() => {
                  if (patientFormData?.patientName?.length >= 3) {
                    setShowSuggestions(true);
                  }
                }}
                placeholder="Enter patient full name..."
                autoComplete="off"
                className="h-12 text-base rounded-xl"
              />

              {/* Suggestions Popup */}
              {(showSuggestions || searching) && (
                <div
                  ref={suggestionRef}
                  className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {searching ? (
                    <div className="p-4 flex items-center justify-center gap-2 text-slate-400">
                      <Icon icon="tabler:loader-2" className="animate-spin text-xl text-blue-500" />
                      <span className="text-sm font-medium">Searching patient records...</span>
                    </div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((p) => (
                      <div
                        key={p._id}
                        onClick={() => handleSuggestionClick(p)}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-none group transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                              {p.patientName}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              ID: {p.patientId} • Ph: {p.patientPhone}
                            </span>
                          </div>
                          <Icon
                            icon="tabler:chevron-right"
                            className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 flex flex-col items-center gap-1 text-slate-400">
                      <Icon icon="tabler:user-x" className="text-xl" />
                      <span className="text-sm font-medium">No existing patient records found</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        // Slide 2: Phone Number
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Input
              type="tel"
              label={<>Patient Phone Number <span className="text-red-500">*</span></>}
              name="patientPhone"
              value={patientFormData?.patientPhone || ""}
              onChange={handleInputChange}
              placeholder="Enter 10-digit mobile number..."
              autoComplete="off"
              className="h-12 text-base rounded-xl"
            />
          </div>
        );

      case 3:
        // Slide 3: Address
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">
                Patient Residential Address
              </label>
              <textarea
                name="patientAddress"
                value={patientFormData?.patientAddress || ""}
                onChange={handleInputChange}
                rows={4}
                placeholder="Enter complete patient address..."
                className="w-full p-3.5 bg-white border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-medium"
              />
            </div>
          </div>
        );

      case 4:
        // Slide 4: Email
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Input
              type="email"
              label="Patient Email Address"
              name="patientEmail"
              value={patientFormData?.patientEmail || ""}
              onChange={handleInputChange}
              placeholder="e.g. patient@example.com"
              autoComplete="off"
              className="h-12 text-base rounded-xl"
            />
          </div>
        );

      case 5:
        // Slide 5: DOB & Auto-Calculated Age
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Input
                  type="date"
                  label="Date of Birth"
                  name="patientDOB"
                  value={patientFormData?.patientDOB || ""}
                  onChange={handleDobChange}
                  className="h-12 rounded-xl text-base"
                />
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Icon icon="tabler:info-circle" className="text-blue-500 text-sm" />
                  Selecting Date of Birth automatically calculates age.
                </p>
              </div>

              <div>
                <Input
                  type="number"
                  label="Patient Age (In Years)"
                  name="patientAge"
                  value={patientFormData?.patientAge || ""}
                  onChange={handleInputChange}
                  placeholder="Calculated age or enter manually..."
                  className="h-12 text-base rounded-xl"
                />
                {patientFormData?.patientDOB && patientFormData?.patientAge !== "" && (
                  <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <Icon icon="tabler:check" className="text-sm" />
                    Auto-calculated: {patientFormData.patientAge} years old
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 6:
        // Slide 6: Patient Gender
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-slate-700">
                Select Patient Gender
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "male", label: "Male", icon: "tabler:gender-male" },
                  { value: "female", label: "Female", icon: "tabler:gender-female" },
                  { value: "other", label: "Other", icon: "tabler:gender-third" },
                ].map((item) => {
                  const isSelected = patientFormData?.patientGender === item.value;
                  return (
                    <button
                      type="button"
                      key={item.value}
                      onClick={() =>
                        setPatientFormData((prev) => ({ ...prev, patientGender: item.value }))
                      }
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/70 text-blue-700 font-bold shadow-md ring-2 ring-blue-500/20"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <Icon icon={item.icon} className="text-2xl" />
                      <span className="text-sm font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 7:
        // Slide 7: Aadhaar Number
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                label="Aadhaar Identification Number"
                name="patientAadhar"
                value={formatAadhaar(patientFormData?.patientAadhar || "")}
                onChange={handleAadhaarChange}
                placeholder="1234 5678 9012"
                maxLength={14}
                autoComplete="off"
                className="h-12 text-lg font-mono tracking-widest rounded-xl"
              />
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                <Icon icon="tabler:shield-check" className="text-blue-500 text-sm" />
                Formats automatically as 12-digit Aadhaar number: <strong>xxxx xxxx xxxx</strong>
              </p>
            </div>
          </div>
        );

      case 8:
        // Slide 8: Attender Name
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Input
              type="text"
              label="Emergency Attender / Guardian Name"
              name="guardianName"
              value={patientFormData?.guardianName || ""}
              onChange={handleInputChange}
              placeholder="Enter attender full name..."
              className="h-12 text-base rounded-xl"
            />
          </div>
        );

      case 9:
        // Slide 9: Attender Phone
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Input
              type="tel"
              label="Attender Contact Phone Number"
              name="attenderPhone"
              value={patientFormData?.attenderPhone || ""}
              onChange={handleInputChange}
              placeholder="Enter attender contact phone..."
              className="h-12 text-base rounded-xl"
            />
          </div>
        );

      case 10:
        // Slide 10: Attender Relationship
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Select Attender Relationship
              </label>
              <select
                name="attenderRelationship"
                value={patientFormData?.attenderRelationship || ""}
                onChange={handleInputChange}
                className="w-full h-12 px-3.5 bg-white border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-medium text-base"
              >
                <option value="">Select Attender Relationship</option>
                {["son", "daughter", "wife", "husband", "brother", "sister", "friends", "relative"].map(
                  (opt) => (
                    <option key={opt} value={opt} className="capitalize">
                      {opt}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        );

      case 11:
        // Slide 11: Location
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Input
              type="text"
              label="Location / Area Name"
              name="location"
              value={patientFormData?.location || ""}
              onChange={handleInputChange}
              placeholder="Enter patient area or locality..."
              className="h-12 text-base rounded-xl"
            />
          </div>
        );

      case 12:
        // Slide 12: Referred Doctor
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Referred Doctor Name (Primary Doctor)
              </label>
              <select
                name="ref_dr_name"
                value={patientFormData?.ref_dr_name || ""}
                onChange={(e) => {
                  handleInputChange(e);
                  const selectedDoc = doctors.find((doc) => doc.userName === e.target.value);
                  if (selectedDoc) {
                    setPatientFormData((prev) => ({
                      ...prev,
                      ref_dr_id: selectedDoc.userId || selectedDoc._id || "",
                    }));
                  } else {
                    setPatientFormData((prev) => ({ ...prev, ref_dr_id: "" }));
                  }
                }}
                className="w-full h-12 px-3.5 bg-white border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-medium text-base"
              >
                <option value="">Select Referred Doctor</option>
                {doctors.map((doc, idx) => (
                  <option key={idx} value={doc.userName}>
                    Dr. {doc.userName}
                  </option>
                ))}
              </select>
            </div>

            {/* Basic Overview Box */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Icon icon="tabler:circle-check" className="text-emerald-400 text-base" />
                  Basic Details Overview
                </span>
                <span className="text-xs bg-blue-500/20 text-blue-300 font-semibold px-2 py-0.5 rounded-full">
                  All 12 Fields Reviewed
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-slate-400 m-0">Patient Name</p>
                  <p className="font-bold text-slate-100 m-0 truncate">
                    {patientFormData?.patientName || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 m-0">Phone Number</p>
                  <p className="font-bold text-slate-100 m-0 truncate">
                    {patientFormData?.patientPhone || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 m-0">DOB & Calculated Age</p>
                  <p className="font-bold text-slate-100 m-0 truncate">
                    {patientFormData?.patientDOB || "N/A"} ({patientFormData?.patientAge ? `${patientFormData.patientAge} yrs` : "N/A"})
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 m-0">Gender</p>
                  <p className="font-bold text-slate-100 m-0 capitalize truncate">
                    {patientFormData?.patientGender || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sub-stepper Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
        {BASIC_SLIDES.map((step) => {
          const isActive = step.id === currentSlide;
          const isCompleted = step.id < currentSlide;

          return (
            <button
              type="button"
              key={step.id}
              onClick={() => {
                if (step.id <= currentSlide || isCompleted) {
                  setCurrentSlide(step.id);
                }
              }}
              className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all border flex items-center justify-center gap-1 ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : isCompleted
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 cursor-pointer"
                  : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
              }`}
            >
              <span>{step.id}.</span>
              <span className="truncate hidden md:inline">{step.title}</span>
              {isCompleted && (
                <Icon icon="tabler:check" className="text-xs shrink-0 text-emerald-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Sub-slide Progress Indicator */}
      <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${(currentSlide / BASIC_SLIDES.length) * 100}%` }}
        />
      </div>

      {/* Active Sub-slide Title Bar */}
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <Icon icon={activeSlideMeta.icon} className="text-xl" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                Field {currentSlide} of {BASIC_SLIDES.length}
              </span>
              {activeSlideMeta.required ? (
                <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  Mandatory *
                </span>
              ) : (
                <span className="bg-slate-200 text-slate-600 text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                  Optional (Can Skip)
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-slate-800 m-0 mt-0.5">
              {activeSlideMeta.title}
            </h3>
          </div>
        </div>

        {/* Quick Skip button on top if field is optional */}
        {!activeSlideMeta.required && (
          <button
            type="button"
            onClick={handleSkipSlide}
            className="text-xs text-slate-500 hover:text-blue-600 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 bg-white transition-all cursor-pointer flex items-center gap-1"
          >
            <span>Skip</span>
            <Icon icon="tabler:player-skip-forward" className="text-sm" />
          </button>
        )}
      </div>

      {/* Slide Body */}
      <div className="min-h-[200px]">
        {renderSlideBody()}
      </div>

      {/* Sub-slide Footer Action Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div>
          {currentSlide > 1 && (
            <Button
              onClick={handlePrevSlide}
              variant="secondary"
              className="rounded-xl px-4 py-2 flex items-center gap-1.5 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer text-xs font-semibold"
            >
              <Icon icon="tabler:arrow-left" className="text-sm" />
              Previous Field
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!activeSlideMeta.required && (
            <Button
              onClick={handleSkipSlide}
              variant="secondary"
              className="rounded-xl px-4 py-2 border border-slate-200 text-slate-500 bg-white hover:bg-slate-50 cursor-pointer text-xs font-medium flex items-center gap-1"
            >
              Skip Field
              <Icon icon="tabler:player-skip-forward" className="text-sm" />
            </Button>
          )}

          {currentSlide < BASIC_SLIDES.length ? (
            <Button
              onClick={handleNextSlide}
              variant="primary"
              className="rounded-xl px-5 py-2 flex items-center gap-1.5 cursor-pointer text-xs font-semibold shadow-md shadow-blue-500/20"
            >
              Next Field
              <Icon icon="tabler:arrow-right" className="text-sm" />
            </Button>
          ) : (
            <Button
              onClick={handleNextSlide}
              loading={loading}
              variant="primary"
              className="rounded-xl px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer border-0 text-xs font-bold"
            >
              <Icon icon="tabler:circle-check" className="text-base" />
              Complete Basic Details & Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientBasicDetails;
