"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
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
    createAIStudyPlan,
} from "@/app/actions";

type HomeClientProps = {
    initialTasks: Task[];
};

type ResultSource = "normal" | "ai" | "fallback";

export default function HomeClient({ initialTasks }: HomeClientProps) {
    const router = useRouter();
    const [taskName, setTaskName] = useState("");
    const [deadline, setDeadline] = useState("");
    const [result, setResult] = useState<Plan | null>(null);
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isGeneratingAI, setIsGeneratingAI] = useState(false);
    const [resultSource, setResultSource] = useState<ResultSource>("normal");

    const handleUpdateTask = async (
        id: string,
        name: string,
        deadline: string
    ) => {
        setErrorMessage(null);

        const targetTask = tasks.find((task) => task.id === id);

        if (!targetTask) {
            return;
        }

        try {
            const updatedTask = await updateTask(
                id,
                name,
                deadline,
                targetTask.completed
            );

            setTasks((currentTasks) =>
                currentTasks.map((task) =>
                    task.id === id ? updatedTask : task
                )
            );
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : "課題の更新に失敗しました。"
            );
            throw error;
        }
    };

    const createPlan = async () => {
        setErrorMessage(null);

        const task: Task = {
            id: "",
            name: taskName,
            deadline,
            completed: false,
        };

        const plan = generatePlan(task);
        setResult(plan);
        setResultSource("normal");

        if (plan.isError) {
            return;
        }

        try {
            const createdTask = await createTask(taskName, deadline);

            setTasks((currentTasks) => [createdTask, ...currentTasks]);

            setTaskName("");
            setDeadline("");
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : "課題の保存に失敗しました。"
            );
        }
    };

    const handleToggleComplete = async (id: string) => {
        setErrorMessage(null);

        const targetTask = tasks.find((task) => task.id === id);

        if (!targetTask) {
            return;
        }

        try {
            const updatedTask = await toggleTaskComplete(id, !targetTask.completed);

            setTasks((currentTasks) =>
                currentTasks.map((task) => (task.id === id ? updatedTask : task))
            );
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : "課題の更新に失敗しました。"
            );
        }
    };

    const createAIPlan = async () => {
        setErrorMessage(null);
        setIsGeneratingAI(true);

        try {
            const result = await createAIStudyPlan(taskName, deadline);
            setResult(result.plan);
            setResultSource(result.source);
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : "AI計画の作成に失敗しました。"
            );
        } finally {
            setIsGeneratingAI(false);
        }
    };

    const handleDeleteTask = async (id: string) => {
        setErrorMessage(null);

        try {
            const deletedTaskId = await deleteTask(id);

            setTasks((currentTasks) =>
                currentTasks.filter((task) => task.id !== deletedTaskId)
            );
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : "課題の削除に失敗しました。"
            );
        }
    };

    const handleSignOut = async () => {
        try {
            await authClient.signOut();

            router.replace("/signin");
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "ログアウトに失敗しました。"
            );
        }
    };

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>課題コンパス</h1>

            <button type="button" onClick={handleSignOut}>
                ログアウト
            </button>

            {errorMessage && <p className={styles.errorMessage} role="alert">
                {errorMessage}
            </p>}

            <TaskForm
                taskName={taskName}
                deadline={deadline}
                onTaskNameChange={setTaskName}
                onDeadlineChange={setDeadline}
                onSubmit={createPlan}
                onAISubmit={createAIPlan}
                isGeneratingAI={isGeneratingAI}
            />

            {resultSource === "ai" && <span className={styles.aiBadge}>AI生成</span>}

            {resultSource === "fallback" && result && !result.isError && (
                <p className={styles.fallbackMessage}>
                    AI生成に失敗したため、通常の計画を表示しました。
                </p>
            )}

            <ResultCard result={result} className={styles.resultText} errorClassName={styles.errorMessage}
            />

            <TaskList
                tasks={tasks}
                onEdit={handleUpdateTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
            />
        </main>
    );
}
