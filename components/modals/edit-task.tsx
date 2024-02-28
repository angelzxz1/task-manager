"use client";

import { useGlobalContext } from "@/context/global-provider";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "@/components/modal";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import axios from "axios";
import { EditTaskForm } from "./edit-task-form";

export const EditTaskModal = () => {
    const { closeModal, editModal, openModal, task, currentTask } =
        useGlobalContext();
    const modalref = useRef<HTMLDialogElement>(null);
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

    useEffect(() => {
        const modalRef = modalref.current;
        if (!modalRef) return;
        if (editModal) {
            modalRef.showModal();
        } else {
            modalRef.close();
        }
    }, [closeModal, openModal]);
    useEffect(() => {
        console.log("currentTask", task);
    }, [currentTask]);
    if (!user) return null;
    return (
        <Dialog ref={modalref} className="relative">
            <Button
                className="hover:cursor-pointer absolute top-4 right-4"
                variant="plus"
                size="icon"
                onClick={() => closeModal("edit")}
            >
                <X />
            </Button>
            <EditTaskForm />
        </Dialog>
    );
};
