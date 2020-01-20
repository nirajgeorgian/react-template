#!/usr/bin/env bash

echo "----- Running pre-push hook -----"
./scripts/run-tests.sh

# $? store exit value of the last command
if [ $? -ne 0 ]; then
  echo "----- All tests must pass before pushing -----"
  exit 1
fi
