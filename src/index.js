const readCSV = require("./csvReader");
const { parseQuerytest4, parseQuerytest5 } = require("./queryParser");

const executeSELECTQuerytest4 = async (query) => {
  const { fields, table } = parseQuerytest4(query);

  // Read data from CSV file
  const data = await readCSV(`./${table}.csv`);

  // Filter data based on SELECTed fields
  const result = data.map((row) => {
    const selectedFields = {};
    fields.forEach((field) => {
      selectedFields[field] = row[field];
    });
    return selectedFields;
  });

  return result;
};

const executeSELECTQuerytest5 = async (query) => {
  const { fields, table, whereClause } = parseQuerytest5(query);

  // Read data from CSV file
  const data = await readCSV(`./${table}.csv`);

  // Filter data based on WHERE clause if it exists
  let filteredData = data;
  if (whereClause) {
    // Split the WHERE clause into parts
    const conditionParts = whereClause.split("=").map((part) => part.trim());
    const conditionField = conditionParts[0];
    const conditionValue = conditionParts[1];

    // Filter data based on the condition
    filteredData = data.filter((row) => row[conditionField] === conditionValue);
  }

  // Map filtered data to contain only selected fields
  const result = filteredData.map((row) => {
    const selectedFields = {};
    fields.forEach((field) => {
      selectedFields[field] = row[field];
    });
    return selectedFields;
  });

  return result;
};

module.exports = { executeSELECTQuerytest4, executeSELECTQuerytest5 };
