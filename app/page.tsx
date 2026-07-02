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
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = getTasks();
    setTasks(savedTasks);
  }, []);

  const startEditingTask = (task: Task) => {
    setEditingTaskId(task.id);
    setTaskName(task.name);
    setDeadline(task.deadline);
  };

  const createPlan = () => {
    const task: Task = {
      id: editingTaskId ?? crypto.randomUUID(),
      name: taskName,
      deadline,
      completed: false,
    };

    const plan = generatePlan(task);
    setResult(plan);

    const updatedTasks = editingTaskId
      ? tasks.map((currentTask) =>
        currentTask.id === editingTaskId ? task : currentTask
      )
      : [...tasks, task];

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setEditingTaskId(null);
  };

  const toggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

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

      <TaskList
        tasks={tasks}
        onEdit={startEditingTask}
        onDelete={deleteTask}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
}