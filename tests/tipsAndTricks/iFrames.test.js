const theInternetApp = require('../../pages/theInternet.page');

describe("Tips & Ticks - iFrames", () => {
  it("Verify IFrame interaction - without switching to iframe", () => {

    theInternetApp.navigate('/frame')
    theInternetApp.editor.waitForDisplayed();

    // assert that the editor have the default text
    const editorText = theInternetApp.editor.getText();
    expect(editorText).toEqual("Your content goes here.");
  });

  it("Verify IFrame interaction - switching to iframe", () => {
    theInternetApp.navigate('/frame')

    // switching to iFrame using id
    browser.switchToFrame(theInternetApp.iframe);

    // set editor value
    theInternetApp.editor.setValue("Updated by automation");

    // assert that the editor has the expected text
    const editorText = theInternetApp.editor.getText();
    expect(editorText).toEqual("Updated by automation");

    browser.pause(1000);
  });

  it('Verify Nested IFrame interaction', () => {
    // TODO: Exercise for iframes

    browser.url("https://the-internet.herokuapp.com/nested_frames");

    //....
  })
});
