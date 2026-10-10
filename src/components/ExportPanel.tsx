import { ForecastResult } from '../lib/forecast';
import { ParsedSeries } from '../lib/csv';

interface Props {
  series: ParsedSeries;
  result: ForecastResult;
}

/** Export the forecast table as a CSV download. */
export default function ExportPanel({ series, result }: Props) {
  const handleExport = () => {
    const rows = [
      [series.dateColumn, series.valueColumn, 'forecast', 'upper', 'lower'].join(','),
      ...result.points.map((p) =>
        [
          series.labels[p.t] ?? p.t,
          p.isForecast ? '' : p.value,
          p.isForecast ? p.value : '',
          p.isForecast ? p.upper : '',
          p.isForecast ? p.lower : '',
        ].join(','),
      ),
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'forecast.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400">Export</div>
      <p className="mt-1 text-sm text-slate-500">Download the forecast as CSV.</p>
      <button
        onClick={handleExport}
        className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Download CSV
      </button>
    </div>
  );
}
