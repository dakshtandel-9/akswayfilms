"use client";

import { useRef, useState } from "react";
import { uploadToCloudinary } from "@/actions/cloudinary";
import { saveMediaRecord } from "@/actions/media";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE_BYTES, MAX_IMAGE_SIZE_MB } from "@/lib/constants";

interface ImageUploaderProps {
  folder?: string;
  currentUrl?: string;
  onUploadComplete: (url: string, publicId: string) => void;
  label?: string;
  hint?: string;
  saveToMediaTable?: boolean;
  category?: string;
  altText?: string;
}

export default function ImageUploader({
  folder = "general",
  currentUrl,
  onUploadComplete,
  label = "Upload Image",
  hint = `Accepted: JPG, PNG, WebP — Max ${MAX_IMAGE_SIZE_MB}MB`,
  saveToMediaTable = false,
  category = "general",
  altText = "",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);

  const handleFile = async (file: File) => {
    setError(null);

    // Validate type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("Unsupported file type. Use JPG, PNG, or WebP.");
      return;
    }

    // Validate size
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setError(`File too large. Max size is ${MAX_IMAGE_SIZE_MB}MB.`);
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setProgress(20);

    try {
      const formData = new FormData();
      formData.append("file", file);

      setProgress(40);
      const result = await uploadToCloudinary(formData, folder);
      if ("error" in result) throw new Error(result.error);

      setProgress(80);

      if (saveToMediaTable) {
        await saveMediaRecord(result.url, result.publicId, file.name, "image", file.size, {
          category: category as "wedding" | "haldi" | "prewedding" | "cinematic" | "other" | "general",
          alt_text: altText,
          sort_order: 0,
        });
      }

      setProgress(100);
      onUploadComplete(result.url, result.publicId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
      setPreview(currentUrl || null);
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <label style={{ color: "#A0A0A0", fontSize: "0.8rem", fontWeight: 500, fontFamily: "system-ui" }}>
        {label}
      </label>

      {/* Drop zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          border: `2px dashed ${dragging ? "#D4AF37" : error ? "#ef4444" : "rgba(255,255,255,0.15)"}`,
          borderRadius: "10px",
          background: dragging ? "rgba(212,175,55,0.05)" : "#181818",
          padding: preview ? "0" : "2.5rem 1.5rem",
          cursor: uploading ? "not-allowed" : "pointer",
          textAlign: "center",
          transition: "all 0.2s ease",
          overflow: "hidden",
          position: "relative",
          minHeight: preview ? "180px" : undefined,
        }}
      >
        {preview ? (
          // Preview image
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📷</div>
            <div style={{ color: "#A0A0A0", fontSize: "0.875rem", fontFamily: "system-ui" }}>
              Drag & drop or <span style={{ color: "#D4AF37" }}>click to upload</span>
            </div>
            <div style={{ color: "#555", fontSize: "0.75rem", marginTop: "0.25rem", fontFamily: "system-ui" }}>{hint}</div>
          </div>
        )}

        {/* Progress overlay */}
        {uploading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            <div style={{ color: "#D4AF37", fontFamily: "system-ui", fontSize: "0.875rem" }}>
              Uploading... {progress}%
            </div>
            <div style={{ width: "160px", height: "4px", background: "#333", borderRadius: "2px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "#D4AF37",
                  borderRadius: "2px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        )}

        {/* Replace button (when preview exists) */}
        {preview && !uploading && (
          <div
            style={{
              position: "absolute",
              bottom: "0.5rem",
              right: "0.5rem",
              background: "rgba(0,0,0,0.8)",
              color: "#D4AF37",
              padding: "0.3rem 0.75rem",
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontFamily: "system-ui",
            }}
          >
            Click to replace
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p style={{ color: "#ef4444", fontSize: "0.8rem", fontFamily: "system-ui" }}>⚠️ {error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
