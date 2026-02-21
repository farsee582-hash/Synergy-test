
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const partners = await prisma.partner.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(partners);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Support bulk upload or single
        if (Array.isArray(body)) {
            // Bulk create
            const operations = body.map(p => prisma.partner.create({
                data: { name: p.name, logoUrl: p.logoUrl, order: p.order || 0 }
            }));
            const results = await prisma.$transaction(operations);
            return NextResponse.json(results);
        } else {
            const { name, logoUrl } = body;
            const newPartner = await prisma.partner.create({
                data: { name, logoUrl },
            });
            return NextResponse.json(newPartner);
        }
    } catch (error) {
        return NextResponse.json({ error: "Failed to create partner" }, { status: 500 });
    }
}
