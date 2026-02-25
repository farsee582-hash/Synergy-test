import prisma from "@/lib/prisma";
import PageHero from "@/components/PageHero";
import Link from "next/link";

export const generateStaticParams = async () => {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { published: true },
            select: { slug: true },
        });
        return posts.map((post) => ({ slug: post.slug }));
    } catch (error) {
        console.warn("Skipping static params generation: DB not accessible during build.");
        return [];
    }
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const decodedSlug = decodeURIComponent(resolvedParams.slug);

    const post = await prisma.blogPost.findUnique({
        where: { slug: decodedSlug },
    });

    if (!post) {
        return (
            <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem", minHeight: "50vh" }}>
                <h2>Post not found</h2>
                <Link href="/blog" style={{ color: "var(--primary-green)" }}>
                    ← Back to blog
                </Link>
            </div>
        );
    }

    return (
        <div>
            <PageHero title={post.title} description={post.excerpt ?? ""} />
            <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem", minHeight: "50vh" }}>
                {post.imageUrl && (
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        style={{
                            width: "100%",
                            maxHeight: "400px",
                            objectFit: "cover",
                            marginBottom: "1rem",
                        }}
                    />
                )}
                <div
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    style={{ lineHeight: "1.6", color: "#4b5563" }}
                />
                <Link
                    href="/blog"
                    style={{
                        display: "inline-block",
                        marginTop: "1.5rem",
                        color: "var(--primary-green)",
                        fontWeight: "bold",
                    }}
                >
                    ← Back to blog
                </Link>
            </div>
        </div>
    );
}
