"use client";

import { useState } from "react";
import type { ContactContent } from "@/lib/validations";

interface ContactSectionProps {
  content: ContactContent | null;
}

const FALLBACK: ContactContent = {
  headline:    "Let's Tell Your Story",
  subheadline: "Reach out to check availability or book a consultation",
  phone:       "+91 98765 43210",
  whatsapp:    "919876543210",
  email:       "hello@aksway.in",
  address:     "Honnavar, Karnataka, India",
};

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon:   React.ReactNode;
  label:  string;
  value:  string;
  href?:  string;
}) {
  const inner = (
    <div
      style={{
        display:    "flex",
        alignItems: "flex-start",
        gap:        "16px",
      }}
      className="contact-info-row"
    >
      <div
        style={{
          width:          "44px",
          height:         "44px",
          borderRadius:   "10px",
          border:         "1px solid rgba(212,175,55,0.3)",
          background:     "rgba(212,175,55,0.06)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          flexShrink:     0,
          transition:     "background 200ms ease, border-color 200ms ease",
        }}
        className="contact-icon-box"
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "11px",
            letterSpacing: "0.15em",
            color:         "rgba(160,160,160,0.6)",
            textTransform: "uppercase",
            marginBottom:  "4px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(16px, 1.4vw, 19px)",
            letterSpacing: "0.04em",
            color:         "#FFFFFF",
            lineHeight:    1.3,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: "none", display: "block" }} className="contact-info-link">
        {inner}
      </a>
    );
  }
  return inner;
}

