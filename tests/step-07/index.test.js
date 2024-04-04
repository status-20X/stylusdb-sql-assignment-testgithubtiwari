const readCSV = require("../../src/csvReader");
const {
  queryParsertest1,
  queryParsertest2,
  queryParsertest3,
} = require("./parsequery");
const {
  executesqlquery1,
  executesqlquery2,
  executesqlquery4,
  executesqlquery5,
} = require("./executesqlquery");
const { executesqlquery3 } = require("../step-06/executesqlquery6");

test("Read CSV File", async () => {
  const data = await readCSV("./sample.csv");
  expect(data.length).toBeGreaterThan(0);
  expect(data.length).toBe(3);
  expect(data[0].name).toBe("John");
  expect(data[0].age).toBe("30"); //ignore the string type here, we will fix this later
});

test("Parse SQL Query", () => {
  const query = "SELECT id, name FROM sample";
  const parsed = queryParsertest1(query);
  expect(parsed).toEqual({
    fields: ["id", "name"],
    table: "sample",
    whereClauses: [],
  });
});

test("Execute SQL Query", async () => {
  const query = "SELECT id, name FROM sample";
  const result = await executesqlquery1(query);
  expect(result.length).toBeGreaterThan(0);
  expect(result[0]).toHaveProperty("id");
  expect(result[0]).toHaveProperty("name");
  expect(result[0]).not.toHaveProperty("age");
  expect(result[0]).toEqual({ id: "1", name: "John" });
});

test("Parse SQL Query with WHERE Clause", () => {
  const query = "SELECT id, name FROM sample WHERE age = 25";
  const parsed = queryParsertest2(query);
  expect(parsed).toEqual({
    fields: ["id", "name"],
    table: "sample",
    whereClauses: [
      {
        field: "age",
        operator: "=",
        value: "25",
      },
    ],
  });
});

test("Execute SQL Query with WHERE Clause", async () => {
  const query = "SELECT id, name FROM sample WHERE age = 25";
  const result = await executesqlquery2(query);
  expect(result.length).toBe(1);
  expect(result[0]).toHaveProperty("id");
  expect(result[0]).toHaveProperty("name");
  expect(result[0].id).toBe("2");
});

test("Parse SQL Query with Multiple WHERE Clauses", () => {
  const query = "SELECT id, name FROM sample WHERE age = 30 AND name = John";
  const parsed = queryParsertest3(query);
  expect(parsed).toEqual({
    fields: ["id", "name"],
    table: "sample",
    whereClauses: [
      {
        field: "age",
        operator: "=",
        value: "30",
      },
      {
        field: "name",
        operator: "=",
        value: "John",
      },
    ],
  });
});

test("Execute SQL Query with Multiple WHERE Clause", async () => {
  const query = "SELECT id, name FROM sample WHERE age = 30 AND name = John";
  const result = await executesqlquery3(query);
  expect(result.length).toBe(1);
  expect(result[0]).toEqual({ id: "1", name: "John" });
});

test("Execute SQL Query with Greater Than", async () => {
  const queryWithGT = "SELECT id FROM sample WHERE age > 22";
  const result = await executesqlquery4(queryWithGT);
  expect(result.length).toEqual(2);
  expect(result[0]).toHaveProperty("id");
});

test("Execute SQL Query with Not Equal to", async () => {
  const queryWithGT = "SELECT name FROM sample WHERE age != 25";
  const result = await executesqlquery5(queryWithGT);
  expect(result.length).toEqual(2);
  expect(result[0]).toHaveProperty("name");
});
