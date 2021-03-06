/* eslint-disable fp/no-mutation */
import _ from 'lodash';

const buildDiffTree = (data1, data2) => {
  const iter = (obj1, obj2) => {
    const keys1 = _.keys(obj1);
    const keys2 = _.keys(obj2);
    const keys = _.sortBy(_.union(keys1, keys2));

    return keys.reduce((acc, key) => {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        acc[key] = {
          key,
          type: 'nested',
          value: iter(obj1[key], obj2[key]),
        };
      } else if (!_.has(obj1, key)) {
        acc[key] = { key, type: 'added', value: obj2[key] };
      } else if (!_.has(obj2, key)) {
        acc[key] = { key, type: 'deleted', value: obj1[key] };
      } else if (!_.isEqual(obj1[key], obj2[key])) {
        acc[key] = {
          key,
          type: 'changed',
          valBefore: obj1[key],
          valAfter: obj2[key],
        };
      } else {
        acc[key] = { key, type: 'unchanged', value: obj2[key] };
      }
      return acc;
    }, {});
  };

  return { type: 'root', value: iter(data1, data2) };
};

export default buildDiffTree;
