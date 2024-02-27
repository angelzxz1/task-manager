"use client";

import { useGlobalContext } from "@/context/global-provider";
import { ReactNode, useContext, useEffect, useRef } from "react";
import { Dialog } from "@/components/modal";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { AddTaskForm } from "./add-task-form";

export const TaskModal = ({ children }: { children?: ReactNode }) => {
    const { closeModal, modal, openModal } = useGlobalContext();
    const modalref = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const modalRef = modalref.current;
        if (!modalRef) return;
        if (modal) {
            modalRef.showModal();
        } else {
            modalRef.close();
        }
    }, [closeModal, openModal]);
    return (
        <Dialog ref={modalref} className="relative">
            <Button
                className="hover:cursor-pointer absolute top-4 right-4"
                variant="plus"
                size="icon"
                onClick={closeModal}
            >
                <X />
            </Button>
            <AddTaskForm />
            {children}
        </Dialog>
    );
};
