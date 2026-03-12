// ─── Types ───────────────────────────────────────────────────────────────────

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
}

// ─── Year Metadata ───────────────────────────────────────────────────────────

export const years: { id: YearId; label: string; subtitle: string }[] = [
  { id: 1, label: 'Year 1', subtitle: 'Pre-clinical foundations' },
  { id: 2, label: 'Year 2', subtitle: 'Para-clinical sciences' },
  { id: 3, label: 'Year 3', subtitle: 'Clinical rotations I' },
  { id: 4, label: 'Year 4', subtitle: 'Clinical rotations II' },
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
  { id: 'radiology', name: 'Radiology', icon: '📡', year: 4 },
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

  // Radiology
  { id: 'radio-general', subjectId: 'radiology', name: 'General Radiology', order: 1 },
  { id: 'radio-systemic', subjectId: 'radiology', name: 'Systemic Imaging', order: 2 },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SIMPLE CONTENT HELPERS — Like MS Word, one function per type
// ═══════════════════════════════════════════════════════════════════════════════
//
// HOW TO ADD CONTENT:
//
//   topic('anatomy', 'anat-ul', 'Title')              ← basic topic
//   topic('anatomy', 'anat-ul', '⭐ Title')            ← Very Important topic
//   topic('anatomy', 'anat-ul', 'Title', `content`)   ← topic with description
//   topic('anatomy', 'anat-ul', '⭐ Title', `content`) ← VIP + description
//
//   pyqpdf('anatomy', 'anat-ul', 'Paper 2024')        ← PYQ PDF paper
//   pyq('anatomy', 'anat-ul', 'Heart Q3 2024')        ← individual PYQ
//   histo('anatomy', 'anat-histology', 'Liver')        ← histology slide
//   radio('anatomy', 'anat-thorax', 'Chest X-ray')     ← radiology image
//   note('anatomy', 'anat-ul', 'Quick Ref')            ← notes/summary
//
// That's it. Just pick the function and go.
// ═══════════════════════════════════════════════════════════════════════════════

let _id = 0;

function _add(subjectId: string, unitId: string, title: string, category: CategoryId, content?: string): Topic {
  const isVip = title.startsWith('\u2B50 '); // ⭐ prefix
  const cleanTitle = isVip ? title.slice(2) : title;
  _id++;
  return { id: `t${_id}`, title: cleanTitle, subjectId, unitId, category, important: isVip || undefined, content };
}

// ── One function per type ────────────────────────────────────────────────────
const topic  = (s: string, c: string, t: string, content?: string) => _add(s, c, t, 'topics', content);
const pyqpdf = (s: string, c: string, t: string, content?: string) => _add(s, c, t, 'pyq_pdfs', content);
const pyq    = (s: string, c: string, t: string, content?: string) => _add(s, c, t, 'pyqs', content);
const histo  = (s: string, c: string, t: string, content?: string) => _add(s, c, t, 'histology', content);
const radio  = (s: string, c: string, t: string, content?: string) => _add(s, c, t, 'radiology', content);
const note   = (s: string, c: string, t: string, content?: string) => _add(s, c, t, 'notes', content);


// ═══════════════════════════════════════════════════════════════════════════════
// ALL TOPICS
// ═══════════════════════════════════════════════════════════════════════════════

export const topics: Topic[] = [

  // ════════════════════════════════════════════════════════════════════════════
  // ANATOMY — Year 1
  // ════════════════════════════════════════════════════════════════════════════

  // ── Upper Limb ──
  topic('anatomy', 'anat-ul', 'Pectoral Region & Breast'),
  topic('anatomy', 'anat-ul', '⭐ Axilla — Boundaries & Contents'),
  topic('anatomy', 'anat-ul', '⭐ Brachial Plexus — Formation & Branches', `# Brachial Plexus

## Formation
**Roots \u2192 Trunks \u2192 Divisions \u2192 Cords \u2192 Branches**

> **Mnemonic:** *Robert Taylor Drinks Cold Beer*

### Roots: C5, C6, C7, C8, T1

### Trunks
- **Upper trunk** — C5 + C6
- **Middle trunk** — C7
- **Lower trunk** — C8 + T1

### Cords (named by relation to 2nd part of axillary artery)
- **Lateral cord** — anterior divisions of upper + middle trunks
- **Posterior cord** — all three posterior divisions
- **Medial cord** — anterior division of lower trunk

## Terminal Branches

### Lateral Cord
- Lateral pectoral nerve
- Lateral root of median nerve
- Musculocutaneous nerve

### Posterior Cord — *ULTRA*
- Upper subscapular
- Lower subscapular
- Thoracodorsal
- Radial nerve
- Axillary nerve

### Medial Cord
- Medial pectoral nerve
- Medial cutaneous nerve of arm
- Medial cutaneous nerve of forearm
- Medial root of median nerve
- Ulnar nerve

## Clinical Injuries

| Injury | Root | Presentation |
|--------|------|-------------|
| **Erb-Duchenne** | C5-C6 | Waiter tip position |
| **Klumpke** | C8-T1 | Claw hand, Horner syndrome |
| **Wrist drop** | Radial nerve | Cannot extend wrist/fingers |
| **Claw hand** | Ulnar nerve | Loss of interossei |
`),
  topic('anatomy', 'anat-ul', 'Shoulder Joint'),
  topic('anatomy', 'anat-ul', 'Arm — Muscles & Nerves'),
  topic('anatomy', 'anat-ul', '⭐ Cubital Fossa'),
  topic('anatomy', 'anat-ul', 'Forearm — Flexor Compartment'),
  topic('anatomy', 'anat-ul', 'Forearm — Extensor Compartment'),
  topic('anatomy', 'anat-ul', 'Hand — Muscles & Spaces'),
  topic('anatomy', 'anat-ul', 'Carpal Tunnel & Clinical Anatomy'),
  topic('anatomy', 'anat-ul', 'Dermatomes of Upper Limb'),
  topic('anatomy', 'anat-ul', 'Clavicle & Scapula — Osteology'),
  topic('anatomy', 'anat-ul', 'Humerus — Osteology'),
  topic('anatomy', 'anat-ul', 'Radius & Ulna — Osteology'),
  topic('anatomy', 'anat-ul', 'Elbow Joint'),
  topic('anatomy', 'anat-ul', 'Wrist & Hand — Joints'),
  topic('anatomy', 'anat-ul', '⭐ Rotator Cuff Muscles'),
  topic('anatomy', 'anat-ul', 'Radial Nerve — Course & Branches'),
  topic('anatomy', 'anat-ul', 'Ulnar Nerve — Course & Branches'),
  topic('anatomy', 'anat-ul', 'Median Nerve — Course & Branches'),

  // ── Lower Limb ──
  topic('anatomy', 'anat-ll', '⭐ Femoral Triangle'),
  topic('anatomy', 'anat-ll', 'Femoral Hernia vs Inguinal'),
  topic('anatomy', 'anat-ll', 'Anterior Compartment of Thigh'),
  topic('anatomy', 'anat-ll', 'Medial Compartment of Thigh'),
  topic('anatomy', 'anat-ll', 'Gluteal Region — Muscles & Nerves'),
  topic('anatomy', 'anat-ll', 'Posterior Compartment — Hamstrings'),
  topic('anatomy', 'anat-ll', '⭐ Sciatic Nerve — Course & Branches'),
  topic('anatomy', 'anat-ll', '⭐ Hip Joint'),
  topic('anatomy', 'anat-ll', 'Knee Joint — Locking & Unlocking'),
  topic('anatomy', 'anat-ll', 'Popliteal Fossa'),
  topic('anatomy', 'anat-ll', 'Leg — Anterior & Lateral Compartments'),
  topic('anatomy', 'anat-ll', 'Leg — Posterior Compartment'),
  topic('anatomy', 'anat-ll', 'Ankle Joint & Arches of Foot'),
  topic('anatomy', 'anat-ll', 'Femur — Osteology'),
  topic('anatomy', 'anat-ll', 'Tibia & Fibula — Osteology'),
  topic('anatomy', 'anat-ll', 'Foot Drop — Clinical Anatomy'),
  topic('anatomy', 'anat-ll', 'Trendelenburg Test — Mechanism'),
  topic('anatomy', 'anat-ll', 'Venous Drainage & Varicose Veins'),

  // ── Thorax ──
  topic('anatomy', 'anat-thorax', 'Thoracic Wall & Intercostal Muscles'),
  topic('anatomy', 'anat-thorax', 'Pleura & Pleural Recesses'),
  topic('anatomy', 'anat-thorax', '⭐ Lungs — Surfaces & Hilum'),
  topic('anatomy', 'anat-thorax', '⭐ Mediastinum — Divisions & Contents'),
  topic('anatomy', 'anat-thorax', 'Heart — External Features'),
  topic('anatomy', 'anat-thorax', '⭐ Heart — Blood Supply'),
  topic('anatomy', 'anat-thorax', 'Heart — Conducting System'),
  topic('anatomy', 'anat-thorax', 'Pericardium'),
  topic('anatomy', 'anat-thorax', 'Great Vessels — Aortic Arch'),
  topic('anatomy', 'anat-thorax', 'Superior Vena Cava — Formation'),
  topic('anatomy', 'anat-thorax', 'Thoracic Duct'),
  topic('anatomy', 'anat-thorax', 'Diaphragm — Openings & Development'),

  // ── Abdomen & Pelvis ──
  topic('anatomy', 'anat-abdomen', 'Anterior Abdominal Wall — Layers'),
  topic('anatomy', 'anat-abdomen', '⭐ Inguinal Canal'),
  topic('anatomy', 'anat-abdomen', 'Peritoneum & Peritoneal Folds'),
  topic('anatomy', 'anat-abdomen', 'Stomach — Anatomy & Blood Supply'),
  topic('anatomy', 'anat-abdomen', 'Duodenum — Relations'),
  topic('anatomy', 'anat-abdomen', 'Small & Large Intestine'),
  topic('anatomy', 'anat-abdomen', '⭐ Liver — Surfaces & Segments'),
  topic('anatomy', 'anat-abdomen', '⭐ Portal Vein & Portosystemic Anastomoses'),
  topic('anatomy', 'anat-abdomen', 'Spleen — Anatomy'),
  topic('anatomy', 'anat-abdomen', 'Pancreas — Relations'),
  topic('anatomy', 'anat-abdomen', 'Kidneys & Ureters'),
  topic('anatomy', 'anat-abdomen', 'Suprarenal Glands'),
  topic('anatomy', 'anat-abdomen', 'Pelvis — Bones & Joints'),
  topic('anatomy', 'anat-abdomen', 'Urinary Bladder & Urethra'),
  topic('anatomy', 'anat-abdomen', 'Rectum & Anal Canal'),
  topic('anatomy', 'anat-abdomen', 'Male Reproductive Organs'),
  topic('anatomy', 'anat-abdomen', 'Female Reproductive Organs'),
  topic('anatomy', 'anat-abdomen', 'Perineum'),

  // ── Head & Neck ──
  topic('anatomy', 'anat-headneck', 'Scalp — Layers'),
  topic('anatomy', 'anat-headneck', 'Face — Muscles & Nerve Supply'),
  topic('anatomy', 'anat-headneck', '⭐ Trigeminal Nerve'),
  topic('anatomy', 'anat-headneck', '⭐ Facial Nerve — Course & Branches'),
  topic('anatomy', 'anat-headneck', 'Parotid Gland & Region'),
  topic('anatomy', 'anat-headneck', 'Infratemporal Fossa'),
  topic('anatomy', 'anat-headneck', 'Pterygopalatine Fossa'),
  topic('anatomy', 'anat-headneck', 'Orbit & Extraocular Muscles'),
  topic('anatomy', 'anat-headneck', '⭐ Cavernous Sinus'),
  topic('anatomy', 'anat-headneck', 'Dangerous Area of Face'),
  topic('anatomy', 'anat-headneck', 'External Carotid Artery — Branches'),
  topic('anatomy', 'anat-headneck', 'Internal Carotid Artery'),
  topic('anatomy', 'anat-headneck', '⭐ Thyroid Gland — Anatomy'),
  topic('anatomy', 'anat-headneck', 'Pharynx — Parts & Muscles'),
  topic('anatomy', 'anat-headneck', 'Larynx — Cartilages & Muscles'),
  topic('anatomy', 'anat-headneck', 'Tongue — Muscles & Nerve Supply'),
  topic('anatomy', 'anat-headneck', 'Submandibular Region'),
  topic('anatomy', 'anat-headneck', 'Posterior Triangle of Neck'),
  topic('anatomy', 'anat-headneck', 'Cervical Plexus'),

  // ── Neuroanatomy ──
  topic('anatomy', 'anat-neuro', 'Spinal Cord — External Features'),
  topic('anatomy', 'anat-neuro', 'Spinal Cord — Internal Structure'),
  topic('anatomy', 'anat-neuro', '⭐ Ascending Tracts'),
  topic('anatomy', 'anat-neuro', 'Descending Tracts'),
  topic('anatomy', 'anat-neuro', 'Brainstem — Medulla'),
  topic('anatomy', 'anat-neuro', 'Brainstem — Pons'),
  topic('anatomy', 'anat-neuro', 'Brainstem — Midbrain'),
  topic('anatomy', 'anat-neuro', 'Cerebellum'),
  topic('anatomy', 'anat-neuro', 'Thalamus & Hypothalamus'),
  topic('anatomy', 'anat-neuro', '⭐ Basal Ganglia'),
  topic('anatomy', 'anat-neuro', 'Cerebral Cortex — Functional Areas'),
  topic('anatomy', 'anat-neuro', '⭐ Internal Capsule'),
  topic('anatomy', 'anat-neuro', 'Circle of Willis'),
  topic('anatomy', 'anat-neuro', 'Ventricular System & CSF'),
  topic('anatomy', 'anat-neuro', 'Cranial Nerves — Overview'),
  topic('anatomy', 'anat-neuro', 'Meninges'),

  // ── Embryology ──
  topic('anatomy', 'anat-embryo', 'Gametogenesis'),
  topic('anatomy', 'anat-embryo', 'Fertilization & Implantation'),
  topic('anatomy', 'anat-embryo', 'Bilaminar & Trilaminar Disc'),
  topic('anatomy', 'anat-embryo', 'Placenta & Fetal Membranes'),
  topic('anatomy', 'anat-embryo', '⭐ Development of Heart'),
  topic('anatomy', 'anat-embryo', 'Development of GIT'),
  topic('anatomy', 'anat-embryo', 'Development of Kidney'),
  topic('anatomy', 'anat-embryo', '⭐ Pharyngeal Arches — Derivatives'),
  topic('anatomy', 'anat-embryo', 'Teratology — Overview'),

  // ── General Histology ──
  histo('anatomy', 'anat-histology', '⭐ Epithelial Tissue — Types & ID Points', `## Classification of Epithelium

### By Layers
- **Simple** — single layer
- **Stratified** — multiple layers
- **Pseudostratified** — appears multi-layered but is not

### By Cell Shape
- **Squamous** — flat
- **Cuboidal** — cube-shaped
- **Columnar** — tall

## Common Types

| Type | Location | Function |
|------|----------|----------|
| **Simple squamous** | Alveoli, blood vessels | Diffusion, filtration |
| **Simple cuboidal** | Kidney tubules | Secretion, absorption |
| **Simple columnar** | GI tract | Secretion, absorption |
| **Stratified squamous** | Skin, esophagus | Protection |
| **Pseudostratified** | Trachea | Mucociliary clearance |
| **Transitional** | Urinary bladder | Stretching |

## ID Points for Exam
1. Count the layers (simple vs stratified)
2. Look at the shape of the **topmost** cells
3. Check for cilia, goblet cells, or keratin
`),
  histo('anatomy', 'anat-histology', 'Connective Tissue Types', `## Classification

### Loose CT
- **Areolar** — most widespread, under skin
- **Adipose** — fat storage
- **Reticular** — lymphoid organs

### Dense CT
- **Dense regular** — tendons, ligaments (parallel fibers)
- **Dense irregular** — dermis (random fibers)

### Specialized CT
- Cartilage, Bone, Blood

## Key Fibers

| Fiber | Stain | Feature |
|-------|-------|---------|
| **Collagen** | Eosin (pink) | Thick, wavy |
| **Elastic** | Orcein/Verhoeff | Thin, branching |
| **Reticular** | Silver stain | Fine network |
`),
  histo('anatomy', 'anat-histology', '⭐ Blood Smear — Identification', `## How to Identify Cells

| Cell | Size | Nucleus | Cytoplasm |
|------|------|---------|-----------|
| **Neutrophil** | 12-15 um | 3-5 lobes | Fine pink granules |
| **Eosinophil** | 12-15 um | Bilobed | Large red granules |
| **Basophil** | 10-14 um | S-shaped | Dark blue granules |
| **Lymphocyte** | 7-12 um | Round, dark | Thin blue rim |
| **Monocyte** | 15-20 um | Kidney-shaped | Blue-grey |
| **RBC** | 7 um | No nucleus | Pink biconcave |
| **Platelet** | 2-4 um | No nucleus | Purple fragments |
`),
  histo('anatomy', 'anat-histology', 'Cartilage — Types & ID Points'),
  histo('anatomy', 'anat-histology', 'Bone — Compact & Spongy'),
  histo('anatomy', 'anat-histology', 'Muscle Tissue — Types'),

  // ── Anatomy: Radiology ──
  radio('anatomy', 'anat-thorax', 'Chest X-ray — Normal Anatomy', `## Systematic Approach to CXR

### ABCDE Method
- **A** — Airway (trachea midline?)
- **B** — Bones (ribs, clavicle, spine)
- **C** — Cardiac (size, borders, silhouette)
- **D** — Diaphragm (right higher than left)
- **E** — Everything else (lung fields, soft tissue)

### Normal Landmarks
| Structure | Finding |
|-----------|---------|
| Cardiothoracic ratio | Less than 0.5 |
| Costophrenic angles | Sharp |
| Trachea | Midline |
| Diaphragm | Right higher than left |
`),
  radio('anatomy', 'anat-abdomen', 'Abdominal X-ray — Normal Anatomy'),
  radio('anatomy', 'anat-ul', 'Upper Limb X-ray — Fracture Patterns'),

  // ── Anatomy: PYQs ──
  pyqpdf('anatomy', 'anat-ul', 'Anatomy Paper I — 2024'),
  pyqpdf('anatomy', 'anat-ul', 'Anatomy Paper II — 2024'),
  pyqpdf('anatomy', 'anat-ul', 'Anatomy Paper I — 2023'),
  pyq('anatomy', 'anat-ul', '⭐ Brachial Plexus — Draw & Label (2024)'),
  pyq('anatomy', 'anat-thorax', '⭐ Heart Blood Supply (2024)'),
  pyq('anatomy', 'anat-abdomen', 'Portal Vein Formation (2023)'),
  pyq('anatomy', 'anat-headneck', 'Facial Nerve Course (2023)'),
  pyq('anatomy', 'anat-neuro', 'Internal Capsule (2024)'),

  // ── Anatomy: Notes ──
  note('anatomy', 'anat-ul', '⭐ Brachial Plexus Mnemonics'),
  note('anatomy', 'anat-headneck', 'Cranial Nerves Quick Reference'),
  note('anatomy', 'anat-histology', 'Histology ID Points Summary'),

  // ── Genetics ──
  topic('anatomy', 'anat-genetics', 'Chromosomal Disorders'),
  topic('anatomy', 'anat-genetics', 'Mendelian Inheritance'),
  topic('anatomy', 'anat-genetics', 'Karyotyping'),

  // ════════════════════════════════════════════════════════════════════════════
  // PHYSIOLOGY — Year 1
  // ════════════════════════════════════════════════════════════════════════════

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

  // ════════════════════════════════════════════════════════════════════════════
  // BIOCHEMISTRY — Year 1
  // ════════════════════════════════════════════════════════════════════════════

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

  // ════════════════════════════════════════════════════════════════════════════
  // PATHOLOGY — Year 2
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
  // PHARMACOLOGY — Year 2
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
  // MICROBIOLOGY — Year 2
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
  // FORENSIC MEDICINE — Year 2
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

  // ════════════════════════════════════════════════════════════════════════════
  // MEDICINE — Year 3
  // ════════════════════════════════════════════════════════════════════════════

  topic('medicine', 'med-cvs', 'Hypertension — Management'),
  topic('medicine', 'med-cvs', '⭐ Ischemic Heart Disease'),
  topic('medicine', 'med-cvs', 'Congestive Heart Failure'),
  topic('medicine', 'med-cvs', 'Rheumatic Fever — Jones Criteria'),
  topic('medicine', 'med-cvs', 'Infective Endocarditis'),
  topic('medicine', 'med-resp', '⭐ Asthma — Diagnosis & Management'),
  topic('medicine', 'med-resp', 'COPD'),
  topic('medicine', 'med-resp', 'Pneumonia — Community Acquired'),
  topic('medicine', 'med-resp', '⭐ Tuberculosis — DOTS'),
  topic('medicine', 'med-resp', 'Pleural Effusion'),
  topic('medicine', 'med-git', 'Peptic Ulcer Disease'),
  topic('medicine', 'med-git', 'Liver Cirrhosis — Management'),
  topic('medicine', 'med-git', 'Inflammatory Bowel Disease'),
  topic('medicine', 'med-git', 'Hepatitis — Management'),
  topic('medicine', 'med-neuro', '⭐ Stroke — Classification & Management'),
  topic('medicine', 'med-neuro', 'Epilepsy — Classification'),
  topic('medicine', 'med-neuro', 'Meningitis — CSF Analysis'),
  topic('medicine', 'med-neuro', 'Parkinson Disease'),
  topic('medicine', 'med-endo', '⭐ Diabetes Mellitus — Diagnosis & Management'),
  topic('medicine', 'med-endo', 'Thyroid Disorders — Hypo & Hyper'),
  topic('medicine', 'med-endo', 'Cushing Syndrome'),
  topic('medicine', 'med-endo', 'Addison Disease'),
  topic('medicine', 'med-renal', '⭐ Acute Kidney Injury'),
  topic('medicine', 'med-renal', 'Chronic Kidney Disease'),
  topic('medicine', 'med-renal', 'Nephrotic vs Nephritic Syndrome'),
  topic('medicine', 'med-renal', 'Dialysis — Indications'),
  radio('medicine', 'med-resp', 'Chest X-ray — Pleural Effusion'),
  radio('medicine', 'med-resp', 'Chest X-ray — Pneumonia Patterns'),
  radio('medicine', 'med-neuro', 'CT Head — Stroke Findings'),

  // ════════════════════════════════════════════════════════════════════════════
  // SURGERY — Year 3
  // ════════════════════════════════════════════════════════════════════════════

  topic('surgery', 'surg-general', 'Wound Healing & Management'),
  topic('surgery', 'surg-general', 'Surgical Infections'),
  topic('surgery', 'surg-general', '⭐ Shock — Surgical Management'),
  topic('surgery', 'surg-general', '⭐ Burns — Management'),
  topic('surgery', 'surg-general', 'Fluid & Electrolyte Management'),
  topic('surgery', 'surg-general', 'Pre-operative Assessment'),
  topic('surgery', 'surg-general', 'Thyroid — Surgical Operations'),
  topic('surgery', 'surg-general', 'Breast — Lumps & Cancer'),
  topic('surgery', 'surg-git', '⭐ Appendicitis'),
  topic('surgery', 'surg-git', 'Intestinal Obstruction'),
  topic('surgery', 'surg-git', '⭐ Hernia — Types & Repair'),
  topic('surgery', 'surg-git', 'Gall Stones — Management'),
  topic('surgery', 'surg-git', 'Pancreatic Surgery'),
  topic('surgery', 'surg-uro', 'Urinary Calculi'),
  topic('surgery', 'surg-uro', 'BPH — Management'),
  topic('surgery', 'surg-uro', 'Urethral Stricture'),
  radio('surgery', 'surg-git', 'Abdominal X-ray — Obstruction'),
  radio('surgery', 'surg-uro', 'KUB X-ray — Renal Calculi'),

  // ════════════════════════════════════════════════════════════════════════════
  // OBG — Year 3
  // ════════════════════════════════════════════════════════════════════════════

  topic('obg', 'obg-obstetrics', 'Normal Pregnancy — Diagnosis'),
  topic('obg', 'obg-obstetrics', 'Antenatal Care'),
  topic('obg', 'obg-obstetrics', '⭐ Normal Labor — Stages'),
  topic('obg', 'obg-obstetrics', '⭐ Preeclampsia & Eclampsia'),
  topic('obg', 'obg-obstetrics', 'Antepartum Hemorrhage'),
  topic('obg', 'obg-obstetrics', 'Ectopic Pregnancy'),
  topic('obg', 'obg-obstetrics', 'Cesarean Section — Indications'),
  topic('obg', 'obg-gynec', '⭐ Abnormal Uterine Bleeding'),
  topic('obg', 'obg-gynec', 'Fibroid Uterus'),
  topic('obg', 'obg-gynec', 'Ovarian Tumors — Classification'),
  topic('obg', 'obg-gynec', 'Pelvic Inflammatory Disease'),
  topic('obg', 'obg-gynec', 'Contraception — Methods'),
  topic('obg', 'obg-gynec', 'Infertility — Investigation'),
  radio('obg', 'obg-obstetrics', 'USG — Normal Pregnancy Findings'),

  // ════════════════════════════════════════════════════════════════════════════
  // PEDIATRICS — Year 3
  // ════════════════════════════════════════════════════════════════════════════

  topic('peds', 'peds-neonato', 'Neonatal Resuscitation'),
  topic('peds', 'peds-neonato', '⭐ Neonatal Jaundice'),
  topic('peds', 'peds-neonato', 'Respiratory Distress Syndrome'),
  topic('peds', 'peds-neonato', 'Birth Asphyxia'),
  topic('peds', 'peds-growth', '⭐ Growth Milestones'),
  topic('peds', 'peds-growth', '⭐ Immunization Schedule — NIS'),
  topic('peds', 'peds-growth', 'Malnutrition — PEM'),
  topic('peds', 'peds-growth', 'Vitamin Deficiencies in Children'),
  topic('peds', 'peds-infect', 'Measles & Rubella'),
  topic('peds', 'peds-infect', 'Diphtheria'),
  topic('peds', 'peds-infect', 'Whooping Cough'),
  topic('peds', 'peds-infect', 'Poliomyelitis'),
  topic('peds', 'peds-infect', 'Pediatric HIV'),

  // ════════════════════════════════════════════════════════════════════════════
  // ORTHOPAEDICS — Year 4
  // ════════════════════════════════════════════════════════════════════════════

  topic('ortho', 'ortho-trauma', '⭐ Fracture — Classification & Healing'),
  topic('ortho', 'ortho-trauma', 'Colles Fracture'),
  topic('ortho', 'ortho-trauma', '⭐ Fracture Neck of Femur'),
  topic('ortho', 'ortho-trauma', 'Supracondylar Fracture — Humerus'),
  topic('ortho', 'ortho-trauma', 'Spine Injuries'),
  topic('ortho', 'ortho-trauma', 'Pelvic Fractures'),
  topic('ortho', 'ortho-general', 'Osteoarthritis vs Rheumatoid'),
  topic('ortho', 'ortho-general', 'Bone Tumors — Classification'),
  topic('ortho', 'ortho-general', 'Tuberculosis of Spine — Potts'),
  topic('ortho', 'ortho-general', 'Congenital Disorders — CTEV, DDH'),
  radio('ortho', 'ortho-trauma', 'X-ray — Common Fracture Patterns'),
  radio('ortho', 'ortho-trauma', 'X-ray — Spine Injuries'),

  // ════════════════════════════════════════════════════════════════════════════
  // OPHTHALMOLOGY — Year 4
  // ════════════════════════════════════════════════════════════════════════════

  topic('ophthalmology', 'ophthal-ant', 'Conjunctivitis — Types'),
  topic('ophthalmology', 'ophthal-ant', '⭐ Corneal Ulcer'),
  topic('ophthalmology', 'ophthal-ant', '⭐ Cataract — Types & Management'),
  topic('ophthalmology', 'ophthal-ant', '⭐ Glaucoma — Classification'),
  topic('ophthalmology', 'ophthal-post', 'Diabetic Retinopathy'),
  topic('ophthalmology', 'ophthal-post', 'Retinal Detachment'),
  topic('ophthalmology', 'ophthal-post', 'Papilledema'),
  topic('ophthalmology', 'ophthal-general', 'Refractive Errors'),
  topic('ophthalmology', 'ophthal-general', 'Squint — Types'),
  topic('ophthalmology', 'ophthal-general', 'Eye Injuries — Management'),

  // ════════════════════════════════════════════════════════════════════════════
  // ENT — Year 4
  // ════════════════════════════════════════════════════════════════════════════

  topic('ent', 'ent-ear', '⭐ ASOM & CSOM'),
  topic('ent', 'ent-ear', 'Cholesteatoma'),
  topic('ent', 'ent-ear', 'Hearing Loss — Classification'),
  topic('ent', 'ent-ear', 'Otosclerosis'),
  topic('ent', 'ent-nose', 'Deviated Nasal Septum'),
  topic('ent', 'ent-nose', 'Sinusitis — Acute & Chronic'),
  topic('ent', 'ent-nose', '⭐ Epistaxis — Management'),
  topic('ent', 'ent-nose', 'Nasal Polyps'),
  topic('ent', 'ent-throat', 'Tonsillitis — Acute & Chronic'),
  topic('ent', 'ent-throat', '⭐ Tracheostomy — Indications'),
  topic('ent', 'ent-throat', 'Laryngeal Carcinoma'),
  topic('ent', 'ent-throat', 'Foreign Body — Airway & Esophagus'),

  // ════════════════════════════════════════════════════════════════════════════
  // DERMATOLOGY — Year 4
  // ════════════════════════════════════════════════════════════════════════════

  topic('dermatology', 'derm-general', '⭐ Psoriasis'),
  topic('dermatology', 'derm-general', 'Eczema — Types'),
  topic('dermatology', 'derm-general', 'Lichen Planus'),
  topic('dermatology', 'derm-general', 'Pemphigus & Pemphigoid'),
  topic('dermatology', 'derm-general', 'Drug Reactions — SJS, TEN'),
  topic('dermatology', 'derm-infect', 'Dermatophytosis'),
  topic('dermatology', 'derm-infect', '⭐ Leprosy — Classification'),
  topic('dermatology', 'derm-infect', 'Scabies'),
  topic('dermatology', 'derm-infect', 'STIs — Syphilis, Gonorrhea'),
  histo('dermatology', 'derm-general', 'Skin Biopsy — Psoriasis vs Eczema'),

  // ════════════════════════════════════════════════════════════════════════════
  // PSYCHIATRY — Year 4
  // ════════════════════════════════════════════════════════════════════════════

  topic('psychiatry', 'psych-general', 'Mental Status Examination'),
  topic('psychiatry', 'psych-general', 'Classification — ICD & DSM'),
  topic('psychiatry', 'psych-disorders', '⭐ Schizophrenia'),
  topic('psychiatry', 'psych-disorders', 'Mood Disorders — Depression, Mania'),
  topic('psychiatry', 'psych-disorders', 'Anxiety Disorders'),
  topic('psychiatry', 'psych-disorders', 'OCD'),
  topic('psychiatry', 'psych-disorders', 'Substance Use Disorders'),
  topic('psychiatry', 'psych-disorders', 'Delirium vs Dementia'),

  // ════════════════════════════════════════════════════════════════════════════
  // RADIOLOGY — Year 4
  // ════════════════════════════════════════════════════════════════════════════

  topic('radiology', 'radio-general', 'X-ray — Physics & Safety'),
  topic('radiology', 'radio-general', 'CT vs MRI — Principles'),
  topic('radiology', 'radio-general', 'USG — Basic Principles'),
  topic('radiology', 'radio-systemic', '⭐ Chest X-ray — Interpretation'),
  topic('radiology', 'radio-systemic', 'Abdominal X-ray — Interpretation'),
  topic('radiology', 'radio-systemic', 'Skeletal Radiology — Fractures'),
  topic('radiology', 'radio-systemic', 'Neuroradiology — CT Head'),
  radio('radiology', 'radio-systemic', 'CXR — Cardiomegaly'),
  radio('radiology', 'radio-systemic', 'CXR — Pneumothorax'),
  radio('radiology', 'radio-systemic', 'CT Abdomen — Common Findings'),
];


// ─── Computed Helpers ────────────────────────────────────────────────────────

export function getSubjectsByYear(year: YearId): Subject[] {
  return subjects.filter(s => s.year === year);
}

export function getUnitsBySubject(subjectId: string): Unit[] {
  return units.filter(u => u.subjectId === subjectId).sort((a, b) => a.order - b.order);
}

export function getTopicsByUnit(unitId: string): Topic[] {
  return topics.filter(t => t.unitId === unitId);
}

export function getTopicsBySubject(subjectId: string): Topic[] {
  return topics.filter(t => t.subjectId === subjectId);
}

export function getTopicsBySubjectAndCategory(subjectId: string, categoryId: CategoryId): Topic[] {
  return topics.filter(t => t.subjectId === subjectId && t.category === categoryId);
}

export function getTopicsByYear(year: YearId): Topic[] {
  const yearSubjects = getSubjectsByYear(year);
  const subjectIds = new Set(yearSubjects.map(s => s.id));
  return topics.filter(t => subjectIds.has(t.subjectId));
}

export function searchTopics(query: string, year?: YearId): Topic[] {
  const q = query.toLowerCase();
  let pool = topics;
  if (year) pool = getTopicsByYear(year);
  return pool.filter(t => t.title.toLowerCase().includes(q));
}

export function getImportantTopics(year?: YearId): Topic[] {
  const pool = year ? getTopicsByYear(year) : topics;
  return pool.filter(t => t.important);
}

export function getStats(year?: YearId) {
  const pool = year ? getTopicsByYear(year) : topics;
  return {
    topics: pool.filter(t => t.category === 'topics').length,
    pyq_pdfs: pool.filter(t => t.category === 'pyq_pdfs').length,
    pyqs: pool.filter(t => t.category === 'pyqs').length,
    histology: pool.filter(t => t.category === 'histology').length,
    radiology: pool.filter(t => t.category === 'radiology').length,
    notes: pool.filter(t => t.category === 'notes').length,
    total: pool.length,
    important: pool.filter(t => t.important).length,
  };
}
