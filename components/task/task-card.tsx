"use client";

import { Task, TaskStatus } from "@prisma/client";
import { Badge } from "../ui/badge";
import { FormatDate } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { Loader, Pencil, Trash } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useGlobalContext } from "@/context/global-provider";
import { EditTaskButton } from "../edit-task";

export const TaskCard = ({ task }: { task: Task }) => {
    const { allTasks } = useGlobalContext();
    const [deleting, setDeleting] = useState(false);
    return (
        <div className="border-violet-300 p-4 bg-zinc-700 border flex flex-col rounded-lg h-64 w-72 justify-between items-stretch">
            <div className="flex-1 flex flex-col">
                <h2 className="text-xl font-bold pl-2">{task.title}</h2>
                <div className="flex-1">
                    <ScrollArea className="h-[135px] w-[254px] px-2">
                        {task.content}
                    </ScrollArea>
                </div>
            </div>

            <div className="">
                <div className="pl-2 text-sm font-thin">
                    {FormatDate(task.createdAt)}
                </div>
                <div className="pl-2 flex justify-between">
                    <BDG status={task.status} />
                    <div className="flex">
                        <EditTaskButton task={task} />
                        <Button
                            className="hover:text-red-500"
                            variant="none"
                            size="none"
                            onClick={async () => {
                                setDeleting(true);
                                try {
                                    await axios.delete(`/api/tasks/${task.id}`);
                                    allTasks();
                                } catch (error) {
                                    console.error("Hubo un error");
                                }
                                setDeleting(false);
                            }}
                        >
                            {deleting ? (
                                <Loader className="animate-spin" />
                            ) : (
                                <Trash />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BDG = ({ status }: { status: TaskStatus }) => {
    if (status === TaskStatus.COMPLETED)
        return (
            <Badge
                color="#00ff00"
                className="bg-emerald-500 hover:bg-emerald-400"
            >
                {status}
            </Badge>
        );
    if (status === TaskStatus.IN_PROGRESS)
        return (
            <Badge color="#0000ff" className="bg-cyan-500 hover:bg-cyan-400">
                {status}
            </Badge>
        );
    if (status === TaskStatus.IMPORTANT)
        return (
            <Badge color="#ff0000" className="bg-red-500 hover:bg-red-400">
                {status}
            </Badge>
        );
    return (
        <Badge color="#ffff00" className="bg-yellow-300 hover:bg-yellow-200">
            {status}
        </Badge>
    );
};
