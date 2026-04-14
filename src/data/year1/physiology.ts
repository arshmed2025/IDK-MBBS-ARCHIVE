// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 1 — Physiology
// ═══════════════════════════════════════════════════════════════════════════════

import { topic, pyqpdf, pyq, note, type Topic } from '../types';

export const physiologyTopics: Topic[] = [

  // ── General Physiology ──
  topic('physiology', 'phys-general', 'Cell Membrane — Structure & Transport'),
  topic('physiology', 'phys-general', '⭐ Body Fluid Compartments'),
  topic('physiology', 'phys-general', 'Homeostasis & Feedback Mechanisms'),
  topic('physiology', 'phys-general', 'Resting Membrane Potential'),

  // ── Blood & Immunity ──
  topic('physiology', 'phys-blood', 'Composition of Blood'),
  topic('physiology', 'phys-blood', '⭐ Hemoglobin — Structure & Function'),
  topic('physiology', 'phys-blood', 'WBC — Types & Functions'),
  topic('physiology', 'phys-blood', '⭐ Blood Groups — ABO & Rh', `## ABO System

| Blood Group | Antigen | Antibody | Can Donate To | Can Receive From |
|-------------|---------|----------|---------------|------------------|
| **A** | A | Anti-B | A, AB | A, O |
| **B** | B | Anti-A | B, AB | B, O |
| **AB** | A and B | None | AB | All (Universal recipient) |
| **O** | None | Anti-A, Anti-B | All (Universal donor) | O |

## Rh System
- **Rh positive** — has D antigen (85%)
- **Rh negative** — lacks D antigen (15%)

> **Clinical:** Rh-negative mother + Rh-positive fetus = risk of erythroblastosis fetalis
`),
  topic('physiology', 'phys-blood', 'Coagulation Cascade'),
  topic('physiology', 'phys-blood', 'Immunity — Innate vs Adaptive'),

  // ── Nerve & Muscle ──
  topic('physiology', 'phys-nerve', '⭐ Action Potential — Ionic Basis', `## Phases

1. **Resting** — -70mV (K+ leak channels)
2. **Depolarization** — Na+ influx (voltage-gated Na+ channels open)
3. **Overshoot** — +30mV
4. **Repolarization** — K+ efflux (K+ channels open, Na+ channels inactivate)
5. **Hyperpolarization** — briefly more negative than -70mV
6. **Return to resting** — Na+/K+ ATPase restores gradients

## Properties
- **All or none law** — fires fully or not at all
- **Refractory period** — absolute (no stimulus works) + relative (strong stimulus works)
- **Saltatory conduction** — jumps between nodes of Ranvier in myelinated nerves
`),
  topic('physiology', 'phys-nerve', '⭐ Neuromuscular Junction'),
  topic('physiology', 'phys-nerve', 'Skeletal Muscle — Contraction'),
  topic('physiology', 'phys-nerve', 'Smooth Muscle Physiology'),

  // ── CVS ──
  topic('physiology', 'phys-cvs', '⭐ Cardiac Cycle — Events', `## Phases of Cardiac Cycle

1. Atrial systole
2. Isovolumetric contraction
3. Rapid ejection
4. Reduced ejection
5. Isovolumetric relaxation
6. Rapid filling
7. Reduced filling (diastasis)

## Heart Sounds
- **S1** — closure of AV valves (mitral + tricuspid)
- **S2** — closure of semilunar valves (aortic + pulmonary)

## Key Values
| Parameter | Value |
|-----------|-------|
| Heart rate | 72/min |
| Cardiac output | 5 L/min |
| Stroke volume | 70 mL |
| Systolic BP | 120 mmHg |
| Diastolic BP | 80 mmHg |
`),
  topic('physiology', 'phys-cvs', 'Heart Sounds — Normal & Abnormal'),
  topic('physiology', 'phys-cvs', 'ECG — Normal & Interpretation'),
  topic('physiology', 'phys-cvs', '⭐ BP Regulation — Short & Long Term'),
  topic('physiology', 'phys-cvs', 'Cardiac Output — Regulation'),
  topic('physiology', 'phys-cvs', 'Shock — Pathophysiology'),

  // ── Respiratory ──
  topic('physiology', 'phys-resp', 'Mechanics of Breathing'),
  topic('physiology', 'phys-resp', '⭐ Lung Volumes & Capacities'),
  topic('physiology', 'phys-resp', 'Gas Exchange — Diffusion'),
  topic('physiology', 'phys-resp', 'O2 & CO2 Transport'),
  topic('physiology', 'phys-resp', 'Regulation of Respiration'),

  // ── Renal ──
  topic('physiology', 'phys-renal', '⭐ GFR — Measurement & Regulation'),
  topic('physiology', 'phys-renal', 'Renal Tubular Function'),
  topic('physiology', 'phys-renal', 'Countercurrent Mechanism'),
  topic('physiology', 'phys-renal', 'Acid-Base Balance'),
  topic('physiology', 'phys-renal', 'Micturition Reflex'),

  // ── GI ──
  topic('physiology', 'phys-git', 'Salivary Secretion'),
  topic('physiology', 'phys-git', '⭐ Gastric Secretion — Phases'),
  topic('physiology', 'phys-git', 'Pancreatic & Biliary Secretion'),
  topic('physiology', 'phys-git', 'GI Motility'),
  topic('physiology', 'phys-git', 'Digestion & Absorption'),

  // ── Endocrine ──
  topic('physiology', 'phys-endo', '⭐ Thyroid Hormones'),
  topic('physiology', 'phys-endo', 'Adrenal Cortex — Cortisol'),
  topic('physiology', 'phys-endo', 'Adrenal Medulla — Catecholamines'),
  topic('physiology', 'phys-endo', '⭐ Insulin & Glucagon'),
  topic('physiology', 'phys-endo', 'Growth Hormone'),
  topic('physiology', 'phys-endo', 'Calcium Metabolism — PTH, Calcitonin'),

  // ── CNS ──
  topic('physiology', 'phys-cns', 'Sensory Receptors — Classification'),
  topic('physiology', 'phys-cns', 'Pain Pathways'),
  topic('physiology', 'phys-cns', '⭐ Motor Pathways — Pyramidal & Extrapyramidal'),
  topic('physiology', 'phys-cns', 'Cerebellum — Functions'),
  topic('physiology', 'phys-cns', 'Vision — Physiology'),
  topic('physiology', 'phys-cns', 'Hearing — Physiology'),
  topic('physiology', 'phys-cns', 'Sleep & EEG'),

  // ── Reproductive ──
  topic('physiology', 'phys-repro', 'Male Reproductive Physiology'),
  topic('physiology', 'phys-repro', '⭐ Menstrual Cycle'),
  topic('physiology', 'phys-repro', 'Pregnancy — Hormones'),
  topic('physiology', 'phys-repro', 'Lactation'),

  // ── Physiology: PYQs ──
  pyqpdf('physiology', 'phys-general', 'Physiology Paper I — 2024'),
  pyqpdf('physiology', 'phys-general', 'Physiology Paper II — 2024'),
  pyq('physiology', 'phys-cvs', '⭐ Cardiac Cycle Q (2024)'),
  pyq('physiology', 'phys-blood', 'Blood Groups Q (2023)'),
  pyq('physiology', 'phys-nerve', 'Action Potential Q (2024)'),

  // ── Physiology: Notes ──
  note('physiology', 'phys-endo', '⭐ Endocrine Quick Reference'),
  note('physiology', 'phys-cvs', 'ECG Interpretation Cheatsheet'),
];
