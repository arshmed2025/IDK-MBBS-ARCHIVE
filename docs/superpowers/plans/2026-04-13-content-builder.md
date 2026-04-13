# Content Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Content Builder section to the Admin Content Guide that lets an admin fill out a form, write markdown with a toolbar, and copy a complete `topic(...)` code block ready to paste into `src/data/yearX.ts`; also extend `MarkdownRenderer` so `[VIDEO: Title](url)` and `[PDF: Title](url)` lines open popup modals instead of navigating away.

**Architecture:** Three files are modified and one new component is created. `MarkdownRenderer` gains block-level VIDEO/PDF detection and two optional callbacks. `TopicDetail` consumes those callbacks to show video player and PDF iframe modals. `ContentBuilder` (new component) is a self-contained form+editor+preview that manages its own modal state and generates the final code string. `ContentGuide` imports `ContentBuilder` and renders it inside a new Section at the top.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4. No test framework — `npm run build` is the verification step after every task.

---

## File Map

| File | Change |
|---|---|
| `src/components/MarkdownRenderer.tsx` | Add `onVideoClick`/`onPdfClick` props; detect `[VIDEO:…]` and `[PDF:…]` block lines |
| `src/components/TopicDetail.tsx` | Add `videoModal`/`pdfModal` state; pass callbacks to MarkdownRenderer; render two new modals |
| `src/components/ContentBuilder.tsx` | **Create** — full builder: form, toolbar, textarea, live preview, output, local modals |
| `src/components/ContentGuide.tsx` | Import ContentBuilder; add as first `<Section defaultOpen>` |

---

## Task 1: Extend MarkdownRenderer with VIDEO and PDF block rendering

**Files:**
- Modify: `src/components/MarkdownRenderer.tsx`

### Context

`MarkdownRenderer` is a custom line-by-line parser. The main `while` loop (starting line 109) checks each line against a series of patterns (headings, blockquote, table, lists, image line, paragraph). We insert two new block checks **before** the `// Image line` block at line 232. We also add two new optional callbacks to the props interface at line 3.

There is no test framework. Verification is `npm run build`.

---

- [ ] **Step 1: Add `onVideoClick` and `onPdfClick` to the props interface**

In `src/components/MarkdownRenderer.tsx`, replace lines 3–6:

```tsx
interface MarkdownRendererProps {
  content: string;
  onImageClick?: (src: string) => void;
}
```

with:

```tsx
interface MarkdownRendererProps {
  content: string;
  onImageClick?: (src: string) => void;
  onVideoClick?: (url: string, title: string) => void;
  onPdfClick?: (url: string, title: string) => void;
}
```

---

- [ ] **Step 2: Destructure the new props in the component signature**

At line 8, replace:

```tsx
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onImageClick }) => {
```

with:

```tsx
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onImageClick, onVideoClick, onPdfClick }) => {
```

---

- [ ] **Step 3: Add VIDEO and PDF block detection before the Image line block**

In the main `while` loop, locate the comment `// Image line` (currently at line 232). Insert the following two blocks **immediately before** it:

```tsx
    // VIDEO block line
    if (line.startsWith('[VIDEO:')) {
      const m = line.match(/^\[VIDEO:\s*([^\]]*)\]\(([^)]+)\)/);
      if (m) {
        const [, videoTitle, url] = m;
        elements.push(
          <div
            key={key++}
            role="button"
            onClick={() => onVideoClick?.(url, videoTitle)}
            className="my-3 flex cursor-pointer items-center gap-3 rounded-xl bg-zinc-900 dark:bg-zinc-950 px-4 py-3 transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-900"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-[10px] text-white">▶</div>
            <div>
              <div className="text-sm font-semibold text-white">{videoTitle}</div>
              <div className="text-xs text-zinc-500">Click to play</div>
            </div>
          </div>
        );
        i++; continue;
      }
    }

    // PDF block line
    if (line.startsWith('[PDF:')) {
      const m = line.match(/^\[PDF:\s*([^\]]*)\]\(([^)]+)\)/);
      if (m) {
        const [, pdfTitle, url] = m;
        elements.push(
          <div
            key={key++}
            role="button"
            onClick={() => onPdfClick?.(url, pdfTitle)}
            className="my-3 flex cursor-pointer items-center gap-3 rounded-xl border border-orange-200 dark:border-orange-500/20 bg-orange-50 dark:bg-orange-500/10 px-4 py-3 transition-colors hover:bg-orange-100 dark:hover:bg-orange-500/15"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-xs font-bold text-white">PDF</div>
            <div>
              <div className="text-sm font-semibold text-orange-700 dark:text-orange-400">{pdfTitle}</div>
              <div className="text-xs text-orange-400 dark:text-orange-500">Click to open</div>
            </div>
          </div>
        );
        i++; continue;
      }
    }
```

