"use client";

import { useState, useEffect } from "react";
import ImageUpload from "@/components/ImageUpload";

interface BlogPostItem {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    imageUrl?: string;
    published: boolean;
}

export default function AdminBlogPage() {
    const [items, setItems] = useState<BlogPostItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<Omit<BlogPostItem, 'id'>>({ title: "", slug: "", content: "", excerpt: "", imageUrl: "", published: false });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/blog");
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await fetch(`/api/blog/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            } else {
                await fetch("/api/blog", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            }
            setFormData({ title: "", slug: "", content: "", excerpt: "", imageUrl: "", published: false });
            setEditingId(null);
            fetchPosts();
        } catch (error) {
            console.error("Failed to save post", error);
        }
    };

    const handleEdit = (item: BlogPostItem) => {
        setFormData({
            title: item.title,
            slug: item.slug,
            content: item.content,
            excerpt: item.excerpt || "",
            imageUrl: item.imageUrl || "",
            published: item.published
        });
        setEditingId(item.id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        try {
            const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
            if (!res.ok) {
                const data = await res.json();
                console.error("Delete failed:", data);
                alert(`Delete failed: ${data.error || "Unknown error"}`);
                return;
            }
            fetchPosts();
        } catch (error) {
            console.error("Failed to delete post", error);
            alert("Network error: Failed to delete post");
        }
    };

    if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;

    return (
        <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Blog Manager</h1>

            {/* Form */}
            <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>{editingId ? "Edit Post" : "Add New Post"}</h2>
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Blog Post Title"
                                style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "4px" }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Slug (Optional)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="blog-post-title"
                                style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "4px" }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Excerpt</label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            rows={2}
                            style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "4px" }}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Content</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows={6}
                            style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "4px" }}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Featured Image</label>
                        <ImageUpload
                            key={editingId || "new-blog-image"}
                            onUpload={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                            currentImage={formData.imageUrl}
                        />
                    </div>

                    <div>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "bold" }}>
                            <input
                                type="checkbox"
                                checked={formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                            />
                            Published
                        </label>
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <button
                            type="submit"
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#2563eb",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}
                        >
                            {editingId ? "Update Post" : "Add Post"}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setFormData({ title: "", slug: "", content: "", excerpt: "", imageUrl: "", published: false });
                                }}
                                style={{
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#9ca3af",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List */}
            <div style={{ display: "grid", gap: "1rem" }}>
                {items.map((item) => (
                    <div key={item.id} style={{ backgroundColor: "white", padding: "1rem", borderRadius: "8px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            {item.imageUrl && (
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
                                />
                            )}
                            <div>
                                <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#374151" }}>{item.title}</div>
                                <div style={{ fontSize: "0.875rem", color: item.published ? "green" : "orange" }}>
                                    {item.published ? "Published" : "Draft"}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button
                                onClick={() => handleEdit(item)}
                                style={{
                                    padding: "0.25rem 0.5rem",
                                    backgroundColor: "#f59e0b",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "0.875rem"
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                style={{
                                    padding: "0.25rem 0.5rem",
                                    backgroundColor: "#ef4444",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "0.875rem"
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                {items.length === 0 && <p style={{ color: "#6b7280", textAlign: "center" }}>No posts found.</p>}
            </div>
        </div>
    );
}
