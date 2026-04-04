"use client";

import { logout } from "@/actions/auth";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/hero": "Hero Section",
  "/dashboard/about": "About / Story",
  "/dashboard/services": "Services",
  "/dashboard/portfolio": "Portfolio & Gallery",
  "/dashboard/packages": "Packages & Pricing",
  "/dashboard/testimonials": "Testimonials",
  "/dashboard/reels": "Instagram Reels",
  "/dashboard/contact": "Contact",
  "/dashboard/footer": "Footer",
  "/dashboard/settings": "Settings",
};

export default function DashboardHeader({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <header
      style={{
        height: "64px",
        background: "#111111",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Page title */}
      <h1
        style={{
          color: "#fff",
          fontSize: "1.1rem",
          fontWeight: 700,
          fontFamily: "system-ui",
          margin: 0,
        }}
      >
        {title}
      </h1>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* User email */}
        <span
          style={{
            color: "#666",
            fontSize: "0.8rem",
            fontFamily: "system-ui",
          }}
        >
          {userEmail}
        </span>

        {/* Logout */}
        <form action={logout}>
          <button
            type="submit"
            style={{
              padding: "0.4rem 1rem",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              color: "#A0A0A0",
              fontSize: "0.8rem",
              fontFamily: "system-ui",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            Sign Out
          </button>
        </form>
      </div>
    </header>
  );
}
