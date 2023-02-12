import esbuild from 'rollup-plugin-esbuild';
import { defineConfig } from 'rollup'

export default defineConfig([
  {
    input: 'middleware.ts',
    output: {
      file: 'dist/middleware.js',
      format: 'esm',
      inlineDynamicImports: true,
    },
    plugins: [
      esbuild()
    ]
  },
  {
    input: 'src/bot.ts',
    output: {
      dir: 'dist/lib/',
      format: 'esm',
      inlineDynamicImports: false,
    },
    plugins: [
      esbuild({include: 'src/*.ts'})
    ]
  },
  {
    input: ["api/github/webhooks/index.ts"],
    output: {
      dir: "dist/api/github/webhooks",
      format: 'esm',
    },
    plugins: [
      esbuild(),
    ]
  }
])