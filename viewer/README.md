# SD3-WF Viewer

The viewer is the interactive web application for SD3-WF. It renders the grid topology, building/battery data, and cyber network traffic for a set of pre-recorded attack/mitigation scenarios so learners can explore how a cyber attack propagates through a distributed energy resource (DER) deployment.

It is a static single-page application built with [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5) and TypeScript, using `@sveltejs/adapter-static` to produce a fully static `build/` directory. There is no backend server or API — all data is fetched as static protobuf binary files and decoded entirely in the browser.

## Data

All grid, building, battery, and cyber-network data consumed by the viewer is provided as binary [Protocol Buffers](https://protobuf.dev/) (`.buff`) files, defined by the schemas in `../proto/`:

- `static/feeders/feeder.buff` — the static grid topology (buses, lines, loads, capacitors, transformers, regulators).
- `static/scenarios/*.buff` — one file per scenario (e.g. `baseline`, `api-attack`, `api-mitigation`, `dns-attack`, `dns-mitigation`), each containing time-series grid, battery, building, and cyber traffic data for that scenario.

These files are provided in the repository — no separate data-generation step is required to run or build the viewer.

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm (bundled with Node.js)

## Local development

Install dependencies and start a dev server with hot reloading:

```sh
npm install
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Create a production build:

```sh
npm run build
```

This writes a fully static site to `build/`. The `prebuild` step automatically regenerates the TypeScript protobuf bindings in `src/lib/generated/` from `../proto/*.proto` before building.

Preview the production build locally:

```sh
npm run preview
```

## Testing and linting

```sh
npm run check     # type-check
npm run lint       # oxlint
npm run test:unit   # vitest unit/component tests
npm run test:e2e    # playwright end-to-end tests
npm run test        # unit + e2e
```

## Deployment

Because the build output in `build/` is a plain static site (HTML/CSS/JS + the `.buff` data files), it can be deployed to any static file host. There is nothing viewer-specific about the hosting environment — the same `build/` directory works everywhere.

### Automated: GitHub Pages

Pushing to `main` triggers `.github/workflows/deploy.yml`, which installs dependencies, runs `npm run build` in `viewer/`, and publishes `build/` to GitHub Pages. The workflow sets `BASE_PATH` to the repository name so the app is served correctly from a GitHub Pages project subpath (`https://<org>.github.io/<repo>/`).

### Manual / local static server

To serve a production build locally (e.g. to sanity-check before deploying elsewhere):

```sh
npm run build
npm run preview
```

Or serve `build/` with any static file server, for example:

```sh
npx serve build
```

### Other static hosting platforms

Since the output is a static SPA, it can be deployed the same way to most static hosting providers:

- **Netlify / Vercel / Cloudflare Pages**: point the project at the `viewer/` directory, set the build command to `npm run build` and the publish/output directory to `viewer/build`.
- **S3 + CloudFront (or any object storage + CDN)**: run `npm run build`, then sync the contents of `build/` to the bucket. Configure the CDN/bucket to serve `index.html` as the SPA fallback (the app uses client-side routing).
- **nginx / Apache / Docker**: run `npm run build`, then serve the static contents of `build/` directly (e.g. `nginx` `root` pointed at `build/`, or a minimal Docker image based on `nginx:alpine` that `COPY`s `build/` into the web root). Configure a fallback so unknown paths resolve to `index.html`.

### Subpath hosting

If the app will be served from a subpath (e.g. `https://example.com/viewer/` rather than the domain root), set the `BASE_PATH` environment variable before building:

```sh
BASE_PATH="/viewer" npm run build
```

If serving from the domain root, omit `BASE_PATH` (or leave it unset).

## Project structure

```
viewer/
├── src/
│   ├── lib/
│   │   ├── generated/     # auto-generated protobuf bindings (do not edit by hand)
│   │   ├── feeder.ts      # grid topology model, decoded from feeder.buff
│   │   ├── scenario.ts    # per-scenario time-series model, decoded from scenarios/*.buff
│   │   ├── cyber.ts       # cyber/network traffic model
│   │   ├── state.svelte.ts  # global app state: loads feeder + scenario data on init
│   │   ├── charts/        # D3-based chart components (line/area, chord diagram, maps)
│   │   └── components/    # shared Svelte UI components
│   └── routes/            # SvelteKit pages (dashboard, grid, cyber, batteries, buildings)
├── static/
│   ├── feeders/feeder.buff       # grid topology data
│   └── scenarios/*.buff          # per-scenario time-series data
└── package.json
```
