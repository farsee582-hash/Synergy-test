import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    const section = searchParams.get("section");

    if (key) {
        const content = await prisma.pageContent.findUnique({
            where: { key }
        });
        return NextResponse.json(content);
    }

    if (section) {
        const content = await prisma.pageContent.findMany({
            where: { section }
        });
        return NextResponse.json(content);
    }

    const allContent = await prisma.pageContent.findMany();
    return NextResponse.json(allContent);
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    /* 
       // Uncomment if auth is strictly required for this route, though middleware usually handles it
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    */

    try {
        const body = await request.json();

        // Check if bulk update (array or object with data)
        if (body.section && body.data) {
            // Bulk update
            const updates = Object.entries(body.data).map(async ([key, content]) => {
                return prisma.pageContent.upsert({
                    where: { key },
                    update: { content: content as string },
                    create: {
                        key,
                        content: content as string,
                        section: body.section
                    }
                });
            });
            await Promise.all(updates);
            return NextResponse.json({ success: true });
        }

        // Single Update
        const { key, content, section, imageUrl } = body;
        if (!key || !content || !section) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newContent = await prisma.pageContent.upsert({
            where: { key },
            update: { content, section, imageUrl },
            create: {
                key,
                content,
                section,
                imageUrl,
            },
        });

        return NextResponse.json(newContent);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create content" }, { status: 500 });
    }
}
