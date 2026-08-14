export const anesthesiologistAssessmentSections = [
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
        type: "input",
        label: "Weight (kg)",
        name: "weight",
      },
      {
        type: "input",
        label: "Height (cm)",
        name: "height",
      },
      {
        type: "input",
        label: "BMI",
        name: "bmi",
      },
      {
        type: "select",
        label: "Assessment Type",
        name: "assessmentType",
        options: [
          "Preoperative Assessment",
          "Pre-Anesthesia Evaluation",
          "Emergency Surgery Assessment",
          "Obstetric Anesthesia Assessment",
          "Pain Management Assessment",
          "Postoperative Assessment",
          "Follow-up",
        ],
      },
    ],
  },

  // =========================================================
  // 2. PLANNED PROCEDURE
  // =========================================================
  {
    title: "2. Planned Procedure",
    fields: [
      {
        type: "textarea",
        label: "Planned Procedure / Surgery",
        name: "plannedProcedure",
      },
      {
        type: "input",
        label: "Surgical Diagnosis",
        name: "surgicalDiagnosis",
      },
      {
        type: "select",
        label: "Surgery Urgency",
        name: "surgeryUrgency",
        options: [
          "Elective",
          "Urgent",
          "Emergency",
        ],
      },
      {
        type: "select",
        label: "Expected Surgical Duration",
        name: "expectedSurgicalDuration",
        options: [
          "Less than 1 hour",
          "1-2 hours",
          "2-4 hours",
          "More than 4 hours",
          "Unknown",
        ],
      },
      {
        type: "textarea",
        label: "Relevant Surgical Details",
        name: "relevantSurgicalDetails",
      },
    ],
  },

  // =========================================================
  // 3. CHIEF CONCERNS
  // =========================================================
  {
    title: "3. Current Symptoms / Concerns",
    type: "checkbox",
    fields: [
      ["Chest Pain", "chestPain"],
      ["Breathing Difficulty", "breathingDifficulty"],
      ["Cough", "cough"],
      ["Fever", "fever"],
      ["Palpitations", "palpitations"],
      ["Dizziness", "dizziness"],
      ["Syncope", "syncope"],
      ["Fatigue", "fatigue"],
      ["Recent Infection", "recentInfection"],
      ["Nausea / Vomiting", "nauseaVomiting"],
      ["Pain", "pain"],
      ["Bleeding / Bruising", "bleedingBruising"],
    ],
  },

  // =========================================================
  // 4. MEDICAL HISTORY
  // =========================================================
  {
    title: "4. Past Medical History",
    type: "checkbox",
    fields: [
      ["Hypertension", "hypertension"],
      ["Diabetes Mellitus", "diabetes"],
      ["Heart Disease", "heartDisease"],
      ["Coronary Artery Disease", "coronaryArteryDisease"],
      ["Heart Failure", "heartFailure"],
      ["Arrhythmia", "arrhythmia"],
      ["Asthma", "asthma"],
      ["COPD", "copd"],
      ["Obstructive Sleep Apnea", "obstructiveSleepApnea"],
      ["Kidney Disease", "kidneyDisease"],
      ["Liver Disease", "liverDisease"],
      ["Thyroid Disease", "thyroidDisease"],
      ["Neurological Disease", "neurologicalDisease"],
      ["Seizure Disorder", "seizureDisorder"],
      ["Stroke / TIA", "strokeTIA"],
      ["Bleeding Disorder", "bleedingDisorder"],
      ["Anemia", "anemia"],
      ["GERD", "gerd"],
      ["Cancer", "cancer"],
      ["Other Chronic Disease", "otherChronicDisease"],
    ],
  },

  {
    title: "5. Medical History Details",
    fields: [
      {
        type: "textarea",
        label: "Relevant Medical History",
        name: "relevantMedicalHistory",
      },
      {
        type: "textarea",
        label: "Cardiac History",
        name: "cardiacHistory",
      },
      {
        type: "textarea",
        label: "Respiratory History",
        name: "respiratoryHistory",
      },
      {
        type: "textarea",
        label: "Neurological History",
        name: "neurologicalHistory",
      },
      {
        type: "textarea",
        label: "Renal / Hepatic History",
        name: "renalHepaticHistory",
      },
    ],
  },

  // =========================================================
  // 6. PREVIOUS ANESTHESIA HISTORY
  // =========================================================
  {
    title: "6. Previous Anesthesia History",
    type: "checkbox",
    fields: [
      ["Previous General Anesthesia", "previousGeneralAnesthesia"],
      ["Previous Regional Anesthesia", "previousRegionalAnesthesia"],
      ["Previous Spinal Anesthesia", "previousSpinalAnesthesia"],
      ["Previous Epidural Anesthesia", "previousEpiduralAnesthesia"],
      ["Previous Sedation", "previousSedation"],
      ["Difficult Intubation", "difficultIntubation"],
      ["Difficult Airway", "difficultAirway"],
      ["Postoperative Nausea / Vomiting", "previousPONV"],
      ["Anesthesia Allergy / Reaction", "anesthesiaReaction"],
      ["Malignant Hyperthermia History", "malignantHyperthermia"],
      ["Postoperative ICU Admission", "previousICUAdmission"],
    ],
  },

  {
    title: "7. Previous Anesthesia Details",
    fields: [
      {
        type: "textarea",
        label: "Previous Anesthesia Details",
        name: "previousAnesthesiaDetails",
      },
      {
        type: "textarea",
        label: "Previous Airway Difficulties",
        name: "previousAirwayDifficulties",
      },
      {
        type: "textarea",
        label: "Previous Anesthesia Complications",
        name: "previousAnesthesiaComplications",
      },
      {
        type: "textarea",
        label: "Previous Postoperative Complications",
        name: "previousPostoperativeComplications",
      },
    ],
  },

  // =========================================================
  // 8. MEDICATIONS
  // =========================================================
  {
    title: "8. Current Medications",
    fields: [
      {
        type: "textarea",
        label: "Current Medications",
        name: "currentMedications",
      },
      {
        type: "textarea",
        label: "Anticoagulants / Antiplatelets",
        name: "anticoagulantsAntiplatelets",
      },
      {
        type: "textarea",
        label: "Antihypertensive Medications",
        name: "antihypertensiveMedications",
      },
      {
        type: "textarea",
        label: "Diabetes Medications",
        name: "diabetesMedications",
      },
      {
        type: "textarea",
        label: "Steroids",
        name: "steroids",
      },
      {
        type: "textarea",
        label: "Other Important Medications",
        name: "otherImportantMedications",
      },
    ],
  },

  // =========================================================
  // 9. ALLERGIES
  // =========================================================
  {
    title: "9. Allergy History",
    type: "checkbox",
    fields: [
      ["Drug Allergy", "drugAllergy"],
      ["Latex Allergy", "latexAllergy"],
      ["Food Allergy", "foodAllergy"],
      ["Contrast Allergy", "contrastAllergy"],
      ["Previous Anesthetic Reaction", "previousAnestheticReaction"],
      ["No Known Allergies", "noKnownAllergies"],
    ],
  },

  {
    title: "10. Allergy Details",
    fields: [
      {
        type: "textarea",
        label: "Known Allergens",
        name: "knownAllergens",
      },
      {
        type: "textarea",
        label: "Allergic Reaction Details",
        name: "allergicReactionDetails",
      },
      {
        type: "textarea",
        label: "Severity of Previous Reaction",
        name: "allergyReactionSeverity",
      },
    ],
  },

  // =========================================================
  // 11. AIRWAY ASSESSMENT
  // =========================================================
  {
    title: "11. Airway Assessment",
    fields: [
      {
        type: "select",
        label: "Mallampati Class",
        name: "mallampatiClass",
        options: [
          "Class I",
          "Class II",
          "Class III",
          "Class IV",
          "Unable to Assess",
        ],
      },
      {
        type: "select",
        label: "Mouth Opening",
        name: "mouthOpening",
        options: [
          "Normal",
          "Reduced",
          "Severely Reduced",
          "Unable to Assess",
        ],
      },
      {
        type: "select",
        label: "Neck Mobility",
        name: "neckMobility",
        options: [
          "Normal",
          "Limited",
          "Severely Limited",
        ],
      },
      {
        type: "select",
        label: "Thyromental Distance",
        name: "thyromentalDistance",
        options: [
          "Normal",
          "Reduced",
          "Unable to Assess",
        ],
      },
      {
        type: "select",
        label: "Dentition",
        name: "dentition",
        options: [
          "Normal",
          "Loose Teeth",
          "Missing Teeth",
          "Poor Dentition",
          "Dentures",
          "Other",
        ],
      },
      {
        type: "select",
        label: "Airway Difficulty Risk",
        name: "airwayDifficultyRisk",
        options: [
          "Low",
          "Moderate",
          "High",
          "Unable to Assess",
        ],
      },
    ],
  },

  {
    title: "12. Airway Findings",
    fields: [
      {
        type: "textarea",
        label: "Airway Examination Findings",
        name: "airwayExaminationFindings",
      },
      {
        type: "textarea",
        label: "Previous Difficult Airway Details",
        name: "previousDifficultAirwayDetails",
      },
      {
        type: "textarea",
        label: "Airway Management Considerations",
        name: "airwayManagementConsiderations",
      },
    ],
  },

  // =========================================================
  // 13. CARDIOVASCULAR ASSESSMENT
  // =========================================================
  {
    title: "13. Cardiovascular Assessment",
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
        type: "select",
        label: "Cardiovascular Functional Status",
        name: "cardiovascularFunctionalStatus",
        options: [
          "Normal",
          "Mild Limitation",
          "Moderate Limitation",
          "Severe Limitation",
          "Unable to Assess",
        ],
      },
      {
        type: "textarea",
        label: "Cardiovascular Examination",
        name: "cardiovascularExamination",
      },
      {
        type: "textarea",
        label: "Cardiac Risk Factors",
        name: "cardiacRiskFactors",
      },
    ],
  },

  // =========================================================
  // 14. RESPIRATORY ASSESSMENT
  // =========================================================
  {
    title: "14. Respiratory Assessment",
    fields: [
      {
        type: "input",
        label: "Respiratory Rate",
        name: "respiratoryRate",
      },
      {
        type: "input",
        label: "Oxygen Saturation (%)",
        name: "oxygenSaturation",
      },
      {
        type: "select",
        label: "Breath Sounds",
        name: "breathSounds",
        options: [
          "Normal",
          "Wheeze",
          "Crackles",
          "Reduced",
          "Absent",
          "Other",
        ],
      },
      {
        type: "textarea",
        label: "Respiratory Examination",
        name: "respiratoryExamination",
      },
      {
        type: "textarea",
        label: "Respiratory Risk Factors",
        name: "respiratoryRiskFactors",
      },
    ],
  },

  // =========================================================
  // 15. VITAL SIGNS
  // =========================================================
  {
    title: "15. Vital Signs",
    fields: [
      {
        type: "input",
        label: "Temperature",
        name: "temperature",
      },
      {
        type: "input",
        label: "Blood Pressure",
        name: "vitalBloodPressure",
      },
      {
        type: "input",
        label: "Pulse Rate",
        name: "pulseRate",
      },
      {
        type: "input",
        label: "Respiratory Rate",
        name: "vitalRespiratoryRate",
      },
      {
        type: "input",
        label: "SpO₂",
        name: "spo2",
      },
      {
        type: "input",
        label: "Pain Score (0-10)",
        name: "painScore",
      },
    ],
  },

  // =========================================================
  // 16. FUNCTIONAL CAPACITY
  // =========================================================
  {
    title: "16. Functional Capacity",
    fields: [
      {
        type: "select",
        label: "Exercise Tolerance",
        name: "exerciseTolerance",
        options: [
          "Good",
          "Fair",
          "Poor",
          "Unable to Assess",
        ],
      },
      {
        type: "select",
        label: "Functional Capacity",
        name: "functionalCapacity",
        options: [
          "Normal",
          "Mildly Reduced",
          "Moderately Reduced",
          "Severely Reduced",
          "Unable to Assess",
        ],
      },
      {
        type: "textarea",
        label: "Functional Capacity Details",
        name: "functionalCapacityDetails",
      },
    ],
  },

  // =========================================================
  // 17. FASTING ASSESSMENT
  // =========================================================
  {
    title: "17. Fasting Assessment",
    fields: [
      {
        type: "input",
        label: "Last Solid Food Intake",
        name: "lastSolidFoodIntake",
      },
      {
        type: "input",
        label: "Last Clear Fluid Intake",
        name: "lastClearFluidIntake",
      },
      {
        type: "select",
        label: "Fasting Status",
        name: "fastingStatus",
        options: [
          "Adequate",
          "Inadequate",
          "Emergency / Not Fasted",
          "Unable to Confirm",
        ],
      },
      {
        type: "textarea",
        label: "Fasting Notes",
        name: "fastingNotes",
      },
    ],
  },

  // =========================================================
  // 18. INVESTIGATIONS
  // =========================================================
  {
    title: "18. Preoperative Investigations",
    type: "checkbox",
    fields: [
      ["CBC", "cbcAvailable"],
      ["Blood Glucose", "bloodGlucoseAvailable"],
      ["Renal Function", "renalFunctionAvailable"],
      ["Liver Function", "liverFunctionAvailable"],
      ["Electrolytes", "electrolytesAvailable"],
      ["Coagulation Profile", "coagulationProfileAvailable"],
      ["ECG", "ecgAvailable"],
      ["Chest X-Ray", "chestXrayAvailable"],
      ["Echocardiogram", "echocardiogramAvailable"],
      ["Pulmonary Function Test", "pftAvailable"],
      ["Other Investigation", "otherInvestigationAvailable"],
    ],
  },

  {
    title: "19. Investigation Results",
    fields: [
      {
        type: "textarea",
        label: "CBC Results",
        name: "cbcResults",
      },
      {
        type: "textarea",
        label: "Renal Function Results",
        name: "renalFunctionResults",
      },
      {
        type: "textarea",
        label: "Liver Function Results",
        name: "liverFunctionResults",
      },
      {
        type: "textarea",
        label: "Electrolyte Results",
        name: "electrolyteResults",
      },
      {
        type: "textarea",
        label: "Coagulation Results",
        name: "coagulationResults",
      },
      {
        type: "textarea",
        label: "ECG Findings",
        name: "ecgFindings",
      },
      {
        type: "textarea",
        label: "Echocardiogram Findings",
        name: "echocardiogramFindings",
      },
      {
        type: "textarea",
        label: "Other Investigation Results",
        name: "otherInvestigationResults",
      },
    ],
  },

  // =========================================================
  // 20. PREGNANCY / OBSTETRIC ASSESSMENT
  // =========================================================
  {
    title: "20. Pregnancy / Obstetric Assessment",
    type: "checkbox",
    fields: [
      ["Pregnant", "pregnant"],
      ["Postpartum", "postpartum"],
      ["High-Risk Pregnancy", "highRiskPregnancy"],
      ["Pre-eclampsia", "preEclampsia"],
      ["Gestational Diabetes", "gestationalDiabetes"],
      ["Placental Abnormality", "placentalAbnormality"],
      ["Other Obstetric Concern", "otherObstetricConcern"],
    ],
  },

  {
    title: "21. Obstetric Details",
    fields: [
      {
        type: "input",
        label: "Gestational Age",
        name: "gestationalAge",
      },
      {
        type: "input",
        label: "Gravida",
        name: "gravida",
      },
      {
        type: "input",
        label: "Para",
        name: "para",
      },
      {
        type: "textarea",
        label: "Obstetric History",
        name: "obstetricHistory",
      },
      {
        type: "textarea",
        label: "Obstetric Anesthesia Considerations",
        name: "obstetricAnesthesiaConsiderations",
      },
    ],
  },

  // =========================================================
  // 22. ASA CLASSIFICATION
  // =========================================================
  {
    title: "22. Anesthesia Risk Assessment",
    fields: [
      {
        type: "select",
        label: "ASA Physical Status",
        name: "asaPhysicalStatus",
        options: [
          "ASA I",
          "ASA II",
          "ASA III",
          "ASA IV",
          "ASA V",
          "ASA VI",
          "Emergency Modifier (E)",
          "Not Yet Assigned",
        ],
      },
      {
        type: "select",
        label: "Overall Anesthesia Risk",
        name: "overallAnesthesiaRisk",
        options: [
          "Low",
          "Moderate",
          "High",
          "Very High",
        ],
      },
      {
        type: "textarea",
        label: "Risk Factors",
        name: "anesthesiaRiskFactors",
      },
      {
        type: "textarea",
        label: "Risk Assessment Summary",
        name: "riskAssessmentSummary",
      },
    ],
  },

  // =========================================================
  // 23. ANESTHESIA PLAN
  // =========================================================
  {
    title: "23. Planned Anesthesia",
    type: "checkbox",
    fields: [
      ["General Anesthesia", "generalAnesthesia"],
      ["Spinal Anesthesia", "spinalAnesthesia"],
      ["Epidural Anesthesia", "epiduralAnesthesia"],
      ["Combined Spinal-Epidural", "combinedSpinalEpidural"],
      ["Regional Block", "regionalBlock"],
      ["Local Anesthesia", "localAnesthesia"],
      ["Monitored Anesthesia Care", "monitoredAnesthesiaCare"],
      ["Procedural Sedation", "proceduralSedation"],
    ],
  },

  {
    title: "24. Anesthesia Plan Details",
    fields: [
      {
        type: "textarea",
        label: "Primary Anesthesia Plan",
        name: "primaryAnesthesiaPlan",
      },
      {
        type: "textarea",
        label: "Alternative Anesthesia Plan",
        name: "alternativeAnesthesiaPlan",
      },
      {
        type: "textarea",
        label: "Airway Management Plan",
        name: "airwayManagementPlan",
      },
      {
        type: "textarea",
        label: "Regional Anesthesia Plan",
        name: "regionalAnesthesiaPlan",
      },
      {
        type: "textarea",
        label: "Postoperative Pain Management Plan",
        name: "postoperativePainManagementPlan",
      },
    ],
  },

  // =========================================================
  // 25. BLOOD / TRANSFUSION
  // =========================================================
  {
    title: "25. Blood Management",
    type: "checkbox",
    fields: [
      ["Blood Type Known", "bloodTypeKnown"],
      ["Crossmatch Required", "crossmatchRequired"],
      ["Blood Products Available", "bloodProductsAvailable"],
      ["Expected Significant Blood Loss", "expectedSignificantBloodLoss"],
      ["Previous Transfusion", "previousTransfusion"],
      ["Previous Transfusion Reaction", "previousTransfusionReaction"],
    ],
  },

  {
    title: "26. Blood Management Details",
    fields: [
      {
        type: "input",
        label: "Blood Group",
        name: "bloodGroup",
      },
      {
        type: "textarea",
        label: "Crossmatch Details",
        name: "crossmatchDetails",
      },
      {
        type: "textarea",
        label: "Transfusion History",
        name: "transfusionHistory",
      },
      {
        type: "textarea",
        label: "Blood Management Plan",
        name: "bloodManagementPlan",
      },
    ],
  },

  // =========================================================
  // 27. CONSENT
  // =========================================================
  {
    title: "27. Anesthesia Consent",
    type: "checkbox",
    fields: [
      ["Anesthesia Risks Discussed", "anesthesiaRisksDiscussed"],
      ["General Anesthesia Explained", "generalAnesthesiaExplained"],
      ["Regional Anesthesia Explained", "regionalAnesthesiaExplained"],
      ["Blood Transfusion Discussed", "bloodTransfusionDiscussed"],
      ["Postoperative Ventilation Discussed", "postoperativeVentilationDiscussed"],
      ["ICU Admission Possibility Discussed", "icuAdmissionDiscussed"],
      ["Patient Questions Answered", "patientQuestionsAnswered"],
      ["Consent Obtained", "consentObtained"],
    ],
  },

  {
    title: "28. Consent Details",
    fields: [
      {
        type: "textarea",
        label: "Risks Discussed",
        name: "risksDiscussed",
      },
      {
        type: "textarea",
        label: "Alternatives Discussed",
        name: "alternativesDiscussed",
      },
      {
        type: "textarea",
        label: "Patient / Family Questions",
        name: "patientFamilyQuestions",
      },
      {
        type: "textarea",
        label: "Consent Notes",
        name: "consentNotes",
      },
    ],
  },

  // =========================================================
  // 29. INTRAOPERATIVE MONITORING
  // =========================================================
  {
    title: "29. Planned Intraoperative Monitoring",
    type: "checkbox",
    fields: [
      ["ECG", "monitorECG"],
      ["Non-Invasive Blood Pressure", "monitorNIBP"],
      ["Pulse Oximetry", "monitorPulseOximetry"],
      ["Capnography", "monitorCapnography"],
      ["Temperature", "monitorTemperature"],
      ["Urine Output", "monitorUrineOutput"],
      ["Invasive Arterial Monitoring", "monitorArterial"],
      ["Central Venous Monitoring", "monitorCentralVenous"],
      ["Neuromuscular Monitoring", "monitorNeuromuscular"],
      ["Other Advanced Monitoring", "monitorOtherAdvanced"],
    ],
  },

  // =========================================================
  // 30. POST-ANESTHESIA
  // =========================================================
  {
    title: "30. Post-Anesthesia Care Plan",
    fields: [
      {
        type: "select",
        label: "Expected Recovery Location",
        name: "expectedRecoveryLocation",
        options: [
          "PACU",
          "Ward",
          "HDU",
          "ICU",
          "Other",
        ],
      },
      {
        type: "select",
        label: "Postoperative Ventilation Expected",
        name: "postoperativeVentilationExpected",
        options: [
          "No",
          "Possible",
          "Likely",
          "Planned",
        ],
      },
      {
        type: "textarea",
        label: "Postoperative Pain Plan",
        name: "postoperativePainPlan",
      },
      {
        type: "textarea",
        label: "Postoperative Nausea / Vomiting Plan",
        name: "postoperativeNauseaVomitingPlan",
      },
      {
        type: "textarea",
        label: "Postoperative Monitoring Plan",
        name: "postoperativeMonitoringPlan",
      },
    ],
  },

  // =========================================================
  // 31. SPECIAL CONSIDERATIONS
  // =========================================================
  {
    title: "31. Special Anesthesia Considerations",
    type: "checkbox",
    fields: [
      ["Difficult Airway Anticipated", "difficultAirwayAnticipated"],
      ["Aspiration Risk", "aspirationRisk"],
      ["Hemodynamic Instability Risk", "hemodynamicInstabilityRisk"],
      ["Respiratory Compromise Risk", "respiratoryCompromiseRisk"],
      ["Bleeding Risk", "bleedingRisk"],
      ["Positioning Risk", "positioningRisk"],
      ["Hypothermia Risk", "hypothermiaRisk"],
      ["Postoperative ICU Risk", "postoperativeICURisk"],
      ["Postoperative Ventilation Risk", "postoperativeVentilationRisk"],
      ["Other Special Risk", "otherSpecialRisk"],
    ],
  },

  {
    title: "32. Special Considerations Details",
    fields: [
      {
        type: "textarea",
        label: "Special Anesthesia Concerns",
        name: "specialAnesthesiaConcerns",
      },
      {
        type: "textarea",
        label: "Risk Mitigation Plan",
        name: "riskMitigationPlan",
      },
      {
        type: "textarea",
        label: "Additional Precautions",
        name: "additionalPrecautions",
      },
    ],
  },

  // =========================================================
  // 33. FINAL ASSESSMENT
  // =========================================================
  {
    title: "33. Final Anesthesia Assessment",
    fields: [
      {
        type: "select",
        label: "Anesthesia Fitness",
        name: "anesthesiaFitness",
        options: [
          "Fit for Anesthesia",
          "Fit with Precautions",
          "Requires Further Optimization",
          "Postpone / Defer",
          "Not Fit for Anesthesia",
          "Emergency Proceeding",
        ],
      },
      {
        type: "textarea",
        label: "Final Assessment",
        name: "finalAssessment",
      },
      {
        type: "textarea",
        label: "Optimization Required",
        name: "optimizationRequired",
      },
      {
        type: "textarea",
        label: "Anesthesia Recommendations",
        name: "anesthesiaRecommendations",
      },
    ],
  },

  // =========================================================
  // 34. FOLLOW-UP
  // =========================================================
  {
    title: "34. Follow-up",
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
          "Preoperative Review",
          "Postoperative Review",
          "Pain Management Review",
          "Anesthesia Follow-up",
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