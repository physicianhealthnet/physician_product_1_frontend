import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { message, Collapse } from "antd";
import { AxiosInstance, AxiosInstanceSecondryServer } from "../../../utilities/AxiosInstance";
import Button from "../../../component/ui/Button";
import SpecialistAssessmentForm from "../../../pages/general/assessment/SpecialistAssessmentForm";

const SpecialistAssessmentPage = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
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

  const handleSelectPatient = async (key) => {
    const patientIdStr = key ? String(key) : null;
    setSelectedPatientId(patientIdStr);
    // Reset the assessment form when selecting a patient
    setSpecialistAssessment({});

    if (patientIdStr) {
      try {
        const res = await AxiosInstance.get(`/specialist-assessment/patient/${patientIdStr}`);
        if (res.data?.data && res.data.data.length > 0) {
          const combined = {};
          res.data.data.forEach(assessment => {
            if (assessment.assessmentData) {
              Object.assign(combined, assessment.assessmentData);
            }
          });
          setSpecialistAssessment(combined);
        }
      } catch (err) {
        console.error("Failed to fetch existing specialist assessments", err);
      }
    }
  };

  const handleSubmit = async (patient) => {
    if (!patient) return;
    
    try {
      setIsSubmitting(true);

      // Fetch the existing assessment for this patient
      let existingAssessment = null;
      try {
        const getRes = await AxiosInstance.get(`/assessment/get/${patient._id}`);
        if (getRes.data?.data) {
          existingAssessment = getRes.data.data;
        }
      } catch (err) {
        console.log("No existing assessment found, will create one.");
      }

      if (existingAssessment && existingAssessment._id) {
        // Update existing assessment
        const updatedMedicalNotes = {
          ...existingAssessment.medicalNotes,
          specialistAssessment,
        };

        const payload = {
          medicalNotes: updatedMedicalNotes,
        };

        await AxiosInstance.patch(`/assessment/update/${existingAssessment._id}`, payload);
        message.success("Specialist Assessment Updated Successfully!");
      } else {
        // Create new if none exists
        const payload = {
          patientId: patient._id,
          clinicId,
          phnId: patient.PHN_ID,
          medicalNotes: {
            specialistAssessment,
          },
        };

        await AxiosInstance.post(`/assessment/create`, payload);
        message.success("Specialist Assessment Submitted Successfully!");
      }
      
      // Close the collapse and reset
      setSelectedPatientId(null);
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
            <div className="max-h-[75vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
              <Collapse 
                accordion 
                activeKey={selectedPatientId} 
                onChange={handleSelectPatient}
                className="bg-transparent border-none space-y-3"
                expandIconPlacement="end"
              >
                {patients.map((p) => (
                  <Collapse.Panel 
                    key={p._id}
                    className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
                    header={
                      <div className="flex items-center gap-4 py-1">
                        <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center font-bold">
                          {p.patientName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 m-0">{p.patientName}</h3>
                          <div className="text-xs text-slate-500 font-medium flex gap-3 mt-1">
                            <span>Ph: {p.patientPhone}</span>
                            <span>PHN: {p.PHN_ID || p.patientId || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    }
                  >
                    {selectedPatientId === p._id && (
                      <div className="p-4 border-t border-slate-100 bg-slate-50/30">
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                          <SpecialistAssessmentForm 
                            specialistAssessment={specialistAssessment}
                            setSpecialistAssessment={setSpecialistAssessment}
                            isReadOnlyView={false}
                            patientId={p._id}
                          />

                          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-4">
                            <Button 
                              variant="secondary"
                              onClick={() => handleSelectPatient(null)}
                              className="px-8"
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={() => handleSubmit(p)}
                              loading={isSubmitting}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-10 shadow-md shadow-blue-500/20"
                            >
                              Submit Assessment
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Collapse.Panel>
                ))}
              </Collapse>
            </div>
          ) : (
            <div className="text-center p-8 text-slate-500">
              No patients found in the system.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SpecialistAssessmentPage;
