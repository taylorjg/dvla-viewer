#!/usr/bin/env bash
set -euo pipefail

PORT=4173
URL="http://localhost:${PORT}/dvla-viewer"
OUT_DIR="a11y"

npm run build

npm run preview -- --port "${PORT}" --strictPort &
PREVIEW_PID=$!
trap 'kill "${PREVIEW_PID}" 2>/dev/null || true' EXIT

npx wait-on "${URL}"

mkdir -p "${OUT_DIR}"

npx lighthouse "${URL}" \
  --only-categories=accessibility \
  --chrome-flags="--headless" \
  --output=html,json \
  --output-path="./${OUT_DIR}/lighthouse-report" \
  --quiet

node -e "
const report = require('./${OUT_DIR}/lighthouse-report.report.json');
console.log('Accessibility score:', Math.round(report.categories.accessibility.score * 100));
"
echo "Report: ${OUT_DIR}/lighthouse-report.report.html"
