import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';

const { publicVars, rawPublicVars } = loadEnv({ prefixes: ['REACT_APP_'] });
const publicUrl = process.env.PUBLIC_URL || '';

export default defineConfig({
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: 'classic',
      },
    }),
    pluginNodePolyfill(),
  ],
  html: {
    template: './public/index.html',
    templateParameters: rawPublicVars,
  },
  output: {
    distPath: { root: 'build' },
    assetPrefix: publicUrl,
  },
  source: {
    define: {
      ...publicVars,
      'process.env.PUBLIC_URL': JSON.stringify(publicUrl),
    },
  },
});
