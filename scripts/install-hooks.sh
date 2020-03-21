#!/bin/sh

GIT_DIR=$(git rev-parse --git-dir)

echo "Installing hooks..."

cp ./pre-commit.sh "$GIT_DIR"/hooks/pre-commit
cp ./commit-msg.js "$GIT_DIR"/hooks/commit-msg

echo Done!
