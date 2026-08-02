#!/usr/bin/env bash

# Run via: npm run invoke:curl
# Hits the deployed HTTP API (no AWS credentials required).

set -euo pipefail

DEPLOYED_URL="https://jen123ryri.execute-api.us-east-1.amazonaws.com"

echo "=== lookup ==="
curl -G "${DEPLOYED_URL}/api/lookup" --data-urlencode "registrationNumber=SS2" -s | jq
echo
