# Open Questions and Assumptions
## Personal Portfolio Website — Dark Futuristic
**Document Version:** 1.0 | **PRD Version:** 1.1  
**Date:** 2026-11-13

---

## Status Legend
- ✅ **Decided** — Confirmed by PRD or Product Owner
- 🟡 **Needs Decision** — Requires explicit approval before proceeding
- 📋 **Assumption** — Developer assumes; owner should confirm or override
- ⏳ **Deferred** — Can be decided later (after MVP)

---

## 1. Decisions Already Made (PRD Open Questions)

These were resolved in PRD Section 20.3:

| ID | Question | Decision | Source |
|---|---|---|---|
| OD-001 | Single page vs. multi-page project detail | One-page + `/projects/:slug` route | PRD Owner |
| OD-002 | Contact form required in MVP? | Yes — Contact Form included | PRD Owner |
| OD-003 | Language: ID / EN / Bilingual? | Bilingual | PRD Owner |
| OD-004 | Light/Dark theme? | Dark Mode only | PRD Owner |
| OD-005 | Content: JSON files vs. Admin CMS? | JSON files, no Admin CMS | PRD Owner |
| OD-006 | Hosting and analytics? | Vercel + custom domain; analytics optional | PRD Owner |

---

## 2. Hero Section Design Decisions (Need Owner Confirmation)

| ID | Question | PRD Recommendation | Required By | Status |
|---|---|---|---|---|
| HD-001 | **What type of 3D object?** Options: abstract geometric orb, wireframe sphere, icosahedron, torusknot, custom | Abstract geometric orb / simple sculpture | Before Phase 3 | 🟡 |
| HD-002 | **What is the primary accent color?** | Electric blue `#00D4FF` / cyan — final via mockup | Before Phase 2 | 🟡 |
| HD-003 | **What is the secondary CTA?** Options: "Contact Me" or "Download CV" | "Contact Me" (CV available in navbar/about) | Before Phase 3 | 🟡 |
| HD-004 | **Procedural geometry or custom 3D model?** | Procedural (IcosahedronGeometry) for lightweight MVP | Before Phase 3 | 🟡 |
| HD-005 | **Should 3D idle animation run on mobile?** | Default OFF on mobile; static fallback | Before Phase 3 | 🟡 |

> **Impact:** HD-001 and HD-004 determine which Three.js materials and geometries to use. HD-002 affects the design token system. All five must be confirmed **before Phase 3 begins**.

---

## 3. Architecture Questions (Need Owner Decision)

| ID | Question | Options | Recommendation | Required By | Status |
|---|---|---|---|---|---|
| AQ-001 | **Which contact form provider?** | (a) Formspree, (b) EmailJS, (c) Resend + Vercel Fn | **Formspree** (simplest; built-in spam protection; no backend needed) | Before Phase 6 | 🟡 |
| AQ-002 | **Should navbar be sticky or static?** | (a) Sticky (stays at top while scrolling), (b) Static (scrolls away) | **Sticky** (PRD says "sticky or static navbar" — sticky preferred for UX) | Before Phase 2 | 📋 |
| AQ-003 | **What is the site's default language for HTML `lang` attribute?** | `en`, `id`, or conditional | **`en`** (English as primary; content bilingual) | Before Phase 2 | 🟡 |
| AQ-004 | **Should "Bilingual" mean both UI labels AND content, or only content?** | (a) Full i18n (UI + content), (b) Bilingual static content only | **Bilingual static content only** (no runtime language toggle for MVP; avoids i18next complexity) | Before Phase 2 | 🟡 |
| AQ-005 | **Should analytics be enabled from day 1 of production?** | (a) Yes — Vercel Analytics, (b) Yes — Plausible, (c) No analytics initially | Deferred to Phase 9 | Before Phase 9 | 🟡 |
| AQ-006 | **CV download: open in new tab or trigger download?** | (a) `<a href="...">` opens PDF in browser, (b) `<a href="..." download>` forces download | **Open in new tab** (better UX for preview; allow print from browser) | Before Phase 2 | 📋 |

---

## 4. Content Questions (Owner Must Provide)

> All items below are `[PLACEHOLDER]` in the PRD. Production cannot launch without them.

