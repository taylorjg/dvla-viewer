#!/usr/bin/env bash

# Run via: npm run invoke:local
# Requires API_KEY in the environment.

set -euo pipefail

export SLS_AWS_SDK=3

echo "=== lookup ==="
serverless invoke local -f lookup -d '{"queryStringParameters": {"registrationNumber": "SS2"}}'
echo
