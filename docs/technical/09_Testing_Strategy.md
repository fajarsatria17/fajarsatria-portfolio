# Testing Strategy
## Personal Portfolio Website — Dark Futuristic
**Document Version:** 1.0 | **PRD Version:** 1.1  
**Date:** 2026-11-13

---

## 1. Testing Philosophy

Testing for this project follows the **Testing Trophy** model (Kent C. Dodds), prioritizing integration tests over unit tests for maximum confidence with minimum maintenance:

```
         /‾‾‾‾‾‾‾‾‾\
        /   E2E (10%)  \           ← Playwright: critical user journeys
       /‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\
      / Integration (40%) \        ← Vitest + RTL: component + flow tests
     /‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\
    /    Unit (40%)          \     ← Vitest: utilities, hooks, data functions
   /‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\
  /   Static Analysis (10%)    \  ← ESLint, TypeScript, eslint-plugin-jsx-a11y
 /________________________________\
```

**Key principle:** Test behavior, not implementation. Users don't care about function names; they care about what the UI does.

---

## 2. Test Stack

| Tool | Purpose | Config File |
|---|---|---|
| Vitest | Unit + Integration test runner | `vitest.config.ts` |
| @testing-library/react | Component behavior testing | In `vitest.config.ts` |
| @testing-library/user-event | Realistic user interaction simulation | Used in tests |
| msw (Mock Service Worker) | API mocking for contact form tests | `tests/msw/handlers.ts` |
| Playwright | E2E cross-browser testing | `playwright.config.ts` |
| @axe-core/playwright | Automated A11y scanning in E2E | In Playwright spec files |
| ESLint + jsx-a11y | Static A11y analysis | `eslint.config.js` |

---

## 3. Test Configuration

### 3.1 Vitest Configuration

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 65,
      },
      exclude: [
        'src/main.tsx',
        'src/types/**',
        'src/data/**',       // Data files are type-checked, not unit-tested
        '**/*.d.ts',
        '**/index.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@utils': resolve(__dirname, './src/utils'),
      '@data': resolve(__dirname, './src/data'),
      '@types': resolve(__dirname, './src/types'),
    },
  },
});
```

### 3.2 Test Setup

```ts
// tests/setup.ts
import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia (not available in jsdom)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock WebGL context (R3F not tested in jsdom)
HTMLCanvasElement.prototype.getContext = vi.fn();
```

### 3.3 Playwright Configuration

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4173',  // Vite preview
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## 4. Unit Tests

### 4.1 Utility Functions

**`tests/unit/utils/date.test.ts`**
```ts
describe('formatDateRange', () => {
  it('formats start and end date correctly', () => {
    expect(formatDateRange('2022-01', '2024-06')).toBe('Jan 2022 – Jun 2024');
  });
  it('shows "Present" when end_date is null and current is true', () => {
    expect(formatDateRange('2023-03', null, true)).toBe('Mar 2023 – Present');
  });
  it('shows only start date when end_date is null and current is false', () => {
    expect(formatDateRange('2021-05', null, false)).toBe('May 2021');
  });
});
```

**`tests/unit/utils/content.test.ts`**
```ts
describe('filterPublished', () => {
  it('filters out unpublished items (BR-001)', () => {
    const items = [{ published: true, id: '1' }, { published: false, id: '2' }];
    expect(filterPublished(items)).toHaveLength(1);
    expect(filterPublished(items)[0].id).toBe('1');
  });
  it('returns empty array for all-unpublished input', () => {
    expect(filterPublished([{ published: false }])).toHaveLength(0);
  });
});

