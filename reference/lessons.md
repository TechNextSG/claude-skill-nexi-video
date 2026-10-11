# Lessons log

Append a dated entry after every video job: newest at the bottom, one bullet per lesson. When a lesson becomes a rule, add it to `rules.md` with an ID and its check; automate it if it was broken twice.

## 2026-10-03 · Odoo walkthrough + topic series (walk, myth, tip, reorder, beforeafter)
- **User asks:** cinematic, intro like the website logo animation, a floating "with Nexi" tag, robot voice, exaggerated acting, floating Odoo icons.
- **Fixes to the look:**
  - Lowered the floor-grid and flare opacity.
  - Use the plain Odoo logo, never "Odoo Ready Partner".
  - Nexi faces the viewer.
  - Music upbeat per topic, never loud.
  - Same intro and outro with a new touch per video.
- **Audit 1** (the user said "a lot of design lapses"):
  - Badge slots sat above the wordmark.
  - The HUD plate had to be opaque.
  - The caption card needed a fixed width.
  - The Odoo window had to sit in a safe-area pose.
  - Nexi needed her own lane beside the window: clicks become beams (`zap`), spotlights and a lens replace crop-zooms, `tether` handles drags.
  - Chapter bands were drawn before Nexi.
  - The intro exit is a crossfade, not an iris.
  - Shatter effects were reduced to a two-piece tear.
  - Report data had to be consistent across screens.
- **Audit 2:**
  - Myth/fact cards must not sit in a corner (centred pair).
  - The logo must be centred in intro and outro.
  - "with Nexi" must look as in the walkthrough.
- **Audio:**
  - The voice was buried 14 dB under the music. Fixes: ducking 62 %, voice ×1.9, blips ×4.6.
  - Loudnorm needs an alimiter. The walkthrough needs limit 0.7.
  - Measure with `_buslevel.py`.
- **Engine:**
  - Glow-pass mesh lists are cached for 240 frames.
  - Chip pop-ins must use per-item timestamps, not a tween's end value.
  - Never tween a whole array.
  - Avoid leading "..." in a caption line: the voice pauses on dots.

## 2026-10-03 · Solution videos round 1 (erp, crm, enterprise, web, social, brand)
- **User asks:**
  - Nexi roams the whole area.
  - More dynamic reactions.
  - Not cornered.
  - More camera movement and angles.
  - More interactive.
  - Analogies, role-play, new and random elements.
  - Every video unique.
- **Built engine v2:**
  - A camera mirrored into 3D, so Nexi stays sharp when zoomed.
  - `fly`/`hop`/`orbit`, `thing` + `grab` + `toss`, 3D costumes, `quiz`.
  - A marketing end card.
- **Bugs fixed:**
  - Depth must pivot around the camera centre, not the frame centre. Without it, Nexi at z ≠ 0 drifted up to 400 px on long sets.
  - Costumes must be built before the first frame, or the glow pass blooms them white.
  - Costume colours need `convertSRGBToLinear`.
  - World props drew over the intro/end-card logo. Added `WORLDOFF`.
  - Filtering the mover list while pushing to it dropped `fly()` calls made inside movers.
- **Staging lessons:**
  - The quiz card covered the plane: hold the plane mid-air during the quiz and land it on the reveal.
  - The quiz card covered the logos being counted: added the wide layout.
  - Nexi stood behind the CTA card: put the CTA beside her, or pop it after she lands.
  - The stale-lead train was off-camera during its line: place story props where the camera will be when the line plays.
  - `bellkey` FM music flooded the voice band (voice ratio 2.6×). Low-passing it gave 4.8×.
  - A render died with "F is not defined" because an outside process killed Chrome. Rerun.

## 2026-10-03 · Solution videos round 2 (user review)
- **User feedback (verbatim):**
  - "some text are overlapping, small and hard to read. maximize the designing of the element" (social)
  - "improve presentation design and camera works. design should be visually appealing and eye catching, even the sample format that showcased" (brand)
  - "fix the mobile design … 0:45 the design are too low" (web)
  - "we dont have malaysia. revise the explanation and make it truthful … explain technext and do also sample company" (enterprise)
  - "0:23 there some blocking in middle station" (crm)
  - "text overlapping" (erp)
  - "in all outro, let nexi to much in the corner. make sure to make nexi will change location every video"
- **Rules added:**
  - Minimum on-screen text sizes.
  - Labels fit their boxes.
  - Nexi never in front of text being read; flight paths route around text.
  - Stacks the viewer reads go in the back layer.
  - Story props never park on signs.
  - The phone sample is fully in frame at real proportions.
  - Hand-over scenes stay above the caption band.
  - Truthful company facts: TechNext is SG HQ plus PH and VN teams, 10+ countries delivered, no Malaysia. Use a labelled sample company for demos.
  - Outro spot per video.
- **Outro spots tested:** `top` (above the wordmark), `left`, `right`, `below` (under the CTA row), `leftlow`, `rightlow`, all clear of the logo and CTA rows. The old right spot (1712, 610) read as cornered.

## 2026-10-03 · Solution videos round 2 (fixes delivered)
- **What changed per video:**
  - **ERP:** crates moved to the back layer, away from Nexi, with bigger labels; the slab was widened so every label fits; the stamp fades when the floors land. Nexi switches sides by flying *up and over* the house (out of frame) instead of across the floor text, and throws the go-live scissors. Cable labels are drawn after all cables. End spot `top`.
  - **CRM:** the Projects train was parked on the middle branch sign. It now waits between stations. The quiz uses the new two-row wide band at the top so the signs stay visible. Small text was bumped to 17–22. End spot `left`.
  - **Enterprise:** the line "Our group… Malaysia" implied TechNext's own group. The film now opens with a TechNext crew card (facts from the live site: Singapore HQ; Philippines hub in Taguig for Odoo development and consulting; Vietnam hub in Ho Chi Minh City for AI engineering; clients in 10+ countries). The demo then uses a "Sample group · illustrative" (Singapore holding, Philippines and Vietnam companies) with an on-screen tag. There is no Malaysia anywhere. End spot `below`.
  - **Web:** the phone was a tall strip. It is now a real phone (300×616, about 1:2) in frame with phone-scale type; the page scrolls inside it to the form. The hand-over scene was raised to mid-frame and enlarged. End spot `right`.
  - **Social:** full readability redesign:
    - planter labels on the bed fronts;
    - a week × channel plan instead of a 31-day grid;
    - a big sample post with the quiz in the top band;
    - three big sample tiles, a proper gate, a bigger basket and report.
    - End spot `leftlow`.
  - **Brand:** five realistic sample formats (card 340×200, 16:9 slide, 4:5 post, roll-up, signature) in off-brand and on-brand versions. Nexi rides the clothes rail like a zipline so she never covers an asset. A full-frame style guide shows tokens, then components. End spot `rightlow`.
- **Engine lessons:**
  - **Film globals must not reuse engine names.** A crew card constant `CH` overwrote the engine's chapter state and crashed `drawChapter`. Check the list in `engine.md` before naming.
  - **`fly()` follows a spring (`N.go`), so Nexi cuts corners.** Give waypoints 250 px or more of clearance around text, and keep long paths at about 1300 px/s or slower. Check mid-flight frames.
  - **A `thing` created at world (0,0) glides across the whole frame when grabbed.** Use `pocket(o, hand)` to place it at her hand first.
  - **Draw labels after connecting lines** (cables, pipes), or a later line crosses an earlier label.
  - **Three-line captions lift the caption top to about y 720.** Keep lines at 86 characters or fewer when content sits low. The top is about 880 for one line and 835 for two.
  - **`bigjump` lifts Nexi about 330 px.** Near the top of the frame, use a small cheer (`excited` + sparks) instead.
  - **When the camera follows, clamp its y** so screen-fixed bars (step bars) don't land on the subject.
- **Audio lessons:**
  - True-peak overshoots came from single sharp effects: a `snip` at 0.9, and a `jet` under voice blips. Find them with `qa/_peaks.py <name>`, lower that effect in `out/events-<name>.json` and in the film, then re-mux. Changing `render.LIMIT` trades loudness for peak.
  - The `qa_av` voice ratio counts whooshes placed between lines (correct placement). Read the gap list in `_peaks.py` before "fixing" a low ratio. Web stayed at 2.1× for this reason, with music 10.6 dB under the voice.
- **End-card spots across the six solution videos:** `top`, `left`, `below`, `right`, `leftlow`, `rightlow`. On the marketing end card the link row spans x 426–1500, so low spots must stay outside it (x ≤ 300 or ≥ 1640).

## 2026-10-04 · Solution videos batch 3: Technology (iot, appdev, network) + AI (odooai, automation, chatbot)
- **User ask:** one video per item in the technext.asia Solutions menu: Technology (IoT Solutions, App Development, Networks) and AI (Odoo + AI integrations, Workflow Automation, AI Chatbots). Saved to `20. NEXI Explains/01. Season 1` as `Technology 1-3` and `AI 1-3`. RAG Knowledge Assistants (the fourth AI menu item) was not in the screenshot and not made.
- **Worlds used:** Chef Nexi's cold store (chef toque, penguin), Technician Nexi's field visit (cap, cat on the van), Gatekeeper Nexi's castle (knight helmet, rubber duck), Nexi the butler (bow tie, owl, cloche CTA), Inventor Nexi's marble machine (goggles, hamster wheel, calendar-with-a-bite CTA), Concierge Nexi on the night shift (bellhop hat, sleeping cat).
- **A film `var` re-assigns the engine's variable.** Films share one closure with the engine, so `var FLY = [...]` in odooai replaced the engine's flight state: Nexi never moved and was missing from every frame. `build_film.py` now refuses films that redeclare engine top-level names. The guard also caught `SPL` in brand (it had replaced the spotlight state), `END0` in walk (made a plain assignment) and `badge`/`bang` in thumbs. All renamed.
- **`L.tween` from an undefined field gives NaN, and the prop silently never draws.** The "Timesheet in / Invoice drafted" chips in appdev never appeared. Initialise every field you will tween.
- **Never tween a whole array** (again): the chatbot's language bubbles were reset with an array tween. Set the elements directly.
- **Unbalanced `gg.save()`** in leftover code (a save with no restore) leaks canvas state into every later layer. Delete dead drawing code instead of leaving half of it.
- **Tall hats cover name plates.** The chef toque and the knight plume reach about 230-300 px above Nexi's centre, and `RX.panic` or `excited` lift her another 70-100 px. Plan her y against the plate row, then check reaction frames.
- **Spring lag drags Nexi across labels even with high waypoints.** In automation she crossed the Draft plate twice. The reliable route over a set full of labels is out of the top of the frame (y at least 200 above the frame top) and back down.
- **`zap()` only targets Odoo UI hotspots** (`SET.spotPx(key)`). For a tap on a world prop use a ring helper (`tapAt(x, y)`: a tap clip plus `L.ring` and a tap sound).
- **Dark text over a dark prop vanishes** (the "Vendor" label over the mailbox post). Put labels on chips.
- **Cards that would clutter the world go in the `screen` layer.** The automation run log had covered the Draft station and was cut by the frame edge; a screen-fixed card over empty sky fixed both.
- **Quiz over a tall subject:** zoom out until the subject fits between the wide band (bottom at about y 256) and the caption (one line: top about 880). In appdev, zoom 0.82 with camera y 424 fit a 690 px phone and the Odoo card.
- **Typed lines:** quote-led lines (`"Where's my order?" I read it live...`) speak fine; only a leading "..." makes the voice pause.
- **Audio:** stamps at 0.6-0.7 were the true-peak source again (iot). 0.45 is enough. MUSIC_GAIN iot .31, odooai .31; the rest of the batch passed at the default .34.

## 2026-10-04 · Batch 3 round 2: the user's screenshot audit (IoT, App Development, Networks, Odoo + AI fixed; Workflow Automation and AI Chatbots rebuilt)
- **User feedback (verbatim):** "after finishing all the video, audit properly. there are some lapses and, not properly centered and not properly design. if needed to reedit the whole video please do. i will send a free screenshot need to fix, edit or revise. properly redesign the 6th video and workflow animation." / "audit all videos." / "make sure after this session, improve the skill for nexi video. recognize all mistake and in next prompt it will not happened again"
- **What the 15 screenshots showed, and the cause of each:**
  - Nexi cut by the left edge in most scenes (prototype, launch, diagram, bell, one team, tools). Cause: her spot was authored in world px (`STATION - 800`) and never converted to screen px at that scene's zoom; at zoom 0.9 that put her centre at x 150-250. Rule: compute spots from the screen (Framing math).
  - Text touching or overflowing its card ("main line + backup", "Google Play", "Spreadsheets", the desk plaque). Cause: fixed card widths. Rule: size boxes from measured text.
  - A tag chip cutting the end of a title ("Network diagra|m ✓ Handed over to you"). Cause: chip at a fixed x. Rule: inline chips go after the measured title + 24 px.
  - A card half-covering another prop's label (the Odoo IoT hub over the printed label, the alert phone over the freezer plate, the Quality Check card over Chiller A). Rule: cover a whole prop or none of it.
  - Labels that don't label what they sit over ("Customer apps / Staff apps / Portals" floating above iOS / Android / Web, off-centre, with the platform pills cut by the frame bottom). Rule: each label centred on its item and true for it; everything above the caption band.
  - Off-centre groups (the prototype card with the team outside it, the launch scene, the vendor bill scene, the diagram left-heavy inside its scroll). Rule: centre the group; centre content inside containers.
  - Nexi standing BEHIND the van (front layer) instead of riding on it. Rule: riding = her lowest point on the roof line and nothing in front of her; if the ride would pass signs, she waves from above instead.
  - Port labels P03-P06 stacked at the fan-out. Rule: one segment per label (bus routing).
  - The bell posts running down behind the caption. Rule: stands end on a base above the caption band.
  - Empty fields that looked broken (vendor bill). Rule: empty inputs look empty on purpose (dashed border + "Empty").
  - Workflow Automation's marble machine: labels over posts and ramps, thin rails, small text, cut stations, a log card covering a station. Rebuilt (see below).
  - AI Chatbots: small cards and text in mostly empty frames, Nexi cornered. Rebuilt (see below).
- **What the measured audit found that sheets had missed:**
  - Empty frames before every CTA (the old scene faded at line start, the CTA popped 1.1 s later) and after camera moves (scene content waited for a later word).
  - Nexi passing under the HUD chapter pill on almost every scene change: the camera pan drags her across the top-left while her spring-lagged flight is still slow. Fix: `flyOver` (fast ease-out take-off, up and over, drop in from above-right) + camera moves 0.4 s after take-off (0.55-0.65 s for long whips from a left spot) + `via` waypoints to step clear of signs first.
  - Delaying the camera created a new gap (old scene gone before the camera moved). Fix: the old scene fades from +0.5 s, the new scene appears from +0.45 s.
  - A lifted cloche lid parked over the CTA card. Rule: props that fly away leave the frame.
- **Rebuilds that worked:**
  - Workflow Automation: five step modules in ONE centred row (280 px, 340 apart, zoom 0.84-0.88), a request card ("PR" then "PO") riding a track beneath, a log tag printed under each step, Finance approving on a card above the Approve module with a barrier on the track, Nexi supervising from the open sky ABOVE the row (never over a module). Other scenes: a control console (quiz; pause / kill switch / roll back driven by a computed position, since tweens can't be cancelled), guardrail columns that are up when the camera lands, a tools hub with cards sized to their names, the monthly report, the calendar CTA.
  - AI Chatbots: a night lobby (window, clock, channel cards stacked right, inbox tray, bell, sleeping cat) with Nexi behind the desk; ONE large realistic chat window (header, scrolling bubbles, input bar) carrying three conversations, with a matching side card each time (your content, the Odoo order, the CRM lead); the quiz and hand-off back in the lobby; one-content-three-languages; the review notebook; the CTA.
- **Checker false positives fixed (so findings can be trusted):** shapes inside a clip only cover what the clip shows; a text wholly under a later opaque card is hidden, not a fault; an outline behind the text's own card is hidden; opaque drawn shapes (a van body) hide what is behind them; translucent gradients (a scan beam) are not opaque covers; 1-2 character glyphs (badges, dozing z's) are decoration; Nexi crossing the frame edge for under 1.8 s is a transit.
- **Audio:** IoT and AI Chatbots missed the true peak (-1.8 / -1.5 dBTP) on voice peaks, not effects. Fix: `render.LIMIT` 0.68 for those two (plus softer buzz / stamp / holo), re-mux only.
- **Tooling:** `audio_t` has no `clunk`, `rewind` or `crunch` sound; check the list in `engine.md` before using a name.

