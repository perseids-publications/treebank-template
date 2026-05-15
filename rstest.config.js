import { defineConfig } from '@rstest/core';
import { withRsbuildConfig } from '@rstest/adapter-rsbuild';

export default defineConfig({
  extends: withRsbuildConfig(),
  globals: true,
  testEnvironment: 'jsdom',
  setupFiles: ['./src/setupTests.js'],
  include: ['**/*.test.js'],
  source: {
    define: {
      'process.env.PUBLIC_URL': JSON.stringify('https://www.example.com'),
    },
  },
});
