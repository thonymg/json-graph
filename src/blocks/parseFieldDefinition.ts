import { cleanObject, isIgnoredLine } from "../utils/objectUtils";

import { extractBetween } from "../utils/extractBetween";
import { handleSpecialCharacters } from "../utils/handleSpecialCharacters";
import { parseProperties } from "../properties/parseProperties";

export const parseFieldDefinition = (line: string, isAlias = false): Field | null => {
  const commentLine = isIgnoredLine("#");
  if (commentLine(line)) {
    return null;
  }
  const properties = extractBetween(line, "[", "]") || "";
  const otherProps = parseProperties(properties);
  line = line
    .replace(/['"].+?['"]/, "")
    .replace(/\[.+?\]/, "")
    .trim();

  let [fieldName, fieldType] = line.split(":").map((l) => l.trim());
  if (!isAlias && !fieldName && fieldType) {
    fieldName = fieldType;
    fieldType = "";
  }
  const { type, required, optional } = handleSpecialCharacters(fieldType);
  return cleanObject({
    name: fieldName,
    type,
    required,
    optional,
    ...otherProps,
  });
};