## 2026-10-04 · Round-2 follow-ups: AI 2 calendar, Quick Tip, Social (older-film audit)
User feedback (verbatim): "fix this part  ai 2" (screenshot: a white diagonal band through the THIS WEEK calendar on the Workflow Automation end scene, only "IS WEEK" visible).
- **Cut-out made of circles (the hamster bite).** First cause: each arc in the evenodd clip path was joined to the previous point by a straight line, which cut a diagonal wedge through the card. First fix (a `moveTo` before each arc) removed the band, but the full-resolution crop of the FINAL MP4 then showed white wedges at the joins. Under evenodd, the place where two circles overlap is covered twice and flips back IN. Final fix: the bite is ONE outline, the union of the circles (four arcs between their intersection points), with separate circles only while they don't overlap. I missed both defects on the 12-frame sheet, so a full-resolution crop of the CTA object is now a delivery check.
- **Stale audit reports.** `render.py audit` writes `data.jsonl` and frames but NOT `report.txt` or `issues-*.jpg`. I read a report from the previous run and nearly "fixed" a calendar that had already moved. Always re-run `python layout_audit.py <film>` after the audit render, and check the report is newer than `data.jsonl`.
- **Quick Tip:** the day calendar sat right above Nexi's home spot. Her "one click" jump covered it, and the confused "?" glyphs landed on its text. It now sits at (300, 52) between the HUD and the Odoo window (0 high findings).
- **Audio:** films with no `render.LIMIT` entry fall back to 0.8. Quick Tip peaked at -1.6 dBTP. LIMIT is now set for every film (tip 0.68; myth, reorder and beforeafter 0.7). The fix was a re-mux only.
- **Social Media:**
  - **Intro exit.** `introSeq` nx/ny (default 720, 600) is where Nexi flies after the lock-up, in the FIRST SCENE's world coordinates. Social's default sent her diving through the planter labels while the garden faded in. Now nx/ny is 1620, 470, so she rises in the gap between the LinkedIn and Facebook labels.
  - **Quiz.** She used to fly straight across behind the sample post (a front-layer card). Now she does a `flyOver` and the card pops 0.45 s later, once she is clear.
  - **Report to CTA.** She passed behind the report's corner. Now `flyOver(..., { via: [[REPX - 700, 40]] })` climbs on the left first.
  - **Seed packets.** Tossed packets looped over the "October plan" title (arc height 300). They now fly a low arc (h 80) at scale 0.6.
  - **Engagement bubbles** floated over Nexi while she watered. They now fade out inside her silhouette box (`N.botPx()` is world px).
  - **Basket.** The "Leads" label sat on the weave lines; it now has its own plate.
  - **Produce, approve and quiz** are re-centred as one group (Nexi + card).
  - The CTA body lines got 36 px leading.
- **Delegation:** four agents fixed Web, CRM, Enterprise and ERP in parallel (no renders). The user paused the session mid-way. Each agent was asked to stop at a buildable point and report; their plans are in `qa/ROUND2-TODO.md` in the renderer repo.

## 2026-10-04 · Strict mode: the rules became code (lint, measured audit, release gate)
- **User ask (verbatim):** "properly train and set up rules. upgrade nexi video skills base on changes and updates. be strict implementing rules."
- **Why.** Every lapse the user found was already covered by a written rule, but a written rule only works if someone remembers it at the right frame. The fix was enforcement:
  - `reference/rules.md` is a numbered rulebook (C, B, F, T, N, M, P, Q, E, A, G, K), and each rule names its check. It replaces design-rules.md.
  - `lint.py` runs inside `build_film.py` and blocks the build. It checks: Malaysia (C1), partner badges (B1), samples unlabelled (C3), cyber security (C4), leading dots (T5), 4-line captions (T6), intro exit (N7), end spot (E1) and the one-quiz rule (Q1). `--selftest` proves each check fires.
  - `gate.py` checks build, lint, registry, a measured audit of THIS build (fingerprint), the HIGH / parked / off-centre findings, end-spot uniqueness, the render stamp, audio A1–A5, and the final sheet + full-resolution CTA frame.
  - `render.py mp4` refuses on a failing pre-gate. `deliver.py copy` refuses on any FAIL. There is no bypass flag. Waivers need reasons and are told to the user.
  - Stamps prove it is the same build: `render.py audit` writes `meta.json` (fingerprint) and deletes the old report; `layout_audit.py` writes `findings.json`; `render.py mp4` writes `out/<NAME>.build.json`.
- **Calibration** (the gate run on the films delivered today):
  - Workflow Automation, AI Chatbots, IoT and Networks pass.
  - It caught real lapses I had called done:
    - App Development's phone scene (11–18 s) crammed into the left half, with the right half empty, plus the van scene left-heavy (6–10 s).
    - Odoo + AI: Nexi's hand 90 px from the left edge (8–10 s; resting centre 280 < 300), and the bill scene 170 px right of centre (24–28 s).
    - Quick Tip: the walkthrough-family home spot puts Nexi 80–90 px from the edge.
    - Social: a tossed packet crosses the LinkedIn row label for 0.5 s, and the held packet touches the board title.
  - It also showed one checker blind spot, now fixed: the 3D Odoo window was not counted in the composition (patch p30). Walkthrough-family films looked off-centre whenever the window's text was sparse.
- **Fixed in source now** (each needs a re-render through the gate):
  - CRM "SG · MY · ID" → "SG · TH · ID", and Kopi Co. MY → TH (C1).
  - Leading "…" removed in myth, reorder and beforeafter (T5).
  - Explicit end spots (E1): myth `left`, beforeafter `leftlow`, tip `rightlow`, reorder `top`. The four used to share the default `right`.
  - ERP and Web fail lint C3 (no on-screen "sample" label): add one in their redesign.
- **General lessons from the four planning agents** (Web, CRM, Enterprise, ERP), promoted to rules:
  - A square fill drawn after a rounded header runs over the header's text (P8).
  - Quiz answers longer than about 28 characters overflow the 1180 px wide band (T10).
  - The pointer-with-eyes covers the button label it presses (M7).
  - Props carried across Nexi's body hide her (N8).
  - Cranes and boards are cut at the frame edges while the camera holds (F4).
  - The CTA pops into an almost empty frame (F5).
  - Sparks land on chips (N9).
  - The big cheer lifts Nexi out of frame (N5).
  - 3-line captions reach y 720 (T6).
- **Tooling:**
  - Two modules re-wrapping `sys.stdout` closed each other's stream ("I/O operation on closed file"); use `sys.stdout.reconfigure`.
  - The Bash tool halved the backslashes in a heredoc patch again; write patch scripts with the Write tool.
  - `SET` and `P` live inside the engine closure, so audit-side code cannot reach them. Engine data for the audit goes through `AU.setMeta` in `engine_tail.js`.

