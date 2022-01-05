import fs from 'fs';
import path from 'path';

import parseYaml from './yaml.js';

const parsers = {
  '.yml': parseYaml,
  '.yaml': parseYaml,
  '.json': JSON.parse,
};

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath));

const parseFile = (filepath) => {
  const file = readFile(filepath);
  const extension = path.extname(filepath);
  const parse = parsers[extension];

  return parse(file);
};

export default parseFile;
