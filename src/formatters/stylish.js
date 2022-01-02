import _ from "lodash";

const generateStylishObj = (diff, obj1, obj2) => {
  return _.entries(diff).reduce((acc, [key, val]) => {
    if (_.isObject(val)) {
      acc[`  ${key}`] = generateStylishObj(val, obj1[key], obj2[key]);
    } else if (val === "added") {
      acc[`+ ${key}`] = obj2[key];
    } else if (val === "deleted") {
      acc[`- ${key}`] = obj1[key];
    } else if (val === "changed") {
      acc[`- ${key}`] = obj1[key];
      acc[`+ ${key}`] = obj2[key];
    } else if (val === "unchanged") {
      acc[`  ${key}`] = obj2[key];
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

export const formatStylish = (diff, obj1, obj2) => {
  const stylishObj = generateStylishObj(diff, obj1, obj2);

  return printStylish(stylishObj);
};
