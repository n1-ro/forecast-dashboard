export interface ParsedSeries {
  labels: string[];
  values: number[];
  dateColumn: string;
  valueColumn: string;
  rowCount: number;
}

function parseNumber(raw: string): number | null {
  const cleaned = raw.replace(/[$,%\s]/g, '');
  if (cleaned === '') return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function looksLikeDate(raw: string): boolean {
  return /^\d{4}-\d{2}-\d{2}/.test(raw) || /^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(raw);
}

/**
 * Parse CSV text into a label/value series. Detects the first date-like column
 * as the time axis and the first consistently-numeric column as the metric.
 */
export function parseCsv(text: string): ParsedSeries {
  const lines = text.trim().split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) throw new Error('CSV must contain a header and at least one data row');

  const split = (line: string) => line.split(',').map((c) => c.trim());
  const headers = split(lines[0]);
  const rows = lines.slice(1).map(split);

  // Find date column
  let dateIdx = headers.findIndex((h) => /date|time|day|month|week/i.test(h));
  if (dateIdx === -1) {
    dateIdx = rows[0] ? headers.findIndex((_, i) => rows.every((r) => looksLikeDate(r[i] ?? ''))) : -1;
  }
  if (dateIdx === -1) dateIdx = 0;

  // Find numeric value column
  let valueIdx = headers.findIndex((h) => /value|revenue|sales|count|amount|total|units|qty/i.test(h));
  if (valueIdx === -1 || valueIdx === dateIdx) {
    valueIdx = headers.findIndex((_, i) => {
      if (i === dateIdx) return false;
      const nums = rows.map((r) => parseNumber(r[i] ?? '')).filter((v) => v !== null);
      return nums.length === rows.length;
    });
  }
  if (valueIdx === -1) {
    throw new Error('Could not find a numeric value column');
  }

  const labels = rows.map((r) => r[dateIdx] ?? '');
  const values = rows.map((r) => parseNumber(r[valueIdx] ?? '') ?? 0);

  return {
    labels,
    values,
    dateColumn: headers[dateIdx],
    valueColumn: headers[valueIdx],
    rowCount: rows.length,
  };
}
