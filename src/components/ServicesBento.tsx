"use client";

import Link from "next/link";
import React from "react";

interface ServicesBentoProps {
    services: any[];
}

export default function ServicesBento({ services }: ServicesBentoProps) {
    return (
        <section style={{ padding: "6rem 0", backgroundColor: "white" }}>
            <div className="container">
                {/* Header Section */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", gap: "2rem" }}>
                    <div style={{ maxWidth: "500px" }}>
                        <span style={{ color: "var(--primary-green)", fontWeight: "700", letterSpacing: "0.05em", fontSize: "0.9rem", display: "block", marginBottom: "0.5rem" }}>
                            Our Services
                        </span>
                        <h2 style={{ fontSize: "3.5rem", fontWeight: "800", color: "var(--primary-navy)", lineHeight: "1.1", margin: 0 }}>
                            What we do
                        </h2>
                    </div>
                    <div style={{ maxWidth: "600px" }}>
                        <p style={{ color: "#64748b", fontSize: "1rem", lineHeight: "1.6", margin: 0 }}>
                            At Synergy Hub, we make banking and business compliance simple so you can focus on growing your company. Whether you need help setting up a bank account or managing your business finances, we're here to make every process seamless, compliant, and stress free.
                        </p>
                    </div>
                </div>

                {/* Bento Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    borderTop: "1px solid #e2e8f0",
                    borderLeft: "1px solid #e2e8f0"
                }}>
                    {services.map((service, index) => {
                        // Logic for layout: First 2 items span 3 cols (half width), others span 2 cols (third width)
                        const isTopRow = index < 2;
                        const colSpan = isTopRow ? "span 3" : "span 2";

                        // Mobile fallback: everyone spans full width (6) or half (3)
                        // We'll handle this with inline styles and media queries/responsiveness in mind. 
                        // Since we can't easily write media queries in inline styles, we'll assume desktop first and add a style block.

                        return (
                            <div
                                key={service.id}
                                className={`service-item ${isTopRow ? 'top-row' : ''}`}
                                style={{
                                    gridColumn: colSpan,
                                    borderRight: "1px solid #e2e8f0",
                                    borderBottom: "1px solid #e2e8f0",
                                    padding: "3rem 2rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center", // Center horizontally
                                    justifyContent: "center", // Center vertically
                                    textAlign: "center",
                                    minHeight: "250px",
                                    backgroundColor: "white",
                                    transition: "all 0.3s ease",
                                    position: "relative"
                                }}
                            >
                                {/* Icon */}
                                <div style={{
                                    fontSize: "2.5rem",
                                    marginBottom: "1rem",
                                    color: "#64748b", // Default gray icon
                                    transition: "color 0.3s"
                                }}>
                                    {service.icon ? (
                                        <img src={service.icon} alt={service.title} style={{ width: "48px", height: "48px", objectFit: "contain" }} />
                                    ) : (
                                        // Fallback icons based on keywords if no icon provided
                                        <span>
                                            {service.title.toLowerCase().includes("bank") ? "🏦" :
                                                service.title.toLowerCase().includes("tax") ? "📊" :
                                                    service.title.toLowerCase().includes("account") ? "📒" : "💼"}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 style={{
                                    fontSize: "1.25rem",
                                    fontWeight: "700",
                                    color: "var(--primary-navy)",
                                    maxWidth: "80%"
                                }}>
                                    {service.title}
                                </h3>

                                {/* Hover link overlay (optional, keeping it simple as per image) */}
                                <Link href={service.link || "/book"} style={{ position: "absolute", inset: 0, zIndex: 1 }} aria-label={`View ${service.title}`} />
                            </div>
                        );
                    })}
                </div>

                {/* CSS for responsiveness */}
                <style jsx>{`
            @media (max-width: 1024px) {
                .service-item {
                    grid-column: span 3 !important; /* 2 columns on tablet */
                }
            }
            @media (max-width: 640px) {
                .service-item {
                    grid-column: span 6 !important; /* 1 column on mobile */
                }
            }
            .service-item:hover {
                background-color: #f8fafc !important;
            }
            .service-item:hover h3 {
                color: var(--primary-green) !important;
            }
        `}</style>
            </div>
        </section>
    );
}
