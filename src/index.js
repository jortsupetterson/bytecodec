import { fromBase64UrlString } from "./fromBase64UrlString.js/index.js";
import { toBase64UrlString } from "./toBase64UrlString.js/index.js";

/**
 * @typedef {string} Base64URLString
 * @typedef {Uint8Array | ArrayBuffer | ArrayBufferView | number[]} ByteSource
 */

export { fromBase64UrlString, toBase64UrlString };

/**
 * Convenience wrapper around the codec functions.
 */
export class Bytes {
  /**
   * Decode a base64url string into raw bytes.
   * @param {Base64URLString} base64UrlString
   * @returns {Uint8Array}
   */
  static fromBase64UrlString(base64UrlString) {
    return fromBase64UrlString(base64UrlString);
  }

  /**
   * Encode bytes into a base64url string.
   * @param {ByteSource} bytes
   * @returns {Base64URLString}
   */
  static toBase64UrlString(bytes) {
    return toBase64UrlString(bytes);
  }
}
