import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db.server";
import { compare } from "bcrypt";


const handler = NextAuth({

    providers : [
        Google({
            clientId : process.env.GOOGLE_CLIENT as string,
            clientSecret : process.env.GOOGLE_SECRET as string,
            authorization : {
                params : {
                    prompt :"consent",
                    acces_type: "offline",
                    response_type : "code"
                }
            }
        }),

        CredentialsProvider({
            
            type: "credentials",

            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                
                if(!credentials?.email || !credentials?.password) 
                    throw new Error("you must provide email or password");

                const user = await prisma.user.findFirst({
                    where :{
                        email : credentials?.email
                    }
                })

                if(!user || !user.hashedPassword) 
                    throw new Error("Email not registered or password incorrect");
                
                    const checkPaswword = await compare(credentials?.password, user.hashedPassword);
                if(!checkPaswword) throw new Error('password not correct');

                return user;
              }
        }),
    ],

    pages: {
        signIn: "auth/login",
        error: "auth/error",
    },

    jwt : {
        secret: process.env.NEXT_AUTH_JWT_SECRET,
        maxAge: 60 * 60 * 24 * 30,
    },

    session : {
        strategy : "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks : {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.Role = user.Role;
            }
            return token
        },

        async session({ session, token }: { session: any, token: any }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.Role = token.Role
            }
            return session;

        }
        // async redirect({url, baseUrl}) {
        //     if(url.startsWith('/'))
        // }
    },

    secret: process.env.NEXT_AUTH_SECRET
})
export { handler as GET, handler as POST }