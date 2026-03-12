import { ArrowLeft, Copy, Check, Lock, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface ContentGuideProps {
  onBack: () => void;
}

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

function C({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-700">{children}</code>;
}

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
            <p className="text-sm text-slate-400">How to add topics, images, tables, and everything else.</p>
          </div>
        </div>
      </div>

      {/* The file */}
      <div className="mb-6 rounded-2xl border border-amber-100 bg-amber-50/50 p-5">
        <h2 className="mb-1 text-sm font-semibold text-amber-800">Everything is in ONE file</h2>
        <p className="text-sm leading-relaxed text-amber-700">
          Open <C>src/data/content.ts</C> — scroll to the topics array — add your line — save — done.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: THE 6 FUNCTIONS */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section title="The 6 Functions — Pick One and Go" icon="1️⃣" defaultOpen={true}>
        <p className="mb-3 text-sm text-slate-500">Each content type has its own function. Just pick the right one:</p>
        <CopyBlock
          label="6 functions — one per type"
          code={`topic('anatomy', 'anat-ul', 'Shoulder Joint')       // regular topic
pyqpdf('anatomy', 'anat-ul', 'Paper I — 2024')      // full PYQ paper (PDF)
pyq('anatomy', 'anat-ul', 'Brachial Plexus Q 2024') // individual PYQ question
histo('anatomy', 'anat-histology', 'Liver Slide')    // histology slide/diagram
radio('anatomy', 'anat-thorax', 'Chest X-ray')       // radiology image
note('anatomy', 'anat-ul', 'Quick Reference Table')  // notes/summary`}
        />
        <div className="mt-3 rounded-lg bg-blue-50 border border-blue-100 p-3 text-xs text-blue-700">
          <strong>That is it.</strong> 3 things: function name, subject ID, chapter ID, title. No extra parameters to remember.
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: VERY IMPORTANT */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section title="Mark as Very Important ⭐" icon="2️⃣">
        <p className="mb-3 text-sm text-slate-500">Just add <C>⭐ </C> (star + space) at the start of the title:</p>
        <CopyBlock
          label="Star prefix = Very Important"
          code={`// Very Important — gets a ⭐ badge, appears in VIP section
topic('anatomy', 'anat-ul', '⭐ Brachial Plexus'),

// Normal — no star prefix
topic('anatomy', 'anat-ul', 'Forearm Muscles'),`}
        />
      </Section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3: ADDING DESCRIPTIONS */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section title="Adding a Description" icon="3️⃣">
        <p className="mb-3 text-sm text-slate-500">Add content as the 4th parameter inside backticks:</p>
        <CopyBlock
          label="4th parameter = description in backticks"
          code={`topic('anatomy', 'anat-ul', '⭐ Brachial Plexus',
\`## Formation
Roots → Trunks → Divisions → Cords → Branches

**Remember:** Robert Taylor Drinks Cold Beer

- Musculocutaneous nerve
- Median nerve
- Ulnar nerve
\`),`}
        />
        <div className="mt-3 rounded-lg bg-emerald-50 border border-emerald-100 p-3 text-xs text-emerald-700">
          <strong>No description?</strong> Just skip the 4th param. The topic will appear as a plain title — no View button shown.
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 4: FORMATTING EVERYTHING */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section title="Formatting — Headings, Bold, Lists, Tables, Images" icon="📝" defaultOpen={true}>
        <p className="mb-4 text-sm text-slate-500">
          Everything below goes inside the backtick description (4th param).
        </p>

        {/* Headings */}
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Headings</h3>
        <CopyBlock code={`# Big Heading
## Medium Heading
### Small Heading`} />

        {/* Bold, Italic */}
        <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Bold &amp; Italic</h3>
        <CopyBlock code={`**This is bold**
*This is italic*
***Bold and italic***
\`inline code\``} />

        {/* Lists */}
        <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Lists</h3>
        <CopyBlock code={`- Bullet point one
- Bullet point two
- Bullet point three

1. Numbered step one
2. Numbered step two
3. Numbered step three`} />

        {/* Tables */}
        <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Tables</h3>
        <CopyBlock label="Pipe syntax — 2nd line must have dashes" code={`| Feature | Type A | Type B |
|---------|--------|--------|
| Color   | Red    | Blue   |
| Size    | Large  | Small  |`} />

        {/* Images */}
        <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Images &amp; Diagrams</h3>
        <CopyBlock label="![caption text](image URL)" code={`![Liver histology — central vein](https://upload.wikimedia.org/your-image.jpg)`} />
        <div className="mt-2 rounded-lg bg-violet-50 border border-violet-100 p-3 text-xs text-violet-700">
          <strong>Where to upload images (free):</strong>
          <ul className="mt-1 ml-4 list-disc space-y-0.5">
            <li><strong>Imgur</strong> — imgur.com → Upload → Copy Direct Link</li>
            <li><strong>Postimages</strong> — postimages.org → Upload → Copy Direct Link</li>
            <li><strong>GitHub</strong> — upload to a repo → click file → Copy raw URL</li>
            <li><strong>Wikipedia</strong> — search medical diagrams → Copy image URL</li>
          </ul>
        </div>

        {/* Multiple images */}
        <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Multiple Images</h3>
        <CopyBlock code={`## Low Power View
![Kidney cortex 4x](https://url1.jpg)

## High Power View
![PCT and DCT 40x](https://url2.jpg)`} />

        {/* Blockquotes */}
        <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Mnemonics / Important Notes</h3>
        <CopyBlock code={`> **Remember:** Some Lovers Try Positions That They Cant Handle
> (Scaphoid, Lunate, Triquetral, Pisiform, Trapezium, Trapezoid, Capitate, Hamate)`} />

        {/* Separator */}
        <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Horizontal Line</h3>
        <CopyBlock code={`Text above

---

Text below`} />
      </Section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 5: COMPLETE EXAMPLES */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section title="Complete Copy-Paste Examples" icon="📋">

        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-500">Histology with Diagram + Table</h3>
        <CopyBlock label="Histology topic" code={`histo('anatomy', 'anat-histology', '⭐ Liver Histology',
\`## Liver — Microscopic Structure

### Classic Lobule
- **Hexagonal** shape
- Central vein in the middle
- Portal triads at corners

![Liver lobule](https://upload.wikimedia.org/your-image.jpg)

| Structure | Description |
|-----------|-------------|
| **Hepatocytes** | Large polygonal cells |
| **Sinusoids** | Fenestrated endothelium |
| **Kupffer cells** | Resident macrophages |
| **Portal triad** | Vein + artery + bile duct |

### ID Points
1. Look for hexagonal lobules
2. Central vein — endothelium only
3. Portal triads at periphery
\`),`} />

        <h3 className="mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-blue-500">Radiology with X-ray Image</h3>
        <CopyBlock label="Radiology topic" code={`radio('medicine', 'med-resp', 'Chest X-ray — Pneumonia',
\`## Findings in Pneumonia

### Lobar Pneumonia
- **Homogeneous opacity** in one lobe
- Air bronchogram sign

![Lobar pneumonia CXR](https://your-image-url.jpg)

### Bronchopneumonia
- **Patchy bilateral opacities**
- Peribronchial distribution

| Finding | Lobar | Broncho |
|---------|-------|---------|
| Pattern | Homogeneous | Patchy |
| Distribution | One lobe | Bilateral |
| Air bronchogram | Yes | Rare |
\`),`} />

        <h3 className="mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-blue-500">PYQ with Answer</h3>
        <CopyBlock label="PYQ with formatted answer" code={`pyq('physiology', 'phys-cvs', '⭐ Cardiac Cycle Q (2024)',
\`## Question
Draw and label the Wiggers diagram. Explain events of the cardiac cycle.

---

## Answer Outline

### Phases
1. Atrial systole
2. Isovolumetric contraction
3. Rapid ejection
4. Reduced ejection
5. Isovolumetric relaxation
6. Rapid filling

### Heart Sounds
- **S1** — closure of AV valves
- **S2** — closure of semilunar valves
\`),`} />

        <h3 className="mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-blue-500">Bulk Add — Just Titles</h3>
        <CopyBlock label="Fast — no descriptions needed" code={`topic('pharmacology', 'pharm-ans', 'Cholinergic Receptors'),
topic('pharmacology', 'pharm-ans', 'Anticholinesterases'),
topic('pharmacology', 'pharm-ans', '⭐ Atropine — Actions & Uses'),
topic('pharmacology', 'pharm-ans', 'Beta Blockers'),
pyq('pharmacology', 'pharm-ans', 'ANS Drugs Q (2024)'),
note('pharmacology', 'pharm-ans', 'ANS Quick Ref Table'),`} />
      </Section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 6: ADD SUBJECTS & CHAPTERS */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section title="Adding New Subjects or Chapters" icon="🏗️">
        <CopyBlock
          label="Add a new subject"
          code={`// In the subjects array:
{ id: 'community', name: 'Community Medicine', icon: '🏥', year: 2 },`}
        />
        <CopyBlock
          label="Add chapters for it"
          code={`// In the units array:
{ id: 'comm-epi', subjectId: 'community', name: 'Epidemiology', order: 1 },
{ id: 'comm-bio', subjectId: 'community', name: 'Biostatistics', order: 2 },`}
        />
        <CopyBlock
          label="Then add topics"
          code={`topic('community', 'comm-epi', 'Study Designs — Overview'),
topic('community', 'comm-bio', 'Mean, Median, Mode'),`}
        />
      </Section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 7: ID REFERENCE */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section title="Subject & Chapter ID Reference" icon="🗂️">
        <div className="space-y-3">
          <IDGroup title="Year 1" items={[
            { subject: 'Anatomy', id: 'anatomy', chapters: ['anat-ul', 'anat-ll', 'anat-thorax', 'anat-abdomen', 'anat-headneck', 'anat-neuro', 'anat-embryo', 'anat-histology', 'anat-genetics'] },
            { subject: 'Physiology', id: 'physiology', chapters: ['phys-general', 'phys-blood', 'phys-nerve', 'phys-cvs', 'phys-resp', 'phys-renal', 'phys-git', 'phys-endo', 'phys-cns', 'phys-repro'] },
            { subject: 'Biochemistry', id: 'biochemistry', chapters: ['bio-chemistry', 'bio-enzymes', 'bio-carb', 'bio-lipid', 'bio-protein', 'bio-nucleic', 'bio-vitamins', 'bio-hormones', 'bio-clinical'] },
          ]} />
          <IDGroup title="Year 2" items={[
            { subject: 'Pathology', id: 'pathology', chapters: ['path-general', 'path-hemato', 'path-systemic', 'path-clinical'] },
            { subject: 'Pharmacology', id: 'pharmacology', chapters: ['pharm-general', 'pharm-ans', 'pharm-cvs', 'pharm-cns', 'pharm-chemo', 'pharm-endo'] },
            { subject: 'Microbiology', id: 'microbiology', chapters: ['micro-general', 'micro-bacteria', 'micro-virus', 'micro-parasit', 'micro-immuno'] },
            { subject: 'Forensic Med', id: 'forensic', chapters: ['fmed-general', 'fmed-tox', 'fmed-law'] },
          ]} />
          <IDGroup title="Year 3" items={[
            { subject: 'Medicine', id: 'medicine', chapters: ['med-cvs', 'med-resp', 'med-git', 'med-neuro', 'med-endo', 'med-renal'] },
            { subject: 'Surgery', id: 'surgery', chapters: ['surg-general', 'surg-git', 'surg-uro'] },
            { subject: 'OBG', id: 'obg', chapters: ['obg-obstetrics', 'obg-gynec'] },
            { subject: 'Pediatrics', id: 'peds', chapters: ['peds-neonato', 'peds-growth', 'peds-infect'] },
          ]} />
          <IDGroup title="Year 4" items={[
            { subject: 'Orthopaedics', id: 'ortho', chapters: ['ortho-trauma', 'ortho-general'] },
            { subject: 'Ophthalmology', id: 'ophthalmology', chapters: ['ophthal-ant', 'ophthal-post', 'ophthal-general'] },
            { subject: 'ENT', id: 'ent', chapters: ['ent-ear', 'ent-nose', 'ent-throat'] },
            { subject: 'Dermatology', id: 'dermatology', chapters: ['derm-general', 'derm-infect'] },
            { subject: 'Psychiatry', id: 'psychiatry', chapters: ['psych-general', 'psych-disorders'] },
            { subject: 'Radiology', id: 'radiology', chapters: ['radio-general', 'radio-systemic'] },
          ]} />
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 8: COMMON MISTAKES */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section title="Common Mistakes" icon="⚠️">
        <div className="space-y-3">
          <MistakeRow
            wrong={`topic('anatomy', 'anat-ul', 'Potts Fracture')`}
            right={`topic('anatomy', 'anat-ul', 'Potts Fracture'),`}
            reason="Missing comma at end. Every line must end with a comma."
          />
          <MistakeRow
            wrong={`topic('anatomy', 'upper-limb', 'Title'),`}
            right={`topic('anatomy', 'anat-ul', 'Title'),`}
            reason="Wrong chapter ID. Check the reference table above."
          />
          <MistakeRow
            wrong={`topic('anatomy', 'anat-ul', 'Title', "description")`}
            right={`topic('anatomy', 'anat-ul', 'Title', \`description\`)`}
            reason="Description must be in backticks, not quotes."
          />
        </div>
      </Section>

      {/* Footer */}
      <div className="mt-8 text-center text-[11px] text-slate-300">
        This page is hidden from students. Only accessible via double-clicking the footer.
      </div>
    </div>
  );
}

function MistakeRow({ wrong, right, reason }: { wrong: string; right: string; reason: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden text-xs">
      <div className="flex">
        <div className="flex-1 border-r border-slate-100 p-3">
          <div className="mb-1 text-[10px] font-bold uppercase text-red-400">Wrong</div>
          <code className="text-[11px] text-red-600 break-all">{wrong}</code>
        </div>
        <div className="flex-1 p-3">
          <div className="mb-1 text-[10px] font-bold uppercase text-emerald-400">Right</div>
          <code className="text-[11px] text-emerald-600 break-all">{right}</code>
        </div>
      </div>
      <div className="border-t border-slate-100 bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
        {reason}
      </div>
    </div>
  );
}

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
              {item.chapters.map((ch) => (
                <span key={ch} className="inline-flex rounded-md bg-slate-50 px-2 py-1 text-[10px]">
                  <code className="font-mono text-slate-600">{ch}</code>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