---

- [ ] **Step 4: Build and verify**

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

---

- [ ] **Step 5: Commit**

```bash
git add src/components/MarkdownRenderer.tsx
git commit -m "feat: add VIDEO and PDF block rendering to MarkdownRenderer"
```

---

## Task 2: Add video/PDF modals to TopicDetail

**Files:**
- Modify: `src/components/TopicDetail.tsx`

### Context

`TopicDetail` already has `zoomedImage` state and a full-screen image overlay (lines 138–156). We add two new state variables, wire up the MarkdownRenderer callbacks, and render two new modals after the existing overlay using the same `fixed inset-0 z-50` pattern. The `X` icon is already imported from `lucide-react` at line 1.

---

- [ ] **Step 1: Add `videoModal` and `pdfModal` state**

At line 31, after `const [zoomedImage, setZoomedImage] = useState<string | null>(null);`, add:

```tsx
const [videoModal, setVideoModal] = useState<{ url: string; title: string } | null>(null);
const [pdfModal, setPdfModal]     = useState<{ url: string; title: string } | null>(null);
```

---

- [ ] **Step 2: Pass callbacks to MarkdownRenderer**

At lines 94–97, replace:

```tsx
            <MarkdownRenderer
              content={topic.content}
              onImageClick={(src) => setZoomedImage(src)}
            />
```

with:

```tsx
            <MarkdownRenderer
              content={topic.content}
              onImageClick={(src) => setZoomedImage(src)}
              onVideoClick={(url, title) => setVideoModal({ url, title })}
              onPdfClick={(url, title) => setPdfModal({ url, title })}
            />
```

---

- [ ] **Step 3: Add video modal JSX after the zoomedImage overlay**

After the closing `)}` of the zoomedImage overlay (currently after line 156), add:

```tsx
      {/* Video modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 no-print"
          onClick={() => setVideoModal(null)}
        >
          <div className="relative w-full max-w-3xl" onClick={e => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{videoModal.title}</p>
              <button
                onClick={() => setVideoModal(null)}
                className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <video controls autoPlay className="w-full rounded-xl" src={videoModal.url} />
          </div>
        </div>
      )}
```

---

- [ ] **Step 4: Add PDF modal JSX after the video modal**

Immediately after the video modal closing `)}`, add:

```tsx
      {/* PDF modal */}
      {pdfModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 no-print"
          onClick={() => setPdfModal(null)}
        >
          <div
            className="relative flex h-[85vh] w-full max-w-4xl flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{pdfModal.title}</p>
              <button
                onClick={() => setPdfModal(null)}
                className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <iframe
              src={pdfModal.url.replace('/view', '/preview')}
              className="h-full w-full rounded-xl border-0"
              title={pdfModal.title}
            />
          </div>
        </div>
      )}
```

---

- [ ] **Step 5: Build and verify**

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

---

- [ ] **Step 6: Commit**

```bash
git add src/components/TopicDetail.tsx
git commit -m "feat: add video and PDF popup modals to TopicDetail"
```

---

## Task 3: Create ContentBuilder component

