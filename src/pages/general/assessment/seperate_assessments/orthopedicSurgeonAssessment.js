export const orthopedicSurgeonSections = [
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
          "Postoperative Review",
          "Preoperative Assessment",
          "Trauma / Emergency",
          "Fracture Review",
          "Pain Management",
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
      ["Joint Pain", "jointPain"],
      ["Bone Pain", "bonePain"],
      ["Muscle Pain", "musclePain"],
      ["Back Pain", "backPain"],
      ["Neck Pain", "neckPain"],
      ["Joint Swelling", "jointSwelling"],
      ["Joint Stiffness", "jointStiffness"],
      ["Reduced Movement", "reducedMovement"],
      ["Limb Weakness", "limbWeakness"],
      ["Difficulty Walking", "difficultyWalking"],
      ["Difficulty Standing", "difficultyStanding"],
      ["Limping", "limping"],
      ["Numbness", "numbness"],
      ["Tingling", "tingling"],
      ["Recent Injury", "recentInjury"],
      ["Fracture", "fracture"],
      ["Dislocation", "dislocation"],
      ["Sports Injury", "sportsInjury"],
      ["Swelling / Mass", "swellingMass"],
      ["Deformity", "deformity"],
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
        label: "Mechanism of Injury",
        name: "mechanismOfInjury",
      },
      {
        type: "textarea",
        label: "Symptom Progression",
        name: "symptomProgression",
      },
      {
        type: "textarea",
        label: "Site of Pain / Injury",
        name: "painInjurySite",
      },
      {
        type: "textarea",
        label: "Pain Character",
        name: "painCharacter",
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
    ],
  },

  // =========================================================
  // 4. TRAUMA ASSESSMENT
  // =========================================================
  {
    title: "4. Trauma Assessment",
    type: "checkbox",
    fields: [
      ["Road Traffic Accident", "roadTrafficAccident"],
      ["Fall", "fall"],
      ["Sports Injury", "traumaSportsInjury"],
      ["Workplace Injury", "workplaceInjury"],
      ["Twisting Injury", "twistingInjury"],
      ["Direct Trauma", "directTrauma"],
      ["Crush Injury", "crushInjury"],
      ["Penetrating Injury", "penetratingInjury"],
      ["Pathological Fracture", "pathologicalFracture"],
      ["Recurrent Injury", "recurrentInjury"],
    ],
  },

  {
    title: "5. Injury Details",
    fields: [
      {
        type: "input",
        label: "Date of Injury",
        name: "dateOfInjury",
        inputType: "date",
      },
      {
        type: "input",
        label: "Time of Injury",
        name: "timeOfInjury",
        inputType: "time",
      },
      {
        type: "textarea",
        label: "Mechanism of Injury",
        name: "detailedMechanism",
      },
      {
        type: "textarea",
        label: "Immediate Symptoms",
        name: "immediateSymptoms",
      },
      {
        type: "textarea",
        label: "Initial Treatment",
        name: "initialTreatment",
      },
      {
        type: "textarea",
        label: "Previous Hospital Treatment",
        name: "previousHospitalTreatment",
      },
    ],
  },

  // =========================================================
  // 6. FRACTURE ASSESSMENT
  // =========================================================
  {
    title: "6. Fracture Assessment",
    type: "checkbox",
    fields: [
      ["Closed Fracture", "closedFracture"],
      ["Open Fracture", "openFracture"],
      ["Displaced Fracture", "displacedFracture"],
      ["Non-Displaced Fracture", "nonDisplacedFracture"],
      ["Comminuted Fracture", "comminutedFracture"],
      ["Stress Fracture", "stressFracture"],
      ["Pathological Fracture", "fracturePathological"],
      ["Multiple Fractures", "multipleFractures"],
      ["Intra-Articular Fracture", "intraArticularFracture"],
      ["Periprosthetic Fracture", "periprostheticFracture"],
    ],
  },

  {
    title: "7. Fracture Details",
    fields: [
      {
        type: "textarea",
        label: "Bone / Site",
        name: "fractureBoneSite",
      },
      {
        type: "select",
        label: "Side",
        name: "fractureSide",
        options: [
          "Right",
          "Left",
          "Bilateral",
          "Midline",
          "Not Applicable",
        ],
      },
      {
        type: "textarea",
        label: "Fracture Pattern",
        name: "fracturePattern",
      },
      {
        type: "textarea",
        label: "Displacement",
        name: "fractureDisplacement",
      },
      {
        type: "textarea",
        label: "Alignment",
        name: "fractureAlignment",
      },
      {
        type: "textarea",
        label: "Neurovascular Status",
        name: "fractureNeurovascularStatus",
      },
      {
        type: "textarea",
        label: "Fracture Healing Status",
        name: "fractureHealingStatus",
      },
    ],
  },

  // =========================================================
  // 8. JOINT ASSESSMENT
  // =========================================================
  {
    title: "8. Joint Assessment",
    type: "checkbox",
    fields: [
      ["Shoulder", "shoulderJoint"],
      ["Elbow", "elbowJoint"],
      ["Wrist", "wristJoint"],
      ["Hand", "handJoint"],
      ["Hip", "hipJoint"],
      ["Knee", "kneeJoint"],
      ["Ankle", "ankleJoint"],
      ["Foot", "footJoint"],
      ["Temporomandibular Joint", "tmjJoint"],
      ["Sacroiliac Joint", "sacroiliacJoint"],
    ],
  },

  // =========================================================
  // 9. JOINT EXAMINATION
  // =========================================================
  {
    title: "9. Joint Examination",
    fields: [
      {
        type: "textarea",
        label: "Inspection",
        name: "jointInspection",
      },
      {
        type: "textarea",
        label: "Swelling",
        name: "jointSwellingExamination",
      },
      {
        type: "textarea",
        label: "Tenderness",
        name: "jointTenderness",
      },
      {
        type: "textarea",
        label: "Range of Motion",
        name: "jointRangeOfMotion",
      },
      {
        type: "textarea",
        label: "Crepitus",
        name: "jointCrepitus",
      },
      {
        type: "textarea",
        label: "Instability",
        name: "jointInstability",
      },
      {
        type: "textarea",
        label: "Deformity",
        name: "jointDeformity",
      },
      {
        type: "textarea",
        label: "Special Tests",
        name: "jointSpecialTests",
      },
    ],
  },

  // =========================================================
  // 10. SHOULDER ASSESSMENT
  // =========================================================
  {
    title: "10. Shoulder Assessment",
    type: "checkbox",
    fields: [
      ["Rotator Cuff Injury", "rotatorCuffInjury"],
      ["Frozen Shoulder", "frozenShoulder"],
      ["Shoulder Impingement", "shoulderImpingement"],
      ["Shoulder Instability", "shoulderInstability"],
      ["Shoulder Dislocation", "shoulderDislocation"],
      ["Shoulder Arthritis", "shoulderArthritis"],
      ["AC Joint Injury", "acJointInjury"],
      ["Biceps Tendinopathy", "bicepsTendinopathy"],
      ["Labral Injury", "shoulderLabralInjury"],
    ],
  },

  {
    title: "11. Shoulder Examination",
    fields: [
      {
        type: "textarea",
        label: "Active Range of Motion",
        name: "shoulderActiveRom",
      },
      {
        type: "textarea",
        label: "Passive Range of Motion",
        name: "shoulderPassiveRom",
      },
      {
        type: "textarea",
        label: "Rotator Cuff Tests",
        name: "rotatorCuffTests",
      },
      {
        type: "textarea",
        label: "Impingement Tests",
        name: "shoulderImpingementTests",
      },
      {
        type: "textarea",
        label: "Stability Tests",
        name: "shoulderStabilityTests",
      },
      {
        type: "textarea",
        label: "Shoulder Examination Findings",
        name: "shoulderExamination",
      },
    ],
  },

  // =========================================================
  // 12. KNEE ASSESSMENT
  // =========================================================
  {
    title: "12. Knee Assessment",
    type: "checkbox",
    fields: [
      ["Osteoarthritis", "kneeOsteoarthritis"],
      ["ACL Injury", "aclInjury"],
      ["PCL Injury", "pclInjury"],
      ["MCL Injury", "mclInjury"],
      ["LCL Injury", "lclInjury"],
      ["Meniscus Injury", "meniscusInjury"],
      ["Patellar Dislocation", "patellarDislocation"],
      ["Patellar Tendinopathy", "patellarTendinopathy"],
      ["Knee Effusion", "kneeEffusion"],
      ["Knee Bursitis", "kneeBursitis"],
    ],
  },

  {
    title: "13. Knee Examination",
    fields: [
      {
        type: "textarea",
        label: "Knee Inspection",
        name: "kneeInspection",
      },
      {
        type: "textarea",
        label: "Tenderness",
        name: "kneeTenderness",
      },
      {
        type: "textarea",
        label: "Range of Motion",
        name: "kneeRom",
      },
      {
        type: "textarea",
        label: "Effusion",
        name: "kneeEffusionExamination",
      },
      {
        type: "textarea",
        label: "Ligament Stability",
        name: "kneeLigamentStability",
      },
      {
        type: "textarea",
        label: "Meniscal Tests",
        name: "kneeMeniscalTests",
      },
      {
        type: "textarea",
        label: "Patellar Assessment",
        name: "patellarAssessment",
      },
      {
        type: "textarea",
        label: "Knee Examination Findings",
        name: "kneeExamination",
      },
    ],
  },

  // =========================================================
  // 14. HIP ASSESSMENT
  // =========================================================
  {
    title: "14. Hip Assessment",
    type: "checkbox",
    fields: [
      ["Hip Osteoarthritis", "hipOsteoarthritis"],
      ["Hip Fracture", "hipFracture"],
      ["Hip Dislocation", "hipDislocation"],
      ["Avascular Necrosis", "avascularNecrosis"],
      ["Hip Impingement", "hipImpingement"],
      ["Labral Tear", "hipLabralTear"],
      ["Bursitis", "hipBursitis"],
      ["Developmental Dysplasia", "developmentalDysplasia"],
    ],
  },

  {
    title: "15. Hip Examination",
    fields: [
      {
        type: "textarea",
        label: "Hip Range of Motion",
        name: "hipRangeOfMotion",
      },
      {
        type: "textarea",
        label: "Hip Tenderness",
        name: "hipTenderness",
      },
      {
        type: "textarea",
        label: "Gait Assessment",
        name: "hipGaitAssessment",
      },
      {
        type: "textarea",
        label: "Leg Length",
        name: "legLength",
      },
      {
        type: "textarea",
        label: "Hip Special Tests",
        name: "hipSpecialTests",
      },
      {
        type: "textarea",
        label: "Hip Examination Findings",
        name: "hipExamination",
      },
    ],
  },

  // =========================================================
  // 16. SPINE ASSESSMENT
  // =========================================================
  {
    title: "16. Spine Assessment",
    type: "checkbox",
    fields: [
      ["Cervical Spondylosis", "cervicalSpondylosis"],
      ["Lumbar Spondylosis", "lumbarSpondylosis"],
      ["Disc Prolapse", "discProlapse"],
      ["Sciatica", "sciatica"],
      ["Spinal Stenosis", "spinalStenosis"],
      ["Spondylolisthesis", "spondylolisthesis"],
      ["Spinal Fracture", "spinalFracture"],
      ["Spinal Deformity", "spinalDeformity"],
      ["Scoliosis", "scoliosis"],
      ["Kyphosis", "kyphosis"],
      ["Radiculopathy", "radiculopathy"],
      ["Myelopathy", "myelopathy"],
    ],
  },

  {
    title: "17. Spine Examination",
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
        label: "Neurological Examination",
        name: "spineNeurologicalExamination",
      },
      {
        type: "textarea",
        label: "Motor Power",
        name: "motorPower",
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
        label: "Straight Leg Raise",
        name: "straightLegRaise",
      },
      {
        type: "textarea",
        label: "Spine Examination Findings",
        name: "spineExamination",
      },
    ],
  },

  // =========================================================
  // 18. HAND & WRIST
  // =========================================================
  {
    title: "18. Hand & Wrist Assessment",
    type: "checkbox",
    fields: [
      ["Carpal Tunnel Syndrome", "carpalTunnelSyndrome"],
      ["Trigger Finger", "triggerFinger"],
      ["De Quervain Tenosynovitis", "deQuervain"],
      ["Wrist Fracture", "wristFracture"],
      ["Hand Fracture", "handFracture"],
      ["Tendon Injury", "handTendonInjury"],
      ["Nerve Injury", "handNerveInjury"],
      ["Arthritis", "handArthritis"],
      ["Ganglion Cyst", "wristGanglion"],
      ["Dupuytren Contracture", "dupuytrenContracture"],
    ],
  },

  {
    title: "19. Hand & Wrist Examination",
    fields: [
      {
        type: "textarea",
        label: "Inspection",
        name: "handInspection",
      },
      {
        type: "textarea",
        label: "Tenderness",
        name: "handTenderness",
      },
      {
        type: "textarea",
        label: "Range of Motion",
        name: "handRangeOfMotion",
      },
      {
        type: "textarea",
        label: "Grip Strength",
        name: "gripStrength",
      },
      {
        type: "textarea",
        label: "Sensation",
        name: "handSensation",
      },
      {
        type: "textarea",
        label: "Tendon Function",
        name: "tendonFunction",
      },
      {
        type: "textarea",
        label: "Hand / Wrist Findings",
        name: "handWristFindings",
      },
    ],
  },

  // =========================================================
  // 20. FOOT & ANKLE
  // =========================================================
  {
    title: "20. Foot & Ankle Assessment",
    type: "checkbox",
    fields: [
      ["Ankle Sprain", "ankleSprain"],
      ["Ankle Fracture", "ankleFracture"],
      ["Achilles Tendon Injury", "achillesInjury"],
      ["Plantar Fasciitis", "plantarFasciitis"],
      ["Flat Foot", "flatFoot"],
      ["High Arch", "highArch"],
      ["Hallux Valgus", "halluxValgus"],
      ["Hammer Toe", "hammerToe"],
      ["Foot Arthritis", "footArthritis"],
      ["Ankle Arthritis", "ankleArthritis"],
      ["Tendon Injury", "footTendonInjury"],
    ],
  },

  {
    title: "21. Foot & Ankle Examination",
    fields: [
      {
        type: "textarea",
        label: "Foot / Ankle Alignment",
        name: "footAnkleAlignment",
      },
      {
        type: "textarea",
        label: "Swelling",
        name: "footAnkleSwelling",
      },
      {
        type: "textarea",
        label: "Tenderness",
        name: "footAnkleTenderness",
      },
      {
        type: "textarea",
        label: "Range of Motion",
        name: "footAnkleRom",
      },
      {
        type: "textarea",
        label: "Stability",
        name: "footAnkleStability",
      },
      {
        type: "textarea",
        label: "Gait",
        name: "footAnkleGait",
      },
      {
        type: "textarea",
        label: "Foot / Ankle Findings",
        name: "footAnkleFindings",
      },
    ],
  },

  // =========================================================
  // 22. NEUROVASCULAR ASSESSMENT
  // =========================================================
  {
    title: "22. Neurovascular Assessment",
    type: "checkbox",
    fields: [
      ["Normal Distal Pulses", "normalDistalPulses"],
      ["Reduced Pulses", "reducedPulses"],
      ["Absent Pulses", "absentPulses"],
      ["Numbness", "neuroNumbness"],
      ["Tingling", "neuroTingling"],
      ["Weakness", "neuroWeakness"],
      ["Sensory Loss", "sensoryLoss"],
      ["Motor Deficit", "motorDeficit"],
      ["Compartment Syndrome Suspicion", "compartmentSyndrome"],
    ],
  },

  {
    title: "23. Neurovascular Examination",
    fields: [
      {
        type: "textarea",
        label: "Pulse Examination",
        name: "pulseExamination",
      },
      {
        type: "textarea",
        label: "Capillary Refill",
        name: "capillaryRefill",
      },
      {
        type: "textarea",
        label: "Motor Power",
        name: "neuroMotorPower",
      },
      {
        type: "textarea",
        label: "Sensory Examination",
        name: "neuroSensoryExamination",
      },
      {
        type: "textarea",
        label: "Reflexes",
        name: "neuroReflexes",
      },
      {
        type: "textarea",
        label: "Neurovascular Findings",
        name: "neurovascularFindings",
      },
    ],
  },

  // =========================================================
  // 24. OSTEOPOROSIS / BONE HEALTH
  // =========================================================
  {
    title: "24. Bone Health Assessment",
    type: "checkbox",
    fields: [
      ["Osteoporosis", "osteoporosis"],
      ["Osteopenia", "osteopenia"],
      ["Fragility Fracture", "fragilityFracture"],
      ["Vitamin D Deficiency", "vitaminDDeficiency"],
      ["Calcium Deficiency", "calciumDeficiency"],
      ["Long-Term Steroid Use", "longTermSteroidUse"],
      ["Fall Risk", "fallRisk"],
      ["Previous Hip Fracture", "previousHipFracture"],
      ["Vertebral Fracture", "vertebralFracture"],
    ],
  },

  {
    title: "25. Bone Health Details",
    fields: [
      {
        type: "input",
        label: "Vitamin D",
        name: "vitaminD",
      },
      {
        type: "input",
        label: "Calcium",
        name: "calcium",
      },
      {
        type: "input",
        label: "DEXA T-Score",
        name: "dexaTScore",
      },
      {
        type: "input",
        label: "DEXA Z-Score",
        name: "dexaZScore",
      },
      {
        type: "textarea",
        label: "Fracture History",
        name: "boneFractureHistory",
      },
      {
        type: "textarea",
        label: "Bone Health Plan",
        name: "boneHealthPlan",
      },
    ],
  },

  // =========================================================
  // 26. SPORTS INJURY
  // =========================================================
  {
    title: "26. Sports Injury Assessment",
    type: "checkbox",
    fields: [
      ["ACL Injury", "sportsAcl"],
      ["Meniscus Injury", "sportsMeniscus"],
      ["Rotator Cuff Injury", "sportsRotatorCuff"],
      ["Tennis Elbow", "tennisElbow"],
      ["Golfer's Elbow", "golfersElbow"],
      ["Ankle Sprain", "sportsAnkleSprain"],
      ["Achilles Injury", "sportsAchilles"],
      ["Hamstring Injury", "hamstringInjury"],
      ["Muscle Strain", "muscleStrain"],
      ["Stress Fracture", "sportsStressFracture"],
    ],
  },

  {
    title: "27. Sports / Activity Details",
    fields: [
      {
        type: "input",
        label: "Sport / Activity",
        name: "sportActivity",
      },
      {
        type: "input",
        label: "Activity Level",
        name: "activityLevel",
      },
      {
        type: "textarea",
        label: "Training History",
        name: "trainingHistory",
      },
      {
        type: "textarea",
        label: "Return-to-Sport Goal",
        name: "returnToSportGoal",
      },
      {
        type: "textarea",
        label: "Sports Rehabilitation Plan",
        name: "sportsRehabilitationPlan",
      },
    ],
  },

  // =========================================================
  // 28. PAST MEDICAL HISTORY
  // =========================================================
  {
    title: "28. Past Medical History",
    type: "checkbox",
    fields: [
      ["Diabetes Mellitus", "diabetes"],
      ["Hypertension", "hypertension"],
      ["Heart Disease", "heartDisease"],
      ["Kidney Disease", "kidneyDisease"],
      ["Liver Disease", "liverDisease"],
      ["Thyroid Disease", "thyroidDisease"],
      ["Rheumatoid Arthritis", "rheumatoidArthritis"],
      ["Gout", "gout"],
      ["Osteoporosis", "medicalOsteoporosis"],
      ["Cancer", "cancer"],
      ["Previous DVT / PE", "previousDvtPe"],
    ],
  },

  // =========================================================
  // 29. PAST SURGICAL HISTORY
  // =========================================================
  {
    title: "29. Past Surgical History",
    fields: [
      {
        type: "textarea",
        label: "Previous Orthopedic Surgeries",
        name: "previousOrthopedicSurgeries",
      },
      {
        type: "textarea",
        label: "Joint Replacement History",
        name: "jointReplacementHistory",
      },
      {
        type: "textarea",
        label: "Fracture Fixation History",
        name: "fractureFixationHistory",
      },
      {
        type: "textarea",
        label: "Spine Surgery History",
        name: "spineSurgeryHistory",
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
  // 30. MEDICATION HISTORY
  // =========================================================
  {
    title: "30. Medication History",
    fields: [
      {
        type: "textarea",
        label: "Current Medications",
        name: "currentMedications",
        placeholder: "Medicine, dose, frequency, duration",
      },
      {
        type: "textarea",
        label: "Pain Medications",
        name: "painMedications",
      },
      {
        type: "textarea",
        label: "NSAID Use",
        name: "nsaidUse",
      },
      {
        type: "textarea",
        label: "Steroid Use",
        name: "steroidUse",
      },
      {
        type: "textarea",
        label: "Anticoagulants / Antiplatelets",
        name: "anticoagulantsAntiplatelets",
      },
      {
        type: "textarea",
        label: "Drug Allergies",
        name: "drugAllergies",
      },
    ],
  },

  // =========================================================
  // 31. FAMILY HISTORY
  // =========================================================
  {
    title: "31. Family History",
    type: "checkbox",
    fields: [
      ["Family History of Osteoporosis", "familyOsteoporosis"],
      ["Family History of Arthritis", "familyArthritis"],
      ["Family History of Rheumatoid Arthritis", "familyRheumatoidArthritis"],
      ["Family History of Hip Fracture", "familyHipFracture"],
      ["Family History of Bone Disease", "familyBoneDisease"],
      ["Family History of Musculoskeletal Disease", "familyMusculoskeletalDisease"],
    ],
  },

  // =========================================================
  // 32. VITAL SIGNS
  // =========================================================
  {
    title: "32. Vital Signs",
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
  // 33. FUNCTIONAL ASSESSMENT
  // =========================================================
  {
    title: "33. Functional Assessment",
    fields: [
      {
        type: "select",
        label: "Functional Status",
        name: "functionalStatus",
        options: [
          "Normal",
          "Mild Limitation",
          "Moderate Limitation",
          "Severe Limitation",
          "Dependent",
        ],
      },
      {
        type: "textarea",
        label: "Activities of Daily Living",
        name: "activitiesOfDailyLiving",
      },
      {
        type: "textarea",
        label: "Walking Ability",
        name: "walkingAbility",
      },
      {
        type: "textarea",
        label: "Stair Climbing",
        name: "stairClimbing",
      },
      {
        type: "textarea",
        label: "Work Limitation",
        name: "workLimitation",
      },
      {
        type: "textarea",
        label: "Assistive Devices",
        name: "assistiveDevices",
      },
    ],
  },

  // =========================================================
  // 34. IMAGING
  // =========================================================
  {
    title: "34. Imaging & Diagnostic Studies",
    fields: [
      {
        type: "textarea",
        label: "X-Ray Findings",
        name: "xrayFindings",
      },
      {
        type: "textarea",
        label: "CT Scan Findings",
        name: "ctScanFindings",
      },
      {
        type: "textarea",
        label: "MRI Findings",
        name: "mriFindings",
      },
      {
        type: "textarea",
        label: "Ultrasound Findings",
        name: "ultrasoundFindings",
      },
      {
        type: "textarea",
        label: "DEXA Scan Findings",
        name: "dexaFindings",
      },
      {
        type: "textarea",
        label: "Bone Scan Findings",
        name: "boneScanFindings",
      },
      {
        type: "textarea",
        label: "Other Imaging Findings",
        name: "otherImagingFindings",
      },
    ],
  },

  // =========================================================
  // 35. PREOPERATIVE ASSESSMENT
  // =========================================================
  {
    title: "35. Preoperative Assessment",
    type: "checkbox",
    fields: [
      ["Fit for Surgery", "fitForSurgery"],
      ["Requires Medical Optimization", "requiresMedicalOptimization"],
      ["High Anesthetic Risk", "highAnestheticRisk"],
      ["Bleeding Risk", "bleedingRisk"],
      ["Thromboembolic Risk", "thromboembolicRisk"],
      ["Infection Risk", "infectionRisk"],
      ["Cardiac Risk", "cardiacRisk"],
      ["Pulmonary Risk", "pulmonaryRisk"],
      ["Bone Quality Concern", "boneQualityConcern"],
    ],
  },

  {
    title: "36. Preoperative Details",
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
        label: "Preoperative Optimization",
        name: "preoperativeOptimization",
      },
      {
        type: "textarea",
        label: "Anesthesia Considerations",
        name: "anesthesiaConsiderations",
      },
    ],
  },

  // =========================================================
  // 37. OPERATIVE / PROCEDURE HISTORY
  // =========================================================
  {
    title: "37. Operative / Procedure Details",
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
        label: "Implant / Prosthesis",
        name: "implantProsthesis",
      },
      {
        type: "textarea",
        label: "Procedure Details",
        name: "procedureDetails",
      },
      {
        type: "textarea",
        label: "Postoperative Complications",
        name: "postoperativeComplications",
      },
    ],
  },

  // =========================================================
  // 38. REHABILITATION
  // =========================================================
  {
    title: "38. Rehabilitation Plan",
    fields: [
      {
        type: "textarea",
        label: "Physiotherapy Plan",
        name: "physiotherapyPlan",
      },
      {
        type: "textarea",
        label: "Exercise Program",
        name: "exerciseProgram",
      },
      {
        type: "textarea",
        label: "Weight Bearing Status",
        name: "weightBearingStatus",
      },
      {
        type: "textarea",
        label: "Range of Motion Goals",
        name: "rangeOfMotionGoals",
      },
      {
        type: "textarea",
        label: "Strengthening Program",
        name: "strengtheningProgram",
      },
      {
        type: "textarea",
        label: "Assistive Device Instructions",
        name: "assistiveDeviceInstructions",
      },
      {
        type: "textarea",
        label: "Return to Work / Sports Plan",
        name: "returnToWorkSportsPlan",
      },
    ],
  },

  // =========================================================
  // 39. ASSESSMENT & DIAGNOSIS
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
        label: "Secondary Diagnosis / Comorbidities",
        name: "secondaryDiagnosis",
      },
      {
        type: "textarea",
        label: "Differential Diagnosis",
        name: "differentialDiagnosis",
      },
      {
        type: "textarea",
        label: "Orthopedic Diagnosis",
        name: "orthopedicDiagnosis",
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
        label: "Medications",
        name: "medications",
        placeholder: "Medicine, dose, frequency, duration",
      },
      {
        type: "textarea",
        label: "Conservative Treatment",
        name: "conservativeTreatment",
      },
      {
        type: "textarea",
        label: "Surgical Treatment",
        name: "surgicalTreatment",
      },
      {
        type: "textarea",
        label: "Pain Management",
        name: "painManagement",
      },
      {
        type: "textarea",
        label: "Immobilization / Support",
        name: "immobilizationSupport",
      },
      {
        type: "textarea",
        label: "Physiotherapy",
        name: "physiotherapy",
      },
      {
        type: "textarea",
        label: "Activity Restrictions",
        name: "activityRestrictions",
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
          "Fracture Review",
          "Postoperative Review",
          "Wound Review",
          "Cast / Splint Review",
          "Physiotherapy Review",
          "Imaging Review",
          "Pain Review",
          "Suture Removal",
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