export default function ContactSection({ content }: ContactSectionProps) {
  const c = content ?? FALLBACK;
  const [form, setForm] = useState({ name: "", phone: "", date: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const number = c.whatsapp ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
    const lines = [
      `*New Enquiry from aksway.in*`,
      ``,
      `*Name:* ${form.name}`,
      form.phone  ? `*Phone:* ${form.phone}`        : null,
      form.date   ? `*Wedding Date:* ${form.date}`   : null,
      form.message? `*Message:* ${form.message}`     : null,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${number}?text=${encodeURIComponent(lines)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("sent");
  };

  return (
    <section
      id="contact"
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
          top:           "50%",
          right:         "-4%",
          transform:     "translateY(-50%)",
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
        HELLO
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
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 7vh, 72px)" }}>
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
              Get In Touch
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
            {c.headline}
          </h2>
          {c.subheadline && (
            <p
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(15px, 1.3vw, 18px)",
                color:         "rgba(160,160,160,0.8)",
                letterSpacing: "0.04em",
              }}
            >
              {c.subheadline}
            </p>
          )}
        </div>

        <div className="contact-grid">

          {/* ── Left: Info ── */}
          <div className="contact-info-col">
            <div
              style={{
                background:    "rgb(26,26,26)",
                border:        "1px solid rgba(255,255,255,0.07)",
                borderRadius:  "20px",
                padding:       "clamp(28px, 4vw, 48px)",
                height:        "100%",
                display:       "flex",
                flexDirection: "column",
                gap:           "32px",
              }}
            >
              {c.phone && (
                <InfoRow
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  }
                  label="Phone"
                  value={c.phone}
                  href={`tel:${c.phone.replace(/\s/g, "")}`}
                />
              )}

              {c.whatsapp && (
                <InfoRow
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" stroke="#D4AF37" strokeWidth="0.5" fill="#D4AF37" fillOpacity="0.8"/>
                    </svg>
                  }
                  label="WhatsApp"
                  value={`+${c.whatsapp}`}
                  href={`https://wa.me/${c.whatsapp}`}
                />
              )}

              {c.email && (
                <InfoRow
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="4" width="20" height="16" rx="3" stroke="#D4AF37" strokeWidth="1.5"/>
                      <path d="M2 7l10 7 10-7" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  }
                  label="Email"
                  value={c.email}
                  href={`mailto:${c.email}`}
                />
              )}

              {c.address && (
                <InfoRow
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="#D4AF37" fillOpacity="0.8"/>
                    </svg>
                  }
                  label="Location"
                  value={c.address}
                />
              )}

              {/* Divider */}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />

              {/* WhatsApp CTA */}
              {c.whatsapp && (
                <a
                  href={`https://wa.me/${c.whatsapp}?text=Hi%20Aksway!%20I'd%20like%20to%20book%20a%20session.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    gap:            "10px",
                    background:     "#25D366",
                    border:         "none",
                    borderRadius:   "10px",
                    padding:        "14px 24px",
                    textDecoration: "none",
                    transition:     "opacity 200ms ease, transform 200ms ease",
                  }}
                  className="whatsapp-cta"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
                  </svg>
                  <span
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontSize:      "clamp(16px, 1.3vw, 19px)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color:         "#FFFFFF",
                    }}
                  >
                    Chat on WhatsApp
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="contact-form-col">
            <div
              style={{
                background:    "rgb(26,26,26)",
                border:        "1px solid rgba(255,255,255,0.07)",
                borderRadius:  "20px",
                padding:       "clamp(28px, 4vw, 48px)",
              }}
            >
              {status === "sent" ? (
                <div
                  style={{
                    textAlign:      "center",
                    padding:        "60px 20px",
                    display:        "flex",
                    flexDirection:  "column",
                    alignItems:     "center",
                    gap:            "20px",
                  }}
                >
                  <div
                    style={{
                      width:        "64px",
                      height:       "64px",
                      borderRadius: "50%",
                      background:   "rgba(212,175,55,0.1)",
                      border:       "1px solid rgba(212,175,55,0.4)",
                      display:      "flex",
                      alignItems:   "center",
                      justifyContent:"center",
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontSize:      "clamp(24px, 2.5vw, 32px)",
                      letterSpacing: "0.04em",
                      color:         "#FFFFFF",
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontSize:      "16px",
                      letterSpacing: "0.04em",
                      color:         "rgba(160,160,160,0.8)",
                    }}
                  >
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <h3
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontSize:      "clamp(22px, 2vw, 28px)",
                      letterSpacing: "0.04em",
                      color:         "#FFFFFF",
                      marginBottom:  "8px",
                    }}
                  >
                    Send a Message
                  </h3>

                  {[
                    { key: "name",    label: "Your Name",    type: "text",  placeholder: "Priya & Arjun" },
                    { key: "phone",   label: "Phone Number", type: "tel",   placeholder: "+91 98765 43210" },
                    { key: "date",    label: "Wedding Date", type: "date",  placeholder: "" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label
                        style={{
                          display:       "block",
                          fontFamily:    "var(--font-display)",
                          fontSize:      "12px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color:         "rgba(160,160,160,0.7)",
                          marginBottom:  "8px",
                        }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                        required={field.key === "name"}
                        className="contact-input"
                        style={{
                          width:         "100%",
                          background:    "rgb(17,17,17)",
                          border:        "1px solid rgba(255,255,255,0.1)",
                          borderRadius:  "8px",
                          padding:       "12px 16px",
                          fontFamily:    "var(--font-display)",
                          fontSize:      "15px",
                          letterSpacing: "0.04em",
                          color:         "#FFFFFF",
                          outline:       "none",
                          boxSizing:     "border-box",
                          transition:    "border-color 200ms ease",
                        }}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      style={{
                        display:       "block",
                        fontFamily:    "var(--font-display)",
                        fontSize:      "12px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color:         "rgba(160,160,160,0.7)",
                        marginBottom:  "8px",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      placeholder="Tell us about your wedding day, venue, and vision..."
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      className="contact-input"
                      style={{
                        width:         "100%",
                        background:    "rgb(17,17,17)",
                        border:        "1px solid rgba(255,255,255,0.1)",
                        borderRadius:  "8px",
                        padding:       "12px 16px",
                        fontFamily:    "var(--font-display)",
                        fontSize:      "15px",
                        letterSpacing: "0.04em",
                        color:         "#FFFFFF",
                        outline:       "none",
                        resize:        "vertical",
                        boxSizing:     "border-box",
                        transition:    "border-color 200ms ease",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    style={{
                      background:    "#D4AF37",
                      border:        "none",
                      borderRadius:  "8px",
                      padding:       "14px 32px",
                      fontFamily:    "var(--font-display)",
                      fontSize:      "clamp(16px, 1.3vw, 20px)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color:         "#0A0A0A",
                      cursor:        status === "sending" ? "wait" : "pointer",
                      opacity:       status === "sending" ? 0.7 : 1,
                      transition:    "opacity 200ms ease, transform 200ms ease",
                    }}
                    className="contact-submit"
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 24px;
          align-items: start;
        }
        .contact-input:focus {
          border-color: rgba(212,175,55,0.6) !important;
          box-shadow: 0 0 0 3px rgba(212,175,55,0.1);
        }
        .contact-input::placeholder { color: rgba(100,100,100,0.6); }
        .contact-input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.4); }
        .contact-submit:hover:not(:disabled) {
          opacity: 0.9 !important;
          transform: translateY(-1px);
        }
        .contact-info-link:hover .contact-icon-box {
          background: rgba(212,175,55,0.15) !important;
          border-color: rgba(212,175,55,0.6) !important;
        }
        .whatsapp-cta:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        @media (max-width: 767px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
