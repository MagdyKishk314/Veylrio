import { RequestHandler } from 'express';
import site from '../config/site';
import { collectErrors } from '../validators/projectValidator';
import { sendInquiry, Submission } from '../utils/notifier';
import asyncHandler from '../utils/asyncHandler';
import logger from '../utils/logger';

const SEO = {
  title: 'Start a Project — Build My Outbound System | Veylrio',
  description:
    'Tell us how you get customers today and what you have already tried. We will scope the outbound setup you should own and reply through your preferred contact method.',
  path: '/start-a-project',
};

/** Fields we echo back into the form when validation fails (never the honeypot). */
const ECHO_FIELDS = [
  'name', 'company', 'email', 'phone', 'website', 'industry', 'outboundStatus',
  'teamSize', 'stack', 'needs', 'broken', 'contactMethod', 'timeline', 'budget',
] as const;

function pickValues(body: Record<string, unknown> = {}): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of ECHO_FIELDS) {
    values[field] = typeof body[field] === 'string' ? (body[field] as string) : '';
  }
  return values;
}

export const showForm: RequestHandler = (req, res) => {
  res.render('pages/start', {
    seo: SEO,
    values: pickValues(),
    errors: {},
    options: site.form,
  });
};

export const submitForm = asyncHandler(async (req, res) => {
  // Honeypot: if filled, treat as spam — pretend success without processing.
  if (req.body && req.body._hp_company_url) {
    logger.warn('Inquiry honeypot triggered; dropping submission.');
    return res.redirect(303, '/thank-you');
  }

  const errors = collectErrors(req);
  if (errors) {
    return res.status(422).render('pages/start', {
      seo: SEO,
      values: pickValues(req.body),
      errors,
      options: site.form,
    });
  }

  // Build a clean submission object from validated/sanitised input.
  const b = req.body;
  const submission: Submission = {
    receivedAt: new Date().toISOString(),
    name: b.name,
    company: b.company,
    email: b.email,
    phone: b.phone,
    website: b.website || '',
    industry: b.industry,
    outboundStatus: b.outboundStatus || '',
    teamSize: b.teamSize,
    stack: b.stack || '',
    needs: b.needs,
    broken: b.broken || '',
    contactMethod: b.contactMethod,
    timeline: b.timeline,
    budget: b.budget || '',
    meta: {
      ip: req.ip,
      userAgent: (req.get('user-agent') || '').slice(0, 256),
    },
  };

  await sendInquiry(submission);

  // Safe, internal-only redirect.
  return res.redirect(303, '/thank-you');
});
