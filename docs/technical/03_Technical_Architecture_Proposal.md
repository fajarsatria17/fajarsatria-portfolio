# Technical Architecture Proposal
## Personal Portfolio Website — Dark Futuristic
**Document Version:** 1.0 | **PRD Version:** 1.1  
**Date:** 2026-11-13

---

## 1. Architecture Overview

The portfolio website follows a **static-first, frontend-only architecture** with progressive enhancement. No backend or database is introduced for MVP, as justified by the PRD (OD-005: JSON files, no Admin CMS).

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (Visitor)                         │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    React Application                      │   │
│  │                                                            │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │   │
│  │  │  Navigation  │  │   Sections  │  │  3D Hero Scene  │  │   │
│  │  │  (Navbar)    │  │  (Content)  │  │  (R3F / Three)  │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │   │
│  │                                                            │   │
│  │  ┌────────────────────┐  ┌──────────────────────────┐    │   │
│  │  │  Static JSON Data   │  │   React Router (Routes)  │    │   │
│  │  │  (src/data/*.ts)    │  │   / + /projects/:slug    │    │   │
│  │  └────────────────────┘  └──────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │ HTTPS
                              ▼
              ┌───────────────────────────────┐
              │   Vercel CDN / Static Hosting  │
              │   (Edge Network)               │
              │   - Custom domain              │
              │   - Automatic HTTPS            │
              │   - Security headers           │
              └───────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
    ┌─────────▼─────────┐          ┌──────────▼──────────┐
    │  Contact Form      │          │  External Links      │
    │  Third-Party       │          │  (GitHub, LinkedIn,  │
    │  Service           │          │   Demo URLs)         │
    │  (Formspree /      │          └─────────────────────┘
    │   Resend /         │
    │   EmailJS)         │
    └───────────────────┘
```

---

## 2. Architecture Decisions

### 2.1 Single-Page Application with Multi-Route

**Decision:** One-page portfolio (hash/anchor sections) **plus** dedicated `/projects/:slug` routes for project detail pages.

**Justification:** OD-001 resolved as "one-page + project detail route." The navigation structure uses anchor links (`/#about`, `/#skills`, etc.) for the main content and React Router for the project detail pages.

**Implementation:** React Router v6 with:
- `"/"` → `HomePage` (all sections)
- `"/projects/:slug"` → `ProjectDetailPage`
- `"*"` → `NotFoundPage`

---

### 2.2 Content Architecture: Static TypeScript Data Files

**Decision:** All content (profile, skills, experience, education, projects, certifications, site settings) is stored as TypeScript data files in `src/data/`.

**Justification:** OD-005 resolved as "JSON files, no Admin CMS." TypeScript data files are preferred over raw JSON because they provide type safety, IDE autocompletion, and can include simple computed values.

**Content Model:** Each entity maps to a TypeScript interface defined in `src/types/` and exported from a corresponding `src/data/*.ts` file.

---

### 2.3 Contact Form: Third-Party Service

**Decision (Recommended):** Use **Formspree** or **EmailJS** for the contact form backend.

**Justification:**
- No backend server required (MVP constraint)
- No secrets in frontend (API key hidden or not required for Formspree)
- Built-in rate limiting, spam protection, delivery confirmation
- Free tier sufficient for personal portfolio

**Alternative:** Vercel Serverless Function + Resend API (if owner wants full control and custom domain email)

> **Decision Required from Owner:** Confirm contact form provider.

---

### 2.4 3D Rendering: React Three Fiber over Plain Three.js

**Decision:** Use React Three Fiber (R3F) + Three.js for the Hero Section 3D scene.

**Justification:**
- Declarative React component model integrates cleanly with existing React app
- R3F handles render loop lifecycle, resize observers, and cleanup
- Drei provides utility helpers (OrbitControls, Environment, etc.) without custom boilerplate
- Dynamic import enables tree-shaking and lazy loading

**Bundle size strategy:**
- Dynamic `import()` of `HeroScene` via React.lazy + Suspense
- Three.js is tree-shakable with modern bundlers
- Estimated bundle overhead: ~150-250KB gzipped (with selective imports)

---

### 2.5 Styling: Tailwind CSS v3 + CSS Custom Properties (Design Tokens)

**Decision:** Tailwind CSS as the primary styling framework with CSS custom properties for design tokens (colors, spacing, typography scales).

**Justification:**
- Mobile-first utility classes align with PRD's mobile-first design principle
- Design tokens in CSS variables allow theming and consistent dark mode
- No CSS-in-JS runtime overhead
- CSS Modules remain available for complex 3D canvas styling if needed

---

### 2.6 State Management: Local React State Only

**Decision:** No global state management library (no Redux, Zustand, Jotai) for MVP.

**Justification:** The portfolio has minimal interactive state:
- Navigation menu open/close (local to Navbar)
- Project filter active category (local to ProjectsSection)
- Contact form state (local to ContactForm)
- 3D scene pointer position (local to HeroScene via useRef)

No shared complex state warrants a state management library.

---

## 3. High-Level Component Architecture

```
App
├── Router
│   ├── Route "/"
│   │   └── HomePage
│   │       ├── Navbar (sticky)
│   │       ├── HeroSection
│   │       │   ├── HeroContent (always rendered)
│   │       │   │   ├── HeroEyebrow
│   │       │   │   ├── HeroName (h1)
│   │       │   │   ├── HeroHeadline
│   │       │   │   ├── HeroSupportingCopy
│   │       │   │   └── HeroActions (CTA buttons)
│   │       │   └── HeroScene (lazy loaded)
│   │       │       └── HeroSceneFallback (if WebGL fails)
│   │       ├── AboutSection
│   │       ├── SkillsSection
│   │       │   └── SkillBadge[]
│   │       ├── ExperienceSection
│   │       │   └── TimelineItem[]
│   │       ├── EducationSection
│   │       │   └── TimelineItem[]
│   │       ├── ProjectsSection
│   │       │   ├── ProjectFilter
│   │       │   └── ProjectCard[]
│   │       ├── CertificationsSection
│   │       │   └── CertificationCard[]
│   │       ├── ContactSection
│   │       │   ├── ContactInfo
│   │       │   └── ContactForm
│   │       └── Footer
│   ├── Route "/projects/:slug"
│   │   └── ProjectDetailPage
│   │       ├── Navbar
│   │       ├── ProjectDetailContent
│   │       └── Footer
│   └── Route "*"
│       └── NotFoundPage
└── SEOHead (react-helmet-async)
```

---

## 4. Data Flow Architecture

```
src/data/profile.ts    ──→  Navbar, HeroSection, AboutSection, ContactSection
src/data/skills.ts     ──→  SkillsSection
src/data/experience.ts ──→  ExperienceSection
src/data/education.ts  ──→  EducationSection
src/data/projects.ts   ──→  ProjectsSection, ProjectDetailPage
src/data/certifications.ts ──→ CertificationsSection
src/data/settings.ts   ──→  SEOHead, Footer, Navbar
```

No runtime data fetching required for content. All data is bundled at build time.

---

## 5. 3D Scene Architecture (Hero)

```
HeroSection (layout wrapper)
├── HeroContent (z-index: above canvas)   ← Always HTML/DOM
│   └── [name, headline, CTAs, social links]
└── HeroSceneWrapper (position: absolute, z-index: 0)
    ├── [prefers-reduced-motion = reduce] → HeroSceneFallback (CSS illustration)
    ├── [WebGL not available]            → HeroSceneFallback
    └── [normal] → Suspense → HeroScene (lazy loaded)
                              └── Canvas (R3F)
                                  ├── AbstractOrb (geometry + material)
                                  ├── AmbientLight
                                  ├── PointLight (accent color glow)
                                  └── useFrame (idle rotation + pointer lerp)
```

---

## 6. Performance Architecture

### 6.1 Bundle Splitting Strategy

| Chunk | Contents | Load Timing |
|---|---|---|
| `main` | React, React Router, App shell | Immediate |
| `hero-3d` | Three.js, React Three Fiber, Drei, HeroScene | Lazy (after LCP) |
| `motion` | Framer Motion (if used) | Lazy or deferred |
| `vendor` | All other node_modules | Vite auto-chunk |

### 6.2 Asset Optimization

| Asset Type | Strategy |
|---|---|
| Images | WebP/AVIF format; responsive `srcset`; `loading="lazy"` for below-fold |
| Fonts | Google Fonts via `font-display: swap`; preconnect; subset |
| CV PDF | Static file in `/public/cv/`; stable filename |
| 3D Geometry | Procedural (no .glb/.gltf files needed) |
| Icons | SVG sprites or @phosphor-icons/react (tree-shaken) |

### 6.3 Core Web Vitals Strategy

| Metric | Target | Strategy |
|---|---|---|
| LCP | ≤ 2.5s | Preload hero font; inline critical CSS; image optimization |
| INP | ≤ 200ms | Lightweight event handlers; no blocking JS on interaction |
| CLS | ≤ 0.1 | Reserve space for images; avoid 3D canvas layout shift |

---

## 7. Security Architecture

### 7.1 Frontend Security Measures

| Measure | Implementation |
|---|---|
| No secrets in bundle | Environment variables only via Vite `import.meta.env.VITE_*` for non-secret public values |
| XSS prevention | React default escaping; avoid dangerouslySetInnerHTML |
| External links | `ExternalLink` component enforcing `rel="noopener noreferrer"` |
| CSP headers | Configured in `vercel.json` |
| Dependency audit | `npm audit` in CI before deploy |

### 7.2 Security Headers (vercel.json)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://formspree.io" }
      ]
    }
  ]
}
```

> Note: CSP must be tuned based on actual third-party services used (form provider, analytics, fonts).

---

## 8. Deployment Architecture

```
Developer Machine
       │
       │ git push feature/xxx
       ▼
GitHub Repository
       │
       │ Vercel GitHub Integration
       ▼
  PR → Preview Deployment (vercel.app URL)
       │ Stakeholder review + QA
       │
  Merge to main
       │
       ▼
Production Deployment (custom domain)
  - HTTPS auto-managed by Vercel
  - Edge CDN globally distributed
  - Automatic rollback available
```

### Environment Variables

| Variable | Environment | Purpose | Secret? |
|---|---|---|---|
| `VITE_SITE_URL` | All | Base URL for canonical/OG | No |
| `VITE_FORM_ENDPOINT` | All | Formspree/EmailJS endpoint (if public) | Depends on provider |
| (None others for MVP) | — | — | — |

> For Resend via Vercel Serverless: `RESEND_API_KEY` is a Vercel environment secret, never in code.

---

## 9. Routing Architecture

```
Path                    Component              Notes
─────────────────────── ────────────────────── ───────────────────────────────
/                       HomePage               All sections as anchors
/#about                 (anchor)               IntersectionObserver tracking
/#skills                (anchor)               IntersectionObserver tracking
/#experience            (anchor)               IntersectionObserver tracking
/#education             (anchor)               IntersectionObserver tracking
/#projects              (anchor)               IntersectionObserver tracking
/#certifications        (anchor)               IntersectionObserver tracking
/#contact               (anchor)               IntersectionObserver tracking
/projects/:slug         ProjectDetailPage      Dynamic route
/privacy                PrivacyPage            If contact form with analytics
*                       NotFoundPage           404 fallback
```

---

## 10. Architecture Principles Compliance

| PRD Principle | Implementation |
|---|---|
| Content-first | All content visible in HTML; 3D is decorative overlay |
| Mobile-first | Tailwind mobile-first classes; 3D disabled/minimal on mobile |
| Progressive enhancement | 3D scene is lazy-loaded enhancement; content works without it |
| Reusable components | Design system with shared Button, Card, Badge, Timeline, etc. |
| Secure by default | No secrets, no dangerouslySetInnerHTML, CSP headers, HTTPS |
| Accessible by default | Semantic HTML, ARIA, keyboard focus, reduced motion |
