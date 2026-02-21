"use client";

import { useState, useEffect } from "react";
import ImageUpload from "@/components/ImageUpload";

interface GalleryItem {
    id: string;
    imageUrl: string;
    caption: string | null;
    category: string | null;
}

export default function AdminGalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ imageUrl: "", caption: "", category: "Office" });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch("/api/gallery");
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Failed to fetch gallery items", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.imageUrl) {
            alert("Image URL is required");
            return;
        }

        try {
            if (editingId) {
                await fetch(`/api/gallery/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            } else {
                await fetch("/api/gallery", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            }
            setFormData({ imageUrl: "", caption: "", category: "Office" });
            setEditingId(null);
            fetchItems();
        } catch (error) {
            console.error("Failed to save gallery item", error);
        }
    };

    const handleEdit = (item: GalleryItem) => {
        setFormData({
            imageUrl: item.imageUrl,
            caption: item.caption || "",
            category: item.category || "Office",
        });
        setEditingId(item.id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this gallery item?")) return;
        try {
            await fetch(`/api/gallery/${id}`, { method: "DELETE" });
            fetchItems();
        } catch (error) {
            console.error("Failed to delete gallery item", error);
        }
    };

    if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;

    return (
        <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "2rem", color: "var(--primary-navy)" }}>Manage Gallery</h1>

            {/* Form */}
            <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>{editingId ? "Edit Image" : "Add New Image"}</h2>
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Image Upload</label>
                        <ImageUpload
                            currentImage={formData.imageUrl}
                            onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
                        />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Caption (optional)</label>
                            <input
                                type="text"
                                value={formData.caption}
                                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #d1d5db" }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #d1d5db" }}
                            >
                                <option value="Office">Office</option>
                                <option value="Events">Events</option>
                                <option value="Team">Team</option>
                                <option value="Awards">Awards</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                        <button type="submit" style={{ backgroundColor: "var(--primary-navy)", color: "white", padding: "0.5rem 1rem", borderRadius: "4px", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                            {editingId ? "Update Image" : "Add Image"}
                        </button>
                        {editingId && (
                            <button type="button" onClick={() => { setEditingId(null); setFormData({ imageUrl: "", caption: "", category: "Office" }); }} style={{ backgroundColor: "#9ca3af", color: "white", padding: "0.5rem 1rem", borderRadius: "4px", border: "none", cursor: "pointer" }}>
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}>
                {items.length === 0 ? (
                    <p style={{ color: "#6b7280", gridColumn: "1 / -1" }}>No gallery images found.</p>
                ) : (
                    items.map((item) => (
                        <div key={item.id} style={{ backgroundColor: "white", borderRadius: "8px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                            <div style={{ position: "relative", width: "100%", height: "200px" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.imageUrl?.startsWith('/') ? item.imageUrl : `/${item.imageUrl}`}
                                    alt={item.caption || "Gallery"}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                                {item.category && (
                                    <span style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "var(--primary-green)", color: "white", padding: "2px 8px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "bold" }}>
                                        {item.category}
                                    </span>
                                )}
                            </div>
                            <div style={{ padding: "1rem" }}>
                                {item.caption && <p style={{ fontWeight: "bold", margin: "0 0 0.5rem 0", fontSize: "0.95rem" }}>{item.caption}</p>}
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <button onClick={() => handleEdit(item)} style={{ backgroundColor: "#3b82f6", color: "white", padding: "0.25rem 0.5rem", borderRadius: "4px", border: "none", cursor: "pointer", fontSize: "0.85rem" }}>Edit</button>
                                    <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: "#ef4444", color: "white", padding: "0.25rem 0.5rem", borderRadius: "4px", border: "none", cursor: "pointer", fontSize: "0.85rem" }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
