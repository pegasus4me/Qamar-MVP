import prisma from "@/lib/db.server";
import { NextResponse } from "next/server";
import { parse, UrlWithParsedQuery } from 'url';


export const GET = async (req: Request) => {
    const parseUrl: UrlWithParsedQuery = parse(req.url, true);
    const { query } = parseUrl;
    const { id } = query;
   
    console.log("user id", id)
    try {
        const findUser = await prisma.user.findFirst({
            where: {
                id: id as string
            },
            include: {
                Posts: true,
                Reservations: true,
    
            }
        })
    
        return NextResponse.json({ reservations: findUser?.Reservations })
    } catch (error : any) {
        console.log(error)
        return NextResponse.json({error})
    }
}
