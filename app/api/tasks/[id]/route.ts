import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const profile = await currentProfile();
        const { id } = params;
        console.log(params);
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        if (!id)
            return new NextResponse("No task ID provided", { status: 400 });
        const task = await db.task.delete({
            where: {
                id,
            },
        });

        return NextResponse.json({ task });
    } catch (error) {
        console.log("ERROR DELETING TASK: ", error);
        return NextResponse.json({ error: "Error deleting task", status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const profile = await currentProfile();
        const { id } = params;
        const { title, content, status } = await req.json();
        console.log(params);
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        if (!id)
            return new NextResponse("No task ID provided", { status: 400 });
        const task = await db.task.update({
            where: {
                id,
            },
            data: {
                title,
                content,
                status,
            },
        });

        return NextResponse.json({ task });
    } catch (error) {
        console.log("ERROR DELETING TASK: ", error);
        return NextResponse.json({ error: "Error deleting task", status: 500 });
    }
}
