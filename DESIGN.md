# Design: River Run

Havila as a run down the river. River stone and bone, one glacier jade, poster-scale type, full-bleed photography and heavy scroll-driven motion. Real photos carry the colour.

## Colour

Restrained: neutrals plus one accent, used for action and emphasis only.

| Token | Value | Role |
|---|---|---|
| `--stone` | `#0D1312` | main dark ground, also ink on light |
| `--stone-2` | `#141B19` | second dark ground |
| `--stone-3` | `#222C29` | raised panels |
| `--bone` | `#EDE8DC` | text on dark, light sections for rooms, food and weddings |
| `--bone-dim` | `#B9B4A8` | secondary text on dark |
| `--glacier` | `#BFEBD9` | primary action and emphasis on dark (ink text on it); from the Mt. Kenya ice that feeds the Tana |
| river | `#2A7F8E` with bone dashes | the river line only |
| `--glacier-deep` | `#0E6B5C` | emphasis text and focus on bone |

## Type

- **Anton**: all headings, prices and labels, uppercase, at poster scale.
- **Figtree**: all reading text and controls.

## Photography

Images lead and words stay short. Photos sit slanted, roughly 1.5 to 5 degrees, with no frames. Real resort photos run in full colour. Stand-in sample photos carry a visible tag until replaced. Avoid stand-ins showing a pool, because the resort has not confirmed one. No cartoons or painted scenes.

## Motion

Everything is visible without JavaScript. All motion stops under `prefers-reduced-motion`.

- **The Falls (opening):** one WebGL scene, pinned. Water pours in front of the name; scrolling pushes through the falls and mist; sheets of water then wash in each offer (Raft, Ride, Paddle, Camp, Feast, Sleep, Gather). Rippled by pointer or touch. Sound is generated in the browser and opt-in only.
- **River:** one continuous road of water runs from the statement to the close, with a raft riding it as you scroll. On phones it hugs alternating edges and the raft appears at each crossing.
- **The pile:** while pinned, real photos are hurled in from the sides and land on top of each other.
- **Activity wall and photos:** thrown in at about 13 degrees from the side and landing slanted, tied to scroll in both directions. Price tags pop in.
- **Film strips:** two rows of room photos race in opposite directions and skew with scroll speed.
- **The fall:** a circular reveal takes the picture from misty day to night to campfire.
- **Everywhere:** masked headline rises, photo unveils with drift, list cascades, magnetic buttons, page-to-page wipe through view transitions.

## Rules

- Never add a second accent colour.
- Stand-in photos always carry the "Sample photo" tag until replaced.
- Unverified facts are flagged in OWNER-NOTES.md, never stated as certain.
- The planner stays fast: only its heading and small state changes animate.

## Voice

Welcome first. "Karibu" opens the home page, and copy stays short so images lead.

## Forms

The planner reads as a sentence with underlined inline fields, plus and minus steppers, photo tiles for activities and a punched ticket for the summary. Corners are soft and controls are pills. No boxed form grids.
