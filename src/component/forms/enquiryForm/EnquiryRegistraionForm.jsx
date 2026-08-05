import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../../utilities/AxiosInstance";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import PatientBasicDetails from "./PatientBasicDetails";
import PatientMedicalForm from "./PatientMedicalForm";
import Button from "../../ui/Button";
import { Icon } from "@iconify/react";
import Card from "../../ui/Card";

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

function EnquiryRegistraionForm() {
  const { patient_id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

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

  const patientSessionDetails = React.useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("patientDetails")) || {};
    } catch {
      return {};
    }
  }, []);

  // Fetch patient basic information by ID
  const fetchPatientBasic = async () => {
    if (patient_id || patientBasic.patientId) {
      try {
        const { data } = await AxiosInstance.get(
          `/patient/get-by-id/${patient_id || patientBasic.patientId}`
        );

        setPatientBasic(data?.patient || {});
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Fetch patient medical/registration details by patient ID
  const fetchPatientMedical = async () => {
    if (patient_id || patientBasic.patientId) {
      try {
        const data = await AxiosInstance.get(
          `/patientregistration/get-by-patient/${patient_id || patientBasic.patientId
          }`
        );
        setFormData(data?.data?.patient || {});
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (patient_id) {
      fetchPatientBasic();
      fetchPatientMedical();
    } else {
      setPatientBasic({});
      setFormData({});
    }
  }, [patient_id]);

  // Create or update basic patient details
  const saveBasicDetails = async (skipRedirect = false) => {
    if (!patientBasic.patientName?.trim()) {
      message.error("Patient Name is required");
      return false;
    }
    if (!patientBasic.patientPhone?.trim()) {
      message.error("Patient Phone is required");
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

    formDataPayload.append("clinicId", user?.clinicId);

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

      // Use reduce to collect all _id values
      const billIds = response.data.data.reduce((acc, bill) => {
        if (bill._id) {
          acc.push(bill._id);
        }
        return acc;
      }, []);

      setBillsId(billIds); // store all IDs in state
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
      setPatientDocumentId(docIds); // store all IDs in state
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
      setTreatmentTrackerId(response?.data?._id); // store all IDs in state
    } catch (error) {
      console.error(error);
    }
  };
  const getSessionNotesId = async () => {
    try {
      const response = await AxiosInstance.get(
        `/session-notes/get-patient/${patient_id}`
      );

      // Use reduce to collect all _id values
      const sessionIds = response.data.data.reduce((acc, session) => {
        if (session._id) {
          acc.push(session._id);
        }
        return acc;
      }, []);
      setSessionNotesId(sessionIds); // store all IDs in state
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
    getBillsId();
    getDocId();
    getTreatmentTrackerId();
    getSessionNotesId();
    getAssessmentId();
    getPrescriptionId();
  }, []);

  const conformationToTreatmentHistory = async () => {
    const payload = {
      clinicId: user.clinicId,
      patientId: patient_id || patientBasic.patientId,
      treatmentId: formData?._id,
      date: Date(),
      medicalInformationId: formData?._id,
      billsId: billsId,
      patientDocumentId: patientDocumentId,
      treatmentTrackerId: treatmentTrackerId,
      sessionNotesId: sessionNotesId,
      assessmentId: assessmentId,
      prescriptionId: prescriptionId,
    };
    try {
      const res = await AxiosInstance.post("/treatment-history/add", payload);
      navigate("/home");
      message.success("Treatment history confirmed");
    } catch (error) {
      console.error(error);
      message.error("Failed to confirm treatment history");
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Modern Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-black text-slate-800  text-4xl tracking-tight">
            Patient <span className="text-blue-500">Registration</span>
          </h1>
          <p className="text-slate-500  font-medium">
            {patientBasic._id
              ? `Editing patient record: ${patientBasic.patientId || ''}`
              : "Create a new patient record and medical profile"
            }
          </p>
        </div>
        {patientBasic._id && (
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              onClick={() => {
                setPatientBasic({});
                setFormData({});
                navigate("/enquiry-registration");
              }}
              className="rounded-xl px-4 py-2 flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              <Icon icon="tabler:user-plus" />
              New Registration
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/home")}
              className="rounded-xl px-4 py-2 flex items-center gap-2"
            >
              <Icon icon="tabler:arrow-left" />
              Back to Home
            </Button>
          </div>
        )}
      </div>

      {/* Tab Cards for Full Width Flex Col */}
      <div className="flex flex-col gap-6">
        {/* Basic Details Card Tab */}
        <div
          onClick={() => {
            setActiveStep("basic");
            setIsOpen(true);
          }}
          className="group relative overflow-hidden bg-white/40 hover:bg-white/60 backdrop-blur-md border border-slate-200 hover:border-blue-400 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon icon="tabler:user-circle" width={36} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 m-0">1) Basic Details</h2>
              <p className="text-sm text-slate-500 font-medium m-0 mt-1">Patient registration, contact info, photo, and emergency attender info</p>
            </div>
          </div>
          <Icon icon="solar:alt-arrow-right-bold" className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-2 transition-all text-xl" />
        </div>

        {/* Medical Details Card Tab */}
        {user?.userType !== "receptionist" && (patientBasic?.patientId || patient_id) && (
          <div
            onClick={() => {
              setActiveStep("medical");
              setIsOpen(true);
            }}
            className="group relative overflow-hidden bg-white/40 hover:bg-white/60 backdrop-blur-md border border-slate-200 hover:border-emerald-400 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon icon="tabler:file-medical" width={36} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800 m-0">2) Medical Details</h2>
                <p className="text-sm text-slate-500 font-medium m-0 mt-1">Physician history, chief complaints, symptoms, and medical habits</p>
              </div>
            </div>
            <Icon icon="solar:alt-arrow-right-bold" className="text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-2 transition-all text-xl" />
          </div>
        )}
      </div>

      {/* Pop-up Dialog Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 md:p-6 transition-all duration-300 animate-in fade-in">
          <div className="relative bg-white rounded-[32px] border border-slate-200 shadow-2xl flex flex-col w-full max-w-5xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${activeStep === "basic" ? "bg-blue-500/10 text-blue-600" : "bg-emerald-500/10 text-emerald-600"}`}>
                  <Icon icon={activeStep === "basic" ? "tabler:user-circle" : "tabler:file-medical"} className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-800 m-0">
                    {activeStep === "basic" ? "Patient Basic Details" : "Physician & Medical History"}
                  </h2>
                  <p className="text-xs text-slate-400 font-semibold m-0 mt-0.5">
                    {activeStep === "basic" ? "Step 1 of 2: Demographics & Contact Info" : "Step 2 of 2: Health Profile & History"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <Icon icon="tabler:x" className="text-xl" />
              </button>
            </div>

            {/* Step Progress Bar */}
            <div className="w-full bg-slate-100 h-1">
              <div 
                className={`h-full transition-all duration-500 ${activeStep === "basic" ? "w-1/2 bg-blue-500" : "w-full bg-emerald-500"}`}
              />
            </div>

            {/* Modal Content Body */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {activeStep === "basic" ? (
                <PatientBasicDetails
                  patientFormData={patientBasic}
                  setPatientFormData={setPatientBasic}
                />
              ) : (
                <PatientMedicalForm 
                  fetchPatientMedical={fetchPatientMedical}
                  patientId={patientBasic.patientId || patient_id}
                  hideSubmitButton={true}
                  onSaveSuccess={() => {
                    // If it was a new registration, redirect to card preview page, else go to home
                    if (!patient_id && patientBasic.patientId) {
                      navigate(`/administration/identicards?patientId=${patientBasic.patientId}&autostart=true`);
                    } else {
                      conformationToTreatmentHistory();
                    }
                    setIsOpen(false);
                  }}
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-8 py-5 border-t border-slate-100 bg-slate-50/50">
              {/* Left Side Button */}
              <div>
                {activeStep === "medical" ? (
                  <Button
                    onClick={() => setActiveStep("basic")}
                    variant="secondary"
                    className="rounded-xl px-5 py-2.5 flex items-center gap-2 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                  >
                    <Icon icon="tabler:arrow-left" />
                    Previous
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="secondary"
                    className="rounded-xl px-5 py-2.5 border border-slate-200 text-slate-500 bg-white hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </Button>
                )}
              </div>

              {/* Right Side Button */}
              <div>
                {activeStep === "basic" ? (
                  <Button
                    onClick={async () => {
                      const res = await saveBasicDetails(true);
                      if (res) {
                        setActiveStep("medical");
                      }
                    }}
                    loading={loading}
                    variant="primary"
                    className="rounded-xl px-6 py-2.5 flex items-center gap-2 cursor-pointer"
                  >
                    Save & Next
                    <Icon icon="tabler:arrow-right" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      // Trigger submit of the medical details form
                      document.getElementById("hidden-medical-submit-btn")?.click();
                    }}
                    variant="primary"
                    className="rounded-xl px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <Icon icon="tabler:circle-check" />
                    Finish
                  </Button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default EnquiryRegistraionForm;
