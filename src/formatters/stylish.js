import _ from "lodash";

const getIndent = (depth, spacesCount = 4) =>
  " ".repeat(depth * spacesCount - 2);

const lines = {
  root: (node, depth, iter) => {
    const children = _.values(node.value).flatMap((node) =>
      lines[node.type](node, depth + 1, iter)
    );
    return `{\n${children.join("\n")}\n}`;
  },
  nested: (node, depth, iter) => {
    const indent = getIndent(depth);
    const children = _.values(node.value).flatMap((node) =>
      lines[node.type](node, depth + 1, iter)
    );
    return `${indent}  ${node.key}: {\n${children.join("\n")}\n${indent}  }`;
  },
  added: (node, depth) =>
    `${getIndent(depth)}+ ${node.key}: ${getLine(node.value, depth)}`,
  deleted: (node, depth) =>
    `${getIndent(depth)}- ${node.key}: ${getLine(node.value, depth)}`,
  changed: (node, depth) => [
    `${getIndent(depth)}- ${node.key}: ${getLine(node.valBefore, depth)}`,
    `${getIndent(depth)}+ ${node.key}: ${getLine(node.valAfter, depth)}`,
  ],
  unchanged: (node, depth) =>
    `${getIndent(depth)}  ${node.key}: ${getLine(node.value, depth)}`,
};

const getLine = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }

  const children = _.entries(value).map(([key, value]) =>
    lines.unchanged({ key, value }, depth + 1)
  );

  return `{\n${children.join("\n")}\n${getIndent(depth)}  }`;
};

export const formatStylish = (diffTree) => {
  const iter = (node, depth) => lines[node.type](node, depth, iter);
  return iter(diffTree, 0);
};
