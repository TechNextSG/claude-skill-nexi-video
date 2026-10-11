# Engine reference (film-script API)

A film file is plain JS running inside one closure with every engine helper in scope. World coordinates are px on a 1920×1080 stage as seen with the camera at home; the world can extend far beyond the frame.

## Timeline
- `say(text, {hold, delay})` → line `{t0, end, w(word, nth)}`. Speaks in Nexi's robot voice (42 ms/char, pauses at punctuation) and types the caption. `**bold**` highlights. Advances `cur`.
- `at(t, fn)` schedules at absolute time; `later(d, fn)` relative to now (inside callbacks); `wait(d)` advances `cur`.
- `everyFrame(fn)` per-frame mover; return `false` to stop. A mover may start other movers.
- `hud(title)` (define in the film) updates the top-left chapter pill.

## Intro / outro
- `introSeq({ sub, hud, pills: [[icon, label]…], nx, ny, extra: fn(gg, t) })`, where pills use Odoo app keys (`crm`, `sale`, `account`…) or `L.ICON` names (`globe`, `megaphone`, `spark`, `layers`, `leaf`, `hanger`, `plane`, `train`, `hardhat`, `magnifier`). Put the video's badge in `extra` with `badge(gg, text, Intro.slotL().x, Intro.slotL().y, { col, icon, rot, k, fs, ring })`.
- `outroSeq({ cta, sub, nexi, extra })`:
  - `cta: endCtaMkt` and `sub: 'Websites · Social · Brand'` are for marketing videos. The default is the Odoo end card.
  - `nexi` is the end-card spot: `top` (960, 250), `left` (300, 520), `right` (1640, 520), `below` (960, 985, peeking up), `leftlow` (300, 770) or `rightlow` (1640, 770). Use a different one per video. Coordinates live in `OUTP` in `engine_head.js`; test with `films/outrotest.js`.
- The world is hidden (`WORLDOFF`) while the intro logo or the end card is on screen.

## Camera
- `CAM.{x, y, zoom, rot}`: the world point at the screen centre, the zoom, and the roll in radians.
- `cam({x, y, zoom, rot}, dur, ease, delay)`, `camWhip(x, y, dur, {zoom, rot})` (fast pan with motion blur and a whoosh), `camFollow(fn, k)` (track `fn()`), `camHome(dur)`.
- `toScreen(p)` / `toWorld(p)` convert between world and screen.
- Nexi and the 3D set mirror pan and zoom in 3D, so they render sharp. Keep the zoom between 0.6 and 1.6.
- Screen-fixed things (cards that must not move with the camera) go in a prop's `screen` layer.

## Nexi
- `N.place(x, y, z)` teleports her (use it off-screen, then `fly` in on the next frame with `later(0.05, …)`).
- `fly()` starts from `N.botPx()` and moves her through `N.go`, a spring, so she lags and cuts corners on fast curved paths. Keep 250 px of clearance and about 1300 px/s or slower.
- `goTo(x, y, z)` moves her on a spring. `fly(points, dur, {e, pose, then})` follows a Catmull-Rom path, `hop(x, y, z, dur, h)` makes an arc, and `orbit(cx, cy, r, turns, dur)` circles a point. z > 0 is closer and bigger; keep z between −4 and 4.
- `N.headPx()`, `N.handPx('L'|'R')` and `N.botPx()` return world px. `N.scale` is the depth scale.
- Acting:
  - `E.joy/star/shock/wink/focus/cross/think/love/dizzy(d)` set expressions.
  - `RX.shock/panic/nope/joy/laugh/faint/cry/huff/love/hmm/dance()` are full reactions.
  - `N.play(clip)` plays a clip: `bigjump`, `flip`, `wave`, `cute`, `kiss`, `presentBig`, `pointR2`, `pointL2`, `pointUp`, `tapBig`, `tapBigL`, `shockJump`, `excited`, `shrug`, `nope`, `laugh`, `facepalm`, `tantrum`, `panic`, `groove`, `think`, `slam`, `toss`, `tossL`, `hammer`, `salute`, `peer`, `superman`, `water`, `paint`.
- Costumes: `wear('hardhat'|'conductor'|'pilot'|'glasses'|'strawhat'|'beret'|null)`. New costumes go in `build_core.py` `buildWear()` and are built up front.
- `look(x, y, d)` makes her look at a point, then back at the viewer.

## Film-local helpers worth copying (they live in the films, not the engine)
- `pocket(o, hand, dx, dy)` puts a `thing` at her hand, then `grab`s it, so it never glides in from (0,0).
- `smallCheer()` celebrates without the 330 px `bigjump` (`excited` + star eyes + sparks + `tada`).
- `one(i, v)` makes a `{i: v}` object for per-index tweens (never tween a whole array).
- `fitText(gg, s, x, y, fs, col, maxw)` shrinks text to fit a box.
- `rideRail()` (brand) and the envelope or plane movers (web, enterprise) let her ride something instead of crossing text.

