# 0xControlPlane Portfolio

A frontend-only personal portfolio for backend engineer Ibrahim El-Sayed (`0xEbrahim`). The interface is designed as a futuristic infrastructure control plane, combining terminal UI, service monitoring, architecture diagrams, and engineering telemetry.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Lucide React
- Static local data only

## Requirements

- Node.js 22 or newer
- npm 10 or newer

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production-ready static files are generated in `dist/`.

## Preview

```bash
npm run preview
```

## GitHub Pages Deployment

The Vite base path is configured in `vite.config.ts`.

- For a user site such as `0xEbrahim.github.io`, keep `base: "/"`.
- For this project site, `vite.config.ts` uses `base: "/Ninja-portfolio/"`.

Build the site, then deploy the contents of `dist/` through GitHub Pages or a GitHub Actions Pages workflow.
# Ninja-portfolio
