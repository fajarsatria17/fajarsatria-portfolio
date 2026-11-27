import { test, expect } from '@playwright/test';

test.describe('Core Portfolio Sections (Phase 4.1 Personalization)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('renders Fajar Satria identity, verified About, Skills, Experience, and Education', async ({ page }) => {
    // Hero Heading (Fajar Satria instead of Alex Morgan)
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Fajar Satria');

    // About Section
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection.locator('h2')).toContainText('About Me');
    await expect(page.getByTestId('about-bio')).toContainText('Universitas Malikussaleh');
    await expect(page.getByTestId('about-bio')).toContainText('3.70 / 4.00');
    await expect(page.getByTestId('about-location')).toContainText('Indonesia');

    // Skills Section (6 verified categories)
    const skillsSection = page.locator('#skills');
    await expect(skillsSection).toBeVisible();
    await expect(skillsSection.locator('h2')).toContainText('Skills & Capabilities');
    await expect(skillsSection.getByText('Programming Languages')).toBeVisible();
    await expect(skillsSection.getByText('AI & Machine Learning')).toBeVisible();
    await expect(skillsSection.getByText('YOLOv8')).toBeVisible();
    await expect(skillsSection.getByText('Microsoft SQL Server')).toBeVisible();

    // Experience Section (Separate PT Denso and LPP RRI)
    const experienceSection = page.locator('#experience');
    await expect(experienceSection).toBeVisible();
    await expect(experienceSection.locator('h2')).toContainText('Work & Professional Experience');
    await expect(experienceSection.getByText(/PT Denso Indonesia/)).toBeVisible();
    await expect(experienceSection.getByText(/TIMS \(TIE Inventory Management System\)/)).toBeVisible();
    await expect(experienceSection.getByText(/LPP Radio Republik Indonesia \(RRI\)/i)).toBeVisible();

    // Education Section (Universitas Malikussaleh & SINTA 3 publication)
    const educationSection = page.locator('#education');
    await expect(educationSection).toBeVisible();
    await expect(educationSection.locator('h2')).toContainText('Education & Research');
    await expect(educationSection.getByText('Universitas Malikussaleh')).toBeVisible();
    await expect(educationSection.getByText(/Bachelor of Informatics Engineering/i)).toBeVisible();
    await expect(educationSection.getByText(/Jurnal Riset Komputer/i).first()).toBeVisible();
  });

  test('TIMS is displayed as the primary project and never renamed to TOJOS', async ({ page }) => {
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();

    // Primary project is TIMS (scoped by role heading)
    await expect(projectsSection.getByRole('heading', { name: 'TIMS – TIE Inventory Management System' })).toBeVisible();

    // Ensure TOJOS is NOT substituted
    await expect(page.getByText('TOJOS')).not.toBeVisible();

    // Final year project and RRI inventory project are also listed
    await expect(projectsSection.getByRole('heading', { name: 'Real-Time Face Recognition Attendance System' })).toBeVisible();
    await expect(projectsSection.getByRole('heading', { name: 'Web-Based Inventory Management Application' })).toBeVisible();
  });

  test('bilingual toggle switches all personalized core section contents to Indonesian (AQ-004)', async ({ page }) => {
    // Click language toggle button
    const langBtn = page.getByRole('button', { name: /Current language: EN/i });
    await langBtn.click();

    // Verify About in Indonesian
    const aboutH2 = page.locator('#about h2');
    await expect(aboutH2).toContainText('Tentang Saya');
    await expect(page.getByTestId('about-bio')).toContainText('Lulusan Teknik Informatika');

    // Verify Skills in Indonesian
    const skillsH2 = page.locator('#skills h2');
    await expect(skillsH2).toContainText('Keahlian & Kompetensi');
    await expect(page.getByText('Bahasa Pemrograman')).toBeVisible();
    await expect(page.getByText('Basis Data & Rekayasa')).toBeVisible();

    // Verify Experience in Indonesian
    const expH2 = page.locator('#experience h2');
    await expect(expH2).toContainText('Pengalaman Kerja & Profesional');
    await expect(page.getByText(/Sekarang/i)).toBeVisible();

    // Verify Education in Indonesian
    const eduH2 = page.locator('#education h2');
    await expect(eduH2).toContainText('Pendidikan & Riset');
    await expect(page.getByText(/Sarjana Teknik Informatika/i)).toBeVisible();
  });

  test('navbar navigation links scroll smoothly to core sections', async ({ page }) => {
    // Click About nav link
    const aboutLink = page.locator('nav a[href="#about"]').first();
    await aboutLink.click();
    await expect(page.locator('#about')).toBeInViewport();

    // Click Skills nav link
    const skillsLink = page.locator('nav a[href="#skills"]').first();
    await skillsLink.click();
    await expect(page.locator('#skills')).toBeInViewport();

    // Click Experience nav link
    const expLink = page.locator('nav a[href="#experience"]').first();
    await expLink.click();
    await expect(page.locator('#experience')).toBeInViewport();

    // Click Education nav link
    const eduLink = page.locator('nav a[href="#education"]').first();
    await eduLink.click();
    await expect(page.locator('#education')).toBeInViewport();
  });

  test('social links only display verified channels (GitHub, Instagram, and email, no invented URLs)', async ({ page }) => {
    // Verified GitHub
    const githubLink = page.locator('a[href="https://github.com/fajarsatria17"]').first();
    await expect(githubLink).toBeVisible();

    // Verified Instagram
    const igLink = page.locator('a[href="https://www.instagram.com/fzrstria_?jplx=bnd1cHg1N3E1b3Bj"]').first();
    await expect(igLink).toBeVisible();

    // Verified Email
    const emailLink = page.locator('a[href="mailto:fajarsatria1945@gmail.com"]').first();
    await expect(emailLink).toBeVisible();

    // Unverified LinkedIn should NOT be rendered in the DOM while empty
    await expect(page.locator('a[href="https://linkedin.com"]')).not.toBeVisible();
  });

  test('Hero section functionality has zero regression (HR-001–HR-010)', async ({ page }) => {
    // Hero Heading & Actions remain active and visible
    await expect(page.locator('h1')).toContainText('Fajar Satria');
    await expect(page.getByTestId('hero-cta-primary')).toBeVisible();
    await expect(page.getByTestId('hero-cta-secondary')).toBeVisible();

    // Primary CTA scrolls to #projects
    await page.getByTestId('hero-cta-primary').click();
    await expect(page.locator('#projects')).toBeInViewport();
  });

  test('project card visuals render authentic application screenshots with fallback readiness', async ({ page }) => {
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();

    // Verify all 3 project cards contain valid preview images
    const images = projectsSection.locator('img');
    await expect(images).toHaveCount(3);

    // Verify TIMS, Face Recognition, and RRI authentic screenshots
    await expect(projectsSection.locator('img[src="/images/projects/tims-dashboard.png"]')).toBeVisible();
    await expect(projectsSection.locator('img[src="/images/projects/face-detection-result.png"]')).toBeVisible();
    await expect(projectsSection.locator('img[src="/images/projects/rri-login.png"]')).toBeVisible();

    // Verify authentic indicator badge exists
    const indicators = projectsSection.getByText(/Authentic Screenshot|Tangkapan Layar Asli/i);
    await expect(indicators.first()).toBeVisible();

    // Verify old placeholder text "[ ... Preview ]" does not exist anywhere in DOM
    await expect(page.getByText(/\[ .* Preview \]/)).not.toBeVisible();
  });

  test('CV download controls link to verified public/cv/fajar-satria-cv.pdf', async ({ page }) => {
    // About section CV button
    const aboutCvBtn = page.getByTestId('about-cv-button');
    await expect(aboutCvBtn).toBeVisible();
    await expect(aboutCvBtn).toHaveAttribute('href', '/cv/fajar-satria-cv.pdf');
    await expect(aboutCvBtn).toHaveAttribute('download', 'Fajar-Satria-CV.pdf');

    // Navbar CV button
    const navCvBtn = page.locator('header').getByRole('button', { name: /Resume/i });
    await expect(navCvBtn).toBeVisible();
  });

  test('Contact section renders verified node, contact form, and validation (FR-012/FR-013)', async ({ page }) => {
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();

    // Verify fields
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();

    // Verify submit button
    const submitBtn = page.locator('#contact button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Form validation error appears
    await expect(page.locator('#name-error')).toBeVisible();
  });

  test('responsive mobile viewport has zero horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasHorizontalOverflow).toBe(false);
  });
});
