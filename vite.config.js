import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import checker from 'vite-plugin-checker'
import i18n from 'laravel-react-i18n/dist/vite'

export default defineConfig({
  plugins: [
    checker({
      typescript: true
    }),
    laravel({
      input: ['resources/js/app.tsx'],
      refresh: true
    }),
    i18n()
  ],
  css: {
    devSourcemap: true
  }
})
