import { anesthesiologistAssessmentSections } from "./seperate_assessments/anesthesiologistAssessment";
import { cardiologistSections } from "./seperate_assessments/cardiologistAssessment";
import { cardiothoracicSurgeonSections } from "./seperate_assessments/cardiothoracicSurgeonAssessment";
import { dentistAssessmentSections } from "./seperate_assessments/dentistAssessment";
import { dermatologistSections } from "./seperate_assessments/dermatologistAssessment";
import { endocrinologistSections } from "./seperate_assessments/endocrinologistAssessment";
import { entAssessmentSections } from "./seperate_assessments/entAssessment";
import { gastroenterologistSections } from "./seperate_assessments/gastroenterologistAssessment";
import { generalSurgeonSections } from "./seperate_assessments/generalSurgeonAssessment";
import { nephrologistSections } from "./seperate_assessments/nephrologistAssessment";
import { neurosurgeonSections } from "./seperate_assessments/neurosurgeonAssessment";
import { obGynAssessmentSections } from "./seperate_assessments/obstetricsAndGynecologyAssessment";
import { oncologistAssessmentSections } from "./seperate_assessments/oncologistAssessment";
import { ophthalmologistSections } from "./seperate_assessments/ophthalmologistAssessment";
import { orthopedicSurgeonSections } from "./seperate_assessments/orthopedicSurgeonAssessment";
import { pediatricianAssessmentSections } from "./seperate_assessments/pediatricianAssessment";
import { psychiatristAssessmentSections } from "./seperate_assessments/psychiatristAssessment";
import { pulmonologistSections } from "./seperate_assessments/pulmonologistAssessment";
import { rheumatologistSections } from "./seperate_assessments/rheumatologistAssessment";
import { urologistSections } from "./seperate_assessments/urologistAssessment";

export const generalPhysicianSections = [
  {
    title: "General Medicine",
    fields: [
      {
        type: "textarea",
        label: "General Symptoms & Notes",
        name: "generalSymptoms",
        placeholder: "Notes on general symptoms, duration, onset...",
      },
    ],
  },
  {
    title: "Systemic Examination",
    fields: [
      {
        type: "input",
        label: "CVS (Cardiovascular System)",
        name: "cvs",
        placeholder: "S1 S2 heard, murmurs...",
      },
      {
        type: "input",
        label: "RS (Respiratory System)",
        name: "rs",
        placeholder: "Bilateral clear air entry, wheeze, creps...",
      },
      {
        type: "input",
        label: "CNS (Central Nervous System)",
        name: "cns",
        placeholder: "Conscious, oriented, pupils...",
      },
      {
        type: "input",
        label: "P/A (Per Abdomen)",
        name: "pa",
        placeholder: "Soft, non-tender, organomegaly...",
      },
    ],
  },
];

export const physiotherapistSections = [
  {
    title: "Physiotherapy & Rehabilitation Assessment",
    fields: [
      {
        type: "input",
        label: "Range of Motion (ROM)",
        name: "physioRom",
        placeholder: "Active/passive degrees, joint restriction...",
      },
      {
        type: "input",
        label: "Muscle Strength (MRC Grade)",
        name: "physioStrength",
        placeholder: "Grade 0 to 5 for major muscle groups...",
      },
      {
        type: "input",
        label: "Functional Mobility & Gait",
        name: "physioMobility",
        placeholder: "Independent, assisted gait, balance issues...",
      },
      {
        type: "input",
        label: "Pain Trigger Points & Description",
        name: "physioPainTrigger",
        placeholder: "Tender points, nature of pain (dull/sharp/shooting)...",
      },
    ],
  },
];

export const neurologistSections = [
  {
    title: "Neurological Examination",
    fields: [
      {
        type: "input",
        label: "Cranial Nerve Exam",
        name: "neuroCranialNerves",
        placeholder: "CN I to XII status, deficits...",
      },
      {
        type: "input",
        label: "Reflexes & Motor System",
        name: "neuroReflexes",
        placeholder: "DTRs (biceps, patellar), tone, power...",
      },
      {
        type: "input",
        label: "Gait, Coordination & Balance",
        name: "neuroGaitBalance",
        placeholder: "Romberg test, finger-to-nose coordination...",
      },
      {
        type: "input",
        label: "Sensory System Examination",
        name: "neuroSensory",
        placeholder: "Touch, pain, vibration, proprioception...",
      },
    ],
  },
];

export const departmentSectionsMap = {
  "General Physician": generalPhysicianSections,
  Dentist: dentistAssessmentSections,
  Dermatologist: dermatologistSections,
  "ENT Specialist": entAssessmentSections,
  Ophthalmologist: ophthalmologistSections,
  Cardiologist: cardiologistSections,
  Orthopedic: orthopedicSurgeonSections,
  "Orthopedic Surgeon": orthopedicSurgeonSections,
  Gynecologist: obGynAssessmentSections,
  "Obstetrics and Gynecology": obGynAssessmentSections,
  Pediatrician: pediatricianAssessmentSections,
  Endocrinologist: endocrinologistSections,
  Psychiatrist: psychiatristAssessmentSections,
  Physiotherapist: physiotherapistSections,
  Neurologist: neurologistSections,
  Gastroenterologist: gastroenterologistSections,
  Urologist: urologistSections,
  Pulmonologist: pulmonologistSections,
  Oncologist: oncologistAssessmentSections,
  Nephrologist: nephrologistSections,
  Anesthesiologist: anesthesiologistAssessmentSections,
  "Cardiothoracic Surgeon": cardiothoracicSurgeonSections,
  "General Surgeon": generalSurgeonSections,
  Neurosurgeon: neurosurgeonSections,
  Rheumatologist: rheumatologistSections,
};

export const departmentList = Object.keys(departmentSectionsMap);
