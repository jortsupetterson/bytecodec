export type Base64URLString = string;

export type ByteSource =
  | Uint8Array
  | ArrayBuffer
  | ArrayBufferView
  | number[];

export function toBase64UrlString(bytes: ByteSource): Base64URLString;

export function fromBase64UrlString(
  base64UrlString: Base64URLString,
): Uint8Array;

export function fromString(text: string): Uint8Array;

export function toString(bytes: ByteSource): string;

export function toJSON(value: any): Uint8Array;

export function fromJSON(bytes: ByteSource): any;

export declare class Bytes {
  static toBase64UrlString(bytes: ByteSource): Base64URLString;
  static fromBase64UrlString(base64UrlString: Base64URLString): Uint8Array;
  static fromString(text: string): Uint8Array;
  static toString(bytes: ByteSource): string;
  static toJSON(value: any): Uint8Array;
  static fromJSON(bytes: ByteSource): any;
}