**Files:**
- Create: `src/components/ContentBuilder.tsx`

### Context

This is a self-contained component. It imports `subjects` and `units` from `src/data/index` (read-only — **do not modify data files**). It uses `MarkdownRenderer` for the live preview and manages its own video/PDF modal state (same visual as TopicDetail). The toolbar insert buttons use `window.prompt` for URL/title input — simple and requires no extra UI. The generated code block updates reactively; the copy button writes to clipboard.

The `subjects` array has 17 entries. `units` has ~70 entries, each with a `subjectId` field. Filtering units by `subjectId` gives the chapter list for a given subject.

---

- [ ] **Step 1: Create the file with all imports and types**

Create `src/components/ContentBuilder.tsx` with:

```tsx
import React, { useState, useRef, useCallback } from 'react';
import { Copy, Check, X } from 'lucide-react';
import { subjects, units } from '../data/index';
import { MarkdownRenderer } from './MarkdownRenderer';

type ContentType = 'topic' | 'pyqpdf' | 'pyq' | 'histo' | 'radio' | 'note';

const CONTENT_TYPES: { value: ContentType; label: string }[] = [
  { value: 'topic',   label: 'topic — Topic' },
  { value: 'pyqpdf',  label: 'pyqpdf — PYQ PDF' },
  { value: 'pyq',     label: 'pyq — PYQ' },
  { value: 'histo',   label: 'histo — Histology' },
  { value: 'radio',   label: 'radio — Radiology' },
  { value: 'note',    label: 'note — Note' },
];
```

---

- [ ] **Step 2: Add the component function with all state**

Continuing in the same file, add:

```tsx
export function ContentBuilder() {
  const [contentType, setContentType] = useState<ContentType>('topic');
  const [subjectId,   setSubjectId]   = useState('anatomy');
  const [customSubject, setCustomSubject] = useState('');
  const [unitId,      setUnitId]      = useState('anat-ul');
  const [customUnit,  setCustomUnit]  = useState('');
  const [title,       setTitle]       = useState('');
  const [isVip,       setIsVip]       = useState(false);
  const [contributor, setContributor] = useState('');
  const [editor,      setEditor]      = useState('');
  const [content,     setContent]     = useState('');
  const [copied,      setCopied]      = useState(false);
  const [videoModal,  setVideoModal]  = useState<{ url: string; title: string } | null>(null);
  const [pdfModal,    setPdfModal]    = useState<{ url: string; title: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isCustomSubject = subjectId === '__custom__';
  const isCustomUnit    = unitId    === '__custom__';
  const filteredUnits   = units.filter(u => u.subjectId === subjectId);
  const effectiveSubjectId = isCustomSubject ? customSubject : subjectId;
  const effectiveUnitId    = isCustomUnit    ? customUnit    : unitId;
```

---

- [ ] **Step 3: Add handlers — subject change, cursor insert, toolbar actions**

Continuing inside the function body:

