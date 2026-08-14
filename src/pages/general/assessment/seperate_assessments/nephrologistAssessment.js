export const nephrologistSections = [
  // =========================================================
  // 1. PATIENT INFORMATION
  // =========================================================
  {
    title: "1. Patient Information",
    fields: [
      {
        type: "input",
        label: "Patient Name",
        name: "patientName",
      },
      {
        type: "input",
        label: "Patient ID",
        name: "patientId",
      },
      {
        type: "input",
        label: "Assessment Date",
        name: "assessmentDate",
        inputType: "date",
      },
      {
        type: "input",
        label: "Age",
        name: "age",
        inputType: "number",
      },
      {
        type: "select",
        label: "Gender",
        name: "gender",
        options: ["Male", "Female", "Other"],
      },
      {
        type: "input",
        label: "Contact Number",
        name: "contactNumber",
      },
      {
        type: "select",
        label: "Visit Type",
        name: "visitType",
        options: [
          "New Consultation",
          "Follow-up",
          "CKD Review",
          "Dialysis Review",
          "Transplant Review",
          "Emergency",
        ],
      },
      {
        type: "input",
        label: "Referring Physician",
        name: "referringPhysician",
      },
    ],
  },

  // =========================================================
  // 2. CHIEF COMPLAINTS
  // =========================================================
  {
    title: "2. Chief Complaints",
    type: "checkbox",
    fields: [
      ["Swelling of Legs", "legSwelling"],
      ["Facial Puffiness", "facialPuffiness"],
      ["Reduced Urine Output", "reducedUrineOutput"],
      ["Increased Urination", "increasedUrination"],
      ["Painful Urination", "painfulUrination"],
      ["Blood in Urine", "bloodInUrine"],
      ["Foamy Urine", "foamyUrine"],
      ["Flank Pain", "flankPain"],
      ["Fatigue", "fatigue"],
      ["Weakness", "weakness"],
      ["Nausea", "nausea"],
      ["Vomiting", "vomiting"],
      ["Loss of Appetite", "lossOfAppetite"],
      ["Shortness of Breath", "shortnessOfBreath"],
      ["Itching", "itching"],
      ["Muscle Cramps", "muscleCramps"],
      ["Bone Pain", "bonePain"],
      ["Headache", "headache"],
      ["High Blood Pressure", "highBloodPressure"],
      ["Weight Changes", "weightChanges"],
    ],
  },

  // =========================================================
  // 3. HISTORY OF PRESENT ILLNESS
  // =========================================================
  {
    title: "3. History of Present Illness",
    fields: [
      {
        type: "textarea",
        label: "Presenting Symptoms",
        name: "presentingSymptoms",
      },
      {
        type: "textarea",
        label: "Onset & Duration",
        name: "onsetDuration",
      },
      {
        type: "textarea",
        label: "Symptom Progression",
        name: "symptomProgression",
      },
      {
        type: "textarea",
        label: "Previous Episodes",
        name: "previousEpisodes",
      },
      {
        type: "textarea",
        label: "Associated Symptoms",
        name: "associatedSymptoms",
      },
      {
        type: "textarea",
        label: "Previous Treatment",
        name: "previousTreatment",
      },
    ],
  },

  // =========================================================
  // 4. RENAL HISTORY
  // =========================================================
  {
    title: "4. Renal History",
    type: "checkbox",
    fields: [
      ["Chronic Kidney Disease", "chronicKidneyDisease"],
      ["Acute Kidney Injury", "acuteKidneyInjury"],
      ["Glomerulonephritis", "glomerulonephritis"],
      ["Nephrotic Syndrome", "nephroticSyndrome"],
      ["Nephritic Syndrome", "nephriticSyndrome"],
      ["Polycystic Kidney Disease", "polycysticKidneyDisease"],
      ["Kidney Stones", "kidneyStones"],
      ["Recurrent UTI", "recurrentUTI"],
      ["Proteinuria", "proteinuria"],
      ["Hematuria", "hematuria"],
      ["Diabetic Kidney Disease", "diabeticKidneyDisease"],
      ["Hypertensive Kidney Disease", "hypertensiveKidneyDisease"],
      ["Congenital Kidney Disease", "congenitalKidneyDisease"],
      ["Obstructive Uropathy", "obstructiveUropathy"],
    ],
  },

  // =========================================================
  // 5. CKD ASSESSMENT
  // =========================================================
  {
    title: "5. Chronic Kidney Disease Assessment",
    fields: [
      {
        type: "select",
        label: "CKD Status",
        name: "ckdStatus",
        options: [
          "No CKD",
          "Suspected CKD",
          "Confirmed CKD",
          "End Stage Kidney Disease",
        ],
      },
      {
        type: "select",
        label: "CKD Stage",
        name: "ckdStage",
        options: [
          "G1",
          "G2",
          "G3a",
          "G3b",
          "G4",
          "G5",
          "G5D",
          "Not Determined",
        ],
      },
      {
        type: "input",
        label: "CKD Duration",
        name: "ckdDuration",
      },
      {
        type: "input",
        label: "Baseline Creatinine",
        name: "baselineCreatinine",
      },
      {
        type: "input",
        label: "Baseline eGFR",
        name: "baselineEgfr",
      },
      {
        type: "textarea",
        label: "CKD Etiology",
        name: "ckdEtiology",
      },
      {
        type: "textarea",
        label: "CKD Progression",
        name: "ckdProgression",
      },
    ],
  },

  // =========================================================
  // 6. ACUTE KIDNEY INJURY
  // =========================================================
  {
    title: "6. Acute Kidney Injury Assessment",
    type: "checkbox",
    fields: [
      ["Recent AKI", "recentAki"],
      ["Dehydration", "dehydration"],
      ["Sepsis Associated AKI", "sepsisAki"],
      ["Drug Induced AKI", "drugInducedAki"],
      ["Contrast Associated AKI", "contrastAki"],
      ["Obstructive AKI", "obstructiveAki"],
      ["Pre-Renal Cause", "preRenalAki"],
      ["Intrinsic Renal Cause", "intrinsicRenalAki"],
      ["Post-Renal Cause", "postRenalAki"],
    ],
  },

  // =========================================================
  // 7. URINARY SYMPTOMS
  // =========================================================
  {
    title: "7. Urinary Assessment",
    fields: [
      {
        type: "select",
        label: "Urine Output",
        name: "urineOutput",
        options: [
          "Normal",
          "Reduced",
          "Very Reduced",
          "No Urine",
          "Increased",
        ],
      },
      {
        type: "input",
        label: "Approx. Urine Output / 24 Hours",
        name: "urineOutput24Hours",
      },
      {
        type: "select",
        label: "Urine Appearance",
        name: "urineAppearance",
        options: [
          "Normal",
          "Cloudy",
          "Dark",
          "Red",
          "Foamy",
          "Other",
        ],
      },
      {
        type: "select",
        label: "Urinary Frequency",
        name: "urinaryFrequency",
        options: [
          "Normal",
          "Increased",
          "Reduced",
        ],
      },
      {
        type: "select",
        label: "Nocturia",
        name: "nocturia",
        options: [
          "None",
          "1–2 Times",
          "3–4 Times",
          "More Than 4",
        ],
      },
      {
        type: "textarea",
        label: "Urinary Symptoms",
        name: "urinarySymptoms",
      },
    ],
  },

  // =========================================================
  // 8. HYPERTENSION
  // =========================================================
  {
    title: "8. Hypertension Assessment",
    type: "checkbox",
    fields: [
      ["Hypertension", "hypertension"],
      ["Poorly Controlled BP", "poorlyControlledBP"],
      ["Resistant Hypertension", "resistantHypertension"],
      ["Hypertensive Emergency History", "hypertensiveEmergency"],
      ["Hypertensive Kidney Disease", "hypertensiveKidneyDisease"],
    ],
  },

  {
    title: "9. Blood Pressure Assessment",
    fields: [
      {
        type: "input",
        label: "Current BP",
        name: "currentBloodPressure",
      },
      {
        type: "input",
        label: "Home BP Average",
        name: "homeBpAverage",
      },
      {
        type: "input",
        label: "Previous BP",
        name: "previousBloodPressure",
      },
      {
        type: "textarea",
        label: "BP Control Notes",
        name: "bpControlNotes",
      },
    ],
  },

  // =========================================================
  // 10. DIABETES
  // =========================================================
  {
    title: "10. Diabetes & Metabolic History",
    type: "checkbox",
    fields: [
      ["Diabetes Mellitus", "diabetes"],
      ["Diabetic Kidney Disease", "diabeticKidneyDisease"],
      ["Poor Glycemic Control", "poorGlycemicControl"],
      ["Dyslipidemia", "dyslipidemia"],
      ["Obesity", "obesity"],
      ["Metabolic Syndrome", "metabolicSyndrome"],
    ],
  },

  // =========================================================
  // 11. DIALYSIS HISTORY
  // =========================================================
  {
    title: "11. Dialysis History",
    fields: [
      {
        type: "select",
        label: "Dialysis Status",
        name: "dialysisStatus",
        options: [
          "Not on Dialysis",
          "Hemodialysis",
          "Peritoneal Dialysis",
          "Planned Dialysis",
        ],
      },
      {
        type: "input",
        label: "Dialysis Start Date",
        name: "dialysisStartDate",
        inputType: "date",
      },
      {
        type: "input",
        label: "Dialysis Frequency",
        name: "dialysisFrequency",
      },
      {
        type: "input",
        label: "Dialysis Duration / Session",
        name: "dialysisDuration",
      },
      {
        type: "input",
        label: "Dry Weight (kg)",
        name: "dryWeight",
        inputType: "number",
      },
      {
        type: "textarea",
        label: "Dialysis History / Notes",
        name: "dialysisHistory",
      },
    ],
  },

  // =========================================================
  // 12. DIALYSIS ACCESS
  // =========================================================
  {
    title: "12. Dialysis Access",
    fields: [
      {
        type: "select",
        label: "Access Type",
        name: "accessType",
        options: [
          "None",
          "AV Fistula",
          "AV Graft",
          "Temporary Catheter",
          "Tunneled Catheter",
          "Peritoneal Catheter",
        ],
      },
      {
        type: "input",
        label: "Access Site",
        name: "accessSite",
      },
      {
        type: "select",
        label: "Access Status",
        name: "accessStatus",
        options: [
          "Functioning",
          "Poor Flow",
          "Infection Suspected",
          "Thrombosed",
          "Other",
        ],
      },
      {
        type: "textarea",
        label: "Access Examination Findings",
        name: "accessFindings",
      },
    ],
  },

  // =========================================================
  // 13. KIDNEY TRANSPLANT
  // =========================================================
  {
    title: "13. Kidney Transplant History",
    fields: [
      {
        type: "select",
        label: "Transplant Status",
        name: "transplantStatus",
        options: [
          "No Transplant",
          "Pre-Transplant",
          "Post Transplant",
          "Transplant Failure",
        ],
      },
      {
        type: "input",
        label: "Transplant Date",
        name: "transplantDate",
        inputType: "date",
      },
      {
        type: "select",
        label: "Donor Type",
        name: "donorType",
        options: [
          "Living Related",
          "Living Unrelated",
          "Deceased Donor",
          "Not Applicable",
        ],
      },
      {
        type: "textarea",
        label: "Transplant History",
        name: "transplantHistory",
      },
      {
        type: "textarea",
        label: "Immunosuppressive Medications",
        name: "immunosuppressiveMedications",
      },
    ],
  },

  // =========================================================
  // 14. KIDNEY STONES
  // =========================================================
  {
    title: "14. Kidney Stone History",
    type: "checkbox",
    fields: [
      ["Previous Kidney Stones", "previousKidneyStones"],
      ["Recurrent Stones", "recurrentStones"],
      ["Ureteric Stone", "uretericStone"],
      ["Renal Stone", "renalStone"],
      ["Hydronephrosis", "hydronephrosis"],
      ["Previous Stone Procedure", "previousStoneProcedure"],
    ],
  },

  // =========================================================
  // 15. ELECTROLYTE / ACID BASE
  // =========================================================
  {
    title: "15. Electrolyte & Acid-Base Assessment",
    fields: [
      {
        type: "input",
        label: "Sodium",
        name: "sodium",
      },
      {
        type: "input",
        label: "Potassium",
        name: "potassium",
      },
      {
        type: "input",
        label: "Chloride",
        name: "chloride",
      },
      {
        type: "input",
        label: "Bicarbonate",
        name: "bicarbonate",
      },
      {
        type: "input",
        label: "Calcium",
        name: "calcium",
      },
      {
        type: "input",
        label: "Phosphorus",
        name: "phosphorus",
      },
      {
        type: "input",
        label: "Magnesium",
        name: "magnesium",
      },
      {
        type: "textarea",
        label: "Electrolyte / Acid-Base Notes",
        name: "electrolyteNotes",
      },
    ],
  },

  // =========================================================
  // 16. ANEMIA / CKD MINERAL BONE
  // =========================================================
  {
    title: "16. CKD Anemia & Mineral Bone Disorder",
    fields: [
      {
        type: "input",
        label: "Hemoglobin",
        name: "hemoglobin",
      },
      {
        type: "input",
        label: "Ferritin",
        name: "ferritin",
      },
      {
        type: "input",
        label: "TSAT",
        name: "tsat",
      },
      {
        type: "input",
        label: "Vitamin B12",
        name: "vitaminB12",
      },
      {
        type: "input",
        label: "Folate",
        name: "folate",
      },
      {
        type: "input",
        label: "PTH",
        name: "pth",
      },
      {
        type: "input",
        label: "Vitamin D",
        name: "vitaminD",
      },
      {
        type: "textarea",
        label: "CKD-MBD Assessment",
        name: "ckdMbdAssessment",
      },
    ],
  },

  // =========================================================
  // 17. MEDICATION HISTORY
  // =========================================================
  {
    title: "17. Medication History",
    fields: [
      {
        type: "textarea",
        label: "Current Medications",
        name: "currentMedications",
      },
      {
        type: "textarea",
        label: "Previous Medications",
        name: "previousMedications",
      },
      {
        type: "textarea",
        label: "Nephrotoxic Medication Exposure",
        name: "nephrotoxicExposure",
      },
      {
        type: "textarea",
        label: "NSAID Use",
        name: "nsaidUse",
      },
      {
        type: "textarea",
        label: "Drug Allergies",
        name: "drugAllergies",
      },
    ],
  },

  // =========================================================
  // 18. FAMILY HISTORY
  // =========================================================
  {
    title: "18. Family History",
    type: "checkbox",
    fields: [
      ["Family History of Kidney Disease", "familyKidneyDisease"],
      ["Family History of CKD", "familyCkd"],
      ["Family History of Kidney Stones", "familyKidneyStones"],
      ["Family History of Polycystic Kidney Disease", "familyPkd"],
      ["Family History of Hypertension", "familyHypertension"],
      ["Family History of Diabetes", "familyDiabetes"],
      ["Family History of Autoimmune Disease", "familyAutoimmuneDisease"],
    ],
  },

  // =========================================================
  // 19. LIFESTYLE
  // =========================================================
  {
    title: "19. Lifestyle & Dietary Assessment",
    fields: [
      {
        type: "select",
        label: "Diet Pattern",
        name: "dietPattern",
        options: [
          "Normal",
          "Low Salt",
          "Low Protein",
          "Renal Diet",
          "Diabetic Diet",
          "Other",
        ],
      },
      {
        type: "input",
        label: "Daily Fluid Intake (L)",
        name: "dailyFluidIntake",
        inputType: "number",
        step: "0.1",
      },
      {
        type: "select",
        label: "Smoking",
        name: "smoking",
        options: [
          "Never",
          "Former",
          "Current",
        ],
      },
      {
        type: "select",
        label: "Alcohol",
        name: "alcohol",
        options: [
          "Never",
          "Occasional",
          "Regular",
        ],
      },
      {
        type: "select",
        label: "Physical Activity",
        name: "physicalActivity",
        options: [
          "Sedentary",
          "Light",
          "Moderate",
          "Active",
        ],
      },
      {
        type: "textarea",
        label: "Dietary / Lifestyle Notes",
        name: "dietaryLifestyleNotes",
      },
    ],
  },

  // =========================================================
  // 20. VITAL SIGNS
  // =========================================================
  {
    title: "20. Vital Signs",
    fields: [
      {
        type: "input",
        label: "Blood Pressure (mmHg)",
        name: "bloodPressure",
      },
      {
        type: "input",
        label: "Heart Rate (bpm)",
        name: "heartRate",
        inputType: "number",
      },
      {
        type: "input",
        label: "Respiratory Rate (/min)",
        name: "respiratoryRate",
        inputType: "number",
      },
      {
        type: "input",
        label: "Temperature (°C)",
        name: "temperature",
        inputType: "number",
        step: "0.1",
      },
      {
        type: "input",
        label: "SpO₂ (%)",
        name: "spo2",
        inputType: "number",
      },
      {
        type: "input",
        label: "Weight (kg)",
        name: "weight",
        inputType: "number",
        step: "0.1",
      },
      {
        type: "input",
        label: "Height (cm)",
        name: "height",
        inputType: "number",
      },
      {
        type: "input",
        label: "BMI",
        name: "bmi",
        inputType: "number",
        step: "0.1",
      },
    ],
  },

  // =========================================================
  // 21. FLUID STATUS
  // =========================================================
  {
    title: "21. Fluid Status Examination",
    type: "checkbox",
    fields: [
      ["Peripheral Edema", "peripheralEdema"],
      ["Facial Edema", "facialEdema"],
      ["Pulmonary Edema", "pulmonaryEdema"],
      ["Ascites", "ascites"],
      ["Dehydration", "dehydration"],
      ["Raised JVP", "raisedJvp"],
      ["Fluid Overload", "fluidOverload"],
    ],
  },

  // =========================================================
  // 22. PHYSICAL EXAMINATION
  // =========================================================
  {
    title: "22. Physical Examination",
    fields: [
      {
        type: "textarea",
        label: "General Examination",
        name: "generalExamination",
      },
      {
        type: "textarea",
        label: "Cardiovascular Examination",
        name: "cardiovascularExamination",
      },
      {
        type: "textarea",
        label: "Respiratory Examination",
        name: "respiratoryExamination",
      },
      {
        type: "textarea",
        label: "Abdominal Examination",
        name: "abdominalExamination",
      },
      {
        type: "textarea",
        label: "Neurological Examination",
        name: "neurologicalExamination",
      },
      {
        type: "textarea",
        label: "Peripheral Edema",
        name: "peripheralEdemaExamination",
      },
      {
        type: "textarea",
        label: "Other Findings",
        name: "otherExaminationFindings",
      },
    ],
  },

  // =========================================================
  // 23. RENAL FUNCTION
  // =========================================================
  {
    title: "23. Renal Function Investigations",
    fields: [
      {
        type: "input",
        label: "Serum Creatinine",
        name: "serumCreatinine",
      },
      {
        type: "input",
        label: "eGFR",
        name: "egfr",
      },
      {
        type: "input",
        label: "BUN",
        name: "bun",
      },
      {
        type: "input",
        label: "Urea",
        name: "urea",
      },
      {
        type: "input",
        label: "Serum Uric Acid",
        name: "uricAcid",
      },
      {
        type: "input",
        label: "Cystatin C",
        name: "cystatinC",
      },
      {
        type: "textarea",
        label: "Renal Function Interpretation",
        name: "renalFunctionInterpretation",
      },
    ],
  },

  // =========================================================
  // 24. URINE INVESTIGATIONS
  // =========================================================
  {
    title: "24. Urine Investigations",
    fields: [
      {
        type: "input",
        label: "Urine Protein",
        name: "urineProtein",
      },
      {
        type: "input",
        label: "Urine Albumin",
        name: "urineAlbumin",
      },
      {
        type: "input",
        label: "Urine Creatinine",
        name: "urineCreatinine",
      },
      {
        type: "input",
        label: "ACR",
        name: "acr",
      },
      {
        type: "input",
        label: "PCR",
        name: "pcr",
      },
      {
        type: "select",
        label: "Urine Blood",
        name: "urineBlood",
        options: [
          "Negative",
          "Trace",
          "Positive",
        ],
      },
      {
        type: "select",
        label: "Urine Protein",
        name: "urineProteinResult",
        options: [
          "Negative",
          "Trace",
          "1+",
          "2+",
          "3+",
          "4+",
        ],
      },
      {
        type: "textarea",
        label: "Urinalysis Findings",
        name: "urinalysisFindings",
      },
    ],
  },

  // =========================================================
  // 25. IMAGING
  // =========================================================
  {
    title: "25. Renal Imaging",
    fields: [
      {
        type: "textarea",
        label: "Ultrasound KUB Findings",
        name: "ultrasoundKUB",
      },
      {
        type: "textarea",
        label: "Kidney Size",
        name: "kidneySize",
      },
      {
        type: "textarea",
        label: "Cortical Thickness",
        name: "corticalThickness",
      },
      {
        type: "textarea",
        label: "Hydronephrosis",
        name: "imagingHydronephrosis",
      },
      {
        type: "textarea",
        label: "Kidney Stones",
        name: "imagingKidneyStones",
      },
      {
        type: "textarea",
        label: "CT / MRI Findings",
        name: "ctMriFindings",
      },
      {
        type: "textarea",
        label: "Other Imaging Findings",
        name: "otherImagingFindings",
      },
    ],
  },

  // =========================================================
  // 26. IMMUNOLOGICAL WORKUP
  // =========================================================
  {
    title: "26. Immunological / Glomerular Workup",
    fields: [
      {
        type: "input",
        label: "ANA",
        name: "ana",
      },
      {
        type: "input",
        label: "ANCA",
        name: "anca",
      },
      {
        type: "input",
        label: "C3",
        name: "c3",
      },
      {
        type: "input",
        label: "C4",
        name: "c4",
      },
      {
        type: "input",
        label: "Anti-GBM",
        name: "antiGbm",
      },
      {
        type: "input",
        label: "Anti-dsDNA",
        name: "antiDsdna",
      },
      {
        type: "input",
        label: "PLA2R",
        name: "pla2r",
      },
      {
        type: "textarea",
        label: "Immunological Workup Interpretation",
        name: "immunologicalInterpretation",
      },
    ],
  },

  // =========================================================
  // 27. KIDNEY BIOPSY
  // =========================================================
  {
    title: "27. Kidney Biopsy",
    fields: [
      {
        type: "select",
        label: "Biopsy Status",
        name: "biopsyStatus",
        options: [
          "Not Done",
          "Planned",
          "Completed",
          "Not Indicated",
        ],
      },
      {
        type: "input",
        label: "Biopsy Date",
        name: "biopsyDate",
        inputType: "date",
      },
      {
        type: "textarea",
        label: "Biopsy Findings",
        name: "biopsyFindings",
      },
      {
        type: "textarea",
        label: "Biopsy Diagnosis",
        name: "biopsyDiagnosis",
      },
    ],
  },

  // =========================================================
  // 28. ASSESSMENT & DIAGNOSIS
  // =========================================================
  {
    title: "28. Assessment & Diagnosis",
    fields: [
      {
        type: "textarea",
        label: "Clinical Assessment",
        name: "clinicalAssessment",
      },
      {
        type: "textarea",
        label: "Primary Diagnosis",
        name: "primaryDiagnosis",
      },
      {
        type: "textarea",
        label: "Secondary Diagnosis / Comorbidities",
        name: "secondaryDiagnosis",
      },
      {
        type: "textarea",
        label: "Differential Diagnosis",
        name: "differentialDiagnosis",
      },
    ],
  },

  // =========================================================
  // 29. TREATMENT PLAN
  // =========================================================
  {
    title: "29. Treatment Plan",
    fields: [
      {
        type: "textarea",
        label: "Medications",
        name: "medications",
        placeholder: "Medicine, dose, frequency, duration",
      },
      {
        type: "textarea",
        label: "Renal Diet Recommendations",
        name: "renalDietRecommendations",
      },
      {
        type: "textarea",
        label: "Fluid Restriction / Fluid Advice",
        name: "fluidAdvice",
      },
      {
        type: "textarea",
        label: "Blood Pressure Management",
        name: "bpManagement",
      },
      {
        type: "textarea",
        label: "Electrolyte Management",
        name: "electrolyteManagement",
      },
      {
        type: "textarea",
        label: "Anemia Management",
        name: "anemiaManagement",
      },
      {
        type: "textarea",
        label: "CKD-MBD Management",
        name: "ckdMbdManagement",
      },
      {
        type: "textarea",
        label: "Dialysis Plan",
        name: "dialysisPlan",
      },
      {
        type: "textarea",
        label: "Further Investigations",
        name: "furtherInvestigations",
      },
      {
        type: "textarea",
        label: "Referrals",
        name: "referrals",
      },
    ],
  },

  // =========================================================
  // 30. FOLLOW-UP
  // =========================================================
  {
    title: "30. Follow-up",
    fields: [
      {
        type: "input",
        label: "Follow-up Date",
        name: "followUpDate",
        inputType: "date",
      },
      {
        type: "select",
        label: "Follow-up Type",
        name: "followUpType",
        options: [
          "Routine",
          "CKD Review",
          "Dialysis Review",
          "Transplant Review",
          "Lab Review",
          "Post Procedure",
          "Urgent",
          "As Required",
        ],
      },
      {
        type: "textarea",
        label: "Follow-up Instructions",
        name: "followUpInstructions",
      },
      {
        type: "textarea",
        label: "Additional Notes",
        name: "additionalNotes",
      },
    ],
  },
];