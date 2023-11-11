import { NextResponse } from "next/server";
import prisma from "@/lib/db.server";
import { TPost } from "@/types/post";

export const POST = async (req: Request) => {

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
        author

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
                authorName: author?.name,

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
        return NextResponse.json({ msg: "post created", createPost })
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({ code: 404, msg: "error" })
    }

}