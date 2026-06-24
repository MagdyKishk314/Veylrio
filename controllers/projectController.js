'use strict';

const site = require('../config/site');
const { collectErrors } = require('../validators/projectValidator');
const { sendInquiry } = require('../utils/notifier');
const asyncHandler = require('../utils/asyncHandler');
const logger = require('../utils/logger');

const SEO = {
  title: 'Start a Project — Veylrio',
  description:
    'Tell us about your outbound operation and what is broken or messy. We will review the details and reply through your preferred contact method.',
  path: '/start-a-project',
};

/** Fields we echo back into the form when validation fails (never the honeypot). */
const ECHO_FIELDS = [
  'name', 'company', 'email', 'phone', 'website', 'industry',
  'teamSize', 'stack', 'needs', 'broken', 'contactMethod', 'timeline', 'budget',
];

function pickValues(body = {}) {
  const values = {};
  for (const field of ECHO_FIELDS) {
    values[field] = typeof body[field] === 'string' ? body[field] : '';
  }
  return values;
}

exports.showForm = (req, res) => {
  res.render('pages/start', {
    seo: SEO,
    values: pickValues(),
    errors: {},
    options: site.form,
  });
};

exports.submitForm = asyncHandler(async (req, res) => {
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
  const submission = {
    receivedAt: new Date().toISOString(),
    name: b.name,
    company: b.company,
    email: b.email,
    phone: b.phone,
    website: b.website || '',
    industry: b.industry,
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
