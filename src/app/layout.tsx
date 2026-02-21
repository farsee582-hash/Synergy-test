import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora, Outfit, Manrope, Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const font = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Synergy Hub | Banking & Accounting Solutions",
  description: "Seamless Banking & Accounting Solutions in UAE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable}`} suppressHydrationWarning={true}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
