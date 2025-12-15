# airquenga.github.io

# BonkWithFriends — GitHub Pages Hub

This repository is a simple static website intended for GitHub Pages. It acts as a hub for the "BonkWithFriends" mod with pages for downloads, tutorials, wiki, update status, known bugs, progress trackers, countdowns, and a UI testing playground.

How it works
- Static HTML/CSS/JS site.
- Data is stored in `data/content.json` (placeholders). Edit this file to add or change content.
- The client-side app (`app.js`) loads `content.json` and renders pages via a simple hash-based router.

Included files
- `index.html` — main SPA shell
- `styles.css` — site styling
- `app.js` — client routing and rendering
- `data/content.json` — placeholder content entries
- `ui-test.html` — (if included) UI playground (this project uses an internal route `#/ui-test`)
- `README.md` — this file

Deploying on GitHub Pages
1. Create a repository on GitHub (e.g., `AirQuenga/BonkWithFriends-site`).
2. Push these files to the repository.
3. In the repository settings → Pages, select branch `main` (or `gh-pages`) and root (or `/docs`) depending on where you put the files.
4. Wait a minute for the site to build — the site will be available at `https://<your-username>.github.io/<repo>/` (or your custom domain).

Customization tips
- Update `data/content.json` with real download links, tutorial slugs, bug entries, trackers and countdowns (use ISO 8601 timestamps).
- Replace placeholder links (`#download-*`) with GitHub release links, direct blob links, or cloud storage URLs.
- Add images/icons by placing them in an `assets/` directory and updating HTML.
- If you prefer a static generator (Jekyll / Hugo), this structure is simple enough to port.

Extending
- Add CI to auto-update `data/content.json` from issues or a database.
- Add pagination, search, authentication (for private downloads), or a server backend for dynamic bug reporting.

License & notes
- This is a starter template with many placeholders. Use it, fork it, break it. :)
- If you want, I can:
  - generate a ready-to-commit folder structure,
  - convert to Jekyll-compatible pages,
  - add a GitHub Action to auto-deploy to `gh-pages`.
