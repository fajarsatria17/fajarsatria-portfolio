/**
 * Filters an array of items to only those that have published: true (BR-001)
 */
export function filterPublished<T extends { published: boolean }>(items: T[]): T[] {
  return items.filter(item => item.published === true);
}

/**
 * Sorts items by their sortOrder property ascending
 */
export function sortByOrder<T extends { sortOrder: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}
