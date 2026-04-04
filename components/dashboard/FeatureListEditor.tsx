"use client";

import { useState } from "react";

interface FeatureListEditorProps {
  features: string[];
  onChange: (features: string[]) => void;
  placeholder?: string;
}

export default function FeatureListEditor({
  features,
  onChange,
  placeholder = "Add a feature...",
}: FeatureListEditorProps) {
  const [newItem, setNewItem] = useState("");

  const add = () => {
    const trimmed = newItem.trim();
    if (!trimmed || features.includes(trimmed)) return;
    onChange([...features, trimmed]);
    setNewItem("");
  };

  const remove = (index: number) => {
    onChange(features.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const arr = [...features];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    onChange(arr);
  };

  const moveDown = (index: number) => {
    if (index === features.length - 1) return;
    const arr = [...features];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    onChange(arr);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {/* Existing features */}
      {features.map((feature, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 0.75rem",
            background: "#1E1E1E",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "7px",
          }}
        >
          {/* Order buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <button
              type="button"
              onClick={() => moveUp(i)}
              disabled={i === 0}
              style={{
                background: "none",
                border: "none",
                color: i === 0 ? "#333" : "#666",
                cursor: i === 0 ? "default" : "pointer",
                fontSize: "0.65rem",
                lineHeight: 1,
                padding: "1px 3px",
              }}
            >
              ▲
            </button>
            <button
              type="button"
              onClick={() => moveDown(i)}
              disabled={i === features.length - 1}
              style={{
                background: "none",
                border: "none",
                color: i === features.length - 1 ? "#333" : "#666",
                cursor: i === features.length - 1 ? "default" : "pointer",
                fontSize: "0.65rem",
                lineHeight: 1,
                padding: "1px 3px",
              }}
            >
              ▼
            </button>
          </div>

          <span style={{ flex: 1, color: "#E0E0E0", fontSize: "0.85rem", fontFamily: "system-ui" }}>
            {feature}
          </span>

          <button
            type="button"
            onClick={() => remove(i)}
            style={{
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "5px",
              color: "#ef4444",
              fontSize: "0.75rem",
              padding: "2px 7px",
              cursor: "pointer",
              fontFamily: "system-ui",
            }}
          >
            ✕
          </button>
        </div>
      ))}

      {/* Add new */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={placeholder}
          style={{
            flex: 1,
            padding: "0.6rem 0.875rem",
            background: "#181818",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "7px",
            color: "#fff",
            fontSize: "0.875rem",
            fontFamily: "system-ui",
            outline: "none",
          }}
        />
        <button
          type="button"
          onClick={add}
          style={{
            padding: "0.6rem 1rem",
            background: "rgba(212,175,55,0.15)",
            border: "1px solid rgba(212,175,55,0.3)",
            borderRadius: "7px",
            color: "#D4AF37",
            fontSize: "0.875rem",
            fontFamily: "system-ui",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          + Add
        </button>
      </div>
    </div>
  );
}
