const { getTaxCalculation } = require("../../support/utils/dataHandler");
const calculatorPage = require("../../pages/calculator.page");

let expectedTax;
let state;
let itemCost;

describe("Calculate Tax - External Data", () => {
  // TODO: use a before hook to call the `getTaxCalculation` with a state and itemCost to get the `expectedTax`
  
  it("Verify that the tax is calculated correctly", () => {
    calculatorPage.navigate();
    calculatorPage.getStateSelector(state).click();
    calculatorPage.costInputSelector.setValue(itemCost);

    expect(calculatorPage.displayMainSelector).toHaveText(expectedTax);
  });
});
