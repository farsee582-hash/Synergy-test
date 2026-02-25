
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, icon, link, category, order } = body;
        const newService = await prisma.service.create({
            data: { title, description, icon, link, category, order },
        });
        return NextResponse.json(newService);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
    }
}
