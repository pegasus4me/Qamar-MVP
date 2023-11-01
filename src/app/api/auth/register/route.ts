import prisma from "@/lib/db.server";
import { NextResponse } from "next/server";
import { Tregister } from "@/types/auth";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

export async function POST(req: Request) {

    const { email, password, name, role }: Tregister = await req.json();
    const checkIfUserExist = await prisma.user.findFirst({
        where: {
            email
        }
    })
    if (checkIfUserExist) NextResponse.json({ msg: "user already registered with this email" })

    const Hash = await bcrypt.hash(password, 10)
    
    let userRole;

    if (role === "student") {
        userRole = Role.USER
    } else {
        userRole = Role.COACH
    }

    try {
        const create_user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                hashedPassword: Hash,
                Role: userRole
            }
        })
        return NextResponse.json({ create_user })
        console.log("error",create_user)

    } catch (e: any) {
        console.log("error",e)

        return NextResponse.json({ error: e })
    }
}