import { onMount } from "solid-js";

/**
 * Client-only component that enables StyleX HMR / CSS reloading in development.
 * Imports the virtual runtime module which keeps styles in sync on file changes.
 */
export default function StyleXDev() {
  onMount(() => {
    if (import.meta.env.DEV) {
      // @ts-expect-error - virtual module provided by @stylexjs/unplugin in dev
      void import("virtual:stylex:runtime");
    }
  });
  return null;
}
