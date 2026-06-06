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

This portfolio is configured as the root GitHub Pages user site:

- Repository: `0xEbrahim/0xEbrahim.github.io`
- URL: `https://0xEbrahim.github.io/`
- Vite base: `base: "/"`
- Pages source: GitHub Actions

The GitHub Actions Pages workflow builds and deploys the contents of `dist/`.
