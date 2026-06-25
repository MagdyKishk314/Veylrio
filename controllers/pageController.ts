import { RequestHandler } from 'express';
import site from '../config/site';

/**
 * Static content pages. Each handler supplies a page-specific `seo` object
 * (title, description, canonical path, optional og image) plus any view data.
 */

export const home: RequestHandler = (req, res) => {
  res.render('pages/home', {
    seo: {
      title: 'Veylrio — Build Your Own Outbound Operation',
      description:
        'Build your own outbound sales operation instead of renting one from a vendor. Veylrio sets up the dialer, CRM, caller workflow, data, and reporting — and you own it.',
      path: '/',
    },
  });
};

export const solutions: RequestHandler = (req, res) => {
  res.render('pages/solutions', {
    seo: {
      title: 'Outbound Setup Solutions — Dialer, CRM, Caller Workflow & Data',
      description:
        'Three ways to build and own your outbound: Owned Outbound Setup, Caller + System Launch, and Vendor Exit Buildout. We build the dialer, CRM, data, and reporting you keep.',
      path: '/solutions',
    },
  });
};

export const why: RequestHandler = (req, res) => {
  res.render('pages/why', {
    seo: {
      title: 'Why Veylrio — Own Your Outbound, Don’t Rent It',
      description:
        'Paying for outbound is not the same as owning it. Veylrio builds operator-level outbound systems in tools you control — no black box, no fake guarantees.',
      path: '/why-veylrio',
    },
  });
};

export const privacy: RequestHandler = (req, res) => {
  res.render('pages/privacy', {
    seo: {
      title: 'Privacy Policy — Veylrio',
      description: 'How Veylrio collects, uses and protects the information you share with us.',
      path: '/privacy-policy',
    },
    updated: 'June 2026',
  });
};

export const terms: RequestHandler = (req, res) => {
  res.render('pages/terms', {
    seo: {
      title: 'Terms of Use — Veylrio',
      description: 'The terms that govern your use of the Veylrio website.',
      path: '/terms',
    },
    updated: 'June 2026',
  });
};

export const thankYou: RequestHandler = (req, res) => {
  res.render('pages/thank-you', {
    seo: {
      title: 'Thank you — Veylrio',
      description: 'Thanks for reaching out to Veylrio. We will review your details and reply through your preferred contact method.',
      path: '/thank-you',
      noindex: true,
    },
    contactEmail: site.contactEmail,
  });
};
