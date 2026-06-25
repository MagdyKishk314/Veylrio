import express from 'express';
import pagesRouter from './pages';
import projectRouter from './project';

const router = express.Router();

// Content pages and the project inquiry flow.
// (SEO files — robots.txt / sitemap.xml / favicon.ico — are mounted earlier in
// app.ts, before the CSRF/locals middleware, so they stay cookie- and
// cache-friendly for crawlers.)
router.use('/', pagesRouter);
router.use('/', projectRouter);

export default router;
