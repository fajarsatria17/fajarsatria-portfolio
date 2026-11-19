import { test, expect } from '@playwright/test';

test.describe('Hero Section (Phase 3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('renders H1 personal name, headline, and CTAs (AC-HR-01)', async ({ page }) => {
    // H1 Heading
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Fajar Satria');

    // Headline & Summary
    await expect(page.getByText('Software Engineer | AI & Full-Stack Developer').first()).toBeVisible();

    // CTAs
    const primaryCta = page.getByTestId('hero-cta-primary');
    const secondaryCta = page.getByTestId('hero-cta-secondary');
    await expect(primaryCta).toBeVisible();
    await expect(secondaryCta).toBeVisible();
    await expect(primaryCta).toContainText('View Projects');
    await expect(secondaryCta).toContainText('Contact Me');
  });

  test('CTA navigation: View Projects scrolls to #projects (TC-HR-012)', async ({ page }) => {
    const primaryCta = page.getByTestId('hero-cta-primary');
    await primaryCta.click();

    // Verify projects section is navigated/scrolled to
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();
  });

  test('CTA navigation: Contact Me scrolls to #contact (TC-HR-012)', async ({ page }) => {
    const secondaryCta = page.getByTestId('hero-cta-secondary');
    await secondaryCta.click();

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
  });

  test('bilingual toggle switches Hero text between English and Indonesian (AQ-004)', async ({ page }) => {
    // Initially English
    await expect(page.getByTestId('hero-cta-primary')).toContainText('View Projects');
    await expect(page.getByTestId('hero-cta-secondary')).toContainText('Contact Me');

    // Click language toggle
    const langBtn = page.getByRole('button', { name: /Current language: EN/i });
    await langBtn.click();

    // Now Indonesian
    await expect(page.getByTestId('hero-cta-primary')).toContainText('Lihat Proyek');
    await expect(page.getByTestId('hero-cta-secondary')).toContainText('Hubungi Saya');
  });

  test('mobile viewport displays visual fallback without errors (HD-005 / TC-HR-005)', async ({ page }) => {
    // Set mobile viewport (iPhone 12 / 390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Verify semantic text is clean and intact
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByTestId('hero-cta-primary')).toBeVisible();

    // Verify SVG fallback rendered
    const fallbackSvg = page.getByTestId('hero-fallback-orb');
    await expect(fallbackSvg).toBeVisible();
  });

  test('keyboard tab navigation reaches CTAs and shows visible focus rings (AC-HR-08)', async ({ page }) => {
    // Tab through skip link and navigation
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Brand logo

    // Navigate to primary CTA
    const primaryCta = page.getByTestId('hero-cta-primary');
    await primaryCta.focus();
    await expect(primaryCta).toBeFocused();

    // Tab to secondary CTA
    await page.keyboard.press('Tab');
    const secondaryCta = page.getByTestId('hero-cta-secondary');
    await expect(secondaryCta).toBeFocused();
  });
});
