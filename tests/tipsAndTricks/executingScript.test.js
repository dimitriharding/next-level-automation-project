const theInternetApp = require("../../pages/theInternet.page");

describe("Executing JavaScript", () => {
  it("Verify that JavaScript can be executed in the Browser - change element display to none", () => {
    // navigate to page
    theInternetApp.navigate('/notification_message_rendered')

    theInternetApp.btnClickHere.click()

    // assertion notification is displayed
    expect(theInternetApp.txtNotification).toBeDisplayed();

    // Executing JavaScript with WebdriverIO element
    browser.execute((element) => {
      element.style.display = "none";
    }, theInternetApp.txtNotification);

    // only for demonstration
    browser.pause(5000);

    expect(theInternetApp.txtNotification).not.toBeDisplayed();
  });

  it("Verify that JavaScript can be executed in the Browser - change element display to block", () => {
    // Executing JavaScript with document object
    browser.execute(() => {
      /**
       * The Document interface represents any web page loaded in the browser
       * and serves as an entry point into the web page's content, which is the DOM tree.
       * The DOM tree includes elements such as <body> and <table>, among many others.
       * It provides functionality globally to the document, like how to obtain the page's
       * URL and create new elements in the document.
       *
       * https://developer.mozilla.org/en-US/docs/Web/API/Document
       */
      document.getElementById("flash").style.display = "block";
    });

    // only for demonstration
    browser.pause(1000);

    // assertion notification is displayed
    expect(theInternetApp.txtNotification).toBeDisplayed();
  });

  it("Verify that JavaScript can be executed in the Browser - adding and changing content", () => {
    // assert header text before dynamic change
    expect(theInternetApp.header.getText()).toEqual("Notification Message");

    browser.execute(() => {
      // document.getElementsByTagName("H3") returns a NodeList of the <h2>
      // elements in the document, and the first is number 0:

      var header = document.getElementsByTagName("H3").item(0);
      // the firstChild of the header is a Text node:
      header.firstChild.data = "A dynamic document";
      // now the header is "A dynamic document".

      var para = document.getElementsByTagName("P").item(0);
      para.firstChild.data = "This is the first paragraph.";

      // create a new Text node for the second paragraph
      var newText = document.createTextNode("This is the second paragraph.");
      // create a new Element to be the second paragraph
      var newElement = document.createElement("P");
      // put the text in the paragraph
      newElement.appendChild(newText);
      // and put the paragraph on the end  of the document by appending it to
      // the BODY (which is the parent of para)
      para.parentNode.appendChild(newElement);
    });

    // only for demonstration
    browser.pause(2000);

    // assert header text after dynamic change
    expect(theInternetApp.header.getText()).toEqual("A dynamic document");
  });
});
