// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 1 — Anatomy
// ═══════════════════════════════════════════════════════════════════════════════

import { topic, pyqpdf, pyq, histo, radio, note, type Topic } from '../types';

export const anatomyTopics: Topic[] = [

  // ── Upper Limb ──
  topic('anatomy', 'anat-ul', 'Pectoral Region & Breast', undefined, 'Dr. Sharma'),
  topic('anatomy', 'anat-ul', '⭐ Axilla — Boundaries & Contents', undefined, 'Priya K.', 'Rahul'),
  topic('anatomy', 'anat-ul', '⭐ Brachial Plexus — Formation & Branches', `# Brachial Plexus

## Formation
**Roots → Trunks → Divisions → Cords → Branches**

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
`, 'Dr. Sharma', 'Rahul'),
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

## Histology Diagrams

*Upload your histology diagrams here — replace the lines below with your image URLs:*

\`![Epithelial Tissue Types](https://your-cloud-url.com/epithelial-types.jpg)\`

\`![Simple Squamous Epithelium](https://your-cloud-url.com/simple-squamous.jpg)\`
`, 'Dr. Mehra', 'Rahul'),
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
];
