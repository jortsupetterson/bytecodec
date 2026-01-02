import { textDecoder } from "../0-HELPERS/index.js";
import { normalizeToUint8Array } from "../0-HELPERS/index.js";
import type { ByteSource } from "../index.js";

export function toString(bytes: ByteSource): string {
  const view = normalizeToUint8Array(bytes);

  if (textDecoder) return textDecoder.decode(view);

  if (typeof Buffer !== "undefined" && typeof Buffer.from === "function")
    return Buffer.from(view).toString("utf8");

  throw new Error("No UTF-8 decoder available in this environment.");
}
