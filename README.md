# bytecodec

Lean, zero-dependency byte utilities for base64url, UTF-8 strings, and JSON that behave the same in browsers and Node.

## Why use it
- URL-safe base64 without padding; no external deps or bundler tricks.
- UTF-8 encode/decode that accepts `Uint8Array`, `ArrayBuffer`, `ArrayBufferView`, or `number[]`.
- JSON ⇄ bytes helpers (JSON.stringify/parse + UTF-8) for payloads, tokens, and storage.
- ESM-first, tree-shakeable, bundled TypeScript definitions, side-effect free.

## Install

```sh
npm install bytecodec
# or
pnpm add bytecodec
# or
yarn add bytecodec
```

## Quick start

```js
import {
  toBase64UrlString,
  fromBase64UrlString,
  fromString,
  toString,
  toJSON,
  fromJSON,
  Bytes, // optional class wrapper
} from "bytecodec";

// Base64URL
const payload = new Uint8Array([104, 101, 108, 108, 111]); // "hello"
const encoded = toBase64UrlString(payload); // aGVsbG8
const decoded = fromBase64UrlString(encoded); // Uint8Array [104, 101, 108, 108, 111]

// UTF-8 strings
const textBytes = fromString("caffè ✓"); // Uint8Array
const text = toString(textBytes); // "caffè ✓"

// JSON
const jsonBytes = toJSON({ ok: true, count: 3 });
const obj = fromJSON(jsonBytes); // { ok: true, count: 3 }

// Wrapper mirrors the same methods
Bytes.toBase64UrlString(payload);
Bytes.fromBase64UrlString(encoded);
Bytes.fromString("text");
Bytes.toString(textBytes);
Bytes.toJSON({ ok: true });
Bytes.fromJSON(jsonBytes);
```

## API snapshot
- `toBase64UrlString(bytes: ByteSource): Base64URLString` – RFC 4648 base64url encoding (no padding).
- `fromBase64UrlString(base64UrlString: Base64URLString): Uint8Array` – decode with length validation.
- `fromString(text: string): Uint8Array` – UTF-8 encode.
- `toString(bytes: ByteSource): string` – UTF-8 decode.
- `toJSON(value: any): Uint8Array` – `JSON.stringify` + UTF-8 encode.
- `fromJSON(bytes: ByteSource): any` – UTF-8 decode + `JSON.parse`.
- `Bytes` – class wrapper exposing the same static methods above.

### Types

```ts
type Base64URLString = string;
type ByteSource = Uint8Array | ArrayBuffer | ArrayBufferView | number[];
```

## Runtime behavior
- Node: uses `Buffer.from` for base64/UTF-8.
- Browsers/edge runtimes: uses `TextEncoder`/`TextDecoder` and `btoa`/`atob`.
- Throws clear errors when the host cannot encode/decode.

## Testing

```sh
npm test
# or
node test.js
```

## License

MIT
