"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { footerContentSchema, type FooterContent } from "@/lib/validations";
import { saveDraft, saveAndPublishSection } from "@/actions/sections";
import PublishBar from "@/components/dashboard/PublishBar";

interface Props { initialContent: FooterContent; hasDraft: boolean; publishedAt: string | null; }

const inputStyle: React.CSSProperties = { width: "100%", padding: "0.75rem 1rem", background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "0.875rem", fontFamily: "system-ui", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", color: "#A0A0A0", fontSize: "0.8rem", fontWeight: 500, fontFamily: "system-ui", marginBottom: "0.5rem" };

export default function FooterEditor({ initialContent, hasDraft, publishedAt }: Props) {
  const [quickLinks, setQuickLinks] = useState(initialContent.quick_links);
  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkHref, setNewLinkHref] = useState("");
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FooterContent>({
    resolver: zodResolver(footerContentSchema),
    defaultValues: initialContent,
  });

  const notify = (type: "success" | "error", msg: string) => { setNotification({ type, msg }); setTimeout(() => setNotification(null), 3000); };

  const addLink = () => {
    if (!newLinkLabel.trim() || !newLinkHref.trim()) return;
    setQuickLinks([...quickLinks, { label: newLinkLabel.trim(), href: newLinkHref.trim() }]);
    setNewLinkLabel(""); setNewLinkHref("");
  };

  const removeLink = (idx: number) => setQuickLinks(quickLinks.filter((_, i) => i !== idx));

  const buildPayload = (data: FooterContent) => ({ ...data, quick_links: quickLinks });

  const onSaveDraft = handleSubmit(async (data) => {
    setSaving(true);
    const result = await saveDraft("footer", buildPayload(data) as unknown as Record<string, unknown>);
    setSaving(false);
    result.error ? notify("error", result.error) : notify("success", "Draft saved!");
  });

  const onPublish = handleSubmit(async (data) => {
    setSaving(true);
    const result = await saveAndPublishSection("footer", buildPayload(data) as unknown as Record<string, unknown>);
    setSaving(false);
    result.error ? notify("error", result.error) : notify("success", "Footer published!");
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "760px" }}>
      {notification && (
        <div style={{ padding: "0.875rem 1.25rem", background: notification.type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${notification.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: "8px", color: notification.type === "success" ? "#22C55E" : "#ef4444", fontSize: "0.875rem", fontFamily: "system-ui" }}>
          {notification.type === "success" ? "✅" : "❌"} {notification.msg}
        </div>
      )}

      <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Text content */}
        <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ color: "#A0A0A0", fontSize: "0.8rem", fontWeight: 600, fontFamily: "system-ui", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>Text Content</h3>
          <div>
            <label style={labelStyle}>Copyright Text *</label>
            <input type="text" {...register("copyright_text")} placeholder="© 2025 Aksway Photography. All rights reserved." style={{ ...inputStyle, borderColor: errors.copyright_text ? "#ef4444" : "rgba(255,255,255,0.1)" }} />
          </div>
          <div>
            <label style={labelStyle}>Tagline</label>
            <input type="text" {...register("tagline")} placeholder="Capturing Love Stories in Honnavar" style={inputStyle} />
          </div>
        </div>

        {/* Social links */}
        <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ color: "#A0A0A0", fontSize: "0.8rem", fontWeight: 600, fontFamily: "system-ui", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>Social Media Links</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>📸 Instagram URL</label>
              <input type="url" {...register("social_links.instagram")} placeholder="https://instagram.com/aksway" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>👤 Facebook URL</label>
              <input type="url" {...register("social_links.facebook")} placeholder="https://facebook.com/aksway" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>🎬 YouTube URL</label>
              <input type="url" {...register("social_links.youtube")} placeholder="https://youtube.com/@aksway" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>💬 WhatsApp Link</label>
              <input type="url" {...register("social_links.whatsapp")} placeholder="https://wa.me/919XXXXXXXXX" style={inputStyle} />
            </div>
          </div>
        </div>
      </form>

      {/* Quick links */}
      <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 style={{ color: "#A0A0A0", fontSize: "0.8rem", fontWeight: 600, fontFamily: "system-ui", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>Quick Navigation Links</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {quickLinks.map((link, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0.875rem", background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "7px" }}>
              <span style={{ flex: 1, color: "#E0E0E0", fontSize: "0.85rem", fontFamily: "system-ui" }}>{link.label}</span>
              <span style={{ color: "#666", fontSize: "0.8rem", fontFamily: "system-ui" }}>{link.href}</span>
              <button type="button" onClick={() => removeLink(idx)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "5px", color: "#ef4444", fontSize: "0.75rem", padding: "2px 8px", cursor: "pointer", fontFamily: "system-ui" }}>✕</button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <input type="text" value={newLinkLabel} onChange={e => setNewLinkLabel(e.target.value)} placeholder="Label (e.g. Portfolio)" style={{ ...inputStyle, flex: 1 }} />
          <input type="text" value={newLinkHref} onChange={e => setNewLinkHref(e.target.value)} placeholder="Link (e.g. #portfolio)" style={{ ...inputStyle, flex: 1 }} />
          <button type="button" onClick={addLink} style={{ padding: "0.5rem 1rem", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "7px", color: "#D4AF37", fontFamily: "system-ui", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>+ Add</button>
        </div>
      </div>

      <PublishBar hasDraft={hasDraft} lastPublished={publishedAt} onSaveDraft={onSaveDraft} onPublish={onPublish} saving={saving} />
    </div>
  );
}
