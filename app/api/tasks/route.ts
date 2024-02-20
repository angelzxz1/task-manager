import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface jsonData {
    userId: string;
}

export async function GET(req: NextRequest) {
    try {
        const tasks = await db.sampleData.findMany();
        return NextResponse.json({
            message: "List of tasks returned successfully!",
            tasks,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
