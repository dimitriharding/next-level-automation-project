describe("Handling Windows/Tabs", () => {
  it("Verify switching to a new tab - using url", () => {
    // access the page
    browser.url("https://the-internet.herokuapp.com/windows");

    // find selector
    const link = $(".example a");

    // click on the link to open a new window
    link.click();

    // switch window
    browser.switchWindow("/windows/new");

    //assertion
    expect(browser).toHaveTitle("New Window");
  });

  it("Verify switching back to an old tab - using url", () => {
    // access the page
    browser.url("https://the-internet.herokuapp.com/windows");

    // find selector
    const link = $(".example a");

    // click on the link to open a new window
    link.click();

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
