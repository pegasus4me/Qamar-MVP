import { NextResponse } from "next/server";
import prisma from "@/lib/db.server";
import { TPost } from "@/types/post";
import { getServerSession } from "next-auth";

export const POST = async (req: Request) => {

    // authorName
    const {
        // imageUrl,
        sessionFormat,
        userId,
        title,
        price,
        description,
        yearsExperience,
        localisation,
        currentCompany,
        linkedin,
        whatsApp,
        twitter,
        disponibilities,
        experienceField,
        authorName

    }: TPost = await req.json()

    const checkDuplicate = await prisma.post.findFirst({
        where: {
            Title: title
        }
    })

    if (checkDuplicate) {
        return NextResponse.json({ msg: "post already exist" })
    }
    try {

        const createPost = await prisma.post.create({
            data: {
                // profilePic: imageUrl,
                sessionFormat,
                experienceField,
                description,
                Title: title,
                yearsExperience,
                localisation,
                currentCompany,
                disponibilities,
                twitter,
                whatsApp,
                linkedin,
                price,
                authorName: authorName,

                author: {
                    connect: {
                        id: userId
                    }
                }
            },
            include: {
                Reservation: true,
                author: true
            }

        })
        console.log("==================================",createPost)
        return NextResponse.json({ msg: "post created", createPost })
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({ code: 404, msg: "error" })
    }

}