"use client";

import { useState } from "react";

interface FAQItemType {
    id: string;
    question: string;
    answer: string;
}

interface FAQProps {
    faqs?: FAQItemType[];
}

export default function FAQ({ faqs = [] }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!faqs || faqs.length === 0) return null;

    return (
        <section style={{ padding: "6rem 0", backgroundColor: "white" }}>
            <div className="container" style={{ maxWidth: "900px" }}>
                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <h2 style={{
                        fontSize: "2.5rem",
                        fontWeight: "700",
                        marginBottom: "1rem",
                        color: "#1e293b",
                        letterSpacing: "-0.025em"
                    }}>
                        Frequently Asked Questions
                    </h2>
                    <p style={{ fontSize: "1.125rem", color: "#64748b" }}>
                        Everything you need to know about our services.
                    </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {faqs.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={item.id} style={{
                                border: "1px solid #e2e8f0",
                                borderRadius: "8px",
                                overflow: "hidden",
                                backgroundColor: isOpen ? "#f8fafc" : "white",
                                transition: "background-color 0.2s"
                            }}>
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        padding: "1.5rem",
                                        backgroundColor: "transparent",
                                        border: "none",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        fontSize: "1.125rem",
                                        fontWeight: "600",
                                        color: isOpen ? "#0f172a" : "#334155",
                                        transition: "color 0.2s"
                                    }}
                                >
                                    {item.question}
                                    <span style={{
                                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.3s ease",
                                        color: isOpen ? "#2563eb" : "#94a3b8"
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </span>
                                </button>
                                {isOpen && (
                                    <div style={{
                                        padding: "0 1.5rem 1.5rem 1.5rem",
                                        color: "#475569",
                                        lineHeight: "1.7",
                                        fontSize: "1rem",
                                        animation: "fadeIn 0.3s ease-in-out"
                                    }}>
                                        <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }` }} />
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
