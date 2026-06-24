'use strict';

const config = require('../config');
const logger = require('../utils/logger');

/**
 * Central error handler. Logs full detail server-side, but never leaks stack
 * traces or internal messages to the client in production.
 */
// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;

  // Log server-side (full detail).
  if (status >= 500) {
    logger.error('Unhandled error', {
      message: err.message,
      stack: config.isDev ? err.stack : undefined,
      path: req.originalUrl,
      method: req.method,
    });
  } else {
    logger.warn('Request error', {
      status,
      code: err.code,
      message: err.message,
      path: req.originalUrl,
    });
  }

  if (res.headersSent) {
    return next(err);
  }

  // Ensure the layout/partials have what they need, even when an early
  // middleware (e.g. body-parser) threw before view locals were attached.
  res.locals.site = res.locals.site || require('../config/site');
  res.locals.icon = res.locals.icon || require('../utils/icons').icon;
  res.locals.currentPath = res.locals.currentPath || req.path;
  res.locals.currentYear = res.locals.currentYear || res.locals.site.year;
  res.locals.cspNonce = res.locals.cspNonce || '';

  const isCsrf = err.code === 'EBADCSRFTOKEN';
  const safeMessage = isCsrf
    ? 'Your session expired or the form could not be verified. Please go back and try again.'
    : 'Something went wrong on our side. Please try again, or email us directly.';

  res.status(status).render('pages/500', {
    seo: {
      title: 'Something went wrong — Veylrio',
      description: 'An unexpected error occurred.',
      path: req.path,
      noindex: true,
    },
    statusCode: status,
    safeMessage,
    // Only expose details in development.
    detail: config.isDev ? err.stack : null,
    bodyClass: 'bg-ink-700',
  });
};
