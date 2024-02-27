import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { GlobalProvider } from "@/context/global-provider";
import NextTopLoader from "nextjs-toploader";
import { NavBar } from "@/components/nav-bar";
import { AddTaskButton } from "@/components/add-task";
import { TaskModal } from "@/components/modals/add-task";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <GlobalProvider>
                <html lang="en">
                    <body className={`${inter.className} flex`}>
                        <NextTopLoader
                            height={2}
                            color="red"
                            easing="ease-in-out"
                        />
                        <main className="w-full h-full flex gap-10 p-10">
                            <NavBar />
                            <section className="flex-1 border rounded-lg relative bg-zinc-900 border-violet-300">
                                {children}
                                <AddTaskButton />
                                <TaskModal />
                            </section>
                        </main>
                    </body>
                </html>
            </GlobalProvider>
        </ClerkProvider>
    );
}
