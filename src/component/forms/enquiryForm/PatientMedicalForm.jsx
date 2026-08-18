import React, { useState, useEffect } from "react";
import { AxiosInstance } from "../../../utilities/AxiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import { Icon } from "@iconify/react";

const MEDICAL_SLIDES = [
  {
    id: 1,
    key: "primary_complaint",
    title: "Primary Complaint",
    description: "Describe the patient's main clinical complaint or chief reason for visit.",
    icon: "tabler:notes",
  },
  {
    id: 2,
    key: "duration_visit",
    title: "Duration & Last Visit",
    description: "Duration of complaint and date of last physician visit.",
    icon: "tabler:calendar-time",
  },
  {
    id: 3,
    key: "previous_treatments",
    title: "Previous Treatments",
    description: "Record any past clinical, dental, or surgical treatments.",
    icon: "tabler:history",
  },
  {
    id: 4,
    key: "dental_habits",
    title: "Dental Habits & History",
    description: "Flossing habits, extraction history, orthodontic care, teeth grinding.",
    icon: "tabler:dental",
  },
  {
    id: 5,
    key: "symptoms",
    title: "Clinical Symptoms",
    description: "Select active symptoms, severity score (1-10), and specific notes.",
    icon: "tabler:activity",
  },
  {
    id: 6,
    key: "vitals",
    title: "Vital Signs (BP & Sugar)",
    description: "Record Blood Pressure (mm Hg) and Random Blood Sugar (mg/dL).",
    icon: "tabler:heart-rate-monitor",
  },
  {
    id: 7,
    key: "physician_care",
    title: "Physician Care",
    description: "Is the patient currently under a doctor's care and reason.",
    icon: "tabler:user-doctor",
  },
  {
    id: 8,
    key: "medications_allergies",
    title: "Medications & Allergies",
    description: "Current active medications and known drug/environmental allergies.",
    icon: "tabler:pill",
  },
  {
    id: 9,
    key: "medical_conditions",
    title: "Medical Conditions",
    description: "Pre-existing systemic diseases or medical conditions.",
    icon: "tabler:stethoscope",
  },
  {
    id: 10,
    key: "habits_pain",
    title: "Personal Habits & Pain Score",
    description: "Smoking, alcohol habits, pregnancy status, and overall pain score (0-10).",
    icon: "tabler:report-medical",
  },
];

