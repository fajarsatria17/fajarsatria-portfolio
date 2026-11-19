import { describe, it, expect } from 'vitest';
import { filterPublished, sortByOrder } from '@utils/content';

describe('Content Utilities', () => {
  describe('filterPublished', () => {
    it('only returns published items (BR-001)', () => {
      const items = [
        { id: '1', title: 'Pub 1', published: true },
        { id: '2', title: 'Draft 1', published: false },
        { id: '3', title: 'Pub 2', published: true },
      ];

      const result = filterPublished(items);
      expect(result).toHaveLength(2);
      expect(result.map(i => i.id)).toEqual(['1', '3']);
    });

    it('returns empty array when all items are unpublished', () => {
      const items = [{ id: '1', published: false }];
      expect(filterPublished(items)).toHaveLength(0);
    });
  });

  describe('sortByOrder', () => {
    it('sorts items ascending by sortOrder', () => {
      const items = [
        { id: 'c', sortOrder: 3 },
        { id: 'a', sortOrder: 1 },
        { id: 'b', sortOrder: 2 },
      ];

      const result = sortByOrder(items);
      expect(result.map(i => i.id)).toEqual(['a', 'b', 'c']);
    });
  });
});
