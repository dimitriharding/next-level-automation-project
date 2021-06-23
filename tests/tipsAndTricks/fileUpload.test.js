const path = require("path");

// Resolve the full file path
const filePath = path.resolve("data/file/tothemoon.png");

describe("File Upload", function () {
  it("Verify that the user can upload a file", function () {
    browser.url("https://the-internet.herokuapp.com/upload");

    // Get elements for interaction
    const eleFileUploadInput = $("#file-upload");
    const eleFileUploadSubmit = $("#file-submit");
    const eleUploadedFile = $("#uploaded-files");

    // set the file path as value on the file input field
    eleFileUploadInput.setValue(filePath);

    // click to start upload
    eleFileUploadSubmit.click();

    // Wait for uploaded element to be present
    eleUploadedFile.waitForDisplayed();
  });
});
