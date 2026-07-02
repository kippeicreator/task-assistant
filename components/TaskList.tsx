import type { Task } from "@/types/task";

type TaskListProps = {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
};

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
    if (tasks.length === 0) {
        return <p>保存された課題はありません。</p>;
    }

    return (
        <div>
            <h2>保存済み課題</h2>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>{task.name}</strong>
                        <br />
                        締切: {task.deadline}
                        <br />
                        <button onClick={() => onEdit(task)}>編集</button>
                        <button onClick={() => onDelete(task.id)}>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}