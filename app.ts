import 'dotenv/config';

import fs from 'fs';
import path from 'path';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import config from './config';
import logger from './utils/logger';
import securityMiddleware from './middleware/security';
import * as csrf from './middleware/csrf';
import locals from './middleware/locals';
import { globalLimiter } from './middleware/rateLimiter';
import routes from './routes';
import seoRoutes from './routes/seo';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';

const app = express();

// Project root — used to resolve views/static regardless of where the compiled
// code lives (dist/ in production, source in tsx dev). The app is started from
// the project root in both cases.
const ROOT = process.cwd();

// Never advertise the framework.
app.disable('x-powered-by');

// On Vercel (and similar serverless platforms) the app runs behind a proxy.
// Trusting the first hop lets rate-limiting see the real client IP and lets
// Express detect HTTPS for secure cookies.
if (process.env.VERCEL) {
  app.set('trust proxy', 1);
}

// Resolve a runtime directory (views / public) robustly. cwd works for
// local/dist runs; the __dirname-relative candidates cover serverless bundling
// (e.g. Vercel) where the working directory may differ from the code location.
function resolveDir(name: string): string {
  const candidates = [
    path.join(ROOT, name),
    path.join(__dirname, name),
    path.join(__dirname, '..', name),
  ];
  return candidates.find((dir) => fs.existsSync(dir)) ?? candidates[0];
}

// ── View engine ────────────────────────────────────────────────────────────
// Express loads the EJS engine via a dynamic require() at render time. Touching
// it here (static literal) ensures bundlers like Vercel's @vercel/node trace
// and include it in the serverless function.
require('ejs');

app.set('view engine', 'ejs');
app.set('views', resolveDir('views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// ── Security headers (CSP nonce + Helmet) ──────────────────────────────────
app.use(securityMiddleware);

// ── Core middleware ────────────────────────────────────────────────────────
app.use(compression());
// Strict body-size limits; the form is small.
app.use(express.urlencoded({ extended: false, limit: '32kb', parameterLimit: 50 }));
app.use(express.json({ limit: '16kb' }));
app.use(cookieParser());

if (config.isDev) {
  app.use(morgan('dev'));
}

// ── Static assets ──────────────────────────────────────────────────────────
app.use(
  express.static(resolveDir('public'), {
    etag: true,
    redirect: false,
    dotfiles: 'ignore',
    setHeaders(res, filePath) {
      if (!config.isProd) {
        res.setHeader('Cache-Control', 'no-cache');
        return;
      }
      // The built CSS/JS keep fixed (hashless) names, so they must revalidate
      // to avoid serving stale assets after a deploy. Images/logos/fonts are
      // stable and can be cached for a week.
      if (/\.(?:css|js)$/i.test(filePath)) {
        res.setHeader('Cache-Control', 'no-cache');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=604800');
      }
    },
  })
);

// SEO files (robots.txt, sitemap.xml, favicon.ico) — mounted before CSRF/locals
// so they never receive a Set-Cookie and stay cache-friendly for crawlers.
app.use('/', seoRoutes);

// Defence-in-depth site-wide limiter (after static so assets aren't counted).
app.use(globalLimiter);

// CSRF token availability + shared view locals.
app.use(csrf.provideToken);
app.use(locals);

// ── Routes ─────────────────────────────────────────────────────────────────
app.use('/', routes);

// ── 404 + error handling ───────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start ──────────────────────────────────────────────────────────────────
// Only listen when run directly (local/dev/self-hosted). On Vercel the app is
// imported by api/index.ts as a serverless handler and must NOT call listen().
if (!process.env.VERCEL && require.main === module) {
  const server = app.listen(config.port, () => {
    logger.info(`Veylrio site running`, {
      env: config.env,
      url: `http://localhost:${config.port}`,
    });
  });

  // Graceful shutdown.
  const shutdown = (signal: string) => {
    logger.info(`Received ${signal}, shutting down.`);
    server.close(() => process.exit(0));
    // Force-exit if connections linger.
    setTimeout(() => process.exit(1), 8000).unref();
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

export default app;
