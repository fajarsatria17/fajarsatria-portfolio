import { test } from '@playwright/test';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/ASUS/.gemini/antigravity/brain/69879761-4b5e-4e8d-be62-3a335b65f7e9';

test.describe('Visual Screenshot Capture', () => {
  test('capture desktop full page and projects section', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);

    // Full page desktop
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'desktop-preview.png'),
      fullPage: true,
    });

    // Hero section closeup
    const heroSection = page.locator('#hero');
    await heroSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await heroSection.screenshot({
      path: path.join(ARTIFACT_DIR, 'hero-particle-portrait-desktop.png'),
    });

    // Projects section closeup
    const projectsSection = page.locator('#projects');
    await projectsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await projectsSection.screenshot({
      path: path.join(ARTIFACT_DIR, 'projects-section-desktop.png'),
    });

    // Contact section closeup
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await contactSection.screenshot({
      path: path.join(ARTIFACT_DIR, 'contact-section-desktop.png'),
    });
  });

  test('capture mobile full page', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Full page mobile
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'mobile-preview.png'),
      fullPage: true,
    });
  });

  test('capture project detail page desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/projects/tims-inventory-management-system', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Full page project detail
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'project-detail-tims-desktop.png'),
      fullPage: true,
    });
  });
});
