// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 4 — Radiology
// ═══════════════════════════════════════════════════════════════════════════════

import { topic, radio, type Topic } from '../types';

export const radiologyTopics: Topic[] = [

  // ── General Radiology ──
  topic('radiology_sub', 'radio-general', 'X-ray — Physics & Safety'),
  topic('radiology_sub', 'radio-general', 'CT vs MRI — Principles'),
  topic('radiology_sub', 'radio-general', 'USG — Basic Principles'),

  // ── Systemic Imaging ──
  topic('radiology_sub', 'radio-systemic', '⭐ Chest X-ray — Interpretation'),
  topic('radiology_sub', 'radio-systemic', 'Abdominal X-ray — Interpretation'),
  topic('radiology_sub', 'radio-systemic', 'Skeletal Radiology — Fractures'),
  topic('radiology_sub', 'radio-systemic', 'Neuroradiology — CT Head'),
  radio('radiology_sub', 'radio-systemic', 'CXR — Cardiomegaly'),
  radio('radiology_sub', 'radio-systemic', 'CXR — Pneumothorax'),
  radio('radiology_sub', 'radio-systemic', 'CT Abdomen — Common Findings'),
];
