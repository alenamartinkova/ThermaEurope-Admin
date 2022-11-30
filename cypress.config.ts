import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://admin.thermaeurope.l/',
    setupNodeEvents (on, config) {
      // implement node event listeners here
    }
  }
})
