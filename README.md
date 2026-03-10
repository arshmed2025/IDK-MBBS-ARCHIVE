# MBBS Resources — Organised Study Library

A minimal, static website for organising First Year MBBS resources.

---

## 🚀 How to Put This on GitHub (Pick ONE method)

---

### Method 1: EASIEST — Upload Just One File (No coding needed)

This works if you just want the site online fast.

**Step 1: Build the site on your computer**
```
npm install
npm run build
```
This creates a file at `dist/index.html` (about 380KB). This ONE file IS your entire website.

**Step 2: Create a GitHub repo**
1. Go to https://github.com/new
2. Repository name: `mbbs-resources` (or anything you want)
3. Set to **Public**
4. Check ✅ "Add a README file"
5. Click **Create repository**

**Step 3: Upload the built file**
1. In your new repo, click **Add file** → **Upload files**
2. Go to your project's `dist/` folder on your computer
3. Drag `index.html` into the upload box
4. Click **Commit changes**

**Step 4: Enable GitHub Pages**
1. Go to your repo's **Settings** tab (top menu bar)
2. In the left sidebar, click **Pages**
3. Under "Source", select **Deploy from a branch**
4. Under "Branch", select **main** and folder **/ (root)**
5. Click **Save**
6. Wait 2-3 minutes
7. Refresh the page — you'll see a green box with your site URL:
   `https://YOUR-USERNAME.github.io/mbbs-resources/`

**That's it! Your site is live.** 🎉

> **To update:** Build again (`npm run build`), then on GitHub: click `index.html` → pencil icon → delete it → re-upload the new one from `dist/`.

---

### Method 2: Full Project Upload (Auto-deploys when you edit)

This is better long-term. Every time you push changes, GitHub automatically rebuilds and deploys.

**Step 1: Install Git**
- Download from https://git-scm.com/downloads
- Install with default settings

**Step 2: Create a GitHub repo**
1. Go to https://github.com/new
2. Repository name: `mbbs-resources`
3. Set to **Public**
4. Do NOT check any boxes (no README, no .gitignore)
5. Click **Create repository**

**Step 3: Push your code**

Open Terminal/Command Prompt in your project folder and run these commands ONE BY ONE:

```bash
git init
git add .
git commit -m "first upload"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/mbbs-resources.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

**Step 4: Enable GitHub Pages with Actions**
1. Go to your repo on GitHub
2. Click **Settings** (top menu bar)
3. Click **Pages** (left sidebar)
4. Under "Source", change the dropdown from "Deploy from a branch" to **GitHub Actions**
5. That's it — don't select anything else, just change that dropdown

**Step 5: Verify**
1. Go to the **Actions** tab in your repo
2. You should see a workflow running (yellow dot = building, green check = done)
3. Once green, your site is live at:
   `https://YOUR-USERNAME.github.io/mbbs-resources/`

---

## ✏️ How to Update Content (After Method 2)

### Option A: Edit on your computer + push
```bash
# Edit src/data/content.ts
# Then:
git add .
git commit -m "added new topics"
git push
```
GitHub auto-rebuilds in ~1 minute.

### Option B: Edit directly on GitHub
1. Go to your repo on GitHub
2. Navigate to `src/data/content.ts`
3. Click the ✏️ pencil icon
4. Make your changes
5. Click **Commit changes**
6. GitHub auto-rebuilds and deploys

---

## 🔧 Troubleshooting

### "I see a blank/white page"

**If you used Method 1:**
- You probably uploaded the WRONG `index.html`. There are TWO:
  - ❌ `index.html` in the root folder (1KB, won't work — this is the source file)
  - ✅ `index.html` inside the `dist/` folder (380KB, this is the built site)
- Delete the wrong one, upload the one from `dist/`

**If you used Method 2:**
- Go to Settings → Pages → make sure Source is **GitHub Actions** (not "Deploy from a branch")
- Go to the Actions tab — is there a red ❌? Click on it to see the error
- Make sure you pushed ALL files (run `git add .` before committing)

### "It says 404"
- Wait 2-3 minutes after deploying. GitHub needs time.
- Make sure the repo is **Public** (Settings → General → scroll to Danger Zone → change visibility)

### "git: command not found"
- Install Git: https://git-scm.com/downloads

### "remote already exists"
```bash
git remote set-url origin https://github.com/YOUR-USERNAME/mbbs-resources.git
```

### "failed to push"
```bash
git pull --rebase origin main
git push
```

### "npm: command not found"
- Install Node.js: https://nodejs.org (download the LTS version)

---

## 📁 Project Structure

```
src/
├── App.tsx                      # Main app
├── data/content.ts              # ALL your topics, subjects, chapters
├── components/
│   ├── Sidebar.tsx              # Navigation
│   ├── TopicItem.tsx            # Topic row (View button if has content)
│   ├── TopicDetail.tsx          # Full topic view with print
│   ├── MarkdownRenderer.tsx     # Renders descriptions
│   ├── ContributePage.tsx       # Public "email me content" page
│   └── ContentGuide.tsx         # Hidden admin guide (double-click footer)
└── utils/cn.ts                  # Utility
```
