import { randomBytes } from "node:crypto";
import { toBase64UrlString, fromBase64UrlString } from "./src/index.js";

const iterations = 1000;
const payload = randomBytes(64 * 1024);
const encoded = toBase64UrlString(payload);

console.time("to");
for (let i = 0; i < iterations; i++) toBase64UrlString(payload);
console.timeEnd("to");

console.time("from");
for (let i = 0; i < iterations; i++) fromBase64UrlString(encoded);
console.timeEnd("from");
