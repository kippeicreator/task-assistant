import type { Plan } from "@/types/plan";

type ResultCardProps = {
  result: Plan | null;
  className?: string;
  errorClassName?: string;
};

export default function ResultCard({ result, className, errorClassName }: ResultCardProps) {
  if (!result) {
    return null;
  }

  if (result.isError) {
    return (
      <section className={errorClassName} aria-labelledby="result-error-heading" role="alert">
        <h2 id="result-error-heading">入力エラー</h2>

        <ul>
          {result.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section aria-labelledby="result-heading">
      <h2 id="result-heading">結果</h2>
      <p>課題名：{result.taskName}</p>
      <p>締切まであと {result.daysLeft} 日</p>
      <p>モード：{result.mode === "emergency" ? "緊急" : "通常"}</p>

      <ul className={className}>
        {result.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
    </section>
  );
}
