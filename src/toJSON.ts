import { parseBlockFieldFunction } from "./blocks/parseBlockFieldFunction";
import { parseBlockFieldsList } from "./blocks/parseBlockFieldsList";
import { parseBlockFieldsObject } from "./blocks/parseBlockFieldsObject";

/**
 * Parses a structured template string into a JSON-like object representing various structures.
 * The template string can describe structures like Root, Alias, Blocks, and Lambda.
 * Each structure is parsed and organized into a hierarchical JSON object.
@param {TemplateStringsArray} literals - A template string array containing the structured data.
@returns {{ [key: string]: Root }} A JSON-like object with each key representing a Root structure and its corresponding parsed data.
*/
export const toJSON = (literals: TemplateStringsArray): { [key: string]: Root } => {
  const lines = literals[0].split("\n").map((line) => line.trim());
  const result: { [key: string]: Root } = {};

  let currentStruct: any = null;

  while (lines.length) {
    const line = lines[0];
    if (line.startsWith("Root")) {
      currentStruct = parseBlockFieldsList(lines, "Root");
      result[currentStruct.name] = currentStruct;
    } else if (line.startsWith("Alias") && currentStruct) {
      const aliasFields = parseBlockFieldsObject(lines, "Alias");

      const targetField = currentStruct.data.find((d: any) => d.type === aliasFields.name);
      if (targetField) {
        targetField.data = aliasFields.data;
        targetField.type = "Alias";
      }
    } else if (line.startsWith("Blocks") && currentStruct) {
      const aliasFields = parseBlockFieldsList(lines, "Blocks");

      const targetField = currentStruct.data.find((d: any) => d.type === aliasFields.name);
      if (targetField) {
        targetField.data = aliasFields.data;
        targetField.type = "Lambda";
      }
    } else if (line.startsWith("Lambda") && currentStruct) {
      const aliasFields = parseBlockFieldFunction(lines);

      const targetField = currentStruct.data.find((d: any) => d.type === aliasFields.name);

      if (targetField) {
        targetField.data = aliasFields;
        targetField.type = "Lambda";
      }
    } else {
      lines.shift();
    }
  }


  return result;
};
