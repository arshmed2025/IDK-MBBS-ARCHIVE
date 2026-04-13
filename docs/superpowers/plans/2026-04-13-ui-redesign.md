# UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the site's visual design with a colour-per-subject system, a pastel ocean-cool hero, coloured monogram badges replacing all emojis, and coloured accents on cards and tiles.

**Architecture:** A new `subjectColours.ts` utility exports the colour map and a reusable `SubjectBadge` component. `LandingEditorial.tsx` gets a new hero and updated subject cards. `Sidebar.tsx` swaps emoji spans for `SubjectBadge`. Dynamic hex values are applied via inline `style` props (not dynamic Tailwind class names) to avoid purging. No data files or routing changes.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Vite. No test framework — verification is `npm run build`.

---

## File map

| File | Action |
|---|---|
| `src/utils/subjectColours.ts` | **Create** — `SUBJECT_COLOURS` map + `SubjectBadge` component |
| `src/components/LandingEditorial.tsx` | **Modify** — new hero section, updated subject cards using `SubjectBadge` |
| `src/components/Sidebar.tsx` | **Modify** — swap emoji icon spans for `SubjectBadge`, update active-state colour |
| `src/App.tsx` | **Modify** — pass `stats` prop to `LandingEditorial` |
| `src/components/BrowseCategoryTiles.tsx` | **No change** — existing colours are already correct |

---

## Task 1: Create the subject colour system

**Files:**
- Create: `src/utils/subjectColours.ts`

- [ ] **Step 1: Create `src/utils/subjectColours.ts`**

```ts
// src/utils/subjectColours.ts

/** One hex colour per subject ID. Used as badge background, card left-border, sidebar active tint. */
export const SUBJECT_COLOURS: Record<string, string> = {
  anatomy:       '#7c3aed',
  physiology:    '#e11d48',
  biochemistry:  '#d97706',
  pathology:     '#ea580c',
  pharmacology:  '#16a34a',
  microbiology:  '#0d9488',
  forensic:      '#475569',
  medicine:      '#2563eb',
  surgery:       '#dc2626',
  obg:           '#c026d3',
  peds:          '#65a30d',
  ortho:         '#ca8a04',
  ophthalmology: '#0284c7',
  ent:           '#4338ca',
  dermatology:   '#db2777',
  psychiatry:    '#9333ea',
  radiology_sub: '#0891b2',
};

/** Returns the hex colour for a subject, falling back to zinc if unknown. */
export function subjectColour(subjectId: string): string {
  return SUBJECT_COLOURS[subjectId] ?? '#71717a';
}

/** 2-letter monogram derived from the subject name (e.g. "Anatomy" → "An"). */
export function subjectMonogram(name: string): string {
  const clean = name.trim();
  return clean.length >= 2 ? clean[0].toUpperCase() + clean[1].toLowerCase() : clean.toUpperCase();
}

interface SubjectBadgeProps {
  subjectId: string;
  subjectName: string;
  /** 'md' = 36×36px (landing cards), 'sm' = 22×22px (sidebar rows) */
  size?: 'md' | 'sm';
}

/** Solid-colour rounded square with a 2-letter monogram. No emoji. */
export function SubjectBadge({ subjectId, subjectName, size = 'md' }: SubjectBadgeProps) {
  const colour = subjectColour(subjectId);
  const monogram = subjectMonogram(subjectName);
  const dim = size === 'sm' ? 22 : 36;
  const fontSize = size === 'sm' ? 9 : 12;

  return (
    <div
      style={{
        width: dim,
        height: dim,
        minWidth: dim,
        backgroundColor: colour,
        borderRadius: size === 'sm' ? 5 : 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        fontWeight: 700,
        color: 'white',
        flexShrink: 0,
        letterSpacing: '0.02em',
      }}
      aria-hidden
    >
      {monogram}
    </div>
  );
}
```

- [ ] **Step 2: Verify the file builds**

```bash
cd /Users/arsheepsingh/Documents/Code/IDK-MBBS-ARCHIVE && npm run build 2>&1 | tail -20
```

Expected: build completes with no TypeScript errors. (The new file is not yet imported anywhere, so no component changes needed at this step.)

- [ ] **Step 3: Commit**

```bash
cd /Users/arsheepsingh/Documents/Code/IDK-MBBS-ARCHIVE
git add src/utils/subjectColours.ts
git commit -m "feat: add subject colour map and SubjectBadge component"
```

---

## Task 2: Update `LandingEditorial.tsx` — new hero + subject cards

**Files:**
- Modify: `src/components/LandingEditorial.tsx`
- Modify: `src/App.tsx` (add `stats` prop)

### 2a — Add `stats` prop to `LandingEditorial` and pass it from `App.tsx`

- [ ] **Step 1: Add `stats` to `LandingEditorialProps` and the hero stat-tags row**

Replace the entire contents of `src/components/LandingEditorial.tsx` with:

```tsx
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
    stats.topics    > 0 && `${stats.topics} Topics`,
    stats.pyqs      > 0 && `${stats.pyqs} PYQs`,
    stats.pyq_pdfs  > 0 && `${stats.pyq_pdfs} PYQ PDFs`,
    stats.notes     > 0 && `${stats.notes} Notes`,
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
              Study smarter,
              <span className="block">
                not harder.{' '}
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
      <section id={MBBS_BROWSE_ANCHOR_ID} className="py-10 md:py-14">
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
```

