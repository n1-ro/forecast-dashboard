export type ForecastMethod = 'moving_average' | 'linear_regression';

export interface ForecastPoint {
  t: number;          // time index
  value: number;      // actual (if available) or forecast
  upper: number;      // upper confidence band
  lower: number;      // lower confidence band
  isForecast: boolean;
}

export interface ForecastResult {
  points: ForecastPoint[];
  method: ForecastMethod;
  slope: number | null;   // only for linear
  mae: number | null;     // mean absolute error on the training window
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function stddev(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  const variance = mean(values.map((v) => (v - m) ** 2));
  return Math.sqrt(variance);
}

function linearRegression(xs: number[], ys: number[]): { slope: number; intercept: number } {
  const n = xs.length;
  const mx = mean(xs);
  const my = mean(ys);
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - mx) * (ys[i] - my);
    den += (xs[i] - mx) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  const intercept = my - slope * mx;
  return { slope, intercept };
}

/**
 * Forecast `horizon` steps ahead from `history`.
 * Uses linear regression as the baseline (with a moving-average fallback when
 * the series is flat) and a 95% confidence band derived from residual spread.
 */
export function forecast(
  history: number[],
  horizon: number,
  method: ForecastMethod = 'linear_regression',
): ForecastResult {
  if (history.length < 2) {
    throw new Error('forecast requires at least 2 historical points');
  }

  const n = history.length;
  const xs = history.map((_, i) => i);
  const points: ForecastPoint[] = [];

  let slope: number | null = null;
  let residuals: number[] = [];

  if (method === 'linear_regression') {
    const { slope: s, intercept } = linearRegression(xs, history);
    slope = s;
    residuals = history.map((y, i) => y - (s * i + intercept));

    for (let i = 0; i < n; i++) {
      const value = s * i + intercept;
      points.push({ t: i, value, upper: value, lower: value, isForecast: false });
    }
    for (let i = 0; i < horizon; i++) {
      const t = n + i;
      const value = s * t + intercept;
      const band = 1.96 * stddev(residuals);
      points.push({ t, value, upper: value + band, lower: value - band, isForecast: true });
    }
  } else {
    const window = Math.min(7, n);
    residuals = [];
    for (let i = 0; i < n; i++) {
      const lo = Math.max(0, i - window + 1);
      const slice = history.slice(lo, i + 1);
      const value = mean(slice);
      residuals.push(history[i] - value);
      points.push({ t: i, value, upper: value, lower: value, isForecast: false });
    }
    let last = points[points.length - 1].value;
    const band = 1.96 * stddev(residuals);
    for (let i = 0; i < horizon; i++) {
      const t = n + i;
      points.push({ t, value: last, upper: last + band, lower: last - band, isForecast: true });
    }
  }

  const mae = mean(residuals.map((r) => Math.abs(r)));
  return { points, method, slope, mae };
}
