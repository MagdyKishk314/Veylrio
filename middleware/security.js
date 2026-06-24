'use strict';

const crypto = require('crypto');
const helmet = require('helmet');
const config = require('../config');

/**
 * Security headers.
 *
 * 1) A per-request CSP nonce is generated and exposed as res.locals.cspNonce.
 *    Any inline <script> (e.g. JSON-LD) must carry nonce="<%= cspNonce %>".
 * 2) Helmet applies a strict Content-Security-Policy plus sensible defaults
 *    (HSTS in production, no-sniff, frameguard via frame-ancestors, etc.).
 *
 * The CSP avoids 'unsafe-inline' entirely: styles are a single first-party
 * stylesheet (plus Google Fonts), scripts are first-party + nonce only.
 */

function cspNonce(req, res, next) {
  res.locals.cspNonce = crypto.randomBytes(16).toString('base64');
  next();
}

const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`],
      styleSrc: ["'self'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      formAction: ["'self'"],
      manifestSrc: ["'self'"],
      // Force HTTPS sub-resources in production only.
      upgradeInsecureRequests: config.isProd ? [] : null,
    },
  },
  // Lock the referrer to origin to avoid leaking full paths to third parties.
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  // Cross-origin isolation defaults that don't break Google Fonts.
  crossOriginEmbedderPolicy: false,
  // 180-day HSTS, applied by browsers only over HTTPS.
  hsts: config.isProd
    ? { maxAge: 15552000, includeSubDomains: true, preload: false }
    : false,
});

module.exports = [cspNonce, helmetMiddleware];
