import { describe, it, expect } from "@jest/globals";

import { buildDiffTree } from "../src/buildDiffTree";
import { parseFile } from "../src/parsers";

const fixturesPath = "__tests__/__fixtures__";

const result = {
  type: "root",
  value: {
    common: {
      key: "common",
      type: "nested",
      value: {
        follow: {
          key: "follow",
          type: "added",
          value: false,
        },
        setting1: {
          key: "setting1",
          type: "unchanged",
          value: "Value 1",
        },
        setting2: {
          key: "setting2",
          type: "deleted",
          value: 200,
        },
        setting3: {
          key: "setting3",
          type: "changed",
          valAfter: null,
          valBefore: true,
        },
        setting4: {
          key: "setting4",
          type: "added",
          value: "blah blah",
        },
        setting5: {
          key: "setting5",
          type: "added",
          value: {
            key5: "value5",
          },
        },
        setting6: {
          key: "setting6",
          type: "nested",
          value: {
            doge: {
              key: "doge",
              type: "nested",
              value: {
                wow: {
                  key: "wow",
                  type: "changed",
                  valAfter: "so much",
                  valBefore: "",
                },
              },
            },
            key: {
              key: "key",
              type: "unchanged",
              value: "value",
            },
            ops: {
              key: "ops",
              type: "added",
              value: "vops",
            },
          },
        },
      },
    },
    group1: {
      key: "group1",
      type: "nested",
      value: {
        baz: {
          key: "baz",
          type: "changed",
          valAfter: "bars",
          valBefore: "bas",
        },
        foo: {
          key: "foo",
          type: "unchanged",
          value: "bar",
        },
        nest: {
          key: "nest",
          type: "changed",
          valAfter: "str",
          valBefore: {
            key: "value",
          },
        },
      },
    },
    group2: {
      key: "group2",
      type: "deleted",
      value: {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
    },
    group3: {
      key: "group3",
      type: "added",
      value: {
        deep: {
          id: {
            number: 45,
          },
        },
        fee: 100500,
      },
    },
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
