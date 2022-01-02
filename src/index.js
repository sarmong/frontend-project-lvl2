import { findDiff } from "./findDiff.js";
import { formatStylish } from "./formatters/stylish.js";
import { parseFile } from "./parsers/index.js";

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const diff = findDiff(obj1, obj2);

  return formatStylish(diff, obj1, obj2);
};

export default genDiff;
