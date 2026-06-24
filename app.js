'use strict';

require('dotenv').config();

const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const config = require('./config');
const logger = require('./utils/logger');
const securityMiddleware = require('./middleware/security');
const csrf = require('./middleware/csrf');
const locals = require('./middleware/locals');
const { globalLimiter } = require('./middleware/rateLimiter');
const routes = require('./routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Never advertise the framework.
app.disable('x-powered-by');

// ── View engine ────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
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
  express.static(path.join(__dirname, 'public'), {
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
app.use('/', require('./routes/seo'));

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
if (require.main === module) {
  const server = app.listen(config.port, () => {
    logger.info(`Veylrio site running`, {
      env: config.env,
      url: `http://localhost:${config.port}`,
    });
  });

  // Graceful shutdown.
  const shutdown = (signal) => {
    logger.info(`Received ${signal}, shutting down.`);
    server.close(() => process.exit(0));
    // Force-exit if connections linger.
    setTimeout(() => process.exit(1), 8000).unref();
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

module.exports = app;
