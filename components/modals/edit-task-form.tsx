"use client";

import { z } from "zod";
import { Task, TaskStatus } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useGlobalContext } from "@/context/global-provider";

const formSchema = z.object({
    title: z.string().min(3).max(100),
    content: z.string().min(0).max(500),
    status: z.nativeEnum(TaskStatus).default(TaskStatus.PENDING),
});

export const EditTaskForm = ({ task }: { task: Task }) => {
    const [loading, setLoading] = useState(false);
    const { allTasks } = useGlobalContext();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: task.title,
            content: task.content,
            status: task.status,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            const res = await axios.patch(`/api/tasks/${task.id}`, values);
            allTasks();
        } catch (error) {
            console.error("Hubo un error");
        }
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
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="status">Status</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormItem className="">
                                        <FormControl>
                                            <RadioGroupItem
                                                value={TaskStatus.PENDING}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Pending
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="">
                                        <FormControl>
                                            <RadioGroupItem
                                                value={TaskStatus.IMPORTANT}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Important
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="">
                                        <FormControl>
                                            <RadioGroupItem
                                                value={TaskStatus.IN_PROGRESS}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            In Progress
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="">
                                        <FormControl>
                                            <RadioGroupItem
                                                value={TaskStatus.COMPLETED}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Completed
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button disabled={loading}>
                    {loading ? (
                        <Loader className="animate-spin" />
                    ) : (
                        "Update Task"
                    )}
                </Button>
            </form>
        </Form>
    );
};