## Names a film must not use (engine globals)
`CAM CAP CAPHIDE_O CAPX CH CHAPS CHLOCK DESAT E EMO END0 ENV EV EVS FLY FONTS FX GAZE HUD KIT LASTGO LENS N NX PROPS QZ QZP RX SET SHEET SPL SPOT TETH THINGS TICKS TRUCK W WITH ZAPS`, plus `g`, `H`, `U`, `C`, `L`, `UI`, `P`. Reusing one (for example `var CH`) breaks the engine in odd places.

## Props and things
- `prop({ on: true, back(gg), front(gg), screen(gg) })` draws a layer:
  - `back` is drawn behind Nexi, `front` in front of her (text there can cover her);
  - `screen` is fixed to the screen, unaffected by the camera.
- `thing({ draw(gg, o), layer, x, y, s, rot, a })` makes a world object Nexi can handle:
  - `grab(o, hand, dx, dy)` glides it into her hand;
  - `toss(o, x, y, dur, { h, spin, land, then })` throws it;
  - `holdPose(on)` sets a carrying pose.
  - Stacks the viewer reads should sit in the `back` layer; switch to `front` when grabbed.
- `KIT` drawing kit:
  - `KIT.card(gg, x, y, w, h, {r, sh, edge, fill})` and `KIT.chip(gg, text, x, y, col, bg, fs, {icon, edge})`, which returns the width;
  - `KIT.person`, `KIT.arrow`, `KIT.ground` (a soft floor shadow), `KIT.stamp(gg, text, x, y, col, k, rot, fs)`;
  - `KIT.paper(kind)` draws a spreadsheet, slip, invoice, note or mail.
- Particles and pops:
  - `L.sparks`, `L.confetti`, `L.hearts`, `L.ring` and `L.emit` for particles.
  - `L.pop(text, x, y, {follow})` is mapped to the screen and clamped. Never let a pop drift into the HUD.
- Odoo tiles: `L.drawTile(gg, key, x, y, size, alpha, rot)`. Add new keys to `L.ODOO` in `lib.js`.

## Viewer quiz
- `quiz({ q, opts, ans, t, side: 'left'|'right'|'auto', y, layout: 'card'|'wide' })`, then `quizReveal()` and `quizOff()`.
  - The `card` layout is 760 px wide beside Nexi.
  - The `wide` layout is a 1180 px band. The default y is 700, just above the caption; pass `y: 40` for a top band. Use it when the subject must stay visible.
  - When the answers don't fit beside the question, the wide band switches to two rows by itself (p25): question on top, answer pills centred below, 216 px tall.

## Effects
- `shake(k)`, `speedLines()`, `FX.flash = T` (white flash), `FX.mb = T` (motion blur), `FX.desat` + `FX.wipe` (grey-to-colour wipe), `bang(text, col)`, `emote(kind, d)`.

## Odoo screens (Odoo-app films)
- `P` is the window pose (`SET.PBASE` safe area) and `UI.go(screen)` switches screens.
- `tap()` becomes `zap()` (a beam plus an outline). Use `spotlight(key|rect)` / `spotOff()` and `lens(key, {k, pos})` / `lensOff()`.
- `tether(fn|key)` with `TETH.sag` makes the beam run under cards.

## Audio
- `sfx(name, vol)` plays an effect: whoosh, swoosh, swish, pop, tap, tick, click, type, ding, chime, sparkle, stamp, drop, pick, cash, truck, heart, gasp, boing, tada, magic, holo, rise, buzz, giggle, wah, steam, hmm, dizzy, alarm, ring, clock, whip, slide, chirp, hammer, saw, crane, whistle, chug, bell2, jet, shutter, pour, grow, bee, snip, spray, jingle, plug, flap, splash.
- `music(cue)` takes `intro`, `main`, `tense`, `after`, `outro` or `end`. The film's preset comes from `audio_t.MAIN` (film → style). Styles: walk, myth, tip, reorder, tense, before, after, build, rail, jet, web, garden, studio.
- `MUSIC_GAIN` is set per film. Measure with `_buslevel.py`.

