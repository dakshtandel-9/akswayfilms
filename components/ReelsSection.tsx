import type { ReelsContent, ReelItem } from "@/lib/validations";

interface ReelsSectionProps {
  content: ReelsContent | null;
}

const FALLBACK_REELS: ReelItem[] = [
  { id: "1", url: "#", type: "instagram", caption: "Beach Wedding Highlights" },
  { id: "2", url: "#", type: "instagram", caption: "Haldi Ceremony" },
  { id: "3", url: "#", type: "instagram", caption: "Pre-Wedding Shoot" },
  { id: "4", url: "#", type: "video",     caption: "Cinematic Wedding Film" },
  { id: "5", url: "#", type: "instagram", caption: "Reception Night" },
  { id: "6", url: "#", type: "instagram", caption: "Couple Portraits" },
];

function ReelCard({ reel }: { reel: ReelItem }) {
  return (
    <a
      href={reel.url !== "#" ? reel.url : undefined}
      target={reel.url !== "#" ? "_blank" : undefined}
      rel="noopener noreferrer"
      style={{
        display:       "block",
        position:      "relative",
        aspectRatio:   "9/16",
        borderRadius:  "12px",
        overflow:      "hidden",
        background:    "rgb(26,26,26)",
        border:        "1px solid rgba(255,255,255,0.07)",
        textDecoration:"none",
        cursor:        reel.url !== "#" ? "pointer" : "default",
      }}
      className="reel-card"
    >
      {/* Thumbnail */}
      {reel.thumbnail_url ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={reel.thumbnail_url}
          alt={reel.caption ?? "Reel"}
          style={{
            position: "absolute",
            inset:    0,
            width:    "100%",
            height:   "100%",
            objectFit:"cover",
          }}
        />
      ) : (
        /* Placeholder gradient */
        <div
          style={{
            position:   "absolute",
            inset:      0,
            background: `linear-gradient(135deg,
              rgba(26,26,26,1) 0%,
              rgba(36,36,36,1) 50%,
              rgba(26,26,26,1) 100%
            )`,
          }}
        />
      )}

      {/* Dark overlay */}
      <div
        className="reel-overlay"
        style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)",
          transition: "background 300ms ease",
        }}
      />

      {/* Play button */}
      <div
        style={{
          position:       "absolute",
          top:            "50%",
          left:           "50%",
          transform:      "translate(-50%, -50%)",
          width:          "52px",
          height:         "52px",
          borderRadius:   "50%",
          border:         "1.5px solid rgba(212,175,55,0.7)",
          background:     "rgba(0,0,0,0.4)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          transition:     "all 300ms ease",
        }}
        className="reel-play"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#D4AF37">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>

      {/* Type badge */}
      <div
        style={{
          position:     "absolute",
          top:          "12px",
          left:         "12px",
          background:   reel.type === "instagram" ? "rgba(212,175,55,0.15)" : "rgba(0,0,0,0.5)",
          border:       "1px solid rgba(212,175,55,0.3)",
          borderRadius: "4px",
          padding:      "3px 8px",
        }}
      >
        <span
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color:         "#D4AF37",
          }}
        >
          {reel.type === "instagram" ? "Reel" : "Film"}
        </span>
      </div>

      {/* Caption */}
      {reel.caption && (
        <div
          style={{
            position:   "absolute",
            bottom:     0,
            left:       0,
            right:      0,
            padding:    "20px 14px 14px",
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          }}
        >
          <span
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "13px",
              letterSpacing: "0.06em",
              color:         "rgba(255,255,255,0.85)",
              lineHeight:    1.3,
            }}
          >
            {reel.caption}
          </span>
        </div>
      )}
    </a>
  );
}

export default function ReelsSection({ content }: ReelsSectionProps) {
  const headline    = content?.headline    ?? "Moments In Motion";
  const subheadline = content?.subheadline ?? "Watch our wedding films and highlights";
  const items       = content?.items?.length ? content.items : FALLBACK_REELS;

  return (
    <section
      id="reels"
      style={{
        background: "rgb(17,17,17)",
        padding:    "clamp(64px, 10vh, 120px) 0",
        overflow:   "hidden",
        position:   "relative",
      }}
    >
      {/* Background watermark */}
      <span
        aria-hidden="true"
        style={{
          position:      "absolute",
          bottom:        "-4%",
          left:          "-2%",
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(80px, 20vw, 260px)",
          color:         "rgba(212,175,55,0.025)",
          letterSpacing: "0.06em",
          lineHeight:    1,
          userSelect:    "none",
          pointerEvents: "none",
          zIndex:        0,
        }}
      >
        REELS
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
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 6vh, 64px)" }}>
          <div
            style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          "12px",
              marginBottom: "20px",
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
              Films &amp; Reels
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
              marginBottom:  "16px",
            }}
          >
            {headline}
          </h2>
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
        </div>

        {/* Reels grid */}
        <div className="reels-grid">
          {items.slice(0, 6).map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>
      </div>

      <style>{`
        .reels-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }
        .reel-card:hover .reel-overlay {
          background: linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.7) 100%) !important;
        }
        .reel-card:hover .reel-play {
          background: rgba(212,175,55,0.2) !important;
          border-color: rgba(212,175,55,1) !important;
          transform: translate(-50%, -50%) scale(1.1) !important;
        }

        @media (max-width: 1023px) {
          .reels-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .reels-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
        }
      `}</style>
    </section>
  );
}
