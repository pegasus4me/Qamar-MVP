import prisma from "@/lib/db.server";
import { NextResponse } from "next/server";
import { Treservation } from "@/types/reservation";
export const dynamic = 'force-dynamic'

export const POST = async (req: Request) => {

    const {
        message,
        DateReserved,
        authorId,
        postId
    }: Treservation = await req.json()

    // verification de la date de reservation si elle existe on throw
    const checkReservationDate = await prisma.reservation.findFirst({
        where: {
            DateReserved
        }
    })

    if (checkReservationDate) {
        return NextResponse.json({ error: "date already reserved" })
    }

    try {
        const createReservation = await prisma.reservation.create({
            data: {
                message,
                DateReserved,
    
                reservedBy: {
                    connect: {
                        id: authorId as string
                    }
                },
                postReference: {
                    connect: {
                        id: postId as string
                    }
                }
            },
            include: {
                reservedBy: true,
                postReference: true,
            }
        })
    
        
        return NextResponse.json({ succes: "date reserved for you", createReservation, resId : createReservation.id})
    
    } catch (error : any) {
        console.log("err", error)
        return NextResponse.json({error})
    }
    
}

