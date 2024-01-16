import { cleanObject } from "../utils/objectUtils";
import { extractBetween } from "../utils/extractBetween";
import { safeEval } from "../saveEval/index";

/**
 * Parses a block of lines to extract a function definition.
 * The function name is extracted from the first line, and its body is extracted from the lines between "def" and "end".
 *
 * @param {string[]} lines - Array of strings, each representing a line of the block.
 * @returns {any} An object containing the function name, type, and the function itself (either evaluated or as a string).
 */
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
