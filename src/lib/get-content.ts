import prisma from "@/lib/prisma";
import { SITE_PAGES } from "@/lib/site-config";

export async function getContent(key: string) {
    const item = await prisma.pageContent.findUnique({
        where: { key },
    });
    return item;
}

export async function getPageContent(slug: keyof typeof SITE_PAGES) {
    const config = SITE_PAGES[slug];
    if (!config) return {};

    const dbContent = await prisma.pageContent.findMany({
        where: { section: config.section }
    });

    const contentMap: Record<string, string> = {};

    // Set defaults
    config.fields.forEach(field => {
        contentMap[field.key] = field.default;
    });

    // Override with DB
    dbContent.forEach((item: { key: string; content: string; imageUrl?: string | null }) => {
        contentMap[item.key] = item.content;
        if (item.imageUrl) {
            contentMap[item.key + "_image"] = item.imageUrl;
        }
    });

    return contentMap;
}

export async function getServices() {
    return await prisma.service.findMany({
        orderBy: { order: "asc" },
    });
}

export async function getPartners() {
    return await prisma.partner.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function getHeroSlides() {
    return await prisma.heroSlide.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
    });
}

export async function getTestimonials() {
    return await prisma.testimonial.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
    });
}

export async function getFaqs() {
    return await prisma.fAQItem.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
    });
}

export async function getBranches() {
    return await prisma.branch.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
    });
}
