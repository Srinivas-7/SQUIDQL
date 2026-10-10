# SquidQL — Learn SQL by Solving Problems

A minimal, lightning-fast, neo-brutalist interactive SQL problem-solving platform. Practice SQL directly in the browser with zero setup using an in-browser WebAssembly SQLite engine.

---

## ✦ Features

- **50 Handcrafted SQL Practice Problems**: Structured interview workout covering Selections, Joins, Aggregations, Grouping, Window Functions, and Subqueries.
- **In-Browser SQLite WASM Sandbox**: Instant query execution with real tabular output without needing a local database server.
- **Monaco SQL Code Editor**: Syntax highlighting, auto-complete, error reporting, and query resetting.
- **Google OAuth & Cloud Sync**: Seamless sign-in via Google popup to sync solved questions and streak data across devices.
- **Progress & Streak Tracking**: Track completed questions, XP, category mastery, and practice history on your profile.
- **Neo-Brutalist Aesthetic**: High-contrast, pixel-perfect brutalist UI with retro arcade typography and seamless dark/light modes.

---

## ✦ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Neo-Brutalist Design Tokens
- **SQL Runtime**: SQLite compiled to WebAssembly via `sql.js`
- **Code Editor**: Monaco Editor (`@monaco-editor/react`)
- **Authentication & Database**: Firebase Auth + Firestore / Supabase
- **Icons**: Lucide React

---

## ✦ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy or create `.env`:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Supabase Configuration (Optional)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## ✦ Application Routes

- `/` — Platform Home & Overview
- `/questions` — SQL 50 Practice Sandbox & Interactive Editor
- `/resources` — Curated SQL Study Plans & Resource Tracks
- `/profile` — Progress Statistics, Solved Problems & Account Settings
- `/login` — Google OAuth Sign In
