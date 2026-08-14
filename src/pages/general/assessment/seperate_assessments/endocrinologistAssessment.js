export const endocrinologistSections = [
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
          "Diabetes Review",
          "Thyroid Review",
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
      ["Excessive Thirst", "excessiveThirst"],
      ["Frequent Urination", "frequentUrination"],
      ["Increased Hunger", "increasedHunger"],
      ["Weight Gain", "weightGain"],
      ["Weight Loss", "weightLoss"],
      ["Fatigue", "fatigue"],
      ["Heat Intolerance", "heatIntolerance"],
      ["Cold Intolerance", "coldIntolerance"],
      ["Palpitations", "palpitations"],
      ["Tremors", "tremors"],
      ["Hair Loss", "hairLoss"],
      ["Excessive Sweating", "excessiveSweating"],
      ["Constipation", "constipation"],
      ["Diarrhea", "diarrhea"],
      ["Skin Changes", "skinChanges"],
      ["Menstrual Irregularity", "menstrualIrregularity"],
      ["Erectile Dysfunction", "erectileDysfunction"],
      ["Visual Changes", "visualChanges"],
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
        label: "Progression of Symptoms",
        name: "symptomProgression",
      },
      {
        type: "textarea",
        label: "Previous Treatment",
        name: "previousTreatment",
      },
    ],
  },

  {
    title: "4. Diabetes Assessment",
    fields: [
      {
        type: "select",
        label: "Diabetes Type",
        name: "diabetesType",
        options: [
          "None",
          "Type 1",
          "Type 2",
          "Gestational",
          "Prediabetes",
        ],
      },
      {
        type: "input",
        label: "Diabetes Duration (Years)",
        name: "diabetesDuration",
        inputType: "number",
      },
      {
        type: "input",
        label: "HbA1c (%)",
        name: "hba1c",
        inputType: "number",
        step: "0.1",
      },
      {
        type: "input",
        label: "Fasting Blood Glucose",
        name: "fastingGlucose",
        inputType: "number",
      },
      {
        type: "input",
        label: "Post Meal Glucose",
        name: "postMealGlucose",
        inputType: "number",
      },
      {
        type: "input",
        label: "Random Blood Glucose",
        name: "randomGlucose",
        inputType: "number",
      },
      {
        type: "select",
        label: "Glucose Monitoring",
        name: "glucoseMonitoring",
        options: ["None", "Glucometer", "CGM", "Other"],
      },
      {
        type: "textarea",
        label: "Diabetes Control / Notes",
        name: "diabetesNotes",
      },
    ],
  },

  {
    title: "5. Diabetes Complications",
    type: "checkbox",
    fields: [
      ["Retinopathy", "retinopathy"],
      ["Nephropathy", "nephropathy"],
      ["Neuropathy", "neuropathy"],
      ["Diabetic Foot", "diabeticFoot"],
      ["Peripheral Vascular Disease", "pvd"],
      ["Cardiovascular Disease", "cvd"],
      ["Hypoglycemia Episodes", "hypoglycemia"],
      ["DKA History", "dkaHistory"],
    ],
  },

  {
    title: "6. Thyroid Assessment",
    type: "checkbox",
    fields: [
      ["Hypothyroidism", "hypothyroidism"],
      ["Hyperthyroidism", "hyperthyroidism"],
      ["Goiter", "goiter"],
      ["Thyroid Nodule", "thyroidNodule"],
      ["Thyroiditis", "thyroiditis"],
      ["Thyroid Cancer History", "thyroidCancer"],
    ],
  },

  {
    title: "7. Thyroid Investigations",
    fields: [
      {
        type: "input",
        label: "TSH",
        name: "tsh",
      },
      {
        type: "input",
        label: "Free T4",
        name: "freeT4",
      },
      {
        type: "input",
        label: "Free T3",
        name: "freeT3",
      },
      {
        type: "input",
        label: "Anti-TPO",
        name: "antiTPO",
      },
      {
        type: "input",
        label: "Anti-TG",
        name: "antiTG",
      },
      {
        type: "input",
        label: "Thyroglobulin",
        name: "thyroglobulin",
      },
      {
        type: "textarea",
        label: "Thyroid Examination / Findings",
        name: "thyroidFindings",
      },
    ],
  },

  {
    title: "8. Adrenal Assessment",
    type: "checkbox",
    fields: [
      ["Cushing Syndrome", "cushingSyndrome"],
      ["Addison Disease", "addisonDisease"],
      ["Adrenal Mass", "adrenalMass"],
      ["Pheochromocytoma", "pheochromocytoma"],
    ],
  },

  {
    title: "9. Adrenal Investigations",
    fields: [
      {
        type: "input",
        label: "Morning Cortisol",
        name: "morningCortisol",
      },
      {
        type: "input",
        label: "ACTH",
        name: "acth",
      },
      {
        type: "input",
        label: "Aldosterone",
        name: "aldosterone",
      },
      {
        type: "input",
        label: "Renin",
        name: "renin",
      },
      {
        type: "input",
        label: "Metanephrines",
        name: "metanephrines",
      },
      {
        type: "textarea",
        label: "Adrenal Findings",
        name: "adrenalFindings",
      },
    ],
  },

  {
    title: "10. Pituitary Assessment",
    type: "checkbox",
    fields: [
      ["Pituitary Adenoma", "pituitaryAdenoma"],
      ["Acromegaly", "acromegaly"],
      ["Prolactinoma", "prolactinoma"],
      ["Diabetes Insipidus", "diabetesInsipidus"],
      ["Growth Hormone Disorder", "growthHormoneDisorder"],
    ],
  },

  {
    title: "11. Pituitary Investigations",
    fields: [
      {
        type: "input",
        label: "Prolactin",
        name: "prolactin",
      },
      {
        type: "input",
        label: "IGF-1",
        name: "igf1",
      },
      {
        type: "input",
        label: "Growth Hormone",
        name: "growthHormone",
      },
      {
        type: "input",
        label: "LH",
        name: "lh",
      },
      {
        type: "input",
        label: "FSH",
        name: "fsh",
      },
      {
        type: "input",
        label: "ACTH",
        name: "pituitaryActh",
      },
      {
        type: "textarea",
        label: "Pituitary / MRI Findings",
        name: "pituitaryFindings",
      },
    ],
  },

  {
    title: "12. Reproductive & Hormonal Assessment",
    fields: [
      {
        type: "input",
        label: "Testosterone",
        name: "testosterone",
      },
      {
        type: "input",
        label: "Estradiol",
        name: "estradiol",
      },
      {
        type: "input",
        label: "Progesterone",
        name: "progesterone",
      },
      {
        type: "input",
        label: "LH",
        name: "reproductiveLH",
      },
      {
        type: "input",
        label: "FSH",
        name: "reproductiveFSH",
      },
      {
        type: "input",
        label: "AMH",
        name: "amh",
      },
      {
        type: "textarea",
        label: "Menstrual / Reproductive History",
        name: "reproductiveHistory",
      },
    ],
  },

  {
    title: "13. Bone & Mineral Metabolism",
    fields: [
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
        label: "Vitamin D",
        name: "vitaminD",
      },
      {
        type: "input",
        label: "PTH",
        name: "pth",
      },
      {
        type: "input",
        label: "ALP",
        name: "alp",
      },
      {
        type: "input",
        label: "Magnesium",
        name: "magnesium",
      },
    ],
  },

  {
    title: "14. Bone Conditions",
    type: "checkbox",
    fields: [
      ["Osteoporosis", "osteoporosis"],
      ["Osteopenia", "osteopenia"],
      ["Fracture History", "fractureHistory"],
    ],
  },

  {
    title: "15. Past Medical History",
    type: "checkbox",
    fields: [
      ["Hypertension", "hypertension"],
      ["Dyslipidemia", "dyslipidemia"],
      ["Heart Disease", "heartDisease"],
      ["Kidney Disease", "kidneyDisease"],
      ["Liver Disease", "liverDisease"],
      ["Obesity", "obesity"],
    ],
  },

  {
    title: "16. Lifestyle & Nutrition",
    fields: [
      {
        type: "select",
        label: "Diet Pattern",
        name: "dietPattern",
        options: [
          "Balanced",
          "High Carbohydrate",
          "High Fat",
          "Low Carbohydrate",
          "Vegetarian",
          "Other",
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
        type: "input",
        label: "Exercise Hours / Week",
        name: "exerciseHours",
        inputType: "number",
      },
      {
        type: "select",
        label: "Smoking",
        name: "smoking",
        options: ["Never", "Former", "Current"],
      },
      {
        type: "select",
        label: "Alcohol",
        name: "alcohol",
        options: ["Never", "Occasional", "Regular"],
      },
      {
        type: "input",
        label: "Sleep Hours / Day",
        name: "sleepHours",
        inputType: "number",
      },
      {
        type: "textarea",
        label: "Nutrition / Lifestyle Notes",
        name: "nutritionNotes",
      },
    ],
  },

  {
    title: "17. Physical Examination",
    fields: [
      {
        type: "input",
        label: "Blood Pressure",
        name: "bloodPressure",
      },
      {
        type: "input",
        label: "Heart Rate",
        name: "heartRate",
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
      {
        type: "input",
        label: "Waist Circumference (cm)",
        name: "waistCircumference",
      },
      {
        type: "textarea",
        label: "General Examination",
        name: "generalExamination",
      },
      {
        type: "textarea",
        label: "Neck / Thyroid Examination",
        name: "neckExamination",
      },
      {
        type: "textarea",
        label: "Skin Examination",
        name: "skinExamination",
      },
      {
        type: "textarea",
        label: "Neurological Examination",
        name: "neurologicalExamination",
      },
    ],
  },

  {
    title: "18. Laboratory Investigations",
    fields: [
      {
        type: "input",
        label: "HbA1c",
        name: "labHba1c",
      },
      {
        type: "input",
        label: "Fasting Glucose",
        name: "labFastingGlucose",
      },
      {
        type: "input",
        label: "Postprandial Glucose",
        name: "labPpg",
      },
      {
        type: "input",
        label: "Total Cholesterol",
        name: "totalCholesterol",
      },
      {
        type: "input",
        label: "LDL",
        name: "ldl",
      },
      {
        type: "input",
        label: "HDL",
        name: "hdl",
      },
      {
        type: "input",
        label: "Triglycerides",
        name: "triglycerides",
      },
      {
        type: "input",
        label: "Creatinine",
        name: "creatinine",
      },
      {
        type: "input",
        label: "eGFR",
        name: "egfr",
      },
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
        label: "Hemoglobin",
        name: "hemoglobin",
      },
      {
        type: "textarea",
        label: "Imaging / Other Investigation Findings",
        name: "imagingFindings",
      },
    ],
  },

  {
    title: "19. Assessment & Diagnosis",
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
    title: "20. Treatment Plan",
    fields: [
      {
        type: "textarea",
        label: "Medications",
        name: "medications",
        placeholder: "Medicine, dose, frequency, duration",
      },
      {
        type: "textarea",
        label: "Dietary Recommendations",
        name: "dietaryRecommendations",
      },
      {
        type: "textarea",
        label: "Exercise Recommendations",
        name: "exerciseRecommendations",
      },
      {
        type: "textarea",
        label: "Patient Education",
        name: "patientEducation",
      },
      {
        type: "textarea",
        label: "Further Investigations / Referrals",
        name: "furtherInvestigations",
      },
    ],
  },

  {
    title: "21. Follow-up",
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
          "Diabetes Review",
          "Thyroid Review",
          "Lab Review",
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