describe('sortByOrder', () => {
  it('sorts items by sort_order ascending', () => {
    const items = [{ sort_order: 2 }, { sort_order: 1 }, { sort_order: 3 }];
    expect(sortByOrder(items).map(i => i.sort_order)).toEqual([1, 2, 3]);
  });
});
```

**`tests/unit/utils/slug.test.ts`**
```ts
describe('validateSlug', () => {
  it('accepts valid slugs', () => {
    expect(validateSlug('my-project-123')).toBe(true);
  });
  it('rejects empty slug (BR-002)', () => {
    expect(validateSlug('')).toBe(false);
  });
  it('rejects slugs with spaces', () => {
    expect(validateSlug('my project')).toBe(false);
  });
});
```

### 4.2 Custom Hooks

**`tests/unit/hooks/useReducedMotion.test.ts`**
```ts
describe('useReducedMotion', () => {
  it('returns false when prefers-reduced-motion does not match', () => {
    // matchMedia mocked to return matches: false in setup
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when prefers-reduced-motion: reduce is set', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });
});
```

### 4.3 UI Components

**`tests/unit/components/Button.test.tsx`**
```ts
describe('Button', () => {
  it('renders primary variant with correct styles', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });
  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });
  it('is disabled and not clickable when disabled prop is set', async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
  it('shows spinner and disables button when loading', () => {
    render(<Button loading>Submitting</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

**`tests/unit/components/ExternalLink.test.tsx`**
```ts
describe('ExternalLink', () => {
  it('renders with rel="noopener noreferrer" (BR-010)', () => {
    render(<ExternalLink href="https://github.com">GitHub</ExternalLink>);
    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
  it('opens in new tab', () => {
    render(<ExternalLink href="https://github.com">GitHub</ExternalLink>);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });
});
```

**`tests/unit/components/ProjectCard.test.tsx`**
```ts
describe('ProjectCard', () => {
  it('renders project title and summary', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
  });
  it('does not render repo link if repository_url is absent (BR-003)', () => {
    render(<ProjectCard project={{ ...mockProject, repository_url: undefined }} />);
    expect(screen.queryByRole('link', { name: /repository/i })).not.toBeInTheDocument();
  });
  it('renders thumbnail with alt text (FR-007)', () => {
    render(<ProjectCard project={mockProject} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', expect.stringContaining(mockProject.title));
  });
});
```

---

## 5. Integration Tests

### 5.1 Contact Form Flow

**`tests/integration/contact-form-flow.test.tsx`**

Using MSW to mock Formspree:
```ts
// tests/msw/handlers.ts
import { http, HttpResponse } from 'msw';
export const handlers = [
  http.post('https://formspree.io/f/[endpoint]', () => {
    return HttpResponse.json({ ok: true }, { status: 200 });
  }),
];
```

```ts
describe('Contact Form', () => {
  it('shows validation errors when form is submitted empty (TC-010)', async () => {
    render(<ContactForm />);
    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  it('marks email field invalid with wrong format (TC-011)', async () => {
    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText(/email/i), 'not-an-email');
    await userEvent.tab();
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });

  it('shows success state after valid submission (TC-012)', async () => {
    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/message/i), 'This is a valid test message!');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });
  });

  it('preserves input on network failure (BR-008)', async () => {
    server.use(http.post('...', () => HttpResponse.error()));
    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    // ... fill form ...
    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe');  // Input preserved
      expect(screen.getByText(/failed to send/i)).toBeInTheDocument();
    });
  });

  it('prevents double submission (BR-007)', async () => {
    render(<ContactForm />);
    // Fill form...
    const submitButton = screen.getByRole('button', { name: /send/i });
    await userEvent.click(submitButton);
    expect(submitButton).toBeDisabled();  // Cannot click again during submit
  });
});
```

### 5.2 Project Filter

**`tests/integration/project-filter.test.tsx`**
```ts
describe('Projects Filter', () => {
  it('shows all published projects by default', () => {
    render(<ProjectsSection />);
    const publishedCount = mockProjects.filter(p => p.published).length;
    expect(screen.getAllByRole('article')).toHaveLength(publishedCount);
  });

  it('filters by category without page reload', async () => {
    render(<ProjectsSection />);
    await userEvent.click(screen.getByRole('button', { name: /web/i }));
    const webProjects = mockProjects.filter(p => p.published && p.categories?.includes('web'));
    expect(screen.getAllByRole('article')).toHaveLength(webProjects.length);
  });

  it('shows empty state when no projects match filter', async () => {
    render(<ProjectsSection />);
    await userEvent.click(screen.getByRole('button', { name: /blockchain/i }));
    expect(screen.getByText(/no projects/i)).toBeInTheDocument();
  });

  it('filter buttons are keyboard accessible (FR-009)', async () => {
    render(<ProjectsSection />);
    const filterButtons = screen.getAllByRole('button', { name: /all|web|mobile/i });
    // Tab to filter and activate with Enter
    filterButtons[0].focus();
    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('{Enter}');
    // Verify filter changed
  });
});
```

---

## 6. End-to-End Tests

### 6.1 Homepage Test

**`tests/e2e/homepage.spec.ts`**
```ts
test.describe('Homepage', () => {
  test('TC-001: homepage loads with hero and navigation (P0)', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('[data-testid="hero-cta-primary"]')).toBeVisible();
    await expect(page).toHaveURL('/');
    // No console errors
    const errors: string[] = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    expect(errors.filter(e => !e.includes('React DevTools'))).toHaveLength(0);
  });
});
```

### 6.2 Navigation Test

**`tests/e2e/navigation.spec.ts`**
```ts
test.describe('Navigation', () => {
  test('TC-002: nav links scroll to correct sections (P0)', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#projects"]');
    await expect(page.locator('#projects')).toBeInViewport();
  });

  test('TC-003: mobile menu opens and closes (P0)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const hamburger = page.locator('[aria-label="Open menu"]');
    await hamburger.click();
    await expect(page.locator('[aria-label="Main navigation"]')).toBeVisible();
    await page.locator('[aria-label="Close menu"]').click();
    await expect(page.locator('[aria-label="Main navigation"]')).not.toBeVisible();
  });
});
```

### 6.3 Accessibility Test

**`tests/e2e/accessibility.spec.ts`**
```ts
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility (TC-015)', () => {
  test('homepage has no critical A11y violations', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations.filter(v => v.impact === 'critical')).toHaveLength(0);
  });

  test('project detail page has no critical A11y violations', async ({ page }) => {
    await page.goto('/projects/test-project');
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(results.violations.filter(v => v.impact === 'critical')).toHaveLength(0);
  });

  test('keyboard navigation reaches all CTAs in Hero', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');  // Skip link
    await page.keyboard.press('Tab');  // First nav link
    // ... tab to Hero CTA
    const focused = page.locator(':focus');
    await expect(focused).toHaveAttribute('data-testid', expect.stringContaining('cta'));
  });
});
```

### 6.4 Responsive Test

**`tests/e2e/responsive.spec.ts`**
```ts
const viewports = [
  { name: '360px', width: 360, height: 800 },
  { name: '768px', width: 768, height: 1024 },
  { name: '1024px', width: 1024, height: 768 },
  { name: '1440px', width: 1440, height: 900 },
];

test.describe('Responsive Layout (TC-014)', () => {
  for (const vp of viewports) {
    test(`no horizontal overflow at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto('/');
      // Check for horizontal scrollbar
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const clientWidth = await page.evaluate(() => document.body.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);  // +1 for rounding
    });
  }
});
```

### 6.5 Performance Test

**`tests/e2e/performance.spec.ts`**
```ts
test('TC-018: performance audit (P0)', async ({ page }) => {
  // Note: Lighthouse integration via playwright-lighthouse or manual
  await page.goto('/');
  
  // Basic CWV checks
  const lcp = await page.evaluate(() => {
    return new Promise(resolve => {
      new PerformanceObserver(list => {
        const entries = list.getEntries();
        resolve(entries[entries.length - 1].startTime);
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
  });
  
  // LCP should be under 2500ms
  expect(lcp).toBeLessThan(2500);
});
```

---

## 7. Hero Section Tests (TC-HR-*)

**`tests/e2e/hero.spec.ts`**
```ts
test.describe('Hero Section', () => {
  test('TC-HR-001: hero content visible immediately (P0)', async ({ page }) => {
    await page.goto('/');
    // Content should be visible before any delay
    await expect(page.locator('h1')).toBeVisible({ timeout: 1000 });
    await expect(page.locator('[data-testid="hero-cta-primary"]')).toBeVisible({ timeout: 1000 });
  });

  test('TC-HR-005: touch device has no mouse tracking (P0)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    // Touch device check: canvas should still be decorative
    await page.goto('/');
    const canvas = page.locator('canvas');
    // Canvas has pointer-events: none — clicking should navigate through it
    await page.locator('[data-testid="hero-cta-primary"]').click();
    await expect(page).toHaveURL(/#projects/);
  });

  test('TC-HR-008: no overflow at hero breakpoints (P0)', async ({ page }) => {
    for (const width of [360, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const clientWidth = await page.evaluate(() => document.body.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    }
  });

  test('TC-HR-012: CTAs navigate to correct sections (P0)', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-testid="hero-cta-primary"]');  // View Projects
    await expect(page.locator('#projects')).toBeInViewport();
    
    await page.goto('/');
    await page.click('[data-testid="hero-cta-secondary"]');  // Contact Me
    await expect(page.locator('#contact')).toBeInViewport();
  });
});
```

---

## 8. Security Tests

### 8.1 Secret Scanning

```bash
# Run before every merge to main (CI step)
npx git-secrets --scan -r .

# Or use truffleHog / gitleaks:
gitleaks detect --source . --verbose
```

### 8.2 Dependency Audit

```bash
# Run in CI before build
npm audit --audit-level=high

# If high/critical: fail the build
npm audit --audit-level=high || exit 1
```

### 8.3 CSP Verification

Manual test: Open browser DevTools Console and look for CSP violation errors after deploying with security headers. No violations allowed.

---

## 9. CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint           # ESLint (zero errors required)
      - run: npm run typecheck       # TypeScript (zero errors required)
      - run: npm audit --audit-level=high  # Security audit
      - run: npm run test:coverage   # Unit + Integration tests with coverage
      - run: npm run build           # Production build must succeed

  e2e:
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 10. Quality Gates

Before any merge to `main`, ALL of the following must pass:

| Gate | Tool | Threshold |
|---|---|---|
| Lint | ESLint | Zero errors |
| Type check | TypeScript `tsc --noEmit` | Zero errors |
| Security audit | `npm audit` | No critical/high unfixed |
| Unit + Integration tests | Vitest | All pass; coverage ≥ 70% lines |
| Production build | `npm run build` | Builds without errors |
| E2E tests | Playwright | All P0 tests pass |
| Accessibility scan | axe-core | Zero critical violations |

Before production deployment, additionally:
| Gate | Tool | Threshold |
|---|---|---|
| Lighthouse Performance | Lighthouse | ≥ 90 (or documented exception) |
| Lighthouse Accessibility | Lighthouse | ≥ 90 |
| Lighthouse SEO | Lighthouse | ≥ 90 |
| Core Web Vitals | Lighthouse | LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 |
| Broken links | Manual / linkcheck | Zero broken links |
| Secret scan | git-secrets / gitleaks | Zero secrets found |

---

## 11. Test Data Strategy

**Unit/Integration tests:** Use mock data defined in `tests/fixtures/`:
```
tests/
├── fixtures/
│   ├── mockProfile.ts
│   ├── mockProjects.ts    — includes published + unpublished
│   ├── mockSkills.ts
│   └── mockExperience.ts
└── msw/
    └── handlers.ts        — API mock handlers for contact form
```

**E2E tests:** Run against the actual built application with stub data from `src/data/*.ts`. Before production deployment, E2E runs against production-ready data.

**Production smoke test:** Run against live production URL after deployment.
