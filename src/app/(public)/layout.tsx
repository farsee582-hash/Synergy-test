import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { getPageContent } from "@/lib/get-content";

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Fetch global contact info for the floating buttons
    const content = await getPageContent("home");

    return (
        <>
            <Header />
            <main style={{ minHeight: "80vh" }}>
                {children}
            </main>
            <FloatingContactButtons
                phone={content.site_phone || ""}
                whatsapp={content.site_whatsapp || ""}
            />
            <Footer />
        </>
    );
}
