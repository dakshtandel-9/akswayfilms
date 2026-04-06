"use client";

import { useState } from "react";
import Image from "next/image";

interface MediaItem {
  id: string;
  public_url: string;
  alt_text?: string;
  category?: string;
}

interface DriveAlbum {
  id:          string;
  title:       string;
  category?:   string;
  drive_url:   string;
  description?: string;
}

interface PortfolioSectionProps {
  headline:     string;
  subheadline?: string;
  items:        MediaItem[];
  showFilter?:  boolean;
  driveAlbums?: DriveAlbum[];
}

const CATEGORIES = [
  { value: "all",         label: "All" },
  { value: "wedding",     label: "Wedding" },
  { value: "haldi",       label: "Haldi" },
  { value: "prewedding",  label: "Pre-Wedding" },
  { value: "cinematic",   label: "Cinematic" },
];

export default function PortfolioSection({
  headline,
  subheadline,
  items,
  showFilter = true,
  driveAlbums = [],
}: PortfolioSectionProps) {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);

  const filtered = active === "all" ? items : items.filter((i) => i.category === active);

  return (
    <section
      id="portfolio"
      style={{
        background: "rgb(10,10,10)",
        padding:    "clamp(64px, 10vh, 120px) 0",
        position:   "relative",
        overflow:   "hidden",
      }}
    >
      {/* Background watermark */}
      <span
        aria-hidden="true"
        style={{
          position:      "absolute",
          bottom:        "-2%",
          right:         "-2%",
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(80px, 18vw, 240px)",
          color:         "rgba(212,175,55,0.025)",
          letterSpacing: "0.08em",
          lineHeight:    1,
          userSelect:    "none",
          pointerEvents: "none",
          zIndex:        0,
        }}
      >
        WORK
      </span>

      <div
        style={{
          maxWidth: "1440px",
          margin:   "0 auto",
          padding:  "0 clamp(20px, 4vw, 96px)",
          position: "relative",
          zIndex:   1,
        }}
      >
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(36px, 5vh, 56px)" }}>
          <div
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "12px",
              marginBottom:   "20px",
            }}
          >
            <span style={{ width: "32px", height: "1px", background: "#D4AF37" }} />
            <span
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "13px",
                letterSpacing: "0.2em",
                color:         "#D4AF37",
                textTransform: "uppercase",
              }}
            >
              The Work
            </span>
            <span style={{ width: "32px", height: "1px", background: "#D4AF37" }} />
          </div>

          <h2
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(40px, 5vw, 72px)",
              lineHeight:    1.0,
              letterSpacing: "0.02em",
              color:         "#FFFFFF",
              marginBottom:  subheadline ? "16px" : "0",
            }}
          >
            {headline}
          </h2>
          {subheadline && (
            <p
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(15px, 1.3vw, 18px)",
                color:         "rgba(160,160,160,0.8)",
                letterSpacing: "0.04em",
              }}
            >
              {subheadline}
            </p>
          )}
        </div>

        {/* Category filter */}
        {showFilter && (
          <div
            style={{
              display:        "flex",
              justifyContent: "center",
              flexWrap:       "wrap",
              gap:            "10px",
              marginBottom:   "clamp(32px, 5vh, 48px)",
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                style={{
                  fontFamily:     "var(--font-display)",
                  fontSize:       "14px",
                  letterSpacing:  "0.1em",
                  textTransform:  "uppercase",
                  padding:        "8px 22px",
                  borderRadius:   "4px",
                  border:         `1px solid ${active === cat.value ? "#D4AF37" : "rgba(255,255,255,0.12)"}`,
                  background:     active === cat.value ? "rgba(212,175,55,0.1)" : "transparent",
                  color:          active === cat.value ? "#D4AF37" : "rgba(160,160,160,0.8)",
                  cursor:         "pointer",
                  transition:     "all 200ms ease",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="portfolio-grid">
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className={`portfolio-item ${idx % 5 === 2 ? "tall" : ""}`}
                onClick={() => setLightbox(item)}
              >
                <Image
                  src={item.public_url}
                  alt={item.alt_text ?? "Wedding photo"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="portfolio-overlay">
                  <div
                    style={{
                      display:        "flex",
                      flexDirection:  "column",
                      alignItems:     "center",
                      gap:            "8px",
                    }}
                  >
                    {/* Expand icon */}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item.category && (
                      <span
                        style={{
                          fontFamily:    "var(--font-display)",
                          fontSize:      "12px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color:         "#D4AF37",
                        }}
                      >
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div
            style={{
              textAlign:    "center",
              padding:      "80px 20px",
              border:       "1px dashed rgba(255,255,255,0.08)",
              borderRadius: "12px",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 16px" }}>
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5"/>
              <circle cx="8.5" cy="8.5" r="1.5" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5"/>
              <path d="M21 15l-5-5L5 21" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p style={{ fontFamily:"var(--font-display)", fontSize:"18px", letterSpacing:"0.1em", color:"rgba(160,160,160,0.4)" }}>
              Portfolio photos will appear here
            </p>
          </div>
        )}
        {/* Drive Albums */}
        {driveAlbums.length > 0 && (
          <div style={{ marginTop: "clamp(48px, 7vh, 80px)" }}>
            <div style={{ textAlign: "center", marginBottom: "clamp(28px, 4vh, 40px)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <span style={{ width: "24px", height: "1px", background: "rgba(212,175,55,0.5)" }} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: "12px", letterSpacing: "0.2em", color: "rgba(212,175,55,0.8)", textTransform: "uppercase" }}>
                  Full Albums
                </span>
                <span style={{ width: "24px", height: "1px", background: "rgba(212,175,55,0.5)" }} />
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(14px, 1.2vw, 17px)", color: "rgba(160,160,160,0.6)", letterSpacing: "0.04em" }}>
                Browse complete collections on Google Drive
              </p>
            </div>

            <div className="drive-albums-grid">
              {driveAlbums.map((album) => (
                <a
                  key={album.id}
                  href={album.drive_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drive-album-card"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div className="drive-album-icon">
                    {/* Google Drive icon */}
                    <svg width="32" height="28" viewBox="0 0 87.3 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0a7.55 7.55 0 003.3 3.3L6.6 66.85z" fill="#D4AF37" fillOpacity="0.7"/>
                      <path d="M43.65 25L29.9 1.2a7.55 7.55 0 00-3.3 3.3L.75 50.85A7.6 7.6 0 000 53.5h27.5L43.65 25z" fill="#D4AF37" fillOpacity="0.5"/>
                      <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25a7.6 7.6 0 000-6.95L59.8 4.5c-.8-1.4-1.95-2.5-3.3-3.3L42.7 25l30.85 51.8z" fill="#D4AF37" fillOpacity="0.9"/>
                      <path d="M43.65 25L57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.4c-1.6 0-3.15.45-4.5 1.2L43.65 25z" fill="#D4AF37"/>
                      <path d="M59.8 76.8H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2H69c1.6 0 3.15-.45 4.5-1.2L59.8 76.8z" fill="#D4AF37" fillOpacity="0.6"/>
                    </svg>
                  </div>

                  <div style={{ flex: 1 }}>
                    {album.category && (
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", display: "block", marginBottom: "6px" }}>
                        {album.category}
                      </span>
                    )}
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px, 1.4vw, 20px)", letterSpacing: "0.04em", color: "#FFFFFF", lineHeight: 1.3 }}>
                      {album.title}
                    </div>
                    {album.description && (
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "13px", letterSpacing: "0.03em", color: "rgba(160,160,160,0.65)", marginTop: "6px" }}>
                        {album.description}
                      </div>
                    )}
                  </div>

                  <div className="drive-album-arrow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7v10" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position:       "fixed",
            inset:          0,
            zIndex:         500,
            background:     "rgba(0,0,0,0.92)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            padding:        "24px",
            cursor:         "zoom-out",
          }}
        >
          <div
            style={{
              position:     "relative",
              maxWidth:     "90vw",
              maxHeight:    "90vh",
              width:        "100%",
              height:       "100%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.public_url}
              alt={lightbox.alt_text ?? ""}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <button
            onClick={() => setLightbox(null)}
            style={{
              position:   "absolute",
              top:        "20px",
              right:      "20px",
              background: "none",
              border:     "1px solid rgba(255,255,255,0.2)",
              borderRadius:"50%",
              width:      "44px",
              height:     "44px",
              color:      "#FFFFFF",
              cursor:     "pointer",
              fontSize:   "20px",
              display:    "flex",
              alignItems: "center",
              justifyContent:"center",
            }}
          >
            ×
          </button>
        </div>
      )}

      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 280px;
          gap: 12px;
        }
        .portfolio-item {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          background: rgb(26,26,26);
          cursor: zoom-in;
        }
        .portfolio-item.tall {
          grid-row: span 2;
        }
        .portfolio-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 350ms ease;
        }
        .portfolio-item:hover .portfolio-overlay {
          background: rgba(0,0,0,0.55);
          opacity: 1;
        }
        .portfolio-item img {
          transition: transform 500ms ease !important;
        }
        .portfolio-item:hover img {
          transform: scale(1.04);
        }

        @media (max-width: 767px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 200px;
          }
          .portfolio-item.tall { grid-row: span 1; }
        }
        @media (max-width: 480px) {
          .portfolio-grid { grid-auto-rows: 160px; }
        }

        /* Drive Albums */
        .drive-albums-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }
        .drive-album-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgb(26,26,26);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 20px 24px;
          transition: border-color 250ms ease, background 250ms ease, transform 250ms ease;
        }
        .drive-album-card:hover {
          border-color: rgba(212,175,55,0.4);
          background: rgb(30,28,22);
          transform: translateY(-2px);
        }
        .drive-album-icon {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          border: 1px solid rgba(212,175,55,0.2);
          background: rgba(212,175,55,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 250ms ease;
        }
        .drive-album-card:hover .drive-album-icon {
          background: rgba(212,175,55,0.12);
        }
        .drive-album-arrow {
          flex-shrink: 0;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 250ms ease, transform 250ms ease;
        }
        .drive-album-card:hover .drive-album-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        @media (max-width: 640px) {
          .drive-albums-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