## Added in batch 3 (2026-10-04)
- **Costumes:** `wear('chef'|'cap'|'knight'|'bowtie'|'goggles'|'bellhop')` (in `build_core.py`, built up front with the others). Heights above the head: chef and knight about +0.6 head units (tall), cap and goggles low, bow tie at the neck, bellhop small and tilted.
- **End cards:** `endCtaTech` (IoT · Apps · Networks) and `endCtaAI` (Odoo + AI · Automation · Chatbots), made by `endCtaRow([[icon, label], ...])`; use with `sub: 'IoT · Apps · Networks'` or `sub: 'Odoo + AI · Automation · Chatbots'`. The AI row is wider (about x 353-1567), so low end-card spots collide with it.
- **Icons (`L.ICON`):** chip, phone, wifi, shield, bot, bolt, bubble, bell, thermo, gear, chefhat, castle, cloche.
- **Odoo app tiles (`L.ODOO`):** iot, quality_control, maintenance, industry_fsm added.
- **Music styles:** kitchen (steel pan + swing), field (clav + funk), castle (lute + toms), butler (harpsichord + soft), machine (music box + ticking), lobby (e-piano + lo-fi). Every new tone is low-passed at 2.3-2.8 kHz to stay out of the voice band.
- **Build guard:** `build_film.py` stops on any film-level `var`/`function` name that the engine also declares (TOTAL is allowed).
- **Other tools in the renderer:** `thumbs.py` (YouTube thumbnails and 9:16 covers from `films/thumbs.js`), `vertical.py` (9:16 versions: the 16:9 episode inside a branded frame), `deliver_series.py` (one folder per post in folder 22).
- **thumbs.js (p50/p51):** an `EPS` entry = `{ ep, tag, nexi, zoom, pose, face, hat, title{l1,l2,s1,s2}, back, front }`. A film without drawn art sets `frame: true` (scene card from `assets/thumbframes/<id>.jpg`), `tiles: [[key, x, y, size, rot]]` and optionally `card: [x, y, w, maxH, rot]`.
  - Helpers: `sceneCard`, `frameBack` (speed lines + tiles, behind Nexi), `frameCard` (the card, in front), `genericV` (9:16 cover), `ghost`, `glow`.
  - Props: `keycap`, `thermo`, `moon`, `clock`, `wifi`, `calCard`, plus the older `stamp`, `tagPill`, `burst`, `bangMark`, `paper`, `box`, and others.
  - `HATPAD` gives each costume headroom on the 9:16 cover.

## Added in round 2 (2026-10-04)
- `flyOver(x, y, z, dur, { via, side, up, e, then })`: the standard station change. Nexi leaves over the top of the frame (fast ease-out), crosses above it, and drops in from `side` px right of the landing spot (default 200; negative = from the left). `via: [[x, y], ...]` adds waypoints before the climb (step clear of a sign). `up` is the cruise height (default -400). Pair it with a camera move delayed 0.4 s.
- `L.tween` cannot be cancelled; two tweens on one key fight. For anything that must stop on cue (a run indicator that pauses), compute its value from a start time and a pause time each frame instead.
- Measuring text: `L.tw(gg, text, size, weight, font)` returns the width; for a chip, width = text width + 1.3 × font size (+ 1.15 × font size with an icon). `KIT.chip` also returns the width it drew.
- Audit hooks: `engine_tail.js` calls `AUDIT.mark(layer)` around each layer and `AUDIT.setMeta(...)` with the camera, end-card, quiz and Nexi state when `window.AUDIT.on`.

## Added in strict mode (2026-10-04)
- **`introSeq({ nx, ny })`:** after the lock-up, the intro dives Nexi to (1712, 930), then `goTo(nx, ny)` 0.55 s later, in the FIRST scene's world coordinates, while that scene fades in. Choose a spot whose climb crosses no label (lint N7 requires it).
- **`outroSeq({ nexi })`:** always pass the spot (lint E1). The default `right` was shared by four topic videos.
- **`toss(o, x, y, dur, { h })`:** `h` is the arc height in world px. Across a board use about 80 and shrink the prop in flight (`o.s = 0.6`); a high arc loops over titles (lint warn M6).
- **Audit meta:** `engine_tail.js` hands the audit the camera, end-card, quiz and Nexi state, plus `win` (patch p30): the 3D Odoo window's box in world px when it is up. `layout_audit.py` counts it in the composition.
- **Fingerprint:** `gate.fingerprint(film)` hashes the bundle, the runtime scripts, `film.html` and the assets list. Audits (`qa/audit/<film>/meta.json`) and renders (`out/<NAME>.build.json`) carry it, so the gate can prove that what was audited is what was rendered and delivered.

## Added for ERP 4 Odoo Customization (2026-10-04)
- **Costume `beanie`:** an orange knit beanie with a cream cuff and a pom-pom (patch p31 in `build_core.py`, built up front). A low hat; the pom-pom adds about +0.45 head units.
- **Music style `alpine`:** marimba + swing, 114 bpm (`audio_t.STYLES`), MAIN `custom`.
- **Film-local icons:** a film may add `L.ICON.<name> = function (gg, x, y, s, col) {…}` before `introSeq` for its pills and badges (custom adds `peak` and `flag`), without touching the engine or other films' fingerprints.
- **Local-layout scenes:** author each station in screen coordinates and translate by `(CX − 960, GY − 790)` with the camera at `(CX, GY − 250, 1)` (see `films/custom.js`).
- **Far parallax:** `gg.setTransform(1,0,0,1,0,0); camApply(gg, par)` inside a back prop draws a far layer (par < 1).

