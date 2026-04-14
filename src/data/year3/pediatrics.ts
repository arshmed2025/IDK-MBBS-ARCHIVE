// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 3 — Pediatrics
// ═══════════════════════════════════════════════════════════════════════════════

import { topic, type Topic } from '../types';

export const pediatricsTopics: Topic[] = [

  // ── Neonatology ──
  topic('peds', 'peds-neonato', 'Neonatal Resuscitation'),
  topic('peds', 'peds-neonato', '⭐ Neonatal Jaundice'),
  topic('peds', 'peds-neonato', 'Respiratory Distress Syndrome'),
  topic('peds', 'peds-neonato', 'Birth Asphyxia'),

  // ── Growth & Nutrition ──
  topic('peds', 'peds-growth', '⭐ Growth Milestones'),
  topic('peds', 'peds-growth', '⭐ Immunization Schedule — NIS'),
  topic('peds', 'peds-growth', 'Malnutrition — PEM'),
  topic('peds', 'peds-growth', 'Vitamin Deficiencies in Children'),

  // ── Infectious Diseases ──
  topic('peds', 'peds-infect', 'Measles & Rubella'),
  topic('peds', 'peds-infect', 'Diphtheria'),
  topic('peds', 'peds-infect', 'Whooping Cough'),
  topic('peds', 'peds-infect', 'Poliomyelitis'),
  topic('peds', 'peds-infect', 'Pediatric HIV'),
];
