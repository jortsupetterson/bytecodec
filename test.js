import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import {
  toBase64UrlString,
  fromBase64UrlString,
  fromString,
  toString,
  toJSON,
  fromJSON,
  Bytes,
} from "./src/index.js";

function runTest(name, fn) {
  console.time(name);
  fn();
  console.timeEnd(name);
  console.log(`✔ ${name}`);
}

function testBase64() {
  const payload = randomBytes(32);
  const encoded = toBase64UrlString(payload);
  const decoded = fromBase64UrlString(encoded);
  assert.deepStrictEqual(Buffer.from(decoded), Buffer.from(payload));
  console.log("base64 sample encoded:", encoded);
  console.log("base64 payload length:", payload.byteLength);

  const helloBytes = fromString("hello");
  assert.equal(toBase64UrlString(helloBytes), "aGVsbG8");
  assert.deepStrictEqual(fromBase64UrlString("aGVsbG8"), helloBytes);
  console.log("base64 hello bytes:", [...helloBytes]);
}

function testStrings() {
  const text = "héllo ✓ rocket 🚀";
  const bytes = fromString(text);
  assert.equal(toString(bytes), text);
  console.log("strings input:", text);
  console.log("strings byte length:", bytes.byteLength);
}

function testJSON() {
  const value = { ok: true, count: 3, nested: ["x", { y: 1 }], nil: null };
  const jsonBytes = fromJSON(value);
  assert.ok(jsonBytes instanceof Uint8Array);
  assert.deepStrictEqual(toJSON(jsonBytes), value);
  assert.deepStrictEqual(
    toJSON('{"ok":true,"count":3,"nested":["x",{"y":1}],"nil":null}'),
    value
  );
  console.log("json value:", JSON.stringify(value));
  console.log("json bytes length:", jsonBytes.byteLength);
}

function testBytesWrapper() {
  const payload = Uint8Array.from([1, 2, 3, 4]);
  const encoded = Bytes.toBase64UrlString(payload);
  assert.deepStrictEqual(Bytes.fromBase64UrlString(encoded), payload);

  const text = "wrapper check";
  assert.equal(Bytes.toString(Bytes.fromString(text)), text);

  const value = { wrapper: true, items: [1, 2, 3] };
  const jsonBytes = Bytes.fromJSON(value);
  assert.ok(jsonBytes instanceof Uint8Array);
  assert.deepStrictEqual(Bytes.toJSON(jsonBytes), value);
  console.log("bytes wrapper encoded:", encoded);
  console.log("bytes wrapper json bytes length:", jsonBytes.byteLength);
}

function main() {
  console.log("Running bytecodec tests...");
  console.time("total");
  runTest("base64", testBase64);
  runTest("strings", testStrings);
  runTest("json", testJSON);
  runTest("bytes-wrapper", testBytesWrapper);
  console.timeEnd("total");
  console.log("All tests passed ✅");
}

main();
