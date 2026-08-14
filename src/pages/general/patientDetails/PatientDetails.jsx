import React, { useEffect, useState } from "react";
import { MdOutlineAddChart } from "react-icons/md";
import { message, Tabs } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";
import { AxiosInstance } from "../../../utilities/AxiosInstance";
import { Icon } from "@iconify/react";
import PatientMedicalDetails from "../../../component/patientDetails/PatientMedicalDetails";
import PatientDocuments from "../../../component/patientDetails/PatientDocuments";
import BillsEntery from "../../../component/bills/BillsEntery";
import TreatmentTracker from "../../../component/treatment/TreatmentTracker";
import SessionNotes from "../../../component/sessionNotes/SessionNotes";
import Exercise from "../../../component/exercise/Exercise";
import ConsentForm from "../consentForm/ConsentForm";
import Feedback from "../feedback/Feedback";
import PatientHistory from "../../../component/patientDetails/PatientHistory";
import Summary from "../summary/Summary";
import Prescription from "../../general/prescription/Prescription";
import Button from "../../../component/ui/Button";
import Card from "../../../component/ui/Card";
import { Skeleton } from "../../../component/ui/Skeleton";

import { StaggerContainer, StaggerItem } from "../../../component/ui/Transitions";
import PhysicianAssessmentSheet from "../assessment/PhysicianAssessmentSheet";

const CollapseSection = ({ id, title, description, icon, colorInfo, activeTab, setActiveTab, children }) => {
  const isActive = activeTab === id;
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden transition-all duration-300">
      <div
        onClick={() => setActiveTab(isActive ? null : id)}
        className="group p-6 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${colorInfo?.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon icon={icon} className={`${colorInfo?.bg} text-xl`} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider m-0">{title}</h3>
            {description && (
              <p className="text-[11px] text-slate-400 font-medium m-0 mt-0.5">{description}</p>
            )}
          </div>
        </div>
        <Icon 
          icon="solar:alt-arrow-right-bold" 
          className={`text-slate-400 group-hover:text-blue-500 transition-all text-lg ${isActive ? "rotate-90 text-blue-500" : ""}`} 
        />
      </div>
      {isActive && (
        <div className="p-6 border-t border-slate-100 bg-white animate-in slide-in-from-top-4 duration-300">
          {children}
        </div>
      )}
    </div>
  );
};

