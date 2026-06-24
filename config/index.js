'use strict';

/**
 * Central runtime configuration.
 * All environment access happens here so the rest of the app never reads
 * process.env directly. Secrets come from .env (never committed).
 */

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProd = NODE_ENV === 'production';
const isDev = !isProd;

// Normalise the public origin (strip any trailing slash).
const SITE_URL = (process.env.SITE_URL || 'http://localhost:3000').replace(/\/+$/, '');

// Fail loudly in production if a real cookie secret was not provided.
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'veylrio-dev-cookie-secret-change-me';
if (isProd && COOKIE_SECRET === 'veylrio-dev-cookie-secret-change-me') {
  // eslint-disable-next-line no-console
  console.error('FATAL: COOKIE_SECRET must be set in production. See .env.example.');
  process.exit(1);
}

module.exports = {
  env: NODE_ENV,
  isProd,
  isDev,
  port: parseInt(process.env.PORT, 10) || 3000,
  siteUrl: SITE_URL,
  trustProxy: process.env.TRUST_PROXY === '1' || process.env.TRUST_PROXY === 'true',
  cookieSecret: COOKIE_SECRET,
  contactEmail: process.env.CONTACT_EMAIL || 'contact@veylrio.com',
  // Inquiry handling
  inquiry: {
    notifyTo: process.env.INQUIRY_NOTIFY_TO || process.env.CONTACT_EMAIL || 'contact@veylrio.com',
    mailProvider: (process.env.MAIL_PROVIDER || 'log').toLowerCase(),
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: parseInt(process.env.SMTP_PORT, 10) || 587,
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
      from: process.env.SMTP_FROM || 'Veylrio <no-reply@veylrio.com>',
    },
    sendgridApiKey: process.env.SENDGRID_API_KEY || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
  },
};
