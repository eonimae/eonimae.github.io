# eonimae.github.io

Static personal website for Camilo Fuentes Peña / eonimae.

The site is published at:

`https://eonimae.github.io`

## Technical scope

The project uses:

- HTML;
- CSS;
- minimal JavaScript;
- local assets;
- no frameworks;
- no build tools;
- no backend;
- no database;
- no CMS.

## Public tracked structure

```text
eonimae.github.io/
├─ index.html
├─ css/
│  └─ styles.css
├─ js/
│  └─ main.js
├─ assets/
│  └─ images/
│     ├─ chompipe.png
│     ├─ mapache.png
│     ├─ robot.png
│     └─ robot2.png
├─ .gitignore
└─ README.md
```

The `docs/` directory contains internal working materials. It remains local only
and is excluded from publication through `.gitignore`.

## Navigation

- Home
  - Bio
- Narrative Work
  - Novel
  - Visual Narrative
  - Narrative Inquiry
  - Narrative Protocols
- Analytical Writing
  - Analytical pieces
  - Technical pieces
  - AI Model Probes
- Workshops
- Contact

## Site behavior

The current site includes:

- hash-based navigation between internal views;
- light/dark mode saved in `localStorage`;
- platform filters in Analytical pieces;
- Workshops accordion sections;
- active/inactive card interaction across multi-card sections;
- keyboard support for navigation and interactive cards;
- responsive layout;
- `prefers-reduced-motion` support;
- external links opened with `target="_blank"` and `rel="noopener noreferrer"`.

## Workflow

Website changes should follow this order:

1. implement changes locally;
2. review visually and functionally with Camilo;
3. wait for explicit approval;
4. stage only the approved files;
5. commit and push after approval.

Never use `git add .`. Internal working materials, including `docs/`, must not
be published.
