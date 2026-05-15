import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
import pkg from './package.json';

const { publicVars, rawPublicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

// Create React App pulled the root URL from package.json
// We need to replicate this behavior for backwards compatibility
const publicUrl = pkg.homepage.startsWith('http')
  ? new URL(pkg.homepage).pathname.replace(/\/$/, '')
  : pkg.homepage.replace(/\/$/, '');

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
