import prisma from "@/lib/db.server";
import { NextResponse } from "next/server";
import { parse, UrlWithParsedQuery } from 'url';


export const GET = async (req: Request) => {
    const parseUrl: UrlWithParsedQuery = parse(req.url, true);
    const { query } = parseUrl;
    const { userId } = query;
    const findReservation = await prisma.reservation.findMany({
        where: {
            id: userId as string
        },
        include: {
            reservedBy: true,
            postReference: true
        }
    })
    return NextResponse.json({reservations : findReservation})
}