const PatientDetails = ({ patientId, isNested }) => {
  const usertype = JSON.parse(sessionStorage.getItem("user"));
  const [patientInfo, setPatientInfo] = useState([]);
  const [patientMedicalData, setPatientMedicalData] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(true);
  const { patient_id: urlPatientId } = useParams();
  const patient_id = patientId || urlPatientId;
  const navigate = useNavigate();

  // Vibrant colors for active tabs with modern gradients
  const tabColors = {
    1: { bg: "text-blue-600", gradient: "bg-blue-100" },
    2: { bg: "text-orange-600", gradient: "bg-orange-100" },
    3: { bg: "text-orange-800", gradient: "bg-orange-100" },
    4: { bg: "text-pink-500", gradient: "bg-pink-100" },
    5: { bg: "text-emerald-700", gradient: "bg-emerald-100" },
    7: { bg: "text-yellow-500", gradient: "bg-yellow-100" },
    8: { bg: "text-blue-600", gradient: "bg-blue-100" },
    10: { bg: "text-red-500", gradient: "bg-red-100" },
    11: { bg: "text-purple-600", gradient: "bg-purple-100" },
    12: { bg: "text-cyan-500", gradient: "bg-cyan-100" },
    13: { bg: "text-teal-500", gradient: "bg-teal-100" },
  };

  const getPatientDetails = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get(
        `/patient/get-by-id/${patient_id}`
      );

      setPatientInfo(response?.data?.patient);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPatientMedicalDetails = async () => {
    try {
      const response = await AxiosInstance.get(
        `/patientregistration/get-by-patient/${patient_id}`
      );
      setPatientMedicalData(response?.data?.patient);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPatientDetails();
    if (activeTab === "1") {
      getPatientMedicalDetails();
    }
  }, [patient_id, activeTab]);

  function formatDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";
    
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const userInfo = JSON.parse(sessionStorage.getItem("user"));

  const [sharing, setSharing] = useState(false);
  const handleShareEmail = async () => {
    try {
      setSharing(true);
      const response = await AxiosInstance.post("/share/email", {
        patientId: patientInfo.patientId,
      });
      message.success(response.data.message || "Records shared successfully!");
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "Failed to share records via email"
      );
    } finally {
      setSharing(false);
    }
  };

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http") || url.startsWith("data:")) return url;
    const rawBaseUrl = AxiosInstance.defaults.baseURL || "http://localhost:3026";
    const baseUrl = rawBaseUrl.replace(/\/api\/?$/, "");
    return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  return (
    <StaggerContainer>
      <div className={isNested ? "flex flex-col gap-6" : "flex flex-col gap-10 p-10 bg-white/70 rounded backdrop-blur-3xl border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] min-h-[900px]"}>
        {/* Modern Header */}
        {!isNested && (
          <StaggerItem>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="font-black text-slate-800  text-4xl tracking-tight">
                  Patient <span className="text-blue-500">Details</span>
                </h1>
                <p className="text-slate-500  font-medium">
                  Comprehensive medical records and treatment history
                </p>
              </div>
              <div className="flex flex-row flex-wrap gap-3">
                <Button
                  onClick={() => navigate(-1)}
                  variant="secondary"
                  className="rounded-xl px-4 py-2 flex items-center gap-2"
                >
                  <Icon icon="tabler:arrow-left" />
                  Back
                </Button>

                <Button
                  onClick={handleShareEmail}
                  loading={sharing}
                  disabled={sharing}
                  variant="secondary"
                  className="rounded-xl px-4 py-2 flex items-center gap-2 border-emerald-500/50 text-emerald-600 hover:bg-emerald-50 :bg-emerald-500/10"
                >
                  <Icon icon="tabler:share" />
                  Share Records
                </Button>

                <Button
                  onClick={() => {
                    if (
                      usertype?.userType === "accountant" ||
                      usertype?.userType === "generalManager" ||
                      usertype?.userType === "receptionist"
                    ) {
                      message.warning(
                        "Doctor & CEO Only Able Access This Assessment"
                      );
                      return;
                    }
                    navigate(`/assessment/${patient_id}`);
                  }}
                  className="rounded-xl px-4 py-2 flex items-center gap-2"
                >
                  <MdOutlineAddChart />
                  Assessment
                </Button>
              </div>
            </div>
          </StaggerItem>
        )}

        <StaggerItem>
          <div className="flex flex-col xl:flex-row gap-6 items-stretch">
            {/* Left: Patient Info Card (Reduced width on XL screen) */}
            <div className="flex-1 min-w-0">
              <Card className="h-full group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border-slate-200/60 ">
                {/* Glow Effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-10 transition-opacity group-hover:opacity-20 bg-blue-500" />

                <div className="p-8 z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-slate-200/50">
                        {patientInfo?.profileImg || patientInfo?.photo ? (
                          <img
                            src={getImageUrl(patientInfo.profileImg || patientInfo.photo)}
                            alt={patientInfo.patientName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Icon icon="tabler:user-circle" className="text-5xl text-blue-600 " />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-black text-slate-400  uppercase tracking-widest m-0">
                          {loading ? <Skeleton className="h-4 w-20" /> : patientInfo.patientId}
                        </p>
                        <h2 className="font-black text-3xl md:text-4xl uppercase text-slate-800  tracking-tight m-0 mt-1">
                          {loading ? <Skeleton className="h-10 w-48" /> : patientInfo.patientName}
                        </h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      <div className="flex items-center gap-3 bg-slate-50/50  rounded-xl p-3 border border-slate-100 ">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <Icon icon="tabler:info-circle" className="text-xl text-blue-600 " />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-black text-slate-400  uppercase tracking-widest m-0">Info</p>
                          <div className="font-black text-slate-800  m-0 truncate">
                            {loading ? (
                              <Skeleton className="h-4 w-20" />
                            ) : (
                              `${patientInfo.patientAge} Y / ${patientInfo.patientGender}`
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-slate-50/50  rounded-xl p-3 border border-slate-100 ">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                          <Icon icon="tabler:calendar" className="text-xl text-emerald-600 " />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-black text-slate-400  uppercase tracking-widest m-0">DOB</p>
                          <div className="font-black text-slate-800  m-0 truncate">
                            {loading ? (
                              <Skeleton className="h-4 w-24" />
                            ) : (
                              formatDate(patientInfo.patientDOB)
                            )}
                          </div>
                        </div>
                      </div>

                      {(loading || patientInfo.patientPhone) && (
                        <div className="flex items-center gap-3 bg-slate-50/50  rounded-xl p-3 border border-slate-100 ">
                          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                            <Icon icon="tabler:phone" className="text-xl text-purple-600 " />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black text-slate-400  uppercase tracking-widest m-0">Phone</p>
                            <div className="font-black text-slate-800  m-0 truncate">
                              {loading ? (
                                <Skeleton className="h-4 w-32" />
                              ) : (
                                patientInfo.patientPhone
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {(loading || patientInfo.patientEmail) && (
                        <div className="flex items-center gap-3 bg-slate-50/50  rounded-xl p-3 border border-slate-100 ">
                          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                            <Icon icon="tabler:mail" className="text-xl text-amber-600 " />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black text-slate-400  uppercase tracking-widest m-0">Email</p>
                            <div className="font-black text-slate-800  m-0 truncate">
                              {loading ? (
                                <Skeleton className="h-4 w-40" />
                              ) : (
                                patientInfo.patientEmail
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {(loading || patientInfo.patientAddress) && (
                        <div className="flex items-center gap-3 bg-slate-50/50  rounded-xl p-3 border border-slate-100  md:col-span-2 lg:col-span-3">
                          <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                            <Icon icon="tabler:map-pin" className="text-xl text-rose-600 " />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black text-slate-400  uppercase tracking-widest m-0">Address</p>
                            <div className="font-black text-slate-800  m-0 capitalize">
                              {loading ? (
                                <Skeleton className="h-4 w-3/4" />
                              ) : (
                                patientInfo.patientAddress
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: 3 buttons in 3 rows */}
            <div className="w-full xl:w-96 flex flex-col gap-4 justify-between">
              <button
                onClick={() => {
                  const targetKey = (usertype?.userType !== "accountant" &&
                    usertype?.userType !== "generalManager" &&
                    usertype?.userType !== "receptionist") ? "12" : "10";
                  setActiveTab(targetKey);
                  document.querySelector(".custom-tabs")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 flex items-center justify-between p-5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-2xl shadow-sm hover:shadow-md transition-all group text-left cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon icon="solar:document-text-bold-duotone" className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm tracking-tight m-0">Patient History & Assessment</h3>
                    <p className="text-[11px] text-slate-400 font-medium m-0 mt-0.5">Clinical notes & doctor assessment</p>
                  </div>
                </div>
                <Icon icon="solar:alt-arrow-right-bold" className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => {
                  setActiveTab("1");
                  document.querySelector(".custom-tabs")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 flex items-center justify-between p-5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-400 rounded-2xl shadow-sm hover:shadow-md transition-all group text-left cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon icon="solar:user-id-bold-duotone" className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm tracking-tight m-0">Patient Medical Data</h3>
                    <p className="text-[11px] text-slate-400 font-medium m-0 mt-0.5">Personal details & demographics</p>
                  </div>
                </div>
                <Icon icon="solar:alt-arrow-right-bold" className="text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => {
                  setActiveTab("4");
                  document.querySelector(".custom-tabs")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 flex items-center justify-between p-5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-orange-400 rounded-2xl shadow-sm hover:shadow-md transition-all group text-left cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon icon="solar:heart-pulse-bold-duotone" className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm tracking-tight m-0">Current Treatment Data</h3>
                    <p className="text-[11px] text-slate-400 font-medium m-0 mt-0.5">Active treatment tracking & progress</p>
                  </div>
                </div>
                <Icon icon="solar:alt-arrow-right-bold" className="text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </StaggerItem>

        {/* Collapsible Sections Container */}
        <StaggerItem>
          <div className="w-full flex flex-col gap-4">
            {usertype?.userType !== "accountant" &&
              usertype?.userType !== "generalManager" && (
                <CollapseSection
                  id="1"
                  title="Patient Medical Data"
                  description="Personal details and demographic records"
                  icon="solar:user-id-bold-duotone"
                  colorInfo={tabColors[1]}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                >
                  <PatientMedicalDetails
                    patientMedicalData={patientMedicalData}
                    patientId={patient_id}
                  />
                </CollapseSection>
              )}

            <CollapseSection
              id="13"
              title="Attender Details"
              description="Emergency contact and caregiver info"
              icon="solar:users-group-two-rounded-bold-duotone"
              colorInfo={tabColors[13]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            >
              <div className="max-w-2xl mx-auto py-4">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-teal-500/10 text-teal-600 rounded-2xl">
                    <Icon icon="solar:users-group-two-rounded-bold-duotone" width={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 m-0">Patient Attender Details</h3>
                    <p className="text-xs text-slate-400 font-semibold m-0 mt-0.5">Primary caregiver and emergency contact information</p>
                  </div>
                </div>

                <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 md:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <Icon icon="solar:user-bold" className="text-slate-400 text-lg" />
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Attender Name</span>
                    </div>
                    <span className="text-base font-black text-slate-800">{patientInfo?.guardianName || "—"}</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <Icon icon="solar:phone-bold" className="text-slate-400 text-lg" />
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Phone Number</span>
                    </div>
                    {patientInfo?.attenderPhone ? (
                      <div className="flex items-center gap-3">
                        <span className="text-base font-black text-slate-800">{patientInfo.attenderPhone}</span>
                        <button
                          onClick={() => window.open(`https://wa.me/${patientInfo.attenderPhone}`, "_blank")}
                          className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-600 hover:text-white text-emerald-600 flex items-center justify-center transition-all active:scale-95"
                          title="Chat on WhatsApp"
                        >
                          <Icon icon="ic:baseline-whatsapp" width={18} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-base font-black text-slate-800">—</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                      <Icon icon="solar:heart-bold" className="text-slate-400 text-lg" />
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Relationship</span>
                    </div>
                    <span className="text-base font-black text-slate-800 capitalize">{patientInfo?.attenderRelationship || "—"}</span>
                  </div>
                </div>
              </div>
            </CollapseSection>

            {usertype?.userType !== "generalManager" && (
              <CollapseSection
                id="2"
                title="Lab Reports"
                description="Laboratory results and reports"
                icon="solar:document-bold-duotone"
                colorInfo={tabColors[2]}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <PatientDocuments patientId={patient_id} />
              </CollapseSection>
            )}

            <CollapseSection
              id="4"
              title="Treatment Data"
              description="Active treatment tracker logs"
              icon="solar:heart-pulse-bold-duotone"
              colorInfo={tabColors[4]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            >
              <TreatmentTracker patientId={patient_id} />
            </CollapseSection>

            <CollapseSection
              id="11"
              title="Prescription"
              description="Prescribed medications and dosages"
              icon="solar:pill-bold-duotone"
              colorInfo={tabColors[11]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            >
              <Prescription patientId={patient_id} />
            </CollapseSection>

            <CollapseSection
              id="3"
              title="Billing"
              description="Invoices, billing, and payment records"
              icon="solar:bill-list-bold-duotone"
              colorInfo={tabColors[3]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            >
              <BillsEntery patientId={patient_id} />
            </CollapseSection>

            {usertype?.userType !== "generalManager" && (
              <CollapseSection
                id="5"
                title="Session Notes"
                description="Clinical visit notes and logs"
                icon="solar:document-text-bold-duotone"
                colorInfo={tabColors[5]}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <SessionNotes patientId={patient_id} />
              </CollapseSection>
            )}

            {usertype?.userType !== "generalManager" && (
              <CollapseSection
                id="8"
                title="Feedback"
                description="Patient reviews and experience feedback"
                icon="solar:chat-round-line-bold-duotone"
                colorInfo={tabColors[8]}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <Feedback patientId={patient_id} />
              </CollapseSection>
            )}

            {usertype?.userType !== "generalManager" && (
              <CollapseSection
                id="7"
                title="Consent Form"
                description="Signed consent and waiver forms"
                icon="solar:file-text-bold-duotone"
                colorInfo={tabColors[7]}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <ConsentForm patientId={patient_id} />
              </CollapseSection>
            )}

            <CollapseSection
              id="10"
              title="Summary"
              description="Patient summaries and AI insights"
              icon="solar:notebook-bold-duotone"
              colorInfo={tabColors[10]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            >
              <Summary patientId={patient_id} />
            </CollapseSection>

            {usertype?.userType !== "accountant" &&
              usertype?.userType !== "generalManager" &&
              usertype?.userType !== "receptionist" && (
                <CollapseSection
                  id="12"
                  title="Assessment"
                  description="Specialist diagnosis and evaluation sheets"
                  icon="solar:document-text-bold-duotone"
                  colorInfo={tabColors[12]}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                >
                  <PhysicianAssessmentSheet patientId={patient_id} />
                </CollapseSection>
              )}
          </div>
        </StaggerItem>
      </div>
    </StaggerContainer>
  );
};

export default PatientDetails;
