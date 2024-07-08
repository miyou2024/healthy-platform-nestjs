import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { merge } from 'lodash';

export function initGlobalConfig(yamlFile: string | string[]) {

  let yamlFileList = [];
  if (Array.isArray(yamlFile)) {
    yamlFileList = yamlFile;
  } else {
    yamlFileList.push(yamlFile);
  }

  return () => {
    const configs = yamlFileList.map(yamlFile => {
      if (!yamlFile.startsWith('/')) {
        // console.log('initGlobalConfig:yamlFile.startsWith=false', yamlFile);
        yamlFile = `${process.env['PWD']}/${yamlFile}`;
      }
      // console.log('initGlobalConfig:yamlFile', yamlFile);
      return yaml.load(
        readFileSync(yamlFile, 'utf8'),
      ) as Record<string, any>;
    });
    // console.log('configs', configs, merge({}, ...configs));
    return merge({}, ...configs);
  };
}
