import { RequestHandler } from 'express';
import site from '../config/site';

/**
 * Static content pages. Each handler supplies a page-specific `seo` object
 * (title, description, canonical path, optional og image) plus any view data.
 */

export const home: RequestHandler = (req, res) => {
  res.render('pages/home', {
    seo: {
      title: 'Veylrio — Outbound Infrastructure & Operations Systems',
      description:
        'Veylrio helps outbound-heavy businesses clean up messy operations and build the dialer setup, CRM workflows, QA, dashboards and data systems needed to run with control and momentum.',
      path: '/',
    },
  });
};

export const solutions: RequestHandler = (req, res) => {
  res.render('pages/solutions', {
    seo: {
      title: 'Solutions — Outbound Infrastructure, QA & Reporting Systems | Veylrio',
      description:
        'Five connected operational systems for outbound teams: outbound infrastructure, performance visibility, quality & control, data & workflow systems, and advisory & build support.',
      path: '/solutions',
    },
  });
};

export const why: RequestHandler = (req, res) => {
  res.render('pages/why', {
    seo: {
      title: 'Why Veylrio — Operator-Built Outbound Systems You Own',
      description:
        'Veylrio is built by operators, not theory-only consultants. We build practical, client-owned outbound systems with no black boxes — clear process, clean handover, infrastructure you can run yourself.',
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
