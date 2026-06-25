import fs from 'fs';
import os from 'os';
import path from 'path';
import type { Transporter } from 'nodemailer';
import config from '../config';
import logger from './logger';

/**
 * Inquiry notifier.
 *
 * The "Start a Project" form delivers a validated, sanitised submission here.
 * Delivery uses Gmail SMTP (via nodemailer). It is enabled automatically when
 * GMAIL_USER and GMAIL_APP_PASSWORD are set; otherwise the submission is simply
 * recorded locally so nothing is lost in development.
 *
 * Gmail requires an App Password (Google account → 2-Step Verification → App
 * passwords), not your normal password.
 */

export interface Submission {
  receivedAt: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  outboundStatus: string;
  stack: string;
  needs: string;
  contactMethod: string;
  timeline: string;
  budget: string;
  meta: {
    ip?: string;
    userAgent: string;
  };
}

// Local, append-only record of submissions. On serverless platforms (Vercel)
// the project filesystem is read-only, so fall back to the writable temp dir.
// Note: serverless temp storage is ephemeral — configure Gmail SMTP there so
// inquiries are actually delivered, not just briefly recorded.
const LOG_DIR = process.env.VERCEL
  ? path.join(os.tmpdir(), 'veylrio')
  : path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'submissions.log');

const mailEnabled = Boolean(config.mail.user && config.mail.pass);

// Created lazily on first send so nodemailer is only required when used.
let transporter: Transporter | null = null;
function getTransporter(): Transporter {
  if (!transporter) {
    const nodemailer = require('nodemailer') as typeof import('nodemailer');
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: config.mail.user, pass: config.mail.pass },
    });
  }
  return transporter;
}

function recordLocally(submission: Submission): void {
  try {
    if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
    fs.appendFileSync(LOG_FILE, JSON.stringify(submission) + '\n', { encoding: 'utf8' });
  } catch (err) {
    logger.error('Failed to record inquiry locally', { error: (err as Error).message });
  }
}

function buildEmail(s: Submission): string {
  const lines = [
    `New project inquiry — ${s.company || 'Unknown company'}`,
    '',
    `Name:            ${s.name}`,
    `Company:         ${s.company}`,
    `Email:           ${s.email}`,
    `Phone / WhatsApp:${s.phone}`,
    `Industry:        ${s.industry}`,
    `Outbound today:  ${s.outboundStatus}`,
    `Dialer / CRM:    ${s.stack || '—'}`,
    `Preferred:       ${s.contactMethod}`,
    `Timeline:        ${s.timeline}`,
    `Budget:          ${s.budget || '—'}`,
    '',
    'What they want to build or fix:',
    s.needs,
    '',
    `Received: ${s.receivedAt}`,
  ];
  return lines.join('\n');
}

/**
 * Deliver a project inquiry.
 * @param submission – already validated & sanitised by the controller.
 */
export async function sendInquiry(submission: Submission): Promise<{ delivered: boolean }> {
  // Always keep a local, append-only record as a safety net.
  recordLocally(submission);

  if (!mailEnabled) {
    logger.info('New project inquiry recorded locally (Gmail SMTP not configured).', {
      company: submission.company || '(none)',
    });
    return { delivered: false };
  }

  try {
    await getTransporter().sendMail({
      from: `"${config.mail.fromName}" <${config.mail.user}>`,
      to: config.mail.notifyTo,
      replyTo: submission.email,
      subject: `New project inquiry — ${submission.company || submission.name}`,
      text: buildEmail(submission),
    });
    logger.info('Project inquiry emailed via Gmail.', { to: config.mail.notifyTo });
    return { delivered: true };
  } catch (err) {
    // Never fail the request because email failed — it is already recorded.
    logger.error('Failed to send inquiry email via Gmail.', { error: (err as Error).message });
    return { delivered: false };
  }
}
