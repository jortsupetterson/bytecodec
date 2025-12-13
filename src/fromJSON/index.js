import { fromString } from "../fromString/index.js";

/**
 * Serialize a JavaScript value into UTF-8 JSON bytes.
 * @param {any} value
 * @returns {Uint8Array}
 */
export function fromJSON(value) {
  try {
    return fromString(JSON.stringify(value));
  } catch (error) {
    throw new Error(`fromJSON failed to stringify value: ${error.message}`);
  }
}
