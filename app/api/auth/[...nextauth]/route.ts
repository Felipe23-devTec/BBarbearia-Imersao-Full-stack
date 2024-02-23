import { db } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import nextAuth from "next-auth";
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';

const handler = nextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string

        })
    ]
})

export { handler as GET, handler as POST }