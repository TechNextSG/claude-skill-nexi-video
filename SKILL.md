---
name: nexi-video
description: Make, fix, redesign or audit TechNext explainer videos starring Nexi, the 3D robot mascot, with the in-house renderer at ~/ClaudeWork/nexi-tutorial. Covers Odoo walkthroughs, topic videos (myth-busting, quick tip, module explainer, before/after), solution videos (one per technext.asia service, built on an analogy or role-play), and any new Nexi video. Output is a 16:9 MP4 with Nexi's robot voice, typed captions, music and sound effects, delivered to the shared drive only after a strict release gate passes. Use whenever the user asks for a Nexi video, a video about an Odoo app or a TechNext service, or a fix or audit of an existing Nexi video.
---

# Nexi videos (strict mode)

TechNext makes cinematic explainer videos starring Nexi, the 3D robot from technext.asia. Every frame is rendered in headless Chrome by the in-house engine at `~/ClaudeWork/nexi-tutorial`. A video is a JavaScript "film": timed captions in Nexi's robot voice, plus props, camera moves and Nexi's acting.

## Strict mode: the rules are enforced, not suggested

The user found lapses that eyeballing had missed: overlaps, small text, Nexi cornered or off-centre, empty frames, a broken CTA calendar, Malaysia in a sample. So the rules are now code:

- **`reference/rules.md` is the rulebook.** It has numbered rules (C, B, F, T, N, M, P, Q, E, A, G, K), and each one names the check that enforces it.
- **`build_film.py` runs `lint.py`.** A truth, brand, caption, spot, quiz or sample-label error means the film does not build.
- **`render.py mp4` runs `gate.py --pre`** and refuses to render a film without a clean measured audit of the exact build: no HIGH findings, nothing parked, nothing off-centre.
- **`deliver.py copy` runs the full `gate.py`** and refuses to copy unless every check passes: build, lint, registry, audit, end spot, render stamp, audio, and the final look. There is **no bypass flag**.
- **Exceptions** are waivers in `qa/waivers/<film>.json`, each with a real reason. They are allowed for intended effects only, and every waiver used is told to the user. Truth and brand rules (C1, C4, B1) cannot be waived.
- **Never** loosen a threshold, edit a checker, delete audit data, or hand-wave a finding to get a film through. A checker changes only for a proven false positive, and the evidence is logged in `lessons.md`.

## Before anything else

1. **Read** `reference/rules.md` (the law), then `reference/lessons.md` (the history: do not repeat it), `reference/engine.md` (the API) and `reference/workflow.md` (the commands).
2. **Check the state.**
   - The memory file `project_nexi_odoo_walkthrough.md` lists what has been delivered.
   - `~/ClaudeWork/nexi-tutorial/qa/ROUND2-TODO.md` is the open work and the measured fix plans.
   - `python gate.py --all --pre` gives one line per film.
3. **Get the facts right (rules C1–C5).**
   - Content comes from the live site repo, `~/ClaudeWork/TechNext-Website` at `origin/master`.
   - Singapore HQ, Philippines and Vietnam teams, 10+ countries. No Malaysia, no cyber security.
   - Samples are fictional and labelled.
4. **Nexi's character:** read the skill `nexi-character` before writing her lines or reactions (cat attitude: offended by mess, soft on people; 46 reactions + 30 variants). A reaction is one call: `/*@include nexikit*/`, the `nexi3d` include on the next line, then `nxFeel(kind)` on the caption word (lint N10 counts it). **Never the same reaction twice in a film:** calling a kind again cycles v1 -> v2 -> v3 and rotates the comic word by itself; pick one with `{ v: 2 }` or an alias (`nope`, `doubletake`, `volcano`, `yeet`, `eyeroll`...). The anger -> fix turn is `nxFeel('determined')` (the "Fine." beat); other new kinds: idea, stare, sleepy, stretch, breathe, starstruck, nervous, wink, hello, bye. The kit lives only in this renderer: in the 9:16 studio (`nexi-intro-916`) and the cute-shorts studio (`nexi-cute`) build the same reaction by hand from nexi-character `reference/emotions.md` (face + body + mark + word + sound).
5. **Copy the closest film** in `web/films/` (or `reference/film-template.js`) instead of starting blank. A new **Quick Tip** starts from `films/tip5.js` and the shared Odoo-screen kit `films/inc/tipkit.js` (rule P16). Its thumbnail is a `QT` entry in `films/inc/qtthumbs.js` (rule H1: Quick Tips have their own colourful look). A **Season 2** episode ("The Human Side of Odoo") starts from `films/s2e01.js` + the cast kit `films/inc/s2kit.js` (rule P18) and the format `qa/s2/S2-FORMAT.md`; it ships to folder 26 via `deliver_s2.py`. A **9:16 reel or short** (cute intro, trend recreation) is built natively in the 9:16 studio `~/ClaudeWork/nexi-intro-916` (rules V1-V9, workflow "9:16 reels"; `render.py audit` AND `render.py gaps` must PASS): copy the closest `web/worlds/<w>.js`.

