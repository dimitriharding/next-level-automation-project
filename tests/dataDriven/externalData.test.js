const { getTaxCalculation } = require("../../support/utils/dataHandler");
const calculatorPage = require("../../pages/calculator.page");

let state;
let itemCost;

describe("Calculate Tax - External Data", () => {
  /**
   * TODO: Use the `getTaxCalculation` with a state and itemCost to get the expected tax
   * Since the the getTaxCalculation returns a promise, we have to use the .then method to get the value
   * promise.then((valueFromPromise) => {
   *     console.log(valueFromPromise);
   * });
   */
  
  it("Verify that the tax is calculated correctly", () => {
    calculatorPage.navigate();
    calculatorPage.getStateSelector(state).click();
    calculatorPage.costInputSelector.setValue(itemCost);

    expect(calculatorPage.displayMainSelector).toHaveText(expectedTax);
  });
});
