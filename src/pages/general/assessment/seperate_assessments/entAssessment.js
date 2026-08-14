export const entAssessmentSections = [
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
          "Routine ENT Examination",
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
      ["Ear Pain", "earPain"],
      ["Hearing Loss", "hearingLoss"],
      ["Ear Discharge", "earDischarge"],
      ["Ear Fullness", "earFullness"],
      ["Tinnitus", "tinnitus"],
      ["Dizziness", "dizziness"],
      ["Vertigo", "vertigo"],
      ["Nasal Blockage", "nasalBlockage"],
      ["Runny Nose", "runnyNose"],
      ["Sneezing", "sneezing"],
      ["Nasal Bleeding", "nasalBleeding"],
      ["Loss of Smell", "lossOfSmell"],
      ["Facial Pain", "facialPain"],
      ["Facial Pressure", "facialPressure"],
      ["Sore Throat", "soreThroat"],
      ["Difficulty Swallowing", "difficultySwallowing"],
      ["Painful Swallowing", "painfulSwallowing"],
      ["Hoarseness", "hoarseness"],
      ["Voice Change", "voiceChange"],
      ["Cough", "cough"],
      ["Snoring", "snoring"],
      ["Sleep Apnea Symptoms", "sleepApneaSymptoms"],
      ["Neck Swelling", "neckSwelling"],
      ["Foreign Body Sensation", "foreignBodySensation"],
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
        label: "Previous ENT Treatment",
        name: "previousEntTreatment",
      },
      {
        type: "textarea",
        label: "Previous ENT Surgery",
        name: "previousEntSurgery",
      },
      {
        type: "textarea",
        label: "History of Trauma",
        name: "traumaHistory",
      },
    ],
  },

  // =========================================================
  // 4. EAR HISTORY
  // =========================================================
  {
    title: "4. Ear History",
    type: "checkbox",
    fields: [
      ["Recurrent Ear Infections", "recurrentEarInfections"],
      ["Otitis Media", "otitisMedia"],
      ["Otitis Externa", "otitisExterna"],
      ["Ear Discharge", "earDischargeHistory"],
      ["Ear Trauma", "earTrauma"],
      ["Previous Ear Surgery", "previousEarSurgery"],
      ["Hearing Aid Use", "hearingAidUse"],
      ["Ear Wax Impaction", "earWaxImpaction"],
      ["Noise Exposure", "noiseExposure"],
      ["Barotrauma", "barotrauma"],
      ["Water Exposure", "waterExposure"],
    ],
  },

  // =========================================================
  // 5. EAR EXAMINATION
  // =========================================================
  {
    title: "5. Ear Examination",
    fields: [
      {
        type: "textarea",
        label: "Right Ear - External Canal",
        name: "rightEarCanal",
      },
      {
        type: "textarea",
        label: "Left Ear - External Canal",
        name: "leftEarCanal",
      },
      {
        type: "textarea",
        label: "Right Ear - Tympanic Membrane",
        name: "rightTympanicMembrane",
      },
      {
        type: "textarea",
        label: "Left Ear - Tympanic Membrane",
        name: "leftTympanicMembrane",
      },
      {
        type: "textarea",
        label: "Right Ear - Middle Ear",
        name: "rightMiddleEar",
      },
      {
        type: "textarea",
        label: "Left Ear - Middle Ear",
        name: "leftMiddleEar",
      },
      {
        type: "textarea",
        label: "Ear Examination Notes",
        name: "earExaminationNotes",
      },
    ],
  },

  // =========================================================
  // 6. HEARING ASSESSMENT
  // =========================================================
  {
    title: "6. Hearing Assessment",
    fields: [
      {
        type: "select",
        label: "Right Ear Hearing",
        name: "rightEarHearing",
        options: [
          "Normal",
          "Mild Loss",
          "Moderate Loss",
          "Severe Loss",
          "Profound Loss",
        ],
      },
      {
        type: "select",
        label: "Left Ear Hearing",
        name: "leftEarHearing",
        options: [
          "Normal",
          "Mild Loss",
          "Moderate Loss",
          "Severe Loss",
          "Profound Loss",
        ],
      },
      {
        type: "input",
        label: "Rinne Test - Right",
        name: "rinneRight",
      },
      {
        type: "input",
        label: "Rinne Test - Left",
        name: "rinneLeft",
      },
      {
        type: "input",
        label: "Weber Test",
        name: "weberTest",
      },
      {
        type: "textarea",
        label: "Hearing Assessment Notes",
        name: "hearingAssessmentNotes",
      },
    ],
  },

  // =========================================================
  // 7. AUDIOMETRY
  // =========================================================
  {
    title: "7. Audiometry",
    fields: [
      {
        type: "input",
        label: "Right Ear PTA",
        name: "rightEarPta",
      },
      {
        type: "input",
        label: "Left Ear PTA",
        name: "leftEarPta",
      },
      {
        type: "input",
        label: "Right Ear Speech Reception Threshold",
        name: "rightEarSrt",
      },
      {
        type: "input",
        label: "Left Ear Speech Reception Threshold",
        name: "leftEarSrt",
      },
      {
        type: "input",
        label: "Right Ear Speech Discrimination",
        name: "rightEarSpeechDiscrimination",
      },
      {
        type: "input",
        label: "Left Ear Speech Discrimination",
        name: "leftEarSpeechDiscrimination",
      },
      {
        type: "textarea",
        label: "Audiogram Findings",
        name: "audiogramFindings",
      },
    ],
  },

  // =========================================================
  // 8. TINNITUS
  // =========================================================
  {
    title: "8. Tinnitus Assessment",
    fields: [
      {
        type: "select",
        label: "Tinnitus Side",
        name: "tinnitusSide",
        options: ["Right", "Left", "Both", "Central"],
      },
      {
        type: "input",
        label: "Tinnitus Duration",
        name: "tinnitusDuration",
      },
      {
        type: "select",
        label: "Tinnitus Character",
        name: "tinnitusCharacter",
        options: [
          "Ringing",
          "Buzzing",
          "Hissing",
          "Pulsatile",
          "Clicking",
          "Other",
        ],
      },
      {
        type: "select",
        label: "Tinnitus Severity",
        name: "tinnitusSeverity",
        options: ["Mild", "Moderate", "Severe"],
      },
      {
        type: "textarea",
        label: "Tinnitus Notes",
        name: "tinnitusNotes",
      },
    ],
  },

  // =========================================================
  // 9. VESTIBULAR / VERTIGO
  // =========================================================
  {
    title: "9. Vestibular & Vertigo Assessment",
    type: "checkbox",
    fields: [
      ["Benign Paroxysmal Positional Vertigo", "bppv"],
      ["Meniere's Disease", "menieresDisease"],
      ["Vestibular Neuritis", "vestibularNeuritis"],
      ["Labyrinthitis", "labyrinthitis"],
      ["Motion Sensitivity", "motionSensitivity"],
      ["Balance Disorder", "balanceDisorder"],
      ["Gait Instability", "gaitInstability"],
      ["Positional Vertigo", "positionalVertigo"],
      ["Nausea with Vertigo", "nauseaWithVertigo"],
      ["Vomiting with Vertigo", "vomitingWithVertigo"],
    ],
  },

  {
    title: "10. Vestibular Examination",
    fields: [
      {
        type: "textarea",
        label: "Dix-Hallpike Test",
        name: "dixHallpikeTest",
      },
      {
        type: "textarea",
        label: "Head Impulse Test",
        name: "headImpulseTest",
      },
      {
        type: "textarea",
        label: "Nystagmus Findings",
        name: "nystagmusFindings",
      },
      {
        type: "textarea",
        label: "Balance Examination",
        name: "balanceExamination",
      },
      {
        type: "textarea",
        label: "Vestibular Findings",
        name: "vestibularFindings",
      },
    ],
  },

  // =========================================================
  // 11. NOSE & SINUS HISTORY
  // =========================================================
  {
    title: "11. Nose & Sinus History",
    type: "checkbox",
    fields: [
      ["Allergic Rhinitis", "allergicRhinitis"],
      ["Chronic Rhinitis", "chronicRhinitis"],
      ["Acute Sinusitis", "acuteSinusitis"],
      ["Chronic Sinusitis", "chronicSinusitis"],
      ["Nasal Polyps", "nasalPolyps"],
      ["Deviated Nasal Septum", "deviatedNasalSeptum"],
      ["Recurrent Epistaxis", "recurrentEpistaxis"],
      ["Postnasal Drip", "postnasalDrip"],
      ["Loss of Smell", "anosmia"],
      ["Reduced Smell", "hyposmia"],
      ["Facial Pain", "sinusFacialPain"],
      ["Facial Pressure", "sinusFacialPressure"],
    ],
  },

  // =========================================================
  // 12. NOSE EXAMINATION
  // =========================================================
  {
    title: "12. Nasal Examination",
    fields: [
      {
        type: "textarea",
        label: "Right Nasal Cavity",
        name: "rightNasalCavity",
      },
      {
        type: "textarea",
        label: "Left Nasal Cavity",
        name: "leftNasalCavity",
      },
      {
        type: "textarea",
        label: "Nasal Septum",
        name: "nasalSeptum",
      },
      {
        type: "textarea",
        label: "Nasal Turbinates",
        name: "nasalTurbinates",
      },
      {
        type: "textarea",
        label: "Nasal Discharge",
        name: "nasalDischarge",
      },
      {
        type: "textarea",
        label: "Nasal Polyps",
        name: "nasalPolypsFindings",
      },
      {
        type: "textarea",
        label: "Nasal Examination Notes",
        name: "nasalExaminationNotes",
      },
    ],
  },

  // =========================================================
  // 13. SINUS ASSESSMENT
  // =========================================================
  {
    title: "13. Sinus Assessment",
    fields: [
      {
        type: "select",
        label: "Sinus Tenderness",
        name: "sinusTenderness",
        options: ["Absent", "Right", "Left", "Bilateral"],
      },
      {
        type: "textarea",
        label: "Frontal Sinus Findings",
        name: "frontalSinusFindings",
      },
      {
        type: "textarea",
        label: "Maxillary Sinus Findings",
        name: "maxillarySinusFindings",
      },
      {
        type: "textarea",
        label: "Ethmoid Sinus Findings",
        name: "ethmoidSinusFindings",
      },
      {
        type: "textarea",
        label: "Sphenoid Sinus Findings",
        name: "sphenoidSinusFindings",
      },
      {
        type: "textarea",
        label: "Sinus Imaging Findings",
        name: "sinusImagingFindings",
      },
    ],
  },

  // =========================================================
  // 14. THROAT HISTORY
  // =========================================================
  {
    title: "14. Throat History",
    type: "checkbox",
    fields: [
      ["Recurrent Tonsillitis", "recurrentTonsillitis"],
      ["Tonsillitis", "tonsillitis"],
      ["Pharyngitis", "pharyngitis"],
      ["Laryngitis", "laryngitis"],
      ["Sore Throat", "throatSoreThroat"],
      ["Difficulty Swallowing", "dysphagia"],
      ["Painful Swallowing", "odynophagia"],
      ["Foreign Body Sensation", "throatForeignBody"],
      ["Chronic Cough", "chronicCough"],
      ["Globus Sensation", "globusSensation"],
      ["Acid Reflux Symptoms", "acidRefluxSymptoms"],
    ],
  },

  // =========================================================
  // 15. ORAL CAVITY & THROAT EXAMINATION
  // =========================================================
  {
    title: "15. Oral Cavity & Throat Examination",
    fields: [
      {
        type: "textarea",
        label: "Oral Cavity",
        name: "oralCavity",
      },
      {
        type: "textarea",
        label: "Tongue",
        name: "tongueExamination",
      },
      {
        type: "textarea",
        label: "Hard Palate",
        name: "hardPalate",
      },
      {
        type: "textarea",
        label: "Soft Palate",
        name: "softPalate",
      },
      {
        type: "textarea",
        label: "Tonsils",
        name: "tonsils",
      },
      {
        type: "textarea",
        label: "Posterior Pharyngeal Wall",
        name: "posteriorPharyngealWall",
      },
      {
        type: "textarea",
        label: "Uvula",
        name: "uvula",
      },
      {
        type: "textarea",
        label: "Oral Cavity & Throat Notes",
        name: "oralThroatNotes",
      },
    ],
  },

  // =========================================================
  // 16. TONSIL ASSESSMENT
  // =========================================================
  {
    title: "16. Tonsil Assessment",
    fields: [
      {
        type: "select",
        label: "Right Tonsil Grade",
        name: "rightTonsilGrade",
        options: ["0", "1+", "2+", "3+", "4+"],
      },
      {
        type: "select",
        label: "Left Tonsil Grade",
        name: "leftTonsilGrade",
        options: ["0", "1+", "2+", "3+", "4+"],
      },
      {
        type: "checkbox",
        fields: [
          ["Tonsillar Exudate", "tonsillarExudate"],
          ["Tonsillar Crypts", "tonsillarCrypts"],
          ["Tonsillar Stones", "tonsillarStones"],
          ["Peritonsillar Abscess", "peritonsillarAbscess"],
          ["Recurrent Tonsillitis", "tonsilRecurrentInfection"],
        ],
      },
      {
        type: "textarea",
        label: "Tonsil Findings",
        name: "tonsilFindings",
      },
    ],
  },

  // =========================================================
  // 17. VOICE & LARYNX
  // =========================================================
  {
    title: "17. Voice & Laryngeal Assessment",
    fields: [
      {
        type: "select",
        label: "Voice Quality",
        name: "voiceQuality",
        options: [
          "Normal",
          "Hoarse",
          "Breathy",
          "Strained",
          "Weak",
          "Rough",
          "Other",
        ],
      },
      {
        type: "input",
        label: "Duration of Voice Change",
        name: "voiceChangeDuration",
      },
      {
        type: "textarea",
        label: "Laryngeal Examination",
        name: "laryngealExamination",
      },
      {
        type: "textarea",
        label: "Vocal Cord Findings",
        name: "vocalCordFindings",
      },
      {
        type: "textarea",
        label: "Vocal Cord Mobility",
        name: "vocalCordMobility",
      },
      {
        type: "textarea",
        label: "Laryngoscopy Findings",
        name: "laryngoscopyFindings",
      },
    ],
  },

  // =========================================================
  // 18. SWALLOWING ASSESSMENT
  // =========================================================
  {
    title: "18. Swallowing Assessment",
    type: "checkbox",
    fields: [
      ["Difficulty Swallowing Solids", "difficultySwallowingSolids"],
      ["Difficulty Swallowing Liquids", "difficultySwallowingLiquids"],
      ["Difficulty Swallowing Both", "difficultySwallowingBoth"],
      ["Painful Swallowing", "painfulSwallowingAssessment"],
      ["Choking During Eating", "chokingDuringEating"],
      ["Cough During Swallowing", "coughDuringSwallowing"],
      ["Regurgitation", "regurgitation"],
      ["Food Sticking Sensation", "foodStickingSensation"],
      ["Aspiration Symptoms", "aspirationSymptoms"],
    ],
  },

  {
    title: "19. Swallowing Details",
    fields: [
      {
        type: "textarea",
        label: "Swallowing Assessment",
        name: "swallowingAssessment",
      },
      {
        type: "textarea",
        label: "Speech & Swallow Evaluation",
        name: "speechSwallowEvaluation",
      },
      {
        type: "textarea",
        label: "Aspiration Risk",
        name: "aspirationRisk",
      },
      {
        type: "textarea",
        label: "Swallow Study Findings",
        name: "swallowStudyFindings",
      },
    ],
  },

  // =========================================================
  // 20. NECK EXAMINATION
  // =========================================================
  {
    title: "20. Neck Examination",
    fields: [
      {
        type: "textarea",
        label: "Neck Inspection",
        name: "neckInspection",
      },
      {
        type: "textarea",
        label: "Neck Palpation",
        name: "neckPalpation",
      },
      {
        type: "textarea",
        label: "Cervical Lymph Nodes",
        name: "cervicalLymphNodes",
      },
      {
        type: "textarea",
        label: "Thyroid Examination",
        name: "thyroidExamination",
      },
      {
        type: "textarea",
        label: "Neck Mass",
        name: "neckMass",
      },
      {
        type: "textarea",
        label: "Salivary Glands",
        name: "salivaryGlands",
      },
      {
        type: "textarea",
        label: "Neck Examination Notes",
        name: "neckExaminationNotes",
      },
    ],
  },

  // =========================================================
  // 21. SLEEP & SNORING
  // =========================================================
  {
    title: "21. Sleep & Snoring Assessment",
    type: "checkbox",
    fields: [
      ["Snoring", "sleepSnoring"],
      ["Witnessed Apnea", "witnessedApnea"],
      ["Daytime Sleepiness", "daytimeSleepiness"],
      ["Morning Headache", "morningHeadache"],
      ["Mouth Breathing", "mouthBreathing"],
      ["Nighttime Choking", "nighttimeChoking"],
      ["Poor Sleep Quality", "poorSleepQuality"],
      ["Insomnia", "insomnia"],
      ["Obstructive Sleep Apnea", "obstructiveSleepApnea"],
    ],
  },

  {
    title: "22. Sleep Assessment Details",
    fields: [
      {
        type: "input",
        label: "Sleep Duration",
        name: "sleepDuration",
      },
      {
        type: "input",
        label: "Snoring Duration",
        name: "snoringDuration",
      },
      {
        type: "input",
        label: "Approximate Sleep Hours",
        name: "sleepHours",
      },
      {
        type: "textarea",
        label: "Sleep Study / Polysomnography Findings",
        name: "polysomnographyFindings",
      },
      {
        type: "textarea",
        label: "Sleep Apnea Assessment",
        name: "sleepApneaAssessment",
      },
    ],
  },

  // =========================================================
  // 23. ALLERGY HISTORY
  // =========================================================
  {
    title: "23. Allergy History",
    type: "checkbox",
    fields: [
      ["Seasonal Allergy", "seasonalAllergy"],
      ["Dust Allergy", "dustAllergy"],
      ["Pollen Allergy", "pollenAllergy"],
      ["Food Allergy", "foodAllergy"],
      ["Drug Allergy", "drugAllergy"],
      ["Pet Allergy", "petAllergy"],
      ["Allergic Rhinitis", "allergicRhinitisHistory"],
      ["Asthma", "asthmaHistory"],
    ],
  },

  {
    title: "24. Allergy Details",
    fields: [
      {
        type: "textarea",
        label: "Known Allergens",
        name: "knownAllergens",
      },
      {
        type: "textarea",
        label: "Allergic Symptoms",
        name: "allergicSymptoms",
      },
      {
        type: "textarea",
        label: "Previous Allergy Treatment",
        name: "previousAllergyTreatment",
      },
      {
        type: "textarea",
        label: "Allergy Test Results",
        name: "allergyTestResults",
      },
    ],
  },

  // =========================================================
  // 25. PEDIATRIC ENT
  // =========================================================
  {
    title: "25. Pediatric ENT Assessment",
    type: "checkbox",
    fields: [
      ["Recurrent Ear Infections", "pediatricRecurrentEarInfections"],
      ["Adenoid Hypertrophy", "adenoidHypertrophy"],
      ["Tonsil Hypertrophy", "tonsilHypertrophy"],
      ["Mouth Breathing", "pediatricMouthBreathing"],
      ["Speech Delay", "speechDelay"],
      ["Hearing Difficulty", "pediatricHearingDifficulty"],
      ["Chronic Nasal Blockage", "pediatricNasalBlockage"],
      ["Sleep Apnea", "pediatricSleepApnea"],
      ["Recurrent Tonsillitis", "pediatricRecurrentTonsillitis"],
      ["Foreign Body", "pediatricForeignBody"],
    ],
  },

  {
    title: "26. Pediatric ENT Details",
    fields: [
      {
        type: "textarea",
        label: "Birth History",
        name: "birthHistory",
      },
      {
        type: "textarea",
        label: "Developmental History",
        name: "developmentalHistory",
      },
      {
        type: "textarea",
        label: "Speech & Language Development",
        name: "speechLanguageDevelopment",
      },
      {
        type: "textarea",
        label: "Pediatric ENT Examination",
        name: "pediatricEntExamination",
      },
    ],
  },

  // =========================================================
  // 27. PREVIOUS SURGERIES
  // =========================================================
  {
    title: "27. Previous ENT Surgeries",
    type: "checkbox",
    fields: [
      ["Tonsillectomy", "tonsillectomy"],
      ["Adenoidectomy", "adenoidectomy"],
      ["Tonsillectomy & Adenoidectomy", "tonsilAdenoidectomy"],
      ["Septoplasty", "septoplasty"],
      ["FESS", "fess"],
      ["Tympanoplasty", "tympanoplasty"],
      ["Mastoidectomy", "mastoidectomy"],
      ["Myringotomy", "myringotomy"],
      ["Grommet / Ventilation Tube", "grommetInsertion"],
      ["Thyroid Surgery", "thyroidSurgery"],
      ["Laryngeal Surgery", "laryngealSurgery"],
      ["Other ENT Surgery", "otherEntSurgery"],
    ],
  },

  {
    title: "28. Surgical History Details",
    fields: [
      {
        type: "textarea",
        label: "Previous ENT Surgery Details",
        name: "previousEntSurgeryDetails",
      },
      {
        type: "input",
        label: "Surgery Date",
        name: "previousEntSurgeryDate",
        inputType: "date",
      },
      {
        type: "textarea",
        label: "Surgical Complications",
        name: "surgicalComplications",
      },
    ],
  },

  // =========================================================
  // 29. MEDICAL HISTORY
  // =========================================================
  {
    title: "29. Past Medical History",
    type: "checkbox",
    fields: [
      ["Diabetes Mellitus", "diabetes"],
      ["Hypertension", "hypertension"],
      ["Thyroid Disease", "thyroidDisease"],
      ["Asthma", "asthma"],
      ["Allergic Disease", "allergicDisease"],
      ["Neurological Disease", "neurologicalDisease"],
      ["Cardiac Disease", "cardiacDisease"],
      ["Kidney Disease", "kidneyDisease"],
      ["Autoimmune Disease", "autoimmuneDisease"],
      ["Cancer History", "cancerHistory"],
    ],
  },

  // =========================================================
  // 30. FAMILY HISTORY
  // =========================================================
  {
    title: "30. Family History",
    fields: [
      {
        type: "textarea",
        label: "Hearing Loss Family History",
        name: "hearingLossFamilyHistory",
      },
      {
        type: "textarea",
        label: "ENT Disease Family History",
        name: "entDiseaseFamilyHistory",
      },
      {
        type: "textarea",
        label: "Head & Neck Cancer Family History",
        name: "headNeckCancerFamilyHistory",
      },
      {
        type: "textarea",
        label: "Other Relevant Family History",
        name: "otherFamilyHistory",
      },
    ],
  },

  // =========================================================
  // 31. MEDICATIONS
  // =========================================================
  {
    title: "31. Medication History",
    fields: [
      {
        type: "textarea",
        label: "Current Medications",
        name: "currentMedications",
      },
      {
        type: "textarea",
        label: "Current ENT Medications",
        name: "currentEntMedications",
      },
      {
        type: "textarea",
        label: "Nasal Sprays",
        name: "nasalSprays",
      },
      {
        type: "textarea",
        label: "Ear Drops",
        name: "earDrops",
      },
      {
        type: "textarea",
        label: "Previous Antibiotics",
        name: "previousAntibiotics",
      },
      {
        type: "textarea",
        label: "Drug Allergies",
        name: "drugAllergies",
      },
    ],
  },

  // =========================================================
  // 32. INVESTIGATIONS
  // =========================================================
  {
    title: "32. ENT Investigations",
    type: "checkbox",
    fields: [
      ["Pure Tone Audiometry", "pureToneAudiometry"],
      ["Tympanometry", "tympanometry"],
      ["OAE", "oae"],
      ["BERA / ABR", "bera"],
      ["Speech Audiometry", "speechAudiometry"],
      ["CT Paranasal Sinuses", "ctPns"],
      ["CT Temporal Bone", "ctTemporalBone"],
      ["MRI Brain", "mriBrain"],
      ["MRI Internal Auditory Canal", "mriIac"],
      ["Nasal Endoscopy", "nasalEndoscopy"],
      ["Flexible Laryngoscopy", "flexibleLaryngoscopy"],
      ["Rigid Laryngoscopy", "rigidLaryngoscopy"],
      ["Sleep Study", "sleepStudy"],
      ["Allergy Testing", "allergyTesting"],
      ["FNAC", "fnac"],
    ],
  },

  // =========================================================
  // 33. INVESTIGATION RESULTS
  // =========================================================
  {
    title: "33. Investigation Results",
    fields: [
      {
        type: "textarea",
        label: "Audiometry Results",
        name: "audiometryResults",
      },
      {
        type: "textarea",
        label: "Tympanometry Results",
        name: "tympanometryResults",
      },
      {
        type: "textarea",
        label: "OAE / BERA Results",
        name: "oaeBeraResults",
      },
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
        label: "Endoscopy Findings",
        name: "endoscopyFindings",
      },
      {
        type: "textarea",
        label: "Laryngoscopy Findings",
        name: "laryngoscopyResults",
      },
      {
        type: "textarea",
        label: "Other Investigation Results",
        name: "otherInvestigationResults",
      },
    ],
  },

  // =========================================================
  // 34. HEAD & NECK
  // =========================================================
  {
    title: "34. Head & Neck Assessment",
    type: "checkbox",
    fields: [
      ["Neck Mass", "headNeckMass"],
      ["Lymphadenopathy", "lymphadenopathy"],
      ["Thyroid Nodule", "thyroidNodule"],
      ["Thyroid Enlargement", "thyroidEnlargement"],
      ["Salivary Gland Swelling", "salivaryGlandSwelling"],
      ["Parotid Swelling", "parotidSwelling"],
      ["Submandibular Swelling", "submandibularSwelling"],
      ["Oral Lesion", "oralLesion"],
      ["Tongue Lesion", "tongueLesion"],
      ["Neck Pain", "neckPain"],
    ],
  },

  // =========================================================
  // 35. DIAGNOSIS
  // =========================================================
  {
    title: "35. Assessment & Diagnosis",
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
        label: "ENT Impression",
        name: "entImpression",
      },
    ],
  },

  // =========================================================
  // 36. TREATMENT PLAN
  // =========================================================
  {
    title: "36. Treatment Plan",
    fields: [
      {
        type: "textarea",
        label: "Medications",
        name: "medications",
      },
      {
        type: "textarea",
        label: "Ear Treatment",
        name: "earTreatment",
      },
      {
        type: "textarea",
        label: "Nasal Treatment",
        name: "nasalTreatment",
      },
      {
        type: "textarea",
        label: "Throat Treatment",
        name: "throatTreatment",
      },
      {
        type: "textarea",
        label: "Voice Therapy",
        name: "voiceTherapy",
      },
      {
        type: "textarea",
        label: "Hearing Aid Recommendation",
        name: "hearingAidRecommendation",
      },
      {
        type: "textarea",
        label: "Surgical Recommendation",
        name: "surgicalRecommendation",
      },
      {
        type: "textarea",
        label: "Lifestyle Advice",
        name: "lifestyleAdvice",
      },
    ],
  },

  // =========================================================
  // 37. FOLLOW-UP
  // =========================================================
  {
    title: "37. Follow-up",
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
          "Hearing Review",
          "Vertigo Review",
          "Sinus Review",
          "Postoperative Review",
          "Voice Review",
          "Sleep Apnea Review",
          "Medication Review",
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