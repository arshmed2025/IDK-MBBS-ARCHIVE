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
    <div className="group relative my-3 rounded-xl bg-zinc-900 dark:bg-zinc-950 text-sm">
      {label && (
        <div className="flex items-center justify-between border-b border-zinc-700/50 px-4 py-2">
          <span className="text-[11px] font-medium text-zinc-400">{label}</span>
          <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-300 cursor-pointer">
            {copied ? (<><Check size={12} className="text-emerald-400" /><span className="text-emerald-400">Copied!</span></>) : (<><Copy size={12} />Copy</>)}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
      {!label && (
        <button onClick={handleCopy} className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-1 text-[11px] text-zinc-400 opacity-0 transition-all hover:text-zinc-300 group-hover:opacity-100 cursor-pointer">
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
        </button>
      )}
    </div>
  );
}

function Section({ title, icon, children, defaultOpen = false }: { title: string; icon: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer">
        <span className="text-lg">{icon}</span>
        <span className="flex-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">{title}</span>
        {open ? <ChevronDown size={16} className="text-zinc-400 dark:text-zinc-500" /> : <ChevronRight size={16} className="text-zinc-400 dark:text-zinc-500" />}
      </button>
      {open && <div className="border-t border-zinc-100 dark:border-zinc-800 px-5 py-4">{children}</div>}
    </div>
  );
}

