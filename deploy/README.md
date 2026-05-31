# Deploy Sources

This directory contains deploy-only source snapshots that should not be served by the public site.

## `pse-dashboard/`

Source for the private dashboard shell served at:

```text
https://dashboard.74.208.216.118.sslip.io/pse-dashboard/
```

The public Pilot Sales Enterprise site has its own nested dashboard copy at `pse-dashboard/`.
Keep these paths separate:

- `pse-dashboard/` -> public nested dashboard under `/pilot-sales-enterprise/pse-dashboard/`
- `deploy/pse-dashboard/` -> private dashboard shell under `/pse-dashboard/`

The deploy script excludes `deploy/` from public-site deploys.
