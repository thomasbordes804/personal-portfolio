# Thomas Bordes — portfolio

A single-page personal site built from the `AI Engineer Portfolio Design` handoff.
Plain HTML + CSS, no build step and no dependencies — open `index.html` or drop the
folder on any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

```
index.html                     the whole page
styles.css                     design tokens + layout
.claude/launch.json            local preview config (safe to delete)
assets/
  Thomas-Bordes-CV.pdf         résumé linked from the hero button
  favicon.svg
  logos/                       company logos, 48×48 slots in the experience list
    bnp-paribas.svg            Wikimedia Commons, public domain
    danone.png                 Wikimedia Commons, CC BY-SA 4.0 (mark cropped from the vertical lockup)
    onevisage.png              onevisage.com site icon
    orange.svg                 Wikimedia Commons, public domain
  tech/                        stack icons on the project cards — Simple Icons (CC0),
                               recoloured to each brand's official hex
  projects/                    project card images, 760×320 (2× the 380×160 card slot)
```

## Running it locally

Any static server works; opening the file directly does too.

```bash
python -m http.server 8000
```

## Design reference

Tokens, spacing and copy come from `design_handoff_ai_engineer_portfolio/`:
accent `#FF5A36`, ink `#1A1A1A`, hairline `#F0EDE8`, work section `#FAF7F3`,
Manrope for text and JetBrains Mono for labels. The mock was desktop-only;
breakpoints at 980px (two columns) and 640px (single column) were added here, along
with the per-card tech icon row, which the original handoff did not specify.

## Where the project images came from

Most cards use a figure committed to the matching GitHub repo, so what a visitor sees
is the project's own output:

| Card | Image |
|---|---|
| Graph-Based RAG for Finance | knowledge-graph indexing diagram, `results/figures/architecture/` |
| HeronDetector | detection screenshot, `docs/imgs/heron.png` |
| ArtsParadise — Choir Website | screenshot of the live site at choir-website.vercel.app |
| Meeting Action Recognition | per-person action detection figure, `docs/images/` |
| Multi-Robot Fleet Control | formation topology graph, `figures/` |
| IMU Attitude Estimation | roll/pitch/yaw diagram, `images/` |
| Relational Database Designs | coworking-space UML class diagram |
| Neural Amp Modeler | the upstream NAM Trainer interface |

Two repos ship no usable image, so `ecocup-detection.svg` and `crocomine.svg` are
diagrams drawn for this site in the portfolio palette, illustrating what each README
describes — a sliding-window pass versus a YOLOv5x pass, and a Crocomine board whose
cell is proved safe when the SAT solver returns UNSAT.

## Adding a project

Copy any `<article class="project">` block in `index.html`. The card image should be
760×320; drop it in `assets/projects/`. Photographs and screenshots take
`class="is-photo"` on the `<img>` so they crop full-bleed — everything else is
letterboxed on a white canvas so diagrams are never clipped at narrow widths.
