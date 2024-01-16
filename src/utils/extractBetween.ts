/**
 * Extracts a substring from a string, located between specified start and end markers.
 * @param {string} line - The string to extract from.
 * @param {string} start - The starting marker of the substring.
 * @param {string} end - The ending marker of the substring.
 * @returns {string} The extracted substring, or an empty string if the markers are not found.
 */
export const extractBetween = (line: string, start: string, end: string): string => {
  const escapedStart = start.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const escapedEnd = end.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`${escapedStart}(.+?)${escapedEnd}`);
  return line?.match(regex)?.[1] || "";
};
