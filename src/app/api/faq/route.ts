
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const faqs = await prisma.fAQItem.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(faqs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { question, answer } = body;
        const newFAQ = await prisma.fAQItem.create({
            data: { question, answer },
        });
        return NextResponse.json(newFAQ);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
    }
}
