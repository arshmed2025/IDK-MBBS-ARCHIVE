// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 2 — Pathology, Pharmacology, Microbiology, Forensic Medicine
// ═══════════════════════════════════════════════════════════════════════════════

import { topic, histo, radio, type Topic } from './types';

export const year2Topics: Topic[] = [

  // ════════════════════════════════════════════════════════════════════════════
  // PATHOLOGY
  // ════════════════════════════════════════════════════════════════════════════

  topic('pathology', 'path-general', '⭐ Inflammation — Acute & Chronic'),
  topic('pathology', 'path-general', 'Cell Injury & Necrosis'),
  topic('pathology', 'path-general', '⭐ Neoplasia — Classification'),
  topic('pathology', 'path-general', 'Thrombosis & Embolism'),
  topic('pathology', 'path-general', 'Edema — Pathogenesis'),
  topic('pathology', 'path-general', 'Amyloidosis'),
  topic('pathology', 'path-hemato', '⭐ Anemia — Classification'),
  topic('pathology', 'path-hemato', 'Leukemia — Types'),
  topic('pathology', 'path-hemato', 'Lymphoma — Hodgkin vs NHL'),
  topic('pathology', 'path-hemato', 'Bleeding Disorders'),
  topic('pathology', 'path-systemic', 'Atherosclerosis'),
  topic('pathology', 'path-systemic', 'Valvular Heart Disease — Pathology'),
  topic('pathology', 'path-systemic', 'Lung Tumors'),
  topic('pathology', 'path-systemic', 'Liver — Cirrhosis Pathology'),
  topic('pathology', 'path-clinical', 'Tumor Markers'),
  topic('pathology', 'path-clinical', 'Immunohistochemistry Basics'),
  histo('pathology', 'path-general', '⭐ Granuloma — Histology'),
  histo('pathology', 'path-hemato', 'Peripheral Smear — Iron Deficiency'),
  radio('pathology', 'path-systemic', 'Lung Consolidation — X-ray'),

  // ════════════════════════════════════════════════════════════════════════════
  // PHARMACOLOGY
  // ════════════════════════════════════════════════════════════════════════════

  topic('pharmacology', 'pharm-general', 'Pharmacokinetics — ADME'),
  topic('pharmacology', 'pharm-general', '⭐ Drug Receptors — Types'),
  topic('pharmacology', 'pharm-general', 'Dose-Response Curves'),
  topic('pharmacology', 'pharm-general', 'Adverse Drug Reactions'),
  topic('pharmacology', 'pharm-ans', '⭐ Cholinergic System'),
  topic('pharmacology', 'pharm-ans', 'Anticholinergics — Atropine'),
  topic('pharmacology', 'pharm-ans', '⭐ Adrenergic System'),
  topic('pharmacology', 'pharm-ans', 'Adrenergic Blockers'),
  topic('pharmacology', 'pharm-ans', 'Skeletal Muscle Relaxants'),
  topic('pharmacology', 'pharm-cvs', '⭐ Antihypertensives — Overview'),
  topic('pharmacology', 'pharm-cvs', 'Anti-anginal Drugs'),
  topic('pharmacology', 'pharm-cvs', 'Antiarrhythmics'),
  topic('pharmacology', 'pharm-cvs', 'Drugs for Heart Failure'),
  topic('pharmacology', 'pharm-cvs', '⭐ Diuretics — Classification'),
  topic('pharmacology', 'pharm-cvs', 'Anticoagulants & Thrombolytics'),
  topic('pharmacology', 'pharm-cns', 'General Anesthetics'),
  topic('pharmacology', 'pharm-cns', 'Local Anesthetics'),
  topic('pharmacology', 'pharm-cns', '⭐ Opioid Analgesics'),
  topic('pharmacology', 'pharm-cns', '⭐ NSAIDs'),
  topic('pharmacology', 'pharm-cns', 'Antiepileptics'),
  topic('pharmacology', 'pharm-cns', 'Antidepressants'),
  topic('pharmacology', 'pharm-cns', 'Antipsychotics'),
  topic('pharmacology', 'pharm-cns', 'Sedatives & Hypnotics'),
  topic('pharmacology', 'pharm-chemo', '⭐ Antibiotics — Beta-Lactams'),
  topic('pharmacology', 'pharm-chemo', 'Aminoglycosides'),
  topic('pharmacology', 'pharm-chemo', 'Macrolides'),
  topic('pharmacology', 'pharm-chemo', 'Fluoroquinolones'),
  topic('pharmacology', 'pharm-chemo', '⭐ Antitubercular Drugs'),
  topic('pharmacology', 'pharm-chemo', 'Antifungal Drugs'),
  topic('pharmacology', 'pharm-chemo', 'Antiviral Drugs'),
  topic('pharmacology', 'pharm-chemo', 'Antimalarial Drugs'),
  topic('pharmacology', 'pharm-chemo', 'Anticancer Drugs — Overview'),
  topic('pharmacology', 'pharm-endo', '⭐ Insulin & Oral Hypoglycemics'),
  topic('pharmacology', 'pharm-endo', 'Thyroid & Antithyroid Drugs'),
  topic('pharmacology', 'pharm-endo', 'Corticosteroids'),
  topic('pharmacology', 'pharm-endo', 'Oral Contraceptives'),

  // ════════════════════════════════════════════════════════════════════════════
  // MICROBIOLOGY
  // ════════════════════════════════════════════════════════════════════════════

  topic('microbiology', 'micro-general', '⭐ Sterilization & Disinfection'),
  topic('microbiology', 'micro-general', 'Culture Media — Types'),
  topic('microbiology', 'micro-general', 'Staining Methods — Gram, ZN, Albert'),
  topic('microbiology', 'micro-bacteria', '⭐ Staphylococcus'),
  topic('microbiology', 'micro-bacteria', 'Streptococcus'),
  topic('microbiology', 'micro-bacteria', '⭐ Mycobacterium tuberculosis'),
  topic('microbiology', 'micro-bacteria', 'Salmonella — Typhoid'),
  topic('microbiology', 'micro-bacteria', 'Clostridium — Tetanus, Botulism'),
  topic('microbiology', 'micro-bacteria', 'E. coli — Pathogenic Strains'),
  topic('microbiology', 'micro-bacteria', 'Neisseria — Meningococcus, Gonococcus'),
  topic('microbiology', 'micro-virus', '⭐ HIV — Virology & Diagnosis'),
  topic('microbiology', 'micro-virus', '⭐ Hepatitis Viruses — A to E'),
  topic('microbiology', 'micro-virus', 'Dengue & Chikungunya'),
  topic('microbiology', 'micro-virus', 'Rabies'),
  topic('microbiology', 'micro-virus', 'Influenza'),
  topic('microbiology', 'micro-virus', 'COVID-19 — SARS-CoV-2'),
  topic('microbiology', 'micro-parasit', '⭐ Malaria — Plasmodium Species'),
  topic('microbiology', 'micro-parasit', 'Entamoeba histolytica'),
  topic('microbiology', 'micro-parasit', 'Helminths — Overview'),
  topic('microbiology', 'micro-immuno', 'Innate vs Adaptive Immunity'),
  topic('microbiology', 'micro-immuno', '⭐ Immunoglobulins — Types & Functions'),
  topic('microbiology', 'micro-immuno', '⭐ Hypersensitivity Reactions — Types I-IV'),
  topic('microbiology', 'micro-immuno', 'Vaccines — Types & Schedule'),
  topic('microbiology', 'micro-immuno', 'Autoimmune Diseases'),

  // ════════════════════════════════════════════════════════════════════════════
  // FORENSIC MEDICINE
  // ════════════════════════════════════════════════════════════════════════════

  topic('forensic', 'fmed-general', 'Cause & Manner of Death'),
  topic('forensic', 'fmed-general', '⭐ Post-mortem Changes'),
  topic('forensic', 'fmed-general', '⭐ Asphyxia — Types'),
  topic('forensic', 'fmed-general', 'Injuries — Mechanical'),
  topic('forensic', 'fmed-general', 'Firearm Injuries'),
  topic('forensic', 'fmed-general', 'Burns & Scalds'),
  topic('forensic', 'fmed-tox', 'General Toxicology — Principles'),
  topic('forensic', 'fmed-tox', '⭐ Organophosphorus Poisoning'),
  topic('forensic', 'fmed-tox', 'Corrosive Poisoning'),
  topic('forensic', 'fmed-tox', 'Snake Bite — Management'),
  topic('forensic', 'fmed-tox', 'Alcohol — Forensic Aspects'),
  topic('forensic', 'fmed-law', 'IPC — Medical Sections'),
  topic('forensic', 'fmed-law', '⭐ Consent — Types & Validity'),
  topic('forensic', 'fmed-law', 'Medical Negligence'),
  topic('forensic', 'fmed-law', 'Sexual Offences — Medicolegal'),
];
