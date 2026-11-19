# Requirement Traceability Matrix
## Personal Portfolio Website — Dark Futuristic
**Document Version:** 1.0 | **PRD Version:** 1.1  
**Date:** 2026-11-13

---

## Legend
- **Priority:** P0 = MVP Critical | P1 = Important (included in MVP release) | P2 = Nice-to-Have
- **Status:** 🔴 Not Started | 🟡 Pending Decision | 🟢 Ready to Implement
- **Testing Method:** UT = Unit Test | IT = Integration Test | E2E = End-to-End | MT = Manual Test | A11y = Accessibility Audit | PF = Performance Audit

---

## A. Functional Requirements

| Req ID | Requirement Description | Priority | Dependencies | Implementation Approach | Acceptance Criteria | Testing Method | Phase | Status |
|---|---|---|---|---|---|---|---|---|
| FR-001 | Global navigation with active section indicator | P0 | Design system, routing | Sticky `<header>` with `<nav>`, `IntersectionObserver` for active tracking, hamburger menu for mobile | Mouse & keyboard accessible; correct anchor; mobile open/close; no content overlap | E2E, MT, A11y | Phase 2 | 🟢 |
| FR-002 | Hero Section: name, headline, summary, photo, CTA | P0 | HR-001–HR-010, design tokens | HeroSection component with separate HeroContent + HeroScene; progressive enhancement | Name + headline visible; CTA Projects → projects; CTA Contact → contact; readable at all breakpoints | E2E, MT | Phase 3 | 🟢 |
| FR-003 | About Profile: biography, focus, background | P0 | Content JSON (profile.ts) | AboutSection component reading from data/profile.ts | No placeholder text in production; paragraphs readable and not truncated | E2E, MT | Phase 4 | 🟢 |
| FR-004 | Skills: grouped by category | P0 | Content JSON (skills.ts) | SkillsSection + SkillBadge components; no skill-level progress bars | Categories and skill names display consistently | E2E, MT | Phase 4 | 🟢 |
| FR-005 | Experience: chronological entries | P0 | Content JSON (experience.ts) | ExperienceSection + TimelineItem components; date formatting utility | Each entry shows org, role, period, description; "Present" label for current | E2E, MT | Phase 4 | 🟢 |
| FR-006 | Education: formal/training entries | P1 | Content JSON (education.ts) | EducationSection component; graceful empty state | Institution, program, period shown if data available; no broken elements when empty | E2E, MT | Phase 4 | 🟢 |
| FR-007 | Projects listing: title, summary, thumbnail, role, tech | P0 | Content JSON (projects.ts), routing | ProjectsSection + ProjectCard components; data-driven from JSON | Only published projects; images have alt text; cards keyboard accessible | E2E, MT, A11y | Phase 5 | 🔴 |
| FR-008 | Project detail: problem, solution, contribution, stack, links | P0 | Routing, FR-007 | /projects/:slug route + ProjectDetailPage component | Correct content per slug; optional links shown only if URL present; external links secure | E2E, MT | Phase 5 | 🔴 |
| FR-009 | Project filter by category/technology | P1 | FR-007 | Client-side filter state in ProjectsSection; no page reload | Filter works without reload; "All" option available; empty state shown; keyboard usable | UT, E2E, A11y | Phase 5 | 🔴 |
| FR-010 | Certifications: name, issuer, date, credential link | P1 | Content JSON (certifications.ts) | CertificationsSection + CertificationCard components | Each item shows name, issuer, date (if available), credential link (if available) | E2E, MT | Phase 6 | 🔴 |
| FR-011 | Download CV button | P0 | CV PDF file in /public/cv/ | Anchor tag with `download` attribute pointing to PDF in /public | File opens/downloads; correct filename; PDF format; no broken link | E2E, MT | Phase 4 | 🟢 |
| FR-012 | Contact information display | P0 | Content JSON (profile.ts) | ContactSection component; mailto links; external links | Email uses mailto; external links correct; no private info leaked | E2E, MT | Phase 6 | 🔴 |
| FR-013 | Contact Form: name, email, subject, message, validation | P1→P0* | Contact service provider, SEC-003–005 | ContactForm component + third-party service (Formspree/Resend); client + server validation | Required fields validated; email format checked; success only after confirmed; no double submit | IT, E2E, MT | Phase 6 | 🟡 |
| FR-014 | Responsive layout: mobile/tablet/desktop | P0 | Design system, Tailwind CSS | Mobile-first responsive design; no horizontal overflow | No overflow at 360/768/1024/1440px; nav and CTA usable; content not stacked incorrectly | E2E, MT | Phase 7 | 🔴 |
| FR-015 | SEO metadata: title, description, OG, canonical, sitemap | P0 | react-helmet-async or vite-plugin | Meta tags per page; react-helmet-async for dynamic meta; static sitemap.xml | Unique metadata per page; correct OG preview; robots.txt does not block production | MT, PF | Phase 8 | 🔴 |
| FR-016 | Accessibility: keyboard nav, semantics, alt text, reduced motion | P0 | All components, WCAG 2.2 AA | Semantic HTML landmarks; skip link; visible focus; aria labels; alt text policy | Focus visible; logical tab order; headings hierarchical; controls have accessible names; contrast passes | A11y, MT | Phase 7 | 🔴 |
| FR-017 | Theme toggle: light/dark | P2 | Design tokens, localStorage | Dark mode is default (OD-004); optional toggle with localStorage persistence | Consistent during session; contrast maintained | MT | Out of Scope MVP | 🔴 |
| FR-018 | Analytics | P2 | Privacy policy, owner consent | Vercel Analytics or Plausible (privacy-first) | Only active if configured; no sensitive data collected | MT | Phase 9 | 🟡 |
| FR-019 | Admin Content Management | P2 | Backend, database | Out of scope for MVP (OD-005); JSON file management | N/A for MVP | N/A | v2.0 | ⬜ |

