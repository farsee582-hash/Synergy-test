import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const slides = await prisma.heroSlide.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(slides);
    } catch (error) {
        console.error("Error fetching slides:", error);
        return NextResponse.json({ error: "Failed to fetch slides" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, subtitle, imageUrl, ctaText, ctaLink } = body;

        const newSlide = await prisma.heroSlide.create({
            data: {
                title,
                subtitle,
                imageUrl,
                ctaText,
                ctaLink,
                order: 0, // Default to 0, or logic to append
            },
        });

        return NextResponse.json(newSlide);
    } catch (error) {
        console.error("Error creating slide:", error);
        return NextResponse.json({ error: "Failed to create slide" }, { status: 500 });
    }
}
