"use client";

import { useState } from "react";
import styles from "./page.module.css";
import TaskForm from "@/components/TaskForm";
import ResultCard from "@/components/ResultCard";
import { generatePlan } from "@/lib/planner";
import type { Plan } from "@/types/plan";

export default function Home() {
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [result, setResult] = useState<Plan | null>(null);

  const createPlan = () => {
    const plan = generatePlan({
      name: taskName,
      deadline,
    });

    setResult(plan);
  };

  return (
    <div className={styles.container}>
      <h1>課題コンパス</h1>

      <TaskForm
        taskName={taskName}
        deadline={deadline}
        onTaskNameChange={setTaskName}
        onDeadlineChange={setDeadline}
        onSubmit={createPlan}
      />

      <ResultCard result={result} className={styles.resultText} />
    </div>
  );
}