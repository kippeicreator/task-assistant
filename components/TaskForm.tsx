import styles from "./TaskForm.module.css";

type TaskFormProps = {
    taskName: string;
    deadline: string;
    onTaskNameChange: (value: string) => void;
    onDeadlineChange: (value: string) => void;
    onSubmit: () => void;
};

export default function TaskForm({
    taskName,
    deadline,
    onTaskNameChange,
    onDeadlineChange,
    onSubmit,
}: TaskFormProps) {
    return (
        <div className={styles.form}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="taskName">
                    課題名
                </label>
                <input
                    className={styles.input}
                    type="text"
                    id="taskName"
                    placeholder="課題名を入力"
                    value={taskName}
                    onChange={(e) => onTaskNameChange(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="deadline">
                    締切
                </label>
                <input
                    className={styles.input}
                    id="deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => onDeadlineChange(e.target.value)}
                />
            </div>

            <button className={styles.button} onClick={onSubmit}>
                計画作成
            </button>
        </div>
    );
}