# Website maintenance checklist

Use this checklist for content, design, accessibility and interaction changes.

## Before editing

- [ ] Run `git status --branch --short` and confirm the working tree is clean.
- [ ] Run `git pull --ff-only origin main`.
- [ ] Identify every HTML, CSS and JavaScript file involved in the component.
- [ ] Confirm whether the change affects shared navigation, footer, forms or responsive layouts.
- [ ] Start a local server with `python3 -m http.server 8000`.

## Visual regression checks

Test representative widths rather than a single device:

- [ ] 375 px phone
- [ ] 430 px large phone
- [ ] 768 px tablet portrait
- [ ] 1024 px tablet landscape or small computer
- [ ] 1366 px computer
- [ ] 1600 px wide computer

At each relevant width, check:

- [ ] No horizontal scrolling.
- [ ] Header and footer alignment.
- [ ] First heading and page-introduction alignment.
- [ ] Natural text wrapping with no overlaps or clipped content.
- [ ] Buttons and links remain visible and usable.
- [ ] Images preserve their intended crop and proportions.

## Shared navigation

- [ ] Desktop navigation links work.
- [ ] Mobile menu opens, closes and reports the correct expanded state.
- [ ] Services submenu opens, closes and remains keyboard accessible.
- [ ] Current-page navigation state is correct where used.

## Homepage and About

- [ ] Homepage hero image loads as WebP with JPEG fallback.
- [ ] Homepage sections retain the approved visual sequence and spacing.
- [ ] About portrait, quotation and chapter grids remain aligned.

## Services

- [ ] Service Navigator progresses through both questions.
- [ ] Recommendation links to the intended service.
- [ ] Service accordions open and close correctly.
- [ ] Direct fragment links position the service below the sticky header.
- [ ] Service titles still match the strings used by `js/service-navigator.js`.

## Style Discovery

- [ ] The page contains one page-level `h1`.
- [ ] Start, Back, Next, Reveal and Restart controls work.
- [ ] Selecting an answer preserves the selection when moving backwards.
- [ ] Each next question is positioned below the header.
- [ ] Seven desktop choices retain the approved 4 + centred 3 composition.
- [ ] The result begins at its top rather than in the middle.
- [ ] Continue to Consultation opens the Consultation page at the top.

## Consultation

- [ ] Required-field validation works.
- [ ] Email confirmation mismatch is reported.
- [ ] Checkbox and radio-style choices are keyboard usable.
- [ ] Privacy acknowledgement and Privacy Policy link work.
- [ ] Formspree submission reaches the configured destination.
- [ ] Success dialog opens, receives focus, closes and restores focus appropriately.
- [ ] FAQ questions open and close correctly.
- [ ] Published response-time and privacy wording remain consistent across the form, FAQ, success dialog and Privacy Policy.

## Other pages and assets

- [ ] Privacy page remains readable with the approved compact prose rhythm.
- [ ] Thank-you page works and remains `noindex`.
- [ ] A nonexistent live URL displays `404.html`.
- [ ] Favicons, manifest and social-preview image still resolve.
- [ ] `robots.txt` and `sitemap.xml` remain available.

## Accessibility checks

- [ ] Navigate the changed experience using Tab and Shift + Tab.
- [ ] Test Enter, Space and Escape where applicable.
- [ ] Focus is visible and follows a logical order.
- [ ] Interactive controls have an accessible name.
- [ ] Form fields retain labels and error associations.
- [ ] Heading levels remain logical and do not skip unnecessarily.
- [ ] Decorative images use empty alternative text; meaningful images retain useful alternative text.
- [ ] Test browser zoom at 200% for changed pages.
- [ ] Respect reduced-motion behaviour.

## Before committing

```bash
git diff --check
git diff --stat
git status --short
```

- [ ] Review the complete diff.
- [ ] Remove local installers, generated reports and screenshots.
- [ ] Stage only production files and intentional documentation.
- [ ] Use a concise commit message describing the user-visible or maintenance change.

## After pushing

```bash
git status --branch --short
git log -1 --oneline --decorate
```

- [ ] Confirm local `main` and `origin/main` are synchronised.
- [ ] Verify the changed live pages after GitHub Pages publishes the commit.
- [ ] Test the exact interaction changed in production.
- [ ] If the deployment is incorrect, revert with Git rather than creating local backup folders.
