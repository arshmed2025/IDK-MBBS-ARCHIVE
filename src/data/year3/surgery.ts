// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 3 — Surgery
// ═══════════════════════════════════════════════════════════════════════════════

import { topic, radio, type Topic } from '../types';

export const surgeryTopics: Topic[] = [

  // ── General Surgery ──
  topic('surgery', 'surg-general', 'Wound Healing & Management'),
  topic('surgery', 'surg-general', 'Surgical Infections'),
  topic('surgery', 'surg-general', '⭐ Shock — Surgical Management'),
  topic('surgery', 'surg-general', '⭐ Burns — Management'),
  topic('surgery', 'surg-general', 'Fluid & Electrolyte Management'),
  topic('surgery', 'surg-general', 'Pre-operative Assessment'),
  topic('surgery', 'surg-general', 'Thyroid — Surgical Operations'),
  topic('surgery', 'surg-general', 'Breast — Lumps & Cancer'),

  // ── GI Surgery ──
  topic('surgery', 'surg-git', '⭐ Appendicitis'),
  topic('surgery', 'surg-git', 'Intestinal Obstruction'),
  topic('surgery', 'surg-git', '⭐ Hernia — Types & Repair'),
  topic('surgery', 'surg-git', 'Gall Stones — Management'),
  topic('surgery', 'surg-git', 'Pancreatic Surgery'),

  // ── Urology ──
  topic('surgery', 'surg-uro', 'Urinary Calculi'),
  topic('surgery', 'surg-uro', 'BPH — Management'),
  topic('surgery', 'surg-uro', 'Urethral Stricture'),

  // ── Surgery Radiology ──
  radio('surgery', 'surg-git', 'Abdominal X-ray — Obstruction'),
  radio('surgery', 'surg-uro', 'KUB X-ray — Renal Calculi'),
];
