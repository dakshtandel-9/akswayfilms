"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialSchema, type TestimonialInput } from "@/lib/validations";
import { createTestimonial, updateTestimonial, deleteTestimonial, toggleTestimonialVisibility } from "@/actions/testimonials";
import ImageUploader from "@/components/dashboard/ImageUploader";

interface DbTestimonial { id: string; client_name: string; review_text: string; photo_url?: string; rating: number; wedding_date?: string; location?: string; is_visible: boolean; sort_order: number; }
interface Props { initialTestimonials: DbTestimonial[]; hasDraft: boolean; publishedAt: string | null; }

const inputStyle: React.CSSProperties = { width: "100%", padding: "0.7rem 0.9rem", background: "#181818", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "0.875rem", fontFamily: "system-ui", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", color: "#A0A0A0", fontSize: "0.78rem", fontWeight: 500, fontFamily: "system-ui", marginBottom: "0.4rem" };

function TestimonialForm({ initial, onSave, onCancel }: { initial?: DbTestimonial | null; onSave: () => void; onCancel: () => void }) {
  const [photoUrl, setPhotoUrl] = useState(initial?.photo_url ?? "");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<TestimonialInput>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: initial ?? { rating: 5, is_visible: true, sort_order: 0 },
  });

  const onSubmit = handleSubmit(async (data) => {
    setSaving(true);
    const payload = { ...data, photo_url: photoUrl };
    const result = initial?.id
      ? await updateTestimonial(initial.id, payload)
      : await createTestimonial(payload);
    setSaving(false);
    if (!result.error) onSave();
  });

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.25rem", background: "#161616", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "10px", marginBottom: "0.5rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
        <div>
          <label style={labelStyle}>Client Name *</label>
          <input type="text" {...register("client_name")} placeholder="Rahul & Priya" style={{ ...inputStyle, borderColor: errors.client_name ? "#ef4444" : "rgba(255,255,255,0.1)" }} />
        </div>
        <div>
          <label style={labelStyle}>Rating (1–5)</label>
          <select {...register("rating")} style={{ ...inputStyle, cursor: "pointer" }}>
            {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{"⭐".repeat(r)} {r}/5</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Wedding Date</label>
          <input type="text" {...register("wedding_date")} placeholder="February 2025" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Location</label>
          <input type="text" {...register("location")} placeholder="Honnavar, Karnataka" style={inputStyle} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Review Text *</label>
        <textarea {...register("review_text")} rows={3} placeholder="Write the client's review here..." style={{ ...inputStyle, resize: "vertical", borderColor: errors.review_text ? "#ef4444" : "rgba(255,255,255,0.1)" }} />
        {errors.review_text && <p style={{ color: "#ef4444", fontSize: "0.75rem", fontFamily: "system-ui", marginTop: "0.25rem" }}>{errors.review_text.message}</p>}
      </div>
      <ImageUploader
        label="Client Photo (optional)"
        currentUrl={photoUrl}
        folder="testimonials"
        onUploadComplete={(url) => setPhotoUrl(url)}
        hint="Small portrait photo — JPG/WebP, max 10MB"
      />
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "space-between" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <input type="checkbox" {...register("is_visible")} style={{ accentColor: "#D4AF37", width: "16px", height: "16px" }} />
          <span style={{ color: "#A0A0A0", fontSize: "0.8rem", fontFamily: "system-ui" }}>Visible on website</span>
        </label>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button type="button" onClick={onCancel} style={{ padding: "0.45rem 1.1rem", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "7px", color: "#A0A0A0", fontFamily: "system-ui", fontSize: "0.8rem", cursor: "pointer" }}>Cancel</button>
          <button type="submit" disabled={saving} style={{ padding: "0.45rem 1.1rem", background: "#D4AF37", border: "none", borderRadius: "7px", color: "#000", fontFamily: "system-ui", fontSize: "0.8rem", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}>{saving ? "Saving..." : "Save Testimonial"}</button>
        </div>
      </div>
    </form>
  );
}

