import { normalizeToUint8Array } from "../0-HELPERS/index.js";
export function concat(sources) {
    if (!Array.isArray(sources))
        throw new TypeError("concat expects an array of ByteSource items");
    if (sources.length === 0)
        return new Uint8Array(0);
    const arrays = sources.map((source, index) => {
        try {
            return normalizeToUint8Array(source);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new TypeError(`concat failed to normalize input at index ${index}: ${message}`);
        }
    });
    const totalLength = arrays.reduce((sum, array) => sum + array.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const array of arrays) {
        if (array.length === 0)
            continue;
        result.set(array, offset);
        offset += array.length;
    }
    return result;
}
