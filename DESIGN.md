# Design: The Painted Tana

Havila as a Kenyan signwriter would paint it. Saturated walls of colour, brush-lettered block type with hard drop shadows, painted scenes, price boards, and one unbroken river running through the home page from Barizi hill to the rapids and on to camp.

## Colour

Full palette. Colour owns whole sections, never just accents.

| Token | Value | Role |
|---|---|---|
| `--tana` | `#07564A` | deep river green wall, primary dark ground |
| `--leaf` | `#2FB457` | hills, secondary wall (ink text only) |
| `--marigold` | `#FFB703` | sun wall, price flashes (ink text only) |
| `--tomato` | `#F2502F` | primary action, hot wall (ink text only) |
| `--sky` | `#3CC1EE` | river line, rapids wall (ink text only) |
| `--night` | `#17144A` | camp wall |
| `--ink` | `#101E1A` | outlines, shadows, text on bright walls |
| `--lime` | `#FFF8E1` | limewash: text on dark walls, board backgrounds |

## Type

- **Bowlby One**: painted block lettering for headings and prices, always caps. Large settings carry a stacked hard shadow.
- **Oleo Script Bold**: the signwriter's flourish, one or two words per heading at most.
- **Figtree**: all reading text and controls.

## Components

- **Signboard**: bordered panel with a hard offset shadow and a slight tilt. Holds prices and short messages.
- **Price flash**: small painted tag pinned to a photo corner.
- **Painted frame**: photo with a thick ink border, hard shadow and slight rotation. Tilt settles to zero on hover.
- **Paint button**: ink border and hard shadow that presses down into its shadow on activation.
- **Wave edge**: painted wavy divider between colour walls.
- **Price board**: dotted-leader rows like a duka price list.

## Two moods

Mud by day, sheets by night. Adventure and camping use full-colour walls, tilted frames and heavy shadows. Sections marked `.calm` (rooms, Barizi, weddings) use limewash or river green, large straight photos and unshadowed lettering.

## Motion

The river is the one authored moment: the raft rides the home page river with scroll. On phones the river hugs alternating edges and crosses at each section seam, where the raft appears. Inside the hero scene, the falls run and the raft bobs. Everything else stays still apart from the press and settle states. All of it stops under `prefers-reduced-motion`.

## Rules

- Hard offset shadows are native to this world. Soft card shadows, gradients on text and glass are not.
- Photos of the real resort are never tagged. Stock photos always carry a "Sample photo" tag until replaced. Where no suitable photo exists, use a painted panel rather than a misleading stock shot.
- Unverified facts are flagged in OWNER-NOTES.md, never stated as certain.
- Text never sits on the river line on any screen size.
