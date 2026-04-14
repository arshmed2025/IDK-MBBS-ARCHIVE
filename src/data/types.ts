// ─── Core Types ──────────────────────────────────────────────────────────────

export type YearId = 1 | 2 | 3 | 4;

export type CategoryId = 'topics' | 'pyq_pdfs' | 'pyqs' | 'histology' | 'radiology' | 'notes';

export interface Subject {
  id: string;
  name: string;
  icon: string;
  year: YearId;
}

export interface Unit {
  id: string;
  subjectId: string;
  name: string;
  order: number;
}

export interface Topic {
  id: string;
  title: string;
  subjectId: string;
  unitId: string;
  category: CategoryId;
  important?: boolean;
  content?: string;
  by?: string;
  editor?: string;
}

// ─── Year Metadata ───────────────────────────────────────────────────────────

export const years: { id: YearId; label: string; subtitle: string; disabled?: boolean }[] = [
  { id: 1, label: 'Year 1', subtitle: 'Pre-clinical foundations' },
  { id: 2, label: 'Year 2', subtitle: 'Para-clinical sciences',  disabled: true },
  { id: 3, label: 'Year 3', subtitle: 'Clinical rotations I',    disabled: true },
  { id: 4, label: 'Year 4', subtitle: 'Clinical rotations II',   disabled: true },
];

// ─── Categories ──────────────────────────────────────────────────────────────

export const categories: { id: CategoryId; name: string; icon: string }[] = [
  { id: 'topics', name: 'Topics', icon: '📖' },
  { id: 'pyq_pdfs', name: 'PYQ PDFs', icon: '📄' },
  { id: 'pyqs', name: 'PYQs', icon: '📝' },
  { id: 'histology', name: 'Histology', icon: '🔬' },
  { id: 'radiology', name: 'Radiology', icon: '🩻' },
  { id: 'notes', name: 'Notes', icon: '✏️' },
];

// ─── Subjects ────────────────────────────────────────────────────────────────

export const subjects: Subject[] = [
  { id: 'anatomy', name: 'Anatomy', icon: '🦴', year: 1 },
  { id: 'physiology', name: 'Physiology', icon: '🫀', year: 1 },
  { id: 'biochemistry', name: 'Biochemistry', icon: '🧬', year: 1 },
  { id: 'pathology', name: 'Pathology', icon: '🔬', year: 2 },
  { id: 'pharmacology', name: 'Pharmacology', icon: '💊', year: 2 },
  { id: 'microbiology', name: 'Microbiology', icon: '🦠', year: 2 },
  { id: 'forensic', name: 'Forensic Medicine', icon: '⚖️', year: 2 },
  { id: 'medicine', name: 'Medicine', icon: '🩺', year: 3 },
  { id: 'surgery', name: 'Surgery', icon: '🔪', year: 3 },
  { id: 'obg', name: 'OBG', icon: '🤰', year: 3 },
  { id: 'peds', name: 'Pediatrics', icon: '👶', year: 3 },
  { id: 'ortho', name: 'Orthopaedics', icon: '🦿', year: 4 },
  { id: 'ophthalmology', name: 'Ophthalmology', icon: '👁️', year: 4 },
  { id: 'ent', name: 'ENT', icon: '👂', year: 4 },
  { id: 'dermatology', name: 'Dermatology', icon: '🧴', year: 4 },
  { id: 'psychiatry', name: 'Psychiatry', icon: '🧠', year: 4 },
  { id: 'radiology_sub', name: 'Radiology', icon: '📡', year: 4 },
];

// ─── Units ───────────────────────────────────────────────────────────────────

