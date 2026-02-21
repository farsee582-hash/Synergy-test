
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.service.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { title, description, icon, link, order } = body;
        const updatedService = await prisma.service.update({
            where: { id: params.id },
            data: { title, description, icon, link, order },
        });
        return NextResponse.json(updatedService);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
    }
}
