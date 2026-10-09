/* Mystique Tao — behaviour. No dependencies. Everything degrades gracefully without JS. */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- One shared AudioContext for the bowl chimes and the nature soundscape (ambient.js).
     Created lazily, only from a user gesture. Returns null where Web Audio is missing.
     Every sound on the page goes through MT.out, so the global mute silences all of it. ---- */
  var MT = window.MT = window.MT || {};
  MT.audio = function () {
    if (MT._ctx) return MT._ctx;
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    try { MT._ctx = new Ctx(); } catch (e) { return null; }
    MT.out = MT._ctx.createGain();
    MT.out.gain.value = MT.muted ? 0 : 1;
    MT.out.connect(MT._ctx.destination);
    return MT._ctx;
  };

  /* ---- Nav: compact after the first scroll ---- */
  var nav = document.querySelector('.nav');
  function onScroll() { if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---- Reveal on scroll ---- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  reveals.forEach(function (el) {
    var siblings = el.parentElement ? Array.prototype.slice.call(el.parentElement.children) : [];
    el.style.setProperty('--i', siblings.indexOf(el));
  });
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- Year ---- */
  var y = document.querySelector('[data-year]'); if (y) y.textContent = String(new Date().getFullYear());

  /* ---- Videos: click-to-load facades. The thumbnail is a real link to YouTube, so without JS
     (or with a modified click) it simply opens YouTube. The "Watch on YouTube" link stays visible
     under each video for hosts that block embedded frames. ---- */
  var playing = [];
  var seen = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { e.target._inView = e.isIntersecting && e.intersectionRatio >= 0.25; });
    if (MT.hush) MT.hush('video', playing.some(function (f) { return f._inView; }));
  }, { threshold: [0, 0.25, 0.6] }) : null;
  Array.prototype.forEach.call(document.querySelectorAll('[data-video]'), function (frame) {
    var facade = frame.querySelector('.video__facade');
    if (!facade) return;
    facade.addEventListener('click', function (e) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      var id = frame.getAttribute('data-video'), title = frame.getAttribute('data-title') || 'Video';
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
      f.title = title + ' (Mystique Tao on YouTube)';
      f.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
      f.setAttribute('allowfullscreen', '');
      f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      frame.innerHTML = '';
      frame.appendChild(f);
      frame.classList.add('is-playing');
      try { f.focus(); } catch (err) { /* fine */ }
      playing.push(frame); frame._inView = true;
      if (seen) seen.observe(frame);
      if (MT.hush) MT.hush('video', true); /* rest the nature sound while the video is in view */
    });
  });

  /* ---- Free practice: the recording may not exist yet. Probe it when the card comes near;
     if it fails to load, hide the player and say it is on its way. ---- */
  var freeAudio = document.querySelector('[data-free-audio]');
  var freePending = document.querySelector('[data-free-pending]');
  if (freeAudio) {
    var missing = function () { freeAudio.hidden = true; if (freePending) freePending.hidden = false; if (MT.hush) MT.hush('audio', false); };
    freeAudio.addEventListener('error', missing);
    var src = freeAudio.querySelector('source'); if (src) src.addEventListener('error', missing);
    var probe = function () { if (freeAudio.getAttribute('preload') === 'none') { freeAudio.setAttribute('preload', 'metadata'); try { freeAudio.load(); } catch (err) { missing(); } } };
    if ('IntersectionObserver' in window) {
      var near = new IntersectionObserver(function (entries) { if (entries.some(function (e) { return e.isIntersecting; })) { near.disconnect(); probe(); } }, { rootMargin: '600px 0px' });
      near.observe(freeAudio);
    } else probe();
    freeAudio.addEventListener('play', function () { if (MT.hush) MT.hush('audio', true); });
    freeAudio.addEventListener('pause', function () { if (MT.hush) MT.hush('audio', false); });
    freeAudio.addEventListener('ended', function () { if (MT.hush) MT.hush('audio', false); });
  }

  /* ---- Newsletter: no backend. Validate, open a prefilled email, never claim it was sent. ---- */
  var letter = document.querySelector('[data-letter]');
  if (letter) {
    letter.setAttribute('novalidate', '');
    letter.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = letter.querySelector('input[type="email"]'), note = letter.querySelector('#newsletter-note');
      var v = input ? input.value.trim() : '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
        if (input) { input.setAttribute('aria-invalid', 'true'); input.focus(); }
        if (note) note.textContent = 'That address doesn\u2019t look complete. Please check it.';
        return;
      }
      input.removeAttribute('aria-invalid');
      var to = 'mystic.tao.life@gmail.com';
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent('Newsletter: please add me') +
        '&body=' + encodeURIComponent('Please add this address to the Mystique Tao newsletter: ' + v);
      if (note) {
        note.textContent = 'Your email app should open with the message ready. If it didn\u2019t, write to ';
        var a = document.createElement('a'); a.href = 'mailto:' + to; a.textContent = to;
        note.appendChild(a); note.appendChild(document.createTextNode('.'));
      }
    });
  }

  /* ---- Breath guide: labels synced to the CSS breath cycle (4 in · 2 hold · 4 out) ---- */
  var breath = document.querySelector('[data-breath]');
  if (!breath) return;
  var label = breath.querySelector('[data-breath-label]');
  var startBtn = breath.querySelector('[data-breath-start]');
  var soundBtn = breath.querySelector('[data-sound]');
  var soundLabel = breath.querySelector('[data-sound-label]');
  var ring = breath.querySelector('.enso--breath');
  var halo = breath.querySelector('.breath__halo');
  var CYCLE = 10000, IN = 4000, HOLD = 2000;
  var phases = [{ t: 0, text: 'Breathe in' }, { t: IN, text: 'Hold' }, { t: IN + HOLD, text: 'Breathe out' }];
  var timers = [];
  var soundOn = false, audio = null;
  var t0 = performance.now(), holdUntil = 0; /* passive-label phase anchor; hold-off while 'Welcome.' shows */

  function setLabel(text) {
    if (!label) return;
    label.classList.add('is-fading');
    setTimeout(function () { label.textContent = text; label.classList.remove('is-fading'); }, 300);
  }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function restartAnimation() {
    /* restart the CSS keyframes so the ring and the labels start together */
    [ring, halo].forEach(function (el) { if (!el) return; el.style.animation = 'none'; void el.getBoundingClientRect(); el.style.animation = ''; });
    t0 = performance.now();
  }

  /* Soft synthesized bowl tone: a few decaying sine partials. Only after a user gesture, off by default. */
  function tone(freq, gain, seconds) {
    if (!audio) return;
    var now = audio.currentTime;
    [1, 2.0, 2.98, 4.2].forEach(function (ratio, i) {
      var o = audio.createOscillator(), g = audio.createGain();
      o.type = 'sine'; o.frequency.value = freq * ratio;
      var peak = gain / (i + 1) / (i + 1);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(peak, now + 0.08);
      g.gain.exponentialRampToValueAtTime(0.0001, now + seconds);
      o.connect(g); g.connect(MT.out || audio.destination); o.start(now); o.stop(now + seconds + 0.1);
    });
  }
  function chime(phaseIndex) {
    if (!soundOn || !audio) return;
    var f = [196.0, 261.6, 174.6][phaseIndex]; /* G3, C4, F3 — gentle, bowl-like intervals */
    var secs = phaseIndex === 1 ? 2.5 : 4.5;
    if (MT.duck) MT.duck(secs); /* let the bowl ring out over the soundscape */
    tone(f, 0.18, secs);
  }

  function runCycle(n, total) {
    if (n >= total) {
      setLabel('Welcome.');
      holdUntil = performance.now() + 6000;
      breath.classList.remove('is-guided');
      if (startBtn) { startBtn.removeAttribute('aria-disabled'); startBtn.textContent = 'Once more'; }
      timers.push(setTimeout(function () { if (label) label.removeAttribute('aria-live'); }, 1500));
      return;
    }
    phases.forEach(function (p, i) {
      timers.push(setTimeout(function () { setLabel(p.text); chime(i); }, p.t));
    });
    timers.push(setTimeout(function () { runCycle(n + 1, total); }, CYCLE));
  }

  if (startBtn) startBtn.addEventListener('click', function () {
    if (startBtn.getAttribute('aria-disabled') === 'true') return;
    clearTimers();
    holdUntil = 0;
    if (soundOn && audio && audio.state === 'suspended') audio.resume();
    if (label) label.setAttribute('aria-live', 'polite'); /* announce phases only during a run the user started */
    breath.classList.add('is-guided');
    startBtn.setAttribute('aria-disabled', 'true'); startBtn.textContent = 'Breathing…';
    if (reduceMotion) {
      /* no animation: read the phases as text at the same pace */
      runCycle(0, 3);
    } else {
      restartAnimation();
      runCycle(0, 3);
    }
  });

  if (soundBtn) soundBtn.addEventListener('click', function () {
    if (soundBtn.getAttribute('aria-disabled') === 'true') return;
    if (!audio) audio = MT.audio();
    if (!audio) { soundBtn.setAttribute('aria-disabled', 'true'); if (soundLabel) soundLabel.textContent = 'No sound here'; return; }
    if (audio.state === 'suspended') audio.resume();
    soundOn = !soundOn;
    if (soundOn && MT.muted && MT.setMuted) MT.setMuted(false); /* asking for the bowl means sound is wanted */
    soundBtn.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
    if (soundLabel) soundLabel.textContent = soundOn ? 'Sound on' : 'Sound off';
    if (soundOn) { tone(261.6, 0.14, 3.0); }
  });

  /* Passive mode: keep the label loosely in step with the always-on CSS animation (a few wake-ups per cycle, no rAF) */
  if (!reduceMotion) {
    (function tick() {
      if (performance.now() < holdUntil) { setTimeout(tick, 250); return; }
      if (!breath.classList.contains('is-guided')) {
        var t = (performance.now() - t0) % CYCLE;
        var text = t < IN ? phases[0].text : t < IN + HOLD ? phases[1].text : phases[2].text;
        if (label && label.textContent !== text && !label.classList.contains('is-fading')) setLabel(text);
      }
      setTimeout(tick, 250);
    })();
  } else if (label) {
    label.textContent = 'Breathe in. Hold. Breathe out.';
  }
})();
