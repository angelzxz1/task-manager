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

const formSchema = z.object({
    title: z.string().min(3).max(255),
    content: z.string().min(0).max(255),
    status: z.nativeEnum(TaskStatus).default(TaskStatus.PENDING),
});

export const AddTaskForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            status: TaskStatus.PENDING,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input {...field} id="title" />
                            <FormMessage>
                                {form.formState.errors.title?.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};
