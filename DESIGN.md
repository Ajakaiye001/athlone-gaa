# DESIGN.md — Athlone GAA "The Parish Roars"

## Color strategy

Full palette, four named roles. Reference: floodlit pitch at night + county-final programme paper.

| Token | OKLCH | Role |
|---|---|---|
| `--pitch` | oklch(0.30 0.075 152) | Deep grass green. Drenched hero, footer, dark sections. |
| `--pitch-deep` | oklch(0.23 0.055 152) | Floodlight vignette edges, hover states on pitch. |
| `--chalk` | oklch(0.97 0.006 130) | Chalk white. Type on pitch, chalk lines, light surfaces. |
| `--paper` | oklch(0.94 0.017 95) | Programme cream. Reading sections background. |
| `--navy` | oklch(0.24 0.05 262) | Crest navy. Contrast blocks, scoreboard, newsletter. |
| `--leather` | oklch(0.70 0.12 68) | O'Neills leather tan. Accent: hovers, live markers, underlines. |
| `--ink` | oklch(0.22 0.02 152) | Body text on paper. |

Never #000 or #fff. All neutrals tinted green or warm.

## Typography

- **Display:** Anton (Google Fonts). All-caps condensed poster type. Hero sizes via `clamp(3.5rem, 12vw, 11rem)`. Tight leading (0.9 to 1.0).
- **Body:** Archivo variable (wght 400 to 900, wdth axis). Subheads use Archivo 800 expanded caps with letterspacing.
- **Scoreboard/meta:** Spline Sans Mono for scores, dates, venue lines, tickers. Purposeful (match clock), never body copy.
- Scale ratio ≥ 1.33. Body line length ≤ 70ch.

## Signature motifs

- **Chalk line:** 3px chalk rules that draw in via `scaleX` on scroll (transform-origin left).
- **Ticker:** stadium-LED marquee strip (mono, leather-on-navy or chalk-on-pitch) looping results.
- **Duotone photos:** grayscale + green multiply overlay; flush to full colour on hover (filter + overlay opacity transition).
- **Scoreboard numbers:** big mono digits, tabular; count-up on scroll for stats.
- **Grain:** subtle SVG noise overlay on drenched sections (opacity ≤ 0.08).

## Motion

- Ease: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo family) everywhere. Durations 400 to 900ms for reveals, 150 to 250ms for hovers.
- Page load: staggered word-slam on hero headline (clip-path/translate reveals, 80ms stagger).
- Scroll reveals via IntersectionObserver adding `.is-inview`; animate transform + opacity only.
- Marquee via `transform: translateX` keyframes, `animation-play-state: paused` on hover.
- All entrance motion disabled under `prefers-reduced-motion: reduce`.

## Components

- Buttons: rectangular "programme stamp" style: 2px ink/chalk border, hard 4px shadow that collapses on press, caps mono label. No pills, no glass.
- Nav: slim bar over hero, crest + ANTON wordmark, links with chalk-underline draw on hover. Solid paper variant on inner pages.
- Fixture rows: scoreboard slabs on navy with mono digits, not cards.
- Section labels: mono caps with leading number, e.g. `01 / THE CLUB`.
