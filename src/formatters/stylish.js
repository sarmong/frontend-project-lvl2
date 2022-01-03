import _ from "lodash";

const generateStylishObj = (diffTree) => {
  return _.entries(diffTree).reduce((acc, [key, val]) => {
    if (val.type === "nested") {
      acc[`${key}`] = generateStylishObj(val.value);
    } else if (val.type === "added") {
      acc[`+ ${key}`] = val.value;
    } else if (val.type === "deleted") {
      acc[`- ${key}`] = val.value;
    } else if (val.type === "changed") {
      acc[`- ${key}`] = val.valBefore;
      acc[`+ ${key}`] = val.valAfter;
    } else if (val.type === "unchanged") {
      acc[`  ${key}`] = val.value;
    }
    return acc;
  }, {});
};

const printStylish = (data, replacer = " ", spacesCount = 2) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return String(currentValue);
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`
    );

    return ["{", ...lines, `${bracketIndent}}`].join("\n");
  };

  return iter(data, 1);
};

export const formatStylish = (diff) => {
  const stylishObj = generateStylishObj(diff);
  console.log(stylishObj);

  return printStylish(stylishObj);
};
