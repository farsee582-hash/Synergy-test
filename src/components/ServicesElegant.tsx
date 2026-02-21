"use client";

import Link from "next/link";
import React from "react";

interface ServicesElegantProps {
    services: any[];
}

export default function ServicesElegant({ services }: ServicesElegantProps) {
    return (
        <section style={{ padding: "6rem 0", backgroundColor: "#f8f9fa" }}>
            <div className="container">
                {/* Header - Side by Side Layout */}
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: "2rem",
                    marginBottom: "4rem"
                }}>
                    <div style={{ maxWidth: "500px" }}>
                        <span style={{
                            color: "var(--primary-green)",
                            fontWeight: "700",
                            letterSpacing: "0.05em",
                            fontSize: "1rem",
                            marginBottom: "0.5rem",
                            display: "block"
                        }}>
                            Our Services
                        </span>
                        <h2 style={{
                            fontSize: "3.5rem",
                            fontWeight: "800",
                            color: "var(--primary-navy)",
                            lineHeight: "1.1",
                            margin: 0
                        }}>
                            What we do
                        </h2>
                    </div>
                    <div style={{ maxWidth: "600px" }}>
                        <p style={{
                            color: "var(--text-color)",
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            margin: 0,
                            fontWeight: "500"
                        }}>
                            At Synergy Hub, we make banking and business compliance simple so you can focus on growing your company. Whether you need help setting up a bank account or managing your business finances, we're here to make every process seamless, compliant, and stress free.
                        </p>
                    </div>
                </div>

                {/* 4-Column Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1.5rem"
                }}>
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="service-card"
                            style={{
                                backgroundColor: "white",
                                padding: "2.5rem 2rem",
                                borderRadius: "12px",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                                transition: "all 0.3s ease",
                                display: "flex",
                                flexDirection: "column",
                                position: "relative",
                                overflow: "hidden",
                                border: "1px solid #f1f5f9",
                                height: "100%"
                            }}
                        >
                            {/* Title */}
                            <h3 className="service-title" style={{
                                fontSize: "1.25rem",
                                fontWeight: "700",
                                color: "var(--primary-navy)",
                                marginBottom: "1rem",
                                lineHeight: "1.4",
                                transition: "color 0.3s ease"
                            }}>
                                {service.title}
                            </h3>

                            {/* Description (Truncated) */}
                            <p className="service-desc" style={{
                                color: "#64748b",
                                fontSize: "0.95rem",
                                lineHeight: "1.6",
                                marginBottom: "2rem",
                                flex: 1,
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                transition: "color 0.3s ease"
                            }}>
                                {service.description}
                            </p>

                            {/* Read More Link */}
                            <Link href={service.link || "/book"} className="read-more" style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                color: "var(--primary-green)",
                                fontWeight: "600",
                                fontSize: "0.9rem",
                                textDecoration: "none",
                                marginTop: "auto",
                                transition: "all 0.3s ease"
                            }}>
                                Read More
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Hover Effects: Blue Gradient & White Text */}
                <style jsx>{`
            @media (min-width: 1280px) {
                div[style*="gridTemplateColumns"] {
                    grid-template-columns: repeat(4, 1fr) !important;
                }
            }
            
            .service-card:hover {
                background: linear-gradient(135deg, var(--primary-navy) 0%, #1e3a8a 100%) !important;
                transform: translateY(-5px);
                box-shadow: 0 20px 25px -5px rgba(15, 33, 56, 0.2) !important;
                border-color: transparent !important;
            }
            
            .service-card:hover .service-title {
                color: white !important;
            }
            
            .service-card:hover .service-desc {
                color: rgba(255, 255, 255, 0.8) !important;
            }
            
            .service-card:hover .read-more {
                color: var(--primary-green) !important; /* Keep green for contrast or switch to white? User asked for blue gradient brand. Green button/text usually pops on navy. */
                background-color: rgba(255,255,255,0.1);
                padding: 0.5rem 1rem;
                border-radius: 4px;
                margin-left: -1rem; /* Offset padding */
                width: fit-content;
            }
        `}</style>
            </div>
        </section >
    );
}
