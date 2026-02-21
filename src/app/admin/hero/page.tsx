"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    ctaText: string;
    ctaLink: string;
    order: number;
    isActive: boolean;
}

export default function HeroAdminPage() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        imageUrl: "",
        ctaText: "Get Started",
        ctaLink: "/contacts",
        isActive: true,
        order: 0
    });

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/hero-slides");
            const data = await res.json();
            setSlides(data);
        } catch (error) {
            console.error("Error fetching slides:", error);
        }
        setLoading(false);
    };

    const handleEdit = (slide: HeroSlide) => {
        setEditingSlide(slide);
        setFormData({
            title: slide.title,
            subtitle: slide.subtitle || "",
            imageUrl: slide.imageUrl,
            ctaText: slide.ctaText,
            ctaLink: slide.ctaLink,
            isActive: slide.isActive,
            order: slide.order
        });
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this slide?")) return;
        try {
            const res = await fetch(`/api/hero-slides/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchSlides();
            }
        } catch (error) {
            console.error("Error deleting slide:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingSlide ? `/api/hero-slides/${editingSlide.id}` : "/api/hero-slides/new"; // Adjusted endpoint
        const method = editingSlide ? "PUT" : "POST";

        // For POST, we use the root endpoint /api/hero-slides
        const apiEndpoint = editingSlide ? `/api/hero-slides/${editingSlide.id}` : "/api/hero-slides";

        try {
            const res = await fetch(apiEndpoint, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowModal(false);
                setEditingSlide(null);
                setFormData({
                    title: "",
                    subtitle: "",
                    imageUrl: "",
                    ctaText: "Get Started",
                    ctaLink: "/contacts",
                    isActive: true,
                    order: 0
                });
                fetchSlides();
            }
        } catch (error) {
            console.error("Error saving slide:", error);
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
            if (data.url) {
                setFormData({ ...formData, imageUrl: data.url });
            }
        } catch (error) {
            console.error("Upload failed", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary-navy)" }}>Hero Slides</h1>
                <button
                    onClick={() => setShowModal(true)}
                    style={{ backgroundColor: "var(--primary-green)", color: "white", padding: "0.75rem 1.5rem", borderRadius: "8px", fontWeight: "bold", border: "none", cursor: "pointer" }}
                >
                    + Add New Slide
                </button>
            </div>

            <div style={{ display: "grid", gap: "1.5rem" }}>
                {slides.map(slide => (
                    <div key={slide.id} style={{ display: "flex", gap: "1.5rem", backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", alignItems: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                        <div style={{ width: "150px", height: "100px", position: "relative", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                            <Image src={slide.imageUrl} alt={slide.title} fill style={{ objectFit: "cover" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.25rem" }}>{slide.title}</h3>
                            <p style={{ color: "gray", fontSize: "0.9rem", marginBottom: "0.5rem" }}>{slide.subtitle || "(No subtitle)"}</p>
                            <span style={{ fontSize: "0.8rem", backgroundColor: slide.isActive ? "#dcfce7" : "#fee2e2", color: slide.isActive ? "#166534" : "#991b1b", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>
                                {slide.isActive ? "Active" : "Inactive"}
                            </span>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button
                                onClick={() => handleEdit(slide)}
                                style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db", borderRadius: "6px", backgroundColor: "white", cursor: "pointer" }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(slide.id)}
                                style={{ padding: "0.5rem 1rem", border: "1px solid #fee2e2", borderRadius: "6px", backgroundColor: "#fef2f2", color: "#ef4444", cursor: "pointer" }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {slides.length === 0 && <div style={{ textAlign: "center", padding: "3rem", color: "gray" }}>No slides found.</div>}
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
                    <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", width: "90%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" }}>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
                            {editingSlide ? "Edit Slide" : "New Slide"}
                        </h2>
                        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                            <div>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Subtitle</label>
                                <textarea
                                    value={formData.subtitle}
                                    onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                    style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", minHeight: "80px" }}
                                />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Image</label>
                                <div style={{ display: "flex", gap: "1rem" }}>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                                    {formData.imageUrl && (
                                        <div style={{ width: "60px", height: "40px", position: "relative", borderRadius: "4px", overflow: "hidden" }}>
                                            <Image src={formData.imageUrl} alt="Preview" fill style={{ objectFit: "cover" }} />
                                        </div>
                                    )}
                                </div>
                                <input type="hidden" value={formData.imageUrl} required />
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <div>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>CTA Text</label>
                                    <input
                                        type="text"
                                        value={formData.ctaText}
                                        onChange={e => setFormData({ ...formData, ctaText: e.target.value })}
                                        style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>CTA Link</label>
                                    <input
                                        type="text"
                                        value={formData.ctaLink}
                                        onChange={e => setFormData({ ...formData, ctaLink: e.target.value })}
                                        style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "2rem", marginTop: "0.5rem" }}>
                                <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                                    />
                                    Active
                                </label>
                                <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                    Order:
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        style={{ width: "60px", padding: "0.25rem", border: "1px solid #d1d5db", borderRadius: "4px" }}
                                    />
                                </label>
                            </div>
                            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                                <button
                                    type="button"
                                    onClick={() => { setShowModal(false); setEditingSlide(null); }}
                                    style={{ flex: 1, padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", backgroundColor: "white", cursor: "pointer", fontWeight: "600" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{ flex: 1, padding: "0.75rem", backgroundColor: "var(--primary-navy)", color: "white", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "600" }}
                                >
                                    {editingSlide ? "Save Changes" : "Create Slide"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
