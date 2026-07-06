import { describe, expect, it } from "vitest";
import { parseAIStudyPlanResponse } from "../lib/ai-plan-parser";

describe("parseAIStudyPlanResponse", () => {
    it("valid JSONをPlanに変換できる", () => {
        const plan = parseAIStudyPlanResponse(
            JSON.stringify({
                taskName: "英語レポート",
                daysLeft: 5,
                mode: "normal",
                steps: ["今日：テーマを決める", "明日：資料を集める"],
            })
        );

        expect(plan).toEqual({
            taskName: "英語レポート",
            daysLeft: 5,
            mode: "normal",
            steps: ["今日：テーマを決める", "明日：資料を集める"],
        });
    });

    it("不正なJSONならnullを返す", () => {
        const plan = parseAIStudyPlanResponse("JSONではない文章");

        expect(plan).toBeNull();
    });

    it("Planとして不正なshapeならnullを返す", () => {
        const plan = parseAIStudyPlanResponse(
            JSON.stringify({
                taskName: "英語レポート",
                daysLeft: 5,
                mode: "normal",
                steps: [],
            })
        );

        expect(plan).toBeNull();
    });
});
