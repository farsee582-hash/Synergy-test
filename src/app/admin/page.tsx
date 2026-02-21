"use client";

import { useSession, signOut } from "next-auth/react";

export default function AdminDashboard() {
    const { data: session } = useSession();

    return (
        <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Dashboard</h1>
            <p style={{ marginBottom: "2rem" }}>Welcome back, <strong>{session?.user?.email}</strong></p>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem"
            }}>
                {/* Placeholder Stats Cards */}
                <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "#6b7280" }}>Total Messages</h3>
                    <p style={{ fontSize: "2rem", fontWeight: "bold" }}>0</p>
                </div>
                <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "#6b7280" }}>Blog Posts</h3>
                    <p style={{ fontSize: "2rem", fontWeight: "bold" }}>0</p>
                </div>
            </div>

            <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                style={{
                    marginTop: "2rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                Sign Out
            </button>
        </div>
    );
}