## 2026-10-04 · ERP 4 Odoo Customization (new film `custom`) + AI 1 Odoo + AI re-delivered; CRM redesign paused
- **User ask:** "do create video for these" (screenshot of the Odoo menu's Customization column: Odoo Customization, AI Integration, CRM Development). AI Integration (`odooai`) and CRM Development (`crm`) already had films on the same pages, so they were fixed rather than duplicated; Odoo Customization (`odoo/erp-system`) got a new film. Then: "wrap it up, work in new video".
- **The world:** customising Odoo is a five-camp climb (standard, configuration, Studio, custom module, integrations: the page's own "start at standard, climb only when you must"). Guide Nexi in a knit beanie (new costume `beanie`, p31), a mountain goat always one camp ahead, an upgrade-test card, the summit flag CTA. Music style `alpine` (marimba + swing). File: `20. NEXI Explains/01. Season 1/ERP 4 - Odoo Customization (16x9).mp4`, 62.5 s, end spot `right` (ERP group: erp top, crm left, enterprise below, custom right).
- **Framing by construction (worked first time):** every camp is authored in SCREEN coordinates and drawn with `gg.translate(OX(k), OY(k))`, where `OX = CX - 960`, `OY = GY - 790`, and the camera sits at `(CX, GY - 250, zoom 1)`. The local layout then IS the frame, so centring is exact: Nexi at screen (430, 470), the sign top-centre, props on the ledge at screen y 790. The first audit had 0 off-centre findings in the camps.
- **First audit: 5 HIGH, all known patterns:**
  - Held tags covered Nexi's body: `pocket(o, 'R', 10, …)` puts a 200 px tag across her. Use dx about 150 (N8).
  - A field chip tossed into a document slot crossed three text rows. Fill a slot in place (a tap plus sparks); never toss across a card's text (M10).
  - In the ONE-ROW wide quiz, the question starts at x + 32 and the answers at x + 560, so a 32 px question longer than about 26 characters runs under the first answer pill ("covered"). Keep the question short (T10).
  - `RX.hmm()` "?" glyphs sat under the top quiz band, and `RX.shock()`'s "!" floated out of the top of the frame. Near the top band or the frame top, act without emote glyphs (`N.play('think')`, `shockJump` without `bang`) (N5).
- **Parked mediums:** a value chip above its row overlapped the row card (put values inside the row). A header band made from `rrect` + `fillRect` had an edge through the title (clip one band to the card instead). Cargo labels riding a rope bridge crossed the ropes (use Odoo icons, no text).
- **Off-centre CTA:** the flag group measured 270–1290 (180 px left). Shift the CTA object until Nexi + object centre within 160 px.
- **`flyOver` cruise height:** the default `up` (-400) is an absolute world y. In a world that climbs (camera y < 300), -400 is INSIDE the frame. Pass `up` = the higher frame top − 250, plus `via: [[x, y − 410]]` (straight up from her spot first), so she never crosses the camp sign.
- **Far parallax ranges:** draw them in a back prop with `gg.setTransform(1,0,0,1,0,0); camApply(gg, 0.22)`. Shapes only; the audit is unaffected.
- **Audio:** two pops stacked on `wear()`'s magic + pop made a −1.4 dBTP peak at 5.5 s. `render.LIMIT` 0.66 did NOT fix it (the stack itself is the source); lowering the pop in the film and delaying it by 0.25 s gave −3.1. MUSIC_GAIN custom .31 (music 10.1 dB under the voice, 4.7 dB in the gaps). Don't stack a scene pop on the costume's pop.
- **odooai (agent):** camera x 1740 + Nexi x 1060 cleared the left edge. The bill scene was re-centred with Finance at (2900, 610); Finance presses Approve (true to "a person approves"). Full gate PASS, no waivers, 61.8 s.
- **CRM (agent, paused):** a full redesign per the ROUND2-TODO plan builds with clean lint but is NOT audited. See `qa/ROUND2-TODO.md`.

## 2026-10-04 · CRM Development round 3: the redesign through the gate (38 HIGH → 0), Season-1 reels refreshed
- **User ask:** "continue this" (the paused CRM redesign). Delivered: `22/ERP 2 - CRM Development (16x9).mp4`, 60.3 s, full gate PASS, no waivers; Malaysia gone (sample markets SG · TH · ID).
- **The audit only sees text and cards.** The composition check counts text boxes, text cards and Nexi. A big UNLABELLED prop (the train at the lead station) is invisible to it, so the scene measured 296 px left of centre although it looked balanced. Fix: give key props a readable label ("Boarding" on the empty car, "CRM Express" on the loco, shown only in that scene) or move the labelled pieces.
- **Draw a moving prop's label last.** The car's plate was drawn before its bar and wheels. On the curve the car tilts, the rotated label's box overlaps the later shapes, and the audit reads "covered" (HIGH). Plates and labels go after every shape of their prop.
- **Fade a station's labels when the camera leaves.** The junction plates slid under the caption while the camera tracked the train away. A scene-alpha (`JA.a`) tweened to 0 at the departure fixed it.
- **No particles near labels.** Confetti over a moving label = HIGH. Celebrate with rings around the plate (`L.ring`) or sparks well away from text.
- **A card that rises out of another comes to rest clear of it** (≥ 10 px gap), or the "cards overlap" medium parks for seconds.
- **Stamps land where the action is.** A punch stamp beside the ticket heading passed the audit but read crowded at full resolution; on the stub (what Nexi punches) it is clear and makes sense. Always judge the full-res CTA crop, not just the checker.
- **Audio:** lowering the whistle (0.8 → 0.55) RAISED another peak (-1.9 → -1.5 dBTP), because loudnorm re-normalises the whole mix. `render.LIMIT` crm 0.66 gave -3.1 dBTP at -17.9 LUFS. When you change an effect in `out/events-<film>.json`, change the film source to match.
- **Season 1 packaging:** after re-rendering a Season-1 episode, run `python vertical.py <ids>` then `python deliver_series.py` (it re-copies all 58 files with md5). EP05 tip, EP06 crm and EP10 social reels were regenerated.
- **Costumes for the Odoo Apps series (p33):** `tophat`, `boppers` (heart boppers), `helmet` (GREEN cycling helmet: the first blue one read like the App Development cap), `astro`. Check new costumes on `films/weartest.js` + `render.py sheet` before any film uses them.

## 2026-10-04 · Apps 1 All Odoo Apps (new film `apps`, Odoo Apps series)
- **User ask:** "create new fresh video for this" (screenshot of the Odoo menu's Odoo Apps column: All Odoo apps, Accounting, Sales, Inventory). A new series group **Apps** (`Apps n - <name> (16x9).mp4`, gate G6 group added). Apps 1 by the lead; Accounting, Sales and Inventory by three agents in parallel (ports 3987/3990, 3988/3991, 3993/3994).
- **The world:** Odoo City. 8 districts = the app categories with their app counts, one grid under the streets = the shared database (a cut-away with Customers / Products / Accounts pipes), an order crossing three buildings = native links, an empty lot + quiz = adding an app later, the city switchboard = phases, the key to the city = the CTA. Mayor Nexi (`tophat`), a pigeon that perches on roofs and signs. Music `city` (vibe + four): MUSIC_GAIN .30 and LIMIT .66 were needed (music was 8.7 dB under the voice at .34).
- **`at()` inside a running event never fires on time.** The event list is sorted once at build; an `at()` added from inside a callback goes to the END of the list and runs after everything else (the 8 district tiles never appeared). Inside callbacks always use `later(d, fn)`. Rule K8.
- **Size every building or plate from its measured name** (`w = max(w, iconW + L.tw(name) + pad)`): "Accounting" was clipped by a 200 px building.
- **Pigeon/animal perches:** on a roof edge or a sign's top edge, never on a label; move the perch when the scene changes (the pigeon floated in mid-air after its sign faded).
- **Card interiors need a vertical budget.** A footer chip at `y + h - 40` landed on the second row of tiles: plan rows so the footer has its own band.
- **Tall hat under the top quiz band:** drop Nexi about 90 px for the quiz (`goTo(x, y + 90)`) and restore her on the reveal.
- **Motion-blur whips** produce 1-frame "overflow" mediums on every text in frame; they never park, so ignore them.
- **K8 is automated** (`patches/p37_lint_k8.py`): lint tracks build-time vs runtime function bodies (a function passed to anything but forEach/map/filter or an IIFE is runtime) and blocks `at()` inside runtime bodies; selftest covers both sides, 0 hits on all 23 films. The first attempt was written as a Bash heredoc and broke lint.py (escapes): K7 again. Write patch scripts with the Write tool, test on a COPY, then apply.

## 2026-10-04 · Apps 2 Accounting (agent; new film `accounting`)
- **The world:** "It's a Match!", a dating show where bank lines meet invoices. Matchmaker Nexi (`boppers`), lovebirds, a golden-envelope CTA, end spot `leftlow`. 65.2 s, full gate PASS, no waivers, MUSIC_GAIN .34 (style `gameshow`). The first pill uses the `accountant` tile (the real Accounting app; `account` is Invoicing).
- **Stage changes start AT the line start, never in the hold before it.** Starting 0.4 s early put every whoosh into the gaps that A3 measures, and the voice ratio fell to 0.8×. M1 now says t0 = the line's start.
- **Leaving a busy board:** two straight-up waypoints (`[x, 60]` then `[x, -280]`) before the crossing. One waypoint let the spring cut the corner through a title.
- **Dashed "Waiting for…" slots** make a good establishing shot before the cards arrive. Fade each slot before its card pops, or the growing card half-covers the slot text.
- **A card rising out of a container (the envelope):** fade its text in only once it is about 75% up, so nothing ever half-covers it.
- **Backdrop decorations** (drapes, spotlight cones): use gradients with transparent stops, or make them frame-sized, so the audit never treats them as the box under loose text.

## 2026-10-04 · Apps 4 Inventory (agent; new film `inventory`)
- **The world:** Commander Nexi (`astro`) follows ONE transfer on a light space-station cargo deck: mission board of the 5 states, dock + Quality arch (receipt), robot arm into labelled bays + route pills 1/2/3 steps (put away), lot / serial / expiry tags (in stock), barcode picking 8 of 10 (quiz → backorder), a gauge below Min firing the reordering rule (RFQ capsule docks into Purchase), the launch pad (shipped), invoice 10 ordered / 8 delivered / 8 invoiced, mission-patch CTA, a floating goldfish. 65.3 s, full gate PASS, no waivers, style `space`, MUSIC_GAIN .34, end spot `left`.
- **Screen-coordinate stations** (the custom.js pattern) gave 0 HIGH and 0 off-centre on the first audit. Putting Nexi on the RIGHT for one station varies the rhythm without breaking the centring.
- **Two-joint robot arm:** keep every target on one side of the shoulder so the elbow never flips; draw the arm BEFORE the rack so bay labels stay on top.
- **`shockJump` (and `RX.shock`) lift Nexi too:** from y 470 the astro antenna left the frame twice. Use `peer` + `E.shock` near the top. N5 lint now warns on shockJump / RX.shock (p38).
- **A prop flying into a card** (the RFQ capsule) drops its label before it fades, and its sparks stay off the card's text.
- **Effects under spoken words** stay at 0.3 or below: a 0.45 whoosh under a word right after an alarm hit -1.67 dBTP.
- **Known checker artifact:** during a quiz wait the caption fades with no next line and the audit briefly reads "caption overflow". It is short and passes; do not "fix" the checker for it.

## 2026-10-04 · Quick Tips #2-#4 (agent, built in a SANDBOX copy of the renderer)
- **User ask:** "create new additional video, quick tips. 3 videos that will showcase important tips using odoo". Chosen tips: Ctrl+K command palette (type "/" + a menu name), multi-edit in a list view (tick records, edit one field, confirm, all update), schedule an activity from the chatter (type, due date, assignee, summary; shows on the record and in the clock menu; green planned / orange today / red overdue).
- **Sandbox pattern:** new Odoo screens need `ui.js` (an engine file), and changing it invalidates EVERY film's fingerprint, so it cannot happen while other films are mid-pipeline. The tips were designed, audited and rendered in `~/ClaudeWork/nexi-tips-sandbox` (a copy of web/ + *.py + patches/, sharing only `~/ClaudeWork/qa/nexi/cdp.py`). ui.js work ships as ONE idempotent patch (p35), registration as p36 (inserts into the tables instead of matching fixed lines). Port after the in-flight films are delivered.
- **A long reaction clip keeps playing under a new one:** `faint` (2.6 s) threw the hand-beam origin up to the HUD. Let long clips finish before any `handPx` beam (`zap`).
- **Shortcut keycaps** go on the window's empty, dimmed lower band, centred under the modal, never above Nexi (her big reactions would hit them).
- **Stylised Odoo text:** use 24-34 canvas px. The window maps about 0.78 screen px per canvas px, so the stock 15-17 px shows at about 12-13 px. The audit cannot see text inside the window texture, so judge it on the sheet.
- **Lenses:** a tight rect with `pad: 4`, or they pull in neighbouring controls.
- **Odoo-UI tip timing:** about 0.6 s per zap (lead + travel). Keep one tap per 0.5 s of speech; split a caption that carries more than three steps.
- **Facts kept conservative:** the clock-menu badge appears only when an activity is due today or late; the multi-edit dialog text is paraphrased ("Update the 3 selected records?").
- **True peak via an effect:** lowering an effect in the film means rebuild + re-audit + re-render; only MUSIC_GAIN / LIMIT changes are re-mux-only.

## 2026-10-04 · Owner's glitch audit, the website voice, episode names (all videos)
- **User asks (verbatim):**
  - "audit the new videos. check some visual error, glitches and lapses and do quick fix" (two screenshots: the floating magnifier, the put-away rack)
  - "make sure all videos have similar voicing/audio as https://technext.asia/nexi#full. the current audio are to sharp. allply audio update in all video."
  - "proeprly name the video file per episode so i can properly knwo what episode need to be posted first. apply to all video."
  - "remember, quick tips video are not included in the episode."
- **Glitches the measured audit could not see, now found by looking at the FINAL MP4** (`qa/mp4strip.py <film> t0 t1 step`):
  - **A held prop floated beside her hand** (the magnifier ~100 px out, handle pointing away). This was caused by my own brief to the agents ("pocket dx about 150 so the tag clears her body"). A held prop is GRIPPED: its grip point (handle end, near edge) sits at the hand. Draw the handle toward the hand and offset by the grip vector (magnifier: handle down-left, `pocket(MAG, 'R', 50, -50)`). Rule N8.
  - **A crate changed colour as it landed** (the rack painted placed crates by row). Placed objects keep their identity: colour, label, size. Rule P10.
  - **Blank flashes mid-whip** in most solution films (accounting 23.7 s, inventory 17.4 s, custom, apps, sales). Rule M1 itself caused them: the old station faded at +0.5 s, before a 1 s whip from +0.6 s had moved, and the next station was still off-frame. Stations at least 2000 px apart now keep the old scene until the camera lands (+1.7 s); only same-station swaps fade early. `qa/blank_scan.py` lists blank stretches from the audit data (it ignores the Odoo-window films, whose content is a 3D texture).
- **The website voice** (p40-p44): the video voice had the site's tones but boosted the square blips 4.6×, so the talking was a loud square buzz.
  - **Now:** the exact site chain (chirp .45/.38, blip .05, master .26, a Web Audio compressor emulation), VOICE_K 2.2.
  - **Music:** ×0.8, low-passed at 2.6 kHz.
  - **Effects:** ×0.5, low-passed at 5 kHz.
  - **Master:** a gentle compressor (8 dB under the peak, 6:1) so loudnorm still reaches -17.5 LUFS with a true peak at or below -2.
  - **Result:** the share of energy above 3.5 kHz fell from 12% to 5-8%.
  - **MUSIC_GAIN re-centred for every film** by `qa/music_tune.py`, which uses the gate's own A4/A5 formula with no mux.
  - **Films with effects packed into the gaps needed `FX_FILM`:** walk .38, beforeafter .26, web .2 (A3 voice ratio). Odoo + AI needed LIMIT .66 (A2).
  - **Try settings without touching out/:** `qa/audio_try.py <film> [K music fx]` (env: AT_MUSIC_LP, AT_FX_LP, AT_MASTER, AT_LIMIT).
- **An engine change makes old renders undeliverable through the full gate** (G1/G4/G7). An AUDIO-ONLY refresh is still legitimate: `deliver.py audio <film>` refuses unless the local video stream is bit-identical to the Drive file's (ffmpeg stream md5), then runs A1-A5. `qa/audio_batch.py films...` re-muxes and picks `copy` (full gate) or `audio` per film. All 25 videos were refreshed: 8 through the full gate (tip2-4, apps, accounting, custom, sales, inventory), 17 audio-only.
- **Episode names:** `deliver.EPISODES` (EP01-EP21, posting order, NO tips), `deliver.TIPS` (Quick Tip 01-04), `deliver.GROUP` (the series group for lint's solution checks and gate G6, which used to read the file-name prefix). `deliver.py rename` renames the Drive files (never deletes). Season 1 packaging follows `thumbs.ORDER` (10 episodes) + `thumbs.TIPS`; `deliver_series.py` moves old-numbered files to `_superseded 2026-10-04`. The cute shorts are `Short nn - <title>`.

## 2026-10-04 · Thumbnail redesign + one folder per post (all 25 posts)
- **User ask (verbatim):** "make sure the thumbnails and short video also in one folder" and "redesign the thumbnail, still use technext branding. but make it over exxagerated. if ned to use darker shade of blue for background do so. make sure thumbail still connected to the video content with elements. in thumbnail design, add number of episode." Rules H1-H6.
- **The design (p50/p51, `web/films/thumbs.js`):**
  - one deep TechNext blue for the whole series (`TNBG` #3F80F2 → #1846B8 → #050F30; Before vs After keeps a slate "before" half);
  - a cyan glow behind Nexi and on her sticker rim, and a giant ghost of the episode number behind her;
  - a bigger badge: TechNext logo strip (`L.IMG.logoH`), NEXI EXPLAINS / QUICK TIP strip, then EP nn / TIP nn up to 214 px (`fitSize`);
  - the 14 films without drawn art get a scene card cut from their own key frame, their costume, an Odoo tile and one "pow" prop (pill, stamp, keycaps, thermometer, moon + clock, wifi burst, calendar).
- **Raised hands covered the scene card** (automation's Approve step, the accounting banner). Fix: draw the card in the screen pass, in FRONT of Nexi. Her hand then reads as holding the screen from behind (H5).
- **Pills under the hook:** "3 RECORDS, 1 EDIT" sat under "EDIT MANY". Keep pills short (≤ 12 characters) and on the card's bottom-right corner.
- **On the 9:16 cover, Nexi's head hid the card.** Generic covers now put Nexi at y 1905 and the card at y 1122. Her face stays inside the 3:4 grid crop (y < 1680).
- **The bigger badge touched the hook on the vertical-video frame:** moved to y 168 at scale 0.82, with no format tag on covers or frames.
- **Never two Nexis:** crop the scene card so the in-video Nexi is outside it. The network castle frame was swapped for a tile where she stands at the side.
- **The number comes through the URL** (`thumbs.py` → `&ep=&qt=` from `deliver.EPISODES`): the p49 re-order had needed a regex edit of every `ep:` in thumbs.js.
- **Packaging (p52):** `deliver.DST` now points to `<base>/<base> (16x9).mp4`. `deliver_series.py` (rewritten):
  - moves the flat masters into their folders (a rename, not a re-copy of 700 MB);
  - renames renumbered folders by title;
  - copies the short, thumbnail and cover with md5 (78 files, 0 mismatches);
  - moved folder 24 to `00. old`.
  - `vertical.py` takes about 10 s per short (25 in about 4 minutes).
- **The Bash tool halved the backslashes again:** an escaped `\\n` in a patch written through `python - <<EOF` arrived as a real newline inside a Python string literal, so the patch would not run. Edit patch files with the Edit tool; never splice JS strings through a heredoc (K7).

## 2026-10-04 · EP00 series pilot "Meet Nexi" (new film `pilot`, 2:42, the longest film yet)
- **User ask (verbatim):** "create intro video about next explaining about technext and other services. make it as creative as possible. add more cinematic skills like telling a story. it's okay if it takes 2-5 minutes. also mention that nexi will gonna do episodic style about technext services specially odoo. scene just like recreating a anime /comics movie scene. make nexi more jolly and adorable., do alot of expression. do alot of analogy and costume and background scene. make interactive as possible."
- **The story (10 stations, 40 lines):**
  - **The book.** Nexi opens a comic book and dives into it (a white page-flash cut).
  - **The monster.** A Spreadsheet Monster attacks a night city. Nexi makes a hero landing in a drawn cape, then calls her crew with a paper-plane signal.
  - **The crew.** She rides the TechNext paper plane over three city cards: Singapore HQ, Taguig City (development and consulting), Ho Chi Minh City (AI engineering).
  - **Four power-ups**, each an anime/comic genre and a costume:
    - Odoo ERP: a combining robot made of app tiles (hard hat);
    - AI: a dojo power-up with an aura and three scrolls (goggles);
    - Marketing: an idol stage with light sticks (heart boppers);
    - Technology: a space cockpit (astro).
  - **The final battle.** ONE. SYSTEM. BEAM! turns the monster into paper planes at dawn, and the sample shop flips to OPEN.
  - **"Next time on Nexi Explains".** A TV studio with the episode grid, a comment-box poll and the NEXT EPISODE banner (bow tie).
  - **The CTA.** The comic's back cover: "Your story is next!".
  - **Interactive moments:** two "pause and guess" quizzes, light sticks + "drop a heart", "comment the episode number".
- **Facts** came from technext.asia `company`, the home page and `solutions/*` (C2). The quiz answers follow the site: one database; a person approves.
- **Full-frame backgrounds work:** back props draw after the 3D set (engine.md). The first cape was invisible because its prop was registered BEFORE the background painter. Register order = draw order.
- **First audit: 16 HIGH**, mostly comic lettering: a drop layer drawn as a second word 7 px lower reads as "X overlaps X". Fixed by T11 (the drop is the outline's shadow; bursts are sized from the word).
- **Then the pre-gate failed on off-centre groups (6 stations, 3-6 s each).**
  - Cause: cards were revealed one per line (crew, dojo, stage, space).
  - Cause: the monster, the biggest thing on screen, was unlabelled.
  - Fix: F9 (whole set on landing, highlight per line) and P11 (a name box for the monster).
- **A half-open scroll clips its lower lines** ("overflow" + "covered" HIGH). A line now shows only once the paper has unrolled past it.
- **Zoom stays honest:** a 1.18 push-in on the book would have put Nexi's centre at x 216. Do the framing math for every camera move, not only for resting frames.
- **B5 exception (owner):** the pilot changes costume per scene. Episodes keep one costume.
- **Audio passed first time with 10 score changes** (MUSIC_GAIN .34, LIMIT .68): -17.9 LUFS, -3.2 dBTP, voice ratio 6.5x, music 11.1 dB under the voice (4.7 dB in the gaps). Effects stayed at or below 0.5 and started at line starts.
- **Packaging (p54):** EP00 is first in `thumbs.ORDER`, number 0. Its scene card is the monster scene (tile 1, 20.2 s, Nexi cropped out); its hook is MEET / NEXI!. A thumbnail cape was tried and removed: at thumbnail zoom her body hides it, and only two edge lines show. Drawn body parts don't read at a 2.3x close-up.
- **Delivered:** `22/EP00 - Meet Nexi - Series Intro/` (16:9 63 MB, 9:16 27.7 MB, thumbnail, cover). 81 files were md5-checked. Posting plan: EP00 first, pinned.

## 2026-10-04 · EP00 pilot v2: the redesign (cinematic, reactive, cel-shaded; 3:29)
- **User feedback on v1 (verbatim):**
  - "redesign some parts, make it interactive and connected to nexi fix some comic style of design, it's ugly. make a creative designing on this parts. do proper cinematic style of story telling. you can slow down explaining things and give time to viewers to absorb information thru animation."
  - "make sure there's a exaggeration effect in every reaction. make nexi reactive."
  - "also redesign this part" (the idol stage).
  - The screenshots flagged: the crew map and plane ride, the "Four TechNext powers" card, the Odoo robot, the AI dojo scrolls, the tech space panels, the night city / monster / BOOM / cape, and the idol stage.
- **What was ugly in v1:** flat clip-art shapes (single rectangles and circles, one tone), a card that listed the four powers instead of showing them, a robot that stood next to Nexi instead of forming around her, scrolls with placeholder lines, panels that were finished before she spoke, and comic words drawn as plain text.
- **v2 (13 stations, 46 lines, 3:29; was 10, 40, 2:42).** Rebuilt as four files in `qa/pilot_v2/` (p1 head and kit, p2 worlds, p3 scenes, p4 script), concatenated into `films/pilot.js` (v1 is `qa/pilot.v1.js`).
  - **The kit (engine.md):** `react()`, `glyph()`, `focus()`, cached `sfxWord` sprites, `cel()`/`shine()`, `drawCape()`, `transform()`.
  - **Night city:** sky, stars, moon and clouds, then far, mid and near skylines, a hero rooftop and a street with lamps.
  - **The monster:** three spreadsheet sheets with sticky-note spikes, rolled-paper arms and a face. It eats order slips (CHOMP), and #REF!, #N/A and TYPO! fly out.
  - **The crew:** Nexi rides the paper plane (it sits right under her). Three islands, each with its city's skyline, a boarding pass and a stamp (HQ / DEV HUB / AI HUB). Then a globe with pins: "Three offices, one team", "Clients in 10+ countries".
  - **The power chamber:** four crystals and a POWER meter (0/4 to 4/4), so the four services are earned one by one instead of listed on a card.
  - **Odoo:** the armour docks onto Nexi part by part, with a database window in the torso. An order token travels Confirmed, Shipped, Invoiced ("One database").
  - **AI dojo:** each scroll unrolls into a working demo. A PDF becomes a vendor-bill draft ("Prepared by AI · a person approves"). A chatbot answers at 11:42 pm. A knowledge answer cites its source ("Expense policy, page 2"). An approval card shows S$48,000.
  - **Idol stage (redesigned on request):** a truss, an LED wall and a crowd with light sticks. Three screens (Websites, Social media, Brand assets) light up as she sings about each one. She holds the mic, and a heart counter climbs.
  - **Cockpit:** she flies it. The holo panels build while she explains: an IoT chart with its 5 °C limit and "Alert sent"; a customer app and a staff app on a phone; a network with Staff, Printer and Guests, where "Guests: internet only".
  - **Final battle:** the beam leaves her hand and hits the monster's mouth. The monster bursts into paper planes (KA-BOOM), the shop sign flips to OPEN, and HAPPY ENDING! appears.
- **Every line has a `react()` beat** (46/46; the new `lint:N10` counts film functions such as `transform()`). Big beats add a sprite SFX word.
- **Pacing:** `hold` 0.3–0.5 s on every line. Each station opens with an establishing beat. Builds run during their line.
- **Sheet review found (fix_a.py):**
  - The plane floated below her (y +240): moved to +196 and made 1.45x bigger.
  - A stamp sat on the role text: the boarding pass is now sized from the measured texts + 330 px.
  - The order card covered the Inventory arm: moved, and made 40 px narrower.
  - The meter count touched its edge: widened the card.
  - The moon window was cut off by the frame: moved inside.
  - **The stage screens and cockpit panels were finished before their lines.** The start times were initialised to -9, so `t - (-9)` was past every step. Fixed: K9.
  - A network-ring `%` went negative.
  - The beam crossed the shop sign: it now aims at the mouth.
- **Pre-gate failed:** the city was off-centre from 19.3 to 24.0 s, before any label existed. Fixed with a comic narration box, "MEANWHILE, IN THE CITY" (fix_b.py, F10).
- **Measured audit:** 0 HIGH, 15 medium, 76 low. Pre-gate PASS. Strips A and B looked right.
- **New rules:** N10 (reactions, `lint:N10`), N11 (scene connected to Nexi), M12 (pacing), P12 (cel-shaded art), T12 (sprite words are not measured), F10 (frames on landing, content during the line), K9 (builds start at 1e9).
- **N10 on the older films (warn only, so they still build):**
  - lines with no reaction: crm l3 l6 l8 l9; automation l2 l5 l7; enterprise l3 l6 l9; apps l4 l8; accounting l5; brand l4; erp l7; iot l6; network l6; sales l10;
  - most films react without an accent.
  - Fix these when each film is next re-rendered (ROUND2-TODO).
- **MP4 review (frames from the encoded file, not the audit) found one pacing lapse.** The AI-agent demo finished 1.7 s after its line. "Prepared by AI · a person approves" (the key message, and the later quiz answer) was on screen for about 0.7 s before the chatbot demo replaced it. Fix (fix_c.py): the demo starts at line + 0.6 s instead of + 0.9 s, and its steps are tighter (spin 1.1–2.0, fields 1.8 + 0.3·i, chip at 3.1). The chip now shows for about 2 s. **Check the hold of every key chip: the time from its appearance to the next scene swap must be 1.5 s or more** (the chatbot and knowledge source chips: 1.9 s).
- **A parallel session broke the first render's gate.** Another chat ("Nexi social media banners") added `web/assets/channel/*.jpg` during the render. The fingerprint hashes all of `web/assets`, so G4 and G7 failed. The pilot was re-audited and re-rendered (never adopted), the peers were messaged to hold asset writes, and rule G11 was added. The same trap applies to our own packaging: `tf_extract`/`tf_crop` write `web/assets/thumbframes/`, so run them only AFTER `deliver.py copy`.

## 2026-10-04 · Channel art: YouTube banner, Facebook cover, profile picture (stills, `channel/`)
Owner: "create a facebook banner, youtube banner and profile picture where nexi is a main character. also mention in banner about the nexi episode video."
- **Built as a still "film"** in `~/ClaudeWork/nexi-tutorial/channel/`:
  - `channel.py` writes `web/films/channel.js` = the helper half of `films/thumbs.js` (everything above `var EPS`) + `channel/channel_body.js`.
  - Then it builds and renders `film.html?v=channel&fmt=yt|fb|pp|ppl` and grabs `window.PC` at 1.9 s.
  - `--guide` draws the safe zones; `fmt@tag?zoom=&nx=&ny=&pj={json pose}` renders variants for pose tests.
  - `preview.py` builds the crop mock-up; `deliver_channel.py` copies to `00. TechNext Folder/25. Nexi Channel Art` with an md5 check.
- **Placing Nexi on any canvas size:** render her into glcv at (960, gy) with `CAM.zoom` set to the size you need, then `drawImage(glcv)` translated so (960, gy) lands on the target. Render at native size (zoom), not by scaling the bitmap, so she stays sharp. Hand units: about 375 px per unit per 1.0 zoom; `hL` is screen-left.
- **Poses that worked:**
  - `show` (right hand behind the episode-card stack; the cards draw in front, so she "holds" them);
  - `hi` (right hand waving beside her head; profile picture).
  - A hand raised to 2.0 leaves the YouTube band and the profile circle.
- **Profile picture:** draw the ring first, then Nexi clipped to (inner circle ∪ the outer circle below y 700). Her body pops out over the lower ring, as on the staff photos.
- **Episode mention:**
  - the real delivered thumbnails (folder 22) as cards: EP00 in front with a play button;
  - a "NEW EPISODES WEEKLY" pill;
  - on Facebook, "21 EPISODES";
  - on YouTube, the TV-only areas show the whole season as dimmed film strips, with no episode shown twice.
- **MISTAKE: I broke a parallel session's gate.**
  - I first put the art assets in `web/assets/channel/`. `gate.fingerprint()` hashes every file under `web/assets`, so the EP00 pilot audit then running in another chat was stamped with my files in place.
  - Moving them out later broke it a second time. The fix was to restore an identical copy (same names and sizes), which brought back the pilot's fingerprint, and to tell the peer sessions.
  - **Rule H8:** non-film art and its assets never go under `web/assets`; use `web/channel-art/` or similar. If you already wrote there, don't delete it while anyone's audit or render could depend on it: compare `gate.fingerprint(<film>)` with `qa/audit/<film>/meta.json` first. Outcome: the pilot passed and shipped at 20:04. `web/assets/channel` now stays as a FROZEN copy: audits from 19:45 on include it, so never edit or delete it.
- **The 9:16 cover's hook overlapped the EP badge** (v1 too, missed then). The cover reuses the 16:9 hook sizes (MEET 180 / NEXI! 270), and line 1 sits at `y − s2 × 0.98`, so "MEET" rose into the badge. Fix: `EPS.pilot.vtitle` (160/236), read by `genericV` (`c.vtitle || c.title`). The other covers are unchanged. Rule H7.
- **Delivered v2:**
  - Full gate PASS, no waivers: G1–G9; −18.0 LUFS, −2.9 dBTP, voice ratio 7.8x, music 11.2 dB under the voice (4.2 dB in the gaps).
  - 16:9 103.7 MB; 9:16 44.7 MB; new thumbnail and cover (scene card crop 540,50–1700,816, the whole BOOM, the monster and the shop, Nexi left out).
  - Contact sheets rebuilt (`thumbs.sheet('h'|'v')` rebuilds them without re-rendering 26 posts). Posting plan: 3:29.
  - 81 files md5-checked. The v1 files were moved to `22/_superseded 2026-10-04 EP00 v1/`.

## 2026-10-04 · Quick Tips 05-14 (10 new tips) + the Quick Tip thumbnail redesign
- **User ask (verbatim):** "CREATE ANOTHER 10 "QUICK TIPS" ABOUT ODOO. MAKE IT MORE CREATIVE" and "UPDATE ALL QUICKTIPS THUMBNAIL BOTH 16:9 RATIO AND 9:16 RATIO TO MORE DYNAMIC COLOR AND DESIGN."
- **What was made** (45-55 s each, all full-gate PASS; one waiver, QT06: the Filters / Group By dropdown over the list rows for about 5 s, as in real Odoo):
  - QT05 Log note vs Send message: theatre, beret, stage cat.
  - QT06 Group By: sorting office, conductor cap, pigeon.
  - QT07 Export to Excel: magic show, top hat, rabbit.
  - QT08 Import: cooking show, chef, mouse.
  - QT09 Archive: garden time capsule, straw hat, mole.
  - QT10 Optional columns: game show, bow tie, parrot.
  - QT11 Quick create: drive-through, bellhop, seagull.
  - QT12 Drag files into the chatter: basketball, cap, mascot dog.
  - QT13 Switch views: optician, glasses, chameleon.
  - QT14 Alt shortcuts: spy mission, goggles, mouse agent.
- **"More creative" means a story world per tip, not the 3D Odoo window.**
  - Each tip has 3 stations 3000 px apart (the world, the Odoo screen, the payoff) and full-frame painted backgrounds.
  - Each has one costume, a recurring animal or gag, 3 or more hands-on taps, a pause-and-guess quiz and a recap.
  - The Odoo screen is the new 2D kit (`films/inc/tipkit.js`, rule P16): big type the audit can read, tap spots in world px.
  - Facts were checked against the Odoo 17 docs (the keyboard-shortcuts and chatter pages) before writing. The agents left out any dialog wording they were not sure of.
- **Built in a sandbox** (`~/ClaudeWork/nexi-tips2-sandbox`). Another session was rendering EP00 in the main renderer and adding `web/assets/channel`, and assets are in every fingerprint (K10).
  - The lead built QT05 and the kit; then three agents built three tips each in parallel (ports 3987-3989).
  - The lead looked at every final sheet and delivered with `deliver.py copy`, then ported everything back with `patches/p56_port_quick_tips.py`.
  - The skill files were edited by another session at the same time: rule IDs collided (two P12, two K9). Re-read the rule list right before adding rules and take the next free number.
- **Mid-whip pale band** (two agents found it; I missed it in QT05):
  - Station painters are clipped to CX ±1500, but `near()` only drew them within 1700 px of the camera. Between 1700 and 2460 px the frame edge showed the bare default set for about 0.2 s.
  - Fix: `near()` ±2500 (at least 1500 + 960/zoom).
  - Only the FINAL MP4 strip shows it: the audit and blank_scan only see text. QT05 was re-rendered and re-delivered. Rule M13.
- **Clipped product names:** "Standing Desk" rendered as "Standing Desl" in a 160 px column. Measure names against their column (P16).
- **Engine names again:** QT05's first build was refused for `CH` and `ENV` (K1). Check the list before naming.
- **Kit dropdowns and dialogs over list text** park "covered" and "cards" findings (P14):
  - Open them at least 12 px below the control panel.
  - Keep repeat openings under 1.5 s.
  - Dim what is underneath to alpha < 0.5 once the menu is opaque; it reads as Odoo's modal backdrop.
- **Particles near text** (E.star sparks, L.sparks, tkCheer) landed on recap steps and headers. Near text, use rings and faces (E.joy + N.eyePop + L.ring). Sparks on a pressed button land on its label: put a glow ring around the button instead (N9).
- **Held props carry an icon identity, never text** (N13):
  - A "PDF" label on the ball sat over her hand: a nexi-text HIGH.
  - While she holds a long prop, she reacts with faces, squash and shake, not hand-lifting clips (peer, pointL2).
  - A tossed prop that shrinks hides its text while `o.fly` is set.
- **Balloon tails** touched short words ("TAGS!"): put the tail base at the very edge and keep at least 28 px of padding (T13).
- **Re-popping a facet** when its label changes overshoots onto the placeholder. Change the label in place.
- **Radial glows** filled into a rect smaller than 2R leave a hard light edge (P15).
- **A long, thin backdrop strip** (a 3160x180 desk) reads as a text card to the audit. Make backdrop surfaces frame-sized, or put loose glyphs on chips.
- **`line.w()` is a case-insensitive substring search:** `w('H')` matched the h in "changes". Cue on unique phrases (K13).
- **Music levels vary a lot per style:** `city` needed MUSIC_GAIN .31, `space` .43 and `garden` .432 (A5 failed at .34). Run `qa/music_tune.py` right after the first render instead of re-muxing by guesswork (A7). LIMIT barely moves LUFS.
- **Tooling:**
  - `qa/mp4strip.py` used one shared `_tmp` folder, so parallel agents got each other's frames. It now uses `_tmp_<film>`.
  - `L.rrect()` fails on a Path2D (it calls beginPath): build Path2D outlines with arcTo.
  - `python -c "import build_film"` rebuilds every bundle: don't run it.
  - `deliver_series.py --only <ids>` packages just some posts.
- **Thumbnails** (`films/inc/qtthumbs.js`): the Quick Tips got their own look (H1 amended). Each tip has a bold two-tone palette, diagonal energy bands, a sunburst, halftone, confetti kept off the badge and hook, a white rim glow, the ghost number and one big drawn prop from its story.
  - The first 9:16 pass let tall hats (chef, top hat, straw hat) cover the prop. Fixed with Nexi at zoom 1.85 and the prop at y 1050 (H4).
  - A thumbnail must match its finished film: QT06's art showed group counts 3/5/2, while the video shows 6/4/5.
- **Open (logged in ROUND2-TODO):**
  - The `below` end spot's landing big jump crosses the technext.asia pill for about 0.8 s (an engine issue: enterprise, QT06, QT11).
  - tipkit's chatter drop zone is inset 14 px, so the follower count pokes out. QT12 used a film-local zone; fix it in kit v2 and re-audit the tips.
  - Main's new lint rule N10 (a reaction on every line) warns on six tips' station-change lines.
  - Automate M13 (the painter range) in lint. The permission classifier blocked me from reading lint.py this session.

## 2026-10-04 · EP00 pilot v3: new monster, AI lab, bright sets, the robot's combo, orbiting orbs, a proper beam
- **Owner feedback on v2 (verbatim):** "change the monster design and this design" (the AI agents and knowledge scroll panels); "the superpower orb should orbiting around properly"; "the robot should attack and punch the enemy before the superhero will release beam in ending scene. combo attack."; "change the location of dojo, look for different design."; "there will be multiple quick tips just add "+""; "dont use too much dark color other than night view."; "when nexi shooting beams, make sure nexi are shooting properly animation."
- **The source is in parts:**
  - `qa/pilot_v3/assemble.py` builds p1-p4 from the v2 parts plus `w_monster.js`, `w_bright.js`, `s_lab.js` and `s_final.js`, then writes `films/pilot.js`.
  - Fixes go into the parts or `assemble.py` (`fix_v3a.py`), never into pilot.js itself.
- **The monster v3** is a kaiju whose skin is a spreadsheet. It has a hunched pear body with a paper belly, a tail, fat round-capped limbs (`fat()`: ink, shade, then base strokes), claws, pencil horns, sticky-note plates down its back, glowing slit eyes and a hinged jaw.
  - Its states are roar, chomp, flinch (a punch lands), kb (knocked back), up (uppercut) and dizzy (spiral eyes and orbiting stars).
  - The near city row stands in front of it, so it reads as giant.
  - The name box moved to x 1640 so the swinging pencil horns never enter it.
- **Bright sets (rule P13):** only the night city stays dark.
  - The power chamber is a sky temple (marble, god rays).
  - The hangar is a daylight workshop with a window.
  - The idol stage is pastel pink and lilac (bunting, an LED wall of hearts).
  - The cockpit flies through a day sky.
  - The TV studio is sky blue, with a medium-blue screen instead of navy.
  - Elements that were white on dark had to change with the sets: the cockpit holograms (light glass with ink text), the steps arrows (blue), the crystal chips (filled in their colour), the magic circle (blue).
- **The dojo became the AI Lab.** It has daylight windows (the panorama turns to night on "day and night") and a big lab screen. Three mini-Nexi helper bots (`miniBot`: white head, dark visor, an antenna in their colour) act each demo out:
  - the agent bot fetches the PDF from the inbox, scans it, and its sparkles fill the bill;
  - the chatbot bot answers at 11:42 pm with a coffee while the porthole turns to night;
  - the knowledge bot pulls the orange binder, opens it and highlights the line, and a dashed connector runs to the source chip;
  - the approvals card gets an APPROVED stamp from a person.
- **The combo (N11):** the Odoo robot (`fighter()`) rockets in on "Odoo Robot, go!".
  - Left jab POW!, right jab WHAM!, then the super uppercut snaps the monster's head back. Each hit sets off flinch, knockback, a ring and a shake.
  - Then "It's dizzy!", and the robot leaves the frame up and out (M4).
- **Orbs that really orbit:**
  - They ride a tilted ellipse around her waist.
  - The far half is drawn in a back prop (behind Nexi) and the near half in a front prop; size and brightness follow depth, and they leave trails. A dashed orbit ring is split the same way.
  - On "Charging" they spiral into the energy ball (`FIN.merge`).
- **The beam pose:** `N.extra(POSEFN)` drives the hand offsets (prototyped in the test bench `films/beamtest.js`, about 187 px per unit in x).
  - Charge: both hands cupped at her left hip, with an energy ball (glow, crackles, light sucked in).
  - Fire: both palms thrust to screen right at chest height, a muzzle flash at the palms, a wavy three-layer beam with spiral rings, an impact star.
  - Engine helpers call `N.extra(null)`, so the pose is attached only for the charge and the fire, then removed.
- **Still review (7 grids) found:**
  - the knowledge bot sat on the source chip;
  - the mic read as a magnifier (redrawn with a mesh head);
  - UPPERCUT! hid the punch (moved to open sky);
  - the impact star hid "KA" (KA-BOOM! now waits for the beam to fade);
  - the robot was too small (scale 1.0, nudged clear of the shop's Sample chip);
  - the orbs were too small.
- **`render.py shots t1,t2,...`** (one pass, every still saved) plus `qa/_grid.py` is the fast way to review a long film. The events file is only rewritten by `render.py mp4`, so take line times from the probe output, not from `qa/_linetimes.py`.

## 2026-10-04 · EP22 Season 1 finale (new film `finale`, 2:24) + Season 2 preview
- **Owner ask (verbatim):** "Create a seeason 1 ending episode. do a recap in the whole episode. add additional, add snippet of what topic would be in season 2." The Season 2 topic was first "about workplace with odoo crm", then corrected to "about workplace with odoo erp system".
- **The story:**
  - A golden-hour rooftop party; Nexi (bow tie) hosts. Her Season 1 POP-UP BOOK has 9 spreads: the pilot, chapters 1-6 (EP01-04, 05-08, 09-12, 13-15, 16-18, 19-21), the 14 Quick Tips, and a last page with a SEASON 2 door.
  - Each left page shows the chapter's episodes as polaroids. They are the real delivered YouTube thumbnails, copied small into `web/finale/` (P17), and the line highlights each one as it names it.
  - Each right page pops up a paper diorama (`popLayer`): an app city, a warehouse, a CRM funnel with gears, helper bots, a palette, a wifi tower and a fridge, a lightbulb with keycaps, the door.
  - A trivia quiz ("How many databases?"), a comment prompt, and season stats.
  - She dives through the door into a Season 2 trailer at Lotus Mart HQ (sample): Attendances kiosk check-in, Time Off approval, a Projects kanban + timesheet, a Helpdesk ticket solved, Manufacturing (BoM to a desk), each with a COMING IN SEASON 2 tag.
  - Back on the roof at dusk: fireworks, THANK YOU!, the reformed monster in a party hat ("Team Odoo now!"), and the CTA object, a golden SEASON 2 PASS.
- **Built from the pilot's kit:** `qa/finale/assemble.py` copies the story kit (react, glyph, focus, sprites, comic lettering, the kaiju, miniBot) out of qa/pilot_v3, then adds f2 sets, f3 scenes and f4 script.
  - The kaiju gained `KJ.happy`, `KJ.hat` and `KJ.wave` for its cameo.
  - `backdrop` is an engine name (K1). The build refused it; it was renamed `paperBack`.
- **The first audit had 22 HIGH, almost all from page turns.**
  - The sheet's squished new text overlapped the old page's text drawn under it.
  - Clipping does not help: the audit sees every text that is DRAWN. Fixed by drawing only one page's text at a time (rule M14).
  - The dive into the door crossed the book's text, and the white cut covered the new scene's text. Fixed: the book's text fades (`PB.txt`), and the lobby fades in after the flash (M15).
- **The CTA frame measured off-centre**, because the monster cameo is art. A "Team Odoo now!" chip fixed it (P11 again: big art needs a text label).
- **Small catches:**
  - `sfx('clap')` does not exist. Check names in audio_t (`grep '"name"' audio_t.py`).
  - `o_hr_holidays` (Time Off) is not in L.ODOO's preload list. Load it in the film from `assets/odoo/` (no new asset).
  - The first 16:9 thumbnail used the fallback design (EPS.myth) even though `EPS.finale` was in the bundle. A re-run fixed it, so the first page load in a fresh Chrome profile can be stale. LOOK at every thumbnail before packaging.
  - The 9:16 follow pill had to learn about EP22: EP21 now says "FOLLOW FOR EP 22" and the finale says "FOLLOW FOR SEASON 2" (`CFG.ep < 22`). EP21's short was rebuilt.
- **Gate:** full PASS, no waivers. -17.8 LUFS, -3.1 dBTP, ratio 4.3x, music 10.8 dB under the voice (4.0 in the gaps: the floor, not below it).
- **Registered as p57:** render NAMES/LIMIT, deliver SRC + EPISODES (EP22), audio_t gameshow at 0.34. Also EPS.finale in thumbs.js, PICK/CROP for the scene card, and the posting plan.

## 2026-10-04 · Season 2 "The Human Side of Odoo", Arc 1 "The Fear" (S2 EP01-EP04, a new series with a recurring cast)
- **User ask (verbatim):** "create nexi video season 2 content" (a screenshot of the Arc 1 table from the planning session "Odoo system problems for season 2": EP01 Will Odoo Take My Job? / loss aversion / split screen; EP02 Too Old for Odoo? / fixed mindset / mobile banking, Grab, video calls; EP03 Scared to Click the Wrong Button? / psychological safety / flight simulator; EP04 Is Odoo Watching Me? / fear of being watched / a plane's black box).
- **The format** (`qa/s2/S2-FORMAT.md` in the S2 sandbox): hook (the person's fear in their own words, a balloon) -> THE PSYCH FILE card names the psychology -> the everyday analogy in its own painted world -> the fix in Odoo (tipkit screen) and in the company, with the quiz -> the takeaway banner + "Follow for EP nn" -> the Odoo end card. 55-62 s, 11-12 lines.
- **The cast is a shared include** (`web/films/inc/s2kit.js`, frozen while episodes are in flight): Maria (Accounts), Ben (Warehouse, 58), Jun (Sales), Mr. Lim (the Boss) at Bluebay Trading (a sample company). 2D cel-shaded chibi people, 480 px tall, two-bone IK arms (the elbow picks the outward-then-down solution; the first version folded arms across the face), event-sourced acting (`s2Pose/s2Mood/s2Talk/s2Hop/s2Shiver/s2Walk` push timed events, so any seek is right), and an office ID card as each person's label (P11). Prototype a cast on a bench film (`films/s2cast.js` + `render.py shots`) before any episode uses it.
- **Built in a sandbox** (`~/ClaudeWork/nexi-s2-sandbox`) while the EP00 session rendered in the main renderer: the lead wrote the kit + EP01, then three agents built EP02-EP04 in parallel on their own port pairs. All four passed the full gate with no waivers (EP01 57 s, EP02 59 s, EP03 61 s, EP04 58 s). Delivered to a new folder, `20. NEXI Explains/02. Season 2/S2 EPnn - <title>/` (one folder per post), by `deliver.py copy` + `vertical.py` + `deliver_s2.py` (9:16 short, thumbnail, cover, md5, the season's posting plan and contact sheets).
- **Checker false positive fixed (p58, rule G12):** the build linted the film with its includes pasted in, but gate G2 linted the RAW film, so EP01 (whose "sample company" sign and "Sample data" chip come from the kits) built clean and then failed C3 in the gate. `lint.lint()` now expands includes exactly as `build_film.py` does.
- **The outro's pan home crosses every station (rule M16).** `outroSeq` whips the camera back to the start, so EP01's finished psych card flashed by mid-pan in the final MP4 (the audit and the 12-frame sheet missed it; only `qa/mp4strip.py` across the outro showed it). Each station's cards and actors are cleared once the camera has left them.
- **Take-off past a sign:** two straight-up waypoints were not enough when the sign stood 200 px to the side the spring pulls toward (the next station). Put `via` on the far side of the sign (EP01: x 420 instead of 560).
- **tipkit only at zoom >= 1 (rule P19):** its URL bar and "Sample data" chip are 18 px, under the 17.5 px floor below zoom 0.98 (a parked "small" for the whole station).
- **Beams across a window (rule N14):** `tkBeam`'s arc rises 80 px above the higher end, so a tap from beside a window draws a line over its navbar. Aim at the edge of a cell beside the label, or let the person click with their own cursor; Nexi beams to props beside her.
- **Truth in UI states:** in Odoo 17, Confirm on a quotation is the primary (purple) button only once it is "Quotation Sent"; in draft it is grey and "Send by Email" is primary. A line that says "one big purple button" needs the screen in the sent state.
- **The audit reads any plain fill under text as that text's card:** a window band's sky rect, a full-width wainscot, a phone header rect overlapping the content card. Keep texts wholly on or off such rects, and draw backdrops as Path2D (the audit only measures real UI).
- **Pacing a demo:** two app demos in one 3 s line left each result on screen under 0.5 s. Cue the second demo on the line's last word and hold 1.1 s, so each key result stays about 1 s (the M12 / EP00 rule: a key result holds >= 1.5 s before the next whip).
- **Parallel agents in one renderer overwrote each other's stills** (`render.py shots` wrote the shared `qa/f-<t>.jpg`; one agent deleted another's). Rule K14 + p62: `NT_SHOTS=<film>` writes to `qa/<film>/` and `qa/_grid.py` reads it.
- **Audio:** EP01's effects packed the gaps (voice ratio 3.1x): `FX_FILM` s2e01 .35 gave 3.9x (re-mux only). EP02-EP04 passed at their registered MUSIC_GAIN.
- **Thumbnails (p60):** `thumbs.py` labels S2 films "S2E nn" (`deliver.S2`), passes `&s2=1`; the badge reads NEXI EXPLAINS S2 with a coral number panel; the episode's person is drawn big between the hook and Nexi (s2kit pasted at the TOP of thumbs.js so thumbs' own `glyph`/`hsh` win), plus one drawn prop from the episode. The person sits right of the hook (x ~1150) or the yellow line covers their face; Nexi at x 1665, zoom 1.95 keeps her face in frame.
- **Tooling:** the Bash tool halved the backslashes of a heredoc patch TWICE in this job (an escaped quote lost its backslash and the assertion failed; later a `"\n"` became a real newline inside a Python string). K7 is not optional: anything with a backslash goes in a file written with Write, or through the Edit tool.
- **2026-10-05 fix (owner: "quick fix. fix the id nexi's wearing"):**
  - The lanyard was anchored at `lerp(headPx, botPx, 0.62)`, which lands on her visor, so the straps ran down across her face.
  - The kiosk scan flew a second badge while hers stayed on.
  - The card was a plain rectangle.
  - Fix (`qa/finale/fix_f2.py`): the straps start at the neck (`N.botPx()` ± 50 px · scale), with a metal clip and a real ID card (branded header, mini-Nexi photo, info bars, barcode; no text: N13). The kiosk reads HER badge with a dashed scan beam and a running light, and the badge glows. Rule N15.
  - Spot these by cropping close-ups of Nexi from the final MP4 (`ffmpeg -vf crop=420:620:220:200`): at full frame the strap-over-face read as fine.

## 2026-10-04 · Quick Tips 15-24 (Season 2)
- **User asks (verbatim):**
  - "add more quick tips. make it more creative. 10 more tips."
  - Then: "the comical style are for intro. continue similar to the style of previous quick tips videos."
  - Then: "the new quick tips will cover the season 2" and "all season 2 quick tips folder will be moved in G:\Shared drives\Marketing\00. TechNext Folder\20. NEXI Explains/02. Season 2".
- **What was made** (53-58 s each, full gate PASS, no waivers; in folder 26, one folder per tip with the 16:9, the 9:16 short, the thumbnail and the cover):
  - QT15 Duplicate (clone lab, goggles, Dolly the sheep).
  - QT16 Breadcrumbs (storybook forest, beanie, crow).
  - QT17 Custom filter (gold rush, hard hat, Nugget the donkey).
  - QT18 Search one field (pirate map, straw hat, Pinchy the crab).
  - QT19 Follow a record (fan club, heart boppers, glow stick).
  - QT20 Kanban drag (garden chess, knight, the pawn).
  - QT21 Send by email (rocket launch, astro, alien).
  - QT22 Smart buttons (airport gates, pilot, runaway suitcase).
  - QT23 Calendar drag (time machine, top hat, cuckoo).
  - QT24 Autosave (racing checkpoints, helmet, turtle).
- **Built by five agents in a fresh sandbox** (`~/ClaudeWork/nexi-tips3-sandbox`, copied from main at 22:01, ports 3986-3991). The lead looked at every final sheet and delivered. Ported back with `patches/p58_port_tips15_24.py`.
- **Style correction:** my first briefs carried the EP00 pilot's comic-book look into the tips (narration boxes, sound-word bursts, cel shading, a react() glyph kit). The owner stopped it: that style is for the intro. Tips keep the QT05-14 look; "more creative" means a more inventive world and gags (rule P16, memory `feedback_quick_tip_style`).
- **Season 2 numbering:** asked once, while the agents were still building, because the number is in the video (the intro badge). Choice: keep 15-24, mark them Season 2 ("S2 · TIP #N" badge; "QUICK TIP · S2" strip + a SEASON 2 pill on the thumbnail), folder 26.
- **Another session's packager "superseded" our posts.** At 23:02 a full `deliver_series.py` run in main (whose TIPS stopped at 14) moved the QT15-18 masters to `22/_superseded 2026-10-04 2302`. They were found intact, moved into folder 26 and md5-checked.
  - Fix: `deliver_series.py` now moves stale files only inside the folders it packages, and a full run packages only the posts whose master is in folder 22.
  - New options: `--dest` and `--no-top`.
  - `thumbs.sheet()` puts only folder-22 posts on folder 22's sheet.
  - Rule: port the same day.
- **A port collision:** another session's script took CDP 9387 mid-audit ("the JSON object must be str ... not dict"). Check the port pair before every Chrome job; use a private fallback pair.
- **The session ended mid-run:** three agents stopped.
  - Recovery: read `qa/gate/<film>.json` (stage and ok) and compare the MP4's time with the bundle's.
  - tip20's MP4 was older than its last build, so it was re-rendered.
  - tip19 had only G9 missing: `deliver.py sheet`.
- **From the agents:**
  - **Register order:** register a recurring character's prop after the station props (register order = draw order).
  - **Characters that must be in place when the camera lands:** teleport them mid-whip, about 40% in, while their station is off-frame.
  - **Framed signs:** a glow drawn behind a framed sign is hidden by the frame. Ring it from outside and add a sticker.
  - **Decor under a later layer** (a mushroom under the trail) only shows in the full-resolution CTA frame. Move it clear.
  - **Lint N10** binds only cues that start with the line variable.
  - **Grey out with colour, not alpha.**
  - **A prop's tractor beam** sags below the prop and switches off while a reaction raises her hand.
  - **The sticker above the Odoo window** fades at the station-change line's t0, so the flyOver never crosses it.
  - **Sample copies out in the world** carry their own "Sample" label.
  - **Music:** alpine needed .299 and city .285 (tip24); machine, rail, castle, web, butler, jet, lobby and studio passed at .34.
- **Thumbnails** (`qtthumbs.js` QT15-24): each matches its finished film (S00043 not S00058; the trail Quotations > S00051 > Lotus Mart; the meeting at 14:00), and the Season 2 mark appears on the strip and the pill.

## 2026-10-05 · S2 EP00 "Season 2 Introduction" (3:01) + the MEGA Season 2 thumbnails
- **The brief:** *"create a season 2 introduction, general discussion about this topic that will be mentioned. more on training, how to adapt new system, continious improvement, psychology, additional oddo module. make atlase 2-5 minutes fruitful discussion. add disclaimer it before starting it might triggering to someone."* Built as `s2e00`: a content note card first (real worries at work; pause, take a break, talk to someone you trust; general information, not professional advice; fictional samples), then the Bluebay office + THE PSYCH FILE format, three discussion stops (gym = forgetting curve + training plan + a champion per team; road = change curve + phased go-live + Excel switch-off date + the boss goes first; garden = continuous improvement + monthly "what slows us down?" + the quiz), a 20-tile wall of the season's extra Odoo apps (Barcode and Attendances drawn: no svg), the six-arc map, the takeaway. Registered as `deliver.S2_INTRO` (p71), so S2 EPnn numbering is untouched; `thumbs.S2N` gives it S2E00.
- **Audit round 1 (7 HIGH):** Nexi in front of the banner and the takeaway while she flew in (pop them after she lands, M17); the forgetting-curve card and the plan card cross-faded over each other (fade one out first); Jun's balloon sat on the BETTER! sign (T14); the OUT NOW chip covered the Arc 1 header band. Round 2: one off-centre resting group (the garden with Nexi at the third pot, 210 px right): shift the whole station left. Round 3: PASS, 0 high, no waivers.
- **The tow beam (N12/N17):** first version was a thin bezier from her hand: not an action. Rebuilt with the pilot's charge/fire pose (`TOWPOSE` = `POSEFN`), an energy ball, muzzle flash, recoil squash, impact star, then a tractor ring hauling the van. The beam first crossed Jun's face (move the person off the beam's path, not the beam), then the charge ball stayed stuck (overlapping tweens, N17).
- **Owner, mid-job:** *"make more the thumbnail overly exagerated design, reaction and super dynamic elements design."* -> H9, the MEGA kit in `s2thumbs.js`, applied to S2 EP00-EP04 (16:9 + 9:16) so the season keeps one look. Gotchas: `website_slides` (and hr_holidays, approvals, hr_expense) are not preloaded in the thumbs film either (blank white tile) -> `L.load` in the kit; a sparkle landed on Nexi's eye; the first mega pose threw her hands to the top centre and, on the cover, onto Mr. Lim's eye (separate `megaV` for covers); a red scan cone over the yellow burst was invisible until opaque + outlined.
- **Tooling:** a CDP profile that died mid-run keeps failing (`ConnectionResetError`, "Inspected target navigated or closed") -> use a fresh `CDP_PROFILE` name and render thumbnails one id at a time with a retry. A render killed by a session pause leaves a log that just stops (exit 4): re-check `gate.py --pre` and re-render.
- **Packaging rollback (caught, fixed):** `deliver_s2.py` copies by md5 only, so it put my stale local EP04 short (23:47) over the peer session's newer re-delivery (00:38; EP04 had been re-rendered elsewhere with the new "Follow for EP05: Will Odoo fix our mess?" card). Restored from `_superseded` (md5-verified), synced `out/vertical` from Drive, and `put()` now KEEPS a Drive file that is newer than the local source (G14). Check a Drive master's date against `out/` before re-packaging another session's posts.


## 2026-10-05 · Owner review of S2 EP00 v1 (3:01) and the MEGA thumbnails
- *"fix this 1st image part. arrange and design properly."* The content note card was left-aligned lines in the left half of a wide card with a lonely heart badge: a text dump. -> P22.
- *"do proper watering on the plants."* The can floated beside the pot while drops fell from her hand: no tilt, no stream, no splash. -> N18.
- *"in third image, fix the design. make it interactive and properly design. dont settle in this kind of presentation. make it over the top."* The season map was six cards on a dashed line with a pin. -> P23.
- *"the only model have darker highlight are the persons/character and some elements card, do not include the background. we do have format on background for not using too much black shade."* The road had an 82 px ink outline; trees, pots, the gym rack, sign posts and `s2Plant` pots all carried the `cel()` ink line. -> P21.
- *"maximum video content should 2 mins and 58 sec, properly reduce."* -> G15, checked by `gate.py`.
- *"make sure the season 2 thumbnail are not templated with each other specially background. play more on position of characters in the thumbnail. each thumbnail should be unique with each other background design. follow the format color for episode similar to season 1."* then *"dont change the season 1, im talking to season 2. dont create yet a thumbnail. just update the skills."* The MEGA set reused one burst + wedges layout and the same cast-centre / Nexi-right placement on all five posts. -> H9 rewritten; no thumbnails until the owner asks; Season 1 untouched.

- **S2 EP00 v2 build (same day):** the designed note card (P22), `waterPot()` (N18: carry, tilt 0.85 rad, a quadratic stream from the spout tip to the soil with flowing dashes, splash drops, a ripple, `GDN.wet` darkens the soil, the plant grows 0.45 s into the pour), and the SEASON 2 PARK (P23): a coaster cart drawn at `N.botPx() + 120*s` (it covers her lower body, so she sits in it), the track at the wheel line, six landmarks x1.25 popping out of the ground (popK + dust + fireworks behind the banners + confetti), the camera tweened along (`L.tween(CAM, { x, zoom })`) and a final zoom .8 so all six banners read at >= 19 px. A station wider than 3000 px: give it its own `tkClip` half-width, widen its `near()` window and move the next station's CX.
- **Banners near the HUD:** while the camera sat on arcs 4-6, the Arc 2 banner slid under the "Season map" chip. Hide the banners that would sit at screen x < 300 and bring them back on the pull-back.
- **Stale stills:** a whole shots run showed the previous build (cached bundle) -> K15 fix in `render.py`.
- **Glyph left behind:** the opening `react('joy')` fired while she was still arriving: its star stayed on the card -> N19.

## 2026-10-05 · Quick Tips 25-34 (Season 2, 90 s+, cute + environment kits, v2 thumbnails)
- **Owner asks (verbatim):**
  - "add 10 additional quick tips, make more creative. at lease 1 minutes 30 sec."
  - "improve nexi animation and cuteness overload."
  - "improve designing the envirolment."
  - "make more the thumbnail overly exagerated design, reaction and super dynamic elements design."
- **What was made** (93-101 s each, 19-21 lines, full gate PASS, no waivers; folder 26, one folder per tip):
  - QT25 AND/OR filters: a 1950s ice-cream parlour, Waffle the puppy.
  - QT26 Compare periods: Grandma's photo album, Mochi the cat.
  - QT27 Pivot: an origami studio, Kami the paper crane.
  - QT28 Chart types: a fashion runway, Coco the poodle.
  - QT29 Sort and resize: penguin photo day, Pip the penguin.
  - QT30 Select all: a fishing pier and a hungry seal.
  - QT31 Alt+Shift+T to-do: a magic show and a shy genie.
  - QT32 Reactions: the thank-you bakery and a mouse.
  - QT33 Kanban quick add: a toy-brick workshop, Windy the wind-up robot.
  - QT34 Notifications: an air-mail post office, Pip the sleepy pigeon.
- **New kits** (no engine edits): `films/inc/cutekit.js` (16 `react()` beats via `N.addClip`, an always-on idle sway, `cuteHold`) and `films/inc/envkit.js` (sky, sun, clouds, parallax hills/trees/skyline, textured ground and walls, windows, rays, tufts, bunting, motes, bokeh, contact shadow, vignette). Tested first on a throwaway film (`ckdemo.js`, sandbox only).
- **Built by five agents** in `~/ClaudeWork/nexi-tips4-sandbox` (copied from main at 00:24), ports 3986-3991 + private fallbacks. Registered with `patches/p59`, ported with `patches/p60` (reads each film's tuned LIMIT and MUSIC_GAIN from the sandbox).
- **Interruptions:** a usage limit stopped the lead and all five agents twice. SendMessage resumed each one with its context intact. The lead gave the exact state from `qa/gate/<film>.json` and the MP4 vs build times (rule K).
- **Thumbnails, two rounds:**
  - Round 1 (v2): bigger tilted Nexi with extreme faces, explosion bursts, rings, speed lines, debris, red call-out rings, a 3D hook.
  - Round 2: the Season 2 session had added H9 for the same owner request ("not templated ... each thumbnail should be unique"), so every tip got its own background, its own shape behind Nexi and its own placement (`QTXV`). QT29/30, already packaged, were re-packaged (the old files went to `_superseded`).
- **Thumbnail gotchas:**
  - `N.headPx()` is the neck pivot: the face centre sits about 0.26 r above it (r = U * 0.33 * N.scale * zoom).
  - Marks on the left of her head land on the prop: keep them on the free sides.
  - Tall hats hid the prop on covers: draw the prop in front.
  - A thumbs.py run on a busy CDP port printed nothing and left old files.
- **From the agents:**
  - Cue `react()` at `lN.t0`; a `tkTap`/`N.play` replaces the running clip.
  - `envNexiShadow` uses world coordinates.
  - Climb straight up before leaving an Odoo screen.
  - Push-ins at k > 0 need world x.
  - Path2D art is invisible to the audit, while `fillRect` strips and `envWindow` fills count as cards (cut window holes with evenodd).
  - Tooltips must sit fully in the gap above the table.
  - A dialog's text must not draw while its back-ease is <= 0.
  - Glow rings on small buttons: pad 2-3.
  - `tkMenu` stays opaque until k < 0.33: start a dialog 0.24 s after the menu closes.
  - Odoo's kanban quick-create form stays open after Add: size the column for form + card.
  - Count axes need integer steps.
  - A white character on a white floor vanishes: outline + tint.
  - Wide reactions (twirl, oops) need x >= 360 from the edge.
  - `envTrees`/`envSkyline` wrap with a modulo and jump in whips (hidden by motion blur; fix in kit v2).
- **Loudness:** six films sat exactly on -18.0 LUFS at LIMIT 0.68; two used 0.70 for margin (rule A).

## 2026-10-05 · Season 2 Arc 2 + Arc 3 (S2 EP05-EP13, the 2-3 minute discussion episodes)
- **User ask (verbatim):** screenshots of Arc 2 "The Boss's Beliefs (before buying)" (EP05 Will Odoo Fix Our Mess? / EP06 Odoo Is Free... Right? / EP07 Can Odoo Work Exactly Like Our Old Way? / EP08 IT Will Handle It?) and Arc 3 "Winning and Serving Customers (app episodes)" (EP09 Nobody Opens Your Emails? / EP10 Customers Ask "How Much?" in Chat? / EP11 Long Queue at the Counter? / EP12 Print, Sign, Scan, Email? / EP13 Customer Asked 3 Times?) + "* make more creative, atleast 2-3 minutes. make the discussion more deep and helpful. make more adorable discussion."
- **Then, mid-job, owner rules P21-P23 / N18 / G15 / H9** (from the EP00 review): no ink on scenery, designed text cards, over-the-top overviews, real prop actions (watering pours), S2 max 2:58, no S2 thumbnails until asked. Nine finished first drafts were reworked: brief the agents with a one-page rules delta (`qa/s2/RULES-UPDATE-2026-10-05.md`), not the whole rulebook again.
- **The long format** (`qa/s2/S2-FORMAT-v2.md`, scripts `qa/s2/ARC23-SCRIPTS.md`): 28-33 lines, 5-7 stations, the cast TALKS (not only Nexi): hook -> Psych File -> the analogy world -> 2-3 fix stations in Odoo -> pro tip -> pause-and-guess -> checklist -> takeaway + follow. 2:13-2:28 delivered.
- **The talk kit** `web/films/inc/s2talk.js` (film-level wrappers, no engine edit): `say(text, {who: A})` puts the speaker's face, name (cast colour) and role in the caption, moves their mouth and writes `who` on the voice event; audio_t `CAST_VOICE` (p81) voices each person in their own pitch/waveform. `s2Checklist`, `s2ProTip` are designed cards (P22).
- **Soft scenery (P21) is a kit function:** `celS()` in s2kit (p82) = cel without the navy ink, a thin stroke in the shape's own darker tint; `s2Office/s2Plant/s2Clock` use it.
- **A1 failed on EVERY long film at -18.1..-18.3 LUFS (floor -18.0)**, and each of 9 agents started its own fix (louder effects, music shifts, a film-level sfx wrapper that changed EP08's bundle and would have forced a re-audit + re-render). Cause, measured once: the cast-voice mixes are -23.3 LUFS with -1.0 dBFS peaks (22 dB peak-to-loudness), so loudnorm I=-16 TP=-2 tops out at -18.0 whatever LIMIT is (0.68-0.80 all gave -18.0). Fix: `render.LOUD` per-film loudnorm target (default -16), -15 for s2e05-13 -> -17.6..-17.8 LUFS, re-mux only (`qa/s2/loud_all.py` probes chains on the rebuilt wav; `qa/s2/remux_all.py` re-muxes + sheet + full gate).
- **A2 on EP13:** one true peak (-1.7 dBTP) from a 10-tick clock roll (ticks every 0.07 s) overshooting in AAC; every other peak was -2.7. Lowering LIMIT did not help (AAC overshoot is not monotonic in LIMIT); `FX_FILM` s2e13 .4 (from .5) gave -2.6 (`qa/s2/fx_probe.py`).
- **Stopping agents mid-render kills their render** (EP09 died at frame 1800/4090) and can leave a half-finished experiment in a film (EP08) or a wiped audit stamp: after a stop, diff each film against its render stamp (`gate.fingerprint` vs `out/<name>.build.json`) and restore from the agent's transcript (its Edit calls) if needed.
- **A sandbox `deliver.py` without main's `S2_INTRO` drops the EP00 opener from the posting plan** (deliver_s2 only plans what deliver knows). Keep the sandbox registry a superset of main's.
- **Cost:** 9 parallel Opus agents at ~500-600k tokens each + 2 session restarts + a mid-job rules change. Next time: Sonnet agents, 3 at a time, one-page briefs, and the lead fixes any failure that 2+ agents share.
- **Porting:** p80 registry (= sandbox p76), p81 cast voices (p77), p82 soft scenery (p78), p83 LOUD + per-film audio + G15 for per-arc groups + files. Main's bundles differ from the sandbox's only by tipkit's drop-zone inset (another session's kit v2), so sandbox renders stay valid deliveries; a re-render from main needs its own audit.

- **S2 EP09 resumed (2026-10-05):** re-audited in main (the sandbox audit does not count there), rendered, full gate PASS on the first try. The 9:16 frame title for EP05-13 exists only in the sandbox's `inc/s2thumbs.js` (`s2tEp` block): main would fall back to EPS.myth's hook. Render the frame in the sandbox and copy it, or port the block first.

## 2026-10-05 · Holiday specials (Halloween / Christmas / Year-End), standalone, folder 27
- Owner: "create 3 new video holiday special ... maximum of 2:58 ... story telling, employees secondary ... cinematic and interactive"; "background and elemnt similar to quick tips style" (P26); "dont register it as S2 ... holiday special ... while the season 1 are running"; "season 1 topic ... some season 2 context ... snippet"; "holiday special thumbnail, no numbering ... dynamic, different" (H11).
- Registry p85: deliver.HOLIDAY, folder "20. NEXI Explains/03. Holiday Specials", GROUP 'HOLIDAY' (G15 cap extended), thumbs label HS0n, `deliver_holiday.py` (plan with air dates). Built by 3 parallel agents on the lead's brief `qa/s2/HOLIDAY-SPECIALS.md`; first drafts reviewed from 12-still grids, notes sent mid-build (Nexi parked in one spot, cards carrying the scene, fireworks too small, crowded finale rows).
- Shared kit `inc/s2cute.js` (cutekit beats + s2kit kinds in one react dispatcher; `cuteIdleBack()` after anything that clears the pose slot).
- **Blank ID cards** (P27) in two of three finales. **Audio:** `qa/audio_try.py` predicted A3 3.8x but the AAC mux measured 3.4x; re-mux by extracting the video stream (`ffmpeg -i X.mp4 -an -c:v copy X.v.mp4`, then `mux.py <film>`) since render.py does not keep the .v.mp4. A chained `ls && python` edit silently skipped the edit when ls failed: check every registry edit printed its confirmation.
- **Year-End countdown fix (owner: "the firewords and numbering fade away faster. add more multiple firewords and make the numbe sta mych longer until the scene finish,. it leave too much space."):** a headline number or burst that explains a scene HOLDS until the scene ends (fade on the scene change, e.g. inside `cardOut()`), and a celebration keeps going: a first volley of 4 plus 2 more every 0.6 s, placed on a grid of sky spots that clears the number, icon, chip, card and Nexi, drawn BEHIND the number. A3 stayed 3.7x with the extra pops at 0.1.
- **Then (owner): "dont highlight the numbering too much, highlight the content that nexi explaining."** A countdown number is a short firework moment (0.8 s), then it shrinks to half size and half opacity BEFORE the lesson card arrives (time-based from the burst, not from the card, or the card lands on the full-size number); its icon, time chip and halo fade; the firework volley calms (1 per 1.1 s, 55% alpha). The card is the hero: 1.15x, lifted into the freed space, a soft glow behind it.


## 2026-10-06: Season 2 goes FLAT (F3 pill model), EP01 test run (`s2e01f`, p87)
- Owner asked for flatter cast designs "that will be good in a backround that we currently have"; four flat samples were shown standing in an envkit set (`qa/cast-design/flat-sheets.html`, F1 rounded / F2 geometric / F3 pill / F4 editorial). Owner: **"use f3 model for the character. change the character in episode 1 season 2. do a test run. also update some background and mode, should be flat, not comical style with darker shade and lining."**
- New kit `films/inc/s2flat.js` REPLACES s2kit's drawing functions by later function declarations in the same scope (s2kit stays frozen, K11; delivered films keep their fingerprint). The F3 body keeps s2kit's actor units and S2POSE hand targets: head (0,-392) rx 92 ry 88, pill torso -314..-108 (172 wide), shoulders (+-76,-258), IK 80/76, ID card -190..-124. `s2Hand` is overridden to the new shoulders.
- Test film = a COPY (`films/s2e01f.js`, made by `patches/p87_s2_flat_test.py` from `s2e01.js`), registered in its own group `S2-TEST` with a `_tests` DST, so the delivered EP01 is untouched. The render.py registry line must sit AFTER `NAMES` is defined (same NameError as p86: anchor on the s2e00 NAMES line).
- **First audit: 9 HIGH + off-centre.** envkit's window, cloud and bokeh fills and every `fillRect` (counter strip, vest stripes, the card's colour strip, the side-shade rect) were recorded as cards behind the balloon, the ID cards, the psych file and the board. Fix: the whole flat set and every body detail drawn as Path2D (`s2fR()` rect helper, Path2D re-implementations of the envkit windows/clouds/bokeh/floor/shadow). Rule P28.
- **Off-centre 10.8-13.8 s:** once Ben and Jun walked off-frame, Maria + the sign made a block 286 px left of centre. Staging fix (not a waiver): they back away along the counter, watching Maria, and fade (0.35 s) as the psych file pops.
- Result: gate PASS (A1 -17.9 LUFS, A3 3.9x), 57.4 s, out/Nexi-S2E01-FLAT-TEST-16x9.mp4, sent for review. Next if approved: add the two include lines to every S2 film, re-run audits, re-render, supersede the delivered copies.


## 2026-10-06: Season 2 EP00-EP04 rolled out FLAT (p88)
- Owner: **"quick fix the design background and model, use the new updated test design models and background season 2 intro on s2ep 1,2,3,4."** + **"also update the main video season 2"**: the delivered EP00-04 (not test copies) take the F3 cast and the flat sets.
- `patches/p88_s2_flat_rollout.py`: envkit + s2flat after s2kit; a regex drops the ink layer of every double stroke (ink under a colour; the colour gets the mean width); outlines round filled shapes dropped; strokes that ARE the object (handles, cords, legs, rays) recoloured; face lines kept; EP00's `soft()` made flat; EP01 takes p87's edits. Backups in qa/s2/flat-p88/.
- **Silent failure:** the first p88 wrote `/*@include s2flat*/   /* comment */` on one line. build_film's include regex needs the line ALONE, so the kit was never pasted in, every film built clean, and five audits measured the OLD look (caught only by looking at a full-res still). Fix: build_film.py now refuses any `/*@include name*/` left unexpanded in the body (proved with a throwaway film). Rule K19.
- The Thinking pose (`chin`) folded the F3 free arm into a stick: s2flat overrides `S2POSE.chin` (free hand on the hip).

## 2026-10-06 · Channel art: profile picture gets the TechNext logo
Owner: "change the profile picture, add technext logo"
- The logo follows the staff profile-photo generator (`TechNext Branding Miscellaneous/profile-photo/generator.js`):
  - 48% of the frame wide, centred, top edge 17% down;
  - inside the same #5579D1→#75A1F4 ring.
  - White logo on the deep blue version; blue logo with a soft white halo on the light version.
- Nexi moved down and got slightly smaller (zoom 2.3 → 2.15, origin y 850 → 880), so the logo has room above her head. The waving hand is still inside the ring.
- Small-size check (`_pp_small.png`): "TechNext" reads at 98 px, YouTube's avatar size. At 40 px (comments) only the shapes read, same as the staff photos.
- The old files moved to `_superseded 2026-10-06 (profile without logo)/` in folder 25; nothing was deleted. Rule H8 now asks for the logo on profile pictures.

## 2026-10-06 · Channel art: LinkedIn page cover + page logo
Owner: "give me linkedin page profile and bannre"
- **Specs (LinkedIn help answer 70781):** page logo 400x400 (minimum 268), cover 1512x256, PNG or JPEG, 3 MB maximum. LinkedIn suggests JPEG.
  - It may trim the cover's edges, worst at the lower right.
  - The page logo sits over the cover's bottom-left.
- **New formats** in `channel_body.js`:
  - `li`: 3024x512, 2x of 1512x256. Exports at 1x JPG/PNG and 2x JPG.
  - `lis`: 1080 square, exported at 400.
  - The upload exports now live in `deliver_channel.py exports()`, so a rebuild reproduces them.
- **LinkedIn logos are SQUARE, not circles.** The circular profile clips Nexi's body to the outer ring, which shows as an arc above the bottom edge in a square. `lis` (`A.square`) clips the body to the bottom edge instead.
- **Poses `hiT` / `showT`:** the resting left hand is tucked behind her body (hLx .45, hLy .1, hLz -.5). Use them wherever the frame is short or square and the hand would otherwise peek in at the bottom.
- **The 6:1 cover reuses the YouTube band layout:** title left, Nexi in the centre (zoom 1.35, head about 375 px), the EP00/06/15 fan plus the pill on the right, and dimmed episode cards at the edges, which are where the logo and the trimming land.

## 2026-10-06 · LinkedIn page logo: no circle
Owner: "dont do circle in linkedin profile"
- The square LinkedIn logo (`lis`, `A.square`) now has NO ring and no circular clip. The ring belongs only to the circle-cropped profile pictures (YouTube, Facebook).
- Without a ring to fit inside, the logo grows to 56% wide with its top edge 10% down (`A.logo = [0.56, 0.1]`). Nexi grows to zoom 2.35, origin y 930. Of three tested layouts, this one is balanced: the waving hand keeps a margin from the right edge.
- The ringed version moved to `_superseded 2026-10-06 (LinkedIn logo with ring)/` in folder 25.


## 2026-10-06: the soft voice + the flat look on all of Season 2, its Quick Tips and the holiday specials (p89, p90)
- Voice tests went: soft -> softer -> emotional legato -> six cute timbres -> soft variations; the owner chose the ORIGINAL SOFT beeps, then "a bit lower", then my recommendation (Nexi 4 dB lower vs the music) with the background untouched. loudnorm holds the integrated loudness, so lowering the voice RAISES the music: for 'background unchanged' drop loudnorm and apply one fixed gain matched to the background between the lines (p89 `master_af`).
- A1/A4/A5 windows had to move for a quieter voice (owner-approved). A3 (presence-band ratio) then failed on 12 of 37 films because effects are as bright as the soft voice in 1.8-4.2 kHz; the owner's "s2ep0 voice for all" settled it: A3 >= 1.5x for soft films. `predict_audio.py` measured all 37 before rendering and matched the real gates exactly.
- Main had no audit/render of the S2 Quick Tips (built and gated in sandboxes): an audio-only re-mux could not pass G4/G7, so all 20 were audited + rendered in main (events copied from the sandboxes). `qa/voice_soft/runq.py` runs audits/renders 6 at a time, then layout_audit + pre-gate / sheet + full gate.
- p90 ink classifier (`qa/s2/ink_scan.py`): double strokes -> colour only; outlines of a shape the same line fills -> dropped; named object strokes (handles, cords, legs, flaps) -> recoloured; face lines kept; one-offs by hand. s2flat's office reads `CX`: two films keep their stations in STO/BASE -> `var CX = [960]`. EP06: Nexi moved into the checklist's place (offcentre fix), then back before the follow sticker (nexi-text fix).
- Tooling gotchas: `import mux` RUNS mux.py (no main guard) and re-mixed the S1 Walkthrough's audio by default (the mux failed on a missing .v.mp4, master untouched): never import mux. A Bash heredoc halved backslash escapes into a BACKSPACE and a real NEWLINE inside Python strings, twice: write code files with the Write tool only.
- Odoo 20 was released 2026-09-24 (owner: "make sure we are already using odoo 20"): rule C7; the 37 films' Odoo facts re-verified against the 20.0 docs.

## 2026-10-07: the Odoo 20 pass on all of Season 2, its Quick Tips and the holiday specials (p91, p92)
- Owner: "make sure we are already using odoo 20", then "i confirm everything, start now". Three research agents compared every film with github.com/odoo/odoo/tree/20.0 (the 20.0 docs are partly stale: the source wins). Findings: breadcrumbs (previous crumb small above the title), the gear became the Actions three dots, Sales lost its "To Invoice" menu, the chatter button reads "Activity", many renamed labels, bank lines that match themselves (EP01), Email Marketing tabs (EP09), Field Service -> Planning in EP00's app list, and one REMOVED feature: the search "Comparison" option (Odoo 19 commit "[REF] *: remove comparison feature").
- The shared overlay `films/inc/tk20.js` fixed what every tip-kit film shares (rule C7). Film-specific facts went to fix agents with a written rulebook (`qa/odoo20/AGENT-RULES.md`: own files only, Edit/Write only, look at a sheet after every change, no audit/render/deliver). The lead ran every audit and render centrally (`runq.py`, separate port bases per queue) and delivered with `qa/odoo20/deliver_batch.py`.
- A removed feature means a new topic, not a patch: QT26 became "Step through periods" (the date arrows on a date facet). The tag alone was not enough: the thumbnail still said "THIS YEAR VS LAST?!" with a "PREVIOUS YEAR" pill until its hook and art were redrawn. Rename = deliver.py SRC + TIPS title, render.py NAMES, qtthumbs tag + hook + art, `thumbs.py --fmt h` + `--fmt v`, and the old Drive post folder superseded.
- G5 failures the agents' sheets missed (transients and measured sizes):
  - QT16: the Actions "..." menu opened over the record title. Open it to the right of the dots, in the empty control panel.
  - QT17: the kept-row highlight sat over rows that were still collapsing. Start it after they collapse (ft > 0.85).
  - QT34: an option's highlight box was text + 52 with the text at +46, leaving 6 px on the right ("tight"). Size boxes from both sides.
  - EP03: the new "Cancel Order" dialog covered 93% of the breadcrumb, and the 6 px sliver left showing is a HIGH "covered". A dialog must hide a label wholly (>= 97%) or not touch it, so it was widened to 640.
  - EP03 again: an 18 px crumb in a window drawn at 0.89 measured 16 px. At 20 px it touched the header, because two crumb lines do not fit there, so that window shows only the record name (what Odoo 20 shows for a record opened on its own).
- Patch scripts: `Path.read_text()` turns CRLF into LF and `write_text(newline="")` then saves LF. A patch must read with `read_bytes().decode()`. This one flipped qtthumbs.js to LF until it was restored.

## 2026-10-07 (later): dialogs over windows, Waffle's ear, thumbnail sandboxes
- **Dialogs over a window: dim the WHOLE window, menu bar included** (QT31, as QT34 already did). QT31 dimmed only the list, so the
  dialog covered 38% of the bright "Orders" menu: a HIGH "covered" plus a "cards overlap". The fix draws a dark slate backdrop and the
  window at 38% alpha under the dialog, which is also what Odoo's modal backdrop looks like. A dialog must cover a label wholly or not
  at all (EP03).
- **Owner: "quicktip 25, fix the dog design the ear are obstructing the face".** Waffle's near ear was drawn AFTER the face and hid an
  eye, the cheek and the nose. Both ears now sit behind the head; the far ear is 0.8 scale and flops outward, and while he begs it is
  counter-rotated so it never rises into his "Waffle" name chip. Check a recurring animal's face in every pose: sit, beg, sad, eat.
- **Parallel thumbnail designers share one built page** (`film-thumbs.js`), so one designer's typo breaks every render. p93 gives each
  designer a page of their own: `THUMBS_V=thumbs_<k>`, made by `patches/p93_thumbs_sandbox.py pages <k>`, which includes only t3kit
  and that designer's file. lint treats `thumbs_*` pages as tool pages.
- **Owner, on the Season 2 thumbnails:** "not to exagerated model of employee, more focus on the odoo system and their problem. do
  exageration in nexi's reaction. add flat color emotion element if needed." This became rule H12 (t3kit). The work is POSTPONED to
  its own session; the handoff is `~/ClaudeWork/qa/s2thumbs3/HANDOFF.md`.
- **Episode thumbnails: the face radius `n3Head().r` is about 250 px at zoom 2.2.** e3Around's spacing then pushes marks 300-440 px
  out, onto nearby props. Place marks per post with smaller multipliers, as EP05 does.

## 2026-10-07 (evening): Season 2 thumbnails v3 DELIVERED: 37 YouTube thumbnails (S2 EP00-13, QT15-34, the 3 Holiday Specials)
- **Owner (verbatim):** "since all videos in season 2 already implemented, can you create/update a youtube thumbnails for all video
  in season 2." Mid-job: "include the holiday special thumbnail", then "im talking about thumbnail, not social media posting. its a
  different contxct" (a status line had said "37 posts": the owner read "posts" as social media). A thumbnail request = the 16:9
  YouTube thumbnail only; say "videos" to the owner. H12 widened, H13 added.
- **How:** the postponed H12 handoff (`qa/s2thumbs3/HANDOFF.md`) + 8 parallel Sonnet designers, each with its own t3 file, p93 sandbox
  page and port pair, and a Nexi placement from a lead-made grid so the 37 never repeat. 25-39 min and 360-545k tokens each; all eight
  delivered usable first drafts, no shared-page breakage. Holidays joined through p97 (`HOL3` over `HOLT`, file `t3hs.js`).
- **What only the lead's review caught** (every render looked at; every figure checked against the film; this is now H13):
  - EP00 "+20 APPS": an invented number (the film says "lots more Odoo apps this season").
  - EP06: an editions comparison dressed as an Odoo "Apps" window with the Sample data chip; no such screen exists. Plain card.
  - EP04: the record showed the typo (qty 100, S$ 16,200.00) while its own log's newest entry said it was fixed. Log trimmed to 3:42 PM.
  - EP03 (body roll 2.5) and QT24 (roll 2.0 + tilt 0.22): Nexi's face upside down / sideways does not read. Counter-tilt the head;
    every approved pose has |roll + tilt| <= 0.85. Broken twice -> `thumbs.py` warns above 1.0 (p99, proved on both old poses).
- **Shared kit gaps get ONE lead fix (p98), not eight workarounds:** qtthumbs dropped a Quick Tip hook's x/y/w/rot (three agents set
  CFG.title inside `front()`), and t3kit drew the previous crumb and list headers at 19 px (rule 20). Proof: all 37 re-rendered from the
  main page and diffed against the approved sandbox renders: 31 pixel-identical, 6 changed only in those labels (checked at full res).
- **Delivery** by `qa/s2thumbs3/deliver_yt.py` (thumbnails only, md5, old files to `_superseded`, two sheets in 26, all-37 sheet local).
- **Slips:** four of eight agents made one edit through a Bash python/sed one-liner despite the Edit/Write-only brief (no damage). The
  lead wrote a backup to `$TEMP/../claude/...` = AppData\Local\claude, NOT the scratchpad (AppData\Local\Temp\claude\...): use the
  scratchpad path verbatim.
- **Not done (not asked):** the 9:16 covers on Drive keep the v1/v2 looks, and the S2 9:16 video frames keep their old hooks. Hooks
  changed on EP07, EP11-13, QT21 and QT26, so a future `--fmt v` / `--fmt vf` render shows the new text.

## 2026-10-07 (night): the 9:16 Shorts thumbnails for the same 37, PAUSED by the owner mid-way
- **Owner (verbatim):** "make sure all thumbnail are properly allocated in their own folders. also include the thumbnail for 9x16 ratio
  for youtube reels". Later: "POSPONE AT THE MOMENT. PROPERLY SAVE."
- **Allocation:** a scripted audit (`deliver_yt.py --audit`) answered the first half with proof: all 37 folders hold their own 16:9
  (md5 = its own render) and no stray images. The real gap was the 9:16 side: 28 folders still had the OLD-design covers and EP05-13 had
  none.
- **Resuming finished agents (SendMessage) for a follow-up worked well:** they already knew their films, screens and helpers. It cost
  about 500-700k tokens each, though, against 360-545k for the first round: long contexts are expensive.
- **Shorts safe zone, missed by the designers' own checks:** YouTube lays the title and view count over the bottom ~18% of a Shorts
  thumbnail, and 9 of 37 drafts put Nexi's visor partly below y 1580. The lead caught the first ones with a red-line overlay. Then
  `thumbs.py` learned to measure the face on every 9:16 render (p101: `window.NEXIFACE` exported from the closure, because film code
  cannot be reached from the page's global scope; band 130-1580). The probe was calibrated against the renders: its circles sit on the
  visor.
- **Cover hooks could not move** (fixed y 905 / 850): p100 adds an optional `vhook` (no existing entry sets it, so no old cover changed).
- **Stopping agents mid-edit:** six designers were stopped with TaskStop while editing. Proof that nothing broke: all 37 16:9 renders
  from the main page matched the delivered masters (threshold 24, no JS errors). The design files were then snapshotted
  (`qa/s2thumbs3/wip-2026-10-07/`) and a full 9:16 contact sheet and face log were written for the handoff.
- **Paths:** keep reference masters out of the session scratchpad (it is per-session). They now live in
  `~/ClaudeWork/qa/s2thumbs3/approved-16x9/`.

## 2026-10-08: the 9:16 Shorts thumbnails, resumed and DELIVERED
- The owner said "continue". The lead finished alone, without re-spawning the designers: 9 covers were raised (face probe p101), and 3 marks or windows that the raise pushed onto text were moved (EP13 window and hook up 60 px, QT29 and QT25 marks). Look again after every move: raising Nexi can put her head or marks onto the window above.
- The final main-page renders gave 37 faces with no warnings, and all 16:9s matched `approved-16x9/`. `deliver_yt.py --fmt v` delivered, then `--audit` reported 37 OK.

## 2026-10-08: Season 1 remake resumed (owner: "continue the update on season 1 nexi video")
- Delivered today: EP05 erp, EP09 reorder, EP11 custom, EP04 myth, EP01 walk, EP06 accounting, EP13 odooai (all full gate PASS, no waivers). Method: 5 builders at a time (ports 4711-4716), the lead renders on runq bases 4621/4631/4641, looks at `-final.jpg` + `-cta.png`, then `qa/odoo20/deliver_batch.py`.
- **What the gate did not catch, the lead's look did (twice the same thing):**
  - The CTA line kept the quiz/recap HUD label ("Pause and guess" on walk, "Recap" on apps and myth; beforeafter, delivered 7 Oct, too). Fix: `tkHud('Get started')` at the CTA line. Now rule **E4** + `lint:E4` (episodes only: every Quick Tip QT02-34 keeps the approved "Remember" label through the CTA, so tips are exempt). myth + beforeafter re-rendered and re-delivered.
  - apps reused erp's golden-key CTA. Now rule **E5** (unique CTA object); builder briefs list the used objects.
- Builders kept editing with Python string replacements through Bash despite the brief (5 of 8). No damage (no backslashes), but repeat the rule in every brief.
- Truth check that turned out fine: CRM pipeline search facet in 20.0 is "My Opportunities" (crm_lead_views.xml, assigned_to_me); the menu is "My Pipeline". tk20 is right.

## 2026-10-09: Season 1 remake COMPLETE + Season 1 thumbnails v3 + EP01-05 trailer posters
- Owner: "continue the update on season 1 nexi video" -> all of EP00-EP22 + QT01-14 delivered (full gate PASS, no waivers). Then:
  "before build ep22, do ep00 first and thumbnail" (order respected: pilot -> thumbnails -> finale) and "dont do ep 1-5 only. complete
  season 1 thumbnail. including quick tips" (the 5-at-a-time batching read to the owner like EP01-05 only: say up front that every
  batch covers the WHOLE set).
- Lead catches the gate cannot see (each fixed before delivery): stale CTA HUD labels (now lint E4), duplicate CTA object (apps key =
  erp key, rule E5), duplicate neighbour sidekick (social + brand hedgehogs -> brand got Plume the peacock), a finale recap that showed
  superseded sidekicks (a recap film is built LAST, after every film it recaps is final), EP16 web at -20.6 LUFS (audio-only fix:
  BG_DB web -21.7). Keep looking at every -final.jpg and -cta.png.
- Engine: p102 (S1 thumbnail design files t3s1_*.js + sandbox pages), p103 (fmt=p: 2160x2880 3:4 poster from the same parts as the
  thumbnail, POS.<id>, composeP; poster logos/icons in web/poster-art/, never web/assets). The 16:9 masters were diffed against
  qa/s1thumbs/approved/ after every engine change (max diff <= 2).
- Delivery scripts: qa/s1thumbs/deliver_s1yt.py (16:9 thumbnails -> folder 22, sheet "00 Season 1 - YouTube thumbnails.jpg"),
  qa/s1thumbs/deliver_posters.py (posters -> 04. Nexi Explains Episode Promos/Image Posts). Re-running deliver_s1yt after a re-render
  replaces files whose bytes changed only by render noise: deliver from the approved masters, or compare designs before copying.
- Builders and designers broke "Edit/Write only" in most reports (Python/sed literal replacements). No damage this time; keep it in
  every brief and check reported slips.

## 2026-10-09 (evening): Year-End "The Countdown" v4 redesign (holiday special `newyear`), DELIVERED
Owner, verbatim: "REDSIGN THE COUNTDOWN EPISODE. THE TIMER NOT PROPERLY DOING GOOD. ALSO NOT PROPERLY SHOWING A GOOD DESIGN
PRESENTATION. IN THE END OF THE VIDEO, STILL ADD THE SPREADSHEET MONSTER. AS SODE CHARACTER FOR THE EVENT. CELEBRADING THE NEWYEAR" /
"ALSO FIX THE FLOOR FOR THIS EPISODE" / "CHECK THE NUMBERING, NOT PROPERLY SHOWN".
- What v3 got wrong (measured on the delivered master):
  - The "timer" was per-number labels (LAY[i].time 11:51 ... 11:57, three minutes used twice). Nothing ticked, the chip and the dial
    were two clocks, and the 3-2-1 was a small digit on a plate.
  - The v3 fix for "highlight Nexi's content" dimmed the number to a ~40 % ghost behind the card. That fixed one note by breaking
    the numbering: never solve "content first" by hiding the structure.
  - The HUD switched to N-1 at the next line's t0 while card N was still up.
  - Cards floated in empty sky.
  - The floor was a flat lilac slab.
  - Rules P29, P30, P31 and lint:P29 (3+ literal clock times warn; selftest added; across all films it hits only the v3 backup).
- v4 (builder brief qa/newyear/V4-BRIEF.md): one rooftop show set (truss, LED board + dial, a jumbotron that is ~54 % of the
  frame on slide shots, a lamp rail 10 ... 1, a perspective deck and terrace floor), with one clock driven by
  MID = 144.08 s (board 02:20 at 4.5 s, ticking 1/s).
  - The final 10 seconds are on the jumbotron.
  - The voice count is split into three lines so "three/two/one" land within 0.03 s of the board.
  - The number bursts at full opacity, then hands over to a gold tile on the slide, and the HUD switches at the burst.
  - The EP00 kaiju was ported (renamed globals) with party eyes, a hat, a horn and a sparkler. It rises behind the parapet after
    midnight and stays through the CTA.
  - Result: 2:49.5, 34 lines, full gate PASS, no waivers, A3 3.0x.
- Lead review caught what the gate cannot (the builder fixed them before the audit):
  - two timers on screen at once (the pill over the board);
  - slide text under the caption band;
  - "Three..." a beat late against the board;
  - Nexi over the Season 2 sky title.
  - Brief overlaps that are only transitions (a 0.3 s fade of the quiz cards under the giant 10, the board scrolling out on a
    crane) were checked frame by frame and accepted.
- Delivery bug found and fixed:
  - `deliver_s2.py` and `deliver_holiday.py` `put()` had their supersede mkdir + rename inside a trailing comment (the 2026-10-09
    reorg patch), so changed files would be overwritten instead of archived.
  - `deliver.py copy` never archives. The v3 pair was moved by hand to 99. Superseded/Holiday Specials/... _superseded
    2026-10-09 (v3) first. Rule G16.

## 2026-10-10: Nexi 9:16 cute intros + trend reels (new 9:16 studio `~/ClaudeWork/nexi-intro-916`), 5 DELIVERED
Owner, verbatim: "create a cute nexi animation introducing about nexi. use nexi video skill, but make it similar to this video.
being cute in the screen. make it more dynamic." (no video arrived; the closest match was the 2 Oct cute shorts in
"01. Nexi Cute Animations") -> mid-build: "dont do 16x9, do 9x16. add element at the back. look for good background. create random
background each video. different intertaction base on the background." -> then: "look for trending reels, fully recreate that.
create atlease 3 videos. make everything dynamic. if need to use darker shade background, please do."
- **The 16:9 engine cannot make native 9:16** (audit, captions, intro and end card are 1920x1080). A 9:16 request goes to the 9:16
  studio: `web/intro.js` (engine: timeline, the series voice timing + a portrait caption card, the cutekit clips + react(), a camera
  mirrored into Nexi with N.view, particles, Reels text `ttext`, flash/glitch, a beat grid) + one world per file
  `web/worlds/<w>.js`, pasted at the WORLD marker into `bundle-<w>.js`. Audio = nexi-tutorial `audio_t` (soft voice, styles, sfx)
  with presets `nxi-<w>` set at runtime in render.py (the shared registry is not touched). A 16:9 registration (p104) was made and
  reverted the same hour.
- **Random background per video:** a pool (beach, space, garden, underwater, snow, sunset-city), a seeded random draw per batch
  (underwater, beach, garden), every world with 3+ parallax layers, ambient motion, a critter sidekick and interactions that belong
  to the world (question bubbles she pops underwater; service orbs juggled like beach balls; the CTA written in the sand).
- **Trend reels** (researched from dated October 2026 trend reports, newengen / socialpilot): the Costume Walk (Ramalama: low camera,
  legs only, no text or talking, slow approach, pull-back reveal), Loading 0% -> 100% (GRWM loading, one jump cut per stage),
  "my reaction to ___" (deadpan on the smallest number, escalate each round, biggest last) + a brand flip. Original music only: the
  trend songs are licensed and restricted for business accounts; say so to the owner.
- **What only looking caught:** the costume walk first showed her whole face (the frame top must sit at her waist, and she must grow
  to fill the shot: zoom 2.6 -> 3.6 while she approaches); the floor ran out (a black band) when the camera went low; a mid-mix
  night -> day blend went muddy grey (use three stops: night -> peach dawn -> day); sun rays on the screen layer washed white Nexi
  out, and a cream "sunshine" wall gave her no contrast (rays behind her, a sky-blue wall); step puffs drawn in front read as
  blotches on her body; flying pages spent their flight off-screen (fly in fast, hover readable, then zip).
- **What qa.py caught:** the alarm clock "7:00" half off the frame and in the Shorts action column in two close-ups (re-aim the
  shots); the "Shine time!" caption over her body in a 1.75x close-up (1.45x). A checker fix with evidence: text WHOLLY off the
  canvas is not in shot (it was flagged as off-frame); partly cut text is still caught.
- **Audio of music-led reels** (soft-voice windows): A5 gaps < 0 on busy styles (steel pan, synth) -> SOFT_DB 8.0; A3 on a reel of
  short quips between dense cut effects -> FX .15 + SOFT_DB 10.0; A1 -21.3 LUFS when the only voice gap was 0.35 s -> BG_DB -20.5
  for that reel. All per reel in render.py, all inside the approved windows; no waivers.
- **Drive moved on 2026-10-10 (02:15):** the Nexi folders now live in `G:\Shared drives\Marketing\02. TechNext Folder\05. NEXI\`
  (00. NEXI Explains, 01. Nexi Cute Animations, 02. Nexi Social Channel Art). nexi-tutorial `deliver.DRIVE` still points at
  `00. TechNext Folder`: fix it before the next `deliver.py copy`.


## 2026-10-10: 3D comic words test (nexi-character kit, nexi3d)
- Owner: "possible to make all heavy element's in 3d?" then "test at least 1". Built `films/inc/nexi3d.js` (own WebGL layer,
  same lighting as nexi-core) and swapped the 2D comic word for extruded 3D letters; bench `nx3sheet` (p101). Details, maths and
  gotchas: nexi-character `reference/kit.md` "3D heavy elements". Awaiting sign-off; nothing delivered with it yet.
- Lesson: never add late meshes to nexi-core's scene (cached glow list -> self-bloom; kit tints use glcv as a mask). A separate
  renderer drawn in the prop layer avoids both.


## 2026-10-10: Intro 03 "Hi from the garden!" (9:16 studio), DELIVERED + rule V7 automated (render.py gaps)
Owner, verbatim: "continue the intro vide 9x16 that we currently working on" -> the paused Intro 03 (garden, the third world of
the seeded draw). 34 s, 8 lines, qa.py PASS (0 FAIL runs), A1-A5 ok after SOFT_DB 8.0 (A5 gaps -0.5 at 7.1: the busy ukulele,
the same fix as beach), no waivers. Drive: `05. NEXI/01. Nexi Cute Animations/9x16 (Reels, TikTok, Shorts)/Intro 03 - Hi from the
garden (9x16).mp4`, md5 checked.
- **Message chosen to stay new in the folder:** Intro 01 = questions + quotation/meeting/team, Intro 02 = the four services,
  Trend 03 = the one Odoo database; Intro 03 uses the site's AI mini tour ("TechNext builds four kinds of AI ... Chatbots like
  me!"), which also introduces what Nexi IS. Check the folder's earlier messages before picking a fact.
- **The garden's interactions:** dandelion float-in (the puff sheds pappus seeds), seeds tossed into four beds, watering per bed
  (N18: the tick keeps the spout over the bed from the live hand offset, the can switches hands for the far side), sprouts ->
  giant flowers (back-eased growth), hanging plant tags (audited cards), the last bud opens into a robot flower whose centre is
  the caption's `nexiFace()` (it blinks and "talks" with her), a wooden sign that springs out of the lawn (clipped at the ground
  line), Bea the bumblebee on a dotted trail who takes her heart boppers for antennae. No new costume: `boppers` reads as antennae
  (a new costume would change nexi-core for every film, K6/K10).
- **What only looking caught:** (1) the low, zoomed opening camera showed a cream band of sky between the hedge (parallax .56,
  filled to y 1080) and the lawn: the hedge now fills to 1700. This is the SECOND "a layer runs out at an extreme camera" defect
  (the costume reel's floor was the first) -> automated as rule V7 below. (2) Bea's roam circle at head height flew across
  Nexi's face: an orbit now goes behind her head on top and in front of her belly below, switching layer at the sides. (3) the
  reveal's hearts and sparks flew over the "AI inside Odoo" tag: bursts next to tags go on the back layer, hearts come from Nexi.
  (4) the sign covered the beds and stem bases: it sits on the open lawn below them.
- **Automated (rule V7, `render.py gaps <world>`):** `?gap=1` pre-fills the frame magenta and the engine's `skyFill()` paints
  the sky magenta; a world declares `WD.skyline = { par, y }` (garden: the hedge, .56, 960) and `GAPSCAN()` counts magenta pixels
  below the skyline's screen y on every 3rd frame (end card excluded). Proof on the bad build (hedge back to 1080, a temporary
  copy): FAIL 0.00-1.40 s (133k px, the band I saw) AND FAIL 7.90-8.80 s (5.7k px, the zoom punch on "Antennae on!", a seam no
  still had sampled); the delivered build: 0 runs, PASS. Normal renders are unchanged (skyFill draws the same fill).
- **Same day, "continue to all":** every heavy element of the nexi-character kit is now 3D in `nexi3d.js` (words, vein,
  bubble, puffs, rain cloud, Zzz, ?, siren, battery, magnifier, 10/10 card, box, dust ring + symbols, papers + table,
  report, cursor, sweat, tears, notes, faint stars, engine hearts/confetti/text pops). Light effects stay 2D. Engine emotes
  are moved out of EMO into the kit's marks; engine particles are re-layered ('nx3') via a wrapped `L.emit`, so the engine
  still moves them. Full method: nexi-character `reference/kit.md` "3D heavy elements".
- **Colour lesson:** ACES tone mapping greyed saturated brand colours on the prop layer (KSSHH! khaki, vein pink, siren
  pale). Flat output (NoToneMapping) + softer lights matched the 2D palette. Nexi herself keeps nexi-core's ACES.
- **Occlusion lesson:** with a separate renderer, depth only works by layer: tag every mesh back/front (the box = back wall,
  floor, back flap behind her; front + side walls in front). Orbits (?, stars, dust) switch layer by the sine of the angle.

## 2026-10-10 · owner reels (9:16 studio)
- Owner, verbatim: *"change the set up of the video, more focus on business owner of different industry talking, showcase more business. in video outro, use technext intro website animation"*.
- Delivered Business 01 clinic (Dr. Lina, Bayview Clinic), 02 online shop (Jay, Parcel Lane), 03 construction (Darren, Northline Builders), all sample businesses, facts from industries/*.html; outro = outro.js port of the technext.asia intro (rules V10-V12).
- Fixes worth keeping: a board's chips popping with the board scale read as 20 px (fade text after the pop); a PO card popping under Nexi's flight path (pop after she lands); Nexi's head 20 px from the top while dancing (keep anchor y >= 380 at zoom 1); a card's amount column at x > 950 below y 1000 fails Shorts (V3).
- 2026-10-11: detailed sample Business 04 restaurant (Laksa House) + outro peek/centred logo (V13, V14); reels 01-03 re-rendered with the new outro. qa.py exempts text tagged `scenery*` from offframe (a sign sliding out during a pan).
