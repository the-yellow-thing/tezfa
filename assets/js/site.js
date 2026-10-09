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

  function setLabel(text) {
    if (!label) return;
    label.classList.add('is-fading');
    setTimeout(function () { label.textContent = text; label.classList.remove('is-fading'); }, 250);
  }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function restartAnimation() {
    /* restart the CSS keyframes so the ring and the labels start together */
    [ring, halo].forEach(function (el) { if (!el) return; el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });
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
      breath.classList.remove('is-guided');
      if (startBtn) { startBtn.disabled = false; startBtn.textContent = 'Once more'; }
      return;
    }
    phases.forEach(function (p, i) {
      timers.push(setTimeout(function () { setLabel(p.text); chime(i); }, p.t));
    });
    timers.push(setTimeout(function () { runCycle(n + 1, total); }, CYCLE));
  }

  if (startBtn) startBtn.addEventListener('click', function () {
    clearTimers();
    if (soundOn && audio && audio.state === 'suspended') audio.resume();
    breath.classList.add('is-guided');
    startBtn.disabled = true; startBtn.textContent = 'Breathing…';
    if (reduceMotion) {
      /* no animation: read the phases as text at the same pace */
      runCycle(0, 3);
    } else {
      restartAnimation();
      runCycle(0, 3);
    }
  });

  if (soundBtn) soundBtn.addEventListener('click', function () {
    if (!audio) audio = MT.audio();
    if (!audio) { soundBtn.disabled = true; if (soundLabel) soundLabel.textContent = 'No sound here'; return; }
    if (audio.state === 'suspended') audio.resume();
    soundOn = !soundOn;
    if (soundOn && MT.muted && MT.setMuted) MT.setMuted(false); /* asking for the bowl means sound is wanted */
    soundBtn.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
    if (soundLabel) soundLabel.textContent = soundOn ? 'Sound on' : 'Sound off';
    if (soundOn) tone(261.6, 0.14, 3.0);
  });

  /* Passive mode: keep the label loosely in step with the always-on CSS animation */
  if (!reduceMotion) {
    var t0 = performance.now();
    (function tick() {
      if (!breath.classList.contains('is-guided')) {
        var t = (performance.now() - t0) % CYCLE;
        var text = t < IN ? phases[0].text : t < IN + HOLD ? phases[1].text : phases[2].text;
        if (label && label.textContent !== text && !label.classList.contains('is-fading')) setLabel(text);
      }
      requestAnimationFrame(tick);
    })();
  } else if (label) {
    label.textContent = 'Breathe in. Hold. Breathe out.';
  }
})();
