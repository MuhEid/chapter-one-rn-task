export type Priority = "high" | "medium" | "low";

export type Task = {
    id: string;
    title: string;
    done: boolean;
    createdAt: number; // Date.now() at creation
    priority: Priority;
};
