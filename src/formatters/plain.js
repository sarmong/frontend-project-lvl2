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
    return _.entries(diffTree).flatMap(([key, val]) => {
      const propPath = path ? getPath(path, key) : key;

      if (val.type === "nested") {
        return iter(val.value, propPath);
      } else if (val.type === "added") {
        return `Property '${propPath}' was added with value: ${getVal(
          val.value
        )}`;
      } else if (val.type === "deleted") {
        return `Property '${propPath}' was removed`;
      } else if (val.type === "changed") {
        return `Property '${propPath}' was updated. From ${getVal(
          val.valBefore
        )} to ${getVal(val.valAfter)}`;
      }
    });
  };

  return iter(diffTree.value).filter(Boolean).join("\n");
};
