"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getTasks() {
    return prisma.task.findMany({
        select: {
            id: true,
            name: true,
            deadline: true,
            completed: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function createTask(name: string, deadline: string) {
    const task = await prisma.task.create({
        data: {
            name,
            deadline,
        },
        select: {
            id: true,
            name: true,
            deadline: true,
            completed: true,
        },
    });

    revalidatePath("/");
    return task;
}

export async function updateTask(
    id: string,
    name: string,
    deadline: string,
    completed: boolean
) {
    const task = await prisma.task.update({
        where: { id },
        data: {
            name,
            deadline,
            completed,
        },
        select: {
            id: true,
            name: true,
            deadline: true,
            completed: true,
        },
    });

    revalidatePath("/");
    return task;
}

export async function toggleTaskComplete(id: string, completed: boolean) {
    const task = await prisma.task.update({
        where: { id },
        data: {
            completed,
        },
        select: {
            id: true,
            name: true,
            deadline: true,
            completed: true,
        },
    });

    revalidatePath("/");
    return task;
}

export async function deleteTask(id: string) {
    await prisma.task.delete({
        where: { id },
    });

    revalidatePath("/");
    return id;
}