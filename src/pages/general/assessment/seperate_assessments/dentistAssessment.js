export const dentistAssessmentSections = [
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
          "New Patient",
          "Routine Check-up",
          "Follow-up",
          "Emergency",
          "Treatment Review",
          "Postoperative Review",
        ],
      },
    ],
  },

  // =========================================================
  // 2. CHIEF COMPLAINT
  // =========================================================
  {
    title: "2. Chief Complaint",
    type: "checkbox",
    fields: [
      ["Tooth Pain", "toothPain"],
      ["Sensitivity", "sensitivity"],
      ["Swelling", "swelling"],
      ["Bleeding Gums", "bleedingGums"],
      ["Bad Breath", "badBreath"],
      ["Loose Tooth", "looseTooth"],
      ["Broken Tooth", "brokenTooth"],
      ["Missing Tooth", "missingTooth"],
      ["Tooth Discoloration", "toothDiscoloration"],
      ["Difficulty Chewing", "difficultyChewing"],
      ["Difficulty Opening Mouth", "difficultyOpeningMouth"],
      ["Ulcer / Lesion", "oralUlcer"],
      ["Jaw Pain", "jawPain"],
      ["Clicking / Popping", "jawClicking"],
      ["Cosmetic Concern", "cosmeticConcern"],
      ["Other", "otherComplaint"],
    ],
  },

  {
    title: "3. Chief Complaint Details",
    fields: [
      {
        type: "textarea",
        label: "Main Complaint",
        name: "mainComplaint",
      },
      {
        type: "input",
        label: "Duration",
        name: "complaintDuration",
      },
      {
        type: "select",
        label: "Pain Severity",
        name: "painSeverity",
        options: [
          "No Pain",
          "Mild",
          "Moderate",
          "Severe",
          "Very Severe",
        ],
      },
      {
        type: "select",
        label: "Pain Character",
        name: "painCharacter",
        options: [
          "Dull",
          "Sharp",
          "Throbbing",
          "Shooting",
          "Burning",
          "Continuous",
          "Intermittent",
          "Other",
        ],
      },
      {
        type: "textarea",
        label: "Complaint Description",
        name: "complaintDescription",
      },
    ],
  },

  // =========================================================
  // 4. DENTAL HISTORY
  // =========================================================
  {
    title: "4. Dental History",
    fields: [
      {
        type: "input",
        label: "Last Dental Visit",
        name: "lastDentalVisit",
        inputType: "date",
      },
      {
        type: "textarea",
        label: "Previous Dental Treatment",
        name: "previousDentalTreatment",
      },
      {
        type: "textarea",
        label: "Previous Extractions",
        name: "previousExtractions",
      },
      {
        type: "textarea",
        label: "Previous Root Canal Treatment",
        name: "previousRootCanalTreatment",
      },
      {
        type: "textarea",
        label: "Previous Dental Surgery",
        name: "previousDentalSurgery",
      },
      {
        type: "textarea",
        label: "Previous Orthodontic Treatment",
        name: "previousOrthodonticTreatment",
      },
      {
        type: "textarea",
        label: "Previous Prosthetic Treatment",
        name: "previousProstheticTreatment",
      },
    ],
  },

  // =========================================================
  // 5. ORAL HYGIENE
  // =========================================================
  {
    title: "5. Oral Hygiene History",
    type: "checkbox",
    fields: [
      ["Brushes Once Daily", "brushesOnceDaily"],
      ["Brushes Twice Daily", "brushesTwiceDaily"],
      ["Uses Fluoride Toothpaste", "usesFluorideToothpaste"],
      ["Uses Dental Floss", "usesDentalFloss"],
      ["Uses Mouthwash", "usesMouthwash"],
      ["Uses Interdental Brush", "usesInterdentalBrush"],
      ["Tongue Cleaning", "tongueCleaning"],
      ["Irregular Brushing", "irregularBrushing"],
    ],
  },

  {
    title: "6. Oral Hygiene Details",
    fields: [
      {
        type: "select",
        label: "Brushing Frequency",
        name: "brushingFrequency",
        options: [
          "Less than Once Daily",
          "Once Daily",
          "Twice Daily",
          "More Than Twice Daily",
        ],
      },
      {
        type: "select",
        label: "Brushing Technique",
        name: "brushingTechnique",
        options: [
          "Manual",
          "Electric",
          "Modified Bass",
          "Horizontal",
          "Vertical",
          "Unknown",
        ],
      },
      {
        type: "select",
        label: "Oral Hygiene Status",
        name: "oralHygieneStatus",
        options: [
          "Good",
          "Fair",
          "Poor",
        ],
      },
    ],
  },

  // =========================================================
  // 7. MEDICAL HISTORY
  // =========================================================
  {
    title: "7. Medical History",
    type: "checkbox",
    fields: [
      ["Diabetes", "diabetes"],
      ["Hypertension", "hypertension"],
      ["Heart Disease", "heartDisease"],
      ["Kidney Disease", "kidneyDisease"],
      ["Liver Disease", "liverDisease"],
      ["Thyroid Disease", "thyroidDisease"],
      ["Asthma", "asthma"],
      ["Epilepsy", "epilepsy"],
      ["Bleeding Disorder", "bleedingDisorder"],
      ["Cancer", "cancer"],
      ["Osteoporosis", "osteoporosis"],
      ["Pregnancy", "pregnancy"],
      ["Immunocompromised", "immunocompromised"],
      ["Other Medical Condition", "otherMedicalCondition"],
    ],
  },

  {
    title: "8. Medical History Details",
    fields: [
      {
        type: "textarea",
        label: "Relevant Medical History",
        name: "relevantMedicalHistory",
      },
      {
        type: "textarea",
        label: "Previous Hospitalization",
        name: "previousHospitalization",
      },
      {
        type: "textarea",
        label: "Previous Surgery",
        name: "previousSurgery",
      },
      {
        type: "textarea",
        label: "Current Medical Conditions",
        name: "currentMedicalConditions",
      },
    ],
  },

  // =========================================================
  // 9. MEDICATIONS
  // =========================================================
  {
    title: "9. Medications",
    fields: [
      {
        type: "textarea",
        label: "Current Medications",
        name: "currentMedications",
      },
      {
        type: "textarea",
        label: "Anticoagulants / Antiplatelets",
        name: "anticoagulants",
      },
      {
        type: "textarea",
        label: "Steroids",
        name: "steroids",
      },
      {
        type: "textarea",
        label: "Bisphosphonates / Anti-resorptive Drugs",
        name: "antiResorptiveDrugs",
      },
      {
        type: "textarea",
        label: "Other Medications",
        name: "otherMedications",
      },
    ],
  },

  // =========================================================
  // 10. ALLERGIES
  // =========================================================
  {
    title: "10. Allergies",
    type: "checkbox",
    fields: [
      ["Penicillin Allergy", "penicillinAllergy"],
      ["Local Anesthetic Allergy", "localAnestheticAllergy"],
      ["Latex Allergy", "latexAllergy"],
      ["NSAID Allergy", "nsaidAllergy"],
      ["Antibiotic Allergy", "antibioticAllergy"],
      ["Other Drug Allergy", "otherDrugAllergy"],
      ["No Known Allergy", "noKnownAllergy"],
    ],
  },

  {
    title: "11. Allergy Details",
    fields: [
      {
        type: "textarea",
        label: "Known Allergies",
        name: "knownAllergies",
      },
      {
        type: "textarea",
        label: "Allergic Reaction",
        name: "allergicReaction",
      },
    ],
  },

  // =========================================================
  // 12. EXTRAORAL EXAMINATION
  // =========================================================
  {
    title: "12. Extraoral Examination",
    type: "checkbox",
    fields: [
      ["Facial Asymmetry", "facialAsymmetry"],
      ["Facial Swelling", "facialSwelling"],
      ["Lymphadenopathy", "lymphadenopathy"],
      ["TMJ Tenderness", "tmjTenderness"],
      ["TMJ Clicking", "tmjClicking"],
      ["TMJ Crepitus", "tmjCrepitus"],
      ["Limited Mouth Opening", "limitedMouthOpening"],
      ["Muscle Tenderness", "muscleTenderness"],
      ["Skin Lesion", "skinLesion"],
      ["Other Finding", "otherExtraoralFinding"],
    ],
  },

  {
    title: "13. Extraoral Examination Details",
    fields: [
      {
        type: "textarea",
        label: "Facial Examination",
        name: "facialExamination",
      },
      {
        type: "input",
        label: "Maximum Mouth Opening",
        name: "maximumMouthOpening",
      },
      {
        type: "textarea",
        label: "TMJ Examination",
        name: "tmjExamination",
      },
      {
        type: "textarea",
        label: "Lymph Node Examination",
        name: "lymphNodeExamination",
      },
    ],
  },

  // =========================================================
  // 14. INTRAORAL SOFT TISSUE
  // =========================================================
  {
    title: "14. Intraoral Soft Tissue Examination",
    type: "checkbox",
    fields: [
      ["Oral Ulcer", "oralUlcerFinding"],
      ["White Lesion", "whiteLesion"],
      ["Red Lesion", "redLesion"],
      ["Pigmented Lesion", "pigmentedLesion"],
      ["Swelling", "intraoralSwelling"],
      ["Oral Candidiasis", "oralCandidiasis"],
      ["Abnormal Mucosa", "abnormalMucosa"],
      ["Tongue Abnormality", "tongueAbnormality"],
      ["Palatal Abnormality", "palatalAbnormality"],
      ["Floor of Mouth Abnormality", "floorOfMouthAbnormality"],
      ["No Abnormality", "noSoftTissueAbnormality"],
    ],
  },

  {
    title: "15. Soft Tissue Findings",
    fields: [
      {
        type: "textarea",
        label: "Buccal Mucosa Findings",
        name: "buccalMucosaFindings",
      },
      {
        type: "textarea",
        label: "Tongue Findings",
        name: "tongueFindings",
      },
      {
        type: "textarea",
        label: "Floor of Mouth Findings",
        name: "floorOfMouthFindings",
      },
      {
        type: "textarea",
        label: "Palate Findings",
        name: "palateFindings",
      },
      {
        type: "textarea",
        label: "Other Soft Tissue Findings",
        name: "otherSoftTissueFindings",
      },
    ],
  },

  // =========================================================
  // 16. DENTAL CHART
  // =========================================================
  {
    title: "16. Dental Chart",
    fields: [
      {
        type: "textarea",
        label: "Teeth Present",
        name: "teethPresent",
      },
      {
        type: "textarea",
        label: "Missing Teeth",
        name: "missingTeeth",
      },
      {
        type: "textarea",
        label: "Decayed Teeth",
        name: "decayedTeeth",
      },
      {
        type: "textarea",
        label: "Filled Teeth",
        name: "filledTeeth",
      },
      {
        type: "textarea",
        label: "Fractured Teeth",
        name: "fracturedTeeth",
      },
      {
        type: "textarea",
        label: "Mobile Teeth",
        name: "mobileTeeth",
      },
      {
        type: "textarea",
        label: "Impacted Teeth",
        name: "impactedTeeth",
      },
      {
        type: "textarea",
        label: "Other Dental Findings",
        name: "otherDentalFindings",
      },
    ],
  },

  // =========================================================
  // 17. TOOTH CONDITION
  // =========================================================
  {
    title: "17. Tooth Condition",
    type: "checkbox",
    fields: [
      ["Dental Caries", "dentalCaries"],
      ["Deep Caries", "deepCaries"],
      ["Pulp Exposure", "pulpExposure"],
      ["Tooth Fracture", "toothFracture"],
      ["Attrition", "attrition"],
      ["Abrasion", "abrasion"],
      ["Erosion", "erosion"],
      ["Discoloration", "discoloration"],
      ["Hypoplasia", "hypoplasia"],
      ["Impacted Tooth", "impactedTooth"],
      ["Root Resorption", "rootResorption"],
      ["Tooth Mobility", "toothMobility"],
      ["Missing Tooth", "missingToothFinding"],
    ],
  },

  {
    title: "18. Tooth Findings",
    fields: [
      {
        type: "textarea",
        label: "Affected Tooth Numbers",
        name: "affectedToothNumbers",
      },
      {
        type: "textarea",
        label: "Caries Details",
        name: "cariesDetails",
      },
      {
        type: "textarea",
        label: "Fracture Details",
        name: "fractureDetails",
      },
      {
        type: "textarea",
        label: "Other Tooth Findings",
        name: "otherToothFindings",
      },
    ],
  },

  // =========================================================
  // 19. PERIODONTAL ASSESSMENT
  // =========================================================
  {
    title: "19. Periodontal Assessment",
    type: "checkbox",
    fields: [
      ["Plaque", "plaque"],
      ["Calculus", "calculus"],
      ["Gingivitis", "gingivitis"],
      ["Periodontitis", "periodontitis"],
      ["Gingival Recession", "gingivalRecession"],
      ["Gingival Enlargement", "gingivalEnlargement"],
      ["Bleeding on Probing", "bleedingOnProbing"],
      ["Periodontal Pocket", "periodontalPocket"],
      ["Furcation Involvement", "furcationInvolvement"],
      ["Tooth Mobility", "periodontalToothMobility"],
    ],
  },

  {
    title: "20. Periodontal Findings",
    fields: [
      {
        type: "textarea",
        label: "Plaque Score / Findings",
        name: "plaqueFindings",
      },
      {
        type: "textarea",
        label: "Calculus Findings",
        name: "calculusFindings",
      },
      {
        type: "textarea",
        label: "Pocket Depths",
        name: "pocketDepths",
      },
      {
        type: "textarea",
        label: "Gingival Findings",
        name: "gingivalFindings",
      },
      {
        type: "textarea",
        label: "Periodontal Diagnosis",
        name: "periodontalDiagnosis",
      },
    ],
  },

  // =========================================================
  // 21. PULPAL / ENDODONTIC
  // =========================================================
  {
    title: "21. Pulpal & Endodontic Assessment",
    fields: [
      {
        type: "select",
        label: "Pulp Vitality",
        name: "pulpVitality",
        options: [
          "Normal",
          "Reversible Pulpitis",
          "Irreversible Pulpitis",
          "Pulp Necrosis",
          "Previously Treated",
          "Unable to Determine",
        ],
      },
      {
        type: "select",
        label: "Percussion",
        name: "percussion",
        options: [
          "Negative",
          "Positive",
          "Not Tested",
        ],
      },
      {
        type: "select",
        label: "Palpation",
        name: "palpation",
        options: [
          "Negative",
          "Positive",
          "Not Tested",
        ],
      },
      {
        type: "select",
        label: "Cold Test",
        name: "coldTest",
        options: [
          "Normal Response",
          "Prolonged Response",
          "No Response",
          "Not Performed",
        ],
      },
      {
        type: "textarea",
        label: "Endodontic Findings",
        name: "endodonticFindings",
      },
    ],
  },

  // =========================================================
  // 22. OCCLUSION / TMJ
  // =========================================================
  {
    title: "22. Occlusion & TMJ Assessment",
    type: "checkbox",
    fields: [
      ["Normal Occlusion", "normalOcclusion"],
      ["Crowding", "crowding"],
      ["Spacing", "spacing"],
      ["Open Bite", "openBite"],
      ["Deep Bite", "deepBite"],
      ["Crossbite", "crossbite"],
      ["Overjet", "overjet"],
      ["Bruxism", "bruxism"],
      ["TMJ Pain", "tmjPain"],
      ["TMJ Clicking", "tmjClickingFinding"],
      ["Limited Movement", "limitedTMJMovement"],
    ],
  },

  {
    title: "23. Occlusion Details",
    fields: [
      {
        type: "textarea",
        label: "Occlusal Findings",
        name: "occlusalFindings",
      },
      {
        type: "textarea",
        label: "TMJ Findings",
        name: "tmjFindings",
      },
      {
        type: "textarea",
        label: "Bruxism Details",
        name: "bruxismDetails",
      },
    ],
  },

  // =========================================================
  // 24. RADIOGRAPHIC ASSESSMENT
  // =========================================================
  {
    title: "24. Radiographic Assessment",
    type: "checkbox",
    fields: [
      ["Intraoral Periapical X-Ray", "iapXray"],
      ["Bitewing X-Ray", "bitewingXray"],
      ["OPG / Panoramic X-Ray", "opg"],
      ["Cephalometric X-Ray", "cephalometricXray"],
      ["CBCT", "cbct"],
      ["CT Scan", "dentalCt"],
      ["MRI", "dentalMri"],
      ["Other Imaging", "otherDentalImaging"],
    ],
  },

  {
    title: "25. Radiographic Findings",
    fields: [
      {
        type: "textarea",
        label: "Radiographic Findings",
        name: "radiographicFindings",
      },
      {
        type: "textarea",
        label: "Bone Loss",
        name: "boneLoss",
      },
      {
        type: "textarea",
        label: "Periapical Findings",
        name: "periapicalFindings",
      },
      {
        type: "textarea",
        label: "Impacted Tooth Findings",
        name: "impactedToothFindings",
      },
      {
        type: "textarea",
        label: "Other Imaging Findings",
        name: "otherImagingFindings",
      },
    ],
  },

  // =========================================================
  // 26. PROSTHODONTIC
  // =========================================================
  {
    title: "26. Prosthodontic Assessment",
    type: "checkbox",
    fields: [
      ["Complete Denture", "completeDenture"],
      ["Partial Denture", "partialDenture"],
      ["Crown", "crown"],
      ["Bridge", "bridge"],
      ["Dental Implant", "dentalImplant"],
      ["Implant Supported Prosthesis", "implantSupportedProsthesis"],
      ["Existing Prosthesis", "existingProsthesis"],
      ["Prosthesis Repair Required", "prosthesisRepairRequired"],
      ["Prosthesis Replacement Required", "prosthesisReplacementRequired"],
    ],
  },

  {
    title: "27. Prosthodontic Details",
    fields: [
      {
        type: "textarea",
        label: "Existing Prosthesis Details",
        name: "existingProsthesisDetails",
      },
      {
        type: "textarea",
        label: "Edentulous Areas",
        name: "edentulousAreas",
      },
      {
        type: "textarea",
        label: "Prosthetic Treatment Requirement",
        name: "prostheticTreatmentRequirement",
      },
    ],
  },

  // =========================================================
  // 28. ORTHODONTIC
  // =========================================================
  {
    title: "28. Orthodontic Assessment",
    type: "checkbox",
    fields: [
      ["Crowding", "orthodonticCrowding"],
      ["Spacing", "orthodonticSpacing"],
      ["Malocclusion", "malocclusion"],
      ["Overjet", "orthodonticOverjet"],
      ["Deep Bite", "orthodonticDeepBite"],
      ["Open Bite", "orthodonticOpenBite"],
      ["Crossbite", "orthodonticCrossbite"],
      ["Midline Shift", "midlineShift"],
      ["Impacted Tooth", "orthodonticImpactedTooth"],
      ["Jaw Discrepancy", "jawDiscrepancy"],
    ],
  },

  {
    title: "29. Orthodontic Details",
    fields: [
      {
        type: "textarea",
        label: "Orthodontic Findings",
        name: "orthodonticFindings",
      },
      {
        type: "textarea",
        label: "Malocclusion Classification",
        name: "malocclusionClassification",
      },
      {
        type: "textarea",
        label: "Orthodontic Treatment Requirement",
        name: "orthodonticTreatmentRequirement",
      },
    ],
  },

  // =========================================================
  // 30. ORAL SURGERY
  // =========================================================
  {
    title: "30. Oral Surgery Assessment",
    type: "checkbox",
    fields: [
      ["Extraction Required", "extractionRequired"],
      ["Surgical Extraction", "surgicalExtraction"],
      ["Impacted Tooth", "surgicalImpactedTooth"],
      ["Cyst", "oralCyst"],
      ["Abscess", "oralAbscess"],
      ["Frenectomy", "frenectomy"],
      ["Biopsy Required", "biopsyRequired"],
      ["Bone Grafting", "boneGrafting"],
      ["Implant Surgery", "implantSurgery"],
      ["Other Oral Surgery", "otherOralSurgery"],
    ],
  },

  {
    title: "31. Oral Surgery Details",
    fields: [
      {
        type: "textarea",
        label: "Surgical Findings",
        name: "surgicalFindings",
      },
      {
        type: "textarea",
        label: "Planned Surgical Procedure",
        name: "plannedSurgicalProcedure",
      },
      {
        type: "textarea",
        label: "Surgical Risks",
        name: "surgicalRisks",
      },
      {
        type: "textarea",
        label: "Surgical Instructions",
        name: "surgicalInstructions",
      },
    ],
  },

  // =========================================================
  // 32. COSMETIC / ESTHETIC
  // =========================================================
  {
    title: "32. Cosmetic Dental Assessment",
    type: "checkbox",
    fields: [
      ["Tooth Whitening", "toothWhitening"],
      ["Veneers", "veneers"],
      ["Composite Bonding", "compositeBonding"],
      ["Smile Design", "smileDesign"],
      ["Tooth Reshaping", "toothReshaping"],
      ["Tooth Discoloration", "cosmeticToothDiscoloration"],
      ["Gummy Smile", "gummySmile"],
      ["Other Cosmetic Concern", "otherCosmeticConcern"],
    ],
  },

  {
    title: "33. Cosmetic Details",
    fields: [
      {
        type: "textarea",
        label: "Patient's Cosmetic Concern",
        name: "patientsCosmeticConcern",
      },
      {
        type: "textarea",
        label: "Aesthetic Findings",
        name: "aestheticFindings",
      },
      {
        type: "textarea",
        label: "Recommended Cosmetic Treatment",
        name: "recommendedCosmeticTreatment",
      },
    ],
  },

  // =========================================================
  // 34. DIAGNOSIS
  // =========================================================
  {
    title: "34. Dental Diagnosis",
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
        label: "Dental Caries Diagnosis",
        name: "cariesDiagnosis",
      },
      {
        type: "textarea",
        label: "Periodontal Diagnosis",
        name: "periodontalDiagnosisFinal",
      },
      {
        type: "textarea",
        label: "Pulpal Diagnosis",
        name: "pulpalDiagnosis",
      },
      {
        type: "textarea",
        label: "Periapical Diagnosis",
        name: "periapicalDiagnosis",
      },
      {
        type: "textarea",
        label: "Other Diagnosis",
        name: "otherDiagnosis",
      },
    ],
  },

  // =========================================================
  // 35. TREATMENT PLAN
  // =========================================================
  {
    title: "35. Treatment Plan",
    type: "checkbox",
    fields: [
      ["Oral Prophylaxis / Cleaning", "oralProphylaxis"],
      ["Fluoride Treatment", "fluorideTreatment"],
      ["Restoration / Filling", "restoration"],
      ["Root Canal Treatment", "rootCanalTreatment"],
      ["Extraction", "treatmentExtraction"],
      ["Crown", "treatmentCrown"],
      ["Bridge", "treatmentBridge"],
      ["Denture", "treatmentDenture"],
      ["Dental Implant", "treatmentDentalImplant"],
      ["Periodontal Treatment", "periodontalTreatment"],
      ["Orthodontic Treatment", "orthodonticTreatment"],
      ["Oral Surgery", "oralSurgery"],
      ["Cosmetic Treatment", "cosmeticTreatment"],
      ["Referral", "dentalReferral"],
    ],
  },

  {
    title: "36. Treatment Plan Details",
    fields: [
      {
        type: "textarea",
        label: "Recommended Treatment",
        name: "recommendedTreatment",
      },
      {
        type: "textarea",
        label: "Treatment Sequence",
        name: "treatmentSequence",
      },
      {
        type: "textarea",
        label: "Priority Treatment",
        name: "priorityTreatment",
      },
      {
        type: "textarea",
        label: "Alternative Treatment Options",
        name: "alternativeTreatmentOptions",
      },
    ],
  },

  // =========================================================
  // 37. MEDICATION
  // =========================================================
  {
    title: "37. Dental Medication",
    fields: [
      {
        type: "textarea",
        label: "Prescribed Medications",
        name: "prescribedMedications",
      },
      {
        type: "textarea",
        label: "Antibiotics",
        name: "antibiotics",
      },
      {
        type: "textarea",
        label: "Pain Medication",
        name: "painMedication",
      },
      {
        type: "textarea",
        label: "Mouthwash",
        name: "mouthwash",
      },
      {
        type: "textarea",
        label: "Topical Medication",
        name: "topicalMedication",
      },
    ],
  },

  // =========================================================
  // 38. PATIENT EDUCATION
  // =========================================================
  {
    title: "38. Patient Education",
    type: "checkbox",
    fields: [
      ["Brushing Instructions", "brushingInstructions"],
      ["Flossing Instructions", "flossingInstructions"],
      ["Dietary Advice", "dietaryAdvice"],
      ["Fluoride Advice", "fluorideAdvice"],
      ["Smoking / Tobacco Cessation", "tobaccoCessation"],
      ["Postoperative Instructions", "postoperativeInstructions"],
      ["Prosthesis Care", "prosthesisCare"],
      ["Oral Hygiene Education", "oralHygieneEducation"],
    ],
  },

  {
    title: "39. Patient Education Details",
    fields: [
      {
        type: "textarea",
        label: "Oral Hygiene Instructions",
        name: "oralHygieneInstructions",
      },
      {
        type: "textarea",
        label: "Dietary Instructions",
        name: "dietaryInstructions",
      },
      {
        type: "textarea",
        label: "Post-Treatment Instructions",
        name: "postTreatmentInstructions",
      },
      {
        type: "textarea",
        label: "Patient Counselling",
        name: "patientCounselling",
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
          "Routine Check-up",
          "Treatment Follow-up",
          "Postoperative Review",
          "Root Canal Follow-up",
          "Extraction Follow-up",
          "Implant Follow-up",
          "Periodontal Review",
          "Orthodontic Review",
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