import React from "react";
import { initialProfile } from "@/lib/initial-profile";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
    const profile = await initialProfile();
    return (
        <main className="flex items-center justify-center h-full overflow-hidden">
            {children}
        </main>
    );
};

export default Layout;
