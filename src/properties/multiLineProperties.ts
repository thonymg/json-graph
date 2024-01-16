import { extractBetween } from "../utils/extractBetween";
import { parseProperties } from "./parseProperties";

/**
 * Parses properties from a multiline string, where properties are enclosed in square brackets and separated by "|".
 * It joins lines into a single string if they are part of a bracketed section and then parses the properties.
 *
 * @param {string[]} lines - An array of strings representing multiple lines of text.
 * @returns {ReturnType<typeof parseProperties>} An object with key-value pairs parsed from the properties within square brackets.
 */
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
