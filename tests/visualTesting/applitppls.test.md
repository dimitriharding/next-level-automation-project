# Setting Up Visual tests with Applitools and WebdriverIO (using the Ultrafast Grid)

---

Instruction (reference - https://applitools.com/tutorials/webdriverio6.html): 

1. Create a free [Applitools account](https://auth.applitools.com/users/register) and get your Applitools API KEY

![](https://seetyah.s3.amazonaws.com/Screen%20Shot%202021-06-22%20at%208.31.25%20PM.png)
* create your account and verify your email

![](https://seetyah.s3.amazonaws.com/Screen%20Shot%202021-06-22%20at%208.40.09%20PM.png)
* once on the dashboard click on the profile icon in the top right

![](https://seetyah.s3.amazonaws.com/Screen%20Shot%202021-06-22%20at%208.40.16%20PM.png)
* select the API key option and copy the code

2. Add `APPLITOOLS_API_KEY` to your `.env` with the code you just copied

3. Install the applitools webdriverio SDK
`npm install --save-dev @applitools/eyes-webdriverio`

4. Create a test file and add the following: 

```js
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
```

5. Run your test `ENV=prd|dev npm run test:single [path to test file]`

---

## Exercise

In the test above we are testing the entire page, in this exercise you only need to test a single element or region

Instead of testing the entire page, check the header only. 

Below is the eyes method that you need to use:

`eyes.check('header', Target.region(locator))`
