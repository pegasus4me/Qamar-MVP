import prisma from "@/lib/db.server";
import { NextResponse } from "next/server";
import { parse, UrlWithParsedQuery } from 'url';
export const dynamic = 'force-dynamic'

export const GET = async (req: Request) => {
    const parseUrl: UrlWithParsedQuery = parse(req.url, true);
    const { query } = parseUrl;
    const { id } = query;

    try {
        const findReservation = await prisma.reservation.findUnique({
            where: {
                id: id as string
            },
            include: {
                reservedBy: true,
                postReference: true
            }
        })
        return NextResponse.json({ reservations: findReservation })
    } catch (error: any) {
        console.log(error)
    }
}