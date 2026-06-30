import { describe, expect, it } from "vitest";
import { generatePlan } from "../lib/planner";

describe("generatePlan", () => {
    it("空の課題名ならエラーを返す", () => {
        const plan = generatePlan({
            name: "",
            deadline: "2026-07-10",
        });

        expect(plan.steps[0]).toBe("課題名を入力してください");
    });

    it("締切が未入力ならエラーを返す", () => {
        const plan = generatePlan({
            name: "レポート",
            deadline: "",
        });

        expect(plan.steps[0]).toBe("締切を入力してください");
    });

    it("過去の日付ならエラーを返す", () => {
        const plan = generatePlan({
            name: "レポート",
            deadline: "2000-01-01",
        });

        expect(plan.steps[0]).toBe("締切日は今日以降の日付を選択してください");
    });

    it("レポート課題ならレポート用の計画を返す", () => {
        const plan = generatePlan({
            name: "英語レポート",
            deadline: "2099-01-01",
        });

        expect(plan.steps).toContain("今日：テーマを決める");
    });

    it("発表課題なら発表用の計画を返す", () => {
        const plan = generatePlan({
            name: "研究発表",
            deadline: "2099-01-01",
        });

        expect(plan.steps).toContain("今日：テーマ整理");
    });

    it("締切が近い場合は緊急モードを返す", () => {
        const today = new Date();
        const deadline = today.toISOString().split("T")[0];

        const plan = generatePlan({
            name: "数学課題",
            deadline,
        });

        expect(plan.mode).toBe("emergency");
    });

    it("通常課題ならデフォルト計画を返す", () => {
        const plan = generatePlan({
            name: "数学課題",
            deadline: "2099-01-01",
        });

        expect(plan.steps).toContain("今日：課題内容を確認");
    });
});