import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found — Trattorias Varkala", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: 12 }}>404</h1>
      <p style={{ marginBottom: 24, color: "#6b7a70" }}>Page not found</p>
      <Link href="/" style={{ background: "#2a9d8f", color: "#fff", padding: "10px 24px", borderRadius: 999, fontWeight: 500 }}>
        Return Home
      </Link>
    </div>
  );
}

