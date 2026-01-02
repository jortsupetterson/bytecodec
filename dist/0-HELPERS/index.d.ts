import type { ByteSource } from "../index.js";
export declare function normalizeToUint8Array(input: ByteSource): Uint8Array<ArrayBuffer>;
export declare const textEncoder: TextEncoder | null;
export declare const textDecoder: TextDecoder | null;
export declare function isNodeRuntime(): boolean;
