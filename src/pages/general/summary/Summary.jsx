import Page1 from "./session1/Page1";
import Page2 from "./session1/Page2";
import Page3 from "./session2/Page3";
import Page4 from "./session2/Page4";
import Page5 from "./session3/Page5";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef, useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { message, Spin, Collapse } from "antd";
import { AxiosInstance } from "../../../utilities/AxiosInstance";
import { useParams } from "react-router-dom";
import Page6 from "./session3/Page6";
import PatientMedicalDetails from "../../../component/patientDetails/PatientMedicalDetails";
import Card from "../../../component/ui/Card";
import Button from "../../../component/ui/Button";
import SpecialistAssessmentSummary from "../assessment/SpecialistAssessmentSummary";
import DentalAssessmentWrapper from "../assessment/DentalAssessmentWrapper";
import PatientTimeline from "./PatientTimeline";
import AiScribeModal from "../../../component/AiScribe/AiScribeModal";

function Summary({ patientId, visibleSections, pageTitle, pageIcon }) {
  const page1Ref = useRef();
  const page2Ref = useRef();
  const page3Ref = useRef();
  const page4Ref = useRef();
  const page5Ref = useRef();
  const { patient_id: urlPatientId } = useParams();
  const patient_id = patientId || urlPatientId;

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [patientMinimalData, setPatientMinimalData] = useState({});
  const [patientMedicalData, setPatientMedicalData] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [treatmentTracker, setTreatmentTracker] = useState([]);
  const [exerciseSummary, setExerciseSummary] = useState([]);
  const [assessmentData, setAssessmentData] = useState({});
  const [prescriptions, setPrescriptions] = useState([]);
  const [labDocs, setLabDocs] = useState([]);
  const [scanDocs, setScanDocs] = useState([]);
  const [bills, setBills] = useState([]);
  const [isAiScribeModalOpen, setIsAiScribeModalOpen] = useState(false);
  
  const allAccordionKeys = [
    "patient_details", "doctors", "diagnosis", "reports"
  ];
  
  const initialKeys = visibleSections || allAccordionKeys;
  
  const [activeAccordionKeys, setActiveAccordionKeys] = useState(initialKeys);

  const handledDoctors = useMemo(() => {
    const doctors = new Set();
    allNotes.forEach((note) => {
      if (note.sessionDocName) doctors.add(note.sessionDocName);
    });
    treatmentTracker.forEach((track) => {
      if (track.treatedBy) doctors.add(track.treatedBy);
    });
    prescriptions.forEach((p) => {
      if (p.doctorName) doctors.add(p.doctorName);
    });
    return Array.from(doctors);
  }, [allNotes, treatmentTracker, prescriptions]);

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
  const getPatientMinimalData = async () => {
    try {
      const response = await AxiosInstance.get(
        `/patient/get-by-id/${patient_id}`
      );
      setPatientMinimalData(response.data.patient);
      return response.data.patient;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const handleGetNotes = async () => {
    try {
      const response = await AxiosInstance.get(
        `/session-notes/get-patient/${patient_id}`
      );
      setAllNotes(response?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };
  async function fetchTreatmentTracker() {
    try {
      const { data } = await AxiosInstance.get(
        `/treatment-tracker/get-patient/${patient_id}`
      );
      setTreatmentTracker(data?.data || []);
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchExerciseSummary() {
    try {
      const { data } = await AxiosInstance.get(`/exercise/get/1/${patient_id}`);
      setExerciseSummary(data?.data || []);
    } catch (error) {
      console.error(error);
    }
  }
  const getAssessmentData = async () => {
    try {
      const response = await AxiosInstance.get(`/assessment/get/${patient_id}`);

      setAssessmentData(response?.data?.data || {});
    } catch (error) {
      console.error(error);
    }
  };

  const getTimelineData = async (phnId) => {
    try {
      const pRes = await AxiosInstance.get(`/prescription/patient/${patient_id}`).catch(() => ({ data: { data: [] } }));
      setPrescriptions(pRes?.data?.data || []);
      
      const bRes = await AxiosInstance.get(`/treatment-bill/get-patient/${patient_id}`).catch(() => ({ data: { data: [] } }));
      setBills(bRes?.data?.data || []);
      
      if (phnId) {
        const [scanRes, labRes] = await Promise.all([
          AxiosInstance.get(`/scan-prescription/by-patient/${phnId}`).catch(() => ({ data: { data: [] } })),
          AxiosInstance.get(`/lab-prescription/by-patient/${phnId}`).catch(() => ({ data: { data: [] } })),
        ]);
        setScanDocs(scanRes?.data?.data || []);
        setLabDocs(labRes?.data?.data || []);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const downloadPDF = async () => {
    setLoading(true);
    setProgress(0);

    // Expand all accordions temporarily to allow html2canvas to capture them
    const previousKeys = activeAccordionKeys;
    setActiveAccordionKeys(["patient_details", "doctors", "diagnosis", "reports"]);

    // Give DOM time to expand before rendering
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10; // Top/bottom margin
      const maxHeight = pdfHeight - 2 * margin;

      const components = [page1Ref, page2Ref, page3Ref, page4Ref, page5Ref];

      for (let i = 0; i < components.length; i++) {
        const ref = components[i]?.current;
        if (!ref) continue;

        const canvas = await html2canvas(ref, {
          scale: 1,
          useCORS: true,
          backgroundColor: "#ffffff",
          onclone: (clonedDoc) => {
            // Force light mode in the cloned document for PDF generation
            clonedDoc.documentElement.classList.remove("dark");
            const element = clonedDoc.body.querySelector(
              `[data-html2canvas-ignore="true"]`
            );
            if (element) {
              element.style.display = "none";
            }
          },
        });

        const imgData = canvas.toDataURL("image/png");

        // Calculate dimensions to fit within page width, preserving aspect ratio
        let imgWidth = pdfWidth - 2 * margin;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        // If height exceeds max, scale down proportionally
        if (imgHeight > maxHeight) {
          imgHeight = maxHeight;
          imgWidth = (canvas.width * imgHeight) / canvas.height;
        }

        // Add page for each component (skip for first)
        if (i > 0) {
          pdf.addPage();
        }

        // Add centered image
        const x = (pdfWidth - imgWidth) / 2;
        const y = margin;
        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

        // Update progress percentage
        setProgress(Math.round(((i + 1) / components.length) * 100));
      }

      pdf.save("AssessmentSummary.pdf");

      message.success({
        content: "PDF downloaded successfully!",
        duration: 2,
        style: { marginTop: "20vh" },
      });
    } catch (error) {
      console.error("PDF generation failed:", error);
      message.error("Failed to download PDF. Please try again.");
    } finally {
      setActiveAccordionKeys(previousKeys);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatientMinimalData().then((data) => {
      if (data?.PHN_ID) {
        getTimelineData(data.PHN_ID);
      } else {
        getTimelineData(null);
      }
    });
    getPatientMedicalDetails();
    handleGetNotes();
    fetchTreatmentTracker();
    fetchExerciseSummary();
    getAssessmentData();
  }, []);

  return (
    <Card className="min-h-screen">
      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
          <Spin size="large" className="text-white" />
          <h2 className="text-white text-2xl font-semibold mt-6">
            Generating PDF... {progress}%
          </h2>
          <p className="text-slate-300 mt-2 max-w-md text-center">
            This may take a few moments. Please do not close or navigate away from this page.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border-b border-slate-100  pb-4">
        <h1 className="font-bold text-slate-800  text-2xl m-0 flex items-center gap-2">
          <Icon icon={pageIcon || "solar:document-text-linear"} className="text-blue-500" />
          {"Specialist Assessment Summary"}
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => setIsAiScribeModalOpen(true)}
            className="flex items-center gap-2 border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            <Icon icon="solar:microphone-3-bold-duotone" width={20} />
            AI Scribe
          </Button>
          <Button
            variant="primary"
            disabled={loading}
            onClick={() => downloadPDF()}
            className="flex items-center gap-2"
          >
            <Icon icon="solar:printer-linear" width={20} />
            Print / Download PDF
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-8">
            <div className="backdrop-blur-md rounded-lg p-4 bg-slate-100">
              {assessmentData?.medicalNotes?.specialistAssessment && Object.keys(assessmentData.medicalNotes.specialistAssessment).length > 0 ? (
                <SpecialistAssessmentSummary
                  specialistAssessment={assessmentData.medicalNotes.specialistAssessment}
                />
              ) : null}
              
              <DentalAssessmentWrapper patientId={patient_id} isReadOnlyView={true} />
              
              {(!assessmentData?.medicalNotes?.specialistAssessment || Object.keys(assessmentData.medicalNotes.specialistAssessment).length === 0) && (
                <div className="empty-state-placeholder hidden">
                  {/* We can hide the text if we want, or rely on DentalAssessmentWrapper to populate */}
                </div>
              )}
            </div>
      </div>
      <AiScribeModal 
        isOpen={isAiScribeModalOpen} 
        onClose={() => setIsAiScribeModalOpen(false)} 
        patientId={patient_id} 
      />
    </Card>
  );
}

export default Summary;
