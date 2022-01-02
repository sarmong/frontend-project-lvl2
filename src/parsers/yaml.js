import yaml from "js-yaml";

export const parseYaml = (file) => yaml.load(file);
