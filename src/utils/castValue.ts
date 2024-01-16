/**
 * Converts a string to a boolean if it matches "true" or "false" (case-insensitive), otherwise returns the string as it is.
 * @param {string} value - A string value to be cast.
 * @returns {any} The original string, or its boolean representation if it matches "true" or "false" (case-insensitive).
 */
export const castValue = (value: string): any => {
  if (value.toLowerCase() === "true") {
    return true;
  } else if (value.toLowerCase() === "false") {
    return false;
  } else {
    return value;
  }
};
