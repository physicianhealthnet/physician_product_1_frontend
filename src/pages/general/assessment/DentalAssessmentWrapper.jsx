import React, { useState, useEffect } from "react";
import { Collapse } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import dayjs from "dayjs";
import { AxiosInstance } from "../../../utilities/AxiosInstance";
import DentalAssessmentSummary from "./DentalAssessmentSummary";
import DentalAssessment from "./DentalAssessment";

export default function DentalAssessmentWrapper({ patientId, isReadOnlyView }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSessions, setNewSessions] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await AxiosInstance.get(`/dental-assessment/get-by-patient/${patientId}`);
        if (res.data?.history && res.data.history.length > 0) {
          setHistory(res.data.history);
          setNewSessions([]);
        } else {
          setHistory([]);
          if (!isReadOnlyView) setNewSessions([{ id: Date.now(), createdDate: dayjs().format("DD MMM YYYY hh:mm A") }]);
        }
      } catch (error) {
        console.error("Failed to fetch dental history", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (patientId) {
      fetchHistory();
    }
  }, [patientId, isReadOnlyView]);

  if (loading) {
    if (isReadOnlyView) return null;
    return <div className="p-4 text-center text-slate-500">Loading dental history...</div>;
  }

  // If we are in read only view and there is no history, show nothing
  if (isReadOnlyView && history.length === 0) {
    return null;
  }

  const content = (
    <div className="space-y-4">
      {/* Historical Read-Only Sessions */}
      {history.length > 0 && (
        <Collapse
          className={
            isReadOnlyView
              ? "bg-transparent border-none p-0 -ml-4"
              : "bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden"
          }
          ghost={isReadOnlyView}
          expandIconPlacement="start"
          items={history.map((assessmentData, idx) => ({
            key: String(idx),
            label: (
              <div className="flex items-center justify-between w-full pr-4">
                <span className={isReadOnlyView ? "font-bold text-blue-600" : "flex items-center gap-2 text-blue-800 font-bold"}>
                  {!isReadOnlyView && <Icon icon="solar:clipboard-check-bold-duotone" className="text-lg text-blue-500" />}
                  Session {history.length - idx}
                </span>
                <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm" onClick={(e) => e.stopPropagation()}>
                  {dayjs(assessmentData.createdAt).format("DD MMM YYYY hh:mm A")}
                </span>
              </div>
            ),
            children: (
              <div className={isReadOnlyView ? "space-y-2 ml-4" : "p-4 bg-slate-50/50 border-t border-slate-100"}>
                {isReadOnlyView ? (
                  <DentalAssessmentSummary data={assessmentData} />
                ) : (
                  <DentalAssessment 
                    isEmbedded={true} 
                    explicitPatientId={patientId} 
                    initialData={assessmentData} 
                    isReadOnly={isReadOnlyView} 
                  />
                )}
              </div>
            )
          }))}
        />
      )}

      {/* New Editable Sessions */}
      {!isReadOnlyView && newSessions.length > 0 && (
        <Collapse
          defaultActiveKey={newSessions.map(s => String(s.id))}
          className="bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden mt-4"
          expandIconPlacement="start"
          items={newSessions.map((session, idx) => ({
            key: String(session.id),
            label: (
              <div className="flex items-center justify-between w-full pr-4">
                <span className="flex items-center gap-2 text-blue-800 font-bold">
                  <Icon icon="solar:clipboard-check-bold-duotone" className="text-lg text-blue-500" />
                  Session {history.length + idx + 1}
                </span>
                <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
                    {session.createdDate}
                  </span>
                  {(history.length > 0 || newSessions.length > 1) && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const updated = [...newSessions];
                        updated.splice(idx, 1);
                        setNewSessions(updated);
                      }}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                      title="Delete Session"
                    >
                      <Icon icon="solar:trash-bin-trash-bold-duotone" className="text-lg" />
                    </button>
                  )}
                </div>
              </div>
            ),
            children: (
              <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                <DentalAssessment 
                  isEmbedded={true} 
                  explicitPatientId={patientId} 
                />
              </div>
            )
          }))}
        />
      )}

      {!isReadOnlyView && (
        <button
          type="button"
          onClick={() => {
            setNewSessions([...newSessions, { id: Date.now(), createdDate: dayjs().format("DD MMM YYYY hh:mm A") }]);
          }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-blue-200 text-blue-600 font-bold hover:bg-blue-50 hover:border-blue-300 transition-all mt-4"
        >
          <Icon icon="solar:add-circle-bold-duotone" className="text-xl" />
          Add Session
        </button>
      )}
    </div>
  );

  if (isReadOnlyView) {
    return (
      <div className="text-sm mt-4">
        <Collapse 
          items={[{
            key: "dental-assessment-dept",
            label: <span className="text-base font-bold text-slate-900">Dental Assessment</span>,
            children: <div className="pt-2">{content}</div>
          }]}
          ghost
          defaultActiveKey={["dental-assessment-dept"]}
          className="bg-transparent border-none p-0"
        />
      </div>
    );
  }

  return content;
}
