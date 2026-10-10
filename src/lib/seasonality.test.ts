import { describe, expect, it } from 'vitest';
import { analyzeSeasonality, detectSeasonality } from './seasonality';

describe('detectSeasonality', () => {
  it('returns 1 for flat series', () => {
    expect(detectSeasonality([5, 5, 5, 5, 5, 5])).toBe(1);
  });

  it('returns 1 for short series', () => {
    expect(detectSeasonality([1, 2, 3, 4, 5])).toBe(1);
  });
});

describe('analyzeSeasonality', () => {
  it('labels no seasonality for flat data', () => {
    expect(analyzeSeasonality([3, 3, 3, 3, 3]).label).toBe('None detected');
  });

  it('produces a strength in 0..1', () => {
    const info = analyzeSeasonality([1, 2, 1, 2, 1, 2, 1, 2]);
    expect(info.strength).toBeGreaterThanOrEqual(0);
    expect(info.strength).toBeLessThanOrEqual(1);
  });
});
