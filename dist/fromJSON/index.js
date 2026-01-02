import { fromString } from "../fromString/index.js";
export function fromJSON(value) {
    try {
        return fromString(JSON.stringify(value));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`fromJSON failed to stringify value: ${message}`);
    }
}
