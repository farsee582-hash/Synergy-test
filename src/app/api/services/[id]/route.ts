import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        await prisma.service.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const { title, description, icon, link, category, order } = body;
        const updatedService = await prisma.service.update({
            where: { id },
            data: { title, description, icon, link, category, order },
        });
        return NextResponse.json(updatedService);
    } catch (error) {
        console.error("PUT API Error:", error);
        return NextResponse.json({ error: "Failed to update service", details: error }, { status: 500 });
    }
}
