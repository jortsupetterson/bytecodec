import { normalizeToUint8Array, isNodeRuntime } from "../0-HELPERS/index.js";
import type { ByteSource } from "../index.js";

export async function fromCompressed(bytes: ByteSource): Promise<Uint8Array> {
  const view = normalizeToUint8Array(bytes);

  if (isNodeRuntime()) {
    const { gunzipSync } = await import("node:zlib");
    return normalizeToUint8Array(gunzipSync(view));
  }

  if (typeof DecompressionStream === "undefined")
    throw new Error("gzip decompression not available in this environment.");

  return decompressWithStream(view, "gzip");
}

async function decompressWithStream(bytes: BufferSource, format: CompressionFormat) {
  const ds = new DecompressionStream(format);
  const writer = ds.writable.getWriter();
  await writer.write(bytes);
  await writer.close();
  const arrayBuffer = await new Response(ds.readable).arrayBuffer();
  return new Uint8Array(arrayBuffer);
}
