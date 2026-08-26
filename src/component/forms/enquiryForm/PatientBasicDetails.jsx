import React, { useEffect, useState, useRef } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { AxiosInstance, AxiosInstanceSecondryServer } from "../../../utilities/AxiosInstance";
import { Icon } from "@iconify/react";
import { message } from "antd";
import dayjs from "dayjs";

function PatientBasicDetails({
  patientFormData,
  setPatientFormData,
  onSaveAndNext,
  loading,
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const suggestionRef = useRef(null);

  const [hasEmail, setHasEmail] = useState(false);
  const [hasPrimaryDr, setHasPrimaryDr] = useState(false);

  const userInfo = JSON.parse(
    sessionStorage.getItem("user") || sessionStorage.getItem("master") || "{}"
  );
  const clinicId = userInfo?.cid || userInfo?.clinicId;
  const searchTimeout = useRef(null);

  // Initialize toggles based on existing data
  useEffect(() => {
    if (patientFormData?.patientEmail) setHasEmail(true);
    if (patientFormData?.ref_dr_name || patientFormData?.ref_dr_id) setHasPrimaryDr(true);
  }, [patientFormData]);

  // Click outside for suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch doctors
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

  const validateStep1 = () => {
    if (!patientFormData?.patientName?.trim()) {
      message.error("Patient Name is mandatory.");
      return false;
    }
    if (!patientFormData?.patientPhone?.trim()) {
      message.error("Patient Phone Number is mandatory.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (onSaveAndNext) onSaveAndNext();
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-stretch w-full min-h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white">
      
      {/* LEFT COLUMN: Form Steps */}
      <div className="flex-1 flex flex-col justify-between p-2 md:pr-8 py-4">
        <div>
          <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {currentStep} of 2
            </span>
          </div>

          <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">
            {currentStep === 1 ? "Patient Information" : "Additional Details"}
          </h2>
          <p className="text-sm text-slate-500 mb-10 font-medium">
            {currentStep === 1
              ? "Please enter the mandatory patient details below."
              : "Provide any extra information. You can skip this step if not required."}
          </p>

          {/* Step 1 Fields */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
              <div className="relative">
                <Input
                  type="text"
                  label={<>Patient Name <span className="text-red-500">*</span></>}
                  name="patientName"
                  value={patientFormData?.patientName || ""}
                  onChange={handleInputChange}
                  onFocus={() => {
                    if (patientFormData?.patientName?.length >= 3) {
                      setShowSuggestions(true);
                    }
                  }}
                  placeholder="Enter full name"
                  autoComplete="off"
                  className="h-14 text-base rounded-2xl"
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

              <Input
                type="tel"
                label={<>Phone Number <span className="text-red-500">*</span></>}
                name="patientPhone"
                value={patientFormData?.patientPhone || ""}
                onChange={handleInputChange}
                placeholder="10-digit mobile number"
                autoComplete="off"
                className="h-14 text-base rounded-2xl"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  type="date"
                  label="Date of Birth"
                  name="patientDOB"
                  value={patientFormData?.patientDOB || ""}
                  onChange={handleDobChange}
                  className="h-14 rounded-2xl text-base"
                />
                <Input
                  type="number"
                  label="Age (Auto-calculated)"
                  name="patientAge"
                  value={patientFormData?.patientAge || ""}
                  onChange={handleInputChange}
                  placeholder="Age"
                  className="h-14 text-base rounded-2xl"
                />
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <label className="text-sm font-semibold text-slate-700">Patient Gender</label>
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
                        className={`py-3 px-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                          isSelected
                            ? "border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <Icon icon={item.icon} className="text-xl" />
                        <span className="text-xs font-bold">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 Fields */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Patient Address</label>
                <textarea
                  name="patientAddress"
                  value={patientFormData?.patientAddress || ""}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Enter complete residential address..."
                  className="w-full p-4 bg-white border border-slate-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-medium"
                />
              </div>

              <Input
                type="text"
                label="Aadhaar Number"
                name="patientAadhar"
                value={formatAadhaar(patientFormData?.patientAadhar || "")}
                onChange={handleAadhaarChange}
                placeholder="xxxx xxxx xxxx"
                maxLength={14}
                autoComplete="off"
                className="h-14 text-base rounded-2xl font-mono tracking-widest"
              />

              {/* Email Toggle */}
              <div className="flex flex-col gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">Add an Email Address?</span>
                  <div className="flex items-center gap-1 bg-slate-200/50 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setHasEmail(true)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        hasEmail ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHasEmail(false);
                        setPatientFormData(prev => ({ ...prev, patientEmail: "" }));
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        !hasEmail ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
                {hasEmail && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <Input
                      type="email"
                      name="patientEmail"
                      value={patientFormData?.patientEmail || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. patient@example.com"
                      autoComplete="off"
                      className="h-12 text-base rounded-xl bg-white"
                    />
                  </div>
                )}
              </div>

              {/* Primary Doctor Toggle */}
              <div className="flex flex-col gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">Assign a Primary Doctor?</span>
                  <div className="flex items-center gap-1 bg-slate-200/50 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setHasPrimaryDr(true)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        hasPrimaryDr ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHasPrimaryDr(false);
                        setPatientFormData(prev => ({ ...prev, ref_dr_name: "", ref_dr_id: "" }));
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        !hasPrimaryDr ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
                {hasPrimaryDr && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
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
                )}
              </div>

            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex items-center gap-4">
          {currentStep === 1 ? (
            <Button
              onClick={handleNext}
              className="bg-black hover:bg-slate-800 text-white rounded-full px-8 py-3.5 text-sm font-bold transition-all shadow-md"
            >
              Next
            </Button>
          ) : (
            <>
              <Button
                onClick={handleBack}
                variant="secondary"
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full px-8 py-3.5 text-sm font-bold transition-all"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                loading={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3.5 text-sm font-bold transition-all shadow-md shadow-blue-500/20 flex-1 sm:flex-none justify-center"
              >
                Submit Registration
              </Button>
            </>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Illustration / Decor */}
      <div className="hidden md:flex flex-1 bg-slate-50 rounded-[32px] p-8 relative overflow-hidden items-center justify-center border border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-emerald-50 opacity-50" />
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 w-full max-w-sm aspect-square bg-white rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100 p-10 flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-transform duration-500">
          <div className="w-28 h-28 rounded-full bg-blue-50 flex items-center justify-center mb-8 shadow-inner shadow-blue-200">
            <Icon icon="solar:user-heart-bold-duotone" className="text-6xl text-blue-500 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-3">Patient Records</h3>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Keep patient information organized, secure, and easily accessible across the clinic workflow.
          </p>
        </div>
      </div>

    </div>
  );
}

export default PatientBasicDetails;
