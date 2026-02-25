import Link from "next/link";
import { getPageContent, getServices, getPartners, getHeroSlides, getTestimonials, getFaqs, getBranches } from "@/lib/get-content";
import HeroCarousel from "@/components/HeroCarousel";
import StatsSection from "@/components/StatsSection";
import ServicesElegant from "@/components/ServicesElegant";
import PartnersCarousel from "@/components/PartnersCarousel";
import MapSection from "@/components/MapSection";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";

export default async function Home() {
  const content = await getPageContent("home");
  const slides = await getHeroSlides();

  const services = await getServices();

  // Separate services into Banking and Tax categories based on the user's request
  const bankingServicesList = [
    "Business Bank Account Opening (Regular & Islamic)",
    "Personal Bank Accounts (Savings & Current – Regular & Islamic)",
    "Accounts for Non-Residents",
    "POS Machines",
    "Payment Link Setup (PayBy Link)",
    "Online Payment Gateway Integration"
  ];

  const bankingServices = services.filter((service: any) => bankingServicesList.includes(service.title));
  const taxServices = services.filter((service: any) => !bankingServicesList.includes(service.title));

  const partners = await getPartners();
  const testimonials = await getTestimonials();
  const faqs = await getFaqs();
  const branches = await getBranches();

  return (
    <div>
      {/* Hero Section */}
      {slides.length > 0 ? (
        <HeroCarousel slides={slides} />
      ) : (
        <section style={{
          padding: "2rem", // Create the frame effect
          backgroundColor: "white",
        }}>
          <div style={{
            backgroundColor: "var(--primary-navy)",
            borderRadius: "2rem",
            overflow: "hidden",
            position: "relative",
            minHeight: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "4rem",
            flexDirection: "column",
            color: "white"
          }}>
            {/* Background Image Overlay */}
            {content.hero_bg && (
              <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundImage: `url(${content.hero_bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.3,
                zIndex: 0
              }}></div>
            )}

            <h1 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "1rem", position: "relative", zIndex: 1 }}>
              {content.hero_title}
            </h1>
            <p style={{ fontSize: "1.25rem", opacity: 0.9, maxWidth: "700px", marginBottom: "2rem", position: "relative", zIndex: 1 }}>
              {content.hero_subtitle}
            </p>
            <Link href="/contacts" className="btn" style={{
              backgroundColor: "var(--primary-green)",
              color: "white",
              padding: "1rem 2rem",
              borderRadius: "8px",
              fontWeight: "bold",
              textDecoration: "none",
              position: "relative",
              zIndex: 1
            }}>
              {content.hero_cta}
            </Link>
          </div>
        </section>
      )}

      <StatsSection />

      <ServicesElegant bankingServices={bankingServices} taxServices={taxServices} />

      <PartnersCarousel partners={partners} />

      {/* About Snippet */}
      <section style={{ padding: "6rem 0", backgroundColor: "var(--bg-light)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <h4 style={{ color: "var(--primary-green-dark)", fontWeight: "bold", marginBottom: "1rem", letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "0.9rem" }}>About Synergy Hub</h4>
            <h2 style={{ fontSize: "2.75rem", fontWeight: "800", marginBottom: "1.5rem", lineHeight: "1.2", color: "var(--primary-navy)" }}>
              {content.home_about_title || "Banking Made Simple. Business Made Possible."}
            </h2>
            <div style={{ color: "#4b5563", marginBottom: "2.5rem", whiteSpace: "pre-line", fontSize: "1.1rem", lineHeight: "1.8" }}>
              {content.home_about_text || "At Synergy Hub, we make banking and business compliance simple so you can focus on growing your company. Whether you need help setting up a bank account or managing your business finances, we're here to make every process seamless, compliant, and stress free."}
            </div>
            <Link href="/about" className="btn btn-outline" style={{ color: "var(--primary-navy)", border: "2px solid var(--primary-navy)", padding: "0.75rem 2rem", borderRadius: "6px" }}>
              More About Us
            </Link>
          </div>

          <div style={{ backgroundColor: "var(--primary-navy)", padding: "3rem", borderRadius: "16px", color: "white", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}>
            <h3 style={{ fontSize: "1.75rem", marginBottom: "0.5rem", fontWeight: "bold" }}>Book Your Free Consultation</h3>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem" }}>Get expert advice tailored to your business needs.</p>

            <form action="/api/contact" method="POST" style={{ display: "grid", gap: "1.25rem" }}>
              <input type="text" placeholder="First Name *" style={{ padding: "1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", color: "white" }} />
              <input type="email" placeholder="Email *" style={{ padding: "1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", color: "white" }} />
              <input type="tel" placeholder="Phone *" style={{ padding: "1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", color: "white" }} />
              <textarea placeholder="Message *" rows={3} style={{ padding: "1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", color: "white" }}></textarea>
              <button type="button" className="btn btn-primary" style={{ marginTop: "0.5rem", padding: "1rem", fontSize: "1.1rem" }}>Submit Request</button>
            </form>
          </div>
        </div>
      </section>
      <Testimonials testimonials={testimonials} />
      <FAQ faqs={faqs} />

      <MapSection branches={branches} />
    </div>
  );
}
