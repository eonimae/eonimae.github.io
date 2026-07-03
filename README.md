# eonimae.github.io

Static personal website for Camilo Fuentes Peña / eonimae.

## Project scope

This repository is intended to publish a static editorial website at:

`https://eonimae.github.io`

The site is deliberately simple:

- plain HTML;
- plain CSS;
- minimal JavaScript;
- local assets only;
- no build tools;
- no frameworks;
- no backend;
- no database;
- no CMS;
- no required external services.

## Current structure

```text
eonimae.github.io/
├─ index.html
├─ css/
│  └─ styles.css
├─ js/
│  └─ main.js
├─ assets/
│  ├─ images/
│  ├─ documents/
│  └─ icons/
├─ REFERENCE_DUMP.md
└─ README.md
```

## V1 sections

- Home / About
- Analytical Writing
- AI Technical Work
- Workshops
- Narrative Work
- Contact / Footer

## Editorial constraints

BOF must be presented with the corrected, limited framing:

> "Es un bucle de refinamiento iterativo con juez basado en modelo, que corre en
> tiempo de ejecucion: un sistema de generacion de texto donde un modelo escribe,
> otro evalua, y el texto se reescribe segun ese resultado hasta un maximo de
> intentos o hasta cruzar un umbral."

Do not present BOF as a general reusable framework, model training method, model
modification method, objective evaluator, or broad behavioral orchestration claim.

## Maintenance

Open `index.html` directly in a browser for local review. No installation step is
required.

## Current V1 scaffold

The current scaffold includes:

- semantic single-file HTML;
- primary navigation that switches visible in-page views;
- Home / About hero area;
- `What I do` placeholder grid;
- reusable work cards;
- accessible expandable card details;
- light/dark theme toggle saved in `localStorage`;
- responsive layout for desktop, tablet, and mobile.

All missing publication, workshop, narrative, contact, and external-link details
are intentionally marked as placeholders until final content is supplied.
