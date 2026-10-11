# nexi-video

Make, fix, redesign or audit TechNext explainer videos starring Nexi, the 3D robot mascot, with the in-house renderer at ~/ClaudeWork/nexi-tutorial. Covers Odoo walkthroughs, topic videos (myth-busting, quick tip, module explainer, before/after), solution videos (one per technext.asia service, built on an analogy or role-play), and any new Nexi video. Output is a 16:9 MP4 with Nexi's robot voice, typed captions, music and sound effects, delivered to the shared drive only after a strict release gate passes. Use whenever the user asks for a Nexi video, a video about an Odoo app or a TechNext service, or a fix or audit of an existing Nexi video.

A Claude Code skill made by [TechNext](https://technext.asia). Read it online with every other TechNext skill:
https://technextsg.github.io/technext-claude-skills/#nexi-video

## Install

```bash
git clone https://github.com/TechNextSG/claude-skill-nexi-video ~/.claude/skills/nexi-video
```

Then restart Claude Code. Update later with `git -C ~/.claude/skills/nexi-video pull`.

This repo is generated from the working copy by `tools/build_skills.py` in
[TechNextSG/technext-claude-skills](https://github.com/TechNextSG/technext-claude-skills) and updates after every job.
Big render caches stay on the PC and are left out.
