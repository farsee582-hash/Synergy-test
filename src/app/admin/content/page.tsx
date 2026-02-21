"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

interface ContentItem {
    id: string;
    key: string;
    content: string;
    section: string;
    imageUrl?: string;
}

export default function AdminContentPage() {
    const [items, setItems] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ key: "", content: "", section: "", imageUrl: "" });
    const [editingId, setEditingId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch("/api/content");
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Failed to fetch content", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await fetch(`/api/content/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            } else {
                await fetch("/api/content", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            }
            setFormData({ key: "", content: "", section: "", imageUrl: "" });
            setEditingId(null);
            fetchContent();
        } catch (error) {
            console.error("Failed to save content", error);
        }
    };

    const handleEdit = (item: ContentItem) => {
        setFormData({
            key: item.key,
            content: item.content,
            section: item.section,
            imageUrl: item.imageUrl || ""
        });
        setEditingId(item.id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            await fetch(`/api/content/${id}`, { method: "DELETE" });
            fetchContent();
        } catch (error) {
            console.error("Failed to delete content", error);
        }
    };

    if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;

    return (
        <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Page Content Manager</h1>

            {/* Form */}
            <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>{editingId ? "Edit Content" : "Add New Content"}</h2>
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Key (Unique ID)</label>
                            <input
                                type="text"
                                value={formData.key}
                                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                                placeholder="e.g., home_hero_title"
                                disabled={!!editingId} // Key should not be editable ideally
                                style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "4px" }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Section</label>
                            <input
                                type="text"
                                value={formData.section}
                                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                placeholder="e.g., Home"
                                style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "4px" }}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Content Text</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows={4}
                            style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "4px" }}
                            required
                        />
                    </div>

                    <div>
                        <div>
                            <div>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Image (Optional)</label>
                                {/* Key ensures component resets when editing different items */}
                                <ImageUpload
                                    key={editingId || "new"}
                                    onUpload={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                                    currentImage={formData.imageUrl}
                                />
                            </div>
                        </div>
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
                            {editingId ? "Update Content" : "Add Content"}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setFormData({ key: "", content: "", section: "", imageUrl: "" });
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
                        <div>
                            <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>
                                <span style={{ fontWeight: "bold", color: "#374151" }}>{item.key}</span> • {item.section}
                            </div>
                            <div style={{ fontSize: "1rem" }}>
                                {item.content.length > 100 ? item.content.substring(0, 100) + "..." : item.content}
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
                {items.length === 0 && <p style={{ color: "#6b7280", textAlign: "center" }}>No content entries found.</p>}
            </div>
        </div>
    );
}
