import React from "react";
import GetInTouchForm from "@/components/GetInTouchForm";
import PageHero from "@/components/PageHero";
import PartnersGrid from "@/components/PartnersGrid";
import { getPageContent, getPartners } from "@/lib/get-content";

export default async function BankingPage() {
    const content = await getPageContent("banking");
    const partners = await getPartners();

    return (
        <div style={{ backgroundColor: "#fafafa" }}> {/* Very light grey background for page */}

            {/* Hero Section */}
            <PageHero
                title={content.banking_hero_title}
                description={content.banking_hero_desc}
                backgroundImage={content.hero_bg}
            />

            {/* Intro Text - Centered */}
            <section style={{
                padding: "6rem 0 4rem",
                backgroundColor: "white",
                textAlign: "center"
            }}>
                <div className="container" style={{ maxWidth: "900px" }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "var(--primary-navy)", marginBottom: "1.5rem" }}>
                        {content.banking_intro_title}
                    </h2>
                    <div style={{
                        fontSize: "1.1rem",
                        lineHeight: "1.8",
                        color: "#4b5563",
                        marginBottom: "1rem",
                        fontWeight: "300",
                        whiteSpace: "pre-line"
                    }}>
                        {content.banking_intro_text}
                    </div>
                </div>
            </section>

            {/* Core Services - Clean 3-Column Icons */}
            <section style={{ padding: "4rem 0", backgroundColor: "white" }}>
                <div className="container">
                    <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--primary-navy)", marginBottom: "4rem", textAlign: "center" }}>
                        {content.banking_core_services_title}
                    </h2>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "3rem"
                    }}>
                        {/* Service 1: Payment Solutions */}
                        <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#f9fafb", borderRadius: "16px" }}>
                            <div style={{
                                width: "60px", height: "60px",
                                margin: "0 auto 1.5rem",
                                backgroundColor: "rgba(76, 175, 80, 0.1)",
                                borderRadius: "50%",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "var(--primary-green)", fontSize: "1.5rem"
                            }}>
                                💳
                            </div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary-navy)", marginBottom: "1.5rem" }}>
                                Payment Solutions
                            </h3>
                            <ul style={{ listStyle: "none", padding: 0, textAlign: "left", display: "grid", gap: "0.75rem" }}>
                                {["POS Machines", "Pay-by-Link Services", "Online Payment Gateways"].map((item, i) => (
                                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#4b5563" }}>
                                        <span style={{ color: "var(--primary-green)", fontWeight: "bold" }}>✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Service 2: Business Bank Account */}
                        <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}>
                            <div style={{
                                width: "60px", height: "60px",
                                margin: "0 auto 1.5rem",
                                backgroundColor: "rgba(15, 33, 56, 0.1)",
                                borderRadius: "50%",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "var(--primary-navy)", fontSize: "1.5rem"
                            }}>
                                🏦
                            </div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary-navy)", marginBottom: "1.5rem" }}>
                                Business Accounts
                            </h3>
                            <ul style={{ listStyle: "none", padding: 0, textAlign: "left", display: "grid", gap: "0.75rem" }}>
                                {["Conventional and Islamic options", "Mainland, Free Zone, and Offshore", "Tailored to your industry"].map((item, i) => (
                                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#4b5563" }}>
                                        <span style={{ color: "var(--primary-green)", fontWeight: "bold" }}>✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Service 3: Personal Account */}
                        <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#f9fafb", borderRadius: "16px" }}>
                            <div style={{
                                width: "60px", height: "60px",
                                margin: "0 auto 1.5rem",
                                backgroundColor: "rgba(76, 175, 80, 0.1)",
                                borderRadius: "50%",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "var(--primary-green)", fontSize: "1.5rem"
                            }}>
                                👤
                            </div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary-navy)", marginBottom: "1.5rem" }}>
                                Personal Accounts
                            </h3>
                            <ul style={{ listStyle: "none", padding: 0, textAlign: "left", display: "grid", gap: "0.75rem" }}>
                                {["Support for residents and non-residents", "Guided documentation and bank coordination"].map((item, i) => (
                                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#4b5563" }}>
                                        <span style={{ color: "var(--primary-green)", fontWeight: "bold" }}>✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How The Process Works - Elegant Split */}
            <section style={{ padding: "6rem 0", backgroundColor: "#f9fafb" }}>
                <div className="container">
                    <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--primary-navy)", marginBottom: "4rem", textAlign: "center" }}>
                        How The Process Works
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
                        {/* Left Content */}
                        <div>
                            <div style={{ marginBottom: "3rem", padding: "2rem", backgroundColor: "white", borderRadius: "12px", borderLeft: "4px solid var(--primary-green)" }}>
                                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary-navy)", marginBottom: "0.5rem" }}>
                                    Online Applications
                                </h3>
                                <p style={{ fontSize: "1rem", color: "#4b5563", marginBottom: "0.5rem" }}>(for UAE-based entities)</p>
                                <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Digital Banks: Applications may be completed via email or video verification links.</p>
                            </div>

                            <div style={{ padding: "2rem", backgroundColor: "white", borderRadius: "12px", borderLeft: "4px solid var(--primary-navy)" }}>
                                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary-navy)", marginBottom: "1rem" }}>
                                    In-Person Applications
                                </h3>
                                <p style={{ color: "#64748b", fontSize: "0.95rem" }}>In-Person Applications: Your physical presence is required at certain stages, including meeting bank representatives, submitting key documents, and signing application forms.</p>
                            </div>
                        </div>

                        {/* Right Checklist */}
                        <ul style={{ listStyle: "none", padding: "1rem", display: "grid", gap: "1.5rem" }}>
                            {[
                                "Meeting bank representatives",
                                "Submitting key documents",
                                "Signing application forms",
                                "You may need to visit the branch at least once.",
                                "Traditional Banks: Physical presence is usually required for verification and compliance checks.",
                                "We'll advise you on the most suitable path based on your current situation always in full compliance with UAE Central Bank regulations and individual bank policies."
                            ].map((item, i) => (
                                <li key={i} style={{ display: "flex", gap: "1rem", color: "#4b5563", alignItems: "flex-start", backgroundColor: "white", padding: "1rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                                    <div style={{
                                        minWidth: "20px", height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(76, 175, 80, 0.2)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        marginTop: "2px"
                                    }}>
                                        <span style={{ color: "var(--primary-green)", fontSize: "0.7rem", fontWeight: "bold" }}>✓</span>
                                    </div>
                                    <span style={{ fontSize: "0.95rem" }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Key Services Grid - Elegant White Cards */}
            <section style={{ padding: "6rem 0", backgroundColor: "white" }}>
                <div className="container">
                    <p style={{ textAlign: "center", color: "var(--primary-green)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Explore</p>
                    <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--primary-navy)", marginBottom: "4rem", textAlign: "center" }}>
                        Our Key Services
                    </h2>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "2rem"
                    }}>
                        {[
                            // Business
                            { title: "Business Bank Account Opening (Regular & Islamic)", icon: "💼", desc: "We help businesses open bank accounts with leading UAE banks, including both regular and Islamic options." },
                            // Personal
                            { title: "Personal Bank Accounts (Savings & Current)", icon: "💾", desc: "Assistance with opening personal savings or current accounts, available in both conventional and Islamic formats." },
                            // Non-Res
                            { title: "Accounts For Non-Residents", icon: "👤", desc: "We provide expert assistance for Non-Residents to set up their personal Account in UAE." },
                            // POS
                            { title: "POS Machines", icon: "📠", desc: "Get point-of-sale machines to accept card payments from your in-store customers." },
                            // Link
                            { title: "Payment Link Setup (PayBy Link)", icon: "🔗", desc: "Create and share payment links to receive online payments easily." },
                            // Gateway
                            { title: "Online Payment Gateway Integration", icon: "🌍", desc: "Integrate a secure online payment system into your website or app to accept payments from customers." },
                        ].map((item, i) => (
                            <div key={i} style={{
                                backgroundColor: "white",
                                padding: "3rem",
                                borderRadius: "16px",
                                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)",
                                border: "1px solid rgba(0,0,0,0.02)",
                                transition: "transform 0.2s ease"
                            }}>
                                <div style={{
                                    fontSize: "2.5rem", marginBottom: "1.5rem",
                                    width: "60px", height: "60px",
                                    backgroundColor: i % 2 === 0 ? "rgba(76, 175, 80, 0.1)" : "rgba(15, 33, 56, 0.1)",
                                    borderRadius: "12px",
                                    display: "flex", alignItems: "center", justifyContent: "center"
                                }}>
                                    {item.icon}
                                </div>
                                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--primary-navy)", marginBottom: "1rem" }}>
                                    {item.title}
                                </h3>
                                <p style={{ color: "#6b7280", lineHeight: "1.7", fontSize: "0.95rem" }}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Differentiators - Elegant List (Avoid Checkerboard for cleaner look as requested) */}
            <section style={{ padding: "6rem 0", backgroundColor: "#f9fafb" }}>
                <div className="container">
                    <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--primary-navy)", marginBottom: "4rem", textAlign: "center" }}>
                        What Makes Us Different
                    </h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                        {[
                            { id: "01", title: "Bank Approved Documentation Support" },
                            { id: "02", title: "Dedicated Banking Experts" },
                            { id: "03", title: "Quick Turnaround Time" },
                            { id: "04", title: "Trusted Referrals With Top UAE Banks" },
                            { id: "05", title: "Payment Setup For Online & In-Store" },
                        ].map((item, i) => (
                            <div key={i} style={{
                                backgroundColor: "white",
                                padding: "2rem",
                                borderRadius: "12px",
                                border: "1px solid #e5e7eb",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                position: "relative",
                                overflow: "hidden"
                            }}>
                                <span style={{
                                    fontSize: "4rem",
                                    fontWeight: "bold",
                                    color: "var(--primary-green)",
                                    opacity: 0.1,
                                    position: "absolute",
                                    top: "-10px",
                                    right: "10px"
                                }}>
                                    {item.id}
                                </span>
                                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--primary-navy)", zIndex: 1, marginTop: "1rem" }}>
                                    {item.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partners Grid - Static with Hover Effects */}
            <section style={{ padding: "6rem 0", backgroundColor: "white" }}>
                <div className="container" style={{ textAlign: "center" }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "var(--primary-navy)", marginBottom: "3rem" }}>
                        Our Trusted Banking Partners
                    </h2>

                    <PartnersGrid partners={partners} />
                </div>
            </section>

            {/* Get In Touch Section */}
            <section style={{ padding: "6rem 0", backgroundColor: "#fafafa" }}>
                <div className="container" style={{ maxWidth: "800px" }}>
                    <GetInTouchForm />
                </div>
            </section>

        </div>
    );
}
