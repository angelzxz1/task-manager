import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

interface jsonData {
    userId: string;
}

export async function GET(req: NextRequest) {
    try {
        const user = await currentProfile();
        if (!user) return new NextResponse("Unauthorized", { status: 401 });
        const tasks = await db.task.findMany({
            where: {
                userId: user.id,
            },
        });
        return NextResponse.json({
            message: "List of tasks returned successfully!",
            tasks,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { title, content, status } = await req.json();
        if (!title || !content || !status)
            return new NextResponse("Invalid input", { status: 400 });
        const user = await currentProfile();
        if (!user) return new NextResponse("Unauthorized", { status: 401 });
        const { id } = user;
        const task = await db.task.create({
            data: {
                title: title,
                content: content,
                userId: id,
            },
        });
        return NextResponse.json({
            message: "Task created successfully!",
            task,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
