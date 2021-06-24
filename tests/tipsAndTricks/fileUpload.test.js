const path = require("path");
const theInternetApp = require("../../pages/theInternet.page");

// Resolve the full file path
const filePath = path.resolve("data/file/tothemoon.png");

describe("File Upload", function () {
  it("Verify that the user can upload a file", function () {
    theInternetApp.navigate('/upload')

    theInternetApp.uploadFile(filePath)
    
    // Wait for uploaded element to be present
    theInternetApp.uploadedFile.waitForDisplayed();
  });
});
