/**
 * Safely evaluates a given string of code in a browser environment.
 * It uses an iframe to isolate the evaluated code and prevent it from accessing the main page's context.
 *
 * @param {string} code - The string of code to be evaluated.
 * @returns {any} The result of the evaluated code, or null if an error occurs.
 */
export const safeEvalBrowser = (code: string): any => {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  let result;
  try {
    // @ts-ignore
    result = iframe.contentWindow?.eval(code);
  } catch (e) {
    console.error(e);
    result = null;
  } finally {
    document.body.removeChild(iframe);
  }

  return result;
};
