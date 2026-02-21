"use client";

import Link from "next/link";
import { useState } from "react";

interface ServiceCardProps {
    service: {
        id: string;
        title: string;
        icon?: string | null;
        description: string;
        link?: string | null;
    };
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                position: "relative",
                backgroundColor: isHovered ? "var(--primary-navy)" : "#f8fafc", // Navy on hover for contrast
                color: isHovered ? "white" : "var(--primary-navy)",
                padding: "3rem 2rem",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                transition: "all 0.4s ease",
                minHeight: "280px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: isHovered
                    ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    : "none",
                border: "1px solid #f1f5f9"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Icon Container */}
            <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: isHovered ? "rgba(255,255,255,0.1)" : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: isHovered ? "1rem" : "1.5rem",
                transition: "all 0.4s ease",
                transform: isHovered ? "scale(0.9)" : "scale(1)",
                border: isHovered ? "1px solid rgba(255,255,255,0.2)" : "1px solid #e2e8f0"
            }}>
                {service.icon ? (
                    <img
                        src={service.icon}
                        alt={service.title}
                        style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "contain",
                            filter: isHovered ? "brightness(0) invert(1)" : "none" // Make white on hover
                        }}
                    />
                ) : (
                    <span style={{ fontSize: "2rem" }}>💼</span>
                )}
            </div>

            {/* Title */}
            <h3 style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                marginBottom: isHovered ? "1rem" : "0",
                transition: "all 0.3s ease",
            }}>
                {service.title}
            </h3>

            {/* Description (Hidden by default, revealed on hover) */}
            <div style={{
                maxHeight: isHovered ? "200px" : "0",
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                overflow: "hidden"
            }}>
                <p style={{
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    color: "rgba(255,255,255,0.8)",
                    marginBottom: "1.5rem"
                }}>
                    {service.description}
                </p>

                <Link
                    href={service.link || "/book"}
                    style={{
                        display: "inline-block",
                        color: "var(--primary-green)",
                        fontWeight: "600",
                        textDecoration: "none",
                        borderBottom: "1px solid var(--primary-green)",
                        paddingBottom: "2px"
                    }}
                >
                    Learn More &rarr;
                </Link>
            </div>
        </div>
    );
}
