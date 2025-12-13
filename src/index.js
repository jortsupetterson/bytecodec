import { fromBase64UrlString } from "./fromBase64UrlString/index.js";
import { toBase64UrlString } from "./toBase64UrlString/index.js";
import { fromString } from "./fromString/index.js";
import { toString } from "./toString/index.js";
import { fromJSON } from "./fromJSON/index.js";
import { toJSON } from "./toJSON/index.js";

export {
  fromBase64UrlString,
  toBase64UrlString,
  fromString,
  toString,
  fromJSON,
  toJSON,
};

/**
 * Convenience wrapper around the codec functions.
 */
export class Bytes {
  /**
   * Decode a base64url string into raw bytes.
   * @param {import("./index.d.ts").Base64URLString} base64UrlString
   * @returns {Uint8Array}
   */
  static fromBase64UrlString(base64UrlString) {
    return fromBase64UrlString(base64UrlString);
  }

  /**
   * Encode bytes into a base64url string.
   * @param {import("./index.d.ts").ByteSource} bytes
   * @returns {import("./index.d.ts").Base64URLString}
   */
  static toBase64UrlString(bytes) {
    return toBase64UrlString(bytes);
  }

  /**
   * Encode a UTF-8 string into bytes.
   * @param {string} text
   * @returns {Uint8Array}
   */
  static fromString(text) {
    return fromString(text);
  }

  /**
   * Decode bytes into a UTF-8 string.
   * @param {import("./index.d.ts").ByteSource} bytes
   * @returns {string}
   */
  static toString(bytes) {
    return toString(bytes);
  }

  /**
   * Serialize a JS object or value into bytes.
   * @param {any} value
   * @returns {Uint8Array}
   */
  static toJSON(value) {
    return toJSON(value);
  }

  /**
   * Parse bytes back into a JS object or value.
   * @param {import("./index.d.ts").ByteSource} bytes
   * @returns {any}
   */
  static fromJSON(bytes) {
    return fromJSON(bytes);
  }
}
