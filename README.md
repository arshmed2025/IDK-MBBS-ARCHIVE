# MBBS Resources — Organised Study Library

A static website for organising First Year MBBS resources (topics, PYQs, histology slides, scanned notes).

---

## 🚀 First Time Setup (Do Once)

### Step 1: Create a GitHub repo
1. Go to [github.com/new](https://github.com/new)
2. Name it `mbbs-resources` (or anything you like)
3. Make it **Public**
4. **DO NOT** check "Add a README" or ".gitignore" — leave everything empty
5. Click **Create repository**

### Step 2: Push your code
Open **Terminal** (Mac) or **Command Prompt** (Windows) and run these commands **one by one**:

```bash
cd path/to/your/project/folder
```
Replace `path/to/your/project/folder` with the actual folder path. Example:
- Mac: `cd ~/Desktop/mbbs-resources`
- Windows: `cd C:\Users\YourName\Desktop\mbbs-resources`

Then run:
```bash
git init
git add .
git commit -m "first upload"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mbbs-resources.git
git push -u origin main
```
⚠️ Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Enable GitHub Pages
1. Go to your repo on GitHub
2. Click **Settings** (top bar)
3. Click **Pages** (left sidebar)
4. Under "Source" → select **GitHub Actions**
5. Done! The workflow file in your code will auto-build and deploy

### Step 4: Wait 2 minutes
- Go to **Actions** tab in your repo — you'll see it building
- Once the green ✅ appears, your site is live at:
```
https://YOUR_USERNAME.github.io/mbbs-resources/
```

---

## 🔄 How to Push Updates (Every Time You Make Changes)

After editing any file (like adding topics in `src/data/content.ts`), run these 3 commands:

```bash
cd path/to/your/project/folder
git add .
git commit -m "added new topics"
git push
```

That's it. GitHub will auto-rebuild and deploy in ~1 minute.

### Short version (copy-paste every time):
```bash
git add . && git commit -m "update" && git push
```

---

## ✏️ Edit Directly on GitHub (No Terminal Needed)

After the first setup, you can edit files **directly on GitHub**:

1. Go to your repo → `src/data/content.ts`
2. Click the **pencil icon** (✏️) top-right
3. Add your topics
4. Click **Commit changes** (green button)
5. Site auto-rebuilds in ~1 minute

---

## 📝 Adding Content

Edit `src/data/content.ts`. Each topic is one line:

```typescript
t('anatomy', 'anat-ul', 'Bones of Upper Limb'),
```

With type and high-yield flag:
```typescript
t('anatomy', 'anat-ul', 'Brachial Plexus', 'topics', true),
```

With description (images, tables, etc.):
```typescript
t('anatomy', 'anat-histo', 'Simple Squamous Epithelium', 'histology', false,
`## Key Features
- Single layer of flat cells

![Diagram](https://example.com/image.jpg)
`),
```

---

## 🔒 Secret Admin Guide

Double-click the footer text ("Built for focused study") to access the full content guide with formatting reference, image hosting tips, table syntax, and more.

---

## 🛠️ Troubleshooting

### "git is not recognized"
→ Install Git from [git-scm.com](https://git-scm.com/downloads) and restart your terminal.

### "remote origin already exists"
→ Run: `git remote set-url origin https://github.com/YOUR_USERNAME/mbbs-resources.git`

### "failed to push"
→ Run: `git pull origin main --rebase` then `git push` again.

### Build fails on GitHub
→ Go to **Actions** tab → click the failed run → read the error. Usually a typo in `content.ts` (missing comma, unclosed backtick).

### Site shows blank page
→ Make sure you selected **GitHub Actions** (not "Deploy from branch") in Settings → Pages → Source.
