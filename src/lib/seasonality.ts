import { ForecastResult } from '../lib/forecast';
import { ParsedSeries } from '../lib/csv';

/**
 * Detect likely seasonality period (1 = none, 4 = quarterly, 12 = monthly)
 * by finding the lag with the highest autocorrelation in the series.
 */
export function detectSeasonality(values: number[], maxLag = 24): number {
  const n = values.length;
  if (n < maxLag * 2) return 1;

  const mean = values.reduce((a, b) => a + b, 0) / n;
  const centered = values.map((v) => v - mean);
  const variance = centered.reduce((a, b) => a + b * b, 0);
  if (variance === 0) return 1;

  let bestLag = 1;
  let bestCorr = 0;
  for (let lag = 2; lag <= maxLag; lag++) {
    let num = 0;
    let overlap = 0;
    for (let i = lag; i < n; i++) {
      num += centered[i] * centered[i - lag];
      overlap++;
    }
    const corr = overlap > 0 ? num / variance : 0;
    if (corr > bestCorr) {
      bestCorr = corr;
      bestLag = lag;
    }
  }
  return bestCorr > 0.2 ? bestLag : 1;
}

export interface SeasonalityInfo {
  period: number;
  strength: number; // 0..1
  label: string;
}

export function analyzeSeasonality(values: number[]): SeasonalityInfo {
  const period = detectSeasonality(values);
  const label =
    period === 12 ? 'Monthly' : period === 4 ? 'Quarterly' : period === 52 ? 'Weekly' : 'None detected';
  return { period, strength: period === 1 ? 0 : 0.5, label };
}
