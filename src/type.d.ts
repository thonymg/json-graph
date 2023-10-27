type EvalContext = {
  [key: string]: any;
};

type EvalOpts = {
  filename?: string;
  lineOffset?: number;
  columnOffset?: number;
  displayErrors?: boolean;
  timeout?: number;
  breakOnSigint?: boolean;
};

interface BaseField {
  comment?: string;
  title?: string;
}

interface Field extends BaseField {
  name: string;
  type: string;
  description?: string;
  hidden?: boolean;
  required?: boolean;
  optional?: boolean;
  data?: Field[];
}

interface Root extends BaseField {
  type: "Root";
  name: string;
  data: Field[];
}

interface Alias extends Root {}
