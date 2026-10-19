#!/bin/sh
set -eu

repo_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$repo_dir"
archive=.upgrade-backups/pre-upgrade-2026-10-17/source.tar.gz
expected=907bd91d5a6e765651f15888cfdc0a1dc30b539621dbca0130f5140c6530e457
actual=$(shasum -a 256 "$archive" | cut -d ' ' -f 1)
[ "$actual" = "$expected" ] || { echo 'Backup checksum mismatch; nothing restored.' >&2; exit 1; }

# Preserve subsequent edits before restoring the pre-upgrade source tree.
snapshot_dir=$(mktemp -d "$repo_dir/.upgrade-backups/before-rollback.XXXXXX")
tar --exclude='./.git' --exclude='./node_modules' --exclude='./.next' \
    --exclude='./.next-e2e' --exclude='./out' --exclude='./.idea' \
    --exclude='./.upgrade-backups' --exclude='./test-results' \
    --exclude='./playwright-report' -czf "$snapshot_dir/source.tar.gz" .

docker compose -f docker/docker-compose.yml stop node
tar -xzf "$archive" -C "$repo_dir"
# Only files introduced by this upgrade; originals are restored by the archive.
rm -f eslint.config.mjs playwright.config.ts docker/compose.e2e.yml \
    tests/e2e/storefront.spec.ts tests/fixtures/api.mjs tests/fixtures/catalog.mjs
docker compose -f docker/docker-compose.yml run --rm --no-deps node npm ci
docker compose -f docker/docker-compose.yml up -d node
echo "Pre-upgrade sources restored. Later edits saved in $snapshot_dir/source.tar.gz"
