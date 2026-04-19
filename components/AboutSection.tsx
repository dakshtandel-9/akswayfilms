import Image from "next/image";
import type { AboutContent } from "@/lib/validations";

interface AboutSectionProps {
  content: AboutContent | null;
}

const FALLBACK: AboutContent = {
  headline: "The Artist Behind The Lens",
  bio: "Every wedding is a unique story waiting to be told. I'm a passionate photographer based in Honnavar, Karnataka, dedicated to capturing the raw emotions, stolen glances, and timeless moments that make your day unforgettable. My approach blends candid storytelling with cinematic artistry.",
  years_experience: 7,
  location: "Honnavar, Karnataka",
  photo_url: "",
  photo_alt: "Aksway Photographer",
};

const STATS = [
  { label: "Years Experience", getValue: (c: AboutContent) => c.years_experience ?? 7 },
  { label: "Weddings Captured", getValue: () => 50 },
  { label: "Happy Couples", getValue: () => 50 },
  { label: "Cities Covered", getValue: () => 15 },
];

export default function AboutSection({ content }: AboutSectionProps) {
  const c = content ?? FALLBACK;

  return (
    <section
      id="about"
      style={{
        background: "rgb(10,10,10)",
        padding: "clamp(64px, 10vh, 120px) 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background text watermark */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(80px, 18vw, 220px)",
          color: "rgba(212,175,55,0.03)",
          letterSpacing: "0.08em",
          lineHeight: 1,
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        STORY
      </span>

      <div
        className="about-container"
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 96px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="about-grid">

          {/* ── Left: Text ── */}
          <div className="about-text-col">

            {/* Section label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "28px",
              }}
            >
              <span style={{ width: "32px", height: "1px", background: "#D4AF37", display: "block" }} />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "13px",
                  letterSpacing: "0.2em",
                  color: "#D4AF37",
                  textTransform: "uppercase",
                }}
              >
                Our Story
              </span>
              <span style={{ width: "32px", height: "1px", background: "#D4AF37", display: "block" }} />
            </div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 5vw, 72px)",
                lineHeight: 1.0,
                letterSpacing: "0.02em",
                color: "#FFFFFF",
                marginBottom: "28px",
              }}
            >
              {c.headline}
            </h2>

            {/* Gold divider */}
            <div
              style={{
                width: "60px",
                height: "2px",
                background: "linear-gradient(90deg, #D4AF37, transparent)",
                marginBottom: "28px",
              }}
            />

            {/* Bio */}
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(15px, 1.4vw, 19px)",
                lineHeight: 1.8,
                color: "rgba(200,200,200,0.85)",
                marginBottom: "40px",
                maxWidth: "540px",
                letterSpacing: "0.03em",
              }}
            >
              {c.bio}
            </p>

            {/* Location badge */}
            {c.location && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid rgba(212,175,55,0.3)",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  marginBottom: "48px",
                }}
              >
                {/* Pin icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="#D4AF37" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "14px",
                    letterSpacing: "0.1em",
                    color: "#D4AF37",
                  }}
                >
                  {c.location}
                </span>
              </div>
            )}

            {/* Stats grid */}
            <div className="about-stats">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="about-stat-item"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(40px, 4vw, 60px)",
                      color: "#D4AF37",
                      lineHeight: 1,
                      display: "block",
                    }}
                  >
                    {stat.getValue(c)}+
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "12px",
                      letterSpacing: "0.12em",
                      color: "rgba(160,160,160,0.8)",
                      textTransform: "uppercase",
                      marginTop: "6px",
                      display: "block",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Photo ── */}
          <div className="about-photo-col">
            <div
              style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                aspectRatio: "3/4",
                width: "100%",
                background: "rgb(26,26,26)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {c.photo_url ? (
                <Image
                  src={c.photo_url}
                  alt={c.photo_alt ?? "Aksway Photographer"}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 767px) 100vw, 45vw"
                />
              ) : (
                /* Placeholder */
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    background: "linear-gradient(135deg, rgba(26,26,26,1) 0%, rgba(36,36,36,1) 100%)",
                  }}
                >
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" />
                    <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "13px",
                      letterSpacing: "0.15em",
                      color: "rgba(160,160,160,0.4)",
                    }}
                  >
                    Photographer Photo
                  </span>
                </div>
              )}

              {/* Gold corner accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "80px",
                  height: "80px",
                  borderTop: "2px solid rgba(212,175,55,0.5)",
                  borderRight: "2px solid rgba(212,175,55,0.5)",
                  borderRadius: "0 16px 0 0",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "80px",
                  height: "80px",
                  borderBottom: "2px solid rgba(212,175,55,0.5)",
                  borderLeft: "2px solid rgba(212,175,55,0.5)",
                  borderRadius: "0 0 0 16px",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Floating tag */}
            <div
              style={{
                position: "absolute",
                bottom: "32px",
                right: "-16px",
                background: "#D4AF37",
                borderRadius: "8px",
                padding: "12px 20px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
              className="about-tag"
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  color: "#0A0A0A",
                  textTransform: "uppercase",
                  display: "block",
                }}
              >
                Based in
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  letterSpacing: "0.06em",
                  color: "#0A0A0A",
                  display: "block",
                  lineHeight: 1.2,
                  marginTop: "2px",
                }}
              >
                {c.location ?? "Honnavar"}
              </span>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 8vw, 100px);
          align-items: center;
        }
        .about-photo-col {
          position: relative;
          max-width: 480px;
          justify-self: center;
          width: 100%;
        }
        .about-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px 32px;
        }
        .about-stat-item {
          padding-left: 16px;
          border-left: 2px solid rgba(212,175,55,0.25);
        }
        .about-tag {
          position: absolute;
        }

        @media (max-width: 767px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .about-photo-col {
            order: -1;
            max-width: 320px;
            margin: 0 auto;
          }
          .about-tag {
            right: 0 !important;
            bottom: -16px !important;
          }
          .about-stats {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
