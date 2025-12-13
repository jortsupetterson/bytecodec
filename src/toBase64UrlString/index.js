import { normalizeToUint8Array } from "../0-HELPERS/index.js";

const chunkSize = 0x8000;

/**
 * Encode raw bytes into a URL-safe base64 string.
 * @param {import("../index.d.ts").ByteSource} bytes
 * @returns {import("../index.d.ts").Base64URLString}
 */
export function toBase64UrlString(bytes) {
  const view = normalizeToUint8Array(bytes);
  const base64 = encodeBase64(view);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

/**
 * @param {Uint8Array} bytes
 * @returns {string}
 */
function encodeBase64(bytes) {
  if (typeof Buffer !== "undefined" && typeof Buffer.from === "function")
    return Buffer.from(bytes).toString("base64");

  let binaryString = "";
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const end = Math.min(offset + chunkSize, bytes.length);
    let chunkString = "";
    for (let index = offset; index < end; index++) {
      chunkString += String.fromCharCode(bytes[index]);
    }
    binaryString += chunkString;
  }
  if (typeof btoa !== "function")
    throw new Error("No base64 encoder available in this environment.");
  return btoa(binaryString);
}
