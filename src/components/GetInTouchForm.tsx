"use client";

import React from "react";

export default function GetInTouchForm({ title = "Get In Touch With Us" }: { title?: string }) {
    return (
        <div style={{ backgroundColor: "white", padding: "2.5rem", borderRadius: "16px", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)", border: "1px solid #f1f5f9" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#1e293b", marginBottom: "1.5rem" }}>
                {title}
            </h2>
            <form action="/api/contact" method="POST" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        required
                        style={{ width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", fontSize: "1rem" }}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        required
                        style={{ width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", fontSize: "1rem" }}
                    />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        required
                        style={{ width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", fontSize: "1rem" }}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        required
                        style={{ width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", fontSize: "1rem" }}
                    />
                </div>

                <div>
                    <textarea
                        name="message"
                        rows={5}
                        placeholder="How can we help you? *"
                        required
                        style={{ width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", fontSize: "1rem", resize: "vertical" }}
                    ></textarea>
                </div>

                <div style={{ marginTop: "0.5rem" }}>
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            width: "100%",
                            backgroundColor: "var(--primary-green)",
                            color: "white",
                            padding: "1rem",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "1.1rem",
                            boxShadow: "0 4px 6px -1px rgba(76, 175, 80, 0.2)",
                            transition: "all 0.2s ease"
                        }}
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
}
