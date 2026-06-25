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

  /* ── Testimonials slider (scroll-snap + controls) ───────────────────────── */
  document.querySelectorAll('[data-slider]').forEach(function (root) {
    var track = root.querySelector('[data-slider-track]');
    if (!track) return;
    var slides = Array.prototype.slice.call(track.children);
    if (slides.length < 2) return;

    var prev = root.querySelector('[data-slider-prev]');
    var next = root.querySelector('[data-slider-next]');
    var dots = Array.prototype.slice.call(root.querySelectorAll('[data-slider-dot]'));
    var index = 0;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function render() {
      dots.forEach(function (d, i) {
        d.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    }

    function go(i, smooth) {
      index = (i + slides.length) % slides.length; // wrap around
      track.scrollTo({ left: index * track.clientWidth, behavior: smooth === false ? 'auto' : 'smooth' });
      render();
    }

    if (prev) prev.addEventListener('click', function () { stop(); go(index - 1); });
    if (next) next.addEventListener('click', function () { stop(); go(index + 1); });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { stop(); go(i); });
    });

    // Keep the active dot in sync when the user swipes/scrolls manually.
    var raf;
    track.addEventListener('scroll', function () {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var i = Math.round(track.scrollLeft / track.clientWidth);
        if (i !== index) { index = i; render(); }
      });
    }, { passive: true });

    // Keep the current slide aligned if the viewport resizes.
    window.addEventListener('resize', function () { go(index, false); }, { passive: true });

    // Optional autoplay — off for reduced-motion; pauses on interaction.
    var timer = null;
    function start() {
      if (timer || reduce || !root.hasAttribute('data-slider-autoplay')) return;
      timer = setInterval(function () { go(index + 1); }, 6500);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    ['mouseenter', 'focusin', 'touchstart'].forEach(function (ev) {
      root.addEventListener(ev, stop, { passive: true });
    });
    root.addEventListener('mouseleave', start, { passive: true });

    render();
    start();
  });
})();
