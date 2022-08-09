const ts = require('typescript');
const { transformer } = require('./common/transformer');
const childProcess = require('child_process');
const fs = require('fs/promises');
const { load, createOutDir } = require('./common/utils');

const run = async () => {
  const { parsedCommandLine } = load();
  const { outDir, mainJsPath } = createOutDir();

  /**
   * @type {ts.CompilerOptions}
   */
  const compilerOptions = {
    ...parsedCommandLine.options,
    outDir,
    incremental: true,
    sourceMap: true,
  };

  const compilerHost = ts.createWatchCompilerHost(
    parsedCommandLine.fileNames,
    compilerOptions,
    ts.sys
  );

  compilerHost.afterProgramCreate = (program) => {
    program.getProgram().emit(undefined, undefined, undefined, false, {
      before: [transformer],
    });

    childProcess.exec(
      `node -r source-map-support/register ${mainJsPath}`,
      (err, stdout, stderr) => {
        if (err) {
          console.error(err.stack.split('\n').slice(1, -4).join('\n'));
          return;
        }

        if (stdout.length) {
          console.log(stdout);
        }

        if (stderr.length) {
          console.error(stderr);
        }
      }
    );
  };

  const watch = ts.createWatchProgram(compilerHost);

  console.log(`Emitted files into ${outDir}`);

  let hasCleanedUp = false;
  const onExit = async () => {
    if (!hasCleanedUp) {
      hasCleanedUp = true;
      watch.close();
      await fs.rm(outDir, { recursive: true, force: true });
      console.log(`Deleted ${outDir}`);
    }
  };

  process.on('exit', onExit);
  process.on('SIGINT', onExit);
  process.on('SIGTERM', onExit);
  process.on('uncaughtException', onExit);
  process.on('unhandledRejection', onExit);
};

run();
