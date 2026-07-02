"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import TaskForm from "@/components/TaskForm";
import ResultCard from "@/components/ResultCard";
import TaskList from "@/components/TaskList";
import { generatePlan } from "@/lib/planner";
import type { Plan } from "@/types/plan";
import type { Task } from "@/types/task";
import { getTasks, saveTasks } from "@/lib/storage";


export default function Home() {
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [result, setResult] = useState<Plan | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = getTasks();
    setTasks(savedTasks);
  }, []);

  const createPlan = () => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      name: taskName,
      deadline,
      completed: false,
    };

    const plan = generatePlan(newTask);
    setResult(plan);

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
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

      <TaskList tasks={tasks} />
    </div>
  );
}