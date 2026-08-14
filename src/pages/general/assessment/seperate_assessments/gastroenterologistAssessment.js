export const gastroenterologistSections = [
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
          "Post Procedure Review",
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
      ["Abdominal Pain", "abdominalPain"],
      ["Nausea", "nausea"],
      ["Vomiting", "vomiting"],
      ["Heartburn", "heartburn"],
      ["Acid Reflux", "acidReflux"],
      ["Difficulty Swallowing", "difficultySwallowing"],
      ["Painful Swallowing", "painfulSwallowing"],
      ["Bloating", "bloating"],
      ["Indigestion", "indigestion"],
      ["Loss of Appetite", "lossOfAppetite"],
      ["Weight Loss", "weightLoss"],
      ["Weight Gain", "weightGain"],
      ["Diarrhea", "diarrhea"],
      ["Constipation", "constipation"],
      ["Blood in Stool", "bloodInStool"],
      ["Black / Tarry Stool", "blackTarryStool"],
      ["Jaundice", "jaundice"],
      ["Abdominal Distension", "abdominalDistension"],
      ["Anorectal Pain", "anorectalPain"],
      ["Rectal Bleeding", "rectalBleeding"],
      ["Change in Bowel Habits", "changeInBowelHabits"],
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
        label: "Symptom Progression",
        name: "symptomProgression",
      },
      {
        type: "textarea",
        label: "Pain Location",
        name: "painLocation",
      },
      {
        type: "textarea",
        label: "Pain Character",
        name: "painCharacter",
      },
      {
        type: "textarea",
        label: "Pain Severity",
        name: "painSeverity",
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
    title: "4. Gastrointestinal History",
    type: "checkbox",
    fields: [
      ["GERD", "gerd"],
      ["Gastritis", "gastritis"],
      ["Peptic Ulcer Disease", "pepticUlcerDisease"],
      ["IBS", "ibs"],
      ["Inflammatory Bowel Disease", "ibd"],
      ["Crohn's Disease", "crohnsDisease"],
      ["Ulcerative Colitis", "ulcerativeColitis"],
      ["Celiac Disease", "celiacDisease"],
      ["Gallstones", "gallstones"],
      ["Pancreatitis", "pancreatitis"],
      ["Liver Disease", "liverDisease"],
      ["Hepatitis", "hepatitis"],
      ["Cirrhosis", "cirrhosis"],
      ["Hemorrhoids", "hemorrhoids"],
      ["Anal Fissure", "analFissure"],
      ["Colon Polyps", "colonPolyps"],
      ["Previous GI Bleeding", "previousGiBleeding"],
    ],
  },

  {
    title: "5. Previous Gastrointestinal Procedures",
    type: "checkbox",
    fields: [
      ["Upper GI Endoscopy", "upperGiEndoscopy"],
      ["Colonoscopy", "colonoscopy"],
      ["ERCP", "ercp"],
      ["Capsule Endoscopy", "capsuleEndoscopy"],
      ["Liver Biopsy", "liverBiopsy"],
      ["Polypectomy", "polypectomy"],
      ["Hemorrhoid Procedure", "hemorrhoidProcedure"],
      ["Abdominal Surgery", "abdominalSurgery"],
    ],
  },

  {
    title: "6. Bowel Habits",
    fields: [
      {
        type: "select",
        label: "Bowel Frequency",
        name: "bowelFrequency",
        options: [
          "Once Daily",
          "2–3 Times Daily",
          "Less Than Daily",
          "Irregular",
        ],
      },
      {
        type: "select",
        label: "Stool Consistency",
        name: "stoolConsistency",
        options: [
          "Normal",
          "Hard",
          "Loose",
          "Watery",
          "Mixed",
        ],
      },
      {
        type: "select",
        label: "Blood in Stool",
        name: "bloodStoolType",
        options: [
          "None",
          "Bright Red",
          "Dark",
          "Mixed",
        ],
      },
      {
        type: "select",
        label: "Mucus in Stool",
        name: "mucusInStool",
        options: [
          "None",
          "Occasional",
          "Frequent",
        ],
      },
      {
        type: "textarea",
        label: "Bowel Habit Changes",
        name: "bowelHabitChanges",
      },
    ],
  },

  {
    title: "7. Gastroesophageal Reflux Assessment",
    type: "checkbox",
    fields: [
      ["Heartburn", "refluxHeartburn"],
      ["Regurgitation", "regurgitation"],
      ["Night Symptoms", "nightReflux"],
      ["Post Meal Symptoms", "postMealReflux"],
      ["Chronic Cough", "chronicCough"],
      ["Hoarseness", "hoarseness"],
      ["Chest Discomfort", "refluxChestDiscomfort"],
    ],
  },

  {
    title: "8. Liver Assessment",
    type: "checkbox",
    fields: [
      ["Fatty Liver", "fattyLiver"],
      ["Viral Hepatitis", "viralHepatitis"],
      ["Alcoholic Liver Disease", "alcoholicLiverDisease"],
      ["Cirrhosis", "liverCirrhosis"],
      ["Portal Hypertension", "portalHypertension"],
      ["Ascites", "ascites"],
      ["Hepatic Encephalopathy", "hepaticEncephalopathy"],
      ["Jaundice", "liverJaundice"],
      ["Varices", "varices"],
    ],
  },

  {
    title: "9. Liver Disease History",
    fields: [
      {
        type: "textarea",
        label: "Previous Liver Disease",
        name: "previousLiverDisease",
      },
      {
        type: "textarea",
        label: "Hepatitis History",
        name: "hepatitisHistory",
      },
      {
        type: "textarea",
        label: "Alcohol History",
        name: "alcoholHistory",
      },
      {
        type: "textarea",
        label: "Previous Liver Treatment",
        name: "previousLiverTreatment",
      },
    ],
  },

  {
    title: "10. Pancreatic & Biliary Assessment",
    type: "checkbox",
    fields: [
      ["Acute Pancreatitis", "acutePancreatitis"],
      ["Chronic Pancreatitis", "chronicPancreatitis"],
      ["Gallstones", "biliaryGallstones"],
      ["Cholecystitis", "cholecystitis"],
      ["Bile Duct Disease", "bileDuctDisease"],
      ["Pancreatic Mass", "pancreaticMass"],
      ["Biliary Obstruction", "biliaryObstruction"],
    ],
  },

  {
    title: "11. Nutrition & Dietary Assessment",
    fields: [
      {
        type: "select",
        label: "Diet Pattern",
        name: "dietPattern",
        options: [
          "Mixed",
          "Vegetarian",
          "Vegan",
          "High Fat",
          "High Carbohydrate",
          "Other",
        ],
      },
      {
        type: "select",
        label: "Appetite",
        name: "appetite",
        options: [
          "Normal",
          "Reduced",
          "Increased",
        ],
      },
      {
        type: "input",
        label: "Daily Water Intake (L)",
        name: "waterIntake",
        inputType: "number",
        step: "0.1",
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
      {
        type: "textarea",
        label: "Dietary History",
        name: "dietaryHistory",
      },
    ],
  },

  {
    title: "12. Medication & Allergy History",
    fields: [
      {
        type: "textarea",
        label: "Current Medications",
        name: "currentMedications",
      },
      {
        type: "textarea",
        label: "Previous GI Medications",
        name: "previousGiMedications",
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
      {
        type: "textarea",
        label: "Food Allergies / Intolerances",
        name: "foodAllergies",
      },
    ],
  },

  {
    title: "13. Family History",
    type: "checkbox",
    fields: [
      ["Family History of GI Cancer", "familyGiCancer"],
      ["Family History of Colon Cancer", "familyColonCancer"],
      ["Family History of Gastric Cancer", "familyGastricCancer"],
      ["Family History of Liver Disease", "familyLiverDisease"],
      ["Family History of IBD", "familyIbd"],
      ["Family History of Celiac Disease", "familyCeliac"],
      ["Family History of Polyps", "familyPolyps"],
    ],
  },

  {
    title: "14. Lifestyle History",
    fields: [
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
        type: "input",
        label: "Smoking Pack Years",
        name: "smokingPackYears",
        inputType: "number",
      },
      {
        type: "select",
        label: "Alcohol",
        name: "alcohol",
        options: [
          "Never",
          "Occasional",
          "Regular",
          "Heavy",
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
        label: "Sleep Hours / Day",
        name: "sleepHours",
        inputType: "number",
      },
      {
        type: "textarea",
        label: "Lifestyle Notes",
        name: "lifestyleNotes",
      },
    ],
  },

  {
    title: "15. Vital Signs",
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
        name: "vitalWeight",
        inputType: "number",
      },
      {
        type: "input",
        label: "Height (cm)",
        name: "vitalHeight",
        inputType: "number",
      },
      {
        type: "input",
        label: "BMI",
        name: "vitalBmi",
        inputType: "number",
        step: "0.1",
      },
    ],
  },

  {
    title: "16. Abdominal Examination",
    fields: [
      {
        type: "textarea",
        label: "Abdominal Inspection",
        name: "abdominalInspection",
      },
      {
        type: "textarea",
        label: "Abdominal Palpation",
        name: "abdominalPalpation",
      },
      {
        type: "textarea",
        label: "Abdominal Tenderness",
        name: "abdominalTenderness",
      },
      {
        type: "textarea",
        label: "Organomegaly",
        name: "organomegaly",
      },
      {
        type: "textarea",
        label: "Abdominal Mass",
        name: "abdominalMass",
      },
      {
        type: "textarea",
        label: "Ascites",
        name: "ascitesExamination",
      },
      {
        type: "textarea",
        label: "Bowel Sounds",
        name: "bowelSounds",
      },
      {
        type: "textarea",
        label: "Other Findings",
        name: "abdominalOtherFindings",
      },
    ],
  },

  {
    title: "17. Rectal / Anorectal Examination",
    fields: [
      {
        type: "textarea",
        label: "Perianal Examination",
        name: "perianalExamination",
      },
      {
        type: "textarea",
        label: "Hemorrhoids",
        name: "hemorrhoidExamination",
      },
      {
        type: "textarea",
        label: "Anal Fissure",
        name: "fissureExamination",
      },
      {
        type: "textarea",
        label: "Digital Rectal Examination",
        name: "digitalRectalExamination",
      },
    ],
  },

  {
    title: "18. Laboratory Investigations",
    fields: [
      {
        type: "input",
        label: "Hemoglobin",
        name: "hemoglobin",
      },
      {
        type: "input",
        label: "WBC",
        name: "wbc",
      },
      {
        type: "input",
        label: "Platelets",
        name: "platelets",
      },
      {
        type: "input",
        label: "AST",
        name: "ast",
      },
      {
        type: "input",
        label: "ALT",
        name: "alt",
      },
      {
        type: "input",
        label: "ALP",
        name: "alp",
      },
      {
        type: "input",
        label: "GGT",
        name: "ggt",
      },
      {
        type: "input",
        label: "Total Bilirubin",
        name: "totalBilirubin",
      },
      {
        type: "input",
        label: "Direct Bilirubin",
        name: "directBilirubin",
      },
      {
        type: "input",
        label: "Albumin",
        name: "albumin",
      },
      {
        type: "input",
        label: "Total Protein",
        name: "totalProtein",
      },
      {
        type: "input",
        label: "INR",
        name: "inr",
      },
      {
        type: "input",
        label: "Amylase",
        name: "amylase",
      },
      {
        type: "input",
        label: "Lipase",
        name: "lipase",
      },
      {
        type: "input",
        label: "CRP",
        name: "crp",
      },
      {
        type: "input",
        label: "ESR",
        name: "esr",
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
    ],
  },

  {
    title: "19. Stool Investigations",
    fields: [
      {
        type: "select",
        label: "Occult Blood",
        name: "occultBlood",
        options: [
          "Not Done",
          "Negative",
          "Positive",
        ],
      },
      {
        type: "select",
        label: "Stool Parasites",
        name: "stoolParasites",
        options: [
          "Not Done",
          "Negative",
          "Positive",
        ],
      },
      {
        type: "select",
        label: "Stool Culture",
        name: "stoolCulture",
        options: [
          "Not Done",
          "Negative",
          "Positive",
        ],
      },
      {
        type: "textarea",
        label: "Stool Examination Findings",
        name: "stoolFindings",
      },
    ],
  },

  {
    title: "20. Endoscopy / Imaging",
    fields: [
      {
        type: "textarea",
        label: "Upper GI Endoscopy Findings",
        name: "endoscopyFindings",
      },
      {
        type: "textarea",
        label: "Colonoscopy Findings",
        name: "colonoscopyFindings",
      },
      {
        type: "textarea",
        label: "Ultrasound Abdomen",
        name: "ultrasoundAbdomen",
      },
      {
        type: "textarea",
        label: "CT Abdomen",
        name: "ctAbdomen",
      },
      {
        type: "textarea",
        label: "MRI / MRCP",
        name: "mriMrcp",
      },
      {
        type: "textarea",
        label: "Other Imaging Findings",
        name: "otherImaging",
      },
    ],
  },

  {
    title: "21. Endoscopy Indications",
    type: "checkbox",
    fields: [
      ["Upper GI Endoscopy Required", "upperEndoscopyRequired"],
      ["Colonoscopy Required", "colonoscopyRequired"],
      ["ERCP Required", "ercpRequired"],
      ["Capsule Endoscopy Required", "capsuleEndoscopyRequired"],
      ["Biopsy Required", "biopsyRequired"],
    ],
  },

  {
    title: "22. Assessment & Diagnosis",
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

  {
    title: "23. Treatment Plan",
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
        label: "Lifestyle Recommendations",
        name: "lifestyleRecommendations",
      },
      {
        type: "textarea",
        label: "Patient Education",
        name: "patientEducation",
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

  {
    title: "24. Follow-up",
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
          "After Investigation",
          "Post Endoscopy",
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