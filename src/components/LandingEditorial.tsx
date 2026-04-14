import { ArrowDown, ArrowRight, Library } from 'lucide-react';
import { getTopicsBySubject, getUnitsBySubject, type Subject } from '../data/index';
import { cn } from '../utils/cn';
import { SubjectBadge, subjectColour } from '../utils/subjectColours';

export const MBBS_BROWSE_ANCHOR_ID = 'mbbs-browse';

interface Stats {
  topics: number;
  pyqs: number;
  pyq_pdfs: number;
  notes: number;
  histology: number;
  radiology: number;
  total: number;
  important: number;
}

interface LandingEditorialProps {
  yearLabel: string;
  editionYear: number;
  yearSubjects: Subject[];
  stats: Stats;
  onExploreArchive: () => void;
  onSubjectOpen: (subjectId: string) => void;
  onContribute: () => void;
}

export function LandingEditorial({
  yearLabel,
  editionYear,
  yearSubjects,
  stats,
  onExploreArchive,
  onSubjectOpen,
  onContribute,
}: LandingEditorialProps) {
  const previewSubjects = yearSubjects.slice(0, 6);
  const moreCount = Math.max(0, yearSubjects.length - previewSubjects.length);

  const statTags = [
    stats.topics > 0 && `${stats.topics} Topics`,
    stats.pyqs > 0 && `${stats.pyqs} PYQs`,
    stats.pyq_pdfs > 0 && `${stats.pyq_pdfs} PYQ PDFs`,
    stats.notes > 0 && `${stats.notes} Notes`,
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-0 text-zinc-900 dark:text-zinc-100">

      {/* ── Hero ── */}
      <section className="relative pb-10 pt-2 md:pb-14 md:pt-4">
        <div className="mx-auto max-w-6xl">
          {/* Gradient card */}
          <div
            className="relative overflow-hidden rounded-2xl px-8 py-10 md:px-12 md:py-14"
            style={{
              background: 'linear-gradient(135deg, #f0f9ff 0%, #ecfeff 50%, #f0fdf4 100%)',
            }}
          >
            {/* Decorative blobs */}
            <div
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                top: -70, right: '2%',
                width: 280, height: 280,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 65%)',
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                bottom: -40, left: '38%',
                width: 180, height: 180,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 65%)',
              }}
            />

            {/* Year label */}
            <p className="relative mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
              <span className="h-[5px] w-[5px] rounded-full bg-sky-500" />
              {yearLabel}
            </p>

            {/* Headline */}
            <h1 className="relative text-4xl font-extrabold leading-[1.04] tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.25rem]">
              I.D.K.
              <span className="block">
                MBBS Archive.{' '}
                <span className="text-sky-500">✦</span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="relative mt-4 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">
              Topics, PYQs, slides, and scans — grouped by subject and chapter so you can study without hunting through chats and drives.
            </p>

            {/* CTAs */}
            <div className="relative mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreArchive}
                className={cn(
                  'group inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold text-white',
                  'bg-zinc-900 transition hover:bg-zinc-700 active:scale-[0.98]',
                )}
              >
                <Library className="h-[18px] w-[18px] opacity-95" strokeWidth={2} />
                Browse library
                <ArrowDown className="h-4 w-4 opacity-60 transition group-hover:translate-y-0.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={onContribute}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
              >
                Contribute
                <ArrowRight className="h-4 w-4 opacity-60" />
              </button>
            </div>

            {/* Stat tags */}
            {statTags.length > 0 && (
              <div className="relative mt-6 flex flex-wrap gap-2">
                {statTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-200/80 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Subject cards ── */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-3xl">
              Start from a subject
            </h2>
            <p className="mt-2 max-w-lg text-sm text-zinc-500 dark:text-zinc-400">
              {moreCount > 0
                ? `A few shortcuts — ${moreCount} more in the library below.`
                : 'Jump straight in — same chapters you see in the sidebar.'}
            </p>
          </div>

          {yearSubjects.length === 0 ? (
            <p className="text-center text-sm text-zinc-500">No subjects for this year yet.</p>
          ) : (
            <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {previewSubjects.map((subj) => {
                const topics = getTopicsBySubject(subj.id).length;
                const chapters = getUnitsBySubject(subj.id).length;
                const colour = subjectColour(subj.id);
                return (
                  <li key={subj.id}>
                    <button
                      type="button"
                      onClick={() => onSubjectOpen(subj.id)}
                      className={cn(
                        'group flex w-full items-start gap-4 rounded-xl border border-zinc-200/90 bg-white p-5 text-left transition-all',
                        'hover:-translate-y-px hover:border-zinc-300 hover:shadow-md',
                        'dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700',
                      )}
                      style={{ borderLeftWidth: 3, borderLeftColor: colour }}
                    >
                      <SubjectBadge subjectId={subj.id} subjectName={subj.name} size="md" />
                      <div className="min-w-0 flex-1 pt-0.5">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{subj.name}</span>
                        <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                          {topics} topics · {chapters} chapters
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-zinc-400 opacity-0 transition group-hover:opacity-100 dark:text-zinc-500">
                          Open
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* ── Closing tip ── */}
      <section className="pb-10 md:pb-14">
        <div className="mx-auto max-w-6xl rounded-xl border border-zinc-200/80 bg-zinc-50 px-6 py-8 dark:border-zinc-800 dark:bg-zinc-900/50 md:px-10 md:py-10">
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Tip: use the sidebar search to jump to a topic by name — useful the night before an exam.
          </p>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-center text-[11px] text-zinc-400 dark:text-zinc-600">
          © {editionYear} MBBS Resources · For personal study
        </p>
      </section>
    </div>
  );
}
