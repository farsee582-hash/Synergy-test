import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
    try {
        // 1. Check if the admin user already exists to prevent duplicate creation
        const existingAdmin = await prisma.user.findUnique({
            where: { email: "admin@synergy.com" }, // Default admin email
        });

        if (existingAdmin) {
            return NextResponse.json({ message: "Admin user already exists. You can log in!" }, { status: 200 });
        }

        // 2. Hash the default password securely
        const hashedPassword = await bcrypt.hash("SynergyAdmin123!", 10);

        // 3. Create the new Admin user in the SQLite database
        const newAdmin = await prisma.user.create({
            data: {
                name: "Synergy Admin",
                email: "admin@synergy.com",
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            {
                message: "SUCCESS! Admin user successfully created.",
                credentials: {
                    email: newAdmin.email,
                    password: "SynergyAdmin123!",
                },
                nextSteps: "Please go to /admin/login to sign in.",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Setup Error:", error);
        return NextResponse.json({ error: "Failed to create admin user" }, { status: 500 });
    }
}
