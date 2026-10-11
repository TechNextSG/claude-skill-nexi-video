  /* ======================= <SERIES> · <TOPIC>: <the analogy in five words> (~60 s) =======================
     One paragraph: the analogy, the role Nexi plays, the beats, the quiz, the call-to-action object.
     Composition: for each scene, the camera (x, zoom), Nexi's screen spot and the group's extents. Nothing in a corner. */
  var TOTAL = 0;
  var GREEN = '#21A366', GREEN_L = '#E3F5EC', CORAL = '#E0456B', AMBER = '#F3B700', NAVY = '#1E3A6E';
  var SA = 1960, SB = 4200, SC = 6400;          /* world x of each scene (keep 2000+ apart so scenes never share a frame) */
  function hud(t) { HUD.chap = { n: 0, title: t }; HUD.chapT = window.T; }
  function popK(v) { return L.back(clamp(v, 0, 1), 1.8); }
  function chipW(text, fs, icon) { g.save(); g.font = '800 ' + fs + 'px ' + L.FONT; var w = g.measureText(text).width + fs * 1.3 + (icon ? fs * 1.15 : 0); g.restore(); return w; }
  function cheer() { EMO = []; N.play('excited'); E.star(1.6); var b = N.botPx(); L.sparks(b.x, b.y - U * 0.5, 14, 640, ['#FFD25E', '#fff', '#8FC0FF']); sfx('tada', 0.55); }
  /* framing math: author positions from the screen. Scene A: camera (SA - 250, 440) at zoom 0.9 */
  function wx(camX, zoom, sx) { return camX + (sx - 960) / zoom; }
  var NAX = wx(SA - 250, 0.9, 380);             /* Nexi rests at screen x 380 */

  /* ---------------- set pieces: boxes sized from measured text; content centred in its box ---------------- */
  var A = { a: 0 };
  prop({ on: true, back: function (gg) {
    if (A.a <= 0.01) return; var title = 'Card title', w = Math.max(600, L.tw(gg, title, 36, 800) + 80), h = 420, x = SA - w / 2 + 120, y = 200, e = popK(A.a);
    gg.save(); gg.translate(x + w / 2, y + h / 2); gg.scale(e, e); gg.translate(-(x + w / 2), -(y + h / 2));
    KIT.card(gg, x, y, w, h, { r: 26 }); L.text(gg, title, x + 40, y + 58, 36, C.ink, 800, 'left');
    var tagX = x + 40 + L.tw(gg, title, 36, 800) + 24; KIT.chip(gg, 'Sample', tagX + chipW('Sample', 22) / 2, y + 58, C.body, '#EEF2FA', 22);   /* inline tag after the measured title */
    gg.restore();
  } });
  var CTA = { k: 0 };
  prop({ on: true, front: function (gg) { if (CTA.k <= 0.01) return; /* beside Nexi's final spot, never over her */ } });

  introSeq({ sub: '<Subtitle>', hud: '<HUD title>', pills: [['crm', 'CRM'], ['sale', 'Sales']], nx: 720, ny: 520,
    extra: function (gg, t) { var q = clamp((t - 2.45) / 0.4, 0, 1); if (q <= 0) return; var sl = Intro.slotL(); badge(gg, '<Role badge>', sl.x, sl.y, { col: C.blue, icon: 'hardhat', rot: 0.05, k: L.back(q, 2.2), fs: 34 }); } });

  /* ======================= SCRIPT ======================= */
  at(cur - 0.05, function () { L.tween(A, { a: 1 }, 0.5); cam({ x: SA - 250, y: 440, zoom: 0.9 }, 1.3); fly([[740, -200, 0], [NAX + 200, -280, 0], [NAX, 480, 0.4]], 1.5, { e: L.eOut }); });
  var l1 = say('Opening line with the **hook**.', { hold: 0.4 });
  at(l1.t0 + 0.1, function () { wear('hardhat'); N.play('salute'); });
  /* scene change = the transition grammar: Nexi takes off, the camera follows 0.4 s later, the old scene fades during the move,
     the new scene is up when the camera lands; details reveal on words */
  var l2 = say('Next beat at **scene B**.', { hold: 0.4 });
  at(l2.t0, function () { hud('Scene B'); L.tween(A, { a: 0 }, 0.4, L.linear, 0.5); /* L.tween(B, { a: 1 }, 0.5, L.ease, 0.45); */ flyOver(wx(SB - 250, 0.9, 380), 480, 0.4, 1.5); later(0.4, function () { camWhip(SB - 250, 440, 0.9, { zoom: 0.9 }); }); });
  var lq = say('Quick! The **question**?', { hold: 0.1 });
  at(lq.end - 0.3, function () { quiz({ q: 'The question?', opts: ['A', 'B'], ans: 1, t: 3, layout: 'wide', y: 40 }); N.play('think'); });
  wait(3.2);
  var lr = say('**B!** Because…', { hold: 0.4 });
  at(lr.t0, function () { quizReveal(); cheer(); });
  at(lr.t0 + 1.1, function () { quizOff(); });
  var lc = say('Call to action. **TechNext** will help.', { hold: 1.4 });
  at(lc.t0, function () { hud('Get started'); flyOver(wx(SC - 250, 0.9, 480), 480, 0.4, 1.4); later(0.3, function () { cam({ x: SC - 250, y: 440, zoom: 0.9 }, 1.1); }); later(0.7, function () { L.tween(CTA, { k: 1 }, 0.5); sfx('pop', 0.8); }); });
  cur += 0.1;
  outroSeq({ nexi: 'left', extra: function (gg, t) { var q = clamp((t - 2.9) / 0.4, 0, 1); if (q <= 0) return; var sl = Intro.slotL(); badge(gg, '<Outro badge>', sl.x, sl.y, { col: GREEN, icon: 'hardhat', rot: -0.05, k: L.back(q, 2.2), fs: 34, ring: 'rgba(33,163,102,.3)' }); } });
  at(END0 + 2.75, function () { sfx('pop', 0.5); });
