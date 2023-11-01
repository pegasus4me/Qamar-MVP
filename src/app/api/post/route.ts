import { NextResponse } from "next/server";
import prisma from "@/lib/db.server";
import { TPost } from "@/types/post";

export const POST = async (req: Request) => {

    const {
        imageUrl,
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
        experienceField

    }: TPost = await req.json()

    const checkDuplicate = await prisma.post.findFirst({
        where: {
            Title: title || description
        }
    })

    if (checkDuplicate) NextResponse.json({ msg: "post already exist" })
    try {

        const createPost = await prisma.post.create({
            data: {
                profilePic : imageUrl,
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
                author: {
                    connect: {
                        id: userId
                    }
                }
            },
            include: {
                Reservation: true,
                author : true
            }

        })
        return NextResponse.json({ msg: "post created", createPost })
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({ code: 404, msg: "error" })
    }

}