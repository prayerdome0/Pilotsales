# Pilot Sales Enterprise

Static public website for Pilot Sales Enterprise. The public copy is limited to role-board information, one general sales applicant intake, and general sales-field descriptions.

## Pages

- `index.html` - public role board, sales-field overview, and quick applicant intake
- `website-seller.html` - Website Seller role and WhatsApp application form
- `sales-applicant-intake.html` - general sales applicant form; PSE assigns the field internally
- `worker-registration.html` - worker intake form that receives name, email, WhatsApp, and shows the assigned employee number
- `about.html` - short public company overview
- `contact.html` - public contact paths
- `styles.css` - shared static styling
- `app.js` - public form handling
- `server.js` - local Node server that saves worker registrations and sales applicants
- `assets/pse-logo.png` - local PSE logo used by the public site header and preview metadata

## Public Content Rules

- Do not add the removed lending track back.
- Keep insurance copy framed as compliant support or appointment generation unless licensed/authorized activity is explicitly approved.
- Applicants do not choose a field on the intake form. PSE assigns the field internally after review.
- Do not publish private operating dashboards, customer examples, team metrics, revenue, applicant counts, or market-specific internal data.

## Local Preview

Run `npm start` from this folder, then open `http://localhost:4173/apply`.

## VPS Route

The VPS runs this site as `pse-public-site.service` on local port `4175`.

The served copy lives at:

- `/srv/codex/repos/pilot-sales-enterprise`

Public route:

- `http://74.208.216.118/pilot-sales-enterprise/`

Worker registration route:

- `http://74.208.216.118/pilot-sales-enterprise/worker-registration.html`

Sales applicant intake route:

- `http://74.208.216.118/pilot-sales-enterprise/apply`
- `http://74.208.216.118/pilot-sales-enterprise/sales-applicant-intake.html`

Health check:

- `http://74.208.216.118/pilot-sales-enterprise/healthz`

The sales applicant form posts to `api/sales-applicant-intake`; worker registration posts to `api/worker-registration`. Both work locally and behind the `/pilot-sales-enterprise/` Caddy route.

Worker registrations are saved to:

- `/srv/codex/private/pilot-sales-enterprise/worker-registrations.json`
- `/srv/codex/private/pilot-sales-enterprise/worker-registrations.csv`

Sales applicants are saved to:

- `/srv/codex/private/pilot-sales-enterprise/sales-applicants.json`
- `/srv/codex/private/pilot-sales-enterprise/sales-applicants.csv`

The managed VPS service sets `PSE_DATA_DIR` to keep private worker contact details outside the served website folder. For local preview without that environment variable, the app falls back to `data/`, which is ignored by git.
