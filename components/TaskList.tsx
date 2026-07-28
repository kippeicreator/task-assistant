"use client";

import { useState } from "react";
import type { Task } from "@/types/task";
import styles from "./TaskList.module.css";

type TaskListProps = {
    tasks: Task[];
    onEdit: (id: string, name: string, deadline: string) => Promise<void>;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string) => void;
};

export default function TaskList({
    tasks,
    onEdit,
    onDelete,
    onToggleComplete,

}: TaskListProps) {

    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [editDeadline, setEditDeadline] = useState("");

    const startEditing = (task: Task) => {
        setEditingTaskId(task.id);
        setEditName(task.name);
        setEditDeadline(task.deadline);
    };

    if (tasks.length === 0) {
        return <p className={styles.empty}>保存された課題はありません。</p>;
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>保存済み課題（{tasks.length}件）</h2>

            <ul className={styles.list}>
                {tasks.map((task) => (
                    <li key={task.id} className={styles.card}>
                        {editingTaskId === task.id ? (
                            // 編集中の表示
                            <div>
                                <div>
                                    <label htmlFor={`edit-name-${task.id}`}>
                                        課題名
                                    </label>
                                    <input
                                        id={`edit-name-${task.id}`}
                                        type="text"
                                        value={editName}
                                        onChange={(event) => setEditName(event.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor={`edit-deadline-${task.id}`}>
                                        締切
                                    </label>
                                    <input
                                        id={`edit-deadline-${task.id}`}
                                        type="date"
                                        value={editDeadline}
                                        onChange={(event) => setEditDeadline(event.target.value)}
                                    />
                                </div>

                                <div className={styles.actions}>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            try {
                                                await onEdit(task.id, editName, editDeadline);
                                                setEditingTaskId(null);
                                            } catch {
                                                // エラー表示はHomeClient側で行う
                                            }
                                        }}
                                    >
                                        保存
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setEditingTaskId(null)}
                                    >
                                        キャンセル
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // 通常の表示
                            <>
                                <strong className={`${styles.title} ${task.completed ? styles.completed : ""}`}>
                                    {task.name}
                                </strong>

                                <span className={`${styles.deadline} ${task.completed ? styles.completed : ""}`}>
                                    📅 締切: {task.deadline}
                                </span>

                                <div className={styles.actions}>
                                    <button
                                        type="button"
                                        className={styles.button}
                                        onClick={() => startEditing(task)}
                                        aria-label={`${task.name}を編集`}
                                    >
                                        編集
                                    </button>

                                    <button
                                        type="button"
                                        className={`${styles.button} ${styles.completeButton}`}
                                        onClick={() => onToggleComplete(task.id)}
                                        aria-pressed={task.completed}
                                        aria-label={
                                            task.completed
                                                ? `${task.name}を未完了に戻す`
                                                : `${task.name}を完了にする`
                                        }
                                    >
                                        {task.completed ? "未完了" : "完了"}
                                    </button>

                                    <button
                                        type="button"
                                        className={`${styles.button} ${styles.deleteButton}`}
                                        onClick={() => onDelete(task.id)}
                                        aria-label={`${task.name}を削除`}
                                    >
                                        削除
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
