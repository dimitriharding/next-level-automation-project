class Page {
  constructor() {
    this.title = 'Base Page';
  }
  
  navigate(path) {
    browser.url(path);
  }

  verifyTextInPage(text) {
    const pageText = $("body").getText();
    const position = pageText.search(text);
    chai.expect(position).to.be.above(0);
  }
}

module.exports = Page;
