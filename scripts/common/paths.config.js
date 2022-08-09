const path = require('path');

const fileName = __filename;
const dirName = path.dirname(fileName);

const ROOT_PATH = path.join(dirName, '../..');

const SRC_PATH = path.join(ROOT_PATH, 'src');

const BUILD_PATH = path.join(ROOT_PATH, 'build');

const SRC_MAIN_TS_PATH = path.join(SRC_PATH, 'main.ts');

const TSCONFIG_JSON_PATH = path.join(SRC_PATH, 'tsconfig.json');

module.exports = {
  ROOT_PATH,
  SRC_PATH,
  BUILD_PATH,
  SRC_MAIN_TS_PATH,
  TSCONFIG_JSON_PATH,
};
