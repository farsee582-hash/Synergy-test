"use client";

import Link from "next/link";
import { useState } from "react";

interface HeaderClientProps {
    phone: string;
}

export default function HeaderClient({ phone }: HeaderClientProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Banking", href: "/banking" },
        { name: "Accounting & Tax", href: "/accounting" },
        { name: "Contacts", href: "/contacts" },
        { name: "Blog", href: "/blog" },
        { name: "Gallery", href: "/gallery" },
    ];

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
                <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }} onClick={() => setIsMobileMenuOpen(false)}>
                    <img src="/logo.png" alt="Synergy Hub Logo" style={{ height: "40px", objectFit: "contain" }} />
                </Link>

                {/* Desktop Nav */}
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

                {/* Mobile Menu & CTA */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <Link href="/contacts" className="btn desktop-cta" style={{
                        backgroundColor: "var(--primary-green)",
                        color: "white",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "50px",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        textDecoration: "none",
                        boxShadow: "0 4px 6px -1px rgba(76, 175, 80, 0.3)",
                        display: "none"
                    }}>
                        Book Consultation
                    </Link>

                    {/* Hamburger Button */}
                    <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu" style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px"
                    }}>
                        <span style={{ display: "block", width: "24px", height: "2px", backgroundColor: "var(--primary-navy)", transition: "0.3s", transform: isMobileMenuOpen ? "rotate(45deg) translate(5px, 6px)" : "none" }}></span>
                        <span style={{ display: "block", width: "24px", height: "2px", backgroundColor: "var(--primary-navy)", transition: "0.3s", opacity: isMobileMenuOpen ? 0 : 1 }}></span>
                        <span style={{ display: "block", width: "24px", height: "2px", backgroundColor: "var(--primary-navy)", transition: "0.3s", transform: isMobileMenuOpen ? "rotate(-45deg) translate(5px, -6px)" : "none" }}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            {isMobileMenuOpen && (
                <nav className="mobile-nav" style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                    padding: "1rem",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {navItems.map((item) => (
                            <li key={item.name} style={{ textAlign: "center" }}>
                                <Link
                                    href={item.href}
                                    style={{ color: "var(--primary-navy)", textDecoration: "none", fontSize: "1.1rem", fontWeight: "500", display: "block", padding: "0.5rem 0" }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div style={{ textAlign: "center", marginTop: "1rem", paddingBottom: "1rem" }}>
                        <Link href="/contacts" onClick={() => setIsMobileMenuOpen(false)} style={{
                            backgroundColor: "var(--primary-green)",
                            color: "white",
                            padding: "0.75rem 2rem",
                            borderRadius: "50px",
                            fontSize: "1rem",
                            fontWeight: "600",
                            textDecoration: "none",
                            display: "inline-block",
                            boxShadow: "0 4px 6px -1px rgba(76, 175, 80, 0.3)"
                        }}>
                            Book Consultation
                        </Link>
                    </div>
                </nav>
            )}

        </header>
    );
}
