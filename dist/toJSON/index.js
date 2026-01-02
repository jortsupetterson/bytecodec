import { toString } from "../toString/index.js";
export function toJSON(input) {
    const jsonString = typeof input === "string" ? input : toString(input);
    try {
        return JSON.parse(jsonString);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`toJSON failed to parse value: ${message}`);
    }
}
