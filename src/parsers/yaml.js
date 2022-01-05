import yaml from 'js-yaml';

const parseYaml = (file) => yaml.load(file);

export default parseYaml;
