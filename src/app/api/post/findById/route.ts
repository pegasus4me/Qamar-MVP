import prisma from "@/lib/db.server";
import { NextResponse } from "next/server";
import { parse, UrlWithParsedQuery } from 'url';


export async function GET(req: Request) {
    try {

        const parseUrl: UrlWithParsedQuery = parse(req.url, true);
        const { query } = parseUrl;
        const { PostId } = query;


        const findById = await prisma.post.findFirst({
            where: {
                id: PostId as string
            },
            include: {
                author: true, // Return all fields
            }
        })

        return NextResponse.json({ user: findById })


    } catch (error: any) {
        console.error(error)
        return NextResponse.json({ msg: error })
    }
} 