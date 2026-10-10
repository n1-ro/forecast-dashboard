export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateSeries(labels: string[], values: number[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (values.length < 2) {
    errors.push('Need at least 2 data points to forecast');
  }
  if (values.some((v) => !Number.isFinite(v))) {
    errors.push('Series contains non-numeric values');
  }
  if (values.some((v) => v < 0)) {
    warnings.push('Series contains negative values; results may be misleading');
  }
  const unique = new Set(values);
  if (unique.size === 1) {
    warnings.push('Series is constant; forecast will be flat');
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function clampHorizon(horizon: number, max = 104): number {
  return Math.max(1, Math.min(horizon, max));
}
