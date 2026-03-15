// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 4 — Ortho, Ophthalmology, ENT, Dermatology, Psychiatry, Radiology
// ═══════════════════════════════════════════════════════════════════════════════

import { topic, histo, radio, type Topic } from './types';

export const year4Topics: Topic[] = [

  // ════════════════════════════════════════════════════════════════════════════
  // ORTHOPAEDICS
  // ════════════════════════════════════════════════════════════════════════════

  topic('ortho', 'ortho-trauma', '⭐ Fracture — Classification & Healing'),
  topic('ortho', 'ortho-trauma', 'Colles Fracture'),
  topic('ortho', 'ortho-trauma', '⭐ Fracture Neck of Femur'),
  topic('ortho', 'ortho-trauma', 'Supracondylar Fracture — Humerus'),
  topic('ortho', 'ortho-trauma', 'Spine Injuries'),
  topic('ortho', 'ortho-trauma', 'Pelvic Fractures'),
  topic('ortho', 'ortho-general', 'Osteoarthritis vs Rheumatoid'),
  topic('ortho', 'ortho-general', 'Bone Tumors — Classification'),
  topic('ortho', 'ortho-general', 'Tuberculosis of Spine — Potts'),
  topic('ortho', 'ortho-general', 'Congenital Disorders — CTEV, DDH'),
  radio('ortho', 'ortho-trauma', 'X-ray — Common Fracture Patterns'),
  radio('ortho', 'ortho-trauma', 'X-ray — Spine Injuries'),

  // ════════════════════════════════════════════════════════════════════════════
  // OPHTHALMOLOGY
  // ════════════════════════════════════════════════════════════════════════════

  topic('ophthalmology', 'ophthal-ant', 'Conjunctivitis — Types'),
  topic('ophthalmology', 'ophthal-ant', '⭐ Corneal Ulcer'),
  topic('ophthalmology', 'ophthal-ant', '⭐ Cataract — Types & Management'),
  topic('ophthalmology', 'ophthal-ant', '⭐ Glaucoma — Classification'),
  topic('ophthalmology', 'ophthal-post', 'Diabetic Retinopathy'),
  topic('ophthalmology', 'ophthal-post', 'Retinal Detachment'),
  topic('ophthalmology', 'ophthal-post', 'Papilledema'),
  topic('ophthalmology', 'ophthal-general', 'Refractive Errors'),
  topic('ophthalmology', 'ophthal-general', 'Squint — Types'),
  topic('ophthalmology', 'ophthal-general', 'Eye Injuries — Management'),

  // ════════════════════════════════════════════════════════════════════════════
  // ENT
  // ════════════════════════════════════════════════════════════════════════════

  topic('ent', 'ent-ear', '⭐ ASOM & CSOM'),
  topic('ent', 'ent-ear', 'Cholesteatoma'),
  topic('ent', 'ent-ear', 'Hearing Loss — Classification'),
  topic('ent', 'ent-ear', 'Otosclerosis'),
  topic('ent', 'ent-nose', 'Deviated Nasal Septum'),
  topic('ent', 'ent-nose', 'Sinusitis — Acute & Chronic'),
  topic('ent', 'ent-nose', '⭐ Epistaxis — Management'),
  topic('ent', 'ent-nose', 'Nasal Polyps'),
  topic('ent', 'ent-throat', 'Tonsillitis — Acute & Chronic'),
  topic('ent', 'ent-throat', '⭐ Tracheostomy — Indications'),
  topic('ent', 'ent-throat', 'Laryngeal Carcinoma'),
  topic('ent', 'ent-throat', 'Foreign Body — Airway & Esophagus'),

  // ════════════════════════════════════════════════════════════════════════════
  // DERMATOLOGY
  // ════════════════════════════════════════════════════════════════════════════

  topic('dermatology', 'derm-general', '⭐ Psoriasis'),
  topic('dermatology', 'derm-general', 'Eczema — Types'),
  topic('dermatology', 'derm-general', 'Lichen Planus'),
  topic('dermatology', 'derm-general', 'Pemphigus & Pemphigoid'),
  topic('dermatology', 'derm-general', 'Drug Reactions — SJS, TEN'),
  topic('dermatology', 'derm-infect', 'Dermatophytosis'),
  topic('dermatology', 'derm-infect', '⭐ Leprosy — Classification'),
  topic('dermatology', 'derm-infect', 'Scabies'),
  topic('dermatology', 'derm-infect', 'STIs — Syphilis, Gonorrhea'),
  histo('dermatology', 'derm-general', 'Skin Biopsy — Psoriasis vs Eczema'),

  // ════════════════════════════════════════════════════════════════════════════
  // PSYCHIATRY
  // ════════════════════════════════════════════════════════════════════════════

  topic('psychiatry', 'psych-general', 'Mental Status Examination'),
  topic('psychiatry', 'psych-general', 'Classification — ICD & DSM'),
  topic('psychiatry', 'psych-disorders', '⭐ Schizophrenia'),
  topic('psychiatry', 'psych-disorders', 'Mood Disorders — Depression, Mania'),
  topic('psychiatry', 'psych-disorders', 'Anxiety Disorders'),
  topic('psychiatry', 'psych-disorders', 'OCD'),
  topic('psychiatry', 'psych-disorders', 'Substance Use Disorders'),
  topic('psychiatry', 'psych-disorders', 'Delirium vs Dementia'),

  // ════════════════════════════════════════════════════════════════════════════
  // RADIOLOGY (subject)
  // ════════════════════════════════════════════════════════════════════════════

  topic('radiology_sub', 'radio-general', 'X-ray — Physics & Safety'),
  topic('radiology_sub', 'radio-general', 'CT vs MRI — Principles'),
  topic('radiology_sub', 'radio-general', 'USG — Basic Principles'),
  topic('radiology_sub', 'radio-systemic', '⭐ Chest X-ray — Interpretation'),
  topic('radiology_sub', 'radio-systemic', 'Abdominal X-ray — Interpretation'),
  topic('radiology_sub', 'radio-systemic', 'Skeletal Radiology — Fractures'),
  topic('radiology_sub', 'radio-systemic', 'Neuroradiology — CT Head'),
  radio('radiology_sub', 'radio-systemic', 'CXR — Cardiomegaly'),
  radio('radiology_sub', 'radio-systemic', 'CXR — Pneumothorax'),
  radio('radiology_sub', 'radio-systemic', 'CT Abdomen — Common Findings'),
];
