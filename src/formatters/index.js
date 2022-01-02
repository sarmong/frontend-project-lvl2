import { formatStylish } from "./stylish.js";
import { formatPlain } from "./plain.js";

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify,
};

const format = (diff, obj1, obj2, formatType = "stylish") =>
  formatters[formatType](diff, obj1, obj2);

export default format;
