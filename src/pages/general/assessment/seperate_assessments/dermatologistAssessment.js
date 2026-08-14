export const dermatologistSections = [
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
          "Procedure Review",
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
      ["Skin Rash", "skinRash"],
      ["Itching", "itching"],
      ["Redness", "skinRedness"],
      ["Skin Dryness", "skinDryness"],
      ["Skin Scaling", "skinScaling"],
      ["Skin Lesion", "skinLesion"],
      ["Pigmentation Changes", "pigmentationChanges"],
      ["Hair Loss", "hairLoss"],
      ["Dandruff", "dandruff"],
      ["Acne", "acne"],
      ["Pimples", "pimples"],
      ["Scarring", "scarring"],
      ["Skin Pain", "skinPain"],
      ["Burning Sensation", "burningSensation"],
      ["Swelling", "skinSwelling"],
      ["Ulcer", "skinUlcer"],
      ["Blister", "blister"],
      ["Skin Infection", "skinInfection"],
      ["Nail Changes", "nailChanges"],
      ["Excessive Sweating", "excessiveSweating"],
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
        label: "Progression of Condition",
        name: "conditionProgression",
      },
      {
        type: "textarea",
        label: "Previous Episodes",
        name: "previousEpisodes",
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
  // 4. SKIN SYMPTOMS
  // =========================================================
  {
    title: "4. Skin Symptoms",
    type: "checkbox",
    fields: [
      ["Itching", "skinItching"],
      ["Pain", "skinPainSymptom"],
      ["Burning", "skinBurning"],
      ["Tenderness", "skinTenderness"],
      ["Dryness", "skinDrynessSymptom"],
      ["Scaling", "skinScalingSymptom"],
      ["Crusting", "skinCrusting"],
      ["Oozing", "skinOozing"],
      ["Bleeding", "skinBleeding"],
      ["Blistering", "skinBlistering"],
      ["Peeling", "skinPeeling"],
      ["Thickening", "skinThickening"],
      ["Color Change", "skinColorChange"],
      ["Numbness", "skinNumbness"],
    ],
  },

  // =========================================================
  // 5. LESION ASSESSMENT
  // =========================================================
  {
    title: "5. Skin Lesion Assessment",
    type: "checkbox",
    fields: [
      ["Macule", "macule"],
      ["Papule", "papule"],
      ["Plaque", "plaque"],
      ["Nodule", "nodule"],
      ["Tumor", "tumor"],
      ["Vesicle", "vesicle"],
      ["Pustule", "pustule"],
      ["Cyst", "cyst"],
      ["Wheal", "wheal"],
      ["Ulcer", "ulcer"],
      ["Crust", "crust"],
      ["Scale", "scale"],
      ["Erosion", "erosion"],
      ["Fissure", "fissure"],
      ["Scar", "scar"],
      ["Keloid", "keloid"],
    ],
  },

  {
    title: "6. Lesion Details",
    fields: [
      {
        type: "textarea",
        label: "Lesion Location",
        name: "lesionLocation",
      },
      {
        type: "input",
        label: "Number of Lesions",
        name: "numberOfLesions",
        inputType: "number",
      },
      {
        type: "input",
        label: "Lesion Size",
        name: "lesionSize",
      },
      {
        type: "select",
        label: "Distribution",
        name: "lesionDistribution",
        options: [
          "Localized",
          "Generalized",
          "Symmetrical",
          "Asymmetrical",
          "Dermatomal",
          "Flexural",
          "Extensor",
          "Intertriginous",
          "Acral",
        ],
      },
      {
        type: "textarea",
        label: "Lesion Color",
        name: "lesionColor",
      },
      {
        type: "textarea",
        label: "Lesion Border",
        name: "lesionBorder",
      },
      {
        type: "textarea",
        label: "Surface Characteristics",
        name: "surfaceCharacteristics",
      },
      {
        type: "textarea",
        label: "Palpation Findings",
        name: "palpationFindings",
      },
    ],
  },

  // =========================================================
  // 7. ACNE
  // =========================================================
  {
    title: "7. Acne Assessment",
    type: "checkbox",
    fields: [
      ["Comedonal Acne", "comedonalAcne"],
      ["Papular Acne", "papularAcne"],
      ["Pustular Acne", "pustularAcne"],
      ["Nodular Acne", "nodularAcne"],
      ["Cystic Acne", "cysticAcne"],
      ["Acne Scarring", "acneScarring"],
      ["Post-Inflammatory Hyperpigmentation", "postInflammatoryHyperpigmentation"],
      ["Post-Inflammatory Erythema", "postInflammatoryErythema"],
    ],
  },

  {
    title: "8. Acne Details",
    fields: [
      {
        type: "select",
        label: "Acne Severity",
        name: "acneSeverity",
        options: [
          "Mild",
          "Moderate",
          "Moderately Severe",
          "Severe",
        ],
      },
      {
        type: "select",
        label: "Affected Area",
        name: "acneAffectedArea",
        options: [
          "Face",
          "Chest",
          "Back",
          "Shoulders",
          "Arms",
          "Other",
        ],
      },
      {
        type: "textarea",
        label: "Acne History",
        name: "acneHistory",
      },
      {
        type: "textarea",
        label: "Previous Acne Treatment",
        name: "previousAcneTreatment",
      },
      {
        type: "textarea",
        label: "Acne Scarring Details",
        name: "acneScarringDetails",
      },
    ],
  },

  // =========================================================
  // 9. HAIR & SCALP
  // =========================================================
  {
    title: "9. Hair & Scalp Assessment",
    type: "checkbox",
    fields: [
      ["Hair Loss", "hairLossAssessment"],
      ["Patchy Hair Loss", "patchyHairLoss"],
      ["Diffuse Hair Loss", "diffuseHairLoss"],
      ["Male Pattern Hair Loss", "malePatternHairLoss"],
      ["Female Pattern Hair Loss", "femalePatternHairLoss"],
      ["Alopecia Areata", "alopeciaAreata"],
      ["Scalp Itching", "scalpItching"],
      ["Scalp Scaling", "scalpScaling"],
      ["Dandruff", "scalpDandruff"],
      ["Scalp Redness", "scalpRedness"],
      ["Scalp Infection", "scalpInfection"],
      ["Scalp Psoriasis", "scalpPsoriasis"],
      ["Folliculitis", "folliculitis"],
    ],
  },

  {
    title: "10. Hair Loss Details",
    fields: [
      {
        type: "input",
        label: "Duration of Hair Loss",
        name: "hairLossDuration",
      },
      {
        type: "select",
        label: "Hair Loss Pattern",
        name: "hairLossPattern",
        options: [
          "Diffuse",
          "Patchy",
          "Frontal",
          "Vertex",
          "Temporal",
          "Generalized",
        ],
      },
      {
        type: "textarea",
        label: "Hair Pull Test",
        name: "hairPullTest",
      },
      {
        type: "textarea",
        label: "Scalp Examination",
        name: "scalpExamination",
      },
      {
        type: "textarea",
        label: "Previous Hair Treatment",
        name: "previousHairTreatment",
      },
      {
        type: "textarea",
        label: "Hair Loss Family History",
        name: "hairLossFamilyHistory",
      },
    ],
  },

  // =========================================================
  // 11. NAIL ASSESSMENT
  // =========================================================
  {
    title: "11. Nail Assessment",
    type: "checkbox",
    fields: [
      ["Nail Discoloration", "nailDiscoloration"],
      ["Nail Thickening", "nailThickening"],
      ["Nail Splitting", "nailSplitting"],
      ["Nail Pitting", "nailPitting"],
      ["Nail Ridging", "nailRidging"],
      ["Nail Separation", "onycholysis"],
      ["Brittle Nails", "brittleNails"],
      ["Ingrown Nail", "ingrownNail"],
      ["Fungal Nail Infection", "fungalNailInfection"],
      ["Paronychia", "paronychia"],
      ["Nail Trauma", "nailTrauma"],
    ],
  },

  {
    title: "12. Nail Examination",
    fields: [
      {
        type: "textarea",
        label: "Affected Nails",
        name: "affectedNails",
      },
      {
        type: "textarea",
        label: "Nail Plate Findings",
        name: "nailPlateFindings",
      },
      {
        type: "textarea",
        label: "Nail Bed Findings",
        name: "nailBedFindings",
      },
      {
        type: "textarea",
        label: "Periungual Findings",
        name: "periungualFindings",
      },
      {
        type: "textarea",
        label: "Nail Investigation Results",
        name: "nailInvestigationResults",
      },
    ],
  },

  // =========================================================
  // 13. PIGMENTATION
  // =========================================================
  {
    title: "13. Pigmentation Assessment",
    type: "checkbox",
    fields: [
      ["Hyperpigmentation", "hyperpigmentation"],
      ["Hypopigmentation", "hypopigmentation"],
      ["Depigmentation", "depigmentation"],
      ["Melasma", "melasma"],
      ["Vitiligo", "vitiligo"],
      ["Post-Inflammatory Pigmentation", "postInflammatoryPigmentation"],
      ["Freckles", "freckles"],
      ["Lentigines", "lentigines"],
      ["Birthmark", "birthmark"],
      ["Acanthosis Nigricans", "acanthosisNigricans"],
    ],
  },

  {
    title: "14. Pigmentation Details",
    fields: [
      {
        type: "textarea",
        label: "Pigmentation Location",
        name: "pigmentationLocation",
      },
      {
        type: "textarea",
        label: "Pattern & Distribution",
        name: "pigmentationPattern",
      },
      {
        type: "textarea",
        label: "Duration",
        name: "pigmentationDuration",
      },
      {
        type: "textarea",
        label: "Triggering Factors",
        name: "pigmentationTriggers",
      },
      {
        type: "textarea",
        label: "Previous Treatment",
        name: "pigmentationTreatment",
      },
    ],
  },

  // =========================================================
  // 15. ECZEMA / DERMATITIS
  // =========================================================
  {
    title: "15. Eczema & Dermatitis",
    type: "checkbox",
    fields: [
      ["Atopic Dermatitis", "atopicDermatitis"],
      ["Contact Dermatitis", "contactDermatitis"],
      ["Allergic Contact Dermatitis", "allergicContactDermatitis"],
      ["Irritant Contact Dermatitis", "irritantContactDermatitis"],
      ["Seborrheic Dermatitis", "seborrheicDermatitis"],
      ["Nummular Eczema", "nummularEczema"],
      ["Dyshidrotic Eczema", "dyshidroticEczema"],
      ["Hand Eczema", "handEczema"],
      ["Foot Eczema", "footEczema"],
      ["Chronic Eczema", "chronicEczema"],
    ],
  },

  {
    title: "16. Dermatitis Details",
    fields: [
      {
        type: "textarea",
        label: "Affected Areas",
        name: "dermatitisAffectedAreas",
      },
      {
        type: "textarea",
        label: "Possible Trigger",
        name: "dermatitisTrigger",
      },
      {
        type: "textarea",
        label: "Exposure History",
        name: "exposureHistory",
      },
      {
        type: "textarea",
        label: "Previous Treatment",
        name: "dermatitisTreatment",
      },
      {
        type: "textarea",
        label: "Dermatitis Severity",
        name: "dermatitisSeverity",
      },
    ],
  },

  // =========================================================
  // 17. PSORIASIS
  // =========================================================
  {
    title: "17. Psoriasis Assessment",
    type: "checkbox",
    fields: [
      ["Plaque Psoriasis", "plaquePsoriasis"],
      ["Guttate Psoriasis", "guttatePsoriasis"],
      ["Inverse Psoriasis", "inversePsoriasis"],
      ["Pustular Psoriasis", "pustularPsoriasis"],
      ["Erythrodermic Psoriasis", "erythrodermicPsoriasis"],
      ["Scalp Psoriasis", "psoriasisScalp"],
      ["Nail Psoriasis", "psoriasisNail"],
      ["Psoriatic Arthritis", "psoriaticArthritis"],
    ],
  },

  {
    title: "18. Psoriasis Details",
    fields: [
      {
        type: "textarea",
        label: "Affected Body Areas",
        name: "psoriasisAffectedAreas",
      },
      {
        type: "select",
        label: "Severity",
        name: "psoriasisSeverity",
        options: [
          "Mild",
          "Moderate",
          "Severe",
        ],
      },
      {
        type: "input",
        label: "BSA Involvement (%)",
        name: "psoriasisBsa",
        inputType: "number",
      },
      {
        type: "textarea",
        label: "PASI Score",
        name: "pasiScore",
      },
      {
        type: "textarea",
        label: "Previous Psoriasis Treatment",
        name: "previousPsoriasisTreatment",
      },
      {
        type: "textarea",
        label: "Joint Symptoms",
        name: "psoriasisJointSymptoms",
      },
    ],
  },

  // =========================================================
  // 19. INFECTIONS
  // =========================================================
  {
    title: "19. Skin Infections",
    type: "checkbox",
    fields: [
      ["Bacterial Infection", "bacterialSkinInfection"],
      ["Fungal Infection", "fungalSkinInfection"],
      ["Viral Infection", "viralSkinInfection"],
      ["Parasitic Infection", "parasiticSkinInfection"],
      ["Cellulitis", "cellulitis"],
      ["Impetigo", "impetigo"],
      ["Folliculitis", "skinFolliculitis"],
      ["Abscess", "skinAbscess"],
      ["Herpes Simplex", "herpesSimplex"],
      ["Herpes Zoster", "herpesZoster"],
      ["Scabies", "scabies"],
      ["Pediculosis", "pediculosis"],
      ["Tinea", "tinea"],
      ["Candidiasis", "cutaneousCandidiasis"],
    ],
  },

  {
    title: "20. Infection Details",
    fields: [
      {
        type: "textarea",
        label: "Site of Infection",
        name: "infectionSite",
      },
      {
        type: "textarea",
        label: "Infection Duration",
        name: "infectionDuration",
      },
      {
        type: "textarea",
        label: "Discharge / Pus",
        name: "infectionDischarge",
      },
      {
        type: "textarea",
        label: "Microbiology Results",
        name: "microbiologyResults",
      },
      {
        type: "textarea",
        label: "Previous Antimicrobial Treatment",
        name: "previousAntimicrobialTreatment",
      },
    ],
  },

  // =========================================================
  // 21. ALLERGIC / IMMUNOLOGICAL
  // =========================================================
  {
    title: "21. Allergic & Immunological Conditions",
    type: "checkbox",
    fields: [
      ["Urticaria", "urticaria"],
      ["Chronic Urticaria", "chronicUrticaria"],
      ["Angioedema", "angioedema"],
      ["Drug Allergy", "drugAllergy"],
      ["Food Allergy", "foodAllergy"],
      ["Atopic Disease", "atopicDisease"],
      ["Autoimmune Skin Disease", "autoimmuneSkinDisease"],
      ["Lupus", "cutaneousLupus"],
      ["Pemphigus", "pemphigus"],
      ["Bullous Pemphigoid", "bullousPemphigoid"],
      ["Dermatitis Herpetiformis", "dermatitisHerpetiformis"],
    ],
  },

  {
    title: "22. Allergy Details",
    fields: [
      {
        type: "textarea",
        label: "Suspected Trigger",
        name: "allergyTrigger",
      },
      {
        type: "textarea",
        label: "Exposure History",
        name: "allergyExposureHistory",
      },
      {
        type: "textarea",
        label: "Previous Allergic Episodes",
        name: "previousAllergicEpisodes",
      },
      {
        type: "textarea",
        label: "Allergy Investigation",
        name: "allergyInvestigation",
      },
    ],
  },

  // =========================================================
  // 23. MOLES / PIGMENTED LESIONS
  // =========================================================
  {
    title: "23. Pigmented Lesion Assessment",
    type: "checkbox",
    fields: [
      ["Mole / Nevus", "nevus"],
      ["Atypical Mole", "atypicalNevus"],
      ["Dysplastic Nevus", "dysplasticNevus"],
      ["Seborrheic Keratosis", "seborrheicKeratosis"],
      ["Actinic Keratosis", "actinicKeratosis"],
      ["Suspicious Pigmented Lesion", "suspiciousPigmentedLesion"],
      ["Melanoma Suspected", "melanomaSuspected"],
    ],
  },

  {
    title: "24. ABCDE Assessment",
    fields: [
      {
        type: "select",
        label: "Asymmetry",
        name: "abcdeAsymmetry",
        options: ["Absent", "Present"],
      },
      {
        type: "select",
        label: "Border Irregularity",
        name: "abcdeBorder",
        options: ["Absent", "Present"],
      },
      {
        type: "textarea",
        label: "Color Variation",
        name: "abcdeColor",
      },
      {
        type: "input",
        label: "Diameter",
        name: "abcdeDiameter",
      },
      {
        type: "textarea",
        label: "Evolution / Change",
        name: "abcdeEvolution",
      },
      {
        type: "textarea",
        label: "Dermoscopic Findings",
        name: "dermoscopicFindings",
      },
    ],
  },

  // =========================================================
  // 25. SKIN CANCER
  // =========================================================
  {
    title: "25. Skin Cancer Assessment",
    type: "checkbox",
    fields: [
      ["Basal Cell Carcinoma", "basalCellCarcinoma"],
      ["Squamous Cell Carcinoma", "squamousCellCarcinoma"],
      ["Melanoma", "melanoma"],
      ["Actinic Keratosis", "skinActinicKeratosis"],
      ["Precancerous Lesion", "precancerousLesion"],
      ["Suspicious Skin Lesion", "suspiciousSkinLesion"],
    ],
  },

  {
    title: "26. Skin Cancer Details",
    fields: [
      {
        type: "textarea",
        label: "Lesion Location",
        name: "cancerLesionLocation",
      },
      {
        type: "input",
        label: "Lesion Size",
        name: "cancerLesionSize",
      },
      {
        type: "textarea",
        label: "Clinical Appearance",
        name: "clinicalAppearance",
      },
      {
        type: "textarea",
        label: "Biopsy Findings",
        name: "skinBiopsyFindings",
      },
      {
        type: "textarea",
        label: "Histopathology",
        name: "skinHistopathology",
      },
      {
        type: "textarea",
        label: "Cancer Stage",
        name: "skinCancerStage",
      },
    ],
  },

  // =========================================================
  // 27. WOUND ASSESSMENT
  // =========================================================
  {
    title: "27. Wound Assessment",
    type: "checkbox",
    fields: [
      ["Acute Wound", "acuteWound"],
      ["Chronic Wound", "chronicWound"],
      ["Diabetic Ulcer", "diabeticUlcer"],
      ["Pressure Ulcer", "pressureUlcer"],
      ["Venous Ulcer", "venousUlcer"],
      ["Arterial Ulcer", "arterialUlcer"],
      ["Infected Wound", "infectedWound"],
      ["Non-Healing Wound", "nonHealingWound"],
      ["Postoperative Wound", "postoperativeWound"],
      ["Burn Wound", "burnWound"],
    ],
  },

  {
    title: "28. Wound Details",
    fields: [
      {
        type: "textarea",
        label: "Wound Location",
        name: "woundLocation",
      },
      {
        type: "input",
        label: "Wound Length",
        name: "woundLength",
      },
      {
        type: "input",
        label: "Wound Width",
        name: "woundWidth",
      },
      {
        type: "input",
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
        name: "woundDischarge",
      },
      {
        type: "textarea",
        label: "Surrounding Skin",
        name: "surroundingSkin",
      },
    ],
  },

  // =========================================================
  // 29. COSMETIC / AESTHETIC
  // =========================================================
  {
    title: "29. Cosmetic & Aesthetic Assessment",
    type: "checkbox",
    fields: [
      ["Acne Scars", "cosmeticAcneScars"],
      ["Fine Lines", "fineLines"],
      ["Wrinkles", "wrinkles"],
      ["Hyperpigmentation", "cosmeticHyperpigmentation"],
      ["Uneven Skin Tone", "unevenSkinTone"],
      ["Large Pores", "largePores"],
      ["Sun Damage", "sunDamage"],
      ["Photoaging", "photoaging"],
      ["Stretch Marks", "stretchMarks"],
      ["Unwanted Hair", "unwantedHair"],
      ["Facial Redness", "facialRedness"],
    ],
  },

  {
    title: "30. Aesthetic Treatment History",
    fields: [
      {
        type: "textarea",
        label: "Previous Cosmetic Procedures",
        name: "previousCosmeticProcedures",
      },
      {
        type: "textarea",
        label: "Previous Laser Treatment",
        name: "previousLaserTreatment",
      },
      {
        type: "textarea",
        label: "Previous Chemical Peel",
        name: "previousChemicalPeel",
      },
      {
        type: "textarea",
        label: "Previous Injectables",
        name: "previousInjectables",
      },
      {
        type: "textarea",
        label: "Patient Cosmetic Goals",
        name: "cosmeticGoals",
      },
    ],
  },

  // =========================================================
  // 31. PHYSICAL EXAMINATION
  // =========================================================
  {
    title: "31. Dermatological Examination",
    fields: [
      {
        type: "textarea",
        label: "General Skin Examination",
        name: "generalSkinExamination",
      },
      {
        type: "textarea",
        label: "Face Examination",
        name: "faceExamination",
      },
      {
        type: "textarea",
        label: "Scalp Examination",
        name: "detailedScalpExamination",
      },
      {
        type: "textarea",
        label: "Trunk Examination",
        name: "trunkExamination",
      },
      {
        type: "textarea",
        label: "Upper Limb Examination",
        name: "upperLimbExamination",
      },
      {
        type: "textarea",
        label: "Lower Limb Examination",
        name: "lowerLimbExamination",
      },
      {
        type: "textarea",
        label: "Nail Examination",
        name: "detailedNailExamination",
      },
      {
        type: "textarea",
        label: "Mucosal Examination",
        name: "mucosalExamination",
      },
    ],
  },

  // =========================================================
  // 32. VITALS
  // =========================================================
  {
    title: "32. Vital Signs",
    fields: [
      {
        type: "input",
        label: "Temperature",
        name: "temperature",
      },
      {
        type: "input",
        label: "Blood Pressure",
        name: "bloodPressure",
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
        label: "SpO₂",
        name: "spo2",
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
  // 33. MEDICAL HISTORY
  // =========================================================
  {
    title: "33. Past Medical History",
    type: "checkbox",
    fields: [
      ["Diabetes Mellitus", "diabetes"],
      ["Hypertension", "hypertension"],
      ["Thyroid Disease", "thyroidDisease"],
      ["Asthma", "asthma"],
      ["Kidney Disease", "kidneyDisease"],
      ["Liver Disease", "liverDisease"],
      ["Autoimmune Disease", "autoimmuneDisease"],
      ["Cancer", "cancerHistory"],
      ["Tuberculosis", "tuberculosis"],
      ["HIV", "hiv"],
    ],
  },

  // =========================================================
  // 34. FAMILY HISTORY
  // =========================================================
  {
    title: "34. Family History",
    fields: [
      {
        type: "textarea",
        label: "Skin Disease Family History",
        name: "skinDiseaseFamilyHistory",
      },
      {
        type: "textarea",
        label: "Psoriasis Family History",
        name: "psoriasisFamilyHistory",
      },
      {
        type: "textarea",
        label: "Autoimmune Disease Family History",
        name: "autoimmuneFamilyHistory",
      },
      {
        type: "textarea",
        label: "Skin Cancer Family History",
        name: "skinCancerFamilyHistory",
      },
      {
        type: "textarea",
        label: "Hair Loss Family History",
        name: "dermatologyHairFamilyHistory",
      },
    ],
  },

  // =========================================================
  // 35. ALLERGY HISTORY
  // =========================================================
  {
    title: "35. Allergy History",
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
        label: "Cosmetic Allergies",
        name: "cosmeticAllergies",
      },
      {
        type: "textarea",
        label: "Environmental Allergies",
        name: "environmentalAllergies",
      },
      {
        type: "textarea",
        label: "Other Allergies",
        name: "otherAllergies",
      },
      {
        type: "textarea",
        label: "Previous Allergic Reactions",
        name: "previousAllergicReactions",
      },
    ],
  },

  // =========================================================
  // 36. MEDICATION HISTORY
  // =========================================================
  {
    title: "36. Medication History",
    fields: [
      {
        type: "textarea",
        label: "Current Medications",
        name: "currentMedications",
        placeholder: "Medicine, dose, frequency, duration",
      },
      {
        type: "textarea",
        label: "Topical Medications",
        name: "topicalMedications",
      },
      {
        type: "textarea",
        label: "Oral Medications",
        name: "oralMedications",
      },
      {
        type: "textarea",
        label: "Steroid Use",
        name: "steroidUse",
      },
      {
        type: "textarea",
        label: "Immunosuppressive Medications",
        name: "immunosuppressiveMedications",
      },
      {
        type: "textarea",
        label: "Previous Dermatological Medications",
        name: "previousDermatologicalMedications",
      },
    ],
  },

  // =========================================================
  // 37. INVESTIGATIONS
  // =========================================================
  {
    title: "37. Dermatological Investigations",
    type: "checkbox",
    fields: [
      ["Skin Biopsy", "skinBiopsy"],
      ["Punch Biopsy", "punchBiopsy"],
      ["Shave Biopsy", "shaveBiopsy"],
      ["Excisional Biopsy", "excisionalBiopsy"],
      ["KOH Test", "kohTest"],
      ["Fungal Culture", "fungalCulture"],
      ["Bacterial Culture", "bacterialCulture"],
      ["Viral Testing", "viralTesting"],
      ["Patch Test", "patchTest"],
      ["Prick Test", "prickTest"],
      ["Dermoscopy", "dermoscopy"],
      ["Wood's Lamp", "woodsLamp"],
      ["Skin Scraping", "skinScraping"],
    ],
  },

  {
    title: "38. Investigation Results",
    fields: [
      {
        type: "textarea",
        label: "Biopsy Result",
        name: "biopsyResult",
      },
      {
        type: "textarea",
        label: "Histopathology Result",
        name: "dermatologyHistopathology",
      },
      {
        type: "textarea",
        label: "KOH / Fungal Test Result",
        name: "kohResult",
      },
      {
        type: "textarea",
        label: "Culture Result",
        name: "cultureResult",
      },
      {
        type: "textarea",
        label: "Patch Test Result",
        name: "patchTestResult",
      },
      {
        type: "textarea",
        label: "Dermoscopy Result",
        name: "dermoscopyResult",
      },
      {
        type: "textarea",
        label: "Other Investigation Results",
        name: "otherInvestigationResults",
      },
    ],
  },

  // =========================================================
  // 39. PROCEDURES
  // =========================================================
  {
    title: "39. Dermatological Procedures",
    type: "checkbox",
    fields: [
      ["Cryotherapy", "cryotherapy"],
      ["Electrocautery", "electrocautery"],
      ["Curettage", "curettage"],
      ["Skin Biopsy", "procedureSkinBiopsy"],
      ["Excision", "skinExcision"],
      ["Incision & Drainage", "incisionDrainage"],
      ["Chemical Peel", "chemicalPeel"],
      ["Laser Therapy", "laserTherapy"],
      ["Microneedling", "microneedling"],
      ["Phototherapy", "phototherapy"],
      ["Botulinum Toxin", "botulinumToxin"],
      ["Dermal Filler", "dermalFiller"],
      ["Hair Transplant Evaluation", "hairTransplantEvaluation"],
    ],
  },

  // =========================================================
  // 40. PROCEDURE DETAILS
  // =========================================================
  {
    title: "40. Procedure Details",
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
        label: "Indication",
        name: "procedureIndication",
      },
      {
        type: "textarea",
        label: "Procedure Details",
        name: "procedureDetails",
      },
      {
        type: "textarea",
        label: "Site",
        name: "procedureSite",
      },
      {
        type: "textarea",
        label: "Anesthesia Used",
        name: "procedureAnesthesia",
      },
      {
        type: "textarea",
        label: "Specimen",
        name: "procedureSpecimen",
      },
      {
        type: "textarea",
        label: "Complications",
        name: "procedureComplications",
      },
      {
        type: "textarea",
        label: "Post-Procedure Instructions",
        name: "postProcedureInstructions",
      },
    ],
  },

  // =========================================================
  // 41. DERMATOLOGICAL DIAGNOSIS
  // =========================================================
  {
    title: "41. Assessment & Diagnosis",
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
        label: "Dermatological Impression",
        name: "dermatologicalImpression",
      },
    ],
  },

  // =========================================================
  // 42. TREATMENT PLAN
  // =========================================================
  {
    title: "42. Treatment Plan",
    fields: [
      {
        type: "textarea",
        label: "Medical Management",
        name: "medicalManagement",
      },
      {
        type: "textarea",
        label: "Topical Treatment",
        name: "topicalTreatment",
      },
      {
        type: "textarea",
        label: "Oral Treatment",
        name: "oralTreatment",
      },
      {
        type: "textarea",
        label: "Skin Care Advice",
        name: "skinCareAdvice",
      },
      {
        type: "textarea",
        label: "Sun Protection Advice",
        name: "sunProtectionAdvice",
      },
      {
        type: "textarea",
        label: "Hair Care Advice",
        name: "hairCareAdvice",
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
        label: "Further Investigations",
        name: "furtherInvestigations",
      },
    ],
  },

  // =========================================================
  // 43. FOLLOW-UP
  // =========================================================
  {
    title: "43. Follow-up",
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
          "Treatment Review",
          "Procedure Review",
          "Biopsy Review",
          "Acne Review",
          "Hair Loss Review",
          "Psoriasis Review",
          "Skin Cancer Review",
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
        label: "Warning Signs Explained",
        name: "warningSignsExplained",
      },
      {
        type: "textarea",
        label: "Additional Notes",
        name: "additionalNotes",
      },
    ],
  },
];