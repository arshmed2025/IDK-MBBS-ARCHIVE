// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 1 — Biochemistry
// ═══════════════════════════════════════════════════════════════════════════════

import { topic, pyqpdf, pyq, note, type Topic } from '../types';

export const biochemistryTopics: Topic[] = [

  topic('biochemistry', 'bio-chemistry', 'Amino Acids — Classification'),
  topic('biochemistry', 'bio-chemistry', '⭐ Protein Structure — Levels'),
  topic('biochemistry', 'bio-chemistry', 'Carbohydrates — Classification'),
  topic('biochemistry', 'bio-chemistry', 'Lipids — Classification'),
  topic('biochemistry', 'bio-chemistry', 'Nucleotides — Structure'),

  topic('biochemistry', 'bio-enzymes', '⭐ Enzyme Classification', `## Six Classes of Enzymes

| Class | Reaction | Example |
|-------|----------|---------|
| **Oxidoreductases** | Oxidation-reduction | Lactate dehydrogenase |
| **Transferases** | Transfer groups | Kinases |
| **Hydrolases** | Hydrolysis | Lipase |
| **Lyases** | Remove groups (non-hydrolytic) | Aldolase |
| **Isomerases** | Rearrangement | Mutase |
| **Ligases** | Join molecules using ATP | Carboxylase |

> **Mnemonic:** *Over The Hill Lies Icy Lakes*
`),
  topic('biochemistry', 'bio-enzymes', 'Enzyme Kinetics — Km & Vmax'),
  topic('biochemistry', 'bio-enzymes', 'Enzyme Inhibition — Types'),
  topic('biochemistry', 'bio-enzymes', 'Regulation of Enzymes'),

  topic('biochemistry', 'bio-carb', '⭐ Glycolysis — Steps & Regulation', `## Glycolysis — 10 Steps

**Location:** Cytoplasm
**Net yield:** 2 ATP + 2 NADH + 2 Pyruvate

### Regulatory Enzymes

| Step | Enzyme | Key Point |
|------|--------|-----------|
| 1 | **Hexokinase** | Inhibited by G6P |
| 3 | **PFK-1** | *Rate-limiting*. Activated by AMP, F2,6BP |
| 10 | **Pyruvate kinase** | Activated by F1,6BP |

> **Remember:** PFK-1 is the **rate-limiting enzyme** of glycolysis
`),
  topic('biochemistry', 'bio-carb', 'TCA Cycle'),
  topic('biochemistry', 'bio-carb', '⭐ Gluconeogenesis'),
  topic('biochemistry', 'bio-carb', 'Glycogen Metabolism'),
  topic('biochemistry', 'bio-carb', 'HMP Shunt'),

  topic('biochemistry', 'bio-lipid', '⭐ Beta Oxidation'),
  topic('biochemistry', 'bio-lipid', 'Fatty Acid Synthesis'),
  topic('biochemistry', 'bio-lipid', 'Cholesterol Metabolism'),
  topic('biochemistry', 'bio-lipid', 'Ketone Bodies'),
  topic('biochemistry', 'bio-lipid', 'Lipoproteins — Classification'),

  topic('biochemistry', 'bio-protein', 'Transamination & Deamination'),
  topic('biochemistry', 'bio-protein', '⭐ Urea Cycle'),
  topic('biochemistry', 'bio-protein', 'Inborn Errors of Amino Acid Metabolism'),

  topic('biochemistry', 'bio-nucleic', 'DNA Replication'),
  topic('biochemistry', 'bio-nucleic', '⭐ Transcription'),
  topic('biochemistry', 'bio-nucleic', '⭐ Translation'),
  topic('biochemistry', 'bio-nucleic', 'Mutations — Types'),
  topic('biochemistry', 'bio-nucleic', 'PCR & Blotting Techniques'),

  topic('biochemistry', 'bio-vitamins', '⭐ Vitamins — Classification & Functions', `## Water Soluble

| Vitamin | Function | Deficiency |
|---------|----------|------------|
| **B1** (Thiamine) | TPP coenzyme | Beriberi, Wernicke |
| **B2** (Riboflavin) | FAD, FMN | Cheilosis, glossitis |
| **B3** (Niacin) | NAD, NADP | Pellagra (3 Ds) |
| **B6** (Pyridoxine) | PLP coenzyme | Peripheral neuropathy |
| **B12** | Methylation | Megaloblastic anemia |
| **Folate** | 1-carbon transfer | Neural tube defects |
| **C** | Collagen synthesis | Scurvy |

## Fat Soluble — ADEK

| Vitamin | Function | Deficiency |
|---------|----------|------------|
| **A** | Vision, immunity | Night blindness |
| **D** | Calcium absorption | Rickets |
| **E** | Antioxidant | Hemolytic anemia |
| **K** | Clotting factors | Bleeding |
`),
  topic('biochemistry', 'bio-vitamins', 'Minerals — Iron, Calcium, Zinc'),

  topic('biochemistry', 'bio-hormones', 'Signal Transduction — Overview'),
  topic('biochemistry', 'bio-hormones', 'cAMP & cGMP Pathways'),
  topic('biochemistry', 'bio-hormones', 'IP3/DAG Pathway'),

  topic('biochemistry', 'bio-clinical', 'Liver Function Tests'),
  topic('biochemistry', 'bio-clinical', 'Renal Function Tests'),
  topic('biochemistry', 'bio-clinical', 'Diabetes — Biochemical Basis'),

  // ── Biochemistry: PYQs ──
  pyqpdf('biochemistry', 'bio-chemistry', 'Biochemistry Paper — 2024'),
  pyq('biochemistry', 'bio-carb', '⭐ Glycolysis Regulation Q (2024)'),
  pyq('biochemistry', 'bio-enzymes', 'Enzyme Classification Q (2023)'),
  pyq('biochemistry', 'bio-vitamins', 'Vitamins Table Q (2023)'),

  // ── Biochemistry: Notes ──
  note('biochemistry', 'bio-vitamins', '⭐ Vitamins Summary Table'),
  note('biochemistry', 'bio-carb', 'Metabolic Pathways Overview'),
];
