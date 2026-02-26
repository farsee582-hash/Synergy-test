import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export async function GET(req: Request, ...args: any[]) {
    process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'https://synergy-lilac.vercel.app';
    return handler(req as any, ...args);
}

export async function POST(req: Request, ...args: any[]) {
    process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'https://synergy-lilac.vercel.app';
    return handler(req as any, ...args);
}
