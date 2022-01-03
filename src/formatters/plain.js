import _ from "lodash";

const getPath = (...keys) => keys.join(".");

const getVal = (val) => {
  if (_.isObject(val)) {
    return "[complex value]";
  } else if (typeof val === "string") {
    return `'${val}'`;
  } else {
    return String(val);
  }
};

export const formatPlain = (diffTree) => {
  const iter = (diffTree, path) => {
    return _.entries(diffTree).reduce((acc, [key, val]) => {
      const currentPath = path ? getPath(path, key) : key;

      if (val.type === "nested") {
        acc += iter(val.value, currentPath);
      } else if (val.type === "added") {
        acc += `Property '${currentPath}' was added with value: ${getVal(
          val.value
        )}\n`;
      } else if (val.type === "deleted") {
        acc += `Property '${currentPath}' was removed\n`;
      } else if (val.type === "changed") {
        acc += `Property '${currentPath}' was updated. From ${getVal(
          val.valBefore
        )} to ${getVal(val.valAfter)}\n`;
      }
      return acc;
    }, ``);
  };

  return iter(diffTree);
};
