import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const profile = await currentProfile();
        const { id } = params;

        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        if (!id)
            return new NextResponse("No task ID provided", { status: 400 });
        const task = await db.sampleData.delete({
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
