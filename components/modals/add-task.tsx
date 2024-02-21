"use client";

import { GlobalContext } from "@/context/global-provider";
import { ReactNode, useContext, useEffect, useRef } from "react";

export const TaskModal = ({ content }: { content: ReactNode }) => {
    const modalref = useRef(null);
    useEffect(() => {
        if (modalref.current) {
            modalref.current.showModal();
        }
    }, []);
    return (
        <dialog ref={modalref}>
            <h1>Task Modal</h1>
        </dialog>
    );
};