export const units: Unit[] = [
  // Anatomy
  { id: 'anat-ul', subjectId: 'anatomy', name: 'Upper Limb', order: 1 },
  { id: 'anat-ll', subjectId: 'anatomy', name: 'Lower Limb', order: 2 },
  { id: 'anat-thorax', subjectId: 'anatomy', name: 'Thorax', order: 3 },
  { id: 'anat-abdomen', subjectId: 'anatomy', name: 'Abdomen & Pelvis', order: 4 },
  { id: 'anat-headneck', subjectId: 'anatomy', name: 'Head & Neck', order: 5 },
  { id: 'anat-neuro', subjectId: 'anatomy', name: 'Neuroanatomy', order: 6 },
  { id: 'anat-embryo', subjectId: 'anatomy', name: 'General Embryology', order: 7 },
  { id: 'anat-histology', subjectId: 'anatomy', name: 'General Histology', order: 8 },
  { id: 'anat-genetics', subjectId: 'anatomy', name: 'Genetics', order: 9 },

  // Physiology
  { id: 'phys-general', subjectId: 'physiology', name: 'General Physiology', order: 1 },
  { id: 'phys-blood', subjectId: 'physiology', name: 'Blood & Immunity', order: 2 },
  { id: 'phys-nerve', subjectId: 'physiology', name: 'Nerve & Muscle', order: 3 },
  { id: 'phys-cvs', subjectId: 'physiology', name: 'Cardiovascular System', order: 4 },
  { id: 'phys-resp', subjectId: 'physiology', name: 'Respiratory System', order: 5 },
  { id: 'phys-renal', subjectId: 'physiology', name: 'Renal Physiology', order: 6 },
  { id: 'phys-git', subjectId: 'physiology', name: 'GI Physiology', order: 7 },
  { id: 'phys-endo', subjectId: 'physiology', name: 'Endocrine System', order: 8 },
  { id: 'phys-cns', subjectId: 'physiology', name: 'CNS & Special Senses', order: 9 },
  { id: 'phys-repro', subjectId: 'physiology', name: 'Reproductive Physiology', order: 10 },

  // Biochemistry
  { id: 'bio-chemistry', subjectId: 'biochemistry', name: 'Chemistry of Biomolecules', order: 1 },
  { id: 'bio-enzymes', subjectId: 'biochemistry', name: 'Enzymology', order: 2 },
  { id: 'bio-carb', subjectId: 'biochemistry', name: 'Carbohydrate Metabolism', order: 3 },
  { id: 'bio-lipid', subjectId: 'biochemistry', name: 'Lipid Metabolism', order: 4 },
  { id: 'bio-protein', subjectId: 'biochemistry', name: 'Protein & Amino Acid Metabolism', order: 5 },
  { id: 'bio-nucleic', subjectId: 'biochemistry', name: 'Nucleic Acid & Molecular Biology', order: 6 },
  { id: 'bio-vitamins', subjectId: 'biochemistry', name: 'Vitamins & Minerals', order: 7 },
  { id: 'bio-hormones', subjectId: 'biochemistry', name: 'Hormones & Signal Transduction', order: 8 },
  { id: 'bio-clinical', subjectId: 'biochemistry', name: 'Clinical & Applied Biochemistry', order: 9 },

  // Pathology
  { id: 'path-general', subjectId: 'pathology', name: 'General Pathology', order: 1 },
  { id: 'path-hemato', subjectId: 'pathology', name: 'Hematology', order: 2 },
  { id: 'path-systemic', subjectId: 'pathology', name: 'Systemic Pathology', order: 3 },
  { id: 'path-clinical', subjectId: 'pathology', name: 'Clinical Pathology', order: 4 },

  // Pharmacology
  { id: 'pharm-general', subjectId: 'pharmacology', name: 'General Pharmacology', order: 1 },
  { id: 'pharm-ans', subjectId: 'pharmacology', name: 'ANS Pharmacology', order: 2 },
  { id: 'pharm-cvs', subjectId: 'pharmacology', name: 'CVS Drugs', order: 3 },
  { id: 'pharm-cns', subjectId: 'pharmacology', name: 'CNS Drugs', order: 4 },
  { id: 'pharm-chemo', subjectId: 'pharmacology', name: 'Chemotherapy', order: 5 },
  { id: 'pharm-endo', subjectId: 'pharmacology', name: 'Endocrine Pharmacology', order: 6 },

  // Microbiology
  { id: 'micro-general', subjectId: 'microbiology', name: 'General Microbiology', order: 1 },
  { id: 'micro-bacteria', subjectId: 'microbiology', name: 'Bacteriology', order: 2 },
  { id: 'micro-virus', subjectId: 'microbiology', name: 'Virology', order: 3 },
  { id: 'micro-parasit', subjectId: 'microbiology', name: 'Parasitology', order: 4 },
  { id: 'micro-immuno', subjectId: 'microbiology', name: 'Immunology', order: 5 },

  // Forensic Medicine
  { id: 'fmed-general', subjectId: 'forensic', name: 'Forensic Pathology', order: 1 },
  { id: 'fmed-tox', subjectId: 'forensic', name: 'Toxicology', order: 2 },
  { id: 'fmed-law', subjectId: 'forensic', name: 'Medical Jurisprudence', order: 3 },

  // Medicine
  { id: 'med-cvs', subjectId: 'medicine', name: 'Cardiovascular Medicine', order: 1 },
  { id: 'med-resp', subjectId: 'medicine', name: 'Respiratory Medicine', order: 2 },
  { id: 'med-git', subjectId: 'medicine', name: 'Gastroenterology', order: 3 },
  { id: 'med-neuro', subjectId: 'medicine', name: 'Neurology', order: 4 },
  { id: 'med-endo', subjectId: 'medicine', name: 'Endocrinology', order: 5 },
  { id: 'med-renal', subjectId: 'medicine', name: 'Nephrology', order: 6 },

  // Surgery
  { id: 'surg-general', subjectId: 'surgery', name: 'General Surgery', order: 1 },
  { id: 'surg-git', subjectId: 'surgery', name: 'GI Surgery', order: 2 },
  { id: 'surg-uro', subjectId: 'surgery', name: 'Urology', order: 3 },

  // OBG
  { id: 'obg-obstetrics', subjectId: 'obg', name: 'Obstetrics', order: 1 },
  { id: 'obg-gynec', subjectId: 'obg', name: 'Gynaecology', order: 2 },

  // Pediatrics
  { id: 'peds-neonato', subjectId: 'peds', name: 'Neonatology', order: 1 },
  { id: 'peds-growth', subjectId: 'peds', name: 'Growth & Nutrition', order: 2 },
  { id: 'peds-infect', subjectId: 'peds', name: 'Infectious Diseases', order: 3 },

  // Orthopaedics
  { id: 'ortho-trauma', subjectId: 'ortho', name: 'Trauma & Fractures', order: 1 },
  { id: 'ortho-general', subjectId: 'ortho', name: 'General Orthopaedics', order: 2 },

  // Ophthalmology
  { id: 'ophthal-ant', subjectId: 'ophthalmology', name: 'Anterior Segment', order: 1 },
  { id: 'ophthal-post', subjectId: 'ophthalmology', name: 'Posterior Segment', order: 2 },
  { id: 'ophthal-general', subjectId: 'ophthalmology', name: 'General Ophthalmology', order: 3 },

  // ENT
  { id: 'ent-ear', subjectId: 'ent', name: 'Ear', order: 1 },
  { id: 'ent-nose', subjectId: 'ent', name: 'Nose & Sinuses', order: 2 },
  { id: 'ent-throat', subjectId: 'ent', name: 'Throat & Larynx', order: 3 },

  // Dermatology
  { id: 'derm-general', subjectId: 'dermatology', name: 'General Dermatology', order: 1 },
  { id: 'derm-infect', subjectId: 'dermatology', name: 'Infections', order: 2 },

  // Psychiatry
  { id: 'psych-general', subjectId: 'psychiatry', name: 'General Psychiatry', order: 1 },
  { id: 'psych-disorders', subjectId: 'psychiatry', name: 'Psychiatric Disorders', order: 2 },

  // Radiology (subject)
  { id: 'radio-general', subjectId: 'radiology_sub', name: 'General Radiology', order: 1 },
  { id: 'radio-systemic', subjectId: 'radiology_sub', name: 'Systemic Imaging', order: 2 },
];

