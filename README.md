# Forecast Dashboard

Time-series forecasting and analytics dashboard for non-technical teams. Upload a CSV of historical metrics, pick a forecast horizon, and get a projected trend with confidence bands — no data-science background required.

Built as a modern single-page app with a small, dependency-light forecasting engine (moving average + linear regression baseline) that runs entirely in the browser.

## Features

- CSV import with automatic date/value column detection
- Baseline forecasts (moving average + linear regression) with confidence bands
- Interactive charts (line, area) with zoom and tooltips
- Seasonality detection hint and metric summary cards
- Fully client-side — data never leaves the browser

## Tech stack

- TypeScript
- React 18 + Vite
- Tailwind CSS + shadcn/ui primitives
- Recharts
- Vitest for the forecasting engine

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run test     # forecasting engine unit tests
npm run build    # production build
```

## Project structure

```
src/
  lib/
    forecast.ts        # forecasting engine (MA + linear regression)
    csv.ts             # CSV parsing + column detection
    stats.ts           # mean, stddev, confidence helpers
  components/
    Dashboard.tsx
    ForecastChart.tsx
    UploadPanel.tsx
    MetricCard.tsx
  App.tsx
```
