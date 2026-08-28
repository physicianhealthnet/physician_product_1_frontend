import React from "react";
import { Collapse } from "antd";
import { Icon } from "@iconify/react";
import { medicalHistoryCategories } from "./medicalHistoryData";

const MedicalHistoryReadOnly = ({
  medicalChecks = {},
  medicalTexts = {},
  patientGender = "Male",
  department = "general"
}) => {
  const getVisibleCategories = (dept) => {
    const normalizedDept = (dept || "").toLowerCase();
    const categories = ["General Medical History"];

    if (normalizedDept.includes("cardiologist")) {
      categories.push("Cardiology History", "Respiratory History");
    } else if (normalizedDept.includes("dermatologist")) {
      categories.push("Dermatology History");
    } else if (/\bent\b/.test(normalizedDept) || normalizedDept.includes("otolaryngologist")) {
      categories.push("ENT History");
    } else if (normalizedDept.includes("ophthalmologist")) {
      categories.push("Ophthalmology History");
    } else if (normalizedDept.includes("orthopedic") || normalizedDept.includes("orthopaedic")) {
      categories.push("Orthopedic History");
    } else if (normalizedDept.includes("gynecologist") || normalizedDept.includes("ob-gyn") || normalizedDept.includes("obstetric")) {
      categories.push("Gynecology History", "Obstetric History");
    } else if (normalizedDept.includes("pediatrician") || normalizedDept.includes("pediatric")) {
      categories.push("Pediatric History");
    } else if (normalizedDept.includes("endocrinologist")) {
      categories.push("Endocrinology History");
    } else if (normalizedDept.includes("psychiatrist")) {
      categories.push("Psychiatric History");
    } else if (normalizedDept.includes("dentist") || normalizedDept.includes("dental")) {
      categories.push("Dental History");
    } else if (normalizedDept.includes("gastroenterologist")) {
      categories.push("Gastroenterology History");
    } else if (normalizedDept.includes("pulmonologist")) {
      categories.push("Respiratory History");
    } else if (normalizedDept.includes("neurologist") || normalizedDept.includes("neurosurgeon")) {
      categories.push("Neurology History");
    } else if (normalizedDept.includes("nephrologist") || normalizedDept.includes("urologist")) {
      categories.push("Nephrology / Urology History");
    } else if (normalizedDept.includes("oncologist")) {
      categories.push("Oncology History");
    } else if (normalizedDept.includes("rheumatologist")) {
      categories.push("Rheumatology History");
    } else if (normalizedDept.includes("physiatrist")) {
      categories.push("Physiotherapy History", "Rehabilitation History");
    } else {
      return Object.keys(medicalHistoryCategories);
    }
    return categories;
  };

  const visibleCategories = getVisibleCategories(department);

  const collapseItems = Object.entries(medicalHistoryCategories)
    .filter(([category]) => {
      if (!visibleCategories.includes(category)) return false;
      if (category === "Gynecology History" || category === "Obstetric History") {
        return patientGender?.toLowerCase() === "female";
      }
      return true;
    })
    .map(([category, items], index) => {
      const filledItems = items.filter(m => medicalChecks[m] || (medicalTexts[m] && medicalTexts[m].trim() !== ""));
      if (filledItems.length === 0) return null; // Only show categories that have filled data

      return {
        key: index.toString(),
        label: (
          <div className="flex items-center">
            <span className="text-md font-bold px-3 py-1.5 rounded-lg text-red-700 bg-red-50 border border-red-100 shadow-sm">
              {category}
            </span>
          </div>
        ),
        children: (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
            {filledItems.map((m) => (
              <div key={m} className="flex flex-col p-3 rounded-xl border bg-red-50/50 border-red-200 shadow-sm transition-all">
                <div className="flex items-center font-medium text-red-800">
                  <Icon 
                    icon={medicalChecks[m] ? "lucide:check-square" : "lucide:square"} 
                    className={`mr-3 w-4 h-4 ${medicalChecks[m] ? 'text-red-600' : 'text-slate-400'}`} 
                  />
                  {m}
                </div>
                {medicalTexts[m] && (
                  <div className="mt-3 ml-7">
                    <p className="w-full rounded-lg border border-red-200 bg-white p-2.5 text-sm font-medium text-slate-700 shadow-sm">
                      {medicalTexts[m]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ),
      };
    })
    .filter(Boolean); // Remove null panels

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
         <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
            <Icon icon="solar:notes-bold-duotone" className="text-xl" />
         </div>
         <h3 className="text-xl font-bold text-slate-800">Medical History</h3>
      </div>
      
      {collapseItems.length > 0 ? (
        <Collapse
          items={collapseItems}
          defaultActiveKey={collapseItems.map(item => item.key)}
          className="bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden"
          expandIconPlacement="end"
          size="large"
          ghost
        />
      ) : (
        <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-xl border border-slate-100">
          <Icon icon="solar:document-text-broken" className="text-4xl mx-auto mb-3 text-slate-300" />
          <p className="font-medium">No medical history recorded.</p>
        </div>
      )}
    </div>
  );
};

export default MedicalHistoryReadOnly;
