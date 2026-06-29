export function generatePlan(taskName: string, deadline: string): string {
    if (!taskName) {
        return "課題名を入力してください";
    }

    if (!deadline) {
        return "締切を入力してください";
    }

    const today = new Date();
    const dueDate = new Date(deadline);

    const diffTime = dueDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysLeft <= 3) {
        return `課題名　${taskName}

締切まであと ${daysLeft} 日

緊急モード

今日
・課題内容確認
・資料収集

明日
・作業完了

締切前日
・最終確認`;
    }

    if (taskName.includes("レポート")) {
        return `課題名　${taskName}

締切まであと ${daysLeft} 日

今日
・テーマを決める

明日
・参考文献を3本集める

3日目
・構成を作る

締切：${deadline}`;
    }

    if (taskName.includes("発表")) {
        return `課題名　${taskName}

締切まであと ${daysLeft} 日

今日
・テーマ整理

明日
・スライド作成

3日目
・発表練習`;
    }

    return `課題名　${taskName}
今日
・課題内容を確認
明日
・作業開始`;
}