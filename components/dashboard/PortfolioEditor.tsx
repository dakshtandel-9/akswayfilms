"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { saveMediaRecord, deleteMedia, updateMediaMeta } from "@/actions/media";
import { saveAndPublishSection } from "@/actions/sections";
import { MEDIA_CATEGORIES, ACCEPTED_IMAGE_TYPES, ACCEPTED_VIDEO_TYPES, MAX_IMAGE_SIZE_BYTES, MAX_VIDEO_SIZE_BYTES } from "@/lib/constants";
import type { PortfolioContent } from "@/lib/validations";

interface MediaItem {
  id: string;
  file_name: string;
  storage_path: string;
  public_url: string;
  media_type: "image" | "video";
  category: string;
  alt_text: string;
  sort_order: number;
  file_size_bytes: number;
}
interface Props { initialContent: PortfolioContent; initialMedia: MediaItem[]; hasDraft: boolean; publishedAt: string | null; }

export default function PortfolioEditor({ initialContent, initialMedia, hasDraft, publishedAt }: Props) {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [headline, setHeadline] = useState(initialContent.headline);
  const [subheadline, setSubheadline] = useState(initialContent.subheadline ?? "");
  const [showFilter, setShowFilter] = useState(initialContent.show_category_filter);
  const [activeCategory, setActiveCategory] = useState("all");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const notify = (type: "success" | "error", msg: string) => { setNotification({ type, msg }); setTimeout(() => setNotification(null), 3500); };

  const handleFileUpload = async (files: FileList, category: string) => {
    setUploading(true);
    const supabase = createClient();
    const total = files.length;
    let done = 0;

    for (const file of Array.from(files)) {
      const isImage = ACCEPTED_IMAGE_TYPES.includes(file.type);
      const isVideo = ACCEPTED_VIDEO_TYPES.includes(file.type as string);
      if (!isImage && !isVideo) { notify("error", `Skipped ${file.name} — unsupported type`); done++; continue; }
      if (isImage && file.size > MAX_IMAGE_SIZE_BYTES) { notify("error", `${file.name} is too large (max 10MB)`); done++; continue; }
      if (isVideo && file.size > MAX_VIDEO_SIZE_BYTES) { notify("error", `${file.name} is too large (max 100MB)`); done++; continue; }

      const ext = file.name.split(".").pop();
      const storagePath = `portfolio/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { data, error } = await supabase.storage.from("aksway-media").upload(storagePath, file, { contentType: file.type });
      if (error) { notify("error", `Failed to upload ${file.name}`); done++; continue; }

      const { data: urlData } = supabase.storage.from("aksway-media").getPublicUrl(data.path);
      const result = await saveMediaRecord(urlData.publicUrl, storagePath, file.name, isImage ? "image" : "video", file.size, {
        category: category as "wedding" | "haldi" | "prewedding" | "cinematic" | "other" | "general",
        alt_text: "",
        sort_order: media.length + done,
      });
      if (result.success && result.media) {
        setMedia(prev => [...prev, result.media as MediaItem]);
      }
      done++;
      setUploadProgress(Math.round((done / total) * 100));
    }
    setUploading(false);
    setUploadProgress(0);
    notify("success", `${done} file(s) uploaded successfully!`);
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Delete "${item.file_name}"? This cannot be undone.`)) return;
    const result = await deleteMedia(item.id, item.storage_path);
    if (result.error) { notify("error", result.error); return; }
    setMedia(prev => prev.filter(m => m.id !== item.id));
    notify("success", "File deleted.");
  };

  const handleAltChange = async (id: string, alt: string) => {
    await updateMediaMeta(id, { alt_text: alt });
    setMedia(prev => prev.map(m => m.id === id ? { ...m, alt_text: alt } : m));
  };

  const handleCategoryChange = async (id: string, category: string) => {
    await updateMediaMeta(id, { category });
    setMedia(prev => prev.map(m => m.id === id ? { ...m, category } : m));
  };

  const onPublish = async () => {
    setSaving(true);
    const result = await saveAndPublishSection("portfolio", { headline, subheadline, show_category_filter: showFilter });
    setSaving(false);
    result.error ? notify("error", result.error) : notify("success", "Portfolio settings published!");
  };

  const filtered = activeCategory === "all" ? media : media.filter(m => m.category === activeCategory);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {notification && (
        <div style={{ padding: "0.875rem 1.25rem", background: notification.type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${notification.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: "8px", color: notification.type === "success" ? "#22C55E" : "#ef4444", fontSize: "0.875rem", fontFamily: "system-ui" }}>
          {notification.type === "success" ? "✅" : "❌"} {notification.msg}
        </div>
      )}

      {/* Section settings */}
      <div style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 style={{ color: "#E0E0E0", fontSize: "0.9rem", fontWeight: 600, fontFamily: "system-ui", margin: 0 }}>Section Settings</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Headline</label>
            <input type="text" value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Our Work" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Subheadline</label>
            <input type="text" value={subheadline} onChange={e => setSubheadline(e.target.value)} placeholder="A glimpse into our stories" style={inputStyle} />
          </div>
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <input type="checkbox" checked={showFilter} onChange={e => setShowFilter(e.target.checked)} style={{ accentColor: "#D4AF37", width: "16px", height: "16px" }} />
          <span style={{ color: "#A0A0A0", fontSize: "0.875rem", fontFamily: "system-ui" }}>Show category filter tabs on landing page</span>
        </label>
      </div>

      {/* Upload zone */}
      <div style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.5rem" }}>
        <h3 style={{ color: "#E0E0E0", fontSize: "0.9rem", fontWeight: 600, fontFamily: "system-ui", marginBottom: "1rem" }}>Upload Media</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <label style={labelStyle}>Category for new uploads</label>
            <select id="upload-category" defaultValue="wedding" style={{ ...inputStyle, cursor: "pointer" }}>
              {MEDIA_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div style={{ flex: 2, minWidth: "260px" }}>
            <label
              htmlFor="portfolio-upload"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                border: `2px dashed ${uploading ? "#D4AF37" : "rgba(255,255,255,0.15)"}`,
                borderRadius: "10px",
                cursor: uploading ? "not-allowed" : "pointer",
                background: uploading ? "rgba(212,175,55,0.05)" : "#181818",
                transition: "all 0.2s",
                textAlign: "center",
              }}
            >
              {uploading ? (
                <>
                  <div style={{ color: "#D4AF37", fontFamily: "system-ui", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                    Uploading... {uploadProgress}%
                  </div>
                  <div style={{ width: "140px", height: "4px", background: "#333", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${uploadProgress}%`, background: "#D4AF37", transition: "width 0.3s" }} />
                  </div>
                </>
              ) : (
                <>
                  <span style={{ fontSize: "2rem" }}>📁</span>
                  <span style={{ color: "#A0A0A0", fontSize: "0.875rem", fontFamily: "system-ui", marginTop: "0.5rem" }}>
                    <span style={{ color: "#D4AF37" }}>Click to upload</span> photos or videos
                  </span>
                  <span style={{ color: "#555", fontSize: "0.75rem", fontFamily: "system-ui", marginTop: "0.25rem" }}>
                    Multiple files supported — JPG, PNG, WebP, MP4 (max 10MB / 100MB)
                  </span>
                </>
              )}
            </label>
            <input
              id="portfolio-upload"
              type="file"
              multiple
              accept={[...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_VIDEO_TYPES].join(",")}
              style={{ display: "none" }}
              disabled={uploading}
              onChange={(e) => {
                const cat = (document.getElementById("upload-category") as HTMLSelectElement)?.value ?? "wedding";
                if (e.target.files?.length) handleFileUpload(e.target.files, cat);
              }}
            />
          </div>
        </div>
      </div>

      {/* Media grid */}
      <div style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <h3 style={{ color: "#E0E0E0", fontSize: "0.9rem", fontWeight: 600, fontFamily: "system-ui", margin: 0 }}>
            Media Library ({media.length} files)
          </h3>
          {/* Category filter */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[{ value: "all", label: "All" }, ...MEDIA_CATEGORIES].map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                style={{
                  padding: "0.3rem 0.875rem",
                  borderRadius: "20px",
                  border: activeCategory === cat.value ? "1px solid #D4AF37" : "1px solid rgba(255,255,255,0.1)",
                  background: activeCategory === cat.value ? "rgba(212,175,55,0.15)" : "transparent",
                  color: activeCategory === cat.value ? "#D4AF37" : "#666",
                  fontSize: "0.78rem",
                  fontFamily: "system-ui",
                  cursor: "pointer",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#555", fontFamily: "system-ui", fontSize: "0.875rem", border: "1px dashed rgba(255,255,255,0.08)", borderRadius: "8px" }}>
            {media.length === 0 ? "No media uploaded yet. Upload your first photo above." : `No media in the "${activeCategory}" category.`}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
            {filtered.map(item => (
              <div key={item.id} style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", overflow: "hidden" }}>
                {/* Thumbnail */}
                <div style={{ position: "relative", aspectRatio: "4/3", background: "#0A0A0A" }}>
                  {item.media_type === "image" ? (
                    <img src={item.public_url} alt={item.alt_text} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>🎬</div>
                  )}
                  {/* Delete button */}
                  <button onClick={() => handleDelete(item)} style={{ position: "absolute", top: "6px", right: "6px", background: "rgba(0,0,0,0.8)", border: "none", borderRadius: "6px", color: "#ef4444", fontSize: "0.75rem", padding: "3px 8px", cursor: "pointer", fontFamily: "system-ui" }}>✕</button>
                  {/* Type badge */}
                  <span style={{ position: "absolute", bottom: "6px", left: "6px", background: "rgba(0,0,0,0.75)", color: "#fff", fontSize: "0.65rem", fontFamily: "system-ui", padding: "2px 6px", borderRadius: "4px" }}>
                    {item.media_type}
                  </span>
                </div>
                {/* Meta */}
                <div style={{ padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <select
                    value={item.category}
                    onChange={e => handleCategoryChange(item.id, e.target.value)}
                    style={{ ...inputStyle, padding: "0.35rem 0.5rem", fontSize: "0.75rem", cursor: "pointer" }}
                  >
                    {MEDIA_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                  <input
                    type="text"
                    defaultValue={item.alt_text}
                    onBlur={e => handleAltChange(item.id, e.target.value)}
                    placeholder="Alt text..."
                    style={{ ...inputStyle, padding: "0.35rem 0.5rem", fontSize: "0.75rem" }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Publish */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
        <button onClick={onPublish} disabled={saving} style={{ padding: "0.625rem 1.5rem", background: saving ? "#B8912F" : "#D4AF37", border: "none", borderRadius: "8px", color: "#000", fontWeight: 700, fontSize: "0.875rem", fontFamily: "system-ui", cursor: saving ? "not-allowed" : "pointer" }}>
          {saving ? "Saving..." : "Save Section Settings"}
        </button>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", color: "#A0A0A0", fontSize: "0.8rem", fontWeight: 500, fontFamily: "system-ui", marginBottom: "0.5rem" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "0.75rem 1rem", background: "#181818", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "0.875rem", fontFamily: "system-ui", outline: "none", boxSizing: "border-box" };
