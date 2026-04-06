"use client";

import { useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: string;
  client_name: string;
  review_text: string;
  photo_url?: string;
  rating: number;
  wedding_date?: string;
  location?: string;
  is_visible?: boolean;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const FALLBACK: Testimonial[] = [
  {
    id: "1",
    client_name: "Priya & Arjun",
    review_text: "Aksway captured every emotion, every stolen glance, every tear of joy on our wedding day. The photos are breathtaking — we relive that day every time we look at them.",
    rating: 5,
    wedding_date: "2024-02-14",
    location: "Honnavar, Karnataka",
  },
  {
    id: "2",
    client_name: "Meera & Karthik",
    review_text: "We couldn't have asked for a better photographer. The team was professional, unobtrusive, and somehow managed to capture moments we didn't even know were happening.",
    rating: 5,
    wedding_date: "2023-11-20",
    location: "Mangalore",
  },
  {
    id: "3",
    client_name: "Sneha & Rahul",
    review_text: "From our pre-wedding shoot to the big day, the experience was flawless. The cinematic film made our families cry happy tears all over again. Worth every rupee.",
    rating: 5,
    wedding_date: "2024-01-05",
    location: "Goa",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? "#D4AF37" : "none"}>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            stroke="#D4AF37"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const visible = testimonials.filter((t) => t.is_visible !== false);
  const items   = visible.length > 0 ? visible : FALLBACK;
  const [active, setActive] = useState(0);

  return (
    <section
      id="testimonials"
      style={{
        background: "rgb(10,10,10)",
        padding:    "clamp(64px, 10vh, 120px) 0",
        overflow:   "hidden",
        position:   "relative",
      }}
    >
      {/* Background quote */}
      <span
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           "10%",
          left:          "-2%",
          fontFamily:    "Georgia, serif",
          fontSize:      "clamp(120px, 28vw, 400px)",
          color:         "rgba(212,175,55,0.03)",
          lineHeight:    1,
          userSelect:    "none",
          pointerEvents: "none",
          zIndex:        0,
        }}
      >
        "
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
              Kind Words
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
            }}
          >
            Stories From Our Couples
          </h2>
        </div>

        {/* Featured testimonial */}
        <div className="testimonial-featured">
          <div
            style={{
              background:    "rgb(26,26,26)",
              border:        "1px solid rgba(212,175,55,0.2)",
              borderRadius:  "20px",
              padding:       "clamp(32px, 5vw, 60px)",
              position:      "relative",
              overflow:      "hidden",
            }}
          >
            {/* Gold corner accent */}
            <div
              style={{
                position:   "absolute",
                top:        0,
                left:       0,
                width:      "100px",
                height:     "100px",
                borderTop:  "2px solid rgba(212,175,55,0.3)",
                borderLeft: "2px solid rgba(212,175,55,0.3)",
                borderRadius:"20px 0 0 0",
              }}
            />

            <div className="testimonial-inner">
              {/* Quote mark */}
              <div
                style={{
                  fontFamily:    "Georgia, serif",
                  fontSize:      "clamp(60px, 8vw, 100px)",
                  color:         "rgba(212,175,55,0.2)",
                  lineHeight:    0.8,
                  marginBottom:  "8px",
                  userSelect:    "none",
                }}
              >
                "
              </div>

              {/* Review text */}
              <p
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "clamp(17px, 1.8vw, 24px)",
                  lineHeight:    1.7,
                  color:         "rgba(220,220,220,0.9)",
                  letterSpacing: "0.03em",
                  marginBottom:  "32px",
                  maxWidth:      "720px",
                }}
              >
                {items[active].review_text}
              </p>

              {/* Client info */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Avatar */}
                <div
                  style={{
                    width:        "52px",
                    height:       "52px",
                    borderRadius: "50%",
                    border:       "2px solid rgba(212,175,55,0.4)",
                    overflow:     "hidden",
                    flexShrink:   0,
                    background:   "rgb(36,36,36)",
                    position:     "relative",
                  }}
                >
                  {items[active].photo_url ? (
                    <Image
                      src={items[active].photo_url!}
                      alt={items[active].client_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div
                      style={{
                        width:          "100%",
                        height:         "100%",
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize:   "20px",
                          color:      "#D4AF37",
                        }}
                      >
                        {items[active].client_name[0]}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <div
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontSize:      "clamp(16px, 1.4vw, 20px)",
                      letterSpacing: "0.06em",
                      color:         "#FFFFFF",
                      marginBottom:  "4px",
                    }}
                  >
                    {items[active].client_name}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <StarRating rating={items[active].rating} />
                    {items[active].location && (
                      <span
                        style={{
                          fontFamily:    "var(--font-display)",
                          fontSize:      "12px",
                          letterSpacing: "0.1em",
                          color:         "rgba(160,160,160,0.6)",
                          textTransform: "uppercase",
                        }}
                      >
                        {items[active].location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail row */}
        {items.length > 1 && (
          <div
            style={{
              display:        "flex",
              justifyContent: "center",
              gap:            "12px",
              marginTop:      "32px",
              flexWrap:       "wrap",
            }}
          >
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                style={{
                  background:    i === active ? "rgba(212,175,55,0.1)" : "rgb(26,26,26)",
                  border:        `1px solid ${i === active ? "#D4AF37" : "rgba(255,255,255,0.08)"}`,
                  borderRadius:  "10px",
                  padding:       "12px 20px",
                  cursor:        "pointer",
                  transition:    "all 200ms ease",
                  textAlign:     "left",
                  minWidth:      "160px",
                }}
              >
                <div
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontSize:      "14px",
                    letterSpacing: "0.06em",
                    color:         i === active ? "#D4AF37" : "rgba(200,200,200,0.7)",
                    marginBottom:  "4px",
                  }}
                >
                  {item.client_name}
                </div>
                {item.location && (
                  <div
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontSize:      "11px",
                      letterSpacing: "0.1em",
                      color:         "rgba(160,160,160,0.5)",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.location}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .testimonial-featured { max-width: 860px; margin: 0 auto; }
        .testimonial-inner {}

        @media (max-width: 640px) {
          .testimonial-featured { max-width: 100%; }
        }
      `}</style>
    </section>
  );
}
