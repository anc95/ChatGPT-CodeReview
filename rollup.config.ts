import esbuild from 'rollup-plugin-esbuild';
import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

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
  {
    input: 'src/github-action.ts',
    output: {
      dir: 'action/',
      format: 'esm',
      inlineDynamicImports: false,
    },
    plugins: [esbuild(), nodeResolve(), commonjs(), json()],
  },
]);
