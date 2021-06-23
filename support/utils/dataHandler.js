const excelToJson = require("convert-excel-to-json");
const csv = require("csv-tools");
const axios = require('axios');

const fs = require("fs");
const path = require("path");

const getTestDataExcel = () => {
  const testData = excelToJson({
    sourceFile: "../../data/file/Test Data - Calculate Tax by State.xlsx",
    columnToKey: {
      A: "stateName",
      B: "stateTax",
      C: "itemCost",
      D: "numberOfItems",
      E: "expectedTax",
    },
  });
  return testData;
};

const getTestDataCSV = () => {
  const cvsData = fs
    .readFileSync(
      path.join(
        __dirname,
        "../../data/file/Test Data - Calculate Tax by State - Test Data.csv"
      )
    )
    .toString("utf8");
  const testData = csv.toJSON(cvsData);
  return testData;
};

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getTaxCalculation(cost, state, items) {
  let response;

  const requestUrl = `https://tax-by-state.vercel.app/api/get-tax?cost=${cost}&state=${state}`
  if(items){
    requestUrl + `&items=${items}`
  }

  try {
    const response = await axios.get(requestUrl);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  return response;
}

module.exports = { getTestDataExcel, getTestDataCSV, getTaxCalculation };
