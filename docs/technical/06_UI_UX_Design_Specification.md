# UI/UX Design Specification
## Personal Portfolio Website — Dark Futuristic
**Document Version:** 1.0 | **PRD Version:** 1.1  
**Date:** 2026-11-13

---

## 1. Design Direction

**Theme:** Modern Developer – Dark Futuristic  
**Default Mode:** Dark (OD-004)  
**Style:** Premium, clean, minimal clutter, technological — not "dashboard" or "sci-fi overload"

The design must communicate: *credible, modern, technically competent, approachable.*

---

## 2. Design Tokens

### 2.1 Color Palette

```css
/* src/styles/tokens.css */
:root {
  /* ── Background Scale ── */
  --color-bg-base:        #0A0E1A;   /* Deep space navy — main background */
  --color-bg-elevated:    #0F1629;   /* Slightly lighter — cards, sections */
  --color-bg-surface:     #141E35;   /* Surface — input fields, hover states */
  --color-bg-overlay:     #1A2540;   /* Overlay — modals, tooltips */

  /* ── Accent: Electric Blue / Cyan ── */
  --color-accent:         #00D4FF;   /* Primary accent — CTAs, highlights */
  --color-accent-dim:     #00A8CC;   /* Dimmed accent — secondary elements */
  --color-accent-glow:    rgba(0, 212, 255, 0.15);  /* Glow effect */
  --color-accent-subtle:  rgba(0, 212, 255, 0.08);  /* Subtle tint backgrounds */

  /* ── Text Scale ── */
  --color-text-primary:   #F0F4FF;   /* Primary text — headings */
  --color-text-secondary: #A8B4CC;   /* Secondary text — body, descriptions */
  --color-text-tertiary:  #6B7A99;   /* Tertiary — labels, metadata */
  --color-text-disabled:  #3D4A66;   /* Disabled state */

  /* ── Semantic Colors ── */
  --color-success:        #00C896;   /* Success states */
  --color-error:          #FF4D6D;   /* Error states */
  --color-warning:        #FFB347;   /* Warning states */
  --color-info:           #60A5FA;   /* Info states */

  /* ── Border / Divider ── */
  --color-border:         rgba(255, 255, 255, 0.08);
  --color-border-accent:  rgba(0, 212, 255, 0.3);

  /* ── 3D / Visual ── */
  --color-orb-core:       #00D4FF;   /* Orb core color */
  --color-orb-mid:        #0066FF;   /* Orb mid color */
  --color-orb-outer:      #0A0E1A;   /* Orb outer / transparent */
  --color-glow-point:     #00D4FF;   /* Point light color in 3D scene */
}
```

### 2.2 Contrast Verification

| Pairing | Ratio | WCAG AA Requirement | Status |
|---|---|---|---|
| `--color-text-primary` on `--color-bg-base` | ~15:1 | 4.5:1 (normal text) | ✅ Pass |
| `--color-text-secondary` on `--color-bg-base` | ~6:1 | 4.5:1 | ✅ Pass |
| `--color-accent` on `--color-bg-base` | ~8:1 | 4.5:1 | ✅ Pass |
| `--color-text-tertiary` on `--color-bg-elevated` | ~3.5:1 | 3:1 (large text) | ✅ Pass (large only) |
| `--color-text-disabled` on `--color-bg-base` | ~1.8:1 | N/A (disabled) | ✅ Exempt |

> **Note:** Final values must be verified with a contrast checker tool (e.g., WebAIM) during implementation.

---

### 2.3 Typography Scale

```css
/* Typography tokens */
:root {
  /* Font Families */
  --font-display:  'Space Grotesk', 'Inter', system-ui, sans-serif;  /* Headings */
  --font-body:     'Inter', system-ui, -apple-system, sans-serif;    /* Body */
  --font-mono:     'JetBrains Mono', 'Fira Code', monospace;         /* Code snippets */

  /* Type Scale (fluid with clamp) */
  --text-xs:    clamp(0.625rem, 1vw, 0.75rem);    /* 10–12px: labels, metadata */
  --text-sm:    clamp(0.75rem, 1.2vw, 0.875rem);  /* 12–14px: secondary text */
  --text-base:  clamp(0.875rem, 1.5vw, 1rem);     /* 14–16px: body text */
  --text-lg:    clamp(1rem, 1.8vw, 1.125rem);     /* 16–18px: lead text */
  --text-xl:    clamp(1.125rem, 2vw, 1.25rem);    /* 18–20px: section headers */
  --text-2xl:   clamp(1.25rem, 2.5vw, 1.5rem);   /* 20–24px: subsection headers */
  --text-3xl:   clamp(1.5rem, 3vw, 2rem);         /* 24–32px: section titles */
  --text-4xl:   clamp(2rem, 4vw, 2.5rem);         /* 32–40px: hero headline */
  --text-5xl:   clamp(2.5rem, 5vw, 3.5rem);       /* 40–56px: hero name */
  --text-6xl:   clamp(3rem, 7vw, 5rem);           /* 48–80px: large hero (optional) */

  /* Line Heights */
  --leading-tight:   1.1;
  --leading-snug:    1.25;
  --leading-normal:  1.5;
  --leading-relaxed: 1.65;
  --leading-loose:   1.8;

  /* Font Weights */
  --weight-regular:    400;
  --weight-medium:     500;
  --weight-semibold:   600;
  --weight-bold:       700;
  --weight-extrabold:  800;

  /* Letter Spacing */
  --tracking-tight:   -0.02em;
  --tracking-normal:   0em;
  --tracking-wide:     0.05em;
  --tracking-widest:   0.15em;   /* Eyebrow labels */
}
```

