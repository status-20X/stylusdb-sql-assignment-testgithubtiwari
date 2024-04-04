const queryParsertest1 = (query) => {
  const regex = /SELECT\s+([\w,\s]+)\s+FROM\s+(\w+)/i;
  const match = query.match(regex);

  if (!match || match.length < 3) {
    throw new Error("Invalid SQL query format");
  }

  const fields = match[1].split(",").map((field) => field.trim());
  const table = match[2];

  return {
    fields,
    table,
    whereClauses: [], // No WHERE clauses in this test case
    joinCondition: null, // No join condition in this test case
    joinTable: null, // No join table in this test case
  };
};

const queryParsertest2 = (query) => {
  const regex =
    /SELECT\s+([\w,\s]+)\s+FROM\s+(\w+)\s*(?:WHERE\s+([\w\s]+)\s*([=<>]+)\s*([\w\s]+))?\s*(?:JOIN\s+(\w+)\s+ON\s+([\w\s]+)\s*([=<>]+)\s*([\w\s]+))?/i;
  const match = query.match(regex);

  if (!match || match.length < 3) {
    throw new Error("Invalid SQL query format");
  }

  // Extracting fields and table name from the regex match
  const fields = match[1].split(",").map((field) => field.trim());
  const table = match[2];
  const whereClauses = [];

  // Extracting WHERE clause
  if (match[3]) {
    const field = match[3].trim();
    const operator = match[4].trim();
    const value = match[5].trim();
    whereClauses.push({ field, operator, value });
  }

  // Extracting JOIN condition and table
  let joinCondition = null;
  let joinTable = null;
  if (match[6] && match[7] && match[8] && match[9]) {
    joinTable = match[6].trim();
    const joinField = match[7].trim();
    const joinOperator = match[8].trim();
    const joinValue = match[9].trim();
    joinCondition = {
      field: joinField,
      operator: joinOperator,
      value: joinValue,
    };
  }

  return {
    fields,
    table,
    whereClauses,
    joinCondition,
    joinTable,
  };
};

const queryParsertest3 = (query) => {
  const regex =
    /SELECT\s+([\w,\s]+)\s+FROM\s+(\w+)\s*WHERE\s+((?:\w+\s*=\s*\w+\s*AND\s*)*(?:\w+\s*=\s*\w+))/i;
  const match = query.match(regex);

  if (!match || match.length < 3) {
    throw new Error("Invalid SQL query format");
  }

  // Extracting fields and table name from the regex match
  const fields = match[1].split(",").map((field) => field.trim());
  const table = match[2];

  // Extracting WHERE clauses
  const whereClauses = [];
  const whereConditions = match[3]
    .split("AND")
    .map((condition) => condition.trim());
  whereConditions.forEach((condition) => {
    const [field, value] = condition.split("=").map((part) => part.trim());
    whereClauses.push({ field, operator: "=", value });
  });

  return {
    fields,
    table,
    whereClauses,
    joinCondition: null,
    joinTable: null,
  };
};

const queryParsertest4 = (query) => {
  const regex =
    /SELECT\s+([\w,\s]+)\s+FROM\s+(\w+)\s*WHERE\s+([\w\s]+)\s*(>=|<=|<>|>|<|=)\s*([\w\s]+)/i;
  const match = query.match(regex);

  if (!match || match.length < 3) {
    throw new Error("Invalid SQL query format");
  }

  // Extracting fields and table name from the regex match
  const fields = match[1].split(",").map((field) => field.trim());
  const table = match[2];

  // Extracting WHERE clauses
  const whereClauses = [];
  const field = match[3].trim();
  const operator = match[4].trim();
  const value = match[5].trim();
  whereClauses.push({ field, operator, value });

  return {
    fields,
    table,
    whereClauses,
    joinCondition: null,
    joinTable: null,
  };
};

const queryParsertest5 = (query) => {
  const regex =
    /SELECT\s+([\w,\s]+)\s+FROM\s+(\w+)\s*WHERE\s+([\w\s]+)\s*(>=|<=|<>|>|<|=|!=)\s*([\w\s]+)/i;
  const match = query.match(regex);

  if (!match || match.length < 3) {
    throw new Error("Invalid SQL query format");
  }

  // Extracting fields and table name from the regex match
  const fields = match[1].split(",").map((field) => field.trim());
  const table = match[2];

  // Extracting WHERE clauses
  const whereClauses = [];
  const field = match[3].trim();
  const operator = match[4].trim();
  const value = match[5].trim();
  whereClauses.push({ field, operator, value });

  return {
    fields,
    table,
    whereClauses,
    joinCondition: null,
    joinTable: null,
  };
};

const queryParsertest6 = (query) => {
  const regex =
    /SELECT\s+([\w.,\s]+)\s+FROM\s+(\w+)\s+INNER JOIN\s+(\w+)\s+ON\s+([\w.]+)=([\w.]+)/i;
  const match = query.match(regex);

  if (!match || match.length < 6) {
    throw new Error("Invalid SQL query format");
  }

  // Extracting fields, table name, join table, and join condition from the regex match
  const fields = match[1].split(",").map((field) => field.trim());
  const table = match[2];
  const joinTable = match[3];
  const leftField = match[4];
  const rightField = match[5];
  const joinCondition = { left: leftField, right: rightField };

  return {
    fields,
    table,
    whereClauses: [],
    joinTable,
    joinCondition,
  };
};

const queryParsertest7 = (query) => {
  const regex =
    /SELECT\s+([\w.,\s]+)\s+FROM\s+(\w+)\s+INNER JOIN\s+(\w+)\s+ON\s+([\w.]+)\s*=\s*([\w.]+)\s+WHERE\s+([\w.]+)\s*(=|<|>|<=|>=)\s*([\w\s]+)/i;
  const match = query.match(regex);

  if (!match || match.length < 9) {
    throw new Error("Invalid SQL query format");
  }

  // Extracting fields, table name, join table, and join condition from the regex match
  const fields = match[1].split(",").map((field) => field.trim());
  const table = match[2];
  const joinTable = match[3];
  const leftField = match[4];
  const rightField = match[5];
  const joinCondition = { left: leftField, right: rightField };

  // Extracting WHERE clause
  const whereField = match[6].trim();
  const operator = match[7].trim();
  const value = match[8].trim();
  const whereClauses = [{ field: whereField, operator, value }];

  return {
    fields,
    table,
    whereClauses,
    joinTable,
    joinCondition,
  };
};

// const queryParsertest8 = (query) => {};

module.exports = {
  queryParsertest1,
  queryParsertest2,
  queryParsertest3,
  queryParsertest4,
  queryParsertest5,
  queryParsertest6,
  queryParsertest7,
  // queryParsertest8,
};
