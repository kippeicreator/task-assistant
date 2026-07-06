import { describe, expect, it } from "vitest";
import { classifyAIError } from "../lib/ai-error";

describe("classifyAIError", () => {
    it("missing API keyを分類できる", () => {
        const result = classifyAIError(new Error("GEMINI_API_KEY is not set"));

        expect(result.type).toBe("missing_api_key");
    });

    it("429 statusをrate limitとして分類できる", () => {
        const result = classifyAIError({ status: 429, message: "Too many requests" });

        expect(result.type).toBe("rate_limit");
    });

    it("quota messageをrate limitとして分類できる", () => {
        const result = classifyAIError(new Error("Quota exceeded"));

        expect(result.type).toBe("rate_limit");
    });

    it("permission errorをauthとして分類できる", () => {
        const result = classifyAIError({ statusCode: 403, message: "Forbidden" });

        expect(result.type).toBe("auth");
    });

    it("network errorを分類できる", () => {
        const result = classifyAIError(new Error("fetch failed"));

        expect(result.type).toBe("network");
    });

    it("invalid responseを分類できる", () => {
        const result = classifyAIError(new Error("Invalid JSON parse error"));

        expect(result.type).toBe("invalid_response");
    });

    it("不明なエラーをunknownとして分類できる", () => {
        const result = classifyAIError(new Error("unexpected error"));

        expect(result.type).toBe("unknown");
    });
});
