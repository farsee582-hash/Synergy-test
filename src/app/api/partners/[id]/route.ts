
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.partner.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { name, logoUrl, order } = body;
        const updatedPartner = await prisma.partner.update({
            where: { id: params.id },
            data: { name, logoUrl, order },
        });
        return NextResponse.json(updatedPartner);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update partner" }, { status: 500 });
    }
}
