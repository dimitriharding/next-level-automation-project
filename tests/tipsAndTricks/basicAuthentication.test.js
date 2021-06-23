describe("Basic Auth", () => {
  it("Verify that the user can enter gated website", () => {
    //Basic Auth (user and pass: admin)

    // http://username:password@example.com/ <- URL encoding format
    browser.url('https://the-internet.herokuapp.com/basic_auth');

    const header = $("h3");
    header.waitForDisplayed();

    expect(header.getText()).toEqual("Basic Auth");
  });
});
