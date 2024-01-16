/**
 * Extracts a string of properties from an array of lines, stopping when a line containing "]" is encountered.
 * The properties are concatenated from multiple lines until the closing "]" is found.
 *
 * @param {string[]} lines - An array of strings representing multiple lines of text.
 * @returns {string} A string containing concatenated properties from the lines.
 */
export const extractPropertiesMultiLine = (lines: string[]): string => {
  let properties = "";
  while (lines.length && !lines[0].includes("]")) {
    properties += lines.shift()!.trim();
  }

  if (lines.length && lines[0].includes("]")) {
    const remaining = lines.shift()!.split("]")[0];
    properties += remaining;
  }

  return properties;
};