## The pipeline (every video, every fix)

1. **Concept.** One analogy or role-play world per video, unique across the series, with a costume that fits. Plan:
   - 8–13 lines, about 50–75 s;
   - one viewer quiz;
   - three or more hands-on moments;
   - one random charming element;
   - a unique CTA object;
   - intro and outro badges;
   - an explicit intro exit (`nx`/`ny`, rule N7) and an end spot different from the group's other videos (rule E1).

   Write the composition of every scene in the film's header comment, using the framing math (rule F2).
2. **Script.** Every caption is `say()`, at most 86 characters (rule T6) and never starting with dots (rule T5). Every beat hangs off a caption with `at(line.w('word'), …)`. Every scene change uses the transition grammar (rule M1).
3. **Build:** `python build_film.py <name>`. Lint errors stop the build; read the warnings, which name the frames to check. Then `render.py probe`.
4. **Measured audit.**
   - Run `render.py audit 5`, then `python layout_audit.py <name>` (always both).
   - Then `python gate.py <name> --pre`.
   - Fix and repeat until the pre-gate PASSES. Read every finding.
   - Look at `qa/_strip.py <name> 2.5`, which catches what no rule measures: empty frames, balance and design quality.
5. **Render:** `render.py mp4`. It refuses on a failing pre-gate. Several films can render in parallel on separate ports.
6. **Audio.** The gate measures loudness, true peak, voice ratio and music levels (A1–A5). Fix by re-muxing only.
7. **Look:** `python deliver.py sheet <name>`. LOOK at `qa/<name>-final.jpg` and at the full-resolution `qa/<name>-cta.png`.
8. **Deliver:** `python deliver.py copy <name>`. It runs the full gate, copies, and checks the md5. Send the file to the user at once (SendUserFile, proactive) with a 2–4 sentence caption. Name any waiver used.
9. **Re-package the post** (every episode and Quick Tip has its own folder in folder 22): `python thumbs.py --fmt h|v|vf <id>` when the hook or art changed, `python vertical.py <id>`, then `python deliver_series.py`. Rules H1–H6. **Channel art** (banners, profile pictures): `python channel/channel.py [--guide]`, then `channel/preview.py` and `channel/deliver_channel.py`, rule H8.
10. **Report** a status table (video, length, gate state), then **train the skill** (below). Not optional.

## Non-negotiables (from the user, verbatim where it set the rule)

