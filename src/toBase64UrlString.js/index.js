/**
 * @typedef {string} Base64URLString
 * @typedef {Uint8Array | ArrayBuffer | ArrayBufferView | number[]} ByteSource
 */

const chunkSize = 0x8000;

/**
 * Encode raw bytes into a URL-safe base64 string.
 * @param {ByteSource} bytes
 * @returns {Base64URLString}
 */
export function toBase64UrlString(bytes) {
  const view = normalizeToUint8Array(bytes);
  const base64 = encodeBase64(view);
  return base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

/**
 * @param {ByteSource} input
 * @returns {Uint8Array}
 */
function normalizeToUint8Array(input) {
  if (input instanceof Uint8Array) return input;
  if (input instanceof ArrayBuffer)
    return new Uint8Array(input);
  if (ArrayBuffer.isView(input))
    return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
  if (Array.isArray(input)) return new Uint8Array(input);
  throw new TypeError(
    "toBase64UrlString expects a Uint8Array, ArrayBuffer, ArrayBufferView, or number[]",
  );
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
