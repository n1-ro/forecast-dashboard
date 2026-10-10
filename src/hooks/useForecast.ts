import { useMemo, useState } from 'react';
import { ParsedSeries } from '../lib/csv';
import { forecast, ForecastMethod } from '../lib/forecast';
import { analyzeSeasonality } from '../lib/seasonality';
import { clampHorizon, validateSeries } from '../lib/validation';

export function useForecast(series: ParsedSeries | null) {
  const [horizon, setHorizon] = useState(12);
  const [method, setMethod] = useState<ForecastMethod>('linear_regression');

  const validation = useMemo(
    () => (series ? validateSeries(series.labels, series.values) : null),
    [series],
  );

  const seasonality = useMemo(
    () => (series ? analyzeSeasonality(series.values) : null),
    [series],
  );

  const result = useMemo(() => {
    if (!series || !validation?.valid) return null;
    return forecast(series.values, clampHorizon(horizon), method);
  }, [series, horizon, method, validation]);

  return {
    horizon,
    setHorizon,
    method,
    setMethod,
    validation,
    seasonality,
    result,
  };
}
