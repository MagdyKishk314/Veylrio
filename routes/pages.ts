import express from 'express';
import * as pageController from '../controllers/pageController';

const router = express.Router();

router.get('/', pageController.home);
router.get('/solutions', pageController.solutions);
router.get('/why-veylrio', pageController.why);
router.get('/privacy-policy', pageController.privacy);
router.get('/terms', pageController.terms);
router.get('/thank-you', pageController.thankYou);

export default router;
