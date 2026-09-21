import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['app/tests/**/*.test.ts', 'app/tests/**/*.test.tsx'],
    setupFiles: ['./vitest.setup.ts'],
  },
})



