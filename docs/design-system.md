# ShadowTech Design System

This file defines the visual and interaction rules for keeping the mobile app consistent. The current code source of truth is `packages/ui/src/theme.ts` and `packages/ui/src/components.tsx`; this document explains the intended direction those tokens and components should follow.

For AI-assisted design or UI execution, start with `docs/product-design-ai-prompt.md`, then use this file as the design-system reference.

## Design Intent

ShadowTech should feel like a calm daily speech coach: focused, private, encouraging, and easy to return to every day.

The Mindvalley and Vocabulary references have useful shared patterns:

- One clear focus per screen.
- Generous empty space around the main task.
- Soft backgrounds and muted surfaces.
- Rounded, friendly controls.
- Large, confident primary actions.
- Progress shown as reassurance, not pressure.
- Minimal visual noise around learning content.

For this app, adopt the calm structure, not a direct visual copy. Avoid making the product feel like a media catalog, academic dictionary, or gamified dashboard.

## Color

Use warm neutrals as the base, teal as the brand anchor, and coral only as a small warmth accent.

Current light theme tokens:

| Token | Value | Usage |
| --- | --- | --- |
| `background` | `#FAFAF7` | App background, quiet off-white canvas |
| `surface` | `#FFFFFF` | Cards, panels, bottom nav |
| `surfaceMuted` | `#F3F5F2` | Pills, selected states, soft input surfaces |
| `border` | `#D8DFDA` | Low-contrast separators only |
| `textPrimary` | `#1F2933` | Main text |
| `textSecondary` | `#667085` | Descriptions and secondary metadata |
| `textMuted` | `#8A9691` | Disabled or low-priority labels |
| `primary` | `#0F766E` | Brand actions, primary buttons, selected states, progress |
| `accent` | `#F9735B` | Rare warmth accent for highlights, streak details, and celebratory moments |
| `success` | `#22C55E` | Confirmations and completed states |
| `warning` | `#F59E0B` | Streaks and caution states |
| `danger` | `#DC2626` | Destructive or error states |

Rules:

- Prefer white/off-white screens with one strong accent at a time.
- Teal owns the main UI hierarchy: primary CTAs, active states, progress, and key navigation cues.
- Coral is a 5% color. Keep it visible enough to add warmth, but never let it compete with the main practice task.
- Reduce heavy borders. Use spacing and soft surfaces before outlines.
- Keep success, warning, and danger semantic. Do not use them as decoration.
- Do not use coral for primary buttons, navigation active states, large hero backgrounds, or repeated badges.
- If the coral feels too sharp in implementation, soften it toward `#F28B74` and use a pale tint such as `#FFF1ED` for surfaces.
- Avoid purple-heavy gradients as a default brand style. They can be used only for rare premium/audio moments if the product direction changes.

## Typography

Recommended app font: **Nunito Sans**.

Fallback until the font is installed: system sans-serif.

Why Nunito Sans:

- Rounded enough to feel warm.
- Clear enough for coaching, instructions, and feedback.
- Less corporate than Inter.
- More appropriate for speech practice than a serif-first system.

Type scale:

| Role | Size | Weight | Line height | Usage |
| --- | ---: | ---: | ---: | --- |
| Display practice | 34-40 | 700-800 | 42-48 | Main phrase, current sound, focused practice prompt |
| Title | 30 | 700 | 36 | Screen title |
| Subtitle | 20 | 700 | 28 | Section and card heading |
| Body | 16 | 400-500 | 24 | Instructions, descriptions, transcript lines |
| Caption | 13 | 600-700 | 18 | Metadata, labels, small progress text |

Rules:

- Use the display practice style only when the screen has one central learning object.
- Do not use the Vocabulary reference serif as the default UI font.
- Keep body text readable and relaxed; avoid tight line heights.
- Use bold text for hierarchy, not for every label.

## Layout

Spacing tokens:

