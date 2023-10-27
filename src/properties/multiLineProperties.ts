import { extractBetween } from "../utils/extractBetween";
import { parseProperties } from "./parseProperties";

export const multiLineProperties = (lines: string[]) => {
  let currentLine: string[] = [];
  let isBlock = false;

  lines.map((line) => {
    if (isBlock) {
      currentLine.push(line);
    }
    if (line.includes("[") && !line.includes("]")) {
      isBlock = true;
      currentLine.push(line);
    }
    if (!line.includes("[") && line.includes("]")) {
      isBlock = false;
    }
  });
  const line = currentLine.join(" ");
  const props = extractBetween(line, "[", "]");
  return parseProperties(props);
};
