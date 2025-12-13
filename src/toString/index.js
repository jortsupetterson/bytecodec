import { textDecoder } from "../0-HELPERS/index.js";
import { normalizeToUint8Array } from "../0-HELPERS/index.js";

/**
 * Decode UTF-8 bytes into a string.
 * @param {import("../index.d.ts").ByteSource} bytes
 * @returns {string}
 */
export function toString(bytes) {
  const view = normalizeToUint8Array(bytes);

  if (textDecoder) return textDecoder.decode(view);

  if (typeof Buffer !== "undefined" && typeof Buffer.from === "function")
    return Buffer.from(view).toString("utf8");

  throw new Error("No UTF-8 decoder available in this environment.");
}
