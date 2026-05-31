# Pilot Sales Enterprise

Static public website for Pilot Sales Enterprise. The public copy is limited to role-board information, WhatsApp application steps, and general sales-track descriptions.

## Pages

- `index.html` - public role board, four sales tracks, and WhatsApp application path
- `website-seller.html` - Website Seller role and WhatsApp application form
- `worker-registration.html` - worker intake form that receives name, email, WhatsApp, and shows the assigned employee number
- `about.html` - short public company overview
- `contact.html` - public contact paths
- `styles.css` - shared static styling
- `app.js` - WhatsApp application form handling
- `server.js` - local Node server that saves worker registrations and assigns employee numbers
- `assets/pse-logo.png` - local PSE logo used by the public site header and preview metadata

## Public Content Rules

- Do not add the removed lending track back.
- Keep health insurance copy framed as compliant lead or appointment generation unless licensed/authorized activity is explicitly approved.
- Do not publish private operating dashboards, customer examples, team metrics, revenue, applicant counts, or market-specific internal data.

## Local Preview

Run `npm start` from this folder, then open `http://localhost:4173/worker-registration.html`.

## VPS Route

The VPS runs this site as `pse-public-site.service` on local port `4175`.

The served copy lives at:

- `/srv/codex/repos/pilot-sales-enterprise`

Public route:

- `http://74.208.216.118/pilot-sales-enterprise/`

Worker registration route:

- `http://74.208.216.118/pilot-sales-enterprise/worker-registration.html`

Health check:

- `http://74.208.216.118/pilot-sales-enterprise/healthz`

The form posts to the relative path `api/worker-registration` so it works both locally and behind the `/pilot-sales-enterprise/` Caddy route.

Worker registrations are saved to:

- `/srv/codex/private/pilot-sales-enterprise/worker-registrations.json`
- `/srv/codex/private/pilot-sales-enterprise/worker-registrations.csv`

The managed VPS service sets `PSE_DATA_DIR` to keep private worker contact details outside the served website folder. For local preview without that environment variable, the app falls back to `data/`, which is ignored by git.
