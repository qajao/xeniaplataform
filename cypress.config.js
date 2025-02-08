const { defineConfig } = require('cypress');

require('dotenv').config()

module.exports = defineConfig({
    viewportHeight: 1080,
    viewportWidth: 1920,
    env: { ...process.env },
    e2e: {
        baseUrl: 'https://app.xenia.team/',
        defaultCommandTimeout: 10000,
        requestTimeout: 15000,
        pageLoadTimeout: 60000,
        // eslint-disable-next-line
        setupNodeEvents(on, config) {
        },
    },
})