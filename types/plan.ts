export type Plan = {
    taskName: string;
    daysLeft: number;
    mode: "normal" | "emergency";
    steps: string[];
};