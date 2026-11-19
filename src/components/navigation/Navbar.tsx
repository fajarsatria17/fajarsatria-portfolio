import React, { useState, useEffect } from 'react';
import { useLanguage } from '@hooks/useLanguage';
import { Button } from '@components/ui';
import { siteSettings } from '@data/settings';
import { List, X, Globe } from '@phosphor-icons/react';

export const Navbar: React.FC = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#experience', label: t.nav.experience },
    { href: '#education', label: t.nav.education },
    { href: '#projects', label: t.nav.projects },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg-base/90 backdrop-blur-md border-b border-border/80 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
      >
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex items-center gap-2 focus-visible:outline-none"
          aria-label="Fajar Satria Portfolio Homepage"
        >
          <span className="font-mono text-lg font-bold text-accent tracking-tighter group-hover:text-accent-dim transition-colors">
            &lt;FS /&gt;
          </span>
          <span className="font-display font-semibold text-text-primary text-sm hidden sm:inline-block">
            Fajar Satria
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-text-secondary hover:text-accent transition-colors focus-visible:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-4 w-px bg-border" aria-hidden="true" />

          {/* Bilingual Language Switcher Button (AQ-004) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1.5 rounded-md bg-bg-surface hover:bg-bg-overlay text-text-secondary hover:text-accent border border-border transition-all focus-visible:ring-1 focus-visible:ring-accent"
            title={`Switch to ${language === 'en' ? 'Bahasa Indonesia' : 'English'}`}
            aria-label={`Current language: ${language.toUpperCase()}. Click to switch language.`}
          >
            <Globe size={14} className="text-accent" />
            <span className="uppercase">{language}</span>
          </button>

          {/* Download CV CTA (conditioned on CV availability) */}
          {siteSettings.cvAvailable && siteSettings.cvUrl && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(siteSettings.cvUrl, '_blank')}
            >
              {t.nav.resume}
            </Button>
          )}
        </div>

        {/* Mobile menu toggle & Language button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-xs font-mono px-2 py-1.5 rounded bg-bg-surface text-text-secondary border border-border"
            aria-label="Toggle language"
          >
            <Globe size={13} className="text-accent" />
            <span className="uppercase">{language}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-lg bg-bg-surface text-text-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="md:hidden bg-bg-elevated/95 backdrop-blur-xl border-b border-border px-4 py-6 shadow-2xl transition-all"
          id="mobile-navigation"
        >
          <ul className="flex flex-col gap-4 list-none m-0 p-0">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-medium text-text-secondary hover:text-accent py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {siteSettings.cvAvailable && siteSettings.cvUrl && (
              <li className="pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.open(siteSettings.cvUrl, '_blank');
                  }}
                >
                  {t.nav.resume}
                </Button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};
