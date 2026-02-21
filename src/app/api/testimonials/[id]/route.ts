
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.testimonial.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { name, role, content, rating, imageUrl, order, isActive } = body;
        const updatedTestimonial = await prisma.testimonial.update({
            where: { id: params.id },
            data: { name, role, content, rating, imageUrl, order, isActive },
        });
        return NextResponse.json(updatedTestimonial);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
    }
}
