"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Partner {
    id: string;
    name: string;
    logoUrl: string;
    order: number;
}

export default function PartnersAdminPage() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/partners");
            const data = await res.json();
            setPartners(data);
        } catch (error) {
            console.error("Error fetching partners:", error);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this partner?")) return;
        try {
            const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
            if (res.ok) fetchPartners();
        } catch (error) {
            console.error("Error deleting partner:", error);
        }
    };

    const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const newPartners = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uploadData = new FormData();
            uploadData.append("file", file);

            try {
                // 1. Upload Image
                const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
                const uploadJson = await uploadRes.json();

                if (uploadJson.url) {
                    // 2. Create Partner Record
                    // Use filename (without extension) as default name
                    const name = file.name.replace(/\.[^/.]+$/, "");
                    newPartners.push({ name, logoUrl: uploadJson.url, order: partners.length + i });
                }
            } catch (error) {
                console.error(`Failed to upload ${file.name}`, error);
            }
        }

        if (newPartners.length > 0) {
            try {
                await fetch("/api/partners", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newPartners)
                });
                fetchPartners();
            } catch (error) {
                console.error("Failed to save partners", error);
            }
        }

        setUploading(false);
        // Reset file input
        e.target.value = "";
    };

    if (loading && partners.length === 0) return <div>Loading...</div>;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary-navy)" }}>Partners (Banks)</h1>
                <div>
                    <label
                        style={{
                            backgroundColor: uploading ? "#9ca3af" : "var(--primary-green)",
                            color: "white",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            cursor: uploading ? "not-allowed" : "pointer",
                            display: "inline-block"
                        }}
                    >
                        {uploading ? "Uploading..." : "+ Bulk Upload Logos"}
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleBulkUpload}
                            style={{ display: "none" }}
                            disabled={uploading}
                        />
                    </label>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
                {partners.map(partner => (
                    <div key={partner.id} style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ width: "100%", height: "100px", position: "relative", marginBottom: "1rem", borderRadius: "8px", border: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Image src={partner.logoUrl} alt={partner.name} fill style={{ objectFit: "contain", padding: "10px" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                        </div>
                        <h3 style={{ fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", textAlign: "center" }}>{partner.name}</h3>
                        <button
                            onClick={() => handleDelete(partner.id)}
                            style={{ width: "100%", padding: "0.5rem", border: "1px solid #fee2e2", borderRadius: "6px", backgroundColor: "#fef2f2", color: "#ef4444", cursor: "pointer", fontSize: "0.9rem" }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {partners.length === 0 && !loading && (
                <div style={{ textAlign: "center", padding: "4rem", color: "gray" }}>
                    No partners found. Upload logos to get started.
                </div>
            )}
        </div>
    );
}
