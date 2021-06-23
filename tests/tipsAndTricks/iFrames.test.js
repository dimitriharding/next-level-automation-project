describe("Tips & Ticks - iFrames", () => {
  it("Verify IFrame interaction - without switching to iframe", () => {
    // navigate to app using base url
    browser.url("https://the-internet.herokuapp.com/iframe");

    // finding selector by id
    const editor = $("#tinymce");

    // wait for the element to be displayed
    editor.waitForDisplayed();

    // assert that the editor have the the default text
    expect(editor.getText()).toEqual("Your content goes here.");
  });

  it("Verify IFrame interaction - switching to iframe", () => {
    // navigate to app using base url
    browser.url("https://the-internet.herokuapp.com/iframe");

    // switching to iFrame using id
    browser.switchToFrame($("#mce_0_ifr"));

    // finding selector by id
    const editor = $("#tinymce");

    // wait for the element to be displayed
    editor.waitForDisplayed();

    // set editor value
    editor.setValue("Updated by automation");

    // assert that the editor has the expected text
    expect(editor.getText()).toEqual("Updated by automation");

    browser.pause(1000);
  });

  it('Verify Nested IFrame interaction', () => {
    // TODO: Exercise for iframes

    browser.url("https://the-internet.herokuapp.com/nested_frames");

    //....
  })
});
