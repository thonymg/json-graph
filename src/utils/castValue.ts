export const castValue = (value: string): any => {
  if (value.toLowerCase() === "true") {
    return true;
  } else if (value.toLowerCase() === "false") {
    return false;
  } else {
    return value;
  }
};
