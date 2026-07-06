"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";
import TaskForm from "@/components/TaskForm";
import ResultCard from "@/components/ResultCard";
import TaskList from "@/components/TaskList";
import { generatePlan } from "@/lib/planner";
import type { Plan } from "@/types/plan";
import type { Task } from "@/types/task";
import {
    createTask,
    updateTask,
    toggleTaskComplete,
    deleteTask,
} from "@/app/actions";

type HomeClientProps = {
    initialTasks: Task[];
};

export default function HomeClient({ initialTasks }: HomeClientProps) {
    const [taskName, setTaskName] = useState("");
    const [deadline, setDeadline] = useState("");
    const [result, setResult] = useState<Plan | null>(null);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const startEditingTask = (task: Task) => {
        setEditingTaskId(task.id);
        setTaskName(task.name);
        setDeadline(task.deadline);
    };

    const createPlan = async () => {
        const existingTask = tasks.find((task) => task.id === editingTaskId);

        const task: Task = {
            id: editingTaskId ?? "",
            name: taskName,
            deadline,
            completed: existingTask?.completed ?? false,
        };

        const plan = generatePlan(task);
        setResult(plan);

        if (plan.isError) {
            return;
        }

        if (editingTaskId) {
            const updatedTask = await updateTask(
                editingTaskId,
                taskName,
                deadline,
                existingTask?.completed ?? false
            );

            setTasks((currentTasks) =>
                currentTasks.map((currentTask) =>
                    currentTask.id === editingTaskId ? updatedTask : currentTask
                )
            );
        } else {
            const createdTask = await createTask(taskName, deadline);

            setTasks((currentTasks) => [createdTask, ...currentTasks]);
        }

        setEditingTaskId(null);
        setTaskName("");
        setDeadline("");
    };

    const handleToggleComplete = async (id: string) => {
        const targetTask = tasks.find((task) => task.id === id);

        if (!targetTask) {
            return;
        }

        const updatedTask = await toggleTaskComplete(id, !targetTask.completed);

        setTasks((currentTasks) =>
            currentTasks.map((task) => (task.id === id ? updatedTask : task))
        );
    };

    const handleDeleteTask = async (id: string) => {
        await deleteTask(id);

        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>課題コンパス</h1>

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
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
            />
        </div>
    );
}