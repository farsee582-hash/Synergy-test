"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Testimonial {
    id: string;
    name: string;
    role: string | null;
    content: string;
    rating: number;
    imageUrl: string | null;
    order: number;
    isActive: boolean;
}

export default function TestimonialsAdminPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        content: "",
        rating: 5,
        imageUrl: "",
        order: 0,
        isActive: true
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/testimonials");
            const data = await res.json();
            setTestimonials(data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        }
        setLoading(false);
    };

    const handleEdit = (testimonial: Testimonial) => {
        setEditingTestimonial(testimonial);
        setFormData({
            name: testimonial.name,
            role: testimonial.role || "",
            content: testimonial.content,
            rating: testimonial.rating,
            imageUrl: testimonial.imageUrl || "",
            order: testimonial.order,
            isActive: testimonial.isActive
        });
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this review?")) return;
        try {
            const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
            if (res.ok) fetchTestimonials();
        } catch (error) {
            console.error("Error deleting testimonial:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const apiEndpoint = editingTestimonial ? `/api/testimonials/${editingTestimonial.id}` : "/api/testimonials";
        const method = editingTestimonial ? "PUT" : "POST";

        try {
            const res = await fetch(apiEndpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowModal(false);
                setEditingTestimonial(null);
                setFormData({ name: "", role: "", content: "", rating: 5, imageUrl: "", order: 0, isActive: true });
                fetchTestimonials();
            }
        } catch (error) {
            console.error("Error saving testimonial:", error);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: uploadData });
            const data = await res.json();
            if (data.url) setFormData({ ...formData, imageUrl: data.url });
        } catch (error) {
            console.error("Upload failed", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary-navy)" }}>Reviews (Testimonials)</h1>
                <button
                    onClick={() => {
                        setEditingTestimonial(null);
                        setFormData({ name: "", role: "", content: "", rating: 5, imageUrl: "", order: 0, isActive: true });
                        setShowModal(true);
                    }}
                    style={{ backgroundColor: "var(--primary-green)", color: "white", padding: "0.75rem 1.5rem", borderRadius: "8px", fontWeight: "bold", border: "none", cursor: "pointer" }}
                >
                    + Add New Review
                </button>
            </div>

            <div style={{ display: "grid", gap: "1.5rem" }}>
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} style={{ display: "flex", gap: "1.5rem", backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", alignItems: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                        <div style={{ width: "60px", height: "60px", position: "relative", borderRadius: "50%", overflow: "hidden", flexShrink: 0, backgroundColor: "#f3f4f6" }}>
                            {testimonial.imageUrl ? (
                                <Image src={testimonial.imageUrl} alt={testimonial.name} fill style={{ objectFit: "cover" }} />
                            ) : (
                                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", color: "#9ca3af" }}>
                                    👤
                                </div>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{testimonial.name}</h3>
                            <p style={{ color: "gray", fontSize: "0.9rem", marginBottom: "0.25rem" }}>{testimonial.role}</p>
                            <p style={{ fontSize: "0.95rem", fontStyle: "italic", marginBottom: "0.5rem" }}>"{testimonial.content}"</p>
                            <div style={{ color: "#fbbf24", fontSize: "1.2rem" }}>
                                {Array(testimonial.rating).fill("★").join("")}{Array(5 - testimonial.rating).fill("☆").join("")}
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
                            <span style={{ fontSize: "0.8rem", backgroundColor: testimonial.isActive ? "#dcfce7" : "#fee2e2", color: testimonial.isActive ? "#166534" : "#991b1b", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>
                                {testimonial.isActive ? "Active" : "Inactive"}
                            </span>
                            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                                <button onClick={() => handleEdit(testimonial)} style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db", borderRadius: "6px", backgroundColor: "white", cursor: "pointer" }}>Edit</button>
                                <button onClick={() => handleDelete(testimonial.id)} style={{ padding: "0.5rem 1rem", border: "1px solid #fee2e2", borderRadius: "6px", backgroundColor: "#fef2f2", color: "#ef4444", cursor: "pointer" }}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
                {testimonials.length === 0 && <div style={{ textAlign: "center", padding: "3rem", color: "gray" }}>No reviews found.</div>}
            </div>

            {showModal && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
                    <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", width: "90%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" }}>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>{editingTestimonial ? "Edit Review" : "New Review"}</h2>
                        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <div>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Name</label>
                                    <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} required />
                                </div>
                                <div>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Role/Company (Optional)</label>
                                    <input type="text" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Review Content</label>
                                <textarea value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", minHeight: "100px" }} required />
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <div>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Rating (1-5)</label>
                                    <input type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} required />
                                </div>
                                <div>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Avatar Image</label>
                                    <div style={{ display: "flex", gap: "1rem" }}>
                                        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: "100%" }} />
                                        {formData.imageUrl && (
                                            <div style={{ width: "40px", height: "40px", position: "relative", borderRadius: "50%", overflow: "hidden" }}>
                                                <Image src={formData.imageUrl} alt="Preview" fill style={{ objectFit: "cover" }} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "2rem", marginTop: "0.5rem" }}>
                                <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                    <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })} /> Active
                                </label>
                                <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                    Order:
                                    <input type="number" value={formData.order} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })} style={{ width: "60px", padding: "0.25rem", border: "1px solid #d1d5db", borderRadius: "4px" }} />
                                </label>
                            </div>
                            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", backgroundColor: "white", cursor: "pointer", fontWeight: "600" }}>Cancel</button>
                                <button type="submit" style={{ flex: 1, padding: "0.75rem", backgroundColor: "var(--primary-navy)", color: "white", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "600" }}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