## Audio (2026-10-04): the website voice and the mix knobs (`audio_t.py`, p39-p44)
- `voice_bus(n, voices)` = the technext.asia/nexi chain: reply chirp (triangle 740->1180 Hz .45, sine 1180->880 Hz .38), a square blip .05 every 3rd letter (640-1000 Hz, +12%), master .26, `webaudio_compress()` (threshold -24, knee 30, ratio 12, attack 3 ms, release 250 ms, Chrome makeup gain), x `VOICE_K` 2.2. `voice_bus_v1` is the old sharp bus (blips x4.6), kept only for comparison.
- Mix: `mus * music_gain(preset) + fx * fx_gain(preset) + vo * VOICE_GAIN`. `MUSIC_SCALE` .8 x `MUSIC_GAIN[film]`; `FX_GAIN` .5 with `FX_FILM` overrides (walk .38, beforeafter .26, web .2); `MUSIC_LP` 2600 / `FX_LP` 5000 Hz (`soften_music` / `soften_fx`, also used by `gate.measure_audio`); `MASTER_COMP` (8, 6, 6, .001, .12) before the final normalise.
- `uke` (garden, bikeshop) is low-passed at 2.4 kHz like the other plucked tones (p39).
- Tools: `qa/audio_try.py` (try settings into qa/tmp), `qa/music_tune.py` (centre A4/A5 per film with the gate's formula), `qa/audio_batch.py` (re-mux + deliver many films), `qa/mp4strip.py` (strips from the FINAL MP4), `qa/blank_scan.py` (blank stretches from the audit data).

## Added for EP00, the series pilot (2026-10-04, films/pilot.js)
- **Full-frame scene backgrounds.** Props draw in registration order, and the `back` layer is drawn AFTER the 3D set (`SET.cv`). So a back prop can paint a whole night sky, hangar, dojo, stage, space or studio over the default light set.
  - One painter per station, clipped to the world rect `CX[k] ± 1500`. Stations are 3000 px apart, so the rects tile the world.
  - A slanted white "comic gutter" with ink edges is drawn at each boundary. A whip then reads like turning a comic page.
  - Register anything that must sit ON the background (the cape, the plane she rides, the aura) AFTER the painter prop.
- **Drawn costume pieces** that follow her body: a cape from her neck, `lerp(N.headPx(), N.botPx(), 0.62)`, sized by `N.scale`. It sits in a back prop, so her body covers its top. Same idea for a plane she rides (`N.botPx()` + 226).
- **A cut** (jumping INTO the comic): a white screen-layer overlay to full in about 0.2 s, then `cam({...}, 0.01)` + `N.place` at the new station, then fade the overlay. Keep the full-white part short.
- **The score changes per scene:** `music('<style>')` takes any `audio_t.STYLES` name (tense, jet, build, castle, web, space, after, gameshow, myth...). The section starts at the cue time.
- **Comic kit (film-local in pilot.js):**
  - `comicText(gg, s, x, y, size, rot, k, top, bot)`: outline, canvas-shadow drop and gradient fill, drawn once (T11);
  - `wordBurst(gg, s, x, y, size, fill, rot, k, lines)`: a star burst sized to hold its word;
  - `balloon(gg, s, x, y, fs, tx, ty, k)`, `halftone`, `paperPlane`;
  - `tnPlane` draws the TechNext paper-plane logo (`L.load('tnplane', 'assets/img/logo-plane.png')`).
- **v2 kit (EP00 redesign, film-local in pilot.js; copy it for any story film):**
  - `react(kind)`: the exaggerated reaction (N10). Kinds: `shock, panic, joy, love, laugh, proud, think, power, wow, angry, dizzy, cool`. Each one is a clip + a face (`E.*`, `N.eyePop`, `N.blush`) + a glyph + focus lines + a squash + a sound at 0.3–0.5. It clears `EMO` first so glyphs never pile up.
  - `glyph(kind, dx, dy)`: a cached sprite (bang, qbang, heart, star, sweat, vein, note) that pops above her head, floats up and fades in 1.3 s; clamped inside the frame.
  - `focus(k, d)`: 64 manga speed lines converging on her, one screen-layer Path2D, fading over `d` s.
  - `sfxWord(word, size, pal)` + `drawSfx(gg, word, x, y, size, rot, k, pal)`: an extruded comic word on a two-layer burst, rendered once to an offscreen canvas and cached (T11 by construction; T12: the audit cannot see it).
  - `cel(gg, path, base, shade, dx, dy, lw)` + `shine(gg, path, x, y, w, h, a)`: cel shading on any Path2D (shadow tone, base tone offset inside a clip, ink outline, rim highlight). `rrP/ellP/polyP/starPts` build the paths.
  - `drawCape(gg)`: shoulders, three folds, a rippling hem; `CAPE.gust` blows it.
  - `transform(hat)`: the costume change (spinBig + speedLines + focus lines + rings + `wear(hat)`), the henshin beat.
  - `nameBox(gg, k, s)`: the comic narration box. One box shows "MEANWHILE, IN THE CITY" first, then the monster's name (F10, P11).
  - Builds per station: a state object with start times initialised to `1e9` (K9), set to `window.T` on the word, and every formula guarded for negative time.
- **EP00 naming:** `deliver.PILOT = [('pilot', 'Meet Nexi - Series Intro')]` feeds `deliver.BASE` ("EP00 - ...") (p53). `thumbs.py` puts it first with number 0 (p54). It is not in `deliver.GROUP`, so lint's one-quiz rule (Q1, solution videos only) does not apply.

## Added for Quick Tips 05-14 (2026-10-04): the 2D tip kit and the Quick Tip thumbnail look
- **Includes:** `build_film.py` replaces a line `  /*@include <name>*/` with `web/films/inc/<name>.js` before the name guard and lint (rule K11). Films without the line are byte-identical, so no other fingerprint changes.
- **`films/inc/tipkit.js`** (every QT05+ film): a big, readable Odoo 17-style screen drawn as a WORLD prop (the audit reads it).
  - `tkWin(gg, x, y, w, h, { app, menus, slug, sample })` -> content rect (browser strip, navbar, a "Sample data" chip for C3).
  - `tkCtrl(gg, r, { crumbs, newBtn, gear, search, facets: [{ l, icon, t0, hi }], placeholder, views, active, searchHi })` -> rect below.
  - `tkList(gg, r, cols [{ l, w, al, a (slides in), hi }], rows [{ c, sel, a, hi, id } | { g, n, sum, sumCol, open, d }], { rowH, fs, check, opt, optOpen, selAll })` -> y below.
  - `tkMenu(gg, x, y, items [{ l, icon, hi, sep, head, dim, check }], { k, fs, minW })`, `tkDialog(gg, cx, cy, w, h, title, k)`, `tkField(gg, label, val, x, y, { lw, vw, hi, ph, caret, focus, bold })`, `tkSheet(gg, r)`, `tkChatter(gg, x, y, w, h, { mode, ca, to, text, items, att, fol, drop, files })`, `tkBtn`, `tkPill`, `tkCheck`, `tkAvatar`, `tkIcon` (UI.ico + sliders, clip, user, down, up, archive, x, at, xls, note, copy, trash).
  - Tap spots: every control writes its world rect to `TKSP[key]` while drawing (`new`, `gear`, `search`, `search:caret`, `view:<v>`, `crumb:<c>`, `menu:<m>`, `opt`, `selall`, `chk:<id>`, `row:<id>`, `grp:<g>`, `mi:<label>`, `fld:<label>`, `msg`, `note`, `send`, `composer`, `att`, `drop`, `chatter`). Draw the kit in WORLD coordinates (no `gg.translate` around it) or the spots are wrong.
  - Nexi: `tkTap(key, then, { side: 'L'|'R', dx, dy })` (pointing clip + hand beam + press ripple + ring + click), `tkBeam(fnPoint, then)`, `tkPress(key)`.
  - Fun: `tkKey` (keycaps), `tkSticker`, `tkRecap(gg, cx, cy, title, steps, k, hi)`, `tkCheer`, `tkPocket`, `tkHud`, `tkPopK`, `tkClip(gg, xc, half)` (station painter clip).
  - Reference film: `films/tip5.js` (theatre: painters per station registered first, a form + chatter station, doors + top-band quiz).
- **`films/inc/qtthumbs.js`** (pasted into `thumbs.js`): the Quick Tip thumbnail look (H1). `QT[id] = { pal, acc, punch, tag, hat, pose, face, title, art, at, atV }`; `qtBack` / `qtFront` (16:9), `qtComposeV` (9:16 cover and the vertical-video frame). `RIMGLOW` (thumbs.js) sets the rim glow; `c.badgeBg` recolours the badge's number panel. A new tip needs a `QT` entry with a drawn prop from its story.

## Added for EP00 v3 (2026-10-04, films/pilot.js parts in qa/pilot_v3)
- **`N.extra(fn)`** adds pose offsets every frame: `O.hLx/hLy/hLz` and `O.hRx/hRy/hRz` (L = the screen-left hand; +x = screen right, about 187 px per unit at zoom 1), plus `tilt`, `yaw`, `nod`, `sq`, `yb` and `roll`. Clips still add on top, so don't play arm clips while a pose is held. Engine helpers (carry, holdPose, the tether, `fly` with a pose) call `N.extra(null)`, so attach your function only for the moment you need it. Test poses in the bench `films/beamtest.js` (hand markers via `N.handPx`).
- **`N.handPx('L'|'R')`, `N.headPx()` and `N.botPx()`** return world coordinates. `botPx` is the top of her body (the neck); her waist is about `botPx.y + 100 * N.scale`.
- **The kaiju kit (pilot.js):**
  - `fat(gg, [[x0, y0, x1, y1, w], ...], base, shade)`: round-capped tapered limbs in three passes;
  - `skinGrid(gg, path, ...)`, `claws()`, `paw()`, `pencil()`, `sheetSpike()`;
  - `monster(gg, x, y, s)` with `KJ` states roar, chomp, hit, flinch, kb, up and dizzy.
- **`fighter(gg, x, y, s)`** is the compact Odoo robot (facing right). `ROB` holds jl, jr, up (the uppercut arc), rot and fly (the rocket flames). `punch(arm, x, y, word)` lands a hit: the fist, a ring, the monster's flinch and knockback, and a sound word.
- **`miniBot(gg, x, y, s, col, {arm, sleepy, ph})`**: a helper in Nexi's likeness, for showing AI as helpers.
- **Depth-sorted orbit:** draw the same orbit twice, once in a back prop and once in a front prop, each keeping only the points on its side (`sin(angle)`). A dashed `Path2D.ellipse` arc gives the ring's far and near halves.
- **`render.py shots t1,t2,...`** saves `qa/f-<t>.jpg` for each time in one pass; `qa/_grid.py out.jpg t1 t2 ...` tiles them.

## Added for EP22, the Season 1 finale (2026-10-04, films/finale.js, parts in qa/finale)
- **The pop-up book kit:** `PB` (open, s, from, turn, dropT, popT, hi, door, light, txt), `leftPage(gg, s, t, own)`, `rightPage(gg, s, t, k)`, `sheet(gg, kx, draw)` (scaleX about the spine), `turnTo(s)` (an 0.8 s turn: polaroids drop at +0.45 s, the pop-up springs at the end) and `popLayer(gg, k, i, fn)` (a layer springs up from the paper baseline at y 720 with an overshoot).
- **`polaroid(gg, imgKey, x, y, w, rot, l1, l2, k, hi)`:** a framed image with tape and a two-line label; `hi` adds a gold glow. The images come in through `L.load('epNN', 'finale/epNN.jpg')`.
- **The `SPREADS` table** drives the book: title, tag, eps or tips or last, and the pop-up kind. Adding a chapter is a row plus a pop-up branch.
- **Season 2 vignettes:** `s2Head(gg, title, tileKey)` (a header pill + a COMING IN SEASON 2 tag), `clockP()`, and a lanyard badge that follows her neck (`LANY`; icon identity only, N13).
- **Fireworks:** `firework(x, y, col)` pushes a burst (a 0.45 s rocket trail, then 26 rays with a little gravity); schedule them from the build with `at()`.
- **Golden ticket CTA:** a ticket outline with semicircle notches (one path, `arc(..., true)`: P9), a gold gradient, a perforation, and the url pill.

## Added for Season 2 (2026-10-04): the cast kit `films/inc/s2kit.js`
- **Include:** `/*@include tipkit*/` (when the episode shows an Odoo screen) then `/*@include s2kit*/`. Frozen while episodes are in flight (K11). Reference films: `films/s2e01.js` (lead), `s2e02-04.js` (agents), the bench `films/s2cast.js`; the format brief `qa/s2/S2-FORMAT.md`.
- **The cast:** `var A = s2Actor('maria'|'ben'|'jun'|'boss', x, y, { s, mood, pose, look, id, a })`; draw it with `s2Draw(gg, A)` in the film's own back prop, registered after the station painter. Origin = the floor between the feet; 480 px tall at s 1 (head top at y-490, ID card y-186..-120).
- **Acting (event-sourced, seek-safe):** `s2Pose(A, pose)` (down hips clasp cheeks wave waveL pointR pointL cheer phone chin shrug mug bag thumbs type facepalm reach; 0.3 s blend), `s2Mood(A, mood, d)` (calm happy worried shock sad think proud), `s2Talk(A, d)`, `s2Hop(A, h)`, `s2Shiver(A, d)`, `s2Walk(A, x, d)`, `s2Look(A, v)`, `s2Glyph(A, kind)`; `s2Hand(A, 'L'|'R')` gives a hand's world point (to place a mug, a phone, a bag; N8 grip).
- **Season pieces:** `s2Balloon(gg, lines, x, y, { tx, ty, k, kind: 'say'|'whisper', fs })` (one outline, the tail joins at the edge, T13), `s2Psych(gg, cx, cy, { title, def: [l1, l2], icon(gg, ix, iy, t), col, tab }, k)` (THE PSYCH FILE), `s2Take(gg, cx, cy, text, k, { fs })`, `s2Follow(gg, cx, cy, '02', 'Too old for Odoo?', k)`, `s2Office(gg, t, { sign, clock, window, desks, pantry, plants, dusk })` (Bluebay Trading, a sample company; local station coordinates), `s2Clock`, `s2Plant`, `L.ICON.brain`, `s2Badge(gg, '01', x, y, k)`.
- **The EP00 cartoon kit is inside:** `react(kind, { quiet })` (adds `idea` and `kind`), `glyph`, `focus`, `drawSfx`, `cel`, `shine`, `rrP/ellP/polyP/starPts`, `popK`, `hsh`, `one`, `mixc`. A film that includes s2kit must not redeclare these.
- **Thumbnails:** `films/inc/s2thumbs.js` (pasted into thumbs.js before CFG; s2kit is pasted at the TOP of thumbs.js so thumbs' own `glyph`/`hsh` win): `EPS.s2e0n` + `S2V` covers; `thumbs.py` labels `deliver.S2` films `S2E nn` and passes `&s2=1` (badge NEXI EXPLAINS S2, coral number panel).

## Added for Quick Tips 25-34 (2026-10-05): cutekit, envkit, qtthumbs v2

Include order in a film: `/*@include tipkit*/`, `/*@include cutekit*/`, `/*@include envkit*/` (the film defines `CX[k]` for envkit's parallax).

**`films/inc/cutekit.js`**
- `react(kind)`: shy, heart, peek, dance, tilt, yes, no, twirl, giggle, proud, boing, kiss, wow, sleepy, cheer, oops. Particle-free kinds (safe near text): tilt, yes, no, shy, sleepy, oops, giggle, boing, wow.
- `cuteEyes(shape, d)`, `ckHearts`, `ckSparkle`.
- `CK.idle` / `cuteIdle(k)`: the always-on sway, built on the single `N.extra` slot.
- `cuteHold(on)`: the carrying pose that keeps the idle. Never call `holdPose()` or `N.extra()` in a QT25+ film.
- Clips are added with `N.addClip(name, dur, fn(p, O))`. `tkTap` and `N.play` replace a running clip.

**`films/inc/envkit.js`**: painters in local station coordinates (`gg.translate(lx(k, 0), 0)` + `tkClip`).
- Sky and weather: `envSky`, `envSun`, `envCloud(s)`.
- Parallax backdrops: `envHills`, `envTrees`, `envSkyline` (`par` -> `envPar(k, par)`).
- Floors and walls: `envGround(kind: grass, wood, tiles, sand, carpet, stone)`, `envWall(kind: stripes, bricks, panels, dots)`, `envBaseboard`.
- Light: `envWindow`, `envRays`.
- Detail: `envTufts`, `envBunting`, `envMotes`, `envBokeh`, `envShadow`.
- `envNexiShadow(groundY)` uses WORLD coordinates: call it in its own world prop.
- `envVignette(gg)`: screen layer.
- Audit: `envWindow` and sky fills are recorded as cards; Path2D art is not.

**`films/inc/qtthumbs.js` v2 (QT25+)**
- `QT[id].v2` switches a tip to the exaggerated look.
- Main fields: `pal`, `acc`, `boom`, `punch`, `tag`, `hat`, `pose`, `face`, `rx` (marks: lines, bang, sweat, hearts, sparks, stars), `bang`, `bangAt`, `title`, `art`, `at`/`atV`.
- Per-tip H9 fields in `QTXV`:
  - Hooks: `bg(gg, w, h, hd, por)`, `behind(gg, hd, por, w, h)`, `front(...)`.
  - Effects: `fx` (sun, speed, rings, burst, debris).
  - Band edge: `band` (zig, wave, straight).
  - Placement: `nexi`/`zoom` and `vnexi`/`vzoom`.
- Poses: `POSE.boom/gasp/gaspR/lean/fist/fly`. Faces through the wrapped `face()`: `wow/starx/shockx/heartx/happyx` (the cute ones blush).
- Helpers:
  - `qtxHead(o)`: the face centre and radius in screen px; o = OFF on covers.
  - Painters and hook: `qtxBg`, `qtxMarks`, `qtxHook` (3D extrusion in `pal[2]`), `qtxRing` (red call-out).
  - Props: `qtxScoop/Cat/Penguin/Fish/Thumb/Brick/Bell/Heart/Hole/Puff/Flake/Twinkle/Drips/Sprinkles`.
  - `qtxFree(x, y, w, h, por, strict)`: keeps decoration off the badge, the hook (and the prop).
- Layering: 16:9 back = bg + Nexi rim; front = `front` layer, prop, marks, hook, badge. Cover: bg, Nexi, `front`, prop (in front), marks, hook (y 850), badge.

- **Talk kit (`/*@include s2talk*/`, after s2kit):** `say(text, {who: A})` = a cast line (caption face + name + role, the person's mouth moves, the voice event gets `who`); `s2Cast(A)` registers a person; `s2Checklist(gg, cx, cy, title, items, k, hi, done)` and `s2ProTip(gg, cx, cy, lines, k)` are the designed cards. Scenery uses `celS()` (soft, P21); people, Nexi, cards and held props keep `cel()` + `S2INK`.
- **Master loudness:** `render.LOUD[film]` = loudnorm target I (default -16), `render.LIMIT[film]` = the alimiter ceiling after it. Both apply on `render.py mp4` and `mux.py`.


## Added 2026-10-06: `films/inc/s2flat.js` (Season 2 flat look, rule P28)
Include order in a cast film: `/*@include tipkit*/`, `/*@include s2kit*/`, `/*@include envkit*/`, `/*@include s2flat*/` (then s2talk / s2cute if used). Replaces (same names, same arguments): `cel`, `celS`, `shine` (off), `focus` (off), `s2Limb`, `s2Shoe`, `s2Card` (no card at all when `id:false`), `s2HairBack`, `s2HairFront`, `s2Face`, `s2Torso`, `s2Draw`, `s2Hand`, `glyphSprite`, `sfxWord`, `s2Balloon`, `s2Psych`, `s2Take`, `s2Follow`, `s2Clock`, `s2Plant`, `s2Office`, `L.ICON.brain`. New: `S2F` (body geometry), `s2fFill(gg, p, col, shadeX)`, `s2fTone(hex, k)`, `s2fR(x, y, w, h)` (Path2D rect), `s2fShadow`, `s2fCloud`, `s2fWindow`, `s2fBokeh`, `s2fFloor`, `s2fBunting`. `s2Office(gg, t, o)` takes `o.k` (station index) for window parallax and `o.bunting`; the rest of its options are unchanged. The cast sample page is `~/ClaudeWork/qa/cast-design/flat-sheets.html?s=0..3`.

- p88 additions: `S2POSE.chin` is overridden in s2flat (free hand on the hip). Season 2 EP00-EP04 now include `envkit` + `s2flat`; every new S2 episode must too (P28). `build_film.py` refuses an unexpanded `/*@include name*/` (K19).


## Added 2026-10-06: soft voice engine (p89, rule A11)
`audio_t`: `SOFT_FILMS`, `SOFT_DB` / `SOFT_DB_DEFAULT` (7.1), `BG_DB` / `BG_DB_DEFAULT` (-22.5), `SOFT`, `SOFT_LIMIT` (.72), `voice_bus_soft(n, voices)`, `voice_track(n, ev, preset, mus_ducked, act)` (the voice as mixed; make_wav and gate.measure_audio both use it), `gap_db(path, ev, offset)`, `master_af(film, wav, ev, loud, limit, offset)` (the render.py + mux.py final mux filter). `gate.SOFT_AUDIO`. Tools: `qa/voice_soft/measure_bg.py`, `predict_audio.py`, `verify_voice.py`, `runq.py`. Never `import mux` (it runs).

## Added 2026-10-07: `films/inc/tk20.js` (Odoo 20 overlay, rule C7)
- Include it on its own line after `tipkit.js` (K19). It reassigns tipkit functions, so every film that includes it draws Odoo 20 without code changes:
  - `tkCtrl`: New | breadcrumb (previous crumb 18 px small above a 25 px title, older crumbs folded into "...", spot keys stay `crumb:<name>` and `crumb:...`) | the Actions three dots (`tk20Dots`, spot key still `gear`) | search | views.
  - `tkWin`: Sales menus drop "To Invoice".
  - `tkChatter`: the third button reads "Activity".
  - `tkT` / `tkW`: exact labels pass through `tk20()` (the `TK20` rename map: Send by Email -> Send, Add Custom Filter -> Custom Filter..., My Pipeline -> My Opportunities, Sales Teams -> Teams, Mailing Lists -> Recipients, Dynamic Placeholder -> Field, Handle by Emails / in Odoo -> By Emails / In Odoo, Invoice what is ordered / delivered -> Ordered / Delivered quantities, ...).
- It does NOT change captions, `L.text` / `KIT` words, or film-local drawings: those are fixed in the film.
- tk20.js is now part of the fingerprint of 31 delivered films. Editing it invalidates them all, so override in the film instead.

## Added 2026-10-07: `films/inc/t3kit.js` (Season 2 thumbnails v3, rule H12) and p93 sandboxes
- It is included in `films/thumbs.js` right after s2thumbs (before `CFG = EPS[TID]`), followed by the design files `t3ep_a/b/c`
  (EPS + S2V entries) and `t3qt_a/b/c/d` (`QT3.tipNN`). qtthumbs.js merges `QT3[id]` over `QT[id]` just before `QTC` is picked, and
  sets v2.
- Odoo screen parts:
  - `o3Win(gg, x, y, w, h, {app, menus, crumb, btns, s, rot, body(g, r)})`
  - `o3T`, `o3Btn`, `o3Pill`, `o3Row`, `o3Head`, `o3Field`, `o3Check`, `o3Radio`
  - call-outs: `o3Ring`, `o3Arrow`, `o3Count`, `o3Tag`
- Flat marks: `e3Sweat`, `e3Vein`, `e3Lines`, `e3Spiral`, `e3Bolt`, `e3Mark`, `e3Burst`, `e3Heart`, `e3Gloom`, `e3Steam`, `e3Spark`,
  `e3Streaks`, and `e3Around(gg, head, kind)`.
- `n3Head(o)` returns Nexi's face centre; pass `OFF` on covers.
- `qtxGhosts(gg, null, dx, dy)` draws motion ghosts on episode thumbnails too.
- Designer sandboxes: `THUMBS_V=thumbs_<k> python thumbs.py ...` builds and loads `film-thumbs_<k>.js`. Re-run
  `patches/p93_thumbs_sandbox.py pages <k>` after any change to thumbs.js.

## Added 2026-10-10: the character kit `films/inc/nexikit.js` + `films/inc/nexi3d.js` (skill nexi-character)
- Include `/*@include nexikit*/` (after tipkit / cutekit / s2kit / envkit), then the `nexi3d` include on the next line (every heavy
  element as a real 3D object; `NX3.on = false` = flat 2D).
- `nxFeel(kind, { d, lvl, word, side, to, quiet, tint, recharge, move })` plays one of 35 reactions (rage ladder annoyed ->
  faint, trouble, cat, robot-only, wins). `nxMark(kind, d, o)` adds one mark, `nxHatPop(h, d)` throws the worn hat, `nxClear()`.
- Never uses `N.extra` (cutekit's idle). Names are prefixed nx/nxf/NXF/NX3: never declare `react`-style kit names in a film.
- Sounds (patch p100): hiss purr hmph grr glitch powerdown boot ew whimper rain scurry glint kettle mrrp beep.
- Benches: `films/nxsheet.js` (2D) and `films/nx3sheet.js` (3D), both lint TOOL films. Full API, limits and how to add an
  emotion: nexi-character `reference/kit.md`.
