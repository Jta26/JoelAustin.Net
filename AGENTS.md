# JoelAustin.net

## Project Vision

Build a personal bio website for a frontend software engineer with a 2000s Asian tech MMO atmosphere. The north star is the feeling of logging into a polished lobby screen from games like Phantasy Star Online, Aion Online, and Flyff: cool blues, dark chrome, luminous panels, precise motion, and a sense that the interface is quietly alive.

The design should be Aetheric in nature: luminous, airy, technical, and slightly otherworldly. It should feel like an interface made from light, signal, glass, and atmosphere rather than heavy machinery or fantasy ornament.

This repository is currently boilerplate only. Do not build out the website experience until that work is explicitly requested.

## Technical Stack

- Runtime and package manager: Bun
- Build tool and development server: Vite
- Framework: React
- Language: TypeScript
- Styling: StyleX

## Design Direction

- Dark mode is the default and should feel native, not like an inverted light theme.
- Cool blues are the primary color family, with restrained cyan, white, and metallic accents.
- The overall visual language is Aetheric: ethereal, high-tech, translucent where useful, and tuned for a sense of calm energy.
- Motion should feel fluid and technical: fades, wipes, shimmer passes, scan transitions, and view transitions.
- Sound effects are part of the intended experience, but must be subtle, optional, and initiated only after user interaction.
- The site should feel like a refined MMO interface, not a literal game clone. Avoid copyrighted logos, characters, UI screenshots, and direct asset imitation.

## Language UI

Language UI, abbreviated as LUI, is the name of the design system for this project. Components prefixed with `LUI`, such as `LUIButton`, belong to that design system and should be built as reusable primitives rather than one-off page elements.

The active StyleX theme is `languageUITheme`, defined in `src/styles/theme.stylex.ts` with `stylex.defineVars` and `stylex.createTheme`. Do not use site-specific theme names such as `techMmoTheme`; theme naming should reflect the Language UI design system.

The current color tokens are:

- `primaryBlue`
- `secondaryBlue`
- `darkSurfaceBackground`
- `primaryTextColor`
- `secondaryTextColor`
- `onMediaTextColor`

## Implementation Notes

- Keep StyleX as the styling source of truth. Avoid adding Tailwind, CSS modules, styled-components, or other styling systems unless the project direction changes.
- Use `colorVars` from `src/styles/theme.stylex.ts` for shared design-system colors instead of repeating hard-coded theme colors in components.
- Prefer small, composable React components with explicit TypeScript types.
- Use Vite conventions for app entrypoints and routing decisions. If routing grows beyond a single page, choose the smallest routing layer that fits the site.
- Honor `prefers-reduced-motion` for major transitions and ambient animation.
- Treat audio as progressive enhancement. The site must work silently and should never autoplay sound.
- Use real bitmap or generated visual assets when the design phase begins; avoid placeholder-heavy layouts.

## Current Scope

The current project contains only the build foundation:

- Vite + React + TypeScript
- StyleX configured through `@stylexjs/unplugin`
- Bun scripts for development, build, preview, and lint
- A minimal React mount screen used only to verify the toolchain

Future agents should preserve this scope unless the user asks to start designing or implementing the actual site.
