import { describe, expect, it } from 'vitest';
import { clampHorizon, validateSeries } from './validation';

describe('validateSeries', () => {
  it('passes a valid series', () => {
    expect(validateSeries(['a', 'b'], [1, 2]).valid).toBe(true);
  });

  it('fails on too few points', () => {
    expect(validateSeries(['a'], [1]).valid).toBe(false);
  });

  it('warns on constant series', () => {
    const r = validateSeries(['a', 'b', 'c'], [4, 4, 4]);
    expect(r.warnings.some((w) => /constant/i.test(w))).toBe(true);
  });
});

describe('clampHorizon', () => {
  it('clamps to bounds', () => {
    expect(clampHorizon(0)).toBe(1);
    expect(clampHorizon(1000)).toBe(104);
    expect(clampHorizon(24)).toBe(24);
  });
});
