import React from 'react';
import { Icon } from '@iconify/react';
import { Collapse } from 'antd';
import DentalAssessment from './DentalAssessment';
import { departmentSectionsMap, generalPhysicianSections, departmentList } from './specialistAssessmentData';

const SpecialistAssessmentForm = ({
  specialistAssessment,
  setSpecialistAssessment,
  isReadOnlyView,
}) => {
  const activeDept = specialistAssessment.selectedDept || "General Physician";

  // CUSTOM OVERRIDE FOR DENTIST
  if (activeDept === "Dentist") {
    return (
      <div className="p-4 bg-white rounded-b-xl space-y-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex-1">
            <label className="text-[10px] font-black tracking-widest uppercase text-slate-400 pl-1 mb-2 block">
              Active Assessment Specialty (Department)
            </label>
            <select
              className="w-full md:w-80 rounded-xl border border-slate-200 p-3 text-sm font-medium focus:border-blue-500 focus:outline-none bg-white shadow-sm transition-all"
              value={activeDept}
              disabled={isReadOnlyView}
              onChange={(e) => {
                setSpecialistAssessment({
                  ...specialistAssessment,
                  selectedDept: e.target.value,
                });
              }}
            >
              {departmentList.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-100 max-w-sm">
            Toggle departments to view/fill assessment protocols. Stored data persists across all selected specialties.
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <DentalAssessment isEmbedded={true} />
        </div>
      </div>
    );
  }

  const rawSections = departmentSectionsMap[activeDept] || generalPhysicianSections;
  const sections = rawSections.filter(
    (sec) =>
      !sec.title.toLowerCase().includes("patient info") &&
      !sec.title.toLowerCase().includes("patient details")
  );

  const collapseItems = sections.map((sec, idx) => {
    let filledCheckboxes = [];
    let filledFields = [];
    
    if (sec.type === "checkbox") {
      filledCheckboxes = sec.fields.filter(([label, name]) => !!specialistAssessment[name]);
    } else {
      filledFields = sec.fields.filter(field => !!specialistAssessment[field.name]);
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
                      {specialistAssessment[field.name]}
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
                    specialistAssessment[name]
                      ? "bg-blue-50/50 border-blue-200 shadow-sm text-blue-800"
                      : "bg-transparent border-slate-100 hover:bg-slate-50 text-slate-700"
                  } ${isReadOnlyView ? "cursor-default" : "cursor-pointer font-medium"}`}
                >
                  <input
                    type="checkbox"
                    className="mr-3 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={!!specialistAssessment[name]}
                    disabled={isReadOnlyView}
                    onChange={(e) =>
                      setSpecialistAssessment({
                        ...specialistAssessment,
                        [name]: e.target.checked,
                      })
                    }
                  />
                  <span className="text-sm font-semibold">{label}</span>
                </label>
              ))}
            </div>
          ) : (
            <Collapse defaultActiveKey={[]} expandIconPlacement="end" className="bg-white shadow-sm border border-slate-100 rounded-xl overflow-hidden mb-2 mt-2">
              {sec.fields.map((field) => (
                <Collapse.Panel 
                  key={field.name} 
                  header={<span className="font-medium text-slate-700">{field.label}</span>}
                  className="bg-slate-50/30"
                >
                  <div>
                    {field.type === "textarea" ? (
                      <textarea
                        className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-blue-500 focus:outline-none bg-white transition-all shadow-sm focus:ring-2 focus:ring-blue-50"
                        value={specialistAssessment[field.name] || ""}
                        disabled={isReadOnlyView}
                        readOnly={isReadOnlyView}
                        onChange={(e) =>
                          setSpecialistAssessment({
                            ...specialistAssessment,
                            [field.name]: e.target.value,
                          })
                        }
                        placeholder={field.placeholder || `Enter ${field.label}...`}
                        rows={field.rows || 3}
                      />
                    ) : field.type === "select" ? (
                      <select
                        className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none bg-white transition-all shadow-sm focus:ring-2 focus:ring-blue-50 font-medium"
                        value={specialistAssessment[field.name] || ""}
                        disabled={isReadOnlyView}
                        onChange={(e) =>
                          setSpecialistAssessment({
                            ...specialistAssessment,
                            [field.name]: e.target.value,
                          })
                        }
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
                        value={specialistAssessment[field.name] || ""}
                        disabled={isReadOnlyView}
                        readOnly={isReadOnlyView}
                        onChange={(e) =>
                          setSpecialistAssessment({
                            ...specialistAssessment,
                            [field.name]: e.target.value,
                          })
                        }
                        placeholder={field.placeholder || `Enter ${field.label}...`}
                        step={field.step}
                      />
                    )}
                  </div>
                </Collapse.Panel>
              ))}
            </Collapse>
          )}
        </div>
      )
    };
  }).filter(Boolean);

  return (
    <div className="p-4 bg-white rounded-b-xl space-y-6">
      {/* Active Specialty Selector */}
      {!isReadOnlyView && (
        <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex-1">
            <label className="text-[10px] font-black tracking-widest uppercase text-slate-400 pl-1 mb-2 block">
              Active Assessment Specialty (Department)
            </label>
            <select
              className="w-full md:w-80 rounded-xl border border-slate-200 p-3 text-sm font-medium focus:border-blue-500 focus:outline-none bg-white shadow-sm transition-all"
              value={activeDept}
              disabled={isReadOnlyView}
              onChange={(e) => {
                setSpecialistAssessment({
                  ...specialistAssessment,
                  selectedDept: e.target.value,
                });
              }}
            >
              {departmentList.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-100 max-w-sm">
            Toggle departments to view/fill assessment protocols. Stored data persists across all selected specialties.
          </div>
        </div>
      )}

      {isReadOnlyView && (
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Icon icon="lucide:stethoscope" className="text-blue-500" />
            {activeDept} Assessment Report
          </h3>
        </div>
      )}

      {collapseItems.length > 0 ? (
        <Collapse
          items={collapseItems}
          defaultActiveKey={["0"]}
          className="bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden"
          expandIconPlacement="end"
          size="large"
        />
      ) : (
        isReadOnlyView && (
          <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-slate-100">
            No assessment details recorded.
          </div>
        )
      )}
    </div>
  );
};

export default SpecialistAssessmentForm;