| What the user said | Rules |
|---|---|
| "we dont have malaysia … make it truthful … explain technext and do also sample company" | C1, C3, C5 |
| "some text are overlapping, small and hard to read. maximize the designing of the element" | T1–T4, P2 |
| "not properly centered and not properly design" | F2, F3, M1 |
| "in all outro, let nexi to much in the corner. make sure to make nexi will change location every video" | E1, F3 |
| "fix this part ai 2" (a broken CTA calendar) | P9, G9 |
| "check some visual error, glitches and lapses" (floating magnifier, crate changing colour, blank whips) | N8, P10, M1 + look at the FINAL MP4 (`qa/mp4strip.py`, `qa/blank_scan.py`) |
| "similar voicing/audio as https://technext.asia/nexi#full. the current audio are too sharp" | A6 |
| "properly name the video file per episode" / "quick tips video are not included in the episode" | G10 |
| "audit properly … recognize all mistake and in next prompt it will not happened again" | this strict mode: gates plus the training loop |
| "make sure there's a exaggeration effect in every reaction. make nexi reactive." | N10 (`react()`, `lint:N10`) |
| "make it interactive and connected to nexi … fix some comic style of design, it's ugly" | N11, P12 |
| "at least need a exaggeration reaction when thing went wrong ... cute angry adorable. catt attitue" / "lets build nexi skills. include all of this emotion and reaction" (2026-10-10) | skill `nexi-character`: anger aimed at the mess, 1-2 s, then the fix; `nxFeel` (nexikit + nexi3d) |
| "do proper cinematic style of story telling. you can slow down explaining things and give time to viewers to absorb" | M12, F10, K9 |
| "dont use too much dark color other than night view" | P13 |
| "when nexi shooting beams, make sure nexi are shooting properly animation" / "combo attack" / "orb should orbiting around properly" | N12 |
| "the comical style are for intro. continue similar to the style of previous quick tips videos." | P16 (Quick Tips keep the QT05-14 look) |
| "the new quick tips will cover the season 2" / "all season 2 quick tips folder will be moved in ... 20. NEXI Explains/02. Season 2" | G8, G13 (Season 2 Quick Tips in folder 26; the packager only touches what it packages) |
| "add 10 additional quick tips, make more creative. at lease 1 minutes 30 sec." / "improve nexi animation and cuteness overload." / "improve designing the envirolment." | Quick Tips 25+ standard (P: 90-110 s, five stations, cutekit + envkit) |
| "make more the thumbnail overly exagerated design, reaction and super dynamic elements design" | H9 + the Season 2 Quick Tip v2 thumbnail rule (H) |
| "make more the thumbnail overly exagerated design ..." / "season 2 thumbnail are not templated ... each thumbnail should be unique ... background design ... follow the format color for episode similar to season 1" / "dont change the season 1 ... dont create yet a thumbnail" | H9 (exaggerated, own background + character placement per S2 post, S1 colour format; S1 never touched; thumbnails only on request) |
| "fix this 1st image part. arrange and design properly." | P22 (designed text cards) |
| "do proper watering on the plants." | N18 (prop actions animated as the real action) |
| "make it interactive and properly design. dont settle in this kind of presentation. make it over the top." | P23 (overview scenes played by Nexi, over the top) |
| "the only model have darker highlight are the persons/character and some elements card, do not include the background" | P21 (no ink outlines on scenery) |
| "maximum video content should 2 mins and 58 sec" | G15 (Season 2 videos <= 178 s, `gate.py`) |
| "make sure the background and elemnt will be similar to quick tips style. all upcoming video will be similar background style so it will be unified design." | P26 (envkit sets + cute beats in every new film; `s2cute` in cast films) |
| "dont register it as S2. holiday special ..." / "also create a holiday special thumbnail, no numbering/counting episode. just make it dynamic, different on other thumbnail." | H11 (holiday specials: own folder 27, `deliver_holiday.py`, `holthumbs.js` thumbnails with no number) |
| "not to exagerated model of employee, more focus on the odoo system and their problem. do exageration in nexi's reaction" / "include the holiday special thumbnail" / "im talking about thumbnail, not social media posting. its a different contxct" | H12 (the Odoo 20 screen and its problem are the hero, Nexi carries the exaggeration; S2 episodes, S2 Quick Tips and the Holiday Specials; a thumbnail job = the 16:9 YouTube thumbnail only), H13 (no invented figures, Odoo chrome only on real Odoo screens, state agrees with its log, face near upright: `thumbs.py` warns) |
| "THE TIMER NOT PROPERLY DOING GOOD" / "CHECK THE NUMBERING, NOT PROPERLY SHOWN" / "ALSO FIX THE FLOOR FOR THIS EPISODE" (Year-End v4) | P29 (one ticking clock from one anchor, `lint:P29`), P30 (numbers full opacity, HUD = badge = slide = rail), P31 (a designed floor), G16 (archive the old file before a re-delivery) |
| "add disclaimer it before starting it might triggering to someone" | S2 EP00 opens on a content note card (worries at work; pause or talk to someone you trust; not professional advice; fictional samples) |
| "dont do 16x9, do 9x16. add element at the back. look for good background. create random background each video. different intertaction base on the background." / "look for trending reels, fully recreate that. create atlease 3 videos. make everything dynamic. if need to use darker shade background, please do." | V1-V9 (native 9:16 studio, designed layered worlds drawn at random, Shorts safe zones `qa.py`, trends recreated from dated reports with original music, per-reel audio, look at every new shot, no layer runs out at any camera `render.py gaps`, a sidekick never crosses her face, bursts by text on the back layer) |

Also:
- The plain Odoo logo only (B1); logos centred (B2).
- Upbeat music, never loud (A4).
- 16:9 masters, with 9:16 made from finished episodes.
- Tell the user as each video finishes.

## Train the skill after every job (the loop)

1. **Log** a dated `reference/lessons.md` entry: what went wrong, why, and the fix. Quote user feedback verbatim.
2. **Promote** every new lesson to a numbered rule in `reference/rules.md`, with its check.
3. **Automate** every rule that was broken twice, or that a user had to point out: extend `lint.py`, `layout_audit.py` or `gate.py`, and prove it with `python lint.py --selftest` or a gate run on the bad build.
4. **Document** engine changes in `reference/engine.md` and commands in `reference/workflow.md`.
5. **Publish:** run `python ~/ClaudeWork/technext-claude-skills/tools/build_skills.py`, then commit and push that repo (TechNextSG/technext-claude-skills). Check that https://technextsg.github.io/technext-claude-skills/ returns 200.
6. **Remember:** update `project_nexi_odoo_walkthrough.md` and `qa/ROUND2-TODO.md`, then run `python sync_source.py`.
