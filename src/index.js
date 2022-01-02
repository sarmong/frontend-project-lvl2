import { findDiff } from "./findDiff.js";
import format from "./formatters/index.js";
import { parseFile } from "./parsers/index.js";

const genDiff = (filepath1, filepath2, formatType) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const diff = findDiff(obj1, obj2);

  return format(diff, obj1, obj2, formatType);
};

export default genDiff;
