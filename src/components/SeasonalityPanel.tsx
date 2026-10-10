import { SeasonalityInfo } from '../lib/seasonality';

interface Props {
  seasonality: SeasonalityInfo;
}

export default function SeasonalityPanel({ seasonality }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400">Seasonality</div>
      <div className="mt-1 text-lg font-semibold">{seasonality.label}</div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-sky-500"
          style={{ width: `${Math.round(seasonality.strength * 100)}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-400">
        Detected period: {seasonality.period === 1 ? 'none' : `${seasonality.period} points`}
      </p>
    </div>
  );
}
