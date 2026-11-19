# Development Roadmap
## Personal Portfolio Website — Dark Futuristic
**Document Version:** 1.0 | **PRD Version:** 1.1  
**Date:** 2026-11-13

---

## Phase Overview

```
Phase 1: Project Setup & Configuration          [1–2 days]
Phase 2: Design System & UI Foundation          [1–2 days]
Phase 3: Hero Section & 3D Interactive          [2–3 days]
Phase 4: About, Skills, Experience, Education   [1–2 days]
Phase 5: Projects & Project Detail              [1–2 days]
Phase 6: Certifications & Contact               [1 day]
Phase 7: Responsive Optimization & A11y         [1 day]
Phase 8: Testing, Security & Performance        [2 days]
Phase 9: Production Build & Deployment          [0.5–1 day]
─────────────────────────────────────────────────────────
Total Estimate:                                 [11–16 days]
```

---

## Phase 1: Project Setup and Configuration

### 1.1 Objectives
- Initialize a production-ready React + TypeScript + Vite project
- Configure all tooling (ESLint, Prettier, TypeScript, Tailwind)
- Establish the complete folder structure
- Set up testing infrastructure
- Configure Vercel deployment pipeline

### 1.2 Tasks

**Repository & Project Init:**
- [ ] Create Git repository on GitHub (`portfolio` repo)
- [ ] Initialize with `npm create vite@latest . -- --template react-ts`
- [ ] Install core dependencies: `react-router-dom`, `tailwindcss`, `react-helmet-async`, `react-hook-form`, `@phosphor-icons/react`
- [ ] Install 3D dependencies: `three`, `@react-three/fiber`, `@react-three/drei`
- [ ] Install animation: `framer-motion` (or confirm CSS-only decision)
- [ ] Install testing: `vitest`, `@testing-library/react`, `@testing-library/user-event`, `playwright`, `@axe-core/playwright`, `msw`
- [ ] Install dev dependencies: `eslint`, `prettier`, `@typescript-eslint/*`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react-hooks`

**Configuration Files:**
- [ ] `tsconfig.json` — strict mode, path aliases (`@/*`)
- [ ] `vite.config.ts` — path aliases, build optimization, chunk splitting
- [ ] `tailwind.config.ts` — extend colors/spacing with design token references
- [ ] `eslint.config.js` — flat config with react, hooks, a11y, typescript rules
- [ ] `.prettierrc` — consistent formatting rules
- [ ] `vitest.config.ts` — jsdom environment, coverage thresholds
- [ ] `playwright.config.ts` — base URL, browsers (Chrome, Firefox, Safari), viewports
- [ ] `vercel.json` — SPA rewrite rules, security headers
- [ ] `.env.example` — document all environment variables (no actual values)
- [ ] `.gitignore` — node_modules, .env, dist, coverage, .playwright

**Folder Structure:**
- [ ] Create all directories as defined in `05_Project_Folder_Structure.md`
- [ ] Create placeholder/stub files in each directory
- [ ] Set up barrel exports (`index.ts`) for each component directory

**Git Workflow Setup:**
- [ ] Configure branch protection on `main` (require PR + review)
- [ ] Configure Vercel GitHub integration (auto-preview on PR)
- [ ] Add GitHub Actions workflow for: lint → typecheck → test → build

### 1.3 Expected Deliverables
- Fully configured project repository
- Working development server (`npm run dev`)
- Passing `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`
- Vercel preview deployment URL active
- README.md with setup instructions

### 1.4 Dependencies
- Node.js 20+ installed on dev machine
- GitHub account + repository
- Vercel account connected to GitHub

### 1.5 Acceptance Criteria
- [ ] `npm run dev` starts dev server without errors
- [ ] `npm run build` produces production build without errors
- [ ] `npm run lint` returns 0 errors
- [ ] `npm run typecheck` returns 0 TypeScript errors
- [ ] `npm run test` runs (even with 0 test files, setup verified)
- [ ] Vercel preview deployment accessible
- [ ] All folder structure directories exist

### 1.6 Testing Requirements
- Verify tooling setup: run all `npm run` scripts
- Verify Vercel preview deployment URL resolves

---

## Phase 2: Design System & UI Foundation

### 2.1 Objectives
- Implement the complete design token system
- Build all reusable UI primitive components
- Implement navigation (Navbar, mobile menu)
- Implement Footer
- Implement basic routing structure
- Set up content data types and initial data files

### 2.2 Tasks

**Design Tokens:**
- [ ] `src/styles/tokens.css` — all CSS custom properties (colors, typography, spacing, effects)
- [ ] `src/styles/global.css` — base reset, root styles, focus ring, skip link
- [ ] `tailwind.config.ts` — map CSS tokens to Tailwind utilities
- [ ] Google Fonts integration: Space Grotesk + Inter with preconnect

**TypeScript Types:**
- [ ] `src/types/content.ts` — all data model interfaces (Profile, Skill, Experience, Education, Project, Certification, SiteSettings)
- [ ] Validate types against PRD data models (Section 11.1)

**Content Data Stubs:**
- [ ] `src/data/profile.ts` — stub profile with [PLACEHOLDER] values
- [ ] `src/data/skills.ts` — stub skills array
- [ ] `src/data/experience.ts` — stub experience array
- [ ] `src/data/education.ts` — stub education array
- [ ] `src/data/projects.ts` — 2–3 stub projects (published + unpublished to test BR-001)
- [ ] `src/data/certifications.ts` — stub certifications
- [ ] `src/data/settings.ts` — site settings

**Utility Functions:**
- [ ] `src/utils/cn.ts` — className merge utility
- [ ] `src/utils/date.ts` — date formatter ("Jan 2024 – Present")
- [ ] `src/utils/content.ts` — `filterPublished()`, `sortByOrder()` functions
- [ ] `src/utils/links.ts` — external link safety helper
- [ ] `src/utils/slug.ts` — slug validator

**UI Primitive Components:**
- [ ] `Button.tsx` — primary, secondary, ghost variants with all states
- [ ] `Badge.tsx` — skill/tech tag component
- [ ] `Card.tsx` — generic card container
- [ ] `ExternalLink.tsx` — enforces `rel="noopener noreferrer"` (BR-010)
- [ ] `SectionHeader.tsx` — eyebrow + title + subtitle
- [ ] `SkipLink.tsx` — accessibility skip link
- [ ] `Toast.tsx` — success/error/info notification
- [ ] `Spinner.tsx` — loading indicator

**Custom Hooks:**
- [ ] `useReducedMotion.ts`
- [ ] `useWebGLSupport.ts`
- [ ] `useMobileMenu.ts`
- [ ] `useActiveSection.ts` (IntersectionObserver)
- [ ] `useTabVisibility.ts`

**Navigation:**
- [ ] `Navbar.tsx` — sticky nav, transparent → solid on scroll
- [ ] `NavLinks.tsx` — desktop navigation links
- [ ] `MobileMenu.tsx` — hamburger + slide-out/full-screen menu
- [ ] `NavLogo.tsx` — name or logo mark

**Layout:**
- [ ] `Footer.tsx` — social links, copyright, quick links
- [ ] `PageLayout.tsx` — common wrapper with Navbar + main + Footer

**Routing:**
- [ ] `App.tsx` — RouterProvider setup with all routes
- [ ] `HomePage.tsx` — shell with section placeholders
- [ ] `ProjectDetailPage.tsx` — shell with route params
- [ ] `NotFoundPage.tsx` — 404 page
- [ ] `PrivacyPage.tsx` — privacy notice shell

**SEO:**
- [ ] `SEOHead.tsx` — react-helmet-async wrapper
- [ ] Default meta tags for homepage and project detail

### 2.3 Expected Deliverables
- Complete design system with all tokens
- All UI primitive components with stories/examples
- Working navigation (desktop + mobile)
- Basic routing working (`/`, `/projects/test-slug`, `/*`)
- All utility functions with unit tests

### 2.4 Dependencies
- Phase 1 complete (project setup)
- Design token values confirmed (accent color HD-002)

### 2.5 Acceptance Criteria
- [ ] Design tokens visible in browser DevTools
- [ ] All UI components render without errors
- [ ] Navbar scrolled state triggers on scroll
- [ ] Mobile menu opens/closes correctly
- [ ] Skip link appears on Tab press
- [ ] External links include `rel="noopener noreferrer"`
- [ ] All utility functions pass unit tests
- [ ] No TypeScript errors

### 2.6 Testing Requirements
- Unit tests: `Button.test.tsx`, `ExternalLink.test.tsx`
- Unit tests: `date.test.ts`, `content.test.ts`, `slug.test.ts`
- Manual: visual check of all design tokens in browser
- Manual: keyboard navigation through Navbar

---

## Phase 3: Hero Section & 3D Interactive Animation

### 3.1 Objectives
- Implement the complete Hero Section (content + 3D scene)
- Implement all Hero Requirements (HR-001 through HR-010)
- Implement all Motion Specifications (MOT-001 through MOT-008)
- Implement WebGL fallback and reduced motion handling
- Verify Hero against all 12 TC-HR-* test cases

### 3.2 Tasks

**Hero Content:**
- [ ] `HeroSection.tsx` — layout container, progressive enhancement logic
- [ ] `HeroContent.tsx` — eyebrow, h1 name, headline, supporting copy
- [ ] `HeroActions.tsx` — View Projects CTA + Contact Me CTA + social links
- [ ] `HeroSceneFallback.tsx` — static CSS/SVG abstract orb for no-WebGL

**3D Scene:**
- [ ] `HeroScene.tsx` — R3F Canvas with correct configuration (DPR cap, alpha, aria-hidden, pointer-events: none)
- [ ] `AbstractOrb.tsx` — IcosahedronGeometry + MeshDistortMaterial + lighting
- [ ] `usePointerParallax.ts` — mouse tracking hook (fine-pointer media query check)
- [ ] Idle rotation loop in `useFrame`
- [ ] Pointer lerp logic (0.05 factor, ±0.6 clamp)
- [ ] `HeroSceneErrorBoundary.tsx` — React Error Boundary for canvas failure
- [ ] `usePauseOnHidden` hook — Page Visibility API render pause

**Integration:**
- [ ] Connect `useReducedMotion` → show fallback when true (HR-008)
- [ ] Connect `useWebGLSupport` → show fallback when false (HR-009)
- [ ] Connect `sceneFailed` state → show fallback on error (HR-009)
- [ ] `React.lazy(() => import('./HeroScene'))` + Suspense (HR-010 performance)
- [ ] Verify canvas `pointer-events: none` (AC-HR-10)
- [ ] Verify `aria-hidden="true"` on canvas (FR-016)

**Entrance Animation (HR-005, MOT-001):**
- [ ] Staggered fade-in: eyebrow (0ms) → name (100ms) → headline (200ms) → copy (300ms) → CTAs (400ms)
- [ ] Skip animation with `useReducedMotion` (MOT-006)

**Responsive Layout (HR-007):**
- [ ] Desktop: two-column layout (content 50% left, canvas 50% right)
- [ ] Tablet: adjusted proportions
- [ ] Mobile: stacked (content above, canvas below or as full-width bg)
- [ ] Verify no horizontal overflow at 360/768/1024/1440px (AC-HR-07)

### 3.3 Expected Deliverables
- Fully functional Hero Section with 3D orb
- Smooth pointer parallax on desktop
- Working WebGL fallback
- Reduced motion compliance
- Mobile-responsive layout

### 3.4 Dependencies
- Phase 2 complete (design system, Button, layout)
- HD-001 (orb type) and HD-002 (accent color) confirmed by owner
- HD-003 (secondary CTA) confirmed

### 3.5 Acceptance Criteria
- [ ] TC-HR-001: Hero content visible before 3D scene loads
- [ ] TC-HR-002: 3D scene renders on WebGL-capable desktop
- [ ] TC-HR-003: Pointer movement creates smooth, limited tilt
- [ ] TC-HR-004: Pointer leave returns orb to neutral (smooth, no snap)
- [ ] TC-HR-005: Touch device shows no mouse tracking; CTA works
- [ ] TC-HR-006: Reduced motion → static/fallback; loop stops
- [ ] TC-HR-007: WebGL disabled → fallback; no crash
- [ ] TC-HR-008: No overflow at 360/768/1024/1440px
- [ ] TC-HR-009: CTAs keyboard reachable with visible focus
- [ ] TC-HR-010: Lighthouse performance evaluated; text not delayed by 3D
- [ ] TC-HR-011: Tab switch → render pauses; return → resumes
- [ ] TC-HR-012: "View Projects" → /#projects; "Contact Me" → /#contact

### 3.6 Testing Requirements
- Manual: all 12 TC-HR-* test cases
- Manual: test with Chrome DevTools WebGL blocking
- Manual: test with OS reduced motion setting enabled
- Lighthouse audit: check LCP is text, not canvas; check for CLS

---

## Phase 4: About, Skills, Experience & Education Sections

### 4.1 Objectives
- Implement all four informational sections with real stub content
- Build Timeline component (reused for Experience and Education)
- Implement scroll-triggered entrance animations

### 4.2 Tasks

**About Section (FR-003):**
- [ ] `AboutSection.tsx` — biography text, focus areas, optional avatar
- [ ] Connect to `profile.ts` data
- [ ] No placeholder text visible (validate against BR-006)

**Skills Section (FR-004):**
- [ ] `SkillsSection.tsx` — grouped skill badges
- [ ] `Badge.tsx` / `SkillBadge.tsx` — pill-shaped tech badge
- [ ] Group by category: Programming Languages, Frameworks, Tools, Soft Skills
- [ ] No progress bars (PRD: not to claim skill level without objective measure)

**Experience Section (FR-005):**
- [ ] `TimelineItem.tsx` — org, role, period, description, "Present" label
- [ ] `Timeline.tsx` — vertical timeline layout with connecting line
- [ ] `ExperienceSection.tsx` — compose timeline from `experience.ts`
- [ ] Date formatting via `date.ts` utility
- [ ] "Present" label for `current: true` entries (BR-004)

**Education Section (FR-006):**
- [ ] `EducationSection.tsx` — reuses `Timeline` + `TimelineItem`
- [ ] Graceful empty state (FR-006 AC: no broken elements if empty)

**Scroll Animations:**
- [ ] `IntersectionObserver` hook for section visibility
- [ ] Fade-in + slide-up on enter viewport (one-time trigger)
- [ ] Skip animations with `useReducedMotion` (FR-016)

### 4.3 Expected Deliverables
- Four complete sections rendering from data files
- Reusable Timeline component
- Scroll-triggered animations working and respecting reduced motion

### 4.4 Dependencies
- Phase 2 complete (SectionHeader, Card, Badge, design tokens)
- Content data stubs in `src/data/`

### 4.5 Acceptance Criteria
- [ ] TC-004: About section shows complete profile content
- [ ] TC-005: Skills display in correct categories
- [ ] TC-006: Experience shows org, role, period, description correctly
- [ ] Education shows graceful empty state
- [ ] No horizontal overflow on mobile for any section
- [ ] "Present" label appears correctly for current experience

### 4.6 Testing Requirements
- Unit: `TimelineItem.test.tsx` — date formatting, "Present" label, conditional rendering
- Unit: `content.test.ts` — `filterPublished()`, `sortByOrder()`
- Manual: visual inspection at all breakpoints
- Manual: keyboard navigation through timeline items

---

## Phase 5: Projects & Project Detail

### 5.1 Objectives
- Implement Projects listing section with filter
- Implement Project Detail page (`/projects/:slug`)
- Implement routing between listing and detail
- Validate published/unpublished filtering (BR-001)

### 5.2 Tasks

**Projects Listing (FR-007, FR-009):**
- [ ] `ProjectCard.tsx` — thumbnail, title, summary, role, tech badges, links
- [ ] `ProjectFilter.tsx` — category tabs ("All", "Web", "Mobile", etc.)
- [ ] `ProjectsSection.tsx` — filter state management, grid layout
- [ ] Filter logic: client-side, no reload (FR-009)
- [ ] Filter empty state: "No projects match this filter" message
- [ ] `published: false` projects excluded (BR-001)
- [ ] All project images have alt text (FR-007)
- [ ] Keyboard navigation for filter and cards (FR-009, FR-016)

**Project Detail Page (FR-008):**
- [ ] `ProjectDetailPage.tsx` — full page at `/projects/:slug`
- [ ] Fetch project by slug from `projects.ts`
- [ ] Display: title, description, role, problem, solution, technologies, gallery (optional), repo link (conditional), demo link (conditional)
- [ ] Links only shown if URL exists (BR-003)
- [ ] External links use `ExternalLink` component (BR-010)
- [ ] Back navigation to `/#projects`
- [ ] SEO: unique title + description per project (FR-015)
- [ ] 404-equivalent: redirect/show NotFound if slug not found

**Routing:**
- [ ] `ProjectCard` links to `/projects/[slug]`
- [ ] `ProjectDetailPage` reads `useParams().slug`
- [ ] Redirect `/projects/unknown-slug` → NotFoundPage

### 5.3 Expected Deliverables
- Projects grid with working category filter
- Project detail page with full content
- Correct routing and scroll restoration

### 5.4 Dependencies
- Phase 2 complete (ExternalLink, Card, Badge, layout)
- Phase 4 complete (routing structure)
- Project data stubs (at least 3 projects: 2 published, 1 unpublished)

### 5.5 Acceptance Criteria
- [ ] TC-007: Only published projects appear in listing
- [ ] TC-008: Repo/demo links work; external links secure
- [ ] FR-009: Filter works without reload; "All" option available; empty state shown; keyboard usable
- [ ] Project detail shows correct data for each slug
- [ ] Unknown slug shows 404/NotFound page
- [ ] All project images have descriptive alt text

### 5.6 Testing Requirements
- Unit: `ProjectCard.test.tsx` — conditional rendering of links, alt text
- Unit: `ProjectFilter.test.tsx` — filter logic, empty state
- Integration: `project-filter.test.tsx` — filter state changes in ProjectsSection
- E2E: `project-detail.spec.ts` — navigate card → detail → back

---

## Phase 6: Certifications & Contact

### 6.1 Objectives
- Implement Certifications section
- Implement Contact section (info + form)
- Integrate contact form with backend service
- Implement all form states and validation

### 6.2 Tasks

**Certifications (FR-010):**
- [ ] `CertificationCard.tsx` — name, issuer, date (if available), credential link (if available)
- [ ] `CertificationsSection.tsx` — grid of certification cards

**Contact Info (FR-012):**
- [ ] `ContactInfo.tsx` — email (mailto), LinkedIn, GitHub, location (optional)
- [ ] Only approved contact info displayed (BR-006)

**Contact Form (FR-013):**
- [ ] `ContactForm.tsx` with React Hook Form integration
- [ ] Fields: Name (required), Email (required), Subject (optional), Message (required)
- [ ] Client-side validation rules (per PRD 7.1):
  - Name: 2–80 chars, trim, required
  - Email: valid format, required
  - Message: 10–3000 chars, trim, required
- [ ] Honeypot field (hidden, spam protection) (SEC-005)
- [ ] Loading state: spinner + disabled fields + "Sending..." button text
- [ ] Success state: replace form with success message (BR-007)
- [ ] Error state: preserve all input; show generic error message (BR-008)
- [ ] Error per field: linked via `aria-describedby` (FR-016)
- [ ] Double-submit prevention: `isSubmitting` flag (BR-007)
- [ ] Privacy notice text below form (PRD 7.1 Privacy)

**Form Backend Integration:**
- [ ] Configure chosen form provider (Formspree / Resend + Vercel Fn)
- [ ] Verify server-side validation and rate limiting
- [ ] Test with valid, invalid, and duplicate/rapid submissions

### 6.3 Expected Deliverables
- Certifications section with responsive grid
- Contact section with working form
- All form states: idle, submitting, success, error, validation errors

### 6.4 Dependencies
- Phase 2 complete (Button, Spinner, Toast, ExternalLink)
- Contact form provider decision confirmed

### 6.5 Acceptance Criteria
- [ ] TC-010: Empty form submission → validation errors, no network request
- [ ] TC-011: Invalid email → field marked invalid, not submitted
- [ ] TC-012: Valid submission → success state only after confirmed by server
- [ ] TC-013: Rapid submissions → rate limited (backend)
- [ ] Honeypot field not visible to real users
- [ ] Form input preserved on failure
- [ ] Certifications show credential links only when available

### 6.6 Testing Requirements
- Unit: `ContactForm.test.tsx` — validation logic, state transitions
- Integration: `contact-form-flow.test.tsx` — full submission flow with MSW mock
- Manual: test all form states
- Manual: verify honeypot works

---

## Phase 7: Responsive Optimization & Accessibility

### 7.1 Objectives
- Audit and fix all responsive layout issues across all sections
- Conduct comprehensive accessibility audit
- Fix all A11y issues to target WCAG 2.2 AA
- Implement all remaining accessibility requirements (FR-016)

### 7.2 Tasks

**Responsive Audit:**
- [ ] Test every section at: 360px, 480px, 768px, 1024px, 1280px, 1440px
- [ ] Fix any horizontal overflow issues
- [ ] Fix any touch target size issues (minimum 44×44px for interactive elements)
- [ ] Verify navigation collapsing correctly at all breakpoints
- [ ] Verify Hero layout: two-column desktop, stacked mobile
- [ ] Verify project grid columns responsive behavior
- [ ] Verify contact form usability on mobile

**Accessibility Audit:**
- [ ] Run axe-core on all pages (automated scan)
- [ ] Manual keyboard navigation test of entire site (Tab, Shift+Tab, Enter, Space, Arrow)
- [ ] Verify skip link visibility and functionality
- [ ] Verify all images have appropriate alt text (decorative: empty alt; content: descriptive)
- [ ] Verify heading hierarchy (one h1, logical h2/h3 structure)
- [ ] Verify all form fields have labels (not just placeholders)
- [ ] Verify error messages are associated with fields (`aria-describedby`)
- [ ] Verify ARIA landmarks: header, nav, main, section, footer
- [ ] Verify focus indicator visible and not hidden by sticky navbar
- [ ] `scroll-padding-top` matching navbar height
- [ ] Verify mobile menu accessible via keyboard and screen reader
- [ ] Verify contact form in success/error state announces to screen readers (`role="alert"` or `aria-live`)

**Color Contrast:**
- [ ] Run WebAIM contrast checker on all text/background combinations
- [ ] Fix any failing combinations
- [ ] Check accent color on dark background (CTA buttons)

**Reduced Motion:**
- [ ] Enable OS reduced motion → verify all animations stop
- [ ] Verify scroll animations do not play
- [ ] Verify Hero 3D idle/parallax does not play
- [ ] Verify Hero fallback appears correctly

### 7.3 Expected Deliverables
- Zero horizontal overflow at all specified breakpoints
- Zero critical/high axe-core A11y issues
- All text contrast passes WCAG 2.2 AA
- Full keyboard navigability confirmed

### 7.4 Dependencies
- Phases 2–6 complete (all sections implemented)

### 7.5 Acceptance Criteria
- [ ] TC-003: Mobile menu opens/closes correctly
- [ ] TC-014: No overflow at 360/768/1024/1440px
- [ ] TC-015: All controls reachable by keyboard; focus visible
- [ ] Lighthouse Accessibility score ≥ 90

### 7.6 Testing Requirements
- E2E: `responsive.spec.ts` — viewport tests at all breakpoints
- E2E: `accessibility.spec.ts` — axe-core scan on all routes
- Manual: keyboard-only navigation session (no mouse)
- Manual: screen reader test (NVDA + Chrome or VoiceOver + Safari)

---

## Phase 8: Testing, Security & Performance Optimization

### 8.1 Objectives
- Complete all test coverage targets
- Run full security audit and checklist
- Achieve Lighthouse Performance ≥ 90 (or document any delta with 3D)
- Achieve Core Web Vitals targets

### 8.2 Tasks

**Unit & Integration Tests:**
- [ ] Verify all utility functions have passing tests
- [ ] Verify all critical components have behavior tests
- [ ] Contact form integration test with MSW
- [ ] Project filter integration test
- [ ] Achieve meaningful coverage on critical paths

**E2E Tests:**
- [ ] `homepage.spec.ts` — TC-001 through TC-004
- [ ] `navigation.spec.ts` — TC-002, TC-003
- [ ] `project-detail.spec.ts` — TC-007, TC-008
- [ ] `contact-form.spec.ts` — TC-010, TC-011, TC-012
- [ ] `responsive.spec.ts` — TC-014 at all viewports
- [ ] `accessibility.spec.ts` — axe scans + keyboard tests
- [ ] `performance.spec.ts` — TC-018 Lighthouse evaluation

**Security Audit (Per Section 13.1 Checklist):**
- [ ] Run `npm audit` → resolve all critical/high
- [ ] Verify no secrets in source code (manual + git-secrets scan)
- [ ] Verify `.env` not committed
- [ ] Verify all external links have `rel="noopener noreferrer"` (TC-019)
- [ ] Verify security headers in `vercel.json`
- [ ] Test CSP — no CSP violations in browser console
- [ ] Verify contact form rate limiting (TC-013)
- [ ] Verify no stack traces in public error responses (SEC-012)
- [ ] Test website with analytics disabled — core content works (TC-020)

**Performance Optimization:**
- [ ] Run Lighthouse on production build (`npm run preview` or Vercel preview)
- [ ] Check LCP: ensure text is LCP element, not 3D canvas
- [ ] Analyze bundle with `vite-bundle-analyzer` → identify large chunks
- [ ] Verify Three.js only in lazy chunk (not main bundle)
- [ ] Optimize images: convert to WebP/AVIF, add width/height attributes
- [ ] Add `loading="lazy"` to below-fold images
- [ ] Verify font `font-display: swap`
- [ ] Verify `scroll-behavior: auto` with reduced motion
- [ ] Check CLS: no layout shifts from images, fonts, or canvas mounting

### 8.3 Expected Deliverables
- All P0 E2E test cases passing
- Security checklist completed and documented
- Lighthouse Performance ≥ 90 (or documented exception for 3D)
- Lighthouse Accessibility ≥ 90
- Lighthouse SEO ≥ 90
- LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1

### 8.4 Dependencies
- Phase 7 complete (responsive + A11y fixes)
- Production-like build environment available

### 8.5 Acceptance Criteria
- [ ] All P0 test cases pass (TC-001 to TC-009, TC-014–TC-019, TC-HR-001–TC-HR-012)
- [ ] `npm audit` shows no critical/high unfixed vulnerabilities
- [ ] No secrets detected in codebase
- [ ] Lighthouse scores meet targets or delta is documented
- [ ] Zero broken internal links

### 8.6 Testing Requirements
- Run full Playwright E2E suite on production build
- Run Lighthouse CI on production build
- Manual security checklist review

---

## Phase 9: Production Build & Deployment

### 9.1 Objectives
- Replace all placeholder content with final approved content
- Configure custom domain and production environment
- Deploy to production on Vercel
- Complete smoke test on production

### 9.2 Tasks

**Content Finalization:**
- [ ] Owner provides all final content (name, bio, skills, experience, projects, certifications, CV)
- [ ] Update all `src/data/*.ts` files with real content
- [ ] Upload CV PDF to `/public/cv/`
- [ ] Upload all project images (optimized WebP) to `/public/images/projects/`
- [ ] Upload avatar photo to `src/assets/images/avatar.webp`
- [ ] Upload OG image to `/public/images/og/og-default.png`
- [ ] Review all content — no placeholder text in production (BR-005, BR-006)

**Environment & Domain:**
- [ ] Configure production environment variables in Vercel dashboard
- [ ] Connect custom domain in Vercel
- [ ] Verify HTTPS certificate active
- [ ] Update `VITE_SITE_URL` to production URL
- [ ] Update canonical URLs in SEOHead

**Production Deployment:**
- [ ] Final lint + typecheck + test + build (all must pass)
- [ ] Merge `main` branch after all checks pass
- [ ] Vercel auto-deploys to production
- [ ] Verify DNS propagation

**Smoke Test (Production):**
- [ ] TC-001: Homepage loads correctly
- [ ] TC-002: All nav links work
- [ ] TC-003: Mobile menu works
- [ ] TC-009: CV download works (correct file, no broken link)
- [ ] TC-016: SEO metadata correct (title, description, OG)
- [ ] TC-017: 404 page appears for unknown route
- [ ] TC-018: Run Lighthouse on production URL
- [ ] TC-019: Verify no exposed secrets in source
- [ ] Contact form submit (live test with real provider)
- [ ] All project detail pages accessible
- [ ] All external links open correctly

**Post-Launch:**
- [ ] Document production URL in README
- [ ] Record release version + deployment date
- [ ] Enable Vercel Analytics (if owner approved)
- [ ] Set up uptime monitoring (Vercel built-in or UptimeRobot)
- [ ] Document rollback procedure

### 9.3 Expected Deliverables
- Production website live at custom domain
- All smoke tests passing
- Release notes documented
- Rollback plan documented

### 9.4 Dependencies
- Phase 8 complete (all tests passing)
- Owner has provided all final content
- Custom domain configured
- Production environment variables set

### 9.5 Acceptance Criteria
- [ ] All PRD 20.1 Product Acceptance criteria met
- [ ] No placeholder content visible on production
- [ ] Custom domain resolves with HTTPS
- [ ] Smoke test passes all critical flows
- [ ] Release documented

### 9.6 Testing Requirements
- Full smoke test on production URL
- Final Lighthouse audit on production
- Manual link check (all internal and external links)
