import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { message } from "antd";
import { AxiosInstance, AxiosInstanceSecondryServer } from "../../../utilities/AxiosInstance";
import Button from "../../../component/ui/Button";
import Input from "../../../component/ui/Input";
import SpecialistAssessmentForm from "../../../pages/general/assessment/SpecialistAssessmentForm";

const SpecialistAssessmentPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searching, setSearching] = useState(false);
  
  // Specialist assessment state
  const [specialistAssessment, setSpecialistAssessment] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userInfo = JSON.parse(
    sessionStorage.getItem("user") || sessionStorage.getItem("master") || "{}"
  );
  const clinicId = userInfo?.cid || userInfo?.clinicId;

  const loadPatients = async () => {
    setSearching(true);
    try {
      const res = await AxiosInstanceSecondryServer.post("/patientregistration/list", {
        clinicId,
        search: "",
      });
      setPatients(res.data.patients || []);
    } catch (error) {
      console.error("Load patients failed:", error);
      message.error("Failed to load patients");
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, [clinicId]);

  const handleSelectPatient = async (patient) => {
    setSelectedPatient(patient);
    setSearchQuery("");
    
    // Attempt to load existing specialist assessment if needed
    // Assuming we start fresh for this UI or load from a specific endpoint
    setSpecialistAssessment({ selectedDept: "General Physician" });
  };

  const handleSubmit = async () => {
    if (!selectedPatient) return;
    
    try {
      setIsSubmitting(true);
      // Construct payload similar to PhysicianAssessmentSheet but simplified for this standalone page
      const payload = {
        patientId: selectedPatient._id,
        clinicId,
        phnId: selectedPatient.PHN_ID,
        medicalNotes: {
          specialistAssessment,
        },
      };

      await AxiosInstance.post(`/assessment/create`, payload);
      message.success("Specialist Assessment Submitted Successfully!");
      
      // Reset after submit
      setSelectedPatient(null);
      setSpecialistAssessment({});
    } catch (err) {
      console.error("Error submitting assessment:", err);
      message.error("Failed to submit assessment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Icon icon="solar:stethoscope-bold-duotone" className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Specialist Assessment</h1>
            <p className="text-sm text-slate-500 font-medium">Record specialty-specific clinical assessments</p>
          </div>
        </div>

        {/* Patient Selection Card */}
        {!selectedPatient ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Icon icon="solar:user-rounded-bold" className="text-blue-500" />
              Select Patient
            </h2>
            
            {searching ? (
              <div className="flex justify-center p-8 text-blue-500">
                <Icon icon="solar:spinner-bold-duotone" className="text-3xl animate-spin" />
              </div>
            ) : patients.length > 0 ? (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                {patients.map((p) => (
                  <div 
                    key={p._id}
                    onClick={() => handleSelectPatient(p)}
                    className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center font-bold group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        {p.patientName?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{p.patientName}</h3>
                        <div className="text-xs text-slate-500 font-medium flex gap-3 mt-1">
                          <span>Ph: {p.patientPhone}</span>
                          <span>PHN: {p.PHN_ID || p.patientId || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                    <Icon icon="solar:alt-arrow-right-line-duotone" className="text-xl text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 text-slate-500">
                No patients found in the system.
              </div>
            )}
          </div>
        ) : (
          /* Active Assessment View */
          <div className="space-y-6">
            {/* Selected Patient Banner */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                  <Icon icon="solar:check-circle-bold-duotone" className="text-2xl" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Selected Patient</div>
                  <h3 className="font-black text-slate-800 text-lg">{selectedPatient.patientName}</h3>
                  <div className="text-sm font-medium text-slate-500 flex gap-4">
                    <span>{selectedPatient.patientGender} • {selectedPatient.patientAge || 'N/A'} yrs</span>
                    <span>Ph: {selectedPatient.patientPhone}</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="secondary"
                onClick={() => {
                  setSelectedPatient(null);
                  setSpecialistAssessment({});
                }}
                className="text-slate-500 bg-slate-50 hover:bg-slate-100 border-slate-200"
              >
                Change Patient
              </Button>
            </div>

            {/* Assessment Form */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <SpecialistAssessmentForm 
                specialistAssessment={specialistAssessment}
                setSpecialistAssessment={setSpecialistAssessment}
                isReadOnlyView={false}
              />

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-4">
                <Button 
                  variant="secondary"
                  onClick={() => {
                    setSelectedPatient(null);
                    setSpecialistAssessment({});
                  }}
                  className="px-8"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 shadow-md shadow-blue-500/20"
                >
                  Submit Assessment
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SpecialistAssessmentPage;
