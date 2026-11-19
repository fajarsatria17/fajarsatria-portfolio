import React, { useState, type FormEvent } from 'react';
import { useLanguage } from '@hooks/useLanguage';
import { Button, Card, ScrambleText } from '@components/ui';
import { PaperPlaneTilt, CheckCircle, WarningCircle } from '@phosphor-icons/react';

export interface ContactFormProps {
  onSubmitSuccess?: () => void;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // Honeypot
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmitSuccess }) => {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = language === 'id' ? 'Nama lengkap wajib diisi.' : 'Full name is required.';
    } else if (trimmedName.length < 2 || trimmedName.length > 80) {
      newErrors.name =
        language === 'id'
          ? 'Nama harus terdiri dari 2 hingga 80 karakter.'
          : 'Name must be between 2 and 80 characters.';
    }

    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email =
        language === 'id' ? 'Alamat email wajib diisi.' : 'Email address is required.';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email =
        language === 'id'
          ? 'Format email tidak valid (contoh: nama@domain.com).'
          : 'Please enter a valid email address.';
    }

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) {
      newErrors.message =
        language === 'id' ? 'Pesan komunikasi wajib diisi.' : 'Message is required.';
    } else if (trimmedMessage.length < 10) {
      newErrors.message =
        language === 'id'
          ? 'Pesan minimal terdiri dari 10 karakter.'
          : 'Message must be at least 10 characters long.';
    } else if (trimmedMessage.length > 3000) {
      newErrors.message =
        language === 'id'
          ? 'Pesan tidak boleh melebihi 3000 karakter.'
          : 'Message cannot exceed 3000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-level error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // SEC-005: Honeypot check for spam bots
    if (formData.website) {
      // Silently simulate success for bots
      setStatus('success');
      return;
    }

    if (!validate()) {
      return;
    }

    setStatus('submitting');
    setErrorMessage(null);

    try {
      const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID;
      const customEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
      const endpoint = customEndpoint || (formspreeId ? `https://formspree.io/f/${formspreeId}` : null);

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim() || 'Portfolio Inquiry',
            message: formData.message.trim(),
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          const errorMsg =
            data?.errors?.map((e: { message: string }) => e.message).join(', ') ||
            data?.error ||
            'Network response was not ok';
          throw new Error(errorMsg);
        }
      } else {
        // Fallback simulation in local dev: log transmission data to browser console
        console.info('[CONTACT TRANSCEIVER] Transmitted Payload:', {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || 'Portfolio Inquiry',
          message: formData.message.trim(),
          timestamp: new Date().toISOString(),
        });
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      setStatus('success');
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err: unknown) {
      setStatus('error');
      const customMsg = err instanceof Error ? err.message : null;
      setErrorMessage(customMsg || t.contact.errorDesc);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      website: '',
    });
    setErrors({});
    setStatus('idle');
    setErrorMessage(null);
  };

  if (status === 'success') {
    return (
      <Card glow className="border-accent/40 bg-bg-surface/90 text-center py-12 px-6 sm:px-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 border-2 border-accent text-accent flex items-center justify-center mx-auto shadow-glow-sm">
          <CheckCircle size={36} className="text-accent" />
        </div>

        <div className="space-y-2">
          <span className="inline-block font-mono text-xs text-accent uppercase tracking-widest">
            TRANSMISSION STATUS // 200 OK
          </span>
          <h3 className="text-2xl font-display font-bold text-text-primary tracking-tight">
            {t.contact.successTitle}
          </h3>
          <p className="text-text-secondary text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            {t.contact.successDesc}
          </p>
        </div>

        <div className="pt-2">
          <Button variant="outline" onClick={handleReset} className="font-mono text-xs">
            {language === 'id' ? '← Kirim Pesan Lain' : '← Transmit Another Message'}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card glow className="border-border/80 bg-bg-surface/90 p-6 sm:p-8 space-y-6">
      {/* Transceiver Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span className="text-text-primary font-semibold tracking-wider uppercase">
            <ScrambleText text="TRANSMITTER PROTOCOL // V2.4" trigger="both" speed={20} />
          </span>
        </div>
        <span className="text-text-tertiary">PORT: 443 (SSL)</span>
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-sm flex items-start gap-3 animate-in fade-in"
        >
          <WarningCircle size={20} className="shrink-0 mt-0.5 text-red-400" />
          <div className="space-y-1">
            <p className="font-semibold">{t.contact.errorTitle}</p>
            <p className="text-xs text-red-300/90">{errorMessage || t.contact.errorDesc}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* SEC-005 Honeypot Field for Spam Bots (Hidden from real users) */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <label htmlFor="website">Leave this field blank</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        {/* Sender Name Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-xs font-mono font-semibold uppercase tracking-wider text-text-secondary"
          >
            {t.contact.name} <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={status === 'submitting'}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            value={formData.name}
            onChange={handleChange}
            placeholder={t.contact.namePlaceholder}
            className="w-full px-4 py-3 rounded-lg bg-bg-base/70 border border-border focus:border-accent focus:ring-1 focus:ring-accent text-text-primary placeholder:text-text-tertiary text-sm font-sans transition-all disabled:opacity-50"
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-400 font-mono mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Address Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-mono font-semibold uppercase tracking-wider text-text-secondary"
          >
            {t.contact.email} <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={status === 'submitting'}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            value={formData.email}
            onChange={handleChange}
            placeholder={t.contact.emailPlaceholder}
            className="w-full px-4 py-3 rounded-lg bg-bg-base/70 border border-border focus:border-accent focus:ring-1 focus:ring-accent text-text-primary placeholder:text-text-tertiary text-sm font-sans transition-all disabled:opacity-50"
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-400 font-mono mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject Field (Optional) */}
        <div className="space-y-1.5">
          <label
            htmlFor="subject"
            className="block text-xs font-mono font-semibold uppercase tracking-wider text-text-secondary"
          >
            {t.contact.subject}
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            disabled={status === 'submitting'}
            value={formData.subject}
            onChange={handleChange}
            placeholder={t.contact.subjectPlaceholder}
            className="w-full px-4 py-3 rounded-lg bg-bg-base/70 border border-border focus:border-accent focus:ring-1 focus:ring-accent text-text-primary placeholder:text-text-tertiary text-sm font-sans transition-all disabled:opacity-50"
          />
        </div>

        {/* Message Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="message"
            className="block text-xs font-mono font-semibold uppercase tracking-wider text-text-secondary"
          >
            {t.contact.message} <span className="text-accent">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            disabled={status === 'submitting'}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            value={formData.message}
            onChange={handleChange}
            placeholder={t.contact.messagePlaceholder}
            className="w-full px-4 py-3 rounded-lg bg-bg-base/70 border border-border focus:border-accent focus:ring-1 focus:ring-accent text-text-primary placeholder:text-text-tertiary text-sm font-sans transition-all resize-none disabled:opacity-50"
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-red-400 font-mono mt-1">
              {errors.message}
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            isLoading={status === 'submitting'}
            disabled={status === 'submitting'}
            className="w-full font-mono font-semibold uppercase tracking-wider gap-2 shadow-glow-sm hover:shadow-glow-md"
          >
            <PaperPlaneTilt size={18} />
            {status === 'submitting' ? t.contact.sending : t.contact.send}
          </Button>
        </div>

        {/* PRD 7.1 Privacy Note */}
        <p className="text-[11px] font-mono text-text-tertiary text-center leading-relaxed pt-1">
          {t.contact.privacyNote}
        </p>
      </form>
    </Card>
  );
};
