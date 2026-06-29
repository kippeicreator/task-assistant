import type { Plan } from "@/types/plan";

type ResultCardProps = {
  result: Plan | null;
  className?: string;
};

export default function ResultCard({ result, className }: ResultCardProps) {
  if (!result) {
    return null;
  }

  return (
    <div>
      <h2>結果</h2>
      <p>課題名：{result.taskName}</p>
      <p>締切まであと {result.daysLeft} 日</p>
      <p>モード：{result.mode === "emergency" ? "緊急" : "通常"}</p>

      <ul className={className}>
        {result.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
    </div>
  );
}