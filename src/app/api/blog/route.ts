import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, slug, content, excerpt, imageUrl, published } = body;

        const newPost = await prisma.blogPost.create({
            data: {
                title,
                slug: slug || title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
                content,
                excerpt,
                imageUrl,
                published: published || false,
            },
        });

        return NextResponse.json(newPost);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
