const percySnapshot = require("@percy/webdriverio");

describe("QW Demo Store Visual Tests", () => {
  it("Verify landing page", () => {
    browser.url("/");
    browser.pause(1000);
    percySnapshot("landing page");
    expect(browser).toHaveTitle(
      "Gatsby starter ecommerce | Gatsby starter ecommerce"
    );
  });
});
