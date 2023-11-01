import prisma from "@/lib/db.server";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const findAllPosts = await prisma.post.findMany({
        include: {
            author: true, // Return all fields
        }
    })
    return NextResponse.json(findAllPosts)
}