"use client";

import { Task, TaskStatus } from "@prisma/client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type GlobalContextType = {
    tasksList: Task[];
    deleteTask: (id: string) => void;
    isLoading: boolean;
    completedTasks: Task[];
    importantTasks: Task[];
    inprogress: Task[];
    pending: Task[];
    updateTask: (task: Task) => void;
    modal: boolean;
    editModal: boolean;
    openModal: (option: "edit" | "create") => void;
    closeModal: (option: "edit" | "create") => void;
    allTasks: () => void;
    task: Task;
    currentTask: (task: Task) => void;
};
type GlobalUpdateContextType = {
    setTasksList: (tasksList: Task[]) => void;
};
export const GlobalContext = createContext<GlobalContextType>({
    tasksList: [],
    deleteTask: () => {},
    isLoading: false,
    completedTasks: [],
    importantTasks: [],
    inprogress: [],
    pending: [],
    updateTask: () => {},
    modal: false,
    editModal: false,
    openModal: (option) => {},
    closeModal: (option) => {},
    allTasks: () => {},
    task: {
        id: "",
        title: "",
        content: "",
        status: TaskStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "",
    },
    currentTask: () => {},
});
export const GlobalUpdateContext = createContext<GlobalUpdateContextType>({
    setTasksList: () => {},
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasksList, setTasksList] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [task, setTask] = useState<Task>({
        id: "aber",
        title: "",
        content: "",
        status: TaskStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "",
    });

    const currentTask = (task: Task) => {
        setTask(task);
    };

    const openModal = (option: "edit" | "create") => {
        if (option === "edit") {
            setEditModal(true);
        } else {
            setModal(true);
        }
    };
    const closeModal = (option: "edit" | "create") => {
        if (option === "edit") {
            setEditModal(false);
        } else {
            setModal(false);
        }
    };
    const allTasks = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get<{
                message: string;
                tasks: Task[];
            }>("/api/tasks");

            const sorted = res.data.tasks.sort((a, b) => {
                return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                );
            });

            setTasksList(sorted);

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const deleteTask = async (id: string) => {
        try {
            const res = await axios.delete(`/api/tasks/${id}`);
            //   toast.success("Task deleted");

            allTasks();
        } catch (error) {
            console.log(error);
            //   toast.error("Something went wrong");
        }
    };
    const updateTask = async (task: Task) => {
        try {
            const res = await axios.put(`/api/tasks`, task);

            // toast.success("Task updated");
            allTasks();
        } catch (error) {
            console.log(error);
            // toast.error("Something went wrong");
        }
    };
    const completedTasks = tasksList.filter(
        (task) => task.status === TaskStatus.COMPLETED
    );
    const importantTasks = tasksList.filter(
        (task) => task.status === TaskStatus.IMPORTANT
    );
    const inprogress = tasksList.filter(
        (task) => task.status === TaskStatus.IN_PROGRESS
    );
    const pending = tasksList.filter(
        (task) => task.status === TaskStatus.PENDING
    );

    useEffect(() => {
        allTasks();
    }, []);
    return (
        <GlobalContext.Provider
            value={{
                tasksList,
                deleteTask,
                isLoading,
                completedTasks,
                importantTasks,
                inprogress,
                pending,
                updateTask,
                modal,
                editModal,
                openModal,
                closeModal,
                allTasks,
                task,
                currentTask,
            }}
        >
            <GlobalUpdateContext.Provider value={{ setTasksList }}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalUpdateContext = () => useContext(GlobalUpdateContext);
