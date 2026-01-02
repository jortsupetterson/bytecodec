import type { ByteSource } from "../index.js";
import { normalizeToUint8Array } from "../0-HELPERS/index.js";
export function equals(x: ByteSource, y: ByteSource): boolean {
  const a = normalizeToUint8Array(x);
  const b = normalizeToUint8Array(y);
  if (a.byteLength !== b.byteLength) return false;
  let diff = 0;
  for (let index = 0; index < a.length; index++) diff |= a[index] ^ b[index];
  return diff === 0;
}
