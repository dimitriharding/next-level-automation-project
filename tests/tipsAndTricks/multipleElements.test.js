describe("Multiple Elements", () => {
  it("Verify that all items are present have a name, price tag", () => {
    // navigate to app using base url
    browser.url("/");

    // finding all selector that match (returns an array of elements)
    const listOfCardElements = $$(".card");

    // loop through all element and assert they have a name, price tag, and image
    listOfCardElements.forEach((cardElement) => {
      // get all the text from the element
      const nameAndPriceText = cardElement.getText();

      // assert that the text matches the name and price tag format (https://regex101.com/r/G6EGww/1/)
      expect(nameAndPriceText).toMatch(/(.*)\n\$[0-9]+(\.[0-9][0-9])/);
    });
  });
});
