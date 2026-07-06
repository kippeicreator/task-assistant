import "server-only";

import { generateGeminiText } from "@/lib/gemini";
import { generatePlan } from "@/lib/planner";
import { parseAIStudyPlanResponse } from "@/lib/ai-plan-parser";
import type { Plan } from "@/types/plan";
import type { Task } from "@/types/task";

function createPrompt(task: Task, fallbackPlan: Plan) {
    return `
大学生向けの学習計画を日本語で作成してください。

課題名: ${task.name}
締切日: ${task.deadline}
締切までの日数: ${fallbackPlan.daysLeft}

次のJSONのみを返してください。説明文やMarkdownは不要です。
{
  "taskName": "課題名",
  "daysLeft": 0,
  "mode": "normal" または "emergency",
  "steps": ["短く具体的な作業"]
}

条件:
- stepsは実行しやすい短い内容にする
- あいまいな助言は避ける
- 締切が近い場合はmodeを"emergency"にする
`;
}

export async function generateAIStudyPlan(task: Task): Promise<Plan> {
    const fallbackPlan = generatePlan(task);

    if (fallbackPlan.isError) {
        return fallbackPlan;
    }

    try {
        const text = await generateGeminiText(createPrompt(task, fallbackPlan));
        const plan = parseAIStudyPlanResponse(text);

        return plan ?? fallbackPlan;
    } catch {
        return fallbackPlan;
    }
}