| Token | Value | Usage |
| --- | ---: | --- |
| `xs` | 4 | Tight text/icon relationships |
| `sm` | 8 | Small gaps inside compact controls |
| `md` | 16 | Standard internal padding |
| `lg` | 24 | Section spacing |
| `xl` | 32 | Major screen spacing |

Rules:

- Mobile screen padding should generally be 20-24.
- Important practice screens should have more vertical breathing room than dashboard screens.
- Avoid stacking too many cards. If a screen feels dense, convert repeated cards into softer rows, chips, or a single focused practice panel.
- Place the primary action near the bottom when it completes or starts a practice task.

## Shape And Elevation

Current radii:

| Token | Value | Usage |
| --- | ---: | --- |
| `sm` | 6 | Small chips only |
| `md` | 8 | Compact cards and inputs |
| `lg` | 12 | Panels and nav containers |
| `pill` | 999 | Buttons, badges, progress capsules |

Rules:

- Primary CTAs should trend toward pill shapes.
- Inputs, option rows, and compact panels can use 8-12 radius.
- Use shadows sparingly. The app should feel soft, not floating.
- Prefer one elevated surface per screen section.

## Components

### Screen

- Uses the theme background.
- Keeps content readable and uncluttered.
- On focused practice screens, reduce navigation and secondary controls.

### AppText

- Must use the shared text variants instead of one-off font sizes where possible.
- Practice phrases may add a display override when needed.

### Card

- Use for meaningful grouped content, not every row.
- Cards should usually contain one concept: lesson, progress proof, recording, or setup step.
- Avoid nested cards.

### PrimaryButton

- One primary action per screen section.
- Use teal (`primary`) for the default primary button color.
- Default label should be concrete: `Start shadowing`, `Complete lesson`, `Save setup`.
- Prefer pill radius for major actions.

### SecondaryButton

- Use for alternate actions and navigation.
- Keep secondary actions visually quieter than the primary action.

### Badge And Chips

- Use badges for status and category.
- Use chips for drills, sounds, tags, and synonyms.
- Chips should be soft, readable, and low-pressure.
- Use coral badges sparingly for celebratory or warm emphasis only. Do not make every lesson card carry a coral badge.

### BottomNav

- Keep it quiet and predictable.
- Active state should be obvious without using a loud fill.
- Avoid adding too many destinations.

## Practice Screen Pattern

Use this pattern for shadowing, sound drills, and daily speech practice:

1. Top: small progress or context pill.
2. Center: one phrase, sound, or instruction.
3. Under center: pronunciation, duration, or feedback hint.
4. Lower middle: small action icons or chips.
5. Bottom: one strong primary action.

This mirrors the calm focus of the Vocabulary practice screens while staying appropriate for speech coaching.

## Content Tone

The product should sound private, specific, and encouraging.

Use:

- `Practice focus`
- `Start shadowing`
- `Today's phrase`
- `Overall clarity`
- `Try this sound again`
- `Private progress`

Avoid:

- Overly playful streak pressure.
- Long explanatory blocks on first view.
- Vague CTAs like `Go`, `Next`, or `Submit`.
- Public/social pressure around recordings.

## Accessibility

- Body text should stay at 16px or larger.
- Tap targets should be at least 44px high and wide.
- Do not communicate state with color alone.
- Keep contrast high for text on teal, coral, and muted surfaces.
- Do not place white text on coral. Use dark text on coral, or use a pale coral surface with primary text.
- Support long labels by allowing wrapping instead of shrinking text aggressively.
- Important practice controls should be reachable near the lower half of the screen.

## Implementation Notes

Near-term consistency work:

- Add the `pill` radius concept to the shared theme.
- Move one-off text sizing into shared text variants where practical.
- Install and load Nunito Sans before setting it as the default font.
- Change `PrimaryButton` to use teal by default; keep coral available only through explicit accent styling.
- Reduce border-heavy cards in practice-heavy flows.
- Create a reusable focused practice layout before building more drill screens.

Do not introduce a new visual dependency just for decoration. Add icon, image, gradient, or font packages only when the feature needs them and the app can use them consistently.
