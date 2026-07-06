"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateAIStudyPlanWithSource } from "@/lib/ai-planner";

const taskSelect = {
    id: true,
    name: true,
    deadline: true,
    completed: true,
};

async function getCurrentUserId() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("ログインが必要です。");
    }

    return session.user.id;
}

export async function getTasks() {
    try {
        const userId = await getCurrentUserId();

        return await prisma.task.findMany({
            where: {
                userId,
            },
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
        const userId = await getCurrentUserId();

        const task = await prisma.task.create({
            data: {
                name,
                deadline,
                userId,
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
        const userId = await getCurrentUserId();

        const task = await prisma.task.update({
            where: {
                id,
                userId,
            },
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
        const userId = await getCurrentUserId();

        const task = await prisma.task.update({
            where: {
                id,
                userId,
            },
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
        const userId = await getCurrentUserId();

        await prisma.task.delete({
            where: {
                id,
                userId,
            },
        });

        revalidatePath("/");
        return id;
    } catch (error) {
        console.error("Failed to delete task:", error);
        throw new Error("課題の削除に失敗しました。");
    }
}

export async function createAIStudyPlan(name: string, deadline: string) {
    await getCurrentUserId();

    const task = {
        id: "",
        name,
        deadline,
        completed: false,
    };

    return generateAIStudyPlanWithSource(task);
}
