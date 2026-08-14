export const cardiothoracicSurgeonSections = [
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
          "Preoperative Assessment",
          "Postoperative Review",
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
      ["Chest Pain", "chestPain"],
      ["Shortness of Breath", "shortnessOfBreath"],
      ["Palpitations", "palpitations"],
      ["Cough", "cough"],
      ["Hemoptysis", "hemoptysis"],
      ["Wheezing", "wheezing"],
      ["Fatigue", "fatigue"],
      ["Exercise Intolerance", "exerciseIntolerance"],
      ["Leg Swelling", "legSwelling"],
      ["Orthopnea", "orthopnea"],
      ["Paroxysmal Nocturnal Dyspnea", "pnd"],
      ["Syncope", "syncope"],
      ["Dizziness", "dizziness"],
      ["Fever", "fever"],
      ["Weight Loss", "weightLoss"],
      ["Difficulty Swallowing", "difficultySwallowing"],
      ["Chest Wall Pain", "chestWallPain"],
      ["Postoperative Pain", "postoperativePain"],
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
        label: "Pain Characteristics",
        name: "painCharacteristics",
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
      {
        type: "textarea",
        label: "Previous Treatment",
        name: "previousTreatment",
      },
    ],
  },

  // =========================================================
  // 4. CARDIAC SYMPTOMS
  // =========================================================
  {
    title: "4. Cardiac Symptom Assessment",
    type: "checkbox",
    fields: [
      ["Typical Angina", "typicalAngina"],
      ["Atypical Chest Pain", "atypicalChestPain"],
      ["Exertional Chest Pain", "exertionalChestPain"],
      ["Resting Chest Pain", "restingChestPain"],
      ["Palpitations", "cardiacPalpitations"],
      ["Syncope", "cardiacSyncope"],
      ["Near Syncope", "nearSyncope"],
      ["Orthopnea", "cardiacOrthopnea"],
      ["PND", "cardiacPnd"],
      ["Peripheral Edema", "peripheralEdema"],
      ["Exercise Intolerance", "cardiacExerciseIntolerance"],
      ["Cyanosis", "cyanosis"],
    ],
  },

  {
    title: "5. Chest Pain Details",
    fields: [
      {
        type: "textarea",
        label: "Location",
        name: "chestPainLocation",
      },
      {
        type: "textarea",
        label: "Radiation",
        name: "chestPainRadiation",
      },
      {
        type: "textarea",
        label: "Character",
        name: "chestPainCharacter",
      },
      {
        type: "input",
        label: "Duration",
        name: "chestPainDuration",
      },
      {
        type: "input",
        label: "Frequency",
        name: "chestPainFrequency",
      },
      {
        type: "input",
        label: "Severity",
        name: "chestPainSeverity",
        inputType: "number",
        min: "0",
        max: "10",
      },
      {
        type: "textarea",
        label: "Precipitating Factors",
        name: "chestPainPrecipitatingFactors",
      },
      {
        type: "textarea",
        label: "Relieving Factors",
        name: "chestPainRelievingFactors",
      },
    ],
  },

  // =========================================================
  // 6. CARDIAC HISTORY
  // =========================================================
  {
    title: "6. Cardiac History",
    type: "checkbox",
    fields: [
      ["Coronary Artery Disease", "coronaryArteryDisease"],
      ["Previous Myocardial Infarction", "previousMi"],
      ["Heart Failure", "heartFailure"],
      ["Valvular Heart Disease", "valvularHeartDisease"],
      ["Aortic Disease", "aorticDisease"],
      ["Arrhythmia", "arrhythmia"],
      ["Atrial Fibrillation", "atrialFibrillation"],
      ["Cardiomyopathy", "cardiomyopathy"],
      ["Congenital Heart Disease", "congenitalHeartDisease"],
      ["Pulmonary Hypertension", "pulmonaryHypertension"],
      ["Previous CABG", "previousCabg"],
      ["Previous Valve Surgery", "previousValveSurgery"],
      ["Previous PCI / Stent", "previousPci"],
      ["Pacemaker", "pacemaker"],
      ["ICD", "icd"],
    ],
  },

  // =========================================================
  // 7. PULMONARY HISTORY
  // =========================================================
  {
    title: "7. Pulmonary History",
    type: "checkbox",
    fields: [
      ["Asthma", "asthma"],
      ["COPD", "copd"],
      ["Interstitial Lung Disease", "interstitialLungDisease"],
      ["Pulmonary Fibrosis", "pulmonaryFibrosis"],
      ["Bronchiectasis", "bronchiectasis"],
      ["Pneumonia", "pneumonia"],
      ["Tuberculosis", "tuberculosis"],
      ["Pulmonary Embolism", "pulmonaryEmbolism"],
      ["Pleural Disease", "pleuralDisease"],
      ["Pneumothorax", "pneumothorax"],
      ["Pleural Effusion", "pleuralEffusion"],
      ["Sleep Apnea", "sleepApnea"],
      ["Previous Lung Surgery", "previousLungSurgery"],
    ],
  },

  // =========================================================
  // 8. CARDIOVASCULAR EXAMINATION
  // =========================================================
  {
    title: "8. Cardiovascular Examination",
    fields: [
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
        label: "Peripheral Edema",
        name: "peripheralEdemaFinding",
      },
      {
        type: "textarea",
        label: "Capillary Refill",
        name: "capillaryRefill",
      },
      {
        type: "textarea",
        label: "Cardiac Examination Findings",
        name: "cardiacExaminationFindings",
      },
    ],
  },

  // =========================================================
  // 9. RESPIRATORY EXAMINATION
  // =========================================================
  {
    title: "9. Respiratory Examination",
    fields: [
      {
        type: "textarea",
        label: "Respiratory Effort",
        name: "respiratoryEffort",
      },
      {
        type: "textarea",
        label: "Air Entry",
        name: "airEntry",
      },
      {
        type: "textarea",
        label: "Breath Sounds",
        name: "breathSounds",
      },
      {
        type: "textarea",
        label: "Crackles",
        name: "crackles",
      },
      {
        type: "textarea",
        label: "Wheezing",
        name: "respiratoryWheezing",
      },
      {
        type: "textarea",
        label: "Pleural Findings",
        name: "pleuralFindings",
      },
      {
        type: "textarea",
        label: "Chest Wall Findings",
        name: "chestWallFindings",
      },
      {
        type: "textarea",
        label: "Respiratory Examination Findings",
        name: "respiratoryExaminationFindings",
      },
    ],
  },

  // =========================================================
  // 10. VITAL SIGNS
  // =========================================================
  {
    title: "10. Vital Signs",
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
  // 11. ECG
  // =========================================================
  {
    title: "11. ECG Assessment",
    type: "checkbox",
    fields: [
      ["Normal Sinus Rhythm", "normalSinusRhythm"],
      ["Sinus Bradycardia", "sinusBradycardia"],
      ["Sinus Tachycardia", "sinusTachycardia"],
      ["Atrial Fibrillation", "ecgAtrialFibrillation"],
      ["Atrial Flutter", "atrialFlutter"],
      ["Ventricular Arrhythmia", "ventricularArrhythmia"],
      ["ST Elevation", "stElevation"],
      ["ST Depression", "stDepression"],
      ["T Wave Abnormality", "tWaveAbnormality"],
      ["Heart Block", "heartBlock"],
      ["Left Bundle Branch Block", "lbbb"],
      ["Right Bundle Branch Block", "rbbb"],
    ],
  },

  {
    title: "12. ECG Details",
    fields: [
      {
        type: "input",
        label: "Heart Rate",
        name: "ecgHeartRate",
        inputType: "number",
      },
      {
        type: "input",
        label: "Rhythm",
        name: "ecgRhythm",
      },
      {
        type: "textarea",
        label: "ECG Findings",
        name: "ecgFindings",
      },
      {
        type: "textarea",
        label: "ECG Interpretation",
        name: "ecgInterpretation",
      },
    ],
  },

  // =========================================================
  // 13. ECHOCARDIOGRAM
  // =========================================================
  {
    title: "13. Echocardiogram Assessment",
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
        type: "textarea",
        label: "LV Function",
        name: "lvFunction",
      },
      {
        type: "textarea",
        label: "RV Function",
        name: "rvFunction",
      },
      {
        type: "textarea",
        label: "Valve Findings",
        name: "valveFindings",
      },
      {
        type: "textarea",
        label: "Aortic Valve",
        name: "aorticValve",
      },
      {
        type: "textarea",
        label: "Mitral Valve",
        name: "mitralValve",
      },
      {
        type: "textarea",
        label: "Tricuspid Valve",
        name: "tricuspidValve",
      },
      {
        type: "textarea",
        label: "Pulmonary Valve",
        name: "pulmonaryValve",
      },
      {
        type: "textarea",
        label: "Pericardium",
        name: "pericardium",
      },
      {
        type: "textarea",
        label: "Pulmonary Artery Pressure",
        name: "pulmonaryArteryPressure",
      },
      {
        type: "textarea",
        label: "Regional Wall Motion",
        name: "regionalWallMotion",
      },
      {
        type: "textarea",
        label: "Echo Impression",
        name: "echoImpression",
      },
    ],
  },

  // =========================================================
  // 14. CORONARY ARTERY DISEASE
  // =========================================================
  {
    title: "14. Coronary Artery Disease Assessment",
    type: "checkbox",
    fields: [
      ["Single Vessel Disease", "singleVesselDisease"],
      ["Double Vessel Disease", "doubleVesselDisease"],
      ["Triple Vessel Disease", "tripleVesselDisease"],
      ["Left Main Disease", "leftMainDisease"],
      ["LAD Disease", "ladDisease"],
      ["LCX Disease", "lcxDisease"],
      ["RCA Disease", "rcaDisease"],
      ["Diffuse Coronary Disease", "diffuseCoronaryDisease"],
      ["Previous MI", "cadPreviousMi"],
    ],
  },

  {
    title: "15. Coronary Angiography",
    fields: [
      {
        type: "textarea",
        label: "Coronary Angiography Findings",
        name: "coronaryAngiographyFindings",
      },
      {
        type: "textarea",
        label: "LAD Findings",
        name: "ladFindings",
      },
      {
        type: "textarea",
        label: "LCX Findings",
        name: "lcxFindings",
      },
      {
        type: "textarea",
        label: "RCA Findings",
        name: "rcaFindings",
      },
      {
        type: "textarea",
        label: "Left Main Findings",
        name: "leftMainFindings",
      },
      {
        type: "textarea",
        label: "Graftable Vessels",
        name: "graftableVessels",
      },
    ],
  },

  // =========================================================
  // 16. VALVULAR HEART DISEASE
  // =========================================================
  {
    title: "16. Valvular Heart Disease",
    type: "checkbox",
    fields: [
      ["Aortic Stenosis", "aorticStenosis"],
      ["Aortic Regurgitation", "aorticRegurgitation"],
      ["Mitral Stenosis", "mitralStenosis"],
      ["Mitral Regurgitation", "mitralRegurgitation"],
      ["Tricuspid Regurgitation", "tricuspidRegurgitation"],
      ["Pulmonary Valve Disease", "pulmonaryValveDisease"],
      ["Mixed Valve Disease", "mixedValveDisease"],
      ["Prosthetic Valve", "prostheticValve"],
      ["Endocarditis", "endocarditis"],
    ],
  },

  {
    title: "17. Valve Disease Details",
    fields: [
      {
        type: "textarea",
        label: "Valve Lesion",
        name: "valveLesion",
      },
      {
        type: "textarea",
        label: "Severity",
        name: "valveSeverity",
      },
      {
        type: "textarea",
        label: "Valve Area",
        name: "valveArea",
      },
      {
        type: "textarea",
        label: "Pressure Gradient",
        name: "pressureGradient",
      },
      {
        type: "textarea",
        label: "Regurgitation Severity",
        name: "regurgitationSeverity",
      },
      {
        type: "textarea",
        label: "Valve Treatment Plan",
        name: "valveTreatmentPlan",
      },
    ],
  },

  // =========================================================
  // 18. AORTIC DISEASE
  // =========================================================
  {
    title: "18. Aortic Disease Assessment",
    type: "checkbox",
    fields: [
      ["Aortic Aneurysm", "aorticAneurysm"],
      ["Aortic Dissection", "aorticDissection"],
      ["Ascending Aortic Aneurysm", "ascendingAorticAneurysm"],
      ["Aortic Arch Disease", "aorticArchDisease"],
      ["Descending Aortic Aneurysm", "descendingAorticAneurysm"],
      ["Thoracoabdominal Aneurysm", "thoracoabdominalAneurysm"],
      ["Aortic Rupture", "aorticRupture"],
      ["Aortic Coarctation", "aorticCoarctation"],
    ],
  },

  {
    title: "19. Aortic Imaging",
    fields: [
      {
        type: "textarea",
        label: "Aortic Segment",
        name: "aorticSegment",
      },
      {
        type: "textarea",
        label: "Aortic Diameter",
        name: "aorticDiameter",
      },
      {
        type: "textarea",
        label: "Aneurysm Size",
        name: "aneurysmSize",
      },
      {
        type: "textarea",
        label: "Dissection Classification",
        name: "dissectionClassification",
      },
      {
        type: "textarea",
        label: "CT Angiography Findings",
        name: "aorticCtaFindings",
      },
      {
        type: "textarea",
        label: "Aortic Treatment Plan",
        name: "aorticTreatmentPlan",
      },
    ],
  },

  // =========================================================
  // 20. LUNG ASSESSMENT
  // =========================================================
  {
    title: "20. Lung Disease Assessment",
    type: "checkbox",
    fields: [
      ["Lung Cancer", "lungCancer"],
      ["Pulmonary Nodule", "pulmonaryNodule"],
      ["Lung Mass", "lungMass"],
      ["Pleural Tumor", "pleuralTumor"],
      ["Pneumothorax", "lungPneumothorax"],
      ["Pleural Effusion", "lungPleuralEffusion"],
      ["Empyema", "empyema"],
      ["Bullous Disease", "bullousDisease"],
      ["Bronchiectasis", "lungBronchiectasis"],
      ["Interstitial Lung Disease", "lungInterstitialDisease"],
      ["Mediastinal Mass", "mediastinalMass"],
    ],
  },

  // =========================================================
  // 21. LUNG NODULE / CANCER
  // =========================================================
  {
    title: "21. Lung Mass / Nodule Assessment",
    fields: [
      {
        type: "input",
        label: "Lesion Location",
        name: "lungLesionLocation",
      },
      {
        type: "select",
        label: "Lung Side",
        name: "lungSide",
        options: [
          "Right",
          "Left",
          "Bilateral",
          "Not Applicable",
        ],
      },
      {
        type: "input",
        label: "Lesion Size",
        name: "lungLesionSize",
      },
      {
        type: "textarea",
        label: "CT Findings",
        name: "lungCtFindings",
      },
      {
        type: "textarea",
        label: "PET-CT Findings",
        name: "petCtFindings",
      },
      {
        type: "textarea",
        label: "Bronchoscopy Findings",
        name: "bronchoscopyFindings",
      },
      {
        type: "textarea",
        label: "Biopsy Findings",
        name: "lungBiopsyFindings",
      },
      {
        type: "textarea",
        label: "Staging",
        name: "lungCancerStaging",
      },
    ],
  },

  // =========================================================
  // 22. PLEURAL DISEASE
  // =========================================================
  {
    title: "22. Pleural Disease Assessment",
    type: "checkbox",
    fields: [
      ["Pleural Effusion", "pleuralEffusionAssessment"],
      ["Empyema", "pleuralEmpyema"],
      ["Hemothorax", "hemothorax"],
      ["Pneumothorax", "pleuralPneumothorax"],
      ["Chylothorax", "chylothorax"],
      ["Mesothelioma", "mesothelioma"],
      ["Pleural Thickening", "pleuralThickening"],
      ["Loculated Effusion", "loculatedEffusion"],
    ],
  },

  {
    title: "23. Pleural Details",
    fields: [
      {
        type: "textarea",
        label: "Pleural Fluid Amount",
        name: "pleuralFluidAmount",
      },
      {
        type: "textarea",
        label: "Pleural Fluid Characteristics",
        name: "pleuralFluidCharacteristics",
      },
      {
        type: "textarea",
        label: "Pleural Fluid Analysis",
        name: "pleuralFluidAnalysis",
      },
      {
        type: "textarea",
        label: "Chest Tube Status",
        name: "chestTubeStatus",
      },
      {
        type: "textarea",
        label: "Pleural Imaging Findings",
        name: "pleuralImagingFindings",
      },
    ],
  },

  // =========================================================
  // 24. MEDIASTINAL ASSESSMENT
  // =========================================================
  {
    title: "24. Mediastinal Assessment",
    type: "checkbox",
    fields: [
      ["Mediastinal Mass", "mediastinalMassAssessment"],
      ["Thymoma", "thymoma"],
      ["Lymphadenopathy", "mediastinalLymphadenopathy"],
      ["Mediastinal Cyst", "mediastinalCyst"],
      ["Thyroid Extension", "thyroidExtension"],
      ["Esophageal Mass", "esophagealMass"],
      ["Mediastinal Infection", "mediastinalInfection"],
    ],
  },

  {
    title: "25. Mediastinal Details",
    fields: [
      {
        type: "input",
        label: "Mediastinal Location",
        name: "mediastinalLocation",
      },
      {
        type: "input",
        label: "Mass Size",
        name: "mediastinalMassSize",
      },
      {
        type: "textarea",
        label: "CT Findings",
        name: "mediastinalCtFindings",
      },
      {
        type: "textarea",
        label: "MRI Findings",
        name: "mediastinalMriFindings",
      },
      {
        type: "textarea",
        label: "Biopsy Findings",
        name: "mediastinalBiopsyFindings",
      },
    ],
  },

  // =========================================================
  // 26. CONGENITAL HEART DISEASE
  // =========================================================
  {
    title: "26. Congenital Heart Disease",
    type: "checkbox",
    fields: [
      ["ASD", "asd"],
      ["VSD", "vsd"],
      ["PDA", "pda"],
      ["Tetralogy of Fallot", "tetralogyOfFallot"],
      ["Coarctation of Aorta", "congenitalCoarctation"],
      ["Transposition of Great Arteries", "transpositionGreatArteries"],
      ["Total Anomalous Pulmonary Venous Return", "tapvr"],
      ["Congenital Valve Disease", "congenitalValveDisease"],
    ],
  },

  {
    title: "27. Congenital Cardiac Details",
    fields: [
      {
        type: "textarea",
        label: "Congenital Diagnosis",
        name: "congenitalDiagnosis",
      },
      {
        type: "textarea",
        label: "Shunt Direction",
        name: "shuntDirection",
      },
      {
        type: "textarea",
        label: "Shunt Size",
        name: "shuntSize",
      },
      {
        type: "textarea",
        label: "Pulmonary Pressure",
        name: "congenitalPulmonaryPressure",
      },
      {
        type: "textarea",
        label: "Previous Repair",
        name: "previousCongenitalRepair",
      },
    ],
  },

  // =========================================================
  // 28. CARDIAC CATHETERIZATION
  // =========================================================
  {
    title: "28. Cardiac Catheterization",
    fields: [
      {
        type: "textarea",
        label: "Right Heart Catheterization",
        name: "rightHeartCatheterization",
      },
      {
        type: "textarea",
        label: "Left Heart Catheterization",
        name: "leftHeartCatheterization",
      },
      {
        type: "textarea",
        label: "Pulmonary Artery Pressure",
        name: "catheterPulmonaryPressure",
      },
      {
        type: "textarea",
        label: "Cardiac Output",
        name: "cardiacOutput",
      },
      {
        type: "textarea",
        label: "Hemodynamic Findings",
        name: "hemodynamicFindings",
      },
    ],
  },

  // =========================================================
  // 29. PULMONARY FUNCTION
  // =========================================================
  {
    title: "29. Pulmonary Function Assessment",
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
        label: "FEV1/FVC",
        name: "fev1Fvc",
      },
      {
        type: "input",
        label: "TLC",
        name: "tlc",
      },
      {
        type: "input",
        label: "DLCO",
        name: "dlco",
      },
      {
        type: "textarea",
        label: "PFT Interpretation",
        name: "pftInterpretation",
      },
      {
        type: "textarea",
        label: "Exercise Testing",
        name: "exerciseTesting",
      },
    ],
  },

  // =========================================================
  // 30. LAB INVESTIGATIONS
  // =========================================================
  {
    title: "30. Laboratory Investigations",
    fields: [
      {
        type: "input",
        label: "Hemoglobin",
        name: "hemoglobin",
      },
      {
        type: "input",
        label: "WBC Count",
        name: "wbcCount",
      },
      {
        type: "input",
        label: "Platelet Count",
        name: "plateletCount",
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
        label: "INR",
        name: "inr",
      },
      {
        type: "input",
        label: "PT",
        name: "pt",
      },
      {
        type: "input",
        label: "aPTT",
        name: "aptt",
      },
      {
        type: "input",
        label: "Troponin",
        name: "troponin",
      },
      {
        type: "input",
        label: "BNP / NT-proBNP",
        name: "bnp",
      },
      {
        type: "input",
        label: "HbA1c",
        name: "hba1c",
      },
      {
        type: "textarea",
        label: "Other Laboratory Findings",
        name: "otherLaboratoryFindings",
      },
    ],
  },

  // =========================================================
  // 31. MEDICATION HISTORY
  // =========================================================
  {
    title: "31. Medication History",
    fields: [
      {
        type: "textarea",
        label: "Current Medications",
        name: "currentMedications",
        placeholder: "Medicine, dose, frequency, duration",
      },
      {
        type: "textarea",
        label: "Antiplatelet Drugs",
        name: "antiplateletDrugs",
      },
      {
        type: "textarea",
        label: "Anticoagulants",
        name: "anticoagulants",
      },
      {
        type: "textarea",
        label: "Beta Blockers",
        name: "betaBlockers",
      },
      {
        type: "textarea",
        label: "ACE Inhibitors / ARBs",
        name: "aceArb",
      },
      {
        type: "textarea",
        label: "Diuretics",
        name: "diuretics",
      },
      {
        type: "textarea",
        label: "Statins",
        name: "statins",
      },
      {
        type: "textarea",
        label: "Bronchodilators",
        name: "bronchodilators",
      },
      {
        type: "textarea",
        label: "Steroids",
        name: "steroids",
      },
      {
        type: "textarea",
        label: "Drug Allergies",
        name: "drugAllergies",
      },
    ],
  },

  // =========================================================
  // 32. SMOKING / LIFESTYLE
  // =========================================================
  {
    title: "32. Smoking & Lifestyle History",
    type: "checkbox",
    fields: [
      ["Current Smoker", "currentSmoker"],
      ["Former Smoker", "formerSmoker"],
      ["Never Smoked", "neverSmoked"],
      ["Alcohol Use", "alcoholUse"],
      ["Occupational Exposure", "occupationalExposure"],
      ["Secondhand Smoke Exposure", "secondhandSmoke"],
    ],
  },

  {
    title: "33. Lifestyle Details",
    fields: [
      {
        type: "input",
        label: "Smoking Pack Years",
        name: "smokingPackYears",
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
        label: "Physical Activity",
        name: "physicalActivity",
      },
      {
        type: "textarea",
        label: "Dietary History",
        name: "dietaryHistory",
      },
    ],
  },

  // =========================================================
  // 34. PREVIOUS SURGERIES
  // =========================================================
  {
    title: "34. Previous Surgical History",
    fields: [
      {
        type: "textarea",
        label: "Previous Cardiac Surgeries",
        name: "previousCardiacSurgeries",
      },
      {
        type: "textarea",
        label: "Previous Thoracic Surgeries",
        name: "previousThoracicSurgeries",
      },
      {
        type: "textarea",
        label: "Previous CABG",
        name: "previousCabgDetails",
      },
      {
        type: "textarea",
        label: "Previous Valve Surgery",
        name: "previousValveSurgeryDetails",
      },
      {
        type: "textarea",
        label: "Previous Lung Surgery",
        name: "previousLungSurgeryDetails",
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
    ],
  },

  // =========================================================
  // 35. PREOPERATIVE RISK
  // =========================================================
  {
    title: "35. Preoperative Risk Assessment",
    type: "checkbox",
    fields: [
      ["Low Surgical Risk", "lowSurgicalRisk"],
      ["Intermediate Surgical Risk", "intermediateSurgicalRisk"],
      ["High Surgical Risk", "highSurgicalRisk"],
      ["Cardiac Risk", "preopCardiacRisk"],
      ["Pulmonary Risk", "preopPulmonaryRisk"],
      ["Renal Risk", "preopRenalRisk"],
      ["Bleeding Risk", "preopBleedingRisk"],
      ["Infection Risk", "preopInfectionRisk"],
      ["Frailty", "frailty"],
      ["Poor Functional Capacity", "poorFunctionalCapacity"],
      ["Requires Optimization", "requiresOptimization"],
      ["ICU Requirement Expected", "expectedIcuRequirement"],
    ],
  },

  {
    title: "36. Functional Status",
    fields: [
      {
        type: "select",
        label: "Functional Capacity",
        name: "functionalCapacity",
        options: [
          "Excellent",
          "Good",
          "Moderate",
          "Poor",
          "Unable to Assess",
        ],
      },
      {
        type: "input",
        label: "METs",
        name: "mets",
      },
      {
        type: "textarea",
        label: "Exercise Tolerance",
        name: "exerciseTolerance",
      },
      {
        type: "textarea",
        label: "Preoperative Optimization",
        name: "preoperativeOptimization",
      },
    ],
  },

  // =========================================================
  // 37. PLANNED CARDIOTHORACIC PROCEDURE
  // =========================================================
  {
    title: "37. Planned Cardiothoracic Procedure",
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
        label: "Surgical Indication",
        name: "surgicalIndication",
      },
      {
        type: "textarea",
        label: "Alternative Treatment Options",
        name: "alternativeTreatmentOptions",
      },
      {
        type: "textarea",
        label: "Surgical Risks Discussed",
        name: "surgicalRisksDiscussed",
      },
      {
        type: "textarea",
        label: "Expected Outcome",
        name: "expectedOutcome",
      },
    ],
  },

  // =========================================================
  // 38. CABG ASSESSMENT
  // =========================================================
  {
    title: "38. CABG Assessment",
    type: "checkbox",
    fields: [
      ["CABG Indicated", "cabgIndicated"],
      ["LIMA to LAD", "limaToLad"],
      ["RIMA Graft", "rimaGraft"],
      ["Saphenous Vein Graft", "svgGraft"],
      ["Radial Artery Graft", "radialArteryGraft"],
      ["Off-Pump CABG", "offPumpCabg"],
      ["On-Pump CABG", "onPumpCabg"],
      ["Redo CABG", "redoCabg"],
    ],
  },

  {
    title: "39. CABG Planning",
    fields: [
      {
        type: "textarea",
        label: "Target Vessels",
        name: "cabgTargetVessels",
      },
      {
        type: "textarea",
        label: "Conduit Plan",
        name: "conduitPlan",
      },
      {
        type: "textarea",
        label: "Graft Strategy",
        name: "graftStrategy",
      },
      {
        type: "textarea",
        label: "Coronary Disease Summary",
        name: "coronaryDiseaseSummary",
      },
    ],
  },

  // =========================================================
  // 40. VALVE SURGERY PLANNING
  // =========================================================
  {
    title: "40. Valve Surgery Planning",
    fields: [
      {
        type: "select",
        label: "Valve Procedure",
        name: "valveProcedure",
        options: [
          "Valve Repair",
          "Valve Replacement",
          "Combined Procedure",
          "Not Applicable",
        ],
      },
      {
        type: "select",
        label: "Valve Prosthesis",
        name: "valveProsthesis",
        options: [
          "Mechanical",
          "Bioprosthetic",
          "Not Applicable",
        ],
      },
      {
        type: "textarea",
        label: "Valve Surgical Plan",
        name: "valveSurgicalPlan",
      },
      {
        type: "textarea",
        label: "Valve Repair Details",
        name: "valveRepairDetails",
      },
      {
        type: "textarea",
        label: "Anticoagulation Plan",
        name: "valveAnticoagulationPlan",
      },
    ],
  },

  // =========================================================
  // 41. THORACIC SURGERY PLANNING
  // =========================================================
  {
    title: "41. Thoracic Surgery Planning",
    type: "checkbox",
    fields: [
      ["Lobectomy", "lobectomy"],
      ["Pneumonectomy", "pneumonectomy"],
      ["Segmentectomy", "segmentectomy"],
      ["Wedge Resection", "wedgeResection"],
      ["Decortication", "decortication"],
      ["Pleurectomy", "pleurectomy"],
      ["Mediastinal Mass Resection", "mediastinalMassResection"],
      ["Esophageal Surgery", "esophagealSurgery"],
      ["Chest Wall Resection", "chestWallResection"],
      ["Thoracoscopic Surgery", "thoracoscopicSurgery"],
      ["Robotic Thoracic Surgery", "roboticThoracicSurgery"],
    ],
  },

  {
    title: "42. Thoracic Surgical Details",
    fields: [
      {
        type: "textarea",
        label: "Surgical Approach",
        name: "thoracicSurgicalApproach",
      },
      {
        type: "textarea",
        label: "Target Lesion",
        name: "thoracicTargetLesion",
      },
      {
        type: "textarea",
        label: "Resection Plan",
        name: "resectionPlan",
      },
      {
        type: "textarea",
        label: "Lymph Node Dissection Plan",
        name: "lymphNodeDissectionPlan",
      },
      {
        type: "textarea",
        label: "Thoracic Surgical Risks",
        name: "thoracicSurgicalRisks",
      },
    ],
  },

  // =========================================================
  // 43. OPERATIVE DETAILS
  // =========================================================
  {
    title: "43. Operative Details",
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
        label: "Bypass Details",
        name: "bypassDetails",
      },
      {
        type: "textarea",
        label: "Valve Procedure Details",
        name: "operativeValveDetails",
      },
      {
        type: "textarea",
        label: "Chest Drain Details",
        name: "chestDrainDetails",
      },
      {
        type: "textarea",
        label: "Implant / Prosthesis",
        name: "implantProsthesis",
      },
      {
        type: "textarea",
        label: "Intraoperative Complications",
        name: "intraoperativeComplications",
      },
    ],
  },

  // =========================================================
  // 44. POSTOPERATIVE ASSESSMENT
  // =========================================================
  {
    title: "44. Postoperative Assessment",
    type: "checkbox",
    fields: [
      ["Hemodynamically Stable", "hemodynamicallyStable"],
      ["Respiratorily Stable", "respiratorilyStable"],
      ["Postoperative Bleeding", "postoperativeBleeding"],
      ["Cardiac Arrhythmia", "postoperativeArrhythmia"],
      ["Atrial Fibrillation", "postoperativeAf"],
      ["Low Cardiac Output", "lowCardiacOutput"],
      ["Respiratory Failure", "postoperativeRespiratoryFailure"],
      ["Pneumonia", "postoperativePneumonia"],
      ["Atelectasis", "atelectasis"],
      ["Pneumothorax", "postoperativePneumothorax"],
      ["Pleural Effusion", "postoperativePleuralEffusion"],
      ["Wound Infection", "postoperativeWoundInfection"],
      ["Renal Dysfunction", "postoperativeRenalDysfunction"],
      ["Neurological Complication", "postoperativeNeurologicalComplication"],
    ],
  },

  // =========================================================
  // 45. ICU / POSTOPERATIVE MONITORING
  // =========================================================
  {
    title: "45. ICU & Postoperative Monitoring",
    fields: [
      {
        type: "textarea",
        label: "Hemodynamic Status",
        name: "hemodynamicStatus",
      },
      {
        type: "textarea",
        label: "Respiratory Status",
        name: "postoperativeRespiratoryStatus",
      },
      {
        type: "textarea",
        label: "Ventilator Status",
        name: "ventilatorStatus",
      },
      {
        type: "textarea",
        label: "Chest Drain Output",
        name: "chestDrainOutput",
      },
      {
        type: "textarea",
        label: "Urine Output",
        name: "urineOutput",
      },
      {
        type: "textarea",
        label: "Cardiac Rhythm",
        name: "postoperativeCardiacRhythm",
      },
      {
        type: "textarea",
        label: "Pain Control",
        name: "painControl",
      },
      {
        type: "textarea",
        label: "Postoperative Imaging",
        name: "postoperativeImaging",
      },
      {
        type: "textarea",
        label: "ICU Plan",
        name: "icuPlan",
      },
    ],
  },

  // =========================================================
  // 46. PATHOLOGY
  // =========================================================
  {
    title: "46. Histopathology / Pathology",
    fields: [
      {
        type: "textarea",
        label: "Specimen",
        name: "pathologySpecimen",
      },
      {
        type: "textarea",
        label: "Histopathology",
        name: "histopathology",
      },
      {
        type: "textarea",
        label: "Tumor Type",
        name: "pathologyTumorType",
      },
      {
        type: "textarea",
        label: "Tumor Grade",
        name: "tumorGrade",
      },
      {
        type: "textarea",
        label: "TNM Stage",
        name: "tnmStage",
      },
      {
        type: "textarea",
        label: "Margins",
        name: "pathologyMargins",
      },
      {
        type: "textarea",
        label: "Lymph Nodes",
        name: "pathologyLymphNodes",
      },
      {
        type: "textarea",
        label: "Pathology Impression",
        name: "pathologyImpression",
      },
    ],
  },

  // =========================================================
  // 47. ASSESSMENT & DIAGNOSIS
  // =========================================================
  {
    title: "47. Assessment & Diagnosis",
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
        label: "Secondary Diagnosis",
        name: "secondaryDiagnosis",
      },
      {
        type: "textarea",
        label: "Cardiac Diagnosis",
        name: "cardiacDiagnosis",
      },
      {
        type: "textarea",
        label: "Thoracic Diagnosis",
        name: "thoracicDiagnosis",
      },
      {
        type: "textarea",
        label: "Differential Diagnosis",
        name: "differentialDiagnosis",
      },
      {
        type: "textarea",
        label: "Overall Surgical Assessment",
        name: "overallSurgicalAssessment",
      },
    ],
  },

  // =========================================================
  // 48. TREATMENT PLAN
  // =========================================================
  {
    title: "48. Treatment Plan",
    fields: [
      {
        type: "textarea",
        label: "Medical Management",
        name: "medicalManagement",
      },
      {
        type: "textarea",
        label: "Surgical Management",
        name: "surgicalManagement",
      },
      {
        type: "textarea",
        label: "Medication Plan",
        name: "medicationPlan",
      },
      {
        type: "textarea",
        label: "Cardiac Rehabilitation",
        name: "cardiacRehabilitation",
      },
      {
        type: "textarea",
        label: "Pulmonary Rehabilitation",
        name: "pulmonaryRehabilitation",
      },
      {
        type: "textarea",
        label: "Dietary Advice",
        name: "dietaryAdvice",
      },
      {
        type: "textarea",
        label: "Lifestyle Modification",
        name: "lifestyleModification",
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
  // 49. DISCHARGE / FOLLOW-UP
  // =========================================================
  {
    title: "49. Discharge & Follow-up",
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
          "Postoperative Review",
          "Wound Review",
          "Cardiac Review",
          "Thoracic Review",
          "Imaging Review",
          "Oncology Review",
          "Rehabilitation Review",
          "Urgent",
          "As Required",
        ],
      },
      {
        type: "textarea",
        label: "Discharge Instructions",
        name: "dischargeInstructions",
      },
      {
        type: "textarea",
        label: "Activity Restrictions",
        name: "activityRestrictions",
      },
      {
        type: "textarea",
        label: "Wound Care Instructions",
        name: "woundCareInstructions",
      },
      {
        type: "textarea",
        label: "Medication Instructions",
        name: "medicationInstructions",
      },
      {
        type: "textarea",
        label: "Additional Notes",
        name: "additionalNotes",
      },
    ],
  },
];