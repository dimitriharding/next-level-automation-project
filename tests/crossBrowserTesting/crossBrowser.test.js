
let currentUserAgent;
describe("Cross Browser Testing", () => {
  it("Verify that we can load google on multiple browsers", () => {
    // navigate to page
    browser.url("https://www.google.com/");
    expect(browser).toHaveTitle('Google')
  });
});
