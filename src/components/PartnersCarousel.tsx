"use client";

import React from "react";

interface Partner {
    id: string;
    name: string;
    logoUrl: string;
}

interface PartnersCarouselProps {
    partners: Partner[];
}

export default function PartnersCarousel({ partners }: PartnersCarouselProps) {
    // Multiply partners to ensure seamless scrolling if there are few items
    // We want at least enough items to fill the screen width twice for the loop
    const displayPartners = partners.length > 0
        ? [...partners, ...partners, ...partners, ...partners] // Repeat 4 times to be safe
        : [];

    if (partners.length === 0) {
        return (
            <div className="text-center text-gray-400 py-8">
                <p>No banking partners added yet.</p>
            </div>
        );
    }

    return (
        <section style={{ padding: "5rem 0", backgroundColor: "white", overflow: "hidden" }}>
            <div className="container" style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h2 style={{
                    fontSize: "2.5rem",
                    fontWeight: "800",
                    color: "var(--primary-navy)",
                    marginBottom: "1rem"
                }}>
                    Banks We Work With
                </h2>
                <div style={{ width: "60px", height: "4px", backgroundColor: "var(--primary-green)", margin: "0 auto", borderRadius: "2px" }}></div>
            </div>

            <div className="carousel-container" style={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                padding: "2rem 0",
                maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
            }}>
                <div className="carousel-track" style={{
                    display: "flex",
                    width: "max-content",
                    gap: "4rem",
                    animation: "scroll 40s linear infinite"
                }}>
                    {displayPartners.map((partner, index) => (
                        <div
                            key={`${partner.id}-${index}`}
                            className="partner-logo"
                            style={{
                                flex: "0 0 auto",
                                width: "220px", // Increased from 180px
                                height: "100px", // Increased from 80px
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                filter: "grayscale(100%)",
                                opacity: 0.7,
                                transition: "all 0.3s ease"
                            }}
                        >
                            <img
                                src={partner.logoUrl}
                                alt={partner.name}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain"
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        
        .carousel-track:hover {
            animation-play-state: paused;
        }

        .partner-logo:hover {
            filter: grayscale(0) !important;
            opacity: 1 !important;
            transform: scale(1.1) !important;
        }
      `}</style>
        </section>
    );
}
