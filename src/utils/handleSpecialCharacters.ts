/**
 * Analyzes a type string for special characters indicating whether a type is required or optional, and removes these characters.
 * @param {string} type - A string representing a type, potentially with special characters (! for required, ? for optional) at the end.
 * @returns {{ type: string; required?: boolean; optional?: boolean }} An object with the type string with special characters
 * */
export const handleSpecialCharacters = (
  type: string
): {
  type: string;
  required?: boolean;
  optional?: boolean;
} => {
  let flags: { required?: boolean; optional?: boolean } = {};
  if (type?.endsWith("!")) {
    flags.required = true;
    type = type.slice(0, -1);
  } else if (type?.endsWith("?")) {
    flags.optional = true;
    type = type.slice(0, -1);
  }
  return { type, ...flags };
};
