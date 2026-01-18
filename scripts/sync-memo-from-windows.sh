#!/usr/bin/env bash
set -euo pipefail

# Windows側のObsidian Vault（WSLから見えるパス）
WIN_VAULT="/mnt/c/Users/hashi/Documents/obsidian"
POSTS_SRC="${WIN_VAULT}/Publish/posts"
ASSETS_SRC="${WIN_VAULT}/Publish/assets"

test -d "$POSTS_SRC" || (echo "Missing: $POSTS_SRC" && exit 1)
test -d "$ASSETS_SRC" || (echo "Missing: $ASSETS_SRC" && exit 1)

rm -rf content/posts
mkdir -p content/posts
rsync -av --delete "${POSTS_SRC}/" "content/posts/"

rm -rf public/assets
mkdir -p public/assets
rsync -av --delete "${ASSETS_SRC}/" "public/assets/"

echo "Synced Windows Publish -> blog content/public"