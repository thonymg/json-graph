import { cleanObject, removeItemsFromList } from "../utils/objectUtils";

import { extractBetween } from "../utils/extractBetween";
import { generateUniqueKey } from "../utils/generateUniqueKey";
import { parseFieldDefinition } from "./parseFieldDefinition";
import { parseProperties } from "./../properties/parseProperties";

export const parseBlockFieldsList = (lines: string[], blockType: "Root" | "Alias" | "Blocks"): any => {
  const fields: Field[] = [];

  const header = lines.shift()!;
  const name = header.split(" ")[1];
  const props = extractBetween(header, "[", "]");

  let currentLineProps: any[] = [];
  let isBlock = false;
  lines
    .map((line, index) => {
      if (isBlock) {
        currentLineProps.push(line);
      }
      if (line.includes("[") && !line.includes("]")) {
        isBlock = true;
        currentLineProps.push(line);
      }
      if (!line.includes("[") && line.includes("]")) {
        isBlock = false;
      }
    })
    .join(" ");

  const innerLine = currentLineProps.join(" ");
  const multilineProps = parseFieldDefinition(innerLine);

  const restLines = removeItemsFromList(lines, currentLineProps);
  while (restLines.length && !restLines[0].startsWith("}")) {
    fields.push(parseFieldDefinition(restLines.shift())!);
  }
  fields.push(multilineProps!);

  return cleanObject({
    name,
    id: generateUniqueKey(),
    type: blockType,
    ...parseProperties(props!),
    data: fields,
  });
};
