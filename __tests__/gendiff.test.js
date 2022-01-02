import { describe, it, expect } from "@jest/globals";

import genDiff from "../src/index";

const fixturesPath = "__tests__/__fixtures__";

describe("genDiff", () => {
  it("should show correct diff for json files", () => {
    const res = genDiff(
      `${fixturesPath}/file1.json`,
      `${fixturesPath}/file2.json`
    );

    expect(res).toMatchSnapshot();
  });

  it("should show correct diff for yaml files", () => {
    const res = genDiff(
      `${fixturesPath}/file1.yaml`,
      `${fixturesPath}/file2.yaml`
    );

    expect(res).toMatchSnapshot();
  });

  it("should show correct diff in plain format", () => {
    const res = genDiff(
      `${fixturesPath}/file1.yaml`,
      `${fixturesPath}/file2.yaml`,
      "plain"
    );

    expect(res).toMatchSnapshot();
  });

  it("should show correct diff in json format", () => {
    const res = genDiff(
      `${fixturesPath}/file1.yaml`,
      `${fixturesPath}/file2.yaml`,
      "json"
    );

    expect(res).toMatchSnapshot();
  });
});
