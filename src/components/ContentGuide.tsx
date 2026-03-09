import { ArrowLeft, Copy, Check, Lock, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface ContentGuideProps {
  onBack: () => void;
}

/* ── Copy-able code block ─────────────────────────────────────────────────── */
function CopyBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="group relative my-3 rounded-xl bg-slate-900 text-sm">
      {label && (
        <div className="flex items-center justify-between border-b border-slate-700/50 px-4 py-2">
          <span className="text-[11px] font-medium text-slate-400">{label}</span>
          <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-300">
            {copied ? (<><Check size={12} className="text-emerald-400" /><span className="text-emerald-400">Copied!</span></>) : (<><Copy size={12} />Copy</>)}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-slate-300">
        <code>{code}</code>
      </pre>
      {!label && (
        <button onClick={handleCopy} className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-slate-800 px-2 py-1 text-[11px] text-slate-400 opacity-0 transition-all hover:text-slate-300 group-hover:opacity-100">
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
        </button>
      )}
    </div>
  );
}

/* ── Collapsible section ──────────────────────────────────────────────────── */
function Section({ title, icon, children, defaultOpen = false }: { title: string; icon: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-4 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-slate-50">
        <span className="text-lg">{icon}</span>
        <span className="flex-1 text-sm font-semibold text-slate-800">{title}</span>
        {open ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
      </button>
      {open && <div className="border-t border-slate-100 px-5 py-4">{children}</div>}
    </div>
  );
}

/* ── Preview box showing what markdown renders as ─────────────────────────── */
function Preview({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 rounded-xl border border-dashed border-blue-200 bg-blue-50/30 p-4">
      <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-blue-400">Preview — what it looks like</div>
      <div className="text-sm text-slate-700">{children}</div>
    </div>
  );
}

/* ── Small inline code style ──────────────────────────────────────────────── */
function C({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-700">{children}</code>;
}

/* ── Main Guide ───────────────────────────────────────────────────────────── */
export function ContentGuide({ onBack }: ContentGuideProps) {
  return (
    <div className="max-w-3xl pb-16">
      {/* Header */}
      <div className="mb-8">
        <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-slate-600">
          <ArrowLeft size={14} /> Back
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900">
            <Lock size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin — Content Guide</h1>
            <p className="text-sm text-slate-400">Complete reference for adding and formatting content.</p>
          </div>
        </div>
      </div>

      {/* The one file */}
      <div className="mb-6 rounded-2xl border border-amber-100 bg-amber-50/50 p-5">
        <h2 className="mb-1 text-sm font-semibold text-amber-800">🔑 Everything is in ONE file</h2>
        <p className="text-sm leading-relaxed text-amber-700">
          Open <C>src/data/content.ts</C> — scroll to the <C>topics</C> array — add your line — save — done.
        </p>
      </div>

      {/* ================================================================== */}
      {/* SECTION 1: ADDING A TOPIC */}
      {/* ================================================================== */}
      <Section title="Adding a Topic (title only — no description needed)" icon="1️⃣" defaultOpen={true}>
        <p className="mb-3 text-sm text-slate-500">Most topics only need a title. One line per topic.</p>
        <CopyBlock
          label="Format: t(subjectId, chapterId, title)"
          code={`t('anatomy', 'anat-ul', 'Axillary Artery — Parts & Branches'),`}
        />
        <div className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
          <strong className="text-slate-700">Parameters:</strong>
          <ul className="mt-1 ml-4 list-disc space-y-0.5">
            <li><C>'anatomy'</C> — subject ID (see reference below)</li>
            <li><C>'anat-ul'</C> — chapter/unit ID (see reference below)</li>
            <li><C>'Axillary Artery...'</C> — the title shown to students</li>
          </ul>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SECTION 2: TOPIC TYPES */}
      {/* ================================================================== */}
      <Section title="Topic Types — Topics, PYQs, Histology, Notes" icon="2️⃣">
        <p className="mb-3 text-sm text-slate-500">Add a 4th parameter to set the type. Default is <C>'topics'</C>.</p>
        <CopyBlock
          label="Four types"
          code={`// Topic (default — no 4th param needed)
t('anatomy', 'anat-ul', 'Brachial Plexus'),

// PYQ — previous year question
t('anatomy', 'anat-ul', 'PYQ: Brachial Plexus (2024)', 'pyqs'),

// Histology — slides, diagrams, microscopy
t('anatomy', 'anat-histology', 'Liver Histology', 'histology'),

// Notes — mnemonics, summaries, quick refs
t('anatomy', 'anat-ul', 'Brachial Plexus Mnemonics', 'notes'),`}
        />
      </Section>

      {/* ================================================================== */}
      {/* SECTION 3: HIGH YIELD */}
      {/* ================================================================== */}
      <Section title="Mark as High Yield / Important ⭐" icon="3️⃣">
        <p className="mb-3 text-sm text-slate-500">Add <C>true</C> as the 5th parameter. Gets a ⭐ badge and appears in High Yield section.</p>
        <CopyBlock
          label="5th param = true"
          code={`// High yield topic
t('anatomy', 'anat-ul', 'Brachial Plexus', 'topics', true),

// High yield PYQ
t('physiology', 'phys-cvs', 'PYQ: Cardiac Cycle (2024)', 'pyqs', true),

// Not high yield (default)
t('anatomy', 'anat-ul', 'Forearm Muscles'),`}
        />
      </Section>

      {/* ================================================================== */}
      {/* SECTION 4: ADDING DESCRIPTIONS */}
      {/* ================================================================== */}
      <Section title="Adding a Description / Detailed Notes" icon="4️⃣">
        <p className="mb-3 text-sm text-slate-500">
          Add description as the 6th parameter inside backticks <C>{`\`...\``}</C> (template literal). 
          This is optional — only topics with a description show a "View" button.
        </p>
        <CopyBlock
          label="6th param = content in backticks"
          code={`t('anatomy', 'anat-ul', 'Brachial Plexus', 'topics', true,
\`## Formation
Roots → Trunks → Divisions → Cords → Branches

**Remember:** Robert Taylor Drinks Cold Beer

- Musculocutaneous nerve
- Median nerve
- Ulnar nerve
\`),`}
        />
        <div className="mt-3 rounded-lg bg-emerald-50 border border-emerald-100 p-3 text-xs text-emerald-700">
          <strong>💡 Tip:</strong> If a topic doesn't need a description, just skip the 6th param. 
          The topic will appear as a plain title — no "View" button shown.
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SECTION 5: FORMATTING REFERENCE — THE BIG ONE */}
      {/* ================================================================== */}
      <Section title="Formatting Cheatsheet — Everything You Can Use" icon="📝" defaultOpen={true}>
        <p className="mb-4 text-sm text-slate-500">
          All formatting goes inside the backtick <C>{`\`...\``}</C> content (6th param). Here is every formatting option:
        </p>

        {/* ── Headings ─────────────────────────────────────────────── */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Headings</h3>
          <CopyBlock code={`# Big Heading
## Medium Heading
### Small Heading`} />
          <Preview>
            <div className="text-2xl font-bold text-slate-900">Big Heading</div>
            <div className="text-lg font-semibold text-slate-800 mt-2">Medium Heading</div>
            <div className="text-base font-semibold text-slate-700 mt-2">Small Heading</div>
          </Preview>
        </div>

        {/* ── Bold, Italic, Code ───────────────────────────────────── */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Bold, Italic & Inline Code</h3>
          <CopyBlock code={`**This is bold text**
*This is italic text*
***This is bold AND italic***
\`This is inline code\``} />
          <Preview>
            <p><strong className="font-semibold text-slate-900">This is bold text</strong></p>
            <p><em className="italic text-slate-700">This is italic text</em></p>
            <p><strong className="font-semibold italic text-slate-900">This is bold AND italic</strong></p>
            <p><code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-rose-600">This is inline code</code></p>
          </Preview>
        </div>

        {/* ── Lists ────────────────────────────────────────────────── */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Bullet Lists</h3>
          <CopyBlock code={`- First point
- Second point
- Third point with **bold** inside`} />
          <Preview>
            <ul className="ml-5 list-disc space-y-1">
              <li>First point</li>
              <li>Second point</li>
              <li>Third point with <strong>bold</strong> inside</li>
            </ul>
          </Preview>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Numbered Lists</h3>
          <CopyBlock code={`1. First step
2. Second step
3. Third step`} />
          <Preview>
            <ol className="ml-5 list-decimal space-y-1">
              <li>First step</li>
              <li>Second step</li>
              <li>Third step</li>
            </ol>
          </Preview>
        </div>

        {/* ── Tables ───────────────────────────────────────────────── */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Tables</h3>
          <CopyBlock label="Pipe syntax — separator line with dashes is required" code={`| Feature | Type A | Type B |
|---------|--------|--------|
| Color | Red | Blue |
| Size | Large | Small |
| Weight | Heavy | Light |`} />
          <Preview>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-700">Feature</th>
                    <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-700">Type A</th>
                    <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-700">Type B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-slate-50/50">
                    <td className="border-b border-slate-100 px-3 py-2 text-slate-600">Color</td>
                    <td className="border-b border-slate-100 px-3 py-2 text-slate-600">Red</td>
                    <td className="border-b border-slate-100 px-3 py-2 text-slate-600">Blue</td>
                  </tr>
                  <tr>
                    <td className="border-b border-slate-100 px-3 py-2 text-slate-600">Size</td>
                    <td className="border-b border-slate-100 px-3 py-2 text-slate-600">Large</td>
                    <td className="border-b border-slate-100 px-3 py-2 text-slate-600">Small</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="border-b border-slate-100 px-3 py-2 text-slate-600">Weight</td>
                    <td className="border-b border-slate-100 px-3 py-2 text-slate-600">Heavy</td>
                    <td className="border-b border-slate-100 px-3 py-2 text-slate-600">Light</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Preview>
          <div className="mt-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
            <strong className="text-slate-700">Rules:</strong>
            <ul className="mt-1 ml-4 list-disc space-y-0.5">
              <li>Start each row with <C>|</C> and separate columns with <C>|</C></li>
              <li>The 2nd line MUST have dashes: <C>|------|------|</C></li>
              <li>You can use <C>**bold**</C> inside table cells</li>
              <li>Columns don't need to be perfectly aligned — just use pipes</li>
            </ul>
          </div>
        </div>

        {/* ── Images ───────────────────────────────────────────────── */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">🖼️ Images & Diagrams</h3>
          <CopyBlock label="Syntax: ![caption](image-url)" code={`![Liver Histology — Central vein and hepatocytes](https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Lobules_of_Liver.png/640px-Lobules_of_Liver.png)`} />
          <Preview>
            <div className="rounded-xl border border-slate-200 bg-slate-100 p-6 text-center text-slate-400 text-xs">
              [ Image loads here — full width, rounded, with shadow ]
              <div className="mt-2 text-slate-500">↑ Caption: "Liver Histology — Central vein and hepatocytes"</div>
            </div>
          </Preview>

          <div className="mt-3 space-y-2">
            <div className="rounded-lg bg-violet-50 border border-violet-100 p-3 text-xs text-violet-700">
              <strong>🔬 For Histology Diagrams:</strong>
              <ul className="mt-1 ml-4 list-disc space-y-0.5">
                <li>Take a photo of your microscopy slide</li>
                <li>Upload it (see hosting options below)</li>
                <li>Paste the URL in the image syntax</li>
                <li>The caption below will describe what to look for</li>
              </ul>
            </div>

            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600">
              <strong className="text-slate-800">Where to host images (free):</strong>
              <ul className="mt-1 ml-4 list-disc space-y-1">
                <li><strong>Imgur</strong> — Go to <C>imgur.com</C> → Upload → Copy "Direct Link"</li>
                <li><strong>Postimages</strong> — Go to <C>postimages.org</C> → Upload → Copy "Direct link"</li>
                <li><strong>GitHub</strong> — Upload to a repo → click file → Copy raw URL</li>
                <li><strong>Wikipedia Commons</strong> — Search existing medical diagrams → Copy image URL</li>
                <li><strong>Google Drive</strong> — Upload → Share → Get link → Change to "Anyone with link" → Use format:<br/>
                  <C>{`https://drive.google.com/uc?export=view&id=YOUR_FILE_ID`}</C>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Multiple images ──────────────────────────────────────── */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Multiple Images in One Topic</h3>
          <CopyBlock label="Just put each image on its own line" code={`## Low Power View
![Kidney cortex — 4x magnification](https://your-image-url-1.jpg)

## High Power View
![PCT and DCT — 40x magnification](https://your-image-url-2.jpg)

## Diagram
![Nephron structure — labeled](https://your-image-url-3.jpg)`} />
        </div>

        {/* ── Blockquotes ──────────────────────────────────────────── */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Blockquotes (for mnemonics, important notes)</h3>
          <CopyBlock code={`> **Remember:** Some Lovers Try Positions That They Can't Handle
> (Scaphoid, Lunate, Triquetral, Pisiform, Trapezium, Trapezoid, Capitate, Hamate)`} />
          <Preview>
            <blockquote className="border-l-[3px] border-blue-200 bg-blue-50/50 px-4 py-2 text-sm italic text-slate-600">
              <p><strong className="text-slate-800">Remember:</strong> Some Lovers Try Positions That They Can't Handle</p>
              <p>(Scaphoid, Lunate, Triquetral, Pisiform, Trapezium, Trapezoid, Capitate, Hamate)</p>
            </blockquote>
          </Preview>
        </div>

        {/* ── Horizontal rule ──────────────────────────────────────── */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Horizontal Line (separator)</h3>
          <CopyBlock code={`Some text above

---

Some text below`} />
          <Preview>
            <p className="text-slate-600">Some text above</p>
            <hr className="my-2 border-slate-200" />
            <p className="text-slate-600">Some text below</p>
          </Preview>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SECTION 6: FULL REAL EXAMPLES */}
      {/* ================================================================== */}
      <Section title="Full Real Examples — Copy & Modify" icon="📋">
        
        {/* Example 1: Histology topic with image + table */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-500">Example 1: Histology Topic with Diagram + Table</h3>
          <CopyBlock
            label="Histology topic with image, table, and ID points"
            code={`t('anatomy', 'anat-histology', 'Liver Histology', 'histology', true,
\`## Liver — Microscopic Structure

### Classic Lobule
- **Hexagonal** shape
- Central vein in the middle
- Portal triads at corners

![Liver histology — classic lobule structure](https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Lobules_of_Liver.png/640px-Lobules_of_Liver.png)

### Key Structures

| Structure | Description |
|-----------|-------------|
| **Hepatocytes** | Large polygonal cells in cords |
| **Sinusoids** | Lined by fenestrated endothelium |
| **Kupffer cells** | Resident macrophages |
| **Space of Disse** | Between hepatocytes and sinusoids |
| **Bile canaliculi** | Tiny channels carrying bile |
| **Portal triad** | Portal vein + hepatic artery + bile duct |

### ID Points for Exam
1. Look for hexagonal lobules
2. Central vein — endothelium only
3. Portal triads at periphery
4. Cords of hepatocytes radiating outward
\`),`}
          />
        </div>

        {/* Example 2: Clinical topic with mnemonic */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-500">Example 2: Clinical Topic with Mnemonic + Table</h3>
          <CopyBlock
            label="Brachial plexus with mnemonic and injury table"
            code={`t('anatomy', 'anat-ul', 'Brachial Plexus', 'topics', true,
\`# Brachial Plexus

## Formation
**Roots → Trunks → Divisions → Cords → Branches**

> **Mnemonic:** *Robert Taylor Drinks Cold Beer*

## Terminal Branches

### Lateral Cord
- Lateral pectoral nerve
- Musculocutaneous nerve
- Lateral root of median nerve

### Posterior Cord
- Axillary nerve
- Radial nerve
- Thoracodorsal nerve

### Medial Cord
- Ulnar nerve
- Medial root of median nerve
- Medial pectoral nerve

---

## Clinical Injuries

| Injury | Root | Presentation |
|--------|------|-------------|
| **Erb-Duchenne** | C5-C6 | Waiter tip position |
| **Klumpke** | C8-T1 | Claw hand |
| **Wrist drop** | Radial | Cannot extend wrist |
\`),`}
          />
        </div>

        {/* Example 3: Simple PYQ */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-500">Example 3: PYQ with Answer</h3>
          <CopyBlock
            label="PYQ with formatted answer"
            code={`t('physiology', 'phys-cvs', 'PYQ: Cardiac Cycle (2024)', 'pyqs', true,
\`## Question
Draw and label the Wiggers diagram. Explain the events of the cardiac cycle.

---

## Answer Outline

### Phases
1. Atrial systole
2. Isovolumetric contraction
3. Rapid ejection
4. Reduced ejection
5. Isovolumetric relaxation
6. Rapid filling
7. Reduced filling (diastasis)

### Key Pressures

| Phase | Aortic | Ventricular | Atrial |
|-------|--------|-------------|--------|
| Systole peak | 120 mmHg | 120 mmHg | *a wave* |
| Diastole | 80 mmHg | 0 mmHg | *v wave* |

### Heart Sounds
- **S1** — closure of AV valves (mitral + tricuspid)
- **S2** — closure of semilunar valves (aortic + pulmonary)

![Wiggers Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Wiggers_Diagram_2.svg/500px-Wiggers_Diagram_2.svg.png)
\`),`}
          />
        </div>

        {/* Example 4: Biochemistry pathway */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-500">Example 4: Biochemistry with Steps + Enzyme Table</h3>
          <CopyBlock
            label="Glycolysis with pathway steps and regulation"
            code={`t('biochemistry', 'bio-carb', 'Glycolysis', 'topics', true,
\`## Glycolysis — 10 Steps

**Location:** Cytoplasm
**Net yield:** 2 ATP + 2 NADH + 2 Pyruvate

### Irreversible (Regulatory) Steps

| Step | Enzyme | Regulation |
|------|--------|------------|
| 1 | **Hexokinase** | Inhibited by G6P |
| 3 | **PFK-1** | *Rate-limiting*. Activated by AMP, F2,6BP |
| 10 | **Pyruvate kinase** | Activated by F1,6BP |

> **Key:** PFK-1 is the **rate-limiting enzyme** of glycolysis

### Energy Balance
- ATP used: **2** (steps 1 and 3)
- ATP produced: **4** (steps 7 and 10)
- Net ATP: **2**
- NADH produced: **2** (step 6)

![Glycolysis Pathway](https://your-diagram-url.jpg)
\`),`}
          />
        </div>

        {/* Example 5: Bulk titles, no descriptions */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-500">Example 5: Bulk Add — Just Titles (No Descriptions)</h3>
          <CopyBlock
            label="Most topics only need titles — fast to add!"
            code={`// Pharmacology — ANS chapter
t('pharmacology', 'pharm-ans', 'Cholinergic Receptors'),
t('pharmacology', 'pharm-ans', 'Anticholinesterases'),
t('pharmacology', 'pharm-ans', 'Atropine — Actions & Uses'),
t('pharmacology', 'pharm-ans', 'Adrenaline', 'topics', true),
t('pharmacology', 'pharm-ans', 'Beta Blockers'),
t('pharmacology', 'pharm-ans', 'Ganglion Blockers'),
t('pharmacology', 'pharm-ans', 'NMJ Blockers'),
t('pharmacology', 'pharm-ans', 'PYQ: ANS Drugs (2024)', 'pyqs'),
t('pharmacology', 'pharm-ans', 'ANS Quick Ref Table', 'notes'),`}
          />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SECTION 7: ADDING SUBJECTS & CHAPTERS */}
      {/* ================================================================== */}
      <Section title="Adding a New Subject or Chapter" icon="🏗️">
        <p className="mb-3 text-sm text-slate-500">Scroll to the <C>subjects</C> or <C>units</C> arrays in the same file.</p>
        
        <CopyBlock
          label="Add a new subject"
          code={`// In the subjects array, add:
{ id: 'community', name: 'Community Medicine', icon: '🏥', year: 2 },`}
        />

        <CopyBlock
          label="Add chapters for it"
          code={`// In the units array, add:
{ id: 'comm-epi', subjectId: 'community', name: 'Epidemiology', order: 1 },
{ id: 'comm-bio', subjectId: 'community', name: 'Biostatistics', order: 2 },
{ id: 'comm-nutrition', subjectId: 'community', name: 'Nutrition', order: 3 },`}
        />

        <CopyBlock
          label="Then add topics for those chapters"
          code={`t('community', 'comm-epi', 'Study Designs — Overview'),
t('community', 'comm-epi', 'Measures of Disease Frequency'),
t('community', 'comm-bio', 'Mean, Median, Mode'),`}
        />

        <div className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
          <strong className="text-slate-700">Rules:</strong>
          <ul className="mt-1 ml-4 list-disc space-y-0.5">
            <li>Subject <C>id</C> must be unique and lowercase (no spaces)</li>
            <li>Chapter <C>id</C> must be unique — use prefix like <C>comm-</C></li>
            <li>Chapter <C>subjectId</C> must match the subject <C>id</C> exactly</li>
            <li><C>order</C> controls the display order within a subject</li>
            <li><C>year</C> must be 1, 2, 3, or 4</li>
          </ul>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SECTION 8: SUBJECT & CHAPTER ID REFERENCE */}
      {/* ================================================================== */}
      <Section title="Subject & Chapter ID Reference" icon="🗂️">
        <p className="mb-3 text-sm text-slate-500">Use these exact IDs when adding topics.</p>
        <div className="space-y-3">
          <IDGroup
            title="Year 1"
            items={[
              { subject: '🦴 Anatomy', id: 'anatomy', chapters: ['anat-ul (Upper Limb)', 'anat-ll (Lower Limb)', 'anat-thorax (Thorax)', 'anat-abdomen (Abdomen & Pelvis)', 'anat-headneck (Head & Neck)', 'anat-neuro (Neuroanatomy)', 'anat-embryo (Embryology)', 'anat-histology (General Histology)', 'anat-genetics (Genetics)'] },
              { subject: '🫀 Physiology', id: 'physiology', chapters: ['phys-general (General)', 'phys-blood (Blood & Immunity)', 'phys-nerve (Nerve & Muscle)', 'phys-cvs (CVS)', 'phys-resp (Respiratory)', 'phys-renal (Renal)', 'phys-git (GI)', 'phys-endo (Endocrine)', 'phys-cns (CNS & Senses)', 'phys-repro (Reproductive)'] },
              { subject: '🧬 Biochemistry', id: 'biochemistry', chapters: ['bio-chemistry (Biomolecules)', 'bio-enzymes (Enzymology)', 'bio-carb (Carb Metabolism)', 'bio-lipid (Lipid Metabolism)', 'bio-protein (Protein & AA)', 'bio-nucleic (Nucleic Acid & Mol Bio)', 'bio-vitamins (Vitamins & Minerals)', 'bio-hormones (Hormones & Signaling)', 'bio-clinical (Clinical Biochem)'] },
            ]}
          />
          <IDGroup
            title="Year 2"
            items={[
              { subject: '🔬 Pathology', id: 'pathology', chapters: ['path-general (General Path)', 'path-hemato (Hematology)', 'path-systemic (Systemic Path)', 'path-clinical (Clinical Path)'] },
              { subject: '💊 Pharmacology', id: 'pharmacology', chapters: ['pharm-general (General Pharm)', 'pharm-ans (ANS)', 'pharm-cvs (CVS Drugs)', 'pharm-cns (CNS Drugs)', 'pharm-chemo (Chemotherapy)', 'pharm-endo (Endocrine Pharm)'] },
              { subject: '🦠 Microbiology', id: 'microbiology', chapters: ['micro-general (General Micro)', 'micro-bacteria (Bacteriology)', 'micro-virus (Virology)', 'micro-parasit (Parasitology)', 'micro-immuno (Immunology)'] },
              { subject: '⚖️ Forensic Medicine', id: 'forensic', chapters: ['fmed-general (Forensic Path)', 'fmed-tox (Toxicology)', 'fmed-law (Med Jurisprudence)'] },
            ]}
          />
          <IDGroup
            title="Year 3"
            items={[
              { subject: '🩺 Medicine', id: 'medicine', chapters: ['med-cvs (Cardio)', 'med-resp (Respiratory)', 'med-git (Gastro)', 'med-neuro (Neuro)', 'med-endo (Endo)', 'med-renal (Nephro)'] },
              { subject: '🔪 Surgery', id: 'surgery', chapters: ['surg-general (General)', 'surg-git (GI Surgery)', 'surg-uro (Urology)'] },
              { subject: '🤰 OBG', id: 'obg', chapters: ['obg-obstetrics (Obstetrics)', 'obg-gynec (Gynaecology)'] },
              { subject: '👶 Pediatrics', id: 'peds', chapters: ['peds-neonato (Neonatology)', 'peds-growth (Growth & Nutrition)', 'peds-infect (Infections)'] },
            ]}
          />
          <IDGroup
            title="Year 4"
            items={[
              { subject: '🦿 Orthopaedics', id: 'ortho', chapters: ['ortho-trauma (Trauma)', 'ortho-general (General)'] },
              { subject: '👁️ Ophthalmology', id: 'ophthalmology', chapters: ['ophthal-ant (Anterior)', 'ophthal-post (Posterior)', 'ophthal-general (General)'] },
              { subject: '👂 ENT', id: 'ent', chapters: ['ent-ear (Ear)', 'ent-nose (Nose)', 'ent-throat (Throat)'] },
              { subject: '🧴 Dermatology', id: 'dermatology', chapters: ['derm-general (General)', 'derm-infect (Infections)'] },
              { subject: '🧠 Psychiatry', id: 'psychiatry', chapters: ['psych-general (General)', 'psych-disorders (Disorders)'] },
              { subject: '📡 Radiology', id: 'radiology', chapters: ['radio-general (General)', 'radio-systemic (Systemic)'] },
            ]}
          />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SECTION 9: COMMON MISTAKES */}
      {/* ================================================================== */}
      <Section title="Common Mistakes to Avoid" icon="⚠️">
        <div className="space-y-3">
          <MistakeRow
            wrong={`t('anatomy', 'anat-ul', 'Pott's Fracture'),`}
            right={`t('anatomy', 'anat-ul', 'Potts Fracture'),`}
            reason="Apostrophe breaks the string. Remove it or use backslash escape."
          />
          <MistakeRow
            wrong={`t('anatomy', 'anat-ul', 'Brachial Plexus')`}
            right={`t('anatomy', 'anat-ul', 'Brachial Plexus'),`}
            reason="Missing comma at end. Every line must end with a comma."
          />
          <MistakeRow
            wrong={`t("anatomy", "anat-ul", "Brachial Plexus"),`}
            right={`t('anatomy', 'anat-ul', 'Brachial Plexus'),`}
            reason="Use single quotes, not double quotes (consistency)."
          />
          <MistakeRow
            wrong={`t('anatomy', 'upper-limb', 'Brachial Plexus'),`}
            right={`t('anatomy', 'anat-ul', 'Brachial Plexus'),`}
            reason="Wrong chapter ID. Check the reference table above for exact IDs."
          />
          <MistakeRow
            wrong={`t('anatomy', 'anat-ul', 'Plexus', 'topic'),`}
            right={`t('anatomy', 'anat-ul', 'Plexus', 'topics'),`}
            reason="Type must be exactly: topics, pyqs, histology, or notes (plural)."
          />
          <MistakeRow
            wrong={`content: "## Heading\n- Point 1"`}
            right={`\`## Heading\n- Point 1\``}
            reason="Description must be in backticks (template literal), not quotes."
          />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SECTION 10: QUICK STEPS */}
      {/* ================================================================== */}
      <Section title="Quick Steps — After Editing" icon="🚀">
        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">1</span>
            <div>
              <strong className="text-slate-800">Save the file</strong>
              <p className="text-xs text-slate-400 mt-0.5">Save <C>src/data/content.ts</C> after editing</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">2</span>
            <div>
              <strong className="text-slate-800">Build</strong>
              <p className="text-xs text-slate-400 mt-0.5">Run <C>npm run build</C> in terminal</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">3</span>
            <div>
              <strong className="text-slate-800">Deploy</strong>
              <p className="text-xs text-slate-400 mt-0.5">Upload the <C>dist/</C> folder to your hosting (Vercel, Netlify, GitHub Pages)</p>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-100 p-3 text-xs text-emerald-700">
          <strong>💡 If build fails:</strong> You probably have a typo — missing comma, mismatched quotes, or wrong ID. 
          Check the terminal error message — it will tell you the line number.
        </div>
      </Section>

      {/* Footer */}
      <div className="mt-8 text-center text-[11px] text-slate-300">
        This page is hidden from students. Only accessible via double-clicking the footer.
      </div>
    </div>
  );
}

/* ── Mistake comparison row ───────────────────────────────────────────────── */
function MistakeRow({ wrong, right, reason }: { wrong: string; right: string; reason: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden text-xs">
      <div className="flex">
        <div className="flex-1 border-r border-slate-100 p-3">
          <div className="mb-1 text-[10px] font-bold uppercase text-red-400">❌ Wrong</div>
          <code className="text-[11px] text-red-600 break-all">{wrong}</code>
        </div>
        <div className="flex-1 p-3">
          <div className="mb-1 text-[10px] font-bold uppercase text-emerald-400">✅ Right</div>
          <code className="text-[11px] text-emerald-600 break-all">{right}</code>
        </div>
      </div>
      <div className="border-t border-slate-100 bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
        {reason}
      </div>
    </div>
  );
}

/* ── ID Reference group ───────────────────────────────────────────────────── */
function IDGroup({ title, items }: { title: string; items: { subject: string; id: string; chapters: string[] }[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{title}</span>
      </div>
      <div className="divide-y divide-slate-50">
        {items.map((item) => (
          <div key={item.id} className="px-4 py-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-700">{item.subject}</span>
              <code className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-mono font-medium text-blue-600">{item.id}</code>
            </div>
            <div className="flex flex-wrap gap-1">
              {item.chapters.map((ch) => {
                const id = ch.split(' (')[0];
                const label = ch.includes('(') ? ch.split('(')[1]?.replace(')', '') : '';
                return (
                  <span key={id} className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-[10px]">
                    <code className="font-mono text-slate-600">{id}</code>
                    {label && <span className="text-slate-400">{label}</span>}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
