import { textEncoder } from "../0-HELPERS/index.js";

/**
 * Encode a UTF-8 string into bytes.
 * @param {string} text
 * @returns {Uint8Array}
 */
export function fromString(text) {
  if (typeof text !== "string")
    throw new TypeError("fromString expects a string input");

  if (textEncoder) return textEncoder.encode(text);

  if (typeof Buffer !== "undefined" && typeof Buffer.from === "function")
    return new Uint8Array(Buffer.from(text, "utf8"));

  throw new Error("No UTF-8 encoder available in this environment.");
}
