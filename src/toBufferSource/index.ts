import { normalizeToUint8Array } from "../0-HELPERS/index.js";
import type { ByteSource } from "../index.js";

export function toBufferSource(bytes: ByteSource): BufferSource {
  return normalizeToUint8Array(bytes);
}
