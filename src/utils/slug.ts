/**
 * Validates whether a slug is non-empty, URL-safe, and lowercase alphanumeric with hyphens
 */
export function validateSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false;
  const trimmed = slug.trim();
  if (trimmed.length === 0) return false;
  // Alphanumeric with single hyphens, no consecutive hyphens, no leading/trailing hyphens
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(trimmed);
}

/**
 * Creates a URL-friendly slug from text
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
