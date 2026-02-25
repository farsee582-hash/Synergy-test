import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { imageUrl, caption, category } = await request.json();

        const item = await prisma.galleryItem.update({
            where: { id: (await context.params).id },
            data: {
                imageUrl,
                caption,
                category,
            },
        });

        return NextResponse.json(item);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.galleryItem.delete({
            where: { id: (await context.params).id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
    }
}
