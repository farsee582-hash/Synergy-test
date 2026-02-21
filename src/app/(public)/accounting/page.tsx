import React from "react";
import GetInTouchForm from "@/components/GetInTouchForm";
import FAQ from "@/components/FAQ";
import PageHero from "@/components/PageHero";
import { getPageContent } from "@/lib/get-content";

export default async function AccountingPage() {
    const content = await getPageContent("accounting");
    const accountingFAQs = [
        {
            id: "acc-1",
            question: "What Services Does Your Accounting Firm Offer?",
            answer: "We offer a comprehensive range of services including accounting & bookkeeping, VAT registration & filing, corporate tax registration & filing, financial reporting, feasibility studies, business valuation, and AML compliance."
        },
        {
            id: "acc-2",
            question: "How Can I Schedule A Consultation?",
            answer: "You can schedule a consultation by filling out the form at the top of this page, calling us directly, or visiting our office. Our team fits your schedule to discuss your specific financial needs."
        },
        {
            id: "acc-3",
            question: "What Are Your Fees?",
            answer: "Our fees are tailored to the scope and complexity of the services required. We offer transparent pricing structures and can provide a detailed quote after an initial assessment of your business requirements."
        },
        {
            id: "acc-4",
            question: "Do You Provide Services To Individuals As Well As Businesses?",
            answer: "Yes, while our primary focus is on business solutions, we also offer tax residency and personal financial advisory services for individuals and investors."
        }
    ];

    const services = [
        {
            title: "Accounting & Bookkeeping",
            description: "We keep your accounts organized and audit-ready. Every transaction is tracked, and you get clear financial summaries in line with UAE Laws.",
            checks: ["Monthly financial statements", "AR/AP management", "Inventory Reports", "Forecasting & budgeting"]
        },
        {
            title: "VAT Registration & Filing",
            description: "We manage the entire VAT lifecycle, from registration to filing, ensuring your records are accurate and compliant.",
            checks: ["VAT registration & filing", "Record maintenance", "Advisory & compliance", "VAT deregistration"]
        },
        {
            title: "Corporate Tax Services",
            description: "Stay compliant with UAE corporate tax. We manage registration, filing, and advisory to minimize liabilities and avoid penalties.",
            checks: ["Corporate tax registration", "Annual return filing", "Tax advisory & deductions", "Audit support"]
        },
        {
            title: "Year-End Audit Support",
            description: "We provide full support in preparing for internal audits, ensuring your records align with IFRS standards for external auditors.",
            checks: ["Internal audit preparation", "Financial report support", "Risk assessment", "Internal control review"]
        },
        {
            title: "Business Valuation",
            description: "Detailed business valuations to support investment planning, M&A, or strategic decisions with clear financial health indicators.",
            checks: ["Valuation reports", "Asset & liability analysis", "Growth assessment", "Investor readiness"]
        },
        {
            title: "Feasibility Studies",
            description: "Data-driven feasibility studies for new ventures or market entries, analyzing costs, market conditions, and ROI.",
            checks: ["Market research", "Cost-benefit analysis", "ROI projections", "SWOT analysis"]
        },
        {
            title: "Financial Reporting",
            description: "Customized, IFRS-compliant financial reports for management and investors to support strategic planning.",
            checks: ["P&L statements", "Balance sheets", "Cash flow statements", "Performance dashboards"]
        },
        {
            title: "Tax Consultancy",
            description: "Expert advice on local and international taxation, including VAT, corporate tax, and cross-border compliance.",
            checks: ["Strategic tax planning", "Cross-border tax", "Excise & customs advisory", "Risk management"]
        },
        {
            title: "AML Compliance",
            description: "Implement robust AML frameworks and fulfill regulatory obligations with our risk assessments and reporting services.",
            checks: ["AML policy development", "KYC & CDD reviews", "Compliance reporting", "Staff training"]
        }
    ];

    return (
        <div style={{ backgroundColor: "#fafafa" }}>
            {/* Hero Section */}
            <PageHero
                title={content.accounting_hero_title}
                description={content.accounting_hero_desc}
                backgroundImage={content.hero_bg}
            />

            {/* Intro Heading - Centered */}
            <section style={{ padding: "6rem 0 3rem", textAlign: "center" }}>
                <div className="container" style={{ maxWidth: "800px" }}>
                    <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--primary-navy)", marginBottom: "1.5rem" }}>
                        {content.accounting_intro_title}
                    </h2>
                    <div style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#4b5563", whiteSpace: "pre-line" }}>
                        {content.accounting_intro_text}
                    </div>
                </div>
            </section>

            {/* Services Grid - Elegant Cards */}
            <section style={{ padding: "3rem 0 8rem" }}>
                <div className="container">
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                        gap: "2rem"
                    }}>
                        {services.map((service, i) => (
                            <div key={i} style={{
                                backgroundColor: "white",
                                padding: "2.5rem",
                                borderRadius: "16px",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                                border: "1px solid rgba(0,0,0,0.03)",
                                transition: "all 0.2s ease",
                                display: "flex",
                                flexDirection: "column",
                                height: "100%"
                            }}>
                                <div style={{ marginBottom: "1.5rem" }}>
                                    <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary-navy)", marginBottom: "1rem" }}>
                                        {service.title}
                                    </h3>
                                    <p style={{ color: "#6b7280", lineHeight: "1.7", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                                        {service.description}
                                    </p>
                                </div>

                                <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #f3f4f6" }}>
                                    <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.75rem" }}>
                                        {service.checks.map((check, j) => (
                                            <li key={j} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem", color: "#4b5563" }}>
                                                <span style={{ color: "var(--primary-green)", fontSize: "1rem" }}>•</span>
                                                {check}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form Section At Bottom */}
            <section style={{ padding: "4rem 0", backgroundColor: "white" }}>
                <div className="container">
                    <div style={{ maxWidth: "800px", margin: "0 auto", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)", borderRadius: "16px" }}>
                        <GetInTouchForm />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQ faqs={accountingFAQs} />
        </div>
    );
}
