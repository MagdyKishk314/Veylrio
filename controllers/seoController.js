'use strict';

const config = require('../config');

/**
 * Dynamic robots.txt and sitemap.xml so the canonical origin always matches
 * SITE_URL and the sitemap stays in sync with the live, indexable routes.
 */

// Public, indexable routes (no-index pages like /thank-you are excluded).
const INDEXABLE = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/solutions', changefreq: 'monthly', priority: '0.9' },
  { path: '/why-veylrio', changefreq: 'monthly', priority: '0.8' },
  { path: '/start-a-project', changefreq: 'monthly', priority: '0.9' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
];

exports.robots = (req, res) => {
  // Note: /thank-you is intentionally NOT disallowed here — it carries a
  // `noindex` meta tag, and a Disallow would stop crawlers from ever reading it.
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${config.siteUrl}/sitemap.xml`,
    '',
  ].join('\n');
  res.type('text/plain').send(body);
};

exports.sitemap = (req, res) => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = INDEXABLE.map(
    (u) =>
      `  <url>\n` +
      `    <loc>${config.siteUrl}${u.path}</loc>\n` +
      `    <lastmod>${lastmod}</lastmod>\n` +
      `    <changefreq>${u.changefreq}</changefreq>\n` +
      `    <priority>${u.priority}</priority>\n` +
      `  </url>`
  ).join('\n');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`;

  res.type('application/xml').send(xml);
};
