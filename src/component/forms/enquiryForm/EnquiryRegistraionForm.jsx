import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../../utilities/AxiosInstance";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import PatientBasicDetails from "./PatientBasicDetails";
import Button from "../../ui/Button";
import { Icon } from "@iconify/react";
import Card from "../../ui/Card";
import PatientInfoTable from "../../tables/PatientInfoTable";

const SectionHeader = ({ title, icon }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 ">
      <Icon icon={icon} className="text-2xl" />
    </div>
    <div className="flex-1">
      <h2 className="font-black text-slate-800  text-2xl tracking-tight m-0">
        {title}
      </h2>
      <div className="h-0.5 bg-gradient-to-r from-blue-500/20 to-transparent mt-2" />
    </div>
  </div>
);

const REGISTRATION_STEPS = [
  {
    id: 1,
    key: "basic",
    title: "Basic Details",
    description: "Patient registration, contact info, photo, and emergency attender info",
    icon: "tabler:user-circle",
  }
];

function EnquiryRegistraionForm() {
  const { patient_id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(
    sessionStorage.getItem("user") || sessionStorage.getItem("master") || "{}"
  );
  const clinicId = user?.cid || user?.clinicId;

  // We keep separate states for basic and medical, but initialize empty objects to avoid undefined errors
  const [patientBasic, setPatientBasic] = useState({});
  const [formData, setFormData] = useState({});
  const [billsId, setBillsId] = useState();
  const [patientDocumentId, setPatientDocumentId] = useState();
  const [treatmentTrackerId, setTreatmentTrackerId] = useState();
  const [sessionNotesId, setSessionNotesId] = useState();
  const [assessmentId, setAssmentId] = useState();
  const [prescriptionId, setPrescriptionId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState("basic"); // "basic" or "medical"

  const fetchPatientMedical = async () => {
    const pid = patient_id || patientBasic.patientId;
    if (!pid) return;
    try {
      const response = await AxiosInstance.get(
        `/patientregistration/get-by-patient/${pid}`
      );
      if (response.data.data) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPatientBasic = async () => {
    if (!patient_id) return;
    try {
      const response = await AxiosInstance.get(
        `/patient/get-by-id/${patient_id}`
      );
      setPatientBasic(response.data.patient);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPatientBasic();
    fetchPatientMedical();
  }, [patient_id]);

  // Create or update basic patient details
  const saveBasicDetails = async (skipRedirect = false) => {
    if (!patientBasic.patientName || !patientBasic.patientPhone) {
      message.error("Please fill in required basic fields (Name, Phone)");
      return false;
    }

    setLoading(true);

    const formDataPayload = new FormData();
    Object.keys(patientBasic).forEach((key) => {
      if (key !== "profileImgFile" && key !== "profileImgPreview" && patientBasic[key] !== undefined && patientBasic[key] !== null) {
        if (Array.isArray(patientBasic[key])) {
          patientBasic[key].forEach(val => formDataPayload.append(key, val));
        } else {
          formDataPayload.append(key, patientBasic[key]);
        }
      }
    });

    if (clinicId) {
      formDataPayload.append("clinicId", clinicId);
    }

    if (patientBasic.profileImgFile) {
      formDataPayload.append("profileImg", patientBasic.profileImgFile);
    } else if (!patientBasic.profileImg) {
      let fallbackUrl = "https://avatar.iran.liara.run/public";
      const gender = patientBasic.patientGender?.toLowerCase();
      const age = parseInt(patientBasic.patientAge) || 25;
      
      if (gender === "female") {
        fallbackUrl += age < 18 ? "/girl" : "/woman";
      } else {
        fallbackUrl += age < 18 ? "/boy" : "/man";
      }
      formDataPayload.append("profileImg", fallbackUrl);
    }

    try {
      if (patientBasic._id) {
        const response = await AxiosInstance.put(
          `/patient/edit/${patientBasic._id}`,
          formDataPayload
        );

        message.success("Patient details updated successfully");
        return true;
      } else {
        const response = await AxiosInstance.post("/patient/create", formDataPayload);
        const savedPatient = response.data.patient;
        setPatientBasic(savedPatient);
        sessionStorage.setItem(
          "patientDetails",
          JSON.stringify(savedPatient)
        );
        message.success("Patient registered successfully");
        if (!skipRedirect) {
          navigate(`/administration/identicards?patientId=${savedPatient.patientId}&autostart=true`);
        }
        return savedPatient;
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to save patient details");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getBillsId = async () => {
    try {
      const response = await AxiosInstance.get(
        `/treatment-bill/get-patient/${patient_id}`
      );

      const billIds = response.data.data.reduce((acc, bill) => {
        if (bill._id) {
          acc.push(bill._id);
        }
        return acc;
      }, []);

      setBillsId(billIds);
    } catch (error) {
      console.error(error);
    }
  };

  const getDocId = async () => {
    try {
      const response = await AxiosInstance.get(
        `/patientdocuments/get-by-patient-id/${patient_id}`
      );

      const docIds = response.data.documents.reduce((acc, doc) => {
        if (doc._id) {
          acc.push(doc._id);
        }
        return acc;
      }, []);
      setPatientDocumentId(docIds);
    } catch (error) {
      console.error(error);
    }
  };

  const getAssessmentId = async () => {
    try {
      const response = await AxiosInstance.get(`/assessment/get/${patient_id}`);
      if (response.data?.data) {
        setAssmentId(response.data.data._id);
      }
    } catch (error) {
      console.error("Assessment fetch error:", error);
    }
  };

  const getTreatmentTrackerId = async () => {
    try {
      const response = await AxiosInstance.get(
        `/treatment-tracker/patient/${patient_id}`
      );
      setTreatmentTrackerId(response?.data?._id);
    } catch (error) {
      console.error(error);
    }
  };

  const getSessionNotesId = async () => {
    try {
      const response = await AxiosInstance.get(
        `/session-notes/get-patient/${patient_id}`
      );

      const sessionIds = response.data.data.reduce((acc, session) => {
        if (session._id) {
          acc.push(session._id);
        }
        return acc;
      }, []);
      setSessionNotesId(sessionIds);
    } catch (error) {
      console.error(error);
    }
  };

  const getPrescriptionId = async () => {
    try {
      const response = await AxiosInstance.get(
        `/prescription/patient/${patient_id}`
      );

      const prescriptionId = response?.data?.data.reduce(
        (acc, prescription) => {
          if (prescription?._id) {
            acc.push(prescription?._id);
          }
          return acc;
        },
        []
      );
      setPrescriptionId(prescriptionId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (patient_id) {
      getBillsId();
      getDocId();
      getTreatmentTrackerId();
      getSessionNotesId();
      getAssessmentId();
      getPrescriptionId();
    }
  }, [patient_id]);

  const conformationToTreatmentHistory = async () => {
    const payload = {
      clinicId: clinicId || patientBasic?.clinicId,
      patientId: patient_id || patientBasic?.patientId,
      treatmentId: formData?._id,
      date: new Date().toISOString(),
      medicalInformationId: formData?._id,
      billsId: billsId || [],
      patientDocumentId: patientDocumentId || [],
      treatmentTrackerId: treatmentTrackerId,
      sessionNotesId: sessionNotesId || [],
      assessmentId: assessmentId,
      prescriptionId: prescriptionId || [],
    };
    try {
      await AxiosInstance.post("/treatment-history/add", payload);
      message.success("Treatment history confirmed");
    } catch (error) {
      console.error("Treatment history confirmation error:", error);
    } finally {
      navigate("/home");
    }
  };

  const currentStepObj = REGISTRATION_STEPS.find((s) => s.key === activeStep) || REGISTRATION_STEPS[0];
  const stepIndex = currentStepObj.id;

  const renderStepperNav = () => (
    <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-1">
      {REGISTRATION_STEPS.map((step) => {
        const isActive = step.key === activeStep;
        const isMedical = step.key === "medical";
        const isMedicalDisabled =
          isMedical &&
          (user?.userType === "receptionist" ||
            (!patientBasic?._id && !patient_id && !patientBasic?.patientId));
        const isCompleted = step.id < stepIndex;

        return (
          <button
            type="button"
            key={step.id}
            onClick={() => {
              if (!isMedicalDisabled) {
                setActiveStep(step.key);
              }
            }}
            disabled={isMedicalDisabled}
            className={`flex-1 min-w-[150px] sm:min-w-[200px] py-3 px-4 rounded-xl text-xs font-semibold transition-all border flex items-center justify-between gap-3 ${
              isActive
                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.01]"
                : isCompleted
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 cursor-pointer"
                : isMedicalDisabled
                ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 cursor-pointer"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`p-2 rounded-lg flex items-center justify-center ${
                  isActive
                    ? "bg-white/20 text-white"
                    : isCompleted
                    ? "bg-emerald-200/60 text-emerald-800"
                    : "bg-slate-200/60 text-slate-600"
                }`}
              >
                <Icon icon={step.icon} className="text-lg" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-[10px] uppercase opacity-80">
                  Step {step.id}
                </span>
                <span className="truncate text-xs font-bold">{step.title}</span>
              </div>
            </div>
            {isCompleted && (
              <Icon icon="tabler:check" className="text-base shrink-0 text-emerald-600" />
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col gap-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Header & Stepper Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="font-black text-slate-900 text-2xl sm:text-3xl tracking-tight m-0">
              Patient <span className="text-blue-600">Registration</span>
            </h1>
            <p className="text-slate-500 font-medium text-xs sm:text-sm m-0">
              {patientBasic._id || patient_id
                ? `Editing patient record: ${patientBasic.patientId || patient_id || ""}`
                : "Create a new patient record and medical profile"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {patientBasic._id && (
              <Button
                variant="secondary"
                onClick={() => {
                  setPatientBasic({});
                  setFormData({});
                  navigate("/enquiry-registration");
                }}
                className="rounded-xl px-4 py-2 flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                <Icon icon="tabler:user-plus" className="text-base" />
                New Registration
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => navigate("/home")}
              className="rounded-xl px-4 py-2 flex items-center gap-2 text-xs font-semibold"
            >
              <Icon icon="tabler:arrow-left" className="text-base" />
              Back to Home
            </Button>
          </div>
        </div>

        {/* Stepper Navigation Removed */}
      </div>

      {/* Main Patient Registration Component */}
      <div className="w-full bg-white rounded-[40px] shadow-sm border border-slate-200/80 p-2 sm:p-4">
        <PatientBasicDetails
          patientFormData={patientBasic}
          setPatientFormData={setPatientBasic}
          loading={loading}
          onSaveAndNext={async () => {
            await saveBasicDetails(false);
          }}
        />
      </div>

      {/* Patient Information Table Section */}
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-black text-slate-800 text-2xl tracking-tight m-0">
            Registered <span className="text-blue-500">Patients</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm m-0">
            View, search, and manage clinic patients and their history
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur-md border border-slate-200 p-6 rounded-3xl shadow-sm">
          <PatientInfoTable />
        </div>
      </div>
    </div>
  );
}

export default EnquiryRegistraionForm;
