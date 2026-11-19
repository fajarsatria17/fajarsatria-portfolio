import { describe, it, expect } from 'vitest';
import { formatMonthYear, formatDateRange } from '@utils/date';

describe('Date Utilities', () => {
  describe('formatMonthYear', () => {
    it('formats YYYY-MM correctly in English', () => {
      expect(formatMonthYear('2024-01', 'en')).toBe('Jan 2024');
      expect(formatMonthYear('2023-12', 'en')).toBe('Dec 2023');
    });

    it('formats YYYY-MM correctly in Indonesian', () => {
      expect(formatMonthYear('2024-05', 'id')).toBe('Mei 2024');
      expect(formatMonthYear('2023-08', 'id')).toBe('Agu 2023');
    });

    it('handles empty input gracefully', () => {
      expect(formatMonthYear('')).toBe('');
    });
  });

  describe('formatDateRange', () => {
    it('formats complete date range in English', () => {
      expect(formatDateRange('2021-01', '2023-06', false, 'en')).toBe('Jan 2021 – Jun 2023');
    });

    it('formats present date range in English', () => {
      expect(formatDateRange('2023-01', null, true, 'en')).toBe('Jan 2023 – Present');
    });

    it('formats present date range in Indonesian', () => {
      expect(formatDateRange('2023-01', null, true, 'id')).toBe('Jan 2023 – Sekarang');
    });
  });
});
