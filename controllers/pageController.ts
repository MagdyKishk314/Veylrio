import { RequestHandler } from 'express';
import site from '../config/site';

/**
 * Static content pages. Each handler supplies a page-specific `seo` object
 * (title, description, canonical path, optional og image) plus any view data.
 */

export const home: RequestHandler = (req, res) => {
  res.render('pages/home', {
    seo: {
      title: 'Veylrio — Build Your Own Outbound Operation. Stop Renting One.',
      description:
        'Veylrio helps businesses build their own outbound sales operation — dialer, CRM, caller workflow, data process, reporting and operating structure — so you run outbound with visibility and control instead of renting a black box.',
      path: '/',
    },
  });
};

export const solutions: RequestHandler = (req, res) => {
  res.render('pages/solutions', {
    seo: {
      title: 'Solutions — Build & Own Your Outbound Setup | Veylrio',
      description:
        'Ways to build and own your outbound: Owned Outbound Setup, Vendor Exit Buildout, Caller + System Launch, Data + Dialer Management, and Outbound Advisory. We build the dialer, CRM, caller workflow, data and reporting you keep.',
      path: '/solutions',
    },
  });
};

export const why: RequestHandler = (req, res) => {
  res.render('pages/why', {
    seo: {
      title: 'Why Veylrio — The Outbound System You Own, Not Rent',
      description:
        'Paying for outbound is not the same as owning it. Veylrio builds operator-level outbound systems with no black boxes — you own the caller workflow, CRM, data, recordings and reporting, documented and handed back to you.',
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
