// queryParser.js

const parseQuery = (query) => {
  // Regular expression to match the SELECT fields and the FROM table
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

module.exports = parseQuery;
