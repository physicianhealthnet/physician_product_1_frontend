// obGynAssessment.js

export const obGynAssessmentSections = [
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
        type: "input",
        label: "Contact Number",
        name: "contactNumber",
      },
      {
        type: "input",
        label: "Occupation",
        name: "occupation",
      },
      {
        type: "textarea",
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
          "Routine Gynecological Check-up",
          "Pregnancy Check-up",
          "Postnatal Check-up",
          "Family Planning",
          "Infertility Consultation",
          "Menopause Consultation",
          "Emergency",
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
      ["Abdominal Pain", "abdominalPain"],
      ["Pelvic Pain", "pelvicPain"],
      ["Lower Back Pain", "lowerBackPain"],
      ["Vaginal Bleeding", "vaginalBleeding"],
      ["Heavy Menstrual Bleeding", "heavyMenstrualBleeding"],
      ["Irregular Periods", "irregularPeriods"],
      ["Painful Periods", "dysmenorrhea"],
      ["Vaginal Discharge", "vaginalDischarge"],
      ["Vaginal Itching", "vaginalItching"],
      ["Vaginal Odor", "vaginalOdor"],
      ["Pain During Intercourse", "dyspareunia"],
      ["Urinary Symptoms", "urinarySymptoms"],
      ["Breast Pain", "breastPain"],
      ["Breast Lump", "breastLump"],
      ["Nausea / Vomiting", "nauseaVomiting"],
      ["Infertility", "infertility"],
      ["Hot Flashes", "hotFlashes"],
      ["Night Sweats", "nightSweats"],
      ["Mood Changes", "moodChanges"],
      ["Pregnancy Symptoms", "pregnancySymptoms"],
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
        label: "Symptom Progression",
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
        label: "Treatment Response",
        name: "treatmentResponse",
      },
    ],
  },

  // =========================================================
  // 4. MENSTRUAL HISTORY
  // =========================================================
  {
    title: "4. Menstrual History",
    fields: [
      {
        type: "input",
        label: "Age at Menarche",
        name: "ageAtMenarche",
      },
      {
        type: "input",
        label: "Last Menstrual Period (LMP)",
        name: "lmp",
        inputType: "date",
      },
      {
        type: "input",
        label: "Cycle Length",
        name: "cycleLength",
      },
      {
        type: "input",
        label: "Period Duration",
        name: "periodDuration",
      },
      {
        type: "select",
        label: "Cycle Regularity",
        name: "cycleRegularity",
        options: [
          "Regular",
          "Irregular",
          "Variable",
          "Amenorrhea",
        ],
      },
      {
        type: "select",
        label: "Menstrual Flow",
        name: "menstrualFlow",
        options: [
          "Light",
          "Moderate",
          "Heavy",
          "Very Heavy",
        ],
      },
      {
        type: "select",
        label: "Menstrual Pain",
        name: "menstrualPain",
        options: [
          "None",
          "Mild",
          "Moderate",
          "Severe",
        ],
      },
      {
        type: "textarea",
        label: "Menstrual History Details",
        name: "menstrualHistoryDetails",
      },
    ],
  },

  // =========================================================
  // 5. OBSTETRIC HISTORY
  // =========================================================
  {
    title: "5. Obstetric History",
    fields: [
      {
        type: "input",
        label: "Gravida (G)",
        name: "gravida",
      },
      {
        type: "input",
        label: "Para (P)",
        name: "para",
      },
      {
        type: "input",
        label: "Abortions (A)",
        name: "abortions",
      },
      {
        type: "input",
        label: "Living Children (L)",
        name: "livingChildren",
      },
      {
        type: "input",
        label: "Previous Pregnancies",
        name: "previousPregnancies",
      },
      {
        type: "textarea",
        label: "Previous Pregnancy Details",
        name: "previousPregnancyDetails",
      },
      {
        type: "textarea",
        label: "Previous Pregnancy Complications",
        name: "previousPregnancyComplications",
      },
    ],
  },

  // =========================================================
  // 6. PREGNANCY HISTORY
  // =========================================================
  {
    title: "6. Previous Pregnancy History",
    fields: [
      {
        type: "input",
        label: "Year of Pregnancy",
        name: "pregnancyYear",
      },
      {
        type: "select",
        label: "Pregnancy Outcome",
        name: "pregnancyOutcome",
        options: [
          "Live Birth",
          "Stillbirth",
          "Miscarriage",
          "Termination",
          "Ectopic Pregnancy",
          "Molar Pregnancy",
        ],
      },
      {
        type: "select",
        label: "Mode of Delivery",
        name: "previousDeliveryMode",
        options: [
          "Normal Vaginal Delivery",
          "Cesarean Section",
          "Assisted Vaginal Delivery",
          "Not Applicable",
        ],
      },
      {
        type: "input",
        label: "Birth Weight",
        name: "previousBirthWeight",
      },
      {
        type: "textarea",
        label: "Pregnancy / Delivery Complications",
        name: "deliveryComplications",
      },
    ],
  },

  // =========================================================
  // 7. CURRENT PREGNANCY
  // =========================================================
  {
    title: "7. Current Pregnancy",
    fields: [
      {
        type: "select",
        label: "Pregnancy Status",
        name: "pregnancyStatus",
        options: [
          "Not Pregnant",
          "Pregnant",
          "Postpartum",
          "Unknown",
        ],
      },
      {
        type: "input",
        label: "LMP",
        name: "pregnancyLmp",
        inputType: "date",
      },
      {
        type: "input",
        label: "Expected Date of Delivery (EDD)",
        name: "edd",
        inputType: "date",
      },
      {
        type: "input",
        label: "Gestational Age",
        name: "gestationalAge",
      },
      {
        type: "input",
        label: "Number of Fetuses",
        name: "numberOfFetuses",
      },
      {
        type: "select",
        label: "Pregnancy Type",
        name: "pregnancyType",
        options: [
          "Singleton",
          "Twin",
          "Multiple",
          "Unknown",
        ],
      },
      {
        type: "textarea",
        label: "Current Pregnancy Concerns",
        name: "currentPregnancyConcerns",
      },
    ],
  },

  // =========================================================
  // 8. ANTENATAL HISTORY
  // =========================================================
  {
    title: "8. Antenatal History",
    type: "checkbox",
    fields: [
      ["Regular Antenatal Visits", "regularAntenatalVisits"],
      ["High-Risk Pregnancy", "highRiskPregnancy"],
      ["Gestational Diabetes", "gestationalDiabetes"],
      ["Gestational Hypertension", "gestationalHypertension"],
      ["Pre-eclampsia", "preeclampsia"],
      ["Eclampsia", "eclampsia"],
      ["Anemia", "pregnancyAnemia"],
      ["Thyroid Disorder", "pregnancyThyroidDisorder"],
      ["Rh Incompatibility", "rhIncompatibility"],
      ["Placenta Previa", "placentaPrevia"],
      ["Placental Abruption", "placentalAbruption"],
      ["Infections During Pregnancy", "pregnancyInfections"],
      ["Bleeding During Pregnancy", "pregnancyBleeding"],
      ["Reduced Fetal Movement", "reducedFetalMovement"],
      ["Preterm Labor", "pretermLabor"],
    ],
  },

  // =========================================================
  // 9. ANTENATAL CARE
  // =========================================================
  {
    title: "9. Antenatal Care",
    fields: [
      {
        type: "input",
        label: "Antenatal Visit Number",
        name: "antenatalVisitNumber",
      },
      {
        type: "input",
        label: "Maternal Weight",
        name: "maternalWeight",
      },
      {
        type: "input",
        label: "Blood Pressure",
        name: "maternalBloodPressure",
      },
      {
        type: "input",
        label: "Fundal Height",
        name: "fundalHeight",
      },
      {
        type: "input",
        label: "Fetal Heart Rate",
        name: "fetalHeartRate",
      },
      {
        type: "select",
        label: "Fetal Presentation",
        name: "fetalPresentation",
        options: [
          "Cephalic",
          "Breech",
          "Transverse",
          "Oblique",
          "Unknown",
        ],
      },
      {
        type: "textarea",
        label: "Antenatal Findings",
        name: "antenatalFindings",
      },
    ],
  },

  // =========================================================
  // 10. GYNECOLOGICAL HISTORY
  // =========================================================
  {
    title: "10. Gynecological History",
    fields: [
      {
        type: "textarea",
        label: "Previous Gynecological Conditions",
        name: "previousGynecologicalConditions",
      },
      {
        type: "textarea",
        label: "Previous Gynecological Surgeries",
        name: "gynecologicalSurgeries",
      },
      {
        type: "textarea",
        label: "History of Ovarian Cysts",
        name: "ovarianCystHistory",
      },
      {
        type: "textarea",
        label: "History of Fibroids",
        name: "fibroidHistory",
      },
      {
        type: "textarea",
        label: "History of Endometriosis",
        name: "endometriosisHistory",
      },
      {
        type: "textarea",
        label: "Other Gynecological History",
        name: "otherGynecologicalHistory",
      },
    ],
  },

  // =========================================================
  // 11. SEXUAL HISTORY
  // =========================================================
  {
    title: "11. Sexual & Reproductive History",
    fields: [
      {
        type: "select",
        label: "Sexually Active",
        name: "sexuallyActive",
        options: [
          "Yes",
          "No",
          "Prefer Not to Say",
        ],
      },
      {
        type: "select",
        label: "Contraception Used",
        name: "contraceptionUsed",
        options: [
          "None",
          "Condom",
          "Oral Contraceptive",
          "IUCD",
          "Implant",
          "Injection",
          "Natural Method",
          "Other",
        ],
      },
      {
        type: "textarea",
        label: "Sexual / Reproductive Concerns",
        name: "sexualReproductiveConcerns",
      },
      {
        type: "textarea",
        label: "History of Sexually Transmitted Infection",
        name: "stiHistory",
      },
    ],
  },

  // =========================================================
  // 12. CONTRACEPTION / FAMILY PLANNING
  // =========================================================
  {
    title: "12. Contraception & Family Planning",
    type: "checkbox",
    fields: [
      ["Currently Using Contraception", "currentlyUsingContraception"],
      ["Oral Contraceptive Pills", "oralContraceptive"],
      ["Condom", "condom"],
      ["IUCD", "iucd"],
      ["Implant", "contraceptiveImplant"],
      ["Injectable Contraception", "injectableContraception"],
      ["Emergency Contraception", "emergencyContraception"],
      ["Permanent Sterilization", "permanentSterilization"],
      ["Planning Pregnancy", "planningPregnancy"],
      ["Not Planning Pregnancy", "notPlanningPregnancy"],
    ],
  },

  {
    title: "13. Family Planning Details",
    fields: [
      {
        type: "textarea",
        label: "Current Contraceptive Method",
        name: "currentContraceptiveMethod",
      },
      {
        type: "textarea",
        label: "Previous Contraceptive Methods",
        name: "previousContraceptiveMethods",
      },
      {
        type: "textarea",
        label: "Family Planning Goals",
        name: "familyPlanningGoals",
      },
      {
        type: "textarea",
        label: "Counselling Provided",
        name: "familyPlanningCounselling",
      },
    ],
  },

  // =========================================================
  // 14. INFERTILITY ASSESSMENT
  // =========================================================
  {
    title: "14. Infertility Assessment",
    type: "checkbox",
    fields: [
      ["Primary Infertility", "primaryInfertility"],
      ["Secondary Infertility", "secondaryInfertility"],
      ["Ovulation Disorder", "ovulationDisorder"],
      ["PCOS", "pcos"],
      ["Endometriosis", "infertilityEndometriosis"],
      ["Tubal Factor", "tubalFactor"],
      ["Uterine Factor", "uterineFactor"],
      ["Previous Infertility Treatment", "previousInfertilityTreatment"],
    ],
  },

  {
    title: "15. Infertility History",
    fields: [
      {
        type: "input",
        label: "Duration of Infertility",
        name: "infertilityDuration",
      },
      {
        type: "input",
        label: "Duration of Trying to Conceive",
        name: "tryingToConceiveDuration",
      },
      {
        type: "textarea",
        label: "Previous Fertility Investigations",
        name: "fertilityInvestigations",
      },
      {
        type: "textarea",
        label: "Previous Fertility Treatments",
        name: "fertilityTreatments",
      },
      {
        type: "textarea",
        label: "Infertility Assessment",
        name: "infertilityAssessment",
      },
    ],
  },

  // =========================================================
  // 16. MENOPAUSE
  // =========================================================
  {
    title: "16. Menopause Assessment",
    type: "checkbox",
    fields: [
      ["Hot Flashes", "menopauseHotFlashes"],
      ["Night Sweats", "menopauseNightSweats"],
      ["Mood Changes", "menopauseMoodChanges"],
      ["Sleep Disturbance", "sleepDisturbance"],
      ["Vaginal Dryness", "vaginalDryness"],
      ["Painful Intercourse", "menopauseDyspareunia"],
      ["Urinary Symptoms", "menopauseUrinarySymptoms"],
      ["Irregular Periods", "menopauseIrregularPeriods"],
      ["Postmenopausal Bleeding", "postmenopausalBleeding"],
    ],
  },

  {
    title: "17. Menopause History",
    fields: [
      {
        type: "input",
        label: "Age at Menopause",
        name: "ageAtMenopause",
      },
      {
        type: "input",
        label: "Last Menstrual Period",
        name: "menopauseLmp",
        inputType: "date",
      },
      {
        type: "textarea",
        label: "Menopausal Symptoms",
        name: "menopausalSymptoms",
      },
      {
        type: "textarea",
        label: "Hormone Therapy History",
        name: "hormoneTherapyHistory",
      },
    ],
  },

  // =========================================================
  // 18. PAST MEDICAL HISTORY
  // =========================================================
  {
    title: "18. Past Medical History",
    type: "checkbox",
    fields: [
      ["Diabetes", "diabetes"],
      ["Hypertension", "hypertension"],
      ["Thyroid Disease", "thyroidDisease"],
      ["Heart Disease", "heartDisease"],
      ["Kidney Disease", "kidneyDisease"],
      ["Liver Disease", "liverDisease"],
      ["Epilepsy", "epilepsy"],
      ["Asthma", "asthma"],
      ["Blood Disorder", "bloodDisorder"],
      ["Autoimmune Disease", "autoimmuneDisease"],
      ["Tuberculosis", "tuberculosis"],
      ["Mental Health Condition", "mentalHealthCondition"],
    ],
  },

  // =========================================================
  // 19. SURGICAL HISTORY
  // =========================================================
  {
    title: "19. Surgical History",
    fields: [
      {
        type: "textarea",
        label: "Previous Surgeries",
        name: "previousSurgeries",
      },
      {
        type: "textarea",
        label: "Cesarean Section History",
        name: "cesareanHistory",
      },
      {
        type: "textarea",
        label: "Uterine Surgery",
        name: "uterineSurgery",
      },
      {
        type: "textarea",
        label: "Ovarian Surgery",
        name: "ovarianSurgery",
      },
      {
        type: "textarea",
        label: "Other Gynecological Surgery",
        name: "otherGynecologicalSurgery",
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
      ["Breast Cancer", "familyBreastCancer"],
      ["Ovarian Cancer", "familyOvarianCancer"],
      ["Uterine Cancer", "familyUterineCancer"],
      ["Cervical Cancer", "familyCervicalCancer"],
      ["Diabetes", "familyDiabetes"],
      ["Hypertension", "familyHypertension"],
      ["Thyroid Disease", "familyThyroidDisease"],
      ["Genetic Disorder", "familyGeneticDisorder"],
      ["Infertility", "familyInfertility"],
      ["Multiple Pregnancy", "familyMultiplePregnancy"],
    ],
  },

  {
    title: "21. Family History Details",
    fields: [
      {
        type: "textarea",
        label: "Relevant Family History",
        name: "relevantFamilyHistory",
      },
      {
        type: "textarea",
        label: "Cancer History",
        name: "familyCancerHistory",
      },
      {
        type: "textarea",
        label: "Genetic History",
        name: "geneticHistory",
      },
    ],
  },

  // =========================================================
  // 22. ALLERGY HISTORY
  // =========================================================
  {
    title: "22. Allergy History",
    type: "checkbox",
    fields: [
      ["Drug Allergy", "drugAllergy"],
      ["Food Allergy", "foodAllergy"],
      ["Latex Allergy", "latexAllergy"],
      ["Other Allergy", "otherAllergy"],
    ],
  },

  {
    title: "23. Allergy Details",
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
    ],
  },

  // =========================================================
  // 24. MEDICATION HISTORY
  // =========================================================
  {
    title: "24. Medication History",
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
        label: "Hormonal Medications",
        name: "hormonalMedications",
      },
      {
        type: "textarea",
        label: "Fertility Medications",
        name: "fertilityMedications",
      },
      {
        type: "textarea",
        label: "Supplements",
        name: "supplements",
      },
    ],
  },

  // =========================================================
  // 25. VITAL SIGNS
  // =========================================================
  {
    title: "25. Vital Signs",
    fields: [
      {
        type: "input",
        label: "Temperature",
        name: "temperature",
      },
      {
        type: "input",
        label: "Pulse Rate",
        name: "pulseRate",
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
    ],
  },

  // =========================================================
  // 26. GENERAL EXAMINATION
  // =========================================================
  {
    title: "26. General Examination",
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
      {
        type: "textarea",
        label: "Thyroid Examination",
        name: "thyroidExamination",
      },
    ],
  },

  // =========================================================
  // 27. BREAST ASSESSMENT
  // =========================================================
  {
    title: "27. Breast Assessment",
    type: "checkbox",
    fields: [
      ["Breast Pain", "breastPainAssessment"],
      ["Breast Lump", "breastLumpAssessment"],
      ["Nipple Discharge", "nippleDischarge"],
      ["Nipple Retraction", "nippleRetraction"],
      ["Skin Changes", "breastSkinChanges"],
      ["Breast Asymmetry", "breastAsymmetry"],
      ["Axillary Lump", "axillaryLump"],
    ],
  },

  {
    title: "28. Breast Examination",
    fields: [
      {
        type: "textarea",
        label: "Right Breast Findings",
        name: "rightBreastFindings",
      },
      {
        type: "textarea",
        label: "Left Breast Findings",
        name: "leftBreastFindings",
      },
      {
        type: "textarea",
        label: "Nipple Findings",
        name: "nippleFindings",
      },
      {
        type: "textarea",
        label: "Axillary Examination",
        name: "axillaryExamination",
      },
      {
        type: "textarea",
        label: "Breast Examination Impression",
        name: "breastExaminationImpression",
      },
    ],
  },

  // =========================================================
  // 29. ABDOMINAL EXAMINATION
  // =========================================================
  {
    title: "29. Abdominal Examination",
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
        label: "Mass",
        name: "abdominalMass",
      },
      {
        type: "textarea",
        label: "Organomegaly",
        name: "organomegaly",
      },
      {
        type: "textarea",
        label: "Abdominal Examination Findings",
        name: "abdominalFindings",
      },
    ],
  },

  // =========================================================
  // 30. PELVIC EXAMINATION
  // =========================================================
  {
    title: "30. Pelvic Examination",
    fields: [
      {
        type: "textarea",
        label: "External Genitalia",
        name: "externalGenitalia",
      },
      {
        type: "textarea",
        label: "Vulva",
        name: "vulvaFindings",
      },
      {
        type: "textarea",
        label: "Vagina",
        name: "vaginaFindings",
      },
      {
        type: "textarea",
        label: "Cervix",
        name: "cervixFindings",
      },
      {
        type: "textarea",
        label: "Uterus",
        name: "uterusFindings",
      },
      {
        type: "textarea",
        label: "Adnexa",
        name: "adnexaFindings",
      },
      {
        type: "textarea",
        label: "Pelvic Examination Impression",
        name: "pelvicExaminationImpression",
      },
    ],
  },

  // =========================================================
  // 31. PAP SMEAR / CERVICAL SCREENING
  // =========================================================
  {
    title: "31. Cervical Screening",
    type: "checkbox",
    fields: [
      ["Pap Smear Done", "papSmearDone"],
      ["HPV Testing Done", "hpvTestingDone"],
      ["Cervical Screening Due", "cervicalScreeningDue"],
      ["Abnormal Pap Smear History", "abnormalPapHistory"],
      ["HPV Positive History", "hpvPositiveHistory"],
    ],
  },

  {
    title: "32. Cervical Screening Details",
    fields: [
      {
        type: "input",
        label: "Last Pap Smear Date",
        name: "lastPapSmearDate",
        inputType: "date",
      },
      {
        type: "input",
        label: "Last HPV Test Date",
        name: "lastHpvTestDate",
        inputType: "date",
      },
      {
        type: "textarea",
        label: "Pap Smear Result",
        name: "papSmearResult",
      },
      {
        type: "textarea",
        label: "HPV Result",
        name: "hpvResult",
      },
      {
        type: "textarea",
        label: "Cervical Screening Plan",
        name: "cervicalScreeningPlan",
      },
    ],
  },

  // =========================================================
  // 33. ULTRASOUND
  // =========================================================
  {
    title: "33. Ultrasound Assessment",
    type: "checkbox",
    fields: [
      ["Pelvic Ultrasound", "pelvicUltrasound"],
      ["Transvaginal Ultrasound", "transvaginalUltrasound"],
      ["Obstetric Ultrasound", "obstetricUltrasound"],
      ["Follicular Study", "follicularStudy"],
      ["Breast Ultrasound", "breastUltrasound"],
    ],
  },

  {
    title: "34. Ultrasound Findings",
    fields: [
      {
        type: "textarea",
        label: "Uterus Findings",
        name: "ultrasoundUterus",
      },
      {
        type: "textarea",
        label: "Endometrium Findings",
        name: "ultrasoundEndometrium",
      },
      {
        type: "textarea",
        label: "Right Ovary",
        name: "rightOvaryUltrasound",
      },
      {
        type: "textarea",
        label: "Left Ovary",
        name: "leftOvaryUltrasound",
      },
      {
        type: "textarea",
        label: "Adnexal Findings",
        name: "adnexalUltrasound",
      },
      {
        type: "textarea",
        label: "Pregnancy / Fetal Findings",
        name: "fetalUltrasoundFindings",
      },
      {
        type: "textarea",
        label: "Ultrasound Impression",
        name: "ultrasoundImpression",
      },
    ],
  },

  // =========================================================
  // 35. LABORATORY INVESTIGATIONS
  // =========================================================
  {
    title: "35. Laboratory Investigations",
    type: "checkbox",
    fields: [
      ["Complete Blood Count", "cbc"],
      ["Blood Group & Rh", "bloodGroupRh"],
      ["Blood Glucose", "bloodGlucose"],
      ["HbA1c", "hba1c"],
      ["Thyroid Function Test", "thyroidFunctionTest"],
      ["Liver Function Test", "lft"],
      ["Kidney Function Test", "kft"],
      ["Urine Routine", "urineRoutine"],
      ["Urine Culture", "urineCulture"],
      ["Pregnancy Test", "pregnancyTest"],
      ["FSH", "fsh"],
      ["LH", "lh"],
      ["Prolactin", "prolactin"],
      ["AMH", "amh"],
      ["Progesterone", "progesterone"],
      ["Estradiol", "estradiol"],
      ["Testosterone", "testosterone"],
      ["CA-125", "ca125"],
      ["Other Tumor Markers", "otherTumorMarkers"],
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
        label: "Blood Test Results",
        name: "bloodTestResults",
      },
      {
        type: "textarea",
        label: "Hormonal Test Results",
        name: "hormonalTestResults",
      },
      {
        type: "textarea",
        label: "Urine Test Results",
        name: "urineTestResults",
      },
      {
        type: "textarea",
        label: "Pregnancy Test Result",
        name: "pregnancyTestResult",
      },
      {
        type: "textarea",
        label: "Other Investigation Results",
        name: "otherInvestigationResults",
      },
    ],
  },

  // =========================================================
  // 37. DIAGNOSIS
  // =========================================================
  {
    title: "37. Assessment & Diagnosis",
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
        label: "OB-GYN Impression",
        name: "obGynImpression",
      },
    ],
  },

  // =========================================================
  // 38. TREATMENT PLAN
  // =========================================================
  {
    title: "38. Treatment Plan",
    fields: [
      {
        type: "textarea",
        label: "Medications",
        name: "medications",
      },
      {
        type: "textarea",
        label: "Hormonal Treatment",
        name: "hormonalTreatment",
      },
      {
        type: "textarea",
        label: "Pain Management",
        name: "painManagement",
      },
      {
        type: "textarea",
        label: "Dietary Advice",
        name: "dietaryAdvice",
      },
      {
        type: "textarea",
        label: "Lifestyle Advice",
        name: "lifestyleAdvice",
      },
      {
        type: "textarea",
        label: "Patient Counselling",
        name: "patientCounselling",
      },
    ],
  },

  // =========================================================
  // 39. PREGNANCY MANAGEMENT
  // =========================================================
  {
    title: "39. Pregnancy Management",
    fields: [
      {
        type: "textarea",
        label: "Antenatal Plan",
        name: "antenatalPlan",
      },
      {
        type: "textarea",
        label: "Pregnancy Supplements",
        name: "pregnancySupplements",
      },
      {
        type: "textarea",
        label: "Fetal Monitoring Plan",
        name: "fetalMonitoringPlan",
      },
      {
        type: "textarea",
        label: "Delivery Plan",
        name: "deliveryPlan",
      },
      {
        type: "textarea",
        label: "High-Risk Pregnancy Plan",
        name: "highRiskPregnancyPlan",
      },
      {
        type: "textarea",
        label: "Warning Signs / Emergency Instructions",
        name: "pregnancyWarningSigns",
      },
    ],
  },

  // =========================================================
  // 40. FOLLOW-UP
  // =========================================================
  {
    title: "40. Follow-up",
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
          "Pregnancy Follow-up",
          "Postnatal Follow-up",
          "Infertility Follow-up",
          "Menopause Follow-up",
          "Investigation Review",
          "Treatment Review",
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