import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import site from '../config/site';
import { icon } from '../utils/icons';

/**
 * Rate limiters. The form limiter is deliberately strict to deter abuse of the
 * inquiry endpoint while staying comfortable for genuine submissions.
 *
 * When a limit is hit we render the branded error page (HTTP 429) rather than
 * express-rate-limit's default plain-text response. Because the global limiter
 * runs before the locals middleware, the handler sets the view locals it needs
 * defensively (mirroring errorHandler.ts).
 */

function tooMany(req: Request, res: Response): void {
  res.status(429);
  res.locals.site = res.locals.site || site;
  res.locals.icon = res.locals.icon || icon;
  res.locals.currentPath = res.locals.currentPath || req.path;
  res.locals.currentYear = res.locals.currentYear || site.year;
  res.locals.isProd = res.locals.isProd || false;
  res.locals.cspNonce = res.locals.cspNonce || '';
  res.render('pages/500', {
    seo: {
      title: 'Too many requests — Veylrio',
      description: 'You have sent a lot of requests in a short time.',
      path: req.path,
      noindex: true,
    },
    statusCode: 429,
    safeMessage: 'You have sent a lot of requests in a short time. Please wait a moment and try again.',
    detail: null,
    bodyClass: 'bg-ink-700',
  });
}

// Up to 8 inquiry submissions per IP per 15 minutes.
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  handler: tooMany,
});

// A gentle site-wide limiter as defence-in-depth against scraping/floods.
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 240,
  standardHeaders: true,
  legacyHeaders: false,
  handler: tooMany,
});

export { formLimiter, globalLimiter };
