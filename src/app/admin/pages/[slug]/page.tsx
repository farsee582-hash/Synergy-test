"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { SITE_PAGES } from "@/lib/site-config";
// Note: We need client-side fetching or server action. 
// For simplicity in this step, I'll use a simple fetch to a new API endpoint.

export default function PageEditor() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const pageConfig = SITE_PAGES[slug as keyof typeof SITE_PAGES];

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!pageConfig) return;

        // Fetch current content
        fetch(`/api/content?section=${pageConfig.section}`)
            .then(res => res.json())
            .then(data => {
                const initialData: Record<string, string> = {};
                // Pre-fill with defaults
                pageConfig.fields.forEach(field => {
                    initialData[field.key] = field.default;
                });
                // Override with DB data
                data.forEach((item: any) => {
                    initialData[item.key] = item.content;
                });
                setFormData(initialData);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [slug, pageConfig]);

    if (!pageConfig) {
        return <div>Page not found</div>;
    }

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage("");

        try {
            const res = await fetch("/api/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    section: pageConfig.section,
                    data: formData
                })
            });

            if (res.ok) {
                setMessage("Saved successfully!");
                router.refresh();
            } else {
                setMessage("Error saving.");
            }
        } catch (e) {
            setMessage("Error saving.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: "800px" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", color: "#1f2937" }}>
                Edit {pageConfig.title}
            </h1>

            {message && (
                <div style={{
                    padding: "1rem",
                    backgroundColor: message.includes("Error") ? "#fee2e2" : "#dcfce7",
                    color: message.includes("Error") ? "#991b1b" : "#166534",
                    borderRadius: "8px",
                    marginBottom: "2rem"
                }}>
                    {message}
                </div>
            )}

            <div style={{ display: "grid", gap: "2rem", backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                {pageConfig.fields.map(field => (
                    <div key={field.key} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontWeight: "600", color: "#374151" }}>{field.label}</label>

                        {field.type === "textarea" ? (
                            <textarea
                                value={formData[field.key] || ""}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                style={{
                                    padding: "0.75rem",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    minHeight: "100px",
                                    fontFamily: "inherit"
                                }}
                            />
                        ) : field.type === "image" ? (
                            <div>
                                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.5rem" }}>
                                    {formData[field.key] && (
                                        <div style={{ width: "100px", height: "60px", background: "#f3f4f6", borderRadius: "4px", overflow: "hidden" }}>
                                            <img src={formData[field.key]} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            const uploadFormData = new FormData();
                                            uploadFormData.append("file", file);

                                            try {
                                                const res = await fetch("/api/upload", {
                                                    method: "POST",
                                                    body: uploadFormData
                                                });
                                                if (res.ok) {
                                                    const data = await res.json();
                                                    handleChange(field.key, data.url);
                                                } else {
                                                    alert("Upload failed");
                                                }
                                            } catch (err) {
                                                console.error(err);
                                                alert("Upload error");
                                            }
                                        }}
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Or enter image URL..."
                                    value={formData[field.key] || ""}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem",
                                        border: "1px solid #d1d5db",
                                        borderRadius: "6px",
                                        fontSize: "0.9rem"
                                    }}
                                />
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={formData[field.key] || ""}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                style={{
                                    padding: "0.75rem",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px"
                                }}
                            />
                        )}
                        <p style={{ fontSize: "0.85rem", color: "#9ca3af" }}>Key: {field.key}</p>
                    </div>
                ))}

                <div style={{ paddingTop: "1rem", borderTop: "1px solid #e5e7eb" }}>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        style={{
                            backgroundColor: "#051b35",
                            color: "white",
                            padding: "0.75rem 2rem",
                            borderRadius: "6px",
                            fontWeight: "600",
                            border: "none",
                            cursor: saving ? "not-allowed" : "pointer",
                            opacity: saving ? 0.7 : 1
                        }}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}
