#!/usr/bin/env bash

GIT_DIR=$(git rev-parse --git-dir)

echo "----- Installing hooks -----"
# this command will create a symlink to our custom
ln -s ./scripts/pre-commit.sh $GIT_DIR/hooks/pre-push
echo "----- Done -----"
