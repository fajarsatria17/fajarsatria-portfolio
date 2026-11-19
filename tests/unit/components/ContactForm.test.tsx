import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContactForm } from '@components/contact/ContactForm';
import { LanguageProvider } from '@hooks/LanguageContext';

describe('ContactForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as unknown as Response);
  });

  it('renders all required form fields, labels, and submit button', () => {
    render(
      <LanguageProvider>
        <ContactForm />
      </LanguageProvider>
    );

    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('validates empty inputs and displays accessible error messages (TC-010)', async () => {
    render(
      <LanguageProvider>
        <ContactForm />
      </LanguageProvider>
    );

    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/Full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Message is required/i)).toBeInTheDocument();
  });

  it('validates invalid email format (TC-011)', async () => {
    render(
      <LanguageProvider>
        <ContactForm />
      </LanguageProvider>
    );

    fireEvent.change(screen.getByLabelText(/Your Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'invalid-email-address' },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: 'This is a valid test message for collaboration.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  it('honeypot field is hidden and silently succeeds for bots (SEC-005)', async () => {
    render(
      <LanguageProvider>
        <ContactForm />
      </LanguageProvider>
    );

    const honeypot = screen.getByLabelText(/Leave this field blank/i);
    expect(honeypot.parentElement).toHaveStyle({ display: 'none' });

    // Fill honeypot (bot behavior)
    fireEvent.change(honeypot, { target: { value: 'http://spam-bot.site' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    // Should immediately show success state to trap bot without network call
    expect(await screen.findByText(/Message Received!/i)).toBeInTheDocument();
  });

  it('transitions to success state on valid submission and allows reset (TC-012)', async () => {
    const onSuccess = vi.fn();
    render(
      <LanguageProvider>
        <ContactForm onSubmitSuccess={onSuccess} />
      </LanguageProvider>
    );

    fireEvent.change(screen.getByLabelText(/Your Name/i), {
      target: { value: 'Alex Recruiter' },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'alex@company.com' },
    });
    fireEvent.change(screen.getByLabelText(/Subject/i), {
      target: { value: 'Full-Stack Role' },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: 'Hi Fajar, we are impressed by your TIMS and YOLOv8 work!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(await screen.findByText(/Message Received!/i)).toBeInTheDocument();
    expect(onSuccess).toHaveBeenCalled();

    // Reset button
    const resetBtn = screen.getByRole('button', { name: /Transmit Another Message/i });
    fireEvent.click(resetBtn);

    // Form inputs should be restored and cleared
    expect(screen.getByLabelText(/Your Name/i)).toHaveValue('');
  });
});
