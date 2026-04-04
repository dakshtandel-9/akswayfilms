"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reelsContentSchema, type ReelsContent, type ReelItem } from "@/lib/validations";
import { saveDraft, saveAndPublishSection } from "@/actions/sections";
import PublishBar from "@/components/dashboard/PublishBar";

interface Props { initialContent: ReelsContent; hasDraft: boolean; publishedAt: string | null; }

const inputStyle: React.CSSProperties = { width: "100%", padding: "0.75rem 1rem", background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "0.875rem", fontFamily: "system-ui", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", color: "#A0A0A0", fontSize: "0.8rem", fontWeight: 500, fontFamily: "system-ui", marginBottom: "0.5rem" };

export default function ReelsEditor({ initialContent, hasDraft, publishedAt }: Props) {
  const [items, setItems] = useState<ReelItem[]>(initialContent.items);
  const [newUrl, setNewUrl] = useState("");
  const [newType, setNewType] = useState<"instagram" | "video">("instagram");
  const [newCaption, setNewCaption] = useState("");
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ReelsContent>({
    resolver: zodResolver(reelsContentSchema),
    defaultValues: initialContent,
  });

  const notify = (type: "success" | "error", msg: string) => { setNotification({ type, msg }); setTimeout(() => setNotification(null), 3000); };

  const addReel = () => {
    const trimmed = newUrl.trim();
    if (!trimmed) return;
    const reel: ReelItem = { id: String(Date.now()), url: trimmed, type: newType, caption: newCaption.trim() || undefined };
    setItems([...items, reel]);
    setNewUrl(""); setNewCaption("");
  };

  const removeReel = (id: string) => setItems(items.filter(r => r.id !== id));

  const moveUp = (idx: number) => { if (idx === 0) return; const a = [...items]; [a[idx-1],a[idx]] = [a[idx],a[idx-1]]; setItems(a); };
  const moveDown = (idx: number) => { if (idx === items.length-1) return; const a = [...items]; [a[idx],a[idx+1]] = [a[idx+1],a[idx]]; setItems(a); };

  const buildPayload = (data: ReelsContent) => ({ ...data, items });

  const onSaveDraft = handleSubmit(async (data) => {
    setSaving(true);
    const result = await saveDraft("reels", buildPayload(data) as unknown as Record<string, unknown>);
    setSaving(false);
    result.error ? notify("error", result.error) : notify("success", "Draft saved!");
  });

  const onPublish = handleSubmit(async (data) => {
    setSaving(true);
    const result = await saveAndPublishSection("reels", buildPayload(data) as unknown as Record<string, unknown>);
    setSaving(false);
    result.error ? notify("error", result.error) : notify("success", "Reels section published!");
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "760px" }}>
      {notification && (
        <div style={{ padding: "0.875rem 1.25rem", background: notification.type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${notification.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: "8px", color: notification.type === "success" ? "#22C55E" : "#ef4444", fontSize: "0.875rem", fontFamily: "system-ui" }}>
          {notification.type === "success" ? "✅" : "❌"} {notification.msg}
        </div>
      )}

      <form style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Section Headline *</label>
            <input type="text" {...register("headline")} placeholder="Follow Our Journey" style={{ ...inputStyle, borderColor: errors.headline ? "#ef4444" : "rgba(255,255,255,0.1)" }} />
          </div>
          <div>
            <label style={labelStyle}>Subheadline</label>
            <input type="text" {...register("subheadline")} placeholder="Find us on Instagram" style={inputStyle} />
          </div>
        </div>
      </form>

      {/* Add reel */}
      <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        <h3 style={{ color: "#E0E0E0", fontSize: "0.875rem", fontWeight: 600, fontFamily: "system-ui", margin: 0 }}>Add a Reel / Video</h3>
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "0.75rem" }}>
          <div>
            <label style={labelStyle}>Type</label>
            <select value={newType} onChange={(e) => setNewType(e.target.value as "instagram" | "video")} style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="instagram">Instagram</option>
              <option value="video">Video URL</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>{newType === "instagram" ? "Instagram Reel URL" : "Video URL (mp4/webm)"}</label>
            <input type="url" value={newUrl} onChange={e => setNewUrl(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addReel())} placeholder={newType === "instagram" ? "https://www.instagram.com/reel/..." : "https://..."} style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Caption (optional)</label>
          <input type="text" value={newCaption} onChange={e => setNewCaption(e.target.value)} placeholder="Behind the scenes..." style={inputStyle} />
        </div>
        <button type="button" onClick={addReel} disabled={!newUrl.trim()} style={{ alignSelf: "flex-start", padding: "0.5rem 1.25rem", background: newUrl.trim() ? "#D4AF37" : "#333", border: "none", borderRadius: "7px", color: newUrl.trim() ? "#000" : "#555", fontSize: "0.875rem", fontFamily: "system-ui", fontWeight: 700, cursor: newUrl.trim() ? "pointer" : "not-allowed" }}>
          + Add Reel
        </button>
      </div>

      {/* Reel list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {items.length === 0 && (
          <div style={{ textAlign: "center", padding: "2.5rem", color: "#555", fontFamily: "system-ui", fontSize: "0.875rem", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "10px" }}>
            No reels added yet. Add your first Instagram reel or video link above.
          </div>
        )}
        {items.map((reel, idx) => (
          <div key={reel.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem 1.1rem", background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "9px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <button type="button" onClick={() => moveUp(idx)} disabled={idx===0} style={{ background: "none", border: "none", color: idx===0?"#333":"#666", cursor: idx===0?"default":"pointer", fontSize: "0.65rem" }}>▲</button>
              <button type="button" onClick={() => moveDown(idx)} disabled={idx===items.length-1} style={{ background: "none", border: "none", color: idx===items.length-1?"#333":"#666", cursor: idx===items.length-1?"default":"pointer", fontSize: "0.65rem" }}>▼</button>
            </div>
            <span style={{ fontSize: "1.25rem" }}>{reel.type === "instagram" ? "📱" : "🎬"}</span>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ color: "#E0E0E0", fontSize: "0.82rem", fontFamily: "system-ui", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{reel.url}</div>
              {reel.caption && <div style={{ color: "#666", fontSize: "0.75rem", fontFamily: "system-ui", marginTop: "2px" }}>{reel.caption}</div>}
            </div>
            <span style={{ background: "rgba(255,255,255,0.06)", color: "#888", fontSize: "0.7rem", fontFamily: "system-ui", padding: "2px 8px", borderRadius: "4px" }}>{reel.type}</span>
            <button type="button" onClick={() => removeReel(reel.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", color: "#ef4444", fontSize: "0.75rem", padding: "3px 9px", cursor: "pointer", fontFamily: "system-ui" }}>✕</button>
          </div>
        ))}
      </div>

      <PublishBar hasDraft={hasDraft} lastPublished={publishedAt} onSaveDraft={onSaveDraft} onPublish={onPublish} saving={saving} />
    </div>
  );
}
