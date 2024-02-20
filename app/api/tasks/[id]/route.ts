import { NextRequest, NextResponse } from "next/server";
import {} from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const task = await prisma.task.delete({
            where: {
                id,
            },
        });

        return NextResponse.json(task);
    } catch (error) {
        console.log("ERROR DELETING TASK: ", error);
        return NextResponse.json({ error: "Error deleting task", status: 500 });
    }
}
