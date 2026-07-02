import type { Task } from "@/types/task";

type TaskListProps = {
    tasks: Task[];
    onEdit: (task: Task) => void;
};

export default function TaskList({ tasks, onEdit }: TaskListProps) {
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
                    </li>
                ))}
            </ul>
        </div>
    );
}