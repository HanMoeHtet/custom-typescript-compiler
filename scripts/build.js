const { BUILD_PATH } = require('./common/paths.config');
const ts = require('typescript');
const { transformer } = require('./common/transformer');
const fs = require('fs/promises');
const { load } = require('./common/utils');

const run = async () => {
  await fs.rm(BUILD_PATH, { recursive: true, force: true });

  const { parsedCommandLine } = load();

  const compilerHost = ts.createCompilerHost(parsedCommandLine.options, true);

  const program = ts.createProgram(
    parsedCommandLine.fileNames,
    parsedCommandLine.options,
    compilerHost
  );

  program.emit(undefined, undefined, undefined, undefined, {
    before: [transformer],
  });
};

run();
