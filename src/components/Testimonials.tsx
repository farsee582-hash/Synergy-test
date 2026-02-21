"use client";

import React, { useState } from "react";
import Image from "next/image";

interface TestimonialType {
    id: string;
    name: string;
    role: string | null;
    content: string;
    rating: number;
    imageUrl: string | null;
}

interface TestimonialsProps {
    testimonials?: TestimonialType[];
}

const Star = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: "1.25rem", height: "1.25rem", color: "#eab308" }}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
);

export default function Testimonials({ testimonials = [] }: TestimonialsProps) {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section style={{ padding: "6rem 0", backgroundColor: "#f8fafc" }}>
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <h2 style={{
                        fontSize: "2.5rem",
                        fontWeight: "700",
                        marginBottom: "1rem",
                        color: "#1e293b",
                        letterSpacing: "-0.025em"
                    }}>
                        Trusted by Industry Leaders
                    </h2>
                    <p style={{ fontSize: "1.125rem", color: "#64748b", maxWidth: "600px", margin: "0 auto" }}>
                        We pride ourselves on delivering exceptional service and building lasting relationships with our clients.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                    {testimonials.map((review) => (
                        <div key={review.id} style={{
                            backgroundColor: "white",
                            padding: "2.5rem",
                            borderRadius: "12px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            border: "1px solid #f1f5f9"
                        }}>
                            <div>
                                <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.5rem" }}>
                                    {[...Array(review.rating || 5)].map((_, i) => <Star key={i} />)}
                                </div>
                                <p style={{
                                    fontSize: "1.125rem",
                                    lineHeight: "1.75",
                                    color: "#334155",
                                    fontStyle: "italic",
                                    marginBottom: "2rem"
                                }}>
                                    "{review.content}"
                                </p>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                    backgroundColor: "#e2e8f0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "bold",
                                    color: "#64748b",
                                    fontSize: "1.25rem",
                                    position: "relative",
                                    overflow: "hidden"
                                }}>
                                    {review.imageUrl ? (
                                        <Image src={review.imageUrl} alt={review.name} fill style={{ objectFit: "cover" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                                    ) : (
                                        review.name.charAt(0)
                                    )}
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: "700", color: "#1e293b", fontSize: "1rem" }}>{review.name}</h4>
                                    <p style={{ fontSize: "0.875rem", color: "#94a3b8" }}>{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
