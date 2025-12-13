# bytecodec

Tiny, dependency-free base64url <-> `Uint8Array` codec that works in both browsers and Node runtimes.

## Features
- Base64URL encode/decode with zero dependencies
- Works in browsers (`btoa`/`atob`) and Node (`Buffer`) automatically
- Accepts `Uint8Array`, `ArrayBuffer`, `ArrayBufferView`, or `number[]`
- Tree-shakeable ESM with bundled TypeScript definitions
- No side effects; safe to import anywhere you need these conversions

## Installation

```sh
npm install bytecodec
# or
pnpm add bytecodec
# or
yarn add bytecodec
```

## Usage

```js
import { toBase64UrlString, fromBase64UrlString, Bytes } from "bytecodec";

const payload = new Uint8Array([104, 101, 108, 108, 111]); // "hello"

const encoded = toBase64UrlString(payload);
// aGVsbG8

const decoded = fromBase64UrlString(encoded);
// Uint8Array(5) [104, 101, 108, 108, 111]

// Optional convenience wrapper
Bytes.toBase64UrlString(payload);
Bytes.fromBase64UrlString(encoded);
```

## API

- `toBase64UrlString(bytes: ByteSource): Base64URLString`  
  Encode bytes into an RFC 4648 base64url string (no padding). Throws if the environment cannot encode base64 or if the input is not a supported byte source.

- `fromBase64UrlString(base64UrlString: Base64URLString): Uint8Array`  
  Decode a base64url string back into raw bytes. Throws on invalid input or if the environment cannot decode base64.

- `Bytes`  
  A tiny class wrapper exposing the same static methods above.

### Types

```ts
type Base64URLString = string;
type ByteSource = Uint8Array | ArrayBuffer | ArrayBufferView | number[];
```

## Environment support
- Node: uses `Buffer.from` when available (Node 14+ recommended)
- Browser/edge runtimes: falls back to `btoa`/`atob`
- No DOM or fetch dependencies; safe for workers

## License

MIT
