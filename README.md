# JoelAustin.net

Personal bio site for Joel Austin, a frontend software engineer.

The site is being built around a polished 2000s Asian tech MMO mood: cool blues, dark chrome, luminous panels, precise motion, and an interface that feels quietly alive. The visual direction is Aetheric: airy, technical, translucent where useful, and made from light, signal, glass, and atmosphere.

## Stack

- Bun
- Vite
- React
- TypeScript
- StyleX

## Current Status

This repository currently contains the build foundation for the site:

- Vite + React + TypeScript
- StyleX configured through `@stylexjs/unplugin`
- Bun scripts for development, build, preview, and lint
- A minimal React mount screen used to verify the toolchain

The full website experience has not been built out yet.

## Design System

The project design system is called Language UI, or LUI. Reusable components should use the `LUI` prefix, such as `LUIButton`.

Shared colors live in `src/styles/theme.stylex.ts` as StyleX theme variables. The active theme is `languageUITheme`.

## Development

Install dependencies:

```sh
bun install
```

Start the dev server:

```sh
bun dev
```

Build for production:

```sh
bun run build
```

Run linting:

```sh
bun run lint
```
