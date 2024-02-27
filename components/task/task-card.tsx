import { Task, TaskStatus } from "@prisma/client";
import { Badge } from "../ui/badge";
import { FormatDate } from "@/lib/utils";

export const TaskCard = ({ task }: { task: Task }) => {
    return (
        <div className="border-violet-300 p-4 bg-zinc-700 border flex flex-col rounded-lg h-64 w-72 justify-between items-stretch">
            <div className="">
                <h2 className="text-xl font-bold">{task.title}</h2>
                <p>{task.content}</p>
            </div>

            <div className="">
                <div>{FormatDate(task.createdAt)}</div>
                <div className="">
                    <BDG status={task.status} />
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
