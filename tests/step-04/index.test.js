const readCSV = require("../../src/csvReader");
const { parseQuerytest4 } = require("../../src/queryParser");
const { executeSELECTQuerytest4 } = require("../../src/index");

test("Read CSV File", async () => {
  const data = await readCSV("./sample.csv");
  expect(data.length).toBeGreaterThan(0);
  expect(data.length).toBe(3);
  expect(data[0].name).toBe("John");
  expect(data[0].age).toBe("30");
});

test("Parse SQL Query", () => {
  const query = "SELECT id, name FROM sample";
  const parsed = parseQuerytest4(query);
  expect(parsed).toEqual({
    fields: ["id", "name"],
    table: "sample",
  });
});

test("Execute SQL Query", async () => {
  const query = "SELECT id, name FROM sample";
  const result = await executeSELECTQuerytest4(query);
  expect(result.length).toBeGreaterThan(0);
  expect(result[0]).toHaveProperty("id");
  expect(result[0]).toHaveProperty("name");
  expect(result[0]).not.toHaveProperty("age");
  expect(result[0]).toEqual({ id: "1", name: "John" });
});
