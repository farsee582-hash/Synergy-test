import React from "react";
import Link from "next/link";
import GetInTouchForm from "@/components/GetInTouchForm";
import MapSection from "@/components/MapSection";
import PageHero from "@/components/PageHero";
import { getPageContent, getBranches } from "@/lib/get-content";

export default async function ContactsPage() {
    const content = await getPageContent("contacts");
    const branches = await getBranches();
    return (
        <div>
            {/* Hero Section */}
            <PageHero
                title={content.contact_hero_title}
                description={content.contact_hero_desc}
                backgroundImage={content.hero_bg}
            >
                <Link href="#contact-form" style={{
                    display: "inline-block",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "white",
                    padding: "1rem 2rem",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: "600",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.2s"
                }}>
                    Get Started Today
                </Link>
            </PageHero>

            {/* Contact & Form Section */}
            <section style={{ padding: "6rem 0", backgroundColor: "white" }}>
                <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "4rem", alignItems: "start" }}>

                    {/* Left: Contact Details */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        <div>
                            <div style={{
                                width: "60px",
                                height: "60px",
                                marginBottom: "1.5rem",
                                backgroundColor: "#fef2f2",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#ef4444"
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.3-.3.4-.69.24-1.01a11.36 11.36 0 0 1-.56-3.53C8.94 3.78 8.41 3.25 7.75 3.25H4.83C4.17 3.25 3.63 3.78 3.63 4.44c0 9.14 7.41 16.56 16.56 16.56.66 0 1.19-.53 1.19-1.19v-2.92c0-.66-.53-1.19-1.19-1.19z" /></svg>
                            </div>
                            <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--primary-navy)", marginBottom: "1rem" }}>
                                Contact Us
                            </h2>
                            <p style={{ color: "#64748b", fontSize: "1.1rem", lineHeight: "1.6" }}>
                                Reach out to us for any inquiries. We're here to help you navigate your banking and accounting expectations in the UAE.
                            </p>
                        </div>

                        {/* Call Us */}
                        <div style={{ backgroundColor: "#f8fafc", padding: "2rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", fontWeight: "bold", fontSize: "1.2rem", color: "var(--primary-navy)" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#e0f2fe", color: "#0284c7" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                </div>
                                Call Us
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", color: "#475569", marginLeft: "2.75rem" }}>
                                <a href="tel:+971582800240" style={{ textDecoration: "none", color: "inherit", display: "inline-block", transition: "color 0.2s" }}>+971 58 280 0240</a>
                                <a href="tel:+97142210009" style={{ textDecoration: "none", color: "inherit", display: "inline-block", transition: "color 0.2s" }}>+971 4 221 0009</a>
                            </div>
                        </div>

                        {/* WhatsApp Us */}
                        <div style={{ backgroundColor: "#f8fafc", padding: "2rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", fontWeight: "bold", fontSize: "1.2rem", color: "var(--primary-navy)" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#dcfce7", color: "#16a34a" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                </div>
                                WhatsApp Us
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", color: "#475569", marginLeft: "2.75rem" }}>
                                <a href="https://wa.me/971582800240" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit", display: "inline-block", transition: "color 0.2s" }}>+971 58 280 0240</a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Simple Form */}
                    <div id="contact-form">
                        <GetInTouchForm title="Send Us A Message" />
                    </div>

                </div>
            </section>

            {/* Map Section */}
            <div style={{ paddingBottom: "4rem" }}>
                <MapSection branches={branches} />
            </div>
        </div>
    );
}
