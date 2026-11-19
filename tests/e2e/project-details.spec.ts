import { test, expect } from '@playwright/test';

test.describe('Project Detail Pages & Visual Authenticity', () => {
  test('TIMS project detail page renders all case study sections and privacy notice', async ({ page }) => {
    await page.goto('/projects/tims-inventory-management-system', { waitUntil: 'domcontentloaded' });

    // Header & Title
    await expect(page.locator('h1')).toContainText('TIMS – TIE Inventory Management System');

    // Overview
    await expect(page.getByText(/TIE Inventory Management System.*PT Denso Indonesia/i).first()).toBeVisible();

    // Problem Statement & Objectives
    await expect(page.getByRole('heading', { name: /Problem Statement|Pernyataan Masalah/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Core Objectives|Tujuan Utama/i })).toBeVisible();

    // Role & Contributions
    await expect(page.getByRole('heading', { name: /My Role & Contributions|Peran & Kontribusi Saya/i })).toBeVisible();

    // Key Modules
    await expect(page.getByRole('heading', { name: /Key Modules & Functionality|Modul & Fungsionalitas Utama/i })).toBeVisible();
    await expect(page.getByText('Inventory Management & Cataloging')).toBeVisible();

    // Screenshots Gallery
    await expect(page.getByRole('heading', { name: /Application Screenshots|Tangkapan Layar Aplikasi/i })).toBeVisible();

    // Privacy & Confidentiality Notice (Section 4 PT Denso IP)
    await expect(page.getByRole('heading', { name: /Privacy & Confidentiality Notice|Pemberitahuan Privasi & Kerahasiaan/i })).toBeVisible();
    await expect(page.getByText(/proprietary intellectual property of PT Denso Indonesia|properti intelektual milik PT Denso Indonesia/i)).toBeVisible();
  });

  test('Face Recognition project detail page renders AI modules, publication DOI, and biometric privacy notice', async ({ page }) => {
    await page.goto('/projects/face-recognition-attendance-system', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toContainText('Real-Time Face Recognition Attendance System');

    // Deep Learning modules
    await expect(page.getByText('YOLOv8 Detection Engine')).toBeVisible();
    await expect(page.getByText('ArcFace Feature Extraction')).toBeVisible();
    await expect(page.getByText('Anti-Spoofing Validation Gate')).toBeVisible();

    // Biometric privacy disclaimer (Section 5)
    await expect(page.getByText(/Biometric Privacy Notice|Pemberitahuan Privasi Biometrik/i)).toBeVisible();
  });

  test('RRI Inventory project detail page renders institutional cataloging and MySQL highlights', async ({ page }) => {
    await page.goto('/projects/rri-inventory-management-application', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toContainText('Web-Based Inventory Management Application');
    await expect(page.getByText(/Radio Republik Indonesia \(RRI\) Lhokseumawe/i).first()).toBeVisible();
    await expect(page.getByText('Asset Registry & Categorization')).toBeVisible();
  });

  test('Lightbox modal opens upon expanding project image and closes with Escape key', async ({ page }) => {
    await page.goto('/projects/tims-inventory-management-system', { waitUntil: 'domcontentloaded' });

    // Find first expandable project image container
    const featuredImgContainer = page.getByTestId('project-image-container').first();
    await expect(featuredImgContainer).toBeVisible();

    // Click to open lightbox
    await featuredImgContainer.click();

    // Modal dialog should be visible
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('TIMS – TIE Inventory Management System')).toBeVisible();

    // Press Escape to close lightbox
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });

  test('bilingual toggle translates project detail case study to Indonesian', async ({ page }) => {
    await page.goto('/projects/tims-inventory-management-system', { waitUntil: 'domcontentloaded' });

    // Toggle language
    const langBtn = page.getByRole('button', { name: /Current language: EN/i });
    await langBtn.click();

    // Translated headings
    await expect(page.getByRole('heading', { name: 'Pernyataan Masalah' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Tujuan Utama' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Peran & Kontribusi Saya' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pemberitahuan Privasi & Kerahasiaan' })).toBeVisible();
  });
});
