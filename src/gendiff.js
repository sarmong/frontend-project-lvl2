import fs from "fs";
import path from "path";
import _ from "lodash";

const readJsonFile = (filepath) => {
  const file = fs.readFileSync(path.resolve(process.cwd(), filepath));
  return JSON.parse(file);
};

export const genDiff = (filepath1, filepath2) => {
  const file1 = readJsonFile(filepath1);
  const file2 = readJsonFile(filepath2);
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const res = keys.reduce((acc, key) => {
    if (!_.has(file1, key)) {
      acc += ` + ${key}: ${file2[key]}\n`;
    } else if (!_.has(file2, key)) {
      acc += ` - ${key}: ${file1[key]}\n`;
    } else if (file1[key] !== file2[key]) {
      acc += ` - ${key}: ${file1[key]}\n`;
      acc += ` + ${key}: ${file2[key]}\n`;
    } else {
      acc += `   ${key}: ${file2[key]}\n`;
    }
    return acc;
  }, "");

  return `{\n${res}}`;
};
