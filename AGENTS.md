# Nazux

## Stack

Nazux builds on Next.js for the front end and Python for the back end and scripts.

This repository is the nazux.com home page. It is a Next.js app with `output: 'export'`, deployed to GitHub Pages. This repo has no Python service yet. Put new back-end code and scripts in Python, not in the Next.js app.

## Commands

- `npm ci` installs dependencies from the lockfile.
- `npm run dev` starts the local site.
- `npm run build` writes the static site to `out/` and copies `CNAME` into that folder.

## GitHub Pages

The custom domain is nazux.com. Keep the `CNAME` file at the repository root. The build copies it into `out/` so the deployed site keeps the domain. `.github/workflows/pages.yml` builds the export and deploys that folder. Do not set a `basePath`; the site is served from the domain root.

In the repository settings, Pages source must be GitHub Actions so this workflow is what publishes the site.

## Brand

Colours:

- Navy, darkest: `#172647`
- Navy: `#233b6e`
- Navy accent: `#2f5095`
- Light grey: `#d3d6db`, `#eff0f2`, `#eff0f4`

Logo:

The mark is a horizontal lockup on a dark navy gradient from `#172647` to `#233b6e`. On the left, a light grey (`#d3d6db` / `#eff0f4`) rounded square holds a dark navy hand-drawn N. On the right, the lowercase wordmark `nazux` is a rounded light grey sans-serif. There is no slogan.

The Looka logo files are not purchased, so there is no official SVG or PNG. Recreate the mark in HTML, CSS, or inline SVG. Do not embed the Looka editor screenshot. The Looka font name is unknown; this site uses Nunito. Quicksand or Varela Round are acceptable stand-ins.
