export const rheumatologistSections = [
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
          "Disease Review",
          "Medication Review",
          "Post Hospitalization",
          "Urgent",
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
      ["Joint Pain", "jointPain"],
      ["Joint Swelling", "jointSwelling"],
      ["Joint Stiffness", "jointStiffness"],
      ["Morning Stiffness", "morningStiffness"],
      ["Back Pain", "backPain"],
      ["Neck Pain", "neckPain"],
      ["Muscle Pain", "musclePain"],
      ["Muscle Weakness", "muscleWeakness"],
      ["Fatigue", "fatigue"],
      ["Fever", "fever"],
      ["Skin Rash", "skinRash"],
      ["Dry Eyes", "dryEyes"],
      ["Dry Mouth", "dryMouth"],
      ["Mouth Ulcers", "mouthUlcers"],
      ["Hair Loss", "hairLoss"],
      ["Raynaud's Symptoms", "raynaudsSymptoms"],
      ["Chest Pain", "chestPain"],
      ["Shortness of Breath", "shortnessOfBreath"],
      ["Abdominal Pain", "abdominalPain"],
      ["Weight Loss", "weightLoss"],
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
        label: "Joint Distribution",
        name: "jointDistribution",
      },
      {
        type: "textarea",
        label: "Symmetrical / Asymmetrical Involvement",
        name: "symmetryOfInvolvement",
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
  // 4. JOINT ASSESSMENT
  // =========================================================
  {
    title: "4. Joint Assessment",
    type: "checkbox",
    fields: [
      ["Shoulder Involvement", "shoulderInvolvement"],
      ["Elbow Involvement", "elbowInvolvement"],
      ["Wrist Involvement", "wristInvolvement"],
      ["Hand Involvement", "handInvolvement"],
      ["Finger Joint Involvement", "fingerJointInvolvement"],
      ["Hip Involvement", "hipInvolvement"],
      ["Knee Involvement", "kneeInvolvement"],
      ["Ankle Involvement", "ankleInvolvement"],
      ["Foot Involvement", "footInvolvement"],
      ["Toe Involvement", "toeInvolvement"],
      ["Sacroiliac Involvement", "sacroiliacInvolvement"],
    ],
  },

  // =========================================================
  // 5. INFLAMMATORY SYMPTOMS
  // =========================================================
  {
    title: "5. Inflammatory Symptoms",
    type: "checkbox",
    fields: [
      ["Inflammatory Joint Pain", "inflammatoryJointPain"],
      ["Morning Stiffness > 30 Minutes", "morningStiffnessOver30"],
      ["Night Pain", "nightPain"],
      ["Improvement With Activity", "improvesWithActivity"],
      ["Swelling of Multiple Joints", "multipleJointSwelling"],
      ["Dactylitis", "dactylitis"],
      ["Enthesitis", "enthesitis"],
      ["Inflammatory Back Pain", "inflammatoryBackPain"],
      ["Recurrent Flares", "recurrentFlares"],
    ],
  },

  // =========================================================
  // 6. RHEUMATOID ARTHRITIS
  // =========================================================
  {
    title: "6. Rheumatoid Arthritis Assessment",
    type: "checkbox",
    fields: [
      ["Known Rheumatoid Arthritis", "knownRheumatoidArthritis"],
      ["Symmetrical Polyarthritis", "symmetricalPolyarthritis"],
      ["Small Joint Involvement", "smallJointInvolvement"],
      ["Rheumatoid Nodules", "rheumatoidNodules"],
      ["Morning Stiffness", "raMorningStiffness"],
      ["Functional Limitation", "raFunctionalLimitation"],
      ["Previous Joint Deformity", "previousJointDeformity"],
    ],
  },

  {
    title: "7. Rheumatoid Arthritis Details",
    fields: [
      {
        type: "input",
        label: "RA Duration",
        name: "raDuration",
      },
      {
        type: "input",
        label: "Number of Tender Joints",
        name: "tenderJointCount",
        inputType: "number",
      },
      {
        type: "input",
        label: "Number of Swollen Joints",
        name: "swollenJointCount",
        inputType: "number",
      },
      {
        type: "input",
        label: "DAS28 Score",
        name: "das28Score",
      },
      {
        type: "select",
        label: "Disease Activity",
        name: "raDiseaseActivity",
        options: [
          "Remission",
          "Low",
          "Moderate",
          "High",
          "Not Assessed",
        ],
      },
      {
        type: "textarea",
        label: "RA Disease Assessment",
        name: "raDiseaseAssessment",
      },
    ],
  },

  // =========================================================
  // 8. SLE
  // =========================================================
  {
    title: "8. Systemic Lupus Erythematosus Assessment",
    type: "checkbox",
    fields: [
      ["Known SLE", "knownSle"],
      ["Photosensitivity", "photosensitivity"],
      ["Malar Rash", "malarRash"],
      ["Discoid Rash", "discoidRash"],
      ["Oral / Nasal Ulcers", "oralNasalUlcers"],
      ["Alopecia", "alopecia"],
      ["Serositis", "serositis"],
      ["Renal Involvement", "sleRenalInvolvement"],
      ["Neurological Involvement", "sleNeurologicalInvolvement"],
      ["Hematological Involvement", "sleHematologicalInvolvement"],
      ["Previous Lupus Flare", "previousLupusFlare"],
    ],
  },

  {
    title: "9. SLE Disease Activity",
    fields: [
      {
        type: "input",
        label: "SLE Duration",
        name: "sleDuration",
      },
      {
        type: "select",
        label: "Current Disease Activity",
        name: "sleDiseaseActivity",
        options: [
          "Remission",
          "Low",
          "Moderate",
          "High",
          "Severe Flare",
        ],
      },
      {
        type: "input",
        label: "SLEDAI Score",
        name: "sledaiScore",
      },
      {
        type: "textarea",
        label: "Current Lupus Manifestations",
        name: "currentLupusManifestations",
      },
    ],
  },

  // =========================================================
  // 10. SPONDYLOARTHRITIS
  // =========================================================
  {
    title: "10. Spondyloarthritis Assessment",
    type: "checkbox",
    fields: [
      ["Known Ankylosing Spondylitis", "knownAnkylosingSpondylitis"],
      ["Axial Spondyloarthritis", "axialSpondyloarthritis"],
      ["Psoriatic Arthritis", "psoriaticArthritis"],
      ["Reactive Arthritis", "reactiveArthritis"],
      ["Enteropathic Arthritis", "enteropathicArthritis"],
      ["Inflammatory Back Pain", "spondyloInflammatoryBackPain"],
      ["Enthesitis", "spondyloEnthesitis"],
      ["Dactylitis", "spondyloDactylitis"],
      ["Uveitis", "uveitis"],
      ["Psoriasis", "psoriasis"],
    ],
  },

  // =========================================================
  // 11. OSTEOARTHRITIS
  // =========================================================
  {
    title: "11. Osteoarthritis Assessment",
    type: "checkbox",
    fields: [
      ["Known Osteoarthritis", "knownOsteoarthritis"],
      ["Knee Osteoarthritis", "kneeOsteoarthritis"],
      ["Hip Osteoarthritis", "hipOsteoarthritis"],
      ["Hand Osteoarthritis", "handOsteoarthritis"],
      ["Spine Osteoarthritis", "spineOsteoarthritis"],
      ["Mechanical Joint Pain", "mechanicalJointPain"],
      ["Crepitus", "crepitus"],
      ["Reduced Range of Motion", "reducedRangeOfMotion"],
    ],
  },

  // =========================================================
  // 12. CRYSTAL ARTHRITIS
  // =========================================================
  {
    title: "12. Gout & Crystal Arthritis",
    type: "checkbox",
    fields: [
      ["Known Gout", "knownGout"],
      ["Acute Gout Attack", "acuteGoutAttack"],
      ["Recurrent Gout", "recurrentGout"],
      ["Tophi", "tophi"],
      ["Kidney Stone History", "goutKidneyStoneHistory"],
      ["Pseudogout", "pseudogout"],
    ],
  },

  {
    title: "13. Gout Assessment",
    fields: [
      {
        type: "input",
        label: "Serum Uric Acid",
        name: "serumUricAcid",
      },
      {
        type: "input",
        label: "Number of Flares / Year",
        name: "goutFlaresPerYear",
        inputType: "number",
      },
      {
        type: "select",
        label: "Current Gout Control",
        name: "goutControl",
        options: [
          "Controlled",
          "Partially Controlled",
          "Poorly Controlled",
          "Not Assessed",
        ],
      },
      {
        type: "textarea",
        label: "Gout Treatment History",
        name: "goutTreatmentHistory",
      },
    ],
  },

  // =========================================================
  // 14. VASCULITIS
  // =========================================================
  {
    title: "14. Vasculitis Assessment",
    type: "checkbox",
    fields: [
      ["Known Vasculitis", "knownVasculitis"],
      ["Giant Cell Arteritis", "giantCellArteritis"],
      ["Takayasu Arteritis", "takayasuArteritis"],
      ["Granulomatosis With Polyangiitis", "gpa"],
      ["Microscopic Polyangiitis", "microscopicPolyangiitis"],
      ["Eosinophilic Granulomatosis", "eosinophilicGranulomatosis"],
      ["Polyarteritis Nodosa", "polyarteritisNodosa"],
      ["Behçet Disease", "behcetDisease"],
      ["Skin Vasculitis", "skinVasculitis"],
      ["Neurological Involvement", "vasculitisNeurologicalInvolvement"],
      ["Renal Involvement", "vasculitisRenalInvolvement"],
      ["Pulmonary Involvement", "vasculitisPulmonaryInvolvement"],
    ],
  },

  // =========================================================
  // 15. CONNECTIVE TISSUE DISEASE
  // =========================================================
  {
    title: "15. Connective Tissue Disease",
    type: "checkbox",
    fields: [
      ["Systemic Sclerosis", "systemicSclerosis"],
      ["Sjögren Syndrome", "sjogrenSyndrome"],
      ["Mixed Connective Tissue Disease", "mixedConnectiveTissueDisease"],
      ["Dermatomyositis", "dermatomyositis"],
      ["Polymyositis", "polymyositis"],
      ["Undifferentiated Connective Tissue Disease", "uctd"],
      ["Raynaud's Phenomenon", "raynaudsPhenomenon"],
      ["Skin Thickening", "skinThickening"],
      ["Muscle Weakness", "connectiveTissueMuscleWeakness"],
    ],
  },

  // =========================================================
  // 16. MUSCULOSKELETAL ASSESSMENT
  // =========================================================
  {
    title: "16. Musculoskeletal Assessment",
    fields: [
      {
        type: "textarea",
        label: "Joint Examination",
        name: "jointExamination",
      },
      {
        type: "textarea",
        label: "Range of Motion",
        name: "rangeOfMotion",
      },
      {
        type: "textarea",
        label: "Muscle Strength",
        name: "muscleStrength",
      },
      {
        type: "textarea",
        label: "Muscle Tenderness",
        name: "muscleTenderness",
      },
      {
        type: "textarea",
        label: "Joint Deformities",
        name: "jointDeformities",
      },
      {
        type: "textarea",
        label: "Tender Points",
        name: "tenderPoints",
      },
      {
        type: "textarea",
        label: "Gait Assessment",
        name: "gaitAssessment",
      },
    ],
  },

  // =========================================================
  // 17. SKIN ASSESSMENT
  // =========================================================
  {
    title: "17. Skin & Mucosal Assessment",
    type: "checkbox",
    fields: [
      ["Skin Rash", "skinRashAssessment"],
      ["Malar Rash", "skinMalarRash"],
      ["Psoriatic Lesions", "psoriaticLesions"],
      ["Photosensitivity", "skinPhotosensitivity"],
      ["Skin Ulcers", "skinUlcers"],
      ["Purpura", "purpura"],
      ["Livedo Reticularis", "livedoReticularis"],
      ["Skin Thickening", "skinThickeningAssessment"],
      ["Nail Changes", "nailChanges"],
      ["Oral Ulcers", "skinOralUlcers"],
      ["Dry Mouth", "skinDryMouth"],
    ],
  },

  // =========================================================
  // 18. EYE ASSESSMENT
  // =========================================================
  {
    title: "18. Eye Assessment",
    type: "checkbox",
    fields: [
      ["Dry Eyes", "eyeDryness"],
      ["Red Eye", "redEye"],
      ["Eye Pain", "eyePain"],
      ["Photophobia", "photophobia"],
      ["Uveitis", "eyeUveitis"],
      ["Visual Disturbance", "visualDisturbance"],
    ],
  },

  // =========================================================
  // 19. FAMILY HISTORY
  // =========================================================
  {
    title: "19. Family History",
    type: "checkbox",
    fields: [
      ["Family History of Rheumatoid Arthritis", "familyRa"],
      ["Family History of SLE", "familySle"],
      ["Family History of Psoriasis", "familyPsoriasis"],
      ["Family History of Gout", "familyGout"],
      ["Family History of Ankylosing Spondylitis", "familyAs"],
      ["Family History of Autoimmune Disease", "familyAutoimmuneDisease"],
      ["Family History of Osteoarthritis", "familyOsteoarthritis"],
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
  // 21. DISEASE ACTIVITY
  // =========================================================
  {
    title: "21. Disease Activity Assessment",
    fields: [
      {
        type: "select",
        label: "Overall Disease Activity",
        name: "overallDiseaseActivity",
        options: [
          "Remission",
          "Low",
          "Moderate",
          "High",
          "Severe",
          "Not Assessed",
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
        type: "input",
        label: "Fatigue Score (0–10)",
        name: "fatigueScore",
        inputType: "number",
        min: "0",
        max: "10",
      },
      {
        type: "input",
        label: "Patient Global Assessment (0–10)",
        name: "patientGlobalAssessment",
        inputType: "number",
        min: "0",
        max: "10",
      },
      {
        type: "textarea",
        label: "Disease Activity Notes",
        name: "diseaseActivityNotes",
      },
    ],
  },

  // =========================================================
  // 22. FUNCTIONAL ASSESSMENT
  // =========================================================
  {
    title: "22. Functional Assessment",
    fields: [
      {
        type: "select",
        label: "Functional Status",
        name: "functionalStatus",
        options: [
          "Normal",
          "Mild Limitation",
          "Moderate Limitation",
          "Severe Limitation",
          "Dependent",
        ],
      },
      {
        type: "textarea",
        label: "Activities of Daily Living",
        name: "activitiesOfDailyLiving",
      },
      {
        type: "textarea",
        label: "Work Limitation",
        name: "workLimitation",
      },
      {
        type: "textarea",
        label: "Mobility Limitation",
        name: "mobilityLimitation",
      },
      {
        type: "textarea",
        label: "Functional Assessment Notes",
        name: "functionalAssessmentNotes",
      },
    ],
  },

  // =========================================================
  // 23. MEDICATION HISTORY
  // =========================================================
  {
    title: "23. Medication History",
    fields: [
      {
        type: "textarea",
        label: "Current Medications",
        name: "currentMedications",
        placeholder: "Medicine, dose, frequency, duration",
      },
      {
        type: "textarea",
        label: "Previous Medications",
        name: "previousMedications",
      },
      {
        type: "textarea",
        label: "NSAID Use",
        name: "nsaidUse",
      },
      {
        type: "textarea",
        label: "Steroid Use",
        name: "steroidUse",
      },
      {
        type: "textarea",
        label: "DMARD History",
        name: "dmardHistory",
      },
      {
        type: "textarea",
        label: "Biologic Therapy History",
        name: "biologicTherapyHistory",
      },
      {
        type: "textarea",
        label: "Drug Allergies",
        name: "drugAllergies",
      },
    ],
  },

  // =========================================================
  // 24. DMARD ASSESSMENT
  // =========================================================
  {
    title: "24. DMARD / Immunosuppressive Therapy",
    type: "checkbox",
    fields: [
      ["Methotrexate", "methotrexate"],
      ["Hydroxychloroquine", "hydroxychloroquine"],
      ["Sulfasalazine", "sulfasalazine"],
      ["Leflunomide", "leflunomide"],
      ["Azathioprine", "azathioprine"],
      ["Mycophenolate", "mycophenolate"],
      ["Cyclosporine", "cyclosporine"],
      ["Tacrolimus", "tacrolimus"],
      ["Cyclophosphamide", "cyclophosphamide"],
      ["Biologic Therapy", "biologicTherapy"],
      ["JAK Inhibitor", "jakInhibitor"],
    ],
  },

  // =========================================================
  // 25. LABORATORY INVESTIGATIONS
  // =========================================================
  {
    title: "25. Laboratory Investigations",
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
        label: "ESR",
        name: "esr",
      },
      {
        type: "input",
        label: "CRP",
        name: "crp",
      },
      {
        type: "input",
        label: "Creatinine",
        name: "creatinine",
      },
      {
        type: "input",
        label: "Liver Function",
        name: "liverFunction",
      },
      {
        type: "input",
        label: "Uric Acid",
        name: "uricAcid",
      },
      {
        type: "textarea",
        label: "Other Laboratory Findings",
        name: "otherLabFindings",
      },
    ],
  },

  // =========================================================
  // 26. AUTOIMMUNE LABORATORY
  // =========================================================
  {
    title: "26. Autoimmune / Rheumatology Investigations",
    fields: [
      {
        type: "input",
        label: "ANA",
        name: "ana",
      },
      {
        type: "input",
        label: "ANA Titer / Pattern",
        name: "anaTiterPattern",
      },
      {
        type: "input",
        label: "Rheumatoid Factor",
        name: "rheumatoidFactor",
      },
      {
        type: "input",
        label: "Anti-CCP",
        name: "antiCcp",
      },
      {
        type: "input",
        label: "Anti-dsDNA",
        name: "antiDsdna",
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
        label: "ANCA",
        name: "anca",
      },
      {
        type: "input",
        label: "Anti-SSA / Ro",
        name: "antiSsa",
      },
      {
        type: "input",
        label: "Anti-SSB / La",
        name: "antiSsb",
      },
      {
        type: "input",
        label: "HLA-B27",
        name: "hlaB27",
      },
      {
        type: "textarea",
        label: "Autoimmune Workup Interpretation",
        name: "autoimmuneInterpretation",
      },
    ],
  },

  // =========================================================
  // 27. MUSCLE / MYOSITIS WORKUP
  // =========================================================
  {
    title: "27. Muscle & Myositis Workup",
    fields: [
      {
        type: "input",
        label: "Creatine Kinase (CK)",
        name: "creatineKinase",
      },
      {
        type: "input",
        label: "Aldolase",
        name: "aldolase",
      },
      {
        type: "input",
        label: "LDH",
        name: "ldh",
      },
      {
        type: "input",
        label: "Myositis Antibody Panel",
        name: "myositisAntibodyPanel",
      },
      {
        type: "textarea",
        label: "Muscle MRI Findings",
        name: "muscleMriFindings",
      },
      {
        type: "textarea",
        label: "EMG Findings",
        name: "emgFindings",
      },
      {
        type: "textarea",
        label: "Muscle Biopsy Findings",
        name: "muscleBiopsyFindings",
      },
    ],
  },

  // =========================================================
  // 28. IMAGING
  // =========================================================
  {
    title: "28. Imaging & Joint Studies",
    fields: [
      {
        type: "textarea",
        label: "X-Ray Findings",
        name: "xrayFindings",
      },
      {
        type: "textarea",
        label: "Ultrasound Joint Findings",
        name: "ultrasoundJointFindings",
      },
      {
        type: "textarea",
        label: "MRI Joint Findings",
        name: "mriJointFindings",
      },
      {
        type: "textarea",
        label: "CT Findings",
        name: "ctFindings",
      },
      {
        type: "textarea",
        label: "Bone Density / DEXA",
        name: "dexaFindings",
      },
      {
        type: "textarea",
        label: "Other Imaging Findings",
        name: "otherImagingFindings",
      },
    ],
  },

  // =========================================================
  // 29. BONE HEALTH
  // =========================================================
  {
    title: "29. Bone Health & Osteoporosis",
    type: "checkbox",
    fields: [
      ["Known Osteoporosis", "knownOsteoporosis"],
      ["Osteopenia", "osteopenia"],
      ["Previous Fragility Fracture", "fragilityFracture"],
      ["Vertebral Fracture", "vertebralFracture"],
      ["Long-Term Steroid Use", "longTermSteroidUse"],
      ["Vitamin D Deficiency", "vitaminDDeficiency"],
      ["Calcium Deficiency", "calciumDeficiency"],
      ["Fall Risk", "fallRisk"],
    ],
  },

  {
    title: "30. Bone Health Details",
    fields: [
      {
        type: "input",
        label: "Vitamin D",
        name: "vitaminD",
      },
      {
        type: "input",
        label: "Calcium",
        name: "calcium",
      },
      {
        type: "input",
        label: "DEXA T-Score",
        name: "dexaTScore",
      },
      {
        type: "input",
        label: "DEXA Z-Score",
        name: "dexaZScore",
      },
      {
        type: "textarea",
        label: "Fracture History",
        name: "fractureHistory",
      },
      {
        type: "textarea",
        label: "Bone Health Plan",
        name: "boneHealthPlan",
      },
    ],
  },

  // =========================================================
  // 31. ASSESSMENT & DIAGNOSIS
  // =========================================================
  {
    title: "31. Assessment & Diagnosis",
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
        label: "Disease Activity Summary",
        name: "diseaseActivitySummary",
      },
    ],
  },

  // =========================================================
  // 32. TREATMENT PLAN
  // =========================================================
  {
    title: "32. Treatment Plan",
    fields: [
      {
        type: "textarea",
        label: "Medications",
        name: "medications",
        placeholder: "Medicine, dose, frequency, duration",
      },
      {
        type: "textarea",
        label: "DMARD Plan",
        name: "dmardPlan",
      },
      {
        type: "textarea",
        label: "Biologic Therapy Plan",
        name: "biologicTherapyPlan",
      },
      {
        type: "textarea",
        label: "Steroid Plan",
        name: "steroidPlan",
      },
      {
        type: "textarea",
        label: "Pain Management",
        name: "painManagement",
      },
      {
        type: "textarea",
        label: "Physiotherapy / Exercise",
        name: "physiotherapyExercise",
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
  // 33. FOLLOW-UP
  // =========================================================
  {
    title: "33. Follow-up",
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
          "Disease Activity Review",
          "RA Review",
          "SLE Review",
          "Gout Review",
          "Vasculitis Review",
          "Medication Review",
          "Lab Review",
          "Imaging Review",
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