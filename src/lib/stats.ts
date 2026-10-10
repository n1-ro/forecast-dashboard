export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function stddev(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  return Math.sqrt(mean(values.map((v) => (v - m) ** 2)));
}

export function last(values: number[]): number {
  return values.length ? values[values.length - 1] : 0;
}

export function growthRate(values: number[]): number | null {
  if (values.length < 2) return null;
  const first = values[0];
  const lastVal = values[values.length - 1];
  if (first === 0) return null;
  return ((lastVal - first) / Math.abs(first)) * 100;
}
