import { ParsedSeries } from '../lib/csv';
import { ForecastResult } from '../lib/forecast';
import { formatNumber } from '../lib/format';

interface Props {
  series: ParsedSeries;
  result: ForecastResult;
}

export default function DataTable({ series, result }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-400">
          <tr>
            <th className="px-4 py-3">{series.dateColumn || 'Period'}</th>
            <th className="px-4 py-3 text-right">{series.valueColumn || 'Value'}</th>
            <th className="px-4 py-3 text-right">Forecast</th>
          </tr>
        </thead>
        <tbody>
          {result.points.slice(-24).map((p) => (
            <tr key={p.t} className="border-t border-slate-100">
              <td className="px-4 py-2">{series.labels[p.t] ?? p.t}</td>
              <td className="px-4 py-2 text-right">{formatNumber(p.value)}</td>
              <td className="px-4 py-2 text-right text-violet-600">
                {p.isForecast ? formatNumber(p.value) : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
