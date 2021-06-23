
require("dotenv").config();
const chai = require("chai");
const allure = require("@wdio/allure-reporter").default;
const commands = require("./support/commands.js");
const environments = require("./environments");
// const CustomReporter = require("./support/utils/customReporter");
const environment = process.env.ENV;
const applitoolsKey = process.env.APPLITOOLS_API_KEY;
const isApplitoolsEnabled = process.env.ENABLE_APPLITOOLS;
const browsers = process.env.BROWSERS || "chrome"
const user = process.env.NAME;

if(user){
  console.log(user)
}


/**
 * Dynamically add capabilities based on the BROWSERS environment variables
 * Chrome is the default if BROWSERS is not defined
 */
const baseCapabilities = [];

if(browsers?.includes("chrome")){
  baseCapabilities.push( {
    maxInstances: 5,
    browserName: "chrome",
    acceptInsecureCerts: true,
    "goog:chromeOptions": {
      args: ["--disable-infobars", "--window-size=1920,1440"],
    },
  },)
}

if (browsers?.includes("edge")) {
  baseCapabilities.push({
    browserName: "MicrosoftEdge",
    browserVersion: "91.0.864.54",
    path: "/drivers/msedgedriver",
  });
}

if (browsers.includes("safari")) {
  baseCapabilities.push({
    browserName: "safari",
    port: 4445,
  });
}

const baseService = [
  [
    "chromedriver",
    {
      logFileName: "wdio-chromedriver.log", // default
      outputDir: "driver-logs", // overwrites the config.outputDir
      args: ["--silent"],
    },
  ],
];

if (isApplitoolsEnabled) {
  baseService.push([
    "applitools",
    {
      key: applitoolsKey,
      appName: "Workshop App",
    },
  ]);
}

// Max time for single test case execution
const mochaTimeout = process.env.DEBUG ? 99999999 : 120000;
const elementTimeout = 10000;

if (!environment || !["prd", "dev"].includes(environment)) {
  console.log(
    "Please use the following format when running the test script: ENV=prd|dev"
  );
  process.exit(1);
}

exports.config = {
  // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
  // on a remote machine).
  runner: "local",
  specs: ["./tests/**/*.js"],
  suites: {
    sometest: [
      "./tests/authentication/login.test.js",
      "./tests/tipsAndTricks/basicAuthentication.test.js",
      "./tests/tipsAndTricks/multipleElements.test.js",
    ],
    authentication: [
      "./tests/authentication/*.js"
    ]
  },
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  maxInstances: 10,
  capabilities: [...baseCapabilities],
  logLevel: "error",
  bail: 0,
  baseUrl: environments[environment],
  waitforTimeout: elementTimeout,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [...baseService],
  framework: "mocha",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "report/allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
    [
      "json",
      {
        outputDir: "./report/json",
      },
    ],
    //   [CustomReporter,
    //     {
    //       name: 'My Custom Report'
    //     }
    // ]
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: mochaTimeout,
    require: [],
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  // onPrepare: function (config, capabilities) {
  // },
  /**
   * Gets executed before a worker process is spawned and can be used to initialise specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
   * @param  {[type]} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  // beforeSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {Object}         browser      instance of created browser/device session
   */
  before: function (capabilities, specs) {
    global.chai = chai;
    global.allure = allure;
    // Add commands to WebdriverIO - /
    Object.keys(commands).forEach((key) => {
      browser.addCommand(key, commands[key]);
    });
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Hook that gets executed before the suite starts
   * @param {Object} suite suite details
   */
  beforeSuite: function (suite) {
    allure.addFeature(suite.name);
  },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) starts.
   */
  beforeTest: function (test, context) {
    allure.addEnvironment("BROWSER", browser.capabilities.browserName);
    allure.addEnvironment("BROWSER_VERSION", browser.capabilities.version);
    allure.addEnvironment("PLATFORM", browser.capabilities.platform);
  },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  // beforeHook: function (test, context) {
  // },
  /**
   * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
   * afterEach in Mocha)
   */
  // afterHook: function (test, context, { error, result, duration, passed, retries }) {
  // },
  /**
   * Function to be executed after a test (in Mocha/Jasmine).
   */
  // afterTest: function(test, context, { error, result, duration, passed, retries }) {
  // },

  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  // afterSuite: function (suite) {
  // },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-json-reporter/mergeResults");
    mergeResults("./report/json", "wdio-*", "testResults.json");
  },
  /**
   * Gets executed when a refresh happens.
   * @param {String} oldSessionId session ID of the old session
   * @param {String} newSessionId session ID of the new session
   */
  //onReload: function(oldSessionId, newSessionId) {
  //}
};
