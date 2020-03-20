#!/bin/sh

set -e
cd "${0%/*}/.."

echo "Running tests"

if npm run test; then
    echo "Tests passed. GOOD JOB!"
    exit 0
else
    echo "Tests failed, that's no good."
    exit 1
fi
