import { describe, expect, it, beforeEach, afterAll } from "vitest";
import { prisma } from "../lib/prisma";

describe("database task operations", () => {
    beforeEach(async () => {
        await prisma.task.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("Taskを作成できる", async () => {
        const task = await prisma.task.create({
            data: {
                name: "数学課題",
                deadline: "2099-01-01",
            },
        });

        expect(task.name).toBe("数学課題");
        expect(task.deadline).toBe("2099-01-01");
        expect(task.completed).toBe(false);
    });

    it("Taskを取得できる", async () => {
        await prisma.task.create({
            data: {
                name: "英語レポート",
                deadline: "2099-01-01",
            },
        });

        const tasks = await prisma.task.findMany();

        expect(tasks).toHaveLength(1);
        expect(tasks[0].name).toBe("英語レポート");
    });

    it("Taskを更新できる", async () => {
        const task = await prisma.task.create({
            data: {
                name: "発表準備",
                deadline: "2099-01-01",
            },
        });

        const updatedTask = await prisma.task.update({
            where: { id: task.id },
            data: {
                completed: true,
            },
        });

        expect(updatedTask.completed).toBe(true);
    });

    it("Taskを削除できる", async () => {
        const task = await prisma.task.create({
            data: {
                name: "削除テスト",
                deadline: "2099-01-01",
            },
        });

        await prisma.task.delete({
            where: { id: task.id },
        });

        const tasks = await prisma.task.findMany();

        expect(tasks).toHaveLength(0);
    });
});