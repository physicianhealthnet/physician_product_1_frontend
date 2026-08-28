import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { message, Collapse } from "antd";
import { AxiosInstanceSecondryServer } from "../../../utilities/AxiosInstance";
import Summary from "./Summary";

const PatientSummaryWrapper = ({ visibleSections, pageTitle, pageIcon, pageDescription }) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [searching, setSearching] = useState(false);

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

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Icon icon={pageIcon || "solar:document-text-bold-duotone"} className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">{pageTitle || "Patient Summary"}</h1>
            <p className="text-sm text-slate-500 font-medium">{pageDescription || "Select a patient to view their summary"}</p>
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
            <div className="max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
              <Collapse 
                accordion 
                activeKey={selectedPatientId} 
                onChange={(key) => setSelectedPatientId(key ? String(key) : null)}
                className="bg-transparent border-none space-y-3"
                expandIconPlacement="end"
              >
                {patients.map((p) => (
                  <Collapse.Panel 
                    key={p._id}
                    className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
                    header={
                      <div className="flex items-center gap-4 py-1">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
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
                    {/* Only render Summary if this panel is open to save memory/API calls */}
                    {selectedPatientId === p._id && (
                      <div className="p-4 border-t border-slate-100">
                        <Summary 
                          patientId={p._id} 
                          visibleSections={visibleSections} 
                          pageTitle={pageTitle}
                          pageIcon={pageIcon}
                        />
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

export default PatientSummaryWrapper;
