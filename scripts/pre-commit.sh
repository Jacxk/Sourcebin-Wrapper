#!/bin/sh

DIR=./scripts

echo "Running pre-commit hook"

if $DIR/run-tests.sh; then
    echo "Proceeding with commit"
else
    echo "Tests must pass before commit!"
    exit 1
fi
