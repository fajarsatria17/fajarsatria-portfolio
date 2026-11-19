# Recommended Technology Stack
## Personal Portfolio Website — Dark Futuristic
**Document Version:** 1.0 | **PRD Version:** 1.1  
**Date:** 2026-11-13

---

## 1. Stack Overview

| Layer | Technology | Version (target) | Necessity |
|---|---|---|---|
| UI Framework | React | 18.x | ✅ Required |
| Language | TypeScript | 5.x | ✅ Required |
| Build Tool | Vite | 5.x | ✅ Required |
| Styling | Tailwind CSS | 3.x | ✅ Required |
| Routing | React Router | 6.x | ✅ Required |
| 3D Engine | Three.js | 0.168+ | ✅ Required (Hero) |
| 3D React Wrapper | React Three Fiber | 8.x | ✅ Required (Hero) |
| 3D Utilities | @react-three/drei | 9.x | ✅ Recommended |
| Animation | Framer Motion | 11.x | ⚠️ Optional (see below) |
| SEO | react-helmet-async | 2.x | ✅ Required |
| Form Handling | React Hook Form | 7.x | ✅ Recommended |
| Contact Service | Formspree | (SaaS) | 🟡 Decision required |
| Unit Testing | Vitest | 1.x | ✅ Required |
| Component Testing | React Testing Library | 14.x | ✅ Required |
| E2E Testing | Playwright | 1.x | ✅ Required |
| Linting | ESLint | 9.x | ✅ Required |
| Formatting | Prettier | 3.x | ✅ Required |
| Icons | @phosphor-icons/react | 2.x | ✅ Recommended |
| Analytics | Vercel Analytics | (built-in) | 🟡 Optional |

---

## 2. Technology Evaluation

### 2.1 React 18 + TypeScript 5

**Purpose:** Core UI framework and type safety layer.

**Necessity:** ✅ Explicitly required by PRD (Section 6, Section 12.1, Addendum A6.1).

**Why React 18 specifically:**
- Concurrent features (Suspense, useTransition) beneficial for 3D lazy loading
- Automatic batching for state updates reduces re-renders
- Strong ecosystem for Three.js integration via React Three Fiber

**Why TypeScript 5:**
- Type-safe content data models prevent runtime errors from missing/wrong fields
- IDE support for content files (profile.ts, projects.ts, etc.)
- Strict mode catches undefined/null bugs at compile time

**Configuration:** `tsconfig.json` with `"strict": true`, `"target": "ES2020"`, `"moduleResolution": "bundler"`.

---

### 2.2 Vite 5

**Purpose:** Development server and production build tool.

**Necessity:** ✅ Explicitly required by PRD (Section 6, Addendum A6.1).

**Benefits:**
- Native ESM dev server — instant HMR during development
- Rollup-based production builds with automatic code splitting
- Native support for dynamic `import()` → Three.js lazy loading
- `import.meta.env.*` for environment variables (safe, no accidental secret exposure)
- Plugin ecosystem: `@vitejs/plugin-react`, `vite-plugin-sitemap`

**Key plugins needed:**
```
@vitejs/plugin-react        — React Fast Refresh + JSX transform
vite-plugin-sitemap         — Auto-generate sitemap.xml (or manual)
```

---

### 2.3 Tailwind CSS 3

**Purpose:** Utility-first CSS framework for responsive, design-token-driven styling.

**Necessity:** ✅ Required by PRD (Section 6, Addendum A6.1 — "Tailwind CSS or CSS Modules").

**Decision:** Tailwind CSS chosen over CSS Modules because:
- Mobile-first responsive utilities align with PRD's mobile-first principle
- Dark mode via `darkMode: 'class'` or `darkMode: 'media'` (dark is default per OD-004)
- Design token integration via `tailwind.config.ts` extending color/spacing
- Better DX for rapid iteration; easier to maintain consistent spacing

