import { cleanObject } from "../utils/objectUtils";
import { extractBetween } from "../utils/extractBetween";
import { safeEval } from "../saveEval/index";

export const parseBlockFieldFunction = (lines: string[]): any => {
  const header = lines.shift()!;
  const name = header.split(" ")[1];

  const isEval = header.includes("do");

  let currentLineProps: any = [];
  let isBlock = false;
  lines.map((line) => {
    if (isBlock) {
      currentLineProps.push(line);
    }
    if (line.includes("def")) {
      isBlock = true;
      currentLineProps.push(line);
    }
    if (line.includes("end")) {
      isBlock = false;
    }
  });
  const funcString = extractBetween(currentLineProps.join(" "), "def", "end")?.trim();

  return cleanObject({
    name,
    type: "lambda",
    func: isEval ? safeEval(funcString!) : funcString,
  });
};
