export const pulmonologistSections = [
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
          "Emergency",
          "Respiratory Review",
          "Post Hospitalization",
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

  // =========================================================
  // 2. CHIEF COMPLAINTS
  // =========================================================
  {
    title: "2. Chief Complaints",
    type: "checkbox",
    fields: [
      ["Cough", "cough"],
      ["Dry Cough", "dryCough"],
      ["Productive Cough", "productiveCough"],
      ["Breathlessness", "breathlessness"],
      ["Shortness of Breath", "shortnessOfBreath"],
      ["Wheezing", "wheezing"],
      ["Chest Tightness", "chestTightness"],
      ["Chest Pain", "chestPain"],
      ["Coughing Blood", "hemoptysis"],
      ["Fever", "fever"],
      ["Night Sweats", "nightSweats"],
      ["Fatigue", "fatigue"],
      ["Snoring", "snoring"],
      ["Daytime Sleepiness", "daytimeSleepiness"],
      ["Sleep Disturbance", "sleepDisturbance"],
      ["Recurrent Respiratory Infection", "recurrentRespiratoryInfection"],
      ["Sputum Production", "sputumProduction"],
      ["Voice Change", "voiceChange"],
      ["Exercise Intolerance", "exerciseIntolerance"],
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
        label: "Frequency of Symptoms",
        name: "symptomFrequency",
      },
      {
        type: "textarea",
        label: "Triggering Factors",
        name: "triggeringFactors",
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
      {
        type: "textarea",
        label: "Previous Respiratory Treatment",
        name: "previousRespiratoryTreatment",
      },
    ],
  },

  // =========================================================
  // 4. RESPIRATORY SYMPTOMS
  // =========================================================
  {
    title: "4. Respiratory Symptoms",
    type: "checkbox",
    fields: [
      ["Morning Cough", "morningCough"],
      ["Night Cough", "nightCough"],
      ["Exertional Breathlessness", "exertionalBreathlessness"],
      ["Breathlessness at Rest", "breathlessnessAtRest"],
      ["Paroxysmal Nocturnal Dyspnea", "paroxysmalNocturnalDyspnea"],
      ["Orthopnea", "orthopnea"],
      ["Wheezing", "respiratoryWheezing"],
      ["Chest Tightness", "respiratoryChestTightness"],
      ["Purulent Sputum", "purulentSputum"],
      ["Blood-Stained Sputum", "bloodStainedSputum"],
      ["Pleural Pain", "pleuralPain"],
      ["Stridor", "stridor"],
    ],
  },

  // =========================================================
  // 5. ASTHMA ASSESSMENT
  // =========================================================
  {
    title: "5. Asthma Assessment",
    type: "checkbox",
    fields: [
      ["Known Asthma", "knownAsthma"],
      ["Childhood Asthma", "childhoodAsthma"],
      ["Adult-Onset Asthma", "adultOnsetAsthma"],
      ["Exercise-Induced Symptoms", "exerciseInducedSymptoms"],
      ["Allergy-Related Symptoms", "allergyRelatedSymptoms"],
      ["Nocturnal Symptoms", "nocturnalAsthmaSymptoms"],
      ["Frequent Exacerbations", "frequentAsthmaExacerbations"],
      ["Previous ICU Admission", "previousAsthmaIcu"],
      ["Previous Intubation", "previousAsthmaIntubation"],
    ],
  },

  {
    title: "6. Asthma Control",
    fields: [
      {
        type: "select",
        label: "Asthma Control",
        name: "asthmaControl",
        options: [
          "Well Controlled",
          "Partly Controlled",
          "Poorly Controlled",
          "Not Assessed",
        ],
      },
      {
        type: "input",
        label: "Daytime Symptoms / Week",
        name: "daytimeSymptomsPerWeek",
        inputType: "number",
      },
      {
        type: "input",
        label: "Night Awakenings / Week",
        name: "nightAwakeningsPerWeek",
        inputType: "number",
      },
      {
        type: "input",
        label: "Reliever Use / Week",
        name: "relieverUsePerWeek",
        inputType: "number",
      },
      {
        type: "input",
        label: "Activity Limitation",
        name: "activityLimitation",
      },
      {
        type: "textarea",
        label: "Asthma Control Notes",
        name: "asthmaControlNotes",
      },
    ],
  },

  // =========================================================
  // 7. COPD ASSESSMENT
  // =========================================================
  {
    title: "7. COPD Assessment",
    type: "checkbox",
    fields: [
      ["Known COPD", "knownCopd"],
      ["Chronic Bronchitis", "chronicBronchitis"],
      ["Emphysema", "emphysema"],
      ["Frequent Exacerbations", "copdFrequentExacerbations"],
      ["Previous Hospitalization", "copdPreviousHospitalization"],
      ["Previous ICU Admission", "copdPreviousIcu"],
      ["Home Oxygen Use", "homeOxygenUse"],
      ["Pulmonary Rehabilitation", "pulmonaryRehabilitation"],
    ],
  },

  {
    title: "8. COPD Assessment Details",
    fields: [
      {
        type: "input",
        label: "COPD Duration",
        name: "copdDuration",
      },
      {
        type: "input",
        label: "Number of Exacerbations / Year",
        name: "copdExacerbationsPerYear",
        inputType: "number",
      },
      {
        type: "input",
        label: "Previous Hospitalizations",
        name: "copdHospitalizations",
        inputType: "number",
      },
      {
        type: "textarea",
        label: "COPD Functional Limitation",
        name: "copdFunctionalLimitation",
      },
    ],
  },

  // =========================================================
  // 9. INFECTION HISTORY
  // =========================================================
  {
    title: "9. Respiratory Infection History",
    type: "checkbox",
    fields: [
      ["Recurrent Pneumonia", "recurrentPneumonia"],
      ["Previous Pneumonia", "previousPneumonia"],
      ["Tuberculosis History", "tuberculosisHistory"],
      ["TB Contact History", "tbContactHistory"],
      ["COVID-19 History", "covidHistory"],
      ["Influenza History", "influenzaHistory"],
      ["Bronchitis", "bronchitis"],
      ["Lung Abscess", "lungAbscess"],
      ["Fungal Lung Infection", "fungalLungInfection"],
    ],
  },

  // =========================================================
  // 10. TUBERCULOSIS
  // =========================================================
  {
    title: "10. Tuberculosis Assessment",
    fields: [
      {
        type: "select",
        label: "TB Status",
        name: "tbStatus",
        options: [
          "No History",
          "Suspected",
          "Active TB",
          "Previous TB",
          "Treated TB",
          "Latent TB",
        ],
      },
      {
        type: "textarea",
        label: "TB Treatment History",
        name: "tbTreatmentHistory",
      },
      {
        type: "textarea",
        label: "TB Investigation Results",
        name: "tbInvestigationResults",
      },
      {
        type: "textarea",
        label: "TB Contact Details",
        name: "tbContactDetails",
      },
    ],
  },

  // =========================================================
  // 11. SLEEP ASSESSMENT
  // =========================================================
  {
    title: "11. Sleep & Sleep Apnea Assessment",
    type: "checkbox",
    fields: [
      ["Loud Snoring", "loudSnoring"],
      ["Witnessed Apnea", "witnessedApnea"],
      ["Choking During Sleep", "chokingDuringSleep"],
      ["Morning Headache", "morningHeadache"],
      ["Daytime Sleepiness", "sleepDaytimeSleepiness"],
      ["Poor Sleep Quality", "poorSleepQuality"],
      ["Insomnia", "insomnia"],
      ["Obstructive Sleep Apnea", "obstructiveSleepApnea"],
      ["CPAP Use", "cpapUse"],
    ],
  },

  {
    title: "12. Sleep Assessment Details",
    fields: [
      {
        type: "input",
        label: "Average Sleep Duration (Hours)",
        name: "sleepDuration",
        inputType: "number",
      },
      {
        type: "input",
        label: "Bedtime",
        name: "bedtime",
        inputType: "time",
      },
      {
        type: "input",
        label: "Wake-up Time",
        name: "wakeUpTime",
        inputType: "time",
      },
      {
        type: "input",
        label: "CPAP Hours / Night",
        name: "cpapHours",
        inputType: "number",
      },
      {
        type: "textarea",
        label: "Sleep Study Findings",
        name: "sleepStudyFindings",
      },
    ],
  },

  // =========================================================
  // 13. SMOKING HISTORY
  // =========================================================
  {
    title: "13. Smoking & Tobacco History",
    fields: [
      {
        type: "select",
        label: "Smoking Status",
        name: "smokingStatus",
        options: [
          "Never Smoked",
          "Former Smoker",
          "Current Smoker",
        ],
      },
      {
        type: "input",
        label: "Years Smoked",
        name: "yearsSmoked",
        inputType: "number",
      },
      {
        type: "input",
        label: "Cigarettes / Day",
        name: "cigarettesPerDay",
        inputType: "number",
      },
      {
        type: "input",
        label: "Pack Years",
        name: "packYears",
        inputType: "number",
      },
      {
        type: "select",
        label: "Other Tobacco Use",
        name: "otherTobaccoUse",
        options: [
          "None",
          "Chewing Tobacco",
          "Snuff",
          "Other",
        ],
      },
      {
        type: "textarea",
        label: "Smoking Cessation History",
        name: "smokingCessationHistory",
      },
    ],
  },

  // =========================================================
  // 14. OCCUPATIONAL / ENVIRONMENTAL
  // =========================================================
  {
    title: "14. Occupational & Environmental Exposure",
    type: "checkbox",
    fields: [
      ["Dust Exposure", "dustExposure"],
      ["Silica Exposure", "silicaExposure"],
      ["Asbestos Exposure", "asbestosExposure"],
      ["Chemical Exposure", "chemicalExposure"],
      ["Industrial Fumes", "industrialFumes"],
      ["Smoke Exposure", "smokeExposure"],
      ["Biomass Fuel Exposure", "biomassFuelExposure"],
      ["Mold Exposure", "moldExposure"],
      ["Animal Exposure", "animalExposure"],
      ["Occupational Asthma", "occupationalAsthma"],
    ],
  },

  {
    title: "15. Occupational History Details",
    fields: [
      {
        type: "input",
        label: "Occupation",
        name: "occupation",
      },
      {
        type: "input",
        label: "Duration of Exposure",
        name: "exposureDuration",
      },
      {
        type: "textarea",
        label: "Exposure Details",
        name: "exposureDetails",
      },
      {
        type: "textarea",
        label: "Protective Equipment Used",
        name: "protectiveEquipment",
      },
    ],
  },

  // =========================================================
  // 16. ALLERGY HISTORY
  // =========================================================
  {
    title: "16. Allergy History",
    fields: [
      {
        type: "textarea",
        label: "Drug Allergies",
        name: "drugAllergies",
      },
      {
        type: "textarea",
        label: "Food Allergies",
        name: "foodAllergies",
      },
      {
        type: "textarea",
        label: "Environmental Allergies",
        name: "environmentalAllergies",
      },
      {
        type: "textarea",
        label: "Seasonal Allergy History",
        name: "seasonalAllergies",
      },
      {
        type: "textarea",
        label: "Allergic Reactions",
        name: "allergicReactions",
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
        placeholder: "Medicine, dose, frequency, duration",
      },
      {
        type: "textarea",
        label: "Previous Respiratory Medications",
        name: "previousRespiratoryMedications",
      },
      {
        type: "textarea",
        label: "Inhaler Medications",
        name: "inhalerMedications",
      },
      {
        type: "textarea",
        label: "Steroid Use",
        name: "steroidUse",
      },
      {
        type: "textarea",
        label: "Antibiotic History",
        name: "antibioticHistory",
      },
      {
        type: "textarea",
        label: "Medication Allergies",
        name: "medicationAllergies",
      },
    ],
  },

  // =========================================================
  // 18. INHALER TECHNIQUE
  // =========================================================
  {
    title: "18. Inhaler Assessment",
    type: "checkbox",
    fields: [
      ["Uses Inhaler", "usesInhaler"],
      ["Uses Spacer", "usesSpacer"],
      ["Correct Inhaler Technique", "correctInhalerTechnique"],
      ["Poor Inhaler Technique", "poorInhalerTechnique"],
      ["Poor Medication Adherence", "poorMedicationAdherence"],
      ["Good Medication Adherence", "goodMedicationAdherence"],
    ],
  },

  {
    title: "19. Inhaler Details",
    fields: [
      {
        type: "textarea",
        label: "Current Inhalers",
        name: "currentInhalers",
      },
      {
        type: "select",
        label: "Inhaler Technique",
        name: "inhalerTechnique",
        options: [
          "Correct",
          "Needs Improvement",
          "Incorrect",
          "Not Assessed",
        ],
      },
      {
        type: "select",
        label: "Medication Adherence",
        name: "medicationAdherence",
        options: [
          "Good",
          "Moderate",
          "Poor",
          "Not Assessed",
        ],
      },
      {
        type: "textarea",
        label: "Inhaler Education Provided",
        name: "inhalerEducation",
      },
    ],
  },

  // =========================================================
  // 20. FAMILY HISTORY
  // =========================================================
  {
    title: "20. Family History",
    type: "checkbox",
    fields: [
      ["Family History of Asthma", "familyAsthma"],
      ["Family History of COPD", "familyCopd"],
      ["Family History of Lung Cancer", "familyLungCancer"],
      ["Family History of Tuberculosis", "familyTuberculosis"],
      ["Family History of Interstitial Lung Disease", "familyIld"],
      ["Family History of Sleep Apnea", "familySleepApnea"],
      ["Family History of Allergy", "familyAllergy"],
    ],
  },

  // =========================================================
  // 21. VITAL SIGNS
  // =========================================================
  {
    title: "21. Vital Signs",
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
  // 22. RESPIRATORY EXAMINATION
  // =========================================================
  {
    title: "22. Respiratory Examination",
    fields: [
      {
        type: "textarea",
        label: "General Appearance",
        name: "generalAppearance",
      },
      {
        type: "textarea",
        label: "Chest Inspection",
        name: "chestInspection",
      },
      {
        type: "textarea",
        label: "Chest Expansion",
        name: "chestExpansion",
      },
      {
        type: "textarea",
        label: "Percussion",
        name: "percussion",
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
      {
        type: "textarea",
        label: "Wheeze",
        name: "examinationWheeze",
      },
      {
        type: "textarea",
        label: "Crackles",
        name: "crackles",
      },
      {
        type: "textarea",
        label: "Clubbing",
        name: "clubbing",
      },
      {
        type: "textarea",
        label: "Cyanosis",
        name: "cyanosis",
      },
      {
        type: "textarea",
        label: "Other Respiratory Findings",
        name: "otherRespiratoryFindings",
      },
    ],
  },

  // =========================================================
  // 23. PULMONARY FUNCTION TEST
  // =========================================================
  {
    title: "23. Pulmonary Function Tests",
    fields: [
      {
        type: "input",
        label: "FVC",
        name: "fvc",
      },
      {
        type: "input",
        label: "FEV1",
        name: "fev1",
      },
      {
        type: "input",
        label: "FEV1 / FVC",
        name: "fev1Fvc",
      },
      {
        type: "input",
        label: "PEFR",
        name: "pefr",
      },
      {
        type: "input",
        label: "TLC",
        name: "tlc",
      },
      {
        type: "input",
        label: "RV",
        name: "rv",
      },
      {
        type: "input",
        label: "DLCO",
        name: "dlco",
      },
      {
        type: "select",
        label: "PFT Pattern",
        name: "pftPattern",
        options: [
          "Normal",
          "Obstructive",
          "Restrictive",
          "Mixed",
          "Not Interpreted",
        ],
      },
      {
        type: "textarea",
        label: "PFT Interpretation",
        name: "pftInterpretation",
      },
    ],
  },

  // =========================================================
  // 24. OXYGEN ASSESSMENT
  // =========================================================
  {
    title: "24. Oxygenation Assessment",
    fields: [
      {
        type: "input",
        label: "Room Air SpO₂",
        name: "roomAirSpo2",
      },
      {
        type: "input",
        label: "Oxygen Flow Rate (L/min)",
        name: "oxygenFlowRate",
      },
      {
        type: "select",
        label: "Oxygen Requirement",
        name: "oxygenRequirement",
        options: [
          "No Oxygen",
          "Occasional",
          "Night Only",
          "Continuous",
          "During Exercise",
        ],
      },
      {
        type: "textarea",
        label: "Oxygen Therapy Notes",
        name: "oxygenTherapyNotes",
      },
    ],
  },

  // =========================================================
  // 25. ARTERIAL BLOOD GAS
  // =========================================================
  {
    title: "25. Arterial Blood Gas",
    fields: [
      {
        type: "input",
        label: "pH",
        name: "ph",
      },
      {
        type: "input",
        label: "PaCO₂",
        name: "paco2",
      },
      {
        type: "input",
        label: "PaO₂",
        name: "pao2",
      },
      {
        type: "input",
        label: "HCO₃",
        name: "hco3",
      },
      {
        type: "input",
        label: "SaO₂",
        name: "sao2",
      },
      {
        type: "input",
        label: "Lactate",
        name: "lactate",
      },
      {
        type: "textarea",
        label: "ABG Interpretation",
        name: "abgInterpretation",
      },
    ],
  },

  // =========================================================
  // 26. IMAGING
  // =========================================================
  {
    title: "26. Chest Imaging",
    fields: [
      {
        type: "textarea",
        label: "Chest X-Ray Findings",
        name: "chestXray",
      },
      {
        type: "textarea",
        label: "HRCT Chest Findings",
        name: "hrctChest",
      },
      {
        type: "textarea",
        label: "CT Chest Findings",
        name: "ctChest",
      },
      {
        type: "textarea",
        label: "MRI Chest Findings",
        name: "mriChest",
      },
      {
        type: "textarea",
        label: "Pleural Findings",
        name: "pleuralFindings",
      },
      {
        type: "textarea",
        label: "Other Imaging Findings",
        name: "otherImagingFindings",
      },
    ],
  },

  // =========================================================
  // 27. LABORATORY INVESTIGATIONS
  // =========================================================
  {
    title: "27. Laboratory Investigations",
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
        label: "Neutrophils",
        name: "neutrophils",
      },
      {
        type: "input",
        label: "Lymphocytes",
        name: "lymphocytes",
      },
      {
        type: "input",
        label: "Platelets",
        name: "platelets",
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
        label: "Procalcitonin",
        name: "procalcitonin",
      },
      {
        type: "input",
        label: "D-Dimer",
        name: "dDimer",
      },
      {
        type: "textarea",
        label: "Other Laboratory Findings",
        name: "otherLabFindings",
      },
    ],
  },

  // =========================================================
  // 28. SPUTUM / MICROBIOLOGY
  // =========================================================
  {
    title: "28. Sputum & Microbiology",
    fields: [
      {
        type: "select",
        label: "Sputum Culture",
        name: "sputumCulture",
        options: [
          "Not Done",
          "Negative",
          "Positive",
        ],
      },
      {
        type: "select",
        label: "AFB Smear",
        name: "afbSmear",
        options: [
          "Not Done",
          "Negative",
          "Positive",
        ],
      },
      {
        type: "select",
        label: "TB NAAT",
        name: "tbNaat",
        options: [
          "Not Done",
          "Negative",
          "Positive",
        ],
      },
      {
        type: "textarea",
        label: "Sputum Findings",
        name: "sputumFindings",
      },
      {
        type: "textarea",
        label: "Microbiology Findings",
        name: "microbiologyFindings",
      },
    ],
  },

  // =========================================================
  // 29. BRONCHOSCOPY
  // =========================================================
  {
    title: "29. Bronchoscopy Assessment",
    fields: [
      {
        type: "select",
        label: "Bronchoscopy Status",
        name: "bronchoscopyStatus",
        options: [
          "Not Done",
          "Planned",
          "Completed",
          "Not Indicated",
        ],
      },
      {
        type: "input",
        label: "Bronchoscopy Date",
        name: "bronchoscopyDate",
        inputType: "date",
      },
      {
        type: "textarea",
        label: "Bronchoscopy Findings",
        name: "bronchoscopyFindings",
      },
      {
        type: "textarea",
        label: "BAL Findings",
        name: "balFindings",
      },
      {
        type: "textarea",
        label: "Biopsy Findings",
        name: "bronchoscopyBiopsyFindings",
      },
    ],
  },

  // =========================================================
  // 30. SLEEP STUDY
  // =========================================================
  {
    title: "30. Sleep Study",
    fields: [
      {
        type: "select",
        label: "Sleep Study Status",
        name: "sleepStudyStatus",
        options: [
          "Not Done",
          "Planned",
          "Completed",
        ],
      },
      {
        type: "input",
        label: "AHI",
        name: "ahi",
      },
      {
        type: "input",
        label: "ODI",
        name: "odi",
      },
      {
        type: "input",
        label: "Lowest SpO₂",
        name: "lowestSpo2",
      },
      {
        type: "textarea",
        label: "Sleep Study Interpretation",
        name: "sleepStudyInterpretation",
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
        label: "Inhaler Plan",
        name: "inhalerPlan",
      },
      {
        type: "textarea",
        label: "Oxygen Therapy Plan",
        name: "oxygenTherapyPlan",
      },
      {
        type: "textarea",
        label: "Pulmonary Rehabilitation",
        name: "pulmonaryRehabilitationPlan",
      },
      {
        type: "textarea",
        label: "Smoking Cessation Advice",
        name: "smokingCessationAdvice",
      },
      {
        type: "textarea",
        label: "Lifestyle Recommendations",
        name: "lifestyleRecommendations",
      },
      {
        type: "textarea",
        label: "Vaccination Recommendations",
        name: "vaccinationRecommendations",
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
          "Asthma Review",
          "COPD Review",
          "Sleep Apnea Review",
          "TB Review",
          "PFT Review",
          "Imaging Review",
          "Post Hospitalization",
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