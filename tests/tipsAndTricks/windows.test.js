const theInternetApp = require("../../pages/theInternet.page");

describe("Handling Windows/Tabs", () => {
  it("Verify switching to a new tab - using url", () => {
    theInternetApp.navigate('/windows')

    // click on the link to open a new window
    theInternetApp.lnkNewWindow.click();

    // switch window
    browser.switchWindow("/windows/new");

    //assertion
    expect(browser).toHaveTitle("New Window");
  });

  it("Verify switching back to an old tab - using url", () => {
    theInternetApp.navigate('/windows')

    // click on the link to open a new window
    theInternetApp.lnkNewWindow.click();

    // switch window
    browser.switchWindow("/windows/new");

    // close new window
    browser.closeWindow();

    // switch back to old window
    browser.switchWindow("/windows");

    // assertion
    expect(browser).toHaveTitle("The Internet");
  });
});
