export const generalSurgeonSections = [
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
          "Preoperative Assessment",
          "Postoperative Review",
          "Emergency",
          "Wound Review",
          "Second Opinion",
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
      ["Abdominal Pain", "abdominalPain"],
      ["Lump / Swelling", "lumpSwelling"],
      ["Vomiting", "vomiting"],
      ["Nausea", "nausea"],
      ["Fever", "fever"],
      ["Bleeding", "bleeding"],
      ["Difficulty Swallowing", "difficultySwallowing"],
      ["Constipation", "constipation"],
      ["Diarrhea", "diarrhea"],
      ["Abdominal Distension", "abdominalDistension"],
      ["Loss of Appetite", "lossOfAppetite"],
      ["Weight Loss", "weightLoss"],
      ["Wound / Ulcer", "woundUlcer"],
      ["Non-Healing Wound", "nonHealingWound"],
      ["Jaundice", "jaundice"],
      ["Urinary Symptoms", "urinarySymptoms"],
      ["Breast Lump", "breastLump"],
      ["Groin Swelling", "groinSwelling"],
      ["Hernia", "hernia"],
      ["Anal Pain / Bleeding", "analPainBleeding"],
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
        label: "Presenting Complaint",
        name: "presentingComplaint",
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
        label: "Site of Symptoms",
        name: "symptomSite",
      },
      {
        type: "textarea",
        label: "Character of Symptoms",
        name: "symptomCharacter",
      },
      {
        type: "textarea",
        label: "Severity",
        name: "symptomSeverity",
      },
      {
        type: "textarea",
        label: "Aggravating Factors",
        name: "aggravatingFactors",
      },
      {
        type: "textarea",
        label: "Relieving Factors",
        name: "relievingFactors",
      },
      {
        type: "textarea",
        label: "Associated Symptoms",
        name: "associatedSymptoms",
      },
    ],
  },

  // =========================================================
  // 4. ABDOMINAL PAIN ASSESSMENT
  // =========================================================
  {
    title: "4. Abdominal Pain Assessment",
    fields: [
      {
        type: "select",
        label: "Pain Location",
        name: "painLocation",
        options: [
          "Right Upper Quadrant",
          "Left Upper Quadrant",
          "Epigastric",
          "Periumbilical",
          "Right Lower Quadrant",
          "Left Lower Quadrant",
          "Suprapubic",
          "Generalized",
          "Other",
        ],
      },
      {
        type: "select",
        label: "Pain Character",
        name: "painCharacter",
        options: [
          "Sharp",
          "Dull",
          "Cramping",
          "Burning",
          "Colicky",
          "Stabbing",
          "Constant",
          "Intermittent",
        ],
      },
      {
        type: "input",
        label: "Pain Score (0–10)",
        name: "painScore",
        inputType: "number",
        min: "0",
        max: "10",
      },
      {
        type: "textarea",
        label: "Radiation",
        name: "painRadiation",
      },
      {
        type: "textarea",
        label: "Pain Trigger",
        name: "painTrigger",
      },
    ],
  },

  // =========================================================
  // 5. GASTROINTESTINAL HISTORY
  // =========================================================
  {
    title: "5. Gastrointestinal Symptoms",
    type: "checkbox",
    fields: [
      ["Acid Reflux", "acidReflux"],
      ["Heartburn", "heartburn"],
      ["Dysphagia", "dysphagia"],
      ["Odynophagia", "odynophagia"],
      ["Nausea", "giNausea"],
      ["Vomiting", "giVomiting"],
      ["Hematemesis", "hematemesis"],
      ["Melena", "melena"],
      ["Blood in Stool", "bloodInStool"],
      ["Constipation", "giConstipation"],
      ["Diarrhea", "giDiarrhea"],
      ["Change in Bowel Habits", "changeBowelHabits"],
      ["Abdominal Distension", "giAbdominalDistension"],
      ["Loss of Appetite", "giLossOfAppetite"],
      ["Unintentional Weight Loss", "giWeightLoss"],
    ],
  },

  // =========================================================
  // 6. HERNIA ASSESSMENT
  // =========================================================
  {
    title: "6. Hernia Assessment",
    type: "checkbox",
    fields: [
      ["Inguinal Hernia", "inguinalHernia"],
      ["Femoral Hernia", "femoralHernia"],
      ["Umbilical Hernia", "umbilicalHernia"],
      ["Incisional Hernia", "incisionalHernia"],
      ["Epigastric Hernia", "epigastricHernia"],
      ["Hiatal Hernia", "hiatalHernia"],
      ["Recurrent Hernia", "recurrentHernia"],
      ["Reducible Hernia", "reducibleHernia"],
      ["Irreducible Hernia", "irreducibleHernia"],
      ["Incarcerated Hernia", "incarceratedHernia"],
      ["Strangulated Hernia", "strangulatedHernia"],
    ],
  },

  {
    title: "7. Hernia Details",
    fields: [
      {
        type: "select",
        label: "Hernia Side",
        name: "herniaSide",
        options: [
          "Right",
          "Left",
          "Bilateral",
          "Midline",
          "Not Applicable",
        ],
      },
      {
        type: "input",
        label: "Hernia Duration",
        name: "herniaDuration",
      },
      {
        type: "textarea",
        label: "Hernia Examination Findings",
        name: "herniaExamination",
      },
      {
        type: "textarea",
        label: "Cough Impulse",
        name: "coughImpulse",
      },
      {
        type: "textarea",
        label: "Reducibility",
        name: "herniaReducibility",
      },
    ],
  },

  // =========================================================
  // 8. BREAST ASSESSMENT
  // =========================================================
  {
    title: "8. Breast Assessment",
    type: "checkbox",
    fields: [
      ["Breast Lump", "breastLump"],
      ["Breast Pain", "breastPain"],
      ["Nipple Discharge", "nippleDischarge"],
      ["Nipple Retraction", "nippleRetraction"],
      ["Skin Changes", "breastSkinChanges"],
      ["Axillary Lump", "axillaryLump"],
      ["Previous Breast Surgery", "previousBreastSurgery"],
      ["Family History of Breast Cancer", "familyBreastCancer"],
    ],
  },

  {
    title: "9. Breast Examination",
    fields: [
      {
        type: "select",
        label: "Breast Side",
        name: "breastSide",
        options: [
          "Right",
          "Left",
          "Bilateral",
          "Not Applicable",
        ],
      },
      {
        type: "textarea",
        label: "Lump Location",
        name: "breastLumpLocation",
      },
      {
        type: "textarea",
        label: "Lump Size",
        name: "breastLumpSize",
      },
      {
        type: "textarea",
        label: "Lump Character",
        name: "breastLumpCharacter",
      },
      {
        type: "textarea",
        label: "Breast Examination Findings",
        name: "breastExamination",
      },
      {
        type: "textarea",
        label: "Axillary Examination",
        name: "axillaryExamination",
      },
    ],
  },

  // =========================================================
  // 10. THYROID / NECK
  // =========================================================
  {
    title: "10. Thyroid & Neck Assessment",
    type: "checkbox",
    fields: [
      ["Thyroid Swelling", "thyroidSwelling"],
      ["Neck Lump", "neckLump"],
      ["Difficulty Swallowing", "thyroidDysphagia"],
      ["Difficulty Breathing", "thyroidBreathingDifficulty"],
      ["Voice Change", "voiceChange"],
      ["Cervical Lymphadenopathy", "cervicalLymphadenopathy"],
      ["Previous Thyroid Surgery", "previousThyroidSurgery"],
    ],
  },

  {
    title: "11. Thyroid Examination",
    fields: [
      {
        type: "textarea",
        label: "Thyroid Size",
        name: "thyroidSize",
      },
      {
        type: "textarea",
        label: "Thyroid Consistency",
        name: "thyroidConsistency",
      },
      {
        type: "textarea",
        label: "Thyroid Nodules",
        name: "thyroidNodules",
      },
      {
        type: "textarea",
        label: "Neck Lymph Nodes",
        name: "neckLymphNodes",
      },
      {
        type: "textarea",
        label: "Thyroid Examination Findings",
        name: "thyroidExamination",
      },
    ],
  },

  // =========================================================
  // 12. COLORECTAL / ANAL
  // =========================================================
  {
    title: "12. Colorectal & Anal Assessment",
    type: "checkbox",
    fields: [
      ["Hemorrhoids", "hemorrhoids"],
      ["Anal Fissure", "analFissure"],
      ["Anal Fistula", "analFistula"],
      ["Perianal Abscess", "perianalAbscess"],
      ["Rectal Bleeding", "rectalBleeding"],
      ["Rectal Pain", "rectalPain"],
      ["Rectal Prolapse", "rectalProlapse"],
      ["Change in Bowel Habits", "colorectalBowelChange"],
      ["Colon Polyp History", "colonPolypHistory"],
      ["Colorectal Cancer History", "colorectalCancerHistory"],
    ],
  },

  {
    title: "13. Colorectal Examination",
    fields: [
      {
        type: "textarea",
        label: "Perianal Examination",
        name: "perianalExamination",
      },
      {
        type: "textarea",
        label: "Digital Rectal Examination",
        name: "digitalRectalExamination",
      },
      {
        type: "textarea",
        label: "Anoscopy Findings",
        name: "anoscopyFindings",
      },
      {
        type: "textarea",
        label: "Rectal Examination Findings",
        name: "rectalExaminationFindings",
      },
    ],
  },

  // =========================================================
  // 14. WOUND ASSESSMENT
  // =========================================================
  {
    title: "14. Wound Assessment",
    type: "checkbox",
    fields: [
      ["Surgical Wound", "surgicalWound"],
      ["Traumatic Wound", "traumaticWound"],
      ["Diabetic Wound", "diabeticWound"],
      ["Pressure Ulcer", "pressureUlcer"],
      ["Non-Healing Wound", "nonHealingWound"],
      ["Infected Wound", "infectedWound"],
      ["Ulcer", "ulcer"],
      ["Wound Dehiscence", "woundDehiscence"],
      ["Wound Discharge", "woundDischarge"],
      ["Necrotic Tissue", "necroticTissue"],
    ],
  },

  {
    title: "15. Wound Details",
    fields: [
      {
        type: "textarea",
        label: "Wound Location",
        name: "woundLocation",
      },
      {
        type: "textarea",
        label: "Wound Size",
        name: "woundSize",
      },
      {
        type: "textarea",
        label: "Wound Depth",
        name: "woundDepth",
      },
      {
        type: "textarea",
        label: "Wound Bed",
        name: "woundBed",
      },
      {
        type: "textarea",
        label: "Wound Edges",
        name: "woundEdges",
      },
      {
        type: "textarea",
        label: "Discharge",
        name: "woundDischargeDetails",
      },
      {
        type: "textarea",
        label: "Surrounding Skin",
        name: "surroundingSkin",
      },
      {
        type: "textarea",
        label: "Wound Management Plan",
        name: "woundManagementPlan",
      },
    ],
  },

  // =========================================================
  // 16. SKIN / SOFT TISSUE
  // =========================================================
  {
    title: "16. Skin & Soft Tissue",
    type: "checkbox",
    fields: [
      ["Lipoma", "lipoma"],
      ["Sebaceous Cyst", "sebaceousCyst"],
      ["Abscess", "abscess"],
      ["Cellulitis", "cellulitis"],
      ["Soft Tissue Mass", "softTissueMass"],
      ["Skin Lesion", "skinLesion"],
      ["Skin Cancer Suspicion", "skinCancerSuspicion"],
      ["Ganglion Cyst", "ganglionCyst"],
      ["Keloid", "keloid"],
    ],
  },

  {
    title: "17. Soft Tissue Examination",
    fields: [
      {
        type: "textarea",
        label: "Mass Location",
        name: "massLocation",
      },
      {
        type: "textarea",
        label: "Mass Size",
        name: "massSize",
      },
      {
        type: "textarea",
        label: "Mass Consistency",
        name: "massConsistency",
      },
      {
        type: "textarea",
        label: "Mobility",
        name: "massMobility",
      },
      {
        type: "textarea",
        label: "Skin Changes",
        name: "massSkinChanges",
      },
      {
        type: "textarea",
        label: "Tenderness",
        name: "massTenderness",
      },
    ],
  },

  // =========================================================
  // 18. VASCULAR ASSESSMENT
  // =========================================================
  {
    title: "18. Peripheral Vascular Assessment",
    type: "checkbox",
    fields: [
      ["Leg Swelling", "legSwelling"],
      ["Varicose Veins", "varicoseVeins"],
      ["Leg Ulcer", "legUlcer"],
      ["Peripheral Arterial Disease", "peripheralArterialDisease"],
      ["Claudication", "claudication"],
      ["Cold Extremities", "coldExtremities"],
      ["Poor Circulation", "poorCirculation"],
      ["Deep Vein Thrombosis History", "dvtHistory"],
      ["Lymphedema", "lymphedema"],
    ],
  },

  {
    title: "19. Vascular Examination",
    fields: [
      {
        type: "textarea",
        label: "Peripheral Pulses",
        name: "peripheralPulses",
      },
      {
        type: "textarea",
        label: "Capillary Refill",
        name: "capillaryRefill",
      },
      {
        type: "textarea",
        label: "Edema",
        name: "edema",
      },
      {
        type: "textarea",
        label: "Varicosities",
        name: "varicosities",
      },
      {
        type: "textarea",
        label: "Skin Changes",
        name: "vascularSkinChanges",
      },
      {
        type: "textarea",
        label: "Vascular Examination Findings",
        name: "vascularExamination",
      },
    ],
  },

  // =========================================================
  // 20. PAST SURGICAL HISTORY
  // =========================================================
  {
    title: "20. Past Surgical History",
    fields: [
      {
        type: "textarea",
        label: "Previous Surgeries",
        name: "previousSurgeries",
      },
      {
        type: "textarea",
        label: "Previous Hospitalizations",
        name: "previousHospitalizations",
      },
      {
        type: "textarea",
        label: "Previous Surgical Complications",
        name: "previousSurgicalComplications",
      },
      {
        type: "textarea",
        label: "Previous Anesthesia Complications",
        name: "previousAnesthesiaComplications",
      },
      {
        type: "textarea",
        label: "Implants / Prostheses",
        name: "implantsProstheses",
      },
    ],
  },

  // =========================================================
  // 21. MEDICAL HISTORY
  // =========================================================
  {
    title: "21. Medical History",
    type: "checkbox",
    fields: [
      ["Diabetes Mellitus", "diabetes"],
      ["Hypertension", "hypertension"],
      ["Heart Disease", "heartDisease"],
      ["Kidney Disease", "kidneyDisease"],
      ["Liver Disease", "liverDisease"],
      ["Lung Disease", "lungDisease"],
      ["Bleeding Disorder", "bleedingDisorder"],
      ["Thyroid Disease", "thyroidDisease"],
      ["Cancer History", "cancerHistory"],
      ["Tuberculosis History", "tuberculosisHistory"],
      ["Previous Stroke", "previousStroke"],
    ],
  },

  // =========================================================
  // 22. MEDICATION HISTORY
  // =========================================================
  {
    title: "22. Medication History",
    fields: [
      {
        type: "textarea",
        label: "Current Medications",
        name: "currentMedications",
        placeholder: "Medicine, dose, frequency, duration",
      },
      {
        type: "textarea",
        label: "Anticoagulants / Antiplatelets",
        name: "anticoagulantsAntiplatelets",
      },
      {
        type: "textarea",
        label: "Steroid Use",
        name: "steroidUse",
      },
      {
        type: "textarea",
        label: "Pain Medications",
        name: "painMedications",
      },
      {
        type: "textarea",
        label: "Drug Allergies",
        name: "drugAllergies",
      },
    ],
  },

  // =========================================================
  // 23. FAMILY HISTORY
  // =========================================================
  {
    title: "23. Family History",
    type: "checkbox",
    fields: [
      ["Family History of Cancer", "familyCancer"],
      ["Family History of Colon Cancer", "familyColonCancer"],
      ["Family History of Breast Cancer", "familyBreastCancerHistory"],
      ["Family History of Thyroid Disease", "familyThyroidDisease"],
      ["Family History of Hernia", "familyHernia"],
      ["Family History of Bleeding Disorder", "familyBleedingDisorder"],
      ["Family History of Other Surgical Disease", "familySurgicalDisease"],
    ],
  },

  // =========================================================
  // 24. SOCIAL HISTORY
  // =========================================================
  {
    title: "24. Social History",
    type: "checkbox",
    fields: [
      ["Current Smoker", "currentSmoker"],
      ["Former Smoker", "formerSmoker"],
      ["Alcohol Use", "alcoholUse"],
      ["Tobacco Use", "tobaccoUse"],
      ["Recreational Drug Use", "recreationalDrugUse"],
    ],
  },

  {
    title: "25. Social History Details",
    fields: [
      {
        type: "textarea",
        label: "Occupation",
        name: "occupation",
      },
      {
        type: "textarea",
        label: "Smoking History",
        name: "smokingHistory",
      },
      {
        type: "textarea",
        label: "Alcohol History",
        name: "alcoholHistory",
      },
      {
        type: "textarea",
        label: "Living / Support Situation",
        name: "livingSupportSituation",
      },
    ],
  },

  // =========================================================
  // 26. VITAL SIGNS
  // =========================================================
  {
    title: "26. Vital Signs",
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
  // 27. GENERAL EXAMINATION
  // =========================================================
  {
    title: "27. General Examination",
    fields: [
      {
        type: "textarea",
        label: "General Appearance",
        name: "generalAppearance",
      },
      {
        type: "textarea",
        label: "Pallor",
        name: "pallor",
      },
      {
        type: "textarea",
        label: "Icterus",
        name: "icterus",
      },
      {
        type: "textarea",
        label: "Cyanosis",
        name: "cyanosis",
      },
      {
        type: "textarea",
        label: "Clubbing",
        name: "clubbing",
      },
      {
        type: "textarea",
        label: "Lymphadenopathy",
        name: "lymphadenopathy",
      },
      {
        type: "textarea",
        label: "Edema",
        name: "generalEdema",
      },
      {
        type: "textarea",
        label: "Hydration Status",
        name: "hydrationStatus",
      },
    ],
  },

  // =========================================================
  // 28. ABDOMINAL EXAMINATION
  // =========================================================
  {
    title: "28. Abdominal Examination",
    fields: [
      {
        type: "textarea",
        label: "Inspection",
        name: "abdominalInspection",
      },
      {
        type: "textarea",
        label: "Palpation",
        name: "abdominalPalpation",
      },
      {
        type: "textarea",
        label: "Tenderness",
        name: "abdominalTenderness",
      },
      {
        type: "textarea",
        label: "Guarding",
        name: "guarding",
      },
      {
        type: "textarea",
        label: "Rigidity",
        name: "rigidity",
      },
      {
        type: "textarea",
        label: "Rebound Tenderness",
        name: "reboundTenderness",
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
        label: "Bowel Sounds",
        name: "bowelSounds",
      },
      {
        type: "textarea",
        label: "Hernial Orifices",
        name: "hernialOrifices",
      },
    ],
  },

  // =========================================================
  // 29. INVESTIGATIONS
  // =========================================================
  {
    title: "29. Laboratory Investigations",
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
        label: "Blood Sugar",
        name: "bloodSugar",
      },
      {
        type: "input",
        label: "Creatinine",
        name: "creatinine",
      },
      {
        type: "input",
        label: "Urea",
        name: "urea",
      },
      {
        type: "input",
        label: "Liver Function",
        name: "liverFunction",
      },
      {
        type: "input",
        label: "Electrolytes",
        name: "electrolytes",
      },
      {
        type: "input",
        label: "PT / INR",
        name: "ptInr",
      },
      {
        type: "input",
        label: "APTT",
        name: "aptt",
      },
      {
        type: "textarea",
        label: "Other Laboratory Findings",
        name: "otherLabFindings",
      },
    ],
  },

  // =========================================================
  // 30. IMAGING
  // =========================================================
  {
    title: "30. Imaging & Diagnostic Studies",
    fields: [
      {
        type: "textarea",
        label: "Ultrasound Findings",
        name: "ultrasoundFindings",
      },
      {
        type: "textarea",
        label: "X-Ray Findings",
        name: "xrayFindings",
      },
      {
        type: "textarea",
        label: "CT Scan Findings",
        name: "ctScanFindings",
      },
      {
        type: "textarea",
        label: "MRI Findings",
        name: "mriFindings",
      },
      {
        type: "textarea",
        label: "Endoscopy Findings",
        name: "endoscopyFindings",
      },
      {
        type: "textarea",
        label: "Colonoscopy Findings",
        name: "colonoscopyFindings",
      },
      {
        type: "textarea",
        label: "Other Diagnostic Findings",
        name: "otherDiagnosticFindings",
      },
    ],
  },

  // =========================================================
  // 31. PREOPERATIVE ASSESSMENT
  // =========================================================
  {
    title: "31. Preoperative Assessment",
    type: "checkbox",
    fields: [
      ["Surgical Candidate", "surgicalCandidate"],
      ["Fit for Surgery", "fitForSurgery"],
      ["Requires Medical Optimization", "requiresMedicalOptimization"],
      ["High Anesthetic Risk", "highAnestheticRisk"],
      ["Bleeding Risk", "bleedingRisk"],
      ["Thromboembolic Risk", "thromboembolicRisk"],
      ["Infection Risk", "infectionRisk"],
      ["Cardiac Risk", "cardiacRisk"],
      ["Pulmonary Risk", "pulmonaryRisk"],
    ],
  },

  {
    title: "32. Preoperative Details",
    fields: [
      {
        type: "input",
        label: "Planned Procedure",
        name: "plannedProcedure",
      },
      {
        type: "input",
        label: "Planned Surgery Date",
        name: "plannedSurgeryDate",
        inputType: "date",
      },
      {
        type: "select",
        label: "Surgical Urgency",
        name: "surgicalUrgency",
        options: [
          "Elective",
          "Semi-Urgent",
          "Urgent",
          "Emergency",
        ],
      },
      {
        type: "textarea",
        label: "Preoperative Optimization",
        name: "preoperativeOptimization",
      },
      {
        type: "textarea",
        label: "Anesthesia Considerations",
        name: "anesthesiaConsiderations",
      },
    ],
  },

  // =========================================================
  // 33. OPERATIVE HISTORY
  // =========================================================
  {
    title: "33. Operative / Procedure History",
    fields: [
      {
        type: "input",
        label: "Procedure Name",
        name: "procedureName",
      },
      {
        type: "input",
        label: "Procedure Date",
        name: "procedureDate",
        inputType: "date",
      },
      {
        type: "textarea",
        label: "Operative Findings",
        name: "operativeFindings",
      },
      {
        type: "textarea",
        label: "Procedure Details",
        name: "procedureDetails",
      },
      {
        type: "textarea",
        label: "Postoperative Complications",
        name: "postoperativeComplications",
      },
    ],
  },

  // =========================================================
  // 34. ASSESSMENT & DIAGNOSIS
  // =========================================================
  {
    title: "34. Assessment & Diagnosis",
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
      {
        type: "textarea",
        label: "Surgical Diagnosis",
        name: "surgicalDiagnosis",
      },
    ],
  },

  // =========================================================
  // 35. TREATMENT / SURGICAL PLAN
  // =========================================================
  {
    title: "35. Treatment & Surgical Plan",
    fields: [
      {
        type: "textarea",
        label: "Medications",
        name: "medications",
        placeholder: "Medicine, dose, frequency, duration",
      },
      {
        type: "textarea",
        label: "Surgical Procedure Planned",
        name: "surgicalProcedurePlanned",
      },
      {
        type: "textarea",
        label: "Conservative Management",
        name: "conservativeManagement",
      },
      {
        type: "textarea",
        label: "Wound Care Plan",
        name: "woundCarePlan",
      },
      {
        type: "textarea",
        label: "Dietary Instructions",
        name: "dietaryInstructions",
      },
      {
        type: "textarea",
        label: "Activity Restrictions",
        name: "activityRestrictions",
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

  // =========================================================
  // 36. FOLLOW-UP
  // =========================================================
  {
    title: "36. Follow-up",
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
          "Preoperative Review",
          "Postoperative Review",
          "Wound Review",
          "Investigation Review",
          "Medication Review",
          "Suture Removal",
          "Emergency",
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