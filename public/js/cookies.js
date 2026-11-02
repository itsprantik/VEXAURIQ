(function () {
  'use strict';
  var KEY = 'vexauriq_cookie_choice';
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  // Other scripts (e.g. future analytics) can check: window.vexauriqConsent === 'accepted'
  window.vexauriqConsent = read();
  if (window.vexauriqConsent) return;          // already chose: stay hidden

  function close(choice) {
    save(choice);
    window.vexauriqConsent = choice;
    banner.classList.remove('is-open');
    setTimeout(function () { banner.hidden = true; }, 400);
  }

  banner.hidden = false;
  setTimeout(function () { banner.classList.add('is-open'); }, 900);

  banner.querySelector('[data-cookie="accept"]').addEventListener('click', function () { close('accepted'); });
  banner.querySelector('[data-cookie="decline"]').addEventListener('click', function () { close('declined'); });
})();