| ID | Content Required | Notes | Status |
|---|---|---|---|
| CQ-001 | **Full name** | Exact spelling used as `<h1>` in Hero | 🟡 |
| CQ-002 | **Professional headline** | e.g., "Full-Stack Developer · Building Useful Digital Experiences" | 🟡 |
| CQ-003 | **Supporting copy** (1–2 sentences) | Focus area, value, or current work | 🟡 |
| CQ-004 | **Biography / About text** (100–200 words) | Professional background, interests | 🟡 |
| CQ-005 | **Profile photo / avatar** | Optimized WebP; professional quality | 🟡 |
| CQ-006 | **Skills list with categories** | Programming, Frameworks, Tools, Soft Skills | 🟡 |
| CQ-007 | **Experience entries** | Per entry: org, role, dates, description (2–4 bullets) | 🟡 |
| CQ-008 | **Education entries** | Institution, program, dates | 🟡 |
| CQ-009 | **Project data (at least 2–3 published)** | Per project: title, summary, description, role, tech stack, thumbnail, demo/repo URLs, published flag | 🟡 |
| CQ-010 | **Certification data** | Name, issuer, date, credential URL | 🟡 |
| CQ-011 | **CV PDF** | Reviewed, no sensitive data, owner-approved filename | 🟡 |
| CQ-012 | **Contact information** | Email (for display/mailto), LinkedIn URL, GitHub URL | 🟡 |
| CQ-013 | **Social links** | Which platforms to show (GitHub, LinkedIn, Twitter/X, etc.) | 🟡 |
| CQ-014 | **Eyebrow text** | e.g., "HELLO, I'M" or "AVAILABLE FOR OPPORTUNITIES" (only if status is accurate) | 🟡 |
| CQ-015 | **Custom domain** | The production domain name | 🟡 |
| CQ-016 | **OG / share image** | 1200×630px PNG for Open Graph social preview | 🟡 |

---

## 5. UX/Design Questions

| ID | Question | Options | Recommendation | Status |
|---|---|---|---|---|
| UQ-001 | **Navbar "active section" behavior** | (a) Highlight nav link matching visible section via IntersectionObserver, (b) No active indicator | **Yes — active indicator** (better UX for single-page navigation) | 📋 |
| UQ-002 | **Scroll behavior for anchor links** | (a) `scroll-behavior: smooth` (CSS), (b) JS-controlled smooth scroll, (c) Instant | **Smooth via CSS** (`scroll-behavior: smooth`); disable with reduced motion | 📋 |
| UQ-003 | **Project card click behavior** | (a) Navigate to `/projects/:slug` page, (b) Open modal/drawer | **Navigate to dedicated page** (OD-001 confirmed: "one-page + project detail route") | ✅ |
| UQ-004 | **Education section: show if empty?** | (a) Hide section if no education data, (b) Show empty state message | **Hide section if empty** (cleaner UX) | 📋 |
| UQ-005 | **Skills display: show level/proficiency?** | (a) No level (PRD: "not relying on progress bars"), (b) Optional text level (Beginner/Intermediate/Expert) | **No level displayed** (PRD FR-004 explicit) | ✅ |
| UQ-006 | **Footer content** | Social links, copyright notice, quick navigation links? | Include: copyright + social links + minimal nav | 📋 |
| UQ-007 | **Privacy page required?** | Required if analytics or contact form data is stored | Yes — brief privacy notice page; linked from footer and contact form | 📋 |
| UQ-008 | **404 page design** | Simple message vs. styled with navigation | Styled 404 with home/projects navigation | 📋 |

---

## 6. Technical Implementation Questions

| ID | Question | Recommendation | Status |
|---|---|---|---|
| TQ-001 | **Should `framer-motion` be included or use CSS-only animation?** | Include Framer Motion for staggered entrance animations and CTA states; it provides clean integration with `useReducedMotion` | 📋 |
| TQ-002 | **Font loading: Google Fonts CDN or self-hosted?** | Google Fonts CDN with `preconnect` for simplicity; self-host for privacy/performance if strict CSP needed | 📋 |
| TQ-003 | **Image formats: WebP only or WebP + AVIF fallback?** | WebP primary (`<img src="x.webp">`); AVIF via `<picture>` for maximum compression (optional) | 📋 |
| TQ-004 | **`sitemap.xml`: auto-generated or manual?** | Use `vite-plugin-sitemap` or write manually — either works for a small site | 📋 |
| TQ-005 | **Should `React.StrictMode` be enabled?** | Yes — detects side effects in development; no production impact | 📋 |
| TQ-006 | **Should project detail use a modal or a full page?** | Full page `/projects/:slug` (OD-001 confirmed) | ✅ |
| TQ-007 | **Performance budget for 3D scene accepted?** | Lighthouse 85–90 acceptable with 3D; ≥90 without; test and document | 🟡 |

