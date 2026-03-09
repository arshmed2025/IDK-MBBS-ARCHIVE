# MBBS Resources

A minimal, static website to organise First Year MBBS study resources.

---

## How to Upload to GitHub (Step by Step)

### Method 1: Drag & Drop (Easiest — No coding needed)

1. **Build the site** (if not already built):
   ```
   npm install
   npm run build
   ```
   This creates a `dist/index.html` file — that's your entire website in ONE file.

2. **Go to GitHub** → [github.com/new](https://github.com/new) → Create a new repository
   - Name it anything (e.g., `mbbs-resources`)
   - Make it **Public**
   - Click **Create repository**

3. **Upload the file**:
   - Click **"uploading an existing file"** link
   - Drag the `dist/index.html` file into the upload area
   - Click **Commit changes**

4. **Enable GitHub Pages**:
   - Go to **Settings** → **Pages** (left sidebar)
   - Under "Source", select **Deploy from a branch**
   - Branch: **main**, Folder: **/ (root)**
   - Click **Save**

5. **Wait 1-2 minutes** → Your site is live at:
   ```
   https://YOUR-USERNAME.github.io/mbbs-resources/
   ```

---

### Method 2: Upload Full Project (Better — Easy to edit later)

1. **Go to GitHub** → [github.com/new](https://github.com/new) → Create a new repository
   - Name: `mbbs-resources`
   - Public
   - Click **Create repository**

2. **On your computer**, open terminal in the project folder:
   ```bash
   git init
   git add .
   git commit -m "first upload"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/mbbs-resources.git
   git push -u origin main
   ```

3. **Enable GitHub Pages with Actions**:
   - Go to **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**
   - The included workflow file will auto-build and deploy

4. **Every time you edit `content.ts` and push**, the site auto-updates!

---

## How to Edit Content

The only file you need to edit: **`src/data/content.ts`**

### Add a topic (no description):
```typescript
t('anatomy', 'anat-ul', 'Bones of Upper Limb'),
```

### Add a topic with type:
```typescript
t('anatomy', 'anat-ul', 'Upper Limb PYQ 2024', 'pyq'),
```

### Mark as High Yield:
```typescript
t('anatomy', 'anat-ul', 'Brachial Plexus', 'topic', true),
```

### Add with description (images, tables, etc.):
```typescript
t('anatomy', 'anat-histo', 'Simple Squamous Epithelium', 'histology', false,
`## Key Features
- Single layer of flat cells
- Found in alveoli, blood vessels

![Epithelium Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/...)

| Feature | Detail |
|---------|--------|
| Shape | Flat, scale-like |
| Nucleus | Central, oval |
`),
```

After editing, just push to GitHub — the site auto-rebuilds.

---

## Local Development

```bash
npm install
npm run dev      # preview at localhost:5173
npm run build    # build for deployment
```
