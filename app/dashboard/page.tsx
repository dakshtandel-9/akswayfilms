import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const SECTIONS = [
  { slug: "hero", label: "Hero Section", icon: "🖼️", href: "/dashboard/hero" },
  { slug: "about", label: "About / Story", icon: "👤", href: "/dashboard/about" },
  { slug: "portfolio", label: "Portfolio", icon: "📸", href: "/dashboard/portfolio" },
  { slug: "packages", label: "Packages & Pricing", icon: "💰", href: "/dashboard/packages" },
  { slug: "testimonials", label: "Testimonials", icon: "⭐", href: "/dashboard/testimonials" },
  { slug: "reels", label: "Instagram Reels", icon: "📱", href: "/dashboard/reels" },
  { slug: "contact", label: "Contact", icon: "📞", href: "/dashboard/contact" },
  { slug: "footer", label: "Footer", icon: "🔗", href: "/dashboard/footer" },
];

export default async function DashboardHome() {
  const supabase = await createClient();
  const { data: sections } = await supabase.from("sections").select("slug, has_draft, published_at").in("slug", SECTIONS.map(s => s.slug));
  const { data: packages } = await supabase.from("packages").select("id", { count: "exact", head: true });
  const { data: testimonials } = await supabase.from("testimonials").select("id", { count: "exact", head: true });
  const { data: media } = await supabase.from("media").select("id", { count: "exact", head: true });

  const sectionMap = Object.fromEntries((sections ?? []).map(s => [s.slug, s]));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Welcome */}
      <div>
        <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700, fontFamily: "system-ui", marginBottom: "0.5rem" }}>
          Welcome back 👋
        </h2>
        <p style={{ color: "#666", fontFamily: "system-ui", fontSize: "0.875rem" }}>
          Manage your website content, photos, and packages from here.
        </p>
      </div>

      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
        {[
          { label: "Packages", value: packages?.length ?? 0, icon: "💰", href: "/dashboard/packages" },
          { label: "Testimonials", value: testimonials?.length ?? 0, icon: "⭐", href: "/dashboard/testimonials" },
          { label: "Media Files", value: media?.length ?? 0, icon: "📷", href: "/dashboard/portfolio" },
          { label: "Sections", value: SECTIONS.length, icon: "📄", href: "#sections" },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            style={{
              textDecoration: "none",
              display: "block",
              background: "#1A1A1A",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px",
              padding: "1.25rem",
              transition: "border-color 0.2s",
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{stat.icon}</div>
            <div style={{ color: "#D4AF37", fontSize: "1.75rem", fontWeight: 800, fontFamily: "system-ui" }}>
              {stat.value}
            </div>
            <div style={{ color: "#666", fontSize: "0.8rem", fontFamily: "system-ui" }}>{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Section status grid */}
      <div>
        <h3 style={{ color: "#A0A0A0", fontSize: "0.8rem", fontWeight: 600, fontFamily: "system-ui", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
          Section Status
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "0.75rem" }}>
          {SECTIONS.map((section) => {
            const data = sectionMap[section.slug];
            const hasDraft = data?.has_draft;
            const published = data?.published_at;
            return (
              <Link
                key={section.slug}
                href={section.href}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  padding: "1rem 1.25rem",
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "10px",
                  transition: "border-color 0.2s",
                }}
              >
                <span style={{ fontSize: "1.25rem" }}>{section.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#E0E0E0", fontSize: "0.875rem", fontFamily: "system-ui", fontWeight: 500 }}>
                    {section.label}
                  </div>
                  <div style={{ color: "#555", fontSize: "0.72rem", fontFamily: "system-ui", marginTop: "2px" }}>
                    {hasDraft ? "⚠️ Unpublished draft" : published ? "✅ Published" : "○ Not set up"}
                  </div>
                </div>
                <span style={{ color: "#444", fontSize: "0.9rem" }}>→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
