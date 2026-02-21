const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const slides = await prisma.heroSlide.findMany();
    console.log("Hero Slides:");
    console.log(slides.map((s) => s.imageUrl));

    const partners = await prisma.partner.findMany();
    console.log("Partners:");
    console.log(partners.map((p) => p.logoUrl));

    const testimonials = await prisma.testimonial.findMany();
    console.log("Testimonials:");
    console.log(testimonials.map((t) => t.imageUrl));
}

check().catch(console.error).finally(() => prisma.$disconnect());
