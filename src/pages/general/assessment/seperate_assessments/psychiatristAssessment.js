// psychiatristAssessment.js

export const psychiatristAssessmentSections = [
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
        type: "input",
        label: "Occupation",
        name: "occupation",
      },
      {
        type: "select",
        label: "Marital Status",
        name: "maritalStatus",
        options: [
          "Single",
          "Married",
          "Divorced",
          "Separated",
          "Widowed",
          "Other",
        ],
      },
      {
        type: "select",
        label: "Visit Type",
        name: "visitType",
        options: [
          "New Consultation",
          "Follow-up",
          "Routine Assessment",
          "Medication Review",
          "Emergency Assessment",
          "Therapy Follow-up",
        ],
      },
      {
        type: "select",
        label: "Informant",
        name: "informant",
        options: [
          "Patient",
          "Parent",
          "Spouse",
          "Family Member",
          "Caregiver",
          "Other",
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
      ["Low Mood", "lowMood"],
      ["Loss of Interest", "lossOfInterest"],
      ["Excessive Worry", "excessiveWorry"],
      ["Panic Attacks", "panicAttacks"],
      ["Irritability", "irritability"],
      ["Mood Swings", "moodSwings"],
      ["Sleep Disturbance", "sleepDisturbance"],
      ["Appetite Changes", "appetiteChanges"],
      ["Poor Concentration", "poorConcentration"],
      ["Memory Problems", "memoryProblems"],
      ["Hallucinations", "hallucinations"],
      ["Delusions", "delusions"],
      ["Paranoia", "paranoia"],
      ["Agitation", "agitation"],
      ["Social Withdrawal", "socialWithdrawal"],
      ["Behavioral Changes", "behavioralChanges"],
      ["Substance Use", "substanceUse"],
      ["Self-Harm Thoughts", "selfHarmThoughts"],
      ["Suicidal Thoughts", "suicidalThoughts"],
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
        label: "Presenting Problem",
        name: "presentingProblem",
      },
      {
        type: "input",
        label: "Age / Date of Symptom Onset",
        name: "symptomOnset",
      },
      {
        type: "input",
        label: "Duration",
        name: "symptomDuration",
      },
      {
        type: "textarea",
        label: "Course of Illness",
        name: "courseOfIllness",
      },
      {
        type: "textarea",
        label: "Precipitating Factors",
        name: "precipitatingFactors",
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
        label: "Functional Impact",
        name: "functionalImpact",
      },
    ],
  },

  // =========================================================
  // 4. PSYCHIATRIC HISTORY
  // =========================================================
  {
    title: "4. Past Psychiatric History",
    type: "checkbox",
    fields: [
      ["Previous Psychiatric Consultation", "previousPsychiatricConsultation"],
      ["Previous Psychiatric Admission", "previousPsychiatricAdmission"],
      ["Previous Depression", "previousDepression"],
      ["Previous Anxiety Disorder", "previousAnxiety"],
      ["Previous Bipolar Disorder", "previousBipolar"],
      ["Previous Psychosis", "previousPsychosis"],
      ["Previous PTSD", "previousPTSD"],
      ["Previous OCD", "previousOCD"],
      ["Previous Eating Disorder", "previousEatingDisorder"],
      ["Previous ADHD", "previousADHD"],
      ["Previous Self-Harm", "previousSelfHarm"],
      ["Previous Suicide Attempt", "previousSuicideAttempt"],
    ],
  },

  {
    title: "5. Psychiatric Treatment History",
    fields: [
      {
        type: "textarea",
        label: "Previous Diagnoses",
        name: "previousDiagnoses",
      },
      {
        type: "textarea",
        label: "Previous Psychiatric Medications",
        name: "previousPsychiatricMedications",
      },
      {
        type: "textarea",
        label: "Previous Psychotherapy",
        name: "previousPsychotherapy",
      },
      {
        type: "textarea",
        label: "Previous Hospitalizations",
        name: "previousHospitalizations",
      },
      {
        type: "textarea",
        label: "Treatment Response",
        name: "previousTreatmentResponse",
      },
      {
        type: "textarea",
        label: "Reason for Treatment Discontinuation",
        name: "treatmentDiscontinuationReason",
      },
    ],
  },

  // =========================================================
  // 6. MEDICAL HISTORY
  // =========================================================
  {
    title: "6. Past Medical History",
    type: "checkbox",
    fields: [
      ["Diabetes", "diabetes"],
      ["Hypertension", "hypertension"],
      ["Thyroid Disorder", "thyroidDisorder"],
      ["Epilepsy", "epilepsy"],
      ["Head Injury", "headInjury"],
      ["Neurological Disorder", "neurologicalDisorder"],
      ["Chronic Pain", "chronicPain"],
      ["Heart Disease", "heartDisease"],
      ["Kidney Disease", "kidneyDisease"],
      ["Liver Disease", "liverDisease"],
      ["Respiratory Disease", "respiratoryDisease"],
      ["Other Chronic Illness", "otherChronicIllness"],
    ],
  },

  {
    title: "7. Medical History Details",
    fields: [
      {
        type: "textarea",
        label: "Relevant Medical History",
        name: "relevantMedicalHistory",
      },
      {
        type: "textarea",
        label: "Neurological History",
        name: "neurologicalHistory",
      },
      {
        type: "textarea",
        label: "Head Injury Details",
        name: "headInjuryDetails",
      },
      {
        type: "textarea",
        label: "Chronic Medical Conditions",
        name: "chronicMedicalConditions",
      },
    ],
  },

  // =========================================================
  // 8. MEDICATION HISTORY
  // =========================================================
  {
    title: "8. Current Medication History",
    fields: [
      {
        type: "textarea",
        label: "Current Medications",
        name: "currentMedications",
      },
      {
        type: "textarea",
        label: "Psychiatric Medications",
        name: "psychiatricMedications",
      },
      {
        type: "textarea",
        label: "Non-Psychiatric Medications",
        name: "nonPsychiatricMedications",
      },
      {
        type: "textarea",
        label: "Medication Adherence",
        name: "medicationAdherence",
      },
      {
        type: "textarea",
        label: "Medication Side Effects",
        name: "medicationSideEffects",
      },
    ],
  },

  // =========================================================
  // 9. FAMILY PSYCHIATRIC HISTORY
  // =========================================================
  {
    title: "9. Family Psychiatric History",
    type: "checkbox",
    fields: [
      ["Depression", "familyDepression"],
      ["Anxiety Disorder", "familyAnxiety"],
      ["Bipolar Disorder", "familyBipolar"],
      ["Schizophrenia / Psychotic Disorder", "familyPsychosis"],
      ["Substance Use Disorder", "familySubstanceUse"],
      ["Suicide History", "familySuicideHistory"],
      ["ADHD", "familyADHD"],
      ["Autism Spectrum Disorder", "familyAutism"],
      ["Other Psychiatric Disorder", "familyOtherPsychiatric"],
    ],
  },

  {
    title: "10. Family History Details",
    fields: [
      {
        type: "textarea",
        label: "Psychiatric Family History",
        name: "psychiatricFamilyHistory",
      },
      {
        type: "textarea",
        label: "Family Support",
        name: "familySupport",
      },
      {
        type: "textarea",
        label: "Family Stressors",
        name: "familyStressors",
      },
    ],
  },

  // =========================================================
  // 11. PERSONAL HISTORY
  // =========================================================
  {
    title: "11. Personal History",
    fields: [
      {
        type: "textarea",
        label: "Birth and Developmental History",
        name: "developmentalHistory",
      },
      {
        type: "textarea",
        label: "Childhood History",
        name: "childhoodHistory",
      },
      {
        type: "textarea",
        label: "Educational History",
        name: "educationalHistory",
      },
      {
        type: "textarea",
        label: "Occupational History",
        name: "occupationalHistory",
      },
      {
        type: "textarea",
        label: "Relationship History",
        name: "relationshipHistory",
      },
      {
        type: "textarea",
        label: "Social History",
        name: "socialHistory",
      },
      {
        type: "textarea",
        label: "Legal History",
        name: "legalHistory",
      },
      {
        type: "textarea",
        label: "Trauma History",
        name: "traumaHistory",
      },
    ],
  },

  // =========================================================
  // 12. SUBSTANCE USE
  // =========================================================
  {
    title: "12. Substance Use Assessment",
    type: "checkbox",
    fields: [
      ["Alcohol", "alcoholUse"],
      ["Tobacco", "tobaccoUse"],
      ["Cannabis", "cannabisUse"],
      ["Opioids", "opioidUse"],
      ["Stimulants", "stimulantUse"],
      ["Sedatives", "sedativeUse"],
      ["Other Substances", "otherSubstanceUse"],
      ["Caffeine Excess", "excessCaffeine"],
    ],
  },

  {
    title: "13. Substance Use Details",
    fields: [
      {
        type: "textarea",
        label: "Substance Used",
        name: "substancesUsed",
      },
      {
        type: "textarea",
        label: "Frequency and Quantity",
        name: "substanceFrequencyQuantity",
      },
      {
        type: "input",
        label: "Duration of Use",
        name: "substanceUseDuration",
      },
      {
        type: "textarea",
        label: "Previous Withdrawal Symptoms",
        name: "withdrawalSymptoms",
      },
      {
        type: "textarea",
        label: "Previous De-addiction Treatment",
        name: "deaddictionTreatment",
      },
    ],
  },

  // =========================================================
  // 14. SLEEP
  // =========================================================
  {
    title: "14. Sleep Assessment",
    type: "checkbox",
    fields: [
      ["Difficulty Falling Asleep", "difficultyFallingAsleep"],
      ["Frequent Night Awakenings", "nightAwakenings"],
      ["Early Morning Awakening", "earlyMorningAwakening"],
      ["Excessive Sleep", "excessiveSleep"],
      ["Daytime Sleepiness", "daytimeSleepiness"],
      ["Nightmares", "nightmares"],
      ["Sleepwalking", "sleepwalking"],
      ["Sleep Apnea Symptoms", "sleepApneaSymptoms"],
    ],
  },

  {
    title: "15. Sleep Details",
    fields: [
      {
        type: "input",
        label: "Average Sleep Duration",
        name: "averageSleepDuration",
      },
      {
        type: "textarea",
        label: "Sleep Pattern",
        name: "sleepPattern",
      },
      {
        type: "textarea",
        label: "Sleep Concerns",
        name: "sleepConcerns",
      },
    ],
  },

  // =========================================================
  // 16. MOOD ASSESSMENT
  // =========================================================
  {
    title: "16. Mood Assessment",
    fields: [
      {
        type: "select",
        label: "Current Mood",
        name: "currentMood",
        options: [
          "Euthymic",
          "Depressed",
          "Anxious",
          "Irritable",
          "Elevated",
          "Angry",
          "Labile",
          "Other",
        ],
      },
      {
        type: "select",
        label: "Mood Severity",
        name: "moodSeverity",
        options: [
          "None",
          "Mild",
          "Moderate",
          "Severe",
        ],
      },
      {
        type: "textarea",
        label: "Mood Description",
        name: "moodDescription",
      },
      {
        type: "textarea",
        label: "Anhedonia",
        name: "anhedonia",
      },
      {
        type: "textarea",
        label: "Energy Level",
        name: "energyLevel",
      },
    ],
  },

  // =========================================================
  // 17. ANXIETY
  // =========================================================
  {
    title: "17. Anxiety Assessment",
    type: "checkbox",
    fields: [
      ["Generalized Worry", "generalizedWorry"],
      ["Panic Episodes", "panicEpisodes"],
      ["Social Anxiety", "socialAnxiety"],
      ["Phobic Anxiety", "phobicAnxiety"],
      ["Obsessive Thoughts", "obsessiveThoughts"],
      ["Compulsive Behaviors", "compulsiveBehaviors"],
      ["Health Anxiety", "healthAnxiety"],
      ["Trauma-Related Anxiety", "traumaRelatedAnxiety"],
    ],
  },

  {
    title: "18. Anxiety Details",
    fields: [
      {
        type: "textarea",
        label: "Anxiety Triggers",
        name: "anxietyTriggers",
      },
      {
        type: "textarea",
        label: "Physical Symptoms",
        name: "anxietyPhysicalSymptoms",
      },
      {
        type: "textarea",
        label: "Avoidance Behavior",
        name: "avoidanceBehavior",
      },
      {
        type: "textarea",
        label: "Panic Attack Details",
        name: "panicAttackDetails",
      },
    ],
  },

  // =========================================================
  // 19. PSYCHOSIS
  // =========================================================
  {
    title: "19. Psychosis Assessment",
    type: "checkbox",
    fields: [
      ["Auditory Hallucinations", "auditoryHallucinations"],
      ["Visual Hallucinations", "visualHallucinations"],
      ["Other Hallucinations", "otherHallucinations"],
      ["Persecutory Delusions", "persecutoryDelusions"],
      ["Grandiose Delusions", "grandioseDelusions"],
      ["Referential Ideas", "referentialIdeas"],
      ["Thought Insertion", "thoughtInsertion"],
      ["Thought Broadcasting", "thoughtBroadcasting"],
      ["Disorganized Thinking", "disorganizedThinking"],
    ],
  },

  {
    title: "20. Psychotic Symptoms Details",
    fields: [
      {
        type: "textarea",
        label: "Hallucination Details",
        name: "hallucinationDetails",
      },
      {
        type: "textarea",
        label: "Delusion Details",
        name: "delusionDetails",
      },
      {
        type: "textarea",
        label: "Thought Content",
        name: "thoughtContent",
      },
      {
        type: "textarea",
        label: "Psychotic Symptom Duration",
        name: "psychoticSymptomDuration",
      },
    ],
  },

  // =========================================================
  // 21. MENTAL STATUS EXAMINATION
  // =========================================================
  {
    title: "21. Mental Status Examination",
    fields: [
      {
        type: "select",
        label: "Appearance",
        name: "appearance",
        options: [
          "Well Groomed",
          "Disheveled",
          "Poor Hygiene",
          "Appropriate",
          "Other",
        ],
      },
      {
        type: "select",
        label: "Behavior",
        name: "behavior",
        options: [
          "Cooperative",
          "Guarded",
          "Agitated",
          "Withdrawn",
          "Disorganized",
          "Suspicious",
          "Other",
        ],
      },
      {
        type: "select",
        label: "Eye Contact",
        name: "eyeContact",
        options: [
          "Good",
          "Fair",
          "Poor",
          "Avoidant",
        ],
      },
      {
        type: "select",
        label: "Speech",
        name: "speech",
        options: [
          "Normal",
          "Slow",
          "Rapid",
          "Pressured",
          "Soft",
          "Loud",
          "Slurred",
        ],
      },
      {
        type: "select",
        label: "Mood",
        name: "mseMood",
        options: [
          "Euthymic",
          "Depressed",
          "Anxious",
          "Irritable",
          "Elevated",
          "Angry",
          "Labile",
        ],
      },
      {
        type: "select",
        label: "Affect",
        name: "affect",
        options: [
          "Appropriate",
          "Restricted",
          "Blunted",
          "Flat",
          "Labile",
          "Incongruent",
        ],
      },
      {
        type: "select",
        label: "Thought Process",
        name: "thoughtProcess",
        options: [
          "Linear",
          "Logical",
          "Tangential",
          "Circumstantial",
          "Loose Associations",
          "Flight of Ideas",
          "Disorganized",
        ],
      },
      {
        type: "select",
        label: "Insight",
        name: "insight",
        options: [
          "Good",
          "Partial",
          "Poor",
          "Absent",
        ],
      },
      {
        type: "select",
        label: "Judgment",
        name: "judgment",
        options: [
          "Good",
          "Fair",
          "Poor",
          "Impaired",
        ],
      },
    ],
  },

  // =========================================================
  // 22. COGNITIVE ASSESSMENT
  // =========================================================
  {
    title: "22. Cognitive Assessment",
    fields: [
      {
        type: "select",
        label: "Level of Consciousness",
        name: "levelOfConsciousness",
        options: [
          "Alert",
          "Drowsy",
          "Lethargic",
          "Obtunded",
          "Other",
        ],
      },
      {
        type: "select",
        label: "Orientation",
        name: "orientation",
        options: [
          "Fully Oriented",
          "Partially Oriented",
          "Disoriented",
        ],
      },
      {
        type: "select",
        label: "Attention",
        name: "attention",
        options: [
          "Normal",
          "Reduced",
          "Poor",
        ],
      },
      {
        type: "select",
        label: "Memory",
        name: "memory",
        options: [
          "Intact",
          "Mildly Impaired",
          "Moderately Impaired",
          "Severely Impaired",
        ],
      },
      {
        type: "textarea",
        label: "Cognitive Findings",
        name: "cognitiveFindings",
      },
    ],
  },

  // =========================================================
  // 23. RISK ASSESSMENT
  // =========================================================
  {
    title: "23. Safety & Risk Assessment",
    type: "checkbox",
    fields: [
      ["Current Suicidal Thoughts", "currentSuicidalThoughts"],
      ["Current Self-Harm Thoughts", "currentSelfHarmThoughts"],
      ["Previous Suicide Attempt", "previousSuicideAttemptRisk"],
      ["Previous Self-Harm", "previousSelfHarmRisk"],
      ["Homicidal Thoughts", "homicidalThoughts"],
      ["Aggressive Behavior", "aggressiveBehavior"],
      ["Severe Impulsivity", "severeImpulsivity"],
      ["Psychotic Symptoms", "riskPsychoticSymptoms"],
      ["Substance Intoxication", "substanceIntoxication"],
      ["Access to Means", "accessToMeans"],
      ["Vulnerable / At-Risk Situation", "vulnerableSituation"],
    ],
  },

  {
    title: "24. Risk Assessment Details",
    fields: [
      {
        type: "select",
        label: "Suicide Risk Level",
        name: "suicideRiskLevel",
        options: [
          "Low",
          "Moderate",
          "High",
          "Imminent",
          "Unable to Assess",
        ],
      },
      {
        type: "select",
        label: "Self-Harm Risk Level",
        name: "selfHarmRiskLevel",
        options: [
          "Low",
          "Moderate",
          "High",
          "Imminent",
          "Unable to Assess",
        ],
      },
      {
        type: "select",
        label: "Violence / Harm to Others Risk",
        name: "violenceRiskLevel",
        options: [
          "Low",
          "Moderate",
          "High",
          "Imminent",
          "Unable to Assess",
        ],
      },
      {
        type: "textarea",
        label: "Risk Factors",
        name: "riskFactors",
      },
      {
        type: "textarea",
        label: "Protective Factors",
        name: "protectiveFactors",
      },
      {
        type: "textarea",
        label: "Safety Plan",
        name: "safetyPlan",
      },
    ],
  },

  // =========================================================
  // 25. FUNCTIONAL ASSESSMENT
  // =========================================================
  {
    title: "25. Functional Assessment",
    type: "checkbox",
    fields: [
      ["Difficulty With Self-Care", "selfCareDifficulty"],
      ["Difficulty With Work", "workDifficulty"],
      ["Difficulty With Studies", "studyDifficulty"],
      ["Difficulty With Relationships", "relationshipDifficulty"],
      ["Social Withdrawal", "functionalSocialWithdrawal"],
      ["Reduced Daily Activities", "reducedDailyActivities"],
      ["Financial Difficulties", "financialDifficulties"],
      ["Caregiver Dependence", "caregiverDependence"],
    ],
  },

  {
    title: "26. Functional Details",
    fields: [
      {
        type: "textarea",
        label: "Occupational Functioning",
        name: "occupationalFunctioning",
      },
      {
        type: "textarea",
        label: "Social Functioning",
        name: "socialFunctioning",
      },
      {
        type: "textarea",
        label: "Activities of Daily Living",
        name: "activitiesOfDailyLiving",
      },
      {
        type: "textarea",
        label: "Overall Functional Impact",
        name: "overallFunctionalImpact",
      },
    ],
  },

  // =========================================================
  // 27. PSYCHOSOCIAL ASSESSMENT
  // =========================================================
  {
    title: "27. Psychosocial Assessment",
    type: "checkbox",
    fields: [
      ["Family Stress", "familyStress"],
      ["Relationship Stress", "relationshipStress"],
      ["Work Stress", "workStress"],
      ["Academic Stress", "academicStress"],
      ["Financial Stress", "financialStress"],
      ["Legal Stress", "legalStress"],
      ["Bereavement", "bereavement"],
      ["Trauma Exposure", "traumaExposure"],
      ["Social Isolation", "socialIsolation"],
    ],
  },

  {
    title: "28. Psychosocial Details",
    fields: [
      {
        type: "textarea",
        label: "Current Stressors",
        name: "currentStressors",
      },
      {
        type: "textarea",
        label: "Support System",
        name: "supportSystem",
      },
      {
        type: "textarea",
        label: "Coping Strategies",
        name: "copingStrategies",
      },
      {
        type: "textarea",
        label: "Psychosocial Factors",
        name: "psychosocialFactors",
      },
    ],
  },

  // =========================================================
  // 29. SCREENING SCORES
  // =========================================================
  {
    title: "29. Screening & Assessment Scores",
    fields: [
      {
        type: "input",
        label: "PHQ-9 Score",
        name: "phq9Score",
      },
      {
        type: "input",
        label: "GAD-7 Score",
        name: "gad7Score",
      },
      {
        type: "input",
        label: "AUDIT Score",
        name: "auditScore",
      },
      {
        type: "input",
        label: "DAST Score",
        name: "dastScore",
      },
      {
        type: "input",
        label: "MoCA / MMSE Score",
        name: "cognitiveScreeningScore",
      },
      {
        type: "textarea",
        label: "Other Assessment Scores",
        name: "otherAssessmentScores",
      },
    ],
  },

  // =========================================================
  // 30. DIAGNOSIS
  // =========================================================
  {
    title: "30. Psychiatric Assessment & Diagnosis",
    fields: [
      {
        type: "textarea",
        label: "Clinical Formulation",
        name: "clinicalFormulation",
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
        label: "Diagnostic Impression",
        name: "diagnosticImpression",
      },
    ],
  },

  // =========================================================
  // 31. TREATMENT PLAN
  // =========================================================
  {
    title: "31. Treatment Plan",
    type: "checkbox",
    fields: [
      ["Medication Management", "medicationManagement"],
      ["Psychotherapy", "psychotherapy"],
      ["Behavioral Therapy", "behavioralTherapy"],
      ["Family Therapy", "familyTherapy"],
      ["Supportive Counselling", "supportiveCounselling"],
      ["Lifestyle Modification", "lifestyleModification"],
      ["Sleep Management", "sleepManagement"],
      ["Substance Use Intervention", "substanceUseIntervention"],
      ["Psychiatric Referral", "psychiatricReferral"],
      ["Psychological Assessment", "psychologicalAssessment"],
      ["Hospital Admission Considered", "hospitalAdmissionConsidered"],
    ],
  },

  {
    title: "32. Treatment Details",
    fields: [
      {
        type: "textarea",
        label: "Medication Plan",
        name: "medicationPlan",
      },
      {
        type: "textarea",
        label: "Psychotherapy Plan",
        name: "psychotherapyPlan",
      },
      {
        type: "textarea",
        label: "Behavioural Recommendations",
        name: "behavioralRecommendations",
      },
      {
        type: "textarea",
        label: "Lifestyle Recommendations",
        name: "lifestyleRecommendations",
      },
      {
        type: "textarea",
        label: "Patient / Family Counselling",
        name: "patientFamilyCounselling",
      },
    ],
  },

  // =========================================================
  // 33. EMERGENCY / SAFETY PLAN
  // =========================================================
  {
    title: "33. Safety Plan",
    fields: [
      {
        type: "textarea",
        label: "Warning Signs",
        name: "warningSigns",
      },
      {
        type: "textarea",
        label: "Coping Strategies",
        name: "safetyCopingStrategies",
      },
      {
        type: "textarea",
        label: "Support Persons",
        name: "supportPersons",
      },
      {
        type: "textarea",
        label: "Emergency / Crisis Plan",
        name: "emergencyCrisisPlan",
      },
      {
        type: "textarea",
        label: "Means Restriction / Safety Measures",
        name: "meansRestriction",
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
          "Routine Follow-up",
          "Medication Review",
          "Therapy Follow-up",
          "Risk Review",
          "Diagnostic Review",
          "Urgent Review",
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