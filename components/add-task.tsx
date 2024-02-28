"use client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useGlobalContext } from "@/context/global-provider";
import axios from "axios";
import { useState, useEffect } from "react";

export const AddTaskButton = () => {
    const { openModal, modal } = useGlobalContext();

    const [user, setUser] = useState<boolean>(false);
    useEffect(() => {
        axios
            .get<{ message: string }>("/api/user")
            .then((res) => {
                setUser(true);
            })
            .catch((error) => {
                setUser(false);
            });
    }, []);
    if (!user) return null;
    return (
        <Button
            className="absolute top-[1rem] right-[1rem]"
            variant="plus"
            size="icon"
            onClick={() => openModal("create")}
        >
            <Plus />
        </Button>
    );
};
