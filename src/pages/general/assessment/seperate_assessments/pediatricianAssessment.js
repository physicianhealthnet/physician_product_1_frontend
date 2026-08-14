export const pediatricianAssessmentSections = [
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
        label: "Date of Birth",
        name: "dateOfBirth",
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
        label: "Parent / Guardian Name",
        name: "guardianName",
      },
      {
        type: "select",
        label: "Relationship to Child",
        name: "guardianRelationship",
        options: [
          "Father",
          "Mother",
          "Guardian",
          "Grandparent",
          "Other",
        ],
      },
      {
        type: "input",
        label: "Contact Number",
        name: "contactNumber",
      },
      {
        type: "input",
        label: "Address",
        name: "address",
      },
      {
        type: "select",
        label: "Visit Type",
        name: "visitType",
        options: [
          "New Consultation",
          "Follow-up",
          "Routine Check-up",
          "Vaccination",
          "Emergency",
          "Growth Assessment",
          "Developmental Assessment",
        ],
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
      ["Fever", "fever"],
      ["Cough", "cough"],
      ["Cold / Runny Nose", "coldRunnyNose"],
      ["Breathing Difficulty", "breathingDifficulty"],
      ["Wheezing", "wheezing"],
      ["Sore Throat", "soreThroat"],
      ["Ear Pain", "earPain"],
      ["Vomiting", "vomiting"],
      ["Diarrhea", "diarrhea"],
      ["Abdominal Pain", "abdominalPain"],
      ["Constipation", "constipation"],
      ["Poor Appetite", "poorAppetite"],
      ["Weight Loss", "weightLoss"],
      ["Poor Weight Gain", "poorWeightGain"],
      ["Excessive Crying", "excessiveCrying"],
      ["Irritability", "irritability"],
      ["Lethargy", "lethargy"],
      ["Headache", "headache"],
      ["Seizure", "seizure"],
      ["Rash", "rash"],
      ["Itching", "itching"],
      ["Joint Pain", "jointPain"],
      ["Swelling", "swelling"],
      ["Urinary Symptoms", "urinarySymptoms"],
      ["Sleep Problems", "sleepProblems"],
      ["Developmental Concern", "developmentalConcern"],
      ["Behavioral Concern", "behavioralConcern"],
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
        label: "Onset",
        name: "onset",
      },
      {
        type: "input",
        label: "Duration",
        name: "duration",
      },
      {
        type: "textarea",
        label: "Progression of Symptoms",
        name: "symptomProgression",
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
      {
        type: "textarea",
        label: "Response to Previous Treatment",
        name: "previousTreatmentResponse",
      },
    ],
  },

  // =========================================================
  // 4. BIRTH HISTORY
  // =========================================================
  {
    title: "4. Birth History",
    fields: [
      {
        type: "select",
        label: "Place of Birth",
        name: "placeOfBirth",
        options: [
          "Hospital",
          "Nursing Home",
          "Home",
          "Other",
        ],
      },
      {
        type: "select",
        label: "Mode of Delivery",
        name: "modeOfDelivery",
        options: [
          "Normal Vaginal Delivery",
          "Cesarean Section",
          "Assisted Vaginal Delivery",
          "Other",
        ],
      },
      {
        type: "select",
        label: "Gestational Age",
        name: "gestationalAge",
        options: [
          "Preterm",
          "Term",
          "Post-term",
          "Unknown",
        ],
      },
      {
        type: "input",
        label: "Birth Weight",
        name: "birthWeight",
      },
      {
        type: "input",
        label: "Birth Length",
        name: "birthLength",
      },
      {
        type: "select",
        label: "Birth Cry",
        name: "birthCry",
        options: [
          "Immediate",
          "Delayed",
          "Required Resuscitation",
          "Unknown",
        ],
      },
      {
        type: "textarea",
        label: "NICU Admission",
        name: "nicuAdmission",
      },
      {
        type: "textarea",
        label: "Neonatal Complications",
        name: "neonatalComplications",
      },
    ],
  },

  // =========================================================
  // 5. NEONATAL HISTORY
  // =========================================================
  {
    title: "5. Neonatal History",
    type: "checkbox",
    fields: [
      ["NICU Admission", "nicuAdmissionHistory"],
      ["Neonatal Jaundice", "neonatalJaundice"],
      ["Respiratory Distress", "neonatalRespiratoryDistress"],
      ["Sepsis", "neonatalSepsis"],
      ["Neonatal Seizures", "neonatalSeizures"],
      ["Hypoglycemia", "neonatalHypoglycemia"],
      ["Birth Asphyxia", "birthAsphyxia"],
      ["Feeding Difficulty", "neonatalFeedingDifficulty"],
      ["Congenital Abnormality", "congenitalAbnormality"],
      ["Phototherapy", "phototherapy"],
      ["Mechanical Ventilation", "mechanicalVentilation"],
    ],
  },

  // =========================================================
  // 6. DEVELOPMENTAL HISTORY
  // =========================================================
  {
    title: "6. Developmental History",
    type: "checkbox",
    fields: [
      ["Development Appropriate for Age", "developmentAppropriate"],
      ["Gross Motor Delay", "grossMotorDelay"],
      ["Fine Motor Delay", "fineMotorDelay"],
      ["Speech Delay", "speechDelay"],
      ["Language Delay", "languageDelay"],
      ["Social Delay", "socialDelay"],
      ["Cognitive Delay", "cognitiveDelay"],
      ["Behavioral Concern", "developmentalBehavioralConcern"],
      ["Regression of Skills", "regressionOfSkills"],
    ],
  },

  {
    title: "7. Developmental Milestones",
    fields: [
      {
        type: "input",
        label: "Head Control",
        name: "headControl",
      },
      {
        type: "input",
        label: "Rolling Over",
        name: "rollingOver",
      },
      {
        type: "input",
        label: "Sitting",
        name: "sittingMilestone",
      },
      {
        type: "input",
        label: "Crawling",
        name: "crawlingMilestone",
      },
      {
        type: "input",
        label: "Standing",
        name: "standingMilestone",
      },
      {
        type: "input",
        label: "Walking",
        name: "walkingMilestone",
      },
      {
        type: "input",
        label: "First Words",
        name: "firstWords",
      },
      {
        type: "input",
        label: "Two-word Phrases",
        name: "twoWordPhrases",
      },
      {
        type: "textarea",
        label: "Developmental Assessment",
        name: "developmentalAssessment",
      },
    ],
  },

  // =========================================================
  // 8. GROWTH PARAMETERS
  // =========================================================
  {
    title: "8. Growth Parameters",
    fields: [
      {
        type: "input",
        label: "Weight",
        name: "weight",
      },
      {
        type: "input",
        label: "Height / Length",
        name: "heightLength",
      },
      {
        type: "input",
        label: "Head Circumference",
        name: "headCircumference",
      },
      {
        type: "input",
        label: "BMI",
        name: "bmi",
      },
      {
        type: "input",
        label: "Weight-for-Age",
        name: "weightForAge",
      },
      {
        type: "input",
        label: "Height-for-Age",
        name: "heightForAge",
      },
      {
        type: "input",
        label: "Weight-for-Height",
        name: "weightForHeight",
      },
      {
        type: "textarea",
        label: "Growth Chart Interpretation",
        name: "growthChartInterpretation",
      },
    ],
  },

  // =========================================================
  // 9. NUTRITION & FEEDING
  // =========================================================
  {
    title: "9. Nutrition & Feeding History",
    type: "checkbox",
    fields: [
      ["Exclusive Breastfeeding", "exclusiveBreastfeeding"],
      ["Mixed Feeding", "mixedFeeding"],
      ["Formula Feeding", "formulaFeeding"],
      ["Complementary Feeding Started", "complementaryFeeding"],
      ["Poor Feeding", "poorFeeding"],
      ["Feeding Difficulty", "feedingDifficulty"],
      ["Food Intolerance", "foodIntolerance"],
      ["Food Allergy", "foodAllergy"],
      ["Picky Eating", "pickyEating"],
      ["Malnutrition Risk", "malnutritionRisk"],
    ],
  },

  {
    title: "10. Nutrition Details",
    fields: [
      {
        type: "textarea",
        label: "Breastfeeding Details",
        name: "breastfeedingDetails",
      },
      {
        type: "textarea",
        label: "Formula Details",
        name: "formulaDetails",
      },
      {
        type: "textarea",
        label: "Complementary Food Details",
        name: "complementaryFoodDetails",
      },
      {
        type: "textarea",
        label: "Daily Diet",
        name: "dailyDiet",
      },
      {
        type: "textarea",
        label: "Nutritional Advice",
        name: "nutritionalAdvice",
      },
    ],
  },

  // =========================================================
  // 11. IMMUNIZATION
  // =========================================================
  {
    title: "11. Immunization History",
    type: "checkbox",
    fields: [
      ["BCG", "bcg"],
      ["OPV", "opv"],
      ["IPV", "ipv"],
      ["Hepatitis B", "hepatitisB"],
      ["Pentavalent", "pentavalent"],
      ["Rotavirus", "rotavirus"],
      ["Pneumococcal", "pneumococcal"],
      ["Measles", "measles"],
      ["MMR", "mmr"],
      ["DPT", "dpt"],
      ["Hib", "hib"],
      ["Varicella", "varicella"],
      ["Hepatitis A", "hepatitisA"],
      ["Typhoid", "typhoid"],
      ["Influenza", "influenza"],
      ["Meningococcal", "meningococcal"],
      ["HPV", "hpv"],
    ],
  },

  {
    title: "12. Immunization Details",
    fields: [
      {
        type: "select",
        label: "Immunization Status",
        name: "immunizationStatus",
        options: [
          "Up to Date",
          "Partially Completed",
          "Delayed",
          "Not Vaccinated",
          "Unknown",
        ],
      },
      {
        type: "textarea",
        label: "Missing Vaccines",
        name: "missingVaccines",
      },
      {
        type: "textarea",
        label: "Previous Vaccine Reactions",
        name: "vaccineReactions",
      },
      {
        type: "textarea",
        label: "Vaccination Advice",
        name: "vaccinationAdvice",
      },
    ],
  },

  // =========================================================
  // 13. PAST MEDICAL HISTORY
  // =========================================================
  {
    title: "13. Past Medical History",
    type: "checkbox",
    fields: [
      ["Recurrent Respiratory Infections", "recurrentRespiratoryInfections"],
      ["Asthma", "asthma"],
      ["Allergic Rhinitis", "allergicRhinitis"],
      ["Pneumonia", "pneumonia"],
      ["Seizure Disorder", "seizureDisorder"],
      ["Congenital Heart Disease", "congenitalHeartDisease"],
      ["Kidney Disease", "kidneyDisease"],
      ["Liver Disease", "liverDisease"],
      ["Thyroid Disease", "thyroidDisease"],
      ["Diabetes", "diabetes"],
      ["Anemia", "anemia"],
      ["Tuberculosis", "tuberculosis"],
      ["Chronic Illness", "chronicIllness"],
      ["Hospital Admission", "previousHospitalAdmission"],
      ["Previous Surgery", "previousSurgery"],
    ],
  },

  // =========================================================
  // 14. FAMILY HISTORY
  // =========================================================
  {
    title: "14. Family History",
    type: "checkbox",
    fields: [
      ["Asthma", "familyAsthma"],
      ["Allergy", "familyAllergy"],
      ["Diabetes", "familyDiabetes"],
      ["Hypertension", "familyHypertension"],
      ["Heart Disease", "familyHeartDisease"],
      ["Kidney Disease", "familyKidneyDisease"],
      ["Thyroid Disease", "familyThyroidDisease"],
      ["Epilepsy", "familyEpilepsy"],
      ["Genetic Disorder", "familyGeneticDisorder"],
      ["Developmental Disorder", "familyDevelopmentalDisorder"],
      ["Mental Health Disorder", "familyMentalHealthDisorder"],
      ["Tuberculosis", "familyTuberculosis"],
    ],
  },

  {
    title: "15. Family History Details",
    fields: [
      {
        type: "textarea",
        label: "Relevant Family History",
        name: "relevantFamilyHistory",
      },
      {
        type: "textarea",
        label: "Consanguinity",
        name: "consanguinity",
      },
      {
        type: "textarea",
        label: "Genetic History",
        name: "geneticHistory",
      },
    ],
  },

  // =========================================================
  // 16. SOCIAL & ENVIRONMENTAL HISTORY
  // =========================================================
  {
    title: "16. Social & Environmental History",
    type: "checkbox",
    fields: [
      ["Passive Smoke Exposure", "passiveSmokeExposure"],
      ["Indoor Air Pollution", "indoorAirPollution"],
      ["Poor Housing Conditions", "poorHousingConditions"],
      ["Pet Exposure", "petExposure"],
      ["Daycare Attendance", "daycareAttendance"],
      ["School Attendance", "schoolAttendance"],
      ["Recent Travel", "recentTravel"],
      ["Sick Contact", "sickContact"],
      ["Tuberculosis Contact", "tbContact"],
    ],
  },

  // =========================================================
  // 17. VITAL SIGNS
  // =========================================================
  {
    title: "17. Vital Signs",
    fields: [
      {
        type: "input",
        label: "Temperature",
        name: "temperature",
      },
      {
        type: "input",
        label: "Heart Rate",
        name: "heartRate",
      },
      {
        type: "input",
        label: "Respiratory Rate",
        name: "respiratoryRate",
      },
      {
        type: "input",
        label: "Blood Pressure",
        name: "bloodPressure",
      },
      {
        type: "input",
        label: "Oxygen Saturation",
        name: "oxygenSaturation",
      },
      {
        type: "input",
        label: "Pain Score",
        name: "painScore",
      },
      {
        type: "select",
        label: "General Condition",
        name: "generalCondition",
        options: [
          "Good",
          "Fair",
          "Poor",
          "Critical",
        ],
      },
    ],
  },

  // =========================================================
  // 18. GENERAL PHYSICAL EXAMINATION
  // =========================================================
  {
    title: "18. General Physical Examination",
    fields: [
      {
        type: "textarea",
        label: "General Appearance",
        name: "generalAppearance",
      },
      {
        type: "textarea",
        label: "Level of Consciousness",
        name: "levelOfConsciousness",
      },
      {
        type: "textarea",
        label: "Hydration Status",
        name: "hydrationStatus",
      },
      {
        type: "textarea",
        label: "Pallor",
        name: "pallor",
      },
      {
        type: "textarea",
        label: "Jaundice",
        name: "jaundice",
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
        name: "edema",
      },
    ],
  },

  // =========================================================
  // 19. SYSTEMIC EXAMINATION
  // =========================================================
  {
    title: "19. Systemic Examination",
    fields: [
      {
        type: "textarea",
        label: "Respiratory System",
        name: "respiratorySystem",
      },
      {
        type: "textarea",
        label: "Cardiovascular System",
        name: "cardiovascularSystem",
      },
      {
        type: "textarea",
        label: "Abdomen",
        name: "abdomenExamination",
      },
      {
        type: "textarea",
        label: "Central Nervous System",
        name: "centralNervousSystem",
      },
      {
        type: "textarea",
        label: "Musculoskeletal System",
        name: "musculoskeletalSystem",
      },
      {
        type: "textarea",
        label: "Genitourinary System",
        name: "genitourinarySystem",
      },
    ],
  },

  // =========================================================
  // 20. RESPIRATORY ASSESSMENT
  // =========================================================
  {
    title: "20. Respiratory Assessment",
    type: "checkbox",
    fields: [
      ["Cough", "respiratoryCough"],
      ["Wheezing", "respiratoryWheezing"],
      ["Fast Breathing", "fastBreathing"],
      ["Chest Retraction", "chestRetraction"],
      ["Stridor", "stridor"],
      ["Shortness of Breath", "shortnessOfBreath"],
      ["Apnea", "apnea"],
      ["Recurrent Bronchitis", "recurrentBronchitis"],
      ["Pneumonia", "respiratoryPneumonia"],
    ],
  },

  {
    title: "21. Respiratory Examination",
    fields: [
      {
        type: "textarea",
        label: "Chest Inspection",
        name: "chestInspection",
      },
      {
        type: "textarea",
        label: "Chest Auscultation",
        name: "chestAuscultation",
      },
      {
        type: "textarea",
        label: "Breath Sounds",
        name: "breathSounds",
      },
      {
        type: "textarea",
        label: "Added Sounds",
        name: "addedBreathSounds",
      },
      {
        type: "textarea",
        label: "Respiratory Findings",
        name: "respiratoryFindings",
      },
    ],
  },

  // =========================================================
  // 22. CARDIOVASCULAR ASSESSMENT
  // =========================================================
  {
    title: "22. Cardiovascular Assessment",
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
        label: "Cardiovascular Findings",
        name: "cardiovascularFindings",
      },
    ],
  },

  // =========================================================
  // 23. GASTROINTESTINAL ASSESSMENT
  // =========================================================
  {
    title: "23. Gastrointestinal Assessment",
    type: "checkbox",
    fields: [
      ["Vomiting", "giVomiting"],
      ["Diarrhea", "giDiarrhea"],
      ["Constipation", "giConstipation"],
      ["Abdominal Pain", "giAbdominalPain"],
      ["Blood in Stool", "bloodInStool"],
      ["Poor Appetite", "giPoorAppetite"],
      ["Abdominal Distension", "abdominalDistension"],
      ["Jaundice", "giJaundice"],
      ["Feeding Intolerance", "feedingIntolerance"],
    ],
  },

  {
    title: "24. Abdominal Examination",
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
        label: "Liver",
        name: "liverExamination",
      },
      {
        type: "textarea",
        label: "Spleen",
        name: "spleenExamination",
      },
      {
        type: "textarea",
        label: "Bowel Sounds",
        name: "bowelSounds",
      },
      {
        type: "textarea",
        label: "Abdominal Findings",
        name: "abdominalFindings",
      },
    ],
  },

  // =========================================================
  // 25. NEUROLOGICAL ASSESSMENT
  // =========================================================
  {
    title: "25. Neurological Assessment",
    type: "checkbox",
    fields: [
      ["Seizure", "neurologicalSeizure"],
      ["Headache", "neurologicalHeadache"],
      ["Syncope", "syncope"],
      ["Weakness", "neurologicalWeakness"],
      ["Abnormal Movements", "abnormalMovements"],
      ["Balance Problems", "balanceProblems"],
      ["Developmental Regression", "neurologicalRegression"],
      ["Altered Consciousness", "alteredConsciousness"],
    ],
  },

  {
    title: "26. Neurological Examination",
    fields: [
      {
        type: "textarea",
        label: "Mental Status",
        name: "mentalStatus",
      },
      {
        type: "textarea",
        label: "Cranial Nerves",
        name: "cranialNerves",
      },
      {
        type: "textarea",
        label: "Motor Examination",
        name: "motorExamination",
      },
      {
        type: "textarea",
        label: "Sensory Examination",
        name: "sensoryExamination",
      },
      {
        type: "textarea",
        label: "Reflexes",
        name: "reflexes",
      },
      {
        type: "textarea",
        label: "Coordination",
        name: "coordination",
      },
      {
        type: "textarea",
        label: "Gait",
        name: "gait",
      },
      {
        type: "textarea",
        label: "Neurological Findings",
        name: "neurologicalFindings",
      },
    ],
  },

  // =========================================================
  // 27. SKIN ASSESSMENT
  // =========================================================
  {
    title: "27. Skin Assessment",
    type: "checkbox",
    fields: [
      ["Rash", "skinRash"],
      ["Eczema", "eczema"],
      ["Urticaria", "urticaria"],
      ["Atopic Dermatitis", "atopicDermatitis"],
      ["Skin Infection", "skinInfection"],
      ["Pallor", "skinPallor"],
      ["Jaundice", "skinJaundice"],
      ["Cyanosis", "skinCyanosis"],
      ["Pigmentation Abnormality", "pigmentationAbnormality"],
      ["Birthmark", "birthmark"],
    ],
  },

  {
    title: "28. Skin Examination",
    fields: [
      {
        type: "textarea",
        label: "Skin Lesions",
        name: "skinLesions",
      },
      {
        type: "textarea",
        label: "Rash Description",
        name: "rashDescription",
      },
      {
        type: "textarea",
        label: "Distribution",
        name: "rashDistribution",
      },
      {
        type: "textarea",
        label: "Skin Examination Findings",
        name: "skinExaminationFindings",
      },
    ],
  },

  // =========================================================
  // 29. GENITOURINARY ASSESSMENT
  // =========================================================
  {
    title: "29. Genitourinary Assessment",
    type: "checkbox",
    fields: [
      ["Painful Urination", "painfulUrination"],
      ["Frequent Urination", "frequentUrination"],
      ["Bedwetting", "bedwetting"],
      ["Blood in Urine", "bloodInUrine"],
      ["Urinary Infection", "urinaryInfection"],
      ["Reduced Urine Output", "reducedUrineOutput"],
      ["Genital Abnormality", "genitalAbnormality"],
      ["Testicular Swelling", "testicularSwelling"],
      ["Undescended Testis", "undescendedTestis"],
    ],
  },

  {
    title: "30. Genitourinary Examination",
    fields: [
      {
        type: "textarea",
        label: "External Genitalia",
        name: "externalGenitalia",
      },
      {
        type: "textarea",
        label: "Testicular Examination",
        name: "testicularExamination",
      },
      {
        type: "textarea",
        label: "Renal Examination",
        name: "renalExamination",
      },
      {
        type: "textarea",
        label: "Genitourinary Findings",
        name: "genitourinaryFindings",
      },
    ],
  },

  // =========================================================
  // 31. ENT ASSESSMENT
  // =========================================================
  {
    title: "31. ENT Assessment",
    type: "checkbox",
    fields: [
      ["Recurrent Ear Infection", "recurrentEarInfection"],
      ["Hearing Difficulty", "hearingDifficulty"],
      ["Tonsillitis", "pediatricTonsillitis"],
      ["Adenoid Enlargement", "adenoidEnlargement"],
      ["Nasal Blockage", "pediatricNasalBlockage"],
      ["Chronic Runny Nose", "chronicRunnyNose"],
      ["Snoring", "pediatricSnoring"],
      ["Speech / Hearing Concern", "speechHearingConcern"],
    ],
  },

  // =========================================================
  // 32. EYE ASSESSMENT
  // =========================================================
  {
    title: "32. Eye Assessment",
    type: "checkbox",
    fields: [
      ["Vision Difficulty", "visionDifficulty"],
      ["Squint / Strabismus", "strabismus"],
      ["Eye Discharge", "eyeDischarge"],
      ["Red Eye", "redEye"],
      ["Excessive Tearing", "excessiveTearing"],
      ["Abnormal Eye Movement", "abnormalEyeMovement"],
      ["Poor Visual Tracking", "poorVisualTracking"],
    ],
  },

  {
    title: "33. Eye Examination",
    fields: [
      {
        type: "input",
        label: "Right Eye Vision",
        name: "rightEyeVision",
      },
      {
        type: "input",
        label: "Left Eye Vision",
        name: "leftEyeVision",
      },
      {
        type: "textarea",
        label: "Eye Examination Findings",
        name: "eyeExaminationFindings",
      },
    ],
  },

  // =========================================================
  // 34. LABORATORY INVESTIGATIONS
  // =========================================================
  {
    title: "34. Laboratory Investigations",
    type: "checkbox",
    fields: [
      ["Complete Blood Count", "cbc"],
      ["CRP", "crp"],
      ["ESR", "esr"],
      ["Blood Glucose", "bloodGlucose"],
      ["Liver Function Test", "lft"],
      ["Kidney Function Test", "kft"],
      ["Electrolytes", "electrolytes"],
      ["Urine Routine", "urineRoutine"],
      ["Urine Culture", "urineCulture"],
      ["Stool Examination", "stoolExamination"],
      ["Blood Culture", "bloodCulture"],
      ["Thyroid Function Test", "thyroidFunctionTest"],
      ["Iron Studies", "ironStudies"],
      ["Vitamin D", "vitaminD"],
      ["Vitamin B12", "vitaminB12"],
    ],
  },

  // =========================================================
  // 35. IMAGING / OTHER INVESTIGATIONS
  // =========================================================
  {
    title: "35. Imaging & Other Investigations",
    type: "checkbox",
    fields: [
      ["Chest X-Ray", "chestXray"],
      ["Abdominal Ultrasound", "abdominalUltrasound"],
      ["Echocardiography", "echocardiography"],
      ["ECG", "ecg"],
      ["CT Scan", "ctScan"],
      ["MRI", "mri"],
      ["EEG", "eeg"],
      ["Hearing Test", "hearingTest"],
      ["Vision Test", "visionTest"],
      ["Developmental Assessment", "developmentalTesting"],
    ],
  },

  // =========================================================
  // 36. INVESTIGATION RESULTS
  // =========================================================
  {
    title: "36. Investigation Results",
    fields: [
      {
        type: "textarea",
        label: "Laboratory Results",
        name: "laboratoryResults",
      },
      {
        type: "textarea",
        label: "Imaging Results",
        name: "imagingResults",
      },
      {
        type: "textarea",
        label: "ECG / Echo Findings",
        name: "cardiacInvestigationResults",
      },
      {
        type: "textarea",
        label: "EEG Findings",
        name: "eegFindings",
      },
      {
        type: "textarea",
        label: "Other Investigation Results",
        name: "otherInvestigationResults",
      },
    ],
  },

  // =========================================================
  // 37. ALLERGY HISTORY
  // =========================================================
  {
    title: "37. Allergy History",
    type: "checkbox",
    fields: [
      ["Drug Allergy", "drugAllergy"],
      ["Food Allergy", "foodAllergyHistory"],
      ["Milk Allergy", "milkAllergy"],
      ["Egg Allergy", "eggAllergy"],
      ["Dust Allergy", "dustAllergy"],
      ["Pollen Allergy", "pollenAllergy"],
      ["Pet Allergy", "petAllergy"],
      ["Other Allergy", "otherAllergy"],
    ],
  },

  {
    title: "38. Allergy Details",
    fields: [
      {
        type: "textarea",
        label: "Known Allergens",
        name: "knownAllergens",
      },
      {
        type: "textarea",
        label: "Allergic Reaction",
        name: "allergicReaction",
      },
      {
        type: "textarea",
        label: "Previous Allergy Treatment",
        name: "previousAllergyTreatment",
      },
    ],
  },

  // =========================================================
  // 39. MEDICATION HISTORY
  // =========================================================
  {
    title: "39. Medication History",
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
        label: "Antibiotic History",
        name: "antibioticHistory",
      },
      {
        type: "textarea",
        label: "Long-term Medications",
        name: "longTermMedications",
      },
      {
        type: "textarea",
        label: "Medication Allergies",
        name: "medicationAllergies",
      },
    ],
  },

  // =========================================================
  // 40. ASSESSMENT & DIAGNOSIS
  // =========================================================
  {
    title: "40. Assessment & Diagnosis",
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
        label: "Differential Diagnosis",
        name: "differentialDiagnosis",
      },
      {
        type: "textarea",
        label: "Pediatrician Impression",
        name: "pediatricianImpression",
      },
    ],
  },

  // =========================================================
  // 41. TREATMENT PLAN
  // =========================================================
  {
    title: "41. Treatment Plan",
    fields: [
      {
        type: "textarea",
        label: "Medications",
        name: "medications",
      },
      {
        type: "textarea",
        label: "Dosage Instructions",
        name: "dosageInstructions",
      },
      {
        type: "textarea",
        label: "Dietary Advice",
        name: "dietaryAdvice",
      },
      {
        type: "textarea",
        label: "Hydration Advice",
        name: "hydrationAdvice",
      },
      {
        type: "textarea",
        label: "Activity Advice",
        name: "activityAdvice",
      },
      {
        type: "textarea",
        label: "Parent / Guardian Instructions",
        name: "parentGuardianInstructions",
      },
      {
        type: "textarea",
        label: "Warning Signs",
        name: "warningSigns",
      },
    ],
  },

  // =========================================================
  // 42. FOLLOW-UP
  // =========================================================
  {
    title: "42. Follow-up",
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
          "Growth Review",
          "Development Review",
          "Vaccination Review",
          "Medication Review",
          "Test Review",
          "Post Hospitalization",
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