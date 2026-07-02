import type { Task } from "@/types/task";

const STORAGE_KEY = "task-assistant-tasks";

export function getTasks(): Task[] {
    if (typeof window === "undefined") {
        return [];
    }

    const savedTasks = window.localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) {
        return [];
    }

    return JSON.parse(savedTasks) as Task[];
}

export function saveTasks(tasks: Task[]) {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}