---

## 7. Developer Assumptions

The following decisions will be made by the developer following PRD guidance unless the owner explicitly overrides them:

| ID | Assumption | Basis |
|---|---|---|
| DA-001 | Tailwind CSS is the primary styling system (not CSS Modules) | PRD recommends "choose one consistent approach"; Tailwind preferred for utility-first responsive design |
| DA-002 | React Router 6 is used for routing | Standard for React SPA; `createBrowserRouter` with Vercel SPA rewrite |
| DA-003 | TypeScript `strict: true` is enforced | NFR-006 (maintainability); prevents class of runtime errors |
| DA-004 | Navbar is sticky and transitions from transparent to `bg-elevated` on scroll | Better UX than static; standard dark portfolio pattern |
| DA-005 | `HeroScene` is lazy-loaded via `React.lazy()` | Required to avoid 3D bundle blocking LCP (HR-010, R-P-01) |
| DA-006 | `pointer-events: none` applied to Hero canvas | Required to prevent canvas blocking CTA clicks (AC-HR-10) |
| DA-007 | No global state manager (Redux/Zustand) | Unnecessary complexity for portfolio scope |
| DA-008 | Contact form uses Formspree as default | Pending owner decision; Formspree as working default |
| DA-009 | Dark mode only implemented; no light mode toggle | OD-004 confirmed Dark Mode; no light mode for MVP |
| DA-010 | Bilingual = static dual-language content in TypeScript data files | OD-003 Bilingual; no i18n library overhead |
| DA-011 | ESLint `eslint-plugin-jsx-a11y` enforced during development | Catches A11y issues early; aligns with FR-016 |
| DA-012 | `scroll-padding-top` set to match sticky navbar height | Prevents anchor jump landing behind navbar |
| DA-013 | `IcosahedronGeometry` with `MeshDistortMaterial` for the orb | HD-001 recommendation; lightweight procedural |
| DA-014 | Education section hidden if data array is empty | Better UX than showing empty section header |
| DA-015 | Privacy notice page (`/privacy`) included | Required by FR-013 (contact form) privacy note |

---

## 8. Pre-Phase Approval Checklist

### Before Phase 2 (Design System) — Required:
- [ ] HD-002: Accent color confirmed (`#00D4FF` or owner's choice)
- [ ] AQ-003: Default HTML lang attribute confirmed
- [ ] AQ-004: Bilingual scope confirmed (content only vs. full i18n)
- [ ] CQ-001: Owner name confirmed (for initial `profile.ts` stub)

### Before Phase 3 (Hero Section) — Required:
- [ ] HD-001: 3D object type confirmed
- [ ] HD-003: Secondary CTA confirmed
- [ ] HD-004: Procedural geometry confirmed
- [ ] HD-005: Mobile animation behavior confirmed
- [ ] AQ-002: Sticky navbar confirmed
- [ ] TQ-007: Performance budget for 3D accepted

### Before Phase 6 (Contact Form) — Required:
- [ ] AQ-001: Contact form provider confirmed
- [ ] Form provider account created and endpoint ready

### Before Phase 9 (Production) — Required:
- [ ] All CQ-001 through CQ-016 content provided by owner
- [ ] All content reviewed and approved by owner
- [ ] AQ-005: Analytics decision confirmed
- [ ] Custom domain configured
- [ ] CV file reviewed and approved by owner

---

## 9. Questions for Owner Discussion

> These should be discussed in the Phase 1 kickoff meeting:

1. **Have you prepared any design references or moodboard** for the dark futuristic aesthetic you want? (Beyond the PRD description)
2. **Do you have a Figma or any existing design mockup**, or should the design be generated from the design specification in this document?
3. **Who is the primary target audience** you most want to impress — recruiters, potential clients, or fellow developers? (Affects content tone and emphasis)
4. **What is the content language priority?** When in English and Indonesian differ, which takes precedence?
5. **Are there any projects you are NOT comfortable making public** that might accidentally be included?
6. **Do you have any brand preferences** — specific fonts you like, shapes, visual motifs from your existing professional identity?
7. **What is your preferred timeline** to have the first preview ready for review?
8. **Should the portfolio include a "Hire Me" or "Available for opportunities" indicator?** (PRD notes: only if accurate)

---

## 10. Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-11-13 | Initial Phase 1 analysis — all open questions identified |
