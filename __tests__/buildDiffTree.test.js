import { describe, it, expect } from "@jest/globals";

import { buildDiffTree } from "../src/buildDiffTree";
import { parseFile } from "../src/parsers";

const fixturesPath = "__tests__/__fixtures__";

const result = {
  common: {
    type: "nested",
    value: {
      follow: { type: "added", value: false },
      setting1: { type: "unchanged", value: "Value 1" },
      setting2: { type: "deleted", value: 200 },
      setting3: { type: "changed", valBefore: true, valAfter: null },
      setting4: { type: "added", value: "blah blah" },
      setting5: { type: "added", value: { key5: "value5" } },
      setting6: {
        type: "nested",
        value: {
          doge: {
            type: "nested",
            value: {
              wow: { type: "changed", valBefore: "", valAfter: "so much" },
            },
          },
          key: { type: "unchanged", value: "value" },
          ops: { type: "added", value: "vops" },
        },
      },
    },
  },
  group1: {
    type: "nested",
    value: {
      baz: { type: "changed", valBefore: "bas", valAfter: "bars" },
      foo: { type: "unchanged", value: "bar" },
      nest: { type: "changed", valBefore: { key: "value" }, valAfter: "str" },
    },
  },
  group2: { type: "deleted", value: { abc: 12345, deep: { id: 45 } } },
  group3: {
    type: "added",
    value: { deep: { id: { number: 45 } }, fee: 100500 },
  },
};

describe("buildDiffTree", () => {
  it("should generate correct diff for json files", () => {
    const obj1 = parseFile(`${fixturesPath}/file1.json`);
    const obj2 = parseFile(`${fixturesPath}/file2.json`);

    const diff = buildDiffTree(obj1, obj2);

    expect(diff).toEqual(result);
  });

  it("should generate correct diff for yaml files", () => {
    const obj1 = parseFile(`${fixturesPath}/file1.yaml`);
    const obj2 = parseFile(`${fixturesPath}/file2.yaml`);

    const diff = buildDiffTree(obj1, obj2);

    expect(diff).toEqual(result);
  });
});
