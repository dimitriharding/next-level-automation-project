'use strict';

const {
  VisualGridRunner,
  RunnerOptions,
  Eyes,
  Target,
  Configuration,
  BatchInfo,
  BrowserType,
  DeviceName,
  ScreenOrientation
} = require('@applitools/eyes-webdriverio');

let eyes;
let runner;
let configuration;

describe('QW Demo Store Visual Tests', function () {

  before(() => {
    // Create a runner with concurrency of 5
    // You can increase this value if your plan supports a higher concurrency

    const runnerOptions = new RunnerOptions().testConcurrency(5);

    runner = new VisualGridRunner(runnerOptions);

    // Create Eyes object with the runner, meaning it'll be a Visual Grid eyes.

    eyes = new Eyes(runner);

    if (browser.config.enableEyesLogs) {
      eyes.setLogHandler(new ConsoleLogHandler(true));
    }

    // Initialize the eyes configuration

    configuration = eyes.getConfiguration();

    // use new Configuration() when not setting eyes setter methods. e.g. eyes.setLogHandler() etc...
    // new Configuration();

    // You can get your api key from the Applitools dashboard

    configuration.setApiKey(process.env.APPLITOOLS_API_KEY)

    // create a new batch info instance and set it to the configuration

    configuration.setBatch(new BatchInfo('Workshop Batch - Ultrafast'))

    configuration.addBrowser(800, 600, BrowserType.CHROME);
    configuration.addBrowser(700, 500, BrowserType.FIREFOX);
    configuration.addBrowser(1600, 1200, BrowserType.IE_11);
    configuration.addBrowser(1024, 768, BrowserType.EDGE_CHROMIUM);
    configuration.addBrowser(800, 600, BrowserType.SAFARI);

    // Add mobile emulation devices in Portrait mode

    configuration.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
    configuration.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);
  });


  beforeEach(async function () {
    configuration.setAppName('QW Demo Store');
    configuration.setTestName(this.currentTest.title);

    // Set the configuration to eyes

    await eyes.setConfiguration(configuration);

    await eyes.open(browser);
  });


  it('Verify landing page', async () => {

    // Navigate to the url we want to test

    await browser.url('/');

    // ⭐️ Note to see visual bugs, run the test using the PROD URL for the 1st run.
    // but then change the to the DEV URl, you can do this from the terminal ENV=prd|dev
    // (for the 2nd run)

    // check the landing page with fluent api, see more info here
    // https://applitools.com/docs/topics/sdk/the-eyes-sdk-check-fluent-api.html

    // Check the app page
    await eyes.check('App Window', Target.window().fully());

    // Call Close on eyes to let the server know it should display the results
    await eyes.closeAsync();

    // Do test assertion after applitools check
    await expect(browser).toHaveTitle('QualityWorks Ecommerce Store | QualityWorks Ecommerce Store');
  });

  afterEach(async () => {
    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abortAsync();
  });

  after(async () => {
    const results = await runner.getAllTestResults();
    console.log(results);
  });

});


// Using webdriverio applitools service (it is limited but easier, does not support UltraFast grid)
// describe("QW Demo Store Visual Tests", () => {
//   it("Verify landing page", () => {
//     browser.url("/");
//     browser.takeSnapshot("landing page", "body");
//     expect(browser).toHaveTitle(
//       "Gatsby starter ecommerce | Gatsby starter ecommerce"
//     );
//   });
// });
