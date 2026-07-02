import type { Task } from "@/types/task";

import styles from "./TaskList.module.css";

type TaskListProps = {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string) => void;
};

export default function TaskList({ tasks, onEdit, onDelete, onToggleComplete }: TaskListProps) {
    if (tasks.length === 0) {
        return <p>保存された課題はありません。</p>;
    }

    return (
        <div>
            <h2>保存済み課題</h2>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong
                            className={task.completed ? styles.completed : ""}
                        >
                            {task.name}
                        </strong>
                        <span
                            className={task.completed ? styles.completed : ""}
                        >
                            締切: {task.deadline}
                        </span>
                        <button onClick={() => onEdit(task)}>編集</button>
                        <button onClick={() => onDelete(task.id)}>削除</button>
                        <button onClick={() => onToggleComplete(task.id)}>
                            {task.completed ? "未完了" : "完了"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}