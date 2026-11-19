# Risk Assessment
## Personal Portfolio Website — Dark Futuristic
**Document Version:** 1.0 | **PRD Version:** 1.1  
**Date:** 2026-11-13

---

## Risk Scoring Matrix

**Probability:** 1 (Unlikely) | 2 (Possible) | 3 (Likely) | 4 (Near Certain)  
**Impact:** 1 (Negligible) | 2 (Minor) | 3 (Moderate) | 4 (Critical)  
**Risk Score = Probability × Impact**  
**Priority:** 🔴 High (9–16) | 🟡 Medium (4–8) | 🟢 Low (1–3)

---

## Technical Risks

| ID | Risk | Prob | Impact | Score | Priority | Mitigation Strategy | Contingency |
|---|---|---|---|---|---|---|---|
| R-T-01 | 3D scene degrades Lighthouse Performance score below 90 target | 3 | 3 | 9 | 🔴 | Lazy-load Three.js bundle; ensure LCP is from text (h1); DPR cap at 2; profile on mid-range device | Accept Lighthouse 85+ with 3D; document exception; disable 3D on slow devices |
| R-T-02 | WebGL not available on visitor's device/browser | 2 | 2 | 4 | 🟡 | Static CSS fallback required (HR-009); error boundary catches; feature detection before loading 3D | HeroSceneFallback always present — zero functional impact |
| R-T-03 | Three.js + Drei bundle size bloats main chunk | 3 | 3 | 9 | 🔴 | Dynamic `import()` enforced; Vite chunk splitting verified; `vite-bundle-analyzer` run | Remove Drei and use only Three.js directly; switch to simpler geometry |
| R-T-04 | Mouse parallax causes jitter or CLS | 2 | 2 | 4 | 🟡 | Lerp smoothing (factor 0.05); clamp ±0.6; `pointer-events: none` on canvas; use `transform` not `top/left` | Reduce or disable parallax amplitude |
| R-T-05 | Contact form emails go to spam | 2 | 3 | 6 | 🟡 | Use reputable provider (Formspree/Resend); verify SPF/DKIM records if custom domain email used | Display email address as fallback; notify owner to check spam folder |
| R-T-06 | react-helmet-async SSR incompatibility | 1 | 2 | 2 | 🟢 | App is SPA (not SSR); issue doesn't apply | N/A |
| R-T-07 | React Router hash navigation breaks on some hosting | 2 | 3 | 6 | 🟡 | Vercel SPA rewrite in `vercel.json` (`/* → /index.html`) handles all routes | Test routing early in Vercel preview environment |
| R-T-08 | 3D scene memory leak from improper Three.js cleanup | 2 | 2 | 4 | 🟡 | `dispose()` geometry/material/renderer on unmount; test with memory profiler | Monitor with Chrome Memory panel; add useEffect cleanup in review |
| R-T-09 | Form provider changes API or pricing | 1 | 3 | 3 | 🟢 | Use abstraction layer (`src/lib/formspree.ts`); document provider dependency | Switch provider; update lib module only |
| R-T-10 | CSS custom properties not supported in target browsers | 1 | 2 | 2 | 🟢 | Modern browsers all support CSS variables; polyfill not needed for portfolio audience | N/A |

---

## Content & Scope Risks

| ID | Risk | Prob | Impact | Score | Priority | Mitigation Strategy | Contingency |
|---|---|---|---|---|---|---|---|
| R-C-01 | Owner content not ready when development begins | 3 | 3 | 9 | 🔴 | Develop with realistic stub data; block production deploy until content approved | Timeline slips to content delivery; stub data only in staging, never in production |
| R-C-02 | Private project/employer details accidentally published | 2 | 4 | 8 | 🟡 | Owner review of all project data before deploy; `published: false` flag for drafts | Pre-deploy content review checklist; owner sign-off on each project entry |
| R-C-03 | CV contains sensitive information | 2 | 3 | 6 | 🟡 | Owner reviews CV before uploading to `/public/cv/`; stable filename | Remove sensitive info from CV; owner to supply pre-approved version |
| R-C-04 | External links (GitHub, LinkedIn, demo URLs) become stale | 2 | 2 | 4 | 🟡 | Automated link check in CI; periodic manual review | Maintenance schedule quarterly link audit |
| R-C-05 | Bilingual content strategy creates maintenance overhead | 2 | 2 | 4 | 🟡 | Bilingual static JSON: each field has `en` and `id` versions; reviewed on content update | Simplify to English-first if maintenance overhead is too high |
| R-C-06 | Project images missing or oversized | 3 | 2 | 6 | 🟡 | Image optimization script; WebP conversion; placeholder fallback in ProjectCard | Use CSS-generated placeholder (project title initials) if no image |

---

## Security Risks

| ID | Risk | Prob | Impact | Score | Priority | Mitigation Strategy | Contingency |
|---|---|---|---|---|---|---|---|
| R-S-01 | API keys or tokens accidentally committed to git | 2 | 4 | 8 | 🟡 | `.gitignore` for `.env`; git-secrets pre-commit hook; `.env.example` only | Rotate all exposed keys immediately; squash/rebase to remove from git history |
| R-S-02 | Contact form used for spam | 3 | 2 | 6 | 🟡 | Honeypot field; Formspree built-in spam protection; server-side rate limiting | Add CAPTCHA if spam rate becomes unacceptable |
| R-S-03 | Dependency with known vulnerability shipped | 2 | 3 | 6 | 🟡 | `npm audit` in CI before every merge; Dependabot alerts on GitHub | Patch or replace vulnerable dependency before merge; accept-risk documentation if patch unavailable |
| R-S-04 | Sensitive owner personal data exposed via public source | 1 | 4 | 4 | 🟡 | No private contact info in `profile.ts` without owner explicit approval (BR-006) | Immediate revert and redeploy |
| R-S-05 | XSS via untrusted HTML in content fields | 1 | 4 | 4 | 🟡 | React escaping by default; no `dangerouslySetInnerHTML`; sanitize if HTML needed | Audit any HTML rendering; use DOMPurify if HTML content is required |

