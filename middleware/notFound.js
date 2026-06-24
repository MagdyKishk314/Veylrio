'use strict';

/**
 * 404 handler — runs after all routes. Renders the branded not-found page.
 */
module.exports = function notFound(req, res) {
  res.status(404).render('pages/404', {
    seo: {
      title: 'Page not found — Veylrio',
      description: 'The page you were looking for could not be found.',
      path: req.path,
      noindex: true,
    },
    bodyClass: 'bg-ink-700',
  });
};
