/**
 * Checks whether an object is valid and non-empty.
 * @param {Object} obj - An object with string keys and any type of values.
 * @returns {boolean} True if the object is valid (not null or undefined) and has at least one key-value pair, otherwise false.
 */
export const isValidObject = (obj: { [key: string]: any }): boolean => {
  return obj && Object.keys(obj).length > 0;
};

/**
 * Cleans an object or array by recursively removing null, undefined, empty strings, and false values.
 * @param {any} obj - An object or array to clean.
 * @returns {any} The cleaned object or array, or null if the result is empty.
 */
export const cleanObject = (obj: any): any => {
  if (Array.isArray(obj)) {
    const cleanedArray = obj.map(cleanObject).filter((item) => item !== null);
    return cleanedArray.length > 0 ? cleanedArray : null;
  } else if (typeof obj === "object" && obj !== null) {
    const cleanedObj: any = {};
    for (const key in obj) {
      const value = cleanObject(obj[key]);
      if (value !== null && key !== "undefined" && key !== "null" && key !== "") {
        cleanedObj[key] = value;
      }
    }
    return Object.keys(cleanedObj).length > 0 ? cleanedObj : null;
  } else if ([undefined, null, false, ""].includes(obj)) {
    return null;
  }
  return obj;
};

/**
 * Creates a function to check if a line of text starts with a specified prefix.
 * @param {string} prefix - A string prefix.
 * @returns {(line: string) => boolean} A function that takes a line of text and returns true if it starts with the specified prefix, otherwise false.
 */
export const isIgnoredLine = (prefix: string) => {
  return (line: string): boolean => {
    return line.trim().startsWith(prefix);
  };
};

/**
 * Removes items from one list that are present in another list.
 * @param {any[]} list1 - The list from which items will be removed.
 * @param {any[]} list2 - The list containing items to be removed from list1.
 * @returns {any[]} A new list containing items from list1 that are not in list2.
 */
export const removeItemsFromList = (list1: any[], list2: any[]) => {
  return list1.filter((item: any) => !list2.includes(item));
};
