"use client";

import React from "react";

interface BranchType {
    id: string;
    name: string;
    address: string;
    googleMapsUrl: string;
}

interface MapSectionProps {
    branches?: BranchType[];
}

export default function MapSection({ branches = [] }: MapSectionProps) {
    if (!branches || branches.length === 0) return null;

    return (
        <section style={{ padding: "4rem 0", backgroundColor: "white" }}>
            <div className="container">
                <h2 style={{
                    fontSize: "2.5rem",
                    fontWeight: "800",
                    color: "var(--primary-navy)",
                    marginBottom: "3rem",
                    textAlign: "center"
                }}>
                    Visit Our Offices
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
                    {branches.map((branch) => (
                        <div key={branch.id} className="branch-card" style={{ position: "relative", height: "400px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 30px -5px rgba(0,0,0,0.1)" }}>
                            <iframe
                                src={branch.googleMapsUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            <div style={{
                                position: "absolute",
                                bottom: "20px",
                                left: "20px",
                                right: "20px",
                                backgroundColor: "white",
                                padding: "1.5rem",
                                borderRadius: "12px",
                                boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
                            }}>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--primary-navy)", marginBottom: "0.5rem" }}>
                                    {branch.name}
                                </h3>
                                <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "0.25rem", whiteSpace: "pre-line" }}>
                                    📍 {branch.address}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
