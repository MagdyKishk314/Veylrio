import express from 'express';
import * as seoController from '../controllers/seoController';

const router = express.Router();

router.get('/robots.txt', seoController.robots);
router.get('/sitemap.xml', seoController.sitemap);

// Crawlers and some browsers request /favicon.ico directly.
router.get('/favicon.ico', (req, res) => res.redirect(301, '/favicon-32.png'));

export default router;
