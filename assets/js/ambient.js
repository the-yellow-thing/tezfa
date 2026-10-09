/* Mystique Tao — ambience: time-of-day colour shift, drifting mist & motes, synthesized nature sound.
   No dependencies, no files fetched. Loaded with defer after site.js (which defines MT.audio). */
(function () {
  'use strict';
  var MT = window.MT = window.MT || {};
  var root = document.documentElement;
  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* =====================================================================
     1. Palettes: one "time of day" per section, interpolated by scroll.
     Flat arrays: bg rgb (body), tint rgb (mist), glow rgb (accent glows),
     mote rgb, mist strength, then the sound mix: wind, water (stream), birds, sea, desert wind.
     cue: the arrival sound for that section, steps of [kind, delay s, a, b, c]:
       gong  a = fundamental Hz (70–140), b = decay s, c = pan
       drum  a = Hz, b = level scale
       swell a = 1 (breath in, brightening) or -1 (breath out), b = seconds
     ===================================================================== */
  var STOPS = [
    { sel: '.hero',       p: [30, 17, 11,  238, 118,  48,  236, 112,  40,  255, 186, 104, 1.25,  .90, .30, .45,  0,   0  ], /* dusk ember, candlelit */
      cue: [['swell', 0, 1], ['gong', 0.7, 98, 5]] },
    { sel: '#breathe',    p: [ 5, 15, 11,   36, 112,  78,  224, 140,  62,  246, 204, 128, 1.10,  .50, 1.0, .25,  0,   0  ], /* deep forest night */
      cue: [['swell', 0, 1], ['swell', 1.6, -1]] },
    { sel: '#principles', p: [ 7, 17, 26,   66, 128, 162,  122, 170, 186,  232, 216, 172, 1.15,  .80, .55, .40,  0,   0  ], /* blue-green twilight, moonlit */
      cue: [['gong', 0, 110, 6]] },
    { sel: '.settings',   p: [13, 25, 11,  108, 152,  58,  188, 164,  70,  244, 210, 116, 1.15,  .70, .50, 1.0,  0,   0  ], /* moss & roots */
      cue: [['drum', 0, 73], ['drum', 0.34, 73, 0.6], ['swell', 0.3, -1]] },
    { sel: '#ways',       p: [14, 12, 30,  112,  98, 178,  168, 140, 222,  214, 220, 255, 1.15,  .60, .40, .75, .10, .20], /* starlit indigo */
      cue: [['drum', 0, 82], ['gong', 0.18, 82.4, 5]] },
    { sel: '.dualities',  p: [28, 13, 13,  204,  86,  58,  232, 108,  56,  255, 178, 108, 1.20,  .45, .30, .60, .15, .45], /* ritual candle, dark wine-ember */
      cue: [['gong', 0, 73.4, 6, -0.35], ['gong', 0.9, 110, 5, 0.35]] },
    { sel: '.meets',      p: [32, 25, 12,  232, 190, 106,  226, 176,  90,  255, 214, 140, 1.20,  .45, .35, .95, .20, .25], /* dawn gold */
      cue: [['swell', 0, 1], ['gong', 0.9, 130.8, 4.5]] },
    { sel: '#practise',   p: [30, 15, 22,  196, 112, 138,  230, 132, 112,  255, 206, 196, 1.15,  .30, .35, .50, .45, .35], /* desert rose */
      cue: [['drum', 0, 87], ['drum', 0.22, 87, 0.7], ['drum', 0.44, 87, 0.5], ['swell', 0.5, -1]] },
    { sel: '#where',      p: [ 5, 22, 30,   58, 156, 172,  230, 174, 100,  226, 248, 244, 1.15,  .05, .10, .20, 1.0, .75], /* Red Sea morning */
      cue: [['swell', 0, 1, 4], ['gong', 1.2, 73.4, 7]] },
    { sel: '#contact',    p: [36, 18,  9,  246, 128,  56,  246, 122,  46,  255, 192, 112, 1.25,  .10, .10, .30, .85, .60], /* Sinai sunrise ember */
      cue: [['drum', 0, 65], ['gong', 0.12, 98, 6]] }
  ].map(function (s) { s.el = document.querySelector(s.sel); return s; }).filter(function (s) { return s.el; });
  if (!STOPS.length) return;

  var N = STOPS[0].p.length;
  var target = STOPS[0].p.slice(), current = STOPS[0].p.slice();
  var section = 0;            /* index of the section nearest the viewport centre */
  var dirty = true;           /* scroll/resize happened: recompute target */
  var lastCss = {};

  function smooth(t) { return t * t * (3 - 2 * t); }
  function computeTarget() {
    var mid = window.innerHeight * 0.5, centres = [], i;
    for (i = 0; i < STOPS.length; i++) {
      var r = STOPS[i].el.getBoundingClientRect();
      centres.push(r.top + r.height * 0.5);
      if (r.top <= mid && r.bottom > mid) section = i;
    }
    if (mid <= centres[0]) { copy(target, STOPS[0].p); section = 0; return; }
    var last = STOPS.length - 1;
    if (mid >= centres[last]) { copy(target, STOPS[last].p); return; }
    for (i = 0; i < last; i++) {
      if (mid >= centres[i] && mid < centres[i + 1]) {
        var t = smooth((mid - centres[i]) / Math.max(1, centres[i + 1] - centres[i]));
        for (var k = 0; k < N; k++) target[k] = STOPS[i].p[k] + (STOPS[i + 1].p[k] - STOPS[i].p[k]) * t;
        return;
      }
    }
  }
  function copy(a, b) { for (var k = 0; k < N; k++) a[k] = b[k]; }
  function rgb(a, o) { return Math.round(a[o]) + ' ' + Math.round(a[o + 1]) + ' ' + Math.round(a[o + 2]); }
  function setVar(name, value) { if (lastCss[name] !== value) { lastCss[name] = value; root.style.setProperty(name, value); } }
  function applyCss() {
    setVar('--mt-bg-shift', rgb(current, 0));
    setVar('--mt-tint', rgb(current, 3));
    setVar('--mt-glow', rgb(current, 6));
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    setVar('--mt-progress', Math.min(1, Math.max(0, window.scrollY / max)).toFixed(4));
  }

  /* =====================================================================
     2. Canvas: slow mist bands (drawn small, scaled up) + soft warm motes.
     ===================================================================== */
  var canvas = document.querySelector('.ambient-canvas');
  var ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  var mist = document.createElement('canvas'), mctx = mist.getContext('2d');
  var MIST_SCALE = 0.25;
  var W = 0, H = 0, dpr = 1, bands = [], motes = [], clock = 0;

  function rand(a, b) { return a + Math.random() * (b - a); }
  function seed() {
    bands = [];
    for (var i = 0; i < 6; i++) bands.push({
      x: rand(0, 1), y: rand(0.08, 0.95), w: rand(0.55, 1.15), h: rand(0.10, 0.24),
      speed: rand(0.004, 0.011) * (Math.random() < 0.5 ? -1 : 1), phase: rand(0, 6.28), alpha: rand(0.07, 0.13)
    });
    var count = W < 640 ? 22 : 40;
    motes = [];
    for (var j = 0; j < count; j++) motes.push({
      x: rand(0, W), y: rand(0, H), vx: rand(-5, 5), vy: rand(-9, -2), r: rand(0.7, 2.0),
      period: rand(5, 11), phase: rand(0, 6.28), wob: rand(0, 6.28), base: rand(0.25, 0.6)
    });
  }
  function resize() {
    if (!ctx) return;
    var oldW = W, oldH = H;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    mist.width = Math.max(1, Math.ceil(W * MIST_SCALE)); mist.height = Math.max(1, Math.ceil(H * MIST_SCALE));
    if (!motes.length || Math.abs(oldW - W) > 120) seed();
    else if (oldH && oldH !== H) motes.forEach(function (m) { m.y = m.y / oldH * H; });
  }
  function rgba(o, a) {
    return 'rgba(' + Math.round(current[o]) + ',' + Math.round(current[o + 1]) + ',' + Math.round(current[o + 2]) + ',' + a.toFixed(3) + ')';
  }
  function draw(dt) {
    if (!ctx) return;
    clock += dt;
    var strength = current[12];
    /* mist, on the small canvas */
    mctx.setTransform(MIST_SCALE, 0, 0, MIST_SCALE, 0, 0);
    mctx.clearRect(0, 0, W, H);
    var g = mctx.createRadialGradient(W * 0.5, H * 1.08, 0, W * 0.5, H * 1.08, Math.max(W, H) * 0.75);
    g.addColorStop(0, rgba(6, 0.12 * strength)); g.addColorStop(1, rgba(6, 0));
    mctx.fillStyle = g; mctx.fillRect(0, 0, W, H);
    for (var i = 0; i < bands.length; i++) {
      var b = bands[i];
      b.x += b.speed * dt;
      var span = 1 + b.w * 2;
      if (b.x > 1 + b.w) b.x -= span; else if (b.x < -b.w) b.x += span;
      var cx = b.x * W, cy = (b.y + Math.sin(clock * 0.05 + b.phase) * 0.03) * H;
      var bw = b.w * W, bh = b.h * H, a = b.alpha * strength * (0.75 + 0.25 * Math.sin(clock * 0.07 + b.phase * 2));
      mctx.save();
      mctx.translate(cx, cy); mctx.scale(bw, bh);
      var bg = mctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      bg.addColorStop(0, rgba(3, a)); bg.addColorStop(0.55, rgba(3, a * 0.45)); bg.addColorStop(1, rgba(3, 0));
      mctx.fillStyle = bg; mctx.beginPath(); mctx.arc(0, 0, 1, 0, 6.2832); mctx.fill();
      mctx.restore();
    }
    /* compose */
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(mist, 0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    for (var j = 0; j < motes.length; j++) {
      var m = motes[j];
      m.x += (m.vx + Math.sin(clock * 0.3 + m.wob) * 5) * dt;
      m.y += m.vy * dt;
      if (m.y < -20) { m.y = H + 20; m.x = rand(0, W); }
      if (m.x < -20) m.x = W + 20; else if (m.x > W + 20) m.x = -20;
      var pulse = 0.5 + 0.5 * Math.sin(clock * 6.2832 / m.period + m.phase);
      var al = Math.min(1, m.base * (0.3 + 0.7 * pulse * pulse) * 0.8);
      var R = m.r * 7;
      var mg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, R);
      mg.addColorStop(0, rgba(9, al)); mg.addColorStop(0.14, rgba(9, al * 0.55)); mg.addColorStop(1, rgba(9, 0));
      ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(m.x, m.y, R, 0, 6.2832); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  /* =====================================================================
     Loop: ~30 fps while visible; one static frame per change under reduced motion.
     ===================================================================== */
  var raf = 0, lastT = 0, lastMixT = 0;
  function tick(now) {
    raf = 0;
    if (document.hidden) return;
    if (now - lastT < 32) { raf = requestAnimationFrame(tick); return; }
    var dt = lastT ? Math.min(now - lastT, 100) / 1000 : 0.016;
    lastT = now;
    if (dirty) { dirty = false; computeTarget(); }
    var k = 1 - Math.exp(-dt / 0.9); /* colours settle slowly, like light changing */
    for (var i = 0; i < N; i++) current[i] += (target[i] - current[i]) * k;
    applyCss(); draw(dt);
    if (now - lastMixT > 500) { lastMixT = now; sound.mix(); sound.sectionCue(section); }
    raf = requestAnimationFrame(tick);
  }
  function staticFrame() {
    raf = 0;
    computeTarget(); copy(current, target); applyCss();
    if (ctx) { clock = 40; draw(0); }
    sound.mix(); sound.sectionCue(section);
  }
  function schedule() {
    dirty = true;
    if (raf || document.hidden) return;
    raf = requestAnimationFrame(reduceMotion ? staticFrame : tick);
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', function () { resize(); schedule(); }, { passive: true });
  window.addEventListener('load', schedule);

  /* =====================================================================
     3. Sound: synthesized soundscape, section cues, click ticks. Everything
        runs through MT.out (site.js), which the mute toggle silences.
     ===================================================================== */
  var KEY = 'mt-sound';
  var toggle = document.querySelector('[data-ambient-toggle]');
  var hint = toggle && toggle.querySelector('[data-ambient-hint]');
  function remembered() { try { return window.localStorage.getItem(KEY); } catch (e) { return null; } }
  function remember(v) { try { window.localStorage.setItem(KEY, v); } catch (e) { /* storage blocked: fine */ } }

  var sound = (function () {
    var A = null, G = null, buffers = null, timers = [], drip = null, snap = null;
    var hushes = {};  /* reasons to rest the soundscape: a video in view, the free recording playing */
    var enabled = remembered() !== 'off';  /* on by default; a mute is remembered */
    var cueSection = -1, cuePending = -1, cueTimer = 0, lastCueAt = 0;
    MT.muted = !enabled;

    function ac() { if (!A && MT.audio) A = MT.audio(); return A; }
    function out() { return MT.out || A.destination; }
    function running() { return !!(A && A.state === 'running'); }
    function hushed() { for (var k in hushes) if (hushes[k]) return true; return false; }
    function panner(v) { var p = A.createStereoPanner ? A.createStereoPanner() : gain(1); if (p.pan) p.pan.value = v || 0; return p; }
    function osc(f) { var o = A.createOscillator(); o.frequency.value = f; return o; }
    function hold(param, t) { if (param.cancelAndHoldAtTime) param.cancelAndHoldAtTime(t); else { param.cancelScheduledValues(t); param.setValueAtTime(param.value, t); } }

    /* Seamless looping noise: generate a little extra and cross-fade the tail into the head. */
    function noise(kind, seconds) {
      var sr = A.sampleRate, len = Math.floor(sr * seconds), fade = Math.floor(sr * 0.5);
      var buf = A.createBuffer(2, len, sr);
      for (var c = 0; c < 2; c++) {
        var tmp = new Float32Array(len + fade), d = buf.getChannelData(c), i, w, last = 0;
        var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (i = 0; i < tmp.length; i++) {
          w = Math.random() * 2 - 1;
          if (kind === 'brown') { last = (last + 0.02 * w) / 1.02; tmp[i] = last * 3.5; }
          else { /* pink (Paul Kellet) */
            b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.96900 * b2 + w * 0.1538520;
            b3 = 0.86650 * b3 + w * 0.3104856; b4 = 0.55000 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.0168980;
            tmp[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
          }
        }
        for (i = 0; i < len; i++) d[i] = tmp[i];
        for (i = 0; i < fade; i++) d[i] = tmp[i] * (i / fade) + tmp[len + i] * (1 - i / fade);
      }
      return buf;
    }
    function loop(buf, rate) { var s = A.createBufferSource(); s.buffer = buf; s.loop = true; s.playbackRate.value = rate || 1; return s; }
    function filt(type, f, q) { var b = A.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; return b; }
    function gain(v) { var g = A.createGain(); g.gain.value = v; return g; }
    function lfo(freq, depth, param) { var o = A.createOscillator(), g = gain(depth); o.frequency.value = freq; o.connect(g); g.connect(param); return o; }
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

    function build() {
      if (!buffers) buffers = { pink: noise('pink', 5) };
      var now = A.currentTime, srcs = [];
      G = { master: gain(0.0001), duck: gain(1), srcs: srcs };
      /* no rumble: cut everything below ~250 Hz on the whole soundscape */
      var hp1 = filt('highpass', 250, 0.7), hp2 = filt('highpass', 250, 0.7);
      G.duck.connect(hp1); hp1.connect(hp2); hp2.connect(G.master); G.master.connect(out());

      /* wind: airy pink noise in a high band, silent between gusts */
      var wind = loop(buffers.pink, 0.9), wlp = filt('bandpass', 1400, 0.7), wg = gain(0.0001);
      G.wind = gain(0.0); wind.connect(wlp); wlp.connect(wg); wg.connect(G.wind); G.wind.connect(G.duck);
      srcs.push(wind);
      G.windFilter = wlp; G.windGust = wg;

      /* water: pink noise, band-passed, with fast small flutter (the "babble") */
      var water = loop(buffers.pink, 1), whp = filt('highpass', 1400, 0.7), wbp = filt('bandpass', 2200, 0.9);
      var wbp2 = filt('bandpass', 3400, 1.3), wg2 = gain(0.5), wpan = A.createStereoPanner ? A.createStereoPanner() : gain(1);
      if (wpan.pan) wpan.pan.value = -0.3;
      G.water = gain(0.0);
      water.connect(whp); whp.connect(wbp); whp.connect(wbp2); wbp.connect(wg2); wbp2.connect(wg2);
      wg2.connect(wpan); wpan.connect(G.water); G.water.connect(G.duck);
      srcs.push(water, lfo(5.3, 0.12, wg2.gain), lfo(8.9, 0.07, wg2.gain), lfo(0.41, 260, wbp.frequency), lfo(0.67, 420, wbp2.frequency));


      /* sea: one surge at a time, a hiss that rises and draws back over sand, silence between */
      var sea = loop(buffers.pink, 0.94), shp = filt('highpass', 250, 0.7), sbp = filt('bandpass', 600, 0.6), span = panner(0.15);
      G.seaSurge = gain(0); G.seaBand = sbp; G.sea = gain(0);
      sea.connect(shp); shp.connect(sbp); sbp.connect(G.seaSurge); G.seaSurge.connect(span); span.connect(G.sea); G.sea.connect(G.duck);
      sea.offset = 1.7; srcs.push(sea);

      /* desert wind: warmer, lower-mid gusts with a faint whistle; also comes and goes */
      var des = loop(buffers.pink, 0.83), dbp = filt('bandpass', 650, 1.4), dwh = filt('bandpass', 1250, 9), dwg = gain(0.35);
      G.desGust = gain(0); G.desBand = dbp; G.desert = gain(0);
      des.connect(dbp); dbp.connect(G.desGust); des.connect(dwh); dwh.connect(dwg); dwg.connect(G.desGust); G.desGust.connect(G.desert); G.desert.connect(G.duck);
      des.offset = 3.1; srcs.push(des, lfo(0.05, 180, dwh.frequency));

      /* birds: own bus with a soft distant echo */
      G.birds = gain(1); var dl = A.createDelay(1), fb = gain(0.28), dlpf = filt('lowpass', 3200, 0.5), wet = gain(0.22);
      G.birds.connect(G.duck); G.birds.connect(dl); dl.delayTime.value = 0.21; dl.connect(dlpf); dlpf.connect(fb); fb.connect(dl); dlpf.connect(wet); wet.connect(G.duck);

      srcs.forEach(function (s) { if (s.offset) s.start(now, s.offset); else s.start(now); });
      gust(); later(wave, 1200); later(desertGust, 5000); birdLater(); mix(true);
    }
    function teardown() {
      timers.forEach(clearTimeout); timers = [];
      if (!G) return;
      G.srcs.forEach(function (s) { try { s.stop(); } catch (e) { /* not started */ } });
      try { G.master.disconnect(); } catch (e) { /* already gone */ }
      G = null;
    }
    function gust() {
      if (!G) return;
      if (running()) {
        var t = A.currentTime;
        var up = rand(2, 4), hold = rand(0.5, 1.5);
        G.windFilter.frequency.cancelScheduledValues(t); G.windGust.gain.cancelScheduledValues(t);
        G.windFilter.frequency.setValueAtTime(rand(900, 1300), t);
        G.windFilter.frequency.linearRampToValueAtTime(rand(1600, 2200), t + up);
        G.windGust.gain.setValueAtTime(0.0001, t);
        G.windGust.gain.linearRampToValueAtTime(rand(0.5, 1), t + up);
        G.windGust.gain.setTargetAtTime(0.0001, t + up + hold, rand(0.9, 1.6));
      }
      later(gust, rand(8000, 16000));
    }

    /* a wave: builds over ~2 s, breaks, recedes as a brighter hiss over 3–4 s, then nothing */
    function wave() {
      if (!G) return;
      var rise = rand(1.7, 2.3), fall = rand(3, 4);
      if (running()) {
        var t = A.currentTime + 0.05, peak = rand(0.6, 1), g = G.seaSurge.gain, f = G.seaBand.frequency;
        hold(g, t); hold(f, t);
        g.linearRampToValueAtTime(peak * 0.2, t + rise * 0.4);
        g.linearRampToValueAtTime(peak, t + rise);
        g.linearRampToValueAtTime(peak * 0.35, t + rise + fall * 0.4);
        g.linearRampToValueAtTime(0, t + rise + fall);
        f.exponentialRampToValueAtTime(rand(1300, 1800), t + rise);
        f.exponentialRampToValueAtTime(rand(2400, 3000), t + rise + fall * 0.5);
        f.exponentialRampToValueAtTime(600, t + rise + fall);
      }
      later(wave, (rise + fall) * 1000 + rand(1500, 4500)); /* a surge every ~6.5–10.5 s */
    }
    function desertGust() {
      if (!G) return;
      var rise = rand(1.5, 2.5), fall = rand(2, 3);
      if (running()) {
        var t = A.currentTime + 0.05, g = G.desGust.gain, f = G.desBand.frequency;
        hold(g, t); hold(f, t);
        g.linearRampToValueAtTime(rand(0.5, 1), t + rise);
        g.linearRampToValueAtTime(0, t + rise + fall);
        f.exponentialRampToValueAtTime(rand(800, 1000), t + rise);
        f.exponentialRampToValueAtTime(560, t + rise + fall);
      }
      later(desertGust, (rise + fall) * 1000 + rand(5000, 12000));
    }

    /* sparse birdsong: short swept sine chirps, randomly panned */
    var birdLevel = 0.5;
    function birdLater() { later(function () { bird(); birdLater(); }, (4 + Math.random() * 11 * (1.15 - 0.5 * birdLevel)) * 1000); }
    function bird() {
      if (!G || !running() || document.hidden) return;
      var t = A.currentTime + 0.05, pan = A.createStereoPanner ? A.createStereoPanner() : gain(1);
      if (pan.pan) pan.pan.value = rand(-0.8, 0.8);
      var lp = filt('lowpass', 6500, 0.4), level = 0.02 * (0.4 + 0.6 * birdLevel) * rand(0.6, 1);
      pan.connect(lp); lp.connect(G.birds);
      var f = rand(2500, 3900), song = Math.random();
      var n = song < 0.6 ? 2 + Math.floor(Math.random() * 4) : 2;
      for (var i = 0; i < n; i++) {
        var dur = song < 0.6 ? rand(0.06, 0.13) : 0.32, f0 = song < 0.6 ? f : (i ? f * 0.84 : f);
        var o = A.createOscillator(), g = gain(0);
        o.frequency.setValueAtTime(f0, t);
        if (song < 0.6) { o.frequency.exponentialRampToValueAtTime(f0 * rand(1.2, 1.45), t + dur * 0.4); o.frequency.exponentialRampToValueAtTime(f0 * rand(0.85, 1.05), t + dur); }
        else o.frequency.exponentialRampToValueAtTime(f0 * 0.97, t + dur);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(level, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(pan); o.start(t); o.stop(t + dur + 0.05);
        t += dur + (song < 0.6 ? rand(0.05, 0.12) : 0.12);
      }
    }

    /* section-aware mix: forest (wind, stream, birds) near the top, sea and desert wind toward Dahab and contact */
    function mix(now) {
      birdLevel = current[15];
      if (!G || !running()) return;
      var t = A.currentTime, tc = now ? 0.05 : 1.5;
      G.wind.gain.setTargetAtTime(0.10 * current[13], t, tc);
      G.water.gain.setTargetAtTime(0.05 * current[14], t, tc);
      G.sea.gain.setTargetAtTime(0.09 * current[16], t, tc);
      G.desert.gain.setTargetAtTime(0.07 * current[17], t, tc);
    }

    /* a soft bowl-like tone; used for the unmute "hello" (the breath guide has its own, in site.js) */
    function bowl(freq, level, seconds, pan) {
      if (!running()) return;
      var t = A.currentTime + 0.02, p = A.createStereoPanner ? A.createStereoPanner() : gain(1);
      if (p.pan) p.pan.value = pan || 0;
      p.connect(out());
      [1, 2.0, 2.98, 4.1].forEach(function (r, i) {
        var o = A.createOscillator(), g = gain(0), peak = level / ((i + 1) * (i + 1));
        o.frequency.value = freq * r * (i ? 1 + rand(-0.002, 0.002) : 1);
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + 0.06);
        g.gain.exponentialRampToValueAtTime(0.0001, t + seconds / (1 + i * 0.4));
        o.connect(g); g.connect(p); o.start(t); o.stop(t + seconds + 0.1);
      });
    }
    /* ---- Section arrival cues: deep, ritual, quiet. Fundamentals from A-minor pentatonic (D2 E2 G2 A2 C3). ---- */
    /* low gong: inharmonic partials [ratio, level, decay share, attack]; the upper ones bloom late and fade first */
    var GONG = [[1, 1, 1, 0.03], [1.48, 0.55, 0.85, 0.08], [2.11, 0.42, 0.7, 0.14], [2.69, 0.3, 0.55, 0.22], [3.37, 0.2, 0.45, 0.3], [4.12, 0.14, 0.35, 0.38], [5.33, 0.08, 0.28, 0.45], [6.71, 0.05, 0.22, 0.5]];
    function gong(t, f, decay, pan) {
      var bus = gain(1), lp = filt('lowpass', 1600, 0.5), pn = panner(pan); bus.connect(lp); lp.connect(pn); pn.connect(out());
      var level = 0.05;
      GONG.forEach(function (q, i) {
        var o = osc(f), g = gain(0), fr = f * q[0] * (i ? 1 + rand(-0.004, 0.004) : 1), end = t + decay * q[2];
        o.frequency.setValueAtTime(fr * 1.012, t); o.frequency.exponentialRampToValueAtTime(fr, t + 1.2); /* the pitch settles after the strike */
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(level * q[1], t + q[3]); g.gain.exponentialRampToValueAtTime(0.0001, end);
        o.connect(g); g.connect(bus); o.start(t); o.stop(end + 0.1);
      });
      /* the fundamental's twin, a breath out of tune: a slow beat */
      var o2 = osc(f * 1.0035), g2 = gain(0);
      g2.gain.setValueAtTime(0, t); g2.gain.linearRampToValueAtTime(level * 0.45, t + 0.06); g2.gain.exponentialRampToValueAtTime(0.0001, t + decay * 0.9);
      o2.connect(g2); g2.connect(bus); o2.start(t); o2.stop(t + decay);
    }
    /* soft frame drum: a low sine thump that drops in pitch, a second membrane mode, a little skin noise */
    function drum(t, f, scale, pan) {
      var level = 0.08 * (scale || 1), pn = panner(pan); pn.connect(out());
      var o = osc(f * 2.4), g = gain(0);
      o.frequency.setValueAtTime(f * 2.4, t); o.frequency.exponentialRampToValueAtTime(f, t + 0.07);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(level, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.75);
      o.connect(g); g.connect(pn); o.start(t); o.stop(t + 0.8);
      var o2 = osc(f * 1.59 * 1.6), g2 = gain(0);
      o2.frequency.setValueAtTime(f * 1.59 * 1.6, t); o2.frequency.exponentialRampToValueAtTime(f * 1.59, t + 0.06);
      g2.gain.setValueAtTime(0, t); g2.gain.linearRampToValueAtTime(level * 0.3, t + 0.004); g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      o2.connect(g2); g2.connect(pn); o2.start(t); o2.stop(t + 0.35);
      var n = A.createBufferSource(), nlp = filt('lowpass', 1200, 0.7), ng = gain(0); n.buffer = buffers.pink;
      ng.gain.setValueAtTime(0, t); ng.gain.linearRampToValueAtTime(level * 0.6, t + 0.002); ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
      n.connect(nlp); nlp.connect(ng); ng.connect(pn); n.start(t, rand(0, 4)); n.stop(t + 0.1);
    }
    /* breath-like swell: filtered noise, ~1.5 s in and ~1.5 s out; dir 1 brightens (inhale), -1 darkens (exhale) */
    function swell(t, dir, seconds, pan) {
      var d = seconds || 3, half = d / 2, f0 = dir < 0 ? 1100 : 480, f1 = dir < 0 ? 480 : 1100;
      var src = A.createBufferSource(), hp = filt('highpass', 250, 0.7), bp = filt('bandpass', f0, 0.9), g = gain(0), pn = panner(pan);
      src.buffer = buffers.pink; src.loop = true;
      src.connect(hp); hp.connect(bp); bp.connect(g); g.connect(pn); pn.connect(out());
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.05, t + half); g.gain.linearRampToValueAtTime(0, t + d);
      bp.frequency.setValueAtTime(f0, t); bp.frequency.exponentialRampToValueAtTime(f1, t + d);
      src.start(t, rand(0, 4)); src.stop(t + d + 0.1);
    }
    function playCue(steps) {
      if (!running() || !buffers || !steps) return;
      var t0 = A.currentTime + 0.03;
      steps.forEach(function (st) {
        var t = t0 + st[1];
        if (st[0] === 'gong') gong(t, st[2], st[3] || 5, st[4] || rand(-0.2, 0.2));
        else if (st[0] === 'drum') drum(t, st[2], st[3], rand(-0.15, 0.15));
        else if (st[0] === 'swell') swell(t, st[2], st[3], rand(-0.2, 0.2));
      });
    }
    function sectionCue(i) {
      if (cueSection < 0) { cueSection = i; return; } /* first reading: no cue on load */
      if (i === cueSection) { cuePending = -1; clearTimeout(cueTimer); return; }
      if (i === cuePending) return;
      cuePending = i; clearTimeout(cueTimer);
      /* debounce: the section must hold for a moment, and cues are spaced out */
      cueTimer = setTimeout(function () {
        var now = Date.now();
        cueSection = cuePending; cuePending = -1;
        if (enabled && G && !hushed() && now - lastCueAt > 1800) { lastCueAt = now; playCue(STOPS[cueSection] && STOPS[cueSection].cue); }
      }, 700);
    }

    /* ---- Tap feedback: links fall like a water droplet, buttons answer with a soft wooden tap ---- */
    var WOOD = [659.3, 784.0, 880.0, 1046.5, 1174.7];   /* E5 G5 A5 C6 D6 */
    var DROP = [1174.7, 1318.5, 1568.0, 1760.0];        /* D6 E6 G6 A6 */
    function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
    function wood() {
      var t = A.currentTime + 0.005, f = pick(WOOD) * (1 + rand(-0.01, 0.01));
      if (!snap) { snap = A.createBuffer(1, Math.floor(A.sampleRate * 0.06), A.sampleRate); var d = snap.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
      var n = A.createBufferSource(), bp = filt('bandpass', f, 9), ng = gain(0);
      n.buffer = snap; n.connect(bp); bp.connect(ng); ng.connect(out());
      ng.gain.setValueAtTime(0, t); ng.gain.linearRampToValueAtTime(0.7, t + 0.001); ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      n.start(t); n.stop(t + 0.06);
      [[1, 0.022, 0.07], [2.57, 0.006, 0.03]].forEach(function (m) {   /* the block's body and its first overtone */
        var o = osc(f * m[0]), g = gain(0);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(m[1], t + 0.002); g.gain.exponentialRampToValueAtTime(0.0001, t + m[2]);
        o.connect(g); g.connect(out()); o.start(t); o.stop(t + m[2] + 0.02);
      });
    }
    function wet() {  /* a small damp echo for droplets, built once */
      if (!drip) {
        drip = gain(1); var dl = A.createDelay(0.5), fb = gain(0.28), lp = filt('lowpass', 2600, 0.5), w = gain(0.22);
        dl.delayTime.value = 0.13; drip.connect(out()); drip.connect(dl); dl.connect(lp); lp.connect(fb); fb.connect(dl); lp.connect(w); w.connect(out());
      }
      return drip;
    }
    function drop(t, f0, dur, level) {
      var o = osc(f0), g = gain(0);
      o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(rand(380, 440), t + dur);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(level, t + 0.003); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(wet()); o.start(t); o.stop(t + dur + 0.02);
    }
    function droplet() {
      var t = A.currentTime + 0.005, f = pick(DROP), dur = rand(0.06, 0.12);
      drop(t, f, dur, 0.03);
      if (Math.random() < 0.35) drop(t + rand(0.09, 0.16), f * 1.125, dur * 0.8, 0.012); /* now and then a second, smaller drop */
    }
    function tap(el) {
      if (!enabled || !running()) return;
      if (el.tagName === 'A') droplet(); else wood();
    }

    function fadeIn(seconds) {
      if (!G) build();
      if (G.closing) { clearTimeout(G.closing); G.closing = 0; }
      var p = G.master.gain, t = A.currentTime;
      p.cancelScheduledValues(t); p.setValueAtTime(Math.max(p.value, 0.0001), t); p.exponentialRampToValueAtTime(hushed() ? 0.0001 : 1, t + seconds);
      mix(true);
    }
    function fadeOut(seconds, then) {
      if (!G) { if (then) then(); return; }
      var p = G.master.gain, t = A.currentTime;
      p.cancelScheduledValues(t); p.setValueAtTime(Math.max(p.value, 0.0001), t); p.exponentialRampToValueAtTime(0.0001, t + seconds);
      if (then) { clearTimeout(G.closing); G.closing = setTimeout(then, seconds * 1000 + 80); }
    }

    /* start on the first gesture anywhere (browsers require one) */
    var GESTURES = ['pointerdown', 'pointerup', 'touchend', 'keydown', 'click'];
    var waiting = false;
    function onGesture() { if (enabled) start(); }
    function wait(on) {
      waiting = on;
      GESTURES.forEach(function (ev) { document[on ? 'addEventListener' : 'removeEventListener'](ev, onGesture, true); });
      ui();
    }
    function start() {
      if (!ac()) { if (toggle) toggle.hidden = true; wait(false); return; }
      MT.out.gain.cancelScheduledValues(A.currentTime); MT.out.gain.setValueAtTime(1, A.currentTime);
      var go = function () {
        if (!running()) return;           /* not a real activation yet: keep waiting */
        if (waiting) wait(false);
        if (enabled && !document.hidden) fadeIn(3);
        ui();
      };
      if (A.state !== 'running') { var pr = A.resume(); if (pr && pr.then) pr.then(go, function () {}); } else go();
    }
    function setMuted(muted) {
      enabled = !muted; MT.muted = muted;
      remember(muted ? 'off' : 'on');
      if (muted) {
        if (waiting) wait(false);
        if (A && MT.out) { var t = A.currentTime; MT.out.gain.cancelScheduledValues(t); MT.out.gain.setValueAtTime(MT.out.gain.value, t); MT.out.gain.linearRampToValueAtTime(0, t + 1.5); }
        fadeOut(1.5, teardown);
      } else {
        start();
        if (running()) bowl(392.0, 0.035, 2.2, 0); /* a soft "hello" */
      }
      ui();
    }
    MT.setMuted = setMuted;
    /* site.js rests the soundscape while a video is in view or the free recording plays */
    MT.hush = function (reason, on) {
      if (!!hushes[reason] === !!on) return;
      hushes[reason] = !!on;
      if (G && running() && enabled) { if (hushed()) fadeOut(1.2); else fadeIn(2.5); }
      ui();
    };
    MT.duck = function (seconds) {
      if (!G || !running()) return;
      var t = A.currentTime;
      G.duck.gain.setTargetAtTime(0.55, t, 0.25);
      G.duck.gain.setTargetAtTime(1, t + seconds * 0.6, 1.2);
    };

    function ui() {
      if (!toggle) return;
      var playing = enabled && running() && !!G && !hushed();
      toggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      toggle.classList.toggle('is-playing', playing);
      toggle.classList.toggle('is-waiting', enabled && !playing);
      if (hint) hint.textContent = enabled ? (playing ? 'on' : (running() && G ? 'paused' : 'tap to begin')) : 'off';
    }

    if (toggle) {
      if (!(window.AudioContext || window.webkitAudioContext)) { toggle.hidden = true; }
      else {
        toggle.hidden = false;
        toggle.addEventListener('click', function () {
          /* on, but still waiting for a gesture: this click is that gesture, so begin */
          if (enabled && !(running() && G)) { start(); return; }
          if (enabled && hushed()) { hushes = {}; fadeIn(1.5); ui(); return; } /* paused for a video: bring nature back */
          setMuted(enabled);
        });
      }
    }
    if (enabled) wait(true); else ui();

    /* gentle feedback on actions: links, buttons, toggles */
    document.addEventListener('click', function (e) {
      var el = e.target && e.target.closest ? e.target.closest('a, button, [role="button"], summary') : null;
      if (!el || el === toggle) return;
      tap(el);
    });

    /* pause everything while the tab is hidden; resume if it was playing */
    var wasRunning = false;
    document.addEventListener('visibilitychange', function () {
      if (!A) return;
      if (document.hidden) {
        wasRunning = running();
        if (wasRunning) { if (G) fadeOut(0.25); later(function () { if (document.hidden && A.state === 'running') { var pr = A.suspend(); if (pr && pr.then) pr.then(ui, function () {}); } }, 300); }
      } else if (wasRunning) {
        var pr = A.resume();
        var back = function () { if (enabled && G) fadeIn(1.5); ui(); };
        if (pr && pr.then) pr.then(back, function () {}); else back();
      }
    });

    return { mix: function () { mix(false); }, sectionCue: sectionCue };
  })();

  /* page visibility for the canvas loop */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = 0; lastT = 0; }
    else schedule();
  });

  resize();
  computeTarget(); copy(current, target); applyCss();
  if (reduceMotion) staticFrame(); else schedule();
})();
