# Portfolio — Aachal Pandey

A clean, minimal, responsive portfolio website with subtle animations and a simple MVP-style structure.

## Preview

- Fastest: open `index.html` in your browser.
- Recommended (better module loading): use a local server (e.g., VS Code Live Server) and open `/index.html`.

## Structure (MVP-style)

- `src/model/portfolioData.js` — content/data (Model)
- `src/view/render.js` — DOM rendering helpers (View)
- `src/presenter/app.js` — binds model → view (Presenter)
- `src/ui/motion.js` — scroll reveal + subtle parallax
- `src/main.js` — app entry

## Customize

- Update your LinkedIn/GitHub URLs in `src/model/portfolioData.js`.
- Edit projects/experience/skills in `src/model/portfolioData.js`.
