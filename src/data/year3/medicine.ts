// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 3 — Medicine
// ═══════════════════════════════════════════════════════════════════════════════

import { topic, radio, type Topic } from '../types';

export const medicineTopics: Topic[] = [

  // ── Cardiovascular Medicine ──
  topic('medicine', 'med-cvs', 'Hypertension — Management'),
  topic('medicine', 'med-cvs', '⭐ Ischemic Heart Disease'),
  topic('medicine', 'med-cvs', 'Congestive Heart Failure'),
  topic('medicine', 'med-cvs', 'Rheumatic Fever — Jones Criteria'),
  topic('medicine', 'med-cvs', 'Infective Endocarditis'),

  // ── Respiratory Medicine ──
  topic('medicine', 'med-resp', '⭐ Asthma — Diagnosis & Management'),
  topic('medicine', 'med-resp', 'COPD'),
  topic('medicine', 'med-resp', 'Pneumonia — Community Acquired'),
  topic('medicine', 'med-resp', '⭐ Tuberculosis — DOTS'),
  topic('medicine', 'med-resp', 'Pleural Effusion'),

  // ── Gastroenterology ──
  topic('medicine', 'med-git', 'Peptic Ulcer Disease'),
  topic('medicine', 'med-git', 'Liver Cirrhosis — Management'),
  topic('medicine', 'med-git', 'Inflammatory Bowel Disease'),
  topic('medicine', 'med-git', 'Hepatitis — Management'),

  // ── Neurology ──
  topic('medicine', 'med-neuro', '⭐ Stroke — Classification & Management'),
  topic('medicine', 'med-neuro', 'Epilepsy — Classification'),
  topic('medicine', 'med-neuro', 'Meningitis — CSF Analysis'),
  topic('medicine', 'med-neuro', 'Parkinson Disease'),

  // ── Endocrinology ──
  topic('medicine', 'med-endo', '⭐ Diabetes Mellitus — Diagnosis & Management'),
  topic('medicine', 'med-endo', 'Thyroid Disorders — Hypo & Hyper'),
  topic('medicine', 'med-endo', 'Cushing Syndrome'),
  topic('medicine', 'med-endo', 'Addison Disease'),

  // ── Nephrology ──
  topic('medicine', 'med-renal', '⭐ Acute Kidney Injury'),
  topic('medicine', 'med-renal', 'Chronic Kidney Disease'),
  topic('medicine', 'med-renal', 'Nephrotic vs Nephritic Syndrome'),
  topic('medicine', 'med-renal', 'Dialysis — Indications'),

  // ── Medicine Radiology ──
  radio('medicine', 'med-resp', 'Chest X-ray — Pleural Effusion'),
  radio('medicine', 'med-resp', 'Chest X-ray — Pneumonia Patterns'),
  radio('medicine', 'med-neuro', 'CT Head — Stroke Findings'),
];
