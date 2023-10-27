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
