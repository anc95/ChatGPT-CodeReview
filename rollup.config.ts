import esbuild from 'rollup-plugin-esbuild';
import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'

export default defineConfig([
  {
    input: 'middleware.ts',
    output: {
      file: 'dist/middleware.js',
      format: 'esm',
      inlineDynamicImports: true,
    },
    plugins: [
      commonjs(), 
      esbuild(), 
      nodeResolve()
    ]
  },
  {
    input: 'src/bot.ts',
    output: {
      file: 'dist/lib/bot.js',
      format: 'esm',
      inlineDynamicImports: true,
    },
    plugins: [
      commonjs(), 
      esbuild(), 
      nodeResolve()
    ]
  },
  {
    input: ["api/github/webhooks/index.ts"],
    output: {
      dir: "dist/api/github/webhooks",
      format: 'esm',
    },
    plugins: [
      commonjs(), 
      esbuild(), 
      nodeResolve(),
      json()
    ]
  }
])