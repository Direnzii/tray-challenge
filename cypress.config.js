const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1330,
  viewportHeight: 860,
  e2e: {},
  defaultCommandTimeout: 4000,
});
