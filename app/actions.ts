"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const taskSelect = {
    id: true,
    name: true,
    deadline: true,
    completed: true,
};

export async function getTasks() {
    try {
        return await prisma.task.findMany({
            select: taskSelect,
            orderBy: {
                createdAt: "desc",
            },
        });
    } catch (error) {
        console.error("Failed to get tasks:", error);
        throw new Error("課題の取得に失敗しました。");
    }
}

export async function createTask(name: string, deadline: string) {
    try {
        const task = await prisma.task.create({
            data: {
                name,
                deadline,
            },
            select: taskSelect,
        });

        revalidatePath("/");
        return task;
    } catch (error) {
        console.error("Failed to create task:", error);
        throw new Error("課題の保存に失敗しました。");
    }
}

export async function updateTask(
    id: string,
    name: string,
    deadline: string,
    completed: boolean
) {
    try {
        const task = await prisma.task.update({
            where: { id },
            data: {
                name,
                deadline,
                completed,
            },
            select: taskSelect,
        });

        revalidatePath("/");
        return task;
    } catch (error) {
        console.error("Failed to update task:", error);
        throw new Error("課題の更新に失敗しました。");
    }
}

export async function toggleTaskComplete(id: string, completed: boolean) {
    try {
        const task = await prisma.task.update({
            where: { id },
            data: {
                completed,
            },
            select: taskSelect,
        });

        revalidatePath("/");
        return task;
    } catch (error) {
        console.error("Failed to toggle task completion:", error);
        throw new Error("課題の完了状態の更新に失敗しました。");
    }
}

export async function deleteTask(id: string) {
    try {
        await prisma.task.delete({
            where: { id },
        });

        revalidatePath("/");
        return id;
    } catch (error) {
        console.error("Failed to delete task:", error);
        throw new Error("課題の削除に失敗しました。");
    }
}