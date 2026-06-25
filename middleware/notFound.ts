import { RequestHandler } from 'express';

/**
 * 404 handler — runs after all routes. Renders the branded not-found page.
 */
const notFound: RequestHandler = (req, res) => {
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

export default notFound;
