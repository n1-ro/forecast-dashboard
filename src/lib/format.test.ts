import { describe, expect, it } from 'vitest';
import { formatCompact, formatNumber, formatPercent } from './format';

describe('format', () => {
  it('formats numbers with thousands separators', () => {
    expect(formatNumber(1234567)).toBe('1,234,567');
  });

  it('formats compact values', () => {
    expect(formatCompact(1_500_000)).toBe('1.5M');
    expect(formatCompact(2_500)).toBe('2.5K');
    expect(formatCompact(42)).toBe('42');
  });

  it('handles null percent', () => {
    expect(formatPercent(null)).toBe('—');
  });
});
