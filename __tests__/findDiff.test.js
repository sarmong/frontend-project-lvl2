import { describe, it, expect } from "@jest/globals";

import { findDiff } from "../src/findDiff";
import { parseFile } from "../src/parsers";

const fixturesPath = "__tests__/__fixtures__";

const result = {
  common: {
    follow: "added",
    setting1: "unchanged",
    setting2: "deleted",
    setting3: "changed",
    setting4: "added",
    setting5: "added",
    setting6: {
      doge: {
        wow: "changed",
      },
      key: "unchanged",
      ops: "added",
    },
  },
  group1: {
    baz: "changed",
    foo: "unchanged",
    nest: "changed",
  },
  group2: "deleted",
  group3: "added",
};

describe("findDiff", () => {
  it("should generate correct diff for json files", () => {
    const obj1 = parseFile(`${fixturesPath}/file1.json`);
    const obj2 = parseFile(`${fixturesPath}/file2.json`);

    const diff = findDiff(obj1, obj2);

    expect(diff).toEqual(result);
  });

  it("should generate correct diff for yaml files", () => {
    const obj1 = parseFile(`${fixturesPath}/file1.yaml`);
    const obj2 = parseFile(`${fixturesPath}/file2.yaml`);

    const diff = findDiff(obj1, obj2);

    expect(diff).toEqual(result);
  });
});
