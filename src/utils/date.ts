import type { Language } from '@type/content';

const MONTH_NAMES_EN = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const MONTH_NAMES_ID = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
];

/**
 * Formats a YYYY-MM date string into short month and year (e.g. "Jan 2024")
 */
export function formatMonthYear(dateString: string, lang: Language = 'en'): string {
  if (!dateString) return '';
  const parts = dateString.split('-');
  const year = parts[0];
  const monthIdx = parseInt(parts[1] || '1', 10) - 1;
  const monthList = lang === 'id' ? MONTH_NAMES_ID : MONTH_NAMES_EN;
  const monthName = monthList[monthIdx] || '';
  return `${monthName} ${year}`.trim();
}

/**
 * Formats a date range into e.g. "Jan 2022 – Jun 2024" or "Jan 2023 – Present"
 */
export function formatDateRange(
  startDate: string,
  endDate?: string | null,
  isCurrent: boolean = false,
  lang: Language = 'en'
): string {
  const start = formatMonthYear(startDate, lang);
  if (isCurrent || !endDate) {
    const presentLabel = lang === 'id' ? 'Sekarang' : 'Present';
    return `${start} – ${presentLabel}`;
  }
  const end = formatMonthYear(endDate, lang);
  return `${start} – ${end}`;
}
