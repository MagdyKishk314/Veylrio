'use strict';

const express = require('express');
const router = express.Router();

// Content pages and the project inquiry flow.
// (SEO files — robots.txt / sitemap.xml / favicon.ico — are mounted earlier in
// app.js, before the CSRF/locals middleware, so they stay cookie- and
// cache-friendly for crawlers.)
router.use('/', require('./pages'));
router.use('/', require('./project'));

module.exports = router;