```tsx
  const handleSubjectChange = (val: string) => {
    setSubjectId(val);
    if (val !== '__custom__') {
      const first = units.find(u => u.subjectId === val);
      setUnitId(first?.id ?? '__custom__');
    } else {
      setUnitId('__custom__');
    }
  };

  const insertAtCursor = (text: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const after  = content.slice(ta.selectionEnd);
    setContent(content.slice(0, start) + text + after);
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + text.length, start + text.length); }, 0);
  };

  const insertBold = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const sel   = content.slice(start, end) || 'bold text';
    setContent(content.slice(0, start) + `**${sel}**` + content.slice(end));
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + 2, start + 2 + sel.length); }, 0);
  };

  const insertItalic = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const sel   = content.slice(start, end) || 'italic text';
    setContent(content.slice(0, start) + `*${sel}*` + content.slice(end));
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + 1, start + 1 + sel.length); }, 0);
  };

  const insertTable = () =>
    insertAtCursor('\n| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Row 1    | Data     | Data     |\n| Row 2    | Data     | Data     |\n');

  const insertImage = () => {
    const url     = window.prompt('Image URL (direct .jpg/.png/.gif link):');
    if (!url) return;
    const caption = window.prompt('Caption (optional):') ?? '';
    insertAtCursor(`\n![${caption}](${url})\n`);
  };

  const insertVideo = () => {
    const vTitle = window.prompt('Video title:');
    if (!vTitle) return;
    const url = window.prompt('Video URL (Oracle Cloud direct .mp4 link):');
    if (!url) return;
    insertAtCursor(`\n[VIDEO: ${vTitle}](${url})\n`);
  };

  const insertPdf = () => {
    const pTitle = window.prompt('PDF title:');
    if (!pTitle) return;
    const url = window.prompt('Google Drive share link:');
    if (!url) return;
    insertAtCursor(`\n[PDF: ${pTitle}](${url})\n`);
  };

  const insertLink = () => {
    const linkText = window.prompt('Link text:');
    if (!linkText) return;
    const url = window.prompt('URL:');
    if (!url) return;
    insertAtCursor(`[${linkText}](${url})`);
  };
```

---

- [ ] **Step 4: Add generateCode and copy/reset handlers**

Continuing inside the function body:

```tsx
  const generateCode = useCallback(() => {
    const vipPrefix = isVip ? '⭐ ' : '';
    const params: string[] = [
      `'${effectiveSubjectId}'`,
      `'${effectiveUnitId}'`,
      `'${vipPrefix}${title || 'Untitled'}'`,
    ];
    if (content.trim()) {
      params.push(`\`\n${content.trim()}\n\``);
      if (contributor) params.push(`'${contributor}'`);
      if (editor)      params.push(`'${editor}'`);
    }
    return `${contentType}(${params.join(', ')}),`;
  }, [contentType, effectiveSubjectId, effectiveUnitId, title, isVip, content, contributor, editor]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setTitle(''); setIsVip(false); setContributor(''); setEditor(''); setContent(''); setCopied(false);
  };
