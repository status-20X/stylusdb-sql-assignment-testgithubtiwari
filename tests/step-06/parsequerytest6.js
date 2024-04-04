const queryParsertest1 = (query) => {
  const regex = /SELECT\s+([\w,\s]+)\s+FROM\s+(\w+)\s*(?:WHERE\s+(.*))?/i;
  const match = query.match(regex);

  if (!match || match.length < 3) {
    throw new Error("Invalid SQL query format");
  }

  // Extracting fields and table name from the regex match
  const fields = match[1].split(",").map((field) => field.trim());
  const table = match[2];
  const whereClauses = []; // No need to initialize it with an empty array since there's no WHERE clause

  return {
    fields,
    table,
    whereClauses,
  };
};

const queryParsertest2 = (query) => {
  const regex =
    /SELECT\s+([\w,\s]+)\s+FROM\s+(\w+)\s*(?:WHERE\s+([\w\s]+)\s*([=<>]+)\s*([\w\s]+))?/i;
  const match = query.match(regex);

  if (!match || match.length < 3) {
    throw new Error("Invalid SQL query format");
  }

  // Extracting fields and table name from the regex match
  const fields = match[1].split(",").map((field) => field.trim());
  const table = match[2];
  const whereClauses = [];

  // If WHERE clause exists, parse it into separate clauses
  if (match[3]) {
    const field = match[3].trim();
    const operator = match[4].trim();
    const value = match[5].trim();
    whereClauses.push({ field, operator, value });
  }

  return {
    fields,
    table,
    whereClauses,
  };
};

const queryParsertest3 = (query) => {
  const regex =
    /SELECT\s+([\w,\s]+)\s+FROM\s+(\w+)\s*WHERE\s+((?:\w+\s*=\s*\w+\s*AND\s*)*(?:\w+\s*=\s*\w+))/i;
  const match = query.match(regex);

  if (!match || match.length < 4) {
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
  };
};

// module.exports = { queryParsertest3 };

module.exports = { queryParsertest1, queryParsertest2, queryParsertest3 };
