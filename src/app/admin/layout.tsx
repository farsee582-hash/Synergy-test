import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
/* import { authOptions } from "@/lib/auth"; */
// TODO: Fix import path or move authOptions to lib/auth.ts to avoid circular deps if needed

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // We will rely on middleware for protection, but we can also check here if we want strict page-level
    // validation. For now, assuming middleware handles redirection if not logged in.

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <aside style={{ width: "250px", backgroundColor: "#1f2937", color: "white", padding: "1rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "2rem", borderBottom: "1px solid #374151", paddingBottom: "1rem" }}>
                    Synergy Admin
                </h2>
                <nav>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li style={{ marginBottom: "0.5rem" }}><Link href="/admin" style={{ color: "#d1d5db", textDecoration: "none", display: "block", padding: "0.5rem" }}>Dashboard</Link></li>

                        {/* Pages Group */}
                        <li style={{ marginTop: "1rem", marginBottom: "0.5rem", color: "#9ca3af", fontSize: "0.85rem", fontWeight: "bold", paddingLeft: "0.5rem" }}>PAGES</li>
                        <li style={{ marginBottom: "0.5rem" }}><Link href="/admin/pages/home" style={{ color: "#d1d5db", textDecoration: "none", display: "block", padding: "0.5rem" }}>Home</Link></li>
                        <li style={{ marginBottom: "0.5rem" }}><Link href="/admin/pages/about" style={{ color: "#d1d5db", textDecoration: "none", display: "block", padding: "0.5rem" }}>About Us</Link></li>
                        <li style={{ marginBottom: "0.5rem" }}><Link href="/admin/pages/banking" style={{ color: "#d1d5db", textDecoration: "none", display: "block", padding: "0.5rem" }}>Banking</Link></li>
                        <li style={{ marginBottom: "0.5rem" }}><Link href="/admin/pages/accounting" style={{ color: "#d1d5db", textDecoration: "none", display: "block", padding: "0.5rem" }}>Accounting</Link></li>
                        <li style={{ marginBottom: "0.5rem" }}><Link href="/admin/pages/contacts" style={{ color: "#d1d5db", textDecoration: "none", display: "block", padding: "0.5rem" }}>Contacts</Link></li>

                        {/* Content Group */}
                        <li style={{ marginTop: "1rem", marginBottom: "0.5rem", color: "#9ca3af", fontSize: "0.85rem", fontWeight: "bold", paddingLeft: "0.5rem" }}>CONTENT</li>
                        <li style={{ marginBottom: "0.5rem" }}><Link href="/admin/hero" style={{ color: "#d1d5db", textDecoration: "none", display: "block", padding: "0.5rem" }}>Hero Slider</Link></li>
                        <li style={{ marginBottom: "0.5rem" }}><Link href="/admin/services" style={{ color: "#d1d5db", textDecoration: "none", display: "block", padding: "0.5rem" }}>Services</Link></li>
                        <li style={{ marginBottom: "0.5rem" }}><Link href="/admin/partners" style={{ color: "#d1d5db", textDecoration: "none", display: "block", padding: "0.5rem" }}>Partners (Banks)</Link></li>
                        <li style={{ marginBottom: "0.5rem" }}><Link href="/admin/testimonials" style={{ color: "#d1d5db", textDecoration: "none", display: "block", padding: "0.5rem" }}>Reviews</Link></li>
                        <li style={{ marginBottom: "0.5rem" }}><Link href="/admin/faq" style={{ color: "#d1d5db", textDecoration: "none", display: "block", padding: "0.5rem" }}>FAQ</Link></li>
                        <li style={{ marginBottom: "0.5rem" }}><Link href="/admin/map" style={{ color: "#d1d5db", textDecoration: "none", display: "block", padding: "0.5rem" }}>Map Locations</Link></li>
                        <li style={{ marginBottom: "0.5rem" }}><Link href="/admin/blog" style={{ color: "#d1d5db", textDecoration: "none", display: "block", padding: "0.5rem" }}>Blog</Link></li>
                        <li style={{ marginBottom: "0.5rem" }}><Link href="/admin/gallery" style={{ color: "#d1d5db", textDecoration: "none", display: "block", padding: "0.5rem" }}>Gallery</Link></li>
                        <li style={{ marginBottom: "0.5rem" }}><Link href="/admin/messages" style={{ color: "#d1d5db", textDecoration: "none", display: "block", padding: "0.5rem" }}>Messages</Link></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: "2rem", backgroundColor: "#f9fafb" }}>
                {children}
            </main>
        </div>
    );
}
