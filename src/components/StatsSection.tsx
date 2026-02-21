"use client";

import React from "react";

const stats = [
    { label: "Years of Experience", value: "15+" },
    { label: "Happy Clients", value: "2000+" },
    { label: "Banks Working With", value: "18+" },
    { label: "Successful Projects", value: "3000+" },
];

export default function StatsSection() {
    return (
        <section style={{
            marginTop: "-4rem", // Overlap the hero section slightly for a modern look
            position: "relative",
            zIndex: 10,
            padding: "0 1rem",
            marginBottom: "4rem"
        }}>
            <div className="container" style={{
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                padding: "3rem 2rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "2rem",
                alignItems: "center"
            }}>
                {stats.map((stat, index) => (
                    <div key={index} style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        position: "relative"
                    }}>
                        <span style={{
                            fontSize: "3rem",
                            fontWeight: "800",
                            color: "var(--primary-green)",
                            lineHeight: "1",
                            marginBottom: "0.5rem"
                        }}>
                            {stat.value}
                        </span>
                        <span style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "var(--primary-navy)",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em"
                        }}>
                            {stat.label}
                        </span>

                        {/* Divider for desktop - hidden on last item and mobile (via CSS if needed, doing simple logic here) */}
                        {index !== stats.length - 1 && (
                            <div className="divider" style={{
                                position: "absolute",
                                right: "-1rem",
                                top: "10%",
                                height: "80%",
                                width: "1px",
                                backgroundColor: "#e2e8f0",
                                display: "none" // We'll enable this via media query logic in style tag below
                            }}></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Inline responsive styles for the divider and grid */}
            <style jsx>{`
        @media (min-width: 1024px) {
            .divider {
                display: block !important;
            }
        }
      `}</style>
        </section>
    );
}
