import { cleanObject, isIgnoredLine } from "../utils/objectUtils";

import { extractBetween } from "../utils/extractBetween";
import { handleSpecialCharacters } from "../utils/handleSpecialCharacters";
import { parseProperties } from "../properties/parseProperties";

/**
 * Parses a single line to extract field definition details, including name, type, and additional properties.
 * If the line is a comment or doesn't contain valid field information, it returns null.
 *
 * @param {string} line - The line containing the field definition.
 * @param {boolean} [isAlias=false] - Indicates if the field is an alias.
 * @returns {Field | null} An object with field details or null if the line is a comment or invalid.
 */
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
