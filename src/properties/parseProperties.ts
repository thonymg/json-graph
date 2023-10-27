import { castValue } from "../utils/castValue";
import { isValidObject } from "../utils/objectUtils";

export const parseProperties = (properties: string): { [key: string]: string } | null => {
  const isValidString = typeof properties !== "string" || !properties.length;

  if (isValidString) {
    console.error("The provided properties is not a valid string:", properties);
    return null;
  }

  const parsedProperties = properties.split("|").reduce((acc, prop) => {
    const parts = prop
      .trim()
      .split(":")
      .map((part) => part.trim().replace(/['"]/g, ""));

    if (parts.length === 1) {
      acc[parts[0]] = true;
    } else {
      acc[parts[0]] = castValue(parts[1]);
    }

    return acc;
  }, {} as { [key: string]: any });

  return isValidObject(parsedProperties) ? parsedProperties : null;
};
