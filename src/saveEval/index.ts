import { safeEvalBrowser } from "./safeEvalBrowser";
import { safeEvalNode } from "./safeEvalNode";

/**
 * Evaluates a given string of code safely, either in a browser or Node.js environment,
 * based on the environment where the script is running.
 *
 * @param {string} code - The string of code to be evaluated.
 * @param {EvalContext} [context={}] - (Node.js only) The context object providing variables to the code being evaluated.
 * @param {EvalOpts} [opts={}] - (Node.js only) The options for Node's VM module to control the execution.
 * @returns {any} The result of the evaluated code.
 */
export const safeEval: (code: string, context?: EvalContext, opts?: EvalOpts) => any =
  typeof window !== "undefined" ? safeEvalBrowser : safeEvalNode;
