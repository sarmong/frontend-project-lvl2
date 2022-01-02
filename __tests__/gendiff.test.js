import { describe, it, expect } from "@jest/globals";

import { genDiff } from "../src/gendiff";

const fixturesPath = "__tests__/__fixtures__";

describe("genDiff", () => {
  it("should show correct diff for json files", () => {
    const res = genDiff(
      `${fixturesPath}/file1.json`,
      `${fixturesPath}/file2.json`
    );

    expect(res).toMatchInlineSnapshot(`
      "{
       - follow: false
         host: hexlet.io
       - proxy: 123.234.53.22
       - timeout: 50
       + timeout: 20
       + verbose: true
      }"
    `);
  });

  it("should show correct diff for yaml files", () => {
    const res = genDiff(
      `${fixturesPath}/file1.yaml`,
      `${fixturesPath}/file2.yaml`
    );

    expect(res).toMatchInlineSnapshot(`
      "{
       - follow: false
         host: hexlet.io
       - proxy: 123.234.53.22
       - timeout: 50
       + timeout: 20
       + verbose: true
      }"
    `);
  });
});
