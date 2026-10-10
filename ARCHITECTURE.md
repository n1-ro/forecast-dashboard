# Architecture

`forecast-dashboard` is a fully client-side single-page app. There is no backend:
data is parsed and forecast in the browser, and nothing leaves the machine.

## Data flow

```
CSV file ──► csv.parseCsv() ──► ParsedSeries { labels, values }
                    │
                    ▼
          validation.validateSeries()
                    │
                    ▼
          forecast.forecast(values, horizon, method)
                    │
                    ▼
          ForecastResult { points, method, slope, mae }
                    │
                    ▼
        React components (chart, table, export)
```

## Modules

| Module | Responsibility |
|---|---|
| `lib/csv.ts` | CSV parsing + date/value column detection |
| `lib/forecast.ts` | Forecasting engine (linear regression + moving average) |
| `lib/seasonality.ts` | Lag-based autocorrelation for seasonality detection |
| `lib/validation.ts` | Input validation + horizon clamping |
| `lib/stats.ts` | mean/stddev/growth helpers |
| `lib/format.ts` | number/percent/compact formatting |

## Forecasting

The engine uses **linear regression** as the primary method, with a
**moving-average** fallback for flat series. Confidence bands are a 95% interval
derived from the residual spread (1.96 σ). The mean absolute error (MAE) is
reported over the training window.

## Testing

Unit tests (Vitest) cover the engine, CSV parser, seasonality, and validation.
Run with `npm run test`.
