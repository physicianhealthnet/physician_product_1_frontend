export const ophthalmologistSections = [
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
          "Postoperative Review",
          "Routine Eye Examination",
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
      ["Blurred Vision", "blurredVision"],
      ["Reduced Vision", "reducedVision"],
      ["Eye Pain", "eyePain"],
      ["Eye Redness", "eyeRedness"],
      ["Eye Itching", "eyeItching"],
      ["Eye Discharge", "eyeDischarge"],
      ["Watery Eyes", "wateryEyes"],
      ["Dry Eyes", "dryEyes"],
      ["Foreign Body Sensation", "foreignBodySensation"],
      ["Photophobia", "photophobia"],
      ["Floaters", "floaters"],
      ["Flashes of Light", "flashesOfLight"],
      ["Double Vision", "doubleVision"],
      ["Headache", "headache"],
      ["Night Vision Difficulty", "nightVisionDifficulty"],
      ["Color Vision Difficulty", "colorVisionDifficulty"],
      ["Sudden Vision Loss", "suddenVisionLoss"],
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
        label: "Progression",
        name: "progression",
      },
      {
        type: "textarea",
        label: "Associated Symptoms",
        name: "associatedSymptoms",
      },
      {
        type: "textarea",
        label: "Previous Eye Treatment",
        name: "previousEyeTreatment",
      },
      {
        type: "textarea",
        label: "Previous Eye Surgery",
        name: "previousEyeSurgery",
      },
      {
        type: "textarea",
        label: "Trauma History",
        name: "traumaHistory",
      },
      {
        type: "textarea",
        label: "Contact Lens History",
        name: "contactLensHistory",
      },
    ],
  },

  // =========================================================
  // 4. VISUAL ACUITY
  // =========================================================
  {
    title: "4. Visual Acuity",
    fields: [
      {
        type: "input",
        label: "Right Eye (OD) - Distance",
        name: "rightEyeDistanceVision",
      },
      {
        type: "input",
        label: "Left Eye (OS) - Distance",
        name: "leftEyeDistanceVision",
      },
      {
        type: "input",
        label: "Both Eyes (OU) - Distance",
        name: "bothEyesDistanceVision",
      },
      {
        type: "input",
        label: "Right Eye (OD) - Near",
        name: "rightEyeNearVision",
      },
      {
        type: "input",
        label: "Left Eye (OS) - Near",
        name: "leftEyeNearVision",
      },
      {
        type: "input",
        label: "Both Eyes (OU) - Near",
        name: "bothEyesNearVision",
      },
      {
        type: "input",
        label: "Pinhole OD",
        name: "pinholeOd",
      },
      {
        type: "input",
        label: "Pinhole OS",
        name: "pinholeOs",
      },
      {
        type: "input",
        label: "Best Corrected Vision OD",
        name: "bestCorrectedVisionOd",
      },
      {
        type: "input",
        label: "Best Corrected Vision OS",
        name: "bestCorrectedVisionOs",
      },
    ],
  },

  // =========================================================
  // 5. REFRACTION
  // =========================================================
  {
    title: "5. Refraction",
    fields: [
      {
        type: "input",
        label: "OD Sphere",
        name: "odSphere",
      },
      {
        type: "input",
        label: "OD Cylinder",
        name: "odCylinder",
      },
      {
        type: "input",
        label: "OD Axis",
        name: "odAxis",
      },
      {
        type: "input",
        label: "OS Sphere",
        name: "osSphere",
      },
      {
        type: "input",
        label: "OS Cylinder",
        name: "osCylinder",
      },
      {
        type: "input",
        label: "OS Axis",
        name: "osAxis",
      },
      {
        type: "input",
        label: "Add Power OD",
        name: "addPowerOd",
      },
      {
        type: "input",
        label: "Add Power OS",
        name: "addPowerOs",
      },
      {
        type: "input",
        label: "PD",
        name: "pupillaryDistance",
      },
      {
        type: "textarea",
        label: "Final Prescription",
        name: "finalPrescription",
      },
    ],
  },

  // =========================================================
  // 6. EXTERNAL EYE EXAMINATION
  // =========================================================
  {
    title: "6. External Eye Examination",
    type: "checkbox",
    fields: [
      ["Normal External Appearance", "normalExternalAppearance"],
      ["Periorbital Edema", "periorbitalEdema"],
      ["Eyelid Swelling", "eyelidSwelling"],
      ["Eyelid Redness", "eyelidRedness"],
      ["Ptosis", "ptosis"],
      ["Entropion", "entropion"],
      ["Ectropion", "ectropion"],
      ["Blepharitis", "blepharitis"],
      ["Chalazion", "chalazion"],
      ["Stye / Hordeolum", "hordeolum"],
      ["Eyelid Lesion", "eyelidLesion"],
      ["Proptosis", "proptosis"],
      ["Enophthalmos", "enophthalmos"],
    ],
  },

  // =========================================================
  // 7. CONJUNCTIVA
  // =========================================================
  {
    title: "7. Conjunctival Examination",
    type: "checkbox",
    fields: [
      ["Normal Conjunctiva", "normalConjunctiva"],
      ["Conjunctival Injection", "conjunctivalInjection"],
      ["Conjunctival Chemosis", "conjunctivalChemosis"],
      ["Follicles", "conjunctivalFollicles"],
      ["Papillae", "conjunctivalPapillae"],
      ["Conjunctival Hemorrhage", "conjunctivalHemorrhage"],
      ["Discharge", "conjunctivalDischarge"],
      ["Pterygium", "pterygium"],
      ["Pinguecula", "pinguecula"],
      ["Conjunctival Lesion", "conjunctivalLesion"],
    ],
  },

  // =========================================================
  // 8. CORNEA
  // =========================================================
  {
    title: "8. Corneal Examination",
    type: "checkbox",
    fields: [
      ["Clear Cornea", "clearCornea"],
      ["Corneal Edema", "cornealEdema"],
      ["Corneal Ulcer", "cornealUlcer"],
      ["Corneal Scar", "cornealScar"],
      ["Keratitis", "keratitis"],
      ["Corneal Abrasion", "cornealAbrasion"],
      ["Keratoconus", "keratoconus"],
      ["Corneal Dystrophy", "cornealDystrophy"],
      ["Corneal Degeneration", "cornealDegeneration"],
      ["Foreign Body", "cornealForeignBody"],
      ["Descemet's Membrane Changes", "descemetsChanges"],
    ],
  },

  {
    title: "9. Corneal Details",
    fields: [
      {
        type: "textarea",
        label: "OD Corneal Findings",
        name: "odCornealFindings",
      },
      {
        type: "textarea",
        label: "OS Corneal Findings",
        name: "osCornealFindings",
      },
      {
        type: "textarea",
        label: "Fluorescein Staining",
        name: "fluoresceinStaining",
      },
      {
        type: "textarea",
        label: "Corneal Sensation",
        name: "cornealSensation",
      },
      {
        type: "textarea",
        label: "Corneal Topography Findings",
        name: "cornealTopography",
      },
    ],
  },

  // =========================================================
  // 10. ANTERIOR CHAMBER
  // =========================================================
  {
    title: "10. Anterior Chamber",
    fields: [
      {
        type: "select",
        label: "OD Anterior Chamber",
        name: "odAnteriorChamber",
        options: [
          "Deep & Quiet",
          "Shallow",
          "Cells Present",
          "Flare Present",
          "Hypopyon",
        ],
      },
      {
        type: "select",
        label: "OS Anterior Chamber",
        name: "osAnteriorChamber",
        options: [
          "Deep & Quiet",
          "Shallow",
          "Cells Present",
          "Flare Present",
          "Hypopyon",
        ],
      },
      {
        type: "textarea",
        label: "Anterior Chamber Findings",
        name: "anteriorChamberFindings",
      },
    ],
  },

  // =========================================================
  // 11. IRIS & PUPIL
  // =========================================================
  {
    title: "11. Iris & Pupil Examination",
    fields: [
      {
        type: "input",
        label: "Pupil OD",
        name: "pupilOd",
      },
      {
        type: "input",
        label: "Pupil OS",
        name: "pupilOs",
      },
      {
        type: "select",
        label: "Pupillary Reaction",
        name: "pupillaryReaction",
        options: [
          "Normal",
          "Sluggish",
          "Non-Reactive",
          "RAPD Present",
        ],
      },
      {
        type: "textarea",
        label: "Iris Findings OD",
        name: "irisFindingsOd",
      },
      {
        type: "textarea",
        label: "Iris Findings OS",
        name: "irisFindingsOs",
      },
      {
        type: "textarea",
        label: "Pupil Findings",
        name: "pupilFindings",
      },
    ],
  },

  // =========================================================
  // 12. LENS
  // =========================================================
  {
    title: "12. Lens Examination",
    type: "checkbox",
    fields: [
      ["Clear Lens", "clearLens"],
      ["Cataract", "cataract"],
      ["Nuclear Sclerosis", "nuclearSclerosis"],
      ["Cortical Cataract", "corticalCataract"],
      ["Posterior Subcapsular Cataract", "posteriorSubcapsularCataract"],
      ["Congenital Cataract", "congenitalCataract"],
      ["Lens Subluxation", "lensSubluxation"],
      ["Lens Dislocation", "lensDislocation"],
      ["Posterior Capsule Opacification", "posteriorCapsuleOpacity"],
      ["Intraocular Lens Present", "intraocularLens"],
    ],
  },

  {
    title: "13. Lens Details",
    fields: [
      {
        type: "textarea",
        label: "OD Lens Findings",
        name: "odLensFindings",
      },
      {
        type: "textarea",
        label: "OS Lens Findings",
        name: "osLensFindings",
      },
      {
        type: "select",
        label: "Cataract Grade",
        name: "cataractGrade",
        options: [
          "None",
          "Mild",
          "Moderate",
          "Advanced",
          "Mature",
          "Hypermature",
        ],
      },
    ],
  },

  // =========================================================
  // 14. INTRAOCULAR PRESSURE
  // =========================================================
  {
    title: "14. Intraocular Pressure",
    fields: [
      {
        type: "input",
        label: "IOP OD (mmHg)",
        name: "iopOd",
        inputType: "number",
      },
      {
        type: "input",
        label: "IOP OS (mmHg)",
        name: "iopOs",
        inputType: "number",
      },
      {
        type: "select",
        label: "Measurement Method",
        name: "iopMethod",
        options: [
          "Goldmann Applanation",
          "Non-Contact Tonometry",
          "Tonopen",
          "iCare",
          "Other",
        ],
      },
      {
        type: "textarea",
        label: "IOP Notes",
        name: "iopNotes",
      },
    ],
  },

  // =========================================================
  // 15. GLAUCOMA
  // =========================================================
  {
    title: "15. Glaucoma Assessment",
    type: "checkbox",
    fields: [
      ["Glaucoma Suspect", "glaucomaSuspect"],
      ["Primary Open Angle Glaucoma", "primaryOpenAngleGlaucoma"],
      ["Angle Closure Glaucoma", "angleClosureGlaucoma"],
      ["Normal Tension Glaucoma", "normalTensionGlaucoma"],
      ["Secondary Glaucoma", "secondaryGlaucoma"],
      ["Ocular Hypertension", "ocularHypertension"],
      ["Optic Nerve Damage", "opticNerveDamage"],
    ],
  },

  {
    title: "16. Glaucoma Details",
    fields: [
      {
        type: "textarea",
        label: "Optic Disc OD",
        name: "opticDiscOd",
      },
      {
        type: "textarea",
        label: "Optic Disc OS",
        name: "opticDiscOs",
      },
      {
        type: "input",
        label: "Cup-to-Disc Ratio OD",
        name: "cupDiscRatioOd",
      },
      {
        type: "input",
        label: "Cup-to-Disc Ratio OS",
        name: "cupDiscRatioOs",
      },
      {
        type: "textarea",
        label: "Visual Field Findings",
        name: "visualFieldFindings",
      },
      {
        type: "textarea",
        label: "Glaucoma Treatment",
        name: "glaucomaTreatment",
      },
    ],
  },

  // =========================================================
  // 17. FUNDUS
  // =========================================================
  {
    title: "17. Fundus Examination",
    fields: [
      {
        type: "textarea",
        label: "OD Optic Disc",
        name: "fundusOpticDiscOd",
      },
      {
        type: "textarea",
        label: "OS Optic Disc",
        name: "fundusOpticDiscOs",
      },
      {
        type: "textarea",
        label: "OD Macula",
        name: "maculaOd",
      },
      {
        type: "textarea",
        label: "OS Macula",
        name: "maculaOs",
      },
      {
        type: "textarea",
        label: "OD Retinal Vessels",
        name: "retinalVesselsOd",
      },
      {
        type: "textarea",
        label: "OS Retinal Vessels",
        name: "retinalVesselsOs",
      },
      {
        type: "textarea",
        label: "OD Peripheral Retina",
        name: "peripheralRetinaOd",
      },
      {
        type: "textarea",
        label: "OS Peripheral Retina",
        name: "peripheralRetinaOs",
      },
    ],
  },

  // =========================================================
  // 18. RETINAL CONDITIONS
  // =========================================================
  {
    title: "18. Retinal Assessment",
    type: "checkbox",
    fields: [
      ["Diabetic Retinopathy", "diabeticRetinopathy"],
      ["Hypertensive Retinopathy", "hypertensiveRetinopathy"],
      ["Macular Degeneration", "macularDegeneration"],
      ["Macular Edema", "macularEdema"],
      ["Retinal Detachment", "retinalDetachment"],
      ["Retinal Tear", "retinalTear"],
      ["Retinal Hemorrhage", "retinalHemorrhage"],
      ["Retinal Vein Occlusion", "retinalVeinOcclusion"],
      ["Retinal Artery Occlusion", "retinalArteryOcclusion"],
      ["Epiretinal Membrane", "epiretinalMembrane"],
      ["Macular Hole", "macularHole"],
      ["Central Serous Chorioretinopathy", "centralSerousChorioretinopathy"],
    ],
  },

  // =========================================================
  // 19. DIABETIC EYE ASSESSMENT
  // =========================================================
  {
    title: "19. Diabetic Eye Assessment",
    fields: [
      {
        type: "select",
        label: "Diabetic Retinopathy Stage",
        name: "diabeticRetinopathyStage",
        options: [
          "No Retinopathy",
          "Mild NPDR",
          "Moderate NPDR",
          "Severe NPDR",
          "Proliferative DR",
        ],
      },
      {
        type: "select",
        label: "Macular Edema",
        name: "diabeticMacularEdema",
        options: [
          "Absent",
          "Present",
          "Clinically Significant",
        ],
      },
      {
        type: "input",
        label: "HbA1c",
        name: "hba1c",
      },
      {
        type: "input",
        label: "Duration of Diabetes",
        name: "diabetesDuration",
      },
      {
        type: "textarea",
        label: "Diabetic Eye Findings",
        name: "diabeticEyeFindings",
      },
    ],
  },

  // =========================================================
  // 20. MACULA
  // =========================================================
  {
    title: "20. Macular Assessment",
    type: "checkbox",
    fields: [
      ["Normal Macula", "normalMacula"],
      ["Macular Edema", "macularEdemaAssessment"],
      ["Drusen", "drusen"],
      ["Macular Hole", "macularHoleAssessment"],
      ["Epiretinal Membrane", "erm"],
      ["Macular Scar", "macularScar"],
      ["Age-Related Macular Degeneration", "amd"],
      ["Wet AMD", "wetAmd"],
      ["Dry AMD", "dryAmd"],
      ["Macular Pigment Changes", "macularPigmentChanges"],
    ],
  },

  // =========================================================
  // 21. NEURO-OPHTHALMOLOGY
  // =========================================================
  {
    title: "21. Neuro-Ophthalmic Assessment",
    type: "checkbox",
    fields: [
      ["Optic Neuritis", "opticNeuritis"],
      ["Optic Atrophy", "opticAtrophy"],
      ["Papilledema", "papilledema"],
      ["Ischemic Optic Neuropathy", "ischemicOpticNeuropathy"],
      ["Optic Disc Edema", "opticDiscEdema"],
      ["Visual Field Defect", "visualFieldDefect"],
      ["RAPD", "rapd"],
      ["Diplopia", "neuroDiplopia"],
      ["Nystagmus", "nystagmus"],
      ["Cranial Nerve Palsy", "cranialNervePalsy"],
    ],
  },

  // =========================================================
  // 22. OCULAR MOTILITY
  // =========================================================
  {
    title: "22. Ocular Motility & Alignment",
    fields: [
      {
        type: "select",
        label: "Eye Alignment",
        name: "eyeAlignment",
        options: [
          "Normal",
          "Esotropia",
          "Exotropia",
          "Hypertropia",
          "Hypotropia",
          "Other",
        ],
      },
      {
        type: "textarea",
        label: "Extraocular Movements",
        name: "extraocularMovements",
      },
      {
        type: "textarea",
        label: "Diplopia Assessment",
        name: "diplopiaAssessment",
      },
      {
        type: "textarea",
        label: "Cover Test",
        name: "coverTest",
      },
      {
        type: "textarea",
        label: "Prism Test",
        name: "prismTest",
      },
    ],
  },

  // =========================================================
  // 23. DRY EYE
  // =========================================================
  {
    title: "23. Dry Eye Assessment",
    type: "checkbox",
    fields: [
      ["Dry Eye Disease", "dryEyeDisease"],
      ["Evaporative Dry Eye", "evaporativeDryEye"],
      ["Aqueous Deficient Dry Eye", "aqueousDeficientDryEye"],
      ["Meibomian Gland Dysfunction", "meibomianGlandDysfunction"],
      ["Blepharitis", "dryEyeBlepharitis"],
      ["Tear Film Instability", "tearFilmInstability"],
      ["Punctate Epithelial Erosion", "punctateEpithelialErosion"],
    ],
  },

  {
    title: "24. Dry Eye Tests",
    fields: [
      {
        type: "input",
        label: "TBUT OD",
        name: "tbutOd",
      },
      {
        type: "input",
        label: "TBUT OS",
        name: "tbutOs",
      },
      {
        type: "input",
        label: "Schirmer Test OD",
        name: "schirmerOd",
      },
      {
        type: "input",
        label: "Schirmer Test OS",
        name: "schirmerOs",
      },
      {
        type: "textarea",
        label: "Meibomian Gland Findings",
        name: "meibomianGlandFindings",
      },
      {
        type: "textarea",
        label: "Dry Eye Severity",
        name: "dryEyeSeverity",
      },
    ],
  },

  // =========================================================
  // 25. CATARACT
  // =========================================================
  {
    title: "25. Cataract Assessment",
    type: "checkbox",
    fields: [
      ["Age-Related Cataract", "ageRelatedCataract"],
      ["Congenital Cataract", "cataractCongenital"],
      ["Traumatic Cataract", "traumaticCataract"],
      ["Diabetic Cataract", "diabeticCataract"],
      ["Posterior Subcapsular Cataract", "pscCataract"],
      ["Nuclear Cataract", "nuclearCataract"],
      ["Cortical Cataract", "corticalCataractAssessment"],
      ["Mature Cataract", "matureCataract"],
      ["Hypermature Cataract", "hypermatureCataract"],
    ],
  },

  {
    title: "26. Cataract Details",
    fields: [
      {
        type: "select",
        label: "OD Cataract Grade",
        name: "odCataractGrade",
        options: ["None", "1+", "2+", "3+", "4+"],
      },
      {
        type: "select",
        label: "OS Cataract Grade",
        name: "osCataractGrade",
        options: ["None", "1+", "2+", "3+", "4+"],
      },
      {
        type: "textarea",
        label: "Cataract Symptoms",
        name: "cataractSymptoms",
      },
      {
        type: "textarea",
        label: "Surgical Recommendation",
        name: "cataractSurgicalRecommendation",
      },
    ],
  },

  // =========================================================
  // 27. PEDIATRIC OPHTHALMOLOGY
  // =========================================================
  {
    title: "27. Pediatric Ophthalmology",
    type: "checkbox",
    fields: [
      ["Amblyopia", "amblyopia"],
      ["Strabismus", "strabismus"],
      ["Congenital Cataract", "pediatricCongenitalCataract"],
      ["Congenital Glaucoma", "congenitalGlaucoma"],
      ["Retinopathy of Prematurity", "rop"],
      ["Blocked Tear Duct", "blockedTearDuct"],
      ["Refractive Error", "pediatricRefractiveError"],
      ["Developmental Vision Problem", "developmentalVisionProblem"],
    ],
  },

  {
    title: "28. Pediatric Details",
    fields: [
      {
        type: "input",
        label: "Birth History",
        name: "birthHistory",
      },
      {
        type: "input",
        label: "Gestational Age",
        name: "gestationalAge",
      },
      {
        type: "textarea",
        label: "Developmental History",
        name: "developmentalHistory",
      },
      {
        type: "textarea",
        label: "Pediatric Eye Examination",
        name: "pediatricEyeExamination",
      },
      {
        type: "textarea",
        label: "Amblyopia Assessment",
        name: "amblyopiaAssessment",
      },
    ],
  },

  // =========================================================
  // 29. EYE TRAUMA
  // =========================================================
  {
    title: "29. Ocular Trauma",
    type: "checkbox",
    fields: [
      ["Blunt Trauma", "bluntEyeTrauma"],
      ["Penetrating Injury", "penetratingEyeInjury"],
      ["Chemical Injury", "chemicalEyeInjury"],
      ["Thermal Injury", "thermalEyeInjury"],
      ["Foreign Body", "ocularForeignBody"],
      ["Corneal Abrasion", "traumaticCornealAbrasion"],
      ["Hyphema", "hyphema"],
      ["Orbital Fracture", "orbitalFracture"],
      ["Globe Rupture", "globeRupture"],
    ],
  },

  {
    title: "30. Trauma Details",
    fields: [
      {
        type: "textarea",
        label: "Mechanism of Injury",
        name: "mechanismOfInjury",
      },
      {
        type: "input",
        label: "Date & Time of Injury",
        name: "injuryDateTime",
      },
      {
        type: "textarea",
        label: "Foreign Body Details",
        name: "foreignBodyDetails",
      },
      {
        type: "textarea",
        label: "Trauma Examination",
        name: "traumaExamination",
      },
      {
        type: "textarea",
        label: "Immediate Management",
        name: "immediateManagement",
      },
    ],
  },

  // =========================================================
  // 31. SURGERY HISTORY
  // =========================================================
  {
    title: "31. Previous Ophthalmic Surgery",
    type: "checkbox",
    fields: [
      ["Cataract Surgery", "previousCataractSurgery"],
      ["LASIK", "lasik"],
      ["PRK", "prk"],
      ["Glaucoma Surgery", "previousGlaucomaSurgery"],
      ["Retinal Surgery", "previousRetinalSurgery"],
      ["Corneal Surgery", "previousCornealSurgery"],
      ["Strabismus Surgery", "previousStrabismusSurgery"],
      ["Vitrectomy", "previousVitrectomy"],
      ["Other Eye Surgery", "otherEyeSurgery"],
    ],
  },

  {
    title: "32. Surgical History Details",
    fields: [
      {
        type: "textarea",
        label: "Previous Eye Surgery Details",
        name: "previousEyeSurgeryDetails",
      },
      {
        type: "input",
        label: "Surgery Date",
        name: "previousSurgeryDate",
        inputType: "date",
      },
      {
        type: "textarea",
        label: "Complications",
        name: "previousSurgeryComplications",
      },
      {
        type: "textarea",
        label: "Current Surgical Status",
        name: "currentSurgicalStatus",
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
      ["Kidney Disease", "kidneyDisease"],
      ["Cardiac Disease", "cardiacDisease"],
      ["Autoimmune Disease", "autoimmuneDisease"],
      ["Neurological Disease", "neurologicalDisease"],
      ["Stroke", "strokeHistory"],
      ["Tuberculosis", "tuberculosis"],
      ["Cancer", "cancerHistory"],
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
        label: "Glaucoma Family History",
        name: "glaucomaFamilyHistory",
      },
      {
        type: "textarea",
        label: "Cataract Family History",
        name: "cataractFamilyHistory",
      },
      {
        type: "textarea",
        label: "Retinal Disease Family History",
        name: "retinalDiseaseFamilyHistory",
      },
      {
        type: "textarea",
        label: "Macular Disease Family History",
        name: "macularDiseaseFamilyHistory",
      },
      {
        type: "textarea",
        label: "Other Eye Disease Family History",
        name: "otherEyeDiseaseFamilyHistory",
      },
    ],
  },

  // =========================================================
  // 35. MEDICATIONS
  // =========================================================
  {
    title: "35. Medication History",
    fields: [
      {
        type: "textarea",
        label: "Current Medications",
        name: "currentMedications",
      },
      {
        type: "textarea",
        label: "Current Eye Drops",
        name: "currentEyeDrops",
      },
      {
        type: "textarea",
        label: "Glaucoma Medications",
        name: "glaucomaMedications",
      },
      {
        type: "textarea",
        label: "Steroid Eye Drops",
        name: "steroidEyeDrops",
      },
      {
        type: "textarea",
        label: "Previous Eye Medications",
        name: "previousEyeMedications",
      },
      {
        type: "textarea",
        label: "Drug Allergies",
        name: "drugAllergies",
      },
    ],
  },

  // =========================================================
  // 36. INVESTIGATIONS
  // =========================================================
  {
    title: "36. Ophthalmic Investigations",
    type: "checkbox",
    fields: [
      ["OCT", "oct"],
      ["OCT Angiography", "octAngiography"],
      ["Visual Field Test", "visualFieldTest"],
      ["Fundus Photography", "fundusPhotography"],
      ["Fluorescein Angiography", "fluoresceinAngiography"],
      ["B-Scan Ultrasound", "bScan"],
      ["A-Scan", "aScan"],
      ["Corneal Topography", "cornealTopographyTest"],
      ["Pachymetry", "pachymetry"],
      ["Gonioscopy", "gonioscopy"],
      ["Specular Microscopy", "specularMicroscopy"],
      ["Schirmer Test", "schirmerTest"],
      ["Color Vision Test", "colorVisionTest"],
      ["Contrast Sensitivity", "contrastSensitivity"],
    ],
  },

  {
    title: "37. Investigation Results",
    fields: [
      {
        type: "textarea",
        label: "OCT Findings",
        name: "octFindings",
      },
      {
        type: "textarea",
        label: "Visual Field Findings",
        name: "visualFieldResults",
      },
      {
        type: "textarea",
        label: "Fundus Photography Findings",
        name: "fundusPhotographyResults",
      },
      {
        type: "textarea",
        label: "OCT Angiography Findings",
        name: "octAngiographyResults",
      },
      {
        type: "textarea",
        label: "Fluorescein Angiography Findings",
        name: "fluoresceinAngiographyResults",
      },
      {
        type: "textarea",
        label: "Ultrasound Findings",
        name: "ultrasoundFindings",
      },
      {
        type: "textarea",
        label: "Other Investigation Results",
        name: "otherInvestigationResults",
      },
    ],
  },

  // =========================================================
  // 38. VISION / FUNCTIONAL TESTS
  // =========================================================
  {
    title: "38. Functional Vision Assessment",
    fields: [
      {
        type: "input",
        label: "Color Vision OD",
        name: "colorVisionOd",
      },
      {
        type: "input",
        label: "Color Vision OS",
        name: "colorVisionOs",
      },
      {
        type: "input",
        label: "Contrast Sensitivity OD",
        name: "contrastSensitivityOd",
      },
      {
        type: "input",
        label: "Contrast Sensitivity OS",
        name: "contrastSensitivityOs",
      },
      {
        type: "textarea",
        label: "Visual Field Description",
        name: "visualFieldDescription",
      },
      {
        type: "textarea",
        label: "Functional Vision Limitation",
        name: "functionalVisionLimitation",
      },
    ],
  },

  // =========================================================
  // 39. DIAGNOSIS
  // =========================================================
  {
    title: "39. Assessment & Diagnosis",
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
        label: "Ophthalmic Impression",
        name: "ophthalmicImpression",
      },
    ],
  },

  // =========================================================
  // 40. TREATMENT PLAN
  // =========================================================
  {
    title: "40. Treatment Plan",
    fields: [
      {
        type: "textarea",
        label: "Eye Drop Treatment",
        name: "eyeDropTreatment",
      },
      {
        type: "textarea",
        label: "Oral Medication",
        name: "oralMedication",
      },
      {
        type: "textarea",
        label: "Spectacle Prescription",
        name: "spectaclePrescription",
      },
      {
        type: "textarea",
        label: "Contact Lens Recommendation",
        name: "contactLensRecommendation",
      },
      {
        type: "textarea",
        label: "Surgical Recommendation",
        name: "surgicalRecommendation",
      },
      {
        type: "textarea",
        label: "Laser Treatment Recommendation",
        name: "laserTreatmentRecommendation",
      },
      {
        type: "textarea",
        label: "Eye Care Instructions",
        name: "eyeCareInstructions",
      },
      {
        type: "textarea",
        label: "Lifestyle Advice",
        name: "lifestyleAdvice",
      },
    ],
  },

  // =========================================================
  // 41. FOLLOW-UP
  // =========================================================
  {
    title: "41. Follow-up",
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
          "Vision Review",
          "Glaucoma Review",
          "Cataract Review",
          "Retina Review",
          "Postoperative Review",
          "Diabetic Eye Review",
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