'use strict';

const {
  prepareMainThreadExecution
} = require('internal/bootstrap/pre_execution');
// 这个函数执行的流程中有这么一句话
// CJSLoader.Module.runMain =
// require('internal/modules/run_main').executeUserEntryPoint;
// 就是下面的runMain方法
prepareMainThreadExecution(true);

markBootstrapComplete();

// Note: this loads the module through the ESM loader if the module is
// determined to be an ES module. This hangs from the CJS module loader
// because we currently allow monkey-patching of the module loaders
// in the preloaded scripts through require('module').
// runMain here might be monkey-patched by users in --require.
// XXX: the monkey-patchability here should probably be deprecated.
require('internal/modules/cjs/loader').Module.runMain(process.argv[1]);
