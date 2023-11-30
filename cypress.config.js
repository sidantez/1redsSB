const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 15000,
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com/",
    //testIsolation: false, //only when running cypress\e2e\ritter-magento\E2E - Happy Path.cy.js
    env: {
      username: "ritter@tester.com",
      password: "Sanber51",
      uneg: "testnoaddress@tester.com",
      pasneg: "Test2023!"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

  },
  experimentalStudio: true
});
