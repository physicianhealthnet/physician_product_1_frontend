// oncologistAssessment.js

export const oncologistAssessmentSections = [
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
      },
      {
        type: "select",
        label: "Gender",
        name: "gender",
        options: ["Male", "Female", "Other"],
      },
      {
        type: "select",
        label: "Visit Type",
        name: "visitType",
        options: [
          "New Consultation",
          "Follow-up",
          "Treatment Review",
          "Chemotherapy Review",
          "Radiotherapy Review",
          "Post-treatment Follow-up",
          "Surveillance",
          "Second Opinion",
        ],
      },
    ],
  },

  // =========================================================
  // 2. CHIEF COMPLAINT
  // =========================================================
  {
    title: "2. Chief Complaints",
    type: "checkbox",
    fields: [
      ["Pain", "pain"],
      ["Unexplained Weight Loss", "unexplainedWeightLoss"],
      ["Fatigue", "fatigue"],
      ["Fever", "fever"],
      ["Night Sweats", "nightSweats"],
      ["Loss of Appetite", "lossOfAppetite"],
      ["Nausea", "nausea"],
      ["Vomiting", "vomiting"],
      ["Bleeding", "bleeding"],
      ["Lump / Mass", "lumpMass"],
      ["Difficulty Swallowing", "difficultySwallowing"],
      ["Breathing Difficulty", "breathingDifficulty"],
      ["Persistent Cough", "persistentCough"],
      ["Bowel Changes", "bowelChanges"],
      ["Urinary Changes", "urinaryChanges"],
      ["Neurological Symptoms", "neurologicalSymptoms"],
      ["Skin Changes", "skinChanges"],
      ["Other Symptoms", "otherSymptoms"],
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
        type: "input",
        label: "Symptom Onset",
        name: "symptomOnset",
      },
      {
        type: "input",
        label: "Symptom Duration",
        name: "symptomDuration",
      },
      {
        type: "textarea",
        label: "Course of Symptoms",
        name: "courseOfSymptoms",
      },
      {
        type: "textarea",
        label: "Associated Symptoms",
        name: "associatedSymptoms",
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
        label: "Previous Evaluation",
        name: "previousEvaluation",
      },
    ],
  },

  // =========================================================
  // 4. CANCER HISTORY
  // =========================================================
  {
    title: "4. Cancer History",
    fields: [
      {
        type: "input",
        label: "Cancer Type",
        name: "cancerType",
      },
      {
        type: "input",
        label: "Primary Site",
        name: "primarySite",
      },
      {
        type: "input",
        label: "Date of Diagnosis",
        name: "dateOfDiagnosis",
        inputType: "date",
      },
      {
        type: "select",
        label: "Disease Status",
        name: "diseaseStatus",
        options: [
          "Newly Diagnosed",
          "Active Disease",
          "Stable Disease",
          "Partial Response",
          "Complete Response",
          "Recurrent Disease",
          "Progressive Disease",
          "Remission",
          "Unknown",
        ],
      },
      {
        type: "input",
        label: "Histological Type",
        name: "histologicalType",
      },
      {
        type: "input",
        label: "Tumor Grade",
        name: "tumorGrade",
      },
      {
        type: "input",
        label: "TNM Stage",
        name: "tnmStage",
      },
      {
        type: "input",
        label: "Clinical Stage",
        name: "clinicalStage",
      },
    ],
  },

  // =========================================================
  // 5. PATHOLOGY
  // =========================================================
  {
    title: "5. Pathology & Histopathology",
    fields: [
      {
        type: "textarea",
        label: "Biopsy Report",
        name: "biopsyReport",
      },
      {
        type: "textarea",
        label: "Histopathology Findings",
        name: "histopathologyFindings",
      },
      {
        type: "textarea",
        label: "Cytology Findings",
        name: "cytologyFindings",
      },
      {
        type: "textarea",
        label: "Immunohistochemistry Findings",
        name: "immunohistochemistry",
      },
      {
        type: "textarea",
        label: "Molecular / Genetic Testing",
        name: "molecularGeneticTesting",
      },
      {
        type: "textarea",
        label: "Biomarker Results",
        name: "biomarkerResults",
      },
    ],
  },

  // =========================================================
  // 6. IMAGING
  // =========================================================
  {
    title: "6. Imaging & Investigations",
    type: "checkbox",
    fields: [
      ["X-Ray", "xray"],
      ["Ultrasound", "ultrasound"],
      ["CT Scan", "ctScan"],
      ["MRI", "mri"],
      ["PET Scan", "petScan"],
      ["Bone Scan", "boneScan"],
      ["Mammography", "mammography"],
      ["Endoscopy", "endoscopy"],
      ["Other Imaging", "otherImaging"],
    ],
  },

  {
    title: "7. Imaging Findings",
    fields: [
      {
        type: "textarea",
        label: "CT Findings",
        name: "ctFindings",
      },
      {
        type: "textarea",
        label: "MRI Findings",
        name: "mriFindings",
      },
      {
        type: "textarea",
        label: "PET Findings",
        name: "petFindings",
      },
      {
        type: "textarea",
        label: "Other Imaging Findings",
        name: "otherImagingFindings",
      },
      {
        type: "textarea",
        label: "Metastatic Sites",
        name: "metastaticSites",
      },
    ],
  },

  // =========================================================
  // 8. PREVIOUS CANCER TREATMENT
  // =========================================================
  {
    title: "8. Previous Cancer Treatment",
    type: "checkbox",
    fields: [
      ["Surgery", "previousSurgery"],
      ["Chemotherapy", "previousChemotherapy"],
      ["Radiotherapy", "previousRadiotherapy"],
      ["Immunotherapy", "previousImmunotherapy"],
      ["Targeted Therapy", "previousTargetedTherapy"],
      ["Hormonal Therapy", "previousHormonalTherapy"],
      ["Stem Cell Transplant", "previousStemCellTransplant"],
      ["Clinical Trial", "previousClinicalTrial"],
    ],
  },

  {
    title: "9. Previous Treatment Details",
    fields: [
      {
        type: "textarea",
        label: "Previous Surgery Details",
        name: "previousSurgeryDetails",
      },
      {
        type: "textarea",
        label: "Previous Chemotherapy Regimen",
        name: "previousChemotherapyRegimen",
      },
      {
        type: "textarea",
        label: "Previous Radiotherapy",
        name: "previousRadiotherapyDetails",
      },
      {
        type: "textarea",
        label: "Previous Immunotherapy",
        name: "previousImmunotherapyDetails",
      },
      {
        type: "textarea",
        label: "Previous Targeted Therapy",
        name: "previousTargetedTherapyDetails",
      },
      {
        type: "textarea",
        label: "Treatment Response",
        name: "previousTreatmentResponse",
      },
      {
        type: "textarea",
        label: "Treatment Complications",
        name: "previousTreatmentComplications",
      },
    ],
  },

  // =========================================================
  // 10. CURRENT TREATMENT
  // =========================================================
  {
    title: "10. Current Cancer Treatment",
    type: "checkbox",
    fields: [
      ["Chemotherapy", "currentChemotherapy"],
      ["Radiotherapy", "currentRadiotherapy"],
      ["Immunotherapy", "currentImmunotherapy"],
      ["Targeted Therapy", "currentTargetedTherapy"],
      ["Hormonal Therapy", "currentHormonalTherapy"],
      ["Surgery Planned", "surgeryPlanned"],
      ["Supportive Care", "supportiveCare"],
      ["Palliative Treatment", "palliativeTreatment"],
      ["Clinical Trial", "clinicalTrial"],
    ],
  },

  {
    title: "11. Current Treatment Details",
    fields: [
      {
        type: "textarea",
        label: "Current Treatment Regimen",
        name: "currentTreatmentRegimen",
      },
      {
        type: "input",
        label: "Treatment Cycle / Session",
        name: "treatmentCycleSession",
      },
      {
        type: "input",
        label: "Treatment Start Date",
        name: "treatmentStartDate",
        inputType: "date",
      },
      {
        type: "textarea",
        label: "Treatment Response",
        name: "currentTreatmentResponse",
      },
      {
        type: "textarea",
        label: "Treatment Tolerance",
        name: "treatmentTolerance",
      },
    ],
  },

  // =========================================================
  // 12. CHEMOTHERAPY TOXICITY
  // =========================================================
  {
    title: "12. Treatment Toxicity / Side Effects",
    type: "checkbox",
    fields: [
      ["Nausea / Vomiting", "treatmentNauseaVomiting"],
      ["Fatigue", "treatmentFatigue"],
      ["Hair Loss", "hairLoss"],
      ["Mucositis", "mucositis"],
      ["Neuropathy", "neuropathy"],
      ["Myelosuppression", "myelosuppression"],
      ["Anemia", "anemia"],
      ["Neutropenia", "neutropenia"],
      ["Thrombocytopenia", "thrombocytopenia"],
      ["Infection", "treatmentInfection"],
      ["Skin Toxicity", "skinToxicity"],
      ["Diarrhea", "treatmentDiarrhea"],
      ["Constipation", "treatmentConstipation"],
      ["Organ Toxicity", "organToxicity"],
      ["Other Side Effects", "otherTreatmentSideEffects"],
    ],
  },

  {
    title: "13. Treatment Toxicity Details",
    fields: [
      {
        type: "textarea",
        label: "Treatment Side Effects",
        name: "treatmentSideEffects",
      },
      {
        type: "textarea",
        label: "Severity of Toxicity",
        name: "toxicitySeverity",
      },
      {
        type: "textarea",
        label: "Management of Side Effects",
        name: "toxicityManagement",
      },
    ],
  },

  // =========================================================
  // 14. MEDICAL HISTORY
  // =========================================================
  {
    title: "14. Past Medical History",
    type: "checkbox",
    fields: [
      ["Diabetes", "diabetes"],
      ["Hypertension", "hypertension"],
      ["Heart Disease", "heartDisease"],
      ["Kidney Disease", "kidneyDisease"],
      ["Liver Disease", "liverDisease"],
      ["Lung Disease", "lungDisease"],
      ["Thyroid Disease", "thyroidDisease"],
      ["Neurological Disease", "neurologicalDisease"],
      ["Previous Cancer", "previousCancer"],
      ["Other Chronic Disease", "otherChronicDisease"],
    ],
  },

  {
    title: "15. Medical History Details",
    fields: [
      {
        type: "textarea",
        label: "Relevant Medical History",
        name: "relevantMedicalHistory",
      },
      {
        type: "textarea",
        label: "Previous Cancer History",
        name: "previousCancerHistory",
      },
      {
        type: "textarea",
        label: "Previous Major Illness / Surgery",
        name: "previousMajorIllnessSurgery",
      },
    ],
  },

  // =========================================================
  // 16. FAMILY HISTORY
  // =========================================================
  {
    title: "16. Family Cancer History",
    type: "checkbox",
    fields: [
      ["Breast Cancer", "familyBreastCancer"],
      ["Lung Cancer", "familyLungCancer"],
      ["Colon Cancer", "familyColonCancer"],
      ["Prostate Cancer", "familyProstateCancer"],
      ["Ovarian Cancer", "familyOvarianCancer"],
      ["Pancreatic Cancer", "familyPancreaticCancer"],
      ["Liver Cancer", "familyLiverCancer"],
      ["Stomach Cancer", "familyStomachCancer"],
      ["Blood Cancer", "familyBloodCancer"],
      ["Other Cancer", "familyOtherCancer"],
    ],
  },

  {
    title: "17. Family History Details",
    fields: [
      {
        type: "textarea",
        label: "Family Cancer History",
        name: "familyCancerHistory",
      },
      {
        type: "textarea",
        label: "Genetic / Hereditary Cancer History",
        name: "hereditaryCancerHistory",
      },
    ],
  },

  // =========================================================
  // 18. SOCIAL HISTORY
  // =========================================================
  {
    title: "18. Social & Lifestyle History",
    type: "checkbox",
    fields: [
      ["Smoking", "smoking"],
      ["Alcohol Use", "alcoholUse"],
      ["Tobacco / Chewing Tobacco", "tobaccoUse"],
      ["Occupational Exposure", "occupationalExposure"],
      ["Radiation Exposure", "radiationExposure"],
      ["Chemical Exposure", "chemicalExposure"],
      ["Poor Nutrition", "poorNutrition"],
      ["Sedentary Lifestyle", "sedentaryLifestyle"],
    ],
  },

  {
    title: "19. Social History Details",
    fields: [
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
        label: "Occupational Exposure",
        name: "occupationalExposureDetails",
      },
      {
        type: "textarea",
        label: "Lifestyle History",
        name: "lifestyleHistory",
      },
    ],
  },

  // =========================================================
  // 20. NUTRITION
  // =========================================================
  {
    title: "20. Nutritional Assessment",
    fields: [
      {
        type: "input",
        label: "Weight",
        name: "weight",
      },
      {
        type: "input",
        label: "Height",
        name: "height",
      },
      {
        type: "input",
        label: "BMI",
        name: "bmi",
      },
      {
        type: "input",
        label: "Recent Weight Loss",
        name: "recentWeightLoss",
      },
      {
        type: "select",
        label: "Nutritional Status",
        name: "nutritionalStatus",
        options: [
          "Normal",
          "At Risk",
          "Malnourished",
          "Severely Malnourished",
        ],
      },
      {
        type: "textarea",
        label: "Nutritional Concerns",
        name: "nutritionalConcerns",
      },
    ],
  },

  // =========================================================
  // 21. PAIN ASSESSMENT
  // =========================================================
  {
    title: "21. Pain Assessment",
    fields: [
      {
        type: "select",
        label: "Pain Present",
        name: "painPresent",
        options: ["Yes", "No"],
      },
      {
        type: "input",
        label: "Pain Score (0-10)",
        name: "painScore",
      },
      {
        type: "input",
        label: "Pain Location",
        name: "painLocation",
      },
      {
        type: "select",
        label: "Pain Character",
        name: "painCharacter",
        options: [
          "Dull",
          "Sharp",
          "Burning",
          "Cramping",
          "Throbbing",
          "Stabbing",
          "Other",
        ],
      },
      {
        type: "textarea",
        label: "Pain Details",
        name: "painDetails",
      },
      {
        type: "textarea",
        label: "Current Pain Management",
        name: "painManagement",
      },
    ],
  },

  // =========================================================
  // 22. LABORATORY
  // =========================================================
  {
    title: "22. Laboratory Investigations",
    fields: [
      {
        type: "textarea",
        label: "CBC",
        name: "cbc",
      },
      {
        type: "textarea",
        label: "Renal Function",
        name: "renalFunction",
      },
      {
        type: "textarea",
        label: "Liver Function",
        name: "liverFunction",
      },
      {
        type: "textarea",
        label: "Electrolytes",
        name: "electrolytes",
      },
      {
        type: "textarea",
        label: "Tumor Markers",
        name: "tumorMarkers",
      },
      {
        type: "textarea",
        label: "Other Laboratory Results",
        name: "otherLaboratoryResults",
      },
    ],
  },

  // =========================================================
  // 23. PERFORMANCE STATUS
  // =========================================================
  {
    title: "23. Performance & Functional Status",
    fields: [
      {
        type: "select",
        label: "ECOG Performance Status",
        name: "ecogPerformanceStatus",
        options: [
          "0 - Fully Active",
          "1 - Restricted in Strenuous Activity",
          "2 - Ambulatory and Capable of Self-Care",
          "3 - Limited Self-Care",
          "4 - Completely Disabled",
          "5 - Dead",
          "Not Assessed",
        ],
      },
      {
        type: "select",
        label: "Karnofsky Performance Status",
        name: "karnofskyPerformanceStatus",
        options: [
          "100",
          "90",
          "80",
          "70",
          "60",
          "50",
          "40",
          "30",
          "20",
          "10",
          "0",
          "Not Assessed",
        ],
      },
      {
        type: "textarea",
        label: "Functional Limitations",
        name: "functionalLimitations",
      },
    ],
  },

  // =========================================================
  // 24. PSYCHOSOCIAL
  // =========================================================
  {
    title: "24. Psychosocial Assessment",
    type: "checkbox",
    fields: [
      ["Anxiety", "anxiety"],
      ["Depression", "depression"],
      ["Fear of Cancer Recurrence", "fearOfRecurrence"],
      ["Financial Stress", "financialStress"],
      ["Family Stress", "familyStress"],
      ["Social Isolation", "socialIsolation"],
      ["Treatment Adherence Concern", "treatmentAdherenceConcern"],
      ["Caregiver Burden", "caregiverBurden"],
    ],
  },

  {
    title: "25. Psychosocial Details",
    fields: [
      {
        type: "textarea",
        label: "Emotional Concerns",
        name: "emotionalConcerns",
      },
      {
        type: "textarea",
        label: "Family Support",
        name: "familySupport",
      },
      {
        type: "textarea",
        label: "Financial / Social Concerns",
        name: "financialSocialConcerns",
      },
      {
        type: "textarea",
        label: "Psychosocial Support Required",
        name: "psychosocialSupportRequired",
      },
    ],
  },

  // =========================================================
  // 26. PALLIATIVE / SUPPORTIVE CARE
  // =========================================================
  {
    title: "26. Supportive & Palliative Care",
    type: "checkbox",
    fields: [
      ["Pain Management", "palliativePainManagement"],
      ["Symptom Control", "symptomControl"],
      ["Nutritional Support", "nutritionalSupport"],
      ["Psychological Support", "psychologicalSupport"],
      ["Palliative Care Referral", "palliativeCareReferral"],
      ["Physiotherapy", "physiotherapy"],
      ["Social Work Support", "socialWorkSupport"],
      ["Home Care", "homeCare"],
      ["Hospice Discussion", "hospiceDiscussion"],
    ],
  },

  {
    title: "27. Supportive Care Details",
    fields: [
      {
        type: "textarea",
        label: "Supportive Care Plan",
        name: "supportiveCarePlan",
      },
      {
        type: "textarea",
        label: "Palliative Care Plan",
        name: "palliativeCarePlan",
      },
      {
        type: "textarea",
        label: "Symptom Management Plan",
        name: "symptomManagementPlan",
      },
    ],
  },

  // =========================================================
  // 28. CLINICAL ASSESSMENT
  // =========================================================
  {
    title: "28. Clinical Assessment",
    fields: [
      {
        type: "textarea",
        label: "Clinical Findings",
        name: "clinicalFindings",
      },
      {
        type: "textarea",
        label: "Disease Assessment",
        name: "diseaseAssessment",
      },
      {
        type: "textarea",
        label: "Treatment Response Assessment",
        name: "treatmentResponseAssessment",
      },
      {
        type: "textarea",
        label: "Prognostic Considerations",
        name: "prognosticConsiderations",
      },
      {
        type: "textarea",
        label: "Clinical Impression",
        name: "clinicalImpression",
      },
    ],
  },

  // =========================================================
  // 29. DIAGNOSIS
  // =========================================================
  {
    title: "29. Diagnosis",
    fields: [
      {
        type: "textarea",
        label: "Primary Diagnosis",
        name: "primaryDiagnosis",
      },
      {
        type: "textarea",
        label: "Secondary Diagnosis",
        name: "secondaryDiagnosis",
      },
      {
        type: "textarea",
        label: "Cancer Stage / Classification",
        name: "cancerStageClassification",
      },
      {
        type: "textarea",
        label: "Differential Diagnosis",
        name: "differentialDiagnosis",
      },
    ],
  },

  // =========================================================
  // 30. TREATMENT PLAN
  // =========================================================
  {
    title: "30. Treatment Plan",
    type: "checkbox",
    fields: [
      ["Surgery Referral", "surgeryReferral"],
      ["Chemotherapy", "treatmentChemotherapy"],
      ["Radiotherapy", "treatmentRadiotherapy"],
      ["Immunotherapy", "treatmentImmunotherapy"],
      ["Targeted Therapy", "treatmentTargetedTherapy"],
      ["Hormonal Therapy", "treatmentHormonalTherapy"],
      ["Clinical Trial", "treatmentClinicalTrial"],
      ["Supportive Care", "treatmentSupportiveCare"],
      ["Palliative Care", "treatmentPalliativeCare"],
      ["Observation / Surveillance", "observationSurveillance"],
    ],
  },

  {
    title: "31. Treatment Plan Details",
    fields: [
      {
        type: "textarea",
        label: "Recommended Treatment",
        name: "recommendedTreatment",
      },
      {
        type: "textarea",
        label: "Chemotherapy Plan",
        name: "chemotherapyPlan",
      },
      {
        type: "textarea",
        label: "Radiotherapy Plan",
        name: "radiotherapyPlan",
      },
      {
        type: "textarea",
        label: "Systemic Therapy Plan",
        name: "systemicTherapyPlan",
      },
      {
        type: "textarea",
        label: "Supportive Medication Plan",
        name: "supportiveMedicationPlan",
      },
      {
        type: "textarea",
        label: "Patient Counselling",
        name: "patientCounselling",
      },
    ],
  },

  // =========================================================
  // 32. FOLLOW-UP
  // =========================================================
  {
    title: "32. Follow-up Plan",
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
          "Routine Follow-up",
          "Treatment Review",
          "Post-Chemotherapy Review",
          "Post-Radiotherapy Review",
          "Post-Surgery Review",
          "Surveillance",
          "Urgent Review",
          "As Required",
        ],
      },
      {
        type: "textarea",
        label: "Investigations Before Follow-up",
        name: "investigationsBeforeFollowUp",
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