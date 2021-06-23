const page = require("./page");

// LoginPage class extends the base page object
class LoginPage extends page {

  // Locators are defined as getters
  get txtUsername()             { return $("#email"); }
  get password()              { return $("#password"); }
  get loginButton()           { return $(".segment button.button"); }
  get noOrdersHeader()        { return $(".message > div.header"); }
  get previousOrdersHeader()  { return $("div.ui div h1.ui"); }
  get myAccount()             { return $(".menu .active"); }
  get loginErrorMessage()     { return $(".content p"); }
  get signInOutLink()         { return $("div.right a:nth-child(2)"); }

  navigate() {
    super.navigate("/login");
    return this;
  }

  /**
   * TODO: Create a `loginUser` method that accepts a username and password, set them and then click login
   * 
   * @param {string} username
   * @param {string} password 
   * 
   */


  /**
   * Enters user email
   * @param {string} username
   */
  enterUsername(username) {
    this.txtUsername.waitForDisplayed();
    this.txtUsername.clearValue();
    this.txtUsername.setValue(username);
  }

  /**
   * Enters password
   * @param {string} password
   */
  enterPassword(password) {
    this.password.waitForDisplayed();
    this.password.clearValue();
    this.password.setValue(password);
  }

  /**
   * Clicks the login button
   */
  clickLoginButton() {
    this.loginButton.waitForDisplayed();
    this.loginButton.click();
  }

  /**
   * Clicks the sign in/sign out button
   */
  clickSignInOutLink() {
    this.signInOutLink.waitForDisplayed();
    this.signInOutLink.click();
  }
}

module.exports = new LoginPage();
