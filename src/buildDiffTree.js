import _ from "lodash";

export const buildDiffTree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  return keys.reduce((acc, key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      acc[key] = {
        type: "nested",
        value: buildDiffTree(obj1[key], obj2[key]),
      };
    } else if (!_.has(obj1, key)) {
      acc[key] = { type: "added", value: obj2[key] };
    } else if (!_.has(obj2, key)) {
      acc[key] = { type: "deleted", value: obj1[key] };
    } else if (!_.isEqual(obj1[key], obj2[key])) {
      acc[key] = { type: "changed", valBefore: obj1[key], valAfter: obj2[key] };
    } else {
      acc[key] = { type: "unchanged", value: obj2[key] };
    }
    return acc;
  }, {});
};
