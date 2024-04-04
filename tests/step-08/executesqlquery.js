const readCSV = require("../../src/csvReader");
const {
  queryParsertest1,
  queryParsertest2,
  queryParsertest3,
  queryParsertest4,
  queryParsertest5,
  queryParsertest7,
  queryParsertest6,
} = require("./parsesqlquery");

const executesqlquery1 = async (query) => {
  const { fields, table } = await queryParsertest1(query);

  // Read data from CSV file
  const data = await readCSV(`./${table}.csv`);

  // Map data to contain only selected fields
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
  const { fields, table, whereClauses } = await queryParsertest2(query);

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
  const { fields, table, whereClauses } = await queryParsertest3(query);

  // Read data from CSV file
  const data = await readCSV(`./${table}.csv`);

  // Filter data based on WHERE clause
  const filteredData = data.filter((row) => {
    // Check each row against the WHERE clause conditions
    if (whereClauses) {
      for (const whereClause of whereClauses) {
        const { field, operator, value } = whereClause;
        // If any condition doesn't match, exclude the row
        if (operator === "=" && row[field] !== value) {
          return false;
        }
      }
    }
    return true; // Include the row if all conditions match
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

  // Filter data based on WHERE clause
  const filteredData = data.filter((row) => {
    // Check each row against the WHERE clause conditions
    if (whereClauses) {
      for (const whereClause of whereClauses) {
        const { field, operator, value } = whereClause;
        // Apply Greater Than condition
        if (operator === ">") {
          if (!(row[field] > value)) {
            return false;
          }
        }
      }
    }
    return true; // Include the row if all conditions match
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

const executesqlquery5 = async (query) => {
  const { fields, table, whereClauses } = await queryParsertest5(query);

  // Read data from CSV file
  const data = await readCSV(`./${table}.csv`);

  // Filter data based on WHERE clause
  const filteredData = data.filter((row) => {
    // Check each row against the WHERE clause conditions
    if (whereClauses) {
      for (const whereClause of whereClauses) {
        const { field, operator, value } = whereClause;
        // Apply Not Equal To condition
        if (operator === "!=") {
          if (row[field] === value) {
            return false;
          }
        }
      }
    }
    return true; // Include the row if all conditions match
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
const performInnerJoin = (leftTable, rightTable, joinCondition) => {
  const joinedData = [];

  // Create a map of rightTable items for efficient lookup
  const rightTableMap = new Map();
  rightTable.forEach((row) => {
    const joinKey = row[joinCondition.right];
    if (!rightTableMap.has(joinKey)) {
      rightTableMap.set(joinKey, []);
    }
    rightTableMap.get(joinKey).push(row);
  });

  // Perform inner join
  leftTable.forEach((leftRow) => {
    const joinKey = leftRow[joinCondition.left];
    if (rightTableMap.has(joinKey)) {
      const rightRows = rightTableMap.get(joinKey);
      rightRows.forEach((rightRow) => {
        joinedData.push({ ...leftRow, ...rightRow });
      });
    }
  });

  return joinedData;
};

const executesqlquery6 = async (query) => {
  const { fields, table, joinTable, joinCondition } = await queryParsertest6(
    query
  );

  // Fetch data from the respective tables (student and enrollment)
  const studentData = await readCSV(`./${table}.csv`);
  const enrollmentData = await readCSV(`./${joinTable}.csv`);

  // Perform INNER JOIN operation
  const joinedData = performInnerJoin(
    studentData,
    enrollmentData,
    joinCondition
  );

  // Map data to selected fields
  const result = joinedData.map((row) => {
    const selectedFields = {};
    fields.forEach((field) => {
      const [tableAlias, fieldName] = field.split(".");
      selectedFields[field] = row[tableAlias][fieldName];
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
  executesqlquery6,
};
