const readCSV = require("./csvReader");
const parseQuery = require("./queryParser");

const executeSELECTQuery = async (query) => {
  // Parse the SQL query to extract fields and table name
  const { fields, table } = parseQuery(query);

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

module.exports = executeSELECTQuery;
