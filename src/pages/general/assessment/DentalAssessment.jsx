import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AxiosInstance } from "../../../utilities/AxiosInstance";
import { useParams } from "react-router-dom";
import formatDateToDDMMYYYY from "../../../utilities/formatter";
import { message, Collapse } from "antd";
import CreatableSelect from "react-select/creatable";
import { Icon } from "@iconify/react/dist/iconify.js";
import Card from "../../../component/ui/Card";
import Button from "../../../component/ui/Button";
import Input from "../../../component/ui/Input";
import Textarea from "../../../component/ui/Textarea";
import { Skeleton } from "../../../component/ui/Skeleton";

export default function DentalAssessment({ isEmbedded = false, explicitPatientId, initialData = null, isReadOnly = false, onCancelSession }) {
  const params = useParams();
  const patient_id = explicitPatientId || params.patient_id;

  /* ================= PATIENT INFO ================= */
  const [patientInfo, setPatientInfo] = useState({});
  const [clinicId, setClinicId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [options, setOptions] = useState([]); // For fetched conditions/options
  const [loading, setLoading] = useState(true);

  // Hard Tissue: Teeth Chart States
  const [teethRecords, setTeethRecords] = useState({});
  const [inputString, setInputString] = useState("");
  const [activeTooth, setActiveTooth] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoverDialogOpen, setHoverDialogOpen] = useState(false);
  const [hoveredTooth, setHoveredTooth] = useState(null);
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [selectedTeethData, setSelectedTeethData] = useState({
    teethNo: null,
    complaints: [],
    details: "",
  });
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");

  // Diagnosis States
  const [diagnosisText, setDiagnosisText] = useState("");
  const [diagnosisDate, setDiagnosisDate] = useState("");
  const [editingDiagnosisIndex, setEditingDiagnosisIndex] = useState(-1);
  const [editDiagnosisText, setEditDiagnosisText] = useState("");
  const [editDiagnosisDate, setEditDiagnosisDate] = useState("");

  // Treatment Plan States (similar to Diagnosis)
  const [treatmentPlanText, setTreatmentPlanText] = useState("");
  const [treatmentPlanDate, setTreatmentPlanDate] = useState("");
  const [editingTreatmentPlanIndex, setEditingTreatmentPlanIndex] =
    useState(-1);
  const [editTreatmentPlanText, setEditTreatmentPlanText] = useState("");
  const [editTreatmentPlanDate, setEditTreatmentPlanDate] = useState("");

  const updateField = (field, value) => {
    setTeethRecords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await AxiosInstance.get(`/patient/get-by-id/${patient_id}`);
        const p = res.data.patient;
        setPatientInfo({
          Name: p.patientName,
          Age: p.patientAge,
          Gender: p.patientGender,
          Phone: p.patientPhone,
          Address: p.patientAddress,
          DOB: formatDateToDDMMYYYY(p.patientDOB),
        });
        const userInfo = JSON.parse(
          sessionStorage.getItem("user") || sessionStorage.getItem("master") || "{}"
        );
        let cid = userInfo?.cid || userInfo?.clinicId || "";
        if (Array.isArray(p?.clinicId) && p.clinicId.length > 0) {
          cid = p.clinicId[0];
        } else if (typeof p?.clinicId === 'string' && p.clinicId.trim() !== '') {
          cid = p.clinicId;
        }
        setClinicId(cid);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [patient_id]);

  /* ================= MEDICAL HISTORY ================= */
  const medicalHistory = [
    "Diabetes",
    "Hypertension",
    "Heart Issues",
    "Allergies",
    "Current Medications",
  ];

  const [medicalChecks, setMedicalChecks] = useState(
    medicalHistory.reduce((a, i) => ({ ...a, [i]: false }), {})
  );
  const [medicalNotes, setMedicalNotes] = useState(
    medicalHistory.reduce((a, i) => ({ ...a, [i]: "" }), {})
  );

  /* ================= EXTRAORAL ================= */
  const initialExtraoral = {
    facialSymmetry: { status: "Normal", notes: "" },
    lymphNodes: { status: "Normal", notes: "" },
    softTissueSwelling: { status: "Normal", notes: "" },
    tmj: {
      right: {
        crepitus: false,
        clicking: false,
        tenderness: false,
      },
      left: {
        crepitus: false,
        clicking: false,
        tenderness: false,
      },
    },
    muscles: {
      deviationOnOpening: { checked: false, notes: "" },
      deviationOnClosing: { checked: false, notes: "" },
    },
    overallNotes: "",
  };

  const [extraoral, setExtraoral] = useState(initialExtraoral);

  /* ================= INTRAORAL ================= */
  const intraoralStructures = [
    "Buccal Mucosa",
    "Tongue",
    "Gingiva",
    "Palate",
    "Floor of Mouth",
  ];

  const [intraoralNotes, setIntraoralNotes] = useState(
    intraoralStructures.reduce((a, s) => ({ ...a, [s]: "" }), {})
  );

  const fetchConditions = async () => {
    try {
      const res = await AxiosInstance.get("/assessment/get-all-conditions");
      // Extract the actual data array from the response
      setOptions(res.data?.data || []); // ensure it's an array
      console.log("Fetched options:", res.data?.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConditions();
  }, []);

  /* ================= SYMPTOMS ================= */
  const symptoms = [
    { label: "Toothache", key: "toothache" },
    { label: "Sensitivity", key: "sensitivity" },
    { label: "Swelling", key: "swelling" },
    { label: "Bleeding Gums", key: "bleeding" },
    { label: "Pain on Biting", key: "bitingPain" },
  ];

  const [symptomData, setSymptomData] = useState(
    symptoms.reduce(
      (a, s) => ({
        ...a,
        [s.key]: { present: false, severity: 5, notes: "" },
      }),
      {}
    )
  );

  /* ================= HARD TISSUE ADDITIONAL ================= */
  const initialHardTissue = {
    occlusion: "",
    calculus: "",
    plaque: "",
    bleeding_on_probing: "",
    probing_depth: "",
    oral_hygiene: "",
  };

  const [hardTissue, setHardTissue] = useState(initialHardTissue);

  const hardTissueAssessments = [
    {
      title: "Occlusion:",
      name: "occlusion",
      type: "radio",
      list: ["Class 1", "Class 2 Div 1", "Class 2 Div 2", "Class 3"],
    },
    {
      title: "Calculus:",
      name: "calculus",
      type: "radio",
      list: ["None", "Grade 1", "Grade 2", "Grade 3"],
    },
    {
      title: "Plaque:",
      name: "plaque",
      type: "radio",
      list: ["None", "Mild", "Moderate", "Severe"],
    },
    {
      title: "Bleeding on Probing:",
      name: "bleeding_on_probing",
      type: "radio",
      list: ["None", "Localized", "Generalized", "Severe"],
    },
    {
      title: "Probing Depth:",
      name: "probing_depth",
      type: "textarea",
    },
    {
      title: "Oral Hygiene:",
      name: "oral_hygiene",
      type: "radio",
      list: ["Excellent", "Good", "Fair", "Poor"],
    },
  ];

  /* ================= TREATMENT ================= */
  const [treatment, setTreatment] = useState({
    diagnosis: [],
    plan: [], // Changed to array to match diagnosis structure
    cost: "",
    followUp: "",
    consent: false,
  });

  // Diagnosis Functions
  const addDiagnosis = () => {
    if (!diagnosisText.trim() || !diagnosisDate.trim()) return;
    setTreatment((prev) => ({
      ...prev,
      diagnosis: [
        ...prev.diagnosis,
        { text: diagnosisText.trim(), date: diagnosisDate },
      ],
    }));
    setDiagnosisText("");
    setDiagnosisDate("");
  };

  const removeDiagnosis = (index) => {
    setTreatment((prev) => ({
      ...prev,
      diagnosis: prev.diagnosis.filter((_, i) => i !== index),
    }));
    if (editingDiagnosisIndex === index) {
      cancelEditDiagnosis();
    }
  };

  const startEditDiagnosis = (diag, index) => {
    setEditingDiagnosisIndex(index);
    setEditDiagnosisText(diag.text);
    setEditDiagnosisDate(diag.date);
  };

  const saveEditDiagnosis = () => {
    if (
      editingDiagnosisIndex === -1 ||
      !editDiagnosisText.trim() ||
      !editDiagnosisDate.trim()
    )
      return;
    setTreatment((prev) => {
      const newDiagnosis = [...prev.diagnosis];
      newDiagnosis[editingDiagnosisIndex] = {
        text: editDiagnosisText.trim(),
        date: editDiagnosisDate.trim(),
      };
      return {
        ...prev,
        diagnosis: newDiagnosis,
      };
    });
    setEditingDiagnosisIndex(-1);
    setEditDiagnosisText("");
    setEditDiagnosisDate("");
  };

  const cancelEditDiagnosis = () => {
    setEditingDiagnosisIndex(-1);
    setEditDiagnosisText("");
    setEditDiagnosisDate("");
  };

  const addTreatmentPlan = () => {
    if (!treatmentPlanText.trim() || !treatmentPlanDate.trim()) return;
    setTreatment((prev) => ({
      ...prev,
      plan: [
        ...prev.plan,
        { text: treatmentPlanText.trim(), date: treatmentPlanDate },
      ],
    }));
    setTreatmentPlanText("");
    setTreatmentPlanDate("");
  };

  const removeTreatmentPlan = (index) => {
    setTreatment((prev) => ({
      ...prev,
      plan: prev.plan.filter((_, i) => i !== index),
    }));
    if (editingTreatmentPlanIndex === index) {
      cancelEditTreatmentPlan();
    }
  };

  const startEditTreatmentPlan = (plan, index) => {
    setEditingTreatmentPlanIndex(index);
    setEditTreatmentPlanText(plan.text);
    setEditTreatmentPlanDate(plan.date);
  };

  const saveEditTreatmentPlan = () => {
    if (
      editingTreatmentPlanIndex === -1 ||
      !editTreatmentPlanText.trim() ||
      !editTreatmentPlanDate.trim()
    )
      return;
    setTreatment((prev) => {
      const newPlan = [...prev.plan];
      newPlan[editingTreatmentPlanIndex] = {
        text: editTreatmentPlanText.trim(),
        date: editTreatmentPlanDate.trim(),
      };
      return {
        ...prev,
        plan: newPlan,
      };
    });
    setEditingTreatmentPlanIndex(-1);
    setEditTreatmentPlanText("");
    setEditTreatmentPlanDate("");
  };

  const cancelEditTreatmentPlan = () => {
    setEditingTreatmentPlanIndex(-1);
    setEditTreatmentPlanText("");
    setEditTreatmentPlanDate("");
  };

  // Teeth Chart Functions
  const addComplaint = (option) => {
    if (!option || !activeTooth) return;

    const complaintValue = option.value;
    setTeethRecords((prev) => {
      const toothKey = String(activeTooth);
      const existing = prev[toothKey]?.complaints || [];
      if (existing.includes(complaintValue)) return prev;

      const newComplaints = [...existing, complaintValue];
      setSelectedTeethData((prev) => ({
        ...prev,
        complaints: newComplaints,
      }));
      return {
        ...prev,
        [toothKey]: {
          ...prev[toothKey],
          complaints: newComplaints,
        },
      };
    });

    setInputString("");
  };

  const removeComplaint = (complaint, index) => {
    const toothKey = String(activeTooth);
    setTeethRecords((prev) => {
      const newComplaints =
        prev[toothKey]?.complaints.filter((_, i) => i !== index) || [];
      setSelectedTeethData((prev) => ({
        ...prev,
        complaints: newComplaints,
      }));
      return {
        ...prev,
        [toothKey]: {
          ...prev[toothKey],
          complaints: newComplaints,
        },
      };
    });
    // If editing this item, exit edit mode
    if (editingIndex === index) {
      setEditingIndex(-1);
      setEditValue("");
    }
  };

  const startEdit = (complaint, index) => {
    setEditingIndex(index);
    setEditValue(complaint);
  };

  const saveEdit = () => {
    if (editingIndex === -1 || !editValue.trim()) return;

    const toothKey = String(activeTooth);
    setTeethRecords((prev) => {
      const newComplaints = [...(prev[toothKey]?.complaints || [])];
      newComplaints[editingIndex] = editValue.trim();
      setSelectedTeethData((prev) => ({
        ...prev,
        complaints: newComplaints,
      }));
      return {
        ...prev,
        [toothKey]: {
          ...prev[toothKey],
          complaints: newComplaints,
        },
      };
    });

    setEditingIndex(-1);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditingIndex(-1);
    setEditValue("");
  };

  const openTeethDialog = (toothNo) => {
    if (!toothNo) return;

    const toothKey = String(toothNo);
    setActiveTooth(toothNo);
    setSelectedTeethData({
      teethNo: toothNo,
      complaints: teethRecords[toothKey]?.complaints || [],
      details: teethRecords[toothKey]?.details || "",
    });
    setDialogOpen(true);
    setInputString("");
    setEditingIndex(-1);
    setEditValue("");
  };

  const handleMouseEnter = (e, cell) => {
    if (!cell) return;
    setPoint({ x: e.clientX, y: e.clientY });
    setHoveredTooth(cell);
    setHoverDialogOpen(true);
  };

  const handleMouseLeave = () => {
    setHoverDialogOpen(false);
    setHoveredTooth(null);
  };

  const closeDialog = () => {
    // Save details on close
    if (activeTooth) {
      const toothKey = String(activeTooth);
      setTeethRecords((prev) => ({
        ...prev,
        [toothKey]: {
          ...prev[toothKey],
          details: selectedTeethData.details,
        },
      }));
    }
    setDialogOpen(false);
    setInputString("");
    setEditingIndex(-1);
    setEditValue("");
  };

  const complaints = selectedTeethData.complaints;
  const hoveredComplaints = hoveredTooth
    ? teethRecords[String(hoveredTooth)]?.complaints || []
    : [];

  /* ================= SUBMIT / UPDATE ================= */
  const payload = {
    patientId: patient_id,
    clinicId,
    medicalChecks,
    medicalNotes,
    extraoral,
    intraoralNotes,
    teethStatus: Object.entries(teethRecords).map(([toothNo, data]) => ({
      teethName: toothNo,
      complaints: data.complaints || [],
      details: data.details || "",
    })),
    hardTissue,
    symptomData,
    treatment,
  };

  const submitAssessment = async () => {
    try {
      await AxiosInstance.post(`/dental-assessment/create`, payload);
      message.success("Assessment Submitted");
      fetchConditions();
      getAssessmentData();
    } catch (error) {
      console.error("Submission failed:", error.response?.data || error.message);
      message.error(error.response?.data?.message || "Failed to submit assessment");
    }
  };

  const updateAssessment = async () => {
    await AxiosInstance.patch(`/dental-assessment/update/${updateId}`, payload);
    message.success("Assessment Updated");
    fetchConditions();
    getAssessmentData();
  };

  const loadDataIntoState = (d) => {
    setMedicalChecks(d.medicalChecks || initialMedicalChecks);
    setMedicalNotes(d.medicalNotes || initialMedicalNotes);
    setExtraoral({ ...initialExtraoral, ...d.extraoral });
    setIntraoralNotes(d.intraoralNotes || initialIntraoralNotes);
    
    const loadedRecords = {};
    const teethStatusArray = Array.isArray(d?.teethStatus) ? d.teethStatus : [];
    teethStatusArray.forEach((item) => {
      const toothKey = String(item?.teethName);
      let complaints = item?.complaints || item?.complaint || [];
      if (typeof complaints === "string") {
        complaints = [complaints];
      } else if (!Array.isArray(complaints)) {
        complaints = [];
      }
      loadedRecords[toothKey] = {
        complaints,
        details: item.details || "",
      };
    });
    setTeethRecords(loadedRecords);
    
    setHardTissue(d.hardTissue || initialHardTissue);
    setSymptomData(d.symptomData || initialSymptomData);
    
    let diagnosisData = d.treatment?.diagnosis || [];
    if (Array.isArray(diagnosisData) && diagnosisData.every((diag) => typeof diag === "string")) {
      const today = new Date().toISOString().split("T")[0];
      diagnosisData = diagnosisData.map((text) => ({ text, date: today }));
    }
    
    let treatmentPlanData = d.treatment?.plan || [];
    if (Array.isArray(treatmentPlanData) && treatmentPlanData.every((plan) => typeof plan === "string")) {
      const today = new Date().toISOString().split("T")[0];
      treatmentPlanData = treatmentPlanData.map((text) => ({ text, date: today }));
    }
    
    setTreatment({
      ...d.treatment,
      diagnosis: diagnosisData,
      plan: treatmentPlanData,
    });
    setUpdateId(d._id);
  };

  const getAssessmentData = async () => {
    if (initialData) return; // Managed by parent if initialData is provided
    const res = await AxiosInstance.get(`/dental-assessment/get-by-patient/${patient_id}`);
    if (!res.data.data) return;
    loadDataIntoState(res.data.data);
  };

  useEffect(() => {
    if (initialData) {
      loadDataIntoState(initialData);
    }
  }, [initialData]);

  const initialMedicalChecks = medicalHistory.reduce(
    (a, i) => ({ ...a, [i]: false }),
    {}
  );
  const initialMedicalNotes = medicalHistory.reduce(
    (a, i) => ({ ...a, [i]: "" }),
    {}
  );
  const initialIntraoralNotes = intraoralStructures.reduce(
    (a, s) => ({ ...a, [s]: "" }),
    {}
  );
  const initialSymptomData = symptoms.reduce(
    (a, s) => ({
      ...a,
      [s.key]: { present: false, severity: 5, notes: "" },
    }),
    {}
  );
  useEffect(() => {
    getAssessmentData();
  }, [patient_id]);

  const [step, setStep] = useState(0);
  const steps = [
    "Extraoral Examination",
    "Intraoral Examination",
    "Hard Tissue Examination",
    "Symptoms & Diagnosis",
    "Treatment Plan"
  ];

  /* ================= UI ================= */
  return (
    <div className={isEmbedded ? "bg-white" : "p-6 bg-slate-50 min-h-screen"}>
      <fieldset disabled={isReadOnly} className={isReadOnly ? "opacity-90" : ""}>
        <div className={isEmbedded ? "p-4 md:p-6" : "max-w-7xl mx-auto shadow-sm bg-white rounded-xl p-6"}>
          {/* PATIENT INFO (Hidden if embedded) */}
          {!isEmbedded && (
          <>
            <h2 className="text-lg font-bold my-5 text-slate-800 border-b border-slate-100 pb-2">Patient Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {loading
                ? [...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))
                : Object.entries(patientInfo).map(([k, v]) => (
                  <Input key={k} label={k} value={v || ""} disabled placeholder={k} />
                ))}
            </div>
          </>
        )}

        {/* MEDICAL HISTORY (Hidden if embedded) */}
        {!isEmbedded && (
          <>
            <h2 className="text-lg font-bold my-5 text-slate-800 border-b border-slate-100 pb-2">Medical History</h2>
          </>
        )}
        
        {medicalHistory.map((m) => (
          <div key={m} className={!isEmbedded || medicalChecks[m] ? "mb-3" : "hidden"}>
            {!isEmbedded && (
              <label className="flex items-center p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer font-medium transition-all shadow-sm">
                <input
                  type="checkbox"
                  className="mr-3 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={medicalChecks[m]}
                  onChange={(e) =>
                    setMedicalChecks({ ...medicalChecks, [m]: e.target.checked })
                  }
                />
                {m}
              </label>
            )}
            {medicalChecks[m] && (
              <div className="mt-2 ml-7">
                <Input
                  className="w-full md:w-1/2"
                  placeholder="Notes"
                  value={medicalNotes[m]}
                  onChange={(e) =>
                    setMedicalNotes({ ...medicalNotes, [m]: e.target.value })
                  }
                />
              </div>
            )}
          </div>
        ))}

        <Collapse defaultActiveKey={["0"]} className="bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden mt-6 mb-6" expandIconPlacement="end" size="large">
        {/* EXTRAORAL */}
        <Collapse.Panel key="0" header={<span className="font-bold text-slate-800">Extraoral Examination</span>} className="bg-slate-50/50">
        <div className="py-2">
        <h2 className="text-lg font-bold my-5 text-slate-800 border-b border-slate-100 pb-2">Extraoral Examination</h2>
        <Collapse defaultActiveKey={[]} expandIconPlacement="end" className="bg-white shadow-sm border border-slate-100 rounded-xl overflow-hidden mb-6">
          <Collapse.Panel header="Facial Symmetry" key="facialSymmetry" className="bg-slate-50/30">
            <div className="flex gap-2">
              <select className="flex-1 rounded-xl border border-slate-200 p-3 text-sm focus:border-blue-500 focus:outline-none bg-white transition-all shadow-sm focus:ring-2 focus:ring-blue-50 font-medium text-slate-700"
                value={extraoral.facialSymmetry.status}
                onChange={(ev) => setExtraoral({ ...extraoral, facialSymmetry: { ...extraoral.facialSymmetry, status: ev.target.value }})}
              >
                <option>Normal</option>
                <option>Abnormal</option>
              </select>
              <Input
                containerClassName="flex-1" placeholder="Notes" value={extraoral.facialSymmetry.notes}
                onChange={(ev) => setExtraoral({ ...extraoral, facialSymmetry: { ...extraoral.facialSymmetry, notes: ev.target.value }})}
              />
            </div>
          </Collapse.Panel>
          <Collapse.Panel header="Lymph Nodes" key="lymphNodes" className="bg-slate-50/30">
            <div className="flex gap-2">
              <select className="flex-1 rounded-xl border border-slate-200 p-3 text-sm focus:border-blue-500 focus:outline-none bg-white transition-all shadow-sm focus:ring-2 focus:ring-blue-50 font-medium text-slate-700"
                value={extraoral.lymphNodes.status}
                onChange={(ev) => setExtraoral({ ...extraoral, lymphNodes: { ...extraoral.lymphNodes, status: ev.target.value }})}
              >
                <option>Normal</option>
                <option>Abnormal</option>
              </select>
              <Input
                containerClassName="flex-1" placeholder="Notes" value={extraoral.lymphNodes.notes}
                onChange={(ev) => setExtraoral({ ...extraoral, lymphNodes: { ...extraoral.lymphNodes, notes: ev.target.value }})}
              />
            </div>
          </Collapse.Panel>
          <Collapse.Panel header="Soft Tissue Swelling" key="softTissueSwelling" className="bg-slate-50/30">
            <div className="flex gap-2">
              <select className="flex-1 rounded-xl border border-slate-200 p-3 text-sm focus:border-blue-500 focus:outline-none bg-white transition-all shadow-sm focus:ring-2 focus:ring-blue-50 font-medium text-slate-700"
                value={extraoral.softTissueSwelling.status}
                onChange={(ev) => setExtraoral({ ...extraoral, softTissueSwelling: { ...extraoral.softTissueSwelling, status: ev.target.value }})}
              >
                <option>Normal</option>
                <option>Abnormal</option>
              </select>
              <Input
                containerClassName="flex-1" placeholder="Notes" value={extraoral.softTissueSwelling.notes}
                onChange={(ev) => setExtraoral({ ...extraoral, softTissueSwelling: { ...extraoral.softTissueSwelling, notes: ev.target.value }})}
              />
            </div>
          </Collapse.Panel>
          <Collapse.Panel header="TMJ Evaluation" key="tmj" className="bg-slate-50/30">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1.5 pl-1 uppercase tracking-wider">Right:</label>
                <label className="flex items-center p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer font-medium transition-all shadow-sm mb-2">
                  <input type="checkbox" className="mr-3 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={extraoral.tmj.right.crepitus} onChange={(e) => setExtraoral({ ...extraoral, tmj: { ...extraoral.tmj, right: { ...extraoral.tmj.right, crepitus: e.target.checked } }})} />
                  Crepitus
                </label>
                <label className="flex items-center p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer font-medium transition-all shadow-sm mb-2">
                  <input type="checkbox" className="mr-3 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={extraoral.tmj.right.clicking} onChange={(e) => setExtraoral({ ...extraoral, tmj: { ...extraoral.tmj, right: { ...extraoral.tmj.right, clicking: e.target.checked } }})} />
                  Clicking
                </label>
                <label className="flex items-center p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer font-medium transition-all shadow-sm mb-2">
                  <input type="checkbox" className="mr-3 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={extraoral.tmj.right.tenderness} onChange={(e) => setExtraoral({ ...extraoral, tmj: { ...extraoral.tmj, right: { ...extraoral.tmj.right, tenderness: e.target.checked } }})} />
                  Tenderness
                </label>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1.5 pl-1 uppercase tracking-wider">Left:</label>
                <label className="flex items-center p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer font-medium transition-all shadow-sm mb-2">
                  <input type="checkbox" className="mr-3 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={extraoral.tmj.left.crepitus} onChange={(e) => setExtraoral({ ...extraoral, tmj: { ...extraoral.tmj, left: { ...extraoral.tmj.left, crepitus: e.target.checked } }})} />
                  Crepitus
                </label>
                <label className="flex items-center p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer font-medium transition-all shadow-sm mb-2">
                  <input type="checkbox" className="mr-3 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={extraoral.tmj.left.clicking} onChange={(e) => setExtraoral({ ...extraoral, tmj: { ...extraoral.tmj, left: { ...extraoral.tmj.left, clicking: e.target.checked } }})} />
                  Clicking
                </label>
                <label className="flex items-center p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer font-medium transition-all shadow-sm mb-2">
                  <input type="checkbox" className="mr-3 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={extraoral.tmj.left.tenderness} onChange={(e) => setExtraoral({ ...extraoral, tmj: { ...extraoral.tmj, left: { ...extraoral.tmj.left, tenderness: e.target.checked } }})} />
                  Tenderness
                </label>
              </div>
            </div>
          </Collapse.Panel>
          <Collapse.Panel header="Muscles" key="muscles" className="bg-slate-50/30">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer font-medium transition-all shadow-sm mb-2">
                  <input type="checkbox" className="mr-3 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={extraoral.muscles.deviationOnOpening.checked} onChange={(e) => setExtraoral({ ...extraoral, muscles: { ...extraoral.muscles, deviationOnOpening: { ...extraoral.muscles.deviationOnOpening, checked: e.target.checked } }})} />
                  Deviation on Opening
                </label>
                {extraoral.muscles.deviationOnOpening.checked && (
                  <input className="block w-full border p-2 rounded mt-1" placeholder="Notes" value={extraoral.muscles.deviationOnOpening.notes} onChange={(e) => setExtraoral({ ...extraoral, muscles: { ...extraoral.muscles, deviationOnOpening: { ...extraoral.muscles.deviationOnOpening, notes: e.target.value } }})} />
                )}
              </div>
              <div>
                <label className="flex items-center p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer font-medium transition-all shadow-sm mb-2">
                  <input type="checkbox" className="mr-3 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={extraoral.muscles.deviationOnClosing.checked} onChange={(e) => setExtraoral({ ...extraoral, muscles: { ...extraoral.muscles, deviationOnClosing: { ...extraoral.muscles.deviationOnClosing, checked: e.target.checked } }})} />
                  Deviation on Closing
                </label>
                {extraoral.muscles.deviationOnClosing.checked && (
                  <input className="block w-full border p-2 rounded mt-1" placeholder="Notes" value={extraoral.muscles.deviationOnClosing.notes} onChange={(e) => setExtraoral({ ...extraoral, muscles: { ...extraoral.muscles, deviationOnClosing: { ...extraoral.muscles.deviationOnClosing, notes: e.target.value } }})} />
                )}
              </div>
            </div>
          </Collapse.Panel>
        </Collapse>

        {/* Overall Notes */}
        <Textarea 
          label="Notes:"
          containerClassName="mb-6"
          rows={3}
          value={extraoral.overallNotes}
          onChange={(e) =>
            setExtraoral({
              ...extraoral,
              overallNotes: e.target.value,
            })
          }
          placeholder="Overall notes for extraoral examination..."
        />

        {/* INTRAORAL */}
        </div>
        </Collapse.Panel>
        
        {/* INTRAORAL */}
        <Collapse.Panel key="1" header={<span className="font-bold text-slate-800">Intraoral Examination</span>} className="bg-slate-50/50">
        <div className="py-2">
        <div>
          <h3 className="text-sm font-black tracking-widest uppercase text-slate-500 mb-3">Soft Tissue Examination:</h3>
          <Collapse defaultActiveKey={[]} expandIconPlacement="end" className="bg-white shadow-sm border border-slate-100 rounded-xl overflow-hidden mb-6">
            {intraoralStructures.map((area) => (
              <Collapse.Panel header={<span className="font-medium text-slate-700">{area}</span>} key={area} className="bg-slate-50/30">
                <Textarea 
                  rows={3}
                  value={intraoralNotes[area] || ""}
                  onChange={(e) => setIntraoralNotes((prev) => ({ ...prev, [area]: e.target.value }))}
                  placeholder={`Description for ${area} (Color, Size, Shape, Texture)`}
                />
              </Collapse.Panel>
            ))}
          </Collapse>
        </div>

        {/* HARD TISSUE: Integrated Teeth Chart */}
        </div>
        </Collapse.Panel>

        {/* HARD TISSUE: Integrated Teeth Chart */}
        <Collapse.Panel key="2" header={<span className="font-bold text-slate-800">Hard Tissue Examination</span>} className="bg-slate-50/50">
        <div className="py-2">
        <div className="w-full text-center mb-4 overflow-x-auto pb-2">
          <div className="min-w-[600px] bg-slate-50  rounded-xl p-4 border border-slate-100 ">
            <table className="w-full mx-auto border-separate border-spacing-y-2">
              <tbody>
                {/* Upper Quadrants */}
                <tr>
                  <td colSpan={8} className="text-center pb-2 text-xs uppercase tracking-widest text-slate-400 font-bold border-r border-slate-200  pr-2">Upper Right (55-51, 18-11)</td>
                  <td colSpan={8} className="text-center pb-2 text-xs uppercase tracking-widest text-slate-400 font-bold pl-2">Upper Left (61-65, 21-28)</td>
                </tr>
                {[
                  ["", "", "", 55, 54, 53, 52, 51, 61, 62, 63, 64, 65, "", "", ""],
                  [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
                ].map((row, rowIndex) => (
                  <tr key={`upper-${rowIndex}`}>
                    {row.map((cell, colIndex) => {
                      if (!cell) return <td key={colIndex} className="p-1"></td>;
                      const isSelected = !!teethRecords[String(cell)]?.complaints?.length;
                      return (
                        <td key={colIndex} className="p-1 text-center align-middle">
                          <div
                            onClick={() => openTeethDialog(cell)}
                            onMouseEnter={(e) => handleMouseEnter(e, cell)}
                            onMouseLeave={handleMouseLeave}
                            className={`
                              w-10 h-10 mx-auto flex items-center justify-center rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer border
                              ${isSelected
                                ? "bg-red-500 border-red-600 text-white scale-110 shadow-red-500/30"
                                : "bg-white  border-slate-200  text-slate-600  hover:border-blue-500 hover:text-blue-600 :border-blue-400 :text-blue-400"}
                            `}
                          >
                            {cell}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* Spacer */}
                <tr><td colSpan={16} className="h-4"></td></tr>

                {/* Lower Quadrants */}
                {[
                  [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38],
                  ["", "", "", 85, 84, 83, 82, 81, 71, 72, 73, 74, 75, "", "", ""],
                ].map((row, rowIndex) => (
                  <tr key={`lower-${rowIndex}`}>
                    {row.map((cell, colIndex) => {
                      if (!cell) return <td key={colIndex} className="p-1"></td>;
                      const isSelected = !!teethRecords[String(cell)]?.complaints?.length;
                      return (
                        <td key={colIndex} className="p-1 text-center align-middle">
                          <div
                            onClick={() => openTeethDialog(cell)}
                            onMouseEnter={(e) => handleMouseEnter(e, cell)}
                            onMouseLeave={handleMouseLeave}
                            className={`
                              w-10 h-10 mx-auto flex items-center justify-center rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer border
                              ${isSelected
                                ? "bg-red-500 border-red-600 text-white scale-110 shadow-red-500/30"
                                : "bg-white  border-slate-200  text-slate-600  hover:border-blue-500 hover:text-blue-600 :border-blue-400 :text-blue-400"}
                            `}
                          >
                            {cell}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td colSpan={8} className="text-center pt-2 text-xs uppercase tracking-widest text-slate-400 font-bold border-r border-slate-200  pr-2">Lower Right (48-41, 85-81)</td>
                  <td colSpan={8} className="text-center pt-2 text-xs uppercase tracking-widest text-slate-400 font-bold pl-2">Lower Left (31-38, 71-75)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Hover Popup */}
          {hoverDialogOpen && hoveredComplaints.length > 0 && createPortal(
            <div
              className="fixed z-50 bg-white  border border-slate-200  rounded-md shadow-lg h-fit p-3 pointer-events-none"
              style={{
                top: `${Math.max(0, point.y - 140)}px`,
                left: `${point.x}px`,
              }}
            >
              <h4 className="font-bold text-sm mb-2 text-slate-800 ">
                Teeth {hoveredTooth}: Complaints
              </h4>
              <ul className="text-xs space-y-1 h-full overflow-y-auto text-slate-700 ">
                {hoveredComplaints.map((c, i) => (
                  <li
                    key={i}
                    className="bg-slate-100  list-disc px-2 py-1 rounded text-left break-words"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>,
            document.body
          )}

          {/* Dialog for Tooth Complaints & Details */}
          {dialogOpen && createPortal(
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[99999999] p-4">
              <div className="w-full max-w-lg bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                  <h1 className="text-lg font-bold text-slate-800">
                    Tooth #{selectedTeethData.teethNo}
                  </h1>
                  <button onClick={closeDialog} className="text-slate-400 hover:text-slate-600 transition-colors bg-white rounded-full p-1 hover:bg-slate-100">
                    <Icon icon="material-symbols:close-rounded" width={24} />
                  </button>
                </div>

                <div className="p-6 bg-white flex flex-col gap-5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1.5 pl-1 uppercase tracking-wider">Complaints</label>
                    <CreatableSelect
                      isClearable
                      isSearchable
                      placeholder="Add complaint..."
                      value={null}
                      inputValue={inputString}
                      options={options?.map((opt) => ({ label: opt, value: opt })) || []}
                      onChange={addComplaint}
                      onInputChange={setInputString}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          backgroundColor: "#ffffff",
                          borderColor: state.isFocused ? "#3b82f6" : "#e2e8f0",
                          boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.1)" : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                          borderRadius: "0.75rem",
                          padding: "0.125rem",
                          "&:hover": {
                            borderColor: state.isFocused ? "#3b82f6" : "#cbd5e1"
                          }
                        }),
                        menu: (base) => ({
                          ...base,
                          borderRadius: "0.75rem",
                          overflow: "hidden",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        })
                      }}
                    />
                    
                    {complaints.length > 0 ? (
                      <ul className="mt-3 space-y-2">
                        {complaints.map((c, i) => (
                          <li
                            key={i}
                            className="flex justify-between bg-slate-50 border border-slate-100 items-center px-3 py-2 rounded-xl transition-colors"
                          >
                            {editingIndex === i ? (
                              <div className="flex-1 flex items-center space-x-2">
                                <Input
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  containerClassName="flex-1"
                                  autoFocus
                                />
                                <button
                                  onClick={saveEdit}
                                  className="text-green-600 font-bold p-1 bg-green-50 rounded-lg hover:bg-green-100"
                                  title="Save"
                                >
                                  <Icon icon="material-symbols:check-small-rounded" width={22} />
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="text-red-600 font-bold p-1 bg-red-50 rounded-lg hover:bg-red-100"
                                  title="Cancel"
                                >
                                  <Icon icon="material-symbols:close-rounded" width={20} />
                                </button>
                              </div>
                            ) : (
                              <>
                                <span className="text-slate-700 text-sm font-medium">{c}</span>
                                <div className="flex items-center space-x-1">
                                  <button
                                    onClick={() => startEdit(c, i)}
                                    className="text-slate-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                                    title="Edit"
                                  >
                                    <Icon icon="material-symbols:edit-outline-rounded" width={18} />
                                  </button>
                                  <button
                                    onClick={() => removeComplaint(c, i)}
                                    className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                    title="Remove"
                                  >
                                    <Icon icon="material-symbols:delete-outline-rounded" width={18} />
                                  </button>
                                </div>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="mt-3 p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                        <p className="text-sm text-slate-500 font-medium">No complaints logged</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1.5 pl-1 uppercase tracking-wider">Additional Details</label>
                    <Textarea 
                      rows={3}
                      value={selectedTeethData.details}
                      onChange={(e) =>
                        setSelectedTeethData((prev) => ({
                          ...prev,
                          details: e.target.value,
                        }))
                      }
                      placeholder="Enter any additional notes here..."
                    />
                  </div>
                </div>
                
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                  <Button
                    onClick={closeDialog}
                    className="px-6 py-2 rounded-xl shadow-sm bg-blue-600 hover:bg-blue-700"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>,
            document.body
          )}
        </div>

        {/* HARD TISSUE: Periodontal Assessments */}
        <h3 className="text-sm font-black tracking-widest uppercase text-slate-500 mb-3">Periodontal Assessment</h3>
        <Collapse defaultActiveKey={[]} expandIconPlacement="end" className="bg-white shadow-sm border border-slate-100 rounded-xl overflow-hidden mb-6">
          {hardTissueAssessments.map((data, key) => (
            <Collapse.Panel header={<span className="font-medium text-slate-700">{data.title}</span>} key={key} className="bg-slate-50/30">
              <div>
                {data.type === "radio" ? (
                  <div className="flex flex-wrap gap-2">
                    {data.list.map((option, index) => (
                      <label key={index} className="flex items-center mr-4 mb-2 cursor-pointer text-slate-700 bg-white px-3 py-2 border border-slate-100 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                        <input
                          type="radio"
                          name={data.name}
                          checked={hardTissue[data.name] === option}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setHardTissue((prev) => ({
                                ...prev,
                                [data.name]: option,
                              }));
                            }
                          }}
                          className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                ) : (
                  <Textarea 
                    rows={3}
                    value={hardTissue[data.name] || ""}
                    onChange={(e) =>
                      setHardTissue((prev) => ({
                        ...prev,
                        [data.name]: e.target.value,
                      }))
                    }
                    placeholder={data.title}
                  />
                )}
              </div>
            </Collapse.Panel>
          ))}
        </Collapse>
        </div>
        </Collapse.Panel>

        {/* SYMPTOMS */}
        <Collapse.Panel key="3" header={<span className="font-bold text-slate-800">Symptoms & Diagnosis</span>} className="bg-slate-50/50">
        <div className="py-2">
        <Collapse defaultActiveKey={[]} expandIconPlacement="end" className="bg-white shadow-sm border border-slate-100 rounded-xl overflow-hidden mb-8">
          {symptoms.map((s) => (
            <Collapse.Panel 
              header={
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-medium text-slate-700">{s.label}</span>
                  {symptomData?.[s.key]?.present && <span className="text-blue-600 text-[10px] font-bold bg-blue-100 px-2 py-0.5 rounded uppercase tracking-wider">Present</span>}
                </div>
              } 
              key={s.key}
              className="bg-slate-50/30"
            >
              <div className="flex flex-col gap-4">
                <label className="flex items-center p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer font-medium transition-all shadow-sm w-max">
                  <input
                    type="checkbox"
                    className="mr-3 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={symptomData?.[s.key]?.present || false}
                    onChange={(e) => setSymptomData({ ...symptomData, [s.key]: { ...symptomData[s.key], present: e.target.checked } })}
                  />
                  Present
                </label>
                {symptomData?.[s.key]?.present && (
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-500 block mb-1">Severity (1-10): {symptomData[s.key].severity}</label>
                      <input 
                        type="range" min="1" max="10" 
                        value={symptomData[s.key].severity} 
                        onChange={(e) => setSymptomData({ ...symptomData, [s.key]: { ...symptomData[s.key], severity: parseInt(e.target.value) } })}
                        className="w-full max-w-xs accent-blue-600"
                      />
                    </div>
                    <Textarea 
                      placeholder="Additional notes about this symptom..."
                      value={symptomData[s.key].notes}
                      onChange={(e) => setSymptomData({ ...symptomData, [s.key]: { ...symptomData[s.key], notes: e.target.value } })}
                    />
                  </div>
                )}
              </div>
            </Collapse.Panel>
          ))}
        </Collapse>
        
        {/* DIAGNOSIS */}
        <h2 className="text-lg font-bold my-5 text-slate-800 border-b border-slate-100 pb-2">Diagnosis</h2>
        <div className="mb-6">
          <div className="flex gap-4 mb-3">
            <Input
              containerClassName="flex-1"
              placeholder="Diagnosis text..."
              value={diagnosisText}
              onChange={(e) => setDiagnosisText(e.target.value)}
            />
            <Input
              type="date"
              value={diagnosisDate}
              onChange={(e) => setDiagnosisDate(e.target.value)}
              className="w-48"
            />
            <Button onClick={addDiagnosis} className="bg-blue-600 hover:bg-blue-700 px-6 rounded-md">Add</Button>
          </div>
          
          {treatment.diagnosis.length > 0 ? (
            <ul className="space-y-2 mt-4">
              {treatment.diagnosis.map((d, i) => (
                <li key={i} className="flex justify-between items-center p-3 border border-slate-200  rounded-md bg-white ">
                  {editingDiagnosisIndex === i ? (
                    <div className="flex-1 flex gap-2 mr-4">
                      <Input
                        containerClassName="flex-1"
                        value={editDiagnosisText}
                        onChange={(e) => setEditDiagnosisText(e.target.value)}
                      />
                      <Input
                        type="date"
                        value={editDiagnosisDate}
                        onChange={(e) => setEditDiagnosisDate(e.target.value)}
                        className="w-40"
                      />
                      <Button onClick={saveEditDiagnosis} className="bg-green-600">Save</Button>
                      <Button onClick={cancelEditDiagnosis} variant="secondary" className="bg-slate-200 text-slate-800">Cancel</Button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <span className="font-medium text-slate-800 ">{d.text}</span>
                        <span className="text-slate-500 ml-4 text-sm">{d.date}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEditDiagnosis(d, i)} className="text-blue-600 p-1 hover:bg-blue-50 rounded"><Icon icon="material-symbols:edit" width={20}/></button>
                        <button onClick={() => removeDiagnosis(i)} className="text-red-600 p-1 hover:bg-red-50 rounded"><Icon icon="material-symbols:delete" width={20}/></button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 italic mt-2">No diagnoses added yet.</p>
          )}
        </div>
        </div>
        </Collapse.Panel>

        {/* TREATMENT PLAN */}
        <Collapse.Panel key="4" header={<span className="font-bold text-slate-800">Treatment Plan</span>} className="bg-slate-50/50">
        <div className="py-2">
        <div className="mb-6">
          <div className="flex gap-4 mb-3">
            <Input
              containerClassName="flex-1"
              placeholder="Treatment plan text..."
              value={treatmentPlanText}
              onChange={(e) => setTreatmentPlanText(e.target.value)}
            />
            <Input
              type="date"
              value={treatmentPlanDate}
              onChange={(e) => setTreatmentPlanDate(e.target.value)}
              className="w-48"
            />
            <Button onClick={addTreatmentPlan} className="bg-blue-600 hover:bg-blue-700 px-6 rounded-md">Add</Button>
          </div>
          
          {treatment.plan && treatment.plan.length > 0 ? (
            <ul className="space-y-2 mt-4">
              {treatment.plan.map((p, i) => (
                <li key={i} className="flex justify-between items-center p-3 border border-slate-200  rounded-md bg-white ">
                  {editingTreatmentPlanIndex === i ? (
                    <div className="flex-1 flex gap-2 mr-4">
                      <Input
                        containerClassName="flex-1"
                        value={editTreatmentPlanText}
                        onChange={(e) => setEditTreatmentPlanText(e.target.value)}
                      />
                      <Input
                        type="date"
                        value={editTreatmentPlanDate}
                        onChange={(e) => setEditTreatmentPlanDate(e.target.value)}
                        className="w-40"
                      />
                      <Button onClick={saveEditTreatmentPlan} className="bg-green-600">Save</Button>
                      <Button onClick={cancelEditTreatmentPlan} variant="secondary" className="bg-slate-200 text-slate-800">Cancel</Button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <span className="font-medium text-slate-800 ">{p.text}</span>
                        <span className="text-slate-500 ml-4 text-sm">{p.date}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEditTreatmentPlan(p, i)} className="text-blue-600 p-1 hover:bg-blue-50 rounded"><Icon icon="material-symbols:edit" width={20}/></button>
                        <button onClick={() => removeTreatmentPlan(i)} className="text-red-600 p-1 hover:bg-red-50 rounded"><Icon icon="material-symbols:delete" width={20}/></button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 italic mt-2 mb-6">No treatment plans added yet.</p>
          )}

          <div className="space-y-4 mt-6">
            <Input
              placeholder="Estimated Cost"
              value={treatment.cost || ""}
              onChange={(e) => setTreatment({ ...treatment, cost: e.target.value })}
              className="w-full max-w-md"
            />
            <Input
              placeholder="Follow-up Date/Notes"
              value={treatment.followUp || ""}
              onChange={(e) => setTreatment({ ...treatment, followUp: e.target.value })}
              className="w-full"
            />
            <label className="flex items-center p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer font-medium transition-all shadow-sm mt-4">
              <input
                type="checkbox"
                className="mr-3 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={treatment.consent || false}
                onChange={(e) => setTreatment({ ...treatment, consent: e.target.checked })}
              />
              Consent Given
            </label>
          </div>
        </div>
        </div>
        </Collapse.Panel>
        </Collapse>
        
        {/* Action Buttons */}
        {!isReadOnly && (
          <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-slate-100">
            {onCancelSession && (
              <Button type="button" onClick={onCancelSession} variant="secondary" className="bg-slate-200 text-slate-800 px-8 hover:bg-slate-300">
                Cancel
              </Button>
            )}
            {updateId ? (
              <Button type="button" onClick={updateAssessment} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Update Assessment
              </Button>
            ) : (
              <Button type="button" onClick={submitAssessment} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Submit Assessment
              </Button>
            )}
          </div>
        )}
      </div>
      </fieldset>
    </div>
  );
}

