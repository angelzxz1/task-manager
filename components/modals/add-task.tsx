"use client";

import { useGlobalContext } from "@/context/global-provider";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { Dialog } from "@/components/modal";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { AddTaskForm } from "./add-task-form";
import axios from "axios";

export const TaskModal = () => {
    const { closeModal, modal, openModal } = useGlobalContext();
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
        if (modal) {
            modalRef.showModal();
        } else {
            modalRef.close();
        }
    }, [closeModal, openModal]);
    if (!user) return null;
    return (
        <Dialog ref={modalref} className="relative">
            <Button
                className="hover:cursor-pointer absolute top-4 right-4"
                variant="plus"
                size="icon"
                onClick={() => closeModal("create")}
            >
                <X />
            </Button>
            <AddTaskForm />
        </Dialog>
    );
};
