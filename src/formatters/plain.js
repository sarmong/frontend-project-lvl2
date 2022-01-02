import _ from "lodash";

const getPath = (...keys) => keys.join(".");

const getVal = (key, obj) => {
  if (_.isObject(obj[key])) {
    return "[complex value]";
  } else if (typeof obj[key] === "string") {
    return `'${obj[key]}'`;
  } else {
    return String(obj[key]);
  }
};

export const formatPlain = (diff, obj1, obj2) => {
  const iter = (diff, obj1, obj2, path) => {
    return _.entries(diff).reduce((acc, [key, val]) => {
      const currentPath = path ? getPath(path, key) : key;
      if (_.isObject(val)) {
        acc += iter(val, obj1[key], obj2[key], currentPath);
      } else if (val === "added") {
        acc += `Property '${currentPath}' was added with value: ${getVal(
          key,
          obj2
        )}\n`;
      } else if (val === "deleted") {
        acc += `Property '${currentPath}' was removed\n`;
      } else if (val === "changed") {
        acc += `Property '${currentPath}' was updated. From ${getVal(
          key,
          obj1
        )} to ${getVal(key, obj2)}\n`;
      }
      return acc;
    }, ``);
  };

  return iter(diff, obj1, obj2);
};
