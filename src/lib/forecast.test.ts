import { describe, expect, it } from 'vitest';
import { forecast } from './forecast';
import { parseCsv } from './csv';

describe('forecast', () => {
  it('produces horizon forecast points after the history', () => {
    const history = [10, 12, 14, 16, 18, 20];
    const result = forecast(history, 5);
    expect(result.points).toHaveLength(history.length + 5);
    expect(result.points.filter((p) => p.isForecast)).toHaveLength(5);
  });

  it('fits an upward linear trend with positive slope', () => {
    const history = [10, 12, 14, 16, 18, 20];
    const result = forecast(history, 5, 'linear_regression');
    expect(result.slope).toBeGreaterThan(1.9);
  });

  it('provides widening confidence bounds on forecast points', () => {
    const result = forecast([5, 7, 4, 9, 8, 12, 11], 4);
    const fc = result.points.filter((p) => p.isForecast);
    expect(fc.every((p) => p.upper >= p.lower)).toBe(true);
  });

  it('falls back to moving average cleanly', () => {
    const result = forecast([1, 2, 3, 4, 5], 3, 'moving_average');
    expect(result.points).toHaveLength(8);
    expect(result.slope).toBeNull();
  });

  it('throws on insufficient history', () => {
    expect(() => forecast([1], 3)).toThrow();
  });
});

describe('parseCsv', () => {
  it('detects date and value columns from headers', () => {
    const csv = 'date,revenue\n2024-01-01,100\n2024-01-02,120\n2024-01-03,110';
    const s = parseCsv(csv);
    expect(s.labels).toEqual(['2024-01-01', '2024-01-02', '2024-01-03']);
    expect(s.values).toEqual([100, 120, 110]);
    expect(s.valueColumn).toBe('revenue');
  });

  it('strips currency formatting from numbers', () => {
    const csv = 'month,sales\nJan,"$1,000"\nFeb,"$1,200"';
    const s = parseCsv(csv);
    expect(s.values).toEqual([1000, 1200]);
  });
});
