type ResultCardProps = {
    result: string;
    className?: string;
};

export default function ResultCard({ result, className }: ResultCardProps) {
    if (!result) {
        return null;
    }

    return (
        <div>
            <h2>結果</h2>
            <p className={className}>{result}</p>
        </div>
    )
}