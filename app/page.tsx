"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [result, setResult] = useState("");
  const createPlan = () => {
    if (!taskName) {
      setResult("課題名を入力してください");
      return;
    }
    if (!deadline) {
      setResult("締切を入力してください");
      return;
    }

    if (taskName.includes("レポート")) {
      setResult(`課題名　${taskName}
今日
・テーマを決める
明日
・参考文献を3本集める
3日目
・構成を作る
締切：${deadline}`);
    } else if (taskName.includes("発表")) {
      setResult(`課題名　${taskName}
今日
・テーマ整理
明日
・スライド作成
3日目
・発表練習`);
    } else {
      setResult(`課題名　${taskName}
今日
・課題内容を確認
明日
・作業開始`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>課題コンパス</h1>

      <div>
        <label htmlFor="taskName">課題名</label>
        <br />
        <input type="text" id="taskName" placeholder="課題名を入力"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)} />
      </div>

      <br />

      <div>
        <label htmlFor="deadline">締切</label>
        <br />
        <input id="deadline" type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)} />
      </div>

      <br />

      <button onClick={createPlan}>
        計画作成
      </button>

      {result && (
        <div>
          <h2>結果</h2>
          <p className={styles.resultText}>{result}</p>
        </div>
      )}
    </div>
  );
}