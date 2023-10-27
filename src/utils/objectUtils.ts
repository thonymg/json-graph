export const isValidObject = (obj: { [key: string]: any }): boolean => {
  return obj && Object.keys(obj).length > 0;
};

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

export const isIgnoredLine = (prefix: string) => {
  return (line: string): boolean => {
    return line.trim().startsWith(prefix);
  };
};

export const removeItemsFromList = (list1: any[], list2: any[]) => {
  return list1.filter((item: any) => !list2.includes(item));
};
