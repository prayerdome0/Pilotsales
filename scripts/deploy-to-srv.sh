#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-all}"
APPLY="${2:-}"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC_TARGET="/srv/codex/repos/pilot-sales-enterprise"
DASHBOARD_TARGET="/srv/codex/repos/pse-dashboard"
DASHBOARD_SOURCE="${PSE_DASHBOARD_SOURCE:-$REPO_ROOT/deploy/pse-dashboard}"
HEALTH_CHECK="${PSE_DEPLOY_HEALTH_CHECK:-/srv/codex/services/pse-maintenance/scripts/pse-vps-health-check.sh}"

ROUTE_CHECKS=(
  "public site|https://dashboard.74.208.216.118.sslip.io/pilot-sales-enterprise/|200"
  "public nested dashboard|https://dashboard.74.208.216.118.sslip.io/pilot-sales-enterprise/pse-dashboard/|200"
  "private dashboard auth gate|https://dashboard.74.208.216.118.sslip.io/pse-dashboard/|302"
  "sensitive dashboard guard|https://dashboard.74.208.216.118.sslip.io/pse-dashboard/trust-copies/test.pdf|404"
)

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

http_status() {
  local url="$1"
  curl -k -sS -o /dev/null -w '%{http_code}' --max-time 12 "$url"
}

run_health_check() {
  if [[ ! -x "$HEALTH_CHECK" ]]; then
    echo "Missing executable health check: $HEALTH_CHECK" >&2
    return 1
  fi

  if [[ "$EUID" -eq 0 ]]; then
    "$HEALTH_CHECK"
  else
    sudo "$HEALTH_CHECK"
  fi
}

post_apply_checks() {
  local failures=0
  local spec label url expected actual

  echo
  echo "==> Post-deploy route checks"
  for spec in "${ROUTE_CHECKS[@]}"; do
    IFS='|' read -r label url expected <<<"$spec"
    if ! actual="$(http_status "$url")"; then
      echo "FAIL $label: curl failed for $url" >&2
      failures=$((failures + 1))
      continue
    fi

    if [[ "$actual" != "$expected" ]]; then
      echo "FAIL $label: expected HTTP $expected, got $actual ($url)" >&2
      failures=$((failures + 1))
    else
      echo "OK $label: HTTP $actual"
    fi
  done

  echo
  echo "==> Post-deploy VPS health check"
  if ! run_health_check; then
    failures=$((failures + 1))
  fi

  if (( failures > 0 )); then
    echo
    echo "Post-deploy checks failed with $failures issue(s)." >&2
    exit 1
  fi

  echo
  echo "Post-deploy checks passed."
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
else
  post_apply_checks
fi
