# QA checklist (strict)

Two halves:
- **Automated:** the gates. You cannot skip them. They block the build, the render and the delivery.
- **Manual:** what no checker sees. You must still do it, because the gate only measures. Rule IDs refer to `rules.md`.

## 1. Automated: must PASS (no bypass)
- [ ] `python build_film.py <name>` built with **no lint errors** (C1 C3 C4 B1 T5 T6 N7 E1 Q1). Each lint warning is a pointer to frames you must look at: N5 bigjump, P9 evenodd, M6 high toss, K3 save/restore, T6 3-line caption.
- [ ] `render.py audit 5`, then `layout_audit.py <name>` (always both; the audit deletes the old report so it can't be read by mistake).
- [ ] `python gate.py <name> --pre` → **PASS**:
  - G1 build current;
  - G2 lint;
  - G3 registered;
  - G4 audit of THIS build;
  - G5 zero HIGH, nothing parked ≥ 1.5 s, nothing off-centre ≥ 3 s;
  - G6 end spot unique in the group.
- [ ] `render.py mp4`. It refuses on a failing pre-gate.
- [ ] `python deliver.py sheet <name>` writes `qa/<name>-final.jpg` and `qa/<name>-cta.png`.
- [ ] `python deliver.py copy <name>` → the full gate PASSES:
  - G7 render of this build;
  - A1 −18.0 to −16.5 LUFS;
  - A2 TP ≤ −2.0;
  - A3 voice ratio ≥ 3.5×;
  - A4 music 9.5–13.5 dB under the voice;
  - A5 4–7 dB under it in the gaps;
  - G9 the sheet and the CTA frame made from this MP4.

  Then "drive OK" (md5).
- [ ] Every waiver used is named in the message to the user.

What the audit rules mean:
- `overflow`: text over its box edge.
- `tight`: under 3 px (HIGH) or 8 px of padding.
- `touch`: text on a neighbouring shape.
- `covered`: hidden in part by a later shape.
- `overlap`: text on text.
- `line`: a connector through text.
- `cut`: cut by the frame while the camera holds.
- `small`: under 17.5 px on screen.
- `nexi-text`: Nexi over or under text.
- `nexi-edge`: Nexi (hands included) cut by, or within 100 px of, the frame edge.
- `cards`: two text cards partly overlapping.
- `offcentre`: a resting group (including the 3D Odoo window) more than 160 px off centre.

## 2. Manual look: the strip, `qa/_strip.py <name> 2.5`, end to end
- [ ] **F5:** no empty frames. Every scene's frame is up when the camera lands.
- [ ] **F2:** every scene is one designed, balanced group, not just "no overlaps".
- [ ] **M1:** the transition grammar on every scene change (take-off, delayed camera, overlapping fades).
- [ ] **F6:** no leftovers from a previous scene at the edges.
- [ ] **N3:** Nexi roams and reacts big. The camera moves between beats and holds while text is read (M2).
- [ ] **N10/N11:** every line has an exaggerated reaction (glyph, focus lines, squash; `lint:N10` is clean), and what happens on screen happens because of her.
- [ ] **M12/K9:** builds animate during their line (look at the strip frame at each line start: nothing finished early); holds give the viewer time.
- [ ] **P12/T12:** drawn art is cel-shaded (no flat clip art); every sprite SFX word sits in a free band (the audit cannot see it).
- [ ] **Hands-on moments:** at least three. One quiz (Q1/Q2), one charming random element.
- [ ] **T7, T9:** labels on contrast and true for what they label.
- [ ] **P2:** samples look like real, attractive designs.

## 3. Manual look: the encoded MP4
- [ ] **`qa/<name>-final.jpg`:** read all 12 frames.
- [ ] **`qa/<name>-cta.png`:** read at full resolution. Zoom into the CTA object, cut-outs and clipped shapes (P9: the AI 2 calendar shipped broken twice).
- [ ] **B2/B3:** centred logo, the right end card for the series; Nexi at this video's spot (E1/E2).
- [ ] **C1–C5:** every fact true; samples labelled; no Malaysia, no cyber security, no partner-tier badge.
- [ ] **A5:** listen to the voice against the effects. No effect drowns a word.

## 4. After delivery
- [ ] Send the file at once, with a 2–4 sentence caption naming any waiver.
- [ ] Re-package the post: thumbs (h, v, vf) if the hook or art changed → `vertical.py <id>` → `deliver_series.py` (H1-H6).
- [ ] `python sync_source.py`.
- [ ] Train the skill:
  - a lessons entry;
  - a numbered rule for every new lesson;
  - automate anything broken twice;
  - publish the hub page and check it returns 200;
  - update memory and `qa/ROUND2-TODO.md`.
