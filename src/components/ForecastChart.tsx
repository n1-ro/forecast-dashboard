import { ForecastResult } from '../lib/forecast';
import { ParsedSeries } from '../lib/csv';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  series: ParsedSeries;
  result: ForecastResult;
}

export default function ForecastChart({ series, result }: Props) {
  const data = result.points.map((p) => ({
    t: series.labels[p.t] ?? String(p.t),
    value: p.isForecast ? undefined : Math.round(p.value * 100) / 100,
    forecast: p.isForecast ? Math.round(p.value * 100) / 100 : undefined,
    upper: Math.round(p.upper * 100) / 100,
    lower: Math.round(p.lower * 100) / 100,
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 8, left: 12 }}>
          <defs>
            <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="fillForecast" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="t" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} width={60} />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="actual"
            name="Actual"
            stroke="#0ea5e9"
            fill="url(#fillActual)"
            dataKey="value"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="forecast"
            name="Forecast"
            stroke="#8b5cf6"
            fill="url(#fillForecast)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
