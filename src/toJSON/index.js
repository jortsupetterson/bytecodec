import { toString } from "../toString/index.js";

/**
 * Parse JSON (string or bytes) into a JavaScript value via JSON.parse.
 * @param {import("../index.d.ts").ByteSource | string} input
 * @returns {any}
 */
export function toJSON(input) {
  const jsonString = typeof input === "string" ? input : toString(input);
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error(`toJSON failed to parse value: ${error.message}`);
  }
}
