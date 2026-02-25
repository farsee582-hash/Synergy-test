"use client";

import Link from "next/link";
import React from "react";

interface ServicesElegantProps {
    bankingServices: any[];
    taxServices: any[];
}

export default function ServicesElegant({ bankingServices, taxServices }: ServicesElegantProps) {
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

                {/* Banking Services Section */}
                <div style={{ marginBottom: "5rem" }}>
                    <h3 style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        color: "var(--primary-navy)",
                        marginBottom: "2rem",
                        borderBottom: "2px solid var(--primary-green)",
                        paddingBottom: "0.5rem",
                        display: "inline-block"
                    }}>
                        Banking Services
                    </h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "1.5rem"
                    }}>
                        {bankingServices.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </div>

                {/* Accounting and Tax Section */}
                <div>
                    <h3 style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        color: "var(--primary-navy)",
                        marginBottom: "2rem",
                        borderBottom: "2px solid var(--primary-green)",
                        paddingBottom: "0.5rem",
                        display: "inline-block"
                    }}>
                        Accounting & Tax Consultancy
                    </h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "1.5rem"
                    }}>
                        {taxServices.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </div>

                {/* Hover Effects: Blue Gradient & White Text */}
                <style jsx>{`
            @media (min-width: 1280px) {
                div[style*="gridTemplateColumns"] {
                    grid-template-columns: repeat(4, 1fr) !important;
                }
            }
            
            :global(.service-card:hover) {
                background: linear-gradient(135deg, var(--primary-navy) 0%, #1e3a8a 100%) !important;
                transform: translateY(-5px);
                box-shadow: 0 20px 25px -5px rgba(15, 33, 56, 0.2) !important;
                border-color: transparent !important;
            }
            
            :global(.service-card:hover .service-title) {
                color: white !important;
            }
            
            :global(.service-card:hover .service-desc) {
                color: rgba(255, 255, 255, 0.8) !important;
            }
            
            :global(.service-card:hover .read-more) {
                color: var(--primary-green) !important;
                background-color: rgba(255,255,255,0.1);
                padding: 0.5rem 1rem;
                border-radius: 4px;
                margin-left: -1rem;
                width: fit-content;
            }
        `}</style>
            </div>
        </section >
    );
}

// Extracted card component for reuse
function ServiceCard({ service }: { service: any }) {
    return (
        <div
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
    );
}
