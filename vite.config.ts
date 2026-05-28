import { defineConfig } from "vite";
import { nitroV2Plugin as nitro } from "@solidjs/vite-plugin-nitro-2";
import stylex from "@stylexjs/unplugin";

import { solidStart } from "@solidjs/start/config";

export default defineConfig({
  plugins: [
    stylex.vite({
      useCSSLayers: true,
    }),
    solidStart(),
    nitro(),
  ],
});
