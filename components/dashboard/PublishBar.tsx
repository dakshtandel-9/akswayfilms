"use client";

import { useState } from "react";

interface PublishBarProps {
  hasDraft: boolean;
  lastPublished: string | null;
  onSaveDraft: () => Promise<void>;
  onPublish: () => Promise<void>;
  saving?: boolean;
  publishing?: boolean;
}

export default function PublishBar({
  hasDraft,
  lastPublished,
  onSaveDraft,
  onPublish,
  saving = false,
  publishing = false,
}: PublishBarProps) {
  const [localSaving, setLocalSaving] = useState(false);
  const [localPublishing, setLocalPublishing] = useState(false);

  const handleSave = async () => {
    setLocalSaving(true);
    await onSaveDraft();
    setLocalSaving(false);
  };

  const handlePublish = async () => {
    setLocalPublishing(true);
    await onPublish();
    setLocalPublishing(false);
  };

  const isSaving = saving || localSaving;
  const isPublishing = publishing || localPublishing;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 1.5rem",
        background: "#111",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      {/* Status */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: hasDraft ? "#F59E0B" : "#22C55E",
            flexShrink: 0,
          }}
        />
        <div>
          <div
            style={{
              color: hasDraft ? "#F59E0B" : "#22C55E",
              fontSize: "0.8rem",
              fontWeight: 600,
              fontFamily: "system-ui",
            }}
          >
            {hasDraft ? "Unpublished changes" : "Published"}
          </div>
          {lastPublished && (
            <div style={{ color: "#555", fontSize: "0.7rem", fontFamily: "system-ui" }}>
              Last published: {new Date(lastPublished).toLocaleString("en-IN")}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <button
          onClick={handleSave}
          disabled={isSaving || isPublishing}
          style={{
            padding: "0.5rem 1.25rem",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "7px",
            color: "#A0A0A0",
            fontSize: "0.85rem",
            fontFamily: "system-ui",
            cursor: isSaving ? "not-allowed" : "pointer",
            opacity: isSaving || isPublishing ? 0.6 : 1,
          }}
        >
          {isSaving ? "Saving..." : "Save Draft"}
        </button>
        <button
          onClick={handlePublish}
          disabled={isSaving || isPublishing}
          style={{
            padding: "0.5rem 1.25rem",
            background: isPublishing ? "#B8912F" : "#D4AF37",
            border: "none",
            borderRadius: "7px",
            color: "#000",
            fontSize: "0.85rem",
            fontWeight: 700,
            fontFamily: "system-ui",
            cursor: isPublishing ? "not-allowed" : "pointer",
            opacity: isPublishing ? 0.7 : 1,
          }}
        >
          {isPublishing ? "Publishing..." : "Publish Now"}
        </button>
      </div>
    </div>
  );
}
