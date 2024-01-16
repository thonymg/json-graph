declare const require: any;
/**
 * Safely evaluates a given string of code in a Node.js environment.
 * It creates a sandbox environment to isolate the evaluated code.
 *
 * @param {string} code - The string of code to be evaluated.
 * @param {EvalContext} [context={}] - The context object providing variables to the code being evaluated.
 * @param {EvalOpts} [opts={}] - The options for Node's VM module to control the execution.
 * @returns {any} The result of the evaluated code.
 */
export const safeEvalNode = (code: string, context: EvalContext = {}, opts: EvalOpts = {}): any => {
  const vm = require("node:vm");

  let sandbox: EvalContext = {};
  let resultKey = "SAFE_EVAL_" + Math.floor(Math.random() * 1000000);
  sandbox[resultKey] = {};

  let clearContext = `
    (function() {
      Function = undefined;
      const keys = Object.getOwnPropertyNames(this).concat(['constructor']);
      keys.forEach((key) => {
        const item = this[key];
        if (!item || typeof item.constructor !== 'function') return;
        this[key].constructor = undefined;
      });
    })();
  `;

  code = clearContext + resultKey + "=" + code;

  Object.keys(context).forEach((key: string) => {
    sandbox[key] = context[key];
  });

  vm.runInNewContext(code, sandbox, opts);
  return sandbox[resultKey];
};
