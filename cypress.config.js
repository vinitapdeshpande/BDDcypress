const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { preprocessor } = require("@badeball/cypress-cucumber-preprocessor/browserify");

// import  allureWriter from '@shelex/cypress-allure-plugin/writer'
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
async function setupNodeEvents(on, config) {
 
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);
  
  on("file:preprocessor", preprocessor(config));
  on('before:run', async (details) => {
    console.log('override before:run');
    await beforeRunHook(details);
  });
 
  on('after:run', async () => {
    console.log('override after:run');
    await afterRunHook();
  });
  // require('cypress-mochawesome-reporter/plugin')(on);
  return config;
  // Make sure to return the config object as it might have been modified by the plugin.
 
}
 
module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    reporter: 'cypress-mochawesome-reporter',
 
 
 
    baseUrl: "https://calculator.net",
    screenshotOnRunFailure: true,
    video: true,
    trashAssetsBeforeRuns: true,
    specPattern: "./cypress/e2e/features/*.feature",
    env:
    {
      allureReuseAfterSpec: true
    }
 
  },
});