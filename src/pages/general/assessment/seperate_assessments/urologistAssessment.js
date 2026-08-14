export const urologistSections = [
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
          "Preoperative Assessment",
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
      ["Difficulty Urinating", "difficultyUrinating"],
      ["Painful Urination", "dysuria"],
      ["Increased Frequency", "increasedFrequency"],
      ["Urgency", "urinaryUrgency"],
      ["Nocturia", "nocturia"],
      ["Blood in Urine", "hematuria"],
      ["Urinary Incontinence", "urinaryIncontinence"],
      ["Urinary Retention", "urinaryRetention"],
      ["Flank Pain", "flankPain"],
      ["Lower Abdominal Pain", "lowerAbdominalPain"],
      ["Pelvic Pain", "pelvicPain"],
      ["Kidney Stone Pain", "kidneyStonePain"],
      ["Fever / Chills", "feverChills"],
      ["Weak Urinary Stream", "weakUrinaryStream"],
      ["Hesitancy", "hesitancy"],
      ["Dribbling", "dribbling"],
      ["Incomplete Emptying", "incompleteEmptying"],
      ["Erectile Dysfunction", "erectileDysfunction"],
      ["Infertility", "infertility"],
      ["Scrotal Pain", "scrotalPain"],
      ["Testicular Swelling", "testicularSwelling"],
      ["Penile Discharge", "penileDischarge"],
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
        label: "Pain Characteristics",
        name: "painCharacteristics",
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
  // 4. URINARY SYMPTOMS
  // =========================================================
  {
    title: "4. Lower Urinary Tract Symptoms",
    type: "checkbox",
    fields: [
      ["Frequency", "lutFrequency"],
      ["Urgency", "lutUrgency"],
      ["Nocturia", "lutNocturia"],
      ["Dysuria", "lutDysuria"],
      ["Hesitancy", "lutHesitancy"],
      ["Weak Stream", "lutWeakStream"],
      ["Intermittency", "lutIntermittency"],
      ["Straining", "lutStraining"],
      ["Incomplete Emptying", "lutIncompleteEmptying"],
      ["Post-Void Dribbling", "postVoidDribbling"],
      ["Urinary Retention", "lutUrinaryRetention"],
      ["Urinary Incontinence", "lutUrinaryIncontinence"],
    ],
  },

  {
    title: "5. Urinary Symptom Details",
    fields: [
      {
        type: "input",
        label: "Daytime Frequency",
        name: "daytimeFrequency",
      },
      {
        type: "input",
        label: "Nighttime Frequency",
        name: "nighttimeFrequency",
      },
      {
        type: "input",
        label: "Urine Volume",
        name: "urineVolume",
      },
      {
        type: "textarea",
        label: "Stream Description",
        name: "streamDescription",
      },
      {
        type: "textarea",
        label: "Voiding Pattern",
        name: "voidingPattern",
      },
      {
        type: "textarea",
        label: "Incontinence Details",
        name: "incontinenceDetails",
      },
    ],
  },

  // =========================================================
  // 6. IPSS
  // =========================================================
  {
    title: "6. International Prostate Symptom Score (IPSS)",
    fields: [
      {
        type: "select",
        label: "Incomplete Emptying",
        name: "ipssIncompleteEmptying",
        options: ["0", "1", "2", "3", "4", "5"],
      },
      {
        type: "select",
        label: "Frequency",
        name: "ipssFrequency",
        options: ["0", "1", "2", "3", "4", "5"],
      },
      {
        type: "select",
        label: "Intermittency",
        name: "ipssIntermittency",
        options: ["0", "1", "2", "3", "4", "5"],
      },
      {
        type: "select",
        label: "Urgency",
        name: "ipssUrgency",
        options: ["0", "1", "2", "3", "4", "5"],
      },
      {
        type: "select",
        label: "Weak Stream",
        name: "ipssWeakStream",
        options: ["0", "1", "2", "3", "4", "5"],
      },
      {
        type: "select",
        label: "Straining",
        name: "ipssStraining",
        options: ["0", "1", "2", "3", "4", "5"],
      },
      {
        type: "select",
        label: "Nocturia",
        name: "ipssNocturia",
        options: ["0", "1", "2", "3", "4", "5"],
      },
      {
        type: "input",
        label: "Total IPSS Score",
        name: "ipssTotal",
        inputType: "number",
      },
      {
        type: "select",
        label: "Quality of Life",
        name: "ipssQualityOfLife",
        options: [
          "Delighted",
          "Pleased",
          "Mostly Satisfied",
          "Mixed",
          "Mostly Dissatisfied",
          "Unhappy",
          "Terrible",
        ],
      },
    ],
  },

  // =========================================================
  // 7. HEMATURIA
  // =========================================================
  {
    title: "7. Hematuria Assessment",
    type: "checkbox",
    fields: [
      ["Gross Hematuria", "grossHematuria"],
      ["Microscopic Hematuria", "microscopicHematuria"],
      ["Initial Hematuria", "initialHematuria"],
      ["Terminal Hematuria", "terminalHematuria"],
      ["Total Hematuria", "totalHematuria"],
      ["Blood Clots", "bloodClots"],
      ["Painful Hematuria", "painfulHematuria"],
      ["Painless Hematuria", "painlessHematuria"],
    ],
  },

  {
    title: "8. Hematuria Details",
    fields: [
      {
        type: "input",
        label: "Duration",
        name: "hematuriaDuration",
      },
      {
        type: "textarea",
        label: "Hematuria Pattern",
        name: "hematuriaPattern",
      },
      {
        type: "textarea",
        label: "Clot Description",
        name: "clotDescription",
      },
      {
        type: "textarea",
        label: "Previous Hematuria Evaluation",
        name: "previousHematuriaEvaluation",
      },
    ],
  },

  // =========================================================
  // 9. KIDNEY STONES
  // =========================================================
  {
    title: "9. Urolithiasis / Kidney Stone Assessment",
    type: "checkbox",
    fields: [
      ["Kidney Stone", "kidneyStone"],
      ["Ureteric Stone", "uretericStone"],
      ["Bladder Stone", "bladderStone"],
      ["Recurrent Stones", "recurrentStones"],
      ["Obstructing Stone", "obstructingStone"],
      ["Infected Stone", "infectedStone"],
      ["Staghorn Calculus", "staghornCalculus"],
      ["Bilateral Stones", "bilateralStones"],
    ],
  },

  {
    title: "10. Stone Details",
    fields: [
      {
        type: "select",
        label: "Stone Side",
        name: "stoneSide",
        options: ["Right", "Left", "Bilateral"],
      },
      {
        type: "input",
        label: "Stone Size",
        name: "stoneSize",
      },
      {
        type: "input",
        label: "Stone Location",
        name: "stoneLocation",
      },
      {
        type: "textarea",
        label: "Imaging Findings",
        name: "stoneImagingFindings",
      },
      {
        type: "textarea",
        label: "Hydronephrosis",
        name: "hydronephrosis",
      },
      {
        type: "textarea",
        label: "Previous Stone Treatment",
        name: "previousStoneTreatment",
      },
      {
        type: "textarea",
        label: "Stone Analysis",
        name: "stoneAnalysis",
      },
    ],
  },

  // =========================================================
  // 11. KIDNEY ASSESSMENT
  // =========================================================
  {
    title: "11. Kidney Assessment",
    type: "checkbox",
    fields: [
      ["Hydronephrosis", "kidneyHydronephrosis"],
      ["Hydroureter", "hydroureter"],
      ["Renal Cyst", "renalCyst"],
      ["Polycystic Kidney Disease", "polycysticKidneyDisease"],
      ["Renal Mass", "renalMass"],
      ["Renal Tumor", "renalTumor"],
      ["Renal Abscess", "renalAbscess"],
      ["Renal Trauma", "renalTrauma"],
      ["Renal Failure", "renalFailure"],
      ["Solitary Kidney", "solitaryKidney"],
      ["Congenital Renal Anomaly", "congenitalRenalAnomaly"],
    ],
  },

  {
    title: "12. Renal Findings",
    fields: [
      {
        type: "input",
        label: "Right Kidney Size",
        name: "rightKidneySize",
      },
      {
        type: "input",
        label: "Left Kidney Size",
        name: "leftKidneySize",
      },
      {
        type: "textarea",
        label: "Renal Imaging Findings",
        name: "renalImagingFindings",
      },
      {
        type: "textarea",
        label: "Renal Mass Details",
        name: "renalMassDetails",
      },
      {
        type: "textarea",
        label: "Renal Function",
        name: "renalFunction",
      },
    ],
  },

  // =========================================================
  // 13. PROSTATE
  // =========================================================
  {
    title: "13. Prostate Assessment",
    type: "checkbox",
    fields: [
      ["Benign Prostatic Hyperplasia", "bph"],
      ["Prostatitis", "prostatitis"],
      ["Prostate Cancer", "prostateCancer"],
      ["Prostate Nodule", "prostateNodule"],
      ["Elevated PSA", "elevatedPsa"],
      ["Prostatic Abscess", "prostaticAbscess"],
      ["Urinary Retention Due to Prostate", "prostateUrinaryRetention"],
    ],
  },

  {
    title: "14. Prostate Details",
    fields: [
      {
        type: "input",
        label: "PSA",
        name: "psa",
      },
      {
        type: "input",
        label: "Free PSA",
        name: "freePsa",
      },
      {
        type: "input",
        label: "Prostate Volume",
        name: "prostateVolume",
      },
      {
        type: "textarea",
        label: "DRE Findings",
        name: "dreFindings",
      },
      {
        type: "textarea",
        label: "Prostate Imaging",
        name: "prostateImaging",
      },
      {
        type: "textarea",
        label: "Prostate Biopsy Findings",
        name: "prostateBiopsyFindings",
      },
      {
        type: "textarea",
        label: "Gleason Score",
        name: "gleasonScore",
      },
      {
        type: "textarea",
        label: "Prostate Cancer Stage",
        name: "prostateCancerStage",
      },
    ],
  },

  // =========================================================
  // 15. BLADDER
  // =========================================================
  {
    title: "15. Bladder Assessment",
    type: "checkbox",
    fields: [
      ["Urinary Tract Infection", "uti"],
      ["Recurrent UTI", "recurrentUti"],
      ["Bladder Stone", "bladderStoneAssessment"],
      ["Bladder Tumor", "bladderTumor"],
      ["Bladder Cancer", "bladderCancer"],
      ["Overactive Bladder", "overactiveBladder"],
      ["Neurogenic Bladder", "neurogenicBladder"],
      ["Bladder Diverticulum", "bladderDiverticulum"],
      ["Interstitial Cystitis", "interstitialCystitis"],
      ["Bladder Outlet Obstruction", "bladderOutletObstruction"],
    ],
  },

  {
    title: "16. Bladder Details",
    fields: [
      {
        type: "textarea",
        label: "Bladder Symptoms",
        name: "bladderSymptoms",
      },
      {
        type: "textarea",
        label: "Cystoscopy Findings",
        name: "cystoscopyFindings",
      },
      {
        type: "textarea",
        label: "Bladder Imaging",
        name: "bladderImaging",
      },
      {
        type: "input",
        label: "Post Void Residual (mL)",
        name: "postVoidResidual",
        inputType: "number",
      },
      {
        type: "textarea",
        label: "Urine Cytology",
        name: "urineCytology",
      },
    ],
  },

  // =========================================================
  // 17. UTI
  // =========================================================
  {
    title: "17. Urinary Tract Infection Assessment",
    type: "checkbox",
    fields: [
      ["Lower UTI", "lowerUti"],
      ["Upper UTI", "upperUti"],
      ["Pyelonephritis", "pyelonephritis"],
      ["Recurrent UTI", "utiRecurrent"],
      ["Complicated UTI", "complicatedUti"],
      ["Uncomplicated UTI", "uncomplicatedUti"],
      ["Urosepsis", "urosepsis"],
      ["Catheter Associated UTI", "catheterAssociatedUti"],
    ],
  },

  {
    title: "18. UTI Details",
    fields: [
      {
        type: "textarea",
        label: "Urine Routine Findings",
        name: "urineRoutineFindings",
      },
      {
        type: "textarea",
        label: "Urine Culture",
        name: "urineCulture",
      },
      {
        type: "textarea",
        label: "Organism",
        name: "utiOrganism",
      },
      {
        type: "textarea",
        label: "Antibiotic Sensitivity",
        name: "antibioticSensitivity",
      },
      {
        type: "textarea",
        label: "Previous UTI Episodes",
        name: "previousUtiEpisodes",
      },
    ],
  },

  // =========================================================
  // 19. MALE SEXUAL HEALTH
  // =========================================================
  {
    title: "19. Male Sexual Health",
    type: "checkbox",
    fields: [
      ["Erectile Dysfunction", "maleErectileDysfunction"],
      ["Premature Ejaculation", "prematureEjaculation"],
      ["Low Libido", "lowLibido"],
      ["Ejaculatory Dysfunction", "ejaculatoryDysfunction"],
      ["Retrograde Ejaculation", "retrogradeEjaculation"],
      ["Penile Curvature", "penileCurvature"],
      ["Peyronie's Disease", "peyroniesDisease"],
      ["Priapism", "priapism"],
    ],
  },

  {
    title: "20. Sexual Function Details",
    fields: [
      {
        type: "textarea",
        label: "Erectile Function History",
        name: "erectileFunctionHistory",
      },
      {
        type: "select",
        label: "Erection Quality",
        name: "erectionQuality",
        options: [
          "Normal",
          "Mildly Reduced",
          "Moderately Reduced",
          "Severely Reduced",
        ],
      },
      {
        type: "textarea",
        label: "Previous ED Treatment",
        name: "previousEdTreatment",
      },
      {
        type: "textarea",
        label: "Sexual Function Concerns",
        name: "sexualFunctionConcerns",
      },
    ],
  },

  // =========================================================
  // 21. MALE INFERTILITY
  // =========================================================
  {
    title: "21. Male Infertility Assessment",
    type: "checkbox",
    fields: [
      ["Primary Infertility", "primaryInfertility"],
      ["Secondary Infertility", "secondaryInfertility"],
      ["Azoospermia", "azoospermia"],
      ["Oligospermia", "oligospermia"],
      ["Asthenozoospermia", "asthenozoospermia"],
      ["Teratozoospermia", "teratozoospermia"],
      ["Varicocele", "varicocele"],
      ["Testicular Atrophy", "testicularAtrophy"],
      ["Hormonal Abnormality", "infertilityHormonalAbnormality"],
    ],
  },

  {
    title: "22. Semen Analysis",
    fields: [
      {
        type: "input",
        label: "Semen Volume",
        name: "semenVolume",
      },
      {
        type: "input",
        label: "Sperm Concentration",
        name: "spermConcentration",
      },
      {
        type: "input",
        label: "Total Sperm Count",
        name: "totalSpermCount",
      },
      {
        type: "input",
        label: "Motility",
        name: "spermMotility",
      },
      {
        type: "input",
        label: "Progressive Motility",
        name: "progressiveMotility",
      },
      {
        type: "input",
        label: "Morphology",
        name: "spermMorphology",
      },
      {
        type: "textarea",
        label: "Semen Analysis Impression",
        name: "semenAnalysisImpression",
      },
    ],
  },

  // =========================================================
  // 23. SCROTAL / TESTICULAR
  // =========================================================
  {
    title: "23. Scrotal & Testicular Assessment",
    type: "checkbox",
    fields: [
      ["Testicular Pain", "testicularPain"],
      ["Testicular Mass", "testicularMass"],
      ["Testicular Cancer", "testicularCancer"],
      ["Epididymitis", "epididymitis"],
      ["Orchitis", "orchitis"],
      ["Hydrocele", "hydrocele"],
      ["Varicocele", "scrotalVaricocele"],
      ["Spermatocele", "spermatocele"],
      ["Testicular Torsion", "testicularTorsion"],
      ["Undescended Testis", "undescendedTestis"],
      ["Epididymal Cyst", "epididymalCyst"],
    ],
  },

  {
    title: "24. Testicular Examination",
    fields: [
      {
        type: "textarea",
        label: "Right Testis Findings",
        name: "rightTestisFindings",
      },
      {
        type: "textarea",
        label: "Left Testis Findings",
        name: "leftTestisFindings",
      },
      {
        type: "textarea",
        label: "Epididymis Findings",
        name: "epididymisFindings",
      },
      {
        type: "textarea",
        label: "Scrotal Ultrasound",
        name: "scrotalUltrasound",
      },
      {
        type: "textarea",
        label: "Testicular Mass Details",
        name: "testicularMassDetails",
      },
    ],
  },

  // =========================================================
  // 25. PENILE ASSESSMENT
  // =========================================================
  {
    title: "25. Penile Assessment",
    type: "checkbox",
    fields: [
      ["Phimosis", "phimosis"],
      ["Paraphimosis", "paraphimosis"],
      ["Balanitis", "balanitis"],
      ["Penile Lesion", "penileLesion"],
      ["Penile Cancer", "penileCancer"],
      ["Penile Curvature", "penileCurvatureAssessment"],
      ["Urethral Discharge", "urethralDischarge"],
      ["Urethral Stricture", "penileUrethralStricture"],
    ],
  },

  {
    title: "26. Penile Examination",
    fields: [
      {
        type: "textarea",
        label: "Penile Examination Findings",
        name: "penileExaminationFindings",
      },
      {
        type: "textarea",
        label: "Lesion Description",
        name: "penileLesionDescription",
      },
      {
        type: "textarea",
        label: "Penile Curvature Details",
        name: "penileCurvatureDetails",
      },
      {
        type: "textarea",
        label: "Urethral Findings",
        name: "urethralFindings",
      },
    ],
  },

  // =========================================================
  // 27. URETHRAL STRICTURE
  // =========================================================
  {
    title: "27. Urethral Stricture Assessment",
    type: "checkbox",
    fields: [
      ["Urethral Stricture", "urethralStricture"],
      ["Meatal Stenosis", "meatalStenosis"],
      ["Bulbar Stricture", "bulbarStricture"],
      ["Penile Stricture", "penileStricture"],
      ["Posterior Urethral Stricture", "posteriorUrethralStricture"],
      ["Recurrent Stricture", "recurrentStricture"],
    ],
  },

  {
    title: "28. Urethral Details",
    fields: [
      {
        type: "input",
        label: "Stricture Location",
        name: "strictureLocation",
      },
      {
        type: "input",
        label: "Stricture Length",
        name: "strictureLength",
      },
      {
        type: "textarea",
        label: "Urethrogram Findings",
        name: "urethrogramFindings",
      },
      {
        type: "textarea",
        label: "Urethroscopy Findings",
        name: "urethroscopyFindings",
      },
      {
        type: "textarea",
        label: "Previous Stricture Treatment",
        name: "previousStrictureTreatment",
      },
    ],
  },

  // =========================================================
  // 29. FEMALE UROLOGY
  // =========================================================
  {
    title: "29. Female Urology Assessment",
    type: "checkbox",
    fields: [
      ["Stress Urinary Incontinence", "stressUrinaryIncontinence"],
      ["Urge Incontinence", "urgeIncontinence"],
      ["Mixed Incontinence", "mixedIncontinence"],
      ["Pelvic Organ Prolapse", "pelvicOrganProlapse"],
      ["Recurrent UTI", "femaleRecurrentUti"],
      ["Interstitial Cystitis", "femaleInterstitialCystitis"],
      ["Voiding Dysfunction", "femaleVoidingDysfunction"],
      ["Urinary Fistula", "urinaryFistula"],
    ],
  },

  {
    title: "30. Female Urinary Assessment",
    fields: [
      {
        type: "textarea",
        label: "Incontinence History",
        name: "femaleIncontinenceHistory",
      },
      {
        type: "textarea",
        label: "Incontinence Triggers",
        name: "incontinenceTriggers",
      },
      {
        type: "textarea",
        label: "Pelvic Organ Prolapse Findings",
        name: "prolapseFindings",
      },
      {
        type: "textarea",
        label: "Urodynamic Findings",
        name: "urodynamicFindings",
      },
      {
        type: "textarea",
        label: "Previous Pelvic Surgery",
        name: "previousPelvicSurgery",
      },
    ],
  },

  // =========================================================
  // 31. URODYNAMIC ASSESSMENT
  // =========================================================
  {
    title: "31. Urodynamic Assessment",
    fields: [
      {
        type: "input",
        label: "Maximum Flow Rate (Qmax)",
        name: "qmax",
      },
      {
        type: "input",
        label: "Average Flow Rate",
        name: "averageFlowRate",
      },
      {
        type: "input",
        label: "Voided Volume",
        name: "voidedVolume",
      },
      {
        type: "input",
        label: "Post Void Residual",
        name: "urodynamicPvr",
      },
      {
        type: "textarea",
        label: "Detrusor Function",
        name: "detrusorFunction",
      },
      {
        type: "textarea",
        label: "Bladder Capacity",
        name: "bladderCapacity",
      },
      {
        type: "textarea",
        label: "Compliance",
        name: "bladderCompliance",
      },
      {
        type: "textarea",
        label: "Urodynamic Impression",
        name: "urodynamicImpression",
      },
    ],
  },

  // =========================================================
  // 32. CANCER ASSESSMENT
  // =========================================================
  {
    title: "32. Urological Oncology",
    type: "checkbox",
    fields: [
      ["Renal Cell Carcinoma", "renalCellCarcinoma"],
      ["Bladder Cancer", "urologicalBladderCancer"],
      ["Prostate Cancer", "urologicalProstateCancer"],
      ["Testicular Cancer", "urologicalTesticularCancer"],
      ["Penile Cancer", "urologicalPenileCancer"],
      ["Upper Tract Urothelial Cancer", "upperTractUrothelialCancer"],
      ["Metastatic Disease", "urologicalMetastaticDisease"],
    ],
  },

  {
    title: "33. Cancer Staging",
    fields: [
      {
        type: "textarea",
        label: "Primary Tumor",
        name: "primaryTumor",
      },
      {
        type: "textarea",
        label: "Regional Nodes",
        name: "regionalNodes",
      },
      {
        type: "textarea",
        label: "Metastasis",
        name: "metastasis",
      },
      {
        type: "textarea",
        label: "TNM Stage",
        name: "urologicalTnmStage",
      },
      {
        type: "textarea",
        label: "Histopathology",
        name: "urologicalHistopathology",
      },
      {
        type: "textarea",
        label: "Tumor Grade",
        name: "urologicalTumorGrade",
      },
    ],
  },

  // =========================================================
  // 34. IMAGING
  // =========================================================
  {
    title: "34. Urological Imaging",
    type: "checkbox",
    fields: [
      ["Ultrasound", "ultrasound"],
      ["CT Scan", "ctScan"],
      ["CT Urogram", "ctUrogram"],
      ["MRI", "mri"],
      ["MRI Prostate", "mriProstate"],
      ["PET Scan", "petScan"],
      ["Renal Doppler", "renalDoppler"],
      ["Scrotal Ultrasound", "imagingScrotalUltrasound"],
      ["Retrograde Urethrogram", "retrogradeUrethrogram"],
      ["VCUG", "vcug"],
      ["Nuclear Renal Scan", "nuclearRenalScan"],
    ],
  },

  {
    title: "35. Imaging Findings",
    fields: [
      {
        type: "textarea",
        label: "Imaging Summary",
        name: "imagingSummary",
      },
      {
        type: "textarea",
        label: "Important Findings",
        name: "importantImagingFindings",
      },
      {
        type: "textarea",
        label: "Imaging Impression",
        name: "imagingImpression",
      },
    ],
  },

  // =========================================================
  // 36. LABORATORY INVESTIGATIONS
  // =========================================================
  {
    title: "36. Laboratory Investigations",
    fields: [
      {
        type: "input",
        label: "Hemoglobin",
        name: "hemoglobin",
      },
      {
        type: "input",
        label: "WBC Count",
        name: "wbcCount",
      },
      {
        type: "input",
        label: "Platelet Count",
        name: "plateletCount",
      },
      {
        type: "input",
        label: "Serum Creatinine",
        name: "creatinine",
      },
      {
        type: "input",
        label: "Blood Urea",
        name: "bloodUrea",
      },
      {
        type: "input",
        label: "eGFR",
        name: "egfr",
      },
      {
        type: "input",
        label: "Sodium",
        name: "sodium",
      },
      {
        type: "input",
        label: "Potassium",
        name: "potassium",
      },
      {
        type: "input",
        label: "Calcium",
        name: "calcium",
      },
      {
        type: "input",
        label: "Uric Acid",
        name: "uricAcid",
      },
      {
        type: "input",
        label: "PSA",
        name: "labPsa",
      },
      {
        type: "textarea",
        label: "Urinalysis",
        name: "urinalysis",
      },
      {
        type: "textarea",
        label: "Urine Culture",
        name: "labUrineCulture",
      },
      {
        type: "textarea",
        label: "Other Laboratory Findings",
        name: "otherLabFindings",
      },
    ],
  },

  // =========================================================
  // 37. MEDICAL HISTORY
  // =========================================================
  {
    title: "37. Past Medical History",
    type: "checkbox",
    fields: [
      ["Diabetes Mellitus", "diabetes"],
      ["Hypertension", "hypertension"],
      ["Chronic Kidney Disease", "ckd"],
      ["Heart Disease", "heartDisease"],
      ["Stroke", "stroke"],
      ["Neurological Disease", "neurologicalDisease"],
      ["Tuberculosis", "tuberculosis"],
      ["Recurrent UTI", "medicalRecurrentUti"],
      ["Kidney Disease", "kidneyDisease"],
      ["Previous Cancer", "previousCancer"],
    ],
  },

  // =========================================================
  // 38. SURGICAL HISTORY
  // =========================================================
  {
    title: "38. Previous Surgical History",
    fields: [
      {
        type: "textarea",
        label: "Previous Urological Surgeries",
        name: "previousUrologicalSurgeries",
      },
      {
        type: "textarea",
        label: "Previous Kidney Surgery",
        name: "previousKidneySurgery",
      },
      {
        type: "textarea",
        label: "Previous Bladder Surgery",
        name: "previousBladderSurgery",
      },
      {
        type: "textarea",
        label: "Previous Prostate Surgery",
        name: "previousProstateSurgery",
      },
      {
        type: "textarea",
        label: "Previous Urethral Surgery",
        name: "previousUrethralSurgery",
      },
      {
        type: "textarea",
        label: "Other Surgeries",
        name: "otherSurgeries",
      },
      {
        type: "textarea",
        label: "Surgical Complications",
        name: "surgicalComplications",
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
        placeholder: "Medicine, dose, frequency, duration",
      },
      {
        type: "textarea",
        label: "Alpha Blockers",
        name: "alphaBlockers",
      },
      {
        type: "textarea",
        label: "5-Alpha Reductase Inhibitors",
        name: "fiveAlphaReductaseInhibitors",
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
        label: "ED Medication",
        name: "edMedication",
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
  // 40. PREOPERATIVE ASSESSMENT
  // =========================================================
  {
    title: "40. Preoperative Assessment",
    type: "checkbox",
    fields: [
      ["Low Surgical Risk", "lowSurgicalRisk"],
      ["Intermediate Surgical Risk", "intermediateSurgicalRisk"],
      ["High Surgical Risk", "highSurgicalRisk"],
      ["Anesthesia Risk", "anesthesiaRisk"],
      ["Bleeding Risk", "bleedingRisk"],
      ["Infection Risk", "infectionRisk"],
      ["Renal Risk", "renalRisk"],
      ["Cardiac Risk", "cardiacRisk"],
      ["Requires Medical Optimization", "requiresMedicalOptimization"],
    ],
  },

  {
    title: "41. Preoperative Details",
    fields: [
      {
        type: "textarea",
        label: "Preoperative Diagnosis",
        name: "preoperativeDiagnosis",
      },
      {
        type: "textarea",
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
        label: "Surgical Risks Discussed",
        name: "surgicalRisksDiscussed",
      },
    ],
  },

  // =========================================================
  // 42. UROLOGICAL PROCEDURES
  // =========================================================
  {
    title: "42. Planned Urological Procedure",
    type: "checkbox",
    fields: [
      ["TURP", "turp"],
      ["TURBT", "turbt"],
      ["TURB", "turb"],
      ["Ureteroscopy", "ureteroscopy"],
      ["Lithotripsy", "lithotripsy"],
      ["PCNL", "pcnl"],
      ["ESWL", "eswl"],
      ["Nephrectomy", "nephrectomy"],
      ["Partial Nephrectomy", "partialNephrectomy"],
      ["Radical Prostatectomy", "radicalProstatectomy"],
      ["Cystectomy", "cystectomy"],
      ["Urethroplasty", "urethroplasty"],
      ["Orchiectomy", "orchiectomy"],
      ["Hydrocelectomy", "hydrocelectomy"],
      ["Varicocelectomy", "varicocelectomy"],
      ["Circumcision", "circumcision"],
      ["Urological Stenting", "urologicalStenting"],
    ],
  },

  // =========================================================
  // 43. OPERATIVE DETAILS
  // =========================================================
  {
    title: "43. Operative Details",
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
        label: "Specimen",
        name: "specimen",
      },
      {
        type: "textarea",
        label: "Implant / Stent Details",
        name: "implantStentDetails",
      },
      {
        type: "textarea",
        label: "Catheter Details",
        name: "catheterDetails",
      },
      {
        type: "textarea",
        label: "Intraoperative Complications",
        name: "intraoperativeComplications",
      },
    ],
  },

  // =========================================================
  // 44. POSTOPERATIVE ASSESSMENT
  // =========================================================
  {
    title: "44. Postoperative Assessment",
    type: "checkbox",
    fields: [
      ["Hematuria", "postoperativeHematuria"],
      ["Urinary Retention", "postoperativeUrinaryRetention"],
      ["UTI", "postoperativeUti"],
      ["Fever", "postoperativeFever"],
      ["Bleeding", "postoperativeBleeding"],
      ["Wound Infection", "postoperativeWoundInfection"],
      ["Urine Leak", "urineLeak"],
      ["Ureteric Injury", "uretericInjury"],
      ["Bladder Injury", "bladderInjury"],
      ["Renal Dysfunction", "postoperativeRenalDysfunction"],
      ["Erectile Dysfunction", "postoperativeErectileDysfunction"],
      ["Other Complication", "otherPostoperativeComplication"],
    ],
  },

  // =========================================================
  // 45. CATHETER / STENT
  // =========================================================
  {
    title: "45. Catheter & Stent Assessment",
    fields: [
      {
        type: "select",
        label: "Catheter Status",
        name: "catheterStatus",
        options: [
          "Not Present",
          "Foley Catheter",
          "Suprapubic Catheter",
          "Intermittent Catheterization",
        ],
      },
      {
        type: "input",
        label: "Catheter Size",
        name: "catheterSize",
      },
      {
        type: "input",
        label: "Catheter Date",
        name: "catheterDate",
        inputType: "date",
      },
      {
        type: "select",
        label: "Ureteric Stent",
        name: "uretericStent",
        options: [
          "None",
          "Right",
          "Left",
          "Bilateral",
        ],
      },
      {
        type: "input",
        label: "Stent Placement Date",
        name: "stentPlacementDate",
        inputType: "date",
      },
      {
        type: "input",
        label: "Planned Stent Removal Date",
        name: "plannedStentRemovalDate",
        inputType: "date",
      },
      {
        type: "textarea",
        label: "Catheter / Stent Notes",
        name: "catheterStentNotes",
      },
    ],
  },

  // =========================================================
  // 46. ASSESSMENT & DIAGNOSIS
  // =========================================================
  {
    title: "46. Assessment & Diagnosis",
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
        label: "Urological Diagnosis",
        name: "urologicalDiagnosis",
      },
      {
        type: "textarea",
        label: "Differential Diagnosis",
        name: "differentialDiagnosis",
      },
      {
        type: "textarea",
        label: "Overall Assessment",
        name: "overallAssessment",
      },
    ],
  },

  // =========================================================
  // 47. TREATMENT PLAN
  // =========================================================
  {
    title: "47. Treatment Plan",
    fields: [
      {
        type: "textarea",
        label: "Medical Management",
        name: "medicalManagement",
      },
      {
        type: "textarea",
        label: "Surgical Management",
        name: "surgicalManagement",
      },
      {
        type: "textarea",
        label: "Medication Plan",
        name: "medicationPlan",
      },
      {
        type: "textarea",
        label: "Dietary Advice",
        name: "dietaryAdvice",
      },
      {
        type: "textarea",
        label: "Fluid Intake Advice",
        name: "fluidIntakeAdvice",
      },
      {
        type: "textarea",
        label: "Stone Prevention Advice",
        name: "stonePreventionAdvice",
      },
      {
        type: "textarea",
        label: "Pelvic Floor Therapy",
        name: "pelvicFloorTherapy",
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
  // 48. FOLLOW-UP
  // =========================================================
  {
    title: "48. Follow-up",
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
          "Stone Follow-up",
          "Prostate Review",
          "Cancer Follow-up",
          "Catheter Review",
          "Stent Removal",
          "Imaging Review",
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