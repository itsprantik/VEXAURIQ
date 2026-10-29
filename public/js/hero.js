// Curved 3D card gallery: slow auto-rotation + drag to explore.
(function () {
  'use strict';
  
  // On small screens the floating company window starts minimised.
  var dock = document.querySelector('.dock');
  if (dock && window.matchMedia('(max-width: 900px)').matches) dock.removeAttribute('open');
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