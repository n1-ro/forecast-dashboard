import { ForecastResult } from '../lib/forecast';
import { ParsedSeries } from '../lib/csv';
import ForecastChart from './ForecastChart';
import MetricCard from './MetricCard';

interface Props {
  series: ParsedSeries;
  result: ForecastResult;
  horizon: number;
  onHorizonChange: (h: number) => void;
  stats: { rows: number; latest: number; growth: number | null };
}

export default function Dashboard({ series, result, horizon, onHorizonChange, stats }: Props) {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <MetricCard label="Rows" value={String(stats.rows)} />
        <MetricCard label="Latest value" value={stats.latest.toLocaleString()} />
        <MetricCard
          label="Growth"
          value={stats.growth === null ? '—' : `${stats.growth.toFixed(1)}%`}
        />
        <MetricCard
          label="MAE"
          value={result.mae === null ? '—' : result.mae.toLocaleString()}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">2. Forecast</h2>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            Horizon
            <select
              value={horizon}
              onChange={(e) => onHorizonChange(Number(e.target.value))}
              className="rounded-md border border-slate-300 px-2 py-1"
            >
              {[6, 12, 24, 52].map((h) => (
                <option key={h} value={h}>
                  {h} periods
                </option>
              ))}
            </select>
          </label>
        </div>
        <ForecastChart series={series} result={result} />
        <p className="mt-3 text-xs text-slate-400">
          Method: {result.method === 'linear_regression' ? 'linear regression' : 'moving average'}.
          Shaded band is the 95% confidence interval.
        </p>
      </div>
    </section>
  );
}
