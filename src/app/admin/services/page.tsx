"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string | null;
    link: string | null;
    order: number;
}

export default function ServicesAdminPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        icon: "",
        link: "",
        order: 0
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/services");
            const data = await res.json();
            setServices(data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
        setLoading(false);
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setFormData({
            title: service.title,
            description: service.description,
            icon: service.icon || "",
            link: service.link || "",
            order: service.order
        });
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;
        try {
            const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
            if (res.ok) fetchServices();
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const apiEndpoint = editingService ? `/api/services/${editingService.id}` : "/api/services";
        const method = editingService ? "PUT" : "POST";

        try {
            const res = await fetch(apiEndpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowModal(false);
                setEditingService(null);
                setFormData({ title: "", description: "", icon: "", link: "", order: 0 });
                fetchServices();
            }
        } catch (error) {
            console.error("Error saving service:", error);
        }
    };

    const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: uploadData });
            const data = await res.json();
            if (data.url) setFormData({ ...formData, icon: data.url });
        } catch (error) {
            console.error("Upload failed", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary-navy)" }}>Services</h1>
                <button
                    onClick={() => {
                        setEditingService(null);
                        setFormData({ title: "", description: "", icon: "", link: "", order: 0 });
                        setShowModal(true);
                    }}
                    style={{ backgroundColor: "var(--primary-green)", color: "white", padding: "0.75rem 1.5rem", borderRadius: "8px", fontWeight: "bold", border: "none", cursor: "pointer" }}
                >
                    + Add New Service
                </button>
            </div>

            <div style={{ display: "grid", gap: "1.5rem" }}>
                {services.map(service => (
                    <div key={service.id} style={{ display: "flex", gap: "1.5rem", backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", alignItems: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                        <div style={{ width: "60px", height: "60px", position: "relative", borderRadius: "8px", overflow: "hidden", flexShrink: 0, backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {service.icon ? (
                                <Image src={service.icon} alt={service.title} width={40} height={40} style={{ objectFit: "contain" }} />
                            ) : (
                                <span style={{ fontSize: "1.5rem" }}>💼</span>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.25rem" }}>{service.title}</h3>
                            <p style={{ color: "gray", fontSize: "0.9rem", marginBottom: "0.25rem" }}>{service.description}</p>
                            {service.link && <p style={{ fontSize: "0.8rem", color: "var(--primary-green)" }}>Link: {service.link}</p>}
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button onClick={() => handleEdit(service)} style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db", borderRadius: "6px", backgroundColor: "white", cursor: "pointer" }}>Edit</button>
                            <button onClick={() => handleDelete(service.id)} style={{ padding: "0.5rem 1rem", border: "1px solid #fee2e2", borderRadius: "6px", backgroundColor: "#fef2f2", color: "#ef4444", cursor: "pointer" }}>Delete</button>
                        </div>
                    </div>
                ))}
                {services.length === 0 && <div style={{ textAlign: "center", padding: "3rem", color: "gray" }}>No services found.</div>}
            </div>

            {showModal && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
                    <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", width: "90%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" }}>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>{editingService ? "Edit Service" : "New Service"}</h2>
                        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                            <div>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Title</label>
                                <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} required />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Description</label>
                                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", minHeight: "80px" }} required />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Icon</label>
                                <div style={{ display: "flex", gap: "1rem" }}>
                                    <input type="file" accept="image/*" onChange={handleIconUpload} />
                                    {formData.icon && (
                                        <div style={{ width: "40px", height: "40px", position: "relative" }}>
                                            <Image src={formData.icon} alt="Preview" width={40} height={40} style={{ objectFit: "contain" }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <div>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Link (Optional)</label>
                                    <input type="text" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} />
                                </div>
                                <div>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Order</label>
                                    <input type="number" value={formData.order} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} />
                                </div>
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
