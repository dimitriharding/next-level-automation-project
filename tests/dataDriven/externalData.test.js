const { getTaxCalculation } = require("../../support/utils/dataHandler");
const calculatorPage = require("../../pages/calculator.page");

let state = 'California';
let itemCost = 2000;

describe("Calculate Tax - External Data", () => {
  
  it("Verify that the tax is calculated correctly", () => {
    calculatorPage.navigate();
    calculatorPage.getStateSelector(state).click();
    calculatorPage.costInputSelector.setValue(itemCost);

    // WebdriverIO async vs sync mode: https://webdriver.io/docs/sync-vs-async/
    const expectedTax = browser.call(() => getTaxCalculation(itemCost,state));
    const {calculatedTax} = expectedTax;
    expect(calculatorPage.displayMainSelector).toHaveText(calculatedTax);
  });
});
