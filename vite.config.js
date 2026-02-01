import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/setupTests.js',
    css: false,
    alias: {
      '@testing-library/dom': './node_modules/@testing-library/dom/dist/index.js',
    },
  },
})
