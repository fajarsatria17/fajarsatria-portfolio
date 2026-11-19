/**
 * Returns safe rel attributes for external links
 */
export function getSafeExternalRel(target?: string): string | undefined {
  if (target === '_blank') {
    return 'noopener noreferrer';
  }
  return undefined;
}

/**
 * Checks whether a given URL is external
 */
export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}