function C({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:text-zinc-300">{children}</code>;
}

export function ContentGuide({ onBack }: ContentGuideProps) {
  return (
    <div className="max-w-3xl pb-16 animate-fade-up">
      <div className="mb-8">
        <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 transition-colors hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer">
          <ArrowLeft size={14} /> Back
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 dark:bg-zinc-700">
            <Lock size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Admin — Content Guide</h1>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">How to add topics, images, tables, and everything else.</p>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-amber-100 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5 p-5">
        <h2 className="mb-1 text-sm font-semibold text-amber-800 dark:text-amber-400">Everything is in ONE file</h2>
        <p className="text-sm leading-relaxed text-amber-700 dark:text-amber-500">
          Open <C>src/data/year1.ts</C> (or year2/year3/year4) — scroll to the topics array — add your line — save — done.
        </p>
      </div>

      <Section title="The 6 Functions — Pick One and Go" icon="1️⃣" defaultOpen={true}>
        <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">Each content type has its own function. Just pick the right one:</p>
        <CopyBlock
          label="6 functions — one per type"
          code={`topic('anatomy', 'anat-ul', 'Shoulder Joint')       // regular topic
pyqpdf('anatomy', 'anat-ul', 'Paper I — 2024')      // full PYQ paper (PDF)
pyq('anatomy', 'anat-ul', 'Brachial Plexus Q 2024') // individual PYQ question
histo('anatomy', 'anat-histology', 'Liver Slide')    // histology slide/diagram
radio('anatomy', 'anat-thorax', 'Chest X-ray')       // radiology image
note('anatomy', 'anat-ul', 'Quick Reference Table')  // notes/summary`}
        />
        <div className="mt-3 rounded-lg bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-500/20 p-3 text-xs text-sky-700 dark:text-sky-400">
          <strong>That is it.</strong> 3 things: function name, subject ID, chapter ID, title. No extra parameters to remember.
        </div>
      </Section>

      <Section title="Mark as Very Important ⭐" icon="2️⃣">
        <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">Just add <C>⭐ </C> (star + space) at the start of the title:</p>
        <CopyBlock
          label="Star prefix = Very Important"
          code={`// Very Important — gets a ⭐ badge, appears in VIP section
topic('anatomy', 'anat-ul', '⭐ Brachial Plexus'),

// Normal — no star prefix
topic('anatomy', 'anat-ul', 'Forearm Muscles'),`}
        />
      </Section>

      <Section title="Adding a Description" icon="3️⃣">
        <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">Add content as the 4th parameter inside backticks:</p>
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
        <div className="mt-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 p-3 text-xs text-emerald-700 dark:text-emerald-400">
          <strong>No description?</strong> Just skip the 4th param. The topic will appear as a plain title — no View button shown.
        </div>
      </Section>

      <Section title="Formatting — Headings, Bold, Lists, Tables, Images" icon="📝" defaultOpen={true}>
        <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">Everything below goes inside the backtick description (4th param).</p>

        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Headings</h3>
        <CopyBlock code={`# Big Heading\n## Medium Heading\n### Small Heading`} />

        <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Bold &amp; Italic</h3>
        <CopyBlock code={`**This is bold**\n*This is italic*\n***Bold and italic***\n\`inline code\``} />

        <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Lists</h3>
        <CopyBlock code={`- Bullet point one\n- Bullet point two\n- Bullet point three\n\n1. Numbered step one\n2. Numbered step two\n3. Numbered step three`} />

        <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Tables</h3>
        <CopyBlock label="Pipe syntax — 2nd line must have dashes" code={`| Feature | Type A | Type B |\n|---------|--------|--------|\n| Color   | Red    | Blue   |\n| Size    | Large  | Small  |`} />

        <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Images &amp; Diagrams</h3>
        <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">Format: <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-rose-600 dark:text-rose-400">![caption](image-url)</code></p>
        <CopyBlock label="Basic image" code={`![Liver histology — central vein visible](https://your-cloud-url.com/liver-histology.jpg)`} />

        <div className="mt-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-500/20 p-4 text-xs text-sky-800 dark:text-sky-300">
          <strong className="text-sm">How to add images:</strong>
          <ol className="mt-2 ml-4 list-decimal space-y-2">
            <li><strong>Take a photo</strong> of your histology slide / textbook diagram / X-ray</li>
            <li><strong>Upload to your cloud storage</strong> (Oracle Cloud, AWS S3, or any hosting)</li>
            <li><strong>Get the direct URL</strong> — it must end in .jpg, .png, or .gif</li>
            <li>Paste it in your content</li>
          </ol>
        </div>

        <div className="mt-2 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 p-3 text-xs text-red-700 dark:text-red-400">
          <strong>Do NOT use:</strong>
          <ul className="mt-1 ml-4 list-disc space-y-0.5">
            <li>Google Drive links — they do not work as images</li>
            <li>Google Photos links — they do not work as images</li>
            <li>Wikipedia URLs — they block external loading</li>
          </ul>
        </div>

        <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Multiple Images in One Topic</h3>
        <CopyBlock code={`## Low Power View\n![Kidney cortex 4x](https://your-cloud-url.com/kidney-4x.jpg)\n\n## High Power View  \n![PCT and DCT 40x](https://your-cloud-url.com/kidney-40x.jpg)`} />

        <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Mnemonics / Important Notes</h3>
        <CopyBlock code={`> **Remember:** Some Lovers Try Positions That They Cant Handle\n> (Scaphoid, Lunate, Triquetral, Pisiform, Trapezium, Trapezoid, Capitate, Hamate)`} />

        <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Horizontal Line</h3>
        <CopyBlock code={`Text above\n\n---\n\nText below`} />
      </Section>

      <Section title="Complete Copy-Paste Examples" icon="📋">
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-500">Histology with Diagram + Table</h3>
        <CopyBlock label="Histology topic" code={`histo('anatomy', 'anat-histology', '⭐ Liver Histology',
\`## Liver — Microscopic Structure

### Classic Lobule
- **Hexagonal** shape
- Central vein in the middle
- Portal triads at corners

![Liver lobule](https://your-cloud-url.com/liver-lobule.jpg)

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

        <h3 className="mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-amber-500">Bulk Add — Just Titles</h3>
        <CopyBlock label="Fast — no descriptions needed" code={`topic('pharmacology', 'pharm-ans', 'Cholinergic Receptors'),
topic('pharmacology', 'pharm-ans', 'Anticholinesterases'),
topic('pharmacology', 'pharm-ans', '⭐ Atropine — Actions & Uses'),
pyq('pharmacology', 'pharm-ans', 'ANS Drugs Q (2024)'),
note('pharmacology', 'pharm-ans', 'ANS Quick Ref Table'),`} />
      </Section>

      <Section title="Adding New Subjects or Chapters" icon="🏗️">
        <CopyBlock label="Add a new subject" code={`// In the subjects array:\n{ id: 'community', name: 'Community Medicine', icon: '🏥', year: 2 },`} />
        <CopyBlock label="Add chapters for it" code={`// In the units array:\n{ id: 'comm-epi', subjectId: 'community', name: 'Epidemiology', order: 1 },\n{ id: 'comm-bio', subjectId: 'community', name: 'Biostatistics', order: 2 },`} />
        <CopyBlock label="Then add topics" code={`topic('community', 'comm-epi', 'Study Designs — Overview'),\ntopic('community', 'comm-bio', 'Mean, Median, Mode'),`} />
      </Section>

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
            { subject: 'Radiology', id: 'radiology_sub', chapters: ['radio-general', 'radio-systemic'] },
          ]} />
        </div>
      </Section>

      <Section title="Common Mistakes" icon="⚠️">
        <div className="space-y-3">
          <MistakeRow wrong={`topic('anatomy', 'anat-ul', 'Potts Fracture')`} right={`topic('anatomy', 'anat-ul', 'Potts Fracture'),`} reason="Missing comma at end. Every line must end with a comma." />
          <MistakeRow wrong={`topic('anatomy', 'upper-limb', 'Title'),`} right={`topic('anatomy', 'anat-ul', 'Title'),`} reason="Wrong chapter ID. Check the reference table above." />
          <MistakeRow wrong={`topic('anatomy', 'anat-ul', 'Title', "description")`} right={`topic('anatomy', 'anat-ul', 'Title', \`description\`)`} reason="Description must be in backticks, not quotes." />
        </div>
      </Section>

      <Section title="Adding Credits" icon="👤">
        <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">Credits are the 5th and 6th parameters — Contributor and Editor:</p>
        <CopyBlock
          label="Adding contributor & editor"
          code={`// With credits — contributor and editor
topic('anatomy', 'anat-ul', '⭐ Brachial Plexus',
\`## Formation
Roots → Trunks → Divisions → Cords → Branches
\`, 'Dr. Sharma', 'Rahul'),

// Only contributor, no editor
topic('anatomy', 'anat-ul', 'Forearm Muscles',
\`## Key Muscles
- Pronator teres
- Flexor carpi radialis
\`, 'Priya'),

// No credits — just skip the 5th and 6th params
topic('anatomy', 'anat-ul', 'Hand Muscles'),`}
        />
        <div className="mt-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3 text-xs text-zinc-600 dark:text-zinc-400">
          Credits appear at the bottom of the topic detail page, below the content. They also show in printed PDFs.
        </div>
      </Section>

      <div className="mt-8 text-center text-[11px] text-zinc-300 dark:text-zinc-600">
        This page is hidden from students. Only accessible via double-clicking the footer.
      </div>
    </div>
  );
}

