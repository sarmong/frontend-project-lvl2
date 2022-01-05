import _ from 'lodash';

const getPath = (...keys) => keys.join('.');

const getVal = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return String(val);
};

const formatPlain = (diffTree) => {
  const iter = (tree, path) => _.entries(tree).flatMap(([key, val]) => {
    const propPath = path ? getPath(path, key) : key;

    if (val.type === 'nested') {
      return iter(val.value, propPath);
    }
    if (val.type === 'added') {
      return `Property '${propPath}' was added with value: ${getVal(
        val.value,
      )}`;
    }
    if (val.type === 'deleted') {
      return `Property '${propPath}' was removed`;
    }
    if (val.type === 'changed') {
      return `Property '${propPath}' was updated. From ${getVal(
        val.valBefore,
      )} to ${getVal(val.valAfter)}`;
    }

    return null;
  });

  return iter(diffTree.value).filter(Boolean).join('\n');
};

export default formatPlain;