> *FR-013 elevated to P0 per OD-002 owner decision despite P1 label in PRD.

---

## B. Hero Section Requirements (Addendum v1.1)

| Req ID | Requirement Description | Priority | Dependencies | Implementation Approach | Acceptance Criteria | Testing Method | Phase | Status |
|---|---|---|---|---|---|---|---|---|
| HR-001 | 3D Hero Visual (abstract focal object) | P0 | Three.js, React Three Fiber, WebGL | HeroScene.tsx with procedural geometry; abstract orb/icosahedron | Visible on supported browsers; does not cover text/CTA; fallback if WebGL fails | MT, E2E | Phase 3 | 🟢 |
| HR-002 | Dark Futuristic Theme | P0 | Design tokens (tokens.css), Tailwind | Dark background (charcoal/navy); electric blue/cyan accent; CSS variables | Text contrast meets WCAG AA; colors from design tokens | A11y, MT | Phase 2 | 🟢 |
| HR-003 | Pointer Interaction (mouse parallax/tilt) | P1 | HR-001, usePointerParallax hook | Custom hook with rAF throttling, lerp smoothing; CSS transform on canvas | Only on fine-pointer devices; returns to neutral on leave; no layout shift | MT, E2E | Phase 3 | 🟢 |
| HR-004 | 3D Idle Animation (rotation loop) | P1 | HR-001, useReducedMotion | useFrame loop in HeroScene; stops with reduced motion | No flicker/jitter; not distracting; disableable | MT | Phase 3 | 🟢 |
| HR-005 | Entrance Animation (content fade/translate) | P1 | Motion (Framer Motion) or CSS, useReducedMotion | Staggered fade-in for eyebrow, name, headline, copy, CTAs | Text/CTA available without waiting for animation; content not lost if animation fails | MT, A11y | Phase 3 | 🟢 |
| HR-006 | Hero CTA (Primary: View Projects, Secondary: Contact Me) | P0 | FR-002, routing | Button components with proper href/onClick; primary → /#projects; secondary → /#contact | Both CTAs navigate to correct targets; keyboard accessible | E2E, A11y | Phase 3 | 🟢 |
| HR-007 | Responsive Hero layout | P0 | FR-014, design system | Desktop: two-column (content left, 3D right); mobile: stacked (content first) | No horizontal overflow; text not covered by visual; CTA touchable | E2E, MT | Phase 3 | 🟢 |
| HR-008 | Reduced Motion Support | P0 | useReducedMotion hook, FR-016 | `prefers-reduced-motion` media query in JS and CSS; skip animation + show static fallback | Parallax and idle loop disabled; content still complete | A11y, MT | Phase 3 | 🟢 |
| HR-009 | WebGL Fallback | P0 | HeroSceneFallback.tsx, React Error Boundary | Try/catch WebGL context creation; ErrorBoundary for Canvas; show static CSS illustration | No blank screen or fatal error; all content and CTAs functional | MT | Phase 3 | 🟢 |
| HR-010 | Performance Guard | P0 | Vite code splitting, dynamic import | Lazy-load HeroScene; limit DPR to max 2; pause rAF when tab hidden; Lighthouse budget | 3D does not block text render; no CLS from canvas; Lighthouse ≥90 | PF, MT | Phase 3/8 | 🟢 |

---

## C. Business Rules

| Rule ID | Business Rule | Enforcement Point | Verification Method |
|---|---|---|---|
| BR-001 | Only `published: true` content is rendered | Data filtering in components | UT on data filter functions |
| BR-002 | Project slugs must be unique and non-empty | TypeScript type + validation script | UT on slug validator |
| BR-003 | Repo/demo links: render conditionally | Conditional rendering in ProjectCard | UT on ProjectCard, E2E |
| BR-004 | Date format consistency; empty end_date → "Present" | Date formatting utility | UT on date formatter |
| BR-005 | CV is owner-approved PDF; no sensitive data | Manual review before deploy | MT, deployment checklist |
| BR-006 | Contact info explicitly approved by owner | Content governance / JSON review | Deployment checklist |
| BR-007 | No success state until server confirms | Contact form state machine | IT, E2E |
| BR-008 | Failed submissions preserve user input | Form state management | IT, E2E |
| BR-009 | All visitor input is untrusted | Server-side validation at form provider | IT |
| BR-010 | External links: rel="noopener noreferrer" | ExternalLink component | UT, MT |
| BR-011 | Images optimized with usage rights | Asset pipeline + manual review | MT |
| BR-012 | No credentials in frontend or repo | .gitignore, env vars, secret scan | Security audit |
| BR-013 | Analytics only per owner consent | Conditional script loading | MT |
| BR-014 | No visitor accounts or profile storage in MVP | Architecture constraint | Architecture review |
| BR-015 | Content changes via controlled deployment | Git workflow + PR review | Process |

