// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 3 — Medicine, Surgery, OBG, Pediatrics
// ═══════════════════════════════════════════════════════════════════════════════

import { topic, radio, type Topic } from './types';

export const year3Topics: Topic[] = [

  // ════════════════════════════════════════════════════════════════════════════
  // MEDICINE
  // ════════════════════════════════════════════════════════════════════════════

  topic('medicine', 'med-cvs', 'Hypertension — Management'),
  topic('medicine', 'med-cvs', '⭐ Ischemic Heart Disease'),
  topic('medicine', 'med-cvs', 'Congestive Heart Failure'),
  topic('medicine', 'med-cvs', 'Rheumatic Fever — Jones Criteria'),
  topic('medicine', 'med-cvs', 'Infective Endocarditis'),
  topic('medicine', 'med-resp', '⭐ Asthma — Diagnosis & Management'),
  topic('medicine', 'med-resp', 'COPD'),
  topic('medicine', 'med-resp', 'Pneumonia — Community Acquired'),
  topic('medicine', 'med-resp', '⭐ Tuberculosis — DOTS'),
  topic('medicine', 'med-resp', 'Pleural Effusion'),
  topic('medicine', 'med-git', 'Peptic Ulcer Disease'),
  topic('medicine', 'med-git', 'Liver Cirrhosis — Management'),
  topic('medicine', 'med-git', 'Inflammatory Bowel Disease'),
  topic('medicine', 'med-git', 'Hepatitis — Management'),
  topic('medicine', 'med-neuro', '⭐ Stroke — Classification & Management'),
  topic('medicine', 'med-neuro', 'Epilepsy — Classification'),
  topic('medicine', 'med-neuro', 'Meningitis — CSF Analysis'),
  topic('medicine', 'med-neuro', 'Parkinson Disease'),
  topic('medicine', 'med-endo', '⭐ Diabetes Mellitus — Diagnosis & Management'),
  topic('medicine', 'med-endo', 'Thyroid Disorders — Hypo & Hyper'),
  topic('medicine', 'med-endo', 'Cushing Syndrome'),
  topic('medicine', 'med-endo', 'Addison Disease'),
  topic('medicine', 'med-renal', '⭐ Acute Kidney Injury'),
  topic('medicine', 'med-renal', 'Chronic Kidney Disease'),
  topic('medicine', 'med-renal', 'Nephrotic vs Nephritic Syndrome'),
  topic('medicine', 'med-renal', 'Dialysis — Indications'),
  radio('medicine', 'med-resp', 'Chest X-ray — Pleural Effusion'),
  radio('medicine', 'med-resp', 'Chest X-ray — Pneumonia Patterns'),
  radio('medicine', 'med-neuro', 'CT Head — Stroke Findings'),

  // ════════════════════════════════════════════════════════════════════════════
  // SURGERY
  // ════════════════════════════════════════════════════════════════════════════

  topic('surgery', 'surg-general', 'Wound Healing & Management'),
  topic('surgery', 'surg-general', 'Surgical Infections'),
  topic('surgery', 'surg-general', '⭐ Shock — Surgical Management'),
  topic('surgery', 'surg-general', '⭐ Burns — Management'),
  topic('surgery', 'surg-general', 'Fluid & Electrolyte Management'),
  topic('surgery', 'surg-general', 'Pre-operative Assessment'),
  topic('surgery', 'surg-general', 'Thyroid — Surgical Operations'),
  topic('surgery', 'surg-general', 'Breast — Lumps & Cancer'),
  topic('surgery', 'surg-git', '⭐ Appendicitis'),
  topic('surgery', 'surg-git', 'Intestinal Obstruction'),
  topic('surgery', 'surg-git', '⭐ Hernia — Types & Repair'),
  topic('surgery', 'surg-git', 'Gall Stones — Management'),
  topic('surgery', 'surg-git', 'Pancreatic Surgery'),
  topic('surgery', 'surg-uro', 'Urinary Calculi'),
  topic('surgery', 'surg-uro', 'BPH — Management'),
  topic('surgery', 'surg-uro', 'Urethral Stricture'),
  radio('surgery', 'surg-git', 'Abdominal X-ray — Obstruction'),
  radio('surgery', 'surg-uro', 'KUB X-ray — Renal Calculi'),

  // ════════════════════════════════════════════════════════════════════════════
  // OBG
  // ════════════════════════════════════════════════════════════════════════════

  topic('obg', 'obg-obstetrics', 'Normal Pregnancy — Diagnosis'),
  topic('obg', 'obg-obstetrics', 'Antenatal Care'),
  topic('obg', 'obg-obstetrics', '⭐ Normal Labor — Stages'),
  topic('obg', 'obg-obstetrics', '⭐ Preeclampsia & Eclampsia'),
  topic('obg', 'obg-obstetrics', 'Antepartum Hemorrhage'),
  topic('obg', 'obg-obstetrics', 'Ectopic Pregnancy'),
  topic('obg', 'obg-obstetrics', 'Cesarean Section — Indications'),
  topic('obg', 'obg-gynec', '⭐ Abnormal Uterine Bleeding'),
  topic('obg', 'obg-gynec', 'Fibroid Uterus'),
  topic('obg', 'obg-gynec', 'Ovarian Tumors — Classification'),
  topic('obg', 'obg-gynec', 'Pelvic Inflammatory Disease'),
  topic('obg', 'obg-gynec', 'Contraception — Methods'),
  topic('obg', 'obg-gynec', 'Infertility — Investigation'),
  radio('obg', 'obg-obstetrics', 'USG — Normal Pregnancy Findings'),

  // ════════════════════════════════════════════════════════════════════════════
  // PEDIATRICS
  // ════════════════════════════════════════════════════════════════════════════

  topic('peds', 'peds-neonato', 'Neonatal Resuscitation'),
  topic('peds', 'peds-neonato', '⭐ Neonatal Jaundice'),
  topic('peds', 'peds-neonato', 'Respiratory Distress Syndrome'),
  topic('peds', 'peds-neonato', 'Birth Asphyxia'),
  topic('peds', 'peds-growth', '⭐ Growth Milestones'),
  topic('peds', 'peds-growth', '⭐ Immunization Schedule — NIS'),
  topic('peds', 'peds-growth', 'Malnutrition — PEM'),
  topic('peds', 'peds-growth', 'Vitamin Deficiencies in Children'),
  topic('peds', 'peds-infect', 'Measles & Rubella'),
  topic('peds', 'peds-infect', 'Diphtheria'),
  topic('peds', 'peds-infect', 'Whooping Cough'),
  topic('peds', 'peds-infect', 'Poliomyelitis'),
  topic('peds', 'peds-infect', 'Pediatric HIV'),
];