**Google Fonts to import:**
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) — 400, 500, 600, 700
- [Inter](https://fonts.google.com/specimen/Inter) — 400, 500, 600

**Font Loading Strategy:** `preconnect` to Google Fonts; `font-display: swap`; subset to Latin.

---

### 2.4 Spacing Scale

```css
:root {
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */

  /* Section vertical padding */
  --section-py-mobile:  4rem;    /* 64px top/bottom on mobile */
  --section-py-tablet:  5rem;    /* 80px on tablet */
  --section-py-desktop: 7rem;    /* 112px on desktop */

  /* Content max-widths */
  --container-sm:  640px;
  --container-md:  768px;
  --container-lg:  1024px;
  --container-xl:  1280px;
  --container-2xl: 1440px;
}
```

---

### 2.5 Effects & Shadows

```css
:root {
  /* Glow effects for accent elements */
  --glow-sm:  0 0 8px var(--color-accent-glow);
  --glow-md:  0 0 20px var(--color-accent-glow), 0 0 40px rgba(0, 212, 255, 0.08);
  --glow-lg:  0 0 40px var(--color-accent-glow), 0 0 80px rgba(0, 212, 255, 0.05);

  /* Card shadows */
  --shadow-card:  0 4px 24px rgba(0, 0, 0, 0.4);
  --shadow-hover: 0 8px 40px rgba(0, 0, 0, 0.6), 0 0 20px var(--color-accent-glow);

  /* Border radius */
  --radius-sm:   0.375rem;   /* 6px */
  --radius-md:   0.5rem;     /* 8px */
  --radius-lg:   0.75rem;    /* 12px */
  --radius-xl:   1rem;       /* 16px */
  --radius-2xl:  1.5rem;     /* 24px */
  --radius-full: 9999px;     /* Pill shape */

  /* Transitions */
  --transition-fast:   150ms ease;
  --transition-base:   250ms ease;
  --transition-slow:   400ms ease;
  --transition-spring: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 3. Responsive Breakpoints

```ts
// tailwind.config.ts — extend default breakpoints
screens: {
  'xs':  '375px',    // Small mobile
  'sm':  '640px',    // Large mobile / small tablet
  'md':  '768px',    // Tablet (PRD min tablet)
  'lg':  '1024px',   // Desktop (PRD min desktop)
  'xl':  '1280px',   // Large desktop
  '2xl': '1440px',   // Wide desktop
}
```

**PRD breakpoint mapping:**
| PRD Category | Range | Tailwind Breakpoints |
|---|---|---|
| Mobile | ≤ 767px | (default, `xs`, `sm`) |
| Tablet | 768–1023px | `md` |
| Desktop | ≥ 1024px | `lg`, `xl`, `2xl` |

---

## 4. Component Specifications

### 4.1 Navbar

**Behavior:** Sticky at top; transparent on hero section, solid background (`--color-bg-elevated`) when scrolled.

**Desktop:** Horizontal links; logo left, links right; CTA "Hire Me" or CV download link.  
**Mobile:** Logo left; hamburger button right; full-screen or slide-in drawer menu.

**States:**
- Default: `bg-transparent`, text primary
- Scrolled: `bg-bg-elevated/95 backdrop-blur-md border-b border-border`
- Mobile open: overlay menu visible
- Focus: `outline: 2px solid var(--color-accent); outline-offset: 4px`

**Accessibility:**
- `role="navigation"` on `<nav>`
- `aria-label="Main navigation"` 
- Mobile menu button: `aria-expanded`, `aria-controls`
- Skip link: `<a href="#main-content">Skip to main content</a>` (first focusable element)

---

### 4.2 Button Component

**Variants:**

```
Primary:   bg-accent text-bg-base font-semibold rounded-lg px-6 py-3
           hover: bg-accent-dim shadow-glow-sm
           focus-visible: ring-2 ring-accent ring-offset-2 ring-offset-bg-base

Secondary: bg-transparent text-accent border border-accent/40 rounded-lg px-6 py-3
           hover: bg-accent-subtle border-accent/60
           focus-visible: ring-2 ring-accent ring-offset-2

Ghost:     bg-transparent text-text-secondary rounded-lg px-4 py-2
           hover: text-text-primary bg-bg-surface

Icon:      Square button with icon only; aria-label required
```

**States:** Default | Hover | Focus (focus-visible) | Active | Disabled | Loading

---

### 4.3 Project Card

**Layout:** Thumbnail image (16:9 aspect) → tech badges → title → summary → role → links

**Hover effect:** Subtle lift (`translateY(-4px)`), border color transitions to accent, glow shadow.

**Keyboard:** Fully focusable as a link or button; focus indicator on card border.

**Image states:** Loading skeleton → loaded image → fallback placeholder (if error).

---

### 4.4 Skill Badge

**Style:** Pill shape (`border-radius: var(--radius-full)`); small font; grouped by category.

**Category header:** Section sub-label above each group; separator line or subtle divider.

**Variants:** Default (outlined, subtle bg) | Category-colored (optional for visual differentiation)

---

### 4.5 Timeline Item

**Layout:** Vertical timeline with connecting line; dot marker at left; date + role + organization top; description below.

**Current item:** Accent dot + "Present" label in accent color.

**Responsive:** Full width at all breakpoints; date inline on desktop, above on mobile.

---

### 4.6 Contact Form

**Fields:**
- Name: `<input type="text">` required
- Email: `<input type="email">` required
- Subject: `<input type="text">` optional
- Message: `<textarea>` required (min 10 chars, max 3000)
- Honeypot: hidden `<input>` for spam prevention

**States:**
- Idle: neutral field borders
- Focus: accent border + subtle glow
- Error: red border + error message below field (linked via aria-describedby)
- Submitting: button shows spinner; fields disabled
- Success: replace form with success message
- Failure: show inline error; preserve all input values

---

### 4.7 Section Structure

Each section follows this pattern:
```html
<section id="[section-id]" aria-labelledby="[section-id]-heading">
  <div class="container">
    <SectionHeader
      eyebrow="[e.g., 'MY WORK']"
      title="[e.g., 'Projects']"
      subtitle="[optional descriptor]"
    />
    <!-- Section content -->
  </div>
</section>
```

**Section IDs:** `about`, `skills`, `experience`, `education`, `projects`, `certifications`, `contact`

---

## 5. Navigation Structure

```
Navbar Links:
  About | Skills | Experience | Projects | Certifications | Contact
  [Download CV] (secondary action)

Homepage Sections (in order):
  1. Hero (#hero)
  2. About (#about)
  3. Skills (#skills)
  4. Experience (#experience)
  5. Education (#education)
  6. Projects (#projects)
  7. Certifications (#certifications)
  8. Contact (#contact)

Footer:
  Quick links | Social links | Copyright
```

---

## 6. Motion & Animation System

**Principle:** Motion serves communication, not decoration. Every animation must have a purpose.

### 6.1 Animation Catalog

| Animation | Purpose | Duration | Easing | Reduced Motion |
|---|---|---|---|---|
| Entrance: fade + slide up | Content reveal on scroll | 500ms | ease-out | Disabled |
| Staggered children | Hero content sequence | 100ms stagger | ease-out | Disabled |
| Hover: lift | Card interaction feedback | 200ms | ease | CSS only (no issue) |
| Hover: glow | CTA/button feedback | 150ms | ease | CSS only |
| 3D idle rotation | Orb continuous rotation | 8s loop | linear | Disabled |
| 3D parallax tilt | Mouse interaction response | Frame-synced | lerp 0.08 | Disabled |
| Navbar background | On scroll transition | 300ms | ease | CSS only |
| Mobile menu | Open/close slide | 300ms | ease-out | Instant |
| Form feedback | State change visibility | 250ms | ease | CSS only |

### 6.2 Scroll-Triggered Animations

Sections animate in when they enter the viewport using `IntersectionObserver`:
- Initial state: `opacity: 0; transform: translateY(20px)`
- Triggered state: `opacity: 1; transform: translateY(0)`
- Threshold: 0.15 (15% of element visible)
- One-time trigger (no re-animation on scroll back up)

**Reduced motion:** `@media (prefers-reduced-motion: reduce)` removes all transform/opacity animations; elements appear immediately at full opacity.

---

## 7. Accessibility Requirements

### 7.1 Semantic HTML Structure

```html
<body>
  <a href="#main-content">Skip to main content</a>  <!-- Skip link -->
  
  <header>
    <nav aria-label="Main navigation">...</nav>
  </header>
  
  <main id="main-content">
    <section id="hero" aria-label="Introduction">...</section>
    <section id="about" aria-labelledby="about-heading">
      <h2 id="about-heading">About</h2>
      ...
    </section>
    <!-- Other sections follow same pattern -->
  </main>
  
  <footer>
    <nav aria-label="Footer navigation">...</nav>
  </footer>
</body>
```

### 7.2 Heading Hierarchy

```
h1: Owner name (Hero section — one per page)
h2: Section titles (About, Skills, Experience, etc.)
h3: Sub-sections (Experience entries, Project titles)
h4: Further subdivision if needed (Tech stack subcategory)
```

### 7.3 Keyboard Navigation Order

1. Skip link
2. Navbar links (left to right, Tab-navigable)
3. Mobile menu toggle (mobile only)
4. Hero CTAs (Primary → Secondary)
5. Social links in Hero
6. Section content (cards, links, timeline items in order)
7. Contact form fields (Name → Email → Subject → Message → Submit)
8. Footer links

### 7.4 Focus Indicator

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
  border-radius: var(--radius-sm);
}

/* Remove outline for mouse users (not keyboard users) */
:focus:not(:focus-visible) {
  outline: none;
}
```

> **Important:** Focus indicator must not be hidden behind sticky navbar. Use `scroll-padding-top` to account for navbar height when jumping to anchors.

```css
html {
  scroll-padding-top: 80px; /* Adjust to actual navbar height */
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto; /* Instant scroll for reduced motion */
  }
}
```

---

## 8. Layout Specifications

### 8.1 Grid System

**Container:** Max-width `1280px`; horizontal padding `1rem` mobile → `1.5rem` tablet → `2rem` desktop.

**Section grid patterns:**
- Skills: Responsive CSS grid `repeat(auto-fill, minmax(120px, 1fr))`
- Projects: `1 col` mobile → `2 col` tablet → `3 col` desktop
- Experience: `1 col` (timeline, full-width)
- Certifications: `1 col` mobile → `2 col` tablet → `3–4 col` desktop

### 8.2 Hero Layout (Desktop)

```
┌────────────────────────────────────────────────────────┐
│                      HERO SECTION                       │
│  ┌─────────────────────────┐  ┌─────────────────────┐  │
│  │      HERO CONTENT        │  │    3D ORB SCENE     │  │
│  │                          │  │                     │  │
│  │  ○ HELLO, I'M            │  │      ╭─────╮        │  │
│  │  [Owner Name]            │  │    ╭─┤  ○  ├─╮      │  │
│  │  [Headline]              │  │    │ ╰─────╯ │      │  │
│  │  [Supporting copy]       │  │    ╰─────────╯      │  │
│  │                          │  │   (animated orb)    │  │
│  │  [View Projects] [Contact]  │                     │  │
│  │                          │  │                     │  │
│  │  ○ GH   ○ LI            │  │                     │  │
│  └─────────────────────────┘  └─────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

**Desktop:** 50/50 or 55/45 split (content/visual); content left-aligned; visual right-aligned.

**Mobile:** Stacked; content first (name, headline, CTAs), 3D visual below (smaller, simplified).

---

## 9. SEO Requirements

| Element | Specification |
|---|---|
| `<title>` | Homepage: `[Name] — [Headline/Role]` \| Project detail: `[Project Title] — [Name]'s Portfolio` |
| `<meta description>` | Homepage: 150–160 chars summarizing the portfolio owner |
| Open Graph `og:title` | Same as `<title>` |
| Open Graph `og:description` | Same as `<meta description>` |
| Open Graph `og:image` | 1200×630px PNG; `public/images/og/og-default.png` |
| `og:url` | Canonical URL with HTTPS |
| `<link rel="canonical">` | Prevents duplicate content issues |
| Favicon | `favicon.svg` (primary) + `favicon.ico` (fallback) + apple-touch-icon |
| `robots.txt` | Allow all, reference sitemap |
| `sitemap.xml` | Include `/` and `/projects/:slug` for all published projects |
| Heading hierarchy | h1 unique per page; h2 for sections |
| Image alt text | Descriptive for content images; `alt=""` for decorative |
| `lang` attribute | `<html lang="en">` (or bilingual consideration) |

---

## 10. Dark Mode Implementation

Since Dark Mode is the **only** design direction (OD-004 — no light/dark toggle for MVP), implementation is:

1. Set dark background as the default via CSS tokens (no `prefers-color-scheme` toggle needed in MVP)
2. Use `class="dark"` on `<html>` if planning future toggle (Tailwind dark mode: `class` strategy)
3. All design tokens are defined for dark mode only in MVP

> If a light mode toggle is added in v1.1, the token system should be extended with `:root[data-theme="light"]` overrides.
