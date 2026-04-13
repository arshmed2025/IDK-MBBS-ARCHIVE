# UI Redesign — Design Spec
**Date:** 2026-04-13  
**Status:** Approved

---

## Overview

A full UI overhaul of the MBBS Archive site. The direction is **colourful & expressive with subtle tints** — every subject gets a unique colour identity that flows through cards, the sidebar, and topic headers. The hero becomes a pastel ocean-cool gradient banner. No emojis anywhere in the UI.

No backend logic, data files, or routing changes.

---

## 1. Colour-per-subject token system

Each subject gets a single named Tailwind colour. This colour is used as: the monogram badge background, the card left border, the sidebar active state tint, and the topic header accent.

| Subject | ID | Tailwind colour | Badge bg | Left border |
|---|---|---|---|---|
| Anatomy | `anatomy` | violet | `#7c3aed` | `#7c3aed` |
| Physiology | `physiology` | rose | `#e11d48` | `#e11d48` |
| Biochemistry | `biochemistry` | amber | `#d97706` | `#d97706` |
| Pathology | `pathology` | orange | `#ea580c` | `#ea580c` |
| Pharmacology | `pharmacology` | emerald | `#16a34a` | `#16a34a` |
| Microbiology | `microbiology` | teal | `#0d9488` | `#0d9488` |
| Forensic Medicine | `forensic` | slate | `#475569` | `#475569` |
| Medicine | `medicine` | blue | `#2563eb` | `#2563eb` |
| Surgery | `surgery` | red | `#dc2626` | `#dc2626` |
| OBG | `obg` | fuchsia | `#c026d3` | `#c026d3` |
| Pediatrics | `peds` | lime | `#65a30d` | `#65a30d` |
| Orthopaedics | `ortho` | yellow | `#ca8a04` | `#ca8a04` |
| Ophthalmology | `ophthalmology` | sky | `#0284c7` | `#0284c7` |
| ENT | `ent` | indigo | `#4338ca` | `#4338ca` |
| Dermatology | `dermatology` | pink | `#db2777` | `#db2777` |
| Psychiatry | `psychiatry` | purple | `#9333ea` | `#9333ea` |
| Radiology (subj) | `radiology_sub` | cyan | `#0891b2` | `#0891b2` |

**Implementation:** A lookup map `SUBJECT_COLOURS: Record<string, string>` exported from a new file `src/utils/subjectColours.ts`. Components import this map and look up by `subject.id`. No changes to `src/data/`.

**Monogram badges:** A `SubjectBadge` component renders a 2-letter abbreviation (first two letters of the subject name, title-cased) on a solid-coloured rounded square (`rounded-lg`). Used in sidebar entries and subject cards. Replaces all emoji usage.

---

## 2. Hero section — `LandingEditorial.tsx`

**Remove:** The current plain white/neutral hero section.

**Replace with:** A full-width pastel gradient banner.

- **Background:** `linear-gradient(135deg, #f0f9ff 0%, #ecfeff 50%, #f0fdf4 100%)` (sky → cyan → mint)
- **Decorative circles:** Two `radial-gradient` blobs (sky, teal), absolutely positioned top-right and bottom-center, `pointer-events: none`
- **Year label:** Small uppercase label with a sky-blue dot — `· Year 1 · Pre-clinical`
- **Headline:** `Study smarter, not harder.` with a sky-blue `✦` accent glyph. Font: `text-5xl font-extrabold tracking-tight`
- **Subtext:** Unchanged copy, `text-zinc-600`
- **CTA buttons:** Dark (`bg-zinc-900`) primary + white ghost secondary — same behaviour as today
- **Stat tags:** A row of pill tags below the buttons showing live counts from `getStats()`: Topics, PYQs, PYQ PDFs, Notes. White background, subtle shadow, no emojis — plain text labels.
- **No subject preview grid inside the hero.** The subject cards section immediately follows below.

---

## 3. Subject cards — `LandingEditorial.tsx`

The existing grid of subject shortcut cards gets the colour treatment:

- **Left border:** `border-l-[3px]` in the subject's colour
- **Badge:** Replace the current neutral icon `div` with `<SubjectBadge>` (solid colour bg, 2-letter monogram, white text)
- **Card background:** White (`bg-white`), no tint on the card itself — the badge + border carry the colour
- **Hover:** `hover:shadow-md hover:-translate-y-px` for lift effect
- **Remove:** The `subjectAccentClass` neutral rotation function — no longer needed

---

## 4. Category tiles — `BrowseCategoryTiles.tsx`

The existing left-border accent colours are kept. Enhancements:

- **Icon surface tint:** Each tile's icon wrapper background already has a tint (`iconSurface`). Ensure all 6 tiles use their correct tinted `bg-*-50` / `dark:bg-*-950/40` surfaces (already implemented — verify consistency)
- **Card background:** `bg-white` (currently correct)
- **Left border width:** Increase from `border-l-[3px]` to `border-l-[3px]` — already correct, keep as-is
- **No structural changes** — this section only needs verification that existing colours are consistent

---

## 5. Sidebar — `Sidebar.tsx`

- **Subject entries:** Replace the `<span className="text-base">{subject.icon}</span>` emoji span with `<SubjectBadge subjectId={subject.id} size="sm" />` (20×20px variant)
- **Active subject tint:** When a subject is active, apply a sky-tinted background using the subject's colour at 10% opacity: `style={{ background: hexColour + '18' }}` (hex + alpha suffix)
- **Active nav items:** Change active state from `bg-violet-50 text-violet-700` to `bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400` — aligns with the ocean-cool direction
- **Sidebar logo:** Keep the existing `bg-gradient-to-br from-violet-500 to-purple-600` — this is the brand mark, not subject-specific
- **No structural changes** to the sidebar layout, search, year selector, or theme toggle

---

## 6. Files to create / modify

| File | Action |
|---|---|
| `src/utils/subjectColours.ts` | **Create** — exports `SUBJECT_COLOURS` map and `SubjectBadge` component |
| `src/components/LandingEditorial.tsx` | **Modify** — new hero, updated subject cards |
| `src/components/Sidebar.tsx` | **Modify** — swap emoji spans for `SubjectBadge`, update active tint |
| `src/components/BrowseCategoryTiles.tsx` | **Verify only** — confirm existing colour implementation is consistent |
| `src/index.css` | **No changes needed** |
| `src/data/*` | **Do not touch** |

---

## 7. Dark mode

All changes must work in dark mode:

- Subject card borders: same hex colour, dark mode adds no extra tint to card bg
- Hero gradient: in dark mode, replace with a dark equivalent: `from-zinc-900 via-slate-900 to-zinc-900` with the decorative blobs at lower opacity (0.12)
- Stat tags: `bg-zinc-800 text-zinc-200` in dark mode
- `SubjectBadge`: same badge colour in dark mode (solid colour is legible on dark backgrounds)
- Sidebar active tint: `style={{ background: hexColour + '22' }}` in dark mode (slightly higher opacity)

---

## 8. Out of scope

- `src/data/` files — not touched
- `TopicDetail.tsx`, `TopicItem.tsx`, `ContentGuide.tsx`, `ContributePage.tsx` — not in this spec
- Any routing or state logic changes
- Font changes
- Mobile layout restructuring (responsive behaviour preserved as-is)
