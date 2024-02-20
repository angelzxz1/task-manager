"use client";

import { SampleData } from "@prisma/client";
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
