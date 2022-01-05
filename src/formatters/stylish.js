/* eslint-disable no-use-before-define */
import _ from 'lodash';

const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const getLine = (val, depth) => {
  if (!_.isObject(val)) {
    return String(val);
  }

  const children = _.entries(val).map(([key, value]) => lines.unchanged({ key, value }, depth + 1));

  return `{\n${children.join('\n')}\n${getIndent(depth)}  }`;
};

const lines = {
  root: ({ value }, depth, iter) => {
    const children = _.values(value).flatMap((node) => lines[node.type](node, depth + 1, iter));
    return `{\n${children.join('\n')}\n}`;
  },
  nested: ({ value, key }, depth, iter) => {
    const indent = getIndent(depth);
    const children = _.values(value).flatMap((node) => lines[node.type](node, depth + 1, iter));
    return `${indent}  ${key}: {\n${children.join('\n')}\n${indent}  }`;
  },
  added: (node, depth) => `${getIndent(depth)}+ ${node.key}: ${getLine(node.value, depth)}`,
  deleted: (node, depth) => `${getIndent(depth)}- ${node.key}: ${getLine(node.value, depth)}`,
  changed: (node, depth) => [
    `${getIndent(depth)}- ${node.key}: ${getLine(node.valBefore, depth)}`,
    `${getIndent(depth)}+ ${node.key}: ${getLine(node.valAfter, depth)}`,
  ],
  unchanged: (node, depth) => `${getIndent(depth)}  ${node.key}: ${getLine(node.value, depth)}`,
};

const formatStylish = (diffTree) => {
  const iter = (node, depth) => lines[node.type](node, depth, iter);
  return iter(diffTree, 0);
};

export default formatStylish;
