const page = require('./page');

// HomePage class extends the base page object
class HomePage extends page {

  // Locators are defined as getters
  get listOfCardElements() { return $$(".card"); }

  navigate() {
    super.navigate('/');
    return this;
  }

}

module.exports = new HomePage();
