module.exports = {
  waitThenClick: function (element) {
    element.waitForExist();
    element.waitForDisplayed();
    element.click();
  },
  clearThenSetValue: function (element, value) {
    element.waitForDisplayed();
    element.clearValue();
    element.setValue(value);
  },
  waitForUrlIncludes: function (value, timeout) {
    let url;
    let _timeout = timeout || 5000;
    try {
      return this.waitUntil(
        () => {
          url = this.getUrl();
          return url.includes(value);
        },
        _timeout,
        ""
      );
    } catch (error) {
      let message = `
        \tWait time of ${_timeout}ms exceeded before we could find a match
        \tActual: ${url}
        \tExpected to contain: ${value}
        `;

      throw new Error(message);
    }
  },
  verifyTextInPage: function (text) {
    const pageText = $("body").getText();
    const position = pageText.search(text);
    chai.expect(position).to.be.above(0);
  },
};
