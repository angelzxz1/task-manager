"use client";
import { UserButton } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import {
    Check,
    ClipboardList,
    Home,
    LayoutList,
    ListOrdered,
    Loader,
    LogOut,
} from "lucide-react";
import { links } from "@/json/links.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";

interface iconProps {
    [key: string]: JSX.Element;
}

const icons: iconProps = {
    home: <Home />,
    important: <ListOrdered />,
    completed: <Check />,
    inprogress: <ClipboardList />,
    pending: <LayoutList />,
};
export const NavBar = () => {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
    }, []);
    if (!user)
        return (
            <nav className="h-full xl:w-1/6 sm:w-2/6 sm:relative w-full flex fixed top-0 left-0 border border-violet-300 items-center rounded-lg flex-col justify-between py-16 bg-zinc-900 z-50"></nav>
        );
    return (
        <nav className="h-full xl:w-1/6 sm:w-2/6 sm:relative w-full flex fixed top-0 left-0 border border-violet-300 items-center rounded-lg flex-col justify-between py-16 bg-zinc-900 z-50">
            <div className="min-h-[50px] w-full flex justify-center items-center">
                {loading ? (
                    <UserButton
                        showName={true}
                        appearance={{
                            variables: {
                                colorText: "white",
                                colorBackground: "#5b21b6",
                            },
                            elements: {
                                avatarBox: {
                                    width: "50px",
                                    height: "50px",
                                },
                            },
                        }}
                    />
                ) : (
                    <Loader className="animate-spin" />
                )}
            </div>
            <div className="flex flex-col w-full">
                {links.map((link) => {
                    return (
                        <Link
                            key={link.name}
                            href={link.url}
                            className={cn(
                                "hover:cursor-pointer transition-all w-full text-center py-2 flex items-center justify-center gap-2 ",
                                pathname === link.url
                                    ? "text-violet-500 bg-violet-300 "
                                    : "hover:bg-zinc-700 "
                            )}
                        >
                            <span className="w-2/5 flex justify-end">
                                {icons[link.icon]}
                            </span>
                            <span className="w-3/5 flex justify-start">
                                {link.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
            <div className="flex gap-2">
                <div className="min-h-[24px]">
                    {loading ? (
                        <SignOutButton
                            children={
                                <LogOut className="hover:cursor-pointer hover:text-violet-700 transition-all" />
                            }
                        />
                    ) : (
                        <Loader className="animate-spin" />
                    )}
                </div>
            </div>
        </nav>
    );
};
