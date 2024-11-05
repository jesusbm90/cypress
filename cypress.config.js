const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://todomvc.com/examples/react/dist/',
    viewportHeight: 1080,
    viewportWidth: 1920,
    waitForFileChanges: false,
  },
});
