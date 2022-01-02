import fs from "fs";
import path from "path";

import { parseJson } from "./json.js";
import { parseYaml } from "./yaml.js";

const parsers = {
  ".yml": parseYaml,
  ".yaml": parseYaml,
  ".json": parseJson,
};

const readFile = (filepath) =>
  fs.readFileSync(path.resolve(process.cwd(), filepath));

export const parseFile = (filepath) => {
  const file = readFile(filepath);
  const extension = path.extname(filepath);
  const parse = parsers[extension];

  return parse(file);
};
