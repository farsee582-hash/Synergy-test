"use client";

import { useState, useEffect } from "react";

interface Message {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    service: string | null;
    createdAt: string;
}

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/messages");
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;
        try {
            await fetch(`/api/messages/${id}`, { method: "DELETE" });
            fetchMessages();
        } catch (error) {
            console.error("Failed to delete message", error);
        }
    };

    if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;

    return (
        <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Contact Messages</h1>

            {messages.length === 0 ? (
                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "8px", textAlign: "center", color: "#6b7280" }}>
                    No messages received yet.
                </div>
            ) : (
                <div style={{ display: "grid", gap: "1rem" }}>
                    {messages.map((msg) => (
                        <div key={msg.id} style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                                <div>
                                    <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: "0 0 0.5rem 0" }}>{msg.name}</h3>
                                    <div style={{ display: "flex", gap: "1rem", color: "#6b7280", fontSize: "0.9rem" }}>
                                        <a href={`mailto:${msg.email}`} style={{ color: "var(--primary-navy)", textDecoration: "none" }}>{msg.email}</a>
                                        {msg.phone && (
                                            <a href={`tel:${msg.phone}`} style={{ color: "var(--primary-navy)", textDecoration: "none" }}>{msg.phone}</a>
                                        )}
                                    </div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <span style={{ fontSize: "0.85rem", color: "#9ca3af", display: "block", marginBottom: "0.5rem" }}>
                                        {new Date(msg.createdAt).toLocaleString()}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        style={{ backgroundColor: "#ef4444", color: "white", padding: "0.25rem 0.75rem", borderRadius: "4px", border: "none", cursor: "pointer", fontSize: "0.85rem" }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {msg.service && (
                                <div style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
                                    <strong>Interested in:</strong> <span style={{ backgroundColor: "#f3f4f6", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{msg.service}</span>
                                </div>
                            )}

                            <div style={{ backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "6px", whiteSpace: "pre-wrap", color: "#374151" }}>
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
