"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { saveDraft, saveAndPublishSection } from "@/actions/sections";
import PublishBar from "@/components/dashboard/PublishBar";
import type { HeroSlide, HeroContent } from "@/lib/validations";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE_BYTES } from "@/lib/constants";

interface HeroEditorProps {
  initialContent: HeroContent;
  hasDraft: boolean;
  publishedAt: string | null;
}

const emptySlide = (): HeroSlide => ({
  id: String(Date.now() + Math.random()),
  image_url: "",
  alt_text: "",
  headline: "",
  subheadline: "",
  cta_text: "",
  cta_link: "",
});

export default function HeroEditor({ initialContent, hasDraft, publishedAt }: HeroEditorProps) {
  const [slides, setSlides] = useState<HeroSlide[]>(
    initialContent.slides?.length ? initialContent.slides : [emptySlide()]
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const notify = (type: "success" | "error", msg: string) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 3500);
  };

  const updateSlide = (id: string, updates: Partial<HeroSlide>) => {
    setSlides(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const addSlide = () => {
    const newSlide = emptySlide();
    setSlides(prev => [...prev, newSlide]);
    setActiveSlide(slides.length);
  };

  const removeSlide = (id: string) => {
    if (slides.length === 1) { notify("error", "You must have at least one slide."); return; }
    const idx = slides.findIndex(s => s.id === id);
    setSlides(prev => prev.filter(s => s.id !== id));
    setActiveSlide(Math.max(0, idx - 1));
  };

  const handleImageUpload = async (slideId: string, file: File) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      notify("error", "Unsupported file type. Use JPG, PNG, or WebP.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      notify("error", "File too large. Max 10MB.");
      return;
    }

    setUploadingId(slideId);
    setUploadProgress(10);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `hero/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      setUploadProgress(30);
      const { data, error } = await supabase.storage
        .from("aksway-media")
        .upload(path, file, { contentType: file.type });

      if (error) throw new Error(error.message);
      setUploadProgress(80);

      const { data: urlData } = supabase.storage.from("aksway-media").getPublicUrl(data.path);
      updateSlide(slideId, { image_url: urlData.publicUrl });
      setUploadProgress(100);
      notify("success", "Image uploaded!");
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingId(null);
      setTimeout(() => setUploadProgress(0), 800);
    }
  };

  const payload = (): HeroContent => ({ slides });

  const onSaveDraft = async () => {
    setSaving(true);
    const result = await saveDraft("hero", payload() as unknown as Record<string, unknown>);
    setSaving(false);
    result.error ? notify("error", result.error) : notify("success", "Draft saved!");
  };

  const onPublish = async () => {
    if (slides.some(s => !s.image_url)) {
      notify("error", "All slides must have an image before publishing.");
      return;
    }
    if (slides.some(s => !s.headline.trim())) {
      notify("error", "All slides must have a headline before publishing.");
      return;
    }
    setSaving(true);
    const result = await saveAndPublishSection("hero", payload() as unknown as Record<string, unknown>);
    setSaving(false);
    result.error ? notify("error", result.error) : notify("success", "Hero section published!");
  };

  const current = slides[activeSlide] ?? slides[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "820px" }}>
      {/* Notification */}
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

      {/* Slide tabs */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setActiveSlide(idx)}
            style={{
              padding: "0.45rem 1rem",
              borderRadius: "8px",
              border: activeSlide === idx ? "1px solid #D4AF37" : "1px solid rgba(255,255,255,0.1)",
              background: activeSlide === idx ? "rgba(212,175,55,0.15)" : "transparent",
              color: activeSlide === idx ? "#D4AF37" : "#666",
              fontSize: "0.8rem",
              fontFamily: "system-ui",
              fontWeight: activeSlide === idx ? 600 : 400,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {slide.image_url ? (
              <img src={slide.image_url} alt="" style={{ width: "20px", height: "20px", borderRadius: "3px", objectFit: "cover" }} />
            ) : (
              <span style={{ width: "20px", height: "20px", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.06)", borderRadius: "3px", fontSize: "0.7rem" }}>📷</span>
            )}
            Slide {idx + 1}
          </button>
        ))}
        <button
          onClick={addSlide}
          style={{
            padding: "0.45rem 0.875rem",
            borderRadius: "8px",
            border: "1px dashed rgba(255,255,255,0.15)",
            background: "transparent",
            color: "#555",
            fontSize: "0.8rem",
            fontFamily: "system-ui",
            cursor: "pointer",
          }}
        >
          + Add Slide
        </button>
      </div>

      {/* Slide editor */}
      {current && (
        <div style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ color: "#E0E0E0", fontSize: "0.9rem", fontWeight: 600, fontFamily: "system-ui", margin: 0 }}>
              Slide {activeSlide + 1} of {slides.length}
            </h3>
            {slides.length > 1 && (
              <button onClick={() => removeSlide(current.id)} style={{ padding: "0.3rem 0.875rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "6px", color: "#ef4444", fontSize: "0.78rem", fontFamily: "system-ui", cursor: "pointer" }}>
                Remove Slide
              </button>
            )}
          </div>

          {/* Image upload */}
          <div>
            <label style={labelStyle}>Background Image *</label>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              style={{ display: "none" }}
              onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(current.id, f); e.target.value = ""; }}
            />
            <div
              onClick={() => uploadingId === null && fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${uploadingId === current.id ? "#D4AF37" : current.image_url ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)"}`,
                borderRadius: "10px",
                overflow: "hidden",
                cursor: uploadingId !== null ? "not-allowed" : "pointer",
                background: "#161616",
                position: "relative",
                minHeight: "160px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s",
              }}
            >
              {current.image_url ? (
                <img
                  src={current.image_url}
                  alt={current.alt_text || "slide preview"}
                  style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
                />
              ) : (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🖼️</div>
                  <div style={{ color: "#A0A0A0", fontSize: "0.875rem", fontFamily: "system-ui" }}>
                    <span style={{ color: "#D4AF37" }}>Click to upload</span> a background image
                  </div>
                  <div style={{ color: "#555", fontSize: "0.75rem", fontFamily: "system-ui", marginTop: "0.25rem" }}>
                    JPG, PNG, WebP — max 10MB — recommended 1920×1080px
                  </div>
                </div>
              )}

              {/* Upload progress overlay */}
              {uploadingId === current.id && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
                  <div style={{ color: "#D4AF37", fontFamily: "system-ui", fontSize: "0.875rem" }}>Uploading... {uploadProgress}%</div>
                  <div style={{ width: "160px", height: "4px", background: "#333", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${uploadProgress}%`, background: "#D4AF37", transition: "width 0.3s" }} />
                  </div>
                </div>
              )}

              {/* Replace badge */}
              {current.image_url && uploadingId === null && (
                <div style={{ position: "absolute", bottom: "0.5rem", right: "0.5rem", background: "rgba(0,0,0,0.8)", color: "#D4AF37", padding: "0.3rem 0.75rem", borderRadius: "6px", fontSize: "0.75rem", fontFamily: "system-ui" }}>
                  Click to replace
                </div>
              )}
            </div>
          </div>

          {/* Alt text */}
          <div>
            <label style={labelStyle}>Alt Text (for accessibility & SEO)</label>
            <input
              type="text"
              value={current.alt_text ?? ""}
              onChange={e => updateSlide(current.id, { alt_text: e.target.value })}
              placeholder="Wedding couple at golden hour sunset"
              style={inputStyle}
            />
          </div>

          {/* Headline */}
          <div>
            <label style={labelStyle}>Main Heading *</label>
            <input
              type="text"
              value={current.headline}
              onChange={e => updateSlide(current.id, { headline: e.target.value })}
              placeholder="Capturing Your Eternal Moments"
              style={{ ...inputStyle, borderColor: !current.headline.trim() ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)" }}
            />
          </div>

          {/* Subheadline */}
          <div>
            <label style={labelStyle}>Sub Heading</label>
            <input
              type="text"
              value={current.subheadline ?? ""}
              onChange={e => updateSlide(current.id, { subheadline: e.target.value })}
              placeholder="Professional Wedding Photography in Honnavar"
              style={inputStyle}
            />
          </div>

          {/* CTA */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Button Text</label>
              <input
                type="text"
                value={current.cta_text ?? ""}
                onChange={e => updateSlide(current.id, { cta_text: e.target.value })}
                placeholder="View Our Work"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Button Link</label>
              <input
                type="text"
                value={current.cta_link ?? ""}
                onChange={e => updateSlide(current.id, { cta_link: e.target.value })}
                placeholder="#portfolio"
                style={inputStyle}
              />
            </div>
          </div>
        </div>
      )}

      {/* Slides summary thumbnails */}
      {slides.length > 1 && (
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              onClick={() => setActiveSlide(idx)}
              style={{
                width: "80px",
                height: "54px",
                borderRadius: "6px",
                overflow: "hidden",
                border: activeSlide === idx ? "2px solid #D4AF37" : "2px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
                background: "#111",
                flexShrink: 0,
              }}
            >
              {slide.image_url ? (
                <img src={slide.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#444", fontSize: "1.25rem" }}>📷</div>
              )}
            </div>
          ))}
        </div>
      )}

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

const labelStyle: React.CSSProperties = {
  display: "block", color: "#A0A0A0", fontSize: "0.8rem", fontWeight: 500,
  fontFamily: "system-ui", marginBottom: "0.5rem",
};
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.75rem 1rem", background: "#161616",
  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff",
  fontSize: "0.875rem", fontFamily: "system-ui", outline: "none", boxSizing: "border-box",
};
