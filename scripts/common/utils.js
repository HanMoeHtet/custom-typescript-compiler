const ts = require('typescript');
const { TSCONFIG_JSON_PATH, SRC_PATH } = require('./paths.config');
const path = require('path');

const load = () => {
  const configFile = ts.readConfigFile(TSCONFIG_JSON_PATH, ts.sys.readFile);

  const parsedCommandLine = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    SRC_PATH
  );

  return { configFile, parsedCommandLine };
};

const createOutDir = () => {
  const outDir = `./dev/ts_transformer_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 15)}`;

  const mainJsPath = path.join(outDir, 'main.js');

  return { outDir, mainJsPath };
};

module.exports = {
  load,
  createOutDir,
};
