import type { Task } from "@/types/task";

type TaskListProps = {
    tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
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
                    </li>
                ))}
            </ul>
        </div>
    );
}