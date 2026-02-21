import prisma from "@/lib/prisma";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div>
            <PageHero
                title="Latest News & Insights"
                description="Stay updated with the latest trends, regulatory changes, and success stories from Synergy Hub."
            />
            <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem", minHeight: "50vh" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem", marginTop: "2rem" }}>
                    {posts.map((post: any) => (
                        <div key={post.id} style={{ border: "1px solid #e5e7eb", borderRadius: "12px", backgroundColor: "white", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                            {post.imageUrl && (
                                <div style={{ height: "220px", overflow: "hidden" }}>
                                    <img src={post.imageUrl} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                            )}
                            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                                <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem", color: "var(--primary-navy)" }}>{post.title}</h2>
                                <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </div>
                                <p style={{ color: "#4b5563", marginBottom: "1.5rem", flexGrow: 1 }}>{post.excerpt}</p>
                                <div style={{ marginTop: "auto", display: "flex", justifyContent: "center" }}>
                                    <Link href={`/blog/${encodeURIComponent(post.slug)}`} style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "var(--primary-green, #16a34a)",
                                        color: "white",
                                        padding: "0.5rem 1.25rem",
                                        borderRadius: "6px",
                                        fontWeight: "bold",
                                        textDecoration: "none"
                                    }}>
                                        Read Full Article →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    {posts.length === 0 && <p className="text-center" style={{ gridColumn: "1 / -1", color: "#6b7280" }}>No articles found.</p>}
                </div>
            </div>
        </div>
    );
}
