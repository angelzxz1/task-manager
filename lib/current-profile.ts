import { auth } from "@clerk/nextjs";
import type { User } from "@prisma/client";
import { db } from "@/lib/db";

export const currentProfile = async () => {
    const { userId } = auth();

    if (!userId) {
        return null;
    }

    const profile = await db.user.findUnique({
        where: {
            userId,
        },
    });

    return profile as User | null;
};