---

## D. Security Requirements

| Req ID | Requirement | Implementation | Verification |
|---|---|---|---|
| SEC-001 | No private API keys in bundle/repo | Environment variables; .env.example only | Secret scanner (git-secrets) |
| SEC-002 | HTTPS in production; HTTP → HTTPS redirect | Vercel automatic HTTPS | Deployment checklist |
| SEC-003 | Server-side input validation | Form provider server-side rules | IT |
| SEC-004 | Output encoding; no dangerouslySetInnerHTML | React escaping by default; sanitize if HTML needed | Code review |
| SEC-005 | Contact endpoint rate limiting + spam protection | Honeypot field; Formspree/Resend built-in rate limit | IT |
| SEC-006 | CMS auth (future) | Out of scope for MVP | N/A |
| SEC-007 | Admin authorization server-side (future) | Out of scope for MVP | N/A |
| SEC-008 | Security headers: CSP, HSTS, X-Content-Type-Options | vercel.json headers configuration | MT, securityheaders.com |
| SEC-009 | Dependency audit before release | `npm audit`; `npm outdated` | CI/CD step |
| SEC-010 | Data minimization in contact form | Collect only name/email/subject/message | Architecture review |
| SEC-011 | File upload validation (future CMS) | Out of scope for MVP | N/A |
| SEC-012 | No stack traces in public error messages | Generic error boundaries; no console.error in production | Code review |
| SEC-013 | Backup/recovery (future database) | Out of scope for MVP | N/A |
| SEC-014 | Analytics consent | Conditional loading; privacy notice | MT |

---

## E. Non-Functional Requirements

| Req ID | Category | Requirement | Target | Measurement |
|---|---|---|---|---|
| NFR-001 | Performance | Optimize images, fonts, bundle, caching | LCP ≤ 2.5s, Lighthouse ≥ 90 | Lighthouse, PageSpeed Insights |
| NFR-002 | Responsiveness | Function at mobile/tablet/desktop viewports | No horizontal overflow at 360/768/1024/1440px | E2E, manual testing |
| NFR-003 | Accessibility | WCAG 2.2 AA | Lighthouse A11y ≥ 90 | axe, Lighthouse, manual |
| NFR-004 | Compatibility | Latest stable Chrome, Edge, Firefox, Safari + mobile | All P0 flows pass | Manual, Playwright |
| NFR-005 | SEO | Metadata, heading, canonical, sitemap, robots | Lighthouse SEO ≥ 90 | Lighthouse, manual |
| NFR-006 | Maintainability | Modular structure, consistent naming, linting, type checking | Zero lint/type errors | CI: ESLint + tsc |
| NFR-007 | Reliability | Core content loads even if optional services fail | 100% core content available without analytics | MT with services disabled |
| NFR-008 | Scalability | New projects add without layout changes | Adding 10 more projects renders correctly | MT |
| NFR-009 | Privacy | Minimize personal data, use as stated | No undeclared data collection | Privacy review |
| NFR-010 | Observability | Monitor form errors/service status without sensitive data | Error logging configured | Deployment review |

---

## F. Acceptance Test Cases Cross-Reference

| Test ID | Requirement(s) | Priority |
|---|---|---|
| TC-001 | FR-002, HR-001 | P0 |
| TC-002 | FR-001 | P0 |
| TC-003 | FR-001, FR-014 | P0 |
| TC-004 | FR-003 | P0 |
| TC-005 | FR-004 | P0 |
| TC-006 | FR-005 | P0 |
| TC-007 | FR-007, BR-001 | P0 |
| TC-008 | FR-008, BR-010 | P0 |
| TC-009 | FR-011, BR-005 | P0 |
| TC-010 | FR-013 | P1→P0 |
| TC-011 | FR-013 | P1→P0 |
| TC-012 | FR-013, BR-007 | P1→P0 |
| TC-013 | FR-013, SEC-005 | P1→P0 |
| TC-014 | FR-014, NFR-002 | P0 |
| TC-015 | FR-016, NFR-003 | P0 |
| TC-016 | FR-015, NFR-005 | P0 |
| TC-017 | Routing (404 fallback) | P1 |
| TC-018 | NFR-001 | P0 |
| TC-019 | SEC-001, SEC-012 | P0 |
| TC-020 | NFR-007 | P1 |
| TC-HR-001 through TC-HR-012 | HR-001–HR-010 | P0/P1 |
