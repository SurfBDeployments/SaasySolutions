import { defineConfig } from 'vitest/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['app/tests/**/*.test.ts', 'app/tests/**/*.test.tsx'],
    setupFiles: ['./vitest.setup.ts'],

  },
  plugins: [
    tailwindcss(),
  ],
})





