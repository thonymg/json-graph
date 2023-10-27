declare const require: any;

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
