import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify,
};

const format = (diff, formatType = 'stylish') => formatters[formatType](diff);

export default format;
