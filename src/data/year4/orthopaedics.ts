// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 4 — Orthopaedics
// ═══════════════════════════════════════════════════════════════════════════════

import { topic, radio, type Topic } from '../types';

export const orthopaedicsTopics: Topic[] = [

  // ── Trauma & Fractures ──
  topic('ortho', 'ortho-trauma', '⭐ Fracture — Classification & Healing'),
  topic('ortho', 'ortho-trauma', 'Colles Fracture'),
  topic('ortho', 'ortho-trauma', '⭐ Fracture Neck of Femur'),
  topic('ortho', 'ortho-trauma', 'Supracondylar Fracture — Humerus'),
  topic('ortho', 'ortho-trauma', 'Spine Injuries'),
  topic('ortho', 'ortho-trauma', 'Pelvic Fractures'),

  // ── General Orthopaedics ──
  topic('ortho', 'ortho-general', 'Osteoarthritis vs Rheumatoid'),
  topic('ortho', 'ortho-general', 'Bone Tumors — Classification'),
  topic('ortho', 'ortho-general', 'Tuberculosis of Spine — Potts'),
  topic('ortho', 'ortho-general', 'Congenital Disorders — CTEV, DDH'),

  // ── Ortho Radiology ──
  radio('ortho', 'ortho-trauma', 'X-ray — Common Fracture Patterns'),
  radio('ortho', 'ortho-trauma', 'X-ray — Spine Injuries'),
];
