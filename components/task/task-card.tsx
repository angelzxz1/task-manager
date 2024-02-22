import { Task } from "@prisma/client";

export const TaskCard = ({ task }: { task: Task }) => {
    return (
        <div>
            <h1>{task.title}</h1>
            <p>{task.content}</p>
        </div>
    );
};
