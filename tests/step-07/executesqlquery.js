const readCSV = require("../../src/csvReader");
const {
  queryParsertest1,
  queryParsertest2,
  queryParsertest3,
  queryParsertest4,
  queryParsertest5,
} = require("./parsequery");

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

const executesqlquery4 = async (query) => {
  const { fields, table, whereClauses } = await queryParsertest4(query);

  // Read data from CSV file
  const data = await readCSV(`./${table}.csv`);

  // Apply WHERE clauses to filter data
  let filteredData = data;
  if (whereClauses && whereClauses.length > 0) {
    filteredData = data.filter((row) => {
      return whereClauses.every(({ field, operator, value }) => {
        return eval(`row[field] ${operator} value`);
      });
    });
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

const executesqlquery5 = async (query) => {
  const { fields, table, whereClauses } = await queryParsertest5(query);

  // Read data from CSV file
  const data = await readCSV(`./${table}.csv`);

  // Apply WHERE clauses to filter data
  let filteredData = data;
  if (whereClauses && whereClauses.length > 0) {
    filteredData = data.filter((row) => {
      return whereClauses.every(({ field, operator, value }) => {
        return eval(`row[field] ${operator} value`);
      });
    });
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

module.exports = {
  executesqlquery1,
  executesqlquery2,
  executesqlquery3,
  executesqlquery4,
  executesqlquery5,
};
