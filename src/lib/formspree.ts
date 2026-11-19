export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  _gotcha?: string; // Honeypot field for bot spam prevention
}

export interface SubmissionResponse {
  ok: boolean;
  error?: string;
}

const DEFAULT_FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_FORM_ID || 'xpzgvxxx';

/**
 * Isolated contact form submission handler.
 * Swappable with custom backend or other providers in the future.
 */
export async function submitContactMessage(data: ContactFormData): Promise<SubmissionResponse> {
  // If honeypot filled, silently drop or fail
  if (data._gotcha && data._gotcha.trim().length > 0) {
    return { ok: true };
  }

  const endpoint = `https://formspree.io/f/${DEFAULT_FORMSPREE_ID}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim(),
        subject: data.subject?.trim() || 'Portfolio Contact Submission',
        message: data.message.trim(),
      }),
    });

    if (response.ok) {
      return { ok: true };
    }

    const errorData = await response.json().catch(() => ({}));
    return {
      ok: false,
      error: errorData?.error || 'Form submission failed. Please try again.',
    };
  } catch (err: unknown) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Network error occurred.',
    };
  }
}
