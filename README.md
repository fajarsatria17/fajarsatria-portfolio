# Personal Portfolio Website — Dark Futuristic

A responsive, high-performance personal portfolio web application built with **React 18**, **TypeScript 5**, **Vite 5**, **Tailwind CSS**, and **Three.js / React Three Fiber**.

---

## 🛠️ Tech Stack

- **UI Framework:** React 18 (Concurrent features, Strict Mode)
- **Language:** TypeScript 5 (Strict Mode, path aliases)
- **Build Tool:** Vite 5 (Native ESM, optimized chunking)
- **Styling:** Tailwind CSS 3 with custom CSS design tokens
- **3D Graphics:** Three.js + React Three Fiber + @react-three/drei
- **Icons:** @phosphor-icons/react
- **Routing:** React Router 6 (SPA with dynamic project routes)
- **Head & SEO:** react-helmet-async
- **Testing:** Vitest + React Testing Library + Playwright
- **Linting & Formatting:** ESLint 9 + Prettier 3

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v20.x or higher
- **npm:** v10.x or higher

### Installation

1. Clone or navigate to the repository directory:
   ```bash
   cd "PORTOFOLIO PROJECT"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

---

## 💻 Development Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the local Vite development server (`http://localhost:3000`) |
| `npm run build` | Run TypeScript type checks and generate production build in `dist/` |
| `npm run preview` | Locally preview the generated production build |
| `npm run typecheck` | Run strict TypeScript compiler verification without emitting files |
| `npm run lint` | Run ESLint across all codebase files |
| `npm run lint:fix` | Automatically fix fixable ESLint warnings and errors |
| `npm run format` | Format code using Prettier |
| `npm run format:check` | Verify formatting consistency using Prettier |
| `npm run test` | Run Vitest unit and integration test suite |
| `npm run test:watch` | Run Vitest in interactive watch mode |
| `npm run test:coverage`| Generate unit test coverage reports |
| `npm run test:e2e` | Run Playwright end-to-end browser tests |

---

## 📁 Project Architecture & Directory Structure

```
├── public/                 # Static assets served as-is (CV, favicon, robots, sitemap)
├── src/
│   ├── assets/             # Images and fonts processed by Vite
│   ├── components/         # Reusable UI, navigation, and layout components
│   │   ├── hero/           # Hero section and 3D scene elements
│   │   ├── layout/         # Header, Footer, and PageLayout wrappers
│   │   ├── navigation/     # Navbar and mobile menu
│   │   ├── seo/            # Dynamic Open Graph and metadata management
│   │   └── ui/             # Reusable atomic UI primitives (Button, Card, Badge)
│   ├── data/               # Centralized static content data files (TypeScript)
│   ├── hooks/              # Custom React hooks (Language, ReducedMotion, WebGL)
│   ├── lib/                # Third-party service adapters (Formspree)
│   ├── pages/              # Route views (HomePage, ProjectDetailPage, NotFoundPage)
│   ├── scenes/             # Three.js 3D procedural geometries and materials
│   ├── styles/             # Design tokens, global CSS, and keyframe animations
│   ├── types/              # Domain models and TypeScript interface definitions
│   └── utils/              # Pure utility functions (formatting, validation, cn)
├── tests/
│   ├── e2e/                # Playwright end-to-end browser tests
│   ├── integration/        # Integration test suites
│   └── unit/               # Vitest unit tests for utils and components
├── docs/                   # Product Requirements Document & Technical Architecture
├── tailwind.config.ts      # Tailwind configuration with design tokens
├── vite.config.ts          # Vite build config with path aliases and chunking
└── vercel.json             # Deployment headers and SPA routing rewrites
```

---

## 🌐 Bilingual Support (Indonesian & English)

The application includes zero-dependency bilingual language switching (English and Bahasa Indonesia).
Users can toggle between languages anytime via the globe button in the navigation bar.

---

## 🔒 Security & Privacy

- **No Secrets in Code:** Sensitive values are stored exclusively in environment variables.
- **Strict Headers:** Includes Content Security Policy (CSP), X-Frame-Options, and Referrer-Policy via `vercel.json`.
- **Safe External Links:** All external links automatically enforce `rel="noopener noreferrer"`.
- **Spam Prevention:** Contact form includes honeypot detection and server-side rate limits.

---

## 📄 License

Private personal portfolio project. All rights reserved.
