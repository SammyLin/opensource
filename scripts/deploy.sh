#!/bin/bash
set -euo pipefail

# Manual deployment script for opensource.3mi.ai
# Deploys to Cloudflare Pages project: opensource-3mi

npx wrangler@4 pages deploy public --project-name opensource-3mi --branch main
