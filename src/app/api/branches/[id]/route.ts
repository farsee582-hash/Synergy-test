
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.branch.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete branch" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { name, address, googleMapsUrl, phone, email, order, isActive } = body;
        const updatedBranch = await prisma.branch.update({
            where: { id: params.id },
            data: { name, address, googleMapsUrl, phone, email, order, isActive },
        });
        return NextResponse.json(updatedBranch);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update branch" }, { status: 500 });
    }
}
