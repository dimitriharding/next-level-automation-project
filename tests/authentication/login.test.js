const loginData = require("../../data/loginData");
const loginPage = require("../../pages/login.page");

describe("User Authentication", function () {
  it("Verify that a user can sign in", function () {
    loginPage.navigate();
    loginPage.enterUsername(loginData.validEmail);
    loginPage.enterPassword(loginData.validPassword);
    loginPage.clickLoginButton();

    browser.waitForUrlIncludes("myaccount");
    browser.verifyTextInPage("My Account");
  });
});
