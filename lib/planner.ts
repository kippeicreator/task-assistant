import type { Task } from "@/types/task";
import type { Plan } from "@/types/plan";

const DAY_IN_MS = 1000 * 60 * 60 * 24;
const MAX_TASK_NAME_LENGTH = 50;

function calculateDaysLeft(deadline: string): number {
    const today = new Date();
    const dueDate = new Date(deadline);

    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / DAY_IN_MS);
}

function createValidationErrorPlan(
    taskName: string,
    daysLeft: number,
    message: string
): Plan {
    return {
        taskName,
        daysLeft,
        mode: "normal",
        steps: [message],
    };
}

function createEmergencyPlan(taskName: string, daysLeft: number): Plan {
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

function createReportPlan(taskName: string, daysLeft: number): Plan {
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

function createPresentationPlan(taskName: string, daysLeft: number): Plan {
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

function createDefaultPlan(taskName: string, daysLeft: number): Plan {
    return {
        taskName,
        daysLeft,
        mode: "normal",
        steps: ["今日：課題内容を確認", "明日：作業開始"],
    };
}

export function generatePlan(task: Task): Plan {
    const taskName = task.name.trim();
    const { deadline } = task;

    if (!taskName) {
        return createValidationErrorPlan("", 0, "課題名を入力してください");
    }

    if (!deadline) {
        return createValidationErrorPlan(taskName, 0, "締切を入力してください");
    }

    const daysLeft = calculateDaysLeft(deadline);

    if (daysLeft < 0) {
        return createValidationErrorPlan(
            taskName,
            daysLeft,
            "締切日は今日以降の日付を選択してください"
        );
    }

    if (taskName.length > MAX_TASK_NAME_LENGTH) {
        return createValidationErrorPlan(
            taskName,
            daysLeft,
            "課題名は50文字以内で入力してください"
        );
    }

    if (daysLeft <= 3) {
        return createEmergencyPlan(taskName, daysLeft);
    }

    if (taskName.includes("レポート")) {
        return createReportPlan(taskName, daysLeft);
    }

    if (taskName.includes("発表")) {
        return createPresentationPlan(taskName, daysLeft);
    }

    return createDefaultPlan(taskName, daysLeft);
}