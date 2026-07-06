import "server-only";

import { generateGeminiText } from "@/lib/gemini";
import { generatePlan } from "@/lib/planner";
import { parseAIStudyPlanResponse } from "@/lib/ai-plan-parser";
import type { Plan } from "@/types/plan";
import type { Task } from "@/types/task";

function createPrompt(task: Task, fallbackPlan: Plan) {
    return `
あなたは日本の大学生向けに、課題の学習計画を作るアシスタントです。
実行しやすく、具体的で、短い行動だけを書いてください。

課題名: ${task.name}
締切日: ${task.deadline}
締切までの日数: ${fallbackPlan.daysLeft}
指定するmode: ${fallbackPlan.mode}

必ず次のJSON形式だけを返してください。
{
  "taskName": "課題名",
  "daysLeft": 0,
  "mode": "normal" または "emergency",
  "steps": ["今日：具体的な作業"]
}

出力ルール:
- JSON以外を返さない
- Markdown、コードフェンス、説明文、コメント、補足文は禁止
- taskNameは入力された課題名を使う
- daysLeftは入力された締切までの日数を使う
- daysLeftが3以下ならmodeは"emergency"
- daysLeftが4以上ならmodeは"normal"
- stepsは4〜6個
- 各stepは15〜35文字程度
- 各stepは必ず「今日：」「明日：」「2日目：」「締切前日：」などのタイミングで始める
- 「がんばる」「復習する」「調べる」「進める」だけの曖昧な表現は禁止
- 使う場合は「参考文献を3本集める」のように具体化する

課題タイプ別の内容:
- レポート系なら、テーマ決定、資料収集、構成作成、下書き、最終確認を含める
- 発表系なら、論点整理、スライド構成、スライド作成、発表練習、最終確認を含める
- プログラミング系なら、要件確認、小さな実装、実行テスト、バグ修正、提出確認を含める

良いstep例:
- 今日：テーマを1つに絞る
- 明日：参考文献を3本集める
- 2日目：見出し構成を作る
- 締切前日：誤字と提出形式を確認
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
