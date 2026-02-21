
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const branches = await prisma.branch.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(branches);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch branches" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, address, googleMapsUrl, phone, email } = body;
        const newBranch = await prisma.branch.create({
            data: { name, address, googleMapsUrl, phone, email },
        });
        return NextResponse.json(newBranch);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create branch" }, { status: 500 });
    }
}
