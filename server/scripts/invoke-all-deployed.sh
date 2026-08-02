#!/usr/bin/env bash

# Run via: npm run invoke:deployed
# Requires AWS credentials, a deployed stack, and API_KEY in the environment.

set -euo pipefail

export SLS_AWS_SDK=3

echo "=== lookup ==="
serverless invoke -f lookup -d '{"queryStringParameters": {"registrationNumber": "SS2"}}'
echo
