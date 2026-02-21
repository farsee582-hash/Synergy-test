import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        // Handle URL-encoded form data (since the form uses standard action="...")
        const formData = await request.formData();

        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const message = formData.get("message") as string;
        const service = formData.get("service") as string; // Optional depending on form

        if (!firstName || !email || !message) {
            return NextResponse.redirect(new URL("/contacts?error=missing_fields", request.url));
        }

        const name = `${firstName} ${lastName}`.trim();

        await prisma.contactSubmission.create({
            data: {
                name,
                email,
                phone,
                message,
                service,
            },
        });

        // Redirect back to the page they were on, or standard contacts page
        const referer = request.headers.get('referer') || "/contacts";

        // Append a success flag without breaking existing query params
        const redirectUrl = new URL(referer);
        redirectUrl.searchParams.set("success", "true");

        return NextResponse.redirect(redirectUrl);

    } catch (error) {
        console.error("Failed to process contact form:", error);
        return NextResponse.redirect(new URL("/contacts?error=server_error", request.url));
    }
}