---

## Performance Risks

| ID | Risk | Prob | Impact | Score | Priority | Mitigation Strategy | Contingency |
|---|---|---|---|---|---|---|---|
| R-P-01 | LCP delay from hero 3D initialization | 3 | 3 | 9 | 🔴 | Lazy-load HeroScene after first paint; ensure h1 is LCP element; prioritize font preload | Disable 3D scene if Lighthouse LCP fails |
| R-P-02 | CLS from canvas mounting or image loading | 2 | 3 | 6 | 🟡 | Reserve canvas space via aspect-ratio CSS; specify image width/height | Measure CLS in Lighthouse; adjust with CSS containment |
| R-P-03 | Framer Motion adds unnecessary bundle weight | 2 | 2 | 4 | 🟡 | Import only required components; evaluate CSS-only animation alternative | Switch to CSS transitions only; remove Framer Motion |
| R-P-04 | Unoptimized project images slow page on mobile | 3 | 3 | 9 | 🔴 | WebP format; `srcset` for responsive; `loading="lazy"` for below-fold | Image optimization script run before commit; reject oversized images in review |

---

## Project & Process Risks

| ID | Risk | Prob | Impact | Score | Priority | Mitigation Strategy | Contingency |
|---|---|---|---|---|---|---|---|
| R-PR-01 | Scope creep (owner requests features outside MVP) | 3 | 3 | 9 | 🔴 | Refer to PRD scope (Section 5.2 Out of Scope); document change requests formally | Backlog for v1.1/v2.0; deliver MVP first |
| R-PR-02 | Contact form provider onboarding delayed | 2 | 2 | 4 | 🟡 | Decide provider early (Phase 1); have alternative (direct email link) as fallback | Display email link as temporary contact method |
| R-PR-03 | Domain not configured before production deadline | 2 | 2 | 4 | 🟡 | Configure domain in Phase 9; allow 48h DNS propagation buffer | Use Vercel subdomain temporarily |
| R-PR-04 | Design decisions (HD-001 to HD-005) not confirmed before Phase 3 | 3 | 3 | 9 | 🔴 | Request owner decisions before Phase 3 starts; use defaults from PRD recommendations | Proceed with recommended defaults; refine in Phase 7 if owner changes decision |

---

## Risk Register Summary

| Priority | Count | Key Risks |
|---|---|---|
| 🔴 High | 6 | 3D performance (R-T-01, R-T-03, R-P-01, R-P-04), content readiness (R-C-01), scope creep (R-PR-01), design decisions (R-PR-04) |
| 🟡 Medium | 12 | WebGL fallback, parallax jitter, spam filtering, routing, memory leaks, content approval, security headers |
| 🟢 Low | 4 | CSS variable support, SSR incompatibility, provider API changes, Framer Motion weight |

---

## Risk Mitigation Timeline

| Phase | Key Actions |
|---|---|
| Phase 1 | Set up `npm audit` in CI; configure `.gitignore`; install git-secrets; request HD-001–HD-005 decisions from owner |
| Phase 2 | Test Vercel routing (SPA rewrite) early; validate design token contrast ratios |
| Phase 3 | Profile 3D scene early with Lighthouse; verify LCP is text; validate canvas doesn't block CTA clicks |
| Phase 4–6 | Develop with stub data only; content review gate before Phase 9 |
| Phase 8 | Full security checklist; `npm audit`; `gitleaks` scan; Lighthouse performance audit |
| Phase 9 | Owner content review/sign-off; pre-deploy security checklist; rollback plan documented |

---

## Assumptions

| ID | Assumption | Risk if Wrong |
|---|---|---|
| A-001 | Owner will provide all final content (bio, projects, CV, images) before Phase 9 | Deployment delayed; placeholder content in production (BR violation) |
| A-002 | MVP does not require login or database | Architecture must change if owner requests admin CMS earlier |
| A-003 | Vercel is the agreed hosting platform | May need to adjust deployment config and routing setup |
| A-004 | "Bilingual" means static bilingual JSON (not runtime i18n) | Additional i18n library required if runtime language switching needed |
| A-005 | Contact form provider will be chosen before Phase 3 | Phase 6 contact form implementation blocked |
| A-006 | Owner has usage rights for all images and content used | Legal risk if unlicensed content is published |
| A-007 | No backend or database required for MVP | Architecture fundamentally changes if owner needs message storage or admin CMS |

---

## Dependencies

| ID | Dependency | Owner | Required By |
|---|---|---|---|
| D-001 | Custom domain and hosting account available | Portfolio Owner | Phase 9 |
| D-002 | Contact form provider account and configuration | Portfolio Owner / Developer | Phase 6 |
| D-003 | Owner content approval (bio, projects, skills, CV) | Portfolio Owner | Phase 9 |
| D-004 | HD-001 to HD-005 design decisions confirmed | Portfolio Owner | Phase 3 |
| D-005 | Profile photo / avatar image provided | Portfolio Owner | Phase 4 |
| D-006 | Project images provided and optimized | Portfolio Owner | Phase 5 |
| D-007 | CV PDF file (reviewed, no sensitive data) | Portfolio Owner | Phase 9 |
