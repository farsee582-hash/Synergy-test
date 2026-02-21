import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const items = await prisma.galleryItem.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { imageUrl, caption, category } = await request.json();

        if (!imageUrl) {
            return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
        }

        const item = await prisma.galleryItem.create({
            data: {
                imageUrl,
                caption,
                category,
            },
        });

        return NextResponse.json(item);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
    }
}
