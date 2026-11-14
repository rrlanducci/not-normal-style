# Not Normal Style

Production website for **Not Normal Style**, Personal Image Consulting by Camila Rades.

- Live site: https://notnormalstyle.com/
- Hosting: GitHub Pages
- Custom domain: configured through the root `CNAME` file
- Consultation form delivery: Formspree

## Site pages

- `index.html` — homepage
- `about.html` — biography and working philosophy
- `services.html` — services catalogue and Service Navigator
- `style-quiz.html` — Style Discovery questionnaire and result
- `consultation.html` — consultation form and FAQ
- `privacy.html` — privacy policy
- `thank-you.html` — form confirmation page
- `404.html` — custom error page

## Project structure

```text
css/
  styles.css                Main site and page styling
  layout-system.css         Approved responsive layout layer
  style-quiz.css            Style Discovery component styles
  service-navigator.css     Service Navigator styles
  consultation-faq.css      Consultation FAQ styles

js/
  main.js                   Shared navigation, consultation and form behaviour
  style-quiz.js             Style Discovery logic
  service-navigator.js      Service recommendation logic

images/                     Production image assets
```

## Run locally

From the repository root:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/` in a browser.

Do not open the HTML files directly from Finder for final testing. A local server more closely matches production paths and browser behaviour.

## Development workflow

Before making changes:

```bash
git status --branch --short
git pull --ff-only origin main
```

After making changes:

```bash
git diff --check
git diff --stat
```

Review the checklist in `MAINTENANCE.md`, then commit and push:

```bash
git add <approved-files>
git commit -m "Describe the change"
git push origin main
```

## Important integrations

### GitHub Pages and custom domain

The root `CNAME` file is part of the GitHub Pages custom-domain configuration. Do not remove or rename it during content or design changes.

### Consultation form

`consultation.html` submits to the configured Formspree endpoint. Changes to field names, validation, required fields, submission handling or the success dialog must be tested end to end.

### Style Discovery

`style-quiz.html`, `css/style-quiz.css` and `js/style-quiz.js` work together. Preserve the IDs and classes used by JavaScript when changing the visual structure.

### Service Navigator

`services.html`, `css/service-navigator.css` and `js/service-navigator.js` work together. Service titles used by JavaScript must continue to match the corresponding Services accordion headings.

## Files not to commit

The repository ignores local and generated artefacts such as `.DS_Store`, Python cache files, temporary backup directories and generated audit reports. Do not commit local installers, Lighthouse exports or temporary screenshots unless they are deliberately being preserved as project documentation.

## Deployment

The production site is published from the `main` branch. After pushing, verify the live pages and allow time for GitHub Pages to publish the new commit.
