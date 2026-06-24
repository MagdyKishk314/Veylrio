'use strict';

const fs = require('fs');
const path = require('path');
const config = require('../config');
const logger = require('./logger');

/**
 * Inquiry notifier.
 *
 * The "Start a Project" form delivers a validated, sanitised submission here.
 * Delivery is intentionally pluggable and SAFE BY DEFAULT:
 *
 *   MAIL_PROVIDER=log       → record locally (default). No email is sent.
 *   MAIL_PROVIDER=smtp      → wire up nodemailer (stub below).
 *   MAIL_PROVIDER=sendgrid  → wire up @sendgrid/mail (stub below).
 *   MAIL_PROVIDER=resend    → wire up resend (stub below).
 *
 * No third-party email dependency is bundled, and no credentials are hard-coded.
 * Each provider stub documents exactly what to add and reads keys from env via
 * config. Until you opt in, submissions are recorded to logs/submissions.log
 * (git-ignored) and the console — never silently lost, never insecurely sent.
 */

const LOG_DIR = path.join(__dirname, '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'submissions.log');

function recordLocally(submission) {
  try {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }
    fs.appendFileSync(LOG_FILE, JSON.stringify(submission) + '\n', { encoding: 'utf8' });
  } catch (err) {
    // Never let logging failure break the request; surface it instead.
    logger.error('Failed to record inquiry locally', { error: err.message });
  }
}

/**
 * Deliver a project inquiry.
 * @param {object} submission – already validated & sanitised by the controller.
 * @returns {Promise<{delivered: boolean, provider: string}>}
 */
async function sendInquiry(submission) {
  const provider = config.inquiry.mailProvider;

  // Always keep a local, append-only record so nothing is lost.
  recordLocally(submission);

  switch (provider) {
    case 'log':
      logger.info('New project inquiry received (provider=log; no email sent)', {
        company: submission.company || '(none)',
        industry: submission.industry || '(none)',
        contactMethod: submission.contactMethod || '(none)',
      });
      return { delivered: true, provider };

    case 'smtp':
      // To enable: `npm i nodemailer`, then implement using config.inquiry.smtp.
      //   const nodemailer = require('nodemailer');
      //   const transport = nodemailer.createTransport({ host, port, auth: { user, pass } });
      //   await transport.sendMail({ from, to: config.inquiry.notifyTo, subject, text });
      logger.warn('MAIL_PROVIDER=smtp is not wired up yet; recorded locally only.');
      return { delivered: false, provider };

    case 'sendgrid':
      // To enable: `npm i @sendgrid/mail`, set SENDGRID_API_KEY, then send.
      logger.warn('MAIL_PROVIDER=sendgrid is not wired up yet; recorded locally only.');
      return { delivered: false, provider };

    case 'resend':
      // To enable: `npm i resend`, set RESEND_API_KEY, then send.
      logger.warn('MAIL_PROVIDER=resend is not wired up yet; recorded locally only.');
      return { delivered: false, provider };

    default:
      logger.warn(`Unknown MAIL_PROVIDER "${provider}"; recorded locally only.`);
      return { delivered: false, provider };
  }
}

module.exports = { sendInquiry };
