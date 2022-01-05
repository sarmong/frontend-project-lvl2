import { fileURLToPath } from 'url';
import path from 'path';

import { describe, it, expect } from '@jest/globals';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '__fixtures__', filename);

describe('genDiff', () => {
  it('should show correct diff for json files', () => {
    const res = genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
    );

    expect(res).toMatchSnapshot();
  });

  it('should show correct diff for yaml files', () => {
    const res = genDiff(
      getFixturePath('file1.yaml'),
      getFixturePath('file2.yaml'),
    );

    expect(res).toMatchSnapshot();
  });

  it('should show correct diff in plain format', () => {
    const res = genDiff(
      getFixturePath('file1.yaml'),
      getFixturePath('file2.yaml'),
      'plain',
    );

    expect(res).toMatchSnapshot();
  });

  it('should show correct diff in json format', () => {
    const res = genDiff(
      getFixturePath('file1.yaml'),
      getFixturePath('file2.yaml'),
      'json',
    );

    expect(res).toMatchSnapshot();
  });
});
