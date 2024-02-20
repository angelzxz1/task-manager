import React from "react";
import { initialProfile } from "@/lib/initial-profile";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
    const profile = await initialProfile();
    return (
        <main className="flex items-center justify-center h-full">
            <section></section>
            <section>{children}</section>
        </main>
    );
};

export default Layout;
