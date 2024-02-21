"use client";

import { SampleData, Task } from "@prisma/client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type GlobalContextType = {
    tasksList: SampleData[];
};
type GlobalUpdateContextType = {
    setTasksList: (tasksList: SampleData[]) => void;
};
export const GlobalContext = createContext<GlobalContextType>({
    tasksList: [],
});
export const GlobalUpdateContext = createContext<GlobalUpdateContextType>({
    setTasksList: () => {},
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasksList, setTasksList] = useState<SampleData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const openModal = () => {
        setModal(true);
    };
    const closeModal = () => {
        setModal(false);
    };
    const allTasks = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get<{
                message: string;
                tasks: SampleData[];
            }>("/api/tasks");

            const sorted = res.data.tasks.sort((a, b) => {
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
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

    useEffect(() => {
        allTasks();
    }, []);
    return (
        <GlobalContext.Provider value={{ tasksList }}>
            <GlobalUpdateContext.Provider value={{ setTasksList }}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalUpdateContext = () => useContext(GlobalUpdateContext);
