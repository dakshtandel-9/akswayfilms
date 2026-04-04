"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactContentSchema, type ContactContent } from "@/lib/validations";
import { saveDraft, saveAndPublishSection } from "@/actions/sections";
import PublishBar from "@/components/dashboard/PublishBar";

interface Props { initialContent: ContactContent; hasDraft: boolean; publishedAt: string | null; }

const inputStyle: React.CSSProperties = { width: "100%", padding: "0.75rem 1rem", background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "0.875rem", fontFamily: "system-ui", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", color: "#A0A0A0", fontSize: "0.8rem", fontWeight: 500, fontFamily: "system-ui", marginBottom: "0.5rem" };

export default function ContactEditor({ initialContent, hasDraft, publishedAt }: Props) {
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactContent>({
    resolver: zodResolver(contactContentSchema),
    defaultValues: initialContent,
  });

  const notify = (type: "success" | "error", msg: string) => { setNotification({ type, msg }); setTimeout(() => setNotification(null), 3000); };

  const onSaveDraft = handleSubmit(async (data) => {
    setSaving(true);
    const result = await saveDraft("contact", data as unknown as Record<string, unknown>);
    setSaving(false);
    result.error ? notify("error", result.error) : notify("success", "Draft saved!");
  });

  const onPublish = handleSubmit(async (data) => {
    setSaving(true);
    const result = await saveAndPublishSection("contact", data as unknown as Record<string, unknown>);
    setSaving(false);
    result.error ? notify("error", result.error) : notify("success", "Contact section published!");
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "760px" }}>
      {notification && (
        <div style={{ padding: "0.875rem 1.25rem", background: notification.type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${notification.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: "8px", color: notification.type === "success" ? "#22C55E" : "#ef4444", fontSize: "0.875rem", fontFamily: "system-ui" }}>
          {notification.type === "success" ? "✅" : "❌"} {notification.msg}
        </div>
      )}

      <form style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Headlines */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Section Headline *</label>
            <input type="text" {...register("headline")} placeholder="Let's Connect" style={{ ...inputStyle, borderColor: errors.headline ? "#ef4444" : "rgba(255,255,255,0.1)" }} />
          </div>
          <div>
            <label style={labelStyle}>Subheadline</label>
            <input type="text" {...register("subheadline")} placeholder="Reach out to book your date" style={inputStyle} />
          </div>
        </div>

        {/* Contact details */}
        <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ color: "#A0A0A0", fontSize: "0.8rem", fontWeight: 600, fontFamily: "system-ui", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>📞 Contact Details</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input type="tel" {...register("phone")} placeholder="+91 98765 43210" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>WhatsApp Number</label>
              <input type="text" {...register("whatsapp")} placeholder="919876543210 (with country code, no +)" style={inputStyle} />
              <p style={{ color: "#555", fontSize: "0.72rem", fontFamily: "system-ui", marginTop: "0.25rem" }}>Format: 919XXXXXXXXX (no + or spaces)</p>
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input type="email" {...register("email")} placeholder="hello@aksway.in" style={{ ...inputStyle, borderColor: errors.email ? "#ef4444" : "rgba(255,255,255,0.1)" }} />
              {errors.email && <p style={{ color: "#ef4444", fontSize: "0.75rem", fontFamily: "system-ui", marginTop: "0.25rem" }}>{errors.email.message}</p>}
            </div>
            <div>
              <label style={labelStyle}>Contact Form Recipient Email</label>
              <input type="email" {...register("form_recipient_email")} placeholder="studio@aksway.in" style={inputStyle} />
              <p style={{ color: "#555", fontSize: "0.72rem", fontFamily: "system-ui", marginTop: "0.25rem" }}>Enquiry form submissions go to this email</p>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Studio Address</label>
            <textarea {...register("address")} rows={2} placeholder="Studio address, Honnavar, Karnataka 581334" style={{ ...inputStyle, resize: "vertical" }} />
          </div>
        </div>

        {/* Google Maps */}
        <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "1.25rem" }}>
          <h3 style={{ color: "#A0A0A0", fontSize: "0.8rem", fontWeight: 600, fontFamily: "system-ui", margin: "0 0 0.75rem 0", textTransform: "uppercase", letterSpacing: "0.08em" }}>🗺️ Google Maps Embed</h3>
          <label style={labelStyle}>Maps Embed URL</label>
          <input type="url" {...register("maps_embed_url")} placeholder="https://www.google.com/maps/embed?pb=..." style={inputStyle} />
          <p style={{ color: "#555", fontSize: "0.72rem", fontFamily: "system-ui", marginTop: "0.4rem" }}>
            Go to Google Maps → Share → Embed a map → Copy the src URL from the iframe code
          </p>
        </div>
      </form>

      <PublishBar hasDraft={hasDraft} lastPublished={publishedAt} onSaveDraft={onSaveDraft} onPublish={onPublish} saving={saving} />
    </div>
  );
}