- [ ] **Step 2: Pass `stats` prop from `App.tsx`**

In `src/App.tsx`, find the `<LandingEditorial` JSX (search for `<LandingEditorial`). Add the `stats` prop. The `getStats` function is already imported. Add `stats={getStats(activeYear)}` to the component:

```tsx
<LandingEditorial
  yearLabel={years.find(y => y.id === activeYear)?.label ?? 'Year 1'}
  editionYear={new Date().getFullYear()}
  yearSubjects={getSubjectsByYear(activeYear)}
  stats={getStats(activeYear)}
  onExploreArchive={...}
  onSubjectOpen={...}
  onContribute={...}
/>
```

> **Note:** Do not replace the existing `onExploreArchive`, `onSubjectOpen`, `onContribute` handler references — only add `stats={getStats(activeYear)}` to the existing JSX. Read the current `<LandingEditorial` block in `App.tsx` first, then add the one missing prop.

- [ ] **Step 3: Build to verify no TypeScript errors**

```bash
cd /Users/arsheepsingh/Documents/Code/IDK-MBBS-ARCHIVE && npm run build 2>&1 | tail -20
```

Expected: build succeeds, no errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/arsheepsingh/Documents/Code/IDK-MBBS-ARCHIVE
git add src/components/LandingEditorial.tsx src/App.tsx
git commit -m "feat: redesign hero to ocean-cool gradient with stat tags, add coloured monogram subject cards"
```

---

## Task 3: Update `Sidebar.tsx` — monogram badges, ocean active state

**Files:**
- Modify: `src/components/Sidebar.tsx`

- [ ] **Step 1: Replace emoji icon spans and update active colours**

In `src/components/Sidebar.tsx`:

1. Add import at the top (after existing imports):
```tsx
import { SubjectBadge, subjectColour } from '../utils/subjectColours';
```

2. Find the `<span className="text-base">{subject.icon}</span>` line (inside the subject button in the subjects list) and replace it with:
```tsx
<SubjectBadge subjectId={subject.id} subjectName={subject.name} size="sm" />
```

3. Find the active subject button className — currently:
```tsx
isActiveSubject && activeView === 'subject' && !activeUnitId && !activeCategory
  ? 'bg-white dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700'
```
Replace with:
```tsx
isActiveSubject && activeView === 'subject' && !activeUnitId && !activeCategory
  ? 'bg-white dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700'
```
This stays unchanged — the active card highlight is kept. The colour identity now comes from the badge.

4. Find the two nav items that use `bg-violet-50` and `text-violet-700` for the active state (Overview, Very Important, Contribute quick-access buttons):
```tsx
activeView === 'home'
  ? 'bg-violet-50 dark:bg-violet-500/10 font-medium text-violet-700 dark:text-violet-400'
```
Replace `violet` with `sky` in all three nav items:
```tsx
activeView === 'home'
  ? 'bg-sky-50 dark:bg-sky-500/10 font-medium text-sky-700 dark:text-sky-400'
```
```tsx
activeView === 'important'
  ? 'bg-sky-50 dark:bg-sky-500/10 font-medium text-sky-700 dark:text-sky-400'
```
```tsx
activeView === 'contribute'
  ? 'bg-sky-50 dark:bg-sky-500/10 font-medium text-sky-700 dark:text-sky-400'
```

5. Find the active unit dot — currently `bg-violet-500` — change to `bg-sky-500`:
```tsx
isActiveUnit ? 'bg-sky-500' : 'bg-zinc-300 dark:bg-zinc-600'
```

6. Find the theme toggle active button — currently `text-violet-600 dark:text-violet-400` — change to `text-sky-600 dark:text-sky-400`:
```tsx
theme === mode
  ? 'bg-white dark:bg-zinc-700 text-sky-600 dark:text-sky-400 shadow-sm'
```

- [ ] **Step 2: Build to verify**

```bash
cd /Users/arsheepsingh/Documents/Code/IDK-MBBS-ARCHIVE && npm run build 2>&1 | tail -20
```

Expected: build succeeds, no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/arsheepsingh/Documents/Code/IDK-MBBS-ARCHIVE
git add src/components/Sidebar.tsx
git commit -m "feat: replace emoji subject icons with coloured monogram badges in sidebar, update active state to sky"
```

---

## Task 4: Final build and dist update

**Files:**
- `dist/` — regenerated

- [ ] **Step 1: Clean build**

```bash
cd /Users/arsheepsingh/Documents/Code/IDK-MBBS-ARCHIVE && npm run build 2>&1
```

Expected: `✓ built in` with no errors. The `dist/` folder is updated.

- [ ] **Step 2: Smoke-check the built output**

```bash
cd /Users/arsheepsingh/Documents/Code/IDK-MBBS-ARCHIVE && npm run preview
```

Open `http://localhost:4173` and verify:
- Hero shows ocean-cool pastel gradient with stat tags (no plain white box)
- Subject cards have coloured left border + coloured monogram badge (no emojis)
- Sidebar subject rows show monogram badges (no emojis)
- Active sidebar nav items highlight in sky blue
- Dark mode toggle works — hero switches to dark background, badges remain readable

- [ ] **Step 3: Commit dist + final commit**

```bash
cd /Users/arsheepsingh/Documents/Code/IDK-MBBS-ARCHIVE
git add dist/
git commit -m "chore: rebuild dist after UI redesign"
```
