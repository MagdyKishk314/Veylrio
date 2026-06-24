/* Veylrio — minimal progressive enhancement. No framework, no dependencies. */
(function () {
  'use strict';

  /* ── Non-blocking web fonts ─────────────────────────────────────────────── */
  // The font stylesheet is preloaded in <head>; flip it to a stylesheet now so
  // it applies without having blocked first paint. CSP-safe (no inline handler).
  var fonts = document.getElementById('veylrio-fonts');
  if (fonts && fonts.rel === 'preload') {
    fonts.rel = 'stylesheet';
  }

  /* ── Mobile navigation toggle ───────────────────────────────────────────── */
  var toggle = document.querySelector('[data-nav-toggle]');
  var panel = document.getElementById('mobile-nav');

  function setNav(open) {
    if (!toggle || !panel) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    panel.hidden = !open;
    document.documentElement.classList.toggle('overflow-hidden', open);
  }

  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      setNav(!open);
    });
    // Close on link click.
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    // Close on Escape and return focus to the toggle if the menu was open.
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var wasOpen = toggle.getAttribute('aria-expanded') === 'true';
      setNav(false);
      if (wasOpen) toggle.focus();
    });
  }

  /* ── Sticky header elevation on scroll ──────────────────────────────────── */
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Optional textarea character counters ───────────────────────────────── */
  document.querySelectorAll('textarea[data-counter]').forEach(function (el) {
    var max = parseInt(el.getAttribute('maxlength'), 10);
    var out = document.getElementById(el.getAttribute('data-counter'));
    if (!max || !out) return;
    var update = function () {
      out.textContent = (max - el.value.length) + ' characters left';
    };
    el.addEventListener('input', update);
    update();
  });
})();
