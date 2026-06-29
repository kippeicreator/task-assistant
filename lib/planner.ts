import type { Task } from "@/types/task";
import type { Plan } from "@/types/plan";

export function generatePlan(task: Task): Plan {
    const { name: taskName, deadline } = task;

    if (!taskName.trim()) {
        return {
            taskName: "",
            daysLeft: 0,
            mode: "normal",
            steps: ["課題名を入力してください"],
        };
    }

    if (!deadline) {
        return {
            taskName,
            daysLeft: 0,
            mode: "normal",
            steps: ["締切を入力してください"],
        };
    }

    const today = new Date();
    const dueDate = new Date(deadline);

    const diffTime = dueDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) {
        return {
            taskName,
            daysLeft,
            mode: "normal",
            steps: ["締切日は今日以降の日付を選択してください"],
        };
    }

    if (taskName.length > 50) {
        return {
            taskName,
            daysLeft,
            mode: "normal",
            steps: ["課題名は50文字以内で入力してください"],
        };
    }

    if (daysLeft <= 3) {
        return {
            taskName,
            daysLeft,
            mode: "emergency",
            steps: [
                "今日：課題内容確認",
                "今日：資料収集",
                "明日：作業完了",
                "締切前日：最終確認",
            ],
        };
    }

    if (taskName.includes("レポート")) {
        return {
            taskName,
            daysLeft,
            mode: "normal",
            steps: [
                "今日：テーマを決める",
                "明日：参考文献を3本集める",
                "3日目：構成を作る",
            ],
        };
    }

    if (taskName.includes("発表")) {
        return {
            taskName,
            daysLeft,
            mode: "normal",
            steps: [
                "今日：テーマ整理",
                "明日：スライド作成",
                "3日目：発表練習",
            ],
        };
    }

    return {
        taskName,
        daysLeft,
        mode: "normal",
        steps: [
            "今日：課題内容を確認",
            "明日：作業開始",
        ],
    };
}