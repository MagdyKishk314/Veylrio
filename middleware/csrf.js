'use strict';

const crypto = require('crypto');
const config = require('../config');

/**
 * Stateless CSRF protection using the signed double-submit cookie pattern.
 *
 *  - provideToken(): ensures a random token exists in an HttpOnly cookie and
 *    exposes it to views as res.locals.csrfToken (injected into form as _csrf).
 *  - verifyToken(): on unsafe requests, checks the form/header token against
 *    the cookie using a constant-time comparison.
 *
 * Because the cookie is HttpOnly + SameSite=Lax (and Secure in production), a
 * cross-site attacker can neither read it (to copy the token into a forged
 * form) nor set it. No server-side session store or signing secret is required.
 */

const COOKIE_NAME = 'veylrio.csrf';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: config.isProd,
  path: '/',
  maxAge: 1000 * 60 * 60 * 4, // 4 hours
};

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

function provideToken(req, res, next) {
  let token = req.cookies && req.cookies[COOKIE_NAME];
  if (!token || typeof token !== 'string' || token.length !== 64) {
    token = generateToken();
    res.cookie(COOKIE_NAME, token, cookieOptions);
  }
  res.locals.csrfToken = token;
  next();
}

function verifyToken(req, res, next) {
  const cookieToken = req.cookies && req.cookies[COOKIE_NAME];
  const submitted =
    (req.body && req.body._csrf) ||
    req.get('x-csrf-token') ||
    req.get('x-xsrf-token');

  if (cookieToken && submitted && safeEqual(cookieToken, submitted)) {
    return next();
  }

  const err = new Error('Invalid or missing CSRF token.');
  err.status = 403;
  err.code = 'EBADCSRFTOKEN';
  return next(err);
}

module.exports = { provideToken, verifyToken, COOKIE_NAME };
