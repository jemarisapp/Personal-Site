#!/bin/bash
# Run this to push the resume sync commit to GitHub
cd "$(dirname "$0")"
git push origin main && echo "✓ Push complete" && rm -- "$0"
