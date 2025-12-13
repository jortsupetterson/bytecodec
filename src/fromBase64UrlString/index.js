/**
 * Decode a base64url string into raw bytes.
 * @param {import("../index.d.ts").Base64URLString} base64UrlString
 * @returns {Uint8Array}
 */
export function fromBase64UrlString(base64UrlString) {
  const base64String = toBase64String(base64UrlString);
  return decodeBase64(base64String);
}

/**
 * @param {import("../index.d.ts").Base64URLString} base64UrlString
 * @returns {string}
 */
function toBase64String(base64UrlString) {
  let base64String = base64UrlString.replace(/-/g, "+").replace(/_/g, "/");
  const mod = base64String.length & 3;
  if (mod === 2) base64String += "==";
  else if (mod === 3) base64String += "=";
  else if (mod !== 0) throw new Error("Invalid base64url length");
  return base64String;
}

/**
 * @param {string} base64String
 * @returns {Uint8Array}
 */
function decodeBase64(base64String) {
  if (typeof Buffer !== "undefined" && typeof Buffer.from === "function")
    return new Uint8Array(Buffer.from(base64String, "base64"));

  if (typeof atob !== "function")
    throw new Error("No base64 decoder available in this environment.");

  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let index = 0; index < binaryString.length; index++)
    bytes[index] = binaryString.charCodeAt(index);
  return bytes;
}
