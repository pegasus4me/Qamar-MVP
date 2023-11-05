import prisma from "@/lib/db.server";
import { NextResponse } from "next/server";
import { parse, UrlWithParsedQuery } from 'url';
import axios from "axios";

export const GET = async (req: Request) => {
    const parseUrl: UrlWithParsedQuery = parse(req.url, true);
    const { query } = parseUrl;
    const { id } = query;

    try {
        const findUser = await prisma.user.findFirst({
            where: {
                id: id as string
            },
            include: {
                Posts: true,
                Reservations: {
                    include: {
                        postReference: true,
                    },
                },
            }
        })
        return NextResponse.json({ reservations: findUser?.Reservations, })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error })
    }
}
