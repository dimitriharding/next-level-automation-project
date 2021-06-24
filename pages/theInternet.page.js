const page = require("./page");

// TheInternetApp class extends the base page object
class TheInternetPage extends page {

  // Locators are defined as getters
  get txtNotification() { return  $('#flash'); }
  get editor() { return $('#tinymce'); }
  get iframe() { return $('#mce_0_ifr'); }
  get header() { return $('h3'); }
  get btnClickHere() { return $('=Click here'); }
  get fileUploadInput() { return $("#file-upload"); }
  get fileUploadSubmit() { return $("#file-submit"); }
  get uploadedFile() { return $("#uploaded-files"); }
  get lnkNewWindow() { return $('.example a'); }

  navigate(path) {
    super.navigate(`https://the-internet.herokuapp.com${path}`);
    return this;
  }

  uploadFile(filePath){
    // set the file path as value on the file input field
    this.fileUploadInput.setValue(filePath);

    // click to start upload
    this.fileUploadSubmit.click();
  }
}

module.exports = new TheInternetPage();
