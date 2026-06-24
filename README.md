# Veylrio — Website

Production website for **Veylrio** — _Less Weight, More Momentum_.
A premium operations company that builds outbound infrastructure, systems, tracking, QA and dashboards for outbound-heavy teams.

Built as a server-rendered **Node.js + Express (MVC)** application with **Tailwind CSS** and **EJS**. No heavy frontend framework. Secure by default, fast, accessible, and SEO-ready.

---

## 1. Quick start (local)

**Requirements:** Node.js ≥ 18.18 (tested on Node 24) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file (defaults work as-is for local dev)
cp .env.example .env

# 3. Run in development (Tailwind watch + auto-reloading server)
npm run dev
```

Open **http://localhost:3000**.

> `npm run dev` runs two processes together: the Tailwind CSS watcher and the
> Express server (via `nodemon`). Edit a `.ejs` view or `src/styles/tailwind.css`
> and the page/CSS rebuilds automatically.

### Other scripts

| Script              | What it does                                                        |
| ------------------- | ------------------------------------------------------------------- |
| `npm run dev`       | CSS watch + dev server (development)                                |
| `npm run dev:server`| Dev server only                                                     |
| `npm run watch:css` | Rebuild `public/css/styles.css` on change                          |
| `npm run build:css` | One-off **minified** CSS build                                      |
| `npm start`         | Production: builds CSS (`prestart`) then runs with `NODE_ENV=production` |

### Production run

```bash
# Set real values in .env (NODE_ENV=production, SITE_URL, and the Gmail vars)
npm start
```

`NODE_ENV=production` enables HSTS, secure cookies and JSON logging.

---

## 2. Where the brand / logo assets live

The original brand package stays untouched in **`/Brand`** (source of truth). A curated subset is already copied into **`/public`** so the site works out of the box. If you re-export the brand kit, drop the SVGs into these locations:

| Use                              | File in `/public`                                  | Source in `/Brand/veylrio-logo-package/palette-B-teal-terracotta-PRIMARY` |
| -------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------- |
| Header logo (light bg)           | `logos/veylrio-horizontal-fullcolor.svg`           | `horizontal-lockup/svg/veylrio-horizontal-fullcolor.svg`                  |
| Footer logo (dark bg)            | `logos/veylrio-horizontal-reversed.svg`            | `horizontal-lockup/svg/veylrio-horizontal-reversed.svg`                   |
| Hero panel mark (dark)           | `logos/veylrio-mark-reversed.svg`                  | `mark/svg/veylrio-mark-reversed.svg`                                       |
| Primary / stacked / wordmark     | `logos/veylrio-*.svg`                              | matching `*/svg/*.svg`                                                     |
| Favicon (SVG + PNG)              | `favicon.svg`, `favicon-32.png`, `favicon-64.png` | `mark/svg/veylrio-mark-fullcolor.svg`, `mark/png/veylrio-favicon-*.png`    |
| Apple touch icon                 | `apple-touch-icon.png`                            | `mark/png/veylrio-app-icon-512.png`                                        |
| PWA icons                        | `images/icon-256.png`, `images/icon-512.png`       | `mark/png/veylrio-mark-fullcolor-{256,512}.png`                            |
| Background patterns              | `images/veylrio-pattern-*.svg`                     | `pattern/svg/*.svg` and `/Brand/veylrio-pattern-tile.svg`                  |
| Open Graph image                 | `images/veylrio-og.jpg`                            | `primary-lockup/jpg/veylrio-primary-reversed-on-dark-2400.jpg`            |

> **TODO before launch:** replace `public/images/veylrio-og.jpg` with a purpose-built **1200×630** social-share image (the current file is a brand JPG used as a placeholder).

**Logo usage rules** (enforced in the build, keep enforcing): SVG everywhere; horizontal lockup in the header; reversed logo on dark sections; the mark alone for favicons/small UI; never recolor, stretch, rotate, add shadows/gradients, or place the fullcolor logo on busy/dark imagery.

To switch to the **alternate** Espresso & Sage palette in a section, the tokens are already in `tailwind.config.js` (`espresso`, `sage`, `paperAlt`). Use sparingly.

---

## 3. Project structure

```
veylrio/
├─ app.js                     # Express app: middleware order, server, graceful shutdown
├─ tailwind.config.js         # Brand tokens (colors, fonts, shadows, container)
├─ postcss.config.js
├─ .env.example               # Copy to .env (never commit .env)
├─ config/
│  ├─ index.js                # Reads env once; the rest of the app never touches process.env
│  └─ site.js                 # ALL site content/data: nav, footer, solutions, copy, form options
├─ controllers/
│  ├─ pageController.js       # Home, Solutions, Why, Privacy, Terms, Thank-you (+ per-page SEO)
│  ├─ projectController.js    # Start-a-Project form: render, validate, notify, redirect
│  └─ seoController.js        # Dynamic robots.txt + sitemap.xml
├─ routes/
│  ├─ index.js                # Aggregates the route modules
│  ├─ pages.js · project.js · seo.js
├─ middleware/
│  ├─ security.js             # Helmet CSP + per-request nonce
│  ├─ csrf.js                 # Double-submit-cookie CSRF (provide + verify)
│  ├─ rateLimiter.js          # Form + global limiters
│  ├─ locals.js               # Shared view locals (site, icon, currentPath)
│  ├─ notFound.js · errorHandler.js
├─ validators/
│  └─ projectValidator.js     # express-validator rules + error collector
├─ utils/
│  ├─ icons.js                # Inline SVG line-icon set (CSP-clean, lightweight)
│  ├─ notifier.js             # Inquiry delivery (Gmail SMTP; records locally if unset)
│  ├─ logger.js · asyncHandler.js
├─ views/
│  ├─ layout.ejs              # HTML shell (express-ejs-layouts)
│  ├─ partials/               # head, header, footer, cta, structured-data
│  └─ pages/                  # home, solutions, why, start, thank-you, privacy, terms, 404, 500
├─ src/styles/tailwind.css    # Tailwind source + design-system component layer
└─ public/                    # Static: css (built), js, images, logos, favicons, manifest
```

### Editing copy

- **Structured content** (nav, footer, the 5 solution systems, process steps, audiences, FAQs, form options) lives in **`config/site.js`** — edit there and every page updates.
- **Prose** lives in the relevant `views/pages/*.ejs`.
- **Per-page SEO** (title, description, canonical path) lives in the controller for that page.

### Adding a future page (Case Studies, Blog, Packages, …)

1. Add content/data to `config/site.js` if reusable.
2. Add a view in `views/pages/`.
3. Add a controller handler + a route.
4. Add the path to `controllers/seoController.js` (`INDEXABLE`) and to the footer/nav in `config/site.js` if it should be linked.

---

## 4. Form handling & email

The **Start a Project** form posts to `/start-a-project`. The flow is:
`rate-limit → CSRF verify → validate/sanitise → notifier → 303 redirect to /thank-you`.

Delivery uses **Gmail SMTP** via `nodemailer` (`utils/notifier.js`):

- **Email is sent** when `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set. Gmail requires an **App Password** (Google Account → 2-Step Verification → App passwords) — not your normal password. Replies go to the submitter (`replyTo`).
- **If those are blank** (e.g. local dev), each inquiry is recorded to `logs/submissions.log` (git-ignored) and the console — **no email is sent**, nothing is lost.
- Every submission is always appended to the local log as a safety net, even when email is enabled.

---

## 5. Security checklist

| ✓ | Control | Where |
| - | ------- | ----- |
| ✅ | Secure HTTP headers (Helmet) | `middleware/security.js` |
| ✅ | Strict CSP, **no `unsafe-inline`**, per-request nonce for inline JSON-LD | `middleware/security.js`, `views/partials/structured-data.ejs` |
| ✅ | HSTS (production), `X-Content-Type-Options`, referrer policy, `frame-ancestors 'none'` | `middleware/security.js` |
| ✅ | `X-Powered-By` disabled | `app.js` |
| ✅ | CSRF protection (double-submit cookie: HttpOnly + SameSite + Secure, constant-time compare) | `middleware/csrf.js` |
| ✅ | Rate limiting on the form + global limiter | `middleware/rateLimiter.js` |
| ✅ | Server-side validation **and** sanitisation of every field | `validators/projectValidator.js` |
| ✅ | XSS defense: EJS auto-escaping (`<%= %>`) + `.escape()` on free-text | views + validator |
| ✅ | Honeypot anti-spam field | `views/pages/start.ejs`, validator, controller |
| ✅ | Body-size limits (`32kb`/`16kb`) + parameter limit | `app.js` |
| ✅ | Secure cookie flags: `HttpOnly`, `SameSite=Lax`, `Secure` (prod) | `middleware/csrf.js` |
| ✅ | Safe, internal-only redirects | `controllers/projectController.js` |
| ✅ | No stack traces leaked in production | `middleware/errorHandler.js` |
| ✅ | No hardcoded secrets; credentials via `dotenv` / env vars only | `config/index.js`, `.env.example` |
| ✅ | Graceful shutdown; async errors funneled to handler | `app.js`, `utils/asyncHandler.js` |
| ⏳ | **Serve over HTTPS** (terminate TLS at your proxy/host) | deployment |
| ⏳ | Run `npm audit` regularly; keep dependencies patched | ops |

---

## 6. SEO checklist

| ✓ | Item | Where |
| - | ---- | ----- |
| ✅ | Unique `<title>` + meta description per page | controllers + `partials/head.ejs` |
| ✅ | Canonical URL per page (from `SITE_URL`) | `partials/head.ejs` |
| ✅ | Open Graph + Twitter card tags | `partials/head.ejs` |
| ✅ | `Organization` + `WebSite` + `ProfessionalService` JSON-LD | `partials/structured-data.ejs` |
| ✅ | `FAQPage` JSON-LD on Why Veylrio | `views/pages/why.ejs` |
| ✅ | Dynamic `robots.txt` (references sitemap, disallows `/thank-you`) | `controllers/seoController.js` |
| ✅ | Dynamic `sitemap.xml` (indexable pages only) | `controllers/seoController.js` |
| ✅ | `noindex` on `/thank-you`, 404 and 500 | controllers + middleware |
| ✅ | One `<h1>` per page, logical heading order | views |
| ✅ | Descriptive, human-readable URLs | routes |
| ✅ | Image `alt` text / decorative SVGs marked `aria-hidden` | views |
| ✅ | `lang="en"`, mobile-first responsive, fast load | `layout.ejs`, Tailwind |
| ⏳ | Replace OG image with a true 1200×630 export | `public/images/veylrio-og.jpg` |
| ⏳ | Verify in Google Search Console + submit `sitemap.xml` after launch | ops |

---

## 7. Launch checklist

- [ ] Set production env: `NODE_ENV=production`, real `SITE_URL=https://veylrio.com`.
- [ ] Serve over **HTTPS** with HTTP→HTTPS redirect at the proxy/host.
- [ ] Set `GMAIL_USER` + `GMAIL_APP_PASSWORD` (Gmail App Password) and `INQUIRY_NOTIFY_TO`; send a real test submission.
- [ ] Replace `public/images/veylrio-og.jpg` with a 1200×630 social image; preview on Slack/X/LinkedIn.
- [ ] Confirm DNS, set up email for `contact@veylrio.com`, and add SPF/DKIM/DMARC for whatever sends mail.
- [ ] Have **Privacy Policy** and **Terms** reviewed by a legal professional (they are clean starters — see the on-page notes).
- [ ] Run Lighthouse (Performance / SEO / Accessibility / Best Practices) and a `npm audit`.
- [ ] Verify `robots.txt` and `sitemap.xml` on the live domain; submit the sitemap in Search Console.
- [ ] Test the form end-to-end on mobile + desktop, including validation and the thank-you redirect.
- [ ] Set up uptime monitoring and log shipping (the logger emits single-line JSON in production).
- [ ] Optional: self-host the Sora/Inter/Newsreader fonts to drop the Google Fonts dependency.

---

## 8. Accessibility & performance notes

- Semantic HTML, labelled form fields, `aria-describedby` on errored inputs, a skip link, visible focus rings, keyboard-operable mobile nav and FAQ, and `prefers-reduced-motion` support.
- Lightweight by design: server-rendered HTML, one small vanilla JS file, inline SVG icons (no icon font), purged + minified Tailwind, explicit image dimensions to avoid layout shift, and `font-display: swap`.

---

## 9. Tech decisions (the short version)

- **EJS + express-ejs-layouts** for clean server-rendered templating with a single shared layout.
- **Tailwind built via CLI** (not CDN) so production CSS is purged and minified, and the CSP can stay strict.
- **Custom double-submit-cookie CSRF** instead of a deprecated/heavy package — minimal dependencies, standard and auditable.
- **No database** — inquiries are recorded/forwarded; add persistence later only if needed.

---

© Veylrio. Brand assets in `/Brand` are proprietary.
