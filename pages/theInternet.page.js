const page = require("./page");

// TheInternetApp class extends the base page object
class TheInternetPage extends page {

  // Locators are defined as getters
  get txtNotification() { return $('#flash'); }
  get editor() { return $('#tinymce'); }
  get iframe() { return $('#mce_0_ifr'); }
  get header() { return $('h3'); }

  navigate(path) {
    super.navigate(`https://the-internet.herokuapp.com/${path}`);
    return this;
  }
}

module.exports = new TheInternetPage();
