"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { packageSchema, addonSchema, type PackageInput, type AddonInput } from "@/lib/validations";
import {
  createPackage, updatePackage, deletePackage, reorderPackages,
  createAddon, updateAddon, deleteAddon, reorderAdons,
} from "@/actions/packages";
import FeatureListEditor from "@/components/dashboard/FeatureListEditor";

interface DbPackage { id: string; name: string; price_inr: number; badge?: string; features: string[]; is_highlighted: boolean; sort_order: number; }
interface DbAddon { id: string; name: string; price_display: string; price_from_inr: number; price_to_inr: number; description?: string; sort_order: number; }
interface Props { initialPackages: DbPackage[]; initialAddons: DbAddon[]; }

const inputStyle: React.CSSProperties = { width: "100%", padding: "0.7rem 0.9rem", background: "#181818", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "0.875rem", fontFamily: "system-ui", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", color: "#A0A0A0", fontSize: "0.78rem", fontWeight: 500, fontFamily: "system-ui", marginBottom: "0.4rem" };

// ---- Package Form ----
function PackageForm({ initial, onSave, onCancel }: { initial?: DbPackage | null; onSave: () => void; onCancel: () => void }) {
  const [features, setFeatures] = useState<string[]>(initial?.features ?? []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [featuresError, setFeaturesError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<PackageInput>({
    resolver: zodResolver(packageSchema),
    defaultValues: initial
      ? { ...initial, features: initial.features }
      : { is_highlighted: false, sort_order: 0, features: ["placeholder"] },
  });

  const handleFeaturesChange = (newFeatures: string[]) => {
    setFeatures(newFeatures);
    if (newFeatures.length > 0) setFeaturesError(null);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (features.length === 0) { setFeaturesError("Add at least one feature."); return; }
    setSaving(true); setError(null); setFeaturesError(null);
    const payload: PackageInput = {
      name: data.name, price_inr: data.price_inr, badge: data.badge,
      features, is_highlighted: data.is_highlighted, sort_order: data.sort_order ?? 0,
    };
    const result = initial?.id ? await updatePackage(initial.id, payload) : await createPackage(payload);
    setSaving(false);
    if (result.error) { setError(result.error); return; }
    onSave();
  });

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.25rem", background: "#161616", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "10px" }}>
      {error && <p style={{ color: "#ef4444", fontSize: "0.8rem", fontFamily: "system-ui" }}>❌ {error}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
        <div><label style={labelStyle}>Package Name *</label><input type="text" {...register("name")} placeholder="Standard" style={{ ...inputStyle, borderColor: errors.name ? "#ef4444" : "rgba(255,255,255,0.1)" }} /></div>
        <div><label style={labelStyle}>Price (₹) *</label><input type="number" {...register("price_inr")} placeholder="65000" min={0} style={{ ...inputStyle, borderColor: errors.price_inr ? "#ef4444" : "rgba(255,255,255,0.1)" }} /></div>
        <div><label style={labelStyle}>Badge Text</label><input type="text" {...register("badge")} placeholder="Most Selling 🔥" style={inputStyle} /></div>
        <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "0.1rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input type="checkbox" {...register("is_highlighted")} style={{ accentColor: "#D4AF37", width: "16px", height: "16px" }} />
            <span style={{ color: "#A0A0A0", fontSize: "0.8rem", fontFamily: "system-ui" }}>Highlight this package</span>
          </label>
        </div>
      </div>
      <div>
        <label style={labelStyle}>Features *</label>
        <FeatureListEditor features={features} onChange={handleFeaturesChange} placeholder="Add a feature..." />
        {featuresError && <p style={{ color: "#ef4444", fontSize: "0.75rem", fontFamily: "system-ui", marginTop: "0.25rem" }}>{featuresError}</p>}
      </div>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
        <button type="button" onClick={onCancel} style={{ padding: "0.5rem 1.25rem", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "7px", color: "#A0A0A0", fontFamily: "system-ui", fontSize: "0.875rem", cursor: "pointer" }}>Cancel</button>
        <button type="submit" disabled={saving} style={{ padding: "0.5rem 1.25rem", background: "#D4AF37", border: "none", borderRadius: "7px", color: "#000", fontFamily: "system-ui", fontSize: "0.875rem", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}>{saving ? "Saving..." : "Save Package"}</button>
      </div>
    </form>
  );
}

// ---- Addon Form ----
function AddonForm({ initial, onSave, onCancel }: { initial?: DbAddon | null; onSave: () => void; onCancel: () => void }) {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit } = useForm<AddonInput>({
    resolver: zodResolver(addonSchema),
    defaultValues: initial ?? { price_from_inr: 0, price_to_inr: 0, sort_order: 0 },
  });
  const onSubmit = handleSubmit(async (data) => {
    setSaving(true);
    const result = initial?.id ? await updateAddon(initial.id, data) : await createAddon(data);
    setSaving(false);
    if (!result.error) onSave();
  });
  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.875rem", padding: "1rem", background: "#161616", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <div><label style={labelStyle}>Add-on Name *</label><input type="text" {...register("name")} placeholder="Drone Coverage" style={inputStyle} /></div>
        <div><label style={labelStyle}>Display Price *</label><input type="text" {...register("price_display")} placeholder="₹7,000" style={inputStyle} /></div>
        <div><label style={labelStyle}>Price From (₹)</label><input type="number" {...register("price_from_inr")} min={0} style={inputStyle} /></div>
        <div><label style={labelStyle}>Price To (₹)</label><input type="number" {...register("price_to_inr")} min={0} style={inputStyle} /></div>
      </div>
      <div><label style={labelStyle}>Description</label><input type="text" {...register("description")} placeholder="Optional short description" style={inputStyle} /></div>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
        <button type="button" onClick={onCancel} style={{ padding: "0.4rem 1rem", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "7px", color: "#A0A0A0", fontFamily: "system-ui", fontSize: "0.8rem", cursor: "pointer" }}>Cancel</button>
        <button type="submit" disabled={saving} style={{ padding: "0.4rem 1rem", background: "#D4AF37", border: "none", borderRadius: "7px", color: "#000", fontFamily: "system-ui", fontSize: "0.8rem", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}>{saving ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}

// ---- Sortable Package Card ----
function SortablePackageCard({
  pkg,
  onEdit,
  onDelete,
  editingId,
  onSave,
  onCancel,
}: {
  pkg: DbPackage;
  onEdit: (pkg: DbPackage) => void;
  onDelete: (id: string, name: string) => void;
  editingId: string | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: pkg.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: "#1A1A1A",
    border: `1px solid ${pkg.is_highlighted ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.07)"}`,
    borderRadius: "12px",
    padding: "1.25rem",
    position: "relative",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {pkg.is_highlighted && (
        <div style={{ position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)", background: "#D4AF37", color: "#000", fontSize: "0.65rem", fontWeight: 700, fontFamily: "system-ui", padding: "2px 12px", borderRadius: "0 0 6px 6px" }}>RECOMMENDED</div>
      )}

      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        style={{ position: "absolute", top: "0.75rem", right: "0.75rem", cursor: isDragging ? "grabbing" : "grab", color: "#444", fontSize: "1.1rem", lineHeight: 1, padding: "2px 4px", borderRadius: "4px", userSelect: "none" }}
        title="Drag to reorder"
      >
        ⠿
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", marginTop: pkg.is_highlighted ? "0.5rem" : 0, paddingRight: "1.5rem" }}>
        <div>
          <div style={{ color: "#E0E0E0", fontSize: "1rem", fontWeight: 700, fontFamily: "system-ui" }}>{pkg.name}</div>
          {pkg.badge && <div style={{ color: "#A0A0A0", fontSize: "0.75rem", fontFamily: "system-ui", marginTop: "2px" }}>{pkg.badge}</div>}
        </div>
        <div style={{ color: "#D4AF37", fontSize: "1.25rem", fontWeight: 800, fontFamily: "system-ui" }}>
          ₹{(pkg.price_inr / 1000).toFixed(0)}K
        </div>
      </div>

      <ul style={{ paddingLeft: "1rem", margin: "0 0 1rem 0" }}>
        {pkg.features.map((f, i) => <li key={i} style={{ color: "#888", fontSize: "0.8rem", fontFamily: "system-ui", marginBottom: "3px" }}>{f}</li>)}
      </ul>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={() => onEdit(pkg)} style={{ flex: 1, padding: "0.4rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#A0A0A0", fontSize: "0.8rem", fontFamily: "system-ui", cursor: "pointer" }}>Edit</button>
        <button onClick={() => onDelete(pkg.id, pkg.name)} style={{ flex: 1, padding: "0.4rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", color: "#ef4444", fontSize: "0.8rem", fontFamily: "system-ui", cursor: "pointer" }}>Delete</button>
      </div>

      {editingId === pkg.id && (
        <div style={{ marginTop: "1rem" }}>
          <PackageForm initial={pkg} onSave={onSave} onCancel={onCancel} />
        </div>
      )}
    </div>
  );
}

// ---- Sortable Addon Row ----
function SortableAddonRow({
  addon, onEdit, onDelete, editingId, onSave, onCancel,
}: {
  addon: DbAddon;
  onEdit: (addon: DbAddon) => void;
  onDelete: (id: string, name: string) => void;
  editingId: string | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: addon.id });

  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem 1.25rem", background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px" }}>
        {/* Drag handle */}
        <div {...attributes} {...listeners} style={{ cursor: isDragging ? "grabbing" : "grab", color: "#444", fontSize: "1.1rem", lineHeight: 1, flexShrink: 0, userSelect: "none" }} title="Drag to reorder">⠿</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#E0E0E0", fontSize: "0.875rem", fontWeight: 600, fontFamily: "system-ui" }}>{addon.name}</div>
          {addon.description && <div style={{ color: "#666", fontSize: "0.78rem", fontFamily: "system-ui" }}>{addon.description}</div>}
        </div>
        <div style={{ color: "#D4AF37", fontWeight: 700, fontFamily: "system-ui", fontSize: "0.9rem", whiteSpace: "nowrap" }}>{addon.price_display}</div>
        <button onClick={() => onEdit(addon)} style={{ padding: "0.3rem 0.75rem", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#A0A0A0", fontSize: "0.78rem", fontFamily: "system-ui", cursor: "pointer" }}>Edit</button>
        <button onClick={() => onDelete(addon.id, addon.name)} style={{ padding: "0.3rem 0.75rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", color: "#ef4444", fontSize: "0.78rem", fontFamily: "system-ui", cursor: "pointer" }}>✕</button>
      </div>
      {editingId === addon.id && (
        <div style={{ marginTop: "0.5rem" }}>
          <AddonForm initial={addon} onSave={onSave} onCancel={onCancel} />
        </div>
      )}
    </div>
  );
}

// ---- Main Component ----
export default function PackagesEditor({ initialPackages, initialAddons }: Props) {
  const [packages, setPackages] = useState<DbPackage[]>([...initialPackages].sort((a, b) => a.sort_order - b.sort_order));
  const [addons, setAddons] = useState<DbAddon[]>([...initialAddons].sort((a, b) => a.sort_order - b.sort_order));
  const [editingPackage, setEditingPackage] = useState<string | null>(null); // stores id or "new"
  const [editingAddon, setEditingAddon] = useState<string | null>(null);
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [showAddAddon, setShowAddAddon] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const notify = (type: "success" | "error", msg: string) => { setNotification({ type, msg }); setTimeout(() => setNotification(null), 3000); };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  // Drag end — packages
  const handlePackageDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = packages.findIndex(p => p.id === active.id);
    const newIdx = packages.findIndex(p => p.id === over.id);
    const reordered = arrayMove(packages, oldIdx, newIdx);
    setPackages(reordered);
    await reorderPackages(reordered.map(p => p.id));
    notify("success", "Order saved!");
  };

  // Drag end — addons
  const handleAddonDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = addons.findIndex(a => a.id === active.id);
    const newIdx = addons.findIndex(a => a.id === over.id);
    const reordered = arrayMove(addons, oldIdx, newIdx);
    setAddons(reordered);
    await reorderAdons(reordered.map(a => a.id));
    notify("success", "Order saved!");
  };

  const handleDeletePackage = async (id: string, name: string) => {
    if (!confirm(`Delete the "${name}" package?`)) return;
    const result = await deletePackage(id);
    if (result.error) { notify("error", result.error); return; }
    setPackages(prev => prev.filter(p => p.id !== id));
    notify("success", "Package deleted.");
  };

  const handleDeleteAddon = async (id: string, name: string) => {
    if (!confirm(`Delete the "${name}" add-on?`)) return;
    const result = await deleteAddon(id);
    if (result.error) { notify("error", result.error); return; }
    setAddons(prev => prev.filter(a => a.id !== id));
    notify("success", "Add-on deleted.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {notification && (
        <div style={{ padding: "0.875rem 1.25rem", background: notification.type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${notification.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: "8px", color: notification.type === "success" ? "#22C55E" : "#ef4444", fontSize: "0.875rem", fontFamily: "system-ui" }}>
          {notification.type === "success" ? "✅" : "❌"} {notification.msg}
        </div>
      )}

      {/* PACKAGES */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <h2 style={{ color: "#E0E0E0", fontSize: "1rem", fontWeight: 700, fontFamily: "system-ui", margin: 0 }}>📦 Packages ({packages.length})</h2>
          <button onClick={() => setShowAddPackage(v => !v)} style={{ padding: "0.4rem 1rem", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "7px", color: "#D4AF37", fontSize: "0.8rem", fontFamily: "system-ui", cursor: "pointer", fontWeight: 600 }}>
            {showAddPackage ? "Cancel" : "+ Add Package"}
          </button>
        </div>
        <p style={{ color: "#555", fontSize: "0.75rem", fontFamily: "system-ui", marginBottom: "1rem" }}>⠿ Drag the grid icon to reorder packages</p>

        {showAddPackage && (
          <div style={{ marginBottom: "1rem" }}>
            <PackageForm
              onSave={() => { setShowAddPackage(false); window.location.reload(); }}
              onCancel={() => setShowAddPackage(false)}
            />
          </div>
        )}

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handlePackageDragEnd}>
          <SortableContext items={packages.map(p => p.id)} strategy={verticalListSortingStrategy}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
              {packages.map(pkg => (
                <SortablePackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onEdit={(p) => setEditingPackage(p.id === editingPackage ? null : p.id)}
                  onDelete={handleDeletePackage}
                  editingId={editingPackage}
                  onSave={() => { setEditingPackage(null); window.location.reload(); }}
                  onCancel={() => setEditingPackage(null)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* ADDONS */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <h2 style={{ color: "#E0E0E0", fontSize: "1rem", fontWeight: 700, fontFamily: "system-ui", margin: 0 }}>➕ Add-Ons ({addons.length})</h2>
          <button onClick={() => setShowAddAddon(v => !v)} style={{ padding: "0.4rem 1rem", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "7px", color: "#D4AF37", fontSize: "0.8rem", fontFamily: "system-ui", cursor: "pointer", fontWeight: 600 }}>
            {showAddAddon ? "Cancel" : "+ Add Add-on"}
          </button>
        </div>
        <p style={{ color: "#555", fontSize: "0.75rem", fontFamily: "system-ui", marginBottom: "1rem" }}>⠿ Drag the grid icon to reorder add-ons</p>

        {showAddAddon && (
          <div style={{ marginBottom: "1rem" }}>
            <AddonForm
              onSave={() => { setShowAddAddon(false); window.location.reload(); }}
              onCancel={() => setShowAddAddon(false)}
            />
          </div>
        )}

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleAddonDragEnd}>
          <SortableContext items={addons.map(a => a.id)} strategy={verticalListSortingStrategy}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {addons.map(addon => (
                <SortableAddonRow
                  key={addon.id}
                  addon={addon}
                  onEdit={(a) => setEditingAddon(a.id === editingAddon ? null : a.id)}
                  onDelete={handleDeleteAddon}
                  editingId={editingAddon}
                  onSave={() => { setEditingAddon(null); window.location.reload(); }}
                  onCancel={() => setEditingAddon(null)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
