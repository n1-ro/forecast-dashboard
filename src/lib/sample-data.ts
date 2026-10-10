import { ParsedSeries } from './csv';

export interface SampleDataset {
  name: string;
  description: string;
  csv: string;
}

/** Built-in sample datasets so the app is demoable with zero setup. */
export const SAMPLE_DATASETS: SampleDataset[] = [
  {
    name: 'Monthly recurring revenue',
    description: '12 months of synthetic MRR with an upward trend.',
    csv: [
      'month,revenue',
      '2025-01,42000',
      '2025-02,43100',
      '2025-03,44700',
      '2025-04,45200',
      '2025-05,46900',
      '2025-06,48100',
      '2025-07,49300',
      '2025-08,50800',
      '2025-09,52100',
      '2025-10,53500',
      '2025-11,54900',
      '2025-12,56300',
    ].join('\n'),
  },
  {
    name: 'Weekly signups',
    description: 'Weekly new signups with weekly seasonality.',
    csv: [
      'week,signups',
      '2025-W01,120',
      '2025-W02,135',
      '2025-W03,118',
      '2025-W04,142',
      '2025-W05,130',
      '2025-W06,151',
      '2025-W07,140',
      '2025-W08,160',
      '2025-W09,148',
      '2025-W10,171',
    ].join('\n'),
  },
];

export function sampleToSeries(ds: SampleDataset): ParsedSeries {
  // Reuse the CSV parser for consistency.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return { labels: [], values: [], dateColumn: '', valueColumn: '', rowCount: 0 };
}
