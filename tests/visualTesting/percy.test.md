# Setting Up Visual tests with Percy.io and WebdriverIO 

---

Instruction (reference - https://docs.percy.io/docs/webdriverio)

1. Create a free [Percy.io account](https://www.browserstack.com/users/sign_up?ref=percy) and get your Percy token

![](https://seetyah.s3.amazonaws.com/Screen%20Shot%202021-06-23%20at%205.52.09%20AM.png)
* create your account and verify your email

![](https://seetyah.s3.amazonaws.com/Screen%20Shot%202021-06-23%20at%206.07.09%20AM.png)
* create a project, and then go under project settings

![](https://seetyah.s3.amazonaws.com/Screen%20Shot%202021-06-23%20at%206.07.42%20AM.png)
* copy your project token


2. Add `PERCY_TOKEN` to your `.env` with the token you just copied

3. Install the percey cli and the webdriverio percy service

`npm install --save-dev @percy/cli @percy/webdriverio`

4. Create a test file and add the following: 

```js
const percySnapshot = require("@percy/webdriverio");

describe("QW Demo Store Visual Tests", () => {
  it("Verify landing page", () => {
    browser.url("/");
    browser.pause(1000);
    percySnapshot("landing page");
    expect(browser).toHaveTitle(
      "QualityWorks Ecommerce Store | QualityWorks Ecommerce Store"
    );
  });
});
```

5 Run your test `ENV=prd|dev npm run test:single:percy [path to test file]`

* The following scripts are already apart of the `package.json`
- `"test:percy": "percy exec -- wdio ./wdio.conf.js"`
- `"test:single:percy": "npm run test:percy -- --spec"`

