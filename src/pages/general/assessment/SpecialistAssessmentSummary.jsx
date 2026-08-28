import React from 'react';
import dayjs from 'dayjs';
import { Collapse } from 'antd';
import { departmentSectionsMap, generalPhysicianSections } from './specialistAssessmentData';

const SpecialistAssessmentSummary = ({ specialistAssessment }) => {
  if (!specialistAssessment || Object.keys(specialistAssessment).length === 0) {
    return null;
  }

  const renderSessionSummary = (deptName, sessionData, sessionIndex) => {
    if (deptName === "Dentist") return null; // Handled separately if needed

    const rawSections = departmentSectionsMap[deptName] || generalPhysicianSections;
    const sections = rawSections.filter(
      (sec) =>
        !sec.title.toLowerCase().includes("patient info") &&
        !sec.title.toLowerCase().includes("patient details")
    );

    const sectionElements = [];

    sections.forEach((sec, idx) => {
      if (sec.type === "checkbox") {
        const checkedItems = sec.fields
          .filter(([label, name]) => !!sessionData[name])
          .map(([label]) => label);

        if (checkedItems.length > 0) {
          sectionElements.push(
            <div key={`sec-${idx}`} className="mb-2">
              <strong className="text-slate-800">{sec.title.replace(/^\d+\.\s*/, "")} : </strong>
              <span className="text-slate-700">{checkedItems.join(", ")}</span>
            </div>
          );
        }
      } else {
        const filledFields = sec.fields.filter(field => !!sessionData[field.name]);

        if (filledFields.length > 0) {
          sectionElements.push(
            <Collapse
              key={`sec-${idx}`}
              ghost
              className="bg-transparent border-none mb-1 p-0 -ml-4"
              items={[
                {
                  key: "1",
                  label: <strong className="text-slate-800">{sec.title.replace(/^\d+\.\s*/, "")}</strong>,
                  children: (
                    <div className="pl-4 border-l-2 border-slate-100 space-y-1 -mt-2">
                      {filledFields.map((field) => (
                        <div key={field.name}>
                          <span className="font-medium text-slate-700">{field.label} : </span>
                          <span className="text-slate-600 whitespace-pre-wrap">{sessionData[field.name]}</span>
                        </div>
                      ))}
                    </div>
                  )
                }
              ]}
            />
          );
        }
      }
    });

    if (sectionElements.length === 0) return null;

    return {
      key: `session-${sessionIndex}`,
      label: (
        <div className="flex items-center justify-between w-full pr-4">
          <span className="font-bold text-blue-600">Session {sessionIndex + 1}</span>
          <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
            {sessionData.createdDate || dayjs().format("DD MMM YYYY hh:mm A")}
          </span>
        </div>
      ),
      children: (
        <div className="space-y-2">
          {sectionElements}
        </div>
      )
    };
  };

  const departments = Object.keys(specialistAssessment)
    .filter(key => key.endsWith("Sessions"))
    .map(key => ({
      deptName: key.replace("Sessions", ""),
      sessions: specialistAssessment[key]
    }))
    .filter(dept => dept.sessions && dept.sessions.length > 0);

  if (departments.length === 0) return null;

  const collapseItems = departments.map((dept, dIdx) => {
    const sessionRenders = dept.sessions.map((session, sIdx) => 
      renderSessionSummary(dept.deptName, session, sIdx)
    ).filter(Boolean);

    // If no sessions actually rendered anything, skip this department
    if (sessionRenders.length === 0) return null;

    return {
      key: String(dIdx),
      label: <span className="text-base font-bold text-slate-900">{dept.deptName}</span>,
      children: (
        <div className="pt-2">
          <Collapse 
            items={sessionRenders}
            ghost
            defaultActiveKey={sessionRenders.map(item => item.key)}
            className="bg-transparent border-none p-0 -ml-4"
          />
        </div>
      )
    };
  }).filter(Boolean);

  if (collapseItems.length === 0) return null;

  return (
    <div className="text-sm">
      <Collapse 
        items={collapseItems} 
        ghost 
        defaultActiveKey={collapseItems.map(item => item.key)}
        className="bg-transparent border-none"
      />
    </div>
  );
};

export default SpecialistAssessmentSummary;
