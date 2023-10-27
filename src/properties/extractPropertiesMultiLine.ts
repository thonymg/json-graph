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
