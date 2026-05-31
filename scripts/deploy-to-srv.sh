#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-all}"
APPLY="${2:-}"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC_TARGET="/srv/codex/repos/pilot-sales-enterprise"
DASHBOARD_TARGET="/srv/codex/repos/pse-dashboard"
DASHBOARD_SOURCE="${PSE_DASHBOARD_SOURCE:-$REPO_ROOT/deploy/pse-dashboard}"

RSYNC_FLAGS=(-rvc --itemize-changes)
if [[ "$APPLY" != "--apply" ]]; then
  RSYNC_FLAGS+=(--dry-run)
fi

usage() {
  cat <<'EOF'
Usage:
  scripts/deploy-to-srv.sh [public|dashboard|all] [--apply]

Default is dry-run. Add --apply only after reviewing the listed changes.

Modes:
  public     Deploy public site files to /srv/codex/repos/pilot-sales-enterprise
  dashboard  Deploy private dashboard shell from deploy/pse-dashboard,
             preserving operations-hub/assets/backups
  all        Run public and dashboard deploys
EOF
}

require_target() {
  local target="$1"
  if [[ ! -d "$target" ]]; then
    echo "Missing target directory: $target" >&2
    exit 1
  fi
}

deploy_public() {
  require_target "$PUBLIC_TARGET"
  echo "==> Public site: $REPO_ROOT -> $PUBLIC_TARGET"
  rsync "${RSYNC_FLAGS[@]}" \
    --exclude '.git/' \
    --exclude 'data/' \
    --exclude 'deploy/' \
    --exclude 'scripts/' \
    --exclude 'node_modules/' \
    --exclude '.env' \
    "$REPO_ROOT"/ "$PUBLIC_TARGET"/
}

deploy_dashboard() {
  require_target "$DASHBOARD_TARGET"
  require_target "$DASHBOARD_SOURCE"
  echo "==> Dashboard shell: $DASHBOARD_SOURCE -> $DASHBOARD_TARGET"
  rsync "${RSYNC_FLAGS[@]}" "$DASHBOARD_SOURCE/index.html" "$DASHBOARD_TARGET/index.html"
  rsync "${RSYNC_FLAGS[@]}" "$DASHBOARD_SOURCE/app.js" "$DASHBOARD_TARGET/app.js"
  rsync "${RSYNC_FLAGS[@]}" "$DASHBOARD_SOURCE/styles.css" "$DASHBOARD_TARGET/styles.css"
}

case "$MODE" in
  public)
    deploy_public
    ;;
  dashboard)
    deploy_dashboard
    ;;
  all)
    deploy_public
    deploy_dashboard
    ;;
  -h|--help|help)
    usage
    exit 0
    ;;
  *)
    usage >&2
    exit 2
    ;;
esac

if [[ "$APPLY" != "--apply" ]]; then
  echo
  echo "Dry run only. Re-run with --apply to change files."
fi
