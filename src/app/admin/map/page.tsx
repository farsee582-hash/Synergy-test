"use client";

import React, { useState, useEffect } from "react";

interface Branch {
    id: string;
    name: string;
    address: string;
    googleMapsUrl: string;
    phone: string | null;
    email: string | null;
    order: number;
    isActive: boolean;
}

export default function BranchesAdminPage() {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        googleMapsUrl: "",
        phone: "",
        email: "",
        order: 0,
        isActive: true
    });

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/branches");
            const data = await res.json();
            setBranches(data);
        } catch (error) {
            console.error("Error fetching branches:", error);
        }
        setLoading(false);
    };

    const handleEdit = (branch: Branch) => {
        setEditingBranch(branch);
        setFormData({
            name: branch.name,
            address: branch.address,
            googleMapsUrl: branch.googleMapsUrl,
            phone: branch.phone || "",
            email: branch.email || "",
            order: branch.order,
            isActive: branch.isActive
        });
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this location?")) return;
        try {
            const res = await fetch(`/api/branches/${id}`, { method: "DELETE" });
            if (res.ok) fetchBranches();
        } catch (error) {
            console.error("Error deleting branch:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const apiEndpoint = editingBranch ? `/api/branches/${editingBranch.id}` : "/api/branches";
        const method = editingBranch ? "PUT" : "POST";

        try {
            const res = await fetch(apiEndpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowModal(false);
                setEditingBranch(null);
                setFormData({ name: "", address: "", googleMapsUrl: "", phone: "", email: "", order: 0, isActive: true });
                fetchBranches();
            }
        } catch (error) {
            console.error("Error saving branch:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary-navy)" }}>Map Locations</h1>
                <button
                    onClick={() => {
                        setEditingBranch(null);
                        setFormData({ name: "", address: "", googleMapsUrl: "", phone: "", email: "", order: 0, isActive: true });
                        setShowModal(true);
                    }}
                    style={{ backgroundColor: "var(--primary-green)", color: "white", padding: "0.75rem 1.5rem", borderRadius: "8px", fontWeight: "bold", border: "none", cursor: "pointer" }}
                >
                    + Add New Location
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "1.5rem" }}>
                {branches.map(branch => (
                    <div key={branch.id} style={{ backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e5e7eb" }}>
                        <div style={{ height: "150px", backgroundColor: "#f3f4f6", borderBottom: "1px solid #e5e7eb" }}>
                            <iframe
                                src={branch.googleMapsUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <div style={{ padding: "1.5rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                                <div>
                                    <h3 style={{ fontWeight: "bold", fontSize: "1.2rem", color: "var(--primary-navy)" }}>{branch.name}</h3>
                                    <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "0.25rem" }}>{branch.address}</p>
                                </div>
                                <span style={{ fontSize: "0.8rem", backgroundColor: branch.isActive ? "#dcfce7" : "#fee2e2", color: branch.isActive ? "#166534" : "#991b1b", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>
                                    {branch.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            {(branch.phone || branch.email) && (
                                <div style={{ fontSize: "0.9rem", color: "#4b5563", marginBottom: "1.5rem" }}>
                                    {branch.phone && <div>📞 {branch.phone}</div>}
                                    {branch.email && <div>✉️ {branch.email}</div>}
                                </div>
                            )}

                            <div style={{ display: "flex", gap: "0.5rem", paddingTop: "1rem", borderTop: "1px solid #f3f4f6" }}>
                                <button onClick={() => handleEdit(branch)} style={{ flex: 1, padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "6px", backgroundColor: "white", cursor: "pointer" }}>Edit Location</button>
                                <button onClick={() => handleDelete(branch.id)} style={{ padding: "0.5rem 1rem", border: "1px solid #fee2e2", borderRadius: "6px", backgroundColor: "#fef2f2", color: "#ef4444", cursor: "pointer" }}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
                {branches.length === 0 && <div style={{ textAlign: "center", padding: "3rem", color: "gray", gridColumn: "1 / -1" }}>No locations found.</div>}
            </div>

            {showModal && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
                    <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", width: "90%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" }}>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>{editingBranch ? "Edit Location" : "New Location"}</h2>
                        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                            <div>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Branch/Location Name</label>
                                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} required />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Address</label>
                                <textarea value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", minHeight: "80px" }} required />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Google Maps Embed URL</label>
                                <p style={{ fontSize: "0.8rem", color: "#6b7280", marginBottom: "0.5rem" }}>Go to Google Maps &rarr; Share &rarr; Embed a map &rarr; Copy HTML. Extract JUST the "src" URL.</p>
                                <input type="url" value={formData.googleMapsUrl} onChange={e => setFormData({ ...formData, googleMapsUrl: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} required placeholder="https://www.google.com/maps/embed?..." />
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <div>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Phone (Optional)</label>
                                    <input type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} />
                                </div>
                                <div>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Email (Optional)</label>
                                    <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} />
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
