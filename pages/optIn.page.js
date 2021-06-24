const page = require('./page');

// OptInPage class extends the base page object
class OptInPage extends page {

  // Locators are defined as getters
  get lblResultText() {return $('[class*=result-title]')}

  navigate(attendee) {
    super.navigate(`https://opt-in-page.vercel.app/register?name=${attendee}`);
    return this;
  }

}

module.exports = new OptInPage();
