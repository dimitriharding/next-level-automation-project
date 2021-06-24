const optInPage = require("../../pages/optIn.page");

describe("User Authentication", function () {
  it("Verify that attendee can successfully register for workshop", function () {
    const attendee = process.env.NAME || process.env.USER
    optInPage.navigate(attendee)
    optInPage.lblResultText.waitForDisplayed();
    expect(optInPage.lblResultText).toHaveText('Successfully Registered for Next-level Automaton Workshop')
  });
});