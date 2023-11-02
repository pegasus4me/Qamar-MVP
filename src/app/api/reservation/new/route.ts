import prisma from "@/lib/db.server";
import { NextResponse } from "next/server";
import { Treservation } from "@/types/reservation";
export const POST = async (req: Request) => {

    const {
        message,
        DateReserved,
        authorId,
        postId
    }: Treservation = await req.json()

    console.log(message, DateReserved, authorId, postId)
    // verification de la date de reservation si elle existe on throw
    const checkReservationDate = await prisma.reservation.findFirst({
        where: {
            DateReserved
        }
    })

    if (checkReservationDate) {
        return NextResponse.json({ error: "date already reserved" })
    }

    const createReservation = await prisma.reservation.create({
        data: {
            message,
            DateReserved,

            reservedBy: {
                connect: {
                    id: authorId
                }
            },
            postReference: {
                connect: {
                    id: postId
                }
            }
        },
        include: {
            reservedBy: true,
            postReference: true
        }
    })

    return NextResponse.json({ succes: "date reserved for you", createReservation})

}

/**
 * 
 * model Reservation {
    id            String   @id @default(auto()) @map("_id") @db.ObjectId
    reservedBy    User     @relation(fields: [authorId], references: [id])
    authorId      String   @unique @db.ObjectId
    postReference Post     @relation(fields: [postId], references: [id])
    postId        String   @db.ObjectId
    createdAt     DateTime @default(now())
    payed         Boolean  @default(false)
    DateReserved  DateTime // Ajout du champ DateReserved
    message       String?
}

 */