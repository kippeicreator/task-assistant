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
    <>
      <div>
        <label htmlFor="taskName">課題名</label>
        <br />
        <input
          type="text"
          id="taskName"
          placeholder="課題名を入力"
          value={taskName}
          onChange={(e) => onTaskNameChange(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label htmlFor="deadline">締切</label>
        <br />
        <input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(e) => onDeadlineChange(e.target.value)}
        />
      </div>

      <br />

      <button onClick={onSubmit}>
        計画作成
      </button>
    </>
  );
}