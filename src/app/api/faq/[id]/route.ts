
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.fAQItem.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { question, answer, order, isActive } = body;
        const updatedFAQ = await prisma.fAQItem.update({
            where: { id: params.id },
            data: { question, answer, order, isActive },
        });
        return NextResponse.json(updatedFAQ);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
    }
}
