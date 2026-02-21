"use client";

import React, { useState, useEffect } from "react";

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    order: number;
    isActive: boolean;
}

export default function FAQAdminPage() {
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);

    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        order: 0,
        isActive: true
    });

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/faq");
            const data = await res.json();
            setFaqs(data);
        } catch (error) {
            console.error("Error fetching FAQs:", error);
        }
        setLoading(false);
    };

    const handleEdit = (faq: FAQItem) => {
        setEditingFAQ(faq);
        setFormData({
            question: faq.question,
            answer: faq.answer,
            order: faq.order,
            isActive: faq.isActive
        });
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this FAQ?")) return;
        try {
            const res = await fetch(`/api/faq/${id}`, { method: "DELETE" });
            if (res.ok) fetchFAQs();
        } catch (error) {
            console.error("Error deleting FAQ:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const apiEndpoint = editingFAQ ? `/api/faq/${editingFAQ.id}` : "/api/faq";
        const method = editingFAQ ? "PUT" : "POST";

        try {
            const res = await fetch(apiEndpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowModal(false);
                setEditingFAQ(null);
                setFormData({ question: "", answer: "", order: 0, isActive: true });
                fetchFAQs();
            }
        } catch (error) {
            console.error("Error saving FAQ:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary-navy)" }}>FAQ Management</h1>
                <button
                    onClick={() => {
                        setEditingFAQ(null);
                        setFormData({ question: "", answer: "", order: 0, isActive: true });
                        setShowModal(true);
                    }}
                    style={{ backgroundColor: "var(--primary-green)", color: "white", padding: "0.75rem 1.5rem", borderRadius: "8px", fontWeight: "bold", border: "none", cursor: "pointer" }}
                >
                    + Add New FAQ
                </button>
            </div>

            <div style={{ display: "grid", gap: "1rem" }}>
                {faqs.map(faq => (
                    <div key={faq.id} style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", borderLeft: faq.isActive ? "4px solid var(--primary-green)" : "4px solid #d1d5db" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                            <div>
                                <h3 style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--primary-navy)" }}>{faq.question}</h3>
                                <p style={{ color: "#4b5563", lineHeight: "1.6" }}>{faq.answer}</p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end", minWidth: "120px" }}>
                                <span style={{ fontSize: "0.8rem", backgroundColor: faq.isActive ? "#dcfce7" : "#fee2e2", color: faq.isActive ? "#166534" : "#991b1b", padding: "0.25rem 0.5rem", borderRadius: "4px", marginBottom: "0.5rem" }}>
                                    {faq.isActive ? "Active" : "Inactive"}
                                </span>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <button onClick={() => handleEdit(faq)} style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db", borderRadius: "6px", backgroundColor: "white", cursor: "pointer", fontSize: "0.9rem" }}>Edit</button>
                                    <button onClick={() => handleDelete(faq.id)} style={{ padding: "0.5rem 1rem", border: "1px solid #fee2e2", borderRadius: "6px", backgroundColor: "#fef2f2", color: "#ef4444", cursor: "pointer", fontSize: "0.9rem" }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {faqs.length === 0 && <div style={{ textAlign: "center", padding: "3rem", color: "gray" }}>No FAQs found.</div>}
            </div>

            {showModal && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
                    <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", width: "90%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" }}>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>{editingFAQ ? "Edit FAQ" : "New FAQ"}</h2>
                        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                            <div>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Question</label>
                                <input type="text" value={formData.question} onChange={e => setFormData({ ...formData, question: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} required />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Answer</label>
                                <textarea value={formData.answer} onChange={e => setFormData({ ...formData, answer: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", minHeight: "150px" }} required />
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
