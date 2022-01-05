import buildDiffTree from './buildDiffTree.js';
import format from './formatters/index.js';
import parseFile from './parsers/index.js';

const genDiff = (filepath1, filepath2, formatType) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const diffTree = buildDiffTree(obj1, obj2);

  return format(diffTree, formatType);
};

export default genDiff;
