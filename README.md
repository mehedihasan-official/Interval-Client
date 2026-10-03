# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc/README.md) uses [SWC](https://swc.rs/) for Fast Refresh

# Interval-Client

* Here are the Project Details:

## QA-only slow mode <!-- SLOW-MODE (remove later) -->

Slow mode is for internal QA on local development, Vercel Preview deployments, or an explicitly marked staging build only. It is hard-gated off on Vercel Production. Do not enable it for production users. <!-- SLOW-MODE (remove later) -->

### Configure <!-- SLOW-MODE (remove later) -->

Copy `.env.example` to a local env file to test locally, or configure these variables on Vercel Preview only: <!-- SLOW-MODE (remove later) -->

- `VITE_SLOW_MODE=true` enables the QA delay; missing or `false` disables it. <!-- SLOW-MODE (remove later) -->
- `VITE_SLOW_DELAY_MS=6000` sets the base delay. The delay varies by +/- 30%. Client API calls grow by 10% per call in the session, capped at 3x the base delay. <!-- SLOW-MODE (remove later) -->
- `VITE_RESORT_NAV_DELAY_MS=14000` delays resort-card navigation; `VITE_SEARCH_DELAY_MS=14000` delays search results. Both default to 14 seconds, use the full-screen loading spinner, and do not show a countdown. <!-- SLOW-MODE (remove later) -->
- `VITE_APP_ENV=staging` may be used to allow a non-Vercel staging build. It cannot override the Vercel Production hard-disable. <!-- SLOW-MODE (remove later) -->

The application uses Vite, so browser-visible variables use the `VITE_` prefix. Vite variables are bundled into client code and must never contain secrets. <!-- SLOW-MODE (remove later) -->

### Bypass and disable <!-- SLOW-MODE (remove later) -->

- Open `/?dev=on` on an allowed QA deployment to set `localStorage.dev_bypass=true`; the query parameter is removed from the address bar. <!-- SLOW-MODE (remove later) -->
- Open `/?dev=off` to clear the bypass. <!-- SLOW-MODE (remove later) -->
- Set `VITE_SLOW_MODE=false` or remove it to disable slow mode. Vercel Production is disabled regardless of this flag. <!-- SLOW-MODE (remove later) -->

This bypass is a convenience for internal QA, not an access-control mechanism. Protect Preview deployments with Vercel Deployment Protection. <!-- SLOW-MODE (remove later) -->

### Remove slow mode <!-- SLOW-MODE (remove later) -->

Remove the `SLOW-MODE` marked imports and wrapper from `src/main.jsx`, delete `src/utils/slowMode.jsx`, remove the `VERCEL_ENV` define and `node:process` import from `vite.config.js`, remove the slow-mode entries from `.env.example`, and remove this README section. <!-- SLOW-MODE (remove later) -->
