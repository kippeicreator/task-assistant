import type { Task } from "@/types/task";
import styles from "./TaskList.module.css";

type TaskListProps = {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string) => void;
};

export default function TaskList({
    tasks,
    onEdit,
    onDelete,
    onToggleComplete,
}: TaskListProps) {
    if (tasks.length === 0) {
        return <p className={styles.empty}>保存された課題はありません。</p>;
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>保存済み課題（{tasks.length}件）</h2>

            <ul className={styles.list}>
                {tasks.map((task) => (
                    <li key={task.id} className={styles.card}>
                        <strong className={`${styles.title} ${task.completed ? styles.completed : ""}`}>
                            {task.name}
                        </strong>

                        <span className={`${styles.deadline} ${task.completed ? styles.completed : ""}`}>
                            📅 締切: {task.deadline}
                        </span>

                        <div className={styles.actions}>
                            <button className={styles.button} onClick={() => onEdit(task)}>
                                編集
                            </button>

                            <button
                                className={`${styles.button} ${styles.completeButton}`}
                                onClick={() => onToggleComplete(task.id)}
                            >
                                {task.completed ? "未完了" : "完了"}
                            </button>

                            <button
                                className={`${styles.button} ${styles.deleteButton}`}
                                onClick={() => onDelete(task.id)}
                            >
                                削除
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}