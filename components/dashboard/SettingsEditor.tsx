"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteSettingsSchema, type SiteSettingsInput } from "@/lib/validations";
import { updateSiteSettings, updateSocialLinks } from "@/actions/settings";

interface DbSettings { site_title: string; meta_description: string; favicon_url?: string; social_links?: { instagram?: string; facebook?: string; youtube?: string; whatsapp?: string }; }
interface Props { initialSettings: DbSettings | null; }

const inputStyle: React.CSSProperties = { width: "100%", padding: "0.75rem 1rem", background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "0.875rem", fontFamily: "system-ui", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", color: "#A0A0A0", fontSize: "0.8rem", fontWeight: 500, fontFamily: "system-ui", marginBottom: "0.5rem" };

export default function SettingsEditor({ initialSettings }: Props) {
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const defaults = initialSettings ?? { site_title: "Aksway Photography", meta_description: "Professional wedding photography in Honnavar, Karnataka." };

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SiteSettingsInput>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: defaults,
  });

  const metaDesc = watch("meta_description") ?? "";

  const notify = (type: "success" | "error", msg: string) => { setNotification({ type, msg }); setTimeout(() => setNotification(null), 3000); };

  const onSubmit = handleSubmit(async (data) => {
    setSaving(true);
    const result = await updateSiteSettings(data);
    setSaving(false);
    result.error ? notify("error", result.error) : notify("success", "Settings saved!");
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", maxWidth: "720px" }}>
      {notification && (
        <div style={{ padding: "0.875rem 1.25rem", background: notification.type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${notification.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: "8px", color: notification.type === "success" ? "#22C55E" : "#ef4444", fontSize: "0.875rem", fontFamily: "system-ui" }}>
          {notification.type === "success" ? "✅" : "❌"} {notification.msg}
        </div>
      )}

      {/* SEO Settings */}
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h2 style={{ color: "#E0E0E0", fontSize: "0.95rem", fontWeight: 700, fontFamily: "system-ui", margin: 0 }}>🔍 SEO Settings</h2>
          <div>
            <label style={labelStyle}>Site Title *</label>
            <input type="text" {...register("site_title")} placeholder="Aksway Photography | Wedding Photographer Honnavar" style={{ ...inputStyle, borderColor: errors.site_title ? "#ef4444" : "rgba(255,255,255,0.1)" }} />
            {errors.site_title && <p style={{ color: "#ef4444", fontSize: "0.75rem", fontFamily: "system-ui", marginTop: "0.25rem" }}>{errors.site_title.message}</p>}
            <p style={{ color: "#555", fontSize: "0.72rem", fontFamily: "system-ui", marginTop: "0.4rem" }}>Appears in the browser tab and Google search results</p>
          </div>
          <div>
            <label style={labelStyle}>
              Meta Description *
              <span style={{ color: metaDesc.length > 160 ? "#ef4444" : metaDesc.length > 140 ? "#F59E0B" : "#555", fontSize: "0.72rem", marginLeft: "0.5rem" }}>
                {metaDesc.length}/160
              </span>
            </label>
            <textarea
              {...register("meta_description")}
              rows={3}
              placeholder="Professional wedding photography in Honnavar, Karnataka. Candid, traditional, and cinematic coverage for your special day."
              style={{ ...inputStyle, resize: "vertical", borderColor: errors.meta_description ? "#ef4444" : "rgba(255,255,255,0.1)" }}
            />
            {errors.meta_description && <p style={{ color: "#ef4444", fontSize: "0.75rem", fontFamily: "system-ui", marginTop: "0.25rem" }}>{errors.meta_description.message}</p>}
            <p style={{ color: "#555", fontSize: "0.72rem", fontFamily: "system-ui", marginTop: "0.35rem" }}>Appears in Google search results under the site title. Keep it under 160 characters.</p>
          </div>
          <button type="submit" disabled={saving} style={{ alignSelf: "flex-start", padding: "0.6rem 1.5rem", background: saving ? "#B8912F" : "#D4AF37", border: "none", borderRadius: "8px", color: "#000", fontWeight: 700, fontSize: "0.875rem", fontFamily: "system-ui", cursor: saving ? "not-allowed" : "pointer" }}>
            {saving ? "Saving..." : "Save SEO Settings"}
          </button>
        </div>
      </form>

      {/* Info panel */}
      <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        <h2 style={{ color: "#E0E0E0", fontSize: "0.95rem", fontWeight: 700, fontFamily: "system-ui", margin: 0 }}>ℹ️ Account & System</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            { label: "Change Admin Password", note: "Go to Supabase Dashboard → Authentication → Users → Reset password", icon: "🔑" },
            { label: "Database Migrations", note: "SQL files are in /supabase/migrations/ — run in Supabase SQL Editor", icon: "🗄️" },
            { label: "Media Storage", note: "All uploaded files are in Supabase Storage → aksway-media bucket", icon: "📦" },
            { label: "Deployment", note: "Deploy to Vercel: connect GitHub repo → set environment variables", icon: "🚀" },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", gap: "0.875rem", padding: "0.875rem", background: "#1A1A1A", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontSize: "1.25rem", lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ color: "#E0E0E0", fontSize: "0.85rem", fontWeight: 600, fontFamily: "system-ui" }}>{item.label}</div>
                <div style={{ color: "#666", fontSize: "0.78rem", fontFamily: "system-ui", marginTop: "3px" }}>{item.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
