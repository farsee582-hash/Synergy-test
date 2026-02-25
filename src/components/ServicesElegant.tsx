"use client";

import Link from "next/link";
import React from "react";

interface ServicesElegantProps {
    bankingServices: any[];
    taxServices: any[];
}

export default function ServicesElegant({ bankingServices, taxServices }: ServicesElegantProps) {
    return (
        <section style={{ padding: "8rem 0", backgroundColor: "#fafbfc" }}>
            <div className="container">
                {/* Header - Centered Minimalist Layout */}
                <div style={{
                    textAlign: "center",
                    maxWidth: "800px",
                    margin: "0 auto 5rem",
                }}>
                    <span style={{
                        color: "var(--primary-green)",
                        fontWeight: "600",
                        letterSpacing: "0.1em",
                        fontSize: "0.85rem",
                        textTransform: "uppercase",
                        marginBottom: "1rem",
                        display: "block"
                    }}>
                        Comprehensive Solutions
                    </span>
                    <h2 style={{
                        fontSize: "3rem",
                        fontWeight: "700",
                        color: "var(--primary-navy)",
                        lineHeight: "1.2",
                        marginBottom: "1.5rem"
                    }}>
                        Our Services
                    </h2>
                    <p style={{
                        color: "#6b7280",
                        fontSize: "1.1rem",
                        lineHeight: "1.7",
                        fontWeight: "400"
                    }}>
                        At Synergy Hub, we simplify corporate setup and financial compliance. From business banking to advanced tax consultancy, we provide end-to-end solutions tailored for your success.
                    </p>
                </div>

                {/* Banking Services Section */}
                <div style={{ marginBottom: "6rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
                        <h3 style={{
                            fontSize: "1.75rem",
                            fontWeight: "600",
                            color: "var(--primary-navy)",
                            margin: 0
                        }}>
                            Banking Accounts & Solutions
                        </h3>
                        <div style={{ height: "1px", flex: 1, backgroundColor: "#e2e8f0" }}></div>
                    </div>

                    <div className="services-grid">
                        {bankingServices.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </div>

                {/* Accounting and Tax Section */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
                        <h3 style={{
                            fontSize: "1.75rem",
                            fontWeight: "600",
                            color: "var(--primary-navy)",
                            margin: 0
                        }}>
                            Accounting & Tax Consultancy
                        </h3>
                        <div style={{ height: "1px", flex: 1, backgroundColor: "#e2e8f0" }}></div>
                    </div>

                    <div className="services-grid">
                        {taxServices.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </div>

                <style jsx>{`
            .services-grid {
                display: grid;
                grid-template-columns: repeat(1, 1fr);
                gap: 2rem;
            }
            
            @media (min-width: 768px) {
                .services-grid {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2.5rem;
                }
            }
            
            @media (min-width: 1024px) {
                .services-grid {
                    grid-template-columns: repeat(3, 1fr);
                    gap: 3rem;
                }
            }
            
            :global(.service-card-minimal) {
                background-color: white;
                padding: 3rem 2.5rem;
                border-radius: 16px;
                border: 1px solid #f1f5f9;
                transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                display: flex;
                flex-direction: column;
                height: 100%;
                position: relative;
            }
            
            :global(.service-card-minimal::after) {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background-color: var(--primary-green);
                transform: scaleX(0);
                transform-origin: left center;
                transition: transform 0.4s ease;
                border-bottom-left-radius: 16px;
                border-bottom-right-radius: 16px;
            }
            
            :global(.service-card-minimal:hover) {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08);
                border-color: transparent;
            }
            
            :global(.service-card-minimal:hover::after) {
                transform: scaleX(1);
            }
            
            :global(.service-card-minimal .icon-wrapper) {
                width: 48px;
                height: 48px;
                border-radius: 12px;
                background-color: rgba(30, 201, 151, 0.1); /* Primary green low opacity */
                color: var(--primary-green);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 2rem;
                transition: all 0.4s ease;
            }
            
            :global(.service-card-minimal:hover .icon-wrapper) {
                background-color: var(--primary-green);
                color: white;
            }
            
            :global(.service-link) {
                margin-top: auto;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--primary-navy);
                font-weight: 600;
                font-size: 0.95rem;
                text-decoration: none;
                transition: color 0.3s ease;
            }
            
            :global(.service-link svg) {
                transition: transform 0.3s ease;
            }
            
            :global(.service-card-minimal:hover .service-link) {
                color: var(--primary-green);
            }
            
            :global(.service-card-minimal:hover .service-link svg) {
                transform: translateX(4px);
            }
        `}</style>
            </div>
        </section >
    );
}

// Extracted card component for reuse
function ServiceCard({ service }: { service: any }) {
    return (
        <div className="service-card-minimal">
            <div className="icon-wrapper">
                {/* Generic subtle icon, can be dynamic later */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
            </div>

            <h3 style={{
                fontSize: "1.35rem",
                fontWeight: "700",
                color: "var(--primary-navy)",
                marginBottom: "1rem",
                lineHeight: "1.4",
                letterSpacing: "-0.01em"
            }}>
                {service.title}
            </h3>

            <p style={{
                color: "#64748b",
                fontSize: "1rem",
                lineHeight: "1.6",
                marginBottom: "2.5rem",
                flex: 1,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
            }}>
                {service.description}
            </p>

            <Link href={service.link || "/book"} className="service-link">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </Link>
        </div>
    );
}
