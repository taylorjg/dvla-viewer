[![CI/CD](https://github.com/taylorjg/dvla-viewer/actions/workflows/ci-cd.yaml/badge.svg)](https://github.com/taylorjg/dvla-viewer/actions/workflows/ci-cd.yaml)

# Description

A React app that looks up vehicle details by registration number via the [DVLA Vehicle Enquiry Service (VES) API](https://developer-portal.driver-vehicle-licensing.api.gov.uk/apis/vehicle-enquiry-service/vehicle-enquiry-service-description.html).

- **Deployed site:** https://taylorjg.github.io/dvla-viewer
- **Backend:** AWS Lambda in [`server/`](server/README.md) (API key stays server-side)

# Development

Frontend (repo root):

```bash
npm ci
npm run dev               # Vite dev server
npm run lint              # ESLint (includes Prettier)
npm test                  # Vitest + MSW (src/ only)
npm run test:cypress      # Cypress end-to-end tests
```

The server backend has its own toolchain — see [server/README.md](server/README.md).

# CI

GitHub Actions (`.github/workflows/ci-cd.yaml`) runs on every push and pull request:

| Job | What it runs |
|---|---|
| Run lint check and unit tests | `npm run lint`, `npm test` (frontend) |
| Run end-to-end tests | Cypress against `npm run dev` |
| Run server checks | `cd server && npm run check` |

All three jobs are required for merges to `main`.

Deploy to gh-pages runs when a version tag is pushed, after the frontend jobs pass.

Server CI needs repository secrets `API_KEY` and `SERVERLESS_ACCESS_KEY` — see [server/README.md](server/README.md).

# Technologies

* Vite & React
* Material UI
* TanStack Query & axios
* Vitest, React Testing Library & Mock Service Worker
* Cypress & Cypress Testing Library
* GitHub Actions
* Serverless Framework (backend in `server/`)

# Screenshots

## Phone (Portrait)

![Alt text](screenshots/screenshot-phone-portrait.png)

## Phone (Landscape)

![Alt text](screenshots/screenshot-phone-landscape.png)
