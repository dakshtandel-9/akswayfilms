"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: "🏠", exact: true },
  { href: "/dashboard/hero", label: "Hero Section", icon: "🖼️" },
  { href: "/dashboard/about", label: "About / Story", icon: "👤" },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: "📸" },
  { href: "/dashboard/packages", label: "Packages & Pricing", icon: "💰" },
  { href: "/dashboard/testimonials", label: "Testimonials", icon: "⭐" },
  { href: "/dashboard/reels", label: "Reels / Instagram", icon: "📱" },
  { href: "/dashboard/contact", label: "Contact", icon: "📞" },
  { href: "/dashboard/footer", label: "Footer", icon: "🔗" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside
      style={{
        width: "260px",
        minWidth: "260px",
        background: "#111111",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflowY: "auto",
      }}
    >
      {/* Brand */}
      <div
        style={{
          padding: "1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            background: "linear-gradient(135deg, #D4AF37, #B8912F)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            flexShrink: 0,
          }}
        >
          📷
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", fontFamily: "system-ui" }}>
            Aksway Admin
          </div>
          <div style={{ color: "#666", fontSize: "0.7rem" }}>Content Manager</div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "2px" }}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.625rem 0.875rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontFamily: "system-ui",
                fontWeight: active ? 600 : 400,
                color: active ? "#D4AF37" : "#A0A0A0",
                background: active ? "rgba(212,175,55,0.1)" : "transparent",
                border: active ? "1px solid rgba(212,175,55,0.2)" : "1px solid transparent",
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ fontSize: "1rem", lineHeight: 1 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Visit site link */}
      <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.625rem 0.875rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontFamily: "system-ui",
            color: "#666",
            border: "1px solid rgba(255,255,255,0.06)",
            transition: "all 0.15s ease",
          }}
        >
          <span>🌐</span> View Live Site ↗
        </a>
      </div>
    </aside>
  );
}
