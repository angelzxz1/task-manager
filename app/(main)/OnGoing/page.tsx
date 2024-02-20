"use client";

import { useGlobalContext } from "@/context/global-provider";
import { SampleData } from "@prisma/client";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
    const { tasksList } = useGlobalContext();
    console.log(tasksList);

    return <div>Home page</div>;
}
