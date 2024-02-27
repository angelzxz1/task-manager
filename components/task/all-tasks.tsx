"use client";

import { useGlobalContext } from "@/context/global-provider";
import { Task } from "@prisma/client";
import { usePathname } from "next/navigation";
import { TaskCard } from "./task-card";
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
    return tasks.map((task) => <TaskCard key={task.id} task={task} />);
};
