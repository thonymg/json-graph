export const extractBetween = (line: string, start: string, end: string): string => {
  const escapedStart = start.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const escapedEnd = end.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`${escapedStart}(.+?)${escapedEnd}`);
  return line?.match(regex)?.[1] || "";
};
