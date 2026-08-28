import React from 'react';
import { Icon } from '@iconify/react';
import { Collapse } from 'antd';
import dayjs from 'dayjs';
import { departmentSectionsMap, generalPhysicianSections, departmentList } from './specialistAssessmentData';
import DentalAssessmentWrapper from './DentalAssessmentWrapper';

const SpecialistAssessmentForm = ({
  specialistAssessment,
  setSpecialistAssessment,
  isReadOnlyView,
  patientId,
}) => {

  const renderSessionFields = (deptName, sessionData, sessionIndex, sessionKey) => {
    // CUSTOM OVERRIDE FOR DENTIST
    if (deptName === "Dentist") {
      return (
        <DentalAssessmentWrapper patientId={patientId} isReadOnlyView={isReadOnlyView} />
      );
    }

    const rawSections = departmentSectionsMap[deptName] || generalPhysicianSections;
    const sections = rawSections.filter(
      (sec) =>
        !sec.title.toLowerCase().includes("patient info") &&
        !sec.title.toLowerCase().includes("patient details")
    );

    const collapseItems = sections.map((sec, idx) => {
      let filledCheckboxes = [];
      let filledFields = [];
      
      if (sec.type === "checkbox") {
        filledCheckboxes = sec.fields.filter(([label, name]) => !!sessionData[name]);
      } else {
        filledFields = sec.fields.filter(field => !!sessionData[field.name]);
      }

      if (isReadOnlyView && sec.type === "checkbox" && filledCheckboxes.length === 0) return null;
      if (isReadOnlyView && sec.type !== "checkbox" && filledFields.length === 0) return null;

      return {
        key: String(idx),
        label: <span className="font-bold text-slate-800">{sec.title.replace(/^\d+\.\s*/, "")}</span>,
        className: "bg-slate-50/50",
        children: (
          <div className="transition-all duration-300 py-2">
            {isReadOnlyView ? (
              sec.type === "checkbox" ? (
                <div className="flex flex-wrap gap-2 px-2">
                  {filledCheckboxes.map(([label]) => (
                    <span key={label} className="px-3 py-1.5 bg-blue-50 text-blue-800 font-semibold text-xs rounded-full border border-blue-100 flex items-center gap-1 shadow-sm">
                      <Icon icon="lucide:check-circle-2" className="w-3.5 h-3.5" />
                      {label}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                  {filledFields.map((field) => (
                    <div key={field.name} className={field.type === "textarea" ? "md:col-span-2 lg:col-span-3" : ""}>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1.5 uppercase tracking-wider">{field.label}</label>
                      <div className="text-sm font-medium text-slate-800 whitespace-pre-wrap bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                        {sessionData[field.name]}
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : sec.type === "checkbox" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sec.fields.map(([label, name]) => (
                  <label
                    key={name}
                    className={`flex items-center p-3 rounded-xl border transition-all ${
                      sessionData[name]
                        ? "bg-blue-50/50 border-blue-200 shadow-sm text-blue-800"
                        : "bg-transparent border-slate-100 hover:bg-slate-50 text-slate-700"
                    } ${isReadOnlyView ? "cursor-default" : "cursor-pointer font-medium"}`}
                  >
                    <input
                      type="checkbox"
                      className="mr-3 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      checked={!!sessionData[name]}
                      disabled={isReadOnlyView}
                      onChange={(e) => {
                        if (sessionIndex !== undefined) {
                          const newSessions = [...(specialistAssessment[sessionKey] || [])];
                          newSessions[sessionIndex] = { ...newSessions[sessionIndex], [name]: e.target.checked };
                          setSpecialistAssessment({
                            ...specialistAssessment,
                            [sessionKey]: newSessions
                          });
                        } else {
                          setSpecialistAssessment({
                            ...specialistAssessment,
                            [name]: e.target.checked,
                          });
                        }
                      }}
                    />
                    <span className="text-sm font-semibold">{label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 mb-2 mt-2">
                {sec.fields.map((field) => (
                  <div key={field.name} className={field.type === "textarea" ? "md:col-span-2 lg:col-span-3" : ""}>
                    <label className="text-xs font-bold text-slate-600 block mb-1.5">{field.label}</label>
                    {field.type === "textarea" ? (
                        <textarea
                          className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-blue-500 focus:outline-none bg-white transition-all shadow-sm focus:ring-2 focus:ring-blue-50"
                          value={sessionData[field.name] || ""}
                          disabled={isReadOnlyView}
                          readOnly={isReadOnlyView}
                          onChange={(e) => {
                            if (sessionIndex !== undefined) {
                              const newSessions = [...(specialistAssessment[sessionKey] || [])];
                              newSessions[sessionIndex] = { ...newSessions[sessionIndex], [field.name]: e.target.value };
                              setSpecialistAssessment({
                                ...specialistAssessment,
                                [sessionKey]: newSessions
                              });
                            } else {
                              setSpecialistAssessment({
                                ...specialistAssessment,
                                [field.name]: e.target.value,
                              });
                            }
                          }}
                          placeholder={field.placeholder || `Enter ${field.label}...`}
                          rows={field.rows || 3}
                        />
                      ) : field.type === "select" ? (
                        <select
                          className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none bg-white transition-all shadow-sm focus:ring-2 focus:ring-blue-50 font-medium"
                          value={sessionData[field.name] || ""}
                          disabled={isReadOnlyView}
                          onChange={(e) => {
                            if (sessionIndex !== undefined) {
                              const newSessions = [...(specialistAssessment[sessionKey] || [])];
                              newSessions[sessionIndex] = { ...newSessions[sessionIndex], [field.name]: e.target.value };
                              setSpecialistAssessment({
                                ...specialistAssessment,
                                [sessionKey]: newSessions
                              });
                            } else {
                              setSpecialistAssessment({
                                ...specialistAssessment,
                                [field.name]: e.target.value,
                              });
                            }
                          }}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options &&
                            field.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                        </select>
                      ) : (
                        <input
                          type={field.inputType || "text"}
                          className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none bg-white transition-all shadow-sm focus:ring-2 focus:ring-blue-50"
                          value={sessionData[field.name] || ""}
                          disabled={isReadOnlyView}
                          readOnly={isReadOnlyView}
                          onChange={(e) => {
                            if (sessionIndex !== undefined) {
                              const newSessions = [...(specialistAssessment[sessionKey] || [])];
                              newSessions[sessionIndex] = { ...newSessions[sessionIndex], [field.name]: e.target.value };
                              setSpecialistAssessment({
                                ...specialistAssessment,
                                [sessionKey]: newSessions
                              });
                            } else {
                              setSpecialistAssessment({
                                ...specialistAssessment,
                                [field.name]: e.target.value,
                              });
                            }
                          }}
                          placeholder={field.placeholder || `Enter ${field.label}...`}
                          step={field.step}
                        />
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      };
    }).filter(Boolean);

    // If it's read only and there are no filled sections for this session, return null
    if (isReadOnlyView && collapseItems.length === 0) {
      return null;
    }

    return (
      <Collapse
        items={collapseItems}
        defaultActiveKey={[]}
        className="bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden"
        expandIconPlacement="end"
        size="large"
      />
    );
  };

  const renderDepartmentSections = (deptName) => {
    if (deptName === "Dentist") {
      return renderSessionFields(deptName, specialistAssessment);
    }

    const sessionKey = `${deptName}Sessions`;
    const sessions = specialistAssessment[sessionKey] || [];
    
    if (isReadOnlyView && sessions.length === 0) return null;
    
    // Initialize with today's date if empty
    const defaultSession = { createdDate: dayjs().format("DD MMM YYYY hh:mm A") };
    const displaySessions = (sessions.length === 0 && !isReadOnlyView) ? [defaultSession] : sessions;

    return (
      <div className="space-y-4">
        <Collapse
          defaultActiveKey={displaySessions.map((_, i) => String(i))}
          className="bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden"
          items={displaySessions.map((sessionData, idx) => ({
            key: String(idx),
            label: (
              <div className="flex items-center justify-between w-full pr-4">
                <span className="flex items-center gap-2 text-blue-800 font-bold">
                  <Icon icon="solar:clipboard-check-bold-duotone" className="text-lg text-blue-500" />
                  Session {idx + 1}
                </span>
                <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
                    {sessionData.createdDate || dayjs().format("DD MMM YYYY hh:mm A")}
                  </span>
                  {!isReadOnlyView && displaySessions.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newSessions = [...displaySessions];
                        newSessions.splice(idx, 1);
                        setSpecialistAssessment({
                          ...specialistAssessment,
                          [sessionKey]: newSessions
                        });
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
              <div className="p-4 bg-slate-50/50">
                {renderSessionFields(deptName, sessionData, idx, sessionKey)}
              </div>
            )
          }))}
        />
        
        {!isReadOnlyView && (
          <button
            type="button"
            onClick={() => {
              setSpecialistAssessment({
                ...specialistAssessment,
                [sessionKey]: [...displaySessions, { createdDate: dayjs().format("DD MMM YYYY hh:mm A") }]
              });
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-blue-200 text-blue-600 font-bold hover:bg-blue-50 hover:border-blue-300 transition-all mt-4"
          >
            <Icon icon="solar:add-circle-bold-duotone" className="text-xl" />
            Add Session
          </button>
        )}
      </div>
    );
  };

  // Generate the high-level department panels
  const departmentPanels = departmentList.map((dep) => {
    const content = renderDepartmentSections(dep);
    
    // In read only view, if the department has no data, content will be null, so we skip the panel
    if (isReadOnlyView && !content) return null;

    return {
      key: dep,
      label: (
        <span className="font-black text-slate-800 text-lg flex items-center gap-3">
          <Icon icon="solar:stethoscope-bold-duotone" className="text-blue-500 text-xl" />
          {dep}
        </span>
      ),
      className: "bg-white",
      children: (
        <div className="p-2">
           {content || (
             <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-slate-100">
               No assessment details recorded.
             </div>
           )}
        </div>
      )
    };
  }).filter(Boolean);

  return (
    <div className="p-4 bg-white rounded-b-xl space-y-6">
      {isReadOnlyView && (
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Icon icon="solar:document-text-bold-duotone" className="text-blue-500 text-2xl" />
            Specialist Assessment Report
          </h3>
        </div>
      )}

      {departmentPanels.length > 0 ? (
        <Collapse
          items={departmentPanels}
          defaultActiveKey={[]}
          className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden"
          expandIconPlacement="end"
          size="large"
        />
      ) : (
        isReadOnlyView && (
          <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border border-slate-100">
            <Icon icon="solar:document-text-broken" className="text-4xl mx-auto mb-3 text-slate-300" />
            <p className="font-medium">No specialist assessment records found.</p>
          </div>
        )
      )}
    </div>
  );
};

export default SpecialistAssessmentForm;
