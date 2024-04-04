const readCSV = require("../../src/csvReader");
const {
  queryParsertest1,
  queryParsertest2,
  queryParsertest3,
} = require("./parsequerytest6");

const executesqlquery1 = async (query) => {
  const { fields, table } = await queryParsertest1(query); // Wait for query parsing to complete

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

const executesqlquery2 = async (query) => {
  const { fields, table, whereClauses } = await queryParsertest2(query); // Wait for query parsing to complete

  // Read data from CSV file
  const data = await readCSV(`./${table}.csv`);

  // Filter data based on WHERE clause
  const filteredData = data.filter((row) => {
    // Check each row against the WHERE clause conditions
    if (whereClauses) {
      for (const whereClause of whereClauses) {
        const { field, operator, value } = whereClause;
        if (operator === "=" && row[field] !== value) {
          return false;
        }
      }
    }
    return true;
  });

  // Map data to selected fields
  const result = filteredData.map((row) => {
    const selectedFields = {};
    fields.forEach((field) => {
      selectedFields[field] = row[field];
    });
    return selectedFields;
  });

  return result;
};

const executesqlquery3 = async (query) => {
  const { fields, table, whereClauses } = await queryParsertest3(query); // Wait for query parsing to complete

  // Read data from CSV file
  const data = await readCSV(`./${table}.csv`);

  // Filter data based on WHERE clause
  const filteredData = data.filter((row) => {
    // Check each row against the WHERE clause conditions
    if (whereClauses) {
      for (const whereClause of whereClauses) {
        const { field, operator, value } = whereClause;
        if (operator === "=" && row[field] !== value) {
          return false;
        }
      }
    }
    return true;
  });

  // Map data to selected fields
  const result = filteredData.map((row) => {
    const selectedFields = {};
    fields.forEach((field) => {
      selectedFields[field] = row[field];
    });
    return selectedFields;
  });

  return result;
};

module.exports = { executesqlquery1, executesqlquery2, executesqlquery3 };
