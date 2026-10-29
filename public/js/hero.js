// Curved 3D card gallery: slow auto-rotation + drag to explore.
(function () {
  'use strict';
  
  // On small screens the floating company window starts minimised.
  var dock = document.querySelector('.dock');
  if (dock && window.matchMedia('(max-width: 900px)').matches) dock.removeAttribute('open');
    // Hero background: scroll parallax + gentle mouse tilt (writes --p, --mx, --my on .hero).
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  var tx = 0, ty = 0, cx = 0, cy = 0;
  if (!calm) {
    window.addEventListener('pointermove', function (e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }
  function clamp01(v) { return Math.min(1, Math.max(0, v)); }
  (function pageTick() {
    if (!document.hidden) {
      cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
      var y = window.scrollY || root.scrollTop;
      var max = Math.max(1, root.scrollHeight - window.innerHeight);
      var p = clamp01(y / max);
      root.style.setProperty('--sp', p.toFixed(4));
      root.style.setProperty('--p', (calm ? 0 : p).toFixed(4));
      root.style.setProperty('--h', (calm ? 0 : clamp01(y / window.innerHeight)).toFixed(4));
      root.style.setProperty('--mx', cx.toFixed(3));
      root.style.setProperty('--my', cy.toFixed(3));
    }
    requestAnimationFrame(pageTick);
  })();

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
        setTimeout(function () {
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
  var arc = document.querySelector('.arc');
  if (!arc) return;

  var cards = Array.prototype.slice.call(arc.querySelectorAll('.arc__card'));
  var n = cards.length;
  var step = 360 / n;
  var AUTO = 4;          // degrees per second (slow drift)
  var DRAG = 0.11;       // degrees per pixel dragged
  var rot = 0, vel = 0, dragging = false, lastX = 0, lastT = 0;
  var inView = true;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function render() {
    for (var i = 0; i < n; i++) {
      var a = (((i * step + rot) % 360) + 540) % 360 - 180; // -180..180, 0 = centre
      var abs = Math.abs(a);
            var s = 1 + 0.45 * Math.pow(Math.min(abs, 70) / 66, 2);  // edges only slightly bigger
      var op = abs > 70 ? 0 : abs > 58 ? (70 - abs) / 12 : 1;  // fade at the very edge
      var el = cards[i];
      el.style.setProperty('--a', a.toFixed(2) + 'deg');
      el.style.setProperty('--s', s.toFixed(3));
      el.style.opacity = op;
      el.style.visibility = op === 0 ? 'hidden' : 'visible';
      el.style.zIndex = String(100 - Math.round(abs));
    }
  }

  var prev = performance.now();
  function frame(now) {
    var dt = Math.min((now - prev) / 1000, 0.05);
    prev = now;
    if (inView && !document.hidden) {
      if (!dragging) {
        rot += vel * dt + (reduce ? 0 : AUTO * dt);
        vel *= Math.exp(-3 * dt); // glide to a stop after a flick
      }
      render();
    }
    requestAnimationFrame(frame);
  }

  arc.addEventListener('pointerdown', function (e) {
    dragging = true; vel = 0;
    lastX = e.clientX; lastT = performance.now();
    arc.classList.add('is-dragging');
    if (arc.setPointerCapture) arc.setPointerCapture(e.pointerId);
  });
  arc.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var now = performance.now();
    var dx = e.clientX - lastX;
    var dt = Math.max((now - lastT) / 1000, 0.001);
    rot -= dx * DRAG;
    vel = (-dx * DRAG) / dt;
    lastX = e.clientX; lastT = now;
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