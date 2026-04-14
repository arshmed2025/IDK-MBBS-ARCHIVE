import React, { useState, useRef, useCallback, useEffect } from 'react';
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

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVideoModal(null);
        setPdfModal(null);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const isCustomSubject = subjectId === '__custom__';
  const isCustomUnit    = unitId    === '__custom__';
  const filteredUnits   = units.filter(u => u.subjectId === subjectId);
  const effectiveSubjectId = isCustomSubject ? customSubject : subjectId;
  const effectiveUnitId    = isCustomUnit    ? customUnit    : unitId;

  const handleSubjectChange = (val: string) => {
    setSubjectId(val);
    setCustomUnit('');
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
    const end   = ta.selectionEnd;
    const next  = content.slice(0, start) + text + content.slice(end);
    setContent(next);
    const newPos = start + text.length;
    setTimeout(() => { ta.focus(); ta.setSelectionRange(newPos, newPos); }, 0);
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

  const generateCode = useCallback(() => {
    const vipPrefix = isVip ? '⭐ ' : '';
    const params: string[] = [
      `'${esc(effectiveSubjectId)}'`,
      `'${esc(effectiveUnitId)}'`,
      `'${esc(vipPrefix + (title || 'Untitled'))}'`,
    ];
    if (content.trim()) {
      const escapedContent = content.trim()
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$\{/g, '\\${');
      params.push(`\`\n${escapedContent}\n\``);
      if (contributor || editor) params.push(contributor ? `'${esc(contributor)}'` : `''`);
      if (editor)                params.push(`'${esc(editor)}'`);
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

  return (
    <div className="space-y-6">

      {/* ── Step 1: Topic details ── */}
      <div>
        <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100 text-[9px] font-black text-white dark:text-zinc-900">1</span>
          Topic details
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
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
                  type="button"
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
                    type="button"
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

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Title</label>
            <input
              type="text" value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Brachial Plexus"
              className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-sky-400 dark:focus:border-sky-500 placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsVip(!isVip)}
            className={`relative h-5 w-9 rounded-full transition-colors cursor-pointer ${isVip ? 'bg-amber-400' : 'bg-zinc-200 dark:bg-zinc-700'}`}
            aria-label="Toggle Very Important"
          >
            <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${isVip ? 'translate-x-4' : ''}`} />
          </button>
          <span className="text-xs text-zinc-600 dark:text-zinc-400">Mark as Very Important (⭐)</span>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">— adds ⭐ prefix</span>
        </div>

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

      {/* ── Step 2: Write content ── */}
      <div>
        <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100 text-[9px] font-black text-white dark:text-zinc-900">2</span>
          Write content
        </p>

        <div className="flex flex-wrap items-center gap-1 rounded-t-xl border border-b-0 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-2 py-2">
          <button type="button" onClick={insertBold}   className="rounded-md px-2 py-1 text-xs font-black   text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">B</button>
          <button type="button" onClick={insertItalic} className="rounded-md px-2 py-1 text-xs font-semibold italic text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">I</button>
          <button type="button" onClick={() => insertAtCursor('\n## Heading\n')} className="rounded-md px-2 py-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">H2</button>
          <button type="button" onClick={() => insertAtCursor('\n### Heading\n')} className="rounded-md px-2 py-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">H3</button>
          <div className="mx-1 h-4 w-px bg-zinc-200 dark:bg-zinc-600" />
          <button type="button" onClick={() => insertAtCursor('\n- Item\n- Item\n- Item\n')} className="rounded-md px-2 py-1 text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">• List</button>
          <button type="button" onClick={() => insertAtCursor('\n1. Item\n2. Item\n3. Item\n')} className="rounded-md px-2 py-1 text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">1. List</button>
          <button type="button" onClick={insertTable} className="rounded-md border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 px-2 py-1 text-xs text-violet-700 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-500/20 cursor-pointer">+ Table</button>
          <div className="mx-1 h-4 w-px bg-zinc-200 dark:bg-zinc-600" />
          <button type="button" onClick={insertImage} className="rounded-md border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 text-xs text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 cursor-pointer">🖼 Image</button>
          <button type="button" onClick={insertVideo} className="rounded-md border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 px-2 py-1 text-xs text-sky-700 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-500/20 cursor-pointer">▶ Video</button>
          <button type="button" onClick={insertPdf}   className="rounded-md border border-orange-200 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 px-2 py-1 text-xs text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-500/20 cursor-pointer">📄 PDF</button>
          <button type="button" onClick={insertLink}  className="rounded-md border border-fuchsia-200 dark:border-fuchsia-500/30 bg-fuchsia-50 dark:bg-fuchsia-500/10 px-2 py-1 text-xs text-fuchsia-700 dark:text-fuchsia-400 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-500/20 cursor-pointer">🔗 Link</button>
        </div>

        <textarea
          ref={textareaRef}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your markdown content here…"
          className="w-full rounded-b-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 font-mono text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-sky-400 dark:focus:border-sky-500 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 resize-y"
          style={{ minHeight: 200 }}
          spellCheck={false}
        />

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

      {/* ── Step 3: Generated output ── */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100 text-[9px] font-black text-white dark:text-zinc-900">3</span>
            Generated code — paste into yearX.ts
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={handleReset} className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer">Reset</button>
            <button type="button" onClick={handleCopy} className="flex items-center gap-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors cursor-pointer">
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
              <button type="button" onClick={() => setVideoModal(null)} className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 transition-colors cursor-pointer" aria-label="Close video">
                <X size={18} />
              </button>
            </div>
            <video controls className="w-full rounded-xl" src={videoModal.url} />
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
              <button type="button" onClick={() => setPdfModal(null)} className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 transition-colors cursor-pointer" aria-label="Close PDF">
                <X size={18} />
              </button>
            </div>
            <iframe
              src={pdfModal.url.replace(/\/view(\?|$)/, '/preview$1')}
              className="h-full w-full rounded-xl border-0"
              title={pdfModal.title}
              allow="fullscreen"
            />
            <a
              href={pdfModal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-center text-xs text-white/60 underline hover:text-white/90"
            >
              Open in new tab
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
