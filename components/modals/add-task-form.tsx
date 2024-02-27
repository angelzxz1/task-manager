"use client";

import { z } from "zod";
import { TaskStatus } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useGlobalContext } from "@/context/global-provider";

const formSchema = z.object({
    title: z.string().min(3).max(100),
    content: z.string().min(0).max(500),
    status: z.nativeEnum(TaskStatus).default(TaskStatus.PENDING),
});

export const AddTaskForm = () => {
    const [loading, setLoading] = useState(false);
    const [length, setLength] = useState(0);
    const { closeModal, allTasks } = useGlobalContext();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            status: TaskStatus.PENDING,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            await axios.post("/api/tasks", values);
            allTasks();
            closeModal();
        } catch (error) {
            console.error("Hubo un error");
        }
        form.reset();
        setLoading(false);
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-black border rounded-lg p-4 flex flex-col gap-4 w-96"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input
                                {...field}
                                id="title"
                                placeholder="Buy milk..."
                            />

                            <FormMessage>
                                {form.formState.errors.title?.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="title">Content</FormLabel>
                            <Textarea {...field} id="content" />
                            <div className="flex justify-end text-sm">
                                {form.getValues("content").length}/500
                            </div>
                        </FormItem>
                    )}
                />
                <Button disabled={loading}>
                    {loading ? <Loader className="animate-spin" /> : "Add Task"}
                </Button>
            </form>
        </Form>
    );
};
