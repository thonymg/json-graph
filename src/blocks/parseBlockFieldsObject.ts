import { cleanObject, removeItemsFromList } from "../utils/objectUtils";

import { extractBetween } from "../utils/extractBetween";
import { parseFieldDefinition } from "./parseFieldDefinition";
import { parseProperties } from "./../properties/parseProperties";

export const parseBlockFieldsObject = (lines: string[], blockType: string): any => {
  const fieldsObject: { [key: string]: Field } = {};

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
    const field = parseFieldDefinition(restLines.shift()!);
    // @ts-ignore
    fieldsObject[field.name] = field;
  }

  return cleanObject({
    // @ts-ignore
    name,
    // @ts-ignore
    type: blockType,
    ...multilineProps,
    ...parseProperties(props!),
    data: fieldsObject,
  });
};
