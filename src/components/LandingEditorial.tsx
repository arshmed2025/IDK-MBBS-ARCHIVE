import { ArrowDown, ArrowRight, Library, Sparkles } from 'lucide-react';
import { getTopicsBySubject, getUnitsBySubject, type Subject } from '../data/index';
import { cn } from '../utils/cn';

export const MBBS_BROWSE_ANCHOR_ID = 'mbbs-browse';

interface LandingEditorialProps {
  yearLabel: string;
  editionYear: number;
  yearSubjects: Subject[];
  onExploreArchive: () => void;
  onSubjectOpen: (subjectId: string) => void;
  onContribute: () => void;
}

/** Soft accent behind subject emoji — varies by index, stays in violet family */
function subjectAccentClass(i: number) {
  const hues = [
    'from-violet-500/15 to-fuchsia-500/10 dark:from-violet-400/20 dark:to-fuchsia-500/15',
    'from-indigo-500/15 to-violet-500/10 dark:from-indigo-400/18 dark:to-violet-500/12',
    'from-purple-500/15 to-violet-500/10 dark:from-purple-400/18 dark:to-violet-500/12',
    'from-sky-500/12 to-violet-500/10 dark:from-sky-400/15 dark:to-violet-500/12',
  ];
  return hues[i % hues.length];
}

function HeroArt() {
  return (
    <div
      className="relative aspect-square w-full max-w-md shrink-0 lg:max-w-lg"
      aria-hidden
    >
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full text-violet-500/90 dark:text-violet-400/80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="landing-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:rgb(139_92_246)]" stopOpacity="0.35" />
            <stop offset="100%" className="[stop-color:rgb(168_85_247)]" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="landing-b" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="[stop-color:rgb(99_102_241)]" stopOpacity="0.25" />
            <stop offset="100%" className="[stop-color:rgb(139_92_246)]" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="160" fill="url(#landing-a)" />
        <circle cx="260" cy="140" r="72" fill="url(#landing-b)" />
        <path
          d="M80 280 Q200 220 320 280"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.2"
          fill="none"
        />
        <path
          d="M100 120 L300 120 M100 200 L300 200 M100 280 L300 280"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeOpacity="0.12"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500/5 via-transparent to-transparent blur-3xl dark:from-violet-500/10" />
    </div>
  );
}

export function LandingEditorial({
  yearLabel,
  editionYear,
  yearSubjects,
  onExploreArchive,
  onSubjectOpen,
  onContribute,
}: LandingEditorialProps) {
  const previewSubjects = yearSubjects.slice(0, 6);
  const moreCount = Math.max(0, yearSubjects.length - previewSubjects.length);

  return (
    <div className="space-y-0 text-zinc-900 dark:text-zinc-100">
      {/* Hero */}
      <section className="relative pb-14 pt-2 md:pb-20 md:pt-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="min-w-0 max-w-xl lg:py-4">
            <p className="mb-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500 shadow-[0_0_12px_rgb(139_92_246/0.6)]" />
              {yearLabel}
            </p>
            <h1 className="text-editorial-tight text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              Notes and papers,
              <span className="block bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-fuchsia-400">
                one place.
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Topics, PYQs, slides, and scans — grouped by subject and chapter so you can study without hunting through chats and drives.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreArchive}
                className={cn(
                  'group inline-flex items-center gap-2.5 rounded-2xl px-7 py-3.5 text-sm font-semibold text-white',
                  'bg-gradient-to-br from-violet-600 via-violet-600 to-purple-700 shadow-lg shadow-violet-500/30',
                  'ring-1 ring-white/20 transition hover:shadow-xl hover:shadow-violet-500/35 hover:brightness-[1.03] active:scale-[0.98]',
                  'dark:ring-violet-400/20',
                )}
              >
                <Library className="h-[18px] w-[18px] opacity-95" strokeWidth={2} />
                Browse library
                <ArrowDown className="h-4 w-4 opacity-80 transition group-hover:translate-y-0.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={onContribute}
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200/90 bg-white/90 px-5 py-3.5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-violet-300/80 hover:bg-violet-50/90 dark:border-zinc-600 dark:bg-zinc-900/70 dark:text-zinc-100 dark:hover:border-violet-500/40 dark:hover:bg-violet-500/10"
              >
                Contribute
                <ArrowRight className="h-4 w-4 opacity-70" />
              </button>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      {/* Subjects — typography-led, no stock imagery */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
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
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {previewSubjects.map((subj, i) => {
                const topics = getTopicsBySubject(subj.id).length;
                const chapters = getUnitsBySubject(subj.id).length;
                return (
                  <li key={subj.id}>
                    <button
                      type="button"
                      onClick={() => onSubjectOpen(subj.id)}
                      className={cn(
                        'group flex w-full items-start gap-4 rounded-2xl border border-zinc-200/90 bg-white/70 p-5 text-left transition-all',
                        'hover:border-violet-300/70 hover:shadow-md hover:shadow-violet-500/5 dark:border-zinc-800/90 dark:bg-zinc-900/50',
                        'dark:hover:border-violet-500/35',
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl shadow-inner',
                          subjectAccentClass(i),
                        )}
                      >
                        {subj.icon}
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{subj.name}</span>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                          {topics} topics · {chapters} chapters
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-violet-600 opacity-0 transition group-hover:opacity-100 dark:text-violet-400">
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

      {/* Closing line — short, not a fake testimonial */}
      <section className="pb-10 md:pb-14">
        <div className="mx-auto max-w-6xl rounded-2xl border border-dashed border-zinc-200/90 bg-gradient-to-b from-violet-50/50 to-transparent px-6 py-8 dark:border-zinc-800 dark:from-violet-500/[0.07] dark:to-transparent md:px-10 md:py-10">
          <div className="flex gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-violet-500 dark:text-violet-400" />
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Tip: use the sidebar search to jump to a topic by name — useful the night before an exam.
            </p>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-center text-[11px] text-zinc-400 dark:text-zinc-600">
          © {editionYear} MBBS Resources · For personal study
        </p>
      </section>
    </div>
  );
}
