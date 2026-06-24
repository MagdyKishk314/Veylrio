'use strict';

const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/', pageController.home);
router.get('/solutions', pageController.solutions);
router.get('/why-veylrio', pageController.why);
router.get('/privacy-policy', pageController.privacy);
router.get('/terms', pageController.terms);
router.get('/thank-you', pageController.thankYou);

module.exports = router;
