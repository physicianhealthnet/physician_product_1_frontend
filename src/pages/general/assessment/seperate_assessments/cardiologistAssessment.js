export const cardiologistSections = [
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

  {
    title: "2. Chief Complaints",
    type: "checkbox",
    fields: [
      ["Chest Pain", "chestPain"],
      ["Shortness of Breath", "shortnessOfBreath"],
      ["Palpitations", "palpitations"],
      ["Dizziness", "dizziness"],
      ["Syncope / Fainting", "syncope"],
      ["Fatigue", "fatigue"],
      ["Leg Swelling", "legSwelling"],
      ["Exercise Intolerance", "exerciseIntolerance"],
      ["Orthopnea", "orthopnea"],
      ["Paroxysmal Nocturnal Dyspnea", "pnd"],
    ],
  },

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
        label: "Pain Characteristics",
        name: "painCharacteristics",
      },
      {
        type: "textarea",
        label: "Aggravating / Relieving Factors",
        name: "aggravatingRelievingFactors",
      },
      {
        type: "textarea",
        label: "Associated Symptoms",
        name: "associatedSymptoms",
      },
    ],
  },

  {
    title: "4. Cardiovascular History",
    type: "checkbox",
    fields: [
      ["Hypertension", "hypertension"],
      ["Diabetes Mellitus", "diabetes"],
      ["Dyslipidemia", "dyslipidemia"],
      ["Coronary Artery Disease", "coronaryArteryDisease"],
      ["Previous Myocardial Infarction", "previousMI"],
      ["Heart Failure", "heartFailure"],
      ["Arrhythmia", "arrhythmia"],
      ["Atrial Fibrillation", "atrialFibrillation"],
      ["Valvular Heart Disease", "valvularHeartDisease"],
      ["Congenital Heart Disease", "congenitalHeartDisease"],
      ["Peripheral Arterial Disease", "peripheralArterialDisease"],
      ["Previous Stroke / TIA", "strokeTIA"],
    ],
  },

  {
    title: "5. Cardiovascular Procedures / Interventions",
    type: "checkbox",
    fields: [
      ["Coronary Angiography", "coronaryAngiography"],
      ["PCI / Angioplasty", "pci"],
      ["CABG", "cabg"],
      ["Pacemaker", "pacemaker"],
      ["ICD", "icd"],
      ["Valve Surgery", "valveSurgery"],
      ["Ablation", "ablation"],
    ],
  },

  {
    title: "6. Family History",
    type: "checkbox",
    fields: [
      ["Family History of CAD", "familyCAD"],
      ["Family History of MI", "familyMI"],
      ["Family History of Sudden Cardiac Death", "familySuddenDeath"],
      ["Family History of Hypertension", "familyHypertension"],
      ["Family History of Diabetes", "familyDiabetes"],
      ["Family History of Stroke", "familyStroke"],
    ],
  },

  {
    title: "7. Lifestyle & Risk Factors",
    fields: [
      {
        type: "select",
        label: "Smoking",
        name: "smoking",
        options: ["Never", "Former", "Current"],
      },
      {
        type: "input",
        label: "Smoking Pack Years",
        name: "smokingPackYears",
        inputType: "number",
      },
      {
        type: "select",
        label: "Alcohol",
        name: "alcohol",
        options: ["Never", "Occasional", "Regular"],
      },
      {
        type: "select",
        label: "Physical Activity",
        name: "physicalActivity",
        options: ["Sedentary", "Moderate", "Active"],
      },
      {
        type: "select",
        label: "Diet",
        name: "diet",
        options: [
          "Healthy",
          "Mixed",
          "High Fat",
          "High Salt",
        ],
      },
      {
        type: "input",
        label: "Sleep Hours / Day",
        name: "sleepHours",
        inputType: "number",
      },
    ],
  },

  {
    title: "8. Vital Signs",
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
        label: "SpO₂ (%)",
        name: "spo2",
        inputType: "number",
      },
      {
        type: "input",
        label: "Temperature (°C)",
        name: "temperature",
        inputType: "number",
      },
      {
        type: "input",
        label: "Weight (kg)",
        name: "weight",
        inputType: "number",
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

  {
    title: "9. Cardiovascular Examination",
    fields: [
      {
        type: "textarea",
        label: "General Appearance",
        name: "generalAppearance",
      },
      {
        type: "textarea",
        label: "JVP",
        name: "jvp",
      },
      {
        type: "textarea",
        label: "Peripheral Pulses",
        name: "peripheralPulses",
      },
      {
        type: "textarea",
        label: "Heart Sounds",
        name: "heartSounds",
      },
      {
        type: "textarea",
        label: "Murmur",
        name: "murmur",
      },
      {
        type: "textarea",
        label: "Edema",
        name: "edema",
      },
      {
        type: "textarea",
        label: "Peripheral Perfusion",
        name: "peripheralPerfusion",
      },
    ],
  },

  {
    title: "10. Respiratory Examination",
    fields: [
      {
        type: "textarea",
        label: "Chest Examination",
        name: "chestExamination",
      },
      {
        type: "textarea",
        label: "Breath Sounds",
        name: "breathSounds",
      },
      {
        type: "textarea",
        label: "Added Sounds",
        name: "addedSounds",
      },
    ],
  },

  {
    title: "11. ECG Assessment",
    fields: [
      {
        type: "select",
        label: "Rhythm",
        name: "rhythm",
        options: [
          "Sinus Rhythm",
          "Atrial Fibrillation",
          "Atrial Flutter",
          "Tachycardia",
          "Bradycardia",
          "Other",
        ],
      },
      {
        type: "input",
        label: "Heart Rate",
        name: "ecgHeartRate",
        inputType: "number",
      },
      {
        type: "input",
        label: "PR Interval (ms)",
        name: "prInterval",
        inputType: "number",
      },
      {
        type: "input",
        label: "QRS Duration (ms)",
        name: "qrsDuration",
        inputType: "number",
      },
      {
        type: "input",
        label: "QT / QTc (ms)",
        name: "qtc",
        inputType: "number",
      },
      {
        type: "select",
        label: "ST-T Changes",
        name: "stChanges",
        options: [
          "Normal",
          "ST Elevation",
          "ST Depression",
          "T Wave Inversion",
          "Other",
        ],
      },
      {
        type: "textarea",
        label: "ECG Interpretation",
        name: "ecgInterpretation",
      },
    ],
  },

  {
    title: "12. Echocardiogram",
    fields: [
      {
        type: "input",
        label: "LVEF (%)",
        name: "lvef",
        inputType: "number",
      },
      {
        type: "input",
        label: "LV Size",
        name: "lvSize",
      },
      {
        type: "input",
        label: "RV Function",
        name: "rvFunction",
      },
      {
        type: "input",
        label: "LA Size",
        name: "laSize",
      },
      {
        type: "input",
        label: "RA Size",
        name: "raSize",
      },
      {
        type: "textarea",
        label: "Valve Findings",
        name: "valveFindings",
      },
      {
        type: "textarea",
        label: "Other Echo Findings",
        name: "echoFindings",
      },
    ],
  },

  {
    title: "13. Investigations",
    fields: [
      { type: "input", label: "Hb", name: "hb" },
      { type: "input", label: "HbA1c (%)", name: "hba1c" },
      { type: "input", label: "Fasting Glucose", name: "fastingGlucose" },
      { type: "input", label: "Total Cholesterol", name: "totalCholesterol" },
      { type: "input", label: "LDL", name: "ldl" },
      { type: "input", label: "HDL", name: "hdl" },
      { type: "input", label: "Triglycerides", name: "triglycerides" },
      { type: "input", label: "Creatinine", name: "creatinine" },
      { type: "input", label: "eGFR", name: "egfr" },
      { type: "input", label: "Troponin", name: "troponin" },
      { type: "input", label: "BNP / NT-proBNP", name: "bnp" },
      {
        type: "textarea",
        label: "Other Investigation Findings",
        name: "otherInvestigations",
      },
    ],
  },

  {
    title: "14. Assessment & Diagnosis",
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
    ],
  },

  {
    title: "15. Treatment Plan",
    fields: [
      {
        type: "textarea",
        label: "Medications",
        name: "medications",
        placeholder: "Medicine, dose, frequency, duration",
      },
      {
        type: "textarea",
        label: "Lifestyle Recommendations",
        name: "lifestyleRecommendations",
      },
      {
        type: "textarea",
        label: "Further Investigations / Referrals",
        name: "furtherInvestigations",
      },
    ],
  },

  {
    title: "16. Follow-up",
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
          "Urgent",
          "After Investigation",
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