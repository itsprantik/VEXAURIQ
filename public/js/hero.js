// Background scroll effect, reveal animations and the curved 3D card gallery.
(function () {
  'use strict';

  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // phones / tablets / touch screens get a lighter version of every effect
  var lite = window.matchMedia('(max-width: 900px), (pointer: coarse)').matches;
  var root = document.documentElement;

  // On small screens the floating company window starts minimised.
  var dock = document.querySelector('.dock');
  if (dock && window.matchMedia('(max-width: 900px)').matches) dock.removeAttribute('open');

  /* ---------- page background (scroll + mouse) ----------
     Variables are written ONLY on .page-bg (not on <html>) and ONLY when they change,
     so the browser never has to re-style the whole page while you scroll. */
  var bg = document.querySelector('.page-bg');
  var scrolling = false, scrollTimer = 0;
  var lastP = -1, lastH = -1, lastX = 0, lastY = 0;
  var ticking = false;

  function clamp01(v) { return Math.min(1, Math.max(0, v)); }

  function applyScroll() {
    ticking = false;
    if (!bg) return;
    var y = window.pageYOffset || root.scrollTop || 0;
    var max = Math.max(1, root.scrollHeight - window.innerHeight);
    var p = calm ? 0 : clamp01(y / max);
    var h = calm ? 0 : clamp01(y / Math.max(1, window.innerHeight));
    if (Math.abs(p - lastP) > 0.001) { bg.style.setProperty('--p', p.toFixed(3)); lastP = p; }
    if (Math.abs(h - lastH) > 0.004) { bg.style.setProperty('--h', h.toFixed(3)); lastH = h; }
  }
  function onScroll() {
    scrolling = true;
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () { scrolling = false; }, 140);
    if (!ticking) { ticking = true; requestAnimationFrame(applyScroll); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  applyScroll();

  // gentle mouse tilt: desktop only, and the loop stops by itself when the mouse stops
  if (bg && !calm && !lite) {
    var tx = 0, ty = 0, cx = 0, cy = 0, tilting = false;
    var tilt = function () {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      if (Math.abs(cx - lastX) > 0.002) { bg.style.setProperty('--mx', cx.toFixed(3)); lastX = cx; }
      if (Math.abs(cy - lastY) > 0.002) { bg.style.setProperty('--my', cy.toFixed(3)); lastY = cy; }
      if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) requestAnimationFrame(tilt);
      else tilting = false;
    };
    window.addEventListener('pointermove', function (e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!tilting) { tilting = true; requestAnimationFrame(tilt); }
    }, { passive: true });
  }

  /* ---------- fade-up reveal for sections ---------- */
  if (!calm && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.section .eyebrow, .section__title, .lead, .card, .tile, .steps li, .cta__text, .cta .actions, .footer__top > *'
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        requestAnimationFrame(function () { el.classList.add('is-in'); });
        setTimeout(function () {           // hand control back to normal hover styles
          el.classList.remove('reveal', 'is-in');
          el.style.transitionDelay = '';
        }, 1500);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    Array.prototype.forEach.call(targets, function (el) {
      var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.classList.add('reveal');
      el.style.transitionDelay = ((idx % 4) * 90) + 'ms';
      io.observe(el);
    });
  }

  /* ---------- curved 3D card gallery ---------- */
  var arc = document.querySelector('.arc');
  if (!arc) return;

  var cards = Array.prototype.slice.call(arc.querySelectorAll('.arc__card'));
  var n = cards.length;
  var step = 360 / n;
  var AUTO = 4;          // degrees per second (slow drift)
  var DRAG = 0.11;       // degrees per pixel dragged
  var FRAME = lite ? 33 : 0;   // phones: cap at about 30 frames per second
  var rot = 0, vel = 0, dragging = false, lastX0 = 0, lastT = 0;
  var inView = true;
  var shown = [], fade = [];   // remember what is already applied so we only touch what changed

  function render() {
    for (var i = 0; i < n; i++) {
      var a = (((i * step + rot) % 360) + 540) % 360 - 180; // -180..180, 0 = centre
      var abs = Math.abs(a);
      var el = cards[i];
      if (abs > 70) {                       // out of sight: hide once, then skip all work
        if (shown[i] !== false) { el.style.visibility = 'hidden'; shown[i] = false; }
        continue;
      }
      if (shown[i] !== true) { el.style.visibility = 'visible'; shown[i] = true; }
      var s = 1 + 0.45 * Math.pow(abs / 66, 2);
      el.style.transform = 'rotateY(' + a.toFixed(2) + 'deg) translateZ(calc(var(--r) * -1)) scale(' + s.toFixed(3) + ')';
      var op = abs > 58 ? (70 - abs) / 12 : 1;      // fade at the very edge
      if (fade[i] !== op) { el.style.opacity = op; fade[i] = op; }
      el.style.zIndex = String(100 - Math.round(abs));
    }
  }

  var prev = performance.now();
  function frame(now) {
    requestAnimationFrame(frame);
    if (now - prev < FRAME) return;
    var dt = Math.min((now - prev) / 1000, 0.05);
    prev = now;
    // rest the gallery while the page itself is being scrolled on a phone
    if (!inView || document.hidden || (lite && scrolling && !dragging)) return;
    if (!dragging) {
      rot += vel * dt + (calm ? 0 : AUTO * dt);
      vel *= Math.exp(-3 * dt); // glide to a stop after a flick
    }
    render();
  }

  arc.addEventListener('pointerdown', function (e) {
    dragging = true; vel = 0;
    lastX0 = e.clientX; lastT = performance.now();
    arc.classList.add('is-dragging');
    if (arc.setPointerCapture) arc.setPointerCapture(e.pointerId);
  });
  arc.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var now = performance.now();
    var dx = e.clientX - lastX0;
    var dt = Math.max((now - lastT) / 1000, 0.001);
    rot -= dx * DRAG;
    vel = (-dx * DRAG) / dt;
    lastX0 = e.clientX; lastT = now;
  });
  function end() { dragging = false; arc.classList.remove('is-dragging'); }
  arc.addEventListener('pointerup', end);
  arc.addEventListener('pointercancel', end);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) { inView = entries[0].isIntersecting; }).observe(arc);
  }

  render();
  requestAnimationFrame(frame);
})();