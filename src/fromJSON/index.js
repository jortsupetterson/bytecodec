import { toString } from "../toString/index.js";

/**
 * Parse bytes into a JavaScript value via JSON.parse.
 * @param {import("../index.d.ts").ByteSource} bytes
 * @returns {any}
 */
export function fromJSON(bytes) {
  const jsonString = toString(bytes);
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error(`fromJSON failed to parse value: ${error.message}`);
  }
}
