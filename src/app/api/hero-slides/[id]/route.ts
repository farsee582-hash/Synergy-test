import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        await prisma.heroSlide.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting slide:", error);
        return NextResponse.json({ error: "Failed to delete slide" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const { title, subtitle, imageUrl, ctaText, ctaLink, order, isActive } = body;

        const updatedSlide = await prisma.heroSlide.update({
            where: { id },
            data: {
                title,
                subtitle,
                imageUrl,
                ctaText,
                ctaLink,
                order,
                isActive,
            },
        });

        return NextResponse.json(updatedSlide);
    } catch (error) {
        console.error("Error updating slide:", error);
        return NextResponse.json({ error: "Failed to update slide" }, { status: 500 });
    }
}
