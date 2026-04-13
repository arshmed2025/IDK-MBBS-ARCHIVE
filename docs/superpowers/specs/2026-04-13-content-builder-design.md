# Content Builder — Design Spec
**Date:** 2026-04-13  
**Status:** Approved

---

## Overview

Add a **Content Builder** section to the existing Admin Content Guide (`src/components/ContentGuide.tsx`). The builder lets an admin fill in a form (content type, subject, unit, title, optional credits), write markdown in a toolbar-assisted textarea with a live preview, and copy a fully-generated `topic(...)` code block ready to paste into `src/data/yearX.ts`.

Extend `MarkdownRenderer` to support two new link types that open popup modals instead of navigating away: video (Oracle Cloud MP4) and PDF (Google Drive). These modals also work when students view the finished topic in `TopicDetail`.

No changes to `src/data/` files.

---

## 1. Content Builder section in ContentGuide

A new collapsible `<Section>` added at the **top** of `ContentGuide`, with a "New" badge. It is open by default. It contains three numbered steps.

### Step 1 — Topic details

| Field | Input type | Notes |
|---|---|---|
| Content type | `<select>` | 6 options: `topic`, `pyqpdf`, `pyq`, `histo`, `radio`, `note` |
| Subject | `<select>` | All 17 subjects from `subjects` array in `src/data/types.ts`, displayed as `id — Name` |
| Unit / Chapter | `<select>` | Units filtered by selected subject; option displays `id — Name`; includes an "Add new…" option that reveals a free-text input |
| Title | `<input type="text">` | Free text |
| Very Important | Toggle switch | When on, prepends `⭐ ` to the title in the generated code |
| Contributor | `<input type="text">` | Optional, maps to 5th param |
| Editor | `<input type="text">` | Optional, maps to 6th param |

**Subject field** also has an "Add new…" option at the bottom of the dropdown. When selected, a free-text input replaces the subject dropdown for that field. When a custom subject is entered, the Unit dropdown shows only an "Add new…" option (no units to filter from). Same free-text fallback applies to Unit. This allows adding subjects/units not yet in `types.ts` without blocking the builder.

### Step 2 — Write content

**Toolbar buttons** (insert at cursor position):

| Button | Inserted markdown |
|---|---|
| **B** | `**text**` |
| *I* | `*text*` |
| H2 | `## Heading` |
| H3 | `### Heading` |
| • List | `- item` |
| 1. List | `1. item` |
| + Table | A 3-col 2-row table template |
| 🖼 Image | `![caption](url)` — prompts for URL via a small inline input popup |
| ▶ Video | `[VIDEO: Title](url)` — prompts for title + URL |
| 📄 PDF | `[PDF: Title](url)` — prompts for title + URL |
| 🔗 Link | `[Text](url)` |

**Textarea:** Plain `<textarea>` with monospace font, min-height 200px, resizable.

**Live preview:** Below the textarea. Renders using `<MarkdownRenderer>` on every keystroke (debounced 150ms). Shows video and PDF cards exactly as students will see them.

### Step 3 — Generated code

A dark code block (`bg-zinc-900`) showing the complete ready-to-paste call. Updates live as the form changes. Includes a **Copy** button that copies to clipboard and shows a "Copied!" confirmation for 2 seconds.

**Generated output format:**
```
topic('subjectId', 'unitId', '⭐ Title', `
...content...
`, 'Contributor', 'Editor'),
```
- `⭐ ` prefix only if VIP toggle is on
- Content string omitted (no 4th param) if textarea is empty
- Contributor/Editor params omitted if fields are empty

---

## 2. MarkdownRenderer — VIDEO and PDF link support

### Syntax

Both are standard markdown links with a recognized prefix in the link text:

- **Video:** `[VIDEO: Title](url)` — URL is a direct video file (MP4/WebM on Oracle Cloud)
- **PDF:** `[PDF: Title](url)` — URL is a Google Drive share link

### Rendering

**Video card:**
- Dark card (`bg-zinc-900`) with a sky-blue play circle and the title in white
- Sub-label: "Click to play"
- On click: fires `onVideoClick(url, title)` callback

**PDF card:**
- Orange-tinted card (`bg-orange-50 border-orange-200`) with an orange "PDF" badge and the title
- Sub-label: "Click to open"
- On click: fires `onPdfClick(url, title)` callback

Both replace the default `<a>` link rendering when the prefix is detected.

### Props added to MarkdownRenderer

```tsx
interface MarkdownRendererProps {
  content: string;
  onImageClick?: (src: string) => void;
  onVideoClick?: (url: string, title: string) => void;   // NEW
  onPdfClick?: (url: string, title: string) => void;     // NEW
}
```

---

## 3. Video & PDF modals in TopicDetail

`TopicDetail` already manages `zoomedImage` state. Extend to handle video and PDF modals using the same pattern.

**New state:**
```tsx
const [videoModal, setVideoModal] = useState<{ url: string; title: string } | null>(null);
const [pdfModal, setPdfModal]   = useState<{ url: string; title: string } | null>(null);
```

Pass `onVideoClick` and `onPdfClick` to `<MarkdownRenderer>` inside TopicDetail.

**Video modal:** Full-screen dark overlay (`bg-black/80`). Contains a `<video controls autoPlay>` element with the URL. Close button top-right. Click overlay to close.

**PDF modal:** Full-screen overlay. Contains an `<iframe>` with the Google Drive preview URL (replace `/view` with `/preview` in the URL). Close button top-right. Click overlay to close. Height 80vh.

---

## 4. ContentBuilder preview modal handling

Inside the Content Builder live preview, video/PDF click callbacks open local modal state managed inside the `ContentBuilder` component (not lifted to TopicDetail). Same visual as TopicDetail modals.

---

## 5. Files to create / modify

| File | Action |
|---|---|
| `src/components/ContentGuide.tsx` | **Modify** — add Content Builder section at top |
| `src/components/MarkdownRenderer.tsx` | **Modify** — add VIDEO/PDF link detection, new callbacks |
| `src/components/TopicDetail.tsx` | **Modify** — add video/PDF modal state and UI |
| `src/data/` | **Do not touch** |

---

## 6. Dark mode

- Content Builder form: `bg-zinc-900` inputs, `border-zinc-700`, labels `text-zinc-400`
- Toolbar: `bg-zinc-800` background, buttons `hover:bg-zinc-700`
- Generated code block: already dark (`bg-zinc-900`) — unchanged in dark mode
- Video card: same dark card, legible in both modes
- PDF card: `bg-orange-500/10 border-orange-500/20` in dark mode
- Modals: `bg-black/90` overlay in dark mode

---

## 7. Out of scope

- Any changes to `src/data/` files
- Saving generated content to the filesystem (static site — copy/paste is intentional)
- Authentication or access control for the admin guide (already hidden via double-click footer)
- YouTube embeds or non-Oracle video hosting (direct MP4 URL only)
- Font or routing changes
