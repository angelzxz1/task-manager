"use client";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { useGlobalContext } from "@/context/global-provider";
import axios from "axios";
import { Task } from "@prisma/client";

export const EditTaskButton = ({ task }: { task: Task }) => {
    const { openModal, currentTask } = useGlobalContext();
    return (
        <Button
            className="hover:text-indigo-500"
            variant="none"
            size="none"
            onClick={() => {
                currentTask(task);
                openModal("edit");
            }}
        >
            <Pencil />
        </Button>
    );
};
