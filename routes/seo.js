'use strict';

const express = require('express');
const router = express.Router();
const seoController = require('../controllers/seoController');

router.get('/robots.txt', seoController.robots);
router.get('/sitemap.xml', seoController.sitemap);

// Crawlers and some browsers request /favicon.ico directly.
router.get('/favicon.ico', (req, res) => res.redirect(301, '/favicon-32.png'));

module.exports = router;
