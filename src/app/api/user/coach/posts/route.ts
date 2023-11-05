import { NextResponse } from "next/server";
import prisma from "@/lib/db.server";
import { parse, UrlWithParsedQuery } from 'url';
export const dynamic = 'force-dynamic'
export const GET = async(req : Request) => {
    
    const parseUrl: UrlWithParsedQuery = parse(req.url, true);
    const { query } = parseUrl;
    const { CoachId } = query;


    try {
        const findPosts = await prisma.post.findMany({
            where : {
                authorId : CoachId as string
            },
    
            include : {
                Reservation : {
                    include: {
                        postReference : true,
                    }
                }
            }
        })
        return NextResponse.json({statut : findPosts})     
    } catch (e: any) {
        console.log("erreur", e)
        return NextResponse.json({e})
    }
   
}

