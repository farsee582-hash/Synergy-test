"use client";

import React from "react";

export default function PartnersGrid({ partners }: { partners: any[] }) {
    if (!partners || partners.length === 0) {
        return <p style={{ color: "#6b7280" }}>No partner logos uploaded yet.</p>;
    }

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "2rem",
        }}>
            {partners.map((partner) => (
                <div
                    key={partner.id}
                    style={{
                        padding: "0",
                        border: "1px solid #f3f4f6",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        aspectRatio: "1 / 1",
                        transition: "all 0.3s ease",
                        backgroundColor: "#f9fafb",
                        cursor: "pointer",
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)";
                        e.currentTarget.style.borderColor = "var(--primary-green)";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = "#f3f4f6";
                    }}
                >
                    <div style={{ position: "relative", width: "100%", height: "100%", padding: "1.5rem" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={partner.logoUrl?.startsWith('/') ? partner.logoUrl : `/${partner.logoUrl}`}
                            alt={partner.name || "Partner Logo"}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                filter: "grayscale(100%)",
                                opacity: 0.7,
                                transition: "all 0.3s ease",
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.filter = "grayscale(0%)";
                                e.currentTarget.style.opacity = "1";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.filter = "grayscale(100%)";
                                e.currentTarget.style.opacity = "0.7";
                            }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