// ─── Content Helper ──────────────────────────────────────────────────────────
//
// Usage:
//   topic('anatomy', 'anat-ul', 'Title')                        ← basic
//   topic('anatomy', 'anat-ul', '⭐ Title')                     ← very important
//   topic('anatomy', 'anat-ul', 'Title', `markdown content`)    ← with description
//   topic('anatomy', 'anat-ul', 'Title', `content`, 'Dr. X')    ← with contributor
//   topic('anatomy', 'anat-ul', 'Title', `content`, 'Dr. X', 'Rahul')  ← contributor + editor
//

let _id = 0;

function _add(subjectId: string, unitId: string, title: string, category: CategoryId, content?: string, by?: string, editor?: string): Topic {
  const isVip = title.startsWith('\u2B50 '); // ⭐ prefix
  const cleanTitle = isVip ? title.slice(2) : title;
  _id++;
  return {
    id: `t${_id}`,
    title: cleanTitle,
    subjectId,
    unitId,
    category,
    important: isVip || undefined,
    content,
    by: by || undefined,
    editor: editor || undefined,
  };
}

export const topic  = (s: string, c: string, t: string, content?: string, by?: string, editor?: string) => _add(s, c, t, 'topics', content, by, editor);
export const pyqpdf = (s: string, c: string, t: string, content?: string, by?: string, editor?: string) => _add(s, c, t, 'pyq_pdfs', content, by, editor);
export const pyq    = (s: string, c: string, t: string, content?: string, by?: string, editor?: string) => _add(s, c, t, 'pyqs', content, by, editor);
export const histo  = (s: string, c: string, t: string, content?: string, by?: string, editor?: string) => _add(s, c, t, 'histology', content, by, editor);
export const radio  = (s: string, c: string, t: string, content?: string, by?: string, editor?: string) => _add(s, c, t, 'radiology', content, by, editor);
export const note   = (s: string, c: string, t: string, content?: string, by?: string, editor?: string) => _add(s, c, t, 'notes', content, by, editor);
