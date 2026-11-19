import { describe, it, expect } from 'vitest';
import { validateSlug, createSlug } from '@utils/slug';

describe('Slug Utilities', () => {
  describe('validateSlug', () => {
    it('validates correct URL-friendly slugs', () => {
      expect(validateSlug('nebula-3d-visualizer')).toBe(true);
      expect(validateSlug('project123')).toBe(true);
      expect(validateSlug('simple-slug-1')).toBe(true);
    });

    it('rejects invalid or unsafe slugs (BR-002)', () => {
      expect(validateSlug('')).toBe(false);
      expect(validateSlug('   ')).toBe(false);
      expect(validateSlug('Invalid Slug With Spaces')).toBe(false);
      expect(validateSlug('special#chars$')).toBe(false);
      expect(validateSlug('-leading-hyphen')).toBe(false);
      expect(validateSlug('trailing-hyphen-')).toBe(false);
      expect(validateSlug('double--hyphen')).toBe(false);
    });
  });

  describe('createSlug', () => {
    it('generates normalized URL slugs', () => {
      expect(createSlug('Nebula 3D Data Visualizer')).toBe('nebula-3d-data-visualizer');
      expect(createSlug('  Hello World! & More  ')).toBe('hello-world-more');
    });
  });
});
