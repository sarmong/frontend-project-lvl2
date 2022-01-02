import _ from "lodash";

export const findDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  return keys.reduce((acc, key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      acc[key] = findDiff(obj1[key], obj2[key]);
    } else if (!_.has(obj1, key)) {
      acc[key] = "added";
    } else if (!_.has(obj2, key)) {
      acc[key] = "deleted";
    } else if (obj1[key] !== obj2[key]) {
      acc[key] = "changed";
    } else if (obj1[key] === obj2[key]) {
      acc[key] = "unchanged";
    }
    return acc;
  }, {});
};
