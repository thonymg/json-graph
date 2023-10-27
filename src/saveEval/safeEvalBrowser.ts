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
