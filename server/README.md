# Server

AWS Lambda backend for [dvla-viewer](../README.md). A single handler proxies the [DVLA Vehicle Enquiry Service (VES) API](https://developer-portal.driver-vehicle-licensing.api.gov.uk/apis/vehicle-enquiry-service/vehicle-enquiry-service-description.html) so the browser never sees the API key.

Built with [Serverless Framework](https://www.serverless.com/framework) v4 on Node.js 24.

## API

| Endpoint | Method | Query params | Description |
|---|---|---|---|
| `/api/lookup` | GET | `registrationNumber` | Look up vehicle details by registration |

### Example

```bash
curl -G "https://jen123ryri.execute-api.us-east-1.amazonaws.com/api/lookup" \
  --data-urlencode "registrationNumber=SS2" -s | jq
```

## Prerequisites

- Node.js 24 (see repo-root `.nvmrc`)
- AWS credentials configured for deploy (`profile: taylorjg` in `serverless.yml`)
- [Serverless Framework](https://www.serverless.com) v4 login or access key for CLI use
- DVLA VES API key (`API_KEY`)

## Setup

Create `server/.env` (gitignored) with your DVLA API key:

```
API_KEY=your-ves-api-key
```

```bash
npm ci
```

## Development

```bash
npm run lint              # ESLint (includes Prettier)
npm test                  # Handler integration test (live DVLA API)
npm run invoke:local      # Smoke-test via serverless invoke local
npm run check             # lint + test + invoke:local (same as CI)
```

Post-deploy smoke tests (manual — requires AWS credentials and a deployed stack):

```bash
npm run invoke:deployed   # Invoke deployed Lambda
npm run invoke:curl       # Hit deployed HTTP API
npm run logs              # Tail CloudWatch logs for lookup
```

| Command | Network | Secrets / credentials |
|---|---|---|
| `npm test` | Yes (DVLA API) | `API_KEY` |
| `npm run invoke:local` | Yes (DVLA API) | `API_KEY`, `SERVERLESS_ACCESS_KEY` |
| `npm run invoke:deployed` | Yes (DVLA API + AWS) | `API_KEY`, AWS profile, `SERVERLESS_ACCESS_KEY` |
| `npm run invoke:curl` | Yes (deployed API) | None (uses URL in script) |

Helper scripts live in `scripts/` (`invoke-all-local.sh`, `invoke-all-deployed.sh`, `curl-all.sh`).

Integration tests use registration `SS2`, a [DVLA test registration](https://developer-portal.driver-vehicle-licensing.api.gov.uk/apis/vehicle-enquiry-service/vehicle-enquiry-service-description.html).

## Deploy

```bash
npm run deploy
npm run info
```

Deploy scripts set `SLS_AWS_SDK=3` for AWS SDK v3 compatibility with Serverless v4.

## CI

The monorepo workflow (`.github/workflows/ci-cd.yml`) runs `npm run check` in this directory as the **`server-check`** job. That job is required for merges to `main`.

CI requires repository secrets:

| Secret | Description |
|---|---|
| `API_KEY` | DVLA VES API key |
| `SERVERLESS_ACCESS_KEY` | Serverless Framework v4 CLI authentication |

Frontend tests run separately at the repo root; root `npm test` is scoped to `src/` only and does not include these server integration tests.

## Project layout

```
src/lookup.js           Lambda handler
src/serverless-utils.js Shared HTTP/error helpers
serverless.yml          Stack definition (function key: lookup)
tests/                  Handler integration tests
scripts/                Local invoke and curl helpers
```
