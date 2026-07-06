import type { Plan } from "@/types/plan";

function extractJson(text: string) {
    const trimmedText = text.trim();
    const codeBlockMatch = trimmedText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);

    if (codeBlockMatch) {
        return codeBlockMatch[1];
    }

    return trimmedText;
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function parseAIStudyPlanResponse(text: string): Plan | null {
    try {
        const parsed = JSON.parse(extractJson(text)) as Partial<Plan>;

        if (
            typeof parsed.taskName !== "string" ||
            typeof parsed.daysLeft !== "number" ||
            (parsed.mode !== "normal" && parsed.mode !== "emergency") ||
            !isStringArray(parsed.steps) ||
            parsed.steps.length === 0
        ) {
            return null;
        }

        return {
            taskName: parsed.taskName,
            daysLeft: parsed.daysLeft,
            mode: parsed.mode,
            steps: parsed.steps,
        };
    } catch {
        return null;
    }
}
