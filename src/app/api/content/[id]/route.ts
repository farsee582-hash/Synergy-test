import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = params;
        const body = await request.json();
        const { content, imageUrl } = body;

        const updatedContent = await prisma.pageContent.update({
            where: { id },
            data: {
                content,
                imageUrl,
            },
        });

        return NextResponse.json(updatedContent);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = params;
        await prisma.pageContent.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Content deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
    }
}
