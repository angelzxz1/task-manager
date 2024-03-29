"use client";

import { useGlobalContext } from "@/context/global-provider";
import { Task } from "@prisma/client";
import { usePathname } from "next/navigation";
import { TaskCard } from "./task-card";
import { ScrollArea } from "../ui/scroll-area";
export const AllTasks = () => {
    const { tasksList, importantTasks, pending, completedTasks, inprogress } =
        useGlobalContext();
    const pathname = usePathname();
    if (pathname === "/important") {
        return <Tasks tasks={importantTasks} />;
    }
    if (pathname === "/pending") {
        return <Tasks tasks={pending} />;
    }
    if (pathname === "/completed") {
        return <Tasks tasks={completedTasks} />;
    }
    if (pathname === "/inprogress") {
        return <Tasks tasks={inprogress} />;
    }
    return <Tasks tasks={tasksList} />;
};

const Tasks = ({ tasks }: { tasks: Task[] }) => {
    return (
        <ScrollArea className="w-full h-[calc(100vh-10rem)]">
            <section className="py-4 flex gap-4 flex-wrap">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </section>
        </ScrollArea>
    );
};