```

---

- [ ] **Step 5: Add the return JSX — Step 1 form fields**

Continuing inside the function, add the return statement opening and Step 1:

```tsx
  return (
    <div className="space-y-6">

      {/* ── Step 1: Topic details ── */}
      <div>
        <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100 text-[9px] font-black text-white dark:text-zinc-900">1</span>
          Topic details
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Content type */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Content type</label>
            <select
              value={contentType}
              onChange={e => setContentType(e.target.value as ContentType)}
              className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-sky-400 dark:focus:border-sky-500"
            >
              {CONTENT_TYPES.map(ct => <option key={ct.value} value={ct.value}>{ct.label}</option>)}
            </select>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Subject</label>
            {isCustomSubject ? (
              <div className="flex gap-2">
                <input
                  type="text" value={customSubject} onChange={e => setCustomSubject(e.target.value)}
                  placeholder="e.g. community"
                  className="flex-1 rounded-lg border border-sky-300 dark:border-sky-500 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none"
                />
                <button
                  onClick={() => { setSubjectId('anatomy'); setUnitId('anat-ul'); }}
                  className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                >←</button>
              </div>
            ) : (
              <select
                value={subjectId} onChange={e => handleSubjectChange(e.target.value)}
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-sky-400 dark:focus:border-sky-500"
              >
                {subjects.map(s => <option key={s.id} value={s.id}>{s.id} — {s.name}</option>)}
                <option value="__custom__">+ Add new subject…</option>
              </select>
            )}
          </div>

          {/* Unit */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Unit / Chapter</label>
            {(isCustomUnit || isCustomSubject) ? (
              <div className="flex gap-2">
                <input
                  type="text" value={customUnit} onChange={e => setCustomUnit(e.target.value)}
                  placeholder="e.g. comm-epi"
                  className="flex-1 rounded-lg border border-sky-300 dark:border-sky-500 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none"
                />
                {!isCustomSubject && (
                  <button
                    onClick={() => { const first = units.find(u => u.subjectId === subjectId); setUnitId(first?.id ?? '__custom__'); }}
                    className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                  >←</button>
                )}
              </div>
            ) : (
              <select
                value={unitId} onChange={e => setUnitId(e.target.value)}
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-sky-400 dark:focus:border-sky-500"
              >
                {filteredUnits.map(u => <option key={u.id} value={u.id}>{u.id} — {u.name}</option>)}
                <option value="__custom__">+ Add new unit…</option>
              </select>
            )}
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Title</label>
            <input
              type="text" value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Brachial Plexus"
              className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-sky-400 dark:focus:border-sky-500 placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
            />
          </div>
        </div>

        {/* VIP toggle */}
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => setIsVip(!isVip)}
            className={`relative h-5 w-9 rounded-full transition-colors cursor-pointer ${isVip ? 'bg-amber-400' : 'bg-zinc-200 dark:bg-zinc-700'}`}
          >
            <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${isVip ? 'translate-x-4' : ''}`} />
          </button>
          <span className="text-xs text-zinc-600 dark:text-zinc-400">Mark as Very Important (⭐)</span>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">— adds ⭐ prefix</span>
        </div>

        {/* Credits */}
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Contributor (optional)</label>
            <input type="text" value={contributor} onChange={e => setContributor(e.target.value)} placeholder="Dr. Sharma"
              className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-sky-400 dark:focus:border-sky-500 placeholder:text-zinc-300 dark:placeholder:text-zinc-600" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Editor (optional)</label>
            <input type="text" value={editor} onChange={e => setEditor(e.target.value)} placeholder="Rahul"
              className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-sky-400 dark:focus:border-sky-500 placeholder:text-zinc-300 dark:placeholder:text-zinc-600" />
          </div>
        </div>
      </div>

      <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
```

---

- [ ] **Step 6: Add Step 2 — toolbar, textarea, and live preview JSX**

Continuing inside the return, after the `<div className="h-px …" />`:

```tsx
      {/* ── Step 2: Write content ── */}
      <div>
        <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100 text-[9px] font-black text-white dark:text-zinc-900">2</span>
          Write content
        </p>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 rounded-t-xl border border-b-0 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-2 py-2">
          <button onClick={insertBold}   className="rounded-md px-2 py-1 text-xs font-black   text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">B</button>
          <button onClick={insertItalic} className="rounded-md px-2 py-1 text-xs font-semibold italic text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">I</button>
          <button onClick={() => insertAtCursor('\n## Heading\n')} className="rounded-md px-2 py-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">H2</button>
          <button onClick={() => insertAtCursor('\n### Heading\n')} className="rounded-md px-2 py-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">H3</button>
          <div className="mx-1 h-4 w-px bg-zinc-200 dark:bg-zinc-600" />
          <button onClick={() => insertAtCursor('\n- Item\n- Item\n- Item\n')} className="rounded-md px-2 py-1 text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">• List</button>
          <button onClick={() => insertAtCursor('\n1. Item\n2. Item\n3. Item\n')} className="rounded-md px-2 py-1 text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">1. List</button>
          <button onClick={insertTable} className="rounded-md border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 px-2 py-1 text-xs text-violet-700 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-500/20 cursor-pointer">+ Table</button>
          <div className="mx-1 h-4 w-px bg-zinc-200 dark:bg-zinc-600" />
          <button onClick={insertImage} className="rounded-md border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 text-xs text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 cursor-pointer">🖼 Image</button>
          <button onClick={insertVideo} className="rounded-md border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 px-2 py-1 text-xs text-sky-700 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-500/20 cursor-pointer">▶ Video</button>
          <button onClick={insertPdf}   className="rounded-md border border-orange-200 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 px-2 py-1 text-xs text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-500/20 cursor-pointer">📄 PDF</button>
          <button onClick={insertLink}  className="rounded-md border border-fuchsia-200 dark:border-fuchsia-500/30 bg-fuchsia-50 dark:bg-fuchsia-500/10 px-2 py-1 text-xs text-fuchsia-700 dark:text-fuchsia-400 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-500/20 cursor-pointer">🔗 Link</button>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your markdown content here…"
          className="w-full rounded-b-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 font-mono text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-sky-400 dark:focus:border-sky-500 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 resize-y"
          style={{ minHeight: 200 }}
          spellCheck={false}
        />

        {/* Live preview — only shown when there is content */}
        {content.trim() && (
          <div className="mt-3 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-3 py-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Live preview</span>
              <span className="text-[10px] font-semibold text-emerald-500">● Live</span>
            </div>
            <div className="p-4">
              <MarkdownRenderer
                content={content}
                onVideoClick={(url, t) => setVideoModal({ url, title: t })}
                onPdfClick={(url, t)   => setPdfModal({ url, title: t })}
              />
            </div>
          </div>
        )}
      </div>

      <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
```

---

- [ ] **Step 7: Add Step 3 — generated output and modals, close the return**

Continuing inside the return:

```tsx
      {/* ── Step 3: Generated output ── */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100 text-[9px] font-black text-white dark:text-zinc-900">3</span>
            Generated code — paste into yearX.ts
          </p>
          <div className="flex gap-2">
            <button onClick={handleReset} className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer">Reset</button>
            <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors cursor-pointer">
              {copied ? <Check size={12} className="text-emerald-400 dark:text-emerald-600" /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 dark:bg-zinc-950 p-4 text-xs leading-relaxed text-zinc-300">
          <code>{generateCode()}</code>
        </pre>
      </div>

      {/* Video modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setVideoModal(null)}
        >
          <div className="relative w-full max-w-3xl" onClick={e => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{videoModal.title}</p>
              <button onClick={() => setVideoModal(null)} className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <video controls autoPlay className="w-full rounded-xl" src={videoModal.url} />
          </div>
        </div>
      )}

      {/* PDF modal */}
      {pdfModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setPdfModal(null)}
        >
          <div className="relative flex h-[85vh] w-full max-w-4xl flex-col" onClick={e => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{pdfModal.title}</p>
              <button onClick={() => setPdfModal(null)} className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <iframe
              src={pdfModal.url.replace('/view', '/preview')}
              className="h-full w-full rounded-xl border-0"
              title={pdfModal.title}
            />
          </div>
        </div>
      )}

    </div>
  );
}
```

---

- [ ] **Step 8: Build and verify**

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

---

- [ ] **Step 9: Commit**

```bash
git add src/components/ContentBuilder.tsx
git commit -m "feat: add ContentBuilder component with form, toolbar, preview, and output"
```

---

## Task 4: Wire ContentBuilder into ContentGuide

**Files:**
- Modify: `src/components/ContentGuide.tsx`

### Context

`ContentGuide` exports a `ContentGuide` function. It uses a local `Section` component (accordion, defined inside the same file). The first rendered `<Section>` is currently "The 6 Functions — Pick One and Go". We add a new `<Section>` before it, with `defaultOpen={true}`, that renders `<ContentBuilder />`.

---

- [ ] **Step 1: Add the ContentBuilder import**

At the top of `src/components/ContentGuide.tsx`, add after the existing imports:

```tsx
import { ContentBuilder } from './ContentBuilder';
```

---

- [ ] **Step 2: Add the Content Builder section as the first Section**

Inside `ContentGuide`'s return, before the `<Section title="The 6 Functions…">` block, add:

```tsx
      <Section title="Content Builder" icon="✏️" defaultOpen={true}>
        <ContentBuilder />
      </Section>
```

---

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

---

- [ ] **Step 4: Rebuild dist**

```bash
npm run build
```

(dist is the deployable output — always rebuild after all changes in a feature.)

---

- [ ] **Step 5: Commit**

```bash
git add src/components/ContentGuide.tsx dist/
git commit -m "feat: add Content Builder section to Admin Content Guide"
```
