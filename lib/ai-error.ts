export type AIErrorType =
    | "missing_api_key"
    | "rate_limit"
    | "auth"
    | "network"
    | "invalid_response"
    | "unknown";

export type AIErrorInfo = {
    type: AIErrorType;
    message: string;
};

function getErrorMessage(error: unknown) {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === "string") {
        return error;
    }

    return "";
}

function getErrorStatus(error: unknown) {
    if (typeof error !== "object" || error === null) {
        return undefined;
    }

    const maybeError = error as { status?: unknown; statusCode?: unknown; code?: unknown };
    const status = maybeError.status ?? maybeError.statusCode ?? maybeError.code;

    return typeof status === "number" ? status : undefined;
}

export function classifyAIError(error: unknown): AIErrorInfo {
    const message = getErrorMessage(error);
    const normalizedMessage = message.toLowerCase();
    const status = getErrorStatus(error);

    if (message === "GEMINI_API_KEY is not set") {
        return {
            type: "missing_api_key",
            message: "Gemini API key is missing.",
        };
    }

    if (
        status === 429 ||
        normalizedMessage.includes("rate limit") ||
        normalizedMessage.includes("quota") ||
        normalizedMessage.includes("too many requests")
    ) {
        return {
            type: "rate_limit",
            message: "Gemini rate limit or quota error.",
        };
    }

    if (
        status === 401 ||
        status === 403 ||
        normalizedMessage.includes("permission") ||
        normalizedMessage.includes("unauthorized") ||
        normalizedMessage.includes("forbidden") ||
        normalizedMessage.includes("api key not valid")
    ) {
        return {
            type: "auth",
            message: "Gemini authentication or permission error.",
        };
    }

    if (
        normalizedMessage.includes("network") ||
        normalizedMessage.includes("fetch failed") ||
        normalizedMessage.includes("econnreset") ||
        normalizedMessage.includes("enotfound") ||
        normalizedMessage.includes("timeout")
    ) {
        return {
            type: "network",
            message: "Gemini network error.",
        };
    }

    if (
        normalizedMessage.includes("invalid response") ||
        normalizedMessage.includes("invalid json") ||
        normalizedMessage.includes("parse")
    ) {
        return {
            type: "invalid_response",
            message: "Gemini returned an invalid response.",
        };
    }

    return {
        type: "unknown",
        message: "Unknown Gemini error.",
    };
}