function MistakeRow({ wrong, right, reason }: { wrong: string; right: string; reason: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden text-xs">
      <div className="flex">
        <div className="flex-1 border-r border-zinc-100 dark:border-zinc-800 p-3">
          <div className="mb-1 text-[10px] font-bold uppercase text-red-400">Wrong</div>
          <code className="text-[11px] text-red-600 dark:text-red-400 break-all">{wrong}</code>
        </div>
        <div className="flex-1 p-3">
          <div className="mb-1 text-[10px] font-bold uppercase text-emerald-400">Right</div>
          <code className="text-[11px] text-emerald-600 dark:text-emerald-400 break-all">{right}</code>
        </div>
      </div>
      <div className="border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400">
        {reason}
      </div>
    </div>
  );
}

function IDGroup({ title, items }: { title: string; items: { subject: string; id: string; chapters: string[] }[] }) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-4 py-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{title}</span>
      </div>
      <div className="divide-y divide-zinc-50 dark:divide-zinc-800">
        {items.map((item) => (
          <div key={item.id} className="px-4 py-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{item.subject}</span>
              <code className="rounded bg-violet-50 dark:bg-violet-500/10 px-2 py-0.5 text-[10px] font-mono font-medium text-violet-700 dark:text-violet-400">{item.id}</code>
            </div>
            <div className="flex flex-wrap gap-1">
              {item.chapters.map((ch) => (
                <span key={ch} className="inline-flex rounded-md bg-zinc-50 dark:bg-zinc-800 px-2 py-1 text-[10px]">
                  <code className="font-mono text-zinc-600 dark:text-zinc-400">{ch}</code>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