export default function PatientMedicalForm({
  fetchPatientMedical,
  patientId,
  hideSubmitButton,
  onSaveSuccess,
}) {
  const { patient_id: urlPatientId } = useParams();
  const patient_id = patientId || urlPatientId;
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(1);

  const symptoms = [
    { label: "Toothache", key: "toothache" },
    { label: "Sensitivity", key: "sensitivity" },
    { label: "Swelling", key: "swelling" },
    { label: "Bleeding Gums", key: "bleeding" },
    { label: "Pain on Biting", key: "bitingPain" },
  ];

  const emptyForm = {
    clinicId: "",
    patientId: "",
    patientName: "",
    patientPhone: "",
    patientAddress: "",
    patientEmail: "",
    patientDOB: "",
    patientGender: "",
    patientAge: "",
    patientAadhar: "",

    primaryComplaint: "",
    duration: "",
    lastPhysicianVisit: "",
    previousTreatments: "",
    floss: "",
    historyExtraction: "",
    orthodontic: "",
    bruxism: "",

    bp: "",
    rbs: "",
    underCare: "",
    physicianReason: "",
    medications: "",
    allergies: "",
    conditions: "",
    smoking: "",
    alcohol: "",
    pregnant: "",
    painScore: "0",

    symptomData: symptoms.map((s) => ({
      key: s.key,
      present: false,
      severity: 5,
      notes: "",
    })),
  };

  const [form, setForm] = useState({ ...emptyForm });
  const [loading, setLoading] = useState(false);

  const handleGetPatientInfo = async () => {
    try {
      const res = await AxiosInstance.get(`/patient/get-by-id/${patient_id}`);
      const data = res.data.patient;

      setForm((prev) => ({
        ...prev,
        clinicId: data?.clinicId,
        patientAadhar: data?.patientAadhar,
        patientAddress: data?.patientAddress,
        patientAge: data?.patientAge,
        patientDOB: data?.patientDOB,
        patientEmail: data?.patientEmail,
        patientGender: data?.patientGender,
        patientId: data?.patientId,
        patientName: data?.patientName,
        patientPhone: data?.patientPhone,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoadExistingMedical = async () => {
    try {
      const res = await AxiosInstance.get(
        `/patientregistration/get-by-patient/${patient_id}`
      );

      const existingData = res.data.data || res.data.patient || null;
      if (existingData) {
        setForm((prev) => ({
          ...prev,
          ...existingData,
          symptomData: existingData.symptomData || emptyForm.symptomData,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (patient_id) {
      handleGetPatientInfo();
      handleLoadExistingMedical();
    }
  }, [patient_id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);

    try {
      const userInfo = JSON.parse(
        sessionStorage.getItem("user") || sessionStorage.getItem("master") || "{}"
      );
      const cid = userInfo?.cid || userInfo?.clinicId || form.clinicId;
      const pid = patientId || urlPatientId || form.patientId;

      const payload = {
        ...form,
        clinicId: cid,
        patientId: pid,
      };

      let res;
      if (form?._id) {
        res = await AxiosInstance.patch(
          `/patientregistration/edit/${form._id}`,
          payload
        );
        message.success("Medical details updated successfully!");
      } else {
        res = await AxiosInstance.post(`/patientregistration/create`, payload);
        message.success("Medical details created successfully!");
      }

      const savedData = res?.data?.data || res?.data?.patient || res?.data || {};

      if (fetchPatientMedical) fetchPatientMedical();
      if (onSaveSuccess) {
        await onSaveSuccess(savedData);
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("Submit medical details error:", err);
      message.error(err.response?.data?.message || "Error saving medical details");
    } finally {
      setLoading(false);
    }
  };

  const updateSymptom = (index, updates) => {
    setForm((prev) => ({
      ...prev,
      symptomData: prev.symptomData.map((sym, i) =>
        i === index ? { ...sym, ...updates } : sym
      ),
    }));
  };

  const activeSlideMeta = MEDICAL_SLIDES[currentSlide - 1];

  const handleNextSlide = () => {
    if (currentSlide < MEDICAL_SLIDES.length) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleSkipSlide = () => {
    if (currentSlide < MEDICAL_SLIDES.length) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const renderRadioGroup = (name, label, options) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => {
          const isSelected = form[name] === opt;
          return (
            <button
              type="button"
              key={opt}
              onClick={() => setForm((prev) => ({ ...prev, [name]: opt }))}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderSlideBody = () => {
    switch (currentSlide) {
      case 1:
        // Slide 1: Primary Complaint
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Textarea
              label="Primary Clinical Complaint"
              name="primaryComplaint"
              value={form.primaryComplaint || ""}
              onChange={handleChange}
              rows={4}
              placeholder="Describe main chief complaint, reason for visit, or symptoms..."
            />
          </div>
        );

      case 2:
        // Slide 2: Duration & Last Visit
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {renderRadioGroup("duration", "Duration of Complaint", [
              "Less than 1 week",
              "1–4 weeks",
              "1–6 months",
              "More than 6 months",
            ])}

            <div className="pt-2">
              <Input
                type="date"
                label="Date of Last Physician Visit"
                name="lastPhysicianVisit"
                value={form.lastPhysicianVisit || ""}
                onChange={handleChange}
                className="h-12 rounded-xl text-base"
              />
            </div>
          </div>
        );

      case 3:
        // Slide 3: Previous Treatments
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Textarea
              label="Previous Clinical / Dental Treatments"
              name="previousTreatments"
              value={form.previousTreatments || ""}
              onChange={handleChange}
              rows={4}
              placeholder="Record any previous treatments, surgeries, or dental care history..."
            />
          </div>
        );

      case 4:
        // Slide 4: Dental Habits & History
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {renderRadioGroup("floss", "Do you floss daily?", ["Yes", "No"])}
              {renderRadioGroup("historyExtraction", "History of tooth extraction?", [
                "Yes",
                "No",
              ])}
              {renderRadioGroup("orthodontic", "Orthodontic treatment history?", [
                "Yes",
                "No",
              ])}
              {renderRadioGroup("bruxism", "Teeth grinding (Bruxism)?", [
                "Yes",
                "No",
              ])}
            </div>
          </div>
        );

      case 5:
        // Slide 5: Clinical Symptoms
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <p className="text-xs text-slate-500 font-medium m-0 mb-2">
              Check all applicable symptoms and specify severity score (1-10) with notes:
            </p>
            {symptoms.map((s, index) => {
              const currentSymptom = form.symptomData[index] || {
                present: false,
                severity: 5,
                notes: "",
              };
              return (
                <div
                  key={s.key}
                  className={`p-4 rounded-2xl border transition-all ${
                    currentSymptom.present
                      ? "bg-blue-50/60 border-blue-200 shadow-sm"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      checked={currentSymptom.present}
                      onChange={(e) =>
                        updateSymptom(index, { present: e.target.checked })
                      }
                    />
                    <span
                      className={`font-bold text-sm ${
                        currentSymptom.present ? "text-blue-900" : "text-slate-700"
                      }`}
                    >
                      {s.label}
                    </span>
                  </label>

                  {currentSymptom.present && (
                    <div className="mt-4 pl-8 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-200">
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Severity Score (1 - 10)
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            value={currentSymptom.severity}
                            onChange={(e) =>
                              updateSymptom(index, {
                                severity: parseInt(e.target.value),
                              })
                            }
                          />
                          <span
                            className={`w-8 h-8 flex items-center justify-center rounded-xl font-bold text-white text-xs ${
                              currentSymptom.severity < 4
                                ? "bg-emerald-500"
                                : currentSymptom.severity < 7
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                          >
                            {currentSymptom.severity}
                          </span>
                        </div>
                      </div>

                      <Input
                        placeholder="Add symptom notes..."
                        value={currentSymptom.notes}
                        onChange={(e) =>
                          updateSymptom(index, { notes: e.target.value })
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );

      case 6:
        // Slide 6: Vital Signs (BP & Sugar)
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                type="text"
                label="Blood Pressure (mm Hg)"
                name="bp"
                value={form.bp || ""}
                onChange={handleChange}
                placeholder="e.g. 120/80"
                className="h-12 rounded-xl text-base"
              />
              <Input
                type="text"
                label="Random Blood Sugar (mg/dL)"
                name="rbs"
                value={form.rbs || ""}
                onChange={handleChange}
                placeholder="e.g. 110"
                className="h-12 rounded-xl text-base"
              />
            </div>
          </div>
        );

      case 7:
        // Slide 7: Physician Care
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {renderRadioGroup("underCare", "Currently under physician care?", [
              "Yes",
              "No",
            ])}

            {form.underCare === "Yes" && (
              <div className="pt-2">
                <Input
                  type="text"
                  label="Reason for Physician Care"
                  name="physicianReason"
                  value={form.physicianReason || ""}
                  onChange={handleChange}
                  placeholder="Specify condition or treatment reason..."
                  className="h-12 rounded-xl text-base"
                />
              </div>
            )}
          </div>
        );

      case 8:
        // Slide 8: Medications & Allergies
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Textarea
                label="Current Active Medications"
                name="medications"
                value={form.medications || ""}
                onChange={handleChange}
                rows={3}
                placeholder="List current prescription or OTC drugs..."
              />
              <Textarea
                label="Known Allergies (Drugs / Food / Latex)"
                name="allergies"
                value={form.allergies || ""}
                onChange={handleChange}
                rows={3}
                placeholder="List any known allergies..."
              />
            </div>
          </div>
        );

      case 9:
        // Slide 9: Medical Conditions
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Input
              type="text"
              label="Pre-existing Medical Conditions"
              name="conditions"
              value={form.conditions || ""}
              onChange={handleChange}
              placeholder="e.g. Diabetes, Hypertension, Asthma, Cardiac History..."
              className="h-12 text-base rounded-xl"
            />
          </div>
        );

      case 10:
        // Slide 10: Habits & Pain Score
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {renderRadioGroup("smoking", "Smoking Habit", ["No", "Yes"])}
              {renderRadioGroup("alcohol", "Alcohol Habit", ["No", "Yes"])}
              {renderRadioGroup("pregnant", "Pregnancy Status", [
                "No",
                "Yes",
                "Not Applicable",
              ])}
            </div>

            {/* Pain Score Slider */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">
                Overall Clinical Pain Score (0 - 10)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="10"
                  className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  value={form.painScore || 0}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, painScore: e.target.value }))
                  }
                />
                <span
                  className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-white text-base ${
                    (parseInt(form.painScore) || 0) === 0
                      ? "bg-emerald-500"
                      : (parseInt(form.painScore) || 0) < 5
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                >
                  {form.painScore || 0}
                </span>
              </div>
            </div>

            {/* Medical Overview Summary Box */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Icon icon="tabler:shield-check" className="text-emerald-400 text-base" />
                  Medical History Summary
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                  Ready to Complete
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-slate-400 m-0">Primary Complaint</p>
                  <p className="font-bold text-slate-100 m-0 truncate">
                    {form.primaryComplaint || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 m-0">BP / RBS</p>
                  <p className="font-bold text-slate-100 m-0 truncate">
                    {form.bp || "N/A"} / {form.rbs || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 m-0">Under Care</p>
                  <p className="font-bold text-slate-100 m-0 truncate">
                    {form.underCare || "No"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 m-0">Pain Score</p>
                  <p className="font-bold text-amber-400 m-0 truncate">
                    {form.painScore || "0"} / 10
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
      {/* Hidden Submit Button triggered by parent */}
      <button
        id="hidden-medical-submit-btn"
        type="button"
        onClick={handleSubmit}
        className="hidden"
      />

      {/* Sub-stepper Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
        {MEDICAL_SLIDES.map((step) => {
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
              className={`flex-1 min-w-[75px] py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all border flex items-center justify-center gap-1 ${
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
          style={{ width: `${(currentSlide / MEDICAL_SLIDES.length) * 100}%` }}
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
                Medical Field {currentSlide} of {MEDICAL_SLIDES.length}
              </span>
              <span className="bg-slate-200 text-slate-600 text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                Optional (Can Skip)
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-800 m-0 mt-0.5">
              {activeSlideMeta.title}
            </h3>
          </div>
        </div>

        {/* Quick Skip button on top */}
        <button
          type="button"
          onClick={handleSkipSlide}
          className="text-xs text-slate-500 hover:text-blue-600 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 bg-white transition-all cursor-pointer flex items-center gap-1"
        >
          <span>Skip</span>
          <Icon icon="tabler:player-skip-forward" className="text-sm" />
        </button>
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
          <Button
            onClick={handleSkipSlide}
            variant="secondary"
            className="rounded-xl px-4 py-2 border border-slate-200 text-slate-500 bg-white hover:bg-slate-50 cursor-pointer text-xs font-medium flex items-center gap-1"
          >
            Skip Field
            <Icon icon="tabler:player-skip-forward" className="text-sm" />
          </Button>

          {currentSlide < MEDICAL_SLIDES.length ? (
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
              onClick={handleSubmit}
              loading={loading}
              variant="primary"
              className="rounded-xl px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer border-0 text-xs font-bold"
            >
              <Icon icon="tabler:circle-check" className="text-base" />
              Finish Registration
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
