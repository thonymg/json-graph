import { safeEvalBrowser } from "./safeEvalBrowser";
import { safeEvalNode } from "./safeEvalNode";

export const safeEval: (code: string, context?: EvalContext, opts?: EvalOpts) => any =
  typeof window !== "undefined" ? safeEvalBrowser : safeEvalNode;
