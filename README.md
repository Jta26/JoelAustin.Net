# SolidStart + StyleX

SolidStart project with [StyleX](https://stylexjs.com) integrated for type-safe, atomic CSS-in-JS styling.

Uses Bun (lockfile + runtime compatible) + Vite + SolidJS.

## Setup

```bash
bun install
```

## Developing

```bash
bun run dev
```

## Building

```bash
bun run build
bun run preview   # or the nitro output
```

## Styling with StyleX

- Use `stylex.create()` to define styles (supports pseudo, media, etc. via nested objects)
- Apply with `{...stylex.attrs(styles.foo)}` (the `attrs` API is required for SolidJS / non-React)
- Global CSS lives in `src/app.css` (StyleX output is layered + appended)
- See `src/components/Counter.tsx` and the nav in `src/app.tsx` for live examples
- Theming: use `stylex.defineVars()` in `*.stylex.ts` files + `stylex.createTheme()`

Dev HMR for styles and production CSS extraction are fully wired via `@stylexjs/unplugin`.

## More

Everything else from the original SolidStart template applies.

## Building

Solid apps are built with _presets_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different preset, add it to the `devDependencies` in `package.json` and specify in your `app.config.js`.

## This project was created with the [Solid CLI](https://github.com/solidjs-community/solid-cli)
