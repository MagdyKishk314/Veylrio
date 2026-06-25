import { RequestHandler } from 'express';
import site from '../config/site';
import config from '../config';
import { icon } from '../utils/icons';

/**
 * Expose shared, read-only data to every view so templates stay clean.
 * Page-specific values (seo, page data) are added per-route by controllers.
 */
const locals: RequestHandler = (req, res, next) => {
  res.locals.site = site;
  res.locals.icon = icon;
  res.locals.isProd = config.isProd;
  res.locals.currentPath = req.path;
  res.locals.currentYear = site.year;
  // Defaults so partials never reference undefined values.
  res.locals.seo = res.locals.seo || {};
  res.locals.bodyClass = '';
  next();
};

export default locals;
