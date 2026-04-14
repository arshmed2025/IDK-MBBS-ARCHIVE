// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 4 — Dermatology
// ═══════════════════════════════════════════════════════════════════════════════

import { topic, histo, type Topic } from '../types';

export const dermatologyTopics: Topic[] = [

  // ── General Dermatology ──
  topic('dermatology', 'derm-general', '⭐ Psoriasis'),
  topic('dermatology', 'derm-general', 'Eczema — Types'),
  topic('dermatology', 'derm-general', 'Lichen Planus'),
  topic('dermatology', 'derm-general', 'Pemphigus & Pemphigoid'),
  topic('dermatology', 'derm-general', 'Drug Reactions — SJS, TEN'),

  // ── Infections ──
  topic('dermatology', 'derm-infect', 'Dermatophytosis'),
  topic('dermatology', 'derm-infect', '⭐ Leprosy — Classification'),
  topic('dermatology', 'derm-infect', 'Scabies'),
  topic('dermatology', 'derm-infect', 'STIs — Syphilis, Gonorrhea'),

  // ── Histology ──
  histo('dermatology', 'derm-general', 'Skin Biopsy — Psoriasis vs Eczema'),
];
