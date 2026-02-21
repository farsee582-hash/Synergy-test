"use client";

import React from "react";

interface PageHeroProps {
    title: string;
    description?: string;
    backgroundImage?: string;
    children?: React.ReactNode;
}

export default function PageHero({ title, description, backgroundImage, children }: PageHeroProps) {
    return (
        <section style={{
            backgroundColor: "#051b35", // Deep Navy
            color: "white",
            padding: "5rem 0",
            position: "relative",
            overflow: "hidden",
            textAlign: "center"
        }}>
            {/* Optional Background Image Overlay */}
            {backgroundImage && (
                <div style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.2, // Subtle overlay
                    zIndex: 1
                }}></div>
            )}

            <div className="container" style={{ position: "relative", zIndex: 2 }}>
                <h1 style={{
                    fontSize: "3rem",
                    fontWeight: "800",
                    marginBottom: description ? "1.5rem" : "0",
                    lineHeight: "1.2"
                }}>
                    {title}
                </h1>

                {description && (
                    <p style={{
                        fontSize: "1.2rem",
                        opacity: 0.9,
                        maxWidth: "700px",
                        margin: "0 auto",
                        lineHeight: "1.6"
                    }}>
                        {description}
                    </p>
                )}

                {children && (
                    <div style={{ marginTop: "2rem" }}>
                        {children}
                    </div>
                )}
            </div>
        </section>
    );
}
