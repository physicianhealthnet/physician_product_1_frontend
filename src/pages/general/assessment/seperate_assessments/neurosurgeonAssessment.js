export const neurosurgeonSections = [
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
      ["Headache", "headache"],
      ["Dizziness", "dizziness"],
      ["Seizures", "seizures"],
      ["Loss of Consciousness", "lossOfConsciousness"],
      ["Weakness", "weakness"],
      ["Numbness", "numbness"],
      ["Tingling", "tingling"],
      ["Difficulty Walking", "difficultyWalking"],
      ["Balance Problems", "balanceProblems"],
      ["Speech Difficulty", "speechDifficulty"],
      ["Vision Problems", "visionProblems"],
      ["Hearing Problems", "hearingProblems"],
      ["Memory Problems", "memoryProblems"],
      ["Confusion", "confusion"],
      ["Back Pain", "backPain"],
      ["Neck Pain", "neckPain"],
      ["Limb Pain", "limbPain"],
      ["Urinary Problems", "urinaryProblems"],
      ["Bowel Problems", "bowelProblems"],
      ["Trauma", "trauma"],
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
        label: "Location of Symptoms",
        name: "symptomLocation",
      },
      {
        type: "textarea",
        label: "Character of Symptoms",
        name: "symptomCharacter",
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
  // 4. HEADACHE ASSESSMENT
  // =========================================================
  {
    title: "4. Headache Assessment",
    type: "checkbox",
    fields: [
      ["Frontal Headache", "frontalHeadache"],
      ["Occipital Headache", "occipitalHeadache"],
      ["Temporal Headache", "temporalHeadache"],
      ["Unilateral Headache", "unilateralHeadache"],
      ["Bilateral Headache", "bilateralHeadache"],
      ["Sudden Severe Headache", "suddenSevereHeadache"],
      ["Morning Headache", "morningHeadache"],
      ["Positional Headache", "positionalHeadache"],
      ["Headache with Vomiting", "headacheWithVomiting"],
      ["Headache with Visual Symptoms", "headacheVisualSymptoms"],
      ["Headache with Seizures", "headacheWithSeizures"],
      ["Headache with Neurological Deficit", "headacheNeurologicalDeficit"],
    ],
  },

  {
    title: "5. Headache Details",
    fields: [
      {
        type: "textarea",
        label: "Headache Description",
        name: "headacheDescription",
      },
      {
        type: "input",
        label: "Frequency",
        name: "headacheFrequency",
      },
      {
        type: "input",
        label: "Duration of Each Episode",
        name: "headacheEpisodeDuration",
      },
      {
        type: "input",
        label: "Severity (0–10)",
        name: "headacheSeverity",
        inputType: "number",
      },
      {
        type: "textarea",
        label: "Associated Nausea / Vomiting",
        name: "headacheNauseaVomiting",
      },
      {
        type: "textarea",
        label: "Visual Symptoms",
        name: "headacheVisualSymptomsDetails",
      },
      {
        type: "textarea",
        label: "Headache Red Flags",
        name: "headacheRedFlags",
      },
    ],
  },

  // =========================================================
  // 6. SEIZURE ASSESSMENT
  // =========================================================
  {
    title: "6. Seizure Assessment",
    type: "checkbox",
    fields: [
      ["Generalized Seizure", "generalizedSeizure"],
      ["Focal Seizure", "focalSeizure"],
      ["Focal to Bilateral Seizure", "focalToBilateralSeizure"],
      ["Absence Seizure", "absenceSeizure"],
      ["Tonic-Clonic Seizure", "tonicClonicSeizure"],
      ["Status Epilepticus", "statusEpilepticus"],
      ["Febrile Seizure", "febrileSeizure"],
      ["Post-Traumatic Seizure", "postTraumaticSeizure"],
      ["First Seizure", "firstSeizure"],
      ["Recurrent Seizure", "recurrentSeizure"],
    ],
  },

  {
    title: "7. Seizure Details",
    fields: [
      {
        type: "input",
        label: "Date of First Seizure",
        name: "firstSeizureDate",
        inputType: "date",
      },
      {
        type: "input",
        label: "Seizure Frequency",
        name: "seizureFrequency",
      },
      {
        type: "input",
        label: "Duration",
        name: "seizureDuration",
      },
      {
        type: "textarea",
        label: "Aura",
        name: "seizureAura",
      },
      {
        type: "textarea",
        label: "Seizure Description",
        name: "seizureDescription",
      },
      {
        type: "textarea",
        label: "Postictal State",
        name: "postictalState",
      },
      {
        type: "textarea",
        label: "Seizure Triggers",
        name: "seizureTriggers",
      },
      {
        type: "textarea",
        label: "Current Anti-Seizure Medication",
        name: "antiSeizureMedication",
      },
    ],
  },

  // =========================================================
  // 8. NEUROLOGICAL EXAMINATION
  // =========================================================
  {
    title: "8. General Neurological Examination",
    fields: [
      {
        type: "select",
        label: "Level of Consciousness",
        name: "levelOfConsciousness",
        options: [
          "Alert",
          "Drowsy",
          "Confused",
          "Obtunded",
          "Stuporous",
          "Comatose",
        ],
      },
      {
        type: "textarea",
        label: "Mental Status",
        name: "mentalStatus",
      },
      {
        type: "textarea",
        label: "Orientation",
        name: "orientation",
      },
      {
        type: "textarea",
        label: "Memory",
        name: "memory",
      },
      {
        type: "textarea",
        label: "Attention & Concentration",
        name: "attentionConcentration",
      },
      {
        type: "textarea",
        label: "Speech",
        name: "speech",
      },
      {
        type: "textarea",
        label: "Language",
        name: "language",
      },
    ],
  },

  // =========================================================
  // 9. GCS
  // =========================================================
  {
    title: "9. Glasgow Coma Scale",
    fields: [
      {
        type: "select",
        label: "Eye Opening",
        name: "gcsEye",
        options: [
          "4 - Spontaneous",
          "3 - To Voice",
          "2 - To Pain",
          "1 - None",
        ],
      },
      {
        type: "select",
        label: "Verbal Response",
        name: "gcsVerbal",
        options: [
          "5 - Oriented",
          "4 - Confused",
          "3 - Inappropriate Words",
          "2 - Incomprehensible Sounds",
          "1 - None",
        ],
      },
      {
        type: "select",
        label: "Motor Response",
        name: "gcsMotor",
        options: [
          "6 - Obeys Commands",
          "5 - Localizes Pain",
          "4 - Withdraws",
          "3 - Abnormal Flexion",
          "2 - Abnormal Extension",
          "1 - None",
        ],
      },
      {
        type: "input",
        label: "Total GCS",
        name: "totalGcs",
        inputType: "number",
      },
    ],
  },

  // =========================================================
  // 10. CRANIAL NERVE EXAMINATION
  // =========================================================
  {
    title: "10. Cranial Nerve Examination",
    fields: [
      {
        type: "textarea",
        label: "CN I - Olfactory",
        name: "cn1Olfactory",
      },
      {
        type: "textarea",
        label: "CN II - Optic",
        name: "cn2Optic",
      },
      {
        type: "textarea",
        label: "CN III - Oculomotor",
        name: "cn3Oculomotor",
      },
      {
        type: "textarea",
        label: "CN IV - Trochlear",
        name: "cn4Trochlear",
      },
      {
        type: "textarea",
        label: "CN V - Trigeminal",
        name: "cn5Trigeminal",
      },
      {
        type: "textarea",
        label: "CN VI - Abducens",
        name: "cn6Abducens",
      },
      {
        type: "textarea",
        label: "CN VII - Facial",
        name: "cn7Facial",
      },
      {
        type: "textarea",
        label: "CN VIII - Vestibulocochlear",
        name: "cn8Vestibulocochlear",
      },
      {
        type: "textarea",
        label: "CN IX - Glossopharyngeal",
        name: "cn9Glossopharyngeal",
      },
      {
        type: "textarea",
        label: "CN X - Vagus",
        name: "cn10Vagus",
      },
      {
        type: "textarea",
        label: "CN XI - Accessory",
        name: "cn11Accessory",
      },
      {
        type: "textarea",
        label: "CN XII - Hypoglossal",
        name: "cn12Hypoglossal",
      },
    ],
  },

  // =========================================================
  // 11. PUPILS & EYE MOVEMENTS
  // =========================================================
  {
    title: "11. Pupillary & Eye Examination",
    type: "checkbox",
    fields: [
      ["Pupils Equal", "pupilsEqual"],
      ["Pupils Unequal", "pupilsUnequal"],
      ["Reactive to Light", "pupilsReactive"],
      ["Non-Reactive", "pupilsNonReactive"],
      ["Relative Afferent Pupillary Defect", "rapd"],
      ["Nystagmus", "nystagmus"],
      ["Diplopia", "diplopia"],
      ["Ptosis", "ptosis"],
      ["Visual Field Defect", "visualFieldDefect"],
    ],
  },

  {
    title: "12. Eye Examination Details",
    fields: [
      {
        type: "input",
        label: "Right Pupil",
        name: "rightPupil",
      },
      {
        type: "input",
        label: "Left Pupil",
        name: "leftPupil",
      },
      {
        type: "textarea",
        label: "Extraocular Movements",
        name: "extraocularMovements",
      },
      {
        type: "textarea",
        label: "Visual Fields",
        name: "visualFields",
      },
      {
        type: "textarea",
        label: "Fundus Examination",
        name: "fundusExamination",
      },
    ],
  },

  // =========================================================
  // 13. MOTOR EXAMINATION
  // =========================================================
  {
    title: "13. Motor Examination",
    fields: [
      {
        type: "input",
        label: "Right Upper Limb Power",
        name: "rightUpperLimbPower",
      },
      {
        type: "input",
        label: "Left Upper Limb Power",
        name: "leftUpperLimbPower",
      },
      {
        type: "input",
        label: "Right Lower Limb Power",
        name: "rightLowerLimbPower",
      },
      {
        type: "input",
        label: "Left Lower Limb Power",
        name: "leftLowerLimbPower",
      },
      {
        type: "textarea",
        label: "Muscle Tone",
        name: "muscleTone",
      },
      {
        type: "textarea",
        label: "Muscle Bulk",
        name: "muscleBulk",
      },
      {
        type: "textarea",
        label: "Involuntary Movements",
        name: "involuntaryMovements",
      },
      {
        type: "textarea",
        label: "Motor Examination Findings",
        name: "motorExaminationFindings",
      },
    ],
  },

  // =========================================================
  // 14. SENSORY EXAMINATION
  // =========================================================
  {
    title: "14. Sensory Examination",
    type: "checkbox",
    fields: [
      ["Normal Sensation", "normalSensation"],
      ["Reduced Sensation", "reducedSensation"],
      ["Loss of Pain Sensation", "painSensationLoss"],
      ["Loss of Temperature Sensation", "temperatureSensationLoss"],
      ["Loss of Touch Sensation", "touchSensationLoss"],
      ["Loss of Vibration", "vibrationLoss"],
      ["Loss of Proprioception", "proprioceptionLoss"],
      ["Dermatomal Sensory Loss", "dermatomalSensoryLoss"],
      ["Hemibody Sensory Loss", "hemibodySensoryLoss"],
    ],
  },

  {
    title: "15. Sensory Examination Details",
    fields: [
      {
        type: "textarea",
        label: "Pain Sensation",
        name: "painSensation",
      },
      {
        type: "textarea",
        label: "Temperature",
        name: "temperatureSensation",
      },
      {
        type: "textarea",
        label: "Light Touch",
        name: "lightTouch",
      },
      {
        type: "textarea",
        label: "Vibration",
        name: "vibration",
      },
      {
        type: "textarea",
        label: "Proprioception",
        name: "proprioception",
      },
      {
        type: "textarea",
        label: "Sensory Level",
        name: "sensoryLevel",
      },
    ],
  },

  // =========================================================
  // 16. REFLEXES
  // =========================================================
  {
    title: "16. Reflex Examination",
    fields: [
      {
        type: "input",
        label: "Right Biceps Reflex",
        name: "rightBicepsReflex",
      },
      {
        type: "input",
        label: "Left Biceps Reflex",
        name: "leftBicepsReflex",
      },
      {
        type: "input",
        label: "Right Triceps Reflex",
        name: "rightTricepsReflex",
      },
      {
        type: "input",
        label: "Left Triceps Reflex",
        name: "leftTricepsReflex",
      },
      {
        type: "input",
        label: "Right Knee Reflex",
        name: "rightKneeReflex",
      },
      {
        type: "input",
        label: "Left Knee Reflex",
        name: "leftKneeReflex",
      },
      {
        type: "input",
        label: "Right Ankle Reflex",
        name: "rightAnkleReflex",
      },
      {
        type: "input",
        label: "Left Ankle Reflex",
        name: "leftAnkleReflex",
      },
      {
        type: "textarea",
        label: "Plantar Response",
        name: "plantarResponse",
      },
      {
        type: "textarea",
        label: "Other Reflex Findings",
        name: "otherReflexFindings",
      },
    ],
  },

  // =========================================================
  // 17. CEREBELLAR EXAMINATION
  // =========================================================
  {
    title: "17. Cerebellar Examination",
    type: "checkbox",
    fields: [
      ["Normal Coordination", "normalCoordination"],
      ["Ataxia", "ataxia"],
      ["Dysmetria", "dysmetria"],
      ["Dysdiadochokinesia", "dysdiadochokinesia"],
      ["Intention Tremor", "intentionTremor"],
      ["Nystagmus", "cerebellarNystagmus"],
      ["Truncal Ataxia", "truncalAtaxia"],
    ],
  },

  {
    title: "18. Cerebellar Examination Details",
    fields: [
      {
        type: "textarea",
        label: "Finger-Nose Test",
        name: "fingerNoseTest",
      },
      {
        type: "textarea",
        label: "Heel-Shin Test",
        name: "heelShinTest",
      },
      {
        type: "textarea",
        label: "Rapid Alternating Movements",
        name: "rapidAlternatingMovements",
      },
      {
        type: "textarea",
        label: "Gait",
        name: "cerebellarGait",
      },
      {
        type: "textarea",
        label: "Romberg Test",
        name: "rombergTest",
      },
    ],
  },

  // =========================================================
  // 19. GAIT EXAMINATION
  // =========================================================
  {
    title: "19. Gait & Balance",
    fields: [
      {
        type: "select",
        label: "Gait",
        name: "gait",
        options: [
          "Normal",
          "Ataxic",
          "Spastic",
          "Antalgic",
          "Steppage",
          "Shuffling",
          "Hemiparetic",
          "Unable to Walk",
        ],
      },
      {
        type: "textarea",
        label: "Balance",
        name: "balance",
      },
      {
        type: "textarea",
        label: "Assistive Device",
        name: "assistiveDevice",
      },
      {
        type: "textarea",
        label: "Walking Distance",
        name: "walkingDistance",
      },
    ],
  },

  // =========================================================
  // 20. SPINE ASSESSMENT
  // =========================================================
  {
    title: "20. Spine Assessment",
    type: "checkbox",
    fields: [
      ["Cervical Disc Disease", "cervicalDiscDisease"],
      ["Lumbar Disc Disease", "lumbarDiscDisease"],
      ["Disc Prolapse", "discProlapse"],
      ["Spinal Stenosis", "spinalStenosis"],
      ["Spondylolisthesis", "spondylolisthesis"],
      ["Spinal Cord Compression", "spinalCordCompression"],
      ["Myelopathy", "myelopathy"],
      ["Radiculopathy", "radiculopathy"],
      ["Spinal Tumor", "spinalTumor"],
      ["Spinal Fracture", "spinalFracture"],
      ["Spinal Infection", "spinalInfection"],
      ["Scoliosis", "scoliosis"],
    ],
  },

  {
    title: "21. Spine Examination",
    fields: [
      {
        type: "textarea",
        label: "Spinal Alignment",
        name: "spinalAlignment",
      },
      {
        type: "textarea",
        label: "Spinal Tenderness",
        name: "spinalTenderness",
      },
      {
        type: "textarea",
        label: "Range of Motion",
        name: "spinalRangeOfMotion",
      },
      {
        type: "textarea",
        label: "Radicular Symptoms",
        name: "radicularSymptoms",
      },
      {
        type: "textarea",
        label: "Long Tract Signs",
        name: "longTractSigns",
      },
      {
        type: "textarea",
        label: "Spinal Examination Findings",
        name: "spinalExaminationFindings",
      },
    ],
  },

  // =========================================================
  // 22. BRAIN / INTRACRANIAL CONDITIONS
  // =========================================================
  {
    title: "22. Intracranial Condition Assessment",
    type: "checkbox",
    fields: [
      ["Brain Tumor", "brainTumor"],
      ["Brain Metastasis", "brainMetastasis"],
      ["Hydrocephalus", "hydrocephalus"],
      ["Intracranial Hemorrhage", "intracranialHemorrhage"],
      ["Subdural Hematoma", "subduralHematoma"],
      ["Epidural Hematoma", "epiduralHematoma"],
      ["Subarachnoid Hemorrhage", "subarachnoidHemorrhage"],
      ["Brain Abscess", "brainAbscess"],
      ["Cerebral Edema", "cerebralEdema"],
      ["Aneurysm", "aneurysm"],
      ["Arteriovenous Malformation", "arteriovenousMalformation"],
      ["Chiari Malformation", "chiariMalformation"],
    ],
  },

  // =========================================================
  // 23. BRAIN TUMOR ASSESSMENT
  // =========================================================
  {
    title: "23. Brain Tumor Assessment",
    fields: [
      {
        type: "input",
        label: "Tumor Location",
        name: "tumorLocation",
      },
      {
        type: "select",
        label: "Tumor Side",
        name: "tumorSide",
        options: [
          "Right",
          "Left",
          "Midline",
          "Bilateral",
          "Not Applicable",
        ],
      },
      {
        type: "textarea",
        label: "Tumor Type",
        name: "tumorType",
      },
      {
        type: "textarea",
        label: "Tumor Size",
        name: "tumorSize",
      },
      {
        type: "textarea",
        label: "Mass Effect",
        name: "massEffect",
      },
      {
        type: "textarea",
        label: "Midline Shift",
        name: "midlineShift",
      },
      {
        type: "textarea",
        label: "Edema",
        name: "tumorEdema",
      },
      {
        type: "textarea",
        label: "Hydrocephalus",
        name: "tumorHydrocephalus",
      },
      {
        type: "textarea",
        label: "Neurological Deficit",
        name: "tumorNeurologicalDeficit",
      },
    ],
  },

  // =========================================================
  // 24. TRAUMATIC BRAIN INJURY
  // =========================================================
  {
    title: "24. Traumatic Brain Injury Assessment",
    type: "checkbox",
    fields: [
      ["Mild Head Injury", "mildHeadInjury"],
      ["Moderate Head Injury", "moderateHeadInjury"],
      ["Severe Head Injury", "severeHeadInjury"],
      ["Loss of Consciousness", "tbiLossOfConsciousness"],
      ["Post-Traumatic Amnesia", "postTraumaticAmnesia"],
      ["Skull Fracture", "skullFracture"],
      ["Intracranial Hemorrhage", "tbiIntracranialHemorrhage"],
      ["Cerebral Contusion", "cerebralContusion"],
      ["Diffuse Axonal Injury", "diffuseAxonalInjury"],
    ],
  },

  {
    title: "25. Trauma Details",
    fields: [
      {
        type: "input",
        label: "Date of Injury",
        name: "injuryDate",
        inputType: "date",
      },
      {
        type: "input",
        label: "Time of Injury",
        name: "injuryTime",
        inputType: "time",
      },
      {
        type: "textarea",
        label: "Mechanism of Injury",
        name: "injuryMechanism",
      },
      {
        type: "textarea",
        label: "Initial GCS",
        name: "initialGcs",
      },
      {
        type: "textarea",
        label: "Loss of Consciousness Duration",
        name: "locDuration",
      },
      {
        type: "textarea",
        label: "Amnesia Duration",
        name: "amnesiaDuration",
      },
      {
        type: "textarea",
        label: "Trauma Imaging Findings",
        name: "traumaImagingFindings",
      },
    ],
  },

  // =========================================================
  // 26. STROKE / CEREBROVASCULAR
  // =========================================================
  {
    title: "26. Cerebrovascular Assessment",
    type: "checkbox",
    fields: [
      ["Ischemic Stroke", "ischemicStroke"],
      ["Hemorrhagic Stroke", "hemorrhagicStroke"],
      ["TIA", "tia"],
      ["Intracranial Aneurysm", "intracranialAneurysm"],
      ["AVM", "cerebralAvm"],
      ["Cerebral Venous Thrombosis", "cerebralVenousThrombosis"],
      ["Carotid Disease", "carotidDisease"],
      ["Previous Stroke", "previousStroke"],
    ],
  },

  {
    title: "27. Stroke Details",
    fields: [
      {
        type: "input",
        label: "Last Known Well",
        name: "lastKnownWell",
        inputType: "datetime-local",
      },
      {
        type: "textarea",
        label: "Stroke Symptoms",
        name: "strokeSymptoms",
      },
      {
        type: "textarea",
        label: "Affected Side",
        name: "strokeAffectedSide",
      },
      {
        type: "textarea",
        label: "NIHSS / Stroke Score",
        name: "strokeScore",
      },
      {
        type: "textarea",
        label: "Imaging Findings",
        name: "strokeImagingFindings",
      },
      {
        type: "textarea",
        label: "Stroke Treatment",
        name: "strokeTreatment",
      },
    ],
  },

  // =========================================================
  // 28. HYDROCEPHALUS
  // =========================================================
  {
    title: "28. Hydrocephalus Assessment",
    type: "checkbox",
    fields: [
      ["Obstructive Hydrocephalus", "obstructiveHydrocephalus"],
      ["Communicating Hydrocephalus", "communicatingHydrocephalus"],
      ["Normal Pressure Hydrocephalus", "normalPressureHydrocephalus"],
      ["Congenital Hydrocephalus", "congenitalHydrocephalus"],
      ["Post-Traumatic Hydrocephalus", "postTraumaticHydrocephalus"],
      ["Post-Infectious Hydrocephalus", "postInfectiousHydrocephalus"],
    ],
  },

  {
    title: "29. Hydrocephalus Details",
    fields: [
      {
        type: "textarea",
        label: "Clinical Symptoms",
        name: "hydrocephalusSymptoms",
      },
      {
        type: "textarea",
        label: "Ventricular Size",
        name: "ventricularSize",
      },
      {
        type: "textarea",
        label: "Imaging Findings",
        name: "hydrocephalusImaging",
      },
      {
        type: "textarea",
        label: "ICP Findings",
        name: "icpFindings",
      },
      {
        type: "textarea",
        label: "Treatment Consideration",
        name: "hydrocephalusTreatment",
      },
    ],
  },

  // =========================================================
  // 30. INTRACRANIAL PRESSURE
  // =========================================================
  {
    title: "30. Intracranial Pressure Assessment",
    type: "checkbox",
    fields: [
      ["Suspected Raised ICP", "suspectedRaisedIcp"],
      ["Papilledema", "papilledema"],
      ["Vomiting", "raisedIcpVomiting"],
      ["Altered Consciousness", "raisedIcpAlteredConsciousness"],
      ["Pupil Abnormality", "raisedIcpPupilAbnormality"],
      ["Cushing Response", "cushingResponse"],
      ["Herniation Signs", "herniationSigns"],
    ],
  },

  {
    title: "31. ICP Details",
    fields: [
      {
        type: "textarea",
        label: "ICP Measurement",
        name: "icpMeasurement",
      },
      {
        type: "textarea",
        label: "Papilledema Findings",
        name: "papilledemaFindings",
      },
      {
        type: "textarea",
        label: "Imaging Findings",
        name: "icpImagingFindings",
      },
      {
        type: "textarea",
        label: "ICP Management",
        name: "icpManagement",
      },
    ],
  },

  // =========================================================
  // 32. PERIPHERAL NERVE
  // =========================================================
  {
    title: "32. Peripheral Nerve Assessment",
    type: "checkbox",
    fields: [
      ["Carpal Tunnel Syndrome", "carpalTunnel"],
      ["Cubital Tunnel Syndrome", "cubitalTunnel"],
      ["Peripheral Nerve Injury", "peripheralNerveInjury"],
      ["Brachial Plexus Injury", "brachialPlexusInjury"],
      ["Sciatic Nerve Injury", "sciaticNerveInjury"],
      ["Peroneal Nerve Injury", "peronealNerveInjury"],
      ["Ulnar Nerve Injury", "ulnarNerveInjury"],
      ["Radial Nerve Injury", "radialNerveInjury"],
      ["Median Nerve Injury", "medianNerveInjury"],
    ],
  },

  {
    title: "33. Peripheral Nerve Examination",
    fields: [
      {
        type: "textarea",
        label: "Affected Nerve",
        name: "affectedNerve",
      },
      {
        type: "textarea",
        label: "Motor Deficit",
        name: "peripheralMotorDeficit",
      },
      {
        type: "textarea",
        label: "Sensory Deficit",
        name: "peripheralSensoryDeficit",
      },
      {
        type: "textarea",
        label: "Nerve Conduction / EMG",
        name: "nerveConductionEmg",
      },
      {
        type: "textarea",
        label: "Peripheral Nerve Findings",
        name: "peripheralNerveFindings",
      },
    ],
  },

  // =========================================================
  // 34. SPINAL CORD
  // =========================================================
  {
    title: "34. Spinal Cord Assessment",
    type: "checkbox",
    fields: [
      ["Spinal Cord Compression", "cordCompression"],
      ["Cervical Myelopathy", "cervicalMyelopathy"],
      ["Thoracic Myelopathy", "thoracicMyelopathy"],
      ["Lumbar Spinal Stenosis", "lumbarSpinalStenosis"],
      ["Spinal Cord Tumor", "spinalCordTumor"],
      ["Spinal Cord Injury", "spinalCordInjury"],
      ["Transverse Myelitis", "transverseMyelitis"],
      ["Syringomyelia", "syringomyelia"],
    ],
  },

  {
    title: "35. Spinal Cord Examination",
    fields: [
      {
        type: "textarea",
        label: "Motor Findings",
        name: "cordMotorFindings",
      },
      {
        type: "textarea",
        label: "Sensory Level",
        name: "cordSensoryLevel",
      },
      {
        type: "textarea",
        label: "Reflex Findings",
        name: "cordReflexFindings",
      },
      {
        type: "textarea",
        label: "Bladder / Bowel Function",
        name: "cordBladderBowel",
      },
      {
        type: "textarea",
        label: "Spinal Cord Findings",
        name: "spinalCordFindings",
      },
    ],
  },

  // =========================================================
  // 36. BLADDER / BOWEL
  // =========================================================
  {
    title: "36. Bladder & Bowel Assessment",
    type: "checkbox",
    fields: [
      ["Urinary Retention", "urinaryRetention"],
      ["Urinary Incontinence", "urinaryIncontinence"],
      ["Urinary Urgency", "urinaryUrgency"],
      ["Bowel Incontinence", "bowelIncontinence"],
      ["Constipation", "constipation"],
      ["Saddle Anesthesia", "saddleAnesthesia"],
      ["Cauda Equina Symptoms", "caudaEquinaSymptoms"],
    ],
  },

  {
    title: "37. Bladder / Bowel Details",
    fields: [
      {
        type: "textarea",
        label: "Urinary Symptoms",
        name: "urinarySymptoms",
      },
      {
        type: "textarea",
        label: "Bowel Symptoms",
        name: "bowelSymptoms",
      },
      {
        type: "textarea",
        label: "Saddle Sensation",
        name: "saddleSensation",
      },
      {
        type: "textarea",
        label: "Bladder Scan / Residual",
        name: "bladderScanResidual",
      },
    ],
  },

  // =========================================================
  // 38. PAST MEDICAL HISTORY
  // =========================================================
  {
    title: "38. Past Medical History",
    type: "checkbox",
    fields: [
      ["Diabetes Mellitus", "diabetes"],
      ["Hypertension", "hypertension"],
      ["Heart Disease", "heartDisease"],
      ["Kidney Disease", "kidneyDisease"],
      ["Liver Disease", "liverDisease"],
      ["Epilepsy", "epilepsy"],
      ["Previous Stroke", "medicalPreviousStroke"],
      ["Cancer", "cancer"],
      ["Tuberculosis", "tuberculosis"],
      ["Previous CNS Infection", "previousCnsInfection"],
      ["Bleeding Disorder", "bleedingDisorder"],
    ],
  },

  // =========================================================
  // 39. SURGICAL HISTORY
  // =========================================================
  {
    title: "39. Previous Surgical History",
    fields: [
      {
        type: "textarea",
        label: "Previous Neurosurgeries",
        name: "previousNeurosurgeries",
      },
      {
        type: "textarea",
        label: "Previous Spine Surgeries",
        name: "previousSpineSurgeries",
      },
      {
        type: "textarea",
        label: "Previous Brain Surgery",
        name: "previousBrainSurgery",
      },
      {
        type: "textarea",
        label: "Shunt / Device History",
        name: "shuntDeviceHistory",
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
  // 40. MEDICATION HISTORY
  // =========================================================
  {
    title: "40. Medication History",
    fields: [
      {
        type: "textarea",
        label: "Current Medications",
        name: "currentMedications",
      },
      {
        type: "textarea",
        label: "Anti-Seizure Medications",
        name: "antiSeizureMedications",
      },
      {
        type: "textarea",
        label: "Steroids",
        name: "steroids",
      },
      {
        type: "textarea",
        label: "Anticoagulants",
        name: "anticoagulants",
      },
      {
        type: "textarea",
        label: "Antiplatelet Medications",
        name: "antiplateletMedications",
      },
      {
        type: "textarea",
        label: "Pain Medications",
        name: "painMedications",
      },
      {
        type: "textarea",
        label: "Drug Allergies",
        name: "drugAllergies",
      },
    ],
  },

  // =========================================================
  // 41. VITAL SIGNS
  // =========================================================
  {
    title: "41. Vital Signs",
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
  // 42. IMAGING
  // =========================================================
  {
    title: "42. Imaging & Diagnostic Studies",
    fields: [
      {
        type: "textarea",
        label: "CT Brain Findings",
        name: "ctBrainFindings",
      },
      {
        type: "textarea",
        label: "MRI Brain Findings",
        name: "mriBrainFindings",
      },
      {
        type: "textarea",
        label: "CT Spine Findings",
        name: "ctSpineFindings",
      },
      {
        type: "textarea",
        label: "MRI Spine Findings",
        name: "mriSpineFindings",
      },
      {
        type: "textarea",
        label: "CT Angiography",
        name: "ctAngiography",
      },
      {
        type: "textarea",
        label: "MR Angiography",
        name: "mrAngiography",
      },
      {
        type: "textarea",
        label: "Cerebral Angiogram",
        name: "cerebralAngiogram",
      },
      {
        type: "textarea",
        label: "EEG Findings",
        name: "eegFindings",
      },
      {
        type: "textarea",
        label: "EMG / NCS Findings",
        name: "emgNcsFindings",
      },
      {
        type: "textarea",
        label: "Other Diagnostic Findings",
        name: "otherDiagnosticFindings",
      },
    ],
  },

  // =========================================================
  // 43. PREOPERATIVE ASSESSMENT
  // =========================================================
  {
    title: "43. Preoperative Assessment",
    type: "checkbox",
    fields: [
      ["Fit for Surgery", "fitForSurgery"],
      ["Requires Medical Optimization", "requiresMedicalOptimization"],
      ["High Anesthetic Risk", "highAnestheticRisk"],
      ["Bleeding Risk", "bleedingRisk"],
      ["Infection Risk", "infectionRisk"],
      ["Cardiac Risk", "cardiacRisk"],
      ["Pulmonary Risk", "pulmonaryRisk"],
      ["Neurological Risk", "neurologicalRisk"],
      ["Need ICU Postoperatively", "needIcuPostoperatively"],
    ],
  },

  {
    title: "44. Planned Neurosurgical Procedure",
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
  // 45. OPERATIVE DETAILS
  // =========================================================
  {
    title: "45. Operative / Procedure Details",
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
        label: "Implant / Device",
        name: "implantDevice",
      },
      {
        type: "textarea",
        label: "Intraoperative Complications",
        name: "intraoperativeComplications",
      },
      {
        type: "textarea",
        label: "Postoperative Complications",
        name: "postoperativeComplications",
      },
    ],
  },

  // =========================================================
  // 46. POSTOPERATIVE ASSESSMENT
  // =========================================================
  {
    title: "46. Postoperative Assessment",
    type: "checkbox",
    fields: [
      ["Neurologically Stable", "neurologicallyStable"],
      ["New Neurological Deficit", "newNeurologicalDeficit"],
      ["Improved Symptoms", "improvedSymptoms"],
      ["Persistent Symptoms", "persistentSymptoms"],
      ["Wound Healthy", "woundHealthy"],
      ["Wound Infection", "woundInfection"],
      ["CSF Leak", "csfLeak"],
      ["Seizure", "postoperativeSeizure"],
      ["Hydrocephalus", "postoperativeHydrocephalus"],
      ["Bleeding / Hematoma", "postoperativeBleeding"],
    ],
  },

  {
    title: "47. Postoperative Details",
    fields: [
      {
        type: "textarea",
        label: "Postoperative Neurological Examination",
        name: "postoperativeNeurologicalExamination",
      },
      {
        type: "textarea",
        label: "Pain Status",
        name: "postoperativePainStatus",
      },
      {
        type: "textarea",
        label: "Wound Status",
        name: "woundStatus",
      },
      {
        type: "textarea",
        label: "Drain Status",
        name: "drainStatus",
      },
      {
        type: "textarea",
        label: "Postoperative Imaging",
        name: "postoperativeImaging",
      },
      {
        type: "textarea",
        label: "Postoperative Plan",
        name: "postoperativePlan",
      },
    ],
  },

  // =========================================================
  // 48. ASSESSMENT & DIAGNOSIS
  // =========================================================
  {
    title: "48. Assessment & Diagnosis",
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
        label: "Neurological Diagnosis",
        name: "neurologicalDiagnosis",
      },
      {
        type: "textarea",
        label: "Surgical Diagnosis",
        name: "surgicalDiagnosis",
      },
    ],
  },

  // =========================================================
  // 49. TREATMENT PLAN
  // =========================================================
  {
    title: "49. Treatment Plan",
    fields: [
      {
        type: "textarea",
        label: "Medications",
        name: "medications",
        placeholder: "Medicine, dose, frequency, duration",
      },
      {
        type: "textarea",
        label: "Conservative Management",
        name: "conservativeManagement",
      },
      {
        type: "textarea",
        label: "Surgical Management",
        name: "surgicalManagement",
      },
      {
        type: "textarea",
        label: "Pain Management",
        name: "painManagement",
      },
      {
        type: "textarea",
        label: "Seizure Management",
        name: "seizureManagement",
      },
      {
        type: "textarea",
        label: "Physiotherapy / Rehabilitation",
        name: "rehabilitation",
      },
      {
        type: "textarea",
        label: "Patient Education",
        name: "patientEducation",
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
  // 50. FOLLOW-UP
  // =========================================================
  {
    title: "50. Follow-up",
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
          "Imaging Review",
          "Seizure Review",
          "Neurological Review",
          "Spine Review",
          "Rehabilitation Review",
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