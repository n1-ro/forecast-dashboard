import { useMemo, useState } from 'react';
import { parseCsv, ParsedSeries } from './lib/csv';
import { forecast } from './lib/forecast';
import { growthRate, last } from './lib/stats';
import Dashboard from './components/Dashboard';
import UploadPanel from './components/UploadPanel';

export default function App() {
  const [series, setSeries] = useState<ParsedSeries | null>(null);
  const [horizon, setHorizon] = useState(12);

  const result = useMemo(() => {
    if (!series) return null;
    return forecast(series.values, horizon);
  }, [series, horizon]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <h1 className="text-xl font-semibold">Prophet Analyst</h1>
          <p className="text-sm text-slate-500">
            Time-series forecasting for non-technical teams
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <UploadPanel onSeries={setSeries} />

        {series && result && (
          <Dashboard
            series={series}
            result={result}
            horizon={horizon}
            onHorizonChange={setHorizon}
            stats={{
              rows: series.rowCount,
              latest: last(series.values),
              growth: growthRate(series.values),
            }}
          />
        )}
      </main>
    </div>
  );
}
