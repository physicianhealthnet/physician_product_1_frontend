import React from "react";
import { Collapse } from "antd";

const DentalAssessmentSummary = ({ data }) => {
  if (!data) return null;

  const sectionElements = [];
  let secIdx = 0;

  // Extraoral Examination
  if (data.extraoral) {
    const { facialSymmetry, lymphNodes, softTissueSwelling, tmj, muscles, overallNotes } = data.extraoral;
    const fields = [];

    if (facialSymmetry?.status === "Abnormal" || facialSymmetry?.notes) {
      fields.push({ label: "Facial Symmetry", value: `${facialSymmetry.status} ${facialSymmetry.notes ? `(${facialSymmetry.notes})` : ""}` });
    }
    if (lymphNodes?.status === "Abnormal" || lymphNodes?.notes) {
      fields.push({ label: "Lymph Nodes", value: `${lymphNodes.status} ${lymphNodes.notes ? `(${lymphNodes.notes})` : ""}` });
    }
    if (softTissueSwelling?.status === "Abnormal" || softTissueSwelling?.notes) {
      fields.push({ label: "Soft Tissue Swelling", value: `${softTissueSwelling.status} ${softTissueSwelling.notes ? `(${softTissueSwelling.notes})` : ""}` });
    }

    const rightTmj = Object.entries(tmj?.right || {}).filter(([k, v]) => v).map(([k]) => k).join(", ");
    if (rightTmj) fields.push({ label: "TMJ (Right)", value: rightTmj });
    
    const leftTmj = Object.entries(tmj?.left || {}).filter(([k, v]) => v).map(([k]) => k).join(", ");
    if (leftTmj) fields.push({ label: "TMJ (Left)", value: leftTmj });

    if (muscles?.deviationOnOpening?.checked) {
      fields.push({ label: "Muscles (Deviation on Opening)", value: `Yes ${muscles.deviationOnOpening.notes ? `(${muscles.deviationOnOpening.notes})` : ""}` });
    }
    if (muscles?.deviationOnClosing?.checked) {
      fields.push({ label: "Muscles (Deviation on Closing)", value: `Yes ${muscles.deviationOnClosing.notes ? `(${muscles.deviationOnClosing.notes})` : ""}` });
    }

    if (overallNotes) fields.push({ label: "Overall Notes", value: overallNotes });

    if (fields.length > 0) {
      sectionElements.push(
        <Collapse
          key={`sec-${secIdx++}`}
          ghost
          className="bg-transparent border-none mb-1 p-0 -ml-4"
          items={[{
            key: "1",
            label: <strong className="text-slate-800">Extraoral Examination</strong>,
            children: (
              <div className="pl-4 border-l-2 border-slate-100 space-y-1 -mt-2">
                {fields.map((f, i) => (
                  <div key={i}>
                    <span className="font-medium text-slate-700">{f.label} : </span>
                    <span className="text-slate-600 whitespace-pre-wrap">{f.value}</span>
                  </div>
                ))}
              </div>
            )
          }]}
        />
      );
    }
  }

  // Intraoral Examination
  if (data.intraoralNotes) {
    const fields = Object.entries(data.intraoralNotes).filter(([k, v]) => !!v);
    if (fields.length > 0) {
      sectionElements.push(
        <Collapse
          key={`sec-${secIdx++}`}
          ghost
          className="bg-transparent border-none mb-1 p-0 -ml-4"
          items={[{
            key: "1",
            label: <strong className="text-slate-800">Intraoral Examination</strong>,
            children: (
              <div className="pl-4 border-l-2 border-slate-100 space-y-1 -mt-2">
                {fields.map(([k, v], i) => (
                  <div key={i}>
                    <span className="font-medium text-slate-700">{k} : </span>
                    <span className="text-slate-600 whitespace-pre-wrap">{v}</span>
                  </div>
                ))}
              </div>
            )
          }]}
        />
      );
    }
  }

  // Teeth Status
  if (data.teethStatus && Array.isArray(data.teethStatus) && data.teethStatus.length > 0) {
    sectionElements.push(
      <Collapse
        key={`sec-${secIdx++}`}
        ghost
        className="bg-transparent border-none mb-1 p-0 -ml-4"
        items={[{
          key: "1",
          label: <strong className="text-slate-800">Teeth Chart Assessment</strong>,
          children: (
            <div className="pl-4 border-l-2 border-slate-100 space-y-2 -mt-2">
              <div className="w-full text-center mb-6 overflow-x-auto pb-2 mt-4">
                <div className="min-w-[600px] bg-slate-50/50 rounded-xl p-4 border border-slate-100/50">
                  <table className="w-full mx-auto border-separate border-spacing-y-2">
                    <tbody>
                      <tr>
                        <td colSpan={8} className="text-center pb-2 text-xs uppercase tracking-widest text-slate-400 font-bold border-r border-slate-200 pr-2">Upper Right (55-51, 18-11)</td>
                        <td colSpan={8} className="text-center pb-2 text-xs uppercase tracking-widest text-slate-400 font-bold pl-2">Upper Left (61-65, 21-28)</td>
                      </tr>
                      {[
                        ["", "", "", 55, 54, 53, 52, 51, 61, 62, 63, 64, 65, "", "", ""],
                        [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
                      ].map((row, rowIndex) => (
                        <tr key={`upper-${rowIndex}`}>
                          {row.map((cell, colIndex) => {
                            if (!cell) return <td key={colIndex} className="p-1"></td>;
                            const isSelected = data.teethStatus.some(t => String(t.teethName) === String(cell) && t.complaints?.length > 0);
                            return (
                              <td key={colIndex} className="p-1 text-center align-middle">
                                <div
                                  className={`
                                    w-8 h-8 mx-auto flex items-center justify-center rounded-full text-[10px] font-bold transition-all shadow-sm border
                                    ${isSelected
                                      ? "bg-red-500 border-red-600 text-white shadow-red-500/30"
                                      : "bg-white border-slate-200 text-slate-600"}
                                  `}
                                >
                                  {cell}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                      <tr><td colSpan={16} className="h-4"></td></tr>
                      {[
                        [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38],
                        ["", "", "", 85, 84, 83, 82, 81, 71, 72, 73, 74, 75, "", "", ""],
                      ].map((row, rowIndex) => (
                        <tr key={`lower-${rowIndex}`}>
                          {row.map((cell, colIndex) => {
                            if (!cell) return <td key={colIndex} className="p-1"></td>;
                            const isSelected = data.teethStatus.some(t => String(t.teethName) === String(cell) && t.complaints?.length > 0);
                            return (
                              <td key={colIndex} className="p-1 text-center align-middle">
                                <div
                                  className={`
                                    w-8 h-8 mx-auto flex items-center justify-center rounded-full text-[10px] font-bold transition-all shadow-sm border
                                    ${isSelected
                                      ? "bg-red-500 border-red-600 text-white shadow-red-500/30"
                                      : "bg-white border-slate-200 text-slate-600"}
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
                        <td colSpan={8} className="text-center pt-2 text-xs uppercase tracking-widest text-slate-400 font-bold border-r border-slate-200 pr-2">Lower Right (48-41, 85-81)</td>
                        <td colSpan={8} className="text-center pt-2 text-xs uppercase tracking-widest text-slate-400 font-bold pl-2">Lower Left (31-38, 71-75)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {data.teethStatus.map((t, i) => (
                <div key={i} className="mb-4 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <span className="font-bold text-slate-700 block mb-2 border-b border-slate-50 pb-1">Tooth #{t.teethName}</span>
                  {t.complaints && t.complaints.length > 0 && (
                    <div className="pl-2 mb-1">
                      <span className="font-semibold text-slate-600 text-sm">Complaints : </span>
                      <span className="text-slate-600 text-sm">{t.complaints.join(", ")}</span>
                    </div>
                  )}
                  {t.details && (
                    <div className="pl-2">
                      <span className="font-semibold text-slate-600 text-sm">Details : </span>
                      <span className="text-slate-600 text-sm whitespace-pre-wrap">{t.details}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        }]}
      />
    );
  }

  // Periodontal Assessment
  if (data.hardTissue) {
    const fields = Object.entries(data.hardTissue).filter(([k, v]) => !!v);
    if (fields.length > 0) {
      sectionElements.push(
        <Collapse
          key={`sec-${secIdx++}`}
          ghost
          className="bg-transparent border-none mb-1 p-0 -ml-4"
          items={[{
            key: "1",
            label: <strong className="text-slate-800">Periodontal Assessment</strong>,
            children: (
              <div className="pl-4 border-l-2 border-slate-100 space-y-1 -mt-2">
                {fields.map(([k, v], i) => (
                  <div key={i}>
                    <span className="font-medium text-slate-700 capitalize">{k.replace(/_/g, " ")} : </span>
                    <span className="text-slate-600 whitespace-pre-wrap">{v}</span>
                  </div>
                ))}
              </div>
            )
          }]}
        />
      );
    }
  }

  // Symptoms
  if (data.symptomData) {
    const fields = Object.entries(data.symptomData).filter(([k, v]) => v?.present);
    if (fields.length > 0) {
      sectionElements.push(
        <Collapse
          key={`sec-${secIdx++}`}
          ghost
          className="bg-transparent border-none mb-1 p-0 -ml-4"
          items={[{
            key: "1",
            label: <strong className="text-slate-800">Symptoms</strong>,
            children: (
              <div className="pl-4 border-l-2 border-slate-100 space-y-1 -mt-2">
                {fields.map(([k, v], i) => (
                  <div key={i}>
                    <span className="font-medium text-slate-700 capitalize">{k} : </span>
                    <span className="text-slate-600 whitespace-pre-wrap">Severity: {v.severity}/10 {v.notes ? `(${v.notes})` : ""}</span>
                  </div>
                ))}
              </div>
            )
          }]}
        />
      );
    }
  }

  // Treatment Plan
  if (data.treatment) {
    const { diagnosis, plan, cost, followUp, consent } = data.treatment;
    const fields = [];

    if (diagnosis && diagnosis.length > 0) {
      fields.push({ label: "Diagnosis", value: diagnosis.map(d => d.text || d).join(", ") });
    }
    if (plan && plan.length > 0) {
      fields.push({ label: "Treatment Plan", value: plan.map(p => p.text || p).join(", ") });
    }
    if (cost) fields.push({ label: "Estimated Cost", value: cost });
    if (followUp) fields.push({ label: "Follow-up", value: followUp });
    if (consent) fields.push({ label: "Consent Given", value: "Yes" });

    if (fields.length > 0) {
      sectionElements.push(
        <Collapse
          key={`sec-${secIdx++}`}
          ghost
          className="bg-transparent border-none mb-1 p-0 -ml-4"
          items={[{
            key: "1",
            label: <strong className="text-slate-800">Treatment Plan</strong>,
            children: (
              <div className="pl-4 border-l-2 border-slate-100 space-y-1 -mt-2">
                {fields.map((f, i) => (
                  <div key={i}>
                    <span className="font-medium text-slate-700">{f.label} : </span>
                    <span className="text-slate-600 whitespace-pre-wrap">{f.value}</span>
                  </div>
                ))}
              </div>
            )
          }]}
        />
      );
    }
  }

  if (sectionElements.length === 0) {
    return <p className="text-slate-500 italic m-0">No detailed data found.</p>;
  }

  return <div className="space-y-2">{sectionElements}</div>;
};

export default DentalAssessmentSummary;
