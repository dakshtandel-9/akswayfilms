"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { aboutContentSchema, type AboutContent } from "@/lib/validations";
import { saveDraft, saveAndPublishSection } from "@/actions/sections";
import ImageUploader from "@/components/dashboard/ImageUploader";
import PublishBar from "@/components/dashboard/PublishBar";

interface AboutEditorProps {
  initialContent: AboutContent;
  hasDraft: boolean;
  publishedAt: string | null;
}

export default function AboutEditor({ initialContent, hasDraft, publishedAt }: AboutEditorProps) {
  const [photoUrl, setPhotoUrl] = useState(initialContent.photo_url ?? "");
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<AboutContent>({
    resolver: zodResolver(aboutContentSchema),
    defaultValues: initialContent,
  });

  const notify = (type: "success" | "error", msg: string) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 3000);
  };

  const buildPayload = (data: AboutContent) => ({ ...data, photo_url: photoUrl });

  const onSaveDraft = handleSubmit(async (data) => {
    setSaving(true);
    const result = await saveDraft("about", buildPayload(data) as unknown as Record<string, unknown>);
    setSaving(false);
    result.error ? notify("error", result.error) : notify("success", "Draft saved!");
  });

  const onPublish = handleSubmit(async (data) => {
    setSaving(true);
    const result = await saveAndPublishSection("about", buildPayload(data) as unknown as Record<string, unknown>);
    setSaving(false);
    result.error ? notify("error", result.error) : notify("success", "About section published!");
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "760px" }}>
      {notification && (
        <div style={{
          padding: "0.875rem 1.25rem",
          background: notification.type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
          border: `1px solid ${notification.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
          borderRadius: "8px",
          color: notification.type === "success" ? "#22C55E" : "#ef4444",
          fontSize: "0.875rem", fontFamily: "system-ui",
        }}>
          {notification.type === "success" ? "✅" : "❌"} {notification.msg}
        </div>
      )}

      <form style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Photographer photo */}
        <ImageUploader
          label="Photographer Photo"
          currentUrl={photoUrl}
          folder="about"
          onUploadComplete={(url) => setPhotoUrl(url)}
          hint="Your professional headshot or action photo — JPG/WebP, max 10MB"
        />

        {/* Alt text */}
        <div>
          <label style={labelStyle}>Photo Alt Text</label>
          <input type="text" {...register("photo_alt")} placeholder="Wedding photographer Honnavar" style={inputStyle} />
        </div>

        {/* Headline */}
        <div>
          <label style={labelStyle}>Section Headline *</label>
          <input
            type="text"
            {...register("headline")}
            placeholder="Our Story"
            style={{ ...inputStyle, borderColor: errors.headline ? "#ef4444" : "rgba(255,255,255,0.1)" }}
          />
          {errors.headline && <p style={errorStyle}>{errors.headline.message}</p>}
        </div>

        {/* Bio */}
        <div>
          <label style={labelStyle}>Bio / About Text *</label>
          <textarea
            {...register("bio")}
            placeholder="Tell your story here..."
            rows={6}
            style={{ ...inputStyle, resize: "vertical", borderColor: errors.bio ? "#ef4444" : "rgba(255,255,255,0.1)" }}
          />
          {errors.bio && <p style={errorStyle}>{errors.bio.message}</p>}
        </div>

        {/* Years + Location */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Years of Experience</label>
            <input type="number" {...register("years_experience")} placeholder="5" min={0} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Location</label>
            <input type="text" {...register("location")} placeholder="Honnavar, Karnataka" style={inputStyle} />
          </div>
        </div>
      </form>

      <PublishBar
        hasDraft={hasDraft}
        lastPublished={publishedAt}
        onSaveDraft={onSaveDraft}
        onPublish={onPublish}
        saving={saving}
      />
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", color: "#A0A0A0", fontSize: "0.8rem", fontWeight: 500, fontFamily: "system-ui", marginBottom: "0.5rem" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "0.75rem 1rem", background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "0.875rem", fontFamily: "system-ui", outline: "none", boxSizing: "border-box" };
const errorStyle: React.CSSProperties = { color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem", fontFamily: "system-ui" };
