```markdown
# BonkWithFriends — Jekyll GitHub Pages Hub

This repository is a Jekyll-compatible static site template for the BonkWithFriends mod. It uses Liquid templates and a JSON data file so GitHub Pages can build the site directly.

What I changed
- Converted the original single-page app into Jekyll pages:
  - index.html, downloads.html, tutorials.html, wiki.html, status.html, bugs.html, ui-test.html
- Moved the data into `_data/content.json` and rendered pages with Liquid loops.
- Created a Jekyll layout (`_layouts/default.html`) and packaged styles & JS under `assets/`.
- Kept client-side JS minimal (progress bar animation and countdown clock) so the site is fully functional after the GitHub Pages build.

How to use
1. Create a repository on GitHub (e.g. `AirQuenga/BonkWithFriends-site`).
2. Push these files to the repository root on the `main` branch.
3. In the repository Settings → Pages, make sure you build from `main` branch and root.
4. GitHub Pages will run Jekyll and publish the site. Pages will read `_data/content.json` at build time.

Editing content
- Edit `_data/content.json` to add or modify downloads, tutorials, wiki, updates, bugs, trackers, and countdowns.
  - Use ISO 8601 timestamps for countdowns (e.g. `2026-01-07T18:00:00Z`).
- For richer wiki/tuts you can instead create Jekyll collections and link to them, but the JSON approach keeps the starter simple.

Optional next steps I can help with
- Add a Jekyll collection for tutorials/wiki to have dedicated pages for each entry.
- Add a GitHub Action to auto-deploy to `gh-pages` branch.
- Replace emojis with SVG icons, or add Light/Dark theme toggle with persisted preference.
- Add a small script to sync GitHub Issues into the Known Bugs list.

If you want I can produce a ready-to-commit ZIP of the repo tree next.
```
