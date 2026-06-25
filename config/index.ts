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

const contactEmail = process.env.CONTACT_EMAIL || 'contact@veylrio.com';

export interface MailConfig {
  user: string;
  pass: string;
  fromName: string;
  notifyTo: string;
}

export interface AppConfig {
  env: string;
  isProd: boolean;
  isDev: boolean;
  port: number;
  siteUrl: string;
  contactEmail: string;
  mail: MailConfig;
}

const config: AppConfig = {
  env: NODE_ENV,
  isProd,
  isDev,
  port: parseInt(process.env.PORT || '', 10) || 3000,
  siteUrl: SITE_URL,
  contactEmail,
  // Inquiry notifications via Gmail SMTP. Leave the Gmail vars blank in
  // development to just record submissions locally (no email is sent).
  mail: {
    user: process.env.GMAIL_USER || '',
    pass: process.env.GMAIL_APP_PASSWORD || '',
    fromName: process.env.MAIL_FROM_NAME || 'Veylrio Website',
    notifyTo: process.env.INQUIRY_NOTIFY_TO || contactEmail,
  },
};

export default config;
