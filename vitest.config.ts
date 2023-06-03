import { defineConfig } from 'vitest/config'
import { alias } from './alias'

export default defineConfig({
  root: '.',
  test: {
    globals: true,
  },
  esbuild: {
    tsconfigRaw: '{}',
  },
  resolve: {
    alias,
  },
})
