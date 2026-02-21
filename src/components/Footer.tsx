import Link from "next/link";

const SocialIcons = () => (
    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <a href="#" style={{ color: "white", border: "1px solid white", borderRadius: "50%", padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px" }}>
            {/* Facebook Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
        <a href="#" style={{ color: "white", border: "1px solid white", borderRadius: "50%", padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px" }}>
            {/* Instagram Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="#" style={{ color: "white", border: "1px solid white", borderRadius: "50%", padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px" }}>
            {/* LinkedIn Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
    </div>
);

export default function Footer() {
    return (
        <footer style={{ backgroundColor: "var(--primary-navy)", color: "white", padding: "5rem 0 2rem 0" }}>
            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>

                    {/* Column 1: Synergy Hub Banking */}
                    <div>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", fontWeight: "bold" }}>Synergy Hub Banking</h3>
                        <p style={{ color: "#e5e7eb", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                            Your trusted partner for banking and accounting solutions in the UAE. We simplify bank account opening and ensure financial compliance to support your business growth.
                        </p>
                        <SocialIcons />
                    </div>

                    {/* Column 2: Synergy Hub Tax */}
                    <div>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", fontWeight: "bold" }}>Synergy Hub Tax</h3>
                        <p style={{ color: "#e5e7eb", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                            Your trusted partner for tax solutions in the UAE. We provide expert tax consultancy and compliance services to help your business stay ahead.
                        </p>
                        <SocialIcons />
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", fontWeight: "bold" }}>Quick Links</h3>
                        <ul style={{ listStyle: "none", padding: 0, fontSize: "1rem", lineHeight: "2.5" }}>
                            {["Home", "About", "Banking", "Accounting & Tax", "Blogs", "Gallery", "Contact Us"].map((link, index) => (
                                <li key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <span style={{ color: "#22c55e" }}>★</span>
                                    <Link href={link === "Home" ? "/" : `/${link.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} style={{ color: "white", textDecoration: "none" }}>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact Us */}
                    <div>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", fontWeight: "bold" }}>Contact Us</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontSize: "0.95rem", lineHeight: "1.6" }}>
                            <div style={{ display: "flex", gap: "1rem" }}>
                                <span style={{ color: "#22c55e", marginTop: "5px" }}>📍</span>
                                <div>
                                    Emirates Islamic Bank Building - 110, First Floor - Al Nahda St - Near Al Twar Center, Al Qusais 2 - Dubai
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                <span style={{ color: "#22c55e" }}>📱</span>
                                <div>+971 58 280 0240 / +971 4 221 0009</div>
                            </div>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                <span style={{ color: "#22c55e" }}>💬</span>
                                <div>+971 58 280 0240</div>
                            </div>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                <span style={{ color: "#22c55e" }}>✉️</span>
                                <div>info@synergyhub.ae</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div style={{ borderTop: "1px solid #334155", marginTop: "4rem", paddingTop: "2rem", textAlign: "center", color: "#94a3b8", fontSize: "0.9rem" }}>
                    &copy; {new Date().getFullYear()} Synergy Hub. All rights reserved.
                </div>
            </div>

            {/* Responsive Styles Injection */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 1024px) {
                    footer .container > div:first-child {
                        grid-template-columns: 1fr 1fr !important;
                    }
                }
                @media (max-width: 768px) {
                    footer .container > div:first-child {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}} />
        </footer>
    );
}
