import React from 'react';
import { useLanguage } from '@hooks/useLanguage';
import { SectionHeader } from '@components/ui';
import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      aria-label={t.sections.contactTitle}
      data-testid="contact-section"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20"
    >
      <SectionHeader
        eyebrow="06 / REACH OUT"
        title={t.sections.contactTitle}
        subtitle={t.sections.contactSubtitle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Communication Channels & Status Node */}
        <div className="lg:col-span-5">
          <ContactInfo />
        </div>

        {/* Right Column: Secure Cyber Transceiver Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
