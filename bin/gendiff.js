#!/usr/bin/env node

import { Command } from 'commander';

import genDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>');

program.action((filepath1, filepath2, opts) => {
  const res = genDiff(filepath1, filepath2, opts.format);
  console.log(res);
});

program.parse(process.argv);
