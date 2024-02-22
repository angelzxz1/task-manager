"use client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useGlobalContext } from "@/context/global-provider";

export const AddTaskButton = () => {
    const { openModal, modal } = useGlobalContext();
    return (
        <Button
            className="absolute top-[1rem] right-[1rem]"
            variant="plus"
            size="icon"
            onClick={openModal}
        >
            <Plus />
        </Button>
    );
};
