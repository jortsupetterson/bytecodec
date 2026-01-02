import type { ByteSource } from "../index.js";

function isSharedArrayBuffer(
  buffer: ArrayBufferLike
): buffer is SharedArrayBuffer {
  return (
    typeof SharedArrayBuffer !== "undefined" &&
    buffer instanceof SharedArrayBuffer
  );
}

function asArrayBufferView(view: Uint8Array): Uint8Array<ArrayBuffer> {
  return view as Uint8Array<ArrayBuffer>;
}

export function normalizeToUint8Array(
  input: ByteSource
): Uint8Array<ArrayBuffer> {
  if (input instanceof Uint8Array)
    return asArrayBufferView(
      isSharedArrayBuffer(input.buffer) ? new Uint8Array(input) : input
    );
  if (input instanceof ArrayBuffer)
    return asArrayBufferView(new Uint8Array(input));
  if (ArrayBuffer.isView(input)) {
    const view = new Uint8Array(
      input.buffer,
      input.byteOffset,
      input.byteLength
    );
    return asArrayBufferView(
      isSharedArrayBuffer(view.buffer) ? new Uint8Array(view) : view
    );
  }
  if (Array.isArray(input)) return asArrayBufferView(new Uint8Array(input));
  throw new TypeError(
    "Expected a Uint8Array, ArrayBuffer, ArrayBufferView, or number[]"
  );
}

export const textEncoder =
  typeof TextEncoder !== "undefined" ? new TextEncoder() : null;

export const textDecoder =
  typeof TextDecoder !== "undefined" ? new TextDecoder() : null;

export function isNodeRuntime(): boolean {
  return typeof process !== "undefined" && !!process.versions?.node;
}
