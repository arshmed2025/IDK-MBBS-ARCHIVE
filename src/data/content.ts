// ─── Types ───────────────────────────────────────────────────────────────────

export type YearId = 1 | 2 | 3 | 4;

export type CategoryId = 'topics' | 'pyqs' | 'histology' | 'notes';

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
  content?: string; // optional — most won't have it
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
  { id: 'pyqs', name: 'PYQs', icon: '📝' },
  { id: 'histology', name: 'Histology', icon: '🔬' },
  { id: 'notes', name: 'Notes', icon: '✏️' },
];

// ─── Subjects ────────────────────────────────────────────────────────────────

export const subjects: Subject[] = [
  // Year 1
  { id: 'anatomy', name: 'Anatomy', icon: '🦴', year: 1 },
  { id: 'physiology', name: 'Physiology', icon: '🫀', year: 1 },
  { id: 'biochemistry', name: 'Biochemistry', icon: '🧬', year: 1 },

  // Year 2
  { id: 'pathology', name: 'Pathology', icon: '🔬', year: 2 },
  { id: 'pharmacology', name: 'Pharmacology', icon: '💊', year: 2 },
  { id: 'microbiology', name: 'Microbiology', icon: '🦠', year: 2 },
  { id: 'forensic', name: 'Forensic Medicine', icon: '⚖️', year: 2 },

  // Year 3
  { id: 'medicine', name: 'Medicine', icon: '🩺', year: 3 },
  { id: 'surgery', name: 'Surgery', icon: '🔪', year: 3 },
  { id: 'obg', name: 'OBG', icon: '🤰', year: 3 },
  { id: 'peds', name: 'Pediatrics', icon: '👶', year: 3 },

  // Year 4
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

// ─── Topics (hundreds — just titles!) ────────────────────────────────────────
// Helper to generate topic IDs
let _topicCounter = 0;
function t(
  subjectId: string,
  unitId: string,
  title: string,
  category: CategoryId = 'topics',
  important = false,
  content?: string
): Topic {
  _topicCounter++;
  return {
    id: `t-${_topicCounter}`,
    title,
    subjectId,
    unitId,
    category,
    important,
    content,
  };
}

export const topics: Topic[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // ANATOMY
  // ══════════════════════════════════════════════════════════════════════════

  // Upper Limb
  t('anatomy', 'anat-ul', 'Pectoral Region & Breast'),
  t('anatomy', 'anat-ul', 'Axilla — Boundaries & Contents', 'topics', true),
  t('anatomy', 'anat-ul', 'Brachial Plexus — Formation & Branches', 'topics', true, `# Brachial Plexus\n\n## Formation\n**Roots → Trunks → Divisions → Cords → Branches**\n*\"Robert Taylor Drinks Cold Beer\"*\n\n### Roots: C5, C6, C7, C8, T1\n\n### Trunks\n- **Upper trunk** — C5 + C6\n- **Middle trunk** — C7\n- **Lower trunk** — C8 + T1\n\n### Cords (named by relation to 2nd part of axillary artery)\n- **Lateral cord** — anterior divisions of upper + middle trunks\n- **Posterior cord** — all three posterior divisions\n- **Medial cord** — anterior division of lower trunk\n\n## Terminal Branches\n### Lateral Cord — *\"Ladies Love Me\"*\n- Lateral pectoral nerve\n- Lateral root of median nerve\n- Musculocutaneous nerve\n\n### Posterior Cord — *\"ULTRA\"*\n- Upper subscapular\n- Lower subscapular\n- Thoracodorsal\n- Radial nerve\n- Axillary nerve\n\n### Medial Cord — *\"M4 U\"*\n- Medial pectoral nerve\n- Medial cutaneous nerve of arm\n- Medial cutaneous nerve of forearm\n- Medial root of median nerve\n- Ulnar nerve\n\n## Clinical\n| Injury | Root | Deficit |\n|--------|------|---------|\n| Erb-Duchenne | C5-C6 | Waiter's tip position |\n| Klumpke's | C8-T1 | Claw hand, Horner's syndrome |\n| Wrist drop | Radial nerve | Can't extend wrist/fingers |`),
  t('anatomy', 'anat-ul', 'Shoulder Joint'),
  t('anatomy', 'anat-ul', 'Arm — Muscles & Nerves'),
  t('anatomy', 'anat-ul', 'Cubital Fossa', 'topics', true),
  t('anatomy', 'anat-ul', 'Forearm — Flexor Compartment'),
  t('anatomy', 'anat-ul', 'Forearm — Extensor Compartment'),
  t('anatomy', 'anat-ul', 'Hand — Muscles & Spaces'),
  t('anatomy', 'anat-ul', 'Carpal Tunnel & Clinical Anatomy'),
  t('anatomy', 'anat-ul', 'Dermatomes of Upper Limb'),
  t('anatomy', 'anat-ul', 'Clavicle & Scapula — Osteology'),
  t('anatomy', 'anat-ul', 'Humerus — Osteology'),
  t('anatomy', 'anat-ul', 'Radius & Ulna — Osteology'),
  t('anatomy', 'anat-ul', 'Elbow Joint'),
  t('anatomy', 'anat-ul', 'Wrist & Hand — Joints'),
  t('anatomy', 'anat-ul', 'Rotator Cuff Muscles', 'topics', true),
  t('anatomy', 'anat-ul', 'Radial Nerve — Course & Branches'),
  t('anatomy', 'anat-ul', 'Ulnar Nerve — Course & Branches'),
  t('anatomy', 'anat-ul', 'Median Nerve — Course & Branches'),

  // Lower Limb
  t('anatomy', 'anat-ll', 'Femoral Triangle', 'topics', true),
  t('anatomy', 'anat-ll', 'Femoral Hernia vs Inguinal'),
  t('anatomy', 'anat-ll', 'Anterior Compartment of Thigh'),
  t('anatomy', 'anat-ll', 'Medial Compartment of Thigh'),
  t('anatomy', 'anat-ll', 'Gluteal Region — Muscles & Nerves'),
  t('anatomy', 'anat-ll', 'Posterior Compartment — Hamstrings'),
  t('anatomy', 'anat-ll', 'Sciatic Nerve — Course & Branches', 'topics', true),
  t('anatomy', 'anat-ll', 'Hip Joint', 'topics', true),
  t('anatomy', 'anat-ll', 'Knee Joint — Locking & Unlocking'),
  t('anatomy', 'anat-ll', 'Popliteal Fossa'),
  t('anatomy', 'anat-ll', 'Leg — Anterior & Lateral Compartments'),
  t('anatomy', 'anat-ll', 'Leg — Posterior Compartment'),
  t('anatomy', 'anat-ll', 'Ankle Joint & Arches of Foot'),
  t('anatomy', 'anat-ll', 'Femur — Osteology'),
  t('anatomy', 'anat-ll', 'Tibia & Fibula — Osteology'),
  t('anatomy', 'anat-ll', 'Foot Drop — Clinical Anatomy'),
  t('anatomy', 'anat-ll', 'Trendelenburg Test — Mechanism'),
  t('anatomy', 'anat-ll', 'Venous Drainage & Varicose Veins'),

  // Thorax
  t('anatomy', 'anat-thorax', 'Thoracic Wall & Intercostal Muscles'),
  t('anatomy', 'anat-thorax', 'Pleura & Pleural Recesses'),
  t('anatomy', 'anat-thorax', 'Lungs — Surfaces & Hilum', 'topics', true),
  t('anatomy', 'anat-thorax', 'Mediastinum — Divisions & Contents', 'topics', true),
  t('anatomy', 'anat-thorax', 'Heart — External Features'),
  t('anatomy', 'anat-thorax', 'Heart — Blood Supply', 'topics', true),
  t('anatomy', 'anat-thorax', 'Heart — Conducting System'),
  t('anatomy', 'anat-thorax', 'Pericardium'),
  t('anatomy', 'anat-thorax', 'Great Vessels — Aortic Arch'),
  t('anatomy', 'anat-thorax', 'Superior Vena Cava — Formation'),
  t('anatomy', 'anat-thorax', 'Thoracic Duct'),
  t('anatomy', 'anat-thorax', 'Diaphragm — Openings & Development'),

  // Abdomen
  t('anatomy', 'anat-abdomen', 'Anterior Abdominal Wall — Layers'),
  t('anatomy', 'anat-abdomen', 'Inguinal Canal', 'topics', true),
  t('anatomy', 'anat-abdomen', 'Peritoneum & Peritoneal Folds'),
  t('anatomy', 'anat-abdomen', 'Stomach — Anatomy & Blood Supply'),
  t('anatomy', 'anat-abdomen', 'Duodenum — Relations'),
  t('anatomy', 'anat-abdomen', 'Small & Large Intestine'),
  t('anatomy', 'anat-abdomen', 'Liver — Surfaces & Segments', 'topics', true),
  t('anatomy', 'anat-abdomen', 'Portal Vein & Portosystemic Anastomoses', 'topics', true),
  t('anatomy', 'anat-abdomen', 'Spleen — Anatomy'),
  t('anatomy', 'anat-abdomen', 'Pancreas — Relations'),
  t('anatomy', 'anat-abdomen', 'Kidneys & Ureters'),
  t('anatomy', 'anat-abdomen', 'Suprarenal Glands'),
  t('anatomy', 'anat-abdomen', 'Pelvis — Bones & Joints'),
  t('anatomy', 'anat-abdomen', 'Urinary Bladder & Urethra'),
  t('anatomy', 'anat-abdomen', 'Rectum & Anal Canal'),
  t('anatomy', 'anat-abdomen', 'Male Reproductive Organs'),
  t('anatomy', 'anat-abdomen', 'Female Reproductive Organs'),
  t('anatomy', 'anat-abdomen', 'Perineum'),

  // Head & Neck
  t('anatomy', 'anat-headneck', 'Scalp — Layers'),
  t('anatomy', 'anat-headneck', 'Face — Muscles & Nerve Supply'),
  t('anatomy', 'anat-headneck', 'Trigeminal Nerve', 'topics', true),
  t('anatomy', 'anat-headneck', 'Facial Nerve — Course & Branches', 'topics', true),
  t('anatomy', 'anat-headneck', 'Parotid Gland & Region'),
  t('anatomy', 'anat-headneck', 'Infratemporal Fossa'),
  t('anatomy', 'anat-headneck', 'Pterygopalatine Fossa'),
  t('anatomy', 'anat-headneck', 'Orbit & Extraocular Muscles'),
  t('anatomy', 'anat-headneck', 'Cavernous Sinus', 'topics', true),
  t('anatomy', 'anat-headneck', 'Dangerous Area of Face'),
  t('anatomy', 'anat-headneck', 'External Carotid Artery — Branches'),
  t('anatomy', 'anat-headneck', 'Internal Carotid Artery'),
  t('anatomy', 'anat-headneck', 'Thyroid Gland — Anatomy', 'topics', true),
  t('anatomy', 'anat-headneck', 'Pharynx — Parts & Muscles'),
  t('anatomy', 'anat-headneck', 'Larynx — Cartilages & Muscles'),
  t('anatomy', 'anat-headneck', 'Tongue — Muscles & Nerve Supply'),
  t('anatomy', 'anat-headneck', 'Submandibular Region'),
  t('anatomy', 'anat-headneck', 'Posterior Triangle of Neck'),
  t('anatomy', 'anat-headneck', 'Cervical Plexus'),

  // Neuroanatomy
  t('anatomy', 'anat-neuro', 'Spinal Cord — External Features'),
  t('anatomy', 'anat-neuro', 'Spinal Cord — Internal Structure'),
  t('anatomy', 'anat-neuro', 'Ascending Tracts', 'topics', true),
  t('anatomy', 'anat-neuro', 'Descending Tracts'),
  t('anatomy', 'anat-neuro', 'Brainstem — Medulla'),
  t('anatomy', 'anat-neuro', 'Brainstem — Pons'),
  t('anatomy', 'anat-neuro', 'Brainstem — Midbrain'),
  t('anatomy', 'anat-neuro', 'Cerebellum'),
  t('anatomy', 'anat-neuro', 'Thalamus & Hypothalamus'),
  t('anatomy', 'anat-neuro', 'Basal Ganglia', 'topics', true),
  t('anatomy', 'anat-neuro', 'Cerebral Cortex — Functional Areas'),
  t('anatomy', 'anat-neuro', 'Internal Capsule', 'topics', true),
  t('anatomy', 'anat-neuro', 'Circle of Willis'),
  t('anatomy', 'anat-neuro', 'Ventricular System & CSF'),
  t('anatomy', 'anat-neuro', 'Cranial Nerves — Overview'),
  t('anatomy', 'anat-neuro', 'Meninges'),

  // Embryology
  t('anatomy', 'anat-embryo', 'Gametogenesis'),
  t('anatomy', 'anat-embryo', 'Fertilization & Implantation'),
  t('anatomy', 'anat-embryo', 'Bilaminar & Trilaminar Disc'),
  t('anatomy', 'anat-embryo', 'Placenta & Fetal Membranes'),
  t('anatomy', 'anat-embryo', 'Development of Heart', 'topics', true),
  t('anatomy', 'anat-embryo', 'Development of GIT'),
  t('anatomy', 'anat-embryo', 'Development of Kidney'),
  t('anatomy', 'anat-embryo', 'Pharyngeal Arches — Derivatives', 'topics', true),
  t('anatomy', 'anat-embryo', 'Teratology — Overview'),

  // General Histology
  t('anatomy', 'anat-histology', 'Epithelial Tissue — Types & ID Points', 'histology', true, `## Classification of Epithelium

### By Layers
- **Simple** — single layer
- **Stratified** — multiple layers
- **Pseudostratified** — appears stratified but all cells touch basement membrane

### By Cell Shape
- **Squamous** — flat, scale-like
- **Cuboidal** — cube-shaped
- **Columnar** — tall, column-like

![Epithelial Tissue Types](https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Blausen_0306_EpithelialTissue.png/800px-Blausen_0306_EpithelialTissue.png)

## Identification Table

| Type | Location | ID Points |
|------|----------|-----------|
| Simple squamous | Alveoli, Bowman's capsule | Flat cells, fried-egg nuclei |
| Simple cuboidal | PCT, DCT, thyroid follicle | Cube cells, central round nuclei |
| Simple columnar | Stomach, intestine | Tall cells, basal oval nuclei |
| Pseudostratified ciliated columnar | Trachea, bronchi | Cilia on surface, goblet cells |
| Stratified squamous (keratinized) | Skin | Multiple layers, flat surface, no nuclei at top |
| Stratified squamous (non-keratinized) | Esophagus, vagina | Multiple layers, nuclei present at surface |
| Transitional | Urinary bladder | Dome-shaped surface cells, relaxed vs stretched |

## Key Points
- **Basement membrane** separates epithelium from connective tissue
- **Goblet cells** — mucus-secreting, found in respiratory & GI epithelium
- **Cilia** — motile projections, seen in trachea & fallopian tube
- **Microvilli** — brush border, increases absorption (small intestine, PCT)`),
  t('anatomy', 'anat-histology', 'Connective Tissue — Types', 'histology', false, `## Connective Tissue Classification

### Connective Tissue Proper
- **Loose (Areolar)** — most common, found under epithelia
- **Dense Regular** — tendons, ligaments (parallel fibers)
- **Dense Irregular** — dermis, capsules (random fibers)
- **Adipose** — fat storage, insulation

### Specialized
- **Cartilage** — hyaline, elastic, fibrocartilage
- **Bone** — compact, spongy
- **Blood** — fluid connective tissue

![Connective Tissue Types](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Blausen_0195_Connective_Tissue.png/800px-Blausen_0195_Connective_Tissue.png)

## Fiber Types

| Fiber | Stain | Property | Location |
|-------|-------|----------|----------|
| Collagen | Pink (H&E) | Tensile strength | Tendons, dermis, bone |
| Elastic | Orcein stain | Stretch & recoil | Aorta, lung, skin |
| Reticular | Silver stain | Support framework | Liver, spleen, lymph nodes |

## Cells
- **Fibroblasts** — produce fibers & ground substance
- **Macrophages** — phagocytosis
- **Mast cells** — histamine, heparin
- **Plasma cells** — antibodies`),
  t('anatomy', 'anat-histology', 'Cartilage — Hyaline, Elastic, Fibrous', 'histology', false, `## Three Types of Cartilage

### 1. Hyaline Cartilage
- **Most common** type
- Location: trachea, bronchi, nasal septum, articular surfaces
- **ID Points**: Glassy matrix, chondrocytes in lacunae, perichondrium present

![Hyaline Cartilage](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Hyaline_cartilage_-_high_mag.jpg/640px-Hyaline_cartilage_-_high_mag.jpg)

### 2. Elastic Cartilage
- Location: pinna, epiglottis, external ear
- **ID Points**: Dark elastic fibers visible in matrix, more flexible

### 3. Fibrocartilage
- Location: intervertebral disc, pubic symphysis, menisci
- **ID Points**: Dense collagen bundles, no perichondrium, rows of chondrocytes

## Comparison

| Feature | Hyaline | Elastic | Fibro |
|---------|---------|---------|-------|
| Matrix | Glassy | Elastic fibers | Collagen bundles |
| Perichondrium | Yes | Yes | No |
| Flexibility | Moderate | High | Low |
| Regeneration | Poor | Poor | Poor |`),
  t('anatomy', 'anat-histology', 'Bone — Compact & Spongy', 'histology'),
  t('anatomy', 'anat-histology', 'Muscle Tissue — Skeletal, Smooth, Cardiac', 'histology', false, `## Three Types of Muscle

### Skeletal Muscle
- **Voluntary**, striated, multinucleated
- Nuclei are **peripheral** (pushed to sides)
- Long cylindrical fibers

### Smooth Muscle
- **Involuntary**, non-striated
- Spindle-shaped cells with **central nuclei**
- Found in gut, blood vessels, uterus

### Cardiac Muscle
- **Involuntary**, striated
- **Intercalated discs** — unique identifying feature
- Branching fibers, central nuclei

![Muscle Types Comparison](https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Blausen_0801_SkeletalMuscle.png/800px-Blausen_0801_SkeletalMuscle.png)

## Quick ID Table

| Feature | Skeletal | Smooth | Cardiac |
|---------|----------|--------|---------|
| Striations | Yes | No | Yes |
| Nuclei | Peripheral, multiple | Central, single | Central, 1-2 |
| Shape | Long cylindrical | Spindle | Branching |
| Intercalated discs | No | No | **Yes** |
| Control | Voluntary | Involuntary | Involuntary |`),
  t('anatomy', 'anat-histology', 'Nervous Tissue', 'histology'),
  t('anatomy', 'anat-histology', 'Skin — Thick & Thin', 'histology'),
  t('anatomy', 'anat-histology', 'Liver Histology', 'histology', true, `## Liver — Microscopic Structure

### Classic Lobule
- **Hexagonal** shape
- Central vein in the middle
- Portal triads at the corners (portal vein, hepatic artery, bile duct)

![Liver Histology Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Lobules_of_Liver.png/640px-Lobules_of_Liver.png)

### Key Structures

| Structure | Description |
|-----------|-------------|
| **Hepatocytes** | Large polygonal cells arranged in cords/plates |
| **Sinusoids** | Lined by fenestrated endothelium, contain Kupffer cells |
| **Kupffer cells** | Resident macrophages in sinusoids |
| **Space of Disse** | Between hepatocytes and sinusoidal endothelium |
| **Bile canaliculi** | Tiny channels between hepatocytes carrying bile |
| **Portal triad** | Branch of portal vein + hepatic artery + bile duct |

### ID Points for Exam
1. Look for hexagonal lobules
2. Central vein — endothelium only, no muscle
3. Portal triads at periphery
4. Cords of hepatocytes radiating from center
5. Sinusoidal spaces between cords`),
  t('anatomy', 'anat-histology', 'Kidney Histology', 'histology', true, `## Kidney — Microscopic Structure

### Cortex vs Medulla

| Region | Contains |
|--------|----------|
| **Cortex** | Glomeruli, PCT, DCT, cortical collecting ducts |
| **Medulla** | Loops of Henle, collecting ducts, vasa recta |

![Kidney Nephron Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Kidney_Nephron.png/450px-Kidney_Nephron.png)

### Tubule Identification

| Segment | Epithelium | Lumen | ID Points |
|---------|------------|-------|-----------|
| **PCT** | Simple cuboidal with **brush border** | Narrow, irregular | Eosinophilic, fuzzy luminal border |
| **Thin Loop** | Simple squamous | Wide, clear | Resembles capillary but wider |
| **DCT** | Simple cuboidal, **no brush border** | Wide, regular | Lighter staining than PCT |
| **Collecting duct** | Simple cuboidal to columnar | Wide, round | Clear cell boundaries, pale cytoplasm |

### Glomerulus
- **Bowman's capsule** — parietal (simple squamous) + visceral (podocytes)
- **Capillary tuft** — fenestrated endothelium
- **Mesangial cells** — support structure
- **Juxtaglomerular apparatus** — at vascular pole (macula densa + JG cells)`),
  t('anatomy', 'anat-histology', 'Lung Histology', 'histology'),
  t('anatomy', 'anat-histology', 'Small Intestine Histology', 'histology', false, `## Small Intestine — Microscopic Structure

### Four Layers (inside out)
1. **Mucosa** — epithelium + lamina propria + muscularis mucosae
2. **Submucosa** — connective tissue, blood vessels, Meissner's plexus
3. **Muscularis externa** — inner circular + outer longitudinal + Auerbach's plexus
4. **Serosa** — mesothelium

### Regional Differences

| Feature | Duodenum | Jejunum | Ileum |
|---------|----------|---------|-------|
| Villi | Broad, leaf-shaped | Tall, finger-like | Short, club-shaped |
| **Brunner's glands** | **Present** (submucosa) | Absent | Absent |
| **Peyer's patches** | Absent | Absent | **Present** |
| Plicae circulares | Present | Tallest | Fewer |
| Goblet cells | Few | Moderate | Most |

### Key ID Points
- **Villi** — finger-like projections into lumen
- **Crypts of Lieberkuhn** — tubular glands at base of villi
- **Goblet cells** — clear/white mucus-filled cells among enterocytes
- **Paneth cells** — at base of crypts, eosinophilic granules
- **Brunner's glands = Duodenum** (most important distinguishing feature)`),
  t('anatomy', 'anat-histology', 'Trachea Histology', 'histology', false, `## Trachea — Microscopic Structure

### Layers
1. **Mucosa** — pseudostratified ciliated columnar epithelium with goblet cells
2. **Submucosa** — seromucous glands, loose connective tissue
3. **Cartilage** — C-shaped hyaline cartilage rings
4. **Adventitia** — connective tissue

### Key ID Points
- **Pseudostratified ciliated columnar epithelium** — cilia visible at surface
- **Goblet cells** — pale, mucus-filled
- **C-shaped cartilage rings** — open posteriorly
- **Trachealis muscle** — smooth muscle connecting open ends of C-ring posteriorly
- **Seromucous glands** in submucosa`),
  t('anatomy', 'anat-histology', 'Testis & Ovary Histology', 'histology'),

  // Anatomy Genetics
  t('anatomy', 'anat-genetics', 'Cell Division — Mitosis & Meiosis'),
  t('anatomy', 'anat-genetics', 'Chromosomal Abnormalities'),
  t('anatomy', 'anat-genetics', 'Genetic Disorders — Overview'),
  t('anatomy', 'anat-genetics', 'Karyotyping'),

  // Anatomy PYQs
  t('anatomy', 'anat-ul', 'PYQ: Brachial Plexus (2024)', 'pyqs', true),
  t('anatomy', 'anat-ul', 'PYQ: Rotator Cuff (2024)', 'pyqs'),
  t('anatomy', 'anat-ul', 'PYQ: Cubital Fossa (2024)', 'pyqs'),
  t('anatomy', 'anat-thorax', 'PYQ: Heart Blood Supply (2024)', 'pyqs', true),
  t('anatomy', 'anat-abdomen', 'PYQ: Inguinal Canal (2024)', 'pyqs'),
  t('anatomy', 'anat-ll', 'PYQ: Femoral Triangle (2023)', 'pyqs'),
  t('anatomy', 'anat-headneck', 'PYQ: Dangerous Area of Face (2023)', 'pyqs'),
  t('anatomy', 'anat-neuro', 'PYQ: Internal Capsule (2023)', 'pyqs'),
  t('anatomy', 'anat-embryo', 'PYQ: Pharyngeal Arch Derivatives (2024)', 'pyqs'),
  t('anatomy', 'anat-histology', 'PYQ: Kidney Histology (2024)', 'pyqs'),
  t('anatomy', 'anat-ll', 'PYQ: Knee Joint (2024)', 'pyqs'),
  t('anatomy', 'anat-headneck', 'PYQ: Circle of Willis (2023)', 'pyqs'),

  // Anatomy Notes
  t('anatomy', 'anat-ul', 'Brachial Plexus — Mnemonics', 'notes', true),
  t('anatomy', 'anat-ul', 'Carpal Bones Mnemonic', 'notes'),
  t('anatomy', 'anat-ll', 'Nerve Injuries — Lower Limb Summary', 'notes'),
  t('anatomy', 'anat-headneck', 'Cranial Nerves — Mnemonics', 'notes', true),
  t('anatomy', 'anat-abdomen', 'Retroperitoneal Structures — SAD PUCKER', 'notes'),

  // ══════════════════════════════════════════════════════════════════════════
  // PHYSIOLOGY
  // ══════════════════════════════════════════════════════════════════════════

  // General Physiology
  t('physiology', 'phys-general', 'Body Fluid Compartments'),
  t('physiology', 'phys-general', 'Cell Membrane — Transport Mechanisms', 'topics', true),
  t('physiology', 'phys-general', 'Homeostasis'),

  // Blood
  t('physiology', 'phys-blood', 'Blood — Composition & Functions'),
  t('physiology', 'phys-blood', 'Plasma Proteins'),
  t('physiology', 'phys-blood', 'RBC — Structure & Metabolism'),
  t('physiology', 'phys-blood', 'Hemoglobin — Structure & Types', 'topics', true),
  t('physiology', 'phys-blood', 'Erythropoiesis'),
  t('physiology', 'phys-blood', 'Anemia — Classification'),
  t('physiology', 'phys-blood', 'WBC — Types & Functions'),
  t('physiology', 'phys-blood', 'Platelet — Functions'),
  t('physiology', 'phys-blood', 'Hemostasis & Coagulation Cascade', 'topics', true),
  t('physiology', 'phys-blood', 'Blood Groups — ABO & Rh', 'topics', true),
  t('physiology', 'phys-blood', 'Blood Transfusion'),
  t('physiology', 'phys-blood', 'Immunity — Innate & Adaptive'),

  // Nerve & Muscle
  t('physiology', 'phys-nerve', 'Resting Membrane Potential', 'topics', true),
  t('physiology', 'phys-nerve', 'Action Potential — Ionic Basis', 'topics', true),
  t('physiology', 'phys-nerve', 'Nerve Fiber Classification'),
  t('physiology', 'phys-nerve', 'Neuromuscular Junction'),
  t('physiology', 'phys-nerve', 'Skeletal Muscle — Contraction', 'topics', true),
  t('physiology', 'phys-nerve', 'Smooth Muscle Physiology'),
  t('physiology', 'phys-nerve', 'Synaptic Transmission'),
  t('physiology', 'phys-nerve', 'Degeneration & Regeneration of Nerves'),

  // CVS
  t('physiology', 'phys-cvs', 'Cardiac Action Potential', 'topics', true),
  t('physiology', 'phys-cvs', 'Cardiac Cycle', 'topics', true),
  t('physiology', 'phys-cvs', 'Heart Sounds'),
  t('physiology', 'phys-cvs', 'ECG — Normal & Interpretation', 'topics', true),
  t('physiology', 'phys-cvs', 'Cardiac Output — Regulation'),
  t('physiology', 'phys-cvs', 'Blood Pressure — Regulation', 'topics', true),
  t('physiology', 'phys-cvs', 'Shock — Types & Pathophysiology'),
  t('physiology', 'phys-cvs', 'Regional Circulation'),
  t('physiology', 'phys-cvs', 'Jugular Venous Pulse'),
  t('physiology', 'phys-cvs', 'Exercise Physiology — CVS Changes'),

  // Respiratory
  t('physiology', 'phys-resp', 'Lung Volumes & Capacities', 'topics', true),
  t('physiology', 'phys-resp', 'Mechanics of Breathing'),
  t('physiology', 'phys-resp', 'Surfactant'),
  t('physiology', 'phys-resp', 'Gas Exchange — Diffusion'),
  t('physiology', 'phys-resp', 'O₂-Hb Dissociation Curve', 'topics', true),
  t('physiology', 'phys-resp', 'CO₂ Transport & Chloride Shift'),
  t('physiology', 'phys-resp', 'Regulation of Respiration'),
  t('physiology', 'phys-resp', 'Artificial Respiration & Hypoxia'),
  t('physiology', 'phys-resp', 'Ventilation-Perfusion Ratio'),

  // Renal
  t('physiology', 'phys-renal', 'Renal Blood Flow — Autoregulation'),
  t('physiology', 'phys-renal', 'GFR — Measurement & Regulation', 'topics', true),
  t('physiology', 'phys-renal', 'Tubular Reabsorption & Secretion'),
  t('physiology', 'phys-renal', 'Countercurrent Mechanism', 'topics', true),
  t('physiology', 'phys-renal', 'Concentration & Dilution of Urine'),
  t('physiology', 'phys-renal', 'Acid-Base Balance', 'topics', true),
  t('physiology', 'phys-renal', 'Juxtaglomerular Apparatus'),
  t('physiology', 'phys-renal', 'Micturition'),
  t('physiology', 'phys-renal', 'Renal Function Tests'),

  // GIT
  t('physiology', 'phys-git', 'Salivary Secretion'),
  t('physiology', 'phys-git', 'Gastric Secretion — Regulation', 'topics', true),
  t('physiology', 'phys-git', 'Pancreatic Secretion'),
  t('physiology', 'phys-git', 'Bile — Secretion & Composition'),
  t('physiology', 'phys-git', 'Intestinal Secretion & Absorption'),
  t('physiology', 'phys-git', 'GI Motility — Peristalsis'),
  t('physiology', 'phys-git', 'Deglutition'),
  t('physiology', 'phys-git', 'Vomiting — Mechanism'),
  t('physiology', 'phys-git', 'GI Hormones'),

  // Endocrine
  t('physiology', 'phys-endo', 'General Principles of Endocrinology'),
  t('physiology', 'phys-endo', 'Hypothalamo-Pituitary Axis', 'topics', true),
  t('physiology', 'phys-endo', 'Growth Hormone', 'topics', true),
  t('physiology', 'phys-endo', 'Thyroid Hormones', 'topics', true),
  t('physiology', 'phys-endo', 'Adrenal Cortex — Cortisol & Aldosterone'),
  t('physiology', 'phys-endo', 'Adrenal Medulla'),
  t('physiology', 'phys-endo', 'Insulin & Glucagon', 'topics', true),
  t('physiology', 'phys-endo', 'Calcium Homeostasis — PTH, Calcitonin, Vit D'),
  t('physiology', 'phys-endo', 'Posterior Pituitary — ADH & Oxytocin'),

  // CNS
  t('physiology', 'phys-cns', 'Sensory Receptors — Classification'),
  t('physiology', 'phys-cns', 'Pain — Pathways & Modulation'),
  t('physiology', 'phys-cns', 'Reflexes — Stretch & Withdrawal'),
  t('physiology', 'phys-cns', 'Motor System — UMN vs LMN', 'topics', true),
  t('physiology', 'phys-cns', 'Cerebellum — Functions'),
  t('physiology', 'phys-cns', 'Basal Ganglia — Functions'),
  t('physiology', 'phys-cns', 'Sleep — Stages & EEG'),
  t('physiology', 'phys-cns', 'Learning & Memory'),
  t('physiology', 'phys-cns', 'Vision — Retina & Visual Pathway', 'topics', true),
  t('physiology', 'phys-cns', 'Hearing — Mechanism'),
  t('physiology', 'phys-cns', 'Taste & Smell'),
  t('physiology', 'phys-cns', 'Autonomic Nervous System'),

  // Reproductive
  t('physiology', 'phys-repro', 'Male Reproductive Physiology'),
  t('physiology', 'phys-repro', 'Spermatogenesis'),
  t('physiology', 'phys-repro', 'Female Reproductive Physiology'),
  t('physiology', 'phys-repro', 'Menstrual Cycle', 'topics', true),
  t('physiology', 'phys-repro', 'Pregnancy — Hormonal Changes'),
  t('physiology', 'phys-repro', 'Lactation'),
  t('physiology', 'phys-repro', 'Contraception — Physiological Basis'),

  // Physiology PYQs
  t('physiology', 'phys-cvs', 'PYQ: Cardiac Cycle — Wiggers (2024)', 'pyqs', true),
  t('physiology', 'phys-resp', 'PYQ: O₂-Hb Dissociation Curve (2024)', 'pyqs', true),
  t('physiology', 'phys-renal', 'PYQ: JGA & GFR (2024)', 'pyqs'),
  t('physiology', 'phys-cns', 'PYQ: Hearing Mechanism (2024)', 'pyqs'),
  t('physiology', 'phys-endo', 'PYQ: Thyroid Hormones (2024)', 'pyqs'),
  t('physiology', 'phys-renal', 'PYQ: Countercurrent Mechanism (2024)', 'pyqs'),
  t('physiology', 'phys-cvs', 'PYQ: ECG Components (2024)', 'pyqs'),
  t('physiology', 'phys-resp', 'PYQ: Lung Volumes (2024)', 'pyqs'),
  t('physiology', 'phys-blood', 'PYQ: Rh Incompatibility (2024)', 'pyqs'),
  t('physiology', 'phys-nerve', 'PYQ: NMJ — Transmission (2023)', 'pyqs'),
  t('physiology', 'phys-cns', 'PYQ: UMN vs LMN (2024)', 'pyqs'),

  // Physiology Notes
  t('physiology', 'phys-endo', 'Endocrine Summary Table', 'notes', true),
  t('physiology', 'phys-blood', 'Blood Cell Counts — Quick Ref', 'notes'),
  t('physiology', 'phys-cvs', 'Heart Sounds — Mnemonic', 'notes'),
  t('physiology', 'phys-renal', 'Acid-Base Disorders — Flowchart', 'notes'),

  // Physiology Histology
  t('physiology', 'phys-blood', 'Blood Smear — Cell ID Points', 'histology', true),

  // ══════════════════════════════════════════════════════════════════════════
  // BIOCHEMISTRY
  // ══════════════════════════════════════════════════════════════════════════

  // Chemistry of Biomolecules
  t('biochemistry', 'bio-chemistry', 'Amino Acids — Classification'),
  t('biochemistry', 'bio-chemistry', 'Protein Structure — Primary to Quaternary'),
  t('biochemistry', 'bio-chemistry', 'Carbohydrates — Mono, Di, Polysaccharides'),
  t('biochemistry', 'bio-chemistry', 'Lipids — Classification'),
  t('biochemistry', 'bio-chemistry', 'Nucleotides & Nucleic Acids'),

  // Enzymology
  t('biochemistry', 'bio-enzymes', 'Enzyme Classification — IUB', 'topics', true),
  t('biochemistry', 'bio-enzymes', 'Michaelis-Menten Kinetics', 'topics', true),
  t('biochemistry', 'bio-enzymes', 'Enzyme Inhibition — Types'),
  t('biochemistry', 'bio-enzymes', 'Allosteric Regulation'),
  t('biochemistry', 'bio-enzymes', 'Isoenzymes — Clinical Significance', 'topics', true),
  t('biochemistry', 'bio-enzymes', 'Clinical Enzymology — LDH, CK, AST, ALT'),

  // Carbohydrate Metabolism
  t('biochemistry', 'bio-carb', 'Glycolysis — Steps & Regulation', 'topics', true),
  t('biochemistry', 'bio-carb', 'TCA Cycle — Steps & Energetics', 'topics', true),
  t('biochemistry', 'bio-carb', 'ETC & Oxidative Phosphorylation', 'topics', true),
  t('biochemistry', 'bio-carb', 'Gluconeogenesis'),
  t('biochemistry', 'bio-carb', 'Glycogen Metabolism'),
  t('biochemistry', 'bio-carb', 'HMP Shunt — Reactions & Significance', 'topics', true),
  t('biochemistry', 'bio-carb', 'Cori Cycle & Glucose-Alanine Cycle'),
  t('biochemistry', 'bio-carb', 'Blood Glucose Regulation'),
  t('biochemistry', 'bio-carb', 'Diabetes Mellitus — Biochemical Basis'),
  t('biochemistry', 'bio-carb', 'Galactose & Fructose Metabolism'),

  // Lipid Metabolism
  t('biochemistry', 'bio-lipid', 'β-Oxidation of Fatty Acids', 'topics', true),
  t('biochemistry', 'bio-lipid', 'Fatty Acid Synthesis'),
  t('biochemistry', 'bio-lipid', 'Ketone Body Metabolism', 'topics', true),
  t('biochemistry', 'bio-lipid', 'Cholesterol Metabolism'),
  t('biochemistry', 'bio-lipid', 'Lipoproteins — Types & Functions'),
  t('biochemistry', 'bio-lipid', 'Phospholipids & Prostaglandins'),
  t('biochemistry', 'bio-lipid', 'Fatty Liver — Causes'),

  // Protein & AA Metabolism
  t('biochemistry', 'bio-protein', 'Transamination & Deamination', 'topics', true),
  t('biochemistry', 'bio-protein', 'Urea Cycle — Steps & Energetics', 'topics', true),
  t('biochemistry', 'bio-protein', 'Phenylalanine Metabolism — PKU', 'topics', true),
  t('biochemistry', 'bio-protein', 'Tyrosine Metabolism'),
  t('biochemistry', 'bio-protein', 'Tryptophan Metabolism'),
  t('biochemistry', 'bio-protein', 'Glycine Metabolism — Heme Synthesis'),
  t('biochemistry', 'bio-protein', 'Sulfur Amino Acids — Met, Cys'),
  t('biochemistry', 'bio-protein', 'Branched Chain AA Metabolism'),
  t('biochemistry', 'bio-protein', 'Inborn Errors of Metabolism'),

  // Nucleic Acid & Molecular Biology
  t('biochemistry', 'bio-nucleic', 'DNA Structure & Replication', 'topics', true),
  t('biochemistry', 'bio-nucleic', 'Transcription'),
  t('biochemistry', 'bio-nucleic', 'Translation — Protein Synthesis'),
  t('biochemistry', 'bio-nucleic', 'Post-Translational Modifications'),
  t('biochemistry', 'bio-nucleic', 'Gene Regulation'),
  t('biochemistry', 'bio-nucleic', 'Mutations & DNA Repair'),
  t('biochemistry', 'bio-nucleic', 'Recombinant DNA Technology — PCR, Blotting'),
  t('biochemistry', 'bio-nucleic', 'Purine & Pyrimidine Metabolism'),

  // Vitamins & Minerals
  t('biochemistry', 'bio-vitamins', 'Fat-Soluble Vitamins — A, D, E, K', 'topics', true),
  t('biochemistry', 'bio-vitamins', 'Water-Soluble Vitamins — B Complex', 'topics', true),
  t('biochemistry', 'bio-vitamins', 'Vitamin C — Functions & Deficiency'),
  t('biochemistry', 'bio-vitamins', 'Iron Metabolism'),
  t('biochemistry', 'bio-vitamins', 'Calcium & Phosphorus'),
  t('biochemistry', 'bio-vitamins', 'Trace Elements — Zinc, Copper, Selenium'),

  // Hormones & Signal Transduction
  t('biochemistry', 'bio-hormones', 'Signal Transduction — G-Proteins'),
  t('biochemistry', 'bio-hormones', 'Second Messengers — cAMP, IP3'),
  t('biochemistry', 'bio-hormones', 'Insulin Signaling'),
  t('biochemistry', 'bio-hormones', 'Steroid Hormone Mechanism'),

  // Clinical Biochemistry
  t('biochemistry', 'bio-clinical', 'Liver Function Tests'),
  t('biochemistry', 'bio-clinical', 'Renal Function Tests'),
  t('biochemistry', 'bio-clinical', 'Electrolyte Imbalance'),
  t('biochemistry', 'bio-clinical', 'Tumor Markers'),
  t('biochemistry', 'bio-clinical', 'Acid-Base Disorders — ABG Analysis'),
  t('biochemistry', 'bio-clinical', 'Jaundice — Types & Biochemical Basis'),

  // Biochemistry PYQs
  t('biochemistry', 'bio-carb', 'PYQ: TCA Cycle (2024)', 'pyqs', true),
  t('biochemistry', 'bio-protein', 'PYQ: Phenylalanine Metabolism (2024)', 'pyqs', true),
  t('biochemistry', 'bio-carb', 'PYQ: HMP Shunt (2024)', 'pyqs'),
  t('biochemistry', 'bio-protein', 'PYQ: Urea Cycle (2024)', 'pyqs'),
  t('biochemistry', 'bio-lipid', 'PYQ: β-Oxidation (2024)', 'pyqs'),
  t('biochemistry', 'bio-vitamins', 'PYQ: Vitamins as Coenzymes (2024)', 'pyqs'),
  t('biochemistry', 'bio-enzymes', 'PYQ: Isoenzymes (2024)', 'pyqs'),
  t('biochemistry', 'bio-clinical', 'PYQ: Tumor Markers (2024)', 'pyqs'),

  // Biochemistry Notes
  t('biochemistry', 'bio-vitamins', 'Vitamins — Complete Summary Table', 'notes', true),
  t('biochemistry', 'bio-carb', 'Glycolysis & TCA — Flowchart', 'notes'),
  t('biochemistry', 'bio-enzymes', 'Enzyme Inhibition — Comparison Table', 'notes'),
  t('biochemistry', 'bio-protein', 'Amino Acid Metabolism — Mind Map', 'notes'),

  // ══════════════════════════════════════════════════════════════════════════
  // PATHOLOGY (Year 2)
  // ══════════════════════════════════════════════════════════════════════════
  t('pathology', 'path-general', 'Cell Injury & Adaptation', 'topics', true),
  t('pathology', 'path-general', 'Necrosis — Types'),
  t('pathology', 'path-general', 'Apoptosis vs Necrosis'),
  t('pathology', 'path-general', 'Inflammation — Acute', 'topics', true),
  t('pathology', 'path-general', 'Inflammation — Chronic'),
  t('pathology', 'path-general', 'Granulomatous Inflammation'),
  t('pathology', 'path-general', 'Wound Healing & Repair'),
  t('pathology', 'path-general', 'Hemodynamic Disorders — Thrombosis, Embolism', 'topics', true),
  t('pathology', 'path-general', 'Edema — Types & Pathogenesis'),
  t('pathology', 'path-general', 'Shock — Pathology'),
  t('pathology', 'path-general', 'Neoplasia — General Principles', 'topics', true),
  t('pathology', 'path-general', 'Tumor Nomenclature'),
  t('pathology', 'path-general', 'Carcinogenesis — Molecular Basis'),
  t('pathology', 'path-general', 'Metastasis — Routes & Mechanism'),
  t('pathology', 'path-general', 'Amyloidosis'),
  t('pathology', 'path-hemato', 'Anemia — Iron Deficiency', 'topics', true),
  t('pathology', 'path-hemato', 'Megaloblastic Anemia'),
  t('pathology', 'path-hemato', 'Hemolytic Anemias'),
  t('pathology', 'path-hemato', 'Sickle Cell Anemia'),
  t('pathology', 'path-hemato', 'Thalassemia'),
  t('pathology', 'path-hemato', 'Leukemia — Classification'),
  t('pathology', 'path-hemato', 'Lymphoma — Hodgkin vs Non-Hodgkin'),
  t('pathology', 'path-hemato', 'Bleeding Disorders — Overview'),
  t('pathology', 'path-hemato', 'DIC — Pathogenesis'),
  t('pathology', 'path-systemic', 'Atherosclerosis'),
  t('pathology', 'path-systemic', 'Myocardial Infarction — Pathology', 'topics', true),
  t('pathology', 'path-systemic', 'Rheumatic Heart Disease'),
  t('pathology', 'path-systemic', 'Tuberculosis — Pathology', 'topics', true),
  t('pathology', 'path-systemic', 'Pneumonias — Types'),
  t('pathology', 'path-systemic', 'Glomerulonephritis — Classification'),
  t('pathology', 'path-systemic', 'Liver — Cirrhosis & Hepatitis'),
  t('pathology', 'path-systemic', 'Breast Carcinoma'),
  t('pathology', 'path-systemic', 'Cervical Carcinoma — Pap Smear'),
  t('pathology', 'path-clinical', 'Peripheral Blood Smear Findings', 'histology'),
  t('pathology', 'path-clinical', 'Bone Marrow — Examination', 'histology'),

  // ══════════════════════════════════════════════════════════════════════════
  // PHARMACOLOGY (Year 2)
  // ══════════════════════════════════════════════════════════════════════════
  t('pharmacology', 'pharm-general', 'Pharmacokinetics — ADME', 'topics', true),
  t('pharmacology', 'pharm-general', 'Pharmacodynamics — Receptors', 'topics', true),
  t('pharmacology', 'pharm-general', 'Drug Interactions'),
  t('pharmacology', 'pharm-general', 'Adverse Drug Reactions'),
  t('pharmacology', 'pharm-ans', 'Cholinergic Drugs', 'topics', true),
  t('pharmacology', 'pharm-ans', 'Anticholinergic Drugs'),
  t('pharmacology', 'pharm-ans', 'Adrenergic Drugs'),
  t('pharmacology', 'pharm-ans', 'Adrenergic Blockers'),
  t('pharmacology', 'pharm-ans', 'Neuromuscular Blocking Agents'),
  t('pharmacology', 'pharm-cvs', 'Antihypertensives — Overview', 'topics', true),
  t('pharmacology', 'pharm-cvs', 'Anti-anginal Drugs'),
  t('pharmacology', 'pharm-cvs', 'Antiarrhythmics'),
  t('pharmacology', 'pharm-cvs', 'Drugs for Heart Failure'),
  t('pharmacology', 'pharm-cvs', 'Diuretics — Classification', 'topics', true),
  t('pharmacology', 'pharm-cvs', 'Anticoagulants & Thrombolytics'),
  t('pharmacology', 'pharm-cns', 'General Anesthetics'),
  t('pharmacology', 'pharm-cns', 'Local Anesthetics'),
  t('pharmacology', 'pharm-cns', 'Opioid Analgesics', 'topics', true),
  t('pharmacology', 'pharm-cns', 'NSAIDs', 'topics', true),
  t('pharmacology', 'pharm-cns', 'Antiepileptics'),
  t('pharmacology', 'pharm-cns', 'Antidepressants'),
  t('pharmacology', 'pharm-cns', 'Antipsychotics'),
  t('pharmacology', 'pharm-cns', 'Sedatives & Hypnotics'),
  t('pharmacology', 'pharm-chemo', 'Antibiotics — β-Lactams', 'topics', true),
  t('pharmacology', 'pharm-chemo', 'Aminoglycosides'),
  t('pharmacology', 'pharm-chemo', 'Macrolides'),
  t('pharmacology', 'pharm-chemo', 'Fluoroquinolones'),
  t('pharmacology', 'pharm-chemo', 'Antitubercular Drugs', 'topics', true),
  t('pharmacology', 'pharm-chemo', 'Antifungal Drugs'),
  t('pharmacology', 'pharm-chemo', 'Antiviral Drugs'),
  t('pharmacology', 'pharm-chemo', 'Antimalarial Drugs'),
  t('pharmacology', 'pharm-chemo', 'Anticancer Drugs — Overview'),
  t('pharmacology', 'pharm-endo', 'Insulin & Oral Hypoglycemics', 'topics', true),
  t('pharmacology', 'pharm-endo', 'Thyroid & Antithyroid Drugs'),
  t('pharmacology', 'pharm-endo', 'Corticosteroids'),
  t('pharmacology', 'pharm-endo', 'Oral Contraceptives'),

  // ══════════════════════════════════════════════════════════════════════════
  // MICROBIOLOGY (Year 2)
  // ══════════════════════════════════════════════════════════════════════════
  t('microbiology', 'micro-general', 'Sterilization & Disinfection', 'topics', true),
  t('microbiology', 'micro-general', 'Culture Media — Types'),
  t('microbiology', 'micro-general', 'Staining Methods — Gram, ZN, Albert'),
  t('microbiology', 'micro-bacteria', 'Staphylococcus', 'topics', true),
  t('microbiology', 'micro-bacteria', 'Streptococcus'),
  t('microbiology', 'micro-bacteria', 'Mycobacterium tuberculosis', 'topics', true),
  t('microbiology', 'micro-bacteria', 'Salmonella — Typhoid'),
  t('microbiology', 'micro-bacteria', 'Clostridium — Tetanus, Botulism'),
  t('microbiology', 'micro-bacteria', 'E. coli — Pathogenic Strains'),
  t('microbiology', 'micro-bacteria', 'Neisseria — Meningococcus, Gonococcus'),
  t('microbiology', 'micro-virus', 'HIV — Virology & Diagnosis', 'topics', true),
  t('microbiology', 'micro-virus', 'Hepatitis Viruses — A to E', 'topics', true),
  t('microbiology', 'micro-virus', 'Dengue & Chikungunya'),
  t('microbiology', 'micro-virus', 'Rabies'),
  t('microbiology', 'micro-virus', 'Influenza'),
  t('microbiology', 'micro-virus', 'COVID-19 — SARS-CoV-2'),
  t('microbiology', 'micro-parasit', 'Malaria — Plasmodium Species', 'topics', true),
  t('microbiology', 'micro-parasit', 'Entamoeba histolytica'),
  t('microbiology', 'micro-parasit', 'Helminths — Overview'),
  t('microbiology', 'micro-immuno', 'Innate vs Adaptive Immunity'),
  t('microbiology', 'micro-immuno', 'Immunoglobulins — Types & Functions', 'topics', true),
  t('microbiology', 'micro-immuno', 'Hypersensitivity Reactions — Types I-IV', 'topics', true),
  t('microbiology', 'micro-immuno', 'Vaccines — Types & Schedule'),
  t('microbiology', 'micro-immuno', 'Autoimmune Diseases'),

  // ══════════════════════════════════════════════════════════════════════════
  // FORENSIC MEDICINE (Year 2)
  // ══════════════════════════════════════════════════════════════════════════
  t('forensic', 'fmed-general', 'Cause & Manner of Death'),
  t('forensic', 'fmed-general', 'Post-mortem Changes', 'topics', true),
  t('forensic', 'fmed-general', 'Asphyxia — Types', 'topics', true),
  t('forensic', 'fmed-general', 'Injuries — Mechanical'),
  t('forensic', 'fmed-general', 'Firearm Injuries'),
  t('forensic', 'fmed-general', 'Burns & Scalds'),
  t('forensic', 'fmed-tox', 'General Toxicology — Principles'),
  t('forensic', 'fmed-tox', 'Organophosphorus Poisoning', 'topics', true),
  t('forensic', 'fmed-tox', 'Corrosive Poisoning'),
  t('forensic', 'fmed-tox', 'Snake Bite — Management'),
  t('forensic', 'fmed-tox', 'Alcohol — Forensic Aspects'),
  t('forensic', 'fmed-law', 'IPC — Medical Sections'),
  t('forensic', 'fmed-law', 'Consent — Types & Validity', 'topics', true),
  t('forensic', 'fmed-law', 'Medical Negligence'),
  t('forensic', 'fmed-law', 'Sexual Offences — Medicolegal'),

  // ══════════════════════════════════════════════════════════════════════════
  // MEDICINE (Year 3)
  // ══════════════════════════════════════════════════════════════════════════
  t('medicine', 'med-cvs', 'Hypertension — Management'),
  t('medicine', 'med-cvs', 'Ischemic Heart Disease', 'topics', true),
  t('medicine', 'med-cvs', 'Congestive Heart Failure'),
  t('medicine', 'med-cvs', 'Rheumatic Fever — Jones Criteria'),
  t('medicine', 'med-cvs', 'Infective Endocarditis'),
  t('medicine', 'med-resp', 'Asthma — Diagnosis & Management', 'topics', true),
  t('medicine', 'med-resp', 'COPD'),
  t('medicine', 'med-resp', 'Pneumonia — Community Acquired'),
  t('medicine', 'med-resp', 'Tuberculosis — DOTS', 'topics', true),
  t('medicine', 'med-resp', 'Pleural Effusion'),
  t('medicine', 'med-git', 'Peptic Ulcer Disease'),
  t('medicine', 'med-git', 'Liver Cirrhosis — Management'),
  t('medicine', 'med-git', 'Inflammatory Bowel Disease'),
  t('medicine', 'med-git', 'Hepatitis — Management'),
  t('medicine', 'med-neuro', 'Stroke — Classification & Management', 'topics', true),
  t('medicine', 'med-neuro', 'Epilepsy — Classification'),
  t('medicine', 'med-neuro', 'Meningitis — CSF Analysis'),
  t('medicine', 'med-neuro', 'Parkinson Disease'),
  t('medicine', 'med-endo', 'Diabetes Mellitus — Diagnosis & Management', 'topics', true),
  t('medicine', 'med-endo', 'Thyroid Disorders — Hypo & Hyper'),
  t('medicine', 'med-endo', 'Cushing Syndrome'),
  t('medicine', 'med-endo', 'Addison Disease'),
  t('medicine', 'med-renal', 'Acute Kidney Injury', 'topics', true),
  t('medicine', 'med-renal', 'Chronic Kidney Disease'),
  t('medicine', 'med-renal', 'Nephrotic vs Nephritic Syndrome'),
  t('medicine', 'med-renal', 'Dialysis — Indications'),

  // ══════════════════════════════════════════════════════════════════════════
  // SURGERY (Year 3)
  // ══════════════════════════════════════════════════════════════════════════
  t('surgery', 'surg-general', 'Wound Healing & Management'),
  t('surgery', 'surg-general', 'Surgical Infections'),
  t('surgery', 'surg-general', 'Shock — Surgical Management', 'topics', true),
  t('surgery', 'surg-general', 'Burns — Management', 'topics', true),
  t('surgery', 'surg-general', 'Fluid & Electrolyte Management'),
  t('surgery', 'surg-general', 'Pre-operative Assessment'),
  t('surgery', 'surg-general', 'Thyroid — Surgical Anatomy & Operations'),
  t('surgery', 'surg-general', 'Breast — Lumps & Cancer'),
  t('surgery', 'surg-git', 'Appendicitis', 'topics', true),
  t('surgery', 'surg-git', 'Intestinal Obstruction'),
  t('surgery', 'surg-git', 'Hernia — Types & Repair', 'topics', true),
  t('surgery', 'surg-git', 'Gall Stones — Management'),
  t('surgery', 'surg-git', 'Pancreatic Surgery'),
  t('surgery', 'surg-uro', 'Urinary Calculi'),
  t('surgery', 'surg-uro', 'BPH — Management'),
  t('surgery', 'surg-uro', 'Urethral Stricture'),

  // ══════════════════════════════════════════════════════════════════════════
  // OBG (Year 3)
  // ══════════════════════════════════════════════════════════════════════════
  t('obg', 'obg-obstetrics', 'Normal Pregnancy — Diagnosis'),
  t('obg', 'obg-obstetrics', 'Antenatal Care'),
  t('obg', 'obg-obstetrics', 'Normal Labor — Stages', 'topics', true),
  t('obg', 'obg-obstetrics', 'Preeclampsia & Eclampsia', 'topics', true),
  t('obg', 'obg-obstetrics', 'Antepartum Hemorrhage'),
  t('obg', 'obg-obstetrics', 'Ectopic Pregnancy'),
  t('obg', 'obg-obstetrics', 'Cesarean Section — Indications'),
  t('obg', 'obg-gynec', 'Abnormal Uterine Bleeding', 'topics', true),
  t('obg', 'obg-gynec', 'Fibroid Uterus'),
  t('obg', 'obg-gynec', 'Ovarian Tumors — Classification'),
  t('obg', 'obg-gynec', 'Pelvic Inflammatory Disease'),
  t('obg', 'obg-gynec', 'Contraception — Methods'),
  t('obg', 'obg-gynec', 'Infertility — Investigation'),

  // ══════════════════════════════════════════════════════════════════════════
  // PEDIATRICS (Year 3)
  // ══════════════════════════════════════════════════════════════════════════
  t('peds', 'peds-neonato', 'Neonatal Resuscitation'),
  t('peds', 'peds-neonato', 'Neonatal Jaundice', 'topics', true),
  t('peds', 'peds-neonato', 'Respiratory Distress Syndrome'),
  t('peds', 'peds-neonato', 'Birth Asphyxia'),
  t('peds', 'peds-growth', 'Growth Milestones', 'topics', true),
  t('peds', 'peds-growth', 'Immunization Schedule — NIS', 'topics', true),
  t('peds', 'peds-growth', 'Malnutrition — PEM'),
  t('peds', 'peds-growth', 'Vitamin Deficiencies in Children'),
  t('peds', 'peds-infect', 'Measles & Rubella'),
  t('peds', 'peds-infect', 'Diphtheria'),
  t('peds', 'peds-infect', 'Whooping Cough'),
  t('peds', 'peds-infect', 'Poliomyelitis'),
  t('peds', 'peds-infect', 'Pediatric HIV'),

  // ══════════════════════════════════════════════════════════════════════════
  // ORTHOPAEDICS (Year 4)
  // ══════════════════════════════════════════════════════════════════════════
  t('ortho', 'ortho-trauma', 'Fracture — Classification & Healing', 'topics', true),
  t('ortho', 'ortho-trauma', 'Colles Fracture'),
  t('ortho', 'ortho-trauma', 'Fracture Neck of Femur', 'topics', true),
  t('ortho', 'ortho-trauma', 'Supracondylar Fracture — Humerus'),
  t('ortho', 'ortho-trauma', 'Spine Injuries'),
  t('ortho', 'ortho-trauma', 'Pelvic Fractures'),
  t('ortho', 'ortho-general', 'Osteoarthritis vs Rheumatoid'),
  t('ortho', 'ortho-general', 'Bone Tumors — Classification'),
  t('ortho', 'ortho-general', 'Tuberculosis of Spine — Pott\'s'),
  t('ortho', 'ortho-general', 'Congenital Disorders — CTEV, DDH'),

  // ══════════════════════════════════════════════════════════════════════════
  // OPHTHALMOLOGY (Year 4)
  // ══════════════════════════════════════════════════════════════════════════
  t('ophthalmology', 'ophthal-ant', 'Conjunctivitis — Types'),
  t('ophthalmology', 'ophthal-ant', 'Corneal Ulcer', 'topics', true),
  t('ophthalmology', 'ophthal-ant', 'Cataract — Types & Management', 'topics', true),
  t('ophthalmology', 'ophthal-ant', 'Glaucoma — Classification', 'topics', true),
  t('ophthalmology', 'ophthal-post', 'Diabetic Retinopathy'),
  t('ophthalmology', 'ophthal-post', 'Retinal Detachment'),
  t('ophthalmology', 'ophthal-post', 'Papilledema'),
  t('ophthalmology', 'ophthal-general', 'Refractive Errors'),
  t('ophthalmology', 'ophthal-general', 'Squint — Types'),
  t('ophthalmology', 'ophthal-general', 'Eye Injuries — Management'),

  // ══════════════════════════════════════════════════════════════════════════
  // ENT (Year 4)
  // ══════════════════════════════════════════════════════════════════════════
  t('ent', 'ent-ear', 'ASOM & CSOM', 'topics', true),
  t('ent', 'ent-ear', 'Cholesteatoma'),
  t('ent', 'ent-ear', 'Hearing Loss — Classification'),
  t('ent', 'ent-ear', 'Otosclerosis'),
  t('ent', 'ent-nose', 'Deviated Nasal Septum'),
  t('ent', 'ent-nose', 'Sinusitis — Acute & Chronic'),
  t('ent', 'ent-nose', 'Epistaxis — Management', 'topics', true),
  t('ent', 'ent-nose', 'Nasal Polyps'),
  t('ent', 'ent-throat', 'Tonsillitis — Acute & Chronic'),
  t('ent', 'ent-throat', 'Tracheostomy — Indications', 'topics', true),
  t('ent', 'ent-throat', 'Laryngeal Carcinoma'),
  t('ent', 'ent-throat', 'Foreign Body — Airway & Esophagus'),

  // ══════════════════════════════════════════════════════════════════════════
  // DERMATOLOGY (Year 4)
  // ══════════════════════════════════════════════════════════════════════════
  t('dermatology', 'derm-general', 'Psoriasis', 'topics', true),
  t('dermatology', 'derm-general', 'Eczema — Types'),
  t('dermatology', 'derm-general', 'Lichen Planus'),
  t('dermatology', 'derm-general', 'Pemphigus & Pemphigoid'),
  t('dermatology', 'derm-general', 'Drug Reactions — SJS, TEN'),
  t('dermatology', 'derm-infect', 'Dermatophytosis'),
  t('dermatology', 'derm-infect', 'Leprosy — Classification', 'topics', true),
  t('dermatology', 'derm-infect', 'Scabies'),
  t('dermatology', 'derm-infect', 'STIs — Syphilis, Gonorrhea'),

  // ══════════════════════════════════════════════════════════════════════════
  // PSYCHIATRY (Year 4)
  // ══════════════════════════════════════════════════════════════════════════
  t('psychiatry', 'psych-general', 'Mental Status Examination'),
  t('psychiatry', 'psych-general', 'Classification — ICD & DSM'),
  t('psychiatry', 'psych-disorders', 'Schizophrenia', 'topics', true),
  t('psychiatry', 'psych-disorders', 'Mood Disorders — Depression, Mania'),
  t('psychiatry', 'psych-disorders', 'Anxiety Disorders'),
  t('psychiatry', 'psych-disorders', 'OCD'),
  t('psychiatry', 'psych-disorders', 'Substance Use Disorders'),
  t('psychiatry', 'psych-disorders', 'Delirium vs Dementia'),

  // ══════════════════════════════════════════════════════════════════════════
  // RADIOLOGY (Year 4)
  // ══════════════════════════════════════════════════════════════════════════
  t('radiology', 'radio-general', 'X-ray — Physics & Safety'),
  t('radiology', 'radio-general', 'CT vs MRI — Principles'),
  t('radiology', 'radio-general', 'USG — Basic Principles'),
  t('radiology', 'radio-systemic', 'Chest X-ray — Interpretation', 'topics', true),
  t('radiology', 'radio-systemic', 'Abdominal X-ray — Interpretation'),
  t('radiology', 'radio-systemic', 'Skeletal Radiology — Fractures'),
  t('radiology', 'radio-systemic', 'Neuroradiology — CT Head'),
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
  if (year) {
    pool = getTopicsByYear(year);
  }
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
    pyqs: pool.filter(t => t.category === 'pyqs').length,
    histology: pool.filter(t => t.category === 'histology').length,
    notes: pool.filter(t => t.category === 'notes').length,
    total: pool.length,
    important: pool.filter(t => t.important).length,
  };
}
