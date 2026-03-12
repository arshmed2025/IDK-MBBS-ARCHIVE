# MBBS Resources

A minimal, organised study library for MBBS students.

## Setup

```bash
npm install
npm run dev     # local preview
npm run build   # produces dist/index.html
```

## Deploy

After `npm run build`, upload the **`dist/index.html`** file to any static hosting (GitHub Pages, Netlify, Vercel).

The built file is a single self-contained HTML file (~380 KB) with everything compiled inside.

## Add Content

Edit `src/data/content.ts` — add topics with one line each:

```ts
t('anatomy', 'anat-ul', 'Brachial Plexus'),
```

See the hidden Admin Guide (double-click the footer text) for full formatting reference.
