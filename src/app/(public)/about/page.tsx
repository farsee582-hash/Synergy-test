import Link from "next/link";
import GetInTouchForm from "@/components/GetInTouchForm";
import PageHero from "@/components/PageHero";
import { getPageContent } from "@/lib/get-content";

export default async function AboutPage() {
    const content = await getPageContent("about");

    return (
        <div>
            {/* Hero Section */}
            <PageHero
                title={content.about_hero_title}
                description={content.about_hero_desc}
                backgroundImage={content.hero_bg}
            />

            {/* Main Introduction */}
            <section style={{ padding: "5rem 0" }}>
                <div className="container">
                    <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", marginBottom: "4rem" }}>
                        <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--primary-navy)", marginBottom: "1.5rem" }}>
                            {content.about_intro_title}
                        </h2>
                        <div style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#4b5563", whiteSpace: "pre-line" }}>
                            {content.about_intro_text}
                        </div>
                    </div>

                    {/* Dual Entities Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                        {/* Banking Entity */}
                        <div style={{
                            backgroundColor: "#f8fafc",
                            padding: "2.5rem",
                            borderRadius: "16px",
                            border: "1px solid #e2e8f0",
                            height: "100%"
                        }}>
                            <div style={{
                                width: "50px", height: "50px",
                                backgroundColor: "rgba(15, 33, 56, 0.1)",
                                borderRadius: "12px",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                marginBottom: "1.5rem",
                                color: "var(--primary-navy)",
                                fontSize: "1.5rem"
                            }}>🏦</div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary-navy)", marginBottom: "0.5rem" }}>
                                Synergy Hub Banking & Investment L.L.C
                            </h3>
                            <p style={{ color: "var(--primary-green)", fontWeight: "600", fontSize: "0.9rem", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                Your Trusted Banking Partner
                            </p>
                            <p style={{ color: "#4b5563", lineHeight: "1.7" }}>
                                We simplify the process of corporate bank account opening and deliver tailored accounting and bookkeeping services to ensure ongoing financial compliance. Our partnerships with 15+ UAE banks give our clients priority onboarding for high-risk nationals and industries.
                            </p>
                        </div>

                        {/* Accounting Entity */}
                        <div style={{
                            backgroundColor: "#f8fafc",
                            padding: "2.5rem",
                            borderRadius: "16px",
                            border: "1px solid #e2e8f0",
                            height: "100%"
                        }}>
                            <div style={{
                                width: "50px", height: "50px",
                                backgroundColor: "rgba(76, 175, 80, 0.1)",
                                borderRadius: "12px",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                marginBottom: "1.5rem",
                                color: "var(--primary-green)",
                                fontSize: "1.5rem"
                            }}>📊</div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary-navy)", marginBottom: "0.5rem" }}>
                                Synergy Hub Accounting & Tax Consultancy L.L.C
                            </h3>
                            <p style={{ color: "var(--primary-green)", fontWeight: "600", fontSize: "0.9rem", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                Your Trusted Tax Partner
                            </p>
                            <p style={{ color: "#4b5563", lineHeight: "1.7" }}>
                                We provide expert consultancy and compliance support for VAT and corporate tax. From registration to strategic planning and reporting, our proactive approach helps businesses minimize liabilities, avoid penalties, and stay ahead of evolving UAE regulations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Partner With Us - Value Grid */}
            <section style={{ padding: "5rem 0", backgroundColor: "#f0fdf4" }}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--primary-navy)", marginBottom: "1rem" }}>
                            Why Partner With Us?
                        </h2>
                        <div style={{ width: "60px", height: "4px", backgroundColor: "var(--primary-green)", margin: "0 auto", borderRadius: "2px" }}></div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                        {[
                            {
                                title: "Hassle-Free Banking",
                                points: ["Simplified corporate account opening.", "Preferred partnerships with 15+ leading UAE banks, including digital-first options."]
                            },
                            {
                                title: "Tax Confidence",
                                points: ["Proactive VAT & corporate tax planning.", "Expert advisory on tax compliance."]
                            },
                            {
                                title: "Accounting & Compliance",
                                points: ["End-to-end bookkeeping and financial reporting.", "Dedicated compliance officers to ensure error-free documentation."]
                            },
                            {
                                title: "Lifetime Support",
                                points: ["Dedicated personal relationship managers.", "Guidance on financial compliance and regulatory updates."]
                            }
                        ].map((item, i) => (
                            <div key={i} style={{ backgroundColor: "white", padding: "2.5rem", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
                                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--primary-navy)", marginBottom: "1.5rem" }}>{item.title}</h3>
                                <ul style={{ paddingLeft: "1.2rem", color: "#4b5563", lineHeight: "1.8", listStyleType: "disc" }}>
                                    {item.points.map((pt, j) => (
                                        <li key={j} style={{ marginBottom: "0.5rem" }}>{pt}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Synergy Hub Difference */}
            <section style={{ padding: "5rem 0", backgroundColor: "white" }}>
                <div className="container" style={{ textAlign: "center", maxWidth: "900px" }}>
                    <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--primary-navy)", marginBottom: "1.5rem" }}>
                        The Synergy Hub Difference
                    </h2>
                    <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#4b5563" }}>
                        With our proven expertise, strong banking partnerships, and in-depth tax knowledge, Synergy Hub Banking and Synergy Hub Tax go beyond standard services to act as your strategic ally. Our commitment to transparency, compliance, and long term client success ensures that you don't just stay compliant, you grow with confidence.
                    </p>
                </div>
            </section>

            {/* Founders Section */}
            <section style={{ padding: "5rem 0", backgroundColor: "var(--bg-light)" }}>
                <div className="container">
                    <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--primary-navy)", marginBottom: "4rem", textAlign: "center" }}>
                        Meet Our Founders
                    </h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>

                        {/* Founder 1: Muhammad Haneef Kodagu */}
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            backgroundColor: "white",
                            borderRadius: "20px",
                            overflow: "hidden",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                            gap: "2rem",
                            flexWrap: "wrap"
                        }}>
                            <div style={{ flex: "1 1 300px", minHeight: "350px", backgroundColor: "#e2e8f0", position: "relative" }}>
                                {content.founder_1_photo && content.founder_1_photo.trim() !== "" ? (
                                    <img src={content.founder_1_photo} alt="Muhammad Haneef Kodagu" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                                ) : (
                                    <div style={{
                                        position: "absolute",
                                        inset: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#94a3b8",
                                        flexDirection: "column",
                                        backgroundColor: "#f1f5f9"
                                    }}>
                                        <span style={{ fontSize: "3rem" }}>👤</span>
                                        <p>Upload Photo</p>
                                    </div>
                                )}
                            </div>
                            <div style={{ flex: "2 1 500px", padding: "3rem" }}>
                                <h3 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary-navy)", marginBottom: "0.5rem" }}>
                                    Muhammad Haneef Kodagu
                                </h3>
                                <p style={{ fontSize: "1.1rem", color: "var(--primary-green)", fontWeight: "600", marginBottom: "1.5rem" }}>
                                    Co-Founder & Managing Partner
                                </p>
                                <div style={{ color: "#4b5563", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                                    <p style={{ marginBottom: "1rem" }}>
                                        With over a decade of expertise in the banking and financial sector, Mr. Muhammed Haneef brings a wealth of experience in relationship management, mortgage advisory, and corporate financial services.
                                    </p>
                                    <p style={{ marginBottom: "1rem", fontWeight: "600" }}>Key Roles & Partners:</p>
                                    <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.5rem" }}>
                                        {["RAK Bank – Relations Officer", "ADIB (Abu Dhabi Islamic Bank) – Senior Relationship Officer", "Azizi Developments – Relationship Manager", "Ajman Bank – Mortgage Advisor"].map((role, i) => (
                                            <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                <span style={{ color: "var(--primary-green)" }}>For</span> {role}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p style={{ fontSize: "0.95rem", fontStyle: "italic", color: "#64748b" }}>
                                        Manages: Synergy Hub Banking & Investment L.L.C, Synergy Hub Accounting & Tax Consultancy L.L.C, Shamily Business Corporate Services.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Founder 2: Ashker Kareem */}
                        <div style={{
                            display: "flex",
                            flexDirection: "row-reverse", /* Alternate layout */
                            backgroundColor: "white",
                            borderRadius: "20px",
                            overflow: "hidden",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                            gap: "2rem",
                            flexWrap: "wrap"
                        }}>
                            <div style={{ flex: "1 1 300px", minHeight: "350px", backgroundColor: "#e2e8f0", position: "relative" }}>
                                {content.founder_2_photo && content.founder_2_photo.trim() !== "" ? (
                                    <img src={content.founder_2_photo} alt="Ashker Kareem" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                                ) : (
                                    <div style={{
                                        position: "absolute",
                                        inset: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#94a3b8",
                                        flexDirection: "column",
                                        backgroundColor: "#f1f5f9"
                                    }}>
                                        <span style={{ fontSize: "3rem" }}>👤</span>
                                        <p>Upload Photo</p>
                                    </div>
                                )}
                            </div>
                            <div style={{ flex: "2 1 500px", padding: "3rem" }}>
                                <h3 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary-navy)", marginBottom: "0.5rem" }}>
                                    Ashker Kareem
                                </h3>
                                <p style={{ fontSize: "1.1rem", color: "var(--primary-green)", fontWeight: "600", marginBottom: "1.5rem" }}>
                                    CEO & Founder
                                </p>
                                <div style={{ color: "#4b5563", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                                    <p style={{ marginBottom: "1rem" }}>
                                        CA. Ashker Kareem is a seasoned professional with over 10 years of diverse experience in Taxation Advisory, Corporate Audits, and AML Compliance Services. His expertise has been pivotal in guiding large corporations, SMEs, and various business entities toward sustainable financial growth.
                                    </p>
                                    <p>
                                        With deep practical knowledge of UAE VAT and Corporate Taxation laws, Ashker has successfully represented businesses before tax authorities and provided strategic advisory to ensure compliance and efficiency. He plays a key role in advising startups and investors.
                                    </p>
                                </div>
                                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                                    {["CA", "ACCA", "AML Professional"].map((tag, i) => (
                                        <span key={i} style={{
                                            backgroundColor: "rgba(15, 33, 56, 0.05)",
                                            color: "var(--primary-navy)",
                                            padding: "0.25rem 0.75rem",
                                            borderRadius: "50px",
                                            fontSize: "0.85rem",
                                            fontWeight: "600"
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section style={{ padding: "5rem 0", backgroundColor: "var(--primary-navy)", color: "white", textAlign: "center" }}>
                <div className="container" style={{ maxWidth: "800px" }}>
                    <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "2rem" }}>
                        Our Vision
                    </h2>
                    <div style={{ fontSize: "1.2rem", lineHeight: "1.8", opacity: 0.9 }}>
                        <p style={{ marginBottom: "1.5rem" }}>
                            Together, Mr. Muhammed Haneef and Mr. Ashker Cheriya Vattappara lead the company with a shared vision:
                        </p>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li style={{ marginBottom: "1rem" }}>"To provide world-class accounting, taxation, and business advisory services."</li>
                            <li>"To empower businesses with strategic financial solutions and ensure sustainable growth."</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Get In Touch Section */}
            <section style={{ padding: "5rem 0", backgroundColor: "white" }}>
                <div className="container" style={{ maxWidth: "800px" }}>
                    <GetInTouchForm />
                </div>
            </section>
        </div>
    );
}
