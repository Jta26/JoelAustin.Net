import * as stylex from "@stylexjs/stylex";

export const luiWipeTimingDurations = {
  brisk: 420,
  chunky: 1400,
  deliberate: 760,
  fluid: 560,
  precise: 500,
} as const;

export type LUIWipeTiming = keyof typeof luiWipeTimingDurations;

export const luiWipeCurves = stylex.create({
  brisk: {
    "--lui-wipe-duration": "420ms",
    "--lui-wipe-easing": "cubic-bezier(.2, .76, .18, 1)",
  },
  chunky: {
    "--lui-wipe-duration": "1400ms",
    "--lui-wipe-easing":
      "linear(0, .1 4%, .3 9%, .55 16%, .72 26%, .83 40%, .9 58%, .95 76%, .985 92%, 1)",
  },
  deliberate: {
    "--lui-wipe-duration": "760ms",
    "--lui-wipe-easing": "cubic-bezier(.14, .82, .22, 1)",
  },
  fluid: {
    "--lui-wipe-duration": "560ms",
    "--lui-wipe-easing": "cubic-bezier(.16, .84, .22, 1)",
  },
  precise: {
    "--lui-wipe-duration": "500ms",
    "--lui-wipe-easing": "cubic-bezier(.18, .72, .28, 1)",
  },
});
