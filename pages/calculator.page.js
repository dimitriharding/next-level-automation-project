const listOfStates = require("../data/states");
const page = require("./page");

class CalculatorPage extends page {
  constructor() {
    super();
    this.title = "Calculate Tax By State";
  }

  // Selector getters
  get costInputSelector()       { return $('input[name="cost"]') }
  get itemAmountInputSelector() { return $('input[name="items"]') }
  get multipleItemsSelector()   { return $(`[role=radiogroup] label:nth-child(2)`) }
  get displayMainSelector()     { return $("#display-main") }

  // Methods
  navigate() {
    super.navigate("https://tax-by-state.vercel.app");
    return this;
  }

  getStateSelector(indexOrName) {
    const actualIndex =
      typeof indexOrName === "string"
        ? listOfStates.indexOf(indexOrName)
        : indexOrName;
    return $(`select[name=state] option[value="${actualIndex}"]`);
  }
}

const calculatorPage = new CalculatorPage();

module.exports = calculatorPage;
