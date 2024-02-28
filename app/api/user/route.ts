import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await currentProfile();
        if (!user) return new NextResponse("User not logged", { status: 401 });
        return NextResponse.json({
            message: "User logged successfully!",
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