**Design token strategy:**
- CSS custom properties for theme values (`--color-accent`, `--color-bg`, etc.)
- `tailwind.config.ts` references these variables
- `src/styles/tokens.css` defines all design tokens

---

### 2.4 React Router 6

**Purpose:** Client-side routing for `/` (SPA sections) and `/projects/:slug` (project detail).

**Necessity:** ✅ Required — OD-001 resolved as "one-page + project detail route."

**Configuration:** `createBrowserRouter` with `RouterProvider`; `ScrollRestoration` for page-level scroll reset on route change; lazy-loaded routes for `ProjectDetailPage`.

---

### 2.5 Three.js + React Three Fiber 8 + Drei 9

**Purpose:** 3D Hero Section rendering and interaction.

**Necessity:** ✅ Required for Hero Section per PRD Addendum v1.1 (HR-001, HR-003, HR-004, A6.1).

**Three.js (0.168+):**
- Core WebGL rendering engine
- Provides geometry, materials, lights, and scene graph
- Tree-shakable with modern bundlers (import only what's needed)

**React Three Fiber (R3F 8):**
- Declarative React bindings for Three.js
- Manages render loop, resize, and scene lifecycle
- Supports React Suspense for async loading
- Integrates with React's concurrent mode

**@react-three/drei 9:**
- Pre-built helpers: `<Float>` for floating animation, `<MeshDistortMaterial>` for organic shader effects, `<PointMaterial>` for particle effects
- Avoids writing boilerplate camera/light setup
- Conditionally necessary — if PRD's abstract orb is implemented with built-in shader materials

**Bundle size management:**
```js
// Dynamic import — Three.js and R3F only load after LCP
const HeroScene = React.lazy(() => import('./components/hero/HeroScene'));
```

**Estimated bundle impact:** ~200–350KB gzipped (Three.js ~160KB, R3F ~30KB, Drei selective).

---

### 2.6 Framer Motion 11

**Purpose:** Entrance animations (MOT-001), CTA hover states (MOT-005), page transitions.

**Necessity:** ⚠️ **Optional** — PRD specifies "CSS transitions / Motion (optional)" (Addendum A6.1). 

**Recommendation:** Include Framer Motion for:
- Staggered entrance animations (`HR-005`) — complex with pure CSS
- `useReducedMotion()` hook integration built-in
- CTA button interaction states

**Alternative (if bundle size is a concern):** Use CSS transitions + animations only. Removes ~50KB from bundle but limits animation expressiveness.

**Decision:** Include Framer Motion but import only what is used. Lazy-load where possible.

---

### 2.7 react-helmet-async 2

**Purpose:** Dynamic `<head>` management for SEO metadata (FR-015).

**Necessity:** ✅ Required — each page needs unique title, description, Open Graph tags.

**Use case:** 
- Home page: portfolio owner name + headline
- Project detail: project title + summary + thumbnail OG image

---

### 2.8 React Hook Form 7

**Purpose:** Contact form state management, validation, and submission handling (FR-013).

**Necessity:** ✅ Recommended — reduces form boilerplate and provides:
- Uncontrolled form performance (no re-render on every keystroke)
- Built-in validation rules (required, email format, min/maxLength)
- Error state management per field
- `isSubmitting` state for loading UI and double-submit prevention (BR-007)

**Alternative:** Native controlled React state + manual validation (acceptable for a simple 4-field form but more code).

---

### 2.9 Contact Form Provider

**Purpose:** Server-side form submission, validation, rate limiting, email delivery (FR-013, BR-007, SEC-005).

**Options evaluated:**

| Provider | Pros | Cons | Free Tier |
|---|---|---|---|
| **Formspree** | Simple integration, honeypot built-in, no API key in frontend | Limited customization | 50 submissions/month |
| **EmailJS** | Works from client-side JS | API key exposed in bundle (mitigated by origin rules) | 200 emails/month |
| **Resend + Vercel Fn** | Full control, custom domain email, no key exposure | Requires Vercel serverless function | 3000 emails/month |
| **Netlify Forms** | Built-in if using Netlify | Vercel is chosen platform | 100 submissions/month |

**Recommendation:** **Formspree** for simplicity, or **Resend + Vercel Serverless Function** for full control. 

> **Decision Required from Product Owner.**

---

### 2.10 @phosphor-icons/react 2

**Purpose:** Icon library for UI elements (social links, navigation, arrows, tech icons).

**Necessity:** ✅ Recommended — tree-shakable, consistent style, includes tech stack icons.

**Alternative:** `lucide-react` (similar approach) or inline SVGs.

---

### 2.11 Vitest + React Testing Library + Playwright

**Purpose:** Unit, integration, and E2E testing (PRD Section 16, Addendum A7).

**Necessity:** ✅ All three required by PRD.

**Vitest:** Fast Vite-native test runner; compatible with Jest API.

**React Testing Library:** Tests component behavior from user perspective (not implementation).

**Playwright:** Cross-browser E2E testing; supports accessibility audits; runs on Chrome, Firefox, Safari.

**Additional testing tools:**
- `@axe-core/playwright` — Automated accessibility scanning in E2E tests
- `msw` (Mock Service Worker) — API mocking for contact form integration tests

---

### 2.12 ESLint 9 + Prettier 3

**Purpose:** Code quality, consistency, and type checking (NFR-006, quality gates in Section 16.3).

**Necessity:** ✅ Required by PRD.

**ESLint plugins:**
```
eslint-plugin-react
eslint-plugin-react-hooks
eslint-plugin-jsx-a11y     — Accessibility rule enforcement during development
@typescript-eslint/eslint-plugin
eslint-plugin-import
```

**`eslint-plugin-jsx-a11y`** is especially important — catches accessibility issues early (FR-016, NFR-003).

---

## 3. What Was NOT Included and Why

| Technology | Reason NOT included |
|---|---|
| Next.js | Not needed — static site, no SSR/SSG requirements justify the overhead |
| Redux / Zustand / Jotai | No shared global state; local useState sufficient |
| GraphQL | No data fetching needed; content is static TypeScript files |
| Prisma / Drizzle | No database for MVP (OD-005) |
| i18next | Bilingual content via static JSON/TypeScript files; full i18n deferred to v1.1 |
| GSAP | Framer Motion covers needs; two animation libraries would be redundant |
| Storybook | Useful but adds overhead; not in PRD testing requirements |
| Docker | Static site on Vercel; no containerization needed |
| Express / Hono | No backend for MVP |

---

## 4. Dependency Risk Assessment

| Package | Risk Level | Mitigation |
|---|---|---|
| Three.js | Medium — large bundle | Dynamic import, selective imports |
| React Three Fiber | Low — actively maintained | Pin version; monitor releases |
| Framer Motion | Low | Only if decision is to include |
| react-helmet-async | Low | Lightweight, stable |
| Formspree | Medium — third-party SaaS | Fallback: show email address if service down |

---

## 5. Version Pinning Policy

- All dependencies pinned to major.minor versions in `package.json`
- `package-lock.json` committed and used for reproducible builds
- `npm audit` run as CI step before every merge to main
- Scheduled quarterly dependency review

---

## 6. Final Stack Decision Summary

```
CONFIRMED (follows PRD directly):
  React 18, TypeScript 5, Vite 5
  Tailwind CSS 3
  Three.js + React Three Fiber 8 + Drei 9
  Vitest + React Testing Library + Playwright
  ESLint 9 + Prettier 3

RECOMMENDED (require owner acknowledgment):
  React Router 6
  react-helmet-async 2
  React Hook Form 7
  Framer Motion 11 (or CSS-only animation)
  @phosphor-icons/react 2

PENDING OWNER DECISION:
  Contact form provider (Formspree vs. Resend + Vercel Fn vs. EmailJS)
  Analytics tool (Vercel Analytics vs. Plausible vs. none)
```