export default function TestimonialsEditor({ initialTestimonials }: Props) {
  const [testimonials, setTestimonials] = useState<DbTestimonial[]>(initialTestimonials);
  const [editing, setEditing] = useState<DbTestimonial | "new" | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const notify = (type: "success" | "error", msg: string) => { setNotification({ type, msg }); setTimeout(() => setNotification(null), 3000); };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    const result = await deleteTestimonial(id);
    if (result.error) { notify("error", result.error); return; }
    setTestimonials(prev => prev.filter(t => t.id !== id));
    notify("success", "Testimonial deleted.");
  };

  const handleToggle = async (id: string, current: boolean) => {
    await toggleTestimonialVisibility(id, !current);
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, is_visible: !current } : t));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {notification && (
        <div style={{ padding: "0.875rem 1.25rem", background: notification.type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${notification.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: "8px", color: notification.type === "success" ? "#22C55E" : "#ef4444", fontSize: "0.875rem", fontFamily: "system-ui" }}>
          {notification.type === "success" ? "✅" : "❌"} {notification.msg}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#666", fontSize: "0.875rem", fontFamily: "system-ui" }}>{testimonials.length} testimonial(s)</span>
        <button onClick={() => setEditing("new")} style={{ padding: "0.45rem 1.1rem", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "7px", color: "#D4AF37", fontSize: "0.8rem", fontFamily: "system-ui", cursor: "pointer", fontWeight: 600 }}>+ Add Testimonial</button>
      </div>

      {editing === "new" && (
        <TestimonialForm
          onSave={() => { setEditing(null); window.location.reload(); }}
          onCancel={() => setEditing(null)}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {testimonials.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#555", fontFamily: "system-ui", fontSize: "0.875rem", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "10px" }}>
            No testimonials yet. Add your first client review above.
          </div>
        )}
        {testimonials.map(t => (
          <div key={t.id}>
            <div style={{ background: "#1A1A1A", border: `1px solid ${t.is_visible ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)"}`, borderRadius: "10px", padding: "1.1rem 1.25rem", opacity: t.is_visible ? 1 : 0.5 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                {t.photo_url && <img src={t.photo_url} alt={t.client_name} style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ color: "#E0E0E0", fontWeight: 600, fontSize: "0.9rem", fontFamily: "system-ui" }}>{t.client_name}</div>
                      <div style={{ color: "#666", fontSize: "0.75rem", fontFamily: "system-ui" }}>
                        {"⭐".repeat(t.rating)} {t.wedding_date && `· ${t.wedding_date}`} {t.location && `· ${t.location}`}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <button onClick={() => handleToggle(t.id, t.is_visible)} title={t.is_visible ? "Hide" : "Show"} style={{ padding: "0.3rem 0.75rem", background: t.is_visible ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.05)", border: `1px solid ${t.is_visible ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: "6px", color: t.is_visible ? "#22C55E" : "#666", fontSize: "0.75rem", fontFamily: "system-ui", cursor: "pointer" }}>{t.is_visible ? "Visible" : "Hidden"}</button>
                      <button onClick={() => setEditing(t)} style={{ padding: "0.3rem 0.75rem", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#A0A0A0", fontSize: "0.75rem", fontFamily: "system-ui", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => handleDelete(t.id, t.client_name)} style={{ padding: "0.3rem 0.75rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", color: "#ef4444", fontSize: "0.75rem", fontFamily: "system-ui", cursor: "pointer" }}>✕</button>
                    </div>
                  </div>
                  <p style={{ color: "#888", fontSize: "0.825rem", fontFamily: "system-ui", marginTop: "0.5rem", lineHeight: 1.5 }}>"{t.review_text}"</p>
                </div>
              </div>
            </div>
            {editing && typeof editing !== "string" && editing.id === t.id && (
              <TestimonialForm initial={t} onSave={() => { setEditing(null); window.location.reload(); }} onCancel={() => setEditing(null)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
