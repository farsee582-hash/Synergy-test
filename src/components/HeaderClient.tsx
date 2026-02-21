"use client";

import Link from "next/link";
import { useState } from "react";

interface HeaderClientProps {
    phone: string;
}

export default function HeaderClient({ phone }: HeaderClientProps) {
    const navItems = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Banking", href: "/banking" },
        { name: "Accounting & Tax", href: "/accounting" },
        { name: "Contacts", href: "/contacts" },
        { name: "Blog", href: "/blog" },
        { name: "Gallery", href: "/gallery" },
    ];

    return (
        <header style={{
            backgroundColor: "white",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            borderBottom: "1px solid rgba(0,0,0,0.05)"
        }}>
            <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0" }}>
                {/* Logo */}
                <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                    <img src="/logo.png" alt="Synergy Hub Logo" style={{ height: "50px", objectFit: "contain" }} />
                </Link>

                {/* Nav */}
                <nav style={{ display: "none" }} className="desktop-nav">
                    <ul style={{ display: "flex", gap: "2rem", alignItems: "center", fontSize: "0.95rem", fontWeight: "500", margin: 0, padding: 0, listStyle: "none" }}>
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    style={{ color: "var(--primary-navy)", textDecoration: "none", transition: "color 0.2s" }}
                                    onMouseOver={(e) => e.currentTarget.style.color = "var(--primary-green)"}
                                    onMouseOut={(e) => e.currentTarget.style.color = "var(--primary-navy)"}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* CTA */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <Link href="/contacts" className="btn" style={{
                        backgroundColor: "var(--primary-green)",
                        color: "white",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "50px",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        textDecoration: "none",
                        boxShadow: "0 4px 6px -1px rgba(76, 175, 80, 0.3)"
                    }}>
                        Book Consultation
                    </Link>
                </div>

                {/* Mobile Menu Toggle (Simplified placeholder) */}
                <style jsx>{`
                    @media (min-width: 1024px) {
                        .desktop-nav { display: block !important; }
                    }
                `}</style>
            </div>
        </header>
    );
}
