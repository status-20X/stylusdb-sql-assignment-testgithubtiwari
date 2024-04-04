const parseQuerytest4 = (query) => {
  // Regular expression to match SELECT fields, FROM table, and WHERE clause
  const regex = /SELECT\s+(.*?)\s+FROM\s+(\w+)/i;
  const match = query.match(regex);

  if (!match || match.length !== 3) {
    throw new Error("Invalid SQL query format");
  }

  // Extracting fields and table name from the regex match
  const fields = match[1].split(",").map((field) => field.trim());
  const table = match[2];

  return {
    fields,
    table,
  };
};

const parseQuerytest5 = (query) => {
  // Regular expression to match SELECT fields, FROM table, and WHERE clause
  const regex = /SELECT\s+(.*?)\s+FROM\s+(\w+)\s*(?:WHERE\s+(.*))?/i;
  const match = query.match(regex);

  if (!match || match.length < 3) {
    throw new Error("Invalid SQL query format");
  }

  // Extracting fields and table name from the regex match
  const fields = match[1].split(",").map((field) => field.trim());
  const table = match[2];
  const whereClause = match[3] ? match[3].trim() : null;

  return {
    fields,
    table,
    whereClause,
  };
};

module.exports = {
  parseQuerytest4,
  parseQuerytest5,
};
