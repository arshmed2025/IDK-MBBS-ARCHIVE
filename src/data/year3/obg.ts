// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 3 — OBG
// ═══════════════════════════════════════════════════════════════════════════════

import { topic, radio, type Topic } from '../types';

export const obgTopics: Topic[] = [

  // ── Obstetrics ──
  topic('obg', 'obg-obstetrics', 'Normal Pregnancy — Diagnosis'),
  topic('obg', 'obg-obstetrics', 'Antenatal Care'),
  topic('obg', 'obg-obstetrics', '⭐ Normal Labor — Stages'),
  topic('obg', 'obg-obstetrics', '⭐ Preeclampsia & Eclampsia'),
  topic('obg', 'obg-obstetrics', 'Antepartum Hemorrhage'),
  topic('obg', 'obg-obstetrics', 'Ectopic Pregnancy'),
  topic('obg', 'obg-obstetrics', 'Cesarean Section — Indications'),

  // ── Gynaecology ──
  topic('obg', 'obg-gynec', '⭐ Abnormal Uterine Bleeding'),
  topic('obg', 'obg-gynec', 'Fibroid Uterus'),
  topic('obg', 'obg-gynec', 'Ovarian Tumors — Classification'),
  topic('obg', 'obg-gynec', 'Pelvic Inflammatory Disease'),
  topic('obg', 'obg-gynec', 'Contraception — Methods'),
  topic('obg', 'obg-gynec', 'Infertility — Investigation'),

  // ── OBG Radiology ──
  radio('obg', 'obg-obstetrics', 'USG — Normal Pregnancy Findings'),
];
