import { useCallback, useRef } from 'react';
import { parseCsv, ParsedSeries } from '../lib/csv';

interface Props {
  onSeries: (series: ParsedSeries) => void;
}

export default function UploadPanel({ onSeries }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const series = parseCsv(String(reader.result ?? ''));
          onSeries(series);
        } catch (err) {
          alert(err instanceof Error ? err.message : 'Failed to parse CSV');
        }
      };
      reader.readAsText(file);
    },
    [onSeries],
  );

  return (
    <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="mb-2 text-lg font-medium">1. Upload historical data</h2>
      <p className="mb-4 text-sm text-slate-500">
        Drop a CSV with a date column and a numeric metric (revenue, sales, counts, …).
      </p>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="block w-full cursor-pointer text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
    </section>
  );
}
