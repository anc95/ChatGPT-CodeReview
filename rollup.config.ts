import { defineConfig } from 'rollup';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const esbuild = require('rollup-plugin-esbuild').default;
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

export default defineConfig([
  {
    input: 'middleware.ts',
    output: {
      file: 'dist/middleware.js',
      format: 'esm',
      inlineDynamicImports: true,
    },
    plugins: [esbuild(), commonjs(), nodeResolve()],
  },
  {
    input: 'src/bot.ts',
    output: {
      dir: 'dist/lib/',
      format: 'esm',
      inlineDynamicImports: false,
    },
    plugins: [esbuild({ include: 'src/*.ts' })],
  },
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/',
      format: 'esm',
      inlineDynamicImports: false,
    },
    plugins: [esbuild()],
  },
  {
    input: ['api/github/webhooks/index.ts'],
    output: {
      dir: 'dist/api/github/webhooks',
      format: 'esm',
    },
    plugins: [esbuild()],
  },
]);
