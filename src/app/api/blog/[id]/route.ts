import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await context.params;
        const body = await request.json();
        const { title, slug, content, excerpt, imageUrl, published } = body;

        const updatedPost = await prisma.blogPost.update({
            where: { id },
            data: {
                title,
                slug,
                content,
                excerpt,
                imageUrl,
                published,
            },
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await context.params;
        await prisma.blogPost.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Failed to delete blog post:", error);
